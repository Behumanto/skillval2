"use client";

export default function CrisisPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Crisisinterventie & Veiligheid</h1>
            <p className="text-gray-600 mt-1">Herken en handel adequaat bij crisissituaties</p>
          </div>
        </div>
      </div>

      {/* Alert Protocol */}
      <div className="glass-card border-l-4 border-red-500 bg-red-50">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold text-red-900">Crisis Protocol</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
            <h3 className="font-medium text-red-900">Herken</h3>
            <p className="text-sm text-red-700">Signalen en risicofactoren</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
            <h3 className="font-medium text-red-900">Evalueer</h3>
            <p className="text-sm text-red-700">Risico en urgentie</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
            <h3 className="font-medium text-red-900">Handel</h3>
            <p className="text-sm text-red-700">De-escalatie technieken</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">4</div>
            <h3 className="font-medium text-red-900">Evalueer</h3>
            <p className="text-sm text-red-700">Nabespreking en leren</p>
          </div>
        </div>
      </div>

      {/* Competentiegebieden */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">De-escalatie Technieken</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Verbale De-escalatie</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Kalme, lage stem gebruiken</li>
                <li>• Actief luisteren en valideren</li>
                <li>• Open vragen stellen</li>
                <li>• Alternatieven bieden</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Lichaamshouding</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Open, niet-dreigende houding</li>
                <li>• Veilige afstand bewaren</li>
                <li>• Oogcontact vermijden bij agressie</li>
                <li>• Ontspannen ademhaling</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">Omgevingsfactoren</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Rustige, veilige ruimte zoeken</li>
                <li>• Prikkels minimaliseren</li>
                <li>• Uitgangsroute vrijhouden</li>
                <li>• Ondersteuning oproepen</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trauma-sensitief Werken</h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-medium text-amber-900">Trauma-geïnformeerd</h3>
              <p className="text-sm text-amber-700 mt-1">
                Begrijp de impact van trauma op gedrag en ontwikkeling van jeugdigen.
              </p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-medium text-teal-900">Veiligheid voorop</h3>
              <p className="text-sm text-teal-700 mt-1">
                Creëer fysieke en emotionele veiligheid in alle interacties.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <h3 className="font-medium text-indigo-900">Vertrouwen opbouwen</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Werk systematisch aan het herstel van vertrouwen en zelfwaardering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Noodcontacten */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Noodcontacten & Procedures</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-medium text-red-900 mb-2">🚨 Direct gevaar</h3>
            <p className="text-sm text-red-700 mb-2">Politie: 112</p>
            <p className="text-sm text-red-700 mb-2">Ambulance: 112</p>
            <p className="text-sm text-red-700">Teamleider: 06-12345678</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-medium text-orange-900 mb-2">⚠️ Crisis ondersteuning</h3>
            <p className="text-sm text-orange-700 mb-2">Crisis team: 06-87654321</p>
            <p className="text-sm text-orange-700 mb-2">GGZ crisis: 0800-0430</p>
            <p className="text-sm text-orange-700">Kindertelefoon: 0800-0432</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">💭 Nazorg</h3>
            <p className="text-sm text-blue-700 mb-2">Supervisor: 06-11223344</p>
            <p className="text-sm text-blue-700 mb-2">EAP: 0800-1234</p>
            <p className="text-sm text-blue-700">Peer support: intern</p>
          </div>
        </div>
      </div>
    </div>
  );
}