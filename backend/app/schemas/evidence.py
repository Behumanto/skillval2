from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class EvidenceCreateRequest(BaseModel):
    tenant_id: str = Field(..., alias="tenantId")
    uploader_id: str = Field(..., alias="uploaderId")
    traject_id: str = Field(..., alias="trajectId")
    type: str
    blob_url: str = Field(..., alias="blobUrl")
    extracted_text: str | None = None
    transcript: str | None = None
    metadata: dict[str, Any] = {}


class EvidenceResponse(BaseModel):
    evidence_id: str = Field(..., alias="evidenceId")
    candidate_id: str = Field(..., alias="candidateId")
    indicator_matches: list[dict[str, Any]]
    fraud_flags: dict[str, Any]
    created_at: datetime = Field(..., alias="createdAt")
