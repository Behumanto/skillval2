# FastAPI Structuur

```
backend/
├─ app/
│  ├─ main.py (FastAPI setup + CORS + router include)
│  ├─ core/config.py (Pydantic settings + dotenv voor APP_ENV=local)
│  ├─ db/mongo.py (Motor client singleton)
│  ├─ models/ (Pydantic representaties voor Mongo collecties)
│  │  ├─ user.py · candidate.py · traject.py · evidence.py · assessment.py · report.py · audit.py
│  ├─ routers/
│  │  ├─ auth.py (/auth/login, /auth/me)
│  │  ├─ candidates.py (multipart evidence upload + AI analyse)
│  │  ├─ assessments.py (conceptrapport generatie)
│  │  ├─ status.py (indicator-coverage endpoint)
│  │  └─ ws_live.py (WebSocket voor live assessor notities)
│  ├─ services/
│  │  ├─ auth_service.py (bcrypt + JWT)
│  │  ├─ ai_service.py (OpenAI prompts voor indicatoren/rapport)
│  │  ├─ stt_service.py (Deepgram transcripties)
│  │  ├─ tts_service.py (stub voor toekomstige TTS)
│  │  ├─ fraud_service.py (AI-likelihood scoring)
│  │  └─ audit_service.py (audit logging helper)
│  └─ utils/jwt.py (create/decode tokens)
├─ pyproject.toml (FastAPI, motor, httpx, python-multipart)
├─ setup.cfg
└─ Dockerfile
```

- `AIService` kiest provider o.b.v. `.env` waarden.
- Audit logging schrijft naar `auditLogs` collectie.
- WebSocket-channel `/ws/assessor/live/{candidateId}` voor real-time notities en streaming (mock ack voorlopig).
