"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "../../../lib/api";

type ErvaringsNiveau = "beginner" | "ervaren" | "expert";

type MobiliteitIndicator = {
  id: string;
  label: string;
  description: string;
  min_ervaring_niveau: ErvaringsNiveau;
};

type MobiliteitCompetentie = {
  id: string;
  name: string;
  description: string;
  categorie: string;
  indicators: MobiliteitIndicator[];
};

type AutomotiveKandidaat = {
  id: string;
  user_id: string;
  competentie_voortgang: Record<string, Record<string, boolean>>;
  status_phase: string;
  jaren_ervaring: number;
  specialisaties: string[];
  certificaten: string[];
};

type MobiliteitTraject = {
  id: string;
  name: string;
  beschrijving: string;
  competenties: MobiliteitCompetentie[];
  medische_eisen: string[];
};

// Demo data voor automotive techniek
const demoKandidaat: AutomotiveKandidaat = {
  id: "kandidaat_001",
  user_id: "user_ramin",
  jaren_ervaring: 8,
  specialisaties: ["Personenwagens", "Bedrijfswagens", "Elektrische voertuigen"],
  certificaten: ["APK Keurmeester", "Airconditioning Certificaat"],
  competentie_voortgang: {
    comp_apk_keuring: {
      apk_01: true,
      apk_02: true,
      apk_03: true,
      apk_04: true,
      apk_05: true,
      apk_06: false
    },
    comp_onderhoud: {
      oh_01: true,
      oh_02: true,
      oh_03: true,
      oh_04: true,
      oh_05: false,
      oh_06: false
    },
    comp_diagnose: {
      dr_01: true,
      dr_02: true,
      dr_03: false,
      dr_04: true,
      dr_05: true,
      dr_06: false
    },
    comp_montage: {
      om_01: true,
      om_02: true,
      om_03: true,
      om_04: false,
      om_05: false
    },
    comp_professioneel: {
      ph_01: true,
      ph_02: true,
      ph_03: true,
      ph_04: true,
      ph_05: true
    }
  },
  status_phase: "portfolio"
};

const demoTraject: MobiliteitTraject = {
  id: "traject_automotive_techniek",
  name: "EVC Automotive Techniek - Personenwagens en Bedrijfswagens",
  beschrijving: "Erkenning van Verworven Competenties voor automotive technische beroepen. Voor professionals met ervaring in het onderhoud en reparatie van personenwagens en bedrijfswagens.",
  medische_eisen: [
    "Geen fysieke beperkingen die het veilig werken in de werkplaats belemmeren",
    "Voldoende gezichtsvermogen voor nauwkeurig werk",
    "Geen allergieën voor gebruikelijke werkplaatsmaterialen"
  ],
  competenties: [
    {
      id: "comp_apk_keuring",
      name: "APK Keuring en Controle",
      description: "Uitvoeren van APK-keuringen en veiligheidscontroles",
      categorie: "Keuring en Inspectie",
      indicators: [
        {
          id: "apk_01",
          label: "Visuele inspectie voertuig",
          description: "Kan systematisch visuele controle uitvoeren van carrosserie, verlichting en veiligheidsvoorzieningen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_02",
          label: "Remmen testen",
          description: "Kan remwerking testen en beoordelen conform APK-eisen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_03",
          label: "Uitlaat- en emissiecontrole",
          description: "Kan uitlaatgassen meten en beoordelen volgens milieueisen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_04",
          label: "Stuur- en ophangsysteem",
          description: "Kan stuurinrichting en wielophanging controleren op speling en slijtage",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_05",
          label: "Banden en velgen",
          description: "Kan banden controleren op profieldiepte, beschadigingen en juiste spanning",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "apk_06",
          label: "APK-rapport opstellen",
          description: "Kan correcte APK-rapporten opstellen met bevindingen en aanbevelingen",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_onderhoud",
      name: "Standaard Onderhoud",
      description: "Preventief onderhoud en standaard servicebeurten",
      categorie: "Onderhoud en Service",
      indicators: [
        {
          id: "oh_01",
          label: "Motorolie verversen",
          description: "Kan motorolie en filter verversen volgens fabrieksspecificaties",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_02",
          label: "Vloeistofpeil controleren",
          description: "Kan alle vloeistofniveaus controleren en bijvullen (rem, koppeling, koeling, ruitenwasser)",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_03",
          label: "Luchtfilter vervangen",
          description: "Kan lucht- en brandstoffilters vervangen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_04",
          label: "Bougies vervangen",
          description: "Kan ontstekingssysteem onderhouden (bougies, bobines)",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "oh_05",
          label: "Distributieonderhoud",
          description: "Kan distributieriem en spanning controleren en vervangen",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "oh_06",
          label: "Onderhoudsschema plannen",
          description: "Kan onderhoudsschema opstellen volgens fabrieksvoorschriften",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_diagnose",
      name: "Diagnose en Reparaties",
      description: "Storingen diagnosticeren en reparaties uitvoeren",
      categorie: "Diagnose en Reparatie",
      indicators: [
        {
          id: "dr_01",
          label: "OBD-diagnose uitvoeren",
          description: "Kan diagnoseapparatuur gebruiken om foutcodes uit te lezen en te interpreteren",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "dr_02",
          label: "Elektrische systemen testen",
          description: "Kan elektrische circuits en componenten testen en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_03",
          label: "Motorproblemen diagnosticeren",
          description: "Kan motorproblemen identificeren en repareren (startproblemen, trillingen, geluid)",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_04",
          label: "Remsysteem onderhouden",
          description: "Kan remschijven, remblokken en remvloeistof vervangen en onderhouden",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "dr_05",
          label: "Airconditioning servicen",
          description: "Kan airconditioningsysteem controleren, bijvullen en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "dr_06",
          label: "Complexe reparaties plannen",
          description: "Kan complexe reparaties plannen en uitvoeren (motor, transmissie)",
          min_ervaring_niveau: "expert"
        }
      ]
    },
    {
      id: "comp_montage",
      name: "Onderdelen en Montage",
      description: "Onderdelen (de)monteren, vervangen en afstellen",
      categorie: "Montage en Demontage",
      indicators: [
        {
          id: "om_01",
          label: "Onderdelen identificeren",
          description: "Kan voertuigonderdelen correct identificeren en bestellen",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_02",
          label: "Demontage technieken",
          description: "Kan onderdelen vakkundig demonteren zonder beschadiging",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_03",
          label: "Montage en afstelling",
          description: "Kan onderdelen correct monteren en afstellen volgens specificaties",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "om_04",
          label: "Koppeling vervangen",
          description: "Kan koppeling en versnellingsbak onderhouden en repareren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "om_05",
          label: "Wielophanging afstellen",
          description: "Kan wielophanging en uitlijning controleren en afstellen",
          min_ervaring_niveau: "ervaren"
        }
      ]
    },
    {
      id: "comp_professioneel",
      name: "Professioneel Handelen",
      description: "Professionele werkhouding en communicatie",
      categorie: "Professionaliteit",
      indicators: [
        {
          id: "ph_01",
          label: "Veiligheid en milieu",
          description: "Kent en past veiligheids- en milieuregels toe in de werkplaats",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_02",
          label: "Klantcommunicatie",
          description: "Kan helder communiceren met klanten over reparaties en kosten",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_03",
          label: "Werkplanning",
          description: "Kan werkzaamheden efficiënt plannen en prioriteren",
          min_ervaring_niveau: "ervaren"
        },
        {
          id: "ph_04",
          label: "Kwaliteitscontrole",
          description: "Voert kwaliteitscontroles uit en test reparaties grondig",
          min_ervaring_niveau: "beginner"
        },
        {
          id: "ph_05",
          label: "Administratie en rapportage",
          description: "Kan werkorders en rapportages correct invullen",
          min_ervaring_niveau: "beginner"
        }
      ]
    }
  ]
};

export default function MobiliteitDashboard() {
  const [kandidaat, setKandidaat] = useState<AutomotiveKandidaat>(demoKandidaat);
  const [traject, setTraject] = useState<MobiliteitTraject>(demoTraject);
  const [loading, setLoading] = useState(false);
  const [selectedCompetentie, setSelectedCompetentie] = useState<string | null>(null);

  // Bereken totale voortgang
  const berekenVoortgang = () => {
    const totaalIndicators = traject.competenties.reduce((sum, comp) => sum + comp.indicators.length, 0);
    const voltooideIndicators = traject.competenties.reduce(
      (sum, comp) => 
        sum + comp.indicators.filter(indicator => 
          kandidaat.competentie_voortgang[comp.id]?.[indicator.id] === true
        ).length, 
      0
    );
    return Math.round((voltooideIndicators / totaalIndicators) * 100);
  };

  const totaleVoortgang = berekenVoortgang();

  // Bepaal ervaringsniveau op basis van jaren ervaring
  const getErvaringsNiveau = (): ErvaringsNiveau => {
    if (kandidaat.jaren_ervaring >= 10) return "expert";
    if (kandidaat.jaren_ervaring >= 3) return "ervaren"; 
    return "beginner";
  };

  const ervaringsNiveau = getErvaringsNiveau();

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              🔧
            </div>
            <div>
              <p className="text-sm font-medium text-skillval-warm">EVC Mobiliteit</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Automotive Techniek - Personenwagens
              </h1>
              <p className="mt-2 text-gray-600">
                Toon je autotechnische vaardigheden en behaal je EVC-erkenning
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Totale voortgang</p>
            <div className="text-4xl font-bold text-skillval-warm">{totaleVoortgang}%</div>
            <p className="text-xs text-gray-500 mt-1">{kandidaat.jaren_ervaring} jaar ervaring</p>
          </div>
        </div>
      </section>

      {/* Professionele Info */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Jouw Professionele Profiel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Werkervaring</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Jaren ervaring:</span>
                  <span className="font-semibold">{kandidaat.jaren_ervaring} jaar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ervaringsniveau:</span>
                  <span className={`font-semibold capitalize ${
                    ervaringsNiveau === 'expert' ? 'text-green-600' :
                    ervaringsNiveau === 'ervaren' ? 'text-blue-600' : 'text-amber-600'
                  }`}>{ervaringsNiveau}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="font-semibold capitalize text-skillval-warm">{kandidaat.status_phase}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">Specialisaties</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {kandidaat.specialisaties.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Certificaten</h4>
              <div className="space-y-1">
                {kandidaat.certificaten.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competenties Overview */}
      <section className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Competentie Overzicht</h2>
          <span className="text-sm text-gray-600">
            {traject.competenties.length} competentiegebieden
          </span>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {traject.competenties.map((competentie) => {
            const voltooideIndicators = competentie.indicators.filter(
              indicator => kandidaat.competentie_voortgang[competentie.id]?.[indicator.id] === true
            ).length;
            const totaalIndicators = competentie.indicators.length;
            const percentage = Math.round((voltooideIndicators / totaalIndicators) * 100);
            
            return (
              <div key={competentie.id} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{competentie.categorie}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{competentie.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{competentie.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${
                      percentage >= 80 ? 'text-green-600' :
                      percentage >= 60 ? 'text-blue-600' : 
                      percentage >= 40 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {percentage}%
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-blue-500' :
                        percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {voltooideIndicators} van {totaalIndicators} indicatoren
                  </span>
                  <button
                    onClick={() => setSelectedCompetentie(
                      selectedCompetentie === competentie.id ? null : competentie.id
                    )}
                    className="text-skillval-warm hover:text-skillval-bright font-medium"
                  >
                    {selectedCompetentie === competentie.id ? 'Verberg' : 'Details'}
                  </button>
                </div>
                
                {selectedCompetentie === competentie.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      {competentie.indicators.map((indicator) => {
                        const isCompleted = kandidaat.competentie_voortgang[competentie.id]?.[indicator.id] === true;
                        const isAccessible = ervaringsNiveau === 'expert' || 
                          (ervaringsNiveau === 'ervaren' && indicator.min_ervaring_niveau !== 'expert') ||
                          (ervaringsNiveau === 'beginner' && indicator.min_ervaring_niveau === 'beginner');
                        
                        return (
                          <div
                            key={indicator.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCompleted 
                                ? 'bg-green-50 border-green-200' 
                                : isAccessible
                                ? 'bg-gray-50 border-gray-200'
                                : 'bg-amber-50 border-amber-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isCompleted 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-gray-300'
                              }`}>
                                {isCompleted && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold text-gray-900">{indicator.label}</p>
                                  {!isAccessible && (
                                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                                      Meer ervaring vereist
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{indicator.description}</p>
                                {!isCompleted && isAccessible && (
                                  <Link
                                    href={`/dashboard/mobiliteit/bewijs?competentie=${competentie.id}&indicator=${indicator.id}`}
                                    className="inline-flex items-center gap-1 text-xs text-skillval-warm hover:text-skillval-bright font-medium mt-2"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Bewijs toevoegen
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/mobiliteit/bewijs"
          className="glass-card hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-skillval-warm rounded-xl flex items-center justify-center text-white group-hover:bg-skillval-bright transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Bewijs Toevoegen</h3>
              <p className="text-sm text-gray-600">Upload documenten of certificaten</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/mobiliteit/assessment"
          className="glass-card hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:bg-blue-700 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Assessment Plannen</h3>
              <p className="text-sm text-gray-600">Afspraak maken voor beoordeling</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/portfolio"
          className="glass-card hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white group-hover:bg-green-700 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Portfolio Overzicht</h3>
              <p className="text-sm text-gray-600">Bekijk al je bewijsstukken</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}