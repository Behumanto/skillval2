from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection, AsyncIOMotorDatabase

from app.core.config import get_settings

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        settings = get_settings()
        _client = AsyncIOMotorClient(settings.mongo_uri)
    return _client


def get_database() -> AsyncIOMotorDatabase:
    client = get_client()
    settings = get_settings()
    return client[settings.mongo_db_name]


def get_collection(collection_name: str) -> AsyncIOMotorCollection:
    db = get_database()
    return db[collection_name]
