import Link from "next/link";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(250,204,21,0.22),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Plataforma clínica · Orthonoba
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Ortodoncia digital, flujo claro y entregables consistentes
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Centraliza registro de pacientes, fotografías clínicas y comunicación
              del caso en un flujo moderno. Pensado para trabajar rápido, con menos
              fricción.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/pacientes"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/15"
              >
                Ir a Pacientes
              </Link>
              <Link
                href="/solicitar-demo"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10"
              >
                Solicitar demo
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { k: "Registro", v: "Paciente + fotos" },
                { k: "Calidad", v: "Validaciones claras" },
                { k: "UI", v: "Diseño consistente" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.k}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-7 shadow-sm sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />

              <h2 className="relative text-xl font-semibold tracking-tight text-slate-900">
                Empieza en 2 pasos
              </h2>
              <ol className="relative mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  Crea tu cuenta o inicia sesión.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  Registra un paciente y adjunta fotografías clínicas.
                </li>
              </ol>

              <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-yellow-400 px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
