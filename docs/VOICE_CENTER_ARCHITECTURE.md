# VOICE & AI CENTER ARCHITECTURE — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase C**

---

## VISIÓN GENERAL

El Voice & AI Center es el núcleo conversacional de Orthonoba. Unifica:
- **Voice AI:** Llamadas telefónicas con agentes IA (Twilio + Claude/OpenAI)
- **AI Center:** Gestión centralizada de agentes, conversaciones, sesiones y costes
- **Multi-canal:** WhatsApp, Chat web, Email, Voz — mismo agente en todos los canales

---

## STACK TECNOLÓGICO REQUERIDO

| Tecnología | Propósito | Estado |
|-----------|-----------|--------|
| `@anthropic-ai/sdk` | LLM principal (Claude) | ✅ **Instalado en Fase A** |
| `openai` | LLM alternativo (GPT-4o) | ⏳ Instalar cuando se use |
| `twilio` | Voz telefónica + SMS | ⏳ Instalar Fase C |
| ElevenLabs API | TTS premium (voz realista) | ⏳ Vía fetch directo |
| WhatsApp Cloud API | Mensajería WhatsApp | ✅ Parcialmente implementado |

```bash
# Instalar en Fase C:
npm install twilio openai
npm install --save-dev @types/twilio
```

---

## VOICE CENTER — ARQUITECTURA COMPLETA

### Flujo de llamada entrante

```
[Llamada telefónica al número Twilio]
        ↓
[Twilio webhook → POST /api/v1/voice/incoming]
        ↓
[TwiML: <Gather input="speech" ...>]
        ↓
[Usuario habla → Twilio STT → texto]
        ↓
[POST /api/v1/voice/gather → procesar input]
        ↓
[Buscar AIAgent tipo VOICE para la org]
        ↓
[Construir mensaje con historial de la llamada]
        ↓
[Anthropic Claude API → respuesta en texto]
        ↓
[TwiML <Say> con texto de respuesta o <Play> con audio ElevenLabs]
        ↓
[Continuar con <Gather> para siguiente turno]
        ↓
[Finalizar: guardar VoiceSession + llamar status callback]
```

### Flujo de llamada saliente (outbound)

```
[Dashboard: OWNER/ADMIN inicia llamada]
        ↓
[POST /api/v1/voice/outbound]
        ↓
[client.calls.create({ to: phone, from: twilioNumber, url: twimlUrl })]
        ↓
[Twilio conecta la llamada]
        ↓
[Mismo flujo que entrante desde TwiML]
```

---

## ENDPOINTS DE VOZ A CREAR

```
app/api/v1/voice/
├── incoming/route.ts         GET/POST — webhook Twilio (llamada entrante)
├── gather/route.ts           POST — procesar input de voz del usuario
├── outbound/route.ts         POST — iniciar llamada saliente
├── status/route.ts           POST — callback de estado de llamada
└── sessions/route.ts         GET — listar sesiones de voz

app/api/v1/voice/sessions/
└── [id]/route.ts             GET — detalle de sesión con transcripción
```

### `app/api/v1/voice/incoming/route.ts` — esquema

```ts
import twilio from 'twilio'
const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(req: Request) {
  // 1. Verificar firma Twilio (seguridad)
  // const signature = req.headers.get('x-twilio-signature')
  // twilio.validateRequest(TWILIO_AUTH_TOKEN, signature, url, params)

  const twiml = new VoiceResponse()
  const gather = twiml.gather({
    input: ['speech'],
    language: 'es-ES',
    speechTimeout: 'auto',
    action: '/api/v1/voice/gather',
    method: 'POST',
  })

  gather.say({
    voice: 'Polly.Conchita',
    language: 'es-ES',
  }, 'Hola, soy el asistente de Orthonoba. ¿En qué puedo ayudarte?')

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
```

### `app/api/v1/voice/gather/route.ts` — esquema

```ts
export async function POST(req: Request) {
  const body = await req.formData()
  const speechResult = body.get('SpeechResult') as string
  const callSid = body.get('CallSid') as string

  // Buscar agente activo tipo VOICE para la org
  // Obtener historial de la sesión (por callSid)
  // Llamar a Anthropic Claude
  // Generar TwiML con respuesta

  const twiml = new VoiceResponse()
  const gather = twiml.gather({ input: ['speech'], action: '/api/v1/voice/gather' })
  gather.say({ voice: 'Polly.Conchita' }, aiResponse)

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
```

---

## AI CENTER — ARQUITECTURA

### Modelo de datos existente (Prisma — ya implementado)

```prisma
AIAgent {
  id, name, type (CHAT|WHATSAPP|VOICE|...)
  model          // "claude-sonnet-4-6" | "gpt-4o" | ...
  systemPrompt   // instrucciones del agente
  temperature    // 0.0 - 2.0
  maxTokens
  channels       // array de canales activos
  isActive
  organizationId
}

Conversation {
  id, channel (CHAT|VOICE|WHATSAPP|EMAIL|SMS|PHONE)
  status (OPEN|PENDING|CLOSED|ESCALATED)
  agentId
  contactId
  organizationId
}

ConversationMessage {
  conversationId
  role (USER|ASSISTANT|SYSTEM)
  content
  tokens, cost    // para cost tracking
  model
}
```

### Servicio de conversación AI a crear

```ts
// services/conversations.ts (crear)
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function processMessage(params: {
  orgId: string
  agentId: string
  conversationId: string
  userMessage: string
  channel: 'CHAT' | 'WHATSAPP' | 'VOICE' | 'EMAIL'
}) {
  // 1. Obtener agente
  const agent = await prisma.aIAgent.findFirst({
    where: { id: params.agentId, organizationId: params.orgId }
  })

  // 2. Obtener historial (últimos 20 mensajes)
  const history = await prisma.conversationMessage.findMany({
    where: { conversationId: params.conversationId },
    orderBy: { createdAt: 'asc' },
    take: 20,
  })

  // 3. Llamar Claude
  const response = await anthropic.messages.create({
    model: agent.model,
    max_tokens: agent.maxTokens,
    system: agent.systemPrompt,
    messages: [
      ...history.map(m => ({ role: m.role.toLowerCase() as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: params.userMessage }
    ],
  })

  const assistantText = response.content[0].type === 'text' ? response.content[0].text : ''
  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  // 4. Calcular coste (Claude Sonnet 4.6: $3/MTok input, $15/MTok output)
  const cost = (inputTokens * 0.000003) + (outputTokens * 0.000015)

  // 5. Guardar mensajes (user + assistant)
  await prisma.conversationMessage.createMany({
    data: [
      { conversationId: params.conversationId, role: 'USER', content: params.userMessage, tokens: inputTokens, cost: 0, model: agent.model },
      { conversationId: params.conversationId, role: 'ASSISTANT', content: assistantText, tokens: outputTokens, cost, model: agent.model },
    ]
  })

  return { text: assistantText, cost, tokens: { input: inputTokens, output: outputTokens } }
}
```

---

## VOICE SESSIONS — MODELO DE DATOS

```prisma
// Agregar a schema.prisma en Fase C:
model VoiceSession {
  id             String   @id @default(cuid())
  callSid        String   @unique  // Twilio Call SID
  direction      String   // INBOUND | OUTBOUND
  from           String   // número origen
  to             String   // número destino
  status         String   // RINGING | IN_PROGRESS | COMPLETED | FAILED | NO_ANSWER
  duration       Int?     // segundos
  startedAt      DateTime @default(now())
  endedAt        DateTime?
  transcript     Json?    // array de turnos { role, text, timestamp }
  recordingUrl   String?
  agentId        String?
  organizationId String
  cost           Float    @default(0)

  organization   Organization @relation(fields: [organizationId], references: [id])
  agent          AIAgent?     @relation(fields: [agentId], references: [id])
}
```

---

## COST TRACKING

### Costes por proveedor (aproximados 2026)

| Modelo | Input ($/MTok) | Output ($/MTok) |
|--------|---------------|-----------------|
| claude-sonnet-4-6 | $3.00 | $15.00 |
| claude-haiku-4-5 | $0.25 | $1.25 |
| gpt-4o | $2.50 | $10.00 |
| gpt-4o-mini | $0.15 | $0.60 |

| Servicio | Coste |
|---------|-------|
| Twilio Voice (minuto) | $0.0085/min |
| Twilio SMS | $0.0079/msg |
| ElevenLabs TTS | $0.30/1K chars |
| WhatsApp Cloud API | Gratis hasta 1K conv/mes, luego $0.005–$0.09/conv |

### Dashboard de costes
```
/dashboard/analytics → tab "AI Costs"
  Mostrar:
  - Coste total del mes (por modelo)
  - Conversaciones por canal
  - Tokens consumidos por agente
  - Proyección mensual
  - Alert si > 80% del límite del plan
```

---

## USAGE ANALYTICS — KPIs DE VOZ E IA

```
Total Calls (mes)      → VoiceSession.count
Avg Call Duration      → VoiceSession.avg(duration)
Call Resolution Rate   → Conversaciones cerradas sin escalado
Total AI Messages      → ConversationMessage.count
Avg Response Time      → avg(createdAt delta)
Cost per Conversation  → sum(cost) / conversations
Top Performing Agent   → max resolution rate
CSAT Score             → si se implementa encuesta post-llamada
```

---

## ELEVENLABS TTS — INTEGRACIÓN

```ts
// lib/tts.ts (crear para Fase C)
export async function synthesizeSpeech(text: string, voiceId = 'EXAVITQu4vr4xnSDxMaL'): Promise<Buffer> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    }
  )
  return Buffer.from(await response.arrayBuffer())
}
```

---

## VARIABLES DE ENTORNO PARA VOICE & AI

```env
# Twilio
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxxxx"
TWILIO_PHONE_NUMBER="+1234567890"

# AI APIs (Anthropic ya en .env.example)
ANTHROPIC_API_KEY="sk-ant-..."     # ya existe
OPENAI_API_KEY="sk-proj-..."       # ya existe en .env.example

# ElevenLabs (opcional, TTS premium)
ELEVENLABS_API_KEY="xxxxxxxx"
ELEVENLABS_DEFAULT_VOICE_ID="EXAVITQu4vr4xnSDxMaL"
```

---

## ROADMAP FASE C (3 semanas)

```
Semana 1:
  [ ] npm install twilio openai
  [ ] Agregar VoiceSession a schema.prisma + migration
  [ ] Crear services/conversations.ts con Anthropic SDK
  [ ] POST /api/v1/voice/incoming (TwiML handler)
  [ ] POST /api/v1/voice/gather (STT → LLM → TTS)

Semana 2:
  [ ] POST /api/v1/voice/outbound (llamada saliente)
  [ ] POST /api/v1/voice/status (callback Twilio)
  [ ] VoiceSession tracking en DB
  [ ] Cost tracking en ConversationMessage
  [ ] Conectar WhatsApp webhook con processMessage()

Semana 3:
  [ ] Dashboard /voice con datos reales
  [ ] Analytics de llamadas (duración, coste, resolución)
  [ ] Cost tracking dashboard
  [ ] Test de integración end-to-end
```
