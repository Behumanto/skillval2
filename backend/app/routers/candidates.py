import json
from datetime import datetime
from pathlib import Path
from typing import List, Optional

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.db.mongo import get_database
from app.routers.auth import get_current_user
from app.services.ai_service import ai_service
from app.services.audit_service import audit_service
from app.services.fraud_service import fraud_service
from app.services.stt_service import stt_service

router = APIRouter(prefix="/candidates", tags=["candidates"])

STORAGE_ROOT = Path("storage")


@router.post("/{candidate_id}/evidence", status_code=201)
async def upload_evidence(
    candidate_id: str,
    description: str = Form(...),
    indicator_hints: Optional[str] = Form(None),
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    user=Depends(get_current_user),
):
    """Voegt bewijs toe zodat portfolio (jeugdzorg) of praktijk (autotechniek) kan worden beoordeeld."""
    try:
        candidate_oid = ObjectId(candidate_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid candidate id")

    db = get_database()
    candidate = await db["candidates"].find_one({"_id": candidate_oid})
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")

    tenant_id = user["tenantId"]
    if candidate["tenantId"] != tenant_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cross-tenant access denied")

    content_text = text or ""
    transcript_text = None
    evidence_type = "text"
    path_ref = None

    if file is not None:
        storage_dir = STORAGE_ROOT / tenant_id / candidate_id
        storage_dir.mkdir(parents=True, exist_ok=True)
        file_bytes = await file.read()
        file_path = storage_dir / file.filename
        file_path.write_bytes(file_bytes)
        path_ref = str(file_path)
        evidence_type = _detect_type(file.content_type or file.filename)

        if evidence_type == "audio":
            stt_result = await stt_service.transcribe_audio(file_bytes, file.content_type or "audio/mpeg")
            transcript_text = stt_result.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("transcript")
            content_text = transcript_text or description
        else:
            content_text = text or description
    else:
        path_ref = f"text::{candidate_id}::{datetime.utcnow().isoformat()}"
        content_text = text or description

    hints: List[str] = []
    if indicator_hints:
        try:
            hints = json.loads(indicator_hints)
        except json.JSONDecodeError:
            hints = [indicator_hints]

    analysis = await ai_service.analyze_evidence(content_text, candidate_id)
    fraud_analysis = await fraud_service.score_text_for_ai_origin(content_text)

    ai_likelihood = float(fraud_analysis.get("aiGeneratedLikelihood", analysis.get("aiGeneratedLikelihood", 0.0)))
    fraud_flags_ai = analysis.get("fraudFlags", []) or []
    fraud_flags_service = fraud_analysis.get("fraudFlags", []) or []
    fraud_flags = [*fraud_flags_ai, *fraud_flags_service]
    mapped_indicators = analysis.get("mappedIndicators", []) or hints
    if isinstance(mapped_indicators, str):
        mapped_indicators = [mapped_indicators]

    evidence_doc = {
        "tenantId": tenant_id,
        "candidateId": candidate_id,
        "uploadedByUserId": user["sub"],
        "type": evidence_type,
        "pathOrBlobRef": path_ref,
        "description": description,
        "timestamp": datetime.utcnow(),
        "aiGeneratedLikelihood": ai_likelihood,
        "mappedIndicators": mapped_indicators,
        "transcript": transcript_text,
        "fraudFlags": fraud_flags,
    }

    result = await db["evidenceItems"].insert_one(evidence_doc)
    evidence_id = str(result.inserted_id)

    await _update_indicator_coverage(db, candidate_oid, mapped_indicators, evidence_id)
    await audit_service.log(
        tenant_id=tenant_id,
        user_id=user["sub"],
        action="evidence_uploaded",
        target_type="candidate",
        target_id=candidate_id,
    )

    return {"evidenceId": evidence_id, "mappedIndicators": mapped_indicators, "aiGeneratedLikelihood": ai_likelihood, "fraudFlags": fraud_flags}


def _detect_type(content_type: str) -> str:
    if content_type.startswith("audio"):
        return "audio"
    if content_type.startswith("image"):
        return "image"
    if content_type.startswith("video"):
        return "video"
    if "pdf" in content_type:
        return "document"
    return "text"


async def _update_indicator_coverage(db, candidate_oid: ObjectId, indicators: list[str], evidence_id: str) -> None:
    """Zet indicatoren op 'gedekt' zodat kandidaat dashboard direct procenten ziet."""
    if not indicators:
        return

    set_updates = {f"indicatorCoverage.{indicator}.covered": True for indicator in indicators}
    add_updates = {f"indicatorCoverage.{indicator}.evidenceIds": evidence_id for indicator in indicators}

    await db["candidates"].update_one(
        {"_id": candidate_oid},
        {
            "$set": set_updates,
            "$addToSet": add_updates,
        },
    )
