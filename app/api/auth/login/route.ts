import { NextResponse } from "next/server";
import { login } from "@/services/auth";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

function loginErrorStatus(message: string): number {
  if (message === "Credenciales incorrectas.") return 401;
  if (message.includes("JWT_SECRET")) return 500;
  return 400;
}

export async function POST(req: Request) {
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

    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    console.error("[api/auth/login]", err);
    return NextResponse.json(
      { error: "No se pudo completar el inicio de sesión. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
