"use client";

import { useEffect, useState } from "react";
import { parseToken, DecodedToken, TrajectType } from "../../lib/auth";
import { selectTrajectForUser, TrajectData } from "../../lib/trajectSelector";
import AutomotiveDashboard from "./dashboards/AutomotiveDashboard";
import JeugdzorgDashboard from "./dashboards/JeugdzorgDashboard";
import AlgemeenDashboard from "./dashboards/AlgemeenDashboard";

type DashboardProps = {
  userToken?: string;
};

export default function DynamicDashboard({ userToken }: DashboardProps) {
  const [token, setToken] = useState<DecodedToken | null>(null);
  const [traject, setTraject] = useState<TrajectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse token (in productie zou dit uit cookies/localStorage komen)
    const parsedToken = userToken ? parseToken(userToken) : mockToken();
    setToken(parsedToken);
    
    // Bepaal traject op basis van token
    const selectedTraject = selectTrajectForUser(parsedToken);
    setTraject(selectedTraject);
    
    setLoading(false);
  }, [userToken]);

  // Mock token voor demo - in productie komt dit uit authentication
  function mockToken(): DecodedToken {
    // Simuleer verschillende gebruikers
    const mockUsers = [
      {
        userId: "user_ramin",
        role: "candidate" as const,
        tenantId: "automotive_garage_nederland",
        trajectType: "automotive" as TrajectType,
        specialisatie: "Autotechniek"
      },
      {
        userId: "user_sarah",
        role: "candidate" as const,
        tenantId: "jeugdzorg_amsterdam",
        trajectType: "jeugdzorg" as TrajectType,
        specialisatie: "Jeugdzorg"
      }
    ];
    
    // Voor demo, gebruik eerste user (automotive)
    // In praktijk zou dit gebaseerd zijn op daadwerkelijke login
    return mockUsers[0];
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <span>Traject wordt geladen...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!token || !traject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Geen traject gevonden</div>
          <p className="text-gray-600">Neem contact op met je begeleider om je profiel in te stellen.</p>
        </div>
      </div>
    );
  }

  // Debug info (alleen in development)
  const showDebugInfo = process.env.NODE_ENV === 'development';

  return (
    <div>
      {/* Debug informatie */}
      {showDebugInfo && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Debug:</strong> User: {token.userId} | Traject: {traject.type} | Tenant: {token.tenantId}
          </p>
        </div>
      )}

      {/* Render juiste dashboard */}
      {traject.type === "automotive" && <AutomotiveDashboard traject={traject} token={token} />}
      {traject.type === "jeugdzorg" && <JeugdzorgDashboard traject={traject} token={token} />}
      {traject.type === "algemeen" && <AlgemeenDashboard traject={traject} token={token} />}
    </div>
  );
}