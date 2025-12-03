from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    """Represents a platform user across tenants (candidate, coach, assessor, admin)."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    email: EmailStr
    role: Literal["candidate", "coach", "assessor", "admin"]
    password_hash: str = Field(alias="passwordHash")
    created_at: datetime | None = Field(default=None, alias="createdAt")
