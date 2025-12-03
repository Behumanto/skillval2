from datetime import datetime
from enum import Enum
from typing import Literal, Optional
from pydantic import BaseModel, Field


class VoertuigType(str, Enum):
    PERSONENAUTO = "personenauto"
    MOTOR = "motor"
    VRACHTWAGEN = "vrachtwagen"
    BUS = "bus"


class RijbewijsCategorie(str, Enum):
    AM = "AM"  # Bromfiets
    A1 = "A1"  # Lichte motor
    A2 = "A2"  # Middelzware motor
    A = "A"    # Zware motor
    B = "B"    # Personenauto
    BE = "BE"  # Personenauto met aanhanger
    C1 = "C1"  # Lichte vrachtwagen
    C1E = "C1E"  # Lichte vrachtwagen met aanhanger
    C = "C"    # Zware vrachtwagen
    CE = "CE"  # Zware vrachtwagen met aanhanger
    D1 = "D1"  # Kleine bus
    D1E = "D1E"  # Kleine bus met aanhanger
    D = "D"    # Grote bus
    DE = "DE"  # Grote bus met aanhanger


class RijervareingNiveau(str, Enum):
    BEGINNER = "beginner"  # 0-2 jaar
    ERVAREN = "ervaren"    # 2-10 jaar
    EXPERT = "expert"      # 10+ jaar


class MobiliteitIndicator(BaseModel):
    id: str
    label: str
    description: str
    voertuig_type: VoertuigType
    verplicht_voor_categorie: list[RijbewijsCategorie] = Field(default_factory=list)
    min_ervaring_niveau: RijervareingNiveau = RijervareingNiveau.BEGINNER


class MobiliteitCompetentie(BaseModel):
    id: str
    name: str
    description: str
    categorie: str  # bijv. "Voertuigbeheersing", "Verkeersinzicht", "Defensief rijden"
    voertuig_type: VoertuigType
    indicators: list[MobiliteitIndicator]


class RijbewijsInfo(BaseModel):
    categorie: RijbewijsCategorie
    datum_behaald: datetime
    geldig_tot: datetime
    land_van_afgifte: str = "Nederland"
    beperking_codes: list[str] = Field(default_factory=list)  # bijv. "01" voor bril/lenzen


class RijervareingInfo(BaseModel):
    voertuig_type: VoertuigType
    jaren_ervaring: int
    geschatte_kilometers_per_jaar: int
    laatste_incident_datum: Optional[datetime] = None
    aantal_incidenten_laatste_5_jaar: int = 0
    type_rijgedrag: list[str] = Field(default_factory=list)  # "stad", "snelweg", "buitengebied", "nacht", "slecht_weer"


class MobiliteitBewijsstuk(BaseModel):
    id: str
    type: Literal["rijbewijs", "rijervaring", "cursus_certificaat", "incident_rapport", "voertuig_kennis", "praktijkobservatie"]
    beschrijving: str
    upload_datum: datetime
    file_path: Optional[str] = None
    geverifieerd: bool = False
    geverifieerd_door: Optional[str] = None
    geverifieerd_datum: Optional[datetime] = None
    competentie_id: str
    indicator_ids: list[str]


class MobiliteitKandidaat(BaseModel):
    """EVC kandidaat specifiek voor mobiliteit/rijvaardigheid competenties."""
    
    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    user_id: str = Field(alias="userId")
    
    # Rijbewijs informatie
    rijbewijzen: list[RijbewijsInfo] = Field(default_factory=list)
    gewenste_categorie: RijbewijsCategorie  # Welke categorie de kandidaat wil behalen/upgraden
    
    # Ervaring
    rijervaring: list[RijervareingInfo] = Field(default_factory=list)
    
    # Competentie tracking  
    competentie_voortgang: dict[str, dict[str, bool]] = Field(default_factory=dict)  # competentie_id -> indicator_id -> completed
    bewijsstukken: list[MobiliteitBewijsstuk] = Field(default_factory=list)
    
    # Status
    status_phase: Literal["aanmelding", "theorie_voorbereiding", "praktijk_voorbereiding", "toetsing", "certificering"] = "aanmelding"
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        populate_by_name = True


class MobiliteitTraject(BaseModel):
    """Defines mobility competency structure for different vehicle categories."""
    
    id: str = Field(alias="_id")
    tenant_id: str = Field(alias="tenantId")
    name: str
    voertuig_type: VoertuigType
    rijbewijs_categorie: RijbewijsCategorie
    beschrijving: str
    competenties: list[MobiliteitCompetentie]
    
    # Voorwaarden
    minimum_leeftijd: int = 18
    medische_eisen: list[str] = Field(default_factory=list)
    voorvereiste_categorien: list[RijbewijsCategorie] = Field(default_factory=list)
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        populate_by_name = True