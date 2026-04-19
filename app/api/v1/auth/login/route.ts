import { NextResponse } from "next/server";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: LoginBody = await req.json();

    const { email, password } = body;

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 },
      );
    }

    // 🔥 Simulación de usuario (luego lo conectamos a DB)
    if (email === "test@test.com" && password === "123456") {
      return NextResponse.json({
        message: "Login correcto",
        user: {
          id: "1",
          email,
        },
        token: "fake-jwt-token",
      });
    }

    // Credenciales incorrectas
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 },
    );
  }
}
