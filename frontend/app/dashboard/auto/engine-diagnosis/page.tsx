"use client";

import { useDomain } from "@/app/providers/domain-provider";

const diagnosisSteps = [
  {
    step: 1,
    title: "Voorbereiding",
    description: "Voorbereidende stappen voor diagnose",
    tasks: [
      "Klachtregistratie analyseren",
      "Visuele inspectie uitvoeren",
      "Veiligheidsprocedures naleven",
      "Diagnoseapparatuur voorbereiden"
    ]
  },
  {
    step: 2,
    title: "Foutcodeuitlezing",
    description: "Uitlezen en interpreteren van foutcodes",
    tasks: [
      "OBD-scanner aansluiten",
      "DTC codes uitlezen",
      "Vriezbeeldgegevens analyseren",
      "Foutcode significantie bepalen"
    ]
  },
  {
    step: 3,
    title: "Systeemtesten",
    description: "Uitgebreide testen van motorsystemen",
    tasks: [
      "Compressietest uitvoeren", 
      "Brandstofdrukmeting",
      "Ontstekingssysteem testen",
      "Emissiewaarden meten"
    ]
  },
  {
    step: 4,
    title: "Analyse & Rapport",
    description: "Resultaten analyseren en rapporteren",
    tasks: [
      "Testresultaten vergelijken",
      "Storing lokaliseren",
      "Hersteladvies opstellen",
      "Kostenschatting maken"
    ]
  }
];

const commonDiagnosis = [
  {
    symptom: "Motor slaat niet aan",
    causes: ["Accu defect", "Startmotor defect", "Brandstofpomp", "ECU storing"],
    color: "red"
  },
  {
    symptom: "Onregelmatig stationair toerental",
    causes: ["Luchtlekkage", "Injector verstopt", "Lambda sonde", "Bobine defect"],
    color: "yellow"
  },
  {
    symptom: "Verlies van vermogen",
    causes: ["Luchtfilter verstopt", "Turbo defect", "EGR klep", "Katalysator"],
    color: "orange"
  }
];

export default function EngineDiagnosisPage() {
  const { domain } = useDomain();

  if (domain !== "autotechniek") {
    return <div>Deze pagina is alleen beschikbaar voor het autotechniek domein.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Motordiagnose
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Systematische benadering voor motordiagnose. Van klachtregistratie tot hersteladvies.
        </p>
      </div>

      {/* Diagnosis Process */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Diagnosestappen</h2>
        <div className="space-y-4">
          {diagnosisSteps.map((step) => (
            <div key={step.step} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                  <div className="mt-3">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.tasks.map((task, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Diagnoses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Veelvoorkomende Storingen</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {commonDiagnosis.map((diagnosis, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-3 ${
                  diagnosis.color === "red" 
                    ? "bg-red-500"
                    : diagnosis.color === "yellow"
                    ? "bg-yellow-500"
                    : "bg-orange-500"
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{diagnosis.symptom}</h4>
                  <p className="text-xs text-gray-500 mt-1 mb-2">Mogelijke oorzaken:</p>
                  <ul className="space-y-1">
                    {diagnosis.causes.map((cause, i) => (
                      <li key={i} className="text-xs text-gray-600">• {cause}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Diagnosetools & Apparatuur</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "OBD Scanner", icon: "📱" },
            { name: "Multimeter", icon: "⚡" },
            { name: "Compressiemeter", icon: "🔧" },
            { name: "Oscilloscoop", icon: "📊" }
          ].map((tool) => (
            <div key={tool.name} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xl mr-2">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-900">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Start Diagnose Sessie
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Diagnose Geschiedenis
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Onderdelen Database
        </button>
      </div>
    </div>
  );
}