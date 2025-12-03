"use client";

import { useState } from "react";
import clsx from "clsx";
import { API_BASE_URL } from "../../lib/api";
import { useTheme } from "../providers/theme-provider";
import { useDomain } from "../providers/domain-provider";

type EvidenceUploadSectionProps = {
  competencyAreaId: string;
  competencyAreaName: string;
  indicators: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  candidateId?: string;
  onSuccess?: () => void;
};

// Domain-specifieke bewijscategorieën
const getDomainEvidenceCategories = (domain: "zorg" | "autotechniek") => {
  if (domain === "zorg") {
    return [
      { id: "patient-care", label: "Patiëntenzorg", icon: "❤️", description: "Direct contact met patiënten" },
      { id: "medical-procedures", label: "Medische handelingen", icon: "🏥", description: "Technische zorgprocedures" },
      { id: "communication", label: "Communicatie", icon: "💬", description: "Gesprekken en rapportages" },
      { id: "hygiene-safety", label: "Hygiëne & Veiligheid", icon: "🧼", description: "Infectiepreventie en veiligheid" },
      { id: "documentation", label: "Documentatie", icon: "📝", description: "Dossiervoering en verslaglegging" }
    ];
  } else {
    return [
      { id: "engine-work", label: "Motorwerkzaamheden", icon: "🔧", description: "Motor onderhoud en reparatie" },
      { id: "diagnostics", label: "Diagnose", icon: "🔍", description: "Foutcodes en technische diagnose" },
      { id: "electrical", label: "Elektrotechniek", icon: "⚡", description: "Elektrische systemen en bedrading" },
      { id: "chassis-work", label: "Chassis/Onderstel", icon: "🚗", description: "Remmen, ophanging, stuurwerk" },
      { id: "hybrid-electric", label: "Hybride/Elektrisch", icon: "🔋", description: "Nieuwe aandrijftechnologieën" },
      { id: "documentation", label: "Technische Rapporten", icon: "📊", description: "Werkbonnen en diagnoseverslagen" }
    ];
  }
};

export function EvidenceUploadSection({
  competencyAreaId,
  competencyAreaName,
  indicators,
  candidateId = "6900ece827a3b3e389c2275e",
  onSuccess,
}: EvidenceUploadSectionProps) {
  const { domain } = useDomain();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();
  const isSamen = theme === "samenai";
  
  const evidenceCategories = getDomainEvidenceCategories(domain);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Titel is verplicht");
      return;
    }

    if (!description.trim()) {
      setError("Beschrijving is verplicht");
      return;
    }

    if (!selectedCategory) {
      setError("Bewijscategorie is verplicht");
      return;
    }

    if (!selectedFile) {
      setError("Bestand is verplicht");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("candidate_id", candidateId);
      formData.append("competency_area_id", competencyAreaId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("evidence_category", selectedCategory);
      formData.append("file", selectedFile);

      const response = await fetch(
        `${API_BASE_URL}/evidence/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Upload gefaald");
      }

      const result = await response.json();
      console.log("Upload succesvol:", result);

      setSuccess(true);
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setSelectedFile(null);
        setSelectedCategory("");
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="upload-section" className="glass-card scroll-mt-20">
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-3"
          style={{
            backgroundColor: isSamen ? "rgba(45,163,181,0.18)" : "rgba(12,71,103,0.1)",
            color: isSamen ? "#2DA3B5" : "#0C4767",
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium">Bewijs uploaden</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Voeg je bewijs toe
        </h2>
        <p className="text-base text-gray-600">
          Voor: <span className={clsx("font-semibold", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}>{competencyAreaName}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Stap 1: Competenties overzicht */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            background: isSamen
              ? "linear-gradient(135deg, rgba(45,163,181,0.18), rgba(214,51,132,0.12))"
              : "linear-gradient(135deg, rgba(12,71,103,0.08), rgba(86,110,61,0.08))",
            borderColor: isSamen ? "rgba(45,163,181,0.35)" : "rgba(12,71,103,0.2)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                isSamen ? "bg-gradient-to-br from-[#2DA3B5] to-[#D63384]" : "bg-skillval-ocean"
              )}
            >
              1
            </div>
            <div>
              <h3 className={clsx("text-lg font-bold mb-3", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}>
                Dit zijn de competenties in dit gebied:
              </h3>
              <ul className="space-y-2.5">
                {indicators.slice(0, 3).map((indicator) => (
                  <li key={indicator.id} className="flex items-start">
                    <svg
                      className={clsx("w-5 h-5 mr-3 mt-0.5 flex-shrink-0", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={clsx("text-base font-medium", isSamen ? "text-white" : "text-skillval-ocean")}>{indicator.label}</span>
                  </li>
                ))}
                {indicators.length > 3 && (
                  <li className={clsx("italic ml-8 text-sm", isSamen ? "text-[#7FAEC1]" : "text-skillval-ocean/80")}
                  >
                    + nog {indicators.length - 3} andere competenties
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Stap 2: Bewijscategorie */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            background: isSamen
              ? "linear-gradient(135deg, rgba(45,163,181,0.18), rgba(214,51,132,0.12))"
              : "linear-gradient(135deg, rgba(12,71,103,0.08), rgba(86,110,61,0.08))",
            borderColor: isSamen ? "rgba(45,163,181,0.35)" : "rgba(12,71,103,0.2)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                isSamen ? "bg-gradient-to-br from-[#2DA3B5] to-[#D63384]" : "bg-skillval-ocean"
              )}
            >
              2
            </div>
            <div className="flex-1">
              <h3 className={clsx("text-lg font-bold mb-3", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}>
                Kies de juiste bewijscategorie *
              </h3>
              <p className={clsx("text-sm mb-4 leading-relaxed", isSamen ? "text-[#7FAEC1]" : "text-skillval-forest")}>
                Selecteer het type bewijs dat het beste bij jouw situatie past
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evidenceCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={clsx(
                      "p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02]",
                      selectedCategory === category.id
                        ? isSamen
                          ? "bg-[#2DA3B5]/20 border-[#2DA3B5] text-white"
                          : "bg-skillval-ocean/10 border-skillval-ocean text-skillval-ocean"
                        : isSamen
                        ? "bg-[#0a2633]/60 border-[#1f4152] text-[#A3B1B6] hover:border-[#2DA3B5]/40"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:border-skillval-ocean/40"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{category.label}</h4>
                        <p className={clsx(
                          "text-xs mt-1",
                          selectedCategory === category.id
                            ? isSamen ? "text-[#A3E6F0]" : "text-skillval-ocean/80"
                            : isSamen ? "text-[#7FAEC1]" : "text-gray-500"
                        )}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stap 3: Titel en Beschrijving */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            background: isSamen
              ? "linear-gradient(135deg, rgba(45,163,181,0.18), rgba(214,51,132,0.12))"
              : "linear-gradient(135deg, rgba(12,71,103,0.08), rgba(86,110,61,0.08))",
            borderColor: isSamen ? "rgba(45,163,181,0.35)" : "rgba(12,71,103,0.2)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                isSamen ? "bg-gradient-to-br from-[#2DA3B5] to-[#D63384]" : "bg-skillval-ocean"
              )}
            >
              3
            </div>
            <div className="flex-1 space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className={clsx("block text-lg font-bold mb-3", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}
                >
                  Titel van je bewijs *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={clsx(
                    "w-full px-5 py-4 border-2 rounded-xl text-base shadow-sm transition",
                    isSamen
                      ? "border-[#2DA3B5]/40 bg-[#0a2633] text-white placeholder-white/50 focus:border-[#2DA3B5] focus:ring-4 focus:ring-[#2DA3B5]/30"
                      : "border-skillval-ocean/30 bg-white focus:ring-4 focus:ring-skillval-ocean/25 focus:border-skillval-ocean"
                  )}
                  placeholder="Bijvoorbeeld: Begeleiding casus gezin met puber"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className={clsx("block text-lg font-bold mb-3", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}
                >
                  Beschrijf je bewijs *
                </label>
                <p className={clsx("text-sm mb-4 leading-relaxed", isSamen ? "text-[#7FAEC1]" : "text-skillval-forest")}
                >
                  Vertel ons wat je hebt gedaan. Denk aan: <strong>Wat was de situatie?</strong> <strong>Wat heb je gedaan?</strong> <strong>Wat was het resultaat?</strong>
                </p>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className={clsx(
                    "w-full px-5 py-4 border-2 rounded-xl resize-none text-base shadow-sm transition",
                    isSamen
                      ? "border-[#2DA3B5]/40 bg-[#0a2633] text-white placeholder-white/50 focus:border-[#2DA3B5] focus:ring-4 focus:ring-[#2DA3B5]/30"
                      : "border-skillval-ocean/30 bg-white focus:ring-4 focus:ring-skillval-ocean/25 focus:border-skillval-ocean"
                  )}
                  placeholder="Voorbeeld: Ik heb een gezin begeleid met een puber die schoolproblemen had. Ik heb samen met de ouders en school een plan opgesteld..."
                />
                <div
                  className="mt-3 flex items-start gap-2 rounded-lg p-3"
                  style={{
                    backgroundColor: isSamen ? "rgba(214, 51, 132, 0.16)" : "rgba(185, 164, 76, 0.15)",
                    border: `1px solid ${isSamen ? "rgba(214, 51, 132, 0.45)" : "rgba(185, 164, 76, 0.4)"}`,
                    color: isSamen ? "#FDE4F1" : undefined,
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: isSamen ? "#D63384" : undefined }}
                  >
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className={clsx("text-xs leading-relaxed", isSamen ? "text-[#FBD0E5]" : "text-skillval-gold")}
                  >
                    <strong>Privacy:</strong> Vermeld GEEN namen, BSN-nummers of andere privacygevoelige informatie van cliënten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stap 3: File upload */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            background: isSamen
              ? "linear-gradient(135deg, rgba(45,163,181,0.18), rgba(214,51,132,0.12))"
              : "linear-gradient(135deg, rgba(12,71,103,0.08), rgba(86,110,61,0.08))",
            borderColor: isSamen ? "rgba(45,163,181,0.35)" : "rgba(12,71,103,0.2)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                isSamen ? "bg-gradient-to-br from-[#2DA3B5] to-[#D63384]" : "bg-skillval-ocean"
              )}
            >
              4
            </div>
            <div className="flex-1">
              <label className={clsx("block text-lg font-bold mb-3", isSamen ? "text-[#2DA3B5]" : "text-skillval-ocean")}>
                Upload een bestand *
              </label>
              <p className={clsx("text-sm mb-4", isSamen ? "text-[#7FAEC1]" : "text-skillval-forest")}
              >
                Voeg bewijs toe zoals rapporten, foto&apos;s of audio-opnames
              </p>
              <div className={`border-3 border-dashed rounded-xl p-8 text-center transition-all ${
                selectedFile
                  ? "border-skillval-warm bg-skillval-warm/10"
                  : "border-skillval-ocean/30 bg-white hover:border-skillval-ocean hover:bg-skillval-ocean/5"
              }`}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.wav,.m4a"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {selectedFile ? (
                    <>
                      <svg className="w-16 h-16 text-skillval-forest mb-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base text-skillval-forest font-bold mb-1">
                        Bestand geselecteerd:
                      </span>
                      <span className="text-lg text-skillval-ocean font-semibold">
                        {selectedFile.name}
                      </span>
                      <span className="text-sm text-skillval-ocean/80 mt-2">
                        Klik om een ander bestand te kiezen
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="w-16 h-16 text-skillval-bright mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-base text-skillval-ocean font-semibold mb-2 block">
                        Klik om bestand te uploaden
                      </span>
                      <span className="text-sm text-skillval-ocean/80">
                        PDF, Word, afbeelding of audio
                      </span>
                      <span className="text-xs text-skillval-ocean/60 mt-1 block">
                        (maximaal 10MB)
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="rounded-2xl p-5 flex items-start gap-3"
            style={{
              backgroundColor: isSamen ? "rgba(214,51,132,0.16)" : "rgba(250,121,33,0.1)",
              border: `2px solid ${isSamen ? "rgba(214,51,132,0.45)" : "rgba(250,121,33,0.4)"}`,
            }}
          >
            <svg
              className="w-6 h-6 flex-shrink-0"
              style={{ color: isSamen ? "#D63384" : "#FA7921" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className={clsx("font-bold mb-1", isSamen ? "text-[#D63384]" : "text-skillval-warm")}>Er is iets misgegaan</p>
              <p className={clsx("text-sm", isSamen ? "text-[#E28CB7]" : "text-skillval-warm/80")}>{error}</p>
            </div>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div
            className="rounded-2xl p-5 flex items-start gap-3"
            style={{
              backgroundColor: isSamen ? "rgba(45,163,181,0.16)" : "rgba(86,110,61,0.1)",
              border: `2px solid ${isSamen ? "rgba(45,163,181,0.4)" : "rgba(86,110,61,0.4)"}`,
            }}
          >
            <svg
              className="w-6 h-6 flex-shrink-0"
              style={{ color: isSamen ? "#2DA3B5" : "#566E3D" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className={clsx("font-bold mb-1", isSamen ? "text-[#2DA3B5]" : "text-skillval-forest")}>Gelukt!</p>
              <p className={clsx("text-sm", isSamen ? "text-[#9CD6E1]" : "text-skillval-forest/80")}>
                Je bewijs is succesvol toegevoegd aan je portfolio.
              </p>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-skillval-ocean to-skillval-warm hover:from-skillval-warm hover:to-skillval-bright text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-base"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Bezig met uploaden...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Bewijs toevoegen
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
