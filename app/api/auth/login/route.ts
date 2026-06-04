import { NextResponse } from "next/server";
import { login } from "@/services/auth";
import { authLimiter, getClientIp } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";

/** `pg`, bcrypt y JWT requieren runtime Node en Route Handlers. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function loginErrorStatus(message: string): number {
  if (message === "Credenciales incorrectas.") return 401;
  if (message.includes("JWT_SECRET")) return 500;
  if (message.includes("La tabla de usuarios no existe")) return 503;
  if (message.includes("Revisa el esquema")) return 500;
  if (message.includes("Faltan datos obligatorios en la base")) return 500;
  if (/relation|violates|syntax error|postgres|ECONNREFUSED|ETIMEDOUT/i.test(message)) {
    return 500;
  }
  return 400;
}

export async function POST(req: Request) {
  // Rate limiting: 5 attempts per 15 minutes per IP
  const ip = getClientIp(req)
  const rl = await authLimiter(ip)
  if (!rl.success) {
    return NextResponse.json(
      { error: `Demasiados intentos. Espera ${rl.retryAfterSecs} segundos.` },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfterSecs),
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "DATABASE_URL no está configurada. En Neon: copia la connection string (URI) del proyecto y pégala en .env.local.",
      },
      { status: 503 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Introduce email y contraseña válidos.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  try {
    const result = await login(email, password);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: loginErrorStatus(result.error) }
      );
    }

    // Strip the raw token from the response body — the client reads it from the httpOnly cookie.
    const { token: _token, ...publicData } = result.data!;
    const response = NextResponse.json(publicData, { status: 200 });
    response.cookies.set("auth_token", result.data!.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (err) {
    logger.error("Login failed", "api/auth/login", err);

    const isDbConfig =
      err instanceof Error &&
      /DATABASE_URL no está definida/i.test(err.message);

    if (isDbConfig) {
      return NextResponse.json(
        {
          error:
            "No hay conexión a la base de datos. Configura DATABASE_URL (Neon) en el servidor.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "No se pudo completar el inicio de sesión. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
