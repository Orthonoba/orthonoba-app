"use client";

import { useMemo, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SolicitarDemoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const valid = useMemo(() => {
    const nombreOk = form.nombre.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return { nombreOk, emailOk, ok: nombreOk && emailOk };
  }, [form.email, form.nombre]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setStatus({ type: "idle" });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!valid.ok) {
      setStatus({
        type: "error",
        message: "Revisa tu nombre y un email válido para contactarte.",
      });
      return;
    }

    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/v1/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim() || null,
          mensaje: form.mensaje.trim() || null,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "No se pudo enviar la solicitud.");
      }

      setStatus({
        type: "success",
        message: "Solicitud enviada. Te contactaremos pronto.",
      });
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Error de conexión.",
      });
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(250,204,21,0.18),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                Solicitud
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Solicitar demo
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Cuéntanos tu flujo (CAD, impresión 3D, CBCT, escáner intraoral) y
                preparamos una demo enfocada en tus casos.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-800">
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className={cn(
                        "mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition",
                        "placeholder:text-slate-400",
                        valid.nombreOk
                          ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          : "border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10",
                      )}
                      placeholder="Tu nombre o clínica"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-800">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={cn(
                        "mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition",
                        "placeholder:text-slate-400",
                        valid.emailOk
                          ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          : "border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10",
                      )}
                      placeholder="tu@clinica.com"
                      required
                      type="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-800">
                    Teléfono (opcional)
                  </label>
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="+34 600 123 456"
                    type="tel"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-800">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="¿Qué te gustaría ver en la demo?"
                  />
                </div>

                {status.type !== "idle" && status.type !== "loading" && (
                  <div
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm",
                      status.type === "success" &&
                        "border-emerald-200 bg-emerald-50 text-emerald-800",
                      status.type === "error" &&
                        "border-rose-200 bg-rose-50 text-rose-800",
                    )}
                    role="status"
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-4 focus:ring-yellow-200",
                    status.type === "loading"
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-yellow-400 text-slate-900 hover:bg-yellow-500",
                  )}
                >
                  {status.type === "loading" ? "Enviando..." : "Enviar solicitud"}
                </button>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
              <h2 className="text-lg font-semibold text-slate-900">
                ¿Qué incluye la demo?
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  "Revisión de tu flujo actual y puntos de fricción.",
                  "Ejemplo de registro de paciente + fotos clínicas.",
                  "Recomendaciones prácticas para estandarizar capturas.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Tiempo estimado</p>
                <p className="mt-1 text-sm text-slate-600">
                  15–25 minutos según tu caso.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}