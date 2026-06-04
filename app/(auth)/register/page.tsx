"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type RegisterResponse =
  | { ok: true; user: { id: number; email: string; role: string } }
  | { error: string };

type LoginResponse =
  | { token: string; user: { id: number; email: string; role: string; name: string } }
  | { error: string };

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const passwordStrength = password.length > 0 ? 
    password.length >= 8 ? "strong" : "weak" : "none";
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });

      const data = (await res.json()) as RegisterResponse;

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "No se pudo crear la cuenta.");
        return;
      }

      // Auto-login
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = (await loginRes.json()) as LoginResponse;
      if (!loginRes.ok || "error" in loginData) {
        router.push("/login");
        router.refresh();
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", loginData.token);
        window.localStorage.setItem("user", JSON.stringify(loginData.user));
      }

      router.push("/dashboard/onboarding");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4 shadow-xl shadow-emerald-500/20">
              <span className="text-2xl font-bold text-white">O</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">ORTHONOBA</h1>
            <p className="text-slate-300 text-sm">Crea tu cuenta y comienza hoy</p>
          </div>

          {/* Main card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-1000" />
            
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

              <h2 className="text-2xl font-bold text-white mb-2">Crear cuenta</h2>
              <p className="text-slate-300 text-sm mb-8">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition">
                  Inicia sesión
                </Link>
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tu nombre o clínica"
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="tu@clinica.com"
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="Mínimo 8 caracteres"
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/10 disabled:opacity-50"
                  />
                  {password && (
                    <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className={`h-full transition-all ${
                        passwordStrength === "strong" ? "w-full bg-emerald-500" : "w-1/2 bg-yellow-500"
                      }`} />
                    </div>
                  )}
                </div>

                {/* Confirm password field */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-white mb-2">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocused("confirm-password")}
                      onBlur={() => setFocused(null)}
                      placeholder="Repite tu contraseña"
                      disabled={loading}
                      className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/10 disabled:opacity-50"
                    />
                    {confirmPassword && passwordsMatch && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || !passwordsMatch}
                  className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Creando cuenta...</span>
                    </>
                  ) : (
                    <span>Crear mi cuenta</span>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-8">
                Tus datos están protegidos • HTTPS encriptado
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
