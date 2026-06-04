import { NextResponse } from "next/server";
import { verifyRequestToken } from "@/lib/auth-helpers";
import { createAgent, listAgents } from "@/services/agents";
import type { AgentType } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES: AgentType[] = [
  "CHAT",
  "VOICE",
  "WHATSAPP",
  "EMAIL",
  "CRM",
  "LEAD_QUALIFIER",
  "APPOINTMENT",
  "CUSTOM",
];

export async function GET(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agents = await listAgents(ctx.organizationId);
  return NextResponse.json({ agents });
}

export async function POST(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { name?: string; type?: string; systemPrompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const type = typeof body.type === "string" ? (body.type.toUpperCase() as AgentType) : null;

  if (!name) return NextResponse.json({ error: "Agent name is required" }, { status: 400 });
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Valid agent type is required" }, { status: 400 });
  }

  const agent = await createAgent({
    organizationId: ctx.organizationId,
    name,
    type,
    systemPrompt: typeof body.systemPrompt === "string" ? body.systemPrompt : undefined,
  });

  return NextResponse.json({ agent }, { status: 201 });
}
