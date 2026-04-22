import Link from "next/link";

export default function SolicitarDemoPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-black"
              >
                Inicio
              </Link>{" "}
              <span className="text-neutral-400">/</span>{" "}
              <span className="text-neutral-700">Solicitar Demo</span>
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Solicitar Demo
            </h1>
            <p className="max-w-2xl text-base text-neutral-700 sm:text-lg">
              Descubre cómo Orthonoba puede optimizar el flujo digital de tu
              clínica. Envíanos tus datos y coordinamos una demostración
              personalizada.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">Qué incluye la demo</h2>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                  <span>Recorrido por el flujo de trabajo y casos típicos.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                  <span>Recomendaciones según el volumen y necesidades.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-yellow-400" />
                  <span>Tiempo estimado: 15–25 minutos.</span>
                </li>
              </ul>

              <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-900">
                  Consejo
                </p>
                <p className="mt-1 text-sm text-neutral-700">
                  Si ya tienes un caso o duda específica, descríbelo en el
                  mensaje para que podamos preparar la demo.
                </p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">Formulario</h2>
              <p className="mt-2 text-sm text-neutral-700">
                Completa tus datos y te contactamos lo antes posible.
              </p>

              <form className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="text-sm font-medium text-neutral-900"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-neutral-900"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                      placeholder="tu@clinica.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="clinica"
                      className="text-sm font-medium text-neutral-900"
                    >
                      Clínica
                    </label>
                    <input
                      id="clinica"
                      name="clinica"
                      type="text"
                      autoComplete="organization"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                      placeholder="Nombre de la clínica"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="telefono"
                      className="text-sm font-medium text-neutral-900"
                    >
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="mensaje"
                    className="text-sm font-medium text-neutral-900"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={6}
                    required
                    className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                    placeholder="Cuéntanos qué te gustaría ver en la demo..."
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-neutral-600">
                    Al enviar, aceptas que te contactemos para coordinar la demo.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-6 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Enviar solicitud
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
