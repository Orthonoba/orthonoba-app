# SAAS ARCHITECTURE — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Arquitecto:** Principal Software Architect · Claude Sonnet 4.6  
**Versión del sistema:** Phase 8.1

---

## VISIÓN GENERAL

Orthonoba.app es un **AI Business Operating System** multi-tenant SaaS. El sistema permite a organizaciones (tenants) desplegar agentes de IA conversacionales en múltiples canales (chat, voz, WhatsApp, email), gestionar un CRM, automatizar flujos de trabajo y facturar por suscripción.

---

## ARQUITECTURA MULTI-TENANT

### Modelo de Tenancy: **Shared Database, Shared Schema**

```
┌─────────────────────────────────────────────────────────┐
│                    NEON POSTGRESQL                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Org: Acme   │  │  Org: Beta   │  │  Org: Gamma  │  │
│  │  id: uuid-1  │  │  id: uuid-2  │  │  id: uuid-3  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│    orgId=1           orgId=2            orgId=3         │
│  (todos los datos aislados por organizationId)          │
└─────────────────────────────────────────────────────────┘
```

**Por qué este modelo:**
- ✅ Más económico (1 instancia de DB)
- ✅ Más fácil de operar
- ✅ Neon serverless escala automáticamente
- ⚠️ Requiere disciplina: CADA query debe incluir `organizationId`
- ⚠️ Sin RLS (Row Level Security) implementado aún — riesgo de data leak si query sin filtro

### Estructura de Tenant (del Schema Prisma)

```
Organization (tenant root)
├── id (uuid)
├── name, slug (único)
├── planTier: FREE | STARTER | PROFESSIONAL | BUSINESS | ENTERPRISE
├── stripeCustomerId
├── settings (Json) — industry, website, phone, locale, timezone
├── logoUrl
├── isActive, isSuspended
│
├── OrganizationMember[] ──→ User (RBAC)
├── Workspace[] ──→ WorkspaceMember[]
├── Subscription ──→ Stripe
├── AIAgent[]
├── Conversation[] ──→ ConversationMessage[]
├── Automation[] ──→ Workflow[] ──→ WorkflowAction[]
├── Contact[]
├── Lead[]
├── WhatsAppAccount[] ──→ WhatsAppConversation[] ──→ WhatsAppMessage[]
├── AuditLog[]
└── Paciente[] ──→ Caso[] ──→ Archivo[]  (vertical dental)
```

---

## RBAC (ROLE-BASED ACCESS CONTROL)

### Roles Disponibles (OrgRole enum)

```
OWNER      → Control total del tenant. Puede eliminar org, gestionar billing.
ADMIN      → Gestión completa excepto eliminar org. Acceso a billing.
MANAGER    → Gestión de equipo y operaciones. Sin billing.
SALES      → Acceso CRM, leads, contactos. Sin configuración.
SUPPORT    → Acceso conversaciones y contactos. Sin CRM completo.
OPERATOR   → Acceso operacional básico.
VIEWER     → Solo lectura en todas las secciones.
MEMBER     → Acceso básico definido por OWNER.
```

### Jerarquía de Roles (de auth-helpers.ts)
```ts
const ROLE_HIERARCHY: Record<OrgRole, number> = {
  OWNER:    100,
  ADMIN:     80,
  MANAGER:   60,
  SALES:     40,
  SUPPORT:   35,
  OPERATOR:  30,
  VIEWER:    10,
  MEMBER:    20,
}
```

### Implementación actual
```ts
// lib/auth-helpers.ts
export function requireRole(requiredRole: OrgRole, userRole: OrgRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Uso en route handlers:
const auth = await getAuthContext(token)
if (!requireRole('ADMIN', auth.role)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

## PLAN TIERS Y FEATURE FLAGS

### Planes Actuales (de lib/stripe.ts)

| Feature | FREE | STARTER €97/mo | PROFESSIONAL €297/mo | BUSINESS €697/mo | ENTERPRISE |
|---------|------|----------------|---------------------|------------------|------------|
| Agentes IA | 1 | 3 | 10 | 25 | Unlimited |
| Conversaciones/mes | 100 | 1,000 | 5,000 | 25,000 | Unlimited |
| Contactos | 500 | 5,000 | 25,000 | 100,000 | Unlimited |
| Automations | 1 | 5 | 25 | 100 | Unlimited |
| WhatsApp msgs/día | 10 | 500 | 2,500 | 10,000 | Unlimited |
| API Calls | 100 | 10,000 | 100,000 | 500,000 | Unlimited |
| Storage GB | 1 | 10 | 100 | 1,000 | Unlimited |
| Free Trial | — | 14 días | 14 días | 14 días | Custom |

### Feature Flags (pendiente implementar)
```ts
// PENDIENTE: lib/feature-flags.ts
export function canCreateAgent(org: Organization): boolean {
  const limits = PLAN_LIMITS[org.planTier]
  const agentCount = /* query count */
  return agentCount < limits.maxAgents
}

// Uso en API:
const canCreate = await canCreateAgent(org)
if (!canCreate) {
  return NextResponse.json({
    error: 'Plan limit reached',
    upgradeUrl: '/dashboard/billing'
  }, { status: 402 })
}
```

---

## FLUJOS DE DATOS PRINCIPALES

### Flujo de Registro + Onboarding
```
POST /api/auth/register
  ↓
services/auth.ts → registerUser()
  1. Validate input (TODO: zod schema)
  2. Check email unique
  3. bcrypt.hash(password, 10)
  4. prisma.$transaction([
       createUser(),
       createOrganization(slug),
       createOrganizationMember(OWNER role)
     ])
  5. signToken({ userId, orgId, role: 'OWNER' })
  6. Set-Cookie: auth-token (httpOnly)
  ↓
Redirect → /dashboard/onboarding
  ↓
Onboarding Wizard (5 steps):
  Step 1: /dashboard/onboarding/organization
          PATCH /api/organizations/current (industry, website)
  Step 2: /dashboard/onboarding/plan
          POST /api/stripe/checkout (seleccionar plan)
  Step 3: /dashboard/onboarding/agent
          POST /api/agents (crear primer agente)
  Step 4: /dashboard/onboarding/whatsapp
          POST /api/whatsapp/accounts (conectar WhatsApp)
  Step 5: /dashboard/onboarding/complete
          GET /api/onboarding/status → allDone: true
  ↓
Redirect → /dashboard
```

### Flujo de Conversación IA
```
Mensaje entrante (cualquier canal)
  ↓
Canal específico:
  Chat    → /api/v1/chat/message (por implementar)
  Voice   → /api/v1/voice/incoming (por implementar)
  WA      → POST /api/whatsapp/webhook
  Email   → /api/v1/email/receive (por implementar)
  ↓
services/whatsapp.ts → processWebhook()
  1. Parse mensaje
  2. Upsert WhatsAppContact (by waId/phone)
  3. Find/Create WhatsAppConversation
  4. Create WhatsAppMessage (INBOUND)
  5. Find AIAgent activo para el canal/org
  ↓
(PENDIENTE: llamada a Anthropic API)
  POST https://api.anthropic.com/v1/messages
  {
    model: agent.model,  // "claude-sonnet-4-6"
    system: agent.systemPrompt,
    messages: [histórico + nuevo mensaje]
  }
  ↓
Create WhatsAppMessage (OUTBOUND)
Enviar respuesta vía WhatsApp Cloud API
  POST https://graph.facebook.com/v19.0/{phoneNumberId}/messages
  Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
```

### Flujo de Billing Stripe
```
POST /api/stripe/checkout (autenticado)
  ↓
services/billing.ts → createCheckoutSession()
  1. Find org por orgId (del JWT)
  2. Get/Create Stripe Customer
  3. stripe.checkout.sessions.create({
       customer: stripeCustomerId,
       line_items: [{ price: STRIPE_PRICE_XXX }],
       mode: 'subscription',
       trial_period_days: 14,
       success_url, cancel_url
     })
  ↓
Redirect a Stripe Hosted Checkout
  ↓
Usuario completa pago
  ↓
Stripe → POST /api/stripe/webhook
  Event: checkout.session.completed
    ↓
  services/billing.ts → handleCheckoutCompleted()
    1. Verify event no procesado (billingEvent idempotency)
    2. Retrieve subscription from Stripe
    3. Upsert Subscription en DB
    4. Update Organization.planTier
    5. Mark billingEvent as processed
```

---

## ARQUITECTURA DE INTEGRACIONES EXTERNAS

### WhatsApp Cloud API
```
Meta Developer Account
  └── App (webhook configurado)
      └── WhatsApp Business Account
          └── Phone Number (WHATSAPP_PHONE_NUMBER_ID)
              ├── Webhook: GET /api/whatsapp/webhook (verificación)
              └── Webhook: POST /api/whatsapp/webhook (mensajes)

Outbound messages:
  POST https://graph.facebook.com/v19.0/{phoneNumberId}/messages
  Headers: Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
```

### Stripe
```
Stripe Dashboard
  ├── Products/Prices (4 planes → IDs en .env)
  ├── Webhooks → POST /api/stripe/webhook
  │   Events: checkout.session.completed
  │            customer.subscription.*
  │            invoice.payment_*
  └── Customer Portal → GET /api/stripe/portal
```

### Anthropic (Claude)
```
Estado actual: PENDIENTE SDK
  ↓
services/agents.ts define model: "claude-sonnet-4-6"
  ↓
FALTA: npm install @anthropic-ai/sdk
  ↓
Implementar en services/conversations.ts (por crear):
  import Anthropic from '@anthropic-ai/sdk'
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.create({
    model: agent.model,
    max_tokens: agent.maxTokens || 1024,
    system: agent.systemPrompt,
    messages: conversationHistory
  })
```

### Voice AI (Twilio — FASE 3)
```
PENDIENTE IMPLEMENTACIÓN:

Llamada entrante al número Twilio
  ↓
Twilio → POST /api/v1/voice/incoming (por crear)
  ↓
TwiML: <Say>, <Gather>, <Record>
  ↓
STT → Texto
  ↓
Anthropic API → Respuesta
  ↓
TTS → Audio
  ↓
TwiML response
```

---

## MULTI-TENANT: GAPS Y RECOMENDACIONES

### Gap 1: Row Level Security (RLS) no implementado
**Riesgo:** Una query Prisma sin `organizationId` filtraría datos de todos los tenants.

**Solución recomendada en Neon:**
```sql
-- Habilitar RLS en tablas críticas
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIAgent" ENABLE ROW LEVEL SECURITY;

-- Política: solo ver datos de la organización actual
CREATE POLICY tenant_isolation ON "Contact"
  USING ("organizationId" = current_setting('app.current_org_id')::uuid);

-- En cada query Prisma:
-- SET app.current_org_id = 'org-uuid-here'
```

### Gap 2: Invitation System
No hay sistema de invitación de miembros. El `OrganizationMember` existe en el schema pero no hay UI ni API para invitar usuarios.

**Pendiente implementar:**
- `POST /api/organizations/invite` — generar token de invitación
- Email de invitación via Resend
- `GET /api/organizations/invite/accept?token=xxx` — aceptar

### Gap 3: Workspace Management
El modelo `Workspace` existe pero no hay endpoints ni UI para gestionarlo.

### Gap 4: Feature Flags por Plan
Los límites del plan están definidos en `lib/stripe.ts` pero no se verifican en los endpoints. Un usuario FREE podría crear 100 agentes.

---

## ESCALABILIDAD

### Arquitectura actual (Phase 1-3)
```
[Internet] → [Vercel Edge Network] → [Next.js App] → [Neon PostgreSQL]
                                          ↓
                                   [Stripe API]
                                   [WhatsApp API]
                                   [Anthropic API]
```

### Arquitectura recomendada (Phase 4-5, Enterprise)
```
[Internet] → [Vercel Edge] → [Next.js App]
                                  ↓
                         [Upstash Redis]  ← Rate limiting, session cache
                         [Neon PostgreSQL] ← Datos principales
                         [Upstash Queue]   ← Background jobs (WhatsApp, emails)
                              ↓
                         [Stripe] [WhatsApp] [Anthropic] [Twilio]
```

### Puntos de escala a considerar

| Componente | Límite actual | Solución escalabilidad |
|------------|--------------|------------------------|
| DB connections | 5 (pool) | Neon serverless escala auto |
| WhatsApp processing | Síncrono en webhook | Mover a cola (Upstash) |
| AI inference | Sin timeout definido | Streaming responses + timeout |
| File storage | Neon (no optimizado para binarios) | AWS S3 / Cloudflare R2 |
| Rate limiting | Sin implementar | Upstash Redis + Edge middleware |

---

## SAAS READINESS CHECKLIST

### Completado ✅
- [x] Multi-tenant con Organization model
- [x] RBAC con 8 roles
- [x] 5 planes de precio (FREE → ENTERPRISE)
- [x] Stripe checkout y portal
- [x] Webhook Stripe con idempotencia
- [x] Trial period 14 días
- [x] Onboarding wizard 5 pasos
- [x] Multi-idioma (it/de/fr/en)
- [x] JWT authentication
- [x] Password hashing bcrypt

### Pendiente ⏳
- [ ] Middleware de protección de rutas
- [ ] Email verification post-registro
- [ ] Forgot password
- [ ] Feature flags por plan tier
- [ ] Invitation system
- [ ] Rate limiting
- [ ] RLS en PostgreSQL
- [ ] Workspace management
- [ ] Dashboard con datos reales
- [ ] Audit log activo (modelo existe, no se usa)
- [ ] Usage tracking real (UsageRecord modelo existe)
- [ ] Tests automatizados
- [ ] Error monitoring (Sentry)
- [ ] Anthropic SDK instalado y funcional
