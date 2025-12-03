#!/usr/bin/env python3
"""
Seed script voor een demo candidate voor testing.
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings


async def seed_demo_candidate():
    """Seed een demo candidate in MongoDB."""

    settings = get_settings()
    client = AsyncIOMotorClient(settings.mongo_uri)
    db = client[settings.mongo_db_name]

    print("🌱 Seeding demo candidate...")

    # Haal het jeugdzorg traject op
    traject = await db.trajecten.find_one({"domain": "jeugdzorg"})

    if not traject:
        print("❌ Jeugdzorg traject niet gevonden. Run eerst seed_jeugdzorg_traject.py")
        return

    # Maak indicator coverage object
    indicator_coverage = {}
    for dg in traject.get("deskundigheidsgebieden", []):
        for indicator in dg.get("indicators", []):
            indicator_coverage[indicator["id"]] = {
                "covered": False,
                "evidenceIds": []
            }

    candidate_data = {
        "tenantId": "skillval-demo",
        "userId": "demo-user-123",
        "trajectId": str(traject["_id"]),
        "indicatorCoverage": indicator_coverage,
        "fraudFlags": [],
        "statusPhase": "portfolio",
        "createdAt": None
    }

    # Check if candidate already exists
    existing = await db.candidates.find_one({"userId": candidate_data["userId"]})

    if existing:
        print(f"⚠️  Demo candidate bestaat al met ID: {existing['_id']}")
        candidate_id = str(existing["_id"])
    else:
        print(f"✨ Nieuwe demo candidate aanmaken")
        result = await db.candidates.insert_one(candidate_data)
        candidate_id = str(result.inserted_id)
        print(f"✅ Candidate aangemaakt met ID: {candidate_id}")

    print(f"\n📊 Overzicht:")
    print(f"   - Candidate ID: {candidate_id}")
    print(f"   - Traject: {traject['name']}")
    print(f"   - Indicatoren: {len(indicator_coverage)}")
    print(f"   - Status fase: portfolio")

    client.close()
    return candidate_id


if __name__ == "__main__":
    asyncio.run(seed_demo_candidate())
