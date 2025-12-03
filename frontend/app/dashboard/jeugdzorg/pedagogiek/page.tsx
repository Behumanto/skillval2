"use client";

export default function PedagogiekPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-skillval-warm rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedagogische Begeleiding</h1>
            <p className="text-gray-600 mt-1">Creëer veilige leeromgevingen en begeleid jeugdigen individueel</p>
          </div>
        </div>
      </div>

      {/* Competentiegebieden */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Veilige Leeromgeving</h2>
          <p className="text-gray-600 mb-4">
            Creëer een veilige en stimulerende leeromgeving voor jeugdigen in residentiële zorg.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-medium text-green-900">Fysieke veiligheid</h3>
              <p className="text-sm text-green-700">Waarborg een veilige fysieke omgeving</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-900">Emotionele veiligheid</h3>
              <p className="text-sm text-blue-700">Creëer emotionele stabiliteit en vertrouwen</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-medium text-purple-900">Leerklimaat</h3>
              <p className="text-sm text-purple-700">Stimuleer groei en ontwikkeling</p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Individuele Begeleiding</h2>
          <p className="text-gray-600 mb-4">
            Bied individuele begeleiding aangepast aan de specifieke behoeften van elke jeugdige.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-medium text-amber-900">Behoeftenanalyse</h3>
              <p className="text-sm text-amber-700">Identificeer individuele behoeften en sterke punten</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-medium text-teal-900">Persoonlijk plan</h3>
              <p className="text-sm text-teal-700">Ontwikkel op maat gemaakte begeleidingsplannen</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h3 className="font-medium text-red-900">Voortgangsmonitoring</h3>
              <p className="text-sm text-red-700">Evalueer en bijstel regelmatig de begeleiding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Praktijkvoorbeelden */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Praktijkvoorbeelden</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Case: Nieuwkomer Tim</h3>
            <p className="text-sm text-gray-600">
              Een nieuwe bewoner van 16 heeft moeite met vertrouwen. Hoe creëer je een veilige start?
            </p>
            <button className="mt-3 text-sm text-skillval-warm hover:text-skillval-bright font-medium">
              Bekijk case →
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Activiteit: Groepsgesprek</h3>
            <p className="text-sm text-gray-600">
              Faciliteer een groepsgesprek over huisregels en samenleving in de groep.
            </p>
            <button className="mt-3 text-sm text-skillval-warm hover:text-skillval-bright font-medium">
              Start activiteit →
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Reflectie: Eigen rol</h3>
            <p className="text-sm text-gray-600">
              Reflecteer op je eigen rol als pedagogisch begeleider en je impact op de groep.
            </p>
            <button className="mt-3 text-sm text-skillval-warm hover:text-skillval-bright font-medium">
              Start reflectie →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}