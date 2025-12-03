"use client";

import { useState } from "react";

type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  category: "feedforward" | "competency" | "vision" | "progress";
  lastGenerated?: string;
  usage: number;
};

type GeneratedReport = {
  id: string;
  name: string;
  type: string;
  candidateName?: string;
  generatedDate: string;
  downloadUrl: string;
  size: string;
};

export default function ReportsPage() {
  const [templates] = useState<ReportTemplate[]>([
    {
      id: "1",
      name: "EVC Feed Forward Rapport",
      description: "Maandelijkse feedback rapportage volgens Examenkamer standaard met constructieve aanbevelingen",
      category: "feedforward",
      lastGenerated: "2024-11-20T10:30:00",
      usage: 24
    },
    {
      id: "2", 
      name: "Competentie Analyse Rapport",
      description: "Gedetailleerd overzicht van aangetoonde competenties per kandidaat",
      category: "competency",
      lastGenerated: "2024-11-18T14:15:00",
      usage: 18
    },
    {
      id: "3",
      name: "Vision Assessment Overzicht",
      description: "Samenvatting van alle AI vision analyses met object detectie resultaten",
      category: "vision",
      lastGenerated: "2024-11-22T09:45:00",
      usage: 31
    },
    {
      id: "4",
      name: "Voortgang Rapportage",
      description: "Overzicht van kandidaat voortgang en assessment planning",
      category: "progress",
      lastGenerated: "2024-11-19T16:20:00",
      usage: 12
    },
    {
      id: "5",
      name: "Maandelijks Dashboard",
      description: "Complete maandelijkse statistieken en trends voor alle assessments",
      category: "progress",
      usage: 8
    },
    {
      id: "6", 
      name: "Veiligheids Audit Rapport",
      description: "Specifiek rapport over veiligheidsprotocollen en nalevingstrends",
      category: "vision",
      usage: 6
    }
  ]);

  const [recentReports] = useState<GeneratedReport[]>([
    {
      id: "1",
      name: "EVC_feedforward_rapport_2024-11-20.pdf",
      type: "Feed Forward",
      candidateName: "Robin Jansen",
      generatedDate: "2024-11-20T10:30:00",
      downloadUrl: "#",
      size: "245 KB"
    },
    {
      id: "2",
      name: "Vision_assessment_overzicht_2024-11-22.pdf", 
      type: "Vision Assessment",
      generatedDate: "2024-11-22T09:45:00",
      downloadUrl: "#",
      size: "1.2 MB"
    },
    {
      id: "3",
      name: "Competentie_analyse_2024-11-18.pdf",
      type: "Competentie Analyse",
      candidateName: "Mila de Vries", 
      generatedDate: "2024-11-18T14:15:00",
      downloadUrl: "#",
      size: "320 KB"
    },
    {
      id: "4",
      name: "Maandelijks_dashboard_november_2024.pdf",
      type: "Dashboard",
      generatedDate: "2024-11-01T08:00:00",
      downloadUrl: "#",
      size: "890 KB"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const getCategoryColor = (category: ReportTemplate["category"]) => {
    switch (category) {
      case "feedforward": return "bg-blue-100 text-blue-800";
      case "competency": return "bg-green-100 text-green-800";
      case "vision": return "bg-purple-100 text-purple-800";
      case "progress": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: ReportTemplate["category"]) => {
    switch (category) {
      case "feedforward": return "Feed Forward";
      case "competency": return "Competentie";
      case "vision": return "Vision AI";
      case "progress": return "Voortgang";
      default: return "Anders";
    }
  };

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const generateReport = async (templateId: string) => {
    setIsGenerating(true);
    setSelectedTemplate(templateId);
    
    const template = templates.find(t => t.id === templateId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Rapport "${template?.name}" is succesvol gegenereerd!\n\n` +
            `✓ Privacy filtering toegepast\n` +
            `✓ Professionele vormgeving\n` +
            `✓ Examenkamer compliance\n` +
            `✓ Download gereed`);
            
    } catch (error) {
      alert("Fout bij genereren rapport. Probeer opnieuw.");
    } finally {
      setIsGenerating(false);
      setSelectedTemplate("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rapporten Genereren</h1>
            <p className="text-gray-600 mt-1">Professionele EVC rapporten met privacy compliance</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rapport Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand</p>
              <p className="text-2xl font-bold text-gray-900">{templates.reduce((sum, t) => sum + t.usage, 0)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vision AI Rapporten</p>
              <p className="text-2xl font-bold text-gray-900">{templates.filter(t => t.category === "vision").reduce((sum, t) => sum + t.usage, 0)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recente Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{recentReports.length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter */}
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Rapport Templates</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: "all", label: "Alle Templates" },
                { key: "feedforward", label: "Feed Forward" },
                { key: "competency", label: "Competentie" },
                { key: "vision", label: "Vision AI" },
                { key: "progress", label: "Voortgang" }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSelectedCategory(option.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === option.key
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="space-y-4">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                          {getCategoryLabel(template.category)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Gebruikt: {template.usage}x deze maand</span>
                        {template.lastGenerated && (
                          <span>Laatst: {new Date(template.lastGenerated).toLocaleDateString('nl-NL')}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => generateReport(template.id)}
                      disabled={isGenerating && selectedTemplate === template.id}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                        isGenerating && selectedTemplate === template.id
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {isGenerating && selectedTemplate === template.id ? "Genereren..." : "Genereer"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recente Rapporten</h2>
            
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{report.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{report.type}</p>
                      {report.candidateName && (
                        <p className="text-xs text-gray-500">Voor: {report.candidateName}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{new Date(report.generatedDate).toLocaleDateString('nl-NL')}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 text-sm text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition">
              Alle rapporten bekijken
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="glass-card">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Privacy & Compliance</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Automatische data anonymisering</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Examenkamer compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Professionele vormgeving</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Constructieve feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}