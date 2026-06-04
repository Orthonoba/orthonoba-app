# LAUNCH CHECKLIST — ORTHONOBA

The go-live sequence. Do this in order on launch day.

---

## PRE-LAUNCH (day before)

- [ ] All items in `PRODUCTION_CHECKLIST.md` are complete
- [ ] Final build passes locally: `npm run build`
- [ ] TypeScript passes: `npx tsc --noEmit`
- [ ] ESLint passes: `npm run lint`
- [ ] Staging environment tested end-to-end (if you have one)
- [ ] Domain DNS propagated: `app.orthonoba.com` → Vercel
- [ ] SSL certificate active (verify green lock in browser)

---

## LAUNCH DAY

### Step 1 — Deploy
- [ ] Merge final code to `main`
- [ ] Vercel build completes without errors
- [ ] Check Vercel function logs — no runtime errors

### Step 2 — Database
- [ ] Confirm `npx prisma migrate deploy` ran (or run it now)
- [ ] Test DB connection: register a user from production URL

### Step 3 — Payments
- [ ] Do a real €0.01 test checkout in live Stripe mode
- [ ] Verify subscription created in Stripe dashboard
- [ ] Verify subscription appears in Orthonoba billing page
- [ ] Verify Stripe webhook received (Stripe dashboard → Webhooks → logs)
- [ ] Refund the test charge

### Step 4 — WhatsApp
- [ ] Send a test WhatsApp to your number
- [ ] Message appears in `/dashboard/conversations`
- [ ] Auto-lead created in `/dashboard/leads`

### Step 5 — Onboarding
- [ ] Register a fresh user (not your admin account)
- [ ] Walk through all 5 onboarding steps
- [ ] Confirm redirect to `/dashboard` after completion
- [ ] Verify dashboard shows correct plan and agent

---

## FIRST CUSTOMER ONBOARDING FLOW

This is the zero-touch path for a new customer:

```
1. Lands on homepage → CTA → /register
2. Fills name + email + password → account created
3. Auto-redirected to /dashboard/onboarding
4. Step 1: Selects industry → Continue
5. Step 2: Selects plan → Stripe checkout (14-day trial)
6. Stripe payment complete → returns to /dashboard/onboarding/agent
7. Step 3: Chooses agent type + name → Create Agent
8. Step 4: Enters WhatsApp credentials OR skips
9. Step 5: Complete → Go to Dashboard
10. Customer is live, agent is active, subscription running
```

**Time to complete: ~3 minutes**
**Manual intervention required: 0**

---

## MONITORING

### What to watch on day 1:

- **Vercel logs** — `/dashboard` → Functions → Logs
- **Stripe webhooks** — Stripe Dashboard → Developers → Webhooks → your endpoint
- **Neon metrics** — Neon Dashboard → Monitoring (connection count, query latency)
- **Error rate** — any 500s in Vercel function logs

### Key metrics to track week 1:

| Metric | Target | Where |
|---|---|---|
| Registrations | ≥ 1/day | Neon: `SELECT count(*) FROM platform_users` |
| Onboarding completion | ≥ 60% | Neon: count users with agents |
| Stripe trials started | ≥ 1/day | Stripe dashboard |
| WhatsApp messages received | > 0 | Neon: `whats_app_messages` table |
| Subscription conversion | ≥ 30% of trials | Stripe dashboard |

---

## SUPPORT SETUP

Before launch:

- [ ] Create `support@orthonoba.app` email (or forward to your inbox)
- [ ] Create `sales@orthonoba.app` email
- [ ] Set up a simple helpdesk (Notion, Linear, or even a shared inbox)
- [ ] Prepare 3 canned responses: welcome, billing help, WhatsApp setup

---

## ROLLBACK PLAN

If something breaks after launch:

1. Check Vercel logs for the error
2. If DB issue: connect to Neon directly and inspect
3. If Stripe issue: check webhook logs in Stripe dashboard
4. If code issue: revert to previous deployment in Vercel (1 click)
5. If data corrupted: restore from Neon backup

**Vercel rollback**: Vercel Dashboard → Deployments → pick previous → Promote to Production

---

## POST-LAUNCH (first week)

- [ ] Monitor error rate daily
- [ ] Follow up with first customers personally
- [ ] Check if any users drop off in the onboarding funnel
- [ ] Gather feedback on the onboarding experience
- [ ] Fix any blocking bugs within 24 hours
- [ ] Plan FASE 9: first analytics, team invites, advanced agent config
