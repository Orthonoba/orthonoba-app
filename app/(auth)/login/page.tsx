"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginResponse =
  | { token: string; user: { id: number; email: string; role: string; name: string } }
  | { error: string };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <main className="relative min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(250,204,21,0.18),transparent)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-6xl flex-col px-4 py-8 sm:px-6 lg:max-w-7xl lg:flex-row lg:items-stretch lg:gap-0 lg:px-8 lg:py-10">
        <section className="relative flex flex-1 flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10 lg:rounded-r-none lg:border-r-0 lg:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/3 translate-y-1/3 rounded-full bg-yellow-300/10 blur-2xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400/90">
              Orthonoba
            </p>
            <h1 className="mt-3 max-w-md text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Laboratorio digital de ortodoncia
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
              Accede a tu espacio de trabajo: diseño asistido, flujo claro y
              seguimiento de casos en un solo lugar.
            </p>
          </div>

          <ul className="relative mt-10 space-y-3 text-sm text-neutral-300 sm:mt-14">
            {[
              "Interfaz pensada para pantallas grandes y uso diario",
              "Formularios con foco visible y feedback inmediato",
              "Sesión lista para conectar con tu backend",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-1 items-center justify-center rounded-2xl border border-t-0 border-neutral-200 bg-white px-5 py-10 shadow-xl sm:px-8 lg:rounded-l-none lg:border-t lg:border-l-0 lg:px-10 lg:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Iniciar sesión
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Introduce tus credenciales para continuar. ¿Aún no tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="font-medium text-neutral-900 underline decoration-yellow-400 decoration-2 underline-offset-4 hover:text-yellow-700"
                >
                  Crear cuenta
                </Link>
              </p>
            </div>

            {error ? (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 disabled:bg-neutral-100"
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
                    Mín. 8 caracteres en registro
                  </span>
                </div>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 disabled:bg-neutral-100"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-yellow-400 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-950/30 border-t-neutral-950"
                      aria-hidden
                    />
                    Entrando…
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-neutral-500">
              Al continuar aceptas el uso responsable de la plataforma según las
              políticas de tu organización.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
