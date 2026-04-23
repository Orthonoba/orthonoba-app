import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(250,204,21,0.20),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">

        {/* HERO */}
        <div className="grid items-center gap-12 lg:grid-cols-12">

          {/* LEFT */}
          <section className="lg:col-span-7">

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Orthonoba · Clinical SaaS Platform
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              Gestión digital de ortodoncia con flujo clínico inteligente
            </h1>

            <p className="mt-5 max-w-2xl text-slate-600 text-lg leading-relaxed">
              Centraliza pacientes, fotografías intraorales y comunicación clínica en un solo sistema.
              Diseñado para laboratorios, clínicas y ortodoncia invisible.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/pacientes"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Ir a Pacientes
              </Link>

              <Link
                href="/solicitar-demo"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Solicitar demo
              </Link>

            </div>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase text-slate-500 font-semibold">Pacientes</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Registro clínico completo
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase text-slate-500 font-semibold">Fotografía</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Captura intraoral guiada
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase text-slate-500 font-semibold">Flujo</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Comunicación clínica centralizada
                </p>
              </div>

            </div>

          </section>

          {/* RIGHT */}
          <aside className="lg:col-span-5">

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm">

              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-yellow-300/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />

              <h2 className="text-xl font-semibold text-slate-900">
                Inicio rápido
              </h2>

              <ol className="mt-5 space-y-3 text-sm text-slate-600">
                <li>1. Crea o inicia sesión en tu cuenta</li>
                <li>2. Registra pacientes con fotos clínicas</li>
                <li>3. Gestiona casos en tiempo real</li>
              </ol>

              <div className="mt-8 flex flex-col gap-3">

                <Link
                  href="/login"
                  className="h-11 flex items-center justify-center rounded-xl bg-yellow-400 font-semibold text-slate-900 hover:bg-yellow-500 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="h-11 flex items-center justify-center rounded-xl border border-slate-200 font-semibold text-slate-900 hover:bg-slate-50 transition"
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