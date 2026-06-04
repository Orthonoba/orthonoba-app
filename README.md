# ORTHONOBA.APP — AI Business Operating System

Multi-tenant SaaS B2B platform combining AI agents, CRM, workflow automation, and subscription billing.

**Build status:** ✅ Passing  
**Score:** 63/100 (post Sprint 1) → 85/100 target (MVP)  
**Stack:** Next.js 16 · React 19 · TypeScript 6 · Prisma 5 · Neon PostgreSQL · Stripe · Anthropic Claude

---

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# → Fill in all required variables (see .env.example)

# Database
npx prisma migrate dev

# Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site.  
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the platform (requires login).

---

## Commands

```bash
npm run dev           # Development server
npm run build         # Production build (prisma generate + next build)
npm run type-check    # TypeScript check (tsc --noEmit)
npm run lint          # ESLint
npm run test          # Vitest watch mode
npm run test:run      # Vitest single run
npm run test:coverage # Coverage with thresholds

# Database
npx prisma studio
npx prisma migrate dev --name <description>
npx prisma migrate deploy   # Production

# Clear Next.js cache (Windows)
Remove-Item -Recurse -Force .next
```

---

## Architecture

```
app/
├── (auth)/          → Login, Register, Forgot Password
├── [locale]/        → Marketing site (it/de/fr/en)
├── dashboard/       → Protected platform UI
└── api/             → Route Handlers (Node.js runtime)

services/            → Business logic (auth, billing, agents, whatsapp)
lib/                 → Utilities (auth-helpers, prisma, stripe, validations)
components/          → UI components (ui/, layout/, sections/, dashboard/)
prisma/schema.prisma → 665-line multi-tenant schema
```

**Authentication:** JWT via jose · httpOnly cookie · Edge middleware guard  
**Multi-tenant:** organizationId isolation in every query · RBAC (8 roles)  
**Payments:** Stripe checkout + portal + webhooks with HMAC + idempotency  
**Error tracking:** Sentry (configure `SENTRY_DSN` to activate)

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Min 32 chars — signs auth tokens |
| `STRIPE_SECRET_KEY` | ✅ | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `ANTHROPIC_API_KEY` | ✅ | Claude API key |
| `SENTRY_DSN` | Recommended | Error tracking (server-side) |
| `NEXT_PUBLIC_SENTRY_DSN` | Recommended | Error tracking (client-side) |
| `UPSTASH_REDIS_REST_URL` | Sprint 2 | Distributed rate limiting |
| `RESEND_API_KEY` | Sprint 4 | Transactional email |

See `.env.example` for the complete list.

---

## Sprint Status

| Sprint | Status | Score delta |
|--------|--------|-------------|
| S1 — Build & Foundations | ✅ Complete | 53 → 63 |
| S2 — Security & Observability | ⏳ Pending | 63 → 72 |
| S3 — Dashboard Funcional | ⏳ Pending | 72 → 78 |
| S4 — IA Real + WhatsApp + Email | ⏳ Pending | 78 → 85 |
| S5 — Enterprise Grade | ⏳ Pending | 85 → 95 |

See `docs/ROADMAP_2026.md` for the full plan.  
See `docs/SPRINT1_COMPLETION_REPORT.md` for Sprint 1 details.

---

## Security Rules (non-negotiable)

1. **NEVER** store JWT in localStorage — httpOnly cookie only
2. **NEVER** `git push --force` to `main`
3. **NEVER** `prisma migrate reset` in production
4. **ALWAYS** include `organizationId` in every tenant data query
5. **ALWAYS** validate with Zod at external-facing endpoints

See `CLAUDE.md` for complete rules and architecture documentation.
