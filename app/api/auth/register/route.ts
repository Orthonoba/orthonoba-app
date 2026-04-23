import { NextResponse } from "next/server";
import { register } from "@/services/auth";

/** bcrypt y `pg` requieren runtime Node en Route Handlers. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Roles permitidos desde el cliente; cualquier otro valor se ignora y usa `user`. */
const ALLOWED_ROLES = new Set(["user", "admin", "clinic"]);

type RegisterBody = {
  email?: unknown;
  password?: unknown;
  name?: unknown;
  role?: unknown;
};

function registerErrorStatus(message: string): number {
  if (message.includes("Ya existe una cuenta")) return 409;
  if (message.includes("La tabla de usuarios no existe")) return 503;
  if (message.includes("Revisa el esquema")) return 500;
  if (message.includes("Faltan datos obligatorios en la base")) return 500;
  return 400;
}

function resolveRole(role: unknown): string {
  if (typeof role !== "string") return "user";
  const trimmed = role.trim();
  return ALLOWED_ROLES.has(trimmed) ? trimmed : "user";
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

  let body: RegisterBody;
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
  const name = typeof body.name === "string" ? body.name : "";
  const role = resolveRole(body.role);

  try {
    const result = await register(email, password, name, role);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: registerErrorStatus(result.error) }
      );
    }

    return NextResponse.json(
      { ok: true, user: result.data },
      { status: 201 }
    );
  } catch (err) {
    console.error("[api/auth/register]", err);

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
