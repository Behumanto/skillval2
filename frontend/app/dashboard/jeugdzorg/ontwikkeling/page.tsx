"use client";

export default function OntwikkelingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ontwikkelingsgerichte Zorg</h1>
            <p className="text-gray-600 mt-1">Stimuleer groei, zelfstandigheid en toekomstperspectief</p>
          </div>
        </div>
      </div>

      {/* Ontwikkelingsfases */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ontwikkelingsfases & Doelen</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">12-14</div>
            <h3 className="font-medium text-blue-900 mb-2">Vroege adolescentie</h3>
            <ul className="text-xs text-blue-700 text-left space-y-1">
              <li>• Identiteitsontwikkeling</li>
              <li>• Sociale vaardigheden</li>
              <li>• Emotieregulatie</li>
              <li>• Schoolprestaties</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">15-16</div>
            <h3 className="font-medium text-green-900 mb-2">Midden adolescentie</h3>
            <ul className="text-xs text-green-700 text-left space-y-1">
              <li>• Autonomie ontwikkeling</li>
              <li>• Peer relationships</li>
              <li>• Risicobewustzijn</li>
              <li>• Toekomstoriëntatie</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">17-18</div>
            <h3 className="font-medium text-purple-900 mb-2">Late adolescentie</h3>
            <ul className="text-xs text-purple-700 text-left space-y-1">
              <li>• Zelfstandigheidstraining</li>
              <li>• Carrière oriëntatie</li>
              <li>• Volwassen relaties</li>
              <li>• Financiële geletterdheid</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">18+</div>
            <h3 className="font-medium text-orange-900 mb-2">Jongvolwassene</h3>
            <ul className="text-xs text-orange-700 text-left space-y-1">
              <li>• Zelfstandig wonen</li>
              <li>• Werk/studie</li>
              <li>• Gezonde relaties</li>
              <li>• Maatschappelijke participatie</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ontwikkelingsplannen */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Persoonlijke Ontwikkelingsplannen</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-medium text-green-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                SMART-doelen stellen
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Voortgangsmonitoring
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Regelmatige evaluatie en bijstelling van doelen en interventies
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-medium text-purple-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Participatieve aanpak
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                Jeugdige centraal in het opstellen en evalueren van doelen
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Zelfstandigheidstraining</h2>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900">🏠 Dagelijkse vaardigheden</h4>
              <p className="text-sm text-amber-700">Koken, schoonmaken, boodschappen, hygiëne</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <h4 className="font-medium text-teal-900">💰 Financiële vaardigheden</h4>
              <p className="text-sm text-teal-700">Budgetbeheer, bankzaken, belastingen</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900">🏥 Gezondheid & welzijn</h4>
              <p className="text-sm text-red-700">Zelfzorg, artsbezoek, medicatiebeheer</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-indigo-900">🏢 Maatschappelijke vaardigheden</h4>
              <p className="text-sm text-indigo-700">Werk zoeken, netwerken, officiële instanties</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <h4 className="font-medium text-pink-900">🤝 Sociale vaardigheden</h4>
              <p className="text-sm text-pink-700">Relaties onderhouden, conflicthantering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toekomstoriëntatie */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Toekomstperspectief Ontwikkelen</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-skillval-warm rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Onderwijs & Opleiding</h3>
            <p className="text-sm text-gray-600 mb-3">
              Ontdek interesses, talenten en mogelijkheden voor verdere studie of vakopleidingen.
            </p>
            <ul className="text-xs text-gray-500 text-left space-y-1">
              <li>• Studiekeuzebegeleiding</li>
              <li>• Schoolbezoeken en open dagen</li>
              <li>• Leermoeilijkheden adresseren</li>
              <li>• Financieringsmogelijkheden</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-skillval-bright rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Werk & Carrière</h3>
            <p className="text-sm text-gray-600 mb-3">
              Verken beroepsmogelijkheden en ontwikkel werkgerelateerde vaardigheden.
            </p>
            <ul className="text-xs text-gray-500 text-left space-y-1">
              <li>• Stages en werkervaringen</li>
              <li>• CV en sollicitatietraining</li>
              <li>• Jobcoaching en begeleiding</li>
              <li>• Ondernemerschap verkennen</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-skillval-ocean rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Persoonlijke Relaties</h3>
            <p className="text-sm text-gray-600 mb-3">
              Bouw gezonde, duurzame relaties en ontwikkel sociale netwerken.
            </p>
            <ul className="text-xs text-gray-500 text-left space-y-1">
              <li>• Vriendschappen cultiveren</li>
              <li>• Romantische relaties</li>
              <li>• Gezinsrelaties herstellen</li>
              <li>• Community involvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}