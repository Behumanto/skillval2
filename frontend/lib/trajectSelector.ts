import { TrajectType, DecodedToken } from "./auth";

// Import traject data
import { AUTOMOTIVE_COMPETENTIES, AUTOMOTIVE_TECHNIEK_TRAJECT } from "../../backend/app/data/mobility_competencies";

export type TrajectData = {
  id: string;
  name: string;
  beschrijving: string;
  competenties: any[];
  type: TrajectType;
  icon: string;
  medische_eisen?: string[];
};

// Jeugdzorg traject (bestaande data)
const JEUGDZORG_TRAJECT: TrajectData = {
  id: "traject_jeugdzorg",
  name: "EVC Jeugdzorg",
  beschrijving: "Erkenning van Verworven Competenties voor jeugdzorgprofessionals. Voor professionals met ervaring in de jeugdzorg die hun competenties willen aantonen.",
  type: "jeugdzorg",
  icon: "👥",
  competenties: [
    {
      id: "comp_methodisch_handelen",
      name: "Methodisch handelen",
      description: "Systematisch en evidence-based werken",
      categorie: "Professionele vaardigheden",
      indicators: [
        {
          id: "mh_01",
          label: "Methodisch werken",
          description: "Kan systematisch en methodisch werken volgens professionele standaarden",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "mh_02",
          label: "Evidence-based werken",
          description: "Baseert interventies op bewezen effectieve methoden en onderzoek",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_communicatie",
      name: "Communicatie en samenwerking",
      description: "Effectief communiceren met cliënten en collega's",
      categorie: "Communicatieve vaardigheden",
      indicators: [
        {
          id: "comm_01",
          label: "Gesprekstechnieken",
          description: "Beheerst professionele gesprekstechnieken aangepast aan de doelgroep",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "comm_02",
          label: "Interdisciplinaire samenwerking",
          description: "Werkt effectief samen met andere disciplines en instanties",
          min_ervaring_niveau: "ervaren"
        }
      ]
    }
  ]
};

// Automotive traject
const AUTOMOTIVE_TRAJECT_DATA: TrajectData = {
  id: "traject_automotive_techniek",
  name: "EVC Automotive Techniek - Personenwagens",
  beschrijving: "Erkenning van Verworven Competenties voor automotive technische beroepen. Voor professionals met ervaring in het onderhoud en reparatie van personenwagens en bedrijfswagens.",
  type: "automotive",
  icon: "🔧",
  medische_eisen: [
    "Geen fysieke beperkingen die het veilig werken in de werkplaats belemmeren",
    "Voldoende gezichtsvermogen voor nauwkeurig werk",
    "Geen allergieën voor gebruikelijke werkplaatsmaterialen"
  ],
  competenties: [
    {
      id: "comp_apk_keuring",
      name: "APK Keuring en Controle",
      description: "Uitvoeren van APK-keuringen en veiligheidscontroles",
      categorie: "Keuring en Inspectie",
      indicators: [
        {
          id: "apk_01",
          label: "Visuele inspectie voertuig",
          description: "Kan systematisch visuele controle uitvoeren van carrosserie, verlichting en veiligheidsvoorzieningen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_02",
          label: "Remmen testen",
          description: "Kan remwerking testen en beoordelen conform APK-eisen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_03",
          label: "Uitlaat- en emissiecontrole",
          description: "Kan uitlaatgassen meten en beoordelen volgens milieueisen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_04",
          label: "Stuur- en ophangsysteem",
          description: "Kan stuurinrichting en wielophanging controleren op speling en slijtage",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_05",
          label: "Banden en velgen",
          description: "Kan banden controleren op profieldiepte, beschadigingen en juiste spanning",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_06",
          label: "APK-rapport opstellen",
          description: "Kan correcte APK-rapporten opstellen met bevindingen en aanbevelingen",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_onderhoud",
      name: "Standaard Onderhoud",
      description: "Preventief onderhoud en standaard servicebeurten",
      categorie: "Onderhoud en Service",
      indicators: [
        {
          id: "oh_01",
          label: "Motorolie verversen",
          description: "Kan motorolie en filter verversen volgens fabrieksspecificaties",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_02",
          label: "Vloeistofpeil controleren",
          description: "Kan alle vloeistofniveaus controleren en bijvullen (rem, koppeling, koeling, ruitenwasser)",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_03",
          label: "Luchtfilter vervangen",
          description: "Kan lucht- en brandstoffilters vervangen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_04",
          label: "Bougies vervangen",
          description: "Kan ontstekingssysteem onderhouden (bougies, bobines)",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_05",
          label: "Distributieonderhoud",
          description: "Kan distributieriem en spanning controleren en vervangen",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "oh_06",
          label: "Onderhoudsschema plannen",
          description: "Kan onderhoudsschema opstellen volgens fabrieksvoorschriften",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_diagnose",
      name: "Diagnose en Reparaties",
      description: "Storingen diagnosticeren en reparaties uitvoeren",
      categorie: "Diagnose en Reparatie",
      indicators: [
        {
          id: "dr_01",
          label: "OBD-diagnose uitvoeren",
          description: "Kan diagnoseapparatuur gebruiken om foutcodes uit te lezen en te interpreteren",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "dr_02",
          label: "Elektrische systemen testen",
          description: "Kan elektrische circuits en componenten testen en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_03",
          label: "Motorproblemen diagnosticeren",
          description: "Kan motorproblemen identificeren en repareren (startproblemen, trillingen, geluid)",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_04",
          label: "Remsysteem onderhouden",
          description: "Kan remschijven, remblokken en remvloeistof vervangen en onderhouden",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "dr_05",
          label: "Airconditioning servicen",
          description: "Kan airconditioningsysteem controleren, bijvullen en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_06",
          label: "Complexe reparaties plannen",
          description: "Kan complexe reparaties plannen en uitvoeren (motor, transmissie)",
          min_ervaring_niveau: "expert"
        }
      ]
    },
    {
      id: "comp_montage",
      name: "Onderdelen en Montage",
      description: "Onderdelen (de)monteren, vervangen en afstellen",
      categorie: "Montage en Demontage",
      indicators: [
        {
          id: "om_01",
          label: "Onderdelen identificeren",
          description: "Kan voertuigonderdelen correct identificeren en bestellen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_02",
          label: "Demontage technieken",
          description: "Kan onderdelen vakkundig demonteren zonder beschadiging",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_03",
          label: "Montage en afstelling",
          description: "Kan onderdelen correct monteren en afstellen volgens specificaties",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_04",
          label: "Koppeling vervangen",
          description: "Kan koppeling en versnellingsbak onderhouden en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "om_05",
          label: "Wielophanging afstellen",
          description: "Kan wielophanging en uitlijning controleren en afstellen",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_professioneel",
      name: "Professioneel Handelen",
      description: "Professionele werkhouding en communicatie",
      categorie: "Professionaliteit",
      indicators: [
        {
          id: "ph_01",
          label: "Veiligheid en milieu",
          description: "Kent en past veiligheids- en milieuregels toe in de werkplaats",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_02",
          label: "Klantcommunicatie",
          description: "Kan helder communiceren met klanten over reparaties en kosten",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_03",
          label: "Werkplanning",
          description: "Kan werkzaamheden efficiënt plannen en prioriteren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "ph_04",
          label: "Kwaliteitscontrole",
          description: "Voert kwaliteitscontroles uit en test reparaties grondig",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_05",
          label: "Administratie en rapportage",
          description: "Kan werkorders en rapportages correct invullen",
          min_ervaring_niveau: "beginner"
        }
      ]
    }
  ]
};

// Algemeen/fallback traject
const ALGEMEEN_TRAJECT: TrajectData = {
  id: "traject_algemeen",
  name: "EVC Algemene Competenties",
  beschrijving: "Algemene EVC-procedure voor verschillende sectoren en beroepen.",
  type: "algemeen",
  icon: "📋",
  competenties: []
};

/**
 * Bepaal het juiste traject op basis van user token
 */
export function selectTrajectForUser(token: DecodedToken | null): TrajectData {
  if (!token) {
    return ALGEMEEN_TRAJECT;
  }

  // Primair: gebruik trajectType uit token als aanwezig
  if (token.trajectType) {
    switch (token.trajectType) {
      case "automotive":
        return AUTOMOTIVE_TRAJECT_DATA;
      case "jeugdzorg":
        return JEUGDZORG_TRAJECT;
      case "algemeen":
      default:
        return ALGEMEEN_TRAJECT;
    }
  }

  // Fallback: gebruik tenantId om traject te bepalen
  if (token.tenantId) {
    if (token.tenantId.includes("automotive") || token.tenantId.includes("auto") || token.tenantId.includes("garage")) {
      return AUTOMOTIVE_TRAJECT_DATA;
    }
    if (token.tenantId.includes("jeugdzorg") || token.tenantId.includes("youth") || token.tenantId.includes("zorg")) {
      return JEUGDZORG_TRAJECT;
    }
  }

  // Extra fallback: gebruik specialisatie
  if (token.specialisatie) {
    if (token.specialisatie.toLowerCase().includes("auto") || 
        token.specialisatie.toLowerCase().includes("techniek") ||
        token.specialisatie.toLowerCase().includes("motor")) {
      return AUTOMOTIVE_TRAJECT_DATA;
    }
    if (token.specialisatie.toLowerCase().includes("jeugd") ||
        token.specialisatie.toLowerCase().includes("zorg") ||
        token.specialisatie.toLowerCase().includes("social")) {
      return JEUGDZORG_TRAJECT;
    }
  }

  // Default fallback
  return ALGEMEEN_TRAJECT;
}

/**
 * Get user context voor debugging/display
 */
export function getUserContext(token: DecodedToken | null): {
  trajectType: TrajectType;
  displayName: string;
  description: string;
} {
  const traject = selectTrajectForUser(token);
  
  return {
    trajectType: traject.type,
    displayName: traject.name,
    description: traject.beschrijving
  };
}

/**
 * Alle beschikbare trajecten
 */
export const AVAILABLE_TRAJECTEN = [
  JEUGDZORG_TRAJECT,
  AUTOMOTIVE_TRAJECT_DATA,
  ALGEMEEN_TRAJECT
];