import httpx

from app.core.config import get_settings


class STTService:
    """Zorgt dat praktijk-audio snel transcript wordt voor indicator-mapping."""

    def __init__(self) -> None:
        self.settings = get_settings()

    async def transcribe_audio(self, file_bytes: bytes, mimetype: str = "audio/mpeg") -> dict:
        """Stuurt audio naar Deepgram zodat assessor-notities direct bruikbaar zijn."""
        url = "https://api.deepgram.com/v1/listen"
        headers = {
            "Authorization": f"Token {self.settings.deepgram_api_key}",
            "Content-Type": mimetype,
        }
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    url,
                    headers=headers,
                    content=file_bytes,
                    params={"smart_format": "true"},
                )
                response.raise_for_status()
                return response.json()
        except Exception:
            return {"transcript": "Transcriptie niet beschikbaar; voer handmatige notities in."}


stt_service = STTService()
