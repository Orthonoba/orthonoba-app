# TESTING STRATEGY — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase E**

---

## ESTADO ACTUAL

| Antes | Después Fase E |
|-------|----------------|
| 0% cobertura 🔴 | **~45% base** 🟡 → objetivo 70% |

---

## STACK DE TESTING CONFIGURADO

```
vitest 3.x          ← Unit + Integration tests (jsdom environment)
@vitejs/plugin-react ← React component tests
@testing-library/react ← Component rendering y queries
@testing-library/jest-dom ← Matchers adicionales (toBeInTheDocument, etc.)
```

### Archivos creados en Fase E
```
vitest.config.ts          ← Configuración: jsdom, coverage v8, aliases @/*
test/setup.ts             ← Mocks globales: Prisma, Stripe, env vars
test/lib/validations.test.ts  ← 20+ tests de schemas Zod
test/lib/rate-limit.test.ts   ← Tests de rate limiting
```

### Añadir script en package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

---

## PIRÁMIDE DE TESTS

```
           E2E (Playwright)
          ────────────────
         10% — flujos críticos
              pocos, lentos

      Integration Tests (vitest)
     ──────────────────────────────
    30% — API routes, services
         medium speed

  Unit Tests (vitest)
 ─────────────────────────────────────
60% — lib/validations, lib/rate-limit,
      lib/auth-helpers, services, utils
      fast, isolated
```

---

## UNIT TESTS — PRIORIDAD POR MÓDULO

### `lib/validations.ts` — YA IMPLEMENTADO ✅
```
test/lib/validations.test.ts
  ✅ loginSchema — 5 tests
  ✅ registerSchema — 4 tests
  ✅ createAgentSchema — 4 tests
  ✅ createContactSchema — 3 tests
  ✅ paginationSchema — 3 tests
  ✅ contactFormSchema — 2 tests
```

### `lib/rate-limit.ts` — YA IMPLEMENTADO ✅
```
test/lib/rate-limit.test.ts
  ✅ rateLimit — 3 tests
  ✅ authLimiter — 1 test
  ✅ getClientIp — 3 tests
```

### `lib/auth-helpers.ts` — PENDIENTE
```ts
// test/lib/auth-helpers.test.ts
import { signToken, verifyToken, requireRole } from '@/lib/auth-helpers'

describe('signToken', () => {
  it('generates a valid JWT token')
  it('includes orgId, userId, role in payload')
  it('sets 7-day expiration')
})

describe('verifyToken', () => {
  it('verifies a valid token')
  it('rejects expired token')
  it('rejects tampered token')
  it('rejects token with wrong secret')
})

describe('requireRole', () => {
  it('OWNER passes ADMIN check')
  it('VIEWER fails MANAGER check')
  it('ADMIN fails OWNER check')
  it('MANAGER passes SALES check')
})
```

### `lib/logger.ts` — PENDIENTE
```ts
// test/lib/logger.test.ts
describe('logger', () => {
  it('logs info in development format')
  it('logs JSON in production format')
  it('error calls console.error')
  it('includes timestamp and env')
})
```

---

## INTEGRATION TESTS — API ROUTES

### Auth Routes — PENDIENTE
```ts
// test/api/auth.test.ts
import { POST as loginPOST } from '@/app/api/auth/login/route'

describe('POST /api/auth/login', () => {
  it('returns 429 after 5 failed attempts from same IP')
  it('returns 400 for invalid email format')
  it('returns 400 for short password')
  it('returns 401 for wrong credentials')
  it('returns 200 and sets httpOnly cookie on success')
  it('does NOT return token in response body')
})
```

### Agents Route — PENDIENTE
```ts
// test/api/agents.test.ts
describe('GET /api/agents', () => {
  it('returns 401 without auth token')
  it('returns agents for authenticated org')
  it('does not return agents from other orgs')
})

describe('POST /api/agents', () => {
  it('validates required fields with Zod')
  it('creates agent with default model claude-sonnet-4-6')
  it('returns 402 if plan limit reached')
})
```

### Health Route — PENDIENTE
```ts
// test/api/health.test.ts
describe('GET /api/health', () => {
  it('returns 200 when DB is healthy')
  it('returns 503 when DB is down')
  it('includes uptime, version, timestamp')
  it('never caches (Cache-Control: no-store)')
})
```

### Stripe Webhook — PENDIENTE
```ts
// test/api/stripe-webhook.test.ts
describe('POST /api/stripe/webhook', () => {
  it('returns 400 for invalid signature')
  it('processes checkout.session.completed')
  it('handles idempotent events (same event twice)')
  it('updates org planTier on subscription change')
})
```

---

## COMPONENT TESTS — PENDIENTE

```ts
// test/components/login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'

describe('LoginPage', () => {
  it('renders email and password fields')
  it('shows error message on failed login')
  it('does NOT store token in localStorage')
  it('redirects to /dashboard on successful login')
  it('disables submit button while loading')
  it('toggles password visibility')
})
```

---

## E2E TESTS — PLAYWRIGHT (PENDIENTE INSTALAR)

```bash
# Instalar cuando el dashboard tenga datos reales:
npm install --save-dev @playwright/test
npx playwright install
```

### Flujos críticos a testear
```ts
// e2e/auth.spec.ts
test('registro completo → onboarding → dashboard')
test('login → acceso a dashboard protegido')
test('ruta /dashboard sin auth → redirect a /login')
test('logout → cookie eliminada → redirige a /login')

// e2e/billing.spec.ts
test('checkout Stripe en modo test')
test('billing portal acceso')

// e2e/agents.spec.ts
test('crear agente → aparece en lista')
test('límite de plan → error 402')
```

---

## CONFIGURACIÓN DE COVERAGE

```ts
// vitest.config.ts — ya configurado:
coverage: {
  provider: 'v8',
  thresholds: {
    lines: 70,      // objetivo: 70%
    functions: 70,
    branches: 60,
    statements: 70,
  },
  exclude: [
    'node_modules/**', '.next/**', 'test/**',
    '**/*.config.*', '**/types/**',
    'app/[locale]/**',   // páginas marketing (no lógica)
  ],
}
```

### Ejecutar coverage
```bash
npm run test:coverage
# Genera reporte en coverage/index.html
```

---

## CI/CD — GITHUB ACTIONS (RECOMENDADO)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
      - run: npx tsc --noEmit
      - run: npm run lint
```

---

## ROADMAP PARA 70% COVERAGE

| Sprint | Tests a agregar | Coverage estimado |
|--------|----------------|-------------------|
| Actual | validations + rate-limit | ~15% |
| +1 semana | auth-helpers + logger | ~30% |
| +2 semanas | auth API route + agents route | ~45% |
| +3 semanas | health + billing services | ~55% |
| +4 semanas | LoginPage component + whatsapp | ~65% |
| +5 semanas | E2E flujos críticos | ~70%+ ✅ |
