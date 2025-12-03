"use client";

import { useState } from "react";

interface AssessmentCaptureProps {
  onGenerateReport: (notes: string) => Promise<void>;
  onUpload: (file: File) => Promise<void>;
}

// Assessor legt live observaties vast (autotechniek: praktijkhandelingen, jeugdzorg: casuïstiek) voor AI-rapportage.
export function AssessmentCaptureView({ onGenerateReport, onUpload }: AssessmentCaptureProps) {
  const [notes, setNotes] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [isGenerating, setGenerating] = useState(false);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  }

  async function handleGenerateReport() {
    setGenerating(true);
    try {
      await onGenerateReport(notes);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <section className="glass-card space-y-5">
      <header className="space-y-2">
        <p className="card-section-title">Praktijkobservatie</p>
        <h2 className="text-2xl font-semibold text-skillval-night">Leg bewijs vast</h2>
        <p className="text-sm text-slate-600">
          Maak foto’s/video’s of neem audio op terwijl je in de werkplaats of jeugdzorg-setting observeert. SkillVal koppelt dit later aan indicatoren.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-skillval-sky/60 bg-white/60 py-6 text-sm text-skillval-sky shadow-sm hover:bg-white">
          Foto maken
          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </label>
        <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-skillval-sky/60 bg-white/60 py-6 text-sm text-skillval-sky shadow-sm hover:bg-white">
          Video uploaden
          <input type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
        </label>
        <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-skillval-sky/60 bg-white/60 py-6 text-sm text-skillval-sky shadow-sm hover:bg-white">
          Audio opnemen
          <input type="file" accept="audio/*" className="hidden" onChange={handleFileSelect} />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-skillval-night">Live notities voor rapport</label>
        <textarea
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 p-4 text-sm shadow-sm focus:border-skillval-sky focus:outline-none"
          placeholder="Beschrijf waarnemingen, indicatoren, en context zodat de AI het rapport kan verrijken."
        />
      </div>

      <button
        type="button"
        onClick={handleGenerateReport}
        disabled={isGenerating}
        className="inline-flex items-center justify-center rounded-full bg-skillval-sky px-5 py-3 text-sm font-semibold text-white shadow-float transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isGenerating ? "Rapport wordt opgesteld…" : "Genereer concept rapport"}
      </button>

      {isUploading ? <p className="text-xs text-slate-500">Upload bezig…</p> : null}
    </section>
  );
}
