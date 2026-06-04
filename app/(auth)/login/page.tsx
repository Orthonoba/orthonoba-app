"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type LoginResponse =
  | { user: { id: number; email: string; role: string; name: string } }
  | { error: string };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Auth token is stored in httpOnly cookie by the server.
      // No localStorage — eliminates XSS token theft vector.
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-xl shadow-blue-500/20">
              <span className="text-2xl font-bold text-white">O</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">ORTHONOBA</h1>
            <p className="text-slate-300 text-sm">AI & Digital Transformation Agency</p>
          </div>

          {/* Main card */}
          <div className="relative group">
            {/* Animated border gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-1000" />
            
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 sm:p-10 shadow-2xl">
              {/* Decorative line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              <h2 className="text-2xl font-bold text-white mb-2">Iniciar sesión</h2>
              <p className="text-slate-300 text-sm mb-8">
                ¿Aún no tienes cuenta?{" "}
                <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                  Crear una
                </Link>
              </p>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Correo electrónico
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focused === "email" ? "scale-105" : ""
                  }`}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="tu@clinica.com"
                      disabled={loading}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                    Contraseña
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focused === "password" ? "scale-105" : ""
                  }`}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      placeholder="••••••••"
                      disabled={loading}
                      className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Forgot password link */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-xs text-slate-400 hover:text-cyan-400 transition font-medium">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Entrar a tu cuenta</span>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-8">
                Conexión segura con HTTPS • Datos encriptados
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              ¿Necesitas ayuda?{" "}
              <Link href="/contacto" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                Contacta con nosotros
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
