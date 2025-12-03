import json
from typing import Any

import httpx

from app.core.config import get_settings


class FraudService:
    """Signaleert AI-gegenereerde teksten zodat begeleiders gericht kunnen checken."""

    def __init__(self) -> None:
        self.settings = get_settings()

    async def score_text_for_ai_origin(self, text: str) -> dict[str, Any]:
        """Vraagt LLM om waarschijnlijkheid AI-tekst te scoren (0-1) met toelichting."""
        prompt = (
            "Beoordeel of de tekst vermoedelijk AI-gegenereerd is. "
            "Geef json met 'aiGeneratedLikelihood' (0-1) en 'fraudFlags'."
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
            async with httpx.AsyncClient(timeout=20.0) as client:
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
            return {
                "aiGeneratedLikelihood": 0.5,
                "fraudFlags": [
                    {
                        "type": "analysis_unavailable",
                        "message": "AI-herkomst analyse faalde; voer manuele beoordeling uit.",
                        "score": 0.5,
                    }
                ],
            }


fraud_service = FraudService()
