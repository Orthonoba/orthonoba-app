"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });
  const [focused, setFocused] = useState(false);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!emailOk) {
      setStatus({
        type: "error",
        message: "Por favor introduce un email válido.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || "Error al enviar correo");

      setStatus({
        type: "success",
        message:
          "Revisa tu correo (incluye spam). Si existe, recibirás instrucciones en 5 minutos.",
      });
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message: "Error de conexión. Intenta de nuevo.",
      });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-xl shadow-purple-500/20">
              <span className="text-2xl font-bold text-white">O</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Recuperar acceso
            </h1>
            <p className="text-slate-300 text-sm">
              Te ayudamos a volver a tu cuenta
            </p>
          </div>

          {/* Main card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-1000" />

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

              <h2 className="text-2xl font-bold text-white mb-2">
                Recuperar contraseña
              </h2>
              <p className="text-slate-300 text-sm mb-8">
                Ingresa el email de tu cuenta y te enviaremos un enlace para
                crear una nueva contraseña.
              </p>

              {status.type === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-emerald-100 text-sm">{status.message}</p>
                </div>
              )}

              {status.type === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-100 text-sm">{status.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Correo electrónico
                  </label>
                  <div
                    className={`transition-all duration-300 ${
                      focused ? "scale-105" : ""
                    }`}
                  >
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setStatus({ type: "idle" });
                      }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="tu@clinica.com"
                      disabled={status.type === "loading"}
                      className={`w-full h-12 px-4 rounded-xl bg-white/5 border outline-none transition focus:bg-white/10 focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
                        email.length > 0 && !emailOk
                          ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/10"
                          : "border-white/10 focus:border-pink-400 focus:ring-pink-400/10"
                      } text-white placeholder:text-slate-400`}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.type === "loading" || !emailOk}
                  className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
                >
                  {status.type === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Enviar enlace de recuperación</span>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-8">
                Conexión segura • Sin spam garantizado
              </p>
            </div>
          </div>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition font-medium text-sm"
            >
              <ArrowLeft size={16} />
              <span>Volver a iniciar sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
