from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import assessments, auth, candidates, evidence, status, trajecten, ws_live

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth.router)
app.include_router(candidates.router)
app.include_router(assessments.router)
app.include_router(trajecten.router)
app.include_router(evidence.router)
app.include_router(status.router)
app.include_router(ws_live.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "SkillVal API", "environment": settings.app_env}
