"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "../../../lib/api";
import { useDomain } from "@/app/providers/domain-provider";

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

// Domain-specifieke data
const getDomainData = (domain: "zorg" | "autotechniek" | "jeugdzorg") => {
  if (domain === "zorg") {
    return {
      feedback: [
        {
          id: "1",
          from: "Dr. Maria van den Berg",
          message: "Uitstekend werk op je patiëntenzorg bewijsstuk! Kleine aanpassingen nodig.",
          time: "2 uur geleden",
          type: "success" as const,
        },
        {
          id: "2",
          from: "Linda Jansen (Zorg Coach)",
          message: "Niet vergeten: bespreking patiëntveiligheid morgen om 14:00",
          time: "5 uur geleden",
          type: "info" as const,
        },
      ],
      todos: [
        { id: "1", text: "Verbeter bewijsstuk 'Patiëntveiligheid in de praktijk'", urgent: true },
        { id: "2", text: "Upload bewijs voor 'Medicatietoediening'", urgent: false },
        { id: "3", text: "Beantwoord feedback van Dr. van den Berg", urgent: true },
        { id: "4", text: "Plan gesprek met medische supervisor", urgent: false },
      ],
      documents: [
        { id: "1", name: "Medicatie toediening bewijs.pdf", date: "15 okt 2024", status: "approved" },
        { id: "2", name: "Patiënt communicatie case.docx", date: "10 okt 2024", status: "approved" },
        { id: "3", name: "Hygiëne protocol foto.jpg", date: "5 okt 2024", status: "pending" },
      ],
      deadlines: [
        { id: "1", task: "Zorgcompetenties 80% afgerond", date: "15 nov 2024", daysLeft: 18 },
        { id: "2", task: "Eindassessment zorgverlening", date: "30 nov 2024", daysLeft: 33 },
      ]
    };
  } else if (domain === "jeugdzorg") {
    return {
      feedback: [
        {
          id: "1",
          from: "Miriam van Dijk",
          message: "Goede observatie van groepsdynamiek tijdens de activiteiten. Je hebt goed ingespeeld op de spanningen.",
          time: "1 uur geleden",
          type: "success" as const,
        },
        {
          id: "2",
          from: "Peter Janssen (Teamleider)",
          message: "Intervisie planning: bespreek de casus van Tim komende dinsdag om 10:00",
          time: "4 uur geleden",
          type: "info" as const,
        },
      ],
      todos: [
        { id: "1", text: "Pedagogisch plan opstellen voor nieuwe bewoner Lisa", urgent: true },
        { id: "2", text: "Upload bewijs van crisisinterventie training", urgent: false },
        { id: "3", text: "Evalueer ontwikkelingsplan Jayden (3 maanden)", urgent: true },
        { id: "4", text: "Plan teamoverleg met gezinsbegeleiders", urgent: false },
      ],
      documents: [
        { id: "1", name: "Pedagogisch rapport Tim.pdf", date: "15 okt 2024", status: "approved" },
        { id: "2", name: "Crisisplan protocol v2.docx", date: "10 okt 2024", status: "approved" },
        { id: "3", name: "Groepsactiviteit foto's.jpg", date: "5 okt 2024", status: "pending" },
      ],
      deadlines: [
        { id: "1", task: "Jeugdzorg competenties 75% afgerond", date: "20 nov 2024", daysLeft: 23 },
        { id: "2", task: "Eindgesprek pedagogische vaardigheden", date: "30 nov 2024", daysLeft: 33 },
      ]
    };
  } else {
    return {
      feedback: [
        {
          id: "1",
          from: "Meester Jan Verkerk",
          message: "Uitstekende motordiagnose uitgevoerd! Technische rapportage is compleet.",
          time: "3 uur geleden",
          type: "success" as const,
        },
        {
          id: "2",
          from: "Rob van der Meer (Instructeur)",
          message: "Komende week: praktijktest elektrische voertuigen",
          time: "1 dag geleden",
          type: "info" as const,
        },
      ],
      todos: [
        { id: "1", text: "Voltooi motordiagnose rapport BMW 320i", urgent: true },
        { id: "2", text: "Upload bewijs voor 'Remsysteem onderhoud'", urgent: false },
        { id: "3", text: "Beantwoord feedback over ECU diagnose", urgent: true },
        { id: "4", text: "Plan praktijkexamen hybride voertuigen", urgent: false },
      ],
      documents: [
        { id: "1", name: "Motordiagnose BMW320i rapport.pdf", date: "15 okt 2024", status: "approved" },
        { id: "2", name: "Remmen onderhoud checklist.docx", date: "10 okt 2024", status: "approved" },
        { id: "3", name: "ECU uitlezing foto.jpg", date: "5 okt 2024", status: "pending" },
      ],
      deadlines: [
        { id: "1", task: "Autotechniek modules 80% voltooid", date: "15 nov 2024", daysLeft: 18 },
        { id: "2", task: "Eindexamen voertuigtechniek", date: "30 nov 2024", daysLeft: 33 },
      ]
    };
  }
};

export default function CandidateDashboard() {
  const { domain } = useDomain();
  const [traject, setTraject] = useState<Traject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraject() {
      try {
        const response = await fetch(`${API_BASE_URL}/trajecten/domain/${domain}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setTraject(data[0]);
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

  const domainData = getDomainData(domain);
  
  // Bereken coverage (mock - later uit candidate data halen)
  const areasWithCoverage = traject.deskundigheidsgebieden.map((area, idx) => ({
    ...area,
    coverage: idx === 0 ? 82 : idx === 1 ? 68 : idx === 2 ? 42 : idx === 3 ? 55 : 30,
  }));

  const overallProgress = Math.round(
    areasWithCoverage.reduce((sum, area) => sum + area.coverage, 0) / areasWithCoverage.length
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <section className="glass-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src="/ramin.jpeg"
                alt="Ramin"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-skillval-warm">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Welkom terug, Ramin! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Hier is je overzicht voor <strong>{traject.name}</strong>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Totale voortgang</p>
            <div className="text-4xl font-bold text-skillval-warm">{overallProgress}%</div>
          </div>
        </div>
      </section>

      {/* Inspiration Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-skillval-warm shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-4 h-full">
            <div className="relative h-full">
              <Image
                src="/hero-professional-1.jpg"
                alt="Professional"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                src="/team-collaboration.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                src="/students-working.jpg"
                alt="Students working"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                src="/mentor-support.jpg"
                alt="Mentor support"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Bouw aan je toekomst</h2>
          <p className="text-white/90 mb-6">Toon je vaardigheden en behaal je EVC-erkenning</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard/upload"
              className="px-6 py-3 bg-white text-skillval-warm font-bold rounded-xl hover:bg-skillval-cream shadow-lg transition"
            >
              Bewijs Toevoegen
            </Link>
            <Link
              href="/dashboard/portfolio"
              className="px-6 py-3 bg-skillval-night text-white font-bold rounded-xl hover:bg-black shadow-lg transition"
            >
              Portfolio Bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition border-l-4 border-skillval-warm">
          <div className="w-12 h-12 mx-auto bg-skillval-warm rounded-xl flex items-center justify-center mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-skillval-night">18</div>
          <p className="mt-1 text-sm text-gray-600">Bewijsstukken</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition border-l-4 border-skillval-bright">
          <div className="w-12 h-12 mx-auto bg-skillval-bright rounded-xl flex items-center justify-center mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-skillval-night">2</div>
          <p className="mt-1 text-sm text-gray-600">Nieuwe berichten</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition border-l-4 border-skillval-gold">
          <div className="w-12 h-12 mx-auto bg-skillval-gold rounded-xl flex items-center justify-center mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-skillval-night">18</div>
          <p className="mt-1 text-sm text-gray-600">Dagen tot deadline</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition border-l-4 border-skillval-ocean">
          <div className="w-12 h-12 mx-auto bg-skillval-ocean rounded-xl flex items-center justify-center mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-skillval-night">4.2</div>
          <p className="mt-1 text-sm text-gray-600">Gemiddelde score</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* To Do List */}
          <section className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Actiepunten</h2>
              <span className="text-sm text-gray-600">{domainData.todos.filter(t => t.urgent).length} urgent</span>
            </div>
            <div className="space-y-3">
              {domainData.todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 transition hover:shadow-md ${
                    todo.urgent
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{todo.text}</p>
                    {todo.urgent && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs text-red-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/portfolio"
              className="mt-4 inline-flex items-center text-sm font-medium text-skillval-warm hover:text-skillval-bright"
            >
              Bekijk alles
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* Recent Feedback */}
          <section className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recente Feedback</h2>
              <Link href="/dashboard/feedback" className="text-sm font-medium text-skillval-warm hover:text-skillval-bright">
                Alles bekijken
              </Link>
            </div>
            <div className="space-y-4">
              {domainData.feedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className={`p-4 rounded-xl border-2 ${
                    feedback.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      feedback.type === "success" ? "bg-green-500" : "bg-blue-500"
                    }`}>
                      {feedback.from.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{feedback.from}</p>
                      <p className="mt-1 text-sm text-gray-700">{feedback.message}</p>
                      <p className="mt-2 text-xs text-gray-500">{feedback.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Documents */}
          <section className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recente Documenten</h2>
              <Link href="/dashboard/portfolio" className="text-sm font-medium text-skillval-warm hover:text-skillval-bright">
                Alles bekijken
              </Link>
            </div>
            <div className="space-y-3">
              {domainData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {doc.status === "approved" ? "Goedgekeurd" : "In beoordeling"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <section className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Voortgang per gebied</h2>
            <div className="space-y-6">
              {areasWithCoverage.slice(0, 5).map((area) => {
                const completedCount = Math.round((area.coverage / 100) * area.indicators.length);
                const missingCount = area.indicators.length - completedCount;

                return (
                  <div key={area.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{area.name}</span>
                      <span className={`text-xs font-bold ${
                        area.coverage >= 80 ? "text-green-600" :
                        area.coverage >= 60 ? "text-amber-600" :
                        "text-red-600"
                      }`}>{area.coverage}%</span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all ${
                          area.coverage >= 80
                            ? "bg-green-500"
                            : area.coverage >= 60
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${area.coverage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-green-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{completedCount} voltooid</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{missingCount} te doen</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/dashboard/competencies"
                className="block w-full py-2 text-center text-xs font-medium text-skillval-warm hover:text-skillval-bright border-2 border-skillval-warm/30 rounded-lg hover:bg-skillval-cream transition"
              >
                Details
              </Link>
              <Link
                href="/dashboard/upload"
                className="block w-full py-2 text-center text-xs font-medium text-white bg-skillval-warm hover:bg-skillval-bright rounded-lg transition"
              >
                + Bewijs
              </Link>
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Aankomende Deadlines</h2>
            <div className="space-y-4">
              {domainData.deadlines.map((deadline) => (
                <div key={deadline.id} className="p-3 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900">{deadline.task}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">{deadline.date}</span>
                    <span className="text-xs font-bold text-amber-700">{deadline.daysLeft} dagen</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Snelle Acties</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/upload"
                className="flex items-center gap-3 p-3 bg-skillval-cream hover:bg-skillval-warm/10 border-2 border-skillval-warm rounded-xl transition"
              >
                <div className="w-10 h-10 bg-skillval-warm rounded-lg flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-skillval-night">Bewijs toevoegen</span>
              </Link>

              <Link
                href="/dashboard/chat"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-skillval-night">Chat met assessor</span>
              </Link>

              <Link
                href="/dashboard/feedback"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition"
              >
                <div className="w-10 h-10 bg-skillval-bright rounded-lg flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-skillval-night">Bekijk feedback</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
