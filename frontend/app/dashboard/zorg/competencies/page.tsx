"use client";

import { useDomain } from "@/app/providers/domain-provider";

const zorgCompetencies = [
  {
    id: "patientenzorg",
    name: "Patiëntenzorg",
    description: "Zorg verlenen aan patiënten met verschillende behoeften",
    indicators: [
      "Basiszorg verlenen",
      "Patiëntenveiligheid waarborgen",
      "Medicatie toedienen",
      "Vitale functies meten"
    ]
  },
  {
    id: "communicatie",
    name: "Communicatie in de Zorg",
    description: "Effectief communiceren met patiënten en collega's",
    indicators: [
      "Empathisch communiceren",
      "Slecht nieuws gesprekken",
      "Multidisciplinair overleg",
      "Rapportage en documentatie"
    ]
  },
  {
    id: "ethiek",
    name: "Ethiek en Professionaliteit",
    description: "Handelen volgens professionele en ethische richtlijnen",
    indicators: [
      "Privacy en beroepsgeheim",
      "Informed consent",
      "Dilemma's herkennen",
      "Reflectie op handelen"
    ]
  }
];

export default function ZorgCompetenciesPage() {
  const { domain } = useDomain();

  if (domain !== "zorg") {
    return <div>Deze pagina is alleen beschikbaar voor de zorgdomein.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Zorgcompetenties
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Overzicht van alle competenties binnen het zorgdomein. Hier kunt u uw voortgang bijhouden en bewijs uploaden.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {zorgCompetencies.map((competency) => (
          <div
            key={competency.id}
            className="overflow-hidden rounded-lg bg-white shadow border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {competency.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {competency.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Indicatoren:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {competency.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Bewijs Uploaden
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}