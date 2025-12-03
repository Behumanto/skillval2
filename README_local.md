# SkillVal MVP – Lokale demo zonder Docker

Deze handleiding laat zien hoe je de FastAPI-backend en Next.js-frontend lokaal draait met een eigen Python virtual environment, Node.js dev server en een lokale MongoDB-instance. De setup is bedoeld voor demo’s van het EVC-proces (portfolio in jeugdzorg en praktijkobservaties in autotechniek) zonder cloudcomponenten.

## Projectstructuur
```
/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ core/config.py
│  │  ├─ db/mongo.py
│  │  ├─ models/
│  │  ├─ routers/
│  │  ├─ services/
│  │  └─ utils/
│  ├─ requirements.txt
│  └─ .env.example
├─ frontend/
│  ├─ app/
│  │  ├─ login/page.tsx
│  │  ├─ dashboard/candidate/page.tsx
│  │  ├─ dashboard/coach/page.tsx
│  │  ├─ dashboard/assessor/page.tsx
│  │  └─ assessment/[candidateId]/page.tsx
│  ├─ components/
│  ├─ lib/api.ts
│  ├─ lib/auth.ts
│  ├─ middleware.ts
│  ├─ package.json
│  └─ .env.local.example
├─ storage/               # lokale opslag voor geüploade bewijsbestanden
└─ README_local.md
```

## Backend Setup (FastAPI)
1. **Voorwaarden**: Python 3.11 of hoger en een lokale MongoDB (standaard poort 27017).
2. **Virtuele omgeving & dependencies**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate        # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env              # vul hier je echte API keys in (OpenAI/Deepgram)
   ```
3. **Configuratie**: `app/core/config.py` gebruikt Pydantic Settings om `.env` in te lezen. Bij `APP_ENV=local` worden de variabelen automatisch geladen.
4. **Backend starten**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
5. **Belangrijke endpoints**
   - `POST /auth/login` — accepteert email/wachtwoord en geeft een JWT (Bearer) terug met `{userId, role, tenantId}`.
   - `POST /candidates/{candidateId}/evidence` — multipart upload (tekst/foto/audio/video). Bestanden gaan naar `../storage/`, audio wordt via Deepgram getranscribeerd, tekst wordt via OpenAI geanalyseerd voor indicator-mapping, resultaat wordt opgeslagen in MongoDB.
   - `POST /assessments/{candidateId}/generate-report` — verzamelt bewijs & observaties en vraagt het AI-service om een concept assessor-rapport, dat als draft in MongoDB wordt bewaard.
   - `WS /ws/assessor/live/{candidateId}` — WebSocket voor live notities tijdens praktijkassessments; elke tekstblob komt terecht in de assessment-notes en audit trail.
6. **MongoDB draaien**
   - Standaard `MONGO_URI=mongodb://localhost:27017/skillval`.
   - macOS (Homebrew):
     ```bash
     brew services start mongodb-community
     ```
   - Windows/Linux: start de lokale MongoDB-service met het commando dat bij jouw installatie hoort.

## Frontend Setup (Next.js 14)
1. **Voorwaarden**: Node.js 18 of 20.
2. **Dependencies & env**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local   # stel NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 in
   npm run dev
   ```
3. **Belangrijkste routes**
   - `/login` — stuurt loginformulier naar `POST /auth/login` en zet de ontvangen token in `document.cookie` als `skillval_token`.
   - `/dashboard/candidate` — toont `ProgressCard` per deskundigheidsgebied met `indicatorCoverage` en een `AIChatPanel` dat portfolio-hulpvragen stelt.
   - `/dashboard/coach` — lijst van kandidaten met fraude-indicatoren en fasechips (`aanmelding`, `intake`, `portfolio`, `assessment`, `certificering`).
   - `/dashboard/assessor` — agenda “Vandaag te beoordelen” met knoppen om direct naar assessments te gaan.
   - `/assessment/[candidateId]` — mobile-first view voor assessoren: uploads (POST `/candidates/{id}/evidence`), live notities via WebSocket `/ws/assessor/live/{id}`, en een knop `Genereer concept rapport` (POST `/assessments/{id}/generate-report`) waarna de AI-concepttekst direct zichtbaar wordt.
4. **Routebescherming**
   - `middleware.ts` leest het `skillval_token` cookie, decodeert de JWT client-side om de rol te bepalen en redirect naar het juiste dashboard (`candidate`, `coach`, `assessor`).
   - Als `NEXT_PUBLIC_APP_ENV === 'local'` en er is geen token, gebruikt de middleware een fallback rol `candidate` zodat de UI toch te testen is zonder login.

## Test Data / Seed
Gebruik `mongosh` om testgebruikers en trajectdata in te voeren:
```javascript
use skillval

db.users.insertMany([
  {
    _id: "user-candidate-1",
    tenantId: "tenant-demo",
    email: "candidate@example.com",
    passwordHash: "<PLAINTEXT_FOR_NOW_or_bcrypt_later>",
    role: "candidate"
  },
  {
    _id: "user-assessor-1",
    tenantId: "tenant-demo",
    email: "assessor@example.com",
    passwordHash: "<PLAINTEXT_FOR_NOW_or_bcrypt_later>",
    role: "assessor"
  },
  {
    _id: "user-coach-1",
    tenantId: "tenant-demo",
    email: "coach@example.com",
    passwordHash: "<PLAINTEXT_FOR_NOW_or_bcrypt_later>",
    role: "coach"
  }
])

db.trajects.insertOne({
  _id: "traject-jeugdzorg-hbo-1",
  tenantId: "tenant-demo",
  name: "Jeugdzorg HBO / SKJ",
  domain: "jeugdzorg",
  deskundigheidsgebieden: [
    { id: "d1", name: "Ondersteunen bij regievoeren", indicators: [
      { id: "i1", label: "Regie stimuleren", description: "..." },
      { id: "i2", label: "Veiligheid monitoren", description: "..." }
    ]},
    { id: "d2", name: "Samenwerken met jeugdige en gezin", indicators: [
      { id: "i3", label: "Afstemmen met gezin", description: "..." }
    ]}
    // Voeg de overige deskundigheidsgebieden toe voor volledige dekking
  ]
})

db.candidates.insertOne({
  _id: "cand-1",
  tenantId: "tenant-demo",
  userId: "user-candidate-1",
  trajectId: "traject-jeugdzorg-hbo-1",
  indicatorCoverage: {},
  fraudFlags: [],
  statusPhase: "portfolio"
})
```

**Login testen**
- Kandidaat: `candidate@example.com` → dashboard `/dashboard/candidate`.
- Assessor: `assessor@example.com` → `/dashboard/assessor` → open `/assessment/cand-1` om upload & rapportgeneratie te proberen.
- Coach: `coach@example.com` → `/dashboard/coach` voor overzicht en fraude-alerts.

## Privacy / AVG waarschuwing
Alle data in deze demo is lokaal en dummy. In een productieomgeving (met echte jeugdzorgcasuïstiek) mogen kandidaten geen direct herleidbare cliëntnamen of BSN in vrije tekst opnemen. De UI toont daarom microcopy zoals “Verwijder persoonsgegevens van cliënten tenzij strikt noodzakelijk” om dit onder de aandacht te brengen — dit is een compliancevereiste, geen marketing.

## Verder naar productie
Deze MVP is klaar om later op Azure te landen (bijvoorbeeld FastAPI op Azure App Service en MongoDB Atlas of Azure Cosmos DB for Mongo API). Voor de lokale demo is dat niet nodig; alles draait volledig op je laptop.
