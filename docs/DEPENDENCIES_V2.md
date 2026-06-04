# DEPENDENCIES V2 — ORTHONOBA.APP
**Fecha:** 2026-06-04 | Análisis basado en código fuente real (37 archivos)

---

## RESUMEN EJECUTIVO

| Categoría                       | Cantidad | Estado |
|---------------------------------|----------|--------|
| Dependencias producción         | 22       | —      |
| Dependencias desarrollo         | 14       | —      |
| Activamente utilizadas          | 17       | ✅     |
| Confirmadas NO utilizadas       | 4        | 🔴     |
| Duplicadas / conflicto          | 7        | 🟠     |
| Críticas faltantes              | 5        | 🔴     |
| Opcionales recomendadas         | 6        | 🟡     |

---

## ANÁLISIS COMPLETO POR PAQUETE

### FRAMEWORK Y CORE

#### `next` ^16.2.4
- **Estado:** ✅ Activo — framework principal
- **Uso real:** App Router, Route Handlers, `next/font` (Inter), `next-intl` plugin
- **Notas:** `module.exports` en `next.config.ts` debería ser `export default`
- **Acción:** Ninguna (solo corregir el export)

#### `react` ^19.2.5 + `react-dom` ^19.2.5
- **Estado:** ✅ Activo
- **Uso real:** Todos los componentes
- **Notas:** React 19 features (`use()`, Server Actions, `useOptimistic`) no explotados aún
- **Oportunidad:** Usar `useFormStatus()` en auth forms, `useOptimistic()` en CRM

#### `typescript` 6.0.3 (devDep)
- **Estado:** ✅ Activo
- **Uso real:** Todo el proyecto — strict mode activo
- **Notas:** `ignoreDeprecations: "6.0"` en tsconfig requerido (ya presente)
- **Riesgo:** TS 6 es muy reciente — posibles edge cases en libs de terceros

---

### BASE DE DATOS

#### `@prisma/client` ^5.22.0 + `prisma` ^5.22.0
- **Estado:** ✅ Activo — ORM principal
- **Uso real:** `lib/prisma.ts` singleton, todos los `services/`, todos los API routes
- **Patrón correcto:** Singleton con `global.__prisma` para hot-reload en dev
- **Notas:** Prisma 6.x disponible — migración recomendada en Q3 2026
- **Pool config:** `lib/db.ts` usa `pg` directamente con pool max 5 para serverless

#### `pg` ^8.20.0 + `@types/pg` ^8.20.0
- **Estado:** ⚠️ PARCIALMENTE USADO
- **Uso real:** Solo en `lib/db.ts` para pool de conexiones raw
- **Análisis:** `lib/db.ts` implementa un pool PostgreSQL directo para queries crudas. Coexiste con Prisma.
- **Decisión requerida:** Si las queries raw en `lib/db.ts` son necesarias → mantener `pg`. Si no → eliminar y usar Prisma para todo.
- **Acción:** Auditar si `lib/db.ts` tiene callers activos

---

### AUTENTICACIÓN Y SEGURIDAD

#### `jose` ^6.2.3
- **Estado:** ✅ ACTIVO — librería JWT principal
- **Uso real:** `lib/auth-helpers.ts` — `signToken()`, `verifyToken()`, `getAuthContext()`
- **Correcto:** Edge Runtime compatible, ES modules, Web Crypto API
- **Patrón:** JWT con `HS256`, expiración 7 días, cookie httpOnly
- **Versión Stripe en uso:** API `2026-05-27.dahlia`

#### `jsonwebtoken` ^9.0.3 + `@types/jsonwebtoken` ^9.0.10
- **Estado:** 🔴 NO UTILIZADO — ELIMINAR
- **Uso real:** 0 importaciones encontradas en código auditado
- **Evidencia:** Todo el JWT usa `jose`. `jsonwebtoken` usa CommonJS, no compatible con Edge
- **Acción inmediata:** `npm uninstall jsonwebtoken @types/jsonwebtoken`
- **Ahorro:** ~250KB en bundle

#### `bcrypt` ^6.0.0 + `@types/bcrypt` ^6.0.0
- **Estado:** ✅ Activo
- **Uso real:** `services/auth.ts` — `bcrypt.hash()` (10 rounds), `bcrypt.compare()`
- **Notas:** bcrypt 6.0.0 puede ser alpha. Verificar si es stable release.
- **Alternativa más moderna:** `bcryptjs` (puro JS, no requiere compilación nativa) o Argon2

---

### PAGOS

#### `stripe` ^22.2.0
- **Estado:** ✅ Activo — integración completa
- **Uso real:** `lib/stripe.ts`, `services/billing.ts`, todos los `app/api/stripe/*`
- **API Version usada:** `2026-05-27.dahlia` (última)
- **Patrón correcto:** Lazy-loaded singleton, webhook HMAC verification, event idempotency
- **Funcionalidades en uso:** Customers, Checkout Sessions, Subscriptions, Billing Portal, Webhooks, Invoices

#### `@stripe/stripe-js` ^9.7.0
- **Estado:** ✅ Activo (client-side)
- **Uso real:** Frontend para redirect a Stripe Checkout
- **FALTANTE CRÍTICO:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` no está en `.env.example`

---

### UI Y COMPONENTES

#### `shadcn` ^4.10.0
- **Estado:** ⚠️ CLI tool en producción
- **Uso real:** CLI para generar componentes
- **Problema:** Debería estar en `devDependencies`, no en `dependencies`
- **Acción:** `npm uninstall shadcn && npm install --save-dev shadcn`

#### `radix-ui` ^1.4.3
- **Estado:** ⚠️ CONFLICTO CON INDIVIDUALES
- **Uso real:** Paquete unificado Radix (nuevo)
- **Conflicto:** Coexiste con 5 paquetes `@radix-ui/*` individuales
- **Riesgo:** Versiones pueden diferir entre el unificado y los individuales

#### `@radix-ui/react-dialog` ^1.1.15
- **Estado:** ⚠️ POTENCIALMENTE DUPLICADO
- **Uso real:** `components/ui/dialog.tsx`
- **En `radix-ui` 1.4.3?** Verificar si ya incluido en el paquete unificado

#### `@radix-ui/react-dropdown-menu` ^2.1.16
- **Estado:** ⚠️ POTENCIALMENTE DUPLICADO
- **Uso real:** `components/ui/dropdown-menu.tsx`

#### `@radix-ui/react-select` ^2.2.6
- **Estado:** ⚠️ POTENCIALMENTE DUPLICADO
- **Uso real:** Dashboard forms (pendiente verificar importaciones)

#### `@radix-ui/react-tabs` ^1.1.13
- **Estado:** ⚠️ POTENCIALMENTE DUPLICADO
- **Uso real:** `components/ui/tabs.tsx`

#### `@radix-ui/react-tooltip` ^1.2.8
- **Estado:** ⚠️ POTENCIALMENTE DUPLICADO
- **Uso real:** UI components (pendiente verificar)

#### `lucide-react` ^1.17.0
- **Estado:** ✅ Activo
- **Uso real:** Dashboard sidebar, topbar, componentes UI (icons)
- **Notas:** Versión 1.x es la nueva línea mayor de lucide-react. Compatible con React 19.

#### `class-variance-authority` ^0.7.1
- **Estado:** ✅ Activo — base de shadcn/ui
- **Uso real:** `components/ui/Button.tsx` y todos los componentes CVA

#### `clsx` ^2.1.1 + `tailwind-merge` ^3.6.0
- **Estado:** ✅ Activo — usados en `lib/utils.ts` → función `cn()`
- **Patrón:** `cn(...inputs)` = `twMerge(clsx(...inputs))`

#### `@heroicons/react` ^2.2.0
- **Estado:** ⚠️ Verificar uso
- **Uso real:** No detectado en los 37 archivos auditados. Posible en páginas marketing no auditadas.
- **Acción:** Grep para confirmar si hay importaciones activas

#### `recharts` ^3.8.1
- **Estado:** ✅ Presente (pendiente activación)
- **Uso real:** `app/dashboard/analytics/page.tsx` — dashboard con datos futuros
- **Notas:** Compatible con React 19

#### `tw-animate-css` ^1.4.0
- **Estado:** ✅ Activo
- **Uso real:** Importado en `app/globals.css` vía `@import "tw-animate-css"`

---

### INTERNACIONALIZACIÓN

#### `next-intl` ^4.13.0
- **Estado:** ✅ Activo — i18n completo
- **Uso real:** `src/i18n/`, `app/[locale]/layout.tsx`, `components/layout/Header.tsx`
- **Locales:** `it` (default), `de`, `fr`, `en`
- **Patrón:** `createNextIntlPlugin` en `next.config.ts`, `NextIntlClientProvider` en layout

---

### TAILWIND Y ESTILOS

#### `tailwindcss` ^4.3.0
- **Estado:** ✅ Activo
- **Config:** vía `@theme {}` en `app/globals.css` (correcto para v4)
- **Sin** `tailwind.config.ts` (correcto)

#### `@tailwindcss/postcss` ^4.2.2
- **Estado:** ✅ Activo — único plugin en `postcss.config.js`

#### `autoprefixer` ^10.5.0
- **Estado:** 🔴 NO UTILIZADO — ELIMINAR
- **Uso real:** NO está en `postcss.config.js`
- **Motivo:** Tailwind v4 incluye autoprefixing nativamente
- **Acción:** `npm uninstall autoprefixer`

---

### DEPENDENCIAS DE DESARROLLO

#### `eslint` ^9.39.4 + `eslint-config-next` ^16.2.4
- **Estado:** ✅ Activo — configurado en `eslint.config.mjs`

#### `dotenv` ^17.4.2
- **Estado:** ✅ Activo
- **Uso real:** Scripts de utilidad y configuración

#### `@types/node` 25.6.0
- **Estado:** ✅ Activo

#### `@types/react` ^19.2.14 + `@types/react-dom` ^19.2.3
- **Estado:** ✅ Activo

---

## DEPENDENCIAS CRÍTICAS FALTANTES

### 1. `zod` — CRÍTICO
```bash
npm install zod
```
- **Por qué:** CLAUDE.md dice "Validar inputs con Zod" pero NO está instalado
- **Impacto:** Los API routes validan inputs manualmente (propenso a bugs)
- **Uso inmediato:** Auth schemas, whatsapp schemas, agent schemas

### 2. `@anthropic-ai/sdk` — ALTO
```bash
npm install @anthropic-ai/sdk
```
- **Por qué:** `services/agents.ts` usa `model: "claude-sonnet-4-6"` pero sin SDK instalado
- **Evidencia:** Default en agents.ts = "claude-sonnet-4-6" — el SDK es necesario para llamadas reales
- **Impacto:** Los agentes no pueden hacer inferencia sin el SDK

### 3. `resend` — ALTO (o alternativa email)
```bash
npm install resend
```
- **Por qué:** Forgot-password tiene TODO sin implementar. Registration no verifica email.
- **Alternativas:** Nodemailer + SMTP, SendGrid, Postmark

### 4. `vitest` + `@testing-library/react` — CRÍTICO
```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```
- **Por qué:** 0% de cobertura de tests es bloqueante para producción enterprise

### 5. `@upstash/ratelimit` + `@upstash/redis` — ALTO
```bash
npm install @upstash/ratelimit @upstash/redis
```
- **Por qué:** Sin rate limiting, el endpoint `/api/auth/login` es vulnerable a brute force
- **Uso:** Edge middleware + route handlers de auth

---

## DEPENDENCIAS OPCIONALES RECOMENDADAS

| Paquete                   | Motivo                                        | Prioridad |
|---------------------------|-----------------------------------------------|-----------|
| `openai`                  | `OPENAI_API_KEY` en env.example pero no instalado | Cuando se use |
| `twilio`                  | Voice AI center (Fase 3)                      | Sprint 5  |
| `three` + `@types/three`  | Visor 3D STL/OBJ declarado pero no instalado  | Cuando se implemente |
| `@sentry/nextjs`          | Error tracking en producción                  | Sprint 12 |
| `sharp`                   | Optimización de imágenes con `next/image`     | Sprint 5  |

---

## PLAN DE LIMPIEZA RECOMENDADO

```bash
# PASO 1: Eliminar dependencias no utilizadas (sin riesgo)
npm uninstall jsonwebtoken @types/jsonwebtoken
npm uninstall autoprefixer

# PASO 2: Mover shadcn a devDependencies
npm uninstall shadcn
npm install --save-dev shadcn

# PASO 3: Agregar dependencias críticas faltantes
npm install zod @anthropic-ai/sdk resend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# PASO 4: Rate limiting (cuando se implemente middleware)
npm install @upstash/ratelimit @upstash/redis

# PASO 5: Verificar radix duplicados ANTES de tocar
# (requiere audit completo de imports en toda la codebase)
npx madge --circular --extensions ts,tsx .

# PASO 6: Limpiar según resultado del audit
# Si pg no tiene callers activos fuera de lib/db.ts:
#   Evaluar si mantener para queries raw o eliminar
```

---

## MATRIZ DE DECISIÓN: RADIX UI

El problema de duplicación Radix requiere una decisión estratégica:

| Opción | Ventaja | Riesgo |
|--------|---------|--------|
| **A:** Mantener solo `radix-ui` unificado | Un paquete, versiones consistentes | Puede romper imports `@radix-ui/*` existentes |
| **B:** Mantener solo `@radix-ui/*` individuales | Control granular de versiones | Más paquetes, posible drift de versiones |
| **C:** Mantener ambos (actual) | Sin cambios inmediatos | Duplicación, posibles conflictos de versión |

**Recomendación:** Opción A a largo plazo. Verificar primero con `grep -r "@radix-ui" --include="*.tsx"` para mapear todos los imports y migrarlos al paquete unificado.
