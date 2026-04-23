"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginResponse =
  | { token: string; user: { id: number; email: string; role: string; name: string } }
  | { error: string };

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
        <path
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 9.88A4.5 4.5 0 0117 12c.74 0 1.45.18 2.08.5M6.61 6.61C8.37 5.59 10.42 5 12.5 5c7 0 11 7 11 7a19.2 19.2 0 01-3.57 4.57M9.9 5.24A19.1 19.1 0 0012.5 5c-7 0-11 7-11 7a18.5 18.5 0 003.09 4.5"
        />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as LoginResponse;

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "No se pudo iniciar sesión.");
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Error de red. Comprueba tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-[#fafafa] text-neutral-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(250,204,21,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[min(55vw,720px)] w-[min(120vw,1400px)] -translate-x-1/2 rounded-[50%] bg-gradient-to-t from-yellow-200/25 via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-4 py-8 sm:px-6 lg:flex-row lg:items-stretch lg:gap-0 lg:px-10 lg:py-12 xl:px-14">
        <section className="relative flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 px-7 py-9 text-white shadow-2xl shadow-neutral-900/20 sm:min-h-[320px] sm:px-9 sm:py-11 lg:min-h-0 lg:rounded-r-none lg:border-r-0 lg:py-14 xl:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.15),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,transparent_42%)]" />

          <header className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300/95 backdrop-blur-sm">
              Orthonoba
            </div>
            <h1 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.35rem] xl:text-5xl xl:leading-[1.08]">
              Laboratorio digital de ortodoncia
            </h1>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-neutral-300 sm:text-[15px] lg:text-base">
              Pantalla completa, tipografía clara y contraste cuidado para sesiones
              largas. Tu equipo entra, trabaja y sale sin fricción.
            </p>
          </header>

          <div className="relative mt-10 space-y-5 sm:mt-14 lg:mt-0">
            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-8 sm:gap-4 sm:pt-10">
              {[
                { k: "Flujo", v: "CAD → 3D" },
                { k: "Casos", v: "Seguimiento" },
                { k: "Acceso", v: "Seguro" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-3.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    {item.k}
                  </p>
                  <p className="mt-1 text-xs font-medium text-white sm:text-sm">
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {[
                "Diseño responsive hasta pantallas anchas (Full HD+)",
                "Estados de carga y errores visibles al instante",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellow-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative flex flex-1 items-center justify-center rounded-2xl border border-neutral-200/90 bg-white/90 px-5 py-10 shadow-2xl shadow-neutral-900/10 backdrop-blur-md sm:px-8 lg:min-h-0 lg:rounded-l-none lg:border-l-0 lg:border-t lg:px-11 lg:py-14 xl:px-14">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent lg:inset-x-12" />

          <div className="relative w-full max-w-[440px]">
            <div className="mb-9">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.65rem]">
                Iniciar sesión
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                ¿Aún no tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-neutral-900 underline decoration-yellow-400 decoration-2 underline-offset-[5px] transition hover:text-yellow-800"
                >
                  Crear cuenta
                </Link>
                <span className="mx-2 text-neutral-300">·</span>
                <Link
                  href="/solicitar-demo"
                  className="font-medium text-neutral-700 underline decoration-neutral-300 decoration-1 underline-offset-4 hover:text-neutral-900"
                >
                  Solicitar demo
                </Link>
              </p>
            </div>

            <div
              role="status"
              aria-live="polite"
              className={error ? "mb-6" : "sr-only"}
            >
              {error ? (
                <div className="rounded-xl border border-red-200/90 bg-red-50/95 px-4 py-3 text-sm text-red-900 shadow-sm backdrop-blur-sm">
                  {error}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-neutral-800"
                >
                  Correo electrónico
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[52px] w-full rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 shadow-sm outline-none ring-0 transition placeholder:text-neutral-400 focus:border-yellow-400 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.22)] disabled:bg-neutral-50"
                  placeholder="tu@clinica.com"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-neutral-800"
                  >
                    Contraseña
                  </label>
                  <span className="text-xs text-neutral-500">
                    Mín. 8 caracteres al registrarte
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[52px] w-full rounded-xl border border-neutral-200 bg-white py-3 pl-4 pr-14 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-yellow-400 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.22)] disabled:bg-neutral-50"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                    aria-pressed={showPassword}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-[52px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-yellow-300 to-yellow-400 px-6 text-[15px] font-semibold text-neutral-950 shadow-md shadow-yellow-900/15 transition hover:from-yellow-400 hover:to-yellow-500 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {loading ? (
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-neutral-900/25 border-t-neutral-900"
                      aria-hidden
                    />
                    Entrando…
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
              Conexión cifrada (HTTPS). El token se guarda en este dispositivo para la
              demo; en producción conviene cookie HttpOnly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
