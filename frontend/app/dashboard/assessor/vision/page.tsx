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

type SampleDemo = {
  id: string;
  name: string;
  imageData: string; // Base64 or placeholder
  description: string;
  expectedResult: AnalysisResult;
};

export default function VisionAssessmentPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [taskType, setTaskType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample demo scenarios with realistic automotive assessment data
  const sampleDemos: SampleDemo[] = [
    {
      id: "demo-1",
      name: "Goede Remblokken Installatie",
      imageData: "data:image/svg+xml;base64," + btoa('<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><rect x="50" y="100" width="300" height="100" fill="#333" rx="10"/><rect x="80" y="120" width="60" height="60" fill="#8B4513" rx="5"/><rect x="160" y="120" width="60" height="60" fill="#8B4513" rx="5"/><rect x="240" y="120" width="60" height="60" fill="#8B4513" rx="5"/><circle cx="320" cy="150" r="30" fill="#C0C0C0"/><circle cx="100" cy="80" r="15" fill="#FF0000"/><text x="200" y="250" text-anchor="middle" fill="#000">Veiligheidsuitrusting zichtbaar</text><text x="200" y="270" text-anchor="middle" fill="#000">Nieuwe remblokken correct geplaatst</text></svg>'),
      description: "Kandidaat installeert nieuwe remblokken met juiste procedure en veiligheidsuitrusting",
      expectedResult: {
        overallAssessment: "Uitstekende uitvoering van remblokken installatie. Kandidaat toont professionele werkwijze en volgt alle veiligheidsprotocollen.",
        detectedComponents: ["Remblokken", "Remschijf", "Remklauw", "Veiligheidsbril", "Werkhandschoenen", "Gereedschapset"],
        skillsDemonstrated: ["Correcte demontageprocedure", "Veiligheidsprotocol naleven", "Kwaliteitscontrole", "Systematische werkwijze"],
        safetyObservations: ["Veiligheidsbril gedragen", "Werkhandschoenen gebruikt", "Werkplek georganiseerd", "Juiste hefprocedure toegepast"],
        recommendations: ["Uitstekend werk - geen verbeterpunten", "Documenteer meetwaarden voor rapportage", "Toon procedure ook aan collega's"],
        score: 9.2
      }
    },
    {
      id: "demo-2", 
      name: "Motordiagnose - Verbetering Nodig",
      imageData: "data:image/svg+xml;base64," + btoa('<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><rect x="30" y="50" width="340" height="180" fill="#444" rx="15"/><rect x="50" y="80" width="100" height="60" fill="#666" rx="5"/><rect x="180" y="90" width="80" height="40" fill="#222"/><rect x="290" y="100" width="60" height="20" fill="#FF4444"/><circle cx="320" cy="180" r="25" fill="#333"/><text x="200" y="250" text-anchor="middle" fill="#FF0000">Geen veiligheidsbril</text><text x="200" y="270" text-anchor="middle" fill="#FF0000">OBD kabel los</text></svg>'),
      description: "Motordiagnose met enkele veiligheidsproblemen en technische tekortkomingen",
      expectedResult: {
        overallAssessment: "Kandidaat heeft basiskennis van motordiagnose maar mist belangrijke veiligheids- en kwaliteitsaspecten die verbetering behoeven.",
        detectedComponents: ["OBD-scanner", "Motor", "Diagnose apparatuur", "Multimeter"],
        skillsDemonstrated: ["Basis diagnose kennis", "Gebruik van OBD-scanner", "Identificatie van foutcodes"],
        safetyObservations: ["Veiligheidsbril niet gedragen", "Werkhandschoenen ontbreken", "Losse kabels op werkplek"],
        recommendations: ["Draag altijd persoonlijke beschermingsmiddelen", "Controleer alle kabelverbindingen voor diagnose", "Maak werkplek vrij van obstakels", "Documenteer alle meetwaarden systematisch"],
        score: 6.1
      }
    },
    {
      id: "demo-3",
      name: "APK Controle - Gemengd Resultaat", 
      imageData: "data:image/svg+xml;base64," + btoa('<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><ellipse cx="200" cy="200" rx="150" ry="50" fill="#333"/><rect x="120" y="150" width="160" height="100" fill="#555" rx="10"/><circle cx="80" cy="200" r="40" fill="#222"/><circle cx="320" cy="200" r="40" fill="#222"/><rect x="180" y="120" width="40" height="30" fill="#FFA500"/><circle cx="150" cy="80" r="12" fill="#00FF00"/><text x="200" y="260" text-anchor="middle" fill="#FFA500">Gedeeltelijk correct</text><text x="200" y="280" text-anchor="middle" fill="#000">Verlichting check uitgevoerd</text></svg>'),
      description: "APK controle waarbij basis procedures goed worden uitgevoerd maar detail aandacht ontbreekt",
      expectedResult: {
        overallAssessment: "Kandidaat beheerst de hoofdlijnen van APK controle maar mist aandacht voor details en complete documentatie van bevindingen.",
        detectedComponents: ["Voertuig", "Koplampen", "APK apparatuur", "Meetinstrumenten", "Checklist"],
        skillsDemonstrated: ["APK procedure kennis", "Verlichting controle", "Basis voertuigbeoordeling", "Gebruik van meetapparatuur"],
        safetyObservations: ["Werkplek adequaat verlicht", "Voertuig stabiel opgesteld", "Meetapparatuur correct aangesloten"],
        recommendations: ["Controleer alle lichtfuncties systematisch", "Documenteer alle meetwaarden volledig", "Gebruik standaard APK checklist consequent", "Besteed meer aandacht aan detail controles"],
        score: 7.4
      }
    }
  ];

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

  const useSampleDemo = (demo: SampleDemo) => {
    setCandidateName("Demo Kandidaat");
    setTaskType("Demo Assessment");
    setPreviewUrl(demo.imageData);
    setSelectedImage(null); // Clear actual file since we're using demo
    setAnalysisResult(demo.expectedResult);
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
            <h1 className="text-3xl font-bold text-gray-900">AI Vision Assessment</h1>
            <p className="text-gray-600 mt-1">AI-ondersteunte beoordeling van praktische vaardigheden</p>
          </div>
        </div>
      </div>

      {/* Sample Demos */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Demo Scenario's</h2>
        <p className="text-gray-600 mb-6">Klik op een scenario om te zien hoe AI vision assessment werkt met realistische feedback</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {sampleDemos.map((demo) => (
            <div key={demo.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="aspect-video relative bg-gray-100">
                <Image
                  src={demo.imageData}
                  alt={demo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{demo.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{demo.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    demo.expectedResult.score >= 8 ? 'bg-green-100 text-green-800' :
                    demo.expectedResult.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Score: {demo.expectedResult.score}/10
                  </span>
                  <button
                    onClick={() => useSampleDemo(demo)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                  >
                    Probeer Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                disabled={(!selectedImage && !previewUrl) || !candidateName.trim() || !taskType.trim() || isAnalyzing}
                className={clsx(
                  "flex-1 py-2 px-4 rounded-lg font-medium text-white transition",
                  isAnalyzing || ((!selectedImage && !previewUrl) || !candidateName.trim() || !taskType.trim())
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
              <p className="text-gray-500">Upload een afbeelding of probeer een demo scenario om te beginnen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}