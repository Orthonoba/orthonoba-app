# ORTHONOBA — ROADMAP 2026
**Actualizado:** 2026-06-04  
**Basado en:** FINAL_AUDIT_REPORT_V1 + TECHNICAL_DEBT_REPORT  
**Score actual:** 53/100 → Objetivo: 85/100 (MVP) → 95/100 (Enterprise)

---

## SPRINT 1 — Fundamentos Rotos (Semana actual)
**Objetivo:** El build pasa, el proyecto es deployable  
**Duración estimada:** 3–5 días  
**Riesgo:** BAJO (cambios quirúrgicos)  
**ROI:** CRÍTICO — sin esto, nada más importa

| ID | Tarea | Horas | Prioridad |
|----|-------|-------|-----------|
| S1-01 | Fix Zod v4: reemplazar `required_error` → `error` en `lib/validations.ts` | 0.5h | P0 |
| S1-02 | Fix `test/setup.ts`: quitar `NODE_ENV` readonly + añadir vitest types al tsconfig | 0.5h | P0 |
| S1-03 | Fix `npm run lint`: cambiar script a `eslint . --ext .ts,.tsx` | 0.2h | P0 |
| S1-04 | Fix ESLint 7 errores: any types, unescaped entities, empty interface | 1h | P0 |
| S1-05 | Eliminar `jsonwebtoken` / migrar `auth-helpers.ts` a jose completamente | 1.5h | P0 |
| S1-06 | `npm uninstall jsonwebtoken @types/jsonwebtoken autoprefixer` | 0.1h | P0 |
| S1-07 | Configurar Sentry: crear 3 config files + `.env` con `SENTRY_DSN` | 2h | P1 |
| S1-08 | Fix register route: setear cookie `auth_token` tras registro exitoso | 0.5h | P1 |
| S1-09 | Actualizar `.env.example` con todas las variables faltantes | 0.3h | P1 |

**Total Sprint 1:** ~6.6 horas  
**Score esperado post-Sprint 1:** 63/100

---

## SPRINT 2 — Seguridad & Observabilidad
**Objetivo:** Rate limiting real, WhatsApp HMAC, error tracking activo  
**Duración estimada:** 1 semana  
**Riesgo:** MEDIO (cambios en infraestructura)  
**ROI:** ALTO — protege contra ataques antes del launch

| ID | Tarea | Horas | Prioridad |
|----|-------|-------|-----------|
| S2-01 | Cablear Upstash Redis en `lib/rate-limit.ts` (ya instalado) | 2h | P0 |
| S2-02 | Añadir `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` a .env.example | 0.2h | P0 |
| S2-03 | Agregar HMAC Meta verification en `app/api/whatsapp/webhook/route.ts` | 1h | P0 |
| S2-04 | Autenticar `/api/health` o eliminar env vars info del response público | 0.5h | P1 |
| S2-05 | Migrar `logger.ts` para usar pino (producción JSON, dev pretty) | 2h | P1 |
| S2-06 | Reemplazar `console.error/log` por `logger` en todos los route handlers | 1.5h | P1 |
| S2-07 | Añadir `plan limits` enforcement en `POST /api/agents` (check maxAgents) | 1h | P1 |
| S2-08 | CSP: eliminar `'unsafe-eval'`, usar nonces o hash-based CSP | 2h | P2 |
| S2-09 | Crear CI/CD: `.github/workflows/ci.yml` (build + lint + typecheck + test) | 3h | P1 |
| S2-10 | Eliminar `pino` y `pino-pretty` si se opta por logger propio | 0.1h | P2 |

**Total Sprint 2:** ~13.3 horas  
**Score esperado post-Sprint 2:** 72/100

---

## SPRINT 3 — Dashboard Funcional (Primera pantalla con datos reales)
**Objetivo:** Al menos agents list, contacts, leads y analytics con datos reales  
**Duración estimada:** 2 semanas  
**Riesgo:** MEDIO (nuevas features + DB queries)  
**ROI:** MUY ALTO — primera versión usable por clientes reales

| ID | Tarea | Horas | Prioridad |
|----|-------|-------|-----------|
| S3-01 | Crear `app/dashboard/agents/new/page.tsx` con form + POST `/api/agents` | 4h | P0 |
| S3-02 | Conectar agents list: `GET /api/agents` → renderizar lista real | 3h | P0 |
| S3-03 | Crear `DELETE/PUT /api/agents/:id` + editar/borrar en UI | 4h | P1 |
| S3-04 | Crear `GET/POST /api/contacts` + página `/dashboard/contacts` | 5h | P1 |
| S3-05 | Crear `GET/POST /api/leads` + página `/dashboard/leads` | 5h | P1 |
| S3-06 | Dashboard overview: conectar KPIs a queries reales (Promise.all) | 3h | P1 |
| S3-07 | Agregar skeletons en todas las páginas con data fetching | 3h | P2 |
| S3-08 | Error boundaries en dashboard layout | 1.5h | P2 |
| S3-09 | Audit logs: service `createAuditLog()` + calls en agents/contacts/leads | 4h | P2 |
| S3-10 | Plan limits enforcement en contacts y leads | 1h | P2 |
| S3-11 | Unificar design tokens: eliminar hex hardcodeados, usar CSS vars | 2h | P3 |
| S3-12 | Analytics básico: `GET /api/analytics` con counts por período | 4h | P2 |
| S3-13 | Conectar analytics página con recharts | 3h | P2 |

**Total Sprint 3:** ~42.5 horas (~5.3 días a 8h/día)  
**Score esperado post-Sprint 3:** 78/100

---

## SPRINT 4 — IA Real + WhatsApp + Email
**Objetivo:** Primer agente IA funcional, email transaccional, WhatsApp outbound  
**Duración estimada:** 2 semanas  
**Riesgo:** ALTO (integraciones externas, streaming)  
**ROI:** MUY ALTO — esto es el core product diferenciador

| ID | Tarea | Horas | Prioridad |
|----|-------|-------|-----------|
| S4-01 | Conectar Anthropic SDK: endpoint `POST /api/agents/:id/chat` con streaming | 8h | P0 |
| S4-02 | UI chat en `/dashboard/conversations/:id` con streaming response | 6h | P0 |
| S4-03 | Instalar `resend`, crear `services/email.ts`, implementar forgot-password | 6h | P1 |
| S4-04 | Email verification flow: token, verify endpoint, UI | 5h | P1 |
| S4-05 | WhatsApp outbound: implementar `sendWhatsAppMessage` con env vars | 3h | P1 |
| S4-06 | Conversations list UI: `/dashboard/conversations` con datos reales | 4h | P1 |
| S4-07 | Cost tracking: poblar `ConversationMessage.cost` con tokens Anthropic | 2h | P2 |
| S4-08 | Feature flags: cablear `@vercel/flags` para agent features por plan | 4h | P2 |
| S4-09 | RLS en Neon: policies por organizationId en tablas sensibles | 8h | P2 |
| S4-10 | Invitation system: invitar miembros al org, accept token | 6h | P3 |

**Total Sprint 4:** ~52 horas (~6.5 días)  
**Score esperado post-Sprint 4:** 85/100 (MVP)

---

## SPRINT 5 — Enterprise Grade
**Objetivo:** SOC2-ready, Voice AI, automations, multi-workspace  
**Duración estimada:** 4–6 semanas  
**Riesgo:** MUY ALTO (Twilio, ElevenLabs, automatizaciones complejas)  
**ROI:** ALTO para enterprise, no crítico para first customers

| ID | Tarea | Horas | Prioridad |
|----|-------|-------|-----------|
| S5-01 | Voice AI: Twilio + ElevenLabs TTS + transcript storage | 20h | P1 |
| S5-02 | Automations engine: trigger/action execution real | 20h | P1 |
| S5-03 | Neon RLS completo en todas las tablas | 12h | P1 |
| S5-04 | GDPR: data export, data deletion, consent tracking | 10h | P1 |
| S5-05 | SOC2: audit logs completos, change tracking, session management | 16h | P2 |
| S5-06 | E2E tests con Playwright: critical flows (auth, billing, chat) | 12h | P2 |
| S5-07 | Performance: lazy loading, React.Suspense, ISR en marketing pages | 8h | P2 |
| S5-08 | Multi-workspace UI completa | 10h | P3 |
| S5-09 | Advanced analytics: recharts dashboards, CSV export | 8h | P3 |
| S5-10 | Monitoring: Vercel Analytics + Web Vitals + custom metrics | 4h | P3 |

**Total Sprint 5:** ~120 horas (~3 semanas a tiempo completo)  
**Score esperado post-Sprint 5:** 92–95/100 (Enterprise Grade)

---

## Timeline resumido

```
Semana 1:   Sprint 1 — Build roto → build limpio (53→63)
Semana 2:   Sprint 2 — Seguridad real + CI/CD (63→72)
Semanas 3-4: Sprint 3 — Dashboard con datos reales (72→78)
Semanas 5-6: Sprint 4 — IA + Email + WhatsApp (78→85) ← MVP Launch
Semanas 7-12: Sprint 5 — Enterprise Grade (85→95)
```

---

## Métricas de impacto por sprint

| Sprint | Bloqueadores resueltos | Features nuevas | Riesgo eliminado |
|--------|----------------------|-----------------|------------------|
| S1 | Build, Deploy | 0 | Build failure |
| S2 | Rate limit bypass, sin observabilidad | CI/CD | Ataques auth, errores silenciosos |
| S3 | Dashboard 100% placeholder | Agents CRUD, Contacts, Leads, Analytics | Churn por falta de UX |
| S4 | IA desconectada, email stub | Chat IA, Forgot-pw, WhatsApp | Core product no funciona |
| S5 | Enterprise compliance | Voice, Automations, GDPR | Ventas enterprise bloqueadas |
