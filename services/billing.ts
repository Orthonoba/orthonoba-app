import { stripe, PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type { PlanTier, SubscriptionStatus } from "@prisma/client";
import type Stripe from "stripe";

// ── Subscription Service ─────────────────────────────────────────────────────

export async function getOrCreateStripeCustomer(organizationId: string): Promise<string> {
  const org = await prisma.organization.findUniqueOrThrow({
    where: { id: organizationId },
  });

  if (org.billingCustomerId) return org.billingCustomerId;

  const customer = await stripe.customers.create({
    email: org.billingEmail ?? undefined,
    name: org.name,
    metadata: { organizationId },
  });

  await prisma.organization.update({
    where: { id: organizationId },
    data: { billingCustomerId: customer.id },
  });

  return customer.id;
}

export async function createCheckoutSession(
  organizationId: string,
  planId: keyof typeof PLANS,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  const plan = PLANS[planId];
  if (!plan?.priceId) throw new Error(`Invalid plan: ${planId}`);

  const customerId = await getOrCreateStripeCustomer(organizationId);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: plan.priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { organizationId, planId },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { organizationId, planId },
  });

  return session.url!;
}

export async function createPortalSession(
  organizationId: string,
  returnUrl: string
): Promise<string> {
  const customerId = await getOrCreateStripeCustomer(organizationId);

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session.url;
}

export async function getSubscription(organizationId: string) {
  return prisma.subscription.findUnique({
    where: { organizationId },
  });
}

// ── Webhook Handlers ─────────────────────────────────────────────────────────

async function upsertSubscription(
  stripeSubscription: Stripe.Subscription,
  organizationId: string
) {
  const planId = stripeSubscription.metadata?.planId as PlanTier | undefined;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: stripeSubscription.id },
    create: {
      organizationId,
      stripeSubscriptionId: stripeSubscription.id,
      stripePriceId: stripeSubscription.items.data[0]?.price.id ?? "",
      stripeCustomerId: stripeSubscription.customer as string,
      plan: planId ?? "STARTER",
      status: stripeSubscription.status.toUpperCase() as SubscriptionStatus,
      currentPeriodStart: new Date((stripeSubscription.items.data[0]?.current_period_start ?? 0) * 1000),
      currentPeriodEnd: new Date((stripeSubscription.items.data[0]?.current_period_end ?? 0) * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      trialEndsAt: stripeSubscription.trial_end
        ? new Date(stripeSubscription.trial_end * 1000)
        : null,
    },
    update: {
      status: stripeSubscription.status.toUpperCase() as SubscriptionStatus,
      stripePriceId: stripeSubscription.items.data[0]?.price.id ?? "",
      plan: planId ?? "STARTER",
      currentPeriodStart: new Date((stripeSubscription.items.data[0]?.current_period_start ?? 0) * 1000),
      currentPeriodEnd: new Date((stripeSubscription.items.data[0]?.current_period_end ?? 0) * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      trialEndsAt: stripeSubscription.trial_end
        ? new Date(stripeSubscription.trial_end * 1000)
        : null,
    },
  });

  if (planId) {
    await prisma.organization.update({
      where: { id: organizationId },
      data: { plan: planId },
    });
  }
}

export async function handleCheckoutCompleted(event: Stripe.CheckoutSessionCompletedEvent) {
  const session = event.data.object;
  if (session.mode !== "subscription") return;

  const organizationId = session.metadata?.organizationId;
  if (!organizationId) return;

  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  await upsertSubscription(subscription, organizationId);
}

export async function handleSubscriptionUpdated(event: Stripe.CustomerSubscriptionUpdatedEvent) {
  const subscription = event.data.object;
  const organizationId = subscription.metadata?.organizationId;
  if (!organizationId) return;
  await upsertSubscription(subscription, organizationId);
}

export async function handleSubscriptionDeleted(event: Stripe.CustomerSubscriptionDeletedEvent) {
  const subscription = event.data.object;

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: "CANCELED",
      canceledAt: new Date(),
    },
  });

  const organizationId = subscription.metadata?.organizationId;
  if (organizationId) {
    await prisma.organization.update({
      where: { id: organizationId },
      data: { plan: "FREE" },
    });
  }
}

export async function handleInvoiceSucceeded(event: Stripe.InvoicePaymentSucceededEvent) {
  const invoice = event.data.object;
  const customerId = invoice.customer as string;

  const org = await prisma.organization.findFirst({
    where: { billingCustomerId: customerId },
  });
  if (!org) return;

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      organizationId: org.id,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "PAID",
      paidAt: invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : new Date(),
      hostedUrl: invoice.hosted_invoice_url,
      pdfUrl: invoice.invoice_pdf,
      periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
      periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
    },
    update: {
      status: "PAID",
      paidAt: invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : new Date(),
    },
  });
}

export async function handleInvoiceFailed(event: Stripe.InvoicePaymentFailedEvent) {
  const invoice = event.data.object;
  const customerId = invoice.customer as string;

  const org = await prisma.organization.findFirst({
    where: { billingCustomerId: customerId },
  });
  if (!org) return;

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      organizationId: org.id,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "OPEN",
      periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
      periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
    },
    update: { status: "OPEN" },
  });

  await prisma.subscription.updateMany({
    where: { organizationId: org.id },
    data: { status: "PAST_DUE" },
  });
}
