import { NextResponse } from "next/server";
import { verifyRequestToken } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accounts = await prisma.whatsAppAccount.findMany({
    where: { organizationId: ctx.organizationId },
    select: { id: true, displayName: true, phoneNumberId: true, wabaId: true, isActive: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ accounts });
}

export async function POST(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { phoneNumberId?: string; wabaId?: string; accessToken?: string; displayName?: string; webhookSecret?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const phoneNumberId = typeof body.phoneNumberId === "string" ? body.phoneNumberId.trim() : "";
  const wabaId = typeof body.wabaId === "string" ? body.wabaId.trim() : "";
  const accessToken = typeof body.accessToken === "string" ? body.accessToken.trim() : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "WhatsApp";

  if (!phoneNumberId) return NextResponse.json({ error: "Phone Number ID is required" }, { status: 400 });
  if (!wabaId) return NextResponse.json({ error: "WABA ID is required" }, { status: 400 });
  if (!accessToken) return NextResponse.json({ error: "Access Token is required" }, { status: 400 });

  const existing = await prisma.whatsAppAccount.findUnique({ where: { phoneNumberId } });
  if (existing) {
    return NextResponse.json(
      { error: "This Phone Number ID is already connected to an account" },
      { status: 409 }
    );
  }

  const account = await prisma.whatsAppAccount.create({
    data: {
      organizationId: ctx.organizationId,
      phoneNumberId,
      wabaId,
      accessToken,
      displayName,
      webhookSecret: typeof body.webhookSecret === "string" ? body.webhookSecret : null,
      isActive: true,
    },
    select: { id: true, displayName: true, phoneNumberId: true, wabaId: true, isActive: true, createdAt: true },
  });

  return NextResponse.json({ account }, { status: 201 });
}
