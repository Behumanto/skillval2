"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../../../../lib/api";

type Evidence = {
  id: string;
  title: string;
  description: string;
  competencyAreaId: string;
  type: string;
  status: string;
  timestamp: string;
  pathOrBlobRef: string;
  mappedIndicators: string[];
  candidateId: string;
  aiGeneratedLikelihood: number;
  transcript?: string;
  fraudFlags: any[];
};

export default function EvidenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const evidenceId = params.id as string;

  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvidence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evidenceId]);

  const fetchEvidence = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/evidence/${evidenceId}`);
      if (!response.ok) {
        throw new Error("Bewijs niet gevonden");
      }
      const data = await response.json();
      setEvidence(data);
      setEditTitle(data.title);
      setEditDescription(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!evidence) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription);

      const response = await fetch(`${API_BASE_URL}/evidence/${evidenceId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Bijwerken gefaald");
      }

      await fetchEvidence();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Weet je zeker dat je dit bewijs wilt verwijderen?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/evidence/${evidenceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Verwijderen gefaald");
      }

      router.push("/dashboard/portfolio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
      setDeleting(false);
    }
  };

  const handleDownload = () => {
    window.open(`${API_BASE_URL}/evidence/${evidenceId}/download`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-900">Laden...</div>
      </div>
    );
  }

  if (error && !evidence) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Bewijs niet gevonden</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/dashboard/portfolio" className="text-green-600 hover:text-green-700 font-medium">
            Terug naar portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!evidence) return null;

  const getStatusBadge = () => {
    switch (evidence.status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Goedgekeurd
          </span>
        );
      case "needs-revision":
        return (
          <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium border border-red-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Aanpassing nodig
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            In beoordeling
          </span>
        );
    }
  };

  const getFileIcon = () => {
    switch (evidence.type) {
      case "pdf":
      case "document":
        return (
          <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case "image":
        return (
          <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case "audio":
        return (
          <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/dashboard/portfolio" className="inline-flex items-center text-gray-600 hover:text-gray-900">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Terug naar portfolio
      </Link>

      {/* Header */}
      <section className="glass-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              {getFileIcon()}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-2 border-green-300 rounded-lg px-3 py-2 w-full mb-3"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{evidence.title}</h1>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                {getStatusBadge()}
                <span className="text-sm text-gray-600">
                  {new Date(evidence.timestamp).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-3 hover:bg-gray-100 rounded-lg transition"
                  title="Bewerken"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-3 hover:bg-gray-100 rounded-lg transition"
                  title="Downloaden"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="p-3 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                  title="Verwijderen"
                >
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? "Opslaan..." : "Opslaan"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(evidence.title);
                    setEditDescription(evidence.description);
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
                >
                  Annuleren
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Error message */}
      {error && evidence && (
        <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-5 flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-bold text-red-900 mb-1">Er is iets misgegaan</p>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Description */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Beschrijving</h2>
        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 resize-none"
          />
        ) : (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{evidence.description}</p>
        )}
      </section>

      {/* Metadata */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-600">Type bestand</dt>
            <dd className="mt-1 text-base text-gray-900 capitalize">{evidence.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-600">Upload datum</dt>
            <dd className="mt-1 text-base text-gray-900">
              {new Date(evidence.timestamp).toLocaleString("nl-NL")}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-600">Gekoppelde indicatoren</dt>
            <dd className="mt-1 text-base text-gray-900">
              {evidence.mappedIndicators.length > 0
                ? `${evidence.mappedIndicators.length} indicatoren`
                : "Nog geen indicatoren gekoppeld"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-600">AI controle</dt>
            <dd className="mt-1 text-base text-gray-900">
              {evidence.aiGeneratedLikelihood > 0.7 ? (
                <span className="text-red-600">Hoge AI waarschijnlijkheid ({Math.round(evidence.aiGeneratedLikelihood * 100)}%)</span>
              ) : (
                <span className="text-green-600">Geen indicatie AI-gegenereerd</span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      {/* Transcript (if available) */}
      {evidence.transcript && (
        <section className="glass-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transcript</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
            {evidence.transcript}
          </p>
        </section>
      )}
    </div>
  );
}
