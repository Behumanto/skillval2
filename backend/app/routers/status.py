from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, status

from app.db.mongo import get_database
from app.routers.auth import get_current_user

router = APIRouter(prefix="/candidates", tags=["status"])


@router.get("/{candidate_id}/status")
async def candidate_status(candidate_id: str, user=Depends(get_current_user)):
    """Toont per deskundigheidsgebied voortgang + fraudealerts voor begeleider en kandidaat."""
    try:
        candidate_oid = ObjectId(candidate_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid candidate id")

    db = get_database()
    candidate = await db["candidates"].find_one({"_id": candidate_oid})
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")

    if candidate["tenantId"] != user["tenantId"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cross-tenant access denied")

    return {
        "indicatorCoverage": candidate.get("indicatorCoverage", {}),
        "fraudFlags": candidate.get("fraudFlags", []),
        "statusPhase": candidate.get("statusPhase"),
    }
