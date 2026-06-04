# AUDIT V2 — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Auditor:** Principal Software Architect · Claude Sonnet 4.6  
**Stack auditado:** Next.js 16.2.4 · React 19.2.5 · TypeScript 6.0.3 · Tailwind v4.3.0 · Prisma 5.22.0 · Stripe 22.2.0  
**Archivos analizados:** 37 archivos de código fuente real

---

## SCORES DEL PROYECTO

| Dimensión                | Score  | Estado       | Tendencia  |
|--------------------------|--------|--------------|------------|
| **Arquitectura**         | 76/100 | 🟡 Buena     | ↑ Creciendo |
| **Seguridad**            | 48/100 | 🔴 Crítico   | ↓ Requiere acción inmediata |
| **Escalabilidad**        | 73/100 | 🟡 Buena     | ↑ Creciendo |
| **Rendimiento**          | 66/100 | 🟡 Aceptable | → Estable   |
| **SaaS Readiness**       | 71/100 | 🟡 Buena     | ↑ Creciendo |
| **Multi-Tenant Readiness**| 74/100 | 🟡 Buena    | ↑ Creciendo |
| **UI Readiness**         | 78/100 | 🟡 Buena     | ↑ Creciendo |
| **Production Readiness** | 52/100 | 🔴 Crítico   | ↓ Bloquea deploy |

### SCORE TOTAL: **67/100** — Apto para desarrollo. Bloqueado para producción enterprise.

---

## METODOLOGÍA DE AUDITORÍA

Se analizaron 37 archivos de código fuente real incluyendo:
- Servicios (`services/`)
- Helpers y utilidades (`lib/`)
- API Routes (`app/api/`)
- Componentes clave (`components/`)
- Configuración del sistema (`next.config.ts`, `tsconfig.json`)
- Tipos (`types/index.ts`)
- Declaraciones globales (`declarations.d.ts`)

---

## 1. INTEGRIDAD GENERAL DEL PROYECTO

### Estado: 🟡 BUENA BASE, GAPS CRÍTICOS EN SEGURIDAD

El proyecto tiene una arquitectura coherente con separación clara de responsabilidades: `services/` → `lib/` → `app/api/` → `components/`. El schema de Prisma es maduro y el flujo Stripe está correctamente implementado con idempotencia.

**Hallazgos positivos:**
- ✅ Stripe webhook con verificación HMAC (`stripe.webhooks.constructEvent()`)
- ✅ Idempotencia de eventos Stripe via tabla `billingEvent`
- ✅ bcrypt con 10 rounds para passwords
- ✅ Singleton de Prisma correctamente implementado
- ✅ Pool de conexiones optimizado para serverless (max 5)
- ✅ Separación service layer / route handler
- ✅ JWT con `jose` (Edge-compatible)
- ✅ Cookie `httpOnly` configurada
- ✅ Lazy-loading del cliente Stripe
- ✅ Multi-locale con next-intl correctamente configurado
- ✅ Auto-creación de organización al registrar usuario

**Hallazgos críticos:**
- ❌ Token JWT almacenado en `localStorage` (XSS crítico)
- ❌ Sin `middleware.ts` de protección de rutas
- ❌ `typescript.ignoreBuildErrors: true` activo
- ❌ Dashboard con datos 100% hardcodeados (placeholders)
- ❌ Forgot-password con TODO sin implementar
- ❌ Sin verificación de email post-registro
- ❌ Sin rate limiting en endpoints de auth
- ❌ Sin framework de testing

---

## 2. COMPATIBILIDAD DE DEPENDENCIAS

### Next.js 16 + React 19

| Paquete            | Versión | Compatible | Notas                                       |
|--------------------|---------|------------|---------------------------------------------|
| `next`             | 16.2.4  | ✅          | App Router, Server Components, Server Actions |
| `react`            | 19.2.5  | ✅          | Concurrent features, use() hook disponible  |
| `react-dom`        | 19.2.5  | ✅          |                                             |
| `next-intl`        | 4.13.0  | ✅          | Compatible con Next.js 16 + RSC             |
| `@prisma/client`   | 5.22.0  | ✅          | Compatible. Prisma 6 disponible             |
| `stripe`           | 22.2.0  | ✅          | API version 2026-05-27.dahlia               |
| `jose`             | 6.2.3   | ✅          | Edge runtime compatible                     |
| `recharts`         | 3.8.1   | ✅          | Compatible con React 19                     |
| `lucide-react`     | 1.17.0  | ✅          | Versión 1.x (nueva línea mayor)             |
| `radix-ui`         | 1.4.3   | ⚠️          | Paquete unificado pero con conflicto individual |

### Tailwind CSS v4

| Aspecto                    | Estado | Notas                              |
|----------------------------|--------|------------------------------------|
| `@theme {}` syntax         | ✅      | Correctamente implementado         |
| Sin `tailwind.config.ts`   | ✅      | Correcto para v4                   |
| `@tailwindcss/postcss`     | ✅      | Plugin correcto                    |
| `tw-animate-css`           | ✅      | Compatible con v4                  |
| `@custom-variant dark`     | ✅      | Implementado en globals.css        |
| Variables CSS tokens       | ✅      | `styles/` folder bien estructurado |

### Conflictos de versiones detectados

| Conflicto | Paquetes | Riesgo |
|-----------|----------|--------|
| JWT duplicado | `jose` 6.2.3 + `jsonwebtoken` 9.0.3 | 🟠 Medio |
| Radix duplicado | `radix-ui` 1.4.3 + 5 `@radix-ui/*` individuales | 🟠 Medio |
| `pg` redundante | Prisma gestiona la conexión | 🟡 Bajo |
| `autoprefixer` redundante | Tailwind v4 lo incluye nativamente | 🟡 Bajo |

---

## 3. CÓDIGO MUERTO / COMPONENTES DUPLICADOS

### Código muerto confirmado

| Archivo                      | Tipo           | Descripción                                      |
|------------------------------|----------------|--------------------------------------------------|
| `prisma.ts.bak`              | Backup file    | Archivo de respaldo en el repo                   |
| `styles/globals.css`         | CSS vacío      | Existe pero está vacío. El real es `app/globals.css` |
| `components/Siderbar.tsx`    | Typo/Duplicate | Nombre incorrecto. Probablemente `Sidebar.tsx`   |
| `dashboard/` (raíz)          | Carpeta ambigua| Fuera de `app/`, propósito desconocido           |

### Endpoints duplicados

| Endpoint A              | Endpoint B              | Diferencia clave                     |
|-------------------------|-------------------------|--------------------------------------|
| `POST /api/auth/login`  | `POST /api/v1/auth/login` | `/api/auth/login` establece cookie; `/api/v1/auth/login` NO establece cookie (solo devuelve token en JSON) |

**NOTA IMPORTANTE:** La diferencia es intencional en diseño: `auth/login` es para web (con cookie), `v1/auth/login` es para API clients (Bearer token). Pero esto debe documentarse explícitamente para evitar confusión.

### Dashboard con datos hardcodeados
```tsx
// app/dashboard/page.tsx — TODO: conectar datos reales
{ label: "AI Operations",     value: "—", trend: "0%" }
{ label: "Conversations",     value: "—", trend: "0%" }
{ label: "Lead Pipeline",     value: "—", trend: "0%" }
{ label: "Voice Center",      value: "—", trend: "0%" }
{ label: "Automations",       value: "—", trend: "0%" }
{ label: "Contacts",          value: "—", trend: "0%" }
```

---

## 4. DEPENDENCIAS NO UTILIZADAS / IMPORTS INNECESARIOS

| Dependencia          | Estado          | Evidencia                                               |
|----------------------|-----------------|---------------------------------------------------------|
| `jsonwebtoken`       | No usado        | Todo el código usa `jose`. `jsonwebtoken` importado 0 veces |
| `@types/jsonwebtoken`| No usado        | Derivado de lo anterior                                 |
| `pg`                 | Usado solo en `lib/db.ts` | Prisma maneja conexiones. `pg` es redundante salvo queries raw |
| `@types/pg`          | Usado en lib/db.ts | Si `pg` se mantiene, este sí es necesario           |
| `autoprefixer`       | No usado        | No aparece en `postcss.config.js`                       |
| `three` (declarations)| No instalado   | `declarations.d.ts` declara módulos three.js no instalados |

---

## 5. PROBLEMAS DE RENDIMIENTO

Ver `docs/PERFORMANCE_REPORT.md` para análisis completo.

**Resumen top issues:**
1. Dashboard: 6 KPIs sin data fetching (0 peticiones a DB)
2. Sin ISR/caching strategy para páginas marketing
3. Sin `next/image` evidente en componentes auditados
4. `app/layout.tsx` minimalista pero sin `html/body` (depende de child layouts — patrón poco común)
5. WhatsApp webhook: procesamiento asíncrono correcto (responde inmediato, procesa en background)

---

## 6. RIESGOS PARA VERCEL PRODUCTION

| Riesgo                                    | Severidad | Bloquea deploy |
|-------------------------------------------|-----------|----------------|
| `ignoreBuildErrors: true`                 | 🔴 Crítico | Sí — errores TypeScript ocultos |
| Token en localStorage (XSS)               | 🔴 Crítico | Sí — vulnerabilidad de seguridad |
| Sin `middleware.ts`                       | 🔴 Crítico | Sí — rutas privadas sin protección |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` faltante | 🟠 Alto | Sí — Stripe frontend no funciona |
| Variables WhatsApp incompletas            | 🟠 Alto  | Parcial — webhook funciona, send no |
| Sin servicio de email                     | 🟠 Alto  | Parcial — forgot-password roto     |
| `module.exports` en `.ts`               | 🟡 Medio  | No — funciona pero inconsistente   |
| Sin tests                                 | 🔴 Crítico | No — pero riesgo de regresión alto |
| Sin rate limiting                         | 🟠 Alto  | No — pero riesgo de abuse          |

---

## 7. COMPATIBILIDAD NEXT.JS 16 — DETALLE

| Feature                      | Estado | Implementación actual              |
|------------------------------|--------|------------------------------------|
| App Router                   | ✅      | Toda la app usa App Router         |
| Server Components (default)  | ✅      | Correcto — `"use client"` solo donde necesario |
| Server Actions               | ⚠️ Ausente | No se usa Server Actions. Rutas API en su lugar |
| `use()` hook (React 19)      | ⚠️ No usado | Oportunidad para simplificar data fetching |
| Parallel Routes              | ❌ No usado | Opportunity para dashboard modular |
| Intercepting Routes          | ❌ No usado | No necesario ahora                 |
| Route Groups `(group)`       | ✅      | Usado en `(auth)/`                 |
| Dynamic Segments `[slug]`    | ✅      | Usado en `[locale]/`, `[slug]/`    |
| `next/font`                  | ✅      | Inter font con variable CSS        |
| `next/image`                 | ⚠️ No auditado | No detectado en 37 archivos revisados |
| Middleware                   | ❌ Ausente | `middleware.ts` no existe          |

---

## 8. COMPATIBILIDAD REACT 19 — DETALLE

| Feature                        | Estado | Notas                               |
|--------------------------------|--------|-------------------------------------|
| Concurrent Mode                | ✅      | React 19 por defecto                |
| `use()` para Promises          | ⚠️ Oportunidad | No usado, podría simplificar RSC |
| Server Actions (form)          | ⚠️ No usado | Podría reemplazar algunos POST endpoints |
| `useOptimistic()`              | ⚠️ No usado | Útil para mutaciones en CRM/leads  |
| `useFormStatus()`              | ⚠️ No usado | Útil para formularios auth          |
| `useTransition()`              | ⚠️ No usado | Útil para navegación del dashboard  |
| Ref callbacks cleanup          | N/A    | No aplicable ahora                  |

---

## 9. HOJA DE RUTA — 5 FASES

### FASE 1: TAILWIND PLUS (Sprint 1–2, ~2 semanas)
```
Objetivo: Integrar componentes premium de Tailwind Plus sin romper el design system actual

Sprint 1A — Preparación:
  [ ] Adquirir Tailwind Plus (tailwindplus.com)
  [ ] Crear rama feat/tailwind-plus
  [ ] Analizar qué componentes usar: Hero, Pricing, Features, CTA
  [ ] Crear mapeo de colores: gold/obsidian → slate/zinc para componentes importados

Sprint 1B — Integración:
  [ ] Migrar Hero.tsx con versión Tailwind Plus
  [ ] Migrar PricingPreview.tsx con version Tailwind Plus
  [ ] Migrar CTA.tsx
  [ ] Test visual en 375px, 768px, 1280px, 1920px
  [ ] Merge a main tras QA
```

### FASE 2: CRUIP PRO (Sprint 3–4, ~2 semanas)
```
Objetivo: Dashboard UI premium con componentes Cruip Pro

Sprint 2A — Preparación:
  [ ] Adquirir Cruip Pro (cruip.com/pro)
  [ ] Verificar versión Tailwind (v3 vs v4) del template
  [ ] Crear namespace CSS .cruip-* para aislar variables
  [ ] Resolver conflictos variables CSS shadcn vs Cruip

Sprint 2B — Dashboard Migration:
  [ ] Sidebar navigation → Cruip version
  [ ] KPI Cards con data real (no placeholders)
  [ ] Tables: Contacts, Leads, Conversations
  [ ] Charts: Analytics con Recharts + Cruip styling
  [ ] Forms: Settings, Onboarding
```

### FASE 3: VOICE AI CENTER (Sprint 5–7, ~3 semanas)
```
Objetivo: Agentes de voz con Twilio + Claude

Sprint 3A — Infraestructura:
  [ ] npm install twilio
  [ ] Crear app/api/v1/voice/incoming/route.ts
  [ ] Crear app/api/v1/voice/status/route.ts
  [ ] Configurar número Twilio
  [ ] Variables de entorno Twilio

Sprint 3B — AI Voice Pipeline:
  [ ] TwiML para respuestas de voz
  [ ] Integración Anthropic SDK para conversación
  [ ] STT: Twilio Speech Recognition
  [ ] TTS: Twilio Voice o ElevenLabs
  [ ] Conectar con AIAgent tipo VOICE

Sprint 3C — Dashboard Voice:
  [ ] Conectar datos reales en /dashboard/voice
  [ ] Call history, analytics, transcripts
  [ ] Configuración de agente de voz
```

### FASE 4: MULTI-TENANT SAAS COMPLETO (Sprint 8–11, ~4 semanas)
```
Objetivo: Plataforma multi-tenant enterprise-grade

Sprint 4A — Seguridad:
  [ ] Crear middleware.ts con JWT verification
  [ ] Eliminar localStorage token → solo httpOnly cookie
  [ ] Implementar rate limiting (Upstash Redis)
  [ ] Email verification post-registro
  [ ] Implementar forgot-password (Resend)

Sprint 4B — Tenant Isolation:
  [ ] Revisar todas las queries Prisma → orgId filter obligatorio
  [ ] Implementar Row Level Security en Neon
  [ ] Workspace management en dashboard
  [ ] Invite members con email

Sprint 4C — Feature Flags por Plan:
  [ ] Middleware de feature flags basado en PlanTier
  [ ] UI de upgrade cuando se alcanza límite
  [ ] Usage tracking real en UsageRecord

Sprint 4D — Data Integration:
  [ ] Conectar dashboard KPIs a DB real
  [ ] Analytics charts con datos reales
  [ ] Conversations list con paginación
  [ ] CRM contacts y leads con CRUD completo
```

### FASE 5: PRODUCCIÓN ENTERPRISE (Sprint 12–14, ~3 semanas)
```
Objetivo: Deploy production-grade en Vercel

Sprint 5A — Calidad:
  [ ] Eliminar ignoreBuildErrors
  [ ] Resolver todos los errores TypeScript
  [ ] Implementar vitest + testing-library
  [ ] Cobertura mínima: services/ al 80%

Sprint 5B — Observabilidad:
  [ ] Integrar Sentry para error tracking
  [ ] Vercel Analytics habilitado
  [ ] Logging estructurado (no console.log)
  [ ] Alertas en fallos de webhook

Sprint 5C — Performance:
  [ ] Audit Lighthouse > 90 en todas las páginas marketing
  [ ] ISR para páginas blog/resources
  [ ] next/image en todos los assets
  [ ] Bundle size analysis

Sprint 5D — Deploy:
  [ ] Variables de entorno en Vercel Dashboard
  [ ] Domain configuration
  [ ] Stripe webhooks en producción
  [ ] WhatsApp webhook verificado
  [ ] Smoke tests post-deploy
```

---

## RESUMEN EJECUTIVO

Orthonoba.app tiene **fundamentos arquitectónicos sólidos** pero **brechas de seguridad críticas** que impiden un deploy a producción enterprise. El schema de Prisma, la integración Stripe y la separación service-layer son ejemplares. El bloqueador principal es la combinación de `localStorage` para tokens JWT + ausencia de `middleware.ts` — juntos hacen que las rutas privadas sean vulnerables.

**Prioridad absoluta antes de cualquier deploy:**
1. Eliminar token del `localStorage` → solo cookie httpOnly
2. Crear `middleware.ts` con JWT verification
3. Eliminar `ignoreBuildErrors: true`
4. Implementar forgot-password y verificación de email
5. Rate limiting en `/api/auth/login`
