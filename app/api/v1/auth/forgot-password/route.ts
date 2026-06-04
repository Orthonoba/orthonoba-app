import { NextResponse } from "next/server";
import { authLimiter, getClientIp } from "@/lib/rate-limit";
import { forgotPasswordSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Rate limiting prevents email enumeration via timing and spam abuse
  const ip = getClientIp(req);
  const rl = await authLimiter(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Demasiados intentos. Espera ${rl.retryAfterSecs} segundos.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSecs) } }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json().catch(() => ({}));
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email obligatorio" }, { status: 400 });
  }

  // Always respond 200 regardless of whether the email exists — prevents enumeration.
  // TODO: integrate email provider (Resend) + reset token generation.
  return NextResponse.json(
    { ok: true, message: "Si el correo existe, recibirás instrucciones." },
    { status: 200 }
  );
}
