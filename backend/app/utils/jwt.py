from datetime import datetime, timedelta, timezone
from typing import Any, Dict

import jwt

from app.core.config import get_settings


def create_access_token(*, user_id: str, role: str, tenant_id: str) -> str:
    """Signs a JWT so frontend dashboards know wie de kandidaat/assessor is."""
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_exp_minutes)
    payload: Dict[str, Any] = {
        "sub": user_id,
        "role": role,
        "tenantId": tenant_id,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict[str, Any]:
    """Validates JWT zodat elke API-call tenant en rol respecteert."""
    settings = get_settings()
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
