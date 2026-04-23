import { Pool } from "pg";

/**
 * Pool singleton para Postgres (Neon).
 * - Usa la URI de Neon (idealmente la **pooled** / con pooler) en `DATABASE_URL`.
 * - `max` bajo evita agotar conexiones en entornos serverless de Next.js.
 */
let pool: Pool | null = null;

function shouldUseSsl(connectionString: string): boolean {
  if (process.env.DATABASE_SSL === "false") return false;
  if (/sslmode=require|sslmode=verify-full/i.test(connectionString)) return true;
  if (/neon\.tech|\.neon\./i.test(connectionString)) return true;
  if (!/localhost|127\.0\.0\.1/i.test(connectionString)) return true;
  return false;
}

export function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL no está definida. En Neon: Dashboard → Connection string → copia la URI (recomendado: pooled) en .env.local."
    );
  }

  pool = new Pool({
    connectionString,
    max: Number(process.env.PG_POOL_MAX ?? 5),
    connectionTimeoutMillis: 15_000,
    idleTimeoutMillis: 25_000,
    ssl: shouldUseSsl(connectionString)
      ? { rejectUnauthorized: false }
      : undefined,
  });

  return pool;
}
