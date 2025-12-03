from pydantic import BaseModel, Field
from enum import Enum


class Domain(str, Enum):
    zorg = "zorg"
    autotechniek = "autotechniek"
    jeugdzorg = "jeugdzorg"


class IndicatorDefinition(BaseModel):
    id: str
    label: str
    description: str


class CompetencyArea(BaseModel):
    id: str
    name: str
    indicators: list[IndicatorDefinition]


class Traject(BaseModel):
    """Defines competency/indicator structure for each tenant's route."""

    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    name: str
    domain: Domain
    deskundigheidsgebieden: list[CompetencyArea]
