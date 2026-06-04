# CLAUDE.md — ORTHONOBA.APP
**Última actualización:** 2026-06-04 · Versión 4.0 (Post Security Hardening + Enterprise Architecture)
**Score global:** 67/100 → **82/100** (tras Fases A–H) → **85/100** objetivo completo

---

## IDENTIDAD DEL PROYECTO

**Orthonoba.app** — AI Business Operating System multi-tenant SaaS B2B.  
Combina agentes IA conversacionales, CRM, automatización de workflows, facturación por suscripción y vertical dental.  
Audiencia: Agencias digitales, clínicas dentales, despachos legales, hospitality, real estate, financial services.

---

## STACK TECNOLÓGICO INSTALADO

| Paquete | Versión | Uso |
|---------|---------|-----|
| `next` | 16.2.4 | Framework — App Router, RSC, Route Handlers |
| `react` + `react-dom` | 19.2.5 | UI rendering |
| `typescript` | 6.0.3 | Tipado estricto |
| `tailwindcss` | 4.3.0 | Estilos — `@theme {}` en globals.css |
| `@prisma/client` + `prisma` | 5.22.0 | ORM — schema.prisma (665 líneas) |
| `stripe` | 22.2.0 | Pagos — API version 2026-05-27.dahlia |
| `@stripe/stripe-js` | 9.7.0 | Stripe frontend |
| `next-intl` | 4.13.0 | i18n — it(default)/de/fr/en |
| `jose` | 6.2.3 | JWT — Edge Runtime compatible |
| `bcrypt` | 6.0.0 | Hash passwords (10 rounds) |
| `zod` | 4.4.3 | Validación de schemas — **instalado Fase A** |
| `@anthropic-ai/sdk` | 0.100.1 | Claude API — **instalado Fase A** |
| `shadcn` + `radix-ui` | 4.10.0 + 1.4.3 | Componentes UI |
| `lucide-react` | 1.17.0 | Iconos |
| `recharts` | 3.8.1 | Gráficas analytics |
| `react-hook-form` | 7.77.0 | Formularios |
| `zustand` | 5.0.14 | Estado global cliente |
| `tw-animate-css` | 1.4.0 | Animaciones CSS |
| `vitest` | 4.1.8 | Testing — **instalado Fase E** |

### A eliminar (código muerto confirmado)
```bash
npm uninstall jsonwebtoken @types/jsonwebtoken  # jose lo reemplaza
npm uninstall autoprefixer                       # incluido en Tailwind v4
```

---

## ARQUITECTURA DEL PROYECTO

### Routing (Next.js App Router)
```
app/
├── (auth)/           → Login, Register, Forgot Password (SIN locale, públicas)
├── [locale]/         → Sitio marketing multi-idioma (it/de/fr/en)
│   └── layout.tsx    → Header + Footer + NextIntlClientProvider
├── dashboard/        → Plataforma privada (protegida por middleware.ts)
│   └── layout.tsx    → DashboardSidebar + DashboardTopbar
├── api/              → Route Handlers (Node.js runtime)
└── layout.tsx        → Root layout minimal
```

### Capa de servicios
```
services/
├── auth.ts        → register, login — prisma + bcrypt + jose
├── billing.ts     → Stripe checkout, portal, webhooks, plan sync
├── agents.ts      → CRUD AIAgents, prompts por tipo, 8 tipos
└── whatsapp.ts    → webhook Meta, crear contacts/conversations/leads
```

### Utilidades
```
lib/
├── auth-helpers.ts  → signToken, verifyToken, getAuthContext, requireRole
│                      JWT payload: { userId, orgId, role, email, name } · exp: 7d
├── auth-edge.ts     → Edge-compatible auth (usado en middleware)
├── prisma.ts        → Singleton PrismaClient (global.__prisma)
├── stripe.ts        → Stripe singleton lazy + PLAN_LIMITS + PLAN_PRICES
├── db.ts            → Pool pg raw (max 5, serverless-optimized)
├── env.ts           → Validación runtime de vars requeridas
├── utils.ts         → cn() = twMerge(clsx())
├── validations.ts   → [NUEVO F.A] Zod schemas: auth, agents, contacts, leads, WA
├── rate-limit.ts    → [NUEVO F.A] Rate limiter in-memory: authLimiter (5/15min)
└── logger.ts        → [NUEVO F.D] Logging estructurado: JSON prod, pretty dev
```

---

## ESTRUCTURA DE CARPETAS COMPLETA

```
orthonoba-app/
├── app/                   Rutas Next.js
├── components/
│   ├── ui/                Button(CVA), Input, Card, Badge, Skeleton, dialog, tabs...
│   ├── layout/            Header (mega-menus), Footer, MegaMenu
│   ├── sections/          20 secciones marketing (Hero, CTA, Services, Pricing...)
│   └── dashboard/         DashboardSidebar (240px), DashboardTopbar (56px), PageHeader
├── lib/                   (ver Utilidades)
├── services/              (ver Capa de servicios)
├── types/
│   ├── index.ts           292 líneas — Auth, Org, RBAC, AI, CRM, Billing, Automation
│   └── user.ts
├── prisma/
│   ├── schema.prisma      665 líneas — Multi-tenant + vertical dental
│   └── migrations/
├── src/
│   ├── i18n/              config.ts, routing.ts, request.ts
│   └── locales/           it/, de/, fr/, en/ common.json
├── styles/
│   ├── tokens.css         --orthonoba-* / --color-* variables (fuente de verdad)
│   ├── colors.css         estados interactivos
│   ├── typography.css     escala tipográfica
│   └── spacing.css        containers y gaps
├── test/
│   ├── setup.ts           Mocks globales (Prisma, Stripe, env)
│   └── lib/               validations.test.ts, rate-limit.test.ts
├── docs/                  Documentación técnica completa
├── middleware.ts           [NUEVO F.A] Edge JWT auth guard
├── vitest.config.ts        [NUEVO F.E] Testing config
├── next.config.ts          [ACTUALIZADO F.A] Security headers + CSP + ESM export
├── components.json         shadcn config
└── declarations.d.ts       Tipos STL, OBJ, Three.js loaders
```

---

## SEGURIDAD — ESTADO POST FASE A

| Control | Implementado | Archivo |
|---------|-------------|---------|
| JWT en httpOnly cookie | ✅ | `api/auth/login/route.ts` |
| Token FUERA de localStorage | ✅ **CORREGIDO** | `app/(auth)/login/page.tsx` |
| Middleware de protección de rutas | ✅ **NUEVO** | `middleware.ts` |
| Security Headers (CSP, HSTS, etc.) | ✅ **NUEVO** | `next.config.ts` |
| Rate Limiting auth (5/15min) | ✅ **NUEVO** | `lib/rate-limit.ts` |
| Zod validation en login | ✅ **NUEVO** | `app/api/auth/login/route.ts` |
| Zod schemas completos | ✅ **NUEVO** | `lib/validations.ts` |
| bcrypt 10 rounds | ✅ existente | `services/auth.ts` |
| Stripe webhook HMAC | ✅ existente | `api/stripe/webhook/route.ts` |
| Stripe event idempotency | ✅ existente | `services/billing.ts` |
| Password min 12 chars + complejidad | ⏳ pendiente | `registerSchema` ya tiene reglas |
| Email verification | ⏳ pendiente | necesita Resend |
| Forgot-password | ⏳ pendiente | TODO activo |
| Audit logs activos | ⏳ pendiente | modelo existe |

---

## VARIABLES DE ENTORNO

```env
# ── DATABASE ──────────────────────────────────────────────────────────
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# ── AUTH ──────────────────────────────────────────────────────────────
JWT_SECRET="min-32-chars-aleatorio"

# ── STRIPE ────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."      ← FALTANTE
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PROFESSIONAL="price_..."
STRIPE_PRICE_BUSINESS="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# ── WHATSAPP ──────────────────────────────────────────────────────────
WHATSAPP_VERIFY_TOKEN="token-aleatorio"
WHATSAPP_ACCESS_TOKEN="EAAxxxxx"                       ← FALTANTE
WHATSAPP_PHONE_NUMBER_ID="123456"                      ← FALTANTE
WHATSAPP_BUSINESS_ACCOUNT_ID="654321"                  ← FALTANTE

# ── EMAIL (para forgot-password + verificación) ───────────────────────
RESEND_API_KEY="re_xxxxx"                              ← FALTANTE
RESEND_FROM_EMAIL="noreply@orthonoba.com"              ← FALTANTE

# ── APP ───────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="https://app.orthonoba.com"
NEXT_PUBLIC_APP_DOMAIN="orthonoba.com"

# ── AI ────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY="sk-ant-api03-..."
OPENAI_API_KEY="sk-proj-..."

# ── VOICE AI (Fase C) ─────────────────────────────────────────────────
# TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxx"
# TWILIO_AUTH_TOKEN="xxxxxxxxxxxx"
# TWILIO_PHONE_NUMBER="+1234567890"
# ELEVENLABS_API_KEY="xxxxxxxx"
```

---

## APIs EXISTENTES

### Autenticación
| Endpoint | Método | Descripción |
|---------|--------|-------------|
| `/api/auth/login` | POST | Login web — establece cookie `auth_token` |
| `/api/auth/register` | POST | Registro + crea org + cookie |
| `/api/v1/auth/login` | POST | Login API — devuelve token en JSON |
| `/api/v1/auth/forgot-password` | POST | TODO sin implementar |

### Plataforma
| Endpoint | Método | Descripción |
|---------|--------|-------------|
| `/api/agents` | GET/POST | CRUD agentes IA |
| `/api/organizations/current` | GET/PATCH | Org del usuario autenticado |
| `/api/onboarding/status` | GET | Estado del wizard (4 checks) |
| `/api/pacientes` | GET/POST | Vertical dental |
| `/api/health` | GET | **[NUEVO F.D]** Health check con DB ping |

### Pagos
| Endpoint | Método | Descripción |
|---------|--------|-------------|
| `/api/stripe/checkout` | POST | Crear checkout session |
| `/api/stripe/portal` | GET | Billing portal redirect |
| `/api/stripe/webhook` | POST | Eventos Stripe (HMAC verificado) |

### WhatsApp
| Endpoint | Método | Descripción |
|---------|--------|-------------|
| `/api/whatsapp/webhook` | GET/POST | Meta webhook |
| `/api/whatsapp/accounts` | GET/POST | Gestión de cuentas |

### Marketing / Público
| Endpoint | Método | Descripción |
|---------|--------|-------------|
| `/api/v1/contact` | POST | Formulario de contacto |
| `/api/v1/demo-request` | POST | Solicitud de demo |
| `/api/v1/courses` | GET/POST | Cursos (uso no claro) |

---

## FLUJO DE AUTENTICACIÓN (código real)

```
REGISTER:
  POST /api/auth/register
  → services/auth.ts → registerUser()
  → bcrypt.hash(password, 10)
  → prisma.$transaction([createUser, createOrg, createMember(OWNER)])
  → jose.SignJWT({ userId, orgId, role }) exp: 7d
  → Set-Cookie: auth_token (httpOnly, secure en prod, sameSite: lax)
  → Redirect /dashboard/onboarding

LOGIN (web):
  POST /api/auth/login
  → authLimiter(ip) → 429 si excede 5/15min (NUEVO Fase A)
  → loginSchema.safeParse(body) → 400 si inválido (NUEVO Fase A)
  → services/auth.ts → login()
  → bcrypt.compare()
  → Set-Cookie: auth_token (httpOnly)

PROTECCIÓN DE RUTAS (NUEVO Fase A):
  middleware.ts → Edge Runtime
  → jwtVerify(cookie, JWT_SECRET)
  → Inject x-user-id, x-org-id, x-user-role en headers
  → Protege: /dashboard/*, /api/agents/*, /api/organizations/*, etc.
  → 401 en API, redirect a /login en páginas
```

---

## FLUJO STRIPE

```
PLANES: STARTER €97 | PROFESSIONAL €297 | BUSINESS €697 | ENTERPRISE custom
TRIAL: 14 días en todos los planes pagados

CHECKOUT:
  POST /api/stripe/checkout → services/billing.ts
  → Get/Create Stripe Customer
  → stripe.checkout.sessions.create({ trial_period_days: 14 })
  → Redirect a Stripe Hosted Page

WEBHOOK (idempotente):
  POST /api/stripe/webhook
  → stripe.webhooks.constructEvent() (HMAC)
  → Verify billingEvent not processed before
  → checkout.session.completed → Upsert Subscription + update org.planTier
  → subscription.* → sync status
  → invoice.* → create Invoice record

PORTAL:
  GET /api/stripe/portal
  → stripe.billingPortal.sessions.create()
  → Redirect
```

---

## FLUJO WHATSAPP

```
INBOUND:
  POST /api/whatsapp/webhook
  → Responde 200 inmediato
  → processWhatsAppWebhook(body) background
  → Upsert WhatsAppContact (by waId)
  → Find/Create WhatsAppConversation
  → Create WhatsAppMessage (INBOUND)
  → Create Lead automáticamente si es nuevo contacto

OUTBOUND (pendiente SDK):
  POST https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
  Headers: Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
```

---

## FLUJO VOICE AI (FASE C — PENDIENTE)

```
Deps: npm install twilio openai
Schema: agregar VoiceSession a prisma/schema.prisma

INBOUND CALL:
  Llamada → Twilio → POST /api/v1/voice/incoming
  → TwiML <Gather input="speech">
  → POST /api/v1/voice/gather
  → Anthropic Claude → respuesta
  → TwiML <Say> con texto
  → Guardar VoiceSession + transcript
```

---

## FLUJO MULTI-TENANT

```
Organization (tenant root)
├── planTier: FREE | STARTER | PROFESSIONAL | BUSINESS | ENTERPRISE
├── PLAN_LIMITS: maxAgents, maxConversations, maxContacts...
└── AuditLog, Workspace, OrganizationMember[]

RBAC: OWNER(100) > ADMIN(80) > MANAGER(60) > SALES(40) > SUPPORT(35)
      > OPERATOR(30) > MEMBER(20) > VIEWER(10)

AISLAMIENTO: Toda query Prisma incluye WHERE organizationId = auth.orgId
PENDIENTE: Feature flags activos, invitation system, RLS en Neon
```

---

## FLUJO DASHBOARD

| Módulo | Ruta | Estado |
|--------|------|--------|
| Overview | `/dashboard` | 🔴 Placeholders — conectar datos reales |
| Agents | `/dashboard/agents` | 🟡 API lista, UI placeholder |
| Analytics | `/dashboard/analytics` | 🔴 Placeholder |
| Billing | `/dashboard/billing` | 🟡 Stripe portal funciona |
| Contacts | `/dashboard/contacts` | 🔴 Placeholder |
| Conversations | `/dashboard/conversations` | 🔴 Placeholder |
| Leads | `/dashboard/leads` | 🔴 Placeholder |
| Voice | `/dashboard/voice` | 🔴 Fase C |
| WhatsApp | `/dashboard/whatsapp` | 🟡 Cuentas API funciona |
| Settings | `/dashboard/settings` | 🟡 PATCH org funciona |
| Onboarding | `/dashboard/onboarding` | ✅ Funcional (5 pasos) |

---

## FLUJO CRM

```
Contact: firstName, lastName, email, phone, company, country, orgId
Lead: title, status, value, contactId, assignedToId

Pipeline: NEW → CONTACTED → QUALIFIED → PROPOSAL → NEGOTIATION → WON|LOST

APIs pendientes: /api/contacts y /api/leads (schema existe, endpoints no)
```

---

## FLUJO BILLING

```
Subscription: stripeSubscriptionId, planTier, status, trial dates
Invoice: amount (céntimos), pdfUrl, status
BillingEvent: idempotencia webhooks
UsageRecord: tracking de uso por feature (pendiente activar)
```

---

## FLUJO ANALYTICS

```
Datos disponibles: Conversation.count, Lead.count, Contact.count, Subscription
Librería: recharts 3.8.1 instalado
Pendiente: conectar queries reales + Promise.all() para paralelizar
Cost tracking: ConversationMessage.cost (campo existe, pendiente poblar)
```

---

## FLUJO AUTOMATIONS

```
Automation → trigger (WEBHOOK|SCHEDULE|MANUAL|CONTACT_CREATED|...)
Workflow → WorkflowAction[] (ordenados por 'order')
WorkflowExecution → ExecutionLog[]

ActionTypes: SEND_MESSAGE|CREATE_CONTACT|UPDATE_LEAD|CALL_WEBHOOK|
             SEND_EMAIL|ASSIGN_AGENT|WAIT|CONDITION|LOOP

Estado: Schema completo, UI y API pendientes
```

---

## INTEGRACIONES EXTERNAS

| Integración | Estado | Config |
|-------------|--------|--------|
| Stripe | ✅ Funcional | Checkout, Portal, Webhooks, 5 planes |
| WhatsApp Cloud API | ⚠️ Parcial | Webhook OK, send pendiente (vars faltantes) |
| Anthropic Claude | ⚠️ SDK instalado, no conectado | `@anthropic-ai/sdk` v0.100.1 |
| OpenAI | ⚠️ No instalado | `OPENAI_API_KEY` en env.example |
| Twilio Voice | ⏳ Fase C | `npm install twilio` |
| ElevenLabs TTS | ⏳ Fase C | fetch directo, sin SDK |
| Resend Email | ⏳ Pendiente | `npm install resend` |
| Neon PostgreSQL | ✅ Funcional | Prisma + pool pg |

---

## DESIGN SYSTEM

```
Preset activo: Midnight Luxe (Dark Premium B2B)

Tokens principales:
  --color-obsidian   #050505  bg base
  --color-panel      #0E0E0E  cards, sidebar
  --color-panel-2    #161616  hover states
  --color-panel-3    #1E1E1E  bordes elevados
  --color-gold       #D4AF37  acento, CTAs
  --color-gold-light #F5C542  hover gold
  --color-silver     #A1A1AA  texto secundario
  --color-muted      #71717A  texto terciario

Arquitectura CSS:
  app/globals.css    @import tailwindcss + @theme {} + @keyframes
  styles/tokens.css  --orthonoba-* fuente de verdad
  styles/colors.css  estados interactivos
  styles/typography.css + spacing.css

REGLA: NUNCA gradientes múltiples · NUNCA datos inventados
POST-CAMBIO CSS: Remove-Item -Recurse -Force .next && npm run dev
```

---

## COMANDOS

```bash
npm run dev              # desarrollo local
npm run build            # producción (incluye prisma generate)
npm run type-check       # tsc --noEmit sin compilar
npm run lint             # ESLint
npm run test             # vitest en modo watch
npm run test:run         # vitest una vez
npm run test:coverage    # coverage con thresholds

# Prisma
npx prisma studio
npx prisma migrate dev --name <desc>   # desarrollo
npx prisma migrate deploy              # PRODUCCIÓN

# Limpiar caché (Windows)
Remove-Item -Recurse -Force .next
```

---

## CONVENCIONES

```
Arquitectura:  Componente → Route Handler → Service → Prisma
Validación:    Zod en todo endpoint que recibe datos externos (lib/validations.ts)
Auth:          JWT via jose · cookie httpOnly · middleware.ts en Edge
Queries:       SIEMPRE incluir organizationId en WHERE
Logging:       logger.ts (no console.log en producción)
TypeScript:    strict: true · no any · tipos en types/index.ts
```

---

## REGLAS INNEGOCIABLES

1. **NUNCA** token JWT en localStorage — solo cookie httpOnly
2. **NUNCA** `git push --force` a `main`
3. **NUNCA** `prisma migrate reset` en producción
4. **NUNCA** importar Prisma en componentes — usar `services/`
5. **NUNCA** Pages Router (`getServerSideProps`, `getStaticProps`)
6. **NUNCA** query sin `organizationId` en datos de tenant
7. **SIEMPRE** validar con Zod en endpoints externos
8. **SIEMPRE** `tsc --noEmit` + `npm run lint` antes de commit
9. **SIEMPRE** Prisma migration al tocar schema
10. Datos médicos: no loggear, no compartir sin consentimiento

---

## DOCUMENTACIÓN TÉCNICA

| Documento | Contenido |
|-----------|-----------|
| `docs/AUDIT_V2.md` | Auditoría completa + scores |
| `docs/SECURITY_CHECKLIST.md` | Controles de seguridad + estado |
| `docs/SECURITY_REPORT.md` | Vulnerabilidades + remediaciones |
| `docs/MULTITENANT_ENTERPRISE.md` | Arquitectura multi-tenant enterprise |
| `docs/VOICE_CENTER_ARCHITECTURE.md` | Voice AI + AI Center |
| `docs/PRODUCTION_READINESS.md` | Checklist producción + disaster recovery |
| `docs/TESTING_STRATEGY.md` | Estrategia de tests + roadmap coverage |
| `docs/TAILWIND_PLUS_MIGRATION_V2.md` | Plan migración dashboard UI |
| `docs/CRUIP_PRO_MIGRATION_V2.md` | Plan migración marketing pages |
| `docs/SAAS_ARCHITECTURE.md` | SaaS + multi-tenant completo |
| `docs/DEPENDENCIES_V2.md` | Estado de todas las dependencias |
| `docs/PERFORMANCE_REPORT.md` | Análisis de rendimiento |

---

## PROBLEMAS CONOCIDOS — PENDIENTES

| ID | Problema | Prioridad |
|----|----------|-----------|
| P1 | `ignoreBuildErrors` comentado — resolver errores TS | P0 |
| P2 | Dashboard con 100% placeholders | P0 |
| P3 | Forgot-password sin implementar | P1 |
| P4 | Email verification sin implementar | P1 |
| P5 | Feature flags no activos en endpoints | P1 |
| P6 | `@anthropic-ai/sdk` instalado pero no conectado | P1 |
| P7 | WHATSAPP_ACCESS_TOKEN + vars faltantes | P1 |
| P8 | NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY faltante | P1 |
| P9 | Audit logs modelo existe pero sin uso | P2 |
| P10 | RLS en Neon sin implementar | P2 |

---

## SCORE ACTUAL (post Fases A–H)

| Dimensión | Score |
|-----------|-------|
| Arquitectura | **86/100** ↑ |
| Seguridad | **78/100** ↑↑ |
| Escalabilidad | **83/100** ↑ |
| Rendimiento | **68/100** → |
| SaaS Readiness | **82/100** ↑ |
| Multi-Tenant | **80/100** ↑ |
| UI Readiness | **78/100** → |
| Production Readiness | **80/100** ↑↑ |
| **TOTAL** | **82/100** ↑↑ |
