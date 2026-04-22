import Link from "next/link";

export default function BeneficiosPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-sm text-neutral-600">
          <Link href="/" className="underline underline-offset-4 hover:text-black">
            Inicio
          </Link>{" "}
          <span className="text-neutral-400">/</span>{" "}
          <span className="text-neutral-700">Beneficios</span>
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-start">
          <section className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Beneficios de trabajar con Orthonoba
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-700 sm:text-lg">
              La ortodoncia digital ha evolucionado: diseño CAD, impresión 3D, integración
              de radiografías CBCT y escáner intraoral. En Orthonoba unimos tecnología y
              criterio clínico para que tus casos fluyan de forma ágil y predecible.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">Flujo 100% digital</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Alinea el trabajo clínico con herramientas actuales: CAD, impresión 3D y
                  archivos listos para producción.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">Integración CBCT</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Mejor contexto diagnóstico y planificación cuando se cuenta con CBCT,
                  manteniendo una visión completa del caso.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">Escáner intraoral</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Trabaja con tus escaneos sin fricción, facilitando iteraciones y control
                  de ajustes con rapidez.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">Más agilidad, menos retrabajo</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Procesos claros, comunicación eficiente y entregables consistentes para
                  reducir tiempos y errores evitables.
                </p>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-neutral-900">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                25 años de experiencia
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                Criterio de protésico dental + tecnología actual
              </h2>
              <p className="mt-3 text-sm text-neutral-700">
                La tecnología avanza, pero el resultado depende del criterio. Con{" "}
                <span className="font-medium text-neutral-900">25 años de experiencia como protésico dental</span>,
                aportamos visión práctica para traducir datos digitales en soluciones
                funcionales y estéticas.
              </p>

              <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-900">
                  ¿Qué puedes esperar?
                </p>
                <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                    <span>Soporte para planificación y toma de decisiones.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                    <span>Entregables consistentes y trazables.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                    <span>Flujo adaptable a tu forma de trabajar.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/solicitar-demo"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-yellow-400 px-6 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                >
                  Solicitar demo
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-neutral-200"
                >
                  Crear cuenta
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-600">
                CTA: Cuéntanos tu flujo (CAD/3D/CBCT/escáner) y preparamos una demo enfocada
                en tus casos.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
