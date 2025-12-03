"use client";

import { useState } from "react";
import Link from "next/link";

type Candidate = {
  id: string;
  name: string;
  email: string;
  evcStandard: string;
  startDate: string;
  progress: number;
  status: "active" | "completed" | "pending" | "on_hold";
  assessmentsCompleted: number;
  totalAssessments: number;
  nextAppointment?: string;
  avatar?: string;
};

export default function CandidatesPage() {
  const [candidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Robin Jansen",
      email: "r.jansen@email.nl",
      evcStandard: "Autotechniek APK Keurmeester",
      startDate: "2024-09-01T00:00:00",
      progress: 75,
      status: "active",
      assessmentsCompleted: 3,
      totalAssessments: 4,
      nextAppointment: "2024-12-03T09:30:00"
    },
    {
      id: "2",
      name: "Mila de Vries",
      email: "m.devries@email.nl", 
      evcStandard: "Jeugdzorg / SKJ",
      startDate: "2024-08-15T00:00:00",
      progress: 90,
      status: "active",
      assessmentsCompleted: 5,
      totalAssessments: 6,
      nextAppointment: "2024-12-02T13:00:00"
    },
    {
      id: "3",
      name: "Ahmed Mahmoud",
      email: "a.mahmoud@email.nl",
      evcStandard: "Motorvoertuigen Technicus",
      startDate: "2024-10-01T00:00:00",
      progress: 40,
      status: "active", 
      assessmentsCompleted: 2,
      totalAssessments: 5,
      nextAppointment: "2024-12-05T10:00:00"
    },
    {
      id: "4",
      name: "Lisa van der Berg",
      email: "l.vandenberg@email.nl",
      evcStandard: "Zorg & Welzijn",
      startDate: "2024-07-01T00:00:00", 
      progress: 100,
      status: "completed",
      assessmentsCompleted: 6,
      totalAssessments: 6
    },
    {
      id: "5",
      name: "Tom Hendriks",
      email: "t.hendriks@email.nl",
      evcStandard: "Autotechniek APK Keurmeester",
      startDate: "2024-11-15T00:00:00",
      progress: 20,
      status: "pending",
      assessmentsCompleted: 1,
      totalAssessments: 4
    }
  ]);

  const [filter, setFilter] = useState<"all" | "active" | "completed" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: Candidate["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "on_hold": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Candidate["status"]) => {
    switch (status) {
      case "active": return "Actief";
      case "completed": return "Voltooid";
      case "pending": return "In afwachting";
      case "on_hold": return "On hold";
      default: return "Onbekend";
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesFilter = filter === "all" || candidate.status === filter;
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.evcStandard.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kandidaat Profielen</h1>
            <p className="text-gray-600 mt-1">Overzicht van alle EVC kandidaten en hun voortgang</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totaal Kandidaten</p>
              <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actief</p>
              <p className="text-2xl font-bold text-gray-900">{candidates.filter(c => c.status === "active").length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Voltooid</p>
              <p className="text-2xl font-bold text-gray-900">{candidates.filter(c => c.status === "completed").length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vandaag Gepland</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates.filter(c => c.nextAppointment && new Date(c.nextAppointment).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Zoek op naam of EVC standaard..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { key: "all", label: "Alle" },
              { key: "active", label: "Actief" },
              { key: "completed", label: "Voltooid" },
              { key: "pending", label: "In afwachting" }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === option.key
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="glass-card">
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              {/* Avatar */}
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {getInitials(candidate.name)}
              </div>

              {/* Candidate Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.email}</p>
                    <p className="text-sm text-gray-600">{candidate.evcStandard}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                      {getStatusText(candidate.status)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Start: {new Date(candidate.startDate).toLocaleDateString('nl-NL')}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Voortgang</span>
                    <span>{candidate.assessmentsCompleted}/{candidate.totalAssessments} assessments</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${candidate.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Appointment */}
                {candidate.nextAppointment && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-600">
                      Volgende afspraak: {new Date(candidate.nextAppointment).toLocaleString('nl-NL')}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/assessor/live?candidate=${candidate.id}`}
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                >
                  Live Assessment
                </Link>
                <Link
                  href={`/dashboard/assessor/vision?candidate=${candidate.id}`}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Vision Assessment
                </Link>
                <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Geen kandidaten gevonden die voldoen aan de criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}