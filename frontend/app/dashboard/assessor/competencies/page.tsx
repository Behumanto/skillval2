"use client";

import { useState } from "react";

type Competency = {
  id: string;
  code: string;
  name: string;
  description: string;
  domain: "autotechniek" | "jeugdzorg" | "zorg";
  level: "basis" | "gevorderd" | "expert";
  assessmentCriteria: string[];
};

type CompetencyMatrix = {
  candidateId: string;
  candidateName: string;
  competencyId: string;
  status: "not_started" | "in_progress" | "demonstrated" | "mastered";
  lastAssessment?: string;
  score?: number;
  notes?: string;
};

export default function CompetenciesPage() {
  const [competencies] = useState<Competency[]>([
    {
      id: "1",
      code: "AT001",
      name: "Systematische Diagnose",
      description: "Voeren van systematische diagnose aan motorvoertuigen",
      domain: "autotechniek",
      level: "gevorderd",
      assessmentCriteria: [
        "Gebruikt juiste diagnose apparatuur",
        "Volgt systematische werkwijze",
        "Interpreteert meetresultaten correct",
        "Documenteert bevindingen adequaat"
      ]
    },
    {
      id: "2", 
      code: "AT002",
      name: "Veiligheidsprotocollen",
      description: "Naleven van veiligheidsprotocollen in werkplaats",
      domain: "autotechniek",
      level: "basis",
      assessmentCriteria: [
        "Draagt persoonlijke beschermingsmiddelen",
        "Houdt werkplek schoon en georganiseerd", 
        "Volgt ARBO richtlijnen",
        "Kent noodprocedures"
      ]
    },
    {
      id: "3",
      code: "AT003", 
      name: "Onderhoud & Reparatie",
      description: "Uitvoeren van onderhoud en reparaties aan voertuigen",
      domain: "autotechniek",
      level: "gevorderd",
      assessmentCriteria: [
        "Demonteert componenten volgens procedure",
        "Gebruikt juist gereedschap",
        "Controleert kwaliteit van werk",
        "Voert eindtest uit"
      ]
    },
    {
      id: "4",
      code: "AT004",
      name: "APK Keuring",
      description: "Uitvoeren van APK keuringen conform RDW eisen",
      domain: "autotechniek", 
      level: "expert",
      assessmentCriteria: [
        "Kent alle APK onderdelen",
        "Gebruikt meetapparatuur correct",
        "Beoordeelt afkeuringscriteria juist",
        "Documenteert bevindingen volledig"
      ]
    },
    {
      id: "5",
      code: "JZ001",
      name: "Pedagogische Begeleiding",
      description: "Bieden van pedagogische ondersteuning aan jeugdigen",
      domain: "jeugdzorg",
      level: "gevorderd",
      assessmentCriteria: [
        "Creëert veilige leeromgeving",
        "Past leerstijlen toe",
        "Motiveert en stimuleert",
        "Evalueert leerproces"
      ]
    },
    {
      id: "6",
      code: "ZW001",
      name: "Patiëntenzorg",
      description: "Verlenen van kwalitatieve patiëntenzorg",
      domain: "zorg",
      level: "gevorderd", 
      assessmentCriteria: [
        "Toont empathie en respect",
        "Communiceert effectief",
        "Volgt zorgprotocollen",
        "Documenteert zorgverlening"
      ]
    }
  ]);

  const [matrix] = useState<CompetencyMatrix[]>([
    { candidateId: "1", candidateName: "Robin Jansen", competencyId: "1", status: "demonstrated", lastAssessment: "2024-11-20", score: 8.2 },
    { candidateId: "1", candidateName: "Robin Jansen", competencyId: "2", status: "mastered", lastAssessment: "2024-11-15", score: 9.1 },
    { candidateId: "1", candidateName: "Robin Jansen", competencyId: "3", status: "in_progress", lastAssessment: "2024-11-25", score: 7.5 },
    { candidateId: "1", candidateName: "Robin Jansen", competencyId: "4", status: "not_started" },
    
    { candidateId: "2", candidateName: "Mila de Vries", competencyId: "5", status: "mastered", lastAssessment: "2024-11-18", score: 8.8 },
    { candidateId: "2", candidateName: "Mila de Vries", competencyId: "6", status: "demonstrated", lastAssessment: "2024-11-22", score: 8.4 },
    
    { candidateId: "3", candidateName: "Ahmed Mahmoud", competencyId: "1", status: "in_progress", lastAssessment: "2024-11-10", score: 6.5 },
    { candidateId: "3", candidateName: "Ahmed Mahmoud", competencyId: "2", status: "demonstrated", lastAssessment: "2024-11-12", score: 7.8 },
    { candidateId: "3", candidateName: "Ahmed Mahmoud", competencyId: "3", status: "not_started" }
  ]);

  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<string>("all");

  const getStatusColor = (status: CompetencyMatrix["status"]) => {
    switch (status) {
      case "mastered": return "bg-green-500";
      case "demonstrated": return "bg-blue-500"; 
      case "in_progress": return "bg-yellow-500";
      case "not_started": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  const getStatusText = (status: CompetencyMatrix["status"]) => {
    switch (status) {
      case "mastered": return "Beheerst";
      case "demonstrated": return "Getoond";
      case "in_progress": return "Bezig";
      case "not_started": return "Niet gestart";
      default: return "Onbekend";
    }
  };

  const getLevelColor = (level: Competency["level"]) => {
    switch (level) {
      case "expert": return "bg-red-100 text-red-800";
      case "gevorderd": return "bg-orange-100 text-orange-800";
      case "basis": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const candidates = Array.from(new Set(matrix.map(m => ({ id: m.candidateId, name: m.candidateName }))));
  const filteredCompetencies = selectedDomain === "all" 
    ? competencies 
    : competencies.filter(comp => comp.domain === selectedDomain);

  const getCompetencyStatus = (candidateId: string, competencyId: string) => {
    return matrix.find(m => m.candidateId === candidateId && m.competencyId === competencyId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Competentie Matrix</h1>
            <p className="text-gray-600 mt-1">Overzicht van competenties per kandidaat en assessment voortgang</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Domein Filter</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Alle Domeinen</option>
              <option value="autotechniek">Autotechniek</option>
              <option value="jeugdzorg">Jeugdzorg</option>
              <option value="zorg">Zorg & Welzijn</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Kandidaat Filter</label>
            <select
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Alle Kandidaten</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Competency Matrix */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Competentie Overzicht</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 min-w-[200px]">Competentie</th>
                {candidates
                  .filter(candidate => selectedCandidate === "all" || candidate.id === selectedCandidate)
                  .map((candidate) => (
                  <th key={candidate.id} className="text-center py-3 px-4 font-medium text-gray-600 min-w-[120px]">
                    {candidate.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCompetencies.map((competency) => (
                <tr key={competency.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-gray-900">{competency.code}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(competency.level)}`}>
                          {competency.level}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{competency.name}</h3>
                      <p className="text-sm text-gray-600">{competency.description}</p>
                    </div>
                  </td>
                  
                  {candidates
                    .filter(candidate => selectedCandidate === "all" || candidate.id === selectedCandidate)
                    .map((candidate) => {
                    const status = getCompetencyStatus(candidate.id, competency.id);
                    return (
                      <td key={candidate.id} className="py-4 px-4 text-center">
                        {status ? (
                          <div>
                            <div 
                              className={`w-4 h-4 rounded-full mx-auto mb-2 ${getStatusColor(status.status)}`}
                              title={getStatusText(status.status)}
                            ></div>
                            <div className="text-xs text-gray-600">
                              {status.score && <div className="font-medium">{status.score}/10</div>}
                              {status.lastAssessment && (
                                <div>{new Date(status.lastAssessment).toLocaleDateString('nl-NL')}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-200 mx-auto" title="Niet van toepassing"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend and Competency Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status Legend */}
        <div className="glass-card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Status Legenda</h3>
          <div className="space-y-3">
            {[
              { status: "mastered", label: "Beheerst", description: "Competentie volledig onder de knie" },
              { status: "demonstrated", label: "Getoond", description: "Competentie gedemonstreerd in assessment" },
              { status: "in_progress", label: "Bezig", description: "Competentie wordt ontwikkeld" },
              { status: "not_started", label: "Niet gestart", description: "Nog niet aan competentie gewerkt" }
            ].map((item) => (
              <div key={item.status} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status as any)}`}></div>
                <div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Legend */}
        <div className="glass-card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Niveau Indeling</h3>
          <div className="space-y-3">
            {[
              { level: "basis", label: "Basis", description: "Fundamentele vaardigheden" },
              { level: "gevorderd", label: "Gevorderd", description: "Uitgebreide praktische ervaring" },
              { level: "expert", label: "Expert", description: "Specialistische kennis en vaardigheden" }
            ].map((item) => (
              <div key={item.level} className="flex items-start gap-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(item.level as any)}`}>
                  {item.label}
                </span>
                <div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Snelle Acties</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
              Nieuwe Assessment Plannen
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Voortgang Rapport Genereren
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Competentie Analyse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}