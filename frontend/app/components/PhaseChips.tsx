// Visualiseert de zeven stappen van het EVC-traject, zodat coach snel status ziet.
const phases = ["Aanmelding", "Intake", "Portfolio", "Assessment", "Certificering"];

export function PhaseChips({ currentPhase }: { currentPhase: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {phases.map((phase) => {
        const isActive = phase === currentPhase;
        return (
          <span
            key={phase}
            className={`status-pill ${
              isActive ? "bg-skillval-sky text-white" : "bg-white/60 text-slate-500"
            }`}
          >
            {phase}
          </span>
        );
      })}
    </div>
  );
}
