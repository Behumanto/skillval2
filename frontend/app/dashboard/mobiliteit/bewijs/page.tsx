"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type BewijsType = "rijbewijs" | "rijervaring" | "cursus_certificaat" | "incident_rapport" | "voertuig_kennis" | "praktijkobservatie";

type MobiliteitBewijsstuk = {
  id: string;
  type: BewijsType;
  beschrijving: string;
  file_path?: string;
  upload_datum: string;
  geverifieerd: boolean;
  competentie_id: string;
  indicator_ids: string[];
};

const BEWIJS_TYPES: { value: BewijsType; label: string; description: string; voorbeelden: string[] }[] = [
  {
    value: "rijbewijs",
    label: "Rijbewijs",
    description: "Officiële rijbewijsdocumenten",
    voorbeelden: ["Scan van rijbewijs", "Uittreksel GWB", "Buitenlands rijbewijs met vertaling"]
  },
  {
    value: "rijervaring",
    label: "Rijervaring",
    description: "Bewijs van praktische rijervaring",
    voorbeelden: ["Ritregistratie", "Werkgeversverklaring", "Logboek privégebruik", "Tankbonnen over langere periode"]
  },
  {
    value: "cursus_certificaat",
    label: "Cursuscertificaat",
    description: "Certificaten van relevante cursussen",
    voorbeelden: ["Defensief rijden cursus", "Eco-driving training", "Eerste hulp cursus", "Professionele rijopleiding"]
  },
  {
    value: "incident_rapport",
    label: "Incident rapport",
    description: "Documenten over verkeerssituaties",
    voorbeelden: ["Schadeformulier", "Politierapport", "Evaluatie rijgedrag", "Incident analyse"]
  },
  {
    value: "voertuig_kennis",
    label: "Voertuigkennis",
    description: "Bewijs van technische kennis",
    voorbeelden: ["APK-keuring uitgevoerd", "Onderhoudslogboek", "Reparatie documenten", "Technische cursus certificaat"]
  },
  {
    value: "praktijkobservatie",
    label: "Praktijkobservatie",
    description: "Observatie van rijvaardigheden door professional",
    voorbeelden: ["Rijinstructeur beoordeling", "Bedrijfsrijtest", "Praktijkexamen", "360-graden feedback"]
  }
];

// Demo competenties (simpele versie voor deze pagina)
const COMPETENTIES = [
  { id: "comp_voertuigbeheersing", name: "Voertuigbeheersing" },
  { id: "comp_verkeersdeelname", name: "Verkeersdeelname" },
  { id: "comp_anticipatie", name: "Anticipatie en Risicobewustzijn" },
  { id: "comp_technisch", name: "Technische kennis en onderhoud" },
  { id: "comp_sociaal", name: "Sociale verantwoordelijkheid" }
];

export default function MobiliteitBewijsPage() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<BewijsType | "">("");
  const [selectedCompetentie, setSelectedCompetentie] = useState<string>("");
  const [beschrijving, setBeschrijving] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Pre-fill form if competentie/indicator is passed via URL
  useEffect(() => {
    const competentieId = searchParams.get("competentie");
    const indicatorId = searchParams.get("indicator");
    
    if (competentieId) {
      setSelectedCompetentie(competentieId);
    }
    
    // Auto-suggest bewijs type based on competentie
    if (competentieId === "comp_technisch") {
      setSelectedType("voertuig_kennis");
    } else if (competentieId === "comp_voertuigbeheersing") {
      setSelectedType("praktijkobservatie");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedCompetentie || !beschrijving) return;
    
    setUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploading(false);
    setUploadSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSelectedType("");
      setSelectedCompetentie("");
      setBeschrijving("");
      setFiles(null);
      setUploadSuccess(false);
    }, 3000);
  };

  const selectedBewijsType = BEWIJS_TYPES.find(t => t.value === selectedType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/mobiliteit"
            className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <p className="text-sm font-medium text-skillval-warm">EVC Mobiliteit</p>
            <h1 className="text-3xl font-bold text-gray-900">Bewijs Toevoegen</h1>
            <p className="text-gray-600">Upload documenten om je rijvaardigheden aan te tonen</p>
          </div>
        </div>
      </section>

      {uploadSuccess && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-green-900">Bewijs succesvol toegevoegd!</h3>
              <p className="text-sm text-green-700">Je bewijsstuk wordt nu beoordeeld door een assessor.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Upload Bewijsstuk</h2>
            
            {/* Bewijs Type */}
            <div>
              <label htmlFor="bewijsType" className="block text-sm font-semibold text-gray-900 mb-3">
                Type Bewijs <span className="text-red-500">*</span>
              </label>
              <select
                id="bewijsType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as BewijsType | "")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-skillval-warm focus:ring-skillval-warm focus:ring-opacity-20 focus:ring-4 transition"
                required
              >
                <option value="">Selecteer type bewijs...</option>
                {BEWIJS_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Competentie */}
            <div>
              <label htmlFor="competentie" className="block text-sm font-semibold text-gray-900 mb-3">
                Competentiegebied <span className="text-red-500">*</span>
              </label>
              <select
                id="competentie"
                value={selectedCompetentie}
                onChange={(e) => setSelectedCompetentie(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-skillval-warm focus:ring-skillval-warm focus:ring-opacity-20 focus:ring-4 transition"
                required
              >
                <option value="">Selecteer competentiegebied...</option>
                {COMPETENTIES.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Beschrijving */}
            <div>
              <label htmlFor="beschrijving" className="block text-sm font-semibold text-gray-900 mb-3">
                Beschrijving <span className="text-red-500">*</span>
              </label>
              <textarea
                id="beschrijving"
                value={beschrijving}
                onChange={(e) => setBeschrijving(e.target.value)}
                rows={4}
                placeholder="Beschrijf wat dit bewijsstuk toont en hoe het je competenties aantoont..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-skillval-warm focus:ring-skillval-warm focus:ring-opacity-20 focus:ring-4 transition resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Leg uit waarom dit bewijs relevant is voor de geselecteerde competentie.
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="files" className="block text-sm font-semibold text-gray-900 mb-3">
                Bestanden
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-skillval-warm transition">
                <input
                  type="file"
                  id="files"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="files"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Klik om bestanden te uploaden
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG, DOC (max 10MB per bestand)
                    </p>
                  </div>
                </label>
                {files && files.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">Geselecteerde bestanden:</p>
                    <ul className="space-y-1">
                      {Array.from(files).map((file, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading || !selectedType || !selectedCompetentie || !beschrijving}
                className="flex-1 bg-skillval-warm text-white font-bold py-3 px-6 rounded-xl hover:bg-skillval-bright transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Bewijs Uploaden
                  </>
                )}
              </button>
              <Link
                href="/dashboard/mobiliteit"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
              >
                Annuleren
              </Link>
            </div>
          </form>
        </div>

        {/* Sidebar - Help & Info */}
        <div className="space-y-6">
          {/* Selected Type Info */}
          {selectedBewijsType && (
            <div className="glass-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {selectedBewijsType.label}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedBewijsType.description}
              </p>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Voorbeelden:</p>
                <ul className="space-y-1">
                  {selectedBewijsType.voorbeelden.map((voorbeeld, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-skillval-warm">•</span>
                      {voorbeeld}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass-card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Tips voor goede bewijsstukken</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Zorg voor duidelijke, leesbare documenten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Voeg een beschrijving toe die de relevantie uitlegt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Gebruik recente documenten (afgelopen 5 jaar)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Meerdere bewijsstukken per competentie is beter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Combineer theorie met praktijkbewijzen</span>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="glass-card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🆘 Hulp nodig?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Niet zeker welk bewijs je nodig hebt? Onze assessoren helpen je graag.
            </p>
            <Link
              href="/dashboard/chat"
              className="inline-flex items-center gap-2 text-sm text-skillval-warm hover:text-skillval-bright font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat met assessor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}