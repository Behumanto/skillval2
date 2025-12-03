"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
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

// Mock data voor gedane indicatoren (later uit backend halen)
const completedIndicators = new Set([
  "dg1-i1", "dg1-i2", "dg1-i3", "dg1-i4", // 4 van 5 in gebied 1
  "dg2-i1", "dg2-i2", "dg2-i3", "dg2-i4", // 4 van 5 in gebied 2
  "dg3-i1", "dg3-i2", // 2 van 5 in gebied 3
  "dg4-i1", "dg4-i2", "dg4-i3", // 3 van 5 in gebied 4
  "dg5-i1", "dg5-i2", // 2 van 5 in gebied 5
]);

export default function CompetenciesPage() {
  const { domain } = useDomain();
  const [traject, setTraject] = useState<Traject | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const { theme } = useTheme();
  const isSamen = theme === "samenai";

  const statusPalette = useMemo(
    () =>
      isSamen
        ? {
            high: {
              icon: "bg-gradient-to-br from-[#2DA3B5] to-[#6FE1F2]",
              chip: "text-[#2DA3B5]",
              progress: "bg-gradient-to-r from-[#2DA3B5] via-[#58D5E8] to-[#92ECF8]",
              track: "bg-[#0b2f3b]",
              cardCompleted: "bg-[#123b4a]/70 border-[#2DA3B5]/35",
              cardPending: "bg-[#2d1a3f]/60 border-[#D63384]/35",
              indicatorCompleted: "bg-[#2DA3B5]",
              indicatorPending: "bg-[#D63384]",
              textCompleted: "text-[#BFF2F8]",
              textPending: "text-[#FAD1E7]",
            },
            medium: {
              icon: "bg-gradient-to-br from-[#D63384] to-[#F06AA8]",
              chip: "text-[#D63384]",
              progress: "bg-gradient-to-r from-[#D63384] via-[#F06AA8] to-[#F8A8CA]",
              track: "bg-[#2d1a3f]",
              cardCompleted: "bg-[#123b4a]/70 border-[#2DA3B5]/35",
              cardPending: "bg-[#2d1a3f]/60 border-[#D63384]/35",
              indicatorCompleted: "bg-[#2DA3B5]",
              indicatorPending: "bg-[#D63384]",
              textCompleted: "text-[#BFF2F8]",
              textPending: "text-[#FBC6E1]",
            },
            low: {
              icon: "bg-gradient-to-br from-[#ff6b6b] to-[#ffaa80]",
              chip: "text-[#FF928A]",
              progress: "bg-gradient-to-r from-[#FF6B6B] via-[#FF8E8E] to-[#FFC1C1]",
              track: "bg-[#3f1f2d]",
              cardCompleted: "bg-[#123b4a]/70 border-[#2DA3B5]/35",
              cardPending: "bg-[#3f1f2d]/60 border-[#FF6B6B]/35",
              indicatorCompleted: "bg-[#2DA3B5]",
              indicatorPending: "bg-[#FF6B6B]",
              textCompleted: "text-[#BFF2F8]",
              textPending: "text-[#FFC9C9]",
            },
          }
        : {
            high: {
              icon: "bg-green-500",
              chip: "text-green-600",
              progress: "bg-green-500",
              track: "bg-gray-200",
              cardCompleted: "bg-green-50 border-green-200",
              cardPending: "bg-red-50 border-red-200",
              indicatorCompleted: "bg-green-500",
              indicatorPending: "bg-red-500",
              textCompleted: "text-green-900",
              textPending: "text-red-900",
            },
            medium: {
              icon: "bg-amber-500",
              chip: "text-amber-600",
              progress: "bg-amber-500",
              track: "bg-gray-200",
              cardCompleted: "bg-green-50 border-green-200",
              cardPending: "bg-red-50 border-red-200",
              indicatorCompleted: "bg-green-500",
              indicatorPending: "bg-red-500",
              textCompleted: "text-green-900",
              textPending: "text-red-900",
            },
            low: {
              icon: "bg-red-500",
              chip: "text-red-600",
              progress: "bg-red-500",
              track: "bg-gray-200",
              cardCompleted: "bg-green-50 border-green-200",
              cardPending: "bg-red-50 border-red-200",
              indicatorCompleted: "bg-green-500",
              indicatorPending: "bg-red-500",
              textCompleted: "text-green-900",
              textPending: "text-red-900",
            },
          },
    [isSamen]
  );

  const resolveStatus = (percentage: number) => {
    if (percentage >= 80) return statusPalette.high;
    if (percentage >= 60) return statusPalette.medium;
    return statusPalette.low;
  };

  useEffect(() => {
    async function fetchTraject() {
      try {
        const response = await fetch(`${API_BASE_URL}/trajecten/domain/${domain}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setTraject(data[0]);
          // Open eerste gebied default
          if (data[0].deskundigheidsgebieden.length > 0) {
            setExpandedArea(data[0].deskundigheidsgebieden[0].id);
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
        <h1 className="text-3xl font-bold text-gray-900">Competenties Overzicht</h1>
        <p className="mt-2 text-gray-600">
          Alle deskundigheidsgebieden en indicatoren voor <strong>{traject.name}</strong>
        </p>
      </section>

      {/* Competency Areas */}
      <div className="space-y-4">
        {traject.deskundigheidsgebieden.map((area) => {
          const completedCount = area.indicators.filter(ind => completedIndicators.has(ind.id)).length;
          const totalCount = area.indicators.length;
          const percentage = Math.round((completedCount / totalCount) * 100);
          const isExpanded = expandedArea === area.id;
          const status = resolveStatus(percentage);

          return (
            <section key={area.id} className="glass-card">
              {/* Area Header */}
              <button
                onClick={() => setExpandedArea(isExpanded ? null : area.id)}
                className={clsx("w-full flex items-center justify-between -m-6 p-6 rounded-3xl transition", isSamen ? "hover:bg-[#102c39]/60" : "hover:bg-gray-50")}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={clsx(
                      "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white",
                      status.icon
                    )}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>

                  <div className="flex-1 text-left">
                    <h2 className="text-xl font-bold text-gray-900">{area.name}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={clsx("text-sm", isSamen ? "text-[#8FA7B1]" : "text-gray-600")}>
                        {completedCount} van {totalCount} indicatoren voltooid
                      </span>
                      <span className={clsx("text-sm font-bold", status.chip)}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Progress Bar */}
              <div
                className="mt-4 h-3 rounded-full overflow-hidden"
                style={{
                  background: isSamen ? status.track : "#e5e7eb",
                  boxShadow: isSamen ? "inset 0 0 12px rgba(0,0,0,0.35)" : undefined,
                }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    background: isSamen ? status.progress : undefined,
                    backgroundColor: !isSamen
                      ? percentage >= 80
                        ? "#22c55e"
                        : percentage >= 60
                        ? "#f59e0b"
                        : "#ef4444"
                      : undefined,
                  }}
                />
              </div>

              {/* Indicators List */}
              {isExpanded && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Indicatoren</h3>
                    <Link
                      href="/dashboard/upload"
                      className={clsx("text-sm font-medium flex items-center gap-1", isSamen ? "text-[#2DA3B5] hover:text-[#6FE1F2]" : "text-green-600 hover:text-green-700")}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Bewijs toevoegen
                    </Link>
                  </div>

                  {area.indicators.map((indicator) => {
                    const isCompleted = completedIndicators.has(indicator.id);

                    return (
                      <div
                        key={indicator.id}
                        className={clsx(
                          "p-4 rounded-xl border-2 transition",
                          isSamen
                            ? isCompleted
                              ? "bg-[#123b4a]/70 border-[#2DA3B5]/35"
                              : "bg-[#2d1a3f]/60 border-[#D63384]/35"
                            : isCompleted
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={clsx(
                              "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white",
                              isSamen
                                ? isCompleted
                                  ? "bg-[#2DA3B5]"
                                  : "bg-[#D63384]"
                                : isCompleted
                                ? "bg-green-500"
                                : "bg-red-500"
                            )}
                          >
                            {isCompleted ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4
                                  className={clsx(
                                    "font-semibold",
                                    isSamen
                                      ? isCompleted
                                        ? "text-[#BFF2F8]"
                                        : "text-[#FBC6E1]"
                                      : isCompleted
                                      ? "text-green-900"
                                      : "text-red-900"
                                  )}
                                >
                                  {indicator.label}
                                </h4>
                                <p
                                  className={clsx(
                                    "mt-1 text-sm",
                                    isSamen
                                      ? isCompleted
                                        ? "text-[#8FBECB]"
                                        : "text-[#E8A6C3]"
                                      : isCompleted
                                      ? "text-green-700"
                                      : "text-red-700"
                                  )}
                                >
                                  {indicator.description}
                                </p>
                              </div>

                              <span
                                className={clsx(
                                  "px-3 py-1 rounded-full text-xs font-bold flex-shrink-0",
                                  isSamen
                                    ? isCompleted
                                      ? "bg-[#2DA3B5]/18 text-[#9ADBE6]"
                                      : "bg-[#D63384]/18 text-[#F4ADC9]"
                                    : isCompleted
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                                )}
                              >
                                {isCompleted ? "Voltooid" : "Nog bewijzen"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Action Button */}
      <div
        className={clsx(
          "glass-card",
          isSamen ? "bg-gradient-to-r from-[#2DA3B5]/15 to-[#D63384]/20" : "bg-gradient-to-r from-green-50 to-emerald-50"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Klaar om bewijs toe te voegen?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Selecteer een deskundigheidsgebied en upload je bewijsmateriaal
            </p>
          </div>
          <Link
            href="/dashboard/upload"
            className={clsx(
              "px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center gap-2",
              isSamen
                ? "bg-gradient-to-r from-[#D63384] to-[#2DA3B5] hover:from-[#C42777] hover:to-[#28A2B4]"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Bewijs toevoegen
          </Link>
        </div>
      </div>
    </div>
  );
}
