import json
import os
from datetime import datetime
from typing import Any

from bson import ObjectId
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.db.mongo import get_collection

router = APIRouter(prefix="/evidence", tags=["evidence"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_evidence(
    candidate_id: str = Form(...),
    competency_area_id: str = Form(...),
    title: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
) -> dict[str, Any]:
    """
    Upload nieuw bewijs voor een kandidaat.
    """
    # Valideer kandidaat bestaat
    candidates_coll = get_collection("candidates")
    candidate_doc = await candidates_coll.find_one({"_id": candidate_id})
    if not candidate_doc:
        raise HTTPException(status_code=404, detail="Kandidaat niet gevonden")

    # Bepaal file type
    content_type = file.content_type or ""
    if "image" in content_type:
        evidence_type = "image"
    elif "audio" in content_type:
        evidence_type = "audio"
    elif "video" in content_type:
        evidence_type = "video"
    elif "pdf" in content_type or "document" in content_type:
        evidence_type = "document"
    else:
        evidence_type = "document"

    # Genereer file path (in productie zou dit naar blob storage gaan)
    file_extension = file.filename.split(".")[-1] if "." in file.filename else "bin"
    file_path = f"uploads/{candidate_id}/{ObjectId()}.{file_extension}"

    # Sla file op (simpele versie - in productie naar cloud storage)
    os.makedirs(f"uploads/{candidate_id}", exist_ok=True)
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Maak evidence document
    evidence_id = str(ObjectId())
    evidence_doc = {
        "_id": evidence_id,
        "tenantId": candidate_doc.get("tenantId", "default"),
        "candidateId": candidate_id,
        "uploadedByUserId": candidate_doc.get("userId", candidate_id),
        "type": evidence_type,
        "pathOrBlobRef": file_path,
        "title": title,
        "description": description,
        "competencyAreaId": competency_area_id,
        "timestamp": datetime.utcnow(),
        "aiGeneratedLikelihood": 0.0,
        "mappedIndicators": [],
        "transcript": None,
        "fraudFlags": [],
        "status": "pending",
    }

    evidence_coll = get_collection("evidence")
    await evidence_coll.insert_one(evidence_doc)

    return {
        "evidenceId": evidence_id,
        "message": "Bewijs succesvol toegevoegd",
        "status": "pending",
    }


@router.get("/candidate/{candidate_id}")
async def get_candidate_evidence(candidate_id: str) -> list[dict[str, Any]]:
    """
    Haal alle bewijs op voor een kandidaat.
    """
    evidence_coll = get_collection("evidence")
    cursor = evidence_coll.find({"candidateId": candidate_id})
    evidence_docs = await cursor.to_list(length=None)

    result = []
    for doc in evidence_docs:
        result.append(
            {
                "id": doc["_id"],
                "title": doc.get("title", "Onbekend"),
                "description": doc.get("description", ""),
                "competencyAreaId": doc.get("competencyAreaId", ""),
                "type": doc["type"],
                "status": doc.get("status", "pending"),
                "timestamp": doc["timestamp"].isoformat() if isinstance(doc["timestamp"], datetime) else doc["timestamp"],
                "pathOrBlobRef": doc["pathOrBlobRef"],
                "mappedIndicators": doc.get("mappedIndicators", []),
            }
        )

    return result


@router.get("/{evidence_id}")
async def get_evidence_by_id(evidence_id: str) -> dict[str, Any]:
    """
    Haal specifiek bewijs op via ID.
    """
    evidence_coll = get_collection("evidence")
    evidence_doc = await evidence_coll.find_one({"_id": evidence_id})

    if not evidence_doc:
        raise HTTPException(status_code=404, detail="Bewijs niet gevonden")

    return {
        "id": evidence_doc["_id"],
        "title": evidence_doc.get("title", "Onbekend"),
        "description": evidence_doc.get("description", ""),
        "competencyAreaId": evidence_doc.get("competencyAreaId", ""),
        "type": evidence_doc["type"],
        "status": evidence_doc.get("status", "pending"),
        "timestamp": evidence_doc["timestamp"].isoformat() if isinstance(evidence_doc["timestamp"], datetime) else evidence_doc["timestamp"],
        "pathOrBlobRef": evidence_doc["pathOrBlobRef"],
        "mappedIndicators": evidence_doc.get("mappedIndicators", []),
        "candidateId": evidence_doc.get("candidateId", ""),
        "aiGeneratedLikelihood": evidence_doc.get("aiGeneratedLikelihood", 0.0),
        "transcript": evidence_doc.get("transcript"),
        "fraudFlags": evidence_doc.get("fraudFlags", []),
    }


@router.get("/{evidence_id}/download")
async def download_evidence(evidence_id: str):
    """
    Download het bewijs bestand.
    """
    evidence_coll = get_collection("evidence")
    evidence_doc = await evidence_coll.find_one({"_id": evidence_id})

    if not evidence_doc:
        raise HTTPException(status_code=404, detail="Bewijs niet gevonden")

    file_path = evidence_doc["pathOrBlobRef"]

    # Check of bestand bestaat
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Bestand niet gevonden")

    return FileResponse(
        file_path,
        filename=evidence_doc.get("title", "download") + "." + file_path.split(".")[-1],
    )


@router.put("/{evidence_id}")
async def update_evidence(
    evidence_id: str,
    title: str = Form(None),
    description: str = Form(None),
    competency_area_id: str = Form(None),
    mapped_indicators: str = Form(None),  # JSON string van lijst
) -> dict[str, Any]:
    """
    Werk bewijs bij (titel, beschrijving, competentie gebied).
    """
    evidence_coll = get_collection("evidence")
    evidence_doc = await evidence_coll.find_one({"_id": evidence_id})

    if not evidence_doc:
        raise HTTPException(status_code=404, detail="Bewijs niet gevonden")

    # Bouw update document
    update_fields = {}
    if title is not None:
        update_fields["title"] = title
    if description is not None:
        update_fields["description"] = description
    if competency_area_id is not None:
        update_fields["competencyAreaId"] = competency_area_id
    if mapped_indicators is not None:
        try:
            update_fields["mappedIndicators"] = json.loads(mapped_indicators)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Ongeldige mappedIndicators JSON")

    if update_fields:
        await evidence_coll.update_one({"_id": evidence_id}, {"$set": update_fields})

    return {"message": "Bewijs succesvol bijgewerkt", "evidenceId": evidence_id}


@router.delete("/{evidence_id}")
async def delete_evidence(evidence_id: str) -> dict[str, str]:
    """
    Verwijder bewijs.
    """
    evidence_coll = get_collection("evidence")
    evidence_doc = await evidence_coll.find_one({"_id": evidence_id})

    if not evidence_doc:
        raise HTTPException(status_code=404, detail="Bewijs niet gevonden")

    # Verwijder bestand
    file_path = evidence_doc["pathOrBlobRef"]
    if os.path.exists(file_path):
        os.remove(file_path)

    # Verwijder document
    await evidence_coll.delete_one({"_id": evidence_id})

    return {"message": "Bewijs succesvol verwijderd"}
