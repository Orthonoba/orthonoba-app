import { NextResponse } from "next/server";
import { getRequestAuth } from "@/lib/auth-helpers";
import { updateAgent, deleteAgent, getAgent } from "@/services/agents";
import { updateAgentSchema } from "@/lib/validations";
import { createAuditLog } from "@/services/auditlog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const agent = await getAgent(id, ctx.organizationId);
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ agent });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await getAgent(id, ctx.organizationId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = updateAgentSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, systemPrompt, isActive } = parsed.data;
  await updateAgent(id, ctx.organizationId, { name, systemPrompt, isActive });

  createAuditLog({
    organizationId: ctx.organizationId,
    userId: ctx.userId,
    action: "UPDATE",
    resource: "AIAgent",
    resourceId: id,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await getAgent(id, ctx.organizationId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteAgent(id, ctx.organizationId);

  createAuditLog({
    organizationId: ctx.organizationId,
    userId: ctx.userId,
    action: "DELETE",
    resource: "AIAgent",
    resourceId: id,
  });

  return NextResponse.json({ ok: true });
}
