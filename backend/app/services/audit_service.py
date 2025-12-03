from datetime import datetime
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.mongo import get_database


class AuditService:
    """Writes immutable audit trail to explain elke stap richting certificering."""

    def __init__(self, db: Optional[AsyncIOMotorDatabase] = None) -> None:
        self.db = db or get_database()

    async def log(
        self,
        *,
        tenant_id: str,
        user_id: str,
        action: str,
        target_type: str,
        target_id: str,
    ) -> None:
        await self.db["auditLogs"].insert_one(
            {
                "tenantId": tenant_id,
                "userId": user_id,
                "action": action,
                "targetType": target_type,
                "targetId": target_id,
                "createdAt": datetime.utcnow(),
            }
        )


audit_service = AuditService()
