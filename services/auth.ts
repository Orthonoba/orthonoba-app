import { pool } from "@/components/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRES: jwt.SignOptions["expiresIn"] = "7d";

/** Código PostgreSQL: unique_violation */
const PG_UNIQUE_VIOLATION = "23505";

export type AuthError = string;

export type RegisterResult = {
  id: number;
  email: string;
  role: string;
};

export type LoginResult = {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
    name: string;
  };
};

type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getJwtSecret(): string | null {
  const secret = process.env.JWT_SECRET?.trim();
  return secret && secret.length > 0 ? secret : null;
}

function isPgError(err: unknown): err is { code?: string } {
  return typeof err === "object" && err !== null && "code" in err;
}

/**
 * Registro: hash de contraseña e inserción en `users`.
 * Email se normaliza (trim + minúsculas) para evitar duplicados por mayúsculas.
 */
export async function register(
  email: string,
  password: string,
  name: string,
  role: string
): Promise<{ data: RegisterResult | null; error: AuthError | null }> {
  const normalizedEmail = normalizeEmail(email);
  const trimmedName = name.trim();
  const trimmedRole = role.trim() || "user";

  if (!normalizedEmail || !password || !trimmedName) {
    return { data: null, error: "Completa nombre, email y contraseña." };
  }

  if (password.length < 8) {
    return {
      data: null,
      error: "La contraseña debe tener al menos 8 caracteres.",
    };
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query<RegisterResult>(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role`,
      [trimmedName, normalizedEmail, hash, trimmedRole]
    );

    const row = result.rows[0];
    if (!row) {
      return { data: null, error: "No se pudo crear el usuario." };
    }

    return { data: row, error: null };
  } catch (err) {
    if (isPgError(err) && err.code === PG_UNIQUE_VIOLATION) {
      return { data: null, error: "Ya existe una cuenta con ese email." };
    }
    const message =
      err instanceof Error ? err.message : "Error al registrar el usuario.";
    return { data: null, error: message };
  }
}

/**
 * Login: misma respuesta genérica si falla email o contraseña (no filtra usuarios existentes).
 */
export async function login(
  email: string,
  password: string
): Promise<{ data: LoginResult | null; error: AuthError | null }> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return { data: null, error: "Introduce email y contraseña." };
  }

  const secret = getJwtSecret();
  if (!secret) {
    return {
      data: null,
      error:
        "JWT_SECRET no está definido en el entorno. Añádelo en .env.local.",
    };
  }

  try {
    const result = await pool.query<UserRow>(
      `SELECT id, name, email, password, role
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [normalizedEmail]
    );

    const user = result.rows[0];
    if (!user) {
      return { data: null, error: "Credenciales incorrectas." };
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return { data: null, error: "Credenciales incorrectas." };
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: TOKEN_EXPIRES }
    );

    return {
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      },
      error: null,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al iniciar sesión.";
    return { data: null, error: message };
  }
}
