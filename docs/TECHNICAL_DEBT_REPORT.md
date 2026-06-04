# ORTHONOBA — TECHNICAL DEBT REPORT
**Fecha:** 2026-06-04  
**Metodología:** Code inspection directo + build + type-check + ESLint + npm audit

---

## Deuda Crítica (bloquea producción)

### TD-001: Zod v4 API Breaking Change
**Archivo:** `lib/validations.ts:7,11`  
**Problema:** `z.string({ required_error: '...' })` fue eliminado en Zod v4. El parámetro correcto es `z.string({ error: '...' })` o simplemente `.min(1, 'mensaje')`.  
**Impacto:** El build entero falla. El proyecto no puede ser deployado.  
**Fix:** ~30 minutos. Reemplazar `required_error` por `error` en líneas 7 y 11.

### TD-002: Test Setup TypeScript Errors
**Archivo:** `test/setup.ts:10,60`  
**Problema 1:** `process.env.NODE_ENV = 'test'` — `NODE_ENV` es read-only en TypeScript strict.  
**Problema 2:** `beforeEach` no reconocido — falta `"types": ["vitest/globals"]` en `tsconfig.json`.  
**Fix:** ~15 minutos.

### TD-003: `npm run lint` script roto
**Archivo:** `package.json`  
**Problema:** `next lint` falla con "Invalid project directory". ESLint 9 flat config con `eslint.config.mjs` no está bien integrado con `next lint` en Next.js 16.  
**Fix:** Usar `"lint": "eslint . --ext .ts,.tsx"` o configurar correctamente el directorio.

---

## Deuda Alta (impide MVP confiable)

### TD-004: jsonwebtoken debe ser eliminado
**Archivos:** `lib/auth-helpers.ts:1`, `package.json`  
**Problema:** `auth-helpers.ts` importa `jsonwebtoken` para firmar/verificar JWT. CLAUDE.md indica que `jose` debe reemplazarlo. Ambas bibliotecas coexisten. Si `jsonwebtoken` falla o se vulnera, `auth-helpers.ts` es el camino de signing para todos los tokens de sesión.  
**Fix:** Migrar `signToken`/`verifyToken` en `auth-helpers.ts` a jose (~1h). Luego `npm uninstall jsonwebtoken @types/jsonwebtoken`.

### TD-005: Rate limiter in-memory no sirve en serverless
**Archivo:** `lib/rate-limit.ts`  
**Problema:** El `Map` en memoria se resetea con cada cold start de Vercel. Un atacante puede forzar cold starts (simplemente esperando o usando diferentes IPs) para bypassear el límite de auth de 5 intentos.  
**Fix:** Cablear `@upstash/ratelimit` con `@upstash/redis` (ya instalados). ~2 horas.

### TD-006: Sentry instalado pero no configurado
**Evidencia:** `@sentry/nextjs ^10.56.0` en package.json. Cero archivos `sentry.*.config.ts`.  
**Problema:** Cualquier error 500 en producción es silencioso. Sin error tracking, debugging en producción es imposible.  
**Fix:** Crear 3 archivos de configuración Sentry + añadir `SENTRY_DSN` a env vars. ~3 horas.

### TD-007: WhatsApp webhook acepta payloads no verificados
**Archivo:** `app/api/whatsapp/webhook/route.ts`  
**Problema:** Meta envía header `X-Hub-Signature-256` con HMAC-SHA256. El handler no lo verifica. Cualquier actor puede crear contacts/conversations/leads falsos.  
**Fix:** Añadir verificación HMAC antes de procesar el payload. ~1 hora.

### TD-008: Register no establece cookie de sesión
**Archivo:** `app/api/auth/register/route.ts`  
**Problema:** Después de registrarse exitosamente, el usuario no queda autenticado. Debe hacer un segundo request a `/api/auth/login`. El redirect a `/dashboard/onboarding` en el flujo documentado fallaría porque no hay cookie.  
**Fix:** Setear cookie `auth_token` en el response de registro (como lo hace login). ~30 minutos.

---

## Deuda Media (impacto UX/negocio)

### TD-009: pino instalado sin uso
**Archivos:** `lib/logger.ts`, `package.json`  
**Problema:** `pino` y `pino-pretty` están instalados pero `logger.ts` usa `console.log`. El logging en producción no es estructurado, no tiene niveles configurables, y no puede ser parseado por Vercel Log Drains o Datadog.  
**Fix:** Refactorizar `logger.ts` para usar pino (~2h) o eliminar pino y dejar el logger actual.

### TD-010: Plan limits no se aplican
**Archivos:** `lib/stripe.ts` (PLAN_LIMITS), todos los Route Handlers  
**Problema:** `PLAN_LIMITS` define `maxAgents`, `maxConversations`, etc. por plan, pero ningún endpoint verifica estos límites. Un tenant FREE puede crear agentes/contacts/leads ilimitados.  
**Fix:** Middleware de enforcement o checks en cada service. ~1 día.

### TD-011: Audit logs sin uso
**Archivos:** `prisma/schema.prisma` (AuditLog model), todos los services  
**Problema:** El modelo `AuditLog` existe en el schema pero nada escribe en él. Sin audit trail no hay compliance (GDPR, SOC2).  
**Fix:** Service `createAuditLog()` + calls en create/update/delete sensitivos. ~2 días.

### TD-012: `/dashboard/agents/new` no existe
**Archivo:** `app/dashboard/agents/page.tsx:26` (enlace a `/dashboard/agents/new`)  
**Problema:** Dos botones "New Agent" enlazan a una ruta que da 404.  
**Fix:** Crear `app/dashboard/agents/new/page.tsx` con formulario. ~1 día.

### TD-013: Anthropic SDK instalado sin ningún uso
**Evidencia:** `@anthropic-ai/sdk ^0.100.1` en package.json. Sin ningún import en el codebase.  
**Fix:** Crear el primer endpoint real de IA (`/api/agents/[id]/chat`) o documentar el sprint donde se conecta.

### TD-014: `autoprefixer` debe eliminarse
**Evidencia:** `autoprefixer ^10.5.0` en devDependencies. Tailwind v4 incluye autoprefixer automáticamente.  
**Fix:** `npm uninstall autoprefixer`. 5 minutos.

### TD-015: Inconsistencia en design tokens
**Archivos:** `app/dashboard/agents/page.tsx` y otros  
**Problema:** Mezcla de CSS vars (`text-gold`, `bg-panel`) con hex directos (`text-[#D4AF37]`, `bg-[#0E0E0E]`). Dificulta theming y mantenimiento.  
**Fix:** Lint rule + replace manual. ~4 horas.

---

## Deuda Baja (calidad de código)

### TD-016: 7 errores ESLint en producción
- `no-explicit-any` en `declarations.d.ts` (5 instancias) y `app/api/pacientes/route.ts`
- `no-empty-object-type` en `components/layout/MegaMenu.tsx`
- `react/no-unescaped-entities` en 2 secciones marketing

### TD-017: Métodos CRUD incompletos en agentes
`DELETE /api/agents/:id` y `PUT /api/agents/:id` no existen. Solo GET y POST.

### TD-018: .env.example incompleto
Faltan en `.env.example`:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_BUSINESS_ACCOUNT_ID`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `SENTRY_DSN`

---

## Resumen de esfuerzo

| Categoría | Items | Esfuerzo estimado |
|-----------|-------|-------------------|
| Crítico (P0) | 3 items | ~1 día |
| Alto (P1) | 5 items | ~3 días |
| Medio (P2) | 7 items | ~2 semanas |
| Bajo (P3) | 3 items | ~2 días |
| **Total** | **18 items** | **~4 semanas** |
