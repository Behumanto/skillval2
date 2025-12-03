"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// AI-gesprekspartner die kandidaten helpt portfolio-bewijs voor SKJ/jeugdzorg te concretiseren.
interface Message {
  role: "ai" | "user";
  text: string;
}

export function AIChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welkom! Vertel wat je hebt gedaan rond Deskundigheidsgebied 3, dan help ik het bewijs concreet te maken.",
    },
  ]);
  const [input, setInput] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", text: input.trim() };
    const aiMessage: Message = {
      role: "ai",
      text: "Top! Ik noteer je bewijslast. Denk ook aan reflectie: waarom koos je voor deze aanpak?",
    };
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  }

  return (
    <section className="glass-card flex h-full flex-col">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-skillval-night">SkillVal AI</h3>
        <span className="status-pill bg-skillval-sky/20 text-skillval-sky">Beschikbaar</span>
      </header>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.role}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`max-w-sm rounded-2xl px-4 py-3 text-sm shadow ${
              message.role === "ai"
                ? "bg-skillval-foam/70 text-skillval-night"
                : "ml-auto bg-skillval-sky text-white"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-skillval-sky focus:outline-none"
          placeholder="Vraag het aan SkillVal AI…"
        />
        <button
          type="submit"
          className="rounded-full bg-skillval-sky px-4 py-2 text-sm font-semibold text-white shadow-float transition hover:-translate-y-0.5"
        >
          Verstuur
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-500">
        SkillVal AI is jouw assistent. Gebruik geen privacygevoelige namen.
      </p>
    </section>
  );
}
