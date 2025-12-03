"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "../../providers/theme-provider";
import { useDomain } from "../../providers/domain-provider";

type Sender = "user" | "assistant" | "assessor";

type Message = {
  id: string;
  sender: Sender;
  content: string;
  timestamp: string;
  avatar?: string;
  status?: "ready" | "error";
};

// Domain-specific initial messages and system prompts
const getDomainData = (domain: string) => {
  if (domain === "autotechniek") {
    return {
      initialMessages: [
        {
          id: "1",
          sender: "assessor" as const,
          content: "Hallo Ramin! Ik heb je motordiagnose rapport voor de BMW 320i bekeken. Kun je uitleggen welke diagnose-stappen je hebt gevolgd bij het identificeren van het ECU probleem?",
          timestamp: "2024-10-20T14:30:00",
          avatar: "/mentor-support.jpg",
        },
        {
          id: "2", 
          sender: "user" as const,
          content: "Hoi! Ik heb eerst een OBD scan gedaan, daarna de sensoren getest en ten slotte de bekabeling gecontroleerd. Het bleek inderdaad een defecte lambda sensor te zijn.",
          timestamp: "2024-10-20T15:02:00",
          avatar: "/ramin.jpeg",
        },
        {
          id: "3",
          sender: "assistant" as const,
          content: "💡 Tip van SkillVal AI: Voeg screenshots van de OBD uitlezing toe en documenteer waarom je voor deze diagnose-volgorde hebt gekozen. Dit toont je systematische aanpak.",
          timestamp: "2024-10-20T15:04:00",
        },
      ],
      systemPrompt: `Je bent SkillVal AI: een Nederlandstalige coach gespecialiseerd in autotechniek EVC-trajecten.
Help kandidaten hun technische vaardigheden en bewijslast te versterken. Focus op:
- Motordiagnose en reparatietechnieken
- Elektronische systemen en ECU programmering  
- Veiligheidsprotocollen in de werkplaats
- Documentatie van technische processen
- Reflectie op vakmanschap en klantenservice
Geef praktische, technische adviezen met concrete voorbeelden uit de autotechniek.`,
      quickActions: [
        {
          title: "Vraag om technische feedback",
          text: "Kun je mijn diagnose-aanpak beoordelen en aangeven waar ik dit kan verbeteren?",
        },
        {
          title: "Vraag om veiligheidscheck", 
          text: "Heb ik alle veiligheidsmaatregelen correct toegepast tijdens deze reparatie?",
        },
        {
          title: "Vraag om documentatie tips",
          text: "Hoe kan ik mijn technische rapporten verbeteren om beter mijn vakkennis te tonen?",
        },
      ]
    };
  } else if (domain === "jeugdzorg") {
    return {
      initialMessages: [
        {
          id: "1",
          sender: "assessor" as const,
          content: "Hallo Ramin! Ik heb je reflectie over de groepsactiviteit gelezen. Hoe heb je de spanningen tussen Tim en Lisa aangepakt tijdens de activiteit?",
          timestamp: "2024-10-20T14:30:00",
          avatar: "/mentor-support.jpg",
        },
        {
          id: "2",
          sender: "user" as const,  
          content: "Ik heb eerst de-escalatie technieken gebruikt en daarna individueel met beide jongeren gesproken om hun perspectief te begrijpen.",
          timestamp: "2024-10-20T15:02:00",
          avatar: "/ramin.jpeg",
        },
        {
          id: "3",
          sender: "assistant" as const,
          content: "💡 Tip van SkillVal AI: Beschrijf concreet welke de-escalatie technieken je hebt gebruikt en hoe je de follow-up hebt georganiseerd. Dit toont je professionele handelen.",
          timestamp: "2024-10-20T15:04:00",
        },
      ],
      systemPrompt: `Je bent SkillVal AI: een Nederlandstalige coach gespecialiseerd in jeugdzorg EVC-trajecten.
Help kandidaten hun pedagogische vaardigheden en bewijslast te versterken. Focus op:
- Pedagogische begeleiding en groepsdynamiek
- Crisisinterventie en de-escalatie technieken
- Traumasensitief werken en veiligheid
- Samenwerking met gezinssysteem en professionals
- Ontwikkelingsgerichte zorg en toekomstperspectief
Geef praktische, pedagogische adviezen met concrete voorbeelden uit de jeugdzorg.`,
      quickActions: [
        {
          title: "Vraag om pedagogische feedback",
          text: "Kun je mijn begeleidingsaanpak beoordelen en tips geven voor verbetering?",
        },
        {
          title: "Vraag om crisisprotocol check",
          text: "Heb ik correct gehandeld volgens het crisisprotocol in deze situatie?",
        },
        {
          title: "Vraag om reflectie verdieping", 
          text: "Hoe kan ik mijn reflecties verrijken om beter mijn leerproces te tonen?",
        },
      ]
    };
  } else {
    // Default zorg domain
    return {
      initialMessages: [
        {
          id: "1",
          sender: "assessor" as const,
          content: "Hallo Ramin! Ik heb je laatste bewijsstuk over de crisissituatie gelezen. Kun je iets meer delen over hoe je het team hebt meegenomen in de nabespreking?",
          timestamp: "2024-10-20T14:30:00",
          avatar: "/mentor-support.jpg",
        },
        {
          id: "2",
          sender: "user" as const,
          content: "Hoi! Dank je wel voor de feedback. We hebben als team een casusbespreking gehouden waarin we de stappen hebben geëvalueerd en gekeken naar verbeterpunten voor de volgende interventie.",
          timestamp: "2024-10-20T15:02:00", 
          avatar: "/ramin.jpeg",
        },
        {
          id: "3",
          sender: "assistant" as const,
          content: "💡 Tip van SkillVal AI: Licht kort toe welke afspraken jullie concreet hebben gemaakt voor een volgende crisissituatie. Dat versterkt je reflectie en laat je leercyclus zien.",
          timestamp: "2024-10-20T15:04:00",
        },
      ],
      systemPrompt: `Je bent SkillVal AI: een Nederlandstalige coach die kandidaten helpt hun EVC-bewijslast te versterken.
Geef praktische, korte adviezen gericht op reflectie, vaardigheden en bewijslast. Focus op concrete tips.`,
      quickActions: [
        {
          title: "Vraag om verdiepende feedback",
          text: "Kun je aangeven welke professionaliseringspunten je ziet op basis van mijn bewijsstuk?",
        },
        {
          title: "Vraag om voorbeelden",
          text: "Welke concrete voorbeelden mag ik toevoegen om mijn reflectie te versterken?",
        },
        {
          title: "Vraag om check-in",
          text: "Wanneer past het om even te sparren over de voortgang en mijn volgende bewijzen?",
        },
      ]
    };
  }
};

export default function ChatPage() {
  const { domain } = useDomain();
  const domainData = getDomainData(domain);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const initialScrollDone = useRef(false);
  const { theme } = useTheme();
  const isSamen = theme === "samenai";

  // Initialize and update messages when domain changes
  useEffect(() => {
    const newDomainData = getDomainData(domain);
    setMessages(newDomainData.initialMessages);
    initialScrollDone.current = false;
  }, [domain]);

  useEffect(() => {
    const container = messagesEndRef.current;
    if (!container) return;

    if (!initialScrollDone.current) {
      container.scrollTop = 0;
      initialScrollDone.current = true;
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const buildHistoryForModel = (conversation: Message[]) => {
    const currentDomainData = getDomainData(domain);
    return [
      { role: "system" as const, content: currentDomainData.systemPrompt },
      ...conversation.map((message) => ({
        role: message.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: message.content,
      })),
    ];
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
      avatar: "/ramin.jpeg",
      status: "ready",
    };

    const pendingConversation = [...messages, userMessage];

    setMessages(pendingConversation);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: buildHistoryForModel(pendingConversation),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server gaf status ${response.status}`);
      }

      const data = (await response.json()) as { message?: string; error?: string };

      if (!data.message) {
        throw new Error(data.error ?? "Geen antwoord ontvangen van SkillVal AI.");
      }

      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        sender: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
        status: "ready",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: Message = {
        id: `${Date.now()}-error`,
        sender: "assistant",
        content:
          "Sorry, het lukte niet om een antwoord op te halen. Controleer je internetverbinding of probeer het later opnieuw.",
        timestamp: new Date().toISOString(),
        status: "error",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      console.error("Chat versturen mislukt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const renderAvatar = (message: Message) => {
    if (message.avatar) {
      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-skillval-ocean/20 shadow-md">
          <Image
            src={message.avatar}
            alt={message.sender}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      );
    }

    if (message.sender === "assistant") {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-skillval-ocean to-skillval-forest text-white shadow-md">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M12 5C9 5 7 7 7 10v2.3l-.8.8A1 1 0 007 15h10a1 1 0 00.7-1.7l-.7-.7V10c0-3-2-5-5-5z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 18a3 3 0 006 0" />
          </svg>
        </div>
      );
    }

    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-skillval-warm text-white font-bold shadow-md">
        {message.sender === "user" ? "RV" : "AS"}
      </div>
    );
  };

  return (
    <div className={clsx("space-y-10", isSamen && "chat-theme-samenai")}>
      {/* Intro */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div
          className={clsx(
            "glass-card flex items-center justify-between gap-6",
            isSamen && "chat-hero"
          )}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-skillval-ocean/60">SkillVal Coach</p>
            <h1 className="mt-3 text-3xl font-semibold text-skillval-ocean">
              Chat met je assessor én SkillVal AI
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-skillval-ocean/70">
              Combineer menselijke feedback met AI-coaching. Deel je bewijsstukken, ontvang tips en versterk je
              reflecties in één overzicht.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-skillval-ocean/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-skillval-forest text-white shadow-md">
                <span className="animate-pulse text-[10px] font-semibold">LIVE</span>
              </div>
              <span>Assessor en AI actief</span>
            </div>
          </div>
          <div className="hidden shrink-0 md:block">
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-skillval-ocean/30 ring-2 ring-white/60">
              <Image
                src="/students-working.jpg"
                alt="Samenwerken binnen SkillVal"
                width={240}
                height={220}
                className="h-44 w-60 object-cover"
              />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "relative h-64 overflow-hidden rounded-3xl shadow-xl shadow-skillval-ocean/30",
            isSamen && "chat-hero"
          )}
        >
          <Image
            src="/team-collaboration.jpg"
            alt="Team samenwerking"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-skillval-ocean/80 via-skillval-ocean/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-semibold">Portfolio sparren in realtime</h2>
            <p className="mt-2 text-sm text-white/80">
              Deel observaties, stel vragen en ontvang direct toepasbare tips voor je EVC-portfolio.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="glass-card flex h-[620px] w-full flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-skillval-ocean/10 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-skillval-ocean">Gesprek - {domain}</h2>
              <p className="text-xs text-skillval-ocean/60">
                Gedeelde geschiedenis: jouw berichten worden meegenomen door SkillVal AI (model 5).
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-skillval-forest">
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-skillval-forest" />
              Beschikbaar
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6" ref={messagesEndRef}>
            {messages.map((message) => {
              const isUser = message.sender === "user";
              const isAssistant = message.sender === "assistant";

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isUser ? "flex-row-reverse text-right" : "text-left"}`}
                >
                  {renderAvatar(message)}
                  <div className={`max-w-xl space-y-2 ${isUser ? "items-end" : ""}`}>
                <div
                  className={clsx(
                    "chat-bubble rounded-3xl border px-5 py-4 text-sm leading-relaxed shadow-md",
                    isUser && "bg-gradient-to-r from-skillval-warm to-skillval-bright text-white",
                    !isUser && !isAssistant && "bg-white border-skillval-gold/20 text-skillval-ocean",
                    isAssistant && "assistant",
                    isAssistant && message.status !== "error" && "bg-skillval-ocean/10 border-skillval-ocean/15 text-skillval-ocean",
                    isAssistant && message.status === "error" && "bg-skillval-warm/10 border-skillval-warm/40 text-skillval-warm"
                  )}
                >
                      <p>{message.content}</p>
                    </div>
                    <span className="block text-[11px] uppercase tracking-wide text-skillval-ocean/40">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading ? (
              <div className="flex gap-3">
                {renderAvatar({ id: "typing", sender: "assistant", content: "", timestamp: "", status: "ready" })}
                <div className="rounded-3xl border border-skillval-ocean/15 bg-white px-5 py-3 text-sm text-skillval-ocean">
                  <span className="flex items-center gap-2">
                    SkillVal AI denkt mee
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-skillval-ocean" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-skillval-ocean delay-150" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-skillval-ocean delay-300" />
                    </span>
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={clsx(
              "border-t border-skillval-ocean/10 px-6 py-4 backdrop-blur",
              isSamen ? "bg-[#0b2c38]/60 text-white" : "bg-white/70"
            )}
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Stel je vraag of deel een reflectie..."
                className={clsx(
                  "flex-1 rounded-2xl border px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2",
                  isSamen
                    ? "border-[#2DA3B5]/40 bg-[#092432]/80 text-white placeholder-white/60 focus:border-[#2DA3B5] focus:ring-[#2DA3B5]/40"
                    : "border-skillval-ocean/20 bg-white text-skillval-ocean placeholder-skillval-ocean/40 shadow-skillval-ocean/5 focus:border-skillval-warm focus:ring-skillval-warm/40"
                )}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-skillval-ocean to-skillval-warm px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-skillval-ocean/30 transition hover:from-skillval-warm hover:to-skillval-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12l14-7-7 14-2-5-5-2z" />
                </svg>
                Verstuur
              </button>
            </div>
            <p className="mt-2 text-[11px] text-skillval-ocean/50">
              SkillVal AI gebruikt model 5 voor contextuele reflectie. Je data wordt niet opgeslagen buiten dit
              gesprek.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card overflow-hidden">
          <h3 className="text-lg font-semibold text-skillval-ocean">Spreek je begeleiders</h3>
          <p className="mt-2 text-sm text-skillval-ocean/70">
            Handige templates voor feedback, afspraken of reflecties. Klik om ze direct naar de chat te kopiëren.
          </p>
          <div className="mt-4 grid gap-3">
            {domainData.quickActions.map((item) => (
              <button
                key={item.title}
                onClick={() => setInputValue(item.text)}
                className="rounded-2xl border border-skillval-ocean/15 bg-white px-4 py-3 text-left text-sm text-skillval-ocean transition hover:border-skillval-warm/40 hover:bg-skillval-warm/10"
              >
                <span className="block font-medium text-skillval-ocean">{item.title}</span>
                <span className="mt-1 block text-xs text-skillval-ocean/60">{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-lg font-semibold text-skillval-ocean">Snelle acties</h3>
          <div className="mt-4 grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-skillval-ocean/10 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skillval-warm/10 text-skillval-warm">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M9 12h6m3 8H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-skillval-ocean">Upload nieuw bewijs</p>
                <p className="text-xs text-skillval-ocean/60">Koppel direct documentatie aan je gesprek</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-skillval-ocean/10 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skillval-forest/10 text-skillval-forest">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M16 17v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2M16 17H8a2 2 0 01-2-2V5a2 2 0 012-2h8l4 4v8a2 2 0 01-2 2zm-6-5h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-skillval-ocean">Plan een check-in</p>
                <p className="text-xs text-skillval-ocean/60">Verstuur direct een voorstel</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-skillval-ocean/10 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skillval-ocean/10 text-skillval-ocean">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M11 3a1 1 0 011 1v7.382l2.447 2.447a1 1 0 01-1.414 1.414l-3-3A1 1 0 0110 11V4a1 1 0 011-1z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 21h14" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-skillval-ocean">Bekijk tips</p>
                <p className="text-xs text-skillval-ocean/60">Leer van eerdere trajecten</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
