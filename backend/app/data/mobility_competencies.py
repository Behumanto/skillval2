"""
EVC Mobiliteit competenties voor automotive techniek - personenwagens en bedrijfswagens
Gebaseerd op Nederlandse EVC procedures voor autotechnische beroepen
"""

from backend.app.models.mobility import (
    MobiliteitCompetentie, 
    MobiliteitIndicator, 
    VoertuigType, 
    RijbewijsCategorie,
    RijervareingNiveau,
    MobiliteitTraject
)

# Competentie 1: APK Keuring en Controle
apk_keuring_indicators = [
    MobiliteitIndicator(
        id="apk_01",
        label="Visuele inspectie voertuig",
        description="Kan systematisch visuele controle uitvoeren van carrosserie, verlichting en veiligheidsvoorzieningen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="apk_02", 
        label="Remmen testen",
        description="Kan remwerking testen en beoordelen conform APK-eisen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="apk_03",
        label="Uitlaat- en emissiecontrole",
        description="Kan uitlaatgassen meten en beoordelen volgens milieueisen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="apk_04",
        label="Stuur- en ophangsysteem",
        description="Kan stuurinrichting en wielophanging controleren op speling en slijtage",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="apk_05",
        label="Banden en velgen",
        description="Kan banden controleren op profieldiepte, beschadigingen en juiste spanning",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="apk_06",
        label="APK-rapport opstellen",
        description="Kan correcte APK-rapporten opstellen met bevindingen en aanbevelingen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    )
]

# Competentie 2: Standaard Onderhoud
onderhoud_indicators = [
    MobiliteitIndicator(
        id="oh_01",
        label="Motorolie verversen",
        description="Kan motorolie en filter verversen volgens fabrieksspecificaties",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="oh_02",
        label="Vloeistofpeil controleren",
        description="Kan alle vloeistofniveaus controleren en bijvullen (rem, koppeling, koeling, ruitenwasser)",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="oh_03",
        label="Luchtfilter vervangen",
        description="Kan lucht- en brandstoffilters vervangen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="oh_04",
        label="Bougies vervangen",
        description="Kan ontstekingssysteem onderhouden (bougies, bobines)",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="oh_05",
        label="Distributieonderhoud",
        description="Kan distributieriem en spanning controleren en vervangen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="oh_06",
        label="Onderhoudsschema plannen",
        description="Kan onderhoudsschema opstellen volgens fabrieksvoorschriften",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    )
]

# Competentie 3: Diagnose en Reparaties
diagnose_reparatie_indicators = [
    MobiliteitIndicator(
        id="dr_01",
        label="OBD-diagnose uitvoeren",
        description="Kan diagnoseapparatuur gebruiken om foutcodes uit te lezen en te interpreteren",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="dr_02",
        label="Elektrische systemen testen",
        description="Kan elektrische circuits en componenten testen en repareren",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="dr_03",
        label="Motorproblemen diagnosticeren",
        description="Kan motorproblemen identificeren en repareren (startproblemen, trillingen, geluid)",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="dr_04",
        label="Remsysteem onderhouden",
        description="Kan remschijven, remblokken en remvloeistof vervangen en onderhouden",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="dr_05",
        label="Airconditioning servicen",
        description="Kan airconditioningsysteem controleren, bijvullen en repareren",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="dr_06",
        label="Complexe reparaties plannen",
        description="Kan complexe reparaties plannen en uitvoeren (motor, transmissie)",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.EXPERT
    )
]

# Competentie 4: Onderdelen en Montage
onderdelen_montage_indicators = [
    MobiliteitIndicator(
        id="om_01",
        label="Onderdelen identificeren",
        description="Kan voertuigonderdelen correct identificeren en bestellen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="om_02",
        label="Demontage technieken",
        description="Kan onderdelen vakkundig demonteren zonder beschadiging",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="om_03",
        label="Montage en afstelling",
        description="Kan onderdelen correct monteren en afstellen volgens specificaties",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="om_04",
        label="Koppeling vervangen",
        description="Kan koppeling en versnellingsbak onderhouden en repareren",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="om_05",
        label="Wielophanging afstellen",
        description="Kan wielophanging en uitlijning controleren en afstellen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    )
]

# Competentie 5: Professioneel Handelen
professioneel_handelen_indicators = [
    MobiliteitIndicator(
        id="ph_01",
        label="Veiligheid en milieu",
        description="Kent en past veiligheids- en milieuregels toe in de werkplaats",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="ph_02",
        label="Klantcommunicatie",
        description="Kan helder communiceren met klanten over reparaties en kosten",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="ph_03",
        label="Werkplanning",
        description="Kan werkzaamheden efficiënt plannen en prioriteren",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.ERVAREN
    ),
    MobiliteitIndicator(
        id="ph_04",
        label="Kwaliteitscontrole",
        description="Voert kwaliteitscontroles uit en test reparaties grondig",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    ),
    MobiliteitIndicator(
        id="ph_05",
        label="Administratie en rapportage",
        description="Kan werkorders en rapportages correct invullen",
        voertuig_type=VoertuigType.PERSONENAUTO,
        verplicht_voor_categorie=[],
        min_ervaring_niveau=RijervareingNiveau.BEGINNER
    )
]

# Samengestelde competenties voor EVC Automotive Techniek
AUTOMOTIVE_COMPETENTIES = [
    MobiliteitCompetentie(
        id="comp_apk_keuring",
        name="APK Keuring en Controle",
        description="Uitvoeren van APK-keuringen en veiligheidscontroles",
        categorie="Keuring en Inspectie",
        voertuig_type=VoertuigType.PERSONENAUTO,
        indicators=apk_keuring_indicators
    ),
    MobiliteitCompetentie(
        id="comp_onderhoud", 
        name="Standaard Onderhoud",
        description="Preventief onderhoud en standaard servicebeurten",
        categorie="Onderhoud en Service",
        voertuig_type=VoertuigType.PERSONENAUTO,
        indicators=onderhoud_indicators
    ),
    MobiliteitCompetentie(
        id="comp_diagnose",
        name="Diagnose en Reparaties", 
        description="Storingen diagnosticeren en reparaties uitvoeren",
        categorie="Diagnose en Reparatie",
        voertuig_type=VoertuigType.PERSONENAUTO,
        indicators=diagnose_reparatie_indicators
    ),
    MobiliteitCompetentie(
        id="comp_montage",
        name="Onderdelen en Montage",
        description="Onderdelen (de)monteren, vervangen en afstellen", 
        categorie="Montage en Demontage",
        voertuig_type=VoertuigType.PERSONENAUTO,
        indicators=onderdelen_montage_indicators
    ),
    MobiliteitCompetentie(
        id="comp_professioneel",
        name="Professioneel Handelen",
        description="Professionele werkhouding en communicatie",
        categorie="Professionaliteit",
        voertuig_type=VoertuigType.PERSONENAUTO,
        indicators=professioneel_handelen_indicators
    )
]

# Complete traject voor EVC Automotive Techniek
AUTOMOTIVE_TECHNIEK_TRAJECT = MobiliteitTraject(
    id="traject_automotive_techniek",
    tenantId="evc_mobiliteit_nederland", 
    name="EVC Automotive Techniek - Personenwagens en Bedrijfswagens",
    voertuig_type=VoertuigType.PERSONENAUTO,
    rijbewijs_categorie=RijbewijsCategorie.B,
    beschrijving="Erkenning van Verworven Competenties voor automotive technische beroepen. Voor professionals met ervaring in het onderhoud en reparatie van personenwagens en bedrijfswagens.",
    competenties=AUTOMOTIVE_COMPETENTIES,
    minimum_leeftijd=18,
    medische_eisen=[
        "Geen fysieke beperkingen die het veilig werken in de werkplaats belemmeren", 
        "Voldoende gezichtsvermogen voor nauwkeurig werk",
        "Geen allergieën voor gebruikelijke werkplaatsmaterialen"
    ],
    voorvereiste_categorien=[]  # Geen rijbewijs vereisten
)