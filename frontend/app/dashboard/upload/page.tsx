"use client";

import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { EvidenceUploadSection } from "@/components/EvidenceUploadSection";
import { API_BASE_URL } from "../../../lib/api";
import { useTheme } from "../../providers/theme-provider";
import { useDomain } from "../../providers/domain-provider";

type CompetencyArea = {
  id: string;
  name: string;
  indicators: Array<{
    id: string;
    label: string;
    description: string;
  }>;
};

type Traject = {
  _id: string;
  name: string;
  domain: string;
  deskundigheidsgebieden: CompetencyArea[];
};

export default function UploadPage() {
  const { domain } = useDomain();
  const [traject, setTraject] = useState<Traject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<CompetencyArea | null>(null);
  const { theme } = useTheme();

  const isSamen = theme === "samenai";

  const palette = useMemo(
    () =>
      isSamen
        ? {
            activeBg: "bg-[#103b4a]",
            activeBorder: "border-[#2DA3B5]",
            activeText: "text-white",
            activeMeta: "text-[#7FAEC1]",
            inactiveBg: "bg-[#0b2533]",
            inactiveBorder: "border-[#1f4152]",
            inactiveText: "text-[#A3B1B6]",
            iconActive: "from-[#2DA3B5] to-[#D63384]",
            iconInactive: "bg-[#1b3646]",
            badgeBg: "bg-[#2DA3B5]/15",
            badgeText: "text-[#2DA3B5]",
          }
        : {
            activeBg: "bg-green-50",
            activeBorder: "border-green-500",
            activeText: "text-gray-900",
            activeMeta: "text-gray-600",
            inactiveBg: "bg-gray-50",
            inactiveBorder: "border-gray-200",
            inactiveText: "text-gray-900",
            iconActive: "from-green-500 to-green-400",
            iconInactive: "bg-gray-300",
            badgeBg: "bg-skillval-ocean/10",
            badgeText: "text-skillval-ocean",
          },
    [isSamen]
  );

  useEffect(() => {
    async function fetchTraject() {
      try {
        const response = await fetch(`${API_BASE_URL}/trajecten/domain/${domain}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setTraject(data[0]);
          // Selecteer eerste gebied als default
          if (data[0].deskundigheidsgebieden.length > 0) {
            setSelectedArea(data[0].deskundigheidsgebieden[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching traject:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTraject();
  }, [domain]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-900">Laden...</div>
      </div>
    );
  }

  if (!traject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Geen traject gevonden</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <h1 className="text-3xl font-bold text-gray-900">Bewijs Toevoegen</h1>
        <p className="mt-2 text-gray-600">
          Upload je bewijsmateriaal voor <strong>{traject.name}</strong>
        </p>
      </section>

      {/* Select Competency Area */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Kies een deskundigheidsgebied</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {traject.deskundigheidsgebieden.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area)}
              className={clsx(
                "p-4 rounded-xl border-2 text-left transition hover:shadow-lg",
                selectedArea?.id === area.id
                  ? `${palette.activeBg} ${palette.activeBorder} ${palette.activeText}`
                  : `${palette.inactiveBg} ${palette.inactiveBorder} ${palette.inactiveText} ${
                      isSamen ? "hover:border-[#2DA3B5]/40" : "hover:border-green-300"
                    }`
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-white",
                    selectedArea?.id === area.id
                      ? palette.iconActive
                      : isSamen
                      ? "from-[#173645] to-[#0d2632]"
                      : "from-gray-300 to-gray-300"
                  )}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={clsx(
                      "font-semibold text-sm",
                      selectedArea?.id === area.id ? (isSamen ? "text-white" : "text-green-900") : palette.inactiveText
                    )}
                  >
                    {area.name}
                  </h3>
                  <p
                    className={clsx(
                      "text-xs mt-1",
                      selectedArea?.id === area.id ? palette.activeMeta : palette.inactiveText
                    )}
                  >
                    {area.indicators.length} indicatoren
                  </p>
                </div>
                {selectedArea?.id === area.id && (
                  <svg
                    className={clsx("w-6 h-6 flex-shrink-0", isSamen ? "text-[#2DA3B5]" : "text-green-500")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Upload Section */}
      {selectedArea && (
        <EvidenceUploadSection
          competencyAreaId={selectedArea.id}
          competencyAreaName={selectedArea.name}
          indicators={selectedArea.indicators}
          onSuccess={() => {
            console.log("Upload succesvol!");
            // Optioneel: toon success message of redirect
          }}
        />
      )}
    </div>
  );
}
