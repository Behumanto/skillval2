import { NextResponse } from "next/server";
import OpenAI from "openai";

type EVCReportData = {
  candidateName: string;
  certificateNumber: string;
  evcStandard: string;
  assessmentDate: string;
  feedForward: string;
  visionAnalysisResults?: {
    detectedComponents: string[];
    skillsDemonstrated: string[];
    safetyObservations: string[];
    score: number;
  };
};

const DEFAULT_MODEL = "gpt-4o";

// Privacy filtering function - removes sensitive personal data
function applyPrivacyFiltering(data: any): any {
  // Replace real names with anonymized versions
  const anonymizedData = JSON.parse(JSON.stringify(data));
  
  // Replace candidate name with initials only
  if (anonymizedData.candidateName) {
    const names = anonymizedData.candidateName.split(' ');
    anonymizedData.candidateName = names.map((name: string) => name.charAt(0) + '.').join(' ');
  }
  
  // Remove specific address information if present
  if (anonymizedData.address) {
    delete anonymizedData.address;
  }
  
  // Remove phone numbers and email addresses
  const sensitiveFields = ['telefoon', 'email', 'phoneNumber', 'emailAddress'];
  sensitiveFields.forEach(field => {
    if (anonymizedData[field]) {
      delete anonymizedData[field];
    }
  });
  
  return anonymizedData;
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "OPENAI_API_KEY ontbreekt. Voeg deze toe aan je omgeving.",
      },
      { status: 500 }
    );
  }

  try {
    const { reportType, assessmentData }: { 
      reportType: string; 
      assessmentData: EVCReportData[] 
    } = await request.json();

    if (!assessmentData || assessmentData.length === 0) {
      return NextResponse.json(
        { error: "Geen assessment data ontvangen." },
        { status: 400 }
      );
    }

    // Apply privacy filtering to all assessment data
    const filteredData = assessmentData.map(applyPrivacyFiltering);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let prompt = "";
    
    if (reportType === "feedforward") {
      prompt = `Je bent een expert EVC rapporteur die professionele feed forward rapporten schrijft volgens Examenkamer standaarden. 

Genereer een EVC Feed Forward rapport gebaseerd op de volgende assessment data:

${JSON.stringify(filteredData, null, 2)}

BELANGRIJKE RICHTLIJNEN:
1. Volg exact het format van het Examenkamer feed forward rapport
2. Gebruik constructieve en professionele taal
3. Focus op concrete, actionable aanbevelingen
4. Vermeld specifieke technische aspecten
5. Privacygevoelige data is al gefilterd

RAPPORT STRUCTUUR:
- Header met datum en kenmerk
- Per kandidaat een sectie met:
  * Naam deelnemer (geanonimiseerd)
  * Certificaatnummer  
  * EVC-standaard
  * Feed forward met concrete aanbevelingen

STIJL:
- Professioneel en respectvol
- Constructief (niet alleen kritiek)
- Specifiek en actionable
- Focus op kwaliteitsverbetering

Genereer het complete rapport in Nederlandse format.`;
    
    } else if (reportType === "vision-overview") {
      prompt = `Genereer een Vision Assessment Overzicht rapport voor de volgende data:

${JSON.stringify(filteredData, null, 2)}

Focus op:
- Object detectie resultaten
- AI assessment scores
- Veiligheids observaties
- Gedetecteerde competenties
- Aanbevelingen voor verbetering

Maak het rapport professioneel en overzichtelijk.`;
    
    } else {
      prompt = `Genereer een Competentie Analyse rapport voor:

${JSON.stringify(filteredData, null, 2)}

Include:
- Per competentie gedetailleerde analyse
- Sterke punten en ontwikkelpunten
- Concrete verbeteraanbevelingen
- Toekomstige leerdoelen`;
    }

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: "Je bent een expert EVC rapporteur die professionele, constructieve rapporten schrijft volgens Nederlandse Examenkamer standaarden. Alle rapporten moeten privacy-compliant zijn."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const reportContent = response.choices[0]?.message?.content?.trim();

    if (!reportContent) {
      return NextResponse.json(
        {
          error: "Het AI-model gaf geen rapport terug.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ 
      reportContent,
      reportType,
      generatedAt: new Date().toISOString(),
      privacyFiltered: true
    });

  } catch (error) {
    console.error("EVC report generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout bij genereren van EVC rapport.",
      },
      { status: 500 }
    );
  }
}