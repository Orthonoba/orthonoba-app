import Link from "next/link";

const PRODUCTS = [
  { label: "Gestión de pacientes", href: "/pacientes" },
  { label: "Historial clínico", href: "/historial-clinico" },
  { label: "Solicitar demo", href: "/demo" },
  { label: "Precios", href: "/precios" },
];

const COMPANY = [
  { label: "Acerca de nosotros", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Carreras", href: "/carreras" },
  { label: "Contacto", href: "/contacto" },
];

const LEGAL = [
  { label: "Términos de uso", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies", href: "/cookies" },
  { label: "RGPD", href: "/rgpd" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/orthonoba",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/orthonoba",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/orthonoba",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@orthonoba",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1 — Logo + About */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Link
            href="/"
            className="text-white font-bold text-xl tracking-tight"
          >
            Orthonoba
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Tecnología digital para ortodoncistas. Gestiona pacientes,
            historiales clínicos y documentación desde un solo lugar.
          </p>
        </div>

        {/* Column 2 — Productos */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
            Productos
          </h3>
          <ul className="flex flex-col gap-2">
            {PRODUCTS.map(({ label, href }) => (
              <li key={`${href}-${label}`}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Empresa */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
            Empresa
          </h3>
          <ul className="flex flex-col gap-2">
            {COMPANY.map(({ label, href }) => (
              <li key={`${href}-${label}`}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Legal */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
            Legal
          </h3>
          <ul className="flex flex-col gap-2">
            {LEGAL.map(({ label, href }) => (
              <li key={`${href}-${label}`}>
                <Link
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 — Redes sociales */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
            Síguenos
          </h3>
          <ul className="flex flex-col gap-3">
            {SOCIAL.map(({ label, href, icon }) => (
              <li key={`${href}-${label}`}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-150"
                >
                  {icon}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {year} Orthonoba. Todos los derechos reservados.</span>
          <span>Hecho con ❤️ para ortodoncistas</span>
        </div>
      </div>
    </footer>
  );
}
