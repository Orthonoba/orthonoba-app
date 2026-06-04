import { NextResponse } from "next/server";
import { verifyRequestToken } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_INDUSTRIES = [
  "digital_agency",
  "marketing_agency",
  "ecommerce",
  "saas",
  "consulting",
  "law_firm",
  "medical_clinic",
  "dental_practice",
  "restaurant",
  "real_estate",
  "retail",
  "technology",
  "finance",
  "other",
] as const;

export async function GET(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const org = await prisma.organization.findUnique({
    where: { id: ctx.organizationId },
    select: { id: true, name: true, slug: true, plan: true, settings: true, logoUrl: true, locale: true, timezone: true },
  });

  if (!org) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ org });
}

export async function PATCH(req: Request) {
  const ctx = verifyRequestToken(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const org = await prisma.organization.findUnique({
    where: { id: ctx.organizationId },
    select: { settings: true },
  });
  if (!org) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const currentSettings = (org.settings as Record<string, unknown>) ?? {};

  const updates: Record<string, unknown> = {};
  const settingsUpdates: Record<string, unknown> = { ...currentSettings };

  if (typeof body.industry === "string" && ALLOWED_INDUSTRIES.includes(body.industry as typeof ALLOWED_INDUSTRIES[number])) {
    settingsUpdates.industry = body.industry;
  }
  if (typeof body.website === "string") {
    settingsUpdates.website = body.website.trim() || null;
  }
  if (typeof body.phone === "string") {
    settingsUpdates.phone = body.phone.trim() || null;
  }
  if (typeof body.logoUrl === "string") {
    updates.logoUrl = body.logoUrl.trim() || null;
  }

  updates.settings = settingsUpdates;

  const updated = await prisma.organization.update({
    where: { id: ctx.organizationId },
    data: updates,
    select: { id: true, name: true, settings: true, plan: true },
  });

  return NextResponse.json({ org: updated });
}
