# Next.js Structuur

```
frontend/
├─ app/
│  ├─ layout.tsx (globale shell)
│  ├─ page.tsx (landing)
│  ├─ login/page.tsx (role chooser)
│  ├─ dashboard/
│  │  ├─ layout.tsx (shared dashboard chrome + RBAC copy)
│  │  ├─ candidate/page.tsx
│  │  ├─ coach/page.tsx
│  │  └─ assessor/page.tsx
│  ├─ about/page.tsx (architectuur highlight)
│  └─ components/
│     ├─ ProgressCard.tsx
│     ├─ AIChatPanel.tsx
│     ├─ FraudFlagList.tsx
│     └─ AssessmentCaptureView.tsx
├─ middleware.ts (route guards op basis van cookies/roles)
├─ globals.css + Tailwind tokens (glas UI)
└─ tailwind.config.ts (design tokens + brand gradient)
```

- Routebescherming: middleware leest `skillval.role` cookie en forceert rol-specifieke dashboards. Server Actions/API-routes (nog toe te voegen) valideren JWT server-side.
- Componentbibliotheek kan uitbreiden vanuit `app/components` met varianten via `class-variance-authority`.
- AI chat panel is client component met Framer Motion; dashboards zijn server components zodat data-fetch via `fetch`/`server actions` kan gebeuren.
