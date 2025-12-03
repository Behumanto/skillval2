import json
from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.db.mongo import get_database
from app.services.audit_service import audit_service
from app.utils.jwt import decode_token

router = APIRouter()


@router.websocket("/ws/assessor/live/{candidate_id}")
async def assessor_live(websocket: WebSocket, candidate_id: str) -> None:
    """Laat assessoren live notities sturen tijdens praktijkobservaties."""
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4401)
        return

    try:
        payload = decode_token(token)
    except Exception:
        await websocket.close(code=4401)
        return

    if payload.get("role") not in {"assessor", "admin"}:
        await websocket.close(code=4403)
        return

    try:
        candidate_oid = ObjectId(candidate_id)
    except InvalidId:
        await websocket.close(code=4400)
        return

    db = get_database()
    candidate = await db["candidates"].find_one({"_id": candidate_oid})
    if not candidate or candidate["tenantId"] != payload.get("tenantId"):
        await websocket.close(code=4403)
        return

    await websocket.accept()

    try:
        while True:
            message = await websocket.receive_text()
            note = {
                "text": message,
                "timestamp": datetime.utcnow().isoformat(),
            }
            await db["assessments"].update_one(
                {
                    "tenantId": payload["tenantId"],
                    "candidateId": candidate_id,
                    "assessorId": payload["sub"],
                },
                {
                    "$setOnInsert": {
                        "sessionMeta": {},
                        "notes": [],
                        "mediaIds": [],
                        "draftReportText": None,
                        "createdAt": datetime.utcnow(),
                    },
                    "$push": {"notes": note},
                },
                upsert=True,
            )
            await audit_service.log(
                tenant_id=payload["tenantId"],
                user_id=payload["sub"],
                action="assessment_live_note",
                target_type="candidate",
                target_id=candidate_id,
            )
            await websocket.send_text(json.dumps({"status": "ok", "note": note}))
    except WebSocketDisconnect:
        await websocket.close()
