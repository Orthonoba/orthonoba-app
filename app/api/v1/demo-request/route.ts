import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { apiLimiter, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const demoRequestEsSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido").max(100).trim(),
  email: z.string().email("Email no válido").max(255),
  telefono: z.string().max(30).optional(),
  mensaje: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = await apiLimiter(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Demasiadas solicitudes. Intenta en ${rl.retryAfterSecs} segundos.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSecs) } }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json().catch(() => ({}));
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = demoRequestEsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos no válidos.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { nombre, email, telefono = null, mensaje = null } = parsed.data;

  try {
    const pool = getPool();

    // Detect the demo_requests table in the public schema
    const candidates = [
      "demo_requests",
      "demo_request",
      "solicitudes_demo",
      "solicitud_demo",
      "demo_solicitudes",
    ];

    const tableResult = await pool.query<{ table_name: string }>(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
         AND table_type = 'BASE TABLE'
         AND table_name = ANY($1::text[])
       LIMIT 1`,
      [candidates]
    );

    const table = tableResult.rows[0]?.table_name;
    if (!table) {
      logger.warn("Demo request table not found", "api/v1/demo-request", { candidates });
      return NextResponse.json(
        { error: "Servicio no disponible temporalmente. Inténtalo más tarde." },
        { status: 503 }
      );
    }

    const columnResult = await pool.query<{ column_name: string }>(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name = $1`,
      [table]
    );

    const cols = new Set(columnResult.rows.map((r) => r.column_name));
    const has = (...names: string[]) => names.every((n) => cols.has(n));

    const attempts: Array<{ columns: string[]; values: (string | null)[] }> = [];

    if (has("nombre", "email", "telefono", "mensaje")) {
      attempts.push({ columns: ["nombre", "email", "telefono", "mensaje"], values: [nombre, email, telefono, mensaje] });
    }
    if (has("name", "email", "phone", "message")) {
      attempts.push({ columns: ["name", "email", "phone", "message"], values: [nombre, email, telefono, mensaje] });
    }
    if (has("nombre", "email", "telefono")) {
      attempts.push({ columns: ["nombre", "email", "telefono"], values: [nombre, email, telefono] });
    }
    if (has("nombre", "email")) {
      attempts.push({ columns: ["nombre", "email"], values: [nombre, email] });
    }

    if (attempts.length === 0) {
      logger.warn("Demo request column mapping failed", "api/v1/demo-request", { table });
      return NextResponse.json(
        { error: "Servicio no disponible temporalmente. Inténtalo más tarde." },
        { status: 503 }
      );
    }

    let insertRow: Record<string, unknown> | null = null;
    let lastErr: unknown = null;

    for (const a of attempts) {
      try {
        const columnsSql = a.columns.map((c) => `"${c}"`).join(", ");
        const placeholders = a.values.map((_, i) => `$${i + 1}`).join(", ");
        const insert = await pool.query(
          `INSERT INTO "${table}" (${columnsSql}) VALUES (${placeholders}) RETURNING *`,
          a.values
        );
        insertRow = (insert.rows[0] as Record<string, unknown>) ?? null;
        lastErr = null;
        break;
      } catch (e) {
        lastErr = e;
      }
    }

    if (lastErr) {
      logger.error("Demo request insert failed", "api/v1/demo-request", lastErr);
      return NextResponse.json(
        { error: "No se pudo guardar la solicitud. Inténtalo de nuevo." },
        { status: 500 }
      );
    }

    // Return only safe confirmation data, never raw DB rows
    return NextResponse.json(
      { ok: true, message: "Solicitud recibida" },
      { status: 201 }
    );
  } catch (err) {
    logger.error("Demo request unexpected error", "api/v1/demo-request", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
