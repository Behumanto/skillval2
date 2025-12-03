"use client";

import { useDomain } from "@/app/providers/domain-provider";

const patientCareModules = [
  {
    id: "basiszorg",
    title: "Basiszorg",
    description: "Fundamentele zorgtaken en patiëntenzorg",
    topics: [
      "Hygiëne en infectiepreventie",
      "Mobiliteit en transfers",
      "Voeding en dieet",
      "Comfort en welzijn"
    ],
    level: "Basis"
  },
  {
    id: "medische-zorg",
    title: "Medische Zorg",
    description: "Medisch-technische handelingen",
    topics: [
      "Medicatietoediening",
      "Wondverzorging",
      "Vitale functies",
      "Medische apparatuur"
    ],
    level: "Gevorderd"
  },
  {
    id: "psychosociale-zorg",
    title: "Psychosociale Zorg",
    description: "Emotionele ondersteuning en begeleiding",
    topics: [
      "Gesprekstechnieken",
      "Omgaan met verdriet",
      "Familie-ondersteuning",
      "Cultuurse nsitiviteit"
    ],
    level: "Gevorderd"
  }
];

export default function PatientCarePage() {
  const { domain } = useDomain();

  if (domain !== "zorg") {
    return <div>Deze pagina is alleen beschikbaar voor de zorgdomein.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Patiëntenzorg
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Leer en oefen essentiële vaardigheden voor patiëntenzorg. Van basiszorg tot complexe medische handelingen.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {patientCareModules.map((module) => (
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
                    : "bg-blue-100 text-blue-800"
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
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Start Module
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  Voortgang Bekijken
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Tips voor Patiëntenzorg
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Luister actief naar de behoeften van de patiënt</li>
                <li>Zorg altijd voor hygiëne voor en na contact</li>
                <li>Respecteer privacy en waardigheid</li>
                <li>Documenteer alle belangrijke observaties</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}