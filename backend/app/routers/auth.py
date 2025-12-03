from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel

from app.db.mongo import get_database
from app.utils.jwt import create_access_token, decode_token

router = APIRouter(prefix="/auth", tags=["auth"])


# ====== Pydantic models ======

class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    token: str
    role: str
    userId: str
    tenantId: str


class MeResponse(BaseModel):
    userId: str
    role: str
    tenantId: str


async def get_current_user(request: Request):
    """Extract JWT zodat we weten welke rol toegang vraagt tot het EVC-dossier."""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")

    token = auth_header.split(" ", 1)[1]
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    return payload


# ====== POST /auth/login ======

@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Login zodat kandidaat/begeleider/assessor hun trajectdashboard kan openen."
)
async def login(
    body: LoginRequest,
):
    """
    - Zoekt de user op email in MongoDB.
    - Vergelijkt plaintext wachtwoord met passwordHash (MVP).
    - Bouwt een JWT met userId/role/tenantId.
    - Stuurt token + metadata terug naar de frontend.
    """

    db = get_database()
    user = await db["users"].find_one({"email": body.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    # MVP: plain comparison (later bcrypt met passlib)
    if user.get("passwordHash") != body.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    user_id = str(user["_id"])
    role = user["role"]
    tenant_id = user["tenantId"]

    token = create_access_token(
        user_id=user_id,
        role=role,
        tenant_id=tenant_id,
    )

    return LoginResponse(
        token=token,
        role=role,
        userId=user_id,
        tenantId=tenant_id,
    )


# ====== GET /auth/me ======

@router.get(
    "/me",
    response_model=MeResponse,
    summary="Me"
)
async def me(
    token: str,
):
    """
    Debug endpoint. Je kunt in de browser of Swagger doen:
    GET /auth/me?token=<JWT>
    en dan geeft hij terug wie je bent.
    """

    try:
        decoded = decode_token(token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    return MeResponse(
        userId=decoded.get("sub", ""),
        role=decoded.get("role", ""),
        tenantId=decoded.get("tenantId", ""),
    )
