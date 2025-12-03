from typing import Any

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    tenant_id: str = Field(..., alias="tenantId")
    text: str
    metadata: dict[str, Any] = {}


class FollowupRequest(BaseModel):
    tenant_id: str = Field(..., alias="tenantId")
    candidate_context: dict[str, Any] = Field(default_factory=dict, alias="candidateContext")


class FraudCheckRequest(BaseModel):
    tenant_id: str = Field(..., alias="tenantId")
    evidence: dict[str, Any] = {}
