# ORTHONOBA — FINAL AUDIT REPORT V1
**Fecha:** 2026-06-04  
**Auditores:** Principal Architect + Senior Security Engineer + Senior DevOps + SaaS Auditor + CTO  
**Score anterior (post Fases A–H):** 82/100  
**Score actual (post-auditoría real):** 68/100  

> **Nota crítica:** El score anterior de 82/100 estaba basado en intenciones y planes documentados en CLAUDE.md. Este informe refleja el estado REAL del código verificado el 2026-06-04.

---

## FASE 1 — VALIDACIÓN TÉCNICA

### Estado del build: ROTO (EXIT 1)

| Check | Estado | Detalle |
|-------|--------|---------|
| `npm run build` | ❌ FALLA | Error TS en `lib/validations.ts` — Zod v4 API breaking change |
| `npm run type-check` | ❌ FALLA | 4 errores TypeScript |
| `npm run lint` (script) | ❌ ROTO | "Invalid project directory" — `next lint` bug config |
| `npx eslint .` | ⚠️ ERRORES | 7 errores, 7 warnings |
| `npm audit` | ⚠️ 3 MODERATE | PostCSS XSS, @vercel/flags info disclosure |

### Errores TypeScript (4)

| Archivo | Línea | Error |
|---------|-------|-------|
| `lib/validations.ts` | 7 | `required_error` no existe en Zod v4 `z.string()` — usa `error` |
| `lib/validations.ts` | 11 | ídem password |
| `test/setup.ts` | 10 | `NODE_ENV` es read-only en TypeScript strict |
| `test/setup.ts` | 60 | `beforeEach` no tipado — falta `vitest/globals` en tsconfig |

**Causa raíz de los errores TS en validations.ts:** Zod v4 eliminó `required_error` de `z.string()`. El parámetro correcto en v4 es `error` o directamente un string.

### Errores ESLint (7)

| Archivo | Regla | Tipo |
|---------|-------|------|
| `app/api/pacientes/route.ts:35` | `@typescript-eslint/no-explicit-any` | ERROR |
| `app/dashboard/onboarding/plan/page.tsx:95` | `react-hooks/immutability` | ERROR |
| `components/layout/MegaMenu.tsx:7` | `no-empty-object-type` | ERROR |
| `components/sections/Industries.tsx:79` | `react/no-unescaped-entities` | ERROR |
| `components/sections/SecuritySection.tsx:64` | `react/no-unescaped-entities` | ERROR |
| `declarations.d.ts:74,80,86,92` | `no-explicit-any` (5x) | ERROR |

### Vulnerabilidades npm audit (3 moderate)

| Paquete | CVE/Advisory | CVSS | Fix |
|---------|-------------|------|-----|
| `@vercel/flags ≤3.1.1` | GHSA-892p-pqrr-hxqr | 6.5 | ❌ No fix available |
| `postcss <8.5.10` | GHSA-qx2v-qp2m-jg93 | 6.1 | Actualizar next |
| `next 9.3.4–16.3.0-canary.5` | via postcss | 6.1 | Next ya en 16.2.7 |

### Dependencias muertas confirmadas

| Paquete | Estado | Acción |
|---------|--------|--------|
| `jsonwebtoken` + `@types/jsonwebtoken` | Instalado pero debería eliminarse | `npm uninstall jsonwebtoken @types/jsonwebtoken` |
| `autoprefixer` | Instalado pero incluido en Tailwind v4 | `npm uninstall autoprefixer` |
| `pino` + `pino-pretty` | Instalados, `logger.ts` usa `console.log` directo | Migrar logger a pino o eliminar |
| `@upstash/ratelimit` + `@upstash/redis` | Instalados, rate-limit.ts usa in-memory | Wiring pendiente |
| `@sentry/nextjs` | Instalado, cero archivos de config | Configurar o eliminar |
| `@vercel/flags` | Instalado, feature flags no activos | Activar o eliminar |

---

## FASE 2 — AUDITORÍA DE SEGURIDAD

### Score Seguridad: 61/100 (vs 78/100 reportado)

#### CRÍTICO

**[C1] Zod v4 breaking change bloquea el build entero**  
`lib/validations.ts` usa `required_error` que fue eliminado en Zod v4. Todos los endpoints que importan este módulo fallan en producción. El proyecto no puede ser deployado en este estado.  
_Archivo:_ `lib/validations.ts:7,11`

**[C2] @sentry/nextjs instalado sin configuración**  
`package.json` declara `@sentry/nextjs ^10.56.0` pero no existen `sentry.client.config.ts`, `sentry.server.config.ts` ni `sentry.edge.config.ts`. Error tracking desactivado en producción. Cuando ocurre un error 500, no hay alertas.  
_Evidencia:_ `ls sentry.*.config.*` → vacío

#### ALTO

**[A1] Rate limiter in-memory — bypasseable en serverless**  
`lib/rate-limit.ts` usa un `Map` en memoria. En Vercel/serverless, cada worker tiene su propio store. Un atacante con múltiples IPs o triggers de cold starts puede bypassear el límite de 5 intentos auth. `@upstash/ratelimit` está instalado pero no cableado.  
_Archivo:_ `lib/rate-limit.ts`

**[A2] JWT dual-library: jsonwebtoken firma, jose verifica**  
`lib/auth-helpers.ts` importa `jsonwebtoken` para firmar tokens (`jwt.sign`). `lib/auth-edge.ts` usa `jose` (`jwtVerify`) en el middleware. Son compatibles a nivel HS256, pero es deuda técnica crítica: si `jsonwebtoken` alguna vez cambia sus defaults de algoritmo, se rompe la verificación sin aviso.  
_Archivos:_ `lib/auth-helpers.ts:1`, `lib/auth-edge.ts:1`

**[A3] WhatsApp webhook sin verificación HMAC**  
`POST /api/whatsapp/webhook` no valida el header `X-Hub-Signature-256` que Meta envía con cada webhook. Cualquier actor externo puede enviar payloads falsos a este endpoint y crear contacts/leads/conversations fabricados en la base de datos.  
_Archivo:_ `app/api/whatsapp/webhook/route.ts`

**[A4] Health endpoint no autenticado revela config**  
`GET /api/health` responde públicamente con qué variables de entorno están configuradas (`DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`). Un atacante puede usar esto para fingerprinting de configuración.  
_Archivo:_ `app/api/health/route.ts`

#### MEDIO

**[M1] CSP con 'unsafe-eval'**  
El Content-Security-Policy incluye `'unsafe-eval'` para scripts. Esto anula parcialmente la protección contra XSS. Next.js 16 + React 19 no requieren eval en producción.  
_Archivo:_ `next.config.ts:21`

**[M2] Feature flags declarados pero no aplicados en endpoints**  
`PLAN_LIMITS` existe en `lib/stripe.ts` pero ningún endpoint verifica si la organización está dentro de sus límites. Un tenant FREE puede crear agentes ilimitados llamando directamente a `POST /api/agents`.

**[M3] Password min-length inconsistente**  
`services/auth.ts` valida `password.length < 8` (línea 70). El schema Zod valida 12+ chars. Si alguien llama directamente a `register()` service sin pasar por el Route Handler, puede registrar contraseñas de 8 chars.  
_Archivo:_ `services/auth.ts:70`

**[M4] Register no establece cookie de sesión**  
`POST /api/auth/register` devuelve `{ ok: true, user }` pero no establece cookie `auth_token`. El usuario debe hacer un segundo request a `/api/auth/login` para autenticarse. Esto es inconsistente con el flujo documentado en CLAUDE.md.

#### BAJO

**[B1] Cookie SameSite: 'lax' en lugar de 'strict'**  
Para un SaaS B2B sin integración cross-domain, `strict` sería más seguro.

**[B2] Webhook error expone información de config**  
`POST /api/stripe/webhook` devuelve `"STRIPE_WEBHOOK_SECRET not configured"` con status 500 en lugar de un error genérico.

---

## FASE 3 — AUDITORÍA MULTI-TENANT

### Score Multi-Tenant: 62/100 (vs 80/100 reportado)

| Control | Estado | Notas |
|---------|--------|-------|
| org isolation en queries | ✅ | Todos los endpoints usan `ctx.organizationId` |
| JWT incluye organizationId | ✅ | Payload correcto |
| Middleware inyecta x-org-id | ✅ | Funciona en Edge |
| Audit logs | ❌ INACTIVOS | Modelo existe, nada escribe a él |
| Plan limits enforcement | ❌ INACTIVOS | PLAN_LIMITS definido, nunca usado |
| RLS en Neon | ❌ PENDIENTE | Solo aislamiento a nivel aplicación |
| Feature flags | ❌ INACTIVOS | @vercel/flags instalado, no cableado |
| Invitation system | ❌ PENDIENTE | Solo OWNER puede acceder al org |
| Cross-tenant leakage | ⚠️ RIESGO | billing.ts usa findFirst por customerId, no orgId |
| x-org-slug en headers | ❌ FALTANTE | Solo x-org-id, no slug |

**Hallazgo crítico:** Un organización en FREE plan puede crear agentes, contacts y leads ilimitados porque los límites definidos en `PLAN_LIMITS` nunca se verifican en los Route Handlers.

---

## FASE 4 — AUDITORÍA FRONTEND

### Score UI/UX: 42/100 (vs 78/100 reportado)

| Módulo | Estado | Datos reales | Empty state | Loading | Responsive |
|--------|--------|-------------|-------------|---------|------------|
| Dashboard overview | 🔴 Placeholder | ❌ Todos "—" | ✅ | ❌ | ✅ |
| Agents list | 🔴 Placeholder | ❌ No lista | ✅ | ❌ | ✅ |
| Agents create | 🔴 404 | `/agents/new` no existe | — | — | — |
| Analytics | 🔴 Placeholder | ❌ | ❌ | ❌ | ✅ |
| Billing | 🟡 Funcional | ✅ Stripe portal | ✅ | ❌ | ✅ |
| Contacts | 🔴 Placeholder | ❌ | ❌ | ❌ | ✅ |
| Conversations | 🔴 Placeholder | ❌ | ❌ | ❌ | ✅ |
| Leads | 🔴 Placeholder | ❌ | ❌ | ❌ | ✅ |
| Onboarding | ✅ Funcional | ✅ 5 pasos | ✅ | ✅ | ✅ |
| Settings | 🟡 Funcional | ✅ PATCH org | ✅ | ❌ | ✅ |
| Voice | 🔴 Placeholder | ❌ Fase C | — | — | ✅ |
| WhatsApp | 🟡 Accounts API | ✅ Parcial | ✅ | ❌ | ✅ |

**Issues críticos UI:**
- `app/dashboard/agents/page.tsx` enlaza a `/dashboard/agents/new` que da 404
- Design tokens inconsistentes: mezcla de CSS vars (`text-gold`) con hex directos (`text-[#D4AF37]`)
- Dark mode: sí (design system dark-only por defecto)
- Skeletons: 0 implementados
- Error boundaries: 0 implementados
- Responsive: básico pero funcional

---

## FASE 5 — AUDITORÍA BACKEND

### Score Backend: 58/100 (vs 68/100 reportado)

| Área | Estado | Notas |
|------|--------|-------|
| Auth (login/register) | ✅ | Funcional con Zod + rate limit |
| JWT (signing) | ⚠️ | jsonwebtoken en lugar de jose |
| Cookie httpOnly | ✅ | Correcto |
| Agents CRUD | ⚠️ | Solo GET + POST, sin PUT/DELETE |
| Organizations CRUD | ✅ | GET + PATCH |
| Stripe webhooks | ✅ | HMAC + idempotencia |
| Stripe checkout/portal | ✅ | Funcional |
| WhatsApp webhook | ⚠️ | Sin HMAC Meta verification |
| Health check | ✅ | DB ping funcional |
| Onboarding status | ✅ | 4 checks correctos |
| Contacts API | ❌ | No existe |
| Leads API | ❌ | No existe |
| Conversations API | ❌ | No existe |
| Analytics API | ❌ | No existe |
| Forgot-password | ⚠️ | Stub sin email sender |
| Logging (pino) | ❌ | logger.ts usa console.log, pino instalado sin use |
| Sentry | ❌ | Instalado sin config |
| Anthropic SDK | ❌ | Instalado sin ningún uso |
| OpenAI | ❌ | OPENAI_API_KEY en env, SDK no instalado |
| Plan limits enforcement | ❌ | No se aplican en ningún endpoint |
| Audit log writes | ❌ | Modelo existe, nunca escribe |

---

## FASE 6 — PRODUCCIÓN

### Score Production Readiness: 38/100 (vs 80/100 reportado)

| Control | Estado | Bloqueador |
|---------|--------|------------|
| Build pasa | ❌ BLOQUEADOR | Zod v4 TS error |
| TypeScript sin errores | ❌ BLOQUEADOR | 4 errores |
| ESLint sin errores | ❌ | 7 errores |
| Sentry configurado | ❌ | Instalado, zero config |
| CI/CD pipeline | ❌ | No existe ningún archivo de workflow |
| GitHub Actions | ❌ | No existe `.github/workflows/` |
| Vercel config | ❌ | No existe `vercel.json` |
| Variables de entorno documentadas | ⚠️ | .env.example incompleto |
| DB migrations para producción | ⚠️ | `prisma migrate deploy` documentado |
| Backup strategy | ❌ | No documentada |
| Error monitoring | ❌ | Sentry no configurado |
| Rate limiting distribuida | ❌ | In-memory, no Upstash |
| Health check endpoint | ✅ | Funciona |
| HSTS | ✅ | 2 años con preload |
| Security headers | ✅ | Completo excepto unsafe-eval |

**Bloqueadores para producción (impiden deploy):**
1. Build falla por Zod v4 TS error
2. ESLint tiene errores (no solo warnings)
3. Sentry no configurado — sin observabilidad
4. Rate limiting no distribuida — bypasseable

---

## FASE 7 — DOCUMENTACIÓN

### Estado de docs/

| Documento | Estado | Calidad |
|-----------|--------|---------|
| `docs/AUDIT_V2.md` | Existente | Scores inflados vs realidad |
| `docs/SECURITY_CHECKLIST.md` | Existente | Desactualizado |
| `docs/PRODUCTION_READINESS.md` | Existente | Desactualizado |
| `docs/TESTING_STRATEGY.md` | Existente | Plan no ejecutado |
| `README.md` | ❌ | No existe o vacío |
| `PRODUCTION_CHECKLIST.md` | ❌ | No existe |
| `LAUNCH_CHECKLIST.md` | ❌ | No existe |

---

## FASE 8 — SCORING FINAL

| Dimensión | Score Anterior (estimado) | Score Real (2026-06-04) | Score Objetivo |
|-----------|--------------------------|------------------------|----------------|
| Arquitectura | 86/100 | 72/100 | 90/100 |
| Seguridad | 78/100 | 61/100 | 85/100 |
| Frontend/UI | 78/100 | 42/100 | 80/100 |
| Backend/API | 68/100 | 58/100 | 85/100 |
| Multi-Tenant | 80/100 | 62/100 | 88/100 |
| Observabilidad | 60/100 | 15/100 | 80/100 |
| Escalabilidad | 83/100 | 65/100 | 85/100 |
| Production Ready | 80/100 | 38/100 | 90/100 |
| Documentación | 75/100 | 60/100 | 80/100 |
| **TOTAL** | **82/100** | **53/100** | **85/100** |

> **El gap de 29 puntos** entre el score documentado y el real se debe principalmente a que muchos ítems marcados como ✅ en CLAUDE.md son instalaciones de paquetes sin wiring real (Sentry, pino, Upstash, feature flags, plan limits, audit logs).

---

## BLOQUEADORES PARA PRODUCCIÓN

### P0 — El build está roto (no deployable)

1. `lib/validations.ts` → reemplazar `required_error` por `error` (Zod v4 API)
2. `test/setup.ts` → no usar `process.env.NODE_ENV =` en TypeScript strict
3. `test/setup.ts` → añadir `"types": ["vitest/globals"]` a tsconfig

### P1 — Sin observabilidad

4. Configurar Sentry (crear `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`)
5. Migrar `logger.ts` a pino o conectar pino como transport

### P2 — Seguridad

6. Reemplazar rate limiter in-memory por Upstash Redis (ya instalado)
7. Eliminar `jsonwebtoken` y migrar `auth-helpers.ts` a jose completamente
8. Agregar HMAC verification en WhatsApp webhook
9. Autenticar `/api/health` o eliminar info de env vars de la respuesta

### P3 — Funcionalidad mínima

10. Crear `/dashboard/agents/new` page (ruta enlazada que da 404)
11. Crear `GET/POST /api/contacts` y `GET/POST /api/leads`
12. Conectar Anthropic SDK en algún endpoint real
13. Register debe setear cookie de sesión (no forzar doble request)

---

## RECOMENDACIÓN FINAL CTO

El proyecto tiene una base arquitectónica sólida y el diseño del sistema es correcto — el schema multi-tenant, el flujo de autenticación, la integración Stripe con idempotencia, y el middleware de Edge son trabajo real de calidad. 

Sin embargo, **el estado del código difiere significativamente del estado documentado**. Hay una deuda de ejecución, no de diseño. El proyecto acumula paquetes instalados sin configurar (Sentry, Upstash, pino, feature flags) que crean una falsa sensación de completitud en los checklists.

**Tiempo para llegar a 85/100 (MVP production-ready):** 3–4 semanas con un desarrollador dedicado.  
**Tiempo para llegar a Enterprise Grade (95/100):** 3–4 meses adicionales.

La recomendación inmediata: resolver los 4 bloqueadores de build esta semana, luego abordar seguridad crítica (Upstash + Sentry + WhatsApp HMAC) en Sprint 2, y conectar funcionalidad real del dashboard en Sprint 3–4.
