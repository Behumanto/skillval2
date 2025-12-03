from datetime import datetime
from typing import Any

from app.db.mongo import get_database


async def audit_log(
    *,
    tenant_id: str,
    actor_id: str,
    action: str,
    resource_type: str,
    resource_id: str,
    metadata: dict[str, Any] | None = None,
    ai_assist: bool = False,
    actor_roles: list[str] | None = None,
    ip_address: str | None = None,
    user_agent: str | None = None,
) -> None:
    db = get_database()
    payload = {
        "tenantId": tenant_id,
        "actorId": actor_id,
        "actorRoles": actor_roles or [],
        "action": action,
        "resourceType": resource_type,
        "resourceId": resource_id,
        "metadata": metadata or {},
        "aiAssist": ai_assist,
        "ipAddress": ip_address,
        "userAgent": user_agent,
        "createdAt": datetime.utcnow(),
    }
    await db["auditLogs"].insert_one(payload)
