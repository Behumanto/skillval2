"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const dashboardByRole: Record<string, string> = {
  candidate: "/dashboard/candidate",
  assessor: "/dashboard/assessor",
  coach: "/dashboard/coach",
  admin: "/dashboard/coach",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("candidate@example.com");
  const [password, setPassword] = useState("test123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });

      const { token, role } = response.data as { token: string; role: string };
      if (!token || !role) {
        throw new Error("Ongeldige response van server");
      }

      document.cookie = `skillval_token=${token}; path=/;`;

      const target = dashboardByRole[role] ?? "/dashboard/candidate";
      router.push(target);
    } catch (err) {
      setError((err as Error).message || "Inloggen mislukt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-skillval-ocean via-skillval-forest to-skillval-warm text-white">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
        <div className="w-full rounded-2xl bg-skillval-ocean/20 p-8 shadow-2xl shadow-skillval-ocean/30 backdrop-blur-xl ring-1 ring-white/20">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Welkom bij SkillVal</h1>
            <p className="text-sm text-white/80">Log in om je EVC-traject te bekijken.</p>
          </header>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-white/80">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-full border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 shadow-inner focus:border-skillval-bright focus:ring-2 focus:ring-skillval-bright/60 focus:outline-none"
                placeholder="jij@organisatie.nl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/80">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-full border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 shadow-inner focus:border-skillval-bright focus:ring-2 focus:ring-skillval-bright/60 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            {error ? <p className="text-sm text-skillval-gold/80">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-skillval-ocean shadow-lg shadow-skillval-warm/30 transition hover:bg-skillval-cream disabled:opacity-60"
            >
              {loading ? "Bezig met inloggen…" : "Inloggen"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/70">
            Gebruik geen privacygevoelige gegevens van cliënten. SkillVal AI helpt je bewijslast opbouwen, maar jij beslist wat je deelt.
          </p>
        </div>
      </div>
    </main>
  );
}
