import { NextResponse } from "next/server";
import { login } from "@/services/auth";
import { authLimiter, getClientIp } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function loginErrorStatus(message: string): number {
  if (message === "Credenciales incorrectas.") return 401;
  if (message.includes("JWT_SECRET")) return 500;
  if (message.includes("La tabla de usuarios no existe")) return 503;
  return 400;
}

export async function POST(req: Request) {
  // Rate limiting: shared auth bucket (5 per 15 min per IP)
  const ip = getClientIp(req);
  const rl = await authLimiter(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Too many attempts. Retry after ${rl.retryAfterSecs} seconds.` },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSecs),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Request body is not valid JSON." },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email or password.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const result = await login(email, password);

  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: loginErrorStatus(result.error) }
    );
  }

  // API v1 intentionally returns the token in the response for programmatic clients.
  // Store it securely (env var / secrets manager) — never in localStorage.
  return NextResponse.json(result.data, { status: 200 });
}
