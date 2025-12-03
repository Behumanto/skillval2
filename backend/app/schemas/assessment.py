from typing import Any

from pydantic import BaseModel, Field


class GenerateReportRequest(BaseModel):
    tenant_id: str = Field(..., alias="tenantId")
    assessor_id: str = Field(..., alias="assessorId")
    traject_id: str = Field(..., alias="trajectId")
    assessment_id: str = Field(..., alias="assessmentId")
    transcript: str
    observations: list[dict[str, Any]] = []
    indicator_summaries: list[dict[str, Any]] = Field(default_factory=list, alias="indicatorSummaries")
