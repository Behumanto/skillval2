"use client";

import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <h1 className="text-3xl font-bold text-gray-900">Mijn Profiel</h1>
        <p className="mt-2 text-gray-600">Bekijk en bewerk je persoonlijke informatie</p>
      </section>

      {/* Profile Card */}
      <section className="glass-card">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/ramin.jpeg"
                alt="Ramin"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-medium rounded-lg transition">
              Wijzig foto
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voornaam
                </label>
                <input
                  type="text"
                  defaultValue="Ramin"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achternaam
                </label>
                <input
                  type="text"
                  defaultValue=""
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mailadres
              </label>
              <input
                type="email"
                defaultValue="ramin@skillval.nl"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefoonnummer
              </label>
              <input
                type="tel"
                defaultValue="+31 6 12 34 56 78"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geboortedatum
              </label>
              <input
                type="date"
                defaultValue="1995-03-15"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
            Annuleren
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
            Opslaan
          </button>
        </div>
      </section>

      {/* Additional Info */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Over mij</h2>
        <textarea
          rows={6}
          defaultValue="Ik ben een gedreven sociaal-pedagogisch werker in de jeugdzorg met passie voor het begeleiden van jongeren en hun gezinnen. Momenteel werk ik aan het behalen van mijn EVC-erkenning om mijn opgedane competenties formeel te laten erkennen."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-3 gap-6">
        <div className="glass-card text-center">
          <div className="text-4xl font-bold text-green-600">73%</div>
          <p className="mt-2 text-sm text-gray-600">Portfolio compleet</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-4xl font-bold text-green-600">18</div>
          <p className="mt-2 text-sm text-gray-600">Bewijsstukken</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-4xl font-bold text-green-600">5</div>
          <p className="mt-2 text-sm text-gray-600">Maanden actief</p>
        </div>
      </section>
    </div>
  );
}
