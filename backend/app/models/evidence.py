from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class EvidenceItem(BaseModel):
    """Captures portfolio or assessment evidence with AI annotations."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    candidate_id: str = Field(alias="candidateId")
    uploaded_by_user_id: str = Field(alias="uploadedByUserId")
    type: Literal["text", "audio", "video", "image", "document"]
    path_or_blob_ref: str = Field(alias="pathOrBlobRef")
    description: str | None = None
    timestamp: datetime
    ai_generated_likelihood: float = Field(alias="aiGeneratedLikelihood")
    mapped_indicators: list[str] = Field(default_factory=list, alias="mappedIndicators")
    transcript: str | None = None
    fraud_flags: list[dict] = Field(default_factory=list, alias="fraudFlags")
