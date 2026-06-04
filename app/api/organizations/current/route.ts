import { NextResponse } from "next/server";
import { getRequestAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { updateOrganizationSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ctx = getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const org = await prisma.organization.findUnique({
    where: { id: ctx.organizationId },
    select: { id: true, name: true, slug: true, plan: true, settings: true, logoUrl: true, locale: true, timezone: true },
  });

  if (!org) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ org });
}

export async function PATCH(req: Request) {
  const ctx = getRequestAuth(req);
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = updateOrganizationSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const org = await prisma.organization.findUnique({
    where: { id: ctx.organizationId },
    select: { settings: true },
  });
  if (!org) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const currentSettings = (org.settings as Record<string, unknown>) ?? {};
  const { name, industry, website, phone, logoUrl, timezone, locale } = parsed.data;

  const settingsUpdates: Record<string, unknown> = { ...currentSettings };
  if (industry !== undefined) settingsUpdates.industry = industry;
  if (website !== undefined) settingsUpdates.website = website || null;
  if (phone !== undefined) settingsUpdates.phone = phone || null;

  const updates: Record<string, unknown> = { settings: settingsUpdates };
  if (name !== undefined) updates.name = name;
  if (logoUrl !== undefined) updates.logoUrl = logoUrl;
  if (timezone !== undefined) updates.timezone = timezone;
  if (locale !== undefined) updates.locale = locale;

  const updated = await prisma.organization.update({
    where: { id: ctx.organizationId },
    data: updates,
    select: { id: true, name: true, settings: true, plan: true },
  });

  return NextResponse.json({ org: updated });
}
