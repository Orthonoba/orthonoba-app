import { NextResponse } from "next/server";
import { getRequestAuth } from "@/lib/auth-helpers";
import { createAgent, listAgents } from "@/services/agents";
import { createAgentSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ctx = getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agents = await listAgents(ctx.organizationId);
  return NextResponse.json({ agents });
}

export async function POST(req: Request) {
  const ctx = getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
