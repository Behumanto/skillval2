// Signaleert mogelijke AI-gegenereerde stukken zodat begeleider gericht opvolgt.
interface FraudFlag {
  id: string;
  severity: "high" | "medium" | "low";
  message: string;
}

const severityStyles = {
  high: "border-skillval-crimson/60 bg-skillval-crimson/10 text-skillval-crimson",
  medium: "border-skillval-amber/60 bg-skillval-amber/10 text-skillval-amber",
  low: "border-skillval-sky/60 bg-skillval-sky/10 text-skillval-sky",
};

export function FraudFlagList({ flags }: { flags: FraudFlag[] }) {
  if (!flags.length) {
    return (
      <div className="glass-card text-sm text-slate-600">
        Geen AI-signalen. Blijf wel alert op consistente casuïstiek.
      </div>
    );
  }

  return (
    <div className="glass-card space-y-4">
      <header>
        <h3 className="text-lg font-semibold text-skillval-night">Fraude & AI-signalen</h3>
        <p className="text-xs text-slate-500">Gebruik deze signalen voor begeleidingsgesprekken; nooit als automatische afwijzing.</p>
      </header>
      <ul className="space-y-3">
        {flags.map((flag) => (
          <li
            key={flag.id}
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${severityStyles[flag.severity]}`}
          >
            <span className="mt-0.5 text-lg">⚠️</span>
            <p>{flag.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
