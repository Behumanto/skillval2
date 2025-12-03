import { NextResponse } from "next/server";
import OpenAI from "openai";

type AnalysisResult = {
  overallAssessment: string;
  detectedComponents: string[];
  skillsDemonstrated: string[];
  safetyObservations: string[];
  recommendations: string[];
  score: number;
};

const DEFAULT_MODEL = "gpt-4o";

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
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const context = formData.get("context") as string || "";

    if (!file) {
      return NextResponse.json(
        { error: "Geen afbeelding ontvangen." },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Je bent een expert autotechniek assessor voor EVC (Erkenning van Verworven Competenties). Analyseer deze afbeelding van autotechniek werkzaamheden en geef een gedetailleerde beoordeling.

Context van de kandidaat: ${context}

SPECIFIEKE OBJECT DETECTIE - Identificeer zoveel mogelijk van de volgende auto-gerelateerde items:
- Motor onderdelen: Cilinderkop, krukas, zuigers, kleppen, distributieriem, waterpomp
- Remsysteem: Remblokken, remschijven, remklauw, remleiding, remvloeistof
- Ophanging: Schokdempers, veren, wielophanging, stabilisatorstang
- Elektrische componenten: Accu, alternator, startmotor, ECU, sensoren, kabels
- Gereedschappen: Steeksleutels, doppenset, multimeter, OBD-scanner, torsiesleutel
- Veiligheidsuitrusting: Veiligheidsbril, handschoenen, werkkleding, hefbrug, assensteunen
- Voertuig merken/typen: BMW, Mercedes, Audi, Volkswagen, Ford, Toyota, etc.

Geef een gestructureerde analyse met:

1. ALGEMENE BEOORDELING: Een korte overall beoordeling van de werkzaamheden
2. GEDETECTEERDE COMPONENTEN: Welke specifieke auto-onderdelen en gereedschappen zie je? (Gebruik bovenstaande lijst)
3. GETOONDE VAARDIGHEDEN: Welke technische vaardigheden worden gedemonstreerd?
4. VEILIGHEIDSASPECTEN: Observaties over veiligheid en arbeidsomstandigheden  
5. AANBEVELINGEN: Verbeterpunten en tips voor de kandidaat
6. CIJFER: Geef een score van 1-10 gebaseerd op technische uitvoering, veiligheid en professionaliteit

Wees zeer specifiek in je object detectie en gebruik exacte technische termen. Focus op competenties relevant voor Nederlandse autotechniek EVC-trajecten.

BELANGRIJK: Antwoord ALLEEN in geldige JSON format zonder extra tekst of markdown formatting:

{
  "overallAssessment": "...",
  "detectedComponents": ["...", "..."],
  "skillsDemonstrated": ["...", "..."],
  "safetyObservations": ["...", "..."],
  "recommendations": ["...", "..."],
  "score": 8.5
}`;

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const assistantReply = response.choices[0]?.message?.content?.trim();

    if (!assistantReply) {
      return NextResponse.json(
        {
          error: "Het AI-model gaf geen antwoord terug.",
        },
        { status: 502 }
      );
    }

    // Parse the JSON response from OpenAI
    let analysisResult: AnalysisResult;
    try {
      // Try to extract JSON from the response if it's wrapped in markdown or other text
      const jsonMatch = assistantReply.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : assistantReply;
      analysisResult = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", assistantReply);
      
      // Try to extract meaningful content from malformed response
      const cleanText = assistantReply
        .replace(/```json\s*/g, '') // Remove markdown code block
        .replace(/```\s*/g, '') // Remove closing code block
        .replace(/^\s*{\s*"overallAssessment":\s*"/g, '') // Remove JSON structure start
        .replace(/"\s*,\s*"detectedComponents"[\s\S]*$/, '') // Remove everything after overallAssessment
        .replace(/\\"/g, '"') // Unescape quotes
        .trim();
      
      // Fallback analysis with cleaned text
      analysisResult = {
        overallAssessment: cleanText || "De AI-analyse kon niet volledig worden verwerkt. Een handmatige beoordeling is aanbevolen.",
        detectedComponents: ["Analyse kon niet volledig worden uitgevoerd"],
        skillsDemonstrated: ["Handmatige beoordeling vereist"],
        safetyObservations: ["Controleer veiligheidsprotocollen"],
        recommendations: ["Neem contact op met assessor voor verdere beoordeling"],
        score: 5
      };
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("OpenAI vision assessment error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout bij AI-analyse van afbeelding.",
      },
      { status: 500 }
    );
  }
}