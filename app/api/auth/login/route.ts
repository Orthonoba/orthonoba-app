import { NextResponse } from "next/server";
import { login } from "@/services/auth";

/** `pg`, bcrypt y JWT requieren runtime Node en Route Handlers. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

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
  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "DATABASE_URL no está configurada. En Neon: copia la connection string (URI) del proyecto y pégala en .env.local.",
      },
      { status: 503 }
    );
  }

  let body: LoginBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email.trim() || !password) {
    return NextResponse.json(
      { error: "Introduce email y contraseña." },
      { status: 400 }
    );
  }

  try {
    const result = await login(email, password);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: loginErrorStatus(result.error) }
      );
    }

    const response = NextResponse.json(result.data, { status: 200 });
    response.cookies.set("auth_token", result.data!.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (err) {
    console.error("[api/auth/login]", err);

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
