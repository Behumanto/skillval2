# SkillVal Technical Blueprint

## 1. Component Overview
SkillVal gebruikt een modulaire service-architectuur bestaande uit vijf hoofdblokken:

- **Frontend (Next.js App Router)**: levert role-based dashboards, portfoliobeheer, assessor capture flows en AI-interactiepanels. Communiceert met de backend via REST/WebSocket en verwerkt uploads via pre-signed URLs.
- **Backend API (FastAPI)**: beheert authenticatie, RBAC, procesfases, AI-orkestratie en rapportage. Biedt REST- en WebSocket-endpoints en logt elke mutatie via de auditservice.
- **AI Service Layer**: adapterlaag voor STT, LLM-analyse, follow-up prompts en fraudechecks. Providers kunnen via `.env` worden gewisseld (default: OpenAI Whisper + GPT-4o-stijl model).
- **Data & Storage**:
  - MongoDB Atlas (of lokale Mongo): primaire datastore voor tenants, users, candidates, trajecten, auditlogs, indicatorcoverages.
  - Atlas Vector Search (aanbevolen) voor embedding queries zonder extra beheer.
  - Azure Blob Storage (lokaal gesimuleerd met MinIO) voor media en rapporten; metadata, hashes en indicatorlinks leven in Mongo.
- **Observability & Security**: JWT-auth, RBAC middleware, audit logging, Application Insights (Azure) + Mongo audit collectie; secrets via `.env`.

Lokaal draait alles binnen `docker-compose` (frontend, backend, mongodb, minio). In Azure verschuiven frontend/backends naar App Service/Static Web Apps, Mongo naar Atlas (Azure-regio) en Blob Storage naar native Azure Storage.

## 2. Procesflow Alignment
1. **Lead & Intake**: Admin registreert lead → traject record (`status: pre-intake`). Intake-audio via STT → transcript + AI-mapping naar indicatoren.
2. **Portfoliofase**: Kandidaat uploadt bewijsmateriaal (`evidenceItems`) vanuit dashboard, AI koppelt indicatoren en detecteert fraude. Begeleider volgt via monitoring dashboard.
3. **Assessment**: Assessor start live sessie (WebSocket) → uploads (audio/foto/video) → AI concept-rapport per indicator.
4. **Certificering**: Rapportservice bundelt portfolio + assessment resultaten → JSON + PDF in Blob Storage → status `certified`.

Elke fase-update triggert `auditLogs` en per-tenant data-isolatie houdt EVC-aanbieders gescheiden.

## 3. Azure Deployment Ready
- **Backend**: Containerized FastAPI naar Azure App Service / Container Apps. Secrets via Azure Key Vault, logging naar Application Insights + Mongo audit.
- **Frontend**: Next.js naar Azure Static Web Apps (met SSR) of Vercel; kiest afhankelijk van time-to-market. Deploy pipeline leest `.env.production`.
- **Data**: MongoDB Atlas (Azure region). Atlas Vector Search elimineert aparte vector store voor MVP. Azure Blob voor media en rapport PDFs.
- **AI Providers**: Default OpenAI (Whisper + GPT-4o). Later vervangbaar door Azure OpenAI of on-prem adapters via provider factories.

## 4. Security & Compliance
- Tenant ID in alle kerncollecties.
- RBAC op backend routes + Next.js route guards.
- Audit logging (`auditLogs`) met actor, actie, AI-assist flags.
- Encryptie-at-rest door Mongo Atlas + Blob Storage. TLS enforced (HTTPS/SSL).
- AVG-proof: minimale data, expliciete user consent, waarschuwingen bij uploads en logging van alle views/downloads.
