interface ReportPreviewCardProps {
  draftText: string;
}

// Conceptverslag dat assessor ontvangt na AI-verwerking van observaties + portfolio.
export function ReportPreviewCard({ draftText }: ReportPreviewCardProps) {
  return (
    <section className="glass-card space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-skillval-night">Concept assessor rapport</h3>
          <p className="text-xs text-slate-500">
            Automatisch gegenereerd op basis van live observaties en portfolio-evidence.
          </p>
        </div>
        <span className="status-pill bg-skillval-lilac/20 text-skillval-lilac">Concept</span>
      </header>
      <article className="rounded-2xl bg-white/80 p-4 text-sm text-slate-600 shadow-inner">
        {draftText || "Nog geen concept beschikbaar. Voeg observaties toe en genereer het rapport."}
      </article>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-skillval-emerald px-4 py-2 text-sm font-semibold text-white shadow-float">
          Akkoord
        </button>
        <button className="rounded-full border border-skillval-sky px-4 py-2 text-sm font-semibold text-skillval-sky">
          Bewerk
        </button>
      </div>
    </section>
  );
}
