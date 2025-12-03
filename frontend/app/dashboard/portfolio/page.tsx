"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "../../../lib/api";
import { useDomain } from "../../providers/domain-provider";

type EvidenceItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  competencyArea: string;
  fileType: "pdf" | "image" | "document" | "audio";
  status: "approved" | "pending" | "needs-revision";
};

// Domain-specifieke portfolio data
const getDomainPortfolioData = (domain: "zorg" | "autotechniek"): EvidenceItem[] => {
  if (domain === "zorg") {
    return [
      {
        id: "1",
        title: "Medicatietoediening controle",
        description: "Veilige toediening van medicatie aan patiënt met controle volgens protocol. Vitale functies gecontroleerd.",
        date: "2024-10-15",
        competencyArea: "Patiëntenzorg",
        fileType: "pdf",
        status: "approved",
      },
      {
        id: "2",
        title: "Patiëntcommunicatie tijdens zorgverlening",
        description: "Empathisch gesprek met patiënt over behandelplan en zorgen. Duidelijke communicatie over procedures.",
        date: "2024-10-10",
        competencyArea: "Communicatie in de Zorg",
        fileType: "audio",
        status: "approved",
      },
      {
        id: "3",
        title: "Hygiëne protocol follow-up",
        description: "Correcte toepassing van hygiëneprotocol bij infectiegevoelige handeling. Foto van setup.",
        date: "2024-10-05",
        competencyArea: "Hygiëne & Veiligheid",
        fileType: "image",
        status: "pending",
      },
      {
        id: "4",
        title: "Ethisch dilemma reflectie",
        description: "Reflectie op een ethisch dilemma rond behandeling en informed consent van patiënt.",
        date: "2024-09-28",
        competencyArea: "Ethiek en Professionaliteit",
        fileType: "document",
        status: "needs-revision",
      }
    ];
  } else {
    return [
      {
        id: "1",
        title: "Motordiagnose BMW 320i",
        description: "Complete diagnose van motorproblemen met OBD scanner. Foutcodes P0301 en P0171 opgelost door bobine en luchtfilter vervanging.",
        date: "2024-10-15",
        competencyArea: "Motordiagnose",
        fileType: "pdf",
        status: "approved",
      },
      {
        id: "2", 
        title: "Remschijven vervangen Audi A4",
        description: "Volledige vervanging van voor- en achterremschijven volgens fabrieksspecificaties. Werkinstructies gevolgd.",
        date: "2024-10-10",
        competencyArea: "Chassis/Onderstel",
        fileType: "image",
        status: "approved",
      },
      {
        id: "3",
        title: "ECU uitlezing Tesla Model 3",
        description: "Diagnose van elektrische aandrijving. Software update uitgevoerd en batterijmanagement gecontroleerd.",
        date: "2024-10-05",
        competencyArea: "Hybride/Elektrisch",
        fileType: "pdf",
        status: "pending",
      },
      {
        id: "4",
        title: "Technisch rapport Volkswagen Golf",
        description: "Uitgebreide diagnose van intermitterende startproblemen. Probleem gelokaliseerd bij startmotor.",
        date: "2024-09-28",
        competencyArea: "Elektrotechniek",
        fileType: "document",
        status: "needs-revision",
      }
    ];
  }
};

const CANDIDATE_ID = "6900ece827a3b3e389c2275e"; // Default candidate ID

export default function PortfolioPage() {
  const { domain } = useDomain();
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "needs-revision">("all");
  const [realEvidence, setRealEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const dummyEvidence = getDomainPortfolioData(domain);

  useEffect(() => {
    // Optioneel: fetch real evidence in the background
    fetchEvidence();
  }, []);

  const fetchEvidence = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/evidence/candidate/${CANDIDATE_ID}`);
      if (response.ok) {
        const data = await response.json();
        setRealEvidence(data);
      }
    } catch (err) {
      // Silently fail, we still have dummy data
      console.log("Could not fetch real evidence, using dummy data");
    }
  };

  // Combine dummy data with real evidence
  const allEvidence = [...dummyEvidence, ...realEvidence.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    date: new Date(item.timestamp).toISOString().split('T')[0],
    competencyArea: item.competencyAreaId,
    fileType: item.type as "pdf" | "image" | "document" | "audio",
    status: item.status as "approved" | "pending" | "needs-revision",
  }))];

  const filteredEvidence = filter === "all"
    ? allEvidence
    : allEvidence.filter(item => item.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Goedgekeurd
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium border border-amber-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            In beoordeling
          </span>
        );
      case "needs-revision":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium border border-red-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Aanpassing nodig
          </span>
        );
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case "image":
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case "audio":
        return (
          <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-900">Laden...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mijn Portfolio</h1>
            <p className="mt-2 text-gray-600">Overzicht van al je bewijsstukken en hun status</p>
          </div>
          <Link href="/dashboard/upload" className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nieuw bewijs
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-6">
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-gray-900">{allEvidence.length}</div>
          <p className="mt-1 text-sm text-gray-600">Totaal bewijs</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-green-600">
            {allEvidence.filter(e => e.status === "approved").length}
          </div>
          <p className="mt-1 text-sm text-gray-600">Goedgekeurd</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-amber-600">
            {allEvidence.filter(e => e.status === "pending").length}
          </div>
          <p className="mt-1 text-sm text-gray-600">In beoordeling</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-red-600">
            {allEvidence.filter(e => e.status === "needs-revision").length}
          </div>
          <p className="mt-1 text-sm text-gray-600">Revisie nodig</p>
        </div>
      </section>

      {/* Filters */}
      <section className="glass-card">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Alles
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "approved"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Goedgekeurd
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "pending"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            In beoordeling
          </button>
          <button
            onClick={() => setFilter("needs-revision")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "needs-revision"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Revisie nodig
          </button>
        </div>
      </section>

      {/* Evidence List */}
      <section className="space-y-4">
        {filteredEvidence.length === 0 ? (
          <div className="glass-card text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen bewijs gevonden</h3>
            <p className="text-gray-600 mb-4">
              {filter === "all"
                ? "Je hebt nog geen bewijs toegevoegd aan je portfolio"
                : `Je hebt geen bewijs met status "${filter}"`
              }
            </p>
            <Link href="/dashboard/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Voeg je eerste bewijs toe
            </Link>
          </div>
        ) : (
          filteredEvidence.map((item) => (
            <Link key={item.id} href={`/dashboard/evidence/${item.id}`} className="glass-card hover:shadow-xl transition block">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  {getFileIcon(item.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(item.date).toLocaleDateString("nl-NL")}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {item.competencyArea}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
