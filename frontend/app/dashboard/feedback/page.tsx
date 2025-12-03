"use client";

import { useState } from "react";

type FeedbackItem = {
  id: string;
  from: string;
  role: "assessor" | "coach";
  date: string;
  evidence: string;
  rating: number;
  comment: string;
  suggestions: string[];
};

const dummyFeedback: FeedbackItem[] = [
  {
    id: "1",
    from: "Dr. Maria van den Berg",
    role: "assessor",
    date: "2024-10-18",
    evidence: "Begeleiding casus gezin met puber",
    rating: 4,
    comment: "Uitstekend werk Robin! Je beschrijving is helder en toont goed aan hoe je methodisch te werk bent gegaan. De reflectie op je aanpak is sterk.",
    suggestions: [
      "Voeg meer details toe over de evaluatie met het gezin",
      "Beschrijf explicieter welke methodiek je hebt toegepast",
    ],
  },
  {
    id: "2",
    from: "Linda Jansen",
    role: "coach",
    date: "2024-10-15",
    evidence: "Verslaglegging crisissituatie",
    rating: 5,
    comment: "Zeer professioneel! Je hebt goed laten zien hoe je onder druk kunt presteren en ethisch handelt. De nabespreking was ook goed gedocumenteerd.",
    suggestions: [],
  },
  {
    id: "3",
    from: "Dr. Maria van den Berg",
    role: "assessor",
    date: "2024-10-10",
    evidence: "Audio-reflectie interdisciplinair overleg",
    rating: 3,
    comment: "Goede basis, maar de reflectie kan dieper. Je beschrijft wat er gebeurde, maar zou meer kunnen ingaan op wat je hebt geleerd en hoe je dit in de toekomst toepast.",
    suggestions: [
      "Breid de reflectie uit met concrete leerpunten",
      "Beschrijf hoe je de feedback van collega's hebt verwerkt",
      "Voeg een actieplan toe voor verbetering",
    ],
  },
];

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getRoleColor = (role: string) => {
    return role === "assessor" ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-purple-100 text-purple-700 border-purple-300";
  };

  const averageRating = (dummyFeedback.reduce((sum, item) => sum + item.rating, 0) / dummyFeedback.length).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mijn Feedback</h1>
            <p className="mt-2 text-gray-600">Overzicht van alle ontvangen feedback op je portfolio</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">{averageRating}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              {getRatingStars(Math.round(parseFloat(averageRating)))}
            </div>
            <p className="text-sm text-gray-600 mt-1">Gemiddelde score</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-6">
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-gray-900">{dummyFeedback.length}</div>
          <p className="mt-1 text-sm text-gray-600">Totaal reviews</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-green-600">
            {dummyFeedback.filter(f => f.rating >= 4).length}
          </div>
          <p className="mt-1 text-sm text-gray-600">4+ sterren</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-blue-600">
            {dummyFeedback.filter(f => f.role === "assessor").length}
          </div>
          <p className="mt-1 text-sm text-gray-600">Van assessor</p>
        </div>
        <div className="glass-card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {dummyFeedback.filter(f => f.role === "coach").length}
          </div>
          <p className="mt-1 text-sm text-gray-600">Van coach</p>
        </div>
      </section>

      {/* Feedback List */}
      <section className="space-y-4">
        {dummyFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className="glass-card hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedFeedback(selectedFeedback?.id === feedback.id ? null : feedback)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {feedback.from.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.from}</h3>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full border ${getRoleColor(feedback.role)}`}>
                      {feedback.role === "assessor" ? "Assessor" : "Coach"}
                    </span>
                  </div>
                </div>

                <div className="ml-15">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Bewijsstuk:</span> {feedback.evidence}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">{getRatingStars(feedback.rating)}</div>
                    <span className="text-sm text-gray-500">
                      {new Date(feedback.date).toLocaleDateString("nl-NL")}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {feedback.comment}
                  </p>

                  {selectedFeedback?.id === feedback.id && feedback.suggestions.length > 0 && (
                    <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Verbeterpunten
                      </h4>
                      <ul className="space-y-2">
                        {feedback.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-yellow-800">
                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      selectedFeedback?.id === feedback.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Request Feedback */}
      <section className="glass-card bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Vraag feedback aan</h3>
            <p className="text-sm text-gray-600 mt-1">
              Wil je graag feedback op een specifiek bewijsstuk? Neem contact op met je assessor via de chat.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
            Vraag feedback
          </button>
        </div>
      </section>
    </div>
  );
}
