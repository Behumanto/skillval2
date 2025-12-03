class TTSService:
    """Voorziet feedback richting kandidaat (bijv. auditieve prompts) - later Deepgram TTS."""

    async def speak(self, text: str) -> bytes:
        """Maakt audio van text zodat kandidaten instructies kunnen beluisteren (stub)."""
        raise NotImplementedError("Deepgram TTS integratie wordt later toegevoegd.")


tts_service = TTSService()
