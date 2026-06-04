import { NextResponse } from "next/server";
import { apiLimiter, getClientIp } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = await apiLimiter(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Too many requests. Retry after ${rl.retryAfterSecs} seconds.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSecs) } }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing required fields.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, company, message } = parsed.data;

  // Log only non-PII identifiers; extend later with email service or CRM
  logger.info("Contact form received", "api/v1/contact", { email, company, hasMessage: !!message });

  // TODO: integrate Resend + create Lead via CRM API
  void name;

  return NextResponse.json({ success: true });
}
