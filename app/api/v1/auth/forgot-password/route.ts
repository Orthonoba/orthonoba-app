import { NextResponse } from "next/server";

/**
 * Endpoint seguro por defecto:
 * - Siempre responde 200 (no filtra si el email existe).
 * - Útil para UI/UX y para integrar más tarde con un proveedor de email.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email obligatorio" },
        { status: 400 },
      );
    }

    // TODO: integrar proveedor de email + token de reseteo.
    return NextResponse.json(
      { ok: true, message: "Si el correo existe, recibirás instrucciones." },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error interno" },
      { status: 500 },
    );
  }
}

