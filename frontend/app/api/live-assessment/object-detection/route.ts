import { NextResponse } from "next/server";
import OpenAI from "openai";

type ObjectDetectionResult = {
  objects: string[];
  confidence: number;
  timestamp: number;
  competencyUpdates: CompetencyUpdate[];
};

type CompetencyUpdate = {
  competency: string;
  confidenceIncrease: number;
  shouldMarkObserved: boolean;
  reasoning: string;
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY ontbreekt" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const timestamp = parseInt(formData.get("timestamp") as string);
    const currentTask = formData.get("currentTask") as string;
    
    if (!image) {
      return NextResponse.json(
        { error: "Geen afbeelding ontvangen" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Je bent een geavanceerde object detectie AI voor autotechniek assessments. Analyseer deze afbeelding en detecteer ALLE relevante objecten.

Huidige taak: ${currentTask}
Tijdstempel: ${timestamp} seconden

DETECTEER DEZE CATEGORIEËN:
1. GEREEDSCHAP: steeksleutels, doppensets, multimeter, OBD-scanner, torsiesleutel, waterpomptang, schroevendraaiers
2. AUTO ONDERDELEN: remklauw, remschijf, motor, accu, radiator, schokdemper, veer, uitlaat, ECU, sensoren
3. VEILIGHEID: veiligheidsbril, handschoenen, werkkleding, helm, rubberlaars
4. APPARATUUR: hefbrug, compressor, diagnosecomputer, testapparatuur
5. VLOEISTOFFEN: motorolie, remvloeistof, koelvloeistof, AdBlue
6. WERKOMGEVING: werkplaats, werkbank, gereedschapskast, onderdelen

COMPETENTIE ANALYSE - Bepaal voor elke competentie of deze waarschijnlijk wordt uitgevoerd:
- Systematische diagnose: diagnoseapparatuur, meetinstrumenten, computer
- Veiligheidsprotocol naleven: veiligheidsuitrusting, werkkleding, georganiseerde werkplek  
- Correct gereedschap gebruik: juiste gereedschappen voor taak, vakkundige handling
- Documentatie bijhouden: computer, papierwerk, checklist
- Kwaliteitscontrole uitvoeren: controlemeting, visuele inspectie, testprocedures
- Communicatie: interactie met personen, telefoon, documentatie

Geef ALLEEN JSON terug:

{
  "objects": ["object1", "object2"],
  "confidence": 0.85,
  "timestamp": ${timestamp},
  "competencyUpdates": [
    {
      "competency": "Veiligheidsprotocol naleven",
      "confidenceIncrease": 0.2,
      "shouldMarkObserved": true,
      "reasoning": "Handschoenen en veiligheidsbril gedetecteerd"
    }
  ]
}`; 

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
                url: `data:${image.type};base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 800,
      temperature: 0.1,
    });

    const assistantReply = response.choices[0]?.message?.content?.trim();
    
    if (!assistantReply) {
      return NextResponse.json(
        { error: "Geen antwoord van AI model" },
        { status: 502 }
      );
    }

    let result: ObjectDetectionResult;
    try {
      // Extract JSON from response
      const jsonMatch = assistantReply.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : assistantReply;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse object detection response:", assistantReply);
      
      // Fallback response
      result = {
        objects: ["werkplaats", "gereedschap"],
        confidence: 0.5,
        timestamp: timestamp,
        competencyUpdates: []
      };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Object detection error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error 
          ? error.message 
          : "Onbekende fout bij object detectie"
      },
      { status: 500 }
    );
  }
}