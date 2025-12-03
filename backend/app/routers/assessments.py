from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, status

from app.db.mongo import get_database
from app.routers.auth import get_current_user
from app.services.ai_service import ai_service
from app.services.audit_service import audit_service

router = APIRouter(prefix="/assessments", tags=["assessments"])


@router.post("/{candidate_id}/generate-report")
async def generate_report(candidate_id: str, user=Depends(get_current_user)):
    """Genereert concept-assessorrapport zodat beoordeling sneller verloopt."""
    if user["role"] not in {"assessor", "admin"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Assessor-only endpoint")

    try:
        candidate_oid = ObjectId(candidate_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid candidate id")

    db = get_database()
    candidate = await db["candidates"].find_one({"_id": candidate_oid})
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")

    if candidate["tenantId"] != user["tenantId"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cross-tenant access denied")

    report_text = await ai_service.generate_assessment_report(candidate_id)

    assessment_doc = {
        "tenantId": user["tenantId"],
        "candidateId": candidate_id,
        "assessorId": user["sub"],
        "sessionMeta": {},
        "notes": [],
        "mediaIds": [],
        "draftReportText": report_text,
        "createdAt": datetime.utcnow(),
    }
    await db["assessments"].insert_one(assessment_doc)

    await audit_service.log(
        tenant_id=user["tenantId"],
        user_id=user["sub"],
        action="assessment_draft_generated",
        target_type="candidate",
        target_id=candidate_id,
    )

    return {"draftReportText": report_text}
