#!/usr/bin/env python3
"""
Seed script voor SKJ (Sociaal-pedagogisch werker Jeugdzorg) deskundigheidsgebieden.
Gebaseerd op de Beroepscompetentieprofiel SPH Jeugdzorg HBO.

Run dit script om de jeugdzorg trajecten + indicatoren in MongoDB te laden.
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import get_settings


async def seed_jeugdzorg_traject():
    """Seed SKJ deskundigheidsgebieden en indicatoren in MongoDB."""

    settings = get_settings()

    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.mongo_uri)
    db = client[settings.mongo_db_name]

    print("🌱 Seeding SKJ Jeugdzorg traject...")

    # Definieer de 5 deskundigheidsgebieden met hun indicatoren
    traject_data = {
        "tenantId": "skillval-demo",
        "name": "SKJ - Sociaal-pedagogisch werker Jeugdzorg",
        "domain": "jeugdzorg",
        "deskundigheidsgebieden": [
            {
                "id": "dg1",
                "name": "Ondersteunen bij regievoeren",
                "indicators": [
                    {
                        "id": "dg1-i1",
                        "label": "Signaleren van ontwikkelingsbehoeften",
                        "description": "Signaleert ontwikkelingsbehoeften van de jeugdige in de context van diens omgeving."
                    },
                    {
                        "id": "dg1-i2",
                        "label": "Beoordelen veiligheid jeugdige",
                        "description": "Beoordeelt de veiligheid van de jeugdige en neemt passende actie bij onveilige situaties."
                    },
                    {
                        "id": "dg1-i3",
                        "label": "Monitoren voortgang en veiligheid",
                        "description": "Monitort de voortgang van de ontwikkeling en de veiligheid van de jeugdige."
                    },
                    {
                        "id": "dg1-i4",
                        "label": "Stimuleren van regie",
                        "description": "Stimuleert de jeugdige en het gezin om regie te voeren over hun eigen leven."
                    },
                    {
                        "id": "dg1-i5",
                        "label": "Ondersteunen bij zelfregie",
                        "description": "Ondersteunt de jeugdige bij het ontwikkelen van zelfregie en zelfstandigheid."
                    }
                ]
            },
            {
                "id": "dg2",
                "name": "Samenwerken met jeugdige en gezin",
                "indicators": [
                    {
                        "id": "dg2-i1",
                        "label": "Opbouwen vertrouwensrelatie",
                        "description": "Bouwt een vertrouwensrelatie op met de jeugdige en het gezin."
                    },
                    {
                        "id": "dg2-i2",
                        "label": "Afstemmen met jeugdige en gezin",
                        "description": "Stemt de ondersteuning af op de behoeften en mogelijkheden van de jeugdige en het gezin."
                    },
                    {
                        "id": "dg2-i3",
                        "label": "Betrekken van gezin bij ontwikkeling",
                        "description": "Betrekt het gezin actief bij de ontwikkeling en begeleiding van de jeugdige."
                    },
                    {
                        "id": "dg2-i4",
                        "label": "Omgaan met complexe gezinsdynamiek",
                        "description": "Gaat adequaat om met complexe gezinsdynamiek en spanningen binnen het gezinssysteem."
                    },
                    {
                        "id": "dg2-i5",
                        "label": "Empoweren van gezin",
                        "description": "Versterkt de eigen kracht en competenties van jeugdige en gezin."
                    }
                ]
            },
            {
                "id": "dg3",
                "name": "Interdisciplinair samenwerken",
                "indicators": [
                    {
                        "id": "dg3-i1",
                        "label": "Samenwerken met ketenpartners",
                        "description": "Werkt effectief samen met andere professionals in de jeugdzorgketen (scholen, GGZ, wijkteams)."
                    },
                    {
                        "id": "dg3-i2",
                        "label": "Delen van informatie",
                        "description": "Deelt relevante informatie met professionals, met respect voor privacy en beroepsgeheim."
                    },
                    {
                        "id": "dg3-i3",
                        "label": "Signaleren en doorverwijzen",
                        "description": "Signaleert wanneer gespecialiseerde hulp nodig is en verwijst door naar de juiste instanties."
                    },
                    {
                        "id": "dg3-i4",
                        "label": "Coördineren van zorg",
                        "description": "Coördineert de zorg rond de jeugdige in samenwerking met andere betrokken partijen."
                    },
                    {
                        "id": "dg3-i5",
                        "label": "Participeren in multidisciplinair overleg",
                        "description": "Neemt actief deel aan multidisciplinair overleg en draagt bij aan gezamenlijke besluitvorming."
                    }
                ]
            },
            {
                "id": "dg4",
                "name": "Methodisch en evidence-based werken",
                "indicators": [
                    {
                        "id": "dg4-i1",
                        "label": "Toepassen van methodieken",
                        "description": "Past evidence-based methodieken toe in de begeleiding van jeugdigen (bijv. MDFT, FFT, PMT)."
                    },
                    {
                        "id": "dg4-i2",
                        "label": "Formuleren van doelen",
                        "description": "Formuleert samen met jeugdige en gezin SMART-doelen voor de ontwikkeling."
                    },
                    {
                        "id": "dg4-i3",
                        "label": "Evalueren van interventies",
                        "description": "Evalueert systematisch de effectiviteit van interventies en past deze aan waar nodig."
                    },
                    {
                        "id": "dg4-i4",
                        "label": "Documenteren van werkprocessen",
                        "description": "Documenteert werkprocessen en voortgang volgens professionele en wettelijke standaarden."
                    },
                    {
                        "id": "dg4-i5",
                        "label": "Reflecteren op eigen handelen",
                        "description": "Reflecteert systematisch op eigen handelen en leert van ervaringen."
                    }
                ]
            },
            {
                "id": "dg5",
                "name": "Professioneel en ethisch handelen",
                "indicators": [
                    {
                        "id": "dg5-i1",
                        "label": "Hanteren beroepscode",
                        "description": "Handelt volgens de beroepscode en ethische richtlijnen voor jeugdzorgwerkers."
                    },
                    {
                        "id": "dg5-i2",
                        "label": "Omgaan met dilemma's",
                        "description": "Herkent ethische dilemma's en handelt hier professioneel mee volgens de werkelijke situatie."
                    },
                    {
                        "id": "dg5-i3",
                        "label": "Waarborgen privacy en vertrouwelijkheid",
                        "description": "Waarborgt de privacy en vertrouwelijkheid van de jeugdige en het gezin."
                    },
                    {
                        "id": "dg5-i4",
                        "label": "Professionele grenzen bewaken",
                        "description": "Bewaakt professionele grenzen in de relatie met jeugdige en gezin."
                    },
                    {
                        "id": "dg5-i5",
                        "label": "Zorgen voor eigen professionaliteit",
                        "description": "Zorgt voor eigen professionele ontwikkeling en werkbaar werkklimaat (intervisie, supervisie)."
                    }
                ]
            }
        ]
    }

    # Check if traject already exists
    existing = await db.trajecten.find_one({
        "tenantId": traject_data["tenantId"],
        "domain": traject_data["domain"]
    })

    if existing:
        print(f"⚠️  Traject '{traject_data['name']}' bestaat al. Updating...")
        result = await db.trajecten.replace_one(
            {"_id": existing["_id"]},
            traject_data
        )
        traject_id = str(existing["_id"])
        print(f"✅ Traject updated met ID: {traject_id}")
    else:
        print(f"✨ Nieuw traject aanmaken: '{traject_data['name']}'")
        result = await db.trajecten.insert_one(traject_data)
        traject_id = str(result.inserted_id)
        print(f"✅ Traject aangemaakt met ID: {traject_id}")

    # Toon overzicht
    total_indicators = sum(len(dg["indicators"]) for dg in traject_data["deskundigheidsgebieden"])
    print(f"\n📊 Overzicht:")
    print(f"   - Deskundigheidsgebieden: {len(traject_data['deskundigheidsgebieden'])}")
    print(f"   - Totaal indicatoren: {total_indicators}")

    for dg in traject_data["deskundigheidsgebieden"]:
        print(f"   - {dg['name']}: {len(dg['indicators'])} indicatoren")

    print(f"\n✅ Seed completed! Traject ID: {traject_id}")

    client.close()
    return traject_id


if __name__ == "__main__":
    asyncio.run(seed_jeugdzorg_traject())
