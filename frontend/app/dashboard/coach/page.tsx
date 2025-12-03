import Link from "next/link";
import { FraudFlagList } from "@/components/FraudFlagList";
import { PhaseChips } from "@/components/PhaseChips";

// Begeleider monitort voortgang per fase en AI-fraudesignalen om tijdig in te grijpen.

const candidateList = [
  {
    id: "cand-1",
    name: "Robin Jansen",
    phase: "Portfolio",
    coverage: 63,
    risk: "Medium",
  },
  {
    id: "cand-2",
    name: "Noah Willems",
    phase: "Assessment",
    coverage: 78,
    risk: "Low",
  },
];

const fraudFlags = [
  {
    id: "flag-1",
    severity: "high" as const,
    message: "Tekst van Robin Jansen wijkt sterk af van intake-transcript (mogelijk AI gegenereerd).",
  },
  {
    id: "flag-2",
    severity: "medium" as const,
    message: "Observatie rapport bevat herhaalde zinnen, check authenticiteit bij volgende sessie.",
  },
];

export default function CoachDashboard() {
  return (
    <div className="space-y-8">
      <section className="glass-card">
        <p className="card-section-title">Begeleider dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-skillval-night">Houd regie op trajecten</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          SkillVal signaleert automatisch inconsistenties, zodat jij de kandidaat gerichter kan coachen en potentiële fraude voorkomt.
        </p>
      </section>

      <section className="glass-card space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-skillval-night">Kandidaten in traject</h2>
            <p className="text-xs text-slate-500">Focus op wie extra coaching nodig heeft.</p>
          </div>
          <Link href="#" className="text-sm text-skillval-sky">
            Bekijk alle kandidaten
          </Link>
        </header>
        <div className="space-y-3">
          {candidateList.map((candidate) => (
            <div
              key={candidate.id}
              className="flex flex-col gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur-lg md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-skillval-night">{candidate.name}</p>
                <p className="text-xs text-slate-500">Dekking {candidate.coverage}% • Fase {candidate.phase}</p>
              </div>
              <PhaseChips currentPhase={candidate.phase} />
              <Link className="rounded-full bg-skillval-lilac px-4 py-2 text-xs font-semibold text-white" href={`#${candidate.id}`}>
                Open dossier
              </Link>
            </div>
          ))}
        </div>
      </section>

      <FraudFlagList flags={fraudFlags} />
    </div>
  );
}
