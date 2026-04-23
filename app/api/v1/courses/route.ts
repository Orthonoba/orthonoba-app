import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const perPage = Number(searchParams.get("per_page") ?? "10");

  // Endpoint "placeholder" para evitar 404 en integraciones/snippets que lo consultan.
  // Si luego conectas cursos reales (DB/CRM/LMS), reemplaza este payload.
  return NextResponse.json(
    {
      data: [],
      meta: {
        per_page: Number.isFinite(perPage) && perPage > 0 ? perPage : 10,
      },
    },
    { status: 200 },
  );
}

