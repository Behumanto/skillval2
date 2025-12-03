# Azure OpenAI Vision Setup voor SkillVal Live Assessment

## Overzicht

Deze integratie voegt geavanceerde AI-gestuurde competentiebeoordeling toe aan de live assessment pagina, specifiek ontworpen voor autotechniek EVC-trajecten.

## Functionaliteit

### Azure OpenAI Vision Analyse
- **Real-time objectdetectie**: Herkent gereedschap, veiligheidsuitrusting en auto-onderdelen
- **Sub-stappen tracking**: Monitort specifieke handelingen per competentie
- **Automatische competentie updates**: AI evalueert voortgang en betrouwbaarheid
- **Veiligheidsmonitoring**: Detecteert veiligheidsinbreuken en genereert alerts

### Competentie Sub-stappen (Autotechniek EVC)

#### 1. Systematische diagnose
- ✅ OBD-scanner aangesloten en geactiveerd
- ✅ Foutcodes uitgelezen en geïnterpreteerd  
- ✅ Multimeter gebruikt voor spanningsmetingen
- ✅ Visuele inspectie uitgevoerd
- ✅ Systematische probleemanalyse toegepast
- ✅ Testresultaten gedocumenteerd

#### 2. Veiligheidsprotocol naleven
- ✅ Veiligheidsbril gedragen
- ✅ Werkhandschoenen gebruikt
- ✅ Voertuig veilig opgetild met hefbrug
- ✅ Assensteunen geplaatst
- ✅ Werkplek georganiseerd en opgeruimd
- ✅ Vloeistoffen opgevangen in juiste bakken

#### 3. Correct gereedschap gebruik
- ✅ Juiste maat gereedschap geselecteerd
- ✅ Momentsleutel correct ingesteld
- ✅ Gereedschap vakkundig gehanteerd
- ✅ Meetinstrumenten gekalibreerd
- ✅ Gereedschap na gebruik schoongemaakt

#### 4. Kwaliteitscontrole uitvoeren
- ✅ Visuele eindcontrole uitgevoerd
- ✅ Functietest gedaan
- ✅ Controle op lekkages
- ✅ Specificaties gecontroleerd
- ✅ Afwerking kwaliteit beoordeeld

#### 5. Documentatie bijhouden
- ✅ Werkzaamheden gedocumenteerd
- ✅ Bevindingen genoteerd
- ✅ Foto's van werk gemaakt
- ✅ Rapportage gereedgemaakt

#### 6. Communicatie met opdrachtgever
- ✅ Bevindingen toegelicht
- ✅ Advies gegeven
- ✅ Kosten en tijd geschat
- ✅ Vervolgstappen besproken

## Azure OpenAI Configuration

### 1. Maak Azure OpenAI Resource
```bash
# Login in Azure CLI
az login

# Maak resource group
az group create --name skillval-rg --location "West Europe"

# Maak Azure OpenAI resource
az cognitiveservices account create \
  --name skillval-openai \
  --resource-group skillval-rg \
  --location "West Europe" \
  --kind OpenAI \
  --sku s0
```

### 2. Deploy Vision Model
```bash
# Deploy GPT-4o Vision model
az cognitiveservices account deployment create \
  --resource-group skillval-rg \
  --name skillval-openai \
  --deployment-name gpt-4o-vision \
  --model-name gpt-4o \
  --model-version 2024-08-06 \
  --model-format OpenAI \
  --scale-settings-capacity 10
```

### 3. Environment Variables
Voeg toe aan `.env.local`:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://skillval-openai.openai.azure.com/
AZURE_OPENAI_API_KEY=your-azure-openai-key-here
AZURE_OPENAI_API_VERSION=2024-02-01
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-vision

# Fallback to regular OpenAI if needed
OPENAI_API_KEY=your-openai-key-here
```

### 4. Verkrijg API Keys
```bash
# Get Azure OpenAI keys
az cognitiveservices account keys list \
  --resource-group skillval-rg \
  --name skillval-openai
```

## API Endpoints

### Azure Vision Analysis
- **Endpoint**: `/api/live-assessment/azure-vision`
- **Method**: POST
- **Input**: FormData met image, timestamp, currentTask, candidateName
- **Output**: Gedetailleerde competentie analyse met sub-stappen

### Fallback Object Detection
- **Endpoint**: `/api/live-assessment/object-detection`
- **Method**: POST
- **Input**: FormData met image, timestamp, currentTask
- **Output**: Basis objectdetectie

## Gebruikersinstructies

### Voor Assessoren

1. **Start Assessment**
   - Zorg ervoor dat Azure Vision is ingeschakeld (blauwe toggle)
   - Start video opname tijdens praktijkobservatie
   - Monitor real-time detecties en alerts

2. **Sub-stappen Monitoren**
   - Klik op ▶ naast competenties om sub-stappen te tonen
   - Groen = gedetecteerd, Rood = kritiek gemist, Geel = belangrijk
   - Gebruik 👁️ Check knop voor handmatige verificatie

3. **Assessor Alerts**
   - Geel gebied toont kritieke veiligheidswaarschuwingen
   - Reageer direct op 🔴 VEILIGHEIDSALARM meldingen
   - Clear alerts na actie genomen

4. **Assessor Override**
   - Handmatig aan/uitvinken van competenties blijft mogelijk
   - Voeg eigen notities toe in tekstvelden
   - AI-detecties ondersteunen, vervangen niet uw expertise

### Live Assessment Features

- **Real-time Video Analysis**: 5-seconden intervals tijdens opname
- **Object Detection Display**: Live overlay op video feed
- **Speech Transcription**: Automatische spraakherkenning
- **Smart Alerts**: Proactieve waarschuwingen bij kritieke stappen
- **Evidence Capture**: Screenshots, video's, notities en vragen

## Troubleshooting

### Azure Vision Problemen
1. **API Key Errors**: Controleer environment variables
2. **Rate Limits**: Verhoog capacity in Azure portal
3. **Model Availability**: Controleer deployment status
4. **Fallback Mode**: Systeem valt terug op basis detectie

### Performance Optimalisatie
- Video analyse elke 5 seconden (instelbaar)
- Alleen tijdens actieve video opname
- Compressie van screenshots naar 80% JPEG
- Maximum 1200 tokens per analyse

### Monitoring
```bash
# Check Azure OpenAI metrics
az monitor metrics list \
  --resource /subscriptions/{subscription}/resourceGroups/skillval-rg/providers/Microsoft.CognitiveServices/accounts/skillval-openai \
  --metric "TotalCalls,TotalTokens"
```

## Security & Privacy

- Geen video's opgeslagen in cloud
- Alleen screenshots naar Azure OpenAI voor analyse
- GDPR-compliant processing
- Lokale audio transcriptie
- Assessor override mogelijkheden

## Kosten Schatting

Azure OpenAI GPT-4o Vision pricing (Europa West):
- Input tokens: €0,01 per 1K tokens
- Output tokens: €0,03 per 1K tokens
- Geschat: €0,10-0,30 per assessment (60 min)

## Support

Voor technische vragen:
1. Check Azure portal voor service status
2. Controleer API key permissions  
3. Monitor token usage en rate limits
4. Test met basis objectdetectie als fallback