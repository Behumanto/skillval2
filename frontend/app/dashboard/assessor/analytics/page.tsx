"use client";

import { useState } from "react";

type AssessmentTrend = {
  month: string;
  completedAssessments: number;
  averageScore: number;
  successRate: number;
};

type CompetencyAnalytics = {
  competencyName: string;
  averageScore: number;
  completionRate: number;
  trend: "up" | "down" | "stable";
  assessmentCount: number;
};

type DomainStats = {
  domain: string;
  candidateCount: number;
  completedAssessments: number;
  averageScore: number;
  successRate: number;
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"3months" | "6months" | "1year">("6months");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const assessmentTrends: AssessmentTrend[] = [
    { month: "Juli", completedAssessments: 24, averageScore: 7.8, successRate: 87 },
    { month: "Augustus", completedAssessments: 32, averageScore: 8.1, successRate: 91 },
    { month: "September", completedAssessments: 28, averageScore: 7.9, successRate: 89 },
    { month: "Oktober", completedAssessments: 35, averageScore: 8.3, successRate: 94 },
    { month: "November", completedAssessments: 41, averageScore: 8.5, successRate: 96 },
    { month: "December", completedAssessments: 18, averageScore: 8.2, successRate: 92 }
  ];

  const competencyAnalytics: CompetencyAnalytics[] = [
    { 
      competencyName: "Systematische Diagnose", 
      averageScore: 8.4, 
      completionRate: 96, 
      trend: "up", 
      assessmentCount: 45 
    },
    { 
      competencyName: "Veiligheidsprotocollen", 
      averageScore: 9.1, 
      completionRate: 98, 
      trend: "stable", 
      assessmentCount: 52 
    },
    { 
      competencyName: "Onderhoud & Reparatie", 
      averageScore: 7.8, 
      completionRate: 89, 
      trend: "up", 
      assessmentCount: 38 
    },
    { 
      competencyName: "APK Keuring", 
      averageScore: 7.2, 
      completionRate: 78, 
      trend: "down", 
      assessmentCount: 25 
    },
    { 
      competencyName: "Pedagogische Begeleiding", 
      averageScore: 8.7, 
      completionRate: 94, 
      trend: "up", 
      assessmentCount: 31 
    },
    { 
      competencyName: "Patiëntenzorg", 
      averageScore: 8.9, 
      completionRate: 97, 
      trend: "stable", 
      assessmentCount: 28 
    }
  ];

  const domainStats: DomainStats[] = [
    { domain: "Autotechniek", candidateCount: 15, completedAssessments: 98, averageScore: 8.1, successRate: 89 },
    { domain: "Jeugdzorg", candidateCount: 8, completedAssessments: 45, averageScore: 8.6, successRate: 94 },
    { domain: "Zorg & Welzijn", candidateCount: 12, completedAssessments: 67, averageScore: 8.8, successRate: 96 }
  ];

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "down":
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return "text-green-600 bg-green-100";
      case "down": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Trends</h1>
            <p className="text-gray-600 mt-1">Inzichten in assessment prestaties en ontwikkelingstrends</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="3months">Laatste 3 maanden</option>
              <option value="6months">Laatste 6 maanden</option>
              <option value="1year">Laatste jaar</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Domein</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Alle Domeinen</option>
              <option value="autotechniek">Autotechniek</option>
              <option value="jeugdzorg">Jeugdzorg</option>
              <option value="zorg">Zorg & Welzijn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totaal Assessments</p>
              <p className="text-2xl font-bold text-gray-900">178</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <span>↗ +12%</span>
                <span className="text-gray-500">vs vorige periode</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gemiddelde Score</p>
              <p className="text-2xl font-bold text-gray-900">8.3</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <span>↗ +0.4</span>
                <span className="text-gray-500">vs vorige periode</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Slagingspercentage</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <span>↗ +3%</span>
                <span className="text-gray-500">vs vorige periode</span>
              </p>
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
              <p className="text-sm text-gray-600">Actieve Kandidaten</p>
              <p className="text-2xl font-bold text-gray-900">35</p>
              <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                <span>↗ +5</span>
                <span className="text-gray-500">nieuwe kandidaten</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Trends Chart */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Assessment Trends</h2>
        <div className="space-y-4">
          {assessmentTrends.map((trend, index) => (
            <div key={trend.month} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-20 text-sm font-medium text-gray-700">{trend.month}</div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Assessments: {trend.completedAssessments}</span>
                  <span className="text-sm text-gray-600">Score: {trend.averageScore}/10</span>
                  <span className="text-sm text-gray-600">Slaagkans: {trend.successRate}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-200 h-2 rounded-full">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(trend.completedAssessments / 50) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="bg-green-200 h-2 rounded-full">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(trend.averageScore / 10) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="bg-purple-200 h-2 rounded-full">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${trend.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Statistics */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Domein Statistieken</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {domainStats.map((domain) => (
            <div key={domain.domain} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">{domain.domain}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kandidaten:</span>
                  <span className="font-medium">{domain.candidateCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assessments:</span>
                  <span className="font-medium">{domain.completedAssessments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gem. Score:</span>
                  <span className="font-medium">{domain.averageScore}/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Slaagkans:</span>
                  <span className="font-medium text-green-600">{domain.successRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency Analytics */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Competentie Analyse</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Competentie</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Gem. Score</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Voltooiingsgraad</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Trend</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Assessments</th>
              </tr>
            </thead>
            <tbody>
              {competencyAnalytics.map((competency) => (
                <tr key={competency.competencyName} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{competency.competencyName}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {competency.averageScore}/10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900">{competency.completionRate}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getTrendColor(competency.trend)}`}>
                      {getTrendIcon(competency.trend)}
                      {competency.trend === "up" ? "Stijgend" : competency.trend === "down" ? "Dalend" : "Stabiel"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm text-gray-600">{competency.assessmentCount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Rapporten & Export</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 100-2H7a1 1 0 100 2h6zm-6 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trend Rapport</span>
            </div>
            <p className="text-sm text-gray-600">Genereer uitgebreid trend rapport voor geselecteerde periode</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Data Export</span>
            </div>
            <p className="text-sm text-gray-600">Exporteer analytics data naar Excel of CSV formaat</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="font-medium">Dashboard Configuratie</span>
            </div>
            <p className="text-sm text-gray-600">Pas dashboard weergave en KPI's aan naar voorkeur</p>
          </button>
        </div>
      </div>
    </div>
  );
}