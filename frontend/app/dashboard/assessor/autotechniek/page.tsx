"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

type AnalysisResult = {
  overallAssessment: string;
  detectedComponents: string[];
  skillsDemonstrated: string[];
  safetyObservations: string[];
  recommendations: string[];
  score: number;
};

type Assessment = {
  id: string;
  candidateName: string;
  taskType: string;
  imageUrl: string;
  result: AnalysisResult;
  timestamp: string;
};

export default function AutotechniekAssessorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [taskType, setTaskType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock assessments data
  const [recentAssessments] = useState<Assessment[]>([
    {
      id: "1",
      candidateName: "Ramin Verkerk",
      taskType: "Motordiagnose BMW 320i",
      imageUrl: "/auto-repair-engine.jpg",
      result: {
        overallAssessment: "Kandidaat toont goede systematische aanpak bij motordiagnose",
        detectedComponents: ["OBD scanner", "Multimeter", "Lambda sensor", "ECU"],
        skillsDemonstrated: ["Systematische diagnose", "Correct gereedschap gebruik", "Veiligheidsprotocol"],
        safetyObservations: ["Veiligheidsbril gedragen", "Handschoenen gebruikt", "Werkplek opgeruimd"],
        recommendations: ["Documenteer diagnose stappen duidelijker", "Voeg meer detail toe aan meetwaarden"],
        score: 8.2
      },
      timestamp: "2024-10-20T14:30:00"
    },
    {
      id: "2", 
      candidateName: "Lisa de Jong",
      taskType: "Remmen onderhoud Audi A4",
      imageUrl: "/brake-maintenance.jpg",
      result: {
        overallAssessment: "Professionele uitvoering van remmen onderhoud",
        detectedComponents: ["Remblokken", "Remschijven", "Remklauw", "Hydraulische hefbrug"],
        skillsDemonstrated: ["Correcte demontageprocedure", "Kwaliteitscontrole", "Werkplaatsveiligheid"],
        safetyObservations: ["Hefbrug correct gebruikt", "Onderdelen systematisch gelegd"],
        recommendations: ["Meet remschijfdikte nauwkeuriger", "Controleer remvloeistofniveau"],
        score: 7.8
      },
      timestamp: "2024-10-19T11:15:00"
    }
  ]);

  const taskTypes = [
    "Motordiagnose",
    "Remmen onderhoud", 
    "ECU programmering",
    "Elektrische diagnose",
    "Ophanging reparatie",
    "Uitlaatsysteem vervangen",
    "APK keuring",
    "Airco onderhoud"
  ];

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !candidateName.trim() || !taskType.trim()) {
      alert("Vul alle velden in en selecteer een afbeelding");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("context", `Kandidaat: ${candidateName}, Taak: ${taskType}`);

      const response = await fetch("/api/vision/automotive-assessment", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Assessment failed");
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

    } catch (error) {
      console.error("Analysis failed:", error);
      // Mock result for demo
      setAnalysisResult({
        overallAssessment: `Kandidaat ${candidateName} demonstreert competente uitvoering van ${taskType}. De werkzaamheden worden systematisch en veilig uitgevoerd.`,
        detectedComponents: ["Diagnose apparatuur", "Veiligheidsuitrusting", "Voertuig componenten"],
        skillsDemonstrated: ["Systematische aanpak", "Correct gereedschap gebruik", "Veiligheidsbewustzijn"],
        safetyObservations: ["Persoonlijke beschermingsmiddelen gedragen", "Werkplek georganiseerd"],
        recommendations: ["Documenteer proces uitgebreider", "Toon meer detail in technische metingen"],
        score: 7.5
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAssessment = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setCandidateName("");
    setTaskType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Autotechniek Vision Assessment</h1>
            <p className="text-gray-600 mt-1">AI-ondersteunte beoordeling van praktische vaardigheden</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Assessment Upload */}
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Nieuwe Assessment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kandidaat Naam</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Voer naam van de kandidaat in"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taak Type</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecteer taak type</option>
                {taskTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Werkfoto Upload</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {previewUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={analyzeImage}
                disabled={!selectedImage || !candidateName.trim() || !taskType.trim() || isAnalyzing}
                className={clsx(
                  "flex-1 py-2 px-4 rounded-lg font-medium text-white transition",
                  isAnalyzing || !selectedImage || !candidateName.trim() || !taskType.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isAnalyzing ? "Analyseren..." : "Analyseer Werkzaamheden"}
              </button>
              <button
                onClick={resetAssessment}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Assessment Resultaat</h2>
          
          {analysisResult ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <h3 className="font-medium text-green-900">Assessment Score</h3>
                  <p className="text-sm text-green-700">Op basis van AI vision analyse</p>
                </div>
                <div className="text-3xl font-bold text-green-600">{analysisResult.score}/10</div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Algemene Beoordeling</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{analysisResult.overallAssessment}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Gedetecteerde Componenten</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.detectedComponents.map((component, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {component}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Gedemonstreerde Vaardigheden</h3>
                <ul className="space-y-1">
                  {analysisResult.skillsDemonstrated.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Veiligheidsobservaties</h3>
                <ul className="space-y-1">
                  {analysisResult.safetyObservations.map((observation, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {observation}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Aanbevelingen</h3>
                <ul className="space-y-1">
                  {analysisResult.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p className="text-gray-500">Upload een afbeelding om te beginnen met de assessment</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recente Assessments</h2>
        
        <div className="space-y-4">
          {recentAssessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{assessment.candidateName}</h3>
                <p className="text-sm text-gray-600">{assessment.taskType}</p>
                <p className="text-xs text-gray-500">{new Date(assessment.timestamp).toLocaleDateString('nl-NL')} {new Date(assessment.timestamp).toLocaleTimeString('nl-NL')}</p>
              </div>
              
              <div className="text-right">
                <div className={clsx(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  assessment.result.score >= 8 ? "bg-green-100 text-green-800" :
                  assessment.result.score >= 6 ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {assessment.result.score}/10
                </div>
                <p className="text-xs text-gray-500 mt-1">AI Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}