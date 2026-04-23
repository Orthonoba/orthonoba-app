-- Ejecutar en Neon: SQL Editor → New query → pegar y ejecutar.
-- Ajusta tipos si tu esquema usa UUID en lugar de serial.

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_lower_idx ON users (LOWER(email));
