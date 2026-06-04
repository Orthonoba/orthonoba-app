import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  _stripe = new Stripe(key, { apiVersion: "2026-05-27.dahlia", typescript: true });
  return _stripe;
}

export type PlanConfig = {
  id: string;
  name: string;
  priceId: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  limits: {
    agents: number;
    conversations: number;
    contacts: number;
    automations: number;
    whatsappMessages: number;
  };
};

export const PLANS: Record<string, PlanConfig> = {
  STARTER: {
    id: "STARTER",
    name: "Starter",
    priceId: process.env.STRIPE_PRICE_STARTER ?? "",
    price: 97,
    currency: "eur",
    interval: "month",
    features: [
      "1 AI Agent",
      "500 conversations/month",
      "1,000 contacts",
      "5 automations",
      "Web chat",
      "Email support",
    ],
    limits: {
      agents: 1,
      conversations: 500,
      contacts: 1000,
      automations: 5,
      whatsappMessages: 0,
    },
  },
  PROFESSIONAL: {
    id: "PROFESSIONAL",
    name: "Professional",
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL ?? "",
    price: 297,
    currency: "eur",
    interval: "month",
    features: [
      "5 AI Agents",
      "5,000 conversations/month",
      "10,000 contacts",
      "25 automations",
      "WhatsApp integration",
      "Voice agents",
      "Priority support",
    ],
    limits: {
      agents: 5,
      conversations: 5000,
      contacts: 10000,
      automations: 25,
      whatsappMessages: 2000,
    },
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Business",
    priceId: process.env.STRIPE_PRICE_BUSINESS ?? "",
    price: 697,
    currency: "eur",
    interval: "month",
    features: [
      "20 AI Agents",
      "25,000 conversations/month",
      "Unlimited contacts",
      "Unlimited automations",
      "Full WhatsApp platform",
      "Voice & SMS",
      "CRM sync",
      "Dedicated support",
    ],
    limits: {
      agents: 20,
      conversations: 25000,
      contacts: -1,
      automations: -1,
      whatsappMessages: 10000,
    },
  },
  ENTERPRISE: {
    id: "ENTERPRISE",
    name: "Enterprise",
    priceId: process.env.STRIPE_PRICE_ENTERPRISE ?? "",
    price: 0,
    currency: "eur",
    interval: "month",
    features: [
      "Unlimited agents",
      "Unlimited conversations",
      "Unlimited contacts",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated CSM",
      "On-premise option",
    ],
    limits: {
      agents: -1,
      conversations: -1,
      contacts: -1,
      automations: -1,
      whatsappMessages: -1,
    },
  },
};
