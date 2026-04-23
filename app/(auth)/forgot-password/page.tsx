"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!emailOk) {
      setStatus({ type: "error", message: "Introduce un email válido." });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || "Error al enviar correo");

      setStatus({
        type: "success",
        message: "Si el correo existe, recibirás instrucciones.",
      });
    } catch (err) {
      setStatus({ type: "error", message: "Error de conexión" });
    }
  };

  return (
    <main className="relative isolate min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgba(250,204,21,0.18),transparent_60%)]" />

      <div className="mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-12">
            <section className="relative overflow-hidden bg-neutral-950 px-7 py-9 text-white lg:col-span-5 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.15),transparent_50%)]" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300/95">
                Orthonoba
              </p>
              <h1 className="relative mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Recuperar contraseña
              </h1>
              <p className="relative mt-3 text-sm leading-relaxed text-neutral-300">
                Por seguridad, la respuesta será la misma exista o no el correo.
              </p>
              <ul className="relative mt-8 space-y-2.5 text-sm text-neutral-300">
                {[
                  "Enviaremos un enlace si corresponde",
                  "Evita compartir capturas con datos sensibles",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="px-7 py-9 lg:col-span-7 sm:px-10 sm:py-12">
              <div className="max-w-md">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Te ayudamos a volver a entrar
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  ¿Recordaste tu contraseña?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-neutral-900 underline decoration-yellow-400 decoration-2 underline-offset-4 hover:text-yellow-700"
                  >
                    Iniciar sesión
                  </Link>
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-800">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setStatus({ type: "idle" });
                      }}
                      className={cn(
                        "mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400",
                        email.length === 0 || emailOk
                          ? "border-neutral-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                          : "border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-100",
                      )}
                      placeholder="tu@clinica.com"
                      type="email"
                      required
                      disabled={status.type === "loading"}
                    />
                  </div>

                  {status.type === "success" || status.type === "error" ? (
                    <div
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm",
                        status.type === "success" &&
                          "border-emerald-200 bg-emerald-50 text-emerald-800",
                        status.type === "error" &&
                          "border-red-200 bg-red-50 text-red-800",
                      )}
                      role="status"
                    >
                      {status.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-4 focus:ring-yellow-200",
                      status.type === "loading"
                        ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                        : "bg-yellow-400 text-neutral-950 hover:bg-yellow-500",
                    )}
                  >
                    {status.type === "loading" ? "Enviando..." : "Enviar enlace"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
