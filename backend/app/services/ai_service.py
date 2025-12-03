import json
from typing import Any, Optional

import httpx
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.core.config import get_settings
from app.db.mongo import get_database


class AIService:
    """Bundles LLM calls that helpen kandidaten en assessoren focussen op inhoud."""

    def __init__(self, db: Optional[AsyncIOMotorDatabase] = None) -> None:
        self.db = db or get_database()
        self.settings = get_settings()

    async def analyze_evidence(self, text: str, candidate_id: str) -> dict[str, Any]:
        """Labels bewijsstuk met indicatoren zodat dekking/hiaten zichtbaar blijven."""
        prompt = (
            "Je bent een EVC-assistent voor SkillVal. "
            "Ontleed de tekst, koppel relevante indicatorId's (gebruik bestaande ID's) "
            "en geef een kans dat dit AI-gegenereerd is (0-1). "
            "Lever JSON met 'mappedIndicators', 'aiGeneratedLikelihood', 'fraudFlags'."
        )
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": prompt},
                {"role": "user", "content": text},
            ],
            "response_format": {"type": "json_object"},
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.settings.openai_api_key}",
                        "Content-Type": "application/json",
                    },
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
                return json.loads(data["choices"][0]["message"]["content"])
        except Exception:
            # Fallback ensures MVP blijft draaien wanneer LLM niet beschikbaar is.
            return {
                "mappedIndicators": [],
                "aiGeneratedLikelihood": 0.5,
                "fraudFlags": [
                    {
                        "type": "llm_unavailable",
                        "message": "LLM-response niet beschikbaar; handmatige controle noodzakelijk.",
                        "score": 0.2,
                    }
                ],
            }

    async def generate_assessment_report(self, candidate_id: str) -> str:
        """Combineert portfolio + observaties tot concept-rapport per deskundigheidsgebied."""
        candidate_lookup: Any = candidate_id
        try:
            candidate_lookup = ObjectId(candidate_id)
        except Exception:
            candidate_lookup = candidate_id

        candidate_doc = await self.db["candidates"].find_one({"_id": candidate_lookup})
        traject_doc: dict[str, Any] | None = None
        if candidate_doc and candidate_doc.get("trajectId"):
            traject_id = candidate_doc["trajectId"]
            lookup_id = traject_id
            try:
                lookup_id = ObjectId(traject_id)
            except Exception:
                lookup_id = traject_id
            traject_doc = await self.db["trajects"].find_one({"_id": lookup_id})
            candidate_doc["traject"] = traject_doc

        evidence_cursor = self.db["evidenceItems"].find({"candidateId": candidate_id})
        evidence = [doc async for doc in evidence_cursor]

        assessment_cursor = self.db["assessments"].find({"candidateId": candidate_id})
        assessments = [doc async for doc in assessment_cursor]

        summary = {
            "candidate": candidate_doc,
            "traject": traject_doc,
            "evidence": evidence,
            "assessments": assessments,
        }

        prompt = (
            "Je bent assessor-assistent. Genereer een conceptverslag per deskundigheidsgebied, "
            "vul indicatoren met samenvatting en advies. Return enkel tekst."
        )
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.settings.openai_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": "gpt-4o-mini",
                        "messages": [
                            {"role": "system", "content": prompt},
                            {"role": "user", "content": json.dumps(summary, default=str)},
                        ],
                    },
                )
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except Exception:
            return (
                "Concept-rapport placeholder. Verzamel observaties en evidence handmatig "
                "totdat de AI-service beschikbaar is."
            )


ai_service = AIService()
