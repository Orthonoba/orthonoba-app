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
  return 400;
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "DATABASE_URL no está configurada. En Neon: copia la connection string (URI) del proyecto y pégala en .env.local.",
      },
      { status: 503 },
    );
  }

  let body: LoginBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email.trim() || !password) {
    return NextResponse.json(
      { error: "Introduce email y contraseña." },
      { status: 400 },
    );
  }

  const result = await login(email, password);
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: loginErrorStatus(result.error) },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}
