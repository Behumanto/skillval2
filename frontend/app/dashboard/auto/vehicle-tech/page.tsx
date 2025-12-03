"use client";

import { useDomain } from "@/app/providers/domain-provider";

const vehicleTechModules = [
  {
    id: "motortech",
    title: "Motortechniek",
    description: "Motor systemen en componenten",
    topics: [
      "Verbrandingsmotoren",
      "Koelsystemen", 
      "Smeersystemen",
      "Brandstofsystemen"
    ],
    icon: "🔧",
    level: "Basis"
  },
  {
    id: "elektronica",
    title: "Voertuigelektronica",
    description: "Elektrische en elektronische systemen",
    topics: [
      "Accu en dynamo",
      "Ontstekingssysteem",
      "ECU diagnose",
      "CAN-bus systemen"
    ],
    icon: "⚡",
    level: "Gevorderd"
  },
  {
    id: "chassistechniek",
    title: "Chassistechniek", 
    description: "Onderstel en wielophanging",
    topics: [
      "Wielophanging",
      "Remsystemen",
      "Stuurinrichting",
      "Transmissie"
    ],
    icon: "🚗",
    level: "Gevorderd"
  },
  {
    id: "hybride",
    title: "Hybride & Elektrisch",
    description: "Nieuwe aandrijftechnologieën",
    topics: [
      "Hybride systemen",
      "Elektromotoren",
      "Batterijmanagement",
      "Laadsystemen"
    ],
    icon: "🔋",
    level: "Expert"
  }
];

export default function VehicleTechPage() {
  const { domain } = useDomain();

  if (domain !== "autotechniek") {
    return <div>Deze pagina is alleen beschikbaar voor het autotechniek domein.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Voertuigtechniek
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Technische kennis en vaardigheden voor moderne voertuigen. Van traditionele motoren tot elektrische aandrijving.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {vehicleTechModules.map((module) => (
          <div
            key={module.id}
            className="overflow-hidden rounded-lg bg-white shadow border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{module.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {module.title}
                  </h3>
                </div>
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
              <h4 className="text-sm font-medium text-gray-900 mb-3">Onderwerpen:</h4>
              <ul className="space-y-2">
                {module.topics.map((topic, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Module
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  Theorie Bekijken
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Veiligheid bij Voertuigtechniek
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Draag altijd veiligheidsuitrusting</li>
                <li>Zorg dat het voertuig veilig opgesteld staat</li>
                <li>Controleer werkgereedschap voor gebruik</li>
                <li>Volg ARBO-voorschriften voor werkplaatsveiligheid</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}