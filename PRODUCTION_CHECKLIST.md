# PRODUCTION CHECKLIST — ORTHONOBA

Use this checklist before going live. Every item must be confirmed.

---

## 1. ENVIRONMENT VARIABLES

Set these in Vercel → Project → Settings → Environment Variables.

### Required

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string | Neon dashboard → Project → Connection Details |
| `JWT_SECRET` | Random string ≥ 64 chars | `openssl rand -base64 64` |
| `STRIPE_SECRET_KEY` | Live key (starts with `sk_live_`) | Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe dashboard → Webhooks → Endpoint → Signing secret |
| `STRIPE_PRICE_STARTER` | Live price ID for Starter plan | Stripe dashboard → Products |
| `STRIPE_PRICE_PROFESSIONAL` | Live price ID for Professional plan | Stripe dashboard → Products |
| `STRIPE_PRICE_BUSINESS` | Live price ID for Business plan | Stripe dashboard → Products |
| `NEXT_PUBLIC_APP_URL` | Production URL | e.g. `https://app.orthonoba.com` |
| `NEXT_PUBLIC_APP_DOMAIN` | Root domain | e.g. `orthonoba.com` |

### WhatsApp (if enabled)

| Variable | Description |
|---|---|
| `WHATSAPP_VERIFY_TOKEN` | Token you define; must match what you set in Meta App Dashboard |

---

## 2. NEON (DATABASE)

- [ ] Create production project (not free tier — use a paid plan for prod)
- [ ] Enable connection pooling (use the pooled connection string)
- [ ] Run all migrations: `npx prisma migrate deploy`
- [ ] Verify with: `npx prisma db pull` — schema should match
- [ ] Enable automated backups in Neon dashboard
- [ ] Set IP allowlist or use Neon's built-in security
- [ ] Test connection from Vercel: deploy once and check logs

---

## 3. STRIPE

- [ ] Complete Stripe account activation (business details, bank account)
- [ ] Create products and prices in **Live** mode (not Test mode)
  - Starter — €97/month
  - Professional — €297/month
  - Business — €697/month
- [ ] Enable 14-day trial in each price or in the checkout session
- [ ] Create webhook endpoint pointing to: `https://app.orthonoba.com/api/stripe/webhook`
- [ ] Subscribe webhook to these events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- [ ] Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`
- [ ] Enable Stripe billing portal:
  - Go to Stripe → Settings → Billing → Customer portal
  - Enable portal and configure allowed actions
- [ ] Test a real checkout flow end-to-end (use a real card in live mode with a €0 test charge)

---

## 4. VERCEL

- [ ] Connect GitHub repo to Vercel project
- [ ] Set **Production branch** to `main`
- [ ] Set **Framework preset** to Next.js
- [ ] Add all environment variables (see section 1)
- [ ] Set **Node.js version** to 20.x
- [ ] Enable **Serverless function region** closest to Neon (usually `iad1` for US East or `fra1` for Europe)
- [ ] Configure custom domain: `app.orthonoba.com`
- [ ] Enable automatic HTTPS (Vercel does this by default)
- [ ] Test deploy: push to main → verify build passes
- [ ] Verify `/api/health` or any route returns 200

---

## 5. WHATSAPP CLOUD API

- [ ] Create Meta Business account at business.facebook.com
- [ ] Create a Meta App (Business type)
- [ ] Add WhatsApp product to the app
- [ ] Register a WhatsApp Business phone number
- [ ] Generate a System User token with `whatsapp_business_messaging` permission
- [ ] Configure webhook:
  - URL: `https://app.orthonoba.com/api/whatsapp/webhook`
  - Verify token: same as `WHATSAPP_VERIFY_TOKEN` env var
  - Subscribe to: `messages`
- [ ] Test inbound message → verify it appears in Orthonoba dashboard

---

## 6. SECURITY

- [ ] `JWT_SECRET` is at least 64 characters and truly random
- [ ] `auth_token` cookie is `httpOnly: true` and `secure: true` in production ✓ (already set)
- [ ] Stripe webhook signature verification is enabled ✓ (already in webhook route)
- [ ] WhatsApp webhook verify token is set and checked ✓ (already in webhook route)
- [ ] No secrets committed to git (check `.env.local` is in `.gitignore`)
- [ ] `STRIPE_SECRET_KEY` uses `sk_live_` not `sk_test_`
- [ ] Verify rate limiting on auth routes (consider adding next-rate-limit)
- [ ] CORS is not open on API routes (Next.js default is fine)

---

## 7. DATABASE

- [ ] Run `npx prisma migrate deploy` on production DB
- [ ] Verify all tables exist: `npx prisma studio` (or query Neon directly)
- [ ] Confirm no pending migrations: `npx prisma migrate status`
- [ ] Test user registration creates all required records (User + Organization + OrganizationMember)

---

## 8. FINAL SMOKE TEST

After deploying to production:

- [ ] Register a new user → receives cookie → lands on onboarding
- [ ] Complete onboarding step 1 (organization profile)
- [ ] Select plan → Stripe checkout opens → complete payment
- [ ] Return to onboarding step 3 → create agent
- [ ] WhatsApp step → skip or connect
- [ ] Reach `/dashboard/onboarding/complete`
- [ ] Navigate to `/dashboard` → all sections load
- [ ] `/dashboard/billing` shows active subscription
- [ ] Send a WhatsApp test message → verify it appears in conversations

---

## STATUS LEGEND

- [ ] Not started
- [x] Done
