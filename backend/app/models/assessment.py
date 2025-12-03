from datetime import datetime

from pydantic import BaseModel, Field


class Assessment(BaseModel):
    """Represents assessor-led sessions, crucial in praktijkgerichte trajecten."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    candidate_id: str = Field(alias="candidateId")
    assessor_id: str = Field(alias="assessorId")
    session_meta: dict | None = Field(default=None, alias="sessionMeta")
    notes: list[dict] = Field(default_factory=list)
    media_ids: list[str] = Field(default_factory=list, alias="mediaIds")
    draft_report_text: str | None = Field(default=None, alias="draftReportText")
    created_at: datetime = Field(alias="createdAt")
