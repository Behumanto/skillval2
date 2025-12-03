"use client";

export default function SysteemPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Samenwerking met Systeem</h1>
            <p className="text-gray-600 mt-1">Betrek gezin, school en netwerk bij de begeleiding</p>
          </div>
        </div>
      </div>

      {/* Systeemkaart */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Het systeem van de jeugdige</h2>
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-skillval-warm rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              Jeugdige
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mx-auto mb-2 shadow-md">
                Gezin
              </div>
              <h3 className="font-medium text-gray-900">Familie</h3>
              <p className="text-sm text-gray-600">Ouders, broers/zussen</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mx-auto mb-2 shadow-md">
                School
              </div>
              <h3 className="font-medium text-gray-900">Onderwijs</h3>
              <p className="text-sm text-gray-600">Leraren, mentoren</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium mx-auto mb-2 shadow-md">
                Hulp
              </div>
              <h3 className="font-medium text-gray-900">Professionals</h3>
              <p className="text-sm text-gray-600">GGZ, maatschappelijk werk</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium mx-auto mb-2 shadow-md">
                Peers
              </div>
              <h3 className="font-medium text-gray-900">Netwerk</h3>
              <p className="text-sm text-gray-600">Vrienden, hobby's</p>
            </div>
          </div>
        </div>
      </div>

      {/* Samenwerkingsvaardigheden */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gezinssysteem Betrekken</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-medium text-green-900">Ouders als partners</h3>
              <p className="text-sm text-green-700 mt-1">
                Erken ouders als experts van hun kind en werk samen aan doelen.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-900">Gezinsdynamiek</h3>
              <p className="text-sm text-blue-700 mt-1">
                Begrijp patronen en interacties binnen het gezinssysteem.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-medium text-purple-900">Ouderbetrokkenheid</h3>
              <p className="text-sm text-purple-700 mt-1">
                Faciliteer actieve betrokkenheid van ouders bij het begeleidingsproces.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Multidisciplinair Teamwerk</h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-medium text-amber-900">Effectieve communicatie</h3>
              <p className="text-sm text-amber-700 mt-1">
                Zorg voor heldere, tijdige communicatie tussen alle betrokkenen.
              </p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-medium text-teal-900">Gedeelde visie</h3>
              <p className="text-sm text-teal-700 mt-1">
                Werk aan een gemeenschappelijke visie en doelen voor de jeugdige.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h3 className="font-medium text-red-900">Rol en verantwoordelijkheid</h3>
              <p className="text-sm text-red-700 mt-1">
                Verduidelijk ieders rol en verantwoordelijkheid in het team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlegstructuren */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overlegstructuren & Communicatie</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Gezinsgesprekken
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Maandelijks evaluatiegesprek</li>
              <li>• Doelen en voortgang bespreken</li>
              <li>• Zorgen en wensen inventariseren</li>
              <li>• Thuissituatie afstemmen</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Zorgoverleg
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Multidisciplinair teamoverleg</li>
              <li>• Casusbespreking en -planning</li>
              <li>• Risico-evaluatie</li>
              <li>• Behandelplan afstemming</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Netwerkcommunicatie
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Contact met school en leraren</li>
              <li>• Afstemming vrijetijdsactiviteiten</li>
              <li>• Communicatie externe hulpverlening</li>
              <li>• Rapportage aan voogdij/GI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}