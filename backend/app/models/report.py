from datetime import datetime

from pydantic import BaseModel, Field


class IndicatorSummary(BaseModel):
    indicator_id: str = Field(alias="indicatorId")
    status: str
    comment: str | None = None


class Report(BaseModel):
    """Final evidence bundle exported towards certification bodies."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    candidate_id: str = Field(alias="candidateId")
    assessor_id: str = Field(alias="assessorId")
    final_text: str = Field(alias="finalText")
    indicator_summary: list[IndicatorSummary] = Field(alias="indicatorSummary")
    created_at: datetime = Field(alias="createdAt")
