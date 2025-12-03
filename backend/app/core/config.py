import os
from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration holder ensuring secure multi-tenant operation for SkillVal."""

    model_config = SettingsConfigDict(extra="allow")

    app_name: str = "SkillVal API"
    app_env: Literal["local", "dev", "prod"] = "local"

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_exp_minutes: int = 60

    mongo_uri: str = "mongodb://mongo:27017/skillval"
    mongo_db_name: str = "skillval"

    deepgram_api_key: str
    openai_api_key: str

    frontend_origin: str = "http://localhost:3000"


def _load_dotenv_if_local() -> None:
    if os.getenv("APP_ENV", "local") != "local":
        return
    from dotenv import load_dotenv

    env_path = Path(__file__).resolve().parents[2] / ".env"
    if env_path.exists():
        load_dotenv(env_path)


@lru_cache
def get_settings() -> Settings:
    _load_dotenv_if_local()
    return Settings()  # type: ignore[call-arg]
