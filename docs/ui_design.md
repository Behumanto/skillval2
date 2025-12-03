# SkillVal UI Design Language

- **Kleurpalet**: Nachtblauw (#0F172A) als basis, Sky-lichtblauw (#38BDF8) voor primair accent, Coral (#F9738A) en Emerald (#34D399) voor positieve status, Amber (#FBBF24) voor waarschuwingen, Rose (#F87171) voor kritieke signalen. Achtergrondkleur SkillVal Sand (#F8FAFC) met glasachtige kaarten.
- **Radiussen**: Primair 24px (cards) en 32px (hero). Buttons en pills krijgen 9999px (volledige afronding) voor zachte uitstraling.
- **Spacing**: 8px grid, kaarten gebruiken 24px padding, dashboards 48px top/bottom spacing voor lucht.
- **Schaduwen**: Subtiele glow `0 20px 45px -20px rgba(56, 189, 248, 0.45)` voor primaire call-to-actions; standaard kaarten `0 18px 40px -22px rgba(15, 23, 42, 0.35)`.
- **Typografie**: Inter als default, 700 gewicht voor headings, 500 voor CTA's, 400 voor body.
- **Micro-animaties**: Framer Motion voor chatbubbels (fade/slide 0.25s), buttons hebben hover-lift (-2px) en glow intensivering.
- **Progress Cards**: Glasachtige container, border-left in statuskleur, coverage in grote cijfers, status pills met zachte achtergrond.
- **AI Chat Paneel**: Sticky op candidate dashboard, gradient-card met 24px radius, live status pill, transparantie dat AI-hulp inzichtelijk is.
- **Fraudeflagging**: Warm-rode badges met 70% dekking, duidelijke microcopy "AI-signaal, verifieer met kandidaat".
- **Uploads**: Drag-and-drop tegels met dashed border en iconografie; bij hover accentkleur.
- **Privacy microcopy**: Tooltip/inline tekst "Verwijder persoonsgegevens van cliënten tenzij strikt noodzakelijk" bij elk uploadpad.
