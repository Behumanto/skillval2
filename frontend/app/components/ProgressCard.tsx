"use client";

import clsx from "clsx";

type ProgressCardProps = {
  title: string;
  coveragePct: number; // 0..100
  missingIndicators?: string[];
  competencyAreaId?: string;
  indicators?: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  onAddEvidence?: () => void;
};

export function ProgressCard({
  title,
  coveragePct,
  missingIndicators = [],
  competencyAreaId = "",
  indicators = [],
  onAddEvidence,
}: ProgressCardProps) {

  // clamp naar 0-100 voor veiligheid
  const pct = Math.min(100, Math.max(0, coveragePct));

  // statuskleur logic (groen / oranje) puur op coveragePct
  const statusLabel =
    pct >= 70 ? "Voldoende" : pct >= 40 ? "Bijna" : "Onvoldoende";

  const statusClass = clsx(
    "rounded-md border px-2 py-1 text-[10px] font-medium leading-none",
    pct >= 70
      ? "bg-skillval-forest/10 text-skillval-forest border-skillval-forest/30"
      : pct >= 40
      ? "bg-skillval-gold/15 text-skillval-gold border-skillval-gold/35"
      : "bg-skillval-warm/15 text-skillval-warm border-skillval-warm/35"
  );

  return (
    <article className="rounded-xl border border-skillval-ocean/15 bg-white/95 backdrop-blur-sm shadow-lg p-4">
      {/* Header: titel + status chip */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <p className="text-[11px] text-skillval-ocean/70">
            Dekking: {pct}% van de indicatoren
          </p>
        </div>

        <span className={statusClass}>{statusLabel}</span>
      </header>

      {/* voortgangsbalk */}
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-skillval-ocean/10 overflow-hidden">
          <div
            className={clsx(
              "h-full rounded-full transition-all",
              pct >= 70
                ? "bg-skillval-forest"
                : pct >= 40
                ? "bg-skillval-gold"
                : "bg-skillval-warm"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* lijst met ontbrekende indicatoren */}
      {missingIndicators.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] text-skillval-ocean/70 mb-1 font-medium">
            Nog aan te tonen competenties:
          </p>
          <ul className="text-[11px] text-slate-700 list-disc pl-4 space-y-0.5">
            {missingIndicators.map((ind, i) => (
              <li key={i}>{ind}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-[11px] leading-snug text-skillval-ocean/60">
        Voeg bewijsmateriaal toe zodat de assessor kan zien hoe jij dit in de
        praktijk toepast.
      </p>

      <button
        onClick={onAddEvidence}
        className="mt-3 inline-flex items-center rounded-full bg-skillval-ocean hover:bg-skillval-ocean/90 px-3 py-2 text-[12px] font-semibold text-white border border-skillval-ocean/60 hover:-translate-y-0.5 active:translate-y-0 transition will-change-transform shadow-md shadow-skillval-ocean/40"
      >
        Voeg bewijs toe
      </button>
    </article>
  );
}
