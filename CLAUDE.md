# CLAUDE.md — ORTHONOBA.APP SYSTEM
**Última actualización:** 2026-06-04  
**Versión:** 2.0 (Post-Auditoría Completa)

---

## IDENTIDAD DEL PROYECTO

**Orthonoba.app** es una plataforma AI Business Operating System multi-tenant SaaS. Combina:
- Agentes de IA conversacionales (chat, voz, WhatsApp, email)
- CRM con automatización de workflows
- Gestión multi-organización con RBAC
- Vertical especializado: clínicas dentales / laboratorios CAD/CAM
- Facturación por suscripción (Stripe) con 5 tiers

---

## STACK TECNOLÓGICO INSTALADO

| Tecnología             | Versión       | Uso                                       |
|------------------------|---------------|-------------------------------------------|
| Next.js                | 16.2.4        | Framework principal — App Router          |
| React                  | 19.2.5        | UI rendering                              |
| TypeScript             | 6.0.3         | Tipado estricto (`strict: true`)          |
| Tailwind CSS           | 4.3.0         | Estilos — Configuración vía `@theme {}`   |
| Prisma                 | 5.22.0        | ORM — Schema en `prisma/schema.prisma`    |
| Neon PostgreSQL        | serverless    | Base de datos principal                   |
| Stripe SDK             | 22.2.0        | Facturación y suscripciones               |
| @stripe/stripe-js      | 9.7.0         | Stripe frontend                           |
| next-intl              | 4.13.0        | Internacionalización (it/de/fr/en)        |
| jose                   | 6.2.3         | JWT — Edge compatible                     |
| bcrypt                 | 6.0.0         | Hash de contraseñas                       |
| shadcn/ui              | 4.10.0        | Componentes UI (Radix UI base)            |
| lucide-react           | 1.17.0        | Iconos                                    |
| recharts               | 3.8.1         | Gráficas y analytics                      |
| tw-animate-css         | 1.4.0         | Animaciones CSS adicionales               |
| class-variance-authority| 0.7.1        | Variantes de componentes                  |
| tailwind-merge         | 3.6.0         | Merge seguro de clases Tailwind           |

### Dependencias pendientes de instalar
| Paquete           | Motivo                                        |
|-------------------|-----------------------------------------------|
| `zod`             | Validación de schemas — mencionado en CLAUDE pero no instalado |
| `@anthropic-ai/sdk` | SDK oficial Claude — actualmente usa fetch directo |
| `twilio`          | Voice AI — cuando se implemente el módulo voz  |
| `three` + `@types/three` | Visor 3D STL/OBJ — declarado en declarations.d.ts |

---

## ARQUITECTURA COMPLETA

### Patrón General
```
Multi-tenant SaaS
├── Organization (tenant root)
│   ├── Workspace (sub-división de org)
│   ├── Users (con roles via OrganizationMember)
│   ├── Subscription (Stripe)
│   ├── AIAgents
│   ├── Conversations
│   ├── Contacts + Leads (CRM)
│   ├── Automations + Workflows
│   └── WhatsAppAccounts
└── Vertical: Dental
    ├── Paciente
    ├── Caso
    └── Archivo
```

### Routing Architecture (Next.js App Router)
```
app/
├── (auth)/                    ← Rutas auth SIN locale
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── [locale]/                  ← Sitio marketing MULTI-IDIOMA
│   ├── layout.tsx             ← Layout con Header+Footer
│   ├── page.tsx               ← Homepage
│   └── [27 rutas públicas]
├── dashboard/                 ← Plataforma privada SIN locale
│   ├── layout.tsx             ← Layout con DashboardSidebar
│   ├── page.tsx
│   └── [11 módulos]
├── api/                       ← Route Handlers
│   ├── auth/
│   ├── v1/auth/
│   ├── agents/
│   ├── stripe/
│   ├── whatsapp/
│   ├── organizations/
│   ├── onboarding/
│   └── pacientes/
└── sitemap.ts
```

---

## ESTRUCTURA DE CARPETAS

```
orthonoba-app/
├── app/                       Rutas Next.js (App Router)
├── components/
│   ├── ui/                    Componentes shadcn/Radix UI
│   ├── layout/                Header, Footer, MegaMenu
│   ├── sections/              Secciones marketing (Hero, CTA, etc.)
│   └── dashboard/             Componentes del panel privado
├── lib/
│   ├── auth-helpers.ts        JWT verification para Route Handlers
│   ├── auth-edge.ts           Auth para Edge middleware
│   ├── prisma.ts              Singleton del cliente Prisma
│   ├── stripe.ts              Inicialización Stripe
│   ├── db.ts                  Utilidades de base de datos
│   ├── env.ts                 Validación de variables de entorno
│   └── utils.ts               cn() y utilidades generales
├── services/
│   ├── auth.ts                Lógica login/register/JWT
│   ├── agents.ts              CRUD de agentes IA
│   ├── billing.ts             Stripe checkout/portal/webhooks
│   └── whatsapp.ts            WhatsApp Cloud API integration
├── types/
│   ├── index.ts               Tipos principales (292 líneas)
│   └── user.ts                Tipos de usuario
├── prisma/
│   ├── schema.prisma          Schema completo (665 líneas)
│   └── migrations/            Historial de migraciones
├── src/
│   ├── i18n/                  Configuración next-intl
│   │   ├── config.ts          locales: ['it','de','fr','en']
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   └── locales/               Traducciones JSON
│       ├── it/common.json     Italiano (default)
│       ├── de/common.json
│       ├── fr/common.json
│       └── en/common.json
├── styles/
│   ├── tokens.css             Variables CSS --orthonoba-*
│   ├── colors.css             Estados interactivos
│   ├── typography.css         Escala tipográfica
│   └── spacing.css            Espaciado y containers
├── public/                    Assets estáticos
├── hooks/                     React hooks personalizados
├── sql/                       Scripts SQL sueltos
├── docs/                      Documentación técnica
├── .taskmaster/               Task Master AI
├── .env.example               Plantilla de variables de entorno
├── components.json            Configuración shadcn/ui
├── next.config.ts             Configuración Next.js
├── tsconfig.json              TypeScript strict mode
├── postcss.config.js          Solo @tailwindcss/postcss
└── declarations.d.ts          Tipos para archivos 3D/imágenes
```

---

## VARIABLES DE ENTORNO REQUERIDAS

```env
# ── Database ──────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ── Auth ──────────────────────────────────────────────────────────────────
JWT_SECRET="min-32-chars-secret"

# ── Stripe ────────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."      ← FALTANTE - agregar
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PROFESSIONAL="price_..."
STRIPE_PRICE_BUSINESS="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# ── WhatsApp Cloud API ─────────────────────────────────────────────────────
WHATSAPP_VERIFY_TOKEN="random-token"
WHATSAPP_ACCESS_TOKEN="EAAxxxxx"                       ← FALTANTE - agregar
WHATSAPP_PHONE_NUMBER_ID="1234567890"                  ← FALTANTE - agregar
WHATSAPP_BUSINESS_ACCOUNT_ID="0987654321"              ← FALTANTE - agregar

# ── Email ─────────────────────────────────────────────────────────────────
RESEND_API_KEY="re_xxxxx"                              ← FALTANTE - agregar
RESEND_FROM_EMAIL="noreply@orthonoba.com"              ← FALTANTE - agregar

# ── App ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="https://app.orthonoba.com"
NEXT_PUBLIC_APP_DOMAIN="orthonoba.com"

# ── AI APIs ───────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY="sk-ant-api03-..."
OPENAI_API_KEY="sk-proj-..."                           ← Opcional

# ── Voice AI (cuando se implemente) ──────────────────────────────────────
# TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxx"
# TWILIO_AUTH_TOKEN="xxxxxxxxxxxx"
# TWILIO_PHONE_NUMBER="+1234567890"
```

---

## FLUJO DE AUTENTICACIÓN

### Stack Auth
- JWT almacenado en cookie `HttpOnly; Secure; SameSite=Strict`
- Hash de passwords con `bcrypt` (saltRounds: 10+)
- JWT generado/verificado con `jose` (Edge-compatible)
- Validación de requests en `lib/auth-helpers.ts`

### Flujo Register
```
1. POST /api/auth/register
   → Validar input (zod schema)
   → Verificar email único (Prisma)
   → Hash password con bcrypt
   → Crear User en DB
   → Crear Organization (tenant) automáticamente
   → Crear OrganizationMember con rol OWNER
   → Generar JWT con jose
   → Set-Cookie: auth-token (HttpOnly)
   → Redirect /dashboard/onboarding
```

### Flujo Login
```
1. POST /api/v1/auth/login (ruta preferida)
   → Validar input
   → Buscar User por email
   → Comparar password con bcrypt.compare()
   → Generar JWT (payload: userId, orgId, role)
   → Set-Cookie: auth-token (HttpOnly)
   → Redirect /dashboard
```

### Flujo Forgot Password
```
1. POST /api/v1/auth/forgot-password
   → Buscar email en DB
   → Generar token temporal (jose, expiración: 1h)
   → Enviar email con link (Resend)
   → Link: /reset-password?token=xxx
   (PENDIENTE: ruta reset-password no implementada)
```

### Protección de Rutas
```
PENDIENTE: Crear middleware.ts en raíz:
- Verificar cookie auth-token en /dashboard/*
- Redirigir a /login si no válido
- Usar lib/auth-edge.ts (Edge-compatible)
```

---

## FLUJO STRIPE

### Planes disponibles (PlanTier enum en Prisma)
```
FREE         → Sin pago
STARTER      → STRIPE_PRICE_STARTER
PROFESSIONAL → STRIPE_PRICE_PROFESSIONAL
BUSINESS     → STRIPE_PRICE_BUSINESS
ENTERPRISE   → STRIPE_PRICE_ENTERPRISE
```

### Flujo de Checkout
```
1. Usuario selecciona plan en /dashboard/billing
2. POST /api/stripe/checkout
   → Crear/recuperar Stripe Customer para la org
   → stripe.checkout.sessions.create()
   → Redirect a Stripe Hosted Page
3. Stripe redirige a success_url / cancel_url
4. Webhook /api/stripe/webhook procesa eventos:
   - checkout.session.completed → actualizar Subscription en DB
   - customer.subscription.updated → sync estado
   - customer.subscription.deleted → downgrade a FREE
   - invoice.payment_failed → notificar usuario
```

### Flujo Portal de Billing
```
1. GET /api/stripe/portal
   → stripe.billingPortal.sessions.create()
   → Redirect al portal de Stripe
   → Usuario puede cambiar plan/método de pago
```

### Modelos Prisma relacionados
- `Subscription` → estado, plan, stripe IDs
- `Invoice` → historial de facturas
- `BillingEvent` → log de eventos Stripe
- `UsageRecord` → métricas de uso por feature

---

## FLUJO WHATSAPP

### Arquitectura
```
Meta Business Platform
  ↓ webhook POST /api/whatsapp/webhook
  → Verificar WHATSAPP_VERIFY_TOKEN
  → Parsear mensaje entrante
  → Buscar WhatsAppContact en DB
  → Crear/actualizar WhatsAppConversation
  → Guardar WhatsAppMessage
  → Enviar a agente IA si aplica
  → Responder vía WhatsApp Cloud API (WHATSAPP_ACCESS_TOKEN)
```

### Modelos Prisma relacionados
```
WhatsAppAccount      → credenciales por organización
WhatsAppConversation → hilo de conversación
WhatsAppMessage      → mensajes individuales
WhatsAppContact      → contactos de WhatsApp
```

### Configuración Meta
1. Crear app en developers.facebook.com
2. Configurar webhook URL: `https://app.orthonoba.com/api/whatsapp/webhook`
3. Eventos suscritos: `messages`
4. Verify Token: `WHATSAPP_VERIFY_TOKEN`

---

## FLUJO VOICE AI

### Estado actual: PENDIENTE DE IMPLEMENTACIÓN

### Arquitectura planificada
```
Llamada entrante a número Twilio
  → Twilio webhook → /api/v1/voice/incoming (por crear)
  → Iniciar sesión de voz con agente IA
  → STT (Speech-to-Text): Twilio o OpenAI Whisper
  → LLM: Claude Sonnet via Anthropic API
  → TTS (Text-to-Speech): Twilio, ElevenLabs u OpenAI TTS
  → Responder en tiempo real con <TwiML>
```

### Dependencias necesarias
```bash
npm install twilio
npm install --save-dev @types/twilio
```

### Variables de entorno necesarias
```
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
```

### Módulo en dashboard
Ruta disponible: `/dashboard/voice`  
Agente tipo: `AgentType.VOICE` (definido en schema Prisma)

---

## FLUJO MULTI-TENANT

### Estructura de datos
```
Organization (tenant)
├── id, name, slug, plan, stripeCustomerId
├── OrganizationMember[] (users con roles)
├── Workspace[] (sub-divisiones)
├── AIAgent[]
├── Subscription
├── WhatsAppAccount[]
├── Contact[]
└── AuditLog[]
```

### Roles RBAC (OrgRole enum)
```
OWNER    → Control total
ADMIN    → Gestión sin billing
MANAGER  → Gestión de equipo
SALES    → Acceso CRM + leads
SUPPORT  → Acceso conversaciones
OPERATOR → Acceso operacional
VIEWER   → Solo lectura
MEMBER   → Acceso básico
```

### Aislamiento de datos
- Cada query Prisma DEBE incluir `organizationId` como filtro
- Nunca exponer datos cross-tenant
- El `orgId` se obtiene del JWT del usuario autenticado
- Pattern: `services/auth.ts` extrae org del token, pasa a services

---

## FLUJO DASHBOARD

### Módulos del Dashboard
| Ruta                        | Descripción                          |
|-----------------------------|--------------------------------------|
| `/dashboard`                | Overview: métricas, actividad reciente |
| `/dashboard/agents`         | CRUD de agentes IA                   |
| `/dashboard/conversations`  | Conversaciones multi-canal           |
| `/dashboard/contacts`       | CRM — base de contactos              |
| `/dashboard/leads`          | Pipeline de ventas                   |
| `/dashboard/automations`    | Workflows y automatizaciones         |
| `/dashboard/analytics`      | Métricas y reportes (Recharts)       |
| `/dashboard/billing`        | Suscripción y facturas               |
| `/dashboard/whatsapp`       | Gestión cuenta WhatsApp              |
| `/dashboard/voice`          | Agentes de voz (en desarrollo)       |
| `/dashboard/settings`       | Configuración de organización        |
| `/dashboard/onboarding`     | Wizard de activación (5 pasos)       |

### Layout del Dashboard
```tsx
// app/dashboard/layout.tsx
<DashboardLayout>
  <DashboardSidebar />  // nav lateral
  <DashboardTopbar />   // barra superior con org selector
  <main>{children}</main>
</DashboardLayout>
```

---

## FLUJO CRM

### Entidades
```
Contact
├── firstName, lastName, email, phone
├── company, jobTitle, country
├── organizationId (tenant)
└── leadId (si es lead cualificado)

Lead
├── title, description
├── status: NEW → CONTACTED → QUALIFIED → PROPOSAL → NEGOTIATION → WON/LOST
├── value, currency
├── contactId
└── assignedToId (User)
```

### Pipeline de Leads
```
NEW → CONTACTED → QUALIFIED → PROPOSAL → NEGOTIATION → [WON | LOST | CANCELLED]
```

### Módulos relacionados
- `/dashboard/contacts` → gestión de contactos
- `/dashboard/leads` → pipeline visual
- `/api/v1/demo-request` → captura leads desde web pública

---

## FLUJO BILLING

### Modelos de datos
```
Subscription
├── stripeSubscriptionId
├── stripePriceId
├── status: TRIAL → ACTIVE → PAST_DUE → CANCELLED → UNPAID
├── planTier: FREE / STARTER / PROFESSIONAL / BUSINESS / ENTERPRISE
├── currentPeriodStart / End
└── cancelAtPeriodEnd

Invoice
├── stripeInvoiceId
├── amount (en centavos)
├── currency
├── status: DRAFT → OPEN → PAID → VOID → UNCOLLECTIBLE
└── pdfUrl

UsageRecord
├── metric: AGENTS / CONVERSATIONS / MESSAGES / API_CALLS / STORAGE_GB / ...
├── quantity, periodStart, periodEnd
```

### Flujo de Webhook Stripe
```
POST /api/stripe/webhook
→ stripe.webhooks.constructEvent() (verificar firma)
→ Switch por event.type:
   checkout.session.completed
     → Upsert Subscription en DB
     → Update Organization.planTier
   customer.subscription.updated
     → Sync Subscription.status y planTier
   customer.subscription.deleted
     → Set planTier = FREE
     → Set subscription.status = CANCELLED
   invoice.paid
     → Create Invoice record
   invoice.payment_failed
     → Notificar al owner via email
```

---

## FLUJO AUTOMATIONS

### Arquitectura
```
Automation
├── trigger: WEBHOOK / SCHEDULE / MANUAL / CONTACT_CREATED / LEAD_UPDATED / MESSAGE_RECEIVED / ...
├── isActive: boolean
└── Workflow[]

Workflow
├── name, description
└── WorkflowAction[]

WorkflowAction
├── type: SEND_MESSAGE / CREATE_CONTACT / UPDATE_LEAD / CALL_WEBHOOK / SEND_EMAIL / ...
├── order (secuencia)
└── config (JSON con parámetros)

WorkflowExecution
├── status: PENDING / RUNNING / COMPLETED / FAILED
├── startedAt, completedAt
└── ExecutionLog[]
```

### Triggers disponibles
```
WEBHOOK          → HTTP webhook externo
SCHEDULE         → Cron-based (e.g., "0 9 * * 1" = lunes 9am)
MANUAL           → Activado por usuario
CONTACT_CREATED  → Nuevo contacto en CRM
LEAD_UPDATED     → Cambio de estado en lead
MESSAGE_RECEIVED → Nuevo mensaje en cualquier canal
FORM_SUBMITTED   → Form del sitio web
PAYMENT_SUCCESS  → Pago Stripe exitoso
```

---

## FLUJO AGENTS

### Tipos de Agentes (AgentType enum)
```
CHAT      → Chatbot web embebido
VOICE     → Agente de voz telefónico (Twilio)
WHATSAPP  → Agente WhatsApp Business
EMAIL     → Respuestas automáticas email
CRM       → Asistente CRM interno
SALES     → Calificación de leads
SUPPORT   → Atención al cliente
SCHEDULER → Gestión de citas
ANALYST   → Análisis de datos
CUSTOM    → Tipo personalizable
```

### Modelo de datos
```
AIAgent
├── name, description, type (AgentType)
├── systemPrompt (instrucciones del agente)
├── model (claude-sonnet-4-6, gpt-4o, etc.)
├── temperature (0.0 - 2.0)
├── maxTokens
├── channels: Channel[] (CHAT, VOICE, WHATSAPP, etc.)
├── isActive
└── organizationId
```

### Flujo de conversación
```
1. Mensaje entrante (cualquier canal)
2. Buscar AIAgent activo para ese canal + org
3. Recuperar historial de Conversation
4. Construir prompt: systemPrompt + history + nuevo mensaje
5. Llamar API (Anthropic/OpenAI)
6. Guardar ConversationMessage (USER + ASSISTANT roles)
7. Enviar respuesta al canal de origen
```

---

## FLUJO ANALYTICS

### Datos disponibles
```
UsageRecord → métricas de uso por org
Conversation → volumen de conversaciones
ConversationMessage → mensajes totales
Lead → pipeline y conversión
Contact → crecimiento base de contactos
BillingEvent → historial financiero
```

### Dashboard de Analytics (`/dashboard/analytics`)
- Gráficas con **Recharts 3.8.1**
- Datos servidos desde API Route con filtros de fecha
- Métricas clave: Conversations/day, Messages/day, Leads converted, Revenue MRR

---

## INTERNACIONALIZACIÓN (I18N)

### Configuración next-intl
```
Locales:    it (default), de, fr, en
Ruta base:  app/[locale]/
Config:     src/i18n/config.ts
Routing:    src/i18n/routing.ts
Mensajes:   src/locales/{locale}/common.json
```

### Uso en componentes
```tsx
// Server Component
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('HomePage')

// Client Component
import { useTranslations } from 'next-intl'
const t = useTranslations('Navigation')
```

---

## DESIGN SYSTEM ACTIVO

### Preset actual: MIDNIGHT LUXE (Dark Premium)
La paleta activa combina negro profundo + oro para una estética B2B enterprise de alto valor.

### Tokens de Color
| Clase Tailwind      | Variable CSS          | Valor     | Uso                      |
|---------------------|-----------------------|-----------|--------------------------|
| `bg-obsidian`       | `--color-obsidian`    | `#050505` | Fondo base de página     |
| `bg-panel`          | `--color-panel`       | `#0E0E0E` | Cards, sidebar           |
| `bg-panel-2`        | `--color-panel-2`     | `#161616` | Hover states             |
| `bg-panel-3`        | `--color-panel-3`     | `#1E1E1E` | Bordes elevados          |
| `text-gold`         | `--color-gold`        | `#D4AF37` | Acento principal, CTAs   |
| `bg-gold-light`     | `--color-gold-light`  | `#F5C542` | Hover del gold           |
| `text-silver`       | `--color-silver`      | `#A1A1AA` | Texto secundario         |
| `text-muted`        | `--color-muted`       | `#71717A` | Texto terciario          |

### Uso correcto
```tsx
// Tailwind classes (preferido)
<div className="bg-obsidian text-gold">...</div>
<button className="bg-gold text-obsidian hover:bg-gold-light">...</button>

// CSS variables (gradients, sombras)
<div style={{ color: "var(--color-gold)" }}>...</div>
```

### Regla Crítica: NUNCA saturar visualmente
- Sin gradientes de colores múltiples en una sola sección
- Sin más de 2 tipografías en una pantalla
- Sin testimonios, métricas o datos inventados
- Sin elementos decorativos sin función

### Comando Post-Cambios CSS
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

## COMANDOS PRINCIPALES

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build             # incluye prisma generate automáticamente

# Linting
npm run lint
npx tsc --noEmit          # verificar tipos sin compilar

# Base de datos
npx prisma studio         # UI para inspeccionar DB
npx prisma migrate dev --name <descripcion>   # nueva migración
npx prisma generate       # regenerar cliente tras cambios en schema
npx prisma migrate deploy # aplicar migraciones en PRODUCCIÓN

# Limpiar caché de Next.js
Remove-Item -Recurse -Force .next
```

---

## CONVENCIONES DE CÓDIGO

### Componentes
- Nombres en **PascalCase**: `Button.tsx`, `DashboardSidebar.tsx`
- Server Components por defecto — `"use client"` solo cuando necesario
- No importar Prisma directamente en componentes — usar capa `services/`

### API Routes
- Validar input con **Zod** antes de tocar la DB
- Nunca exponer mensajes raw de Prisma al cliente
- Retornar `ApiResponse<T>` tipado desde `types/index.ts`
- Verificar autenticación al inicio de cada Route Handler privado

### Servicios
- `services/` contiene TODA la lógica de negocio
- Un archivo por dominio: `auth.ts`, `billing.ts`, `agents.ts`, `whatsapp.ts`
- Reciben el `orgId` del token JWT — nunca del body del request

### TypeScript
- `strict: true` en `tsconfig.json` — no desactivar
- Usar tipos de `types/index.ts` para consistencia
- No usar `any` — usar `unknown` si es necesario

### Seguridad
- Datos médicos: no loggear, no enviar a servicios externos sin consentimiento
- JWT: validar en edge con `jose`, no con `jsonwebtoken`
- Passwords: bcrypt con mínimo 10 rounds
- Stripe webhook: siempre verificar firma con `constructEvent()`

---

## REGLAS INNEGOCIABLES

1. **NUNCA** modificar `.next/`, `node_modules/`, `.taskmaster/` directamente
2. **NUNCA** commitear `.env.local` ni secrets
3. **NUNCA** ejecutar `prisma migrate reset` en producción
4. **NUNCA** hacer `git push --force` a `main`
5. **NUNCA** mezclar Pages Router con App Router
6. **NUNCA** usar `getServerSideProps` ni `getStaticProps` (Pages Router)
7. **SIEMPRE** correr `npm run lint` y `tsc --noEmit` antes de proponer un commit
8. **SIEMPRE** que toques schema de Prisma: `prisma migrate dev --name <descripcion>`
9. **SIEMPRE** validar inputs con Zod (especialmente auth y datos médicos)
10. No instalar librerías sin justificación — preferir nativo de Next/React

---

## PROBLEMAS CONOCIDOS (de la auditoría 2026-06-04)

| ID  | Problema                              | Prioridad | Estado    |
|-----|---------------------------------------|-----------|-----------|
| C-01| `ignoreBuildErrors: true` activo      | CRÍTICO   | Pendiente |
| C-02| Sin `middleware.ts` de protección     | CRÍTICO   | Pendiente |
| C-03| `module.exports` en `next.config.ts`  | Medio     | Pendiente |
| A-01| Endpoints auth duplicados             | Alto      | Pendiente |
| A-02| `tasks/`+`test/` como rutas públicas  | Alto      | Pendiente |
| D-01| `jsonwebtoken` + `jose` duplicados    | Alto      | Pendiente |
| D-02| `@radix-ui/*` individuales redundantes| Medio     | Pendiente |
| D-03| `zod` no instalado                    | Alto      | Pendiente |
| E-01| Variables WhatsApp incompletas        | Alto      | Pendiente |
| E-02| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` faltante | Alto | Pendiente |
| E-03| Sin servicio email (Resend)           | Medio     | Pendiente |

Documentación completa: `docs/PROJECT_AUDIT.md`

---

## REFERENCIAS DE DOCUMENTACIÓN

| Documento                                  | Propósito                                    |
|--------------------------------------------|----------------------------------------------|
| `docs/PROJECT_AUDIT.md`                    | Auditoría completa con scores y errores      |
| `docs/DEPENDENCIES_REPORT.md`              | Estado de todas las dependencias             |
| `docs/ROUTES_REPORT.md`                    | Todas las rutas y su estado                  |
| `docs/ENVIRONMENT_REPORT.md`               | Variables de entorno requeridas y faltantes  |
| `docs/PREMIUM_UI_MIGRATION_PLAN.md`        | Compatibilidad Tailwind Plus / Cruip Pro     |
| `prisma/schema.prisma`                     | Schema completo de la base de datos          |
| `.env.example`                             | Plantilla de variables (sin secrets)         |
| `LAUNCH_CHECKLIST.md`                      | Checklist pre-lanzamiento                    |
| `PRODUCTION_CHECKLIST.md`                  | Checklist pre-producción                     |
