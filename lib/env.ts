/**
 * Runtime environment variable validation.
 * Call validateEnv() inside request handlers — never at module top-level.
 * Returns a typed env object or throws with a descriptive message.
 */

type ServerEnv = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_APP_DOMAIN: string;
};

const REQUIRED_VARS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
] as const;

const OPTIONAL_WITH_DEFAULTS: Record<string, string> = {
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  NEXT_PUBLIC_APP_DOMAIN: "localhost",
};

export function validateEnv(): ServerEnv {
  const missing: string[] = [];

  for (const key of REQUIRED_VARS) {
    if (!process.env[key]) missing.push(key);
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL ?? OPTIONAL_WITH_DEFAULTS.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_DOMAIN:
      process.env.NEXT_PUBLIC_APP_DOMAIN ?? OPTIONAL_WITH_DEFAULTS.NEXT_PUBLIC_APP_DOMAIN,
  };
}

/** Soft check — returns missing var names without throwing. Safe to call anywhere. */
export function getMissingEnvVars(): string[] {
  return REQUIRED_VARS.filter((key) => !process.env[key]);
}
