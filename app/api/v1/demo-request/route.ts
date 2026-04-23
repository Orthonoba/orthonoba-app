import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const nombre = String(body?.nombre ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const telefono = String(body?.telefono ?? "").trim() || null;
    const mensaje = String(body?.mensaje ?? "").trim() || null;

    if (!nombre) {
      return NextResponse.json({ error: "Nombre obligatorio" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email obligatorio" }, { status: 400 });
    }

    const pool = getPool();

    // Detecta automáticamente la tabla de “solicitudes” existente en Neon.
    // Añade aquí más nombres si tu tabla tiene otro nombre.
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
      [candidates],
    );

    const table = tableResult.rows[0]?.table_name;
    if (!table) {
      return NextResponse.json(
        {
          error:
            "No encontré la tabla de solicitudes de demo en Neon. Nombres probados: " +
            candidates.join(", ") +
            ". Dime el nombre exacto de tu tabla y la conecto.",
        },
        { status: 503 },
      );
    }

    // Insert flexible: intentamos combinaciones comunes de nombres de columna.
    // (No usamos SQL dinámico para valores; solo para tabla/columnas, validadas vía information_schema.)
    const columnResult = await pool.query<{ column_name: string }>(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name = $1`,
      [table],
    );

    const cols = new Set(columnResult.rows.map((r) => r.column_name));
    const has = (...names: string[]) => names.every((n) => cols.has(n));

    const attempts: Array<{
      columns: string[];
      values: Array<string | null>;
    }> = [];

    if (has("nombre", "email", "telefono", "mensaje")) {
      attempts.push({
        columns: ["nombre", "email", "telefono", "mensaje"],
        values: [nombre, email, telefono, mensaje],
      });
    }
    if (has("name", "email", "phone", "message")) {
      attempts.push({
        columns: ["name", "email", "phone", "message"],
        values: [nombre, email, telefono, mensaje],
      });
    }
    if (has("nombre", "email", "telefono")) {
      attempts.push({
        columns: ["nombre", "email", "telefono"],
        values: [nombre, email, telefono],
      });
    }
    if (has("nombre", "email")) {
      attempts.push({
        columns: ["nombre", "email"],
        values: [nombre, email],
      });
    }

    if (attempts.length === 0) {
      return NextResponse.json(
        {
          error:
            `Encontré la tabla "${table}" pero no pude mapear sus columnas. ` +
            `Columnas disponibles: ${Array.from(cols).join(", ")}. ` +
            `Dime qué columnas usar para nombre/email/teléfono/mensaje y lo conecto.`,
        },
        { status: 503 },
      );
    }

    let insertRow: any = null;
    let lastErr: unknown = null;
    for (const a of attempts) {
      try {
        const columnsSql = a.columns.map((c) => `"${c}"`).join(", ");
        const placeholders = a.values.map((_, i) => `$${i + 1}`).join(", ");
        const insert = await pool.query(
          `INSERT INTO "${table}" (${columnsSql})
           VALUES (${placeholders})
           RETURNING *`,
          a.values,
        );
        insertRow = insert.rows[0] ?? null;
        lastErr = null;
        break;
      } catch (e) {
        lastErr = e;
      }
    }

    if (lastErr) {
      const msg = lastErr instanceof Error ? lastErr.message : String(lastErr);
      return NextResponse.json(
        {
          error:
            `No pude insertar en "${table}". Error: ${msg}. ` +
            `Columnas disponibles: ${Array.from(cols).join(", ")}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: insertRow,
        message: "Solicitud recibida",
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error interno" },
      { status: 500 },
    );
  }
}

