"use client";

import { useState } from "react";
import { useTheme, ThemePreset } from "../../providers/theme-provider";

const themeOptions: Array<{
  id: ThemePreset;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    id: "skillval",
    title: "SkillVal klassiek",
    description: "Warm, licht en vertrouwd. Ideaal voor de huidige UI en documentatie.",
    accent: "#FA7921",
  },
  {
    id: "samenai",
    title: "SAMEN.ai futuristisch",
    description: "Donker, neon accenten en glassmorphism. Perfect voor het nieuwe concept.",
    accent: "#2DA3B5",
  },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    feedback: true,
    weeklyReport: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-card">
        <h1 className="text-3xl font-bold text-gray-900">Instellingen</h1>
        <p className="mt-2 text-gray-600">Beheer je voorkeuren en account instellingen</p>
      </section>

      {/* Account Settings */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mailadres
            </label>
            <input
              type="email"
              defaultValue="robin.vermeer@skillval.nl"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wachtwoord
            </label>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
              Wijzig wachtwoord
            </button>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notificaties</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">E-mail notificaties</h3>
              <p className="text-sm text-gray-600 mt-1">Ontvang updates via e-mail</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Push notificaties</h3>
              <p className="text-sm text-gray-600 mt-1">Ontvang meldingen in je browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Feedback notificaties</h3>
              <p className="text-sm text-gray-600 mt-1">Word gewaarschuwd bij nieuwe feedback</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.feedback}
                onChange={(e) => setNotifications({ ...notifications, feedback: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Wekelijks rapport</h3>
              <p className="text-sm text-gray-600 mt-1">Ontvang een overzicht van je voortgang</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Profiel zichtbaar</h3>
              <p className="text-sm text-gray-600 mt-1">Laat anderen je profiel zien</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.profileVisible}
                onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Voortgang delen</h3>
              <p className="text-sm text-gray-600 mt-1">Deel je voortgang met je coach</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showProgress}
                onChange={(e) => setPrivacy({ ...privacy, showProgress: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Uiterlijk</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Thema</p>
            <div className="grid gap-4 md:grid-cols-2">
              {themeOptions.map((option) => {
                const isActive = theme === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTheme(option.id)}
                    className={`group flex flex-col gap-3 rounded-2xl border px-5 py-6 text-left transition duration-200 ${
                      isActive
                        ? "border-skillval-warm shadow-lg ring-2 ring-skillval-warm/40"
                        : "border-gray-200 hover:border-skillval-warm/50 hover:shadow-md"
                    }`}
                  >
                    <span
                      className="h-2 w-16 rounded-full"
                      style={{
                        background: option.id === "samenai"
                          ? "linear-gradient(90deg, #2DA3B5, #D63384)"
                          : option.accent,
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {option.title}
                        {isActive ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                            actief
                          </span>
                        ) : null}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{option.description}</p>
                    </div>
                    <div
                      className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-[0.4em]"
                      style={
                        option.id === "samenai"
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(11,44,56,0.9), rgba(45,163,181,0.4))",
                              color: "#FFFFFF",
                              borderColor: "rgba(45,163,181,0.4)",
                            }
                          : undefined
                      }
                    >
                      preview
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taal
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Nederlands</option>
              <option>English</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tijdzone
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Europe/Amsterdam (GMT+1)</option>
              <option>Europe/Brussels (GMT+1)</option>
              <option>Europe/London (GMT+0)</option>
              <option>America/New_York (GMT-5)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Data & Export */}
      <section className="glass-card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Data & Export</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition">
            <div className="text-left">
              <h3 className="font-semibold text-blue-900">Exporteer portfolio</h3>
              <p className="text-sm text-blue-700 mt-1">Download je complete portfolio als PDF</p>
            </div>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 rounded-lg transition">
            <div className="text-left">
              <h3 className="font-semibold text-yellow-900">Download mijn data</h3>
              <p className="text-sm text-yellow-700 mt-1">Krijg een kopie van al je gegevens</p>
            </div>
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="glass-card border-2 border-red-200">
        <h2 className="text-xl font-bold text-red-900 mb-6">Danger Zone</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-lg transition">
            <div className="text-left">
              <h3 className="font-semibold text-red-900">Verwijder account</h3>
              <p className="text-sm text-red-700 mt-1">Permanent verwijder je account en alle data</p>
            </div>
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
          Annuleren
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
          Opslaan
        </button>
      </div>
    </div>
  );
}
