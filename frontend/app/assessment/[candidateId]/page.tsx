"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AssessmentCaptureView } from "@/components/AssessmentCaptureView";
import { ReportPreviewCard } from "@/components/ReportPreviewCard";
import { API_BASE_URL } from "@/lib/api";

export default function AssessmentCapturePage() {
  // Assessor werkt mobiel: verzamelt bewijs en triggert AI-rapportage voor kandidaat.
  const params = useParams<{ candidateId: string }>();
  const candidateId = params.candidateId;
  const [draftReport, setDraftReport] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  async function uploadEvidence(file: File) {
    const formData = new FormData();
    formData.append("description", file.name);
    formData.append("file", file);

    await fetch(`${API_BASE_URL}/candidates/${candidateId}/evidence`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  }

  async function generateReport(notes: string) {
    const wsUrl = API_BASE_URL.replace("http", "ws");
    let liveSocket = socket;

    const sendNotes = (ws: WebSocket) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(notes);
      } else {
        ws.addEventListener("open", () => ws.send(notes), { once: true });
      }
    };

    if (!liveSocket) {
      // TODO: voeg JWT token toe aan query zodra backend dat vereist (assessor authenticatie)
      liveSocket = new WebSocket(`${wsUrl}/ws/assessor/live/${candidateId}`);
      sendNotes(liveSocket);
      liveSocket.onerror = () => console.warn("WebSocket error tijdens live notities");
      setSocket(liveSocket);
    } else {
      sendNotes(liveSocket);
    }
    const response = await fetch(`${API_BASE_URL}/assessments/${candidateId}/generate-report`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    const data = await response.json();
    setDraftReport(data.draftReportText ?? "");
  }

  return (
    <div className="space-y-6">
      <header className="glass-card space-y-2">
        <p className="card-section-title">Assessment sessie</p>
        <h1 className="text-3xl font-semibold text-skillval-night">Kandidaat {candidateId}</h1>
        <p className="text-sm text-slate-600">
          Leg observaties vast (autotechniek: praktijkhandelingen, jeugdzorg: reflecties) zodat het rapport direct klaarstaat.
        </p>
      </header>
      <AssessmentCaptureView onGenerateReport={generateReport} onUpload={uploadEvidence} />
      <ReportPreviewCard draftText={draftReport} />
    </div>
  );
}
