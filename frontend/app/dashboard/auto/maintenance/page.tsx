"use client";

import { useDomain } from "@/app/providers/domain-provider";

const maintenanceModules = [
  {
    id: "scheduled-maintenance",
    title: "Gepland Onderhoud",
    description: "Reguliere onderhoudsbeurten en serviceschema's",
    procedures: [
      "APK keuring voorbereiding",
      "Onderhoudsschema's volgen", 
      "Smeermiddelen vervangen",
      "Filters en onderdelen controle"
    ],
    level: "Basis",
    color: "green"
  },
  {
    id: "repair-work",
    title: "Reparatiewerkzaamheden",
    description: "Complexe reparaties en herstelwerkzaamheden",
    procedures: [
      "Motorblok revisie",
      "Transmissie reparatie",
      "Carrosserieherstel",
      "Airconditioning service"
    ],
    level: "Gevorderd",
    color: "blue"
  },
  {
    id: "safety-inspection",
    title: "Veiligheidsinspectie",
    description: "Veiligheidssystemen en controles",
    procedures: [
      "Remsysteem inspectie",
      "Verlichtingscontrole",
      "Banden en velgen check",
      "Uitlaatsysteem controle"
    ],
    level: "Basis",
    color: "orange"
  },
  {
    id: "advanced-systems",
    title: "Geavanceerde Systemen",
    description: "Moderne voertuigsystemen en technologieën",
    procedures: [
      "ADAS kalibratie",
      "Infotainment systemen",
      "Autonome rijfuncties",
      "Connected car services"
    ],
    level: "Expert",
    color: "purple"
  }
];

const maintenanceTools = [
  { name: "Hydraulische lift", icon: "🏗️", category: "Hefuitrusting" },
  { name: "Momentsleutel set", icon: "🔧", category: "Handgereedschap" },
  { name: "Compressor", icon: "🔄", category: "Pneumatisch" },
  { name: "Multimeter", icon: "📊", category: "Elektrisch" },
  { name: "Endoscoop camera", icon: "📹", category: "Inspectie" },
  { name: "Draadloze scanner", icon: "📱", category: "Diagnose" }
];

export default function MaintenancePage() {
  const { domain } = useDomain();

  if (domain !== "autotechniek") {
    return <div>Deze pagina is alleen beschikbaar voor het autotechniek domein.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Onderhoud & Reparatie
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Leer alle aspecten van voertuigonderhoud en reparatietechnieken. Van routineonderhoud tot complexe reparaties.
        </p>
      </div>

      {/* Maintenance Modules */}
      <div className="grid gap-6 lg:grid-cols-2">
        {maintenanceModules.map((module) => (
          <div
            key={module.id}
            className="overflow-hidden rounded-lg bg-white shadow border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {module.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  module.level === "Basis" 
                    ? "bg-green-100 text-green-800"
                    : module.level === "Gevorderd"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {module.level}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {module.description}
              </p>
            </div>
            
            <div className="px-6 py-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Procedures:</h4>
              <ul className="space-y-2">
                {module.procedures.map((procedure, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className={`w-4 h-4 mr-2 ${
                      module.color === "green" ? "text-green-500" :
                      module.color === "blue" ? "text-blue-500" :
                      module.color === "orange" ? "text-orange-500" : "text-purple-500"
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {procedure}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className={`flex-1 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
                  module.color === "green" ? "bg-green-600 hover:bg-green-700" :
                  module.color === "blue" ? "bg-blue-600 hover:bg-blue-700" :
                  module.color === "orange" ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700"
                }`}>
                  Start Training
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  Checklist Bekijken
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tools & Equipment Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gereedschap & Uitrusting</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {maintenanceTools.map((tool) => (
            <div key={tool.name} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-2xl mr-3">{tool.icon}</span>
              <div>
                <span className="text-sm font-medium text-gray-900 block">{tool.name}</span>
                <span className="text-xs text-gray-500">{tool.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Veiligheidsrichtlijnen Onderhoud & Reparatie
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Draag altijd persoonlijke beschermingsmiddelen (PBM)</li>
                <li>Controleer hefuitrusting voor gebruik</li>
                <li>Zorg voor adequate werkplaatsventilatie</li>
                <li>Houd werkplek schoon en opgeruimd</li>
                <li>Volg de juiste procedure bij gevaarlijke stoffen</li>
                <li>Gebruik juiste momentwaarden bij bevestigingen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Planning Onderhoud
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Werkbon Systeem
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Onderdelen Bestellen
        </button>
      </div>
    </div>
  );
}