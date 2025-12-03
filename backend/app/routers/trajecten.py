"""API endpoints voor trajecten (competentieprofielen)."""
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.mongo import get_database
from app.models.traject import Traject, Domain

router = APIRouter(prefix="/trajecten", tags=["trajecten"])


@router.get("/{traject_id}", response_model=Traject)
async def get_traject(
    traject_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Haal een specifiek traject op met alle deskundigheidsgebieden en indicatoren."""
    from bson import ObjectId
    from bson.errors import InvalidId

    try:
        traject_oid = ObjectId(traject_id)
    except InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid traject ID format"
        )

    traject = await db.trajecten.find_one({"_id": traject_oid})

    if not traject:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Traject with ID {traject_id} not found"
        )

    # Convert ObjectId to string for JSON serialization
    traject["_id"] = str(traject["_id"])
    return traject


@router.get("/domain/{domain}", response_model=list[Traject])
async def get_trajecten_by_domain(
    domain: Domain,
    tenant_id: str = "skillval-demo",
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Haal alle trajecten op voor een specifiek domein (bijv. 'jeugdzorg' of 'autotechniek')."""
    cursor = db.trajecten.find({
        "tenantId": tenant_id,
        "domain": domain.value
    })

    trajecten = await cursor.to_list(length=100)

    if not trajecten:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No trajecten found for domain '{domain}'"
        )

    # Convert ObjectId to string for JSON serialization
    for traject in trajecten:
        traject["_id"] = str(traject["_id"])

    return trajecten


@router.get("/", response_model=list[Traject])
async def get_all_trajecten(
    tenant_id: str = "skillval-demo",
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Haal alle trajecten op voor een tenant."""
    cursor = db.trajecten.find({"tenantId": tenant_id})
    trajecten = await cursor.to_list(length=100)

    # Convert ObjectId to string for JSON serialization
    for traject in trajecten:
        traject["_id"] = str(traject["_id"])

    return trajecten
