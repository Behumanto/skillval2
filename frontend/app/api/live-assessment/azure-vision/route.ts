import { NextResponse } from "next/server";
import { azureOpenAIClient } from "@/app/lib/azure-openai";

export interface SubStep {
  step: string;
  detected: boolean;
  confidence: number;
  evidence: string;
  timestamp?: number;
  criticality: 'low' | 'medium' | 'high';
}

export interface CompetencySubSteps {
  competency: string;
  subSteps: SubStep[];
  overallProgress: number;
  requiresAssessorVerification: boolean;
}

export interface VisionAnalysisResult {
  detectedObjects: string[];
  competencySteps: CompetencySubSteps[];
  overallConfidence: number;
  safetyCompliance: number;
  recommendations: string[];
  timestamp: number;
  assessorAlerts: string[];
}

const AUTOMOTIVE_SUB_STEPS = {
  "Systematische diagnose": [
    { step: "OBD-scanner aangesloten en geactiveerd", criticality: "high" as const },
    { step: "Foutcodes uitgelezen en geïnterpreteerd", criticality: "high" as const },
    { step: "Multimeter gebruikt voor spanningsmetingen", criticality: "medium" as const },
    { step: "Visuele inspectie uitgevoerd", criticality: "medium" as const },
    { step: "Systematische probleemanalyse toegepast", criticality: "high" as const },
    { step: "Testresultaten gedocumenteerd", criticality: "medium" as const }
  ],
  "Veiligheidsprotocol naleven": [
    { step: "Veiligheidsbril gedragen", criticality: "high" as const },
    { step: "Werkhandschoenen gebruikt", criticality: "high" as const },
    { step: "Voertuig veilig opgetild met hefbrug", criticality: "high" as const },
    { step: "Assensteunen geplaatst", criticality: "high" as const },
    { step: "Werkplek georganiseerd en opgeruimd", criticality: "medium" as const },
    { step: "Vloeistoffen opgevangen in juiste bakken", criticality: "medium" as const }
  ],
  "Correct gereedschap gebruik": [
    { step: "Juiste maat gereedschap geselecteerd", criticality: "medium" as const },
    { step: "Momentsleutel correct ingesteld", criticality: "high" as const },
    { step: "Gereedschap vakkundig gehanteerd", criticality: "medium" as const },
    { step: "Meetinstrumenten gekalibreerd", criticality: "medium" as const },
    { step: "Gereedschap na gebruik schoongemaakt", criticality: "low" as const }
  ],
  "Kwaliteitscontrole uitvoeren": [
    { step: "Visuele eindcontrole uitgevoerd", criticality: "high" as const },
    { step: "Functietest gedaan", criticality: "high" as const },
    { step: "Controle op lekkages", criticality: "medium" as const },
    { step: "Specificaties gecontroleerd", criticality: "medium" as const },
    { step: "Afwerking kwaliteit beoordeeld", criticality: "low" as const }
  ],
  "Documentatie bijhouden": [
    { step: "Werkzaamheden gedocumenteerd", criticality: "medium" as const },
    { step: "Bevindingen genoteerd", criticality: "medium" as const },
    { step: "Foto's van werk gemaakt", criticality: "low" as const },
    { step: "Rapportage gereedgemaakt", criticality: "medium" as const }
  ],
  "Communicatie met opdrachtgever": [
    { step: "Bevindingen toegelicht", criticality: "medium" as const },
    { step: "Advies gegeven", criticality: "medium" as const },
    { step: "Kosten en tijd geschat", criticality: "low" as const },
    { step: "Vervolgstappen besproken", criticality: "low" as const }
  ]
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const timestamp = parseInt(formData.get("timestamp") as string);
    const currentTask = formData.get("currentTask") as string;
    const candidateName = formData.get("candidateName") as string || "Kandidaat";
    
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

    // Analyze image with Azure OpenAI Vision
    const analysisResult = await azureOpenAIClient.analyzeForCompetencies(
      base64Image, 
      currentTask, 
      timestamp
    );

    // Process and enhance the analysis
    const enhancedResult = await processAnalysisResult(
      analysisResult,
      currentTask,
      timestamp,
      candidateName
    );

    return NextResponse.json(enhancedResult);

  } catch (error) {
    console.error("Azure Vision analysis error:", error);
    
    // Fallback response
    const fallbackResult: VisionAnalysisResult = {
      detectedObjects: ["werkplaats"],
      competencySteps: [],
      overallConfidence: 0.3,
      safetyCompliance: 0.5,
      recommendations: ["Azure OpenAI Vision niet beschikbaar - handmatige verificatie vereist"],
      timestamp: parseInt(formData?.get("timestamp") as string) || Date.now(),
      assessorAlerts: ["Technische fout - controleer alle stappen handmatig"]
    };
    
    return NextResponse.json(fallbackResult);
  }
}

async function processAnalysisResult(
  rawResult: any,
  currentTask: string,
  timestamp: number,
  candidateName: string
): Promise<VisionAnalysisResult> {
  const competencySteps: CompetencySubSteps[] = [];
  const assessorAlerts: string[] = [];

  // Process each competency with its sub-steps
  for (const [competencyName, subStepsTemplate] of Object.entries(AUTOMOTIVE_SUB_STEPS)) {
    const detectedSteps = rawResult.competencySteps?.find(
      (c: any) => c.competency === competencyName
    );

    const processedSubSteps: SubStep[] = subStepsTemplate.map(template => {
      const detected = detectedSteps?.subSteps?.find(
        (s: any) => s.step.includes(template.step.split(' ')[0])
      );

      const subStep: SubStep = {
        step: template.step,
        detected: detected?.detected || false,
        confidence: detected?.confidence || 0,
        evidence: detected?.evidence || "Niet gedetecteerd in deze opname",
        timestamp: detected?.detected ? timestamp : undefined,
        criticality: template.criticality
      };

      // Generate alerts for critical missing steps
      if (!subStep.detected && template.criticality === 'high') {
        assessorAlerts.push(
          `⚠️ Kritieke stap gemist: ${template.step} voor ${competencyName}`
        );
      }

      return subStep;
    });

    const overallProgress = processedSubSteps.filter(s => s.detected).length / processedSubSteps.length;
    const requiresAssessorVerification = processedSubSteps.some(
      s => s.criticality === 'high' && !s.detected
    );

    competencySteps.push({
      competency: competencyName,
      subSteps: processedSubSteps,
      overallProgress,
      requiresAssessorVerification
    });
  }

  // Check safety compliance
  const safetySteps = competencySteps.find(c => c.competency === "Veiligheidsprotocol naleven");
  const safetyCompliance = safetySteps?.overallProgress || 0;
  
  if (safetyCompliance < 0.7) {
    assessorAlerts.push(
      `🔴 VEILIGHEIDSALARM: Onvoldoende veiligheidsprotocollen waargenomen (${Math.round(safetyCompliance * 100)}%)`
    );
  }

  // Generate intelligent recommendations
  const recommendations = generateRecommendations(competencySteps, currentTask);

  const result: VisionAnalysisResult = {
    detectedObjects: rawResult.detectedObjects || [],
    competencySteps,
    overallConfidence: rawResult.overallConfidence || 0.5,
    safetyCompliance,
    recommendations,
    timestamp,
    assessorAlerts
  };

  return result;
}

function generateRecommendations(
  competencySteps: CompetencySubSteps[],
  currentTask: string
): string[] {
  const recommendations: string[] = [];

  competencySteps.forEach(competency => {
    const missingCriticalSteps = competency.subSteps.filter(
      s => s.criticality === 'high' && !s.detected
    );

    if (missingCriticalSteps.length > 0) {
      recommendations.push(
        `Voor ${competency.competency}: Focus op ${missingCriticalSteps.map(s => s.step).join(', ')}`
      );
    }

    if (competency.overallProgress < 0.5) {
      recommendations.push(
        `${competency.competency} vereist meer aandacht - slechts ${Math.round(competency.overallProgress * 100)}% voltooid`
      );
    }
  });

  // Task-specific recommendations
  if (currentTask.includes("rem")) {
    recommendations.push("Let speciaal op remvloeistofniveau en remblokdikte");
  } else if (currentTask.includes("motor")) {
    recommendations.push("Controleer motorolie, koelvloeistof en riemspanning");
  }

  if (recommendations.length === 0) {
    recommendations.push("Uitstekend werk! Alle belangrijke stappen zijn waargenomen.");
  }

  return recommendations;
}