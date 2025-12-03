from datetime import datetime

from pydantic import BaseModel, Field


class AuditLog(BaseModel):
    """Traceability log required for AVG-proof EVC dossiers."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    user_id: str = Field(alias="userId")
    action: str
    target_type: str = Field(alias="targetType")
    target_id: str = Field(alias="targetId")
    created_at: datetime = Field(alias="createdAt")
