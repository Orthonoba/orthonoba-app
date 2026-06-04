import { NextResponse } from "next/server";
import { verifyRequestToken } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ctx = await verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [org, agentCount, waCount] = await Promise.all([
    prisma.organization.findUnique({
      where: { id: ctx.organizationId },
      include: { subscription: true },
    }),
    prisma.aIAgent.count({ where: { organizationId: ctx.organizationId } }),
    prisma.whatsAppAccount.count({ where: { organizationId: ctx.organizationId } }),
  ]);

  if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

  const settings = (org.settings as Record<string, unknown>) ?? {};

  const steps = {
    organization: Boolean(settings.industry),
    plan: Boolean(org.subscription && org.subscription.status !== "CANCELED"),
    agent: agentCount > 0,
    whatsapp: waCount > 0,
  };

  const allDone = steps.organization && steps.plan && steps.agent;

  return NextResponse.json({
    steps,
    allDone,
    org: {
      name: org.name,
      plan: org.plan,
      industry: settings.industry ?? null,
      website: settings.website ?? null,
    },
  });
}
