"use client";

import { Montserrat, Poppins, Raleway } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400"] });

const modules = [
  {
    title: "AI Orchestratie",
    description:
      "Configureer workflows die mensen, systemen en modellen bij elkaar brengen.",
    accent: "#2DA3B5",
  },
  {
    title: "Team Insights",
    description:
      "Realtime dashboards over rollen, adoptie en impact. Deelbaar in één klik.",
    accent: "#D63384",
  },
  {
    title: "Data Fabric",
    description:
      "Verbind HR, operations en kennisbanken in een veilige, uniforme laag.",
    accent: "#A3B1B6",
  },
  {
    title: "Automations",
    description:
      "Trigger slimme notificaties en taken vanuit signalen in je portfolio.",
    accent: "#FFFFFF",
  },
  {
    title: "Partner Hub",
    description:
      "Betrek assessoren, coaches en leidinggevenden via één gedeeld platform.",
    accent: "#2DA3B5",
  },
  {
    title: "SAMEN.ai Studio",
    description:
      "Experimenteer met nieuwe AI-mogelijkheden en test prototypes live.",
    accent: "#D63384",
  },
];

const stats = [
  { label: "Actieve trajecten", value: "24", trend: "+12% tov vorige week" },
  { label: "AI-adviezen verwerkt", value: "86", trend: "+5 nieuw vandaag" },
  { label: "Betrokken teams", value: "7", trend: "3 cross-functioneel" },
];

const activities = [
  {
    title: "Reflectie toegevoegd",
    owner: "Marieke Visser",
    time: "3 min geleden",
    accent: "#2DA3B5",
  },
  {
    title: "Coach feedback verwerkt",
    owner: "Ramin Alizadeh",
    time: "12 min geleden",
    accent: "#D63384",
  },
  {
    title: "Nieuwe assessor uitgenodigd",
    owner: "TEAM Zorggroep",
    time: "28 min geleden",
    accent: "#A3B1B6",
  },
];

const quickLinks = [
  {
    title: "Portfolio overzicht",
    description: "Bekijk voortgang per competentie en dossier.",
  },
  {
    title: "Team synchronisatie",
    description: "Stem assessoren en coaches af met realtime planning.",
  },
  {
    title: "Automations",
    description: "Automatische notificaties voor deadlines en mijlpalen.",
  },
];

export default function DesignTestPage() {
  return (
    <div className="relative space-y-10">
      <section className="relative overflow-hidden rounded-3xl px-10 py-16 text-white shadow-2xl ring-1 ring-white/20 design-test-gradient">
        <div className="design-test-grid-lines" />

        <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="space-y-6 max-w-xl">
            <p className={`${poppins.className} text-sm uppercase tracking-[0.5em] text-[#A3B1B6]`}>
              SAMEN.ai brengt bijeen
            </p>
            <h1 className={`${montserrat.className} text-5xl font-bold leading-tight`}>
              Het nieuwe <span className="text-[#2DA3B5]">honeycomb</span> design
            </h1>
            <p className={`${raleway.className} text-lg text-[#A3B1B6]`}>
              Een modulair SaaS-concept waarin AI-coördinatie, samenwerking en inzicht
              samenkomen in een geometrische taal. Deze playground laat zien hoe de
              componenten tot leven komen.
            </p>
            <div className="flex items-center gap-4">
              <button
                className={`${poppins.className} flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D63384]/30 transition hover:-translate-y-0.5`}
                style={{
                  background: "linear-gradient(135deg, #2DA3B5 0%, #D63384 100%)",
                }}
              >
                Verken prototype
                <span className="design-test-dot" />
              </button>
              <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs text-[#A3B1B6]">
                <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[#D63384] shadow-[0_0_12px_#D63384]" />
                live.ai status
              </div>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-sm flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/40 backdrop-blur-lg lg:block">
            <div className="absolute -top-16 -right-12 h-48 w-48 rounded-full bg-[#D63384]/30 blur-3xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="design-test-logo-dot" />
                <span className={`${montserrat.className} text-xl tracking-[0.4em] text-white`}>
                  SAMEN.ai
                </span>
              </div>
              <p className={`${raleway.className} text-sm text-[#A3B1B6]`}>
                Modulariseer je trajecten, zet AI in waar het menselijk werk versterkt en
                verbind iedere rol met dezelfde taal.
              </p>
              <div className="grid gap-3">
                {["Observaties", "Portfolio inzichten", "AI assist"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:border-[#2DA3B5]/50 hover:bg-[#2DA3B5]/10"
                  >
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2DA3B5] to-[#D63384] shadow-[0_0_8px_#2DA3B5]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.title}
            className="design-test-module-card"
            style={{
              borderColor: `${module.accent}33`,
              boxShadow: `0 20px 32px -20px ${module.accent}55`,
            }}
          >
            <span
              className={`${poppins.className} w-fit rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]`}
              style={{ color: module.accent }}
            >
              module
            </span>
            <h3 className={`${montserrat.className} text-2xl font-semibold text-white`}>{module.title}</h3>
            <p className={`${raleway.className} text-sm text-[#A3B1B6]`}>{module.description}</p>
            <div
              className="mt-auto h-[2px] w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${module.accent})` }}
            />
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B2C38]/95 px-8 py-10 text-white shadow-xl shadow-black/50">
        <div className="design-test-grid-lines opacity-40" />
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`${poppins.className} text-xs uppercase tracking-[0.4em] text-[#A3B1B6]`}>
                Dashboard preview
              </p>
              <h2 className={`${montserrat.className} text-3xl font-semibold`}>
                SAMEN.ai cockpit — nieuwe stijl
              </h2>
            </div>
            <button
              className={`${poppins.className} flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5`}
              style={{
                background: "linear-gradient(135deg, #2DA3B5 0%, #D63384 100%)",
              }}
            >
              Bekijk full dashboard
              <span className="design-test-dot" />
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30"
                  >
                    <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>
                      {stat.label}
                    </p>
                    <p className={`${montserrat.className} mt-3 text-3xl font-semibold`}>{stat.value}</p>
                    <p className={`${raleway.className} mt-2 text-xs text-[#2DA3B5]`}>{stat.trend}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>
                      Actieve conversaties
                    </p>
                    <h3 className={`${montserrat.className} mt-2 text-2xl font-semibold`}>
                      Live portfolio begeleiding
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#2DA3B5]" />
                    <p className={`${raleway.className} text-xs text-[#A3B1B6]`}>AI & humans in sync</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {activities.map((activity) => (
                    <div
                      key={activity.title}
                      className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0B2C38]/70 px-4 py-4 transition hover:border-[#2DA3B5]/50"
                    >
                      <span
                        className="mt-1 inline-flex h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(45,163,181,0.6)]"
                        style={{ background: activity.accent }}
                      />
                      <div>
                        <p className={`${montserrat.className} text-sm font-semibold`}>{activity.title}</p>
                        <p className={`${raleway.className} text-xs text-[#A3B1B6]`}>
                          {activity.owner} · {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30">
                <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>AI agenda</p>
                <h3 className={`${montserrat.className} mt-3 text-xl`}>Vandaag</h3>
                <ul className="mt-4 space-y-3">
                  {["09:30 Reflecties sync", "11:00 Coach call", "15:30 AI review"].map((slot) => (
                    <li
                      key={slot}
                      className="rounded-2xl border border-white/10 bg-[#174E5E]/50 px-4 py-3 text-sm text-white"
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30">
                <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>
                  Snelle toegang
                </p>
                <div className="mt-4 space-y-3">
                  {quickLinks.map((link) => (
                    <button
                      key={link.title}
                      className="w-full rounded-2xl border border-white/10 bg-[#0B2C38]/70 px-4 py-4 text-left transition hover:border-[#D63384]/40 hover:bg-[#174E5E]/60"
                    >
                      <p className={`${montserrat.className} text-sm font-semibold text-white`}>{link.title}</p>
                      <p className={`${raleway.className} text-xs text-[#A3B1B6]`}>{link.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/5 bg-[#0B2C38]/90 p-8 text-white shadow-inner shadow-black/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={`${poppins.className} text-xs uppercase tracking-[0.4em] text-[#A3B1B6]`}>
              Design tokens
            </p>
            <h2 className={`${montserrat.className} mt-2 text-3xl font-semibold`}>Kleur & typografie</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { label: "Primary Dark", color: "#0B2C38" },
              { label: "Primary Teal", color: "#174E5E" },
              { label: "Secondary Cyan", color: "#2DA3B5" },
              { label: "Magenta", color: "#D63384" },
            ].map((token) => (
              <div key={token.label} className="flex items-center gap-2">
                <span
                  className="h-10 w-10 rounded-full shadow-lg"
                  style={{ background: token.color, boxShadow: `0 0 12px ${token.color}66` }}
                />
                <span className={`${raleway.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>
                  {token.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>Heading</p>
            <p className={`${montserrat.className} mt-3 text-4xl font-semibold`}>SAMEN AI. BRENGT BIEEN.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className={`${poppins.className} text-xs uppercase tracking-[0.3em] text-[#A3B1B6]`}>Body</p>
            <p className={`${raleway.className} mt-3 text-sm text-[#A3B1B6]`}>
              Deze testpagina toont een nieuw concept voor ons product. Animaties, honeycomb geometrie en
              neonaccenten schetsen de toekomstige designrichting zonder de rest van de applicatie te beïnvloeden.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes design-test-gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes design-test-dot-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(214, 51, 132, 0.6);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 18px rgba(214, 51, 132, 0.9);
          }
        }

        .design-test-gradient {
          background: linear-gradient(135deg, #0b2c38 0%, #174e5e 60%, #2da3b5 100%);
          background-size: 400% 400%;
          animation: design-test-gradient-shift 12s ease infinite;
        }

        .design-test-grid-lines {
          position: absolute;
          inset: -30%;
          opacity: 0.18;
          background-size: 140px 140px;
          background-image:
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-position: center;
          pointer-events: none;
        }

        .design-test-dot {
          display: inline-flex;
          height: 10px;
          width: 10px;
          border-radius: 9999px;
          background: #d63384;
          box-shadow: 0 0 12px rgba(214, 51, 132, 0.8);
          animation: design-test-dot-pulse 2.4s ease-in-out infinite;
        }

        .design-test-logo-dot {
          display: inline-flex;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #d63384;
          box-shadow: 0 0 18px rgba(214, 51, 132, 0.85);
          animation: design-test-dot-pulse 3s ease-in-out infinite;
        }

        .design-test-module-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 18px;
          border-width: 1px;
          border-radius: 28px;
          padding: 32px;
          background: linear-gradient(160deg, rgba(23, 78, 94, 0.85), rgba(11, 44, 56, 0.75));
          backdrop-filter: blur(14px);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .design-test-module-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 26px 40px rgba(45, 163, 181, 0.25);
        }
      `}</style>
    </div>
  );
}
