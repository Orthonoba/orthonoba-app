import { NextResponse } from "next/server";
import { getRequestAuth } from "@/lib/auth-helpers";
import { createAgent, listAgents } from "@/services/agents";
import { createAgentSchema } from "@/lib/validations";
import { PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type { PlanTier } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAgentLimit(plan: PlanTier): number {
  const planKey = plan as string
  const limits = PLANS[planKey]?.limits
  if (!limits) return 1           // FREE / unknown → 1 agent
  return limits.agents            // -1 means unlimited
}

export async function GET(req: Request) {
  const ctx = await getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agents = await listAgents(ctx.organizationId);
  return NextResponse.json({ agents });
}

export async function POST(req: Request) {
  const ctx = await getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ── Plan limits check ──────────────────────────────────────────────────────
  const [org, currentCount] = await Promise.all([
    prisma.organization.findUnique({
      where: { id: ctx.organizationId },
      select: { plan: true },
    }),
    prisma.aIAgent.count({ where: { organizationId: ctx.organizationId } }),
  ]);

  if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

  const limit = getAgentLimit(org.plan);
  if (limit !== -1 && currentCount >= limit) {
    return NextResponse.json(
      {
        error: "Plan limit reached",
        message: `Your ${org.plan} plan allows up to ${limit} agent${limit === 1 ? "" : "s"}. Upgrade to add more.`,
        limit,
        current: currentCount,
      },
      { status: 402 }
    );
  }
  // ── End plan limits ────────────────────────────────────────────────────────

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createAgentSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid agent data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, type, systemPrompt } = parsed.data;

  const agent = await createAgent({
    organizationId: ctx.organizationId,
    name,
    type,
    systemPrompt,
  });

  return NextResponse.json({ agent }, { status: 201 });
}
