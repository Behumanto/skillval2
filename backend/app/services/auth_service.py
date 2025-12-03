from typing import Optional

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from passlib.context import CryptContext

from app.db.mongo import get_database
from app.utils.jwt import create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Authenticates users zodat trajectdata enkel door juiste rol toegankelijk is."""

    def __init__(self, db: Optional[AsyncIOMotorDatabase] = None) -> None:
        self.db = db or get_database()

    async def authenticate(self, email: str, password: str) -> str:
        user = await self.db["users"].find_one({"email": email})
        if not user or not pwd_context.verify(password, user.get("passwordHash", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )

        return create_access_token(
            user_id=str(user["_id"]),
            role=user["role"],
            tenant_id=user["tenantId"],
        )


auth_service = AuthService()
