import { NextResponse } from "next/server";
import { register } from "@/services/auth";
import { authLimiter, getClientIp } from "@/lib/rate-limit";
import { registerSchema } from "@/lib/validations";
import { signToken } from "@/lib/auth-helpers";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function registerErrorStatus(message: string): number {
  if (message.includes("Ya existe una cuenta")) return 409;
  if (message.includes("La tabla de usuarios no existe")) return 503;
  if (message.includes("Revisa el esquema")) return 500;
  if (message.includes("Faltan datos obligatorios en la base")) return 500;
  return 400;
}

export async function POST(req: Request) {
  // Rate limiting: shared auth bucket with login (5 per 15 min per IP)
  const ip = getClientIp(req);
  const rl = await authLimiter(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Demasiados intentos. Espera ${rl.retryAfterSecs} segundos.` },
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

  const parsed = registerSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Datos de registro no válidos.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { email, password, name, organizationName } = parsed.data;

  try {
    const result = await register(email, password, name, organizationName);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: registerErrorStatus(result.error) }
      );
    }

    const { userId, organizationId } = result.data!;

    // Sign token and set auth cookie so user is immediately authenticated
    const token = await signToken({
      userId,
      organizationId,
      role: "OWNER",
      email: result.data!.email,
    });

    const response = NextResponse.json(
      { ok: true, user: result.data },
      { status: 201 }
    );
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (err) {
    logger.error("Register failed", "api/auth/register", err);

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
      { error: "No se pudo completar el registro. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
