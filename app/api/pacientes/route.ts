import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const pool = getPool();
    const formData = await req.formData();

    const nombre = String(formData.get("nombre") ?? "").trim();
    const emailRaw = String(formData.get("email") ?? "").trim();
    const telefonoRaw = String(formData.get("telefono") ?? "").trim();
    const fecha_nacimientoRaw = String(
      formData.get("fecha_nacimiento") ?? "",
    ).trim();

    if (!nombre) {
      return NextResponse.json({ error: "Nombre obligatorio" }, { status: 400 });
    }

    const email = emailRaw || null;
    const telefono = telefonoRaw || null;
    const fecha_nacimiento = fecha_nacimientoRaw || null;

    const result = await pool.query(
      `INSERT INTO pacientes (nombre, email, telefono, fecha_nacimiento)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, email, telefono, fecha_nacimiento],
    );

    return NextResponse.json({
      data: result.rows[0],
      message: "Paciente creado",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error interno" },
      { status: 500 },
    );
  }
}

