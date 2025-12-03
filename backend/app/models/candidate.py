from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class IndicatorCoverage(BaseModel):
    covered: bool
    evidence_ids: list[str] = Field(default_factory=list, alias="evidenceIds")


class Candidate(BaseModel):
    """Tracks candidate progression for EVC (portfolio vs assessment contexts)."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    user_id: str = Field(alias="userId")
    traject_id: str = Field(alias="trajectId")
    indicator_coverage: dict[str, IndicatorCoverage] = Field(alias="indicatorCoverage")
    fraud_flags: list[dict] = Field(default_factory=list, alias="fraudFlags")
    status_phase: Literal["aanmelding", "intake", "portfolio", "assessment", "certificering"] = Field(
        alias="statusPhase"
    )
    created_at: datetime | None = Field(default=None, alias="createdAt")
