"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type SubItem   = { href: string; label: string; description: string };
type MegaSection = { title: string; items: SubItem[] };
type NavLink   = { type: "link"; href: string; label: string };
type NavMega   = { type: "mega"; id: string; label: string; sections: MegaSection[] };
type NavItem   = NavLink | NavMega;

/* ─── Nav data ───────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/", label: "Inicio" },
  {
    type: "mega",
    id: "plataforma",
    label: "Plataforma",
    sections: [
      {
        title: "Por perfil",
        items: [
          { href: "/clinicas",      label: "Para Clínicas",      description: "Gestión de casos, pacientes y workflow clínico" },
          { href: "/laboratorios",  label: "Para Laboratorios",  description: "Control de órdenes, producción y entregas" },
          { href: "/pacientes",     label: "Para Pacientes",     description: "Portal personal de seguimiento y comunicación" },
        ],
      },
      {
        title: "Integración",
        items: [
          { href: "/flujo-digital", label: "Flujo Digital",      description: "Automatización de procesos y notificaciones" },
          { href: "/integraciones", label: "Integraciones",      description: "Conecta con tus herramientas existentes" },
        ],
      },
    ],
  },
  {
    type: "mega",
    id: "funcionalidades",
    label: "Funcionalidades",
    sections: [
      {
        title: "Herramientas",
        items: [
          { href: "/visor-3d",     label: "Visor 3D",             description: "Visualización de modelos dentales en tiempo real" },
          { href: "/diseno-cad",   label: "Diseño CAD",           description: "Herramientas de diseño digital avanzadas" },
          { href: "/alineadores",  label: "Alineadores",          description: "Sistema completo de alineadores transparentes" },
        ],
      },
      {
        title: "Flujo clínico",
        items: [
          { href: "/prescripcion", label: "Prescripción Digital", description: "Recetas y órdenes en formato digital" },
          { href: "/impresion-3d", label: "Impresión 3D",         description: "Gestión de impresión y fabricación" },
        ],
      },
    ],
  },
  { type: "link", href: "/beneficios", label: "Beneficios" },
];

/* ─── Utilities ─────────────────────────────────────────── */
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Icons ──────────────────────────────────────────────── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

/* ─── Logo ───────────────────────────────────────────────── */
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-0 text-[17px] font-bold tracking-tight no-underline"
    >
      <span style={{ color: "var(--color-primary-500)" }}>ORTHO</span>
      <span className="text-slate-900">NOBA</span>
    </Link>
  );
}

/* ─── Desktop MegaMenu panel ─────────────────────────────── */
function MegaPanel({
  item,
  open,
}: {
  item: Extract<NavItem, { type: "mega" }>;
  open: boolean;
}) {
  return (
    <div
      role="region"
      aria-label={item.label}
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        left: "50%",
        transform: open
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-6px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 170ms ease, transform 170ms ease",
        minWidth: 540,
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-xl)",
        padding: "var(--space-6)",
        display: "grid",
        gridTemplateColumns: `repeat(${item.sections.length}, 1fr)`,
        gap: "var(--space-8)",
        zIndex: 100,
      }}
    >
      {/* Amber accent bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "var(--space-6)",
        right: "var(--space-6)",
        height: 2,
        borderRadius: "0 0 var(--radius-full) var(--radius-full)",
        background: "var(--color-primary-500)",
      }} />

      {item.sections.map((section) => (
        <div key={section.title}>
          <p style={{
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-neutral-400)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            marginBottom: "var(--space-3)",
          }}>
            {section.title}
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            {section.items.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  className="block rounded-lg no-underline"
                  style={{ padding: "var(--space-3)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-neutral-50)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-medium)",
                    color: "var(--color-dark-900)",
                  }}>
                    {sub.label}
                  </span>
                  <span style={{
                    display: "block",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-neutral-500)",
                    marginTop: "var(--space-1)",
                    lineHeight: "var(--leading-normal)",
                  }}>
                    {sub.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─── Mobile accordion section ───────────────────────────── */
function AccordionSection({
  item,
  open,
  onToggle,
  onLinkClick,
}: {
  item: Extract<NavItem, { type: "mega" }>;
  open: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-slate-700 transition hover:bg-slate-50"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        {item.label}
        <ChevronDown open={open} />
      </button>

      <div style={{ overflow: "hidden", maxHeight: open ? "800px" : "0px", transition: "max-height 280ms ease" }}>
        {item.sections.map((section) => (
          <div key={section.title} style={{ paddingLeft: "var(--space-4)" }}>
            <p style={{
              padding: "var(--space-2) var(--space-4)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-neutral-400)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)",
            }}>
              {section.title}
            </p>
            {section.items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onLinkClick}
                className="block rounded-xl no-underline"
                style={{ padding: "var(--space-3) var(--space-4)" }}
              >
                <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: "var(--font-medium)", color: "var(--color-dark-900)" }}>
                  {sub.label}
                </span>
                <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-neutral-500)", marginTop: 2, lineHeight: "var(--leading-normal)" }}>
                  {sub.description}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [openMega, setOpenMega]               = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen]           = useState(false);
  const [openAccordion, setOpenAccordion]     = useState<string | null>(null);
  const [userName, setUserName]               = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* ── Auth ───────────────────────────────────────────────── */
  useEffect(() => {
    const read = () => {
      try {
        const raw = window.localStorage.getItem("user");
        if (!raw) return setUserName(null);
        const parsed = JSON.parse(raw) as { name?: string; email?: string } | null;
        setUserName(parsed?.name ?? parsed?.email ?? null);
      } catch {
        setUserName(null);
      }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  /* ── Route change ───────────────────────────────────────── */
  useEffect(() => {
    setOpenMega(null);
    setDrawerOpen(false);
  }, [pathname]);

  /* ── Body scroll lock ───────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* ── Click outside closes mega ──────────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMega(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Escape key ─────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    } catch { /* ignore */ }
    setUserName(null);
    window.location.href = "/login";
  }, []);

  const toggleMega      = (id: string) => setOpenMega(prev => (prev === id ? null : id));
  const toggleAccordion = (id: string) => setOpenAccordion(prev => (prev === id ? null : id));
  const closeDrawer     = () => setDrawerOpen(false);

  const desktopLinkClass = (active: boolean) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium no-underline transition",
      active
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    );

  const mobileLinkClass = (active: boolean) =>
    cn(
      "block rounded-xl px-4 py-3 text-base font-medium no-underline transition",
      active
        ? "bg-slate-100 text-slate-900"
        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
    );

  return (
    <>
      {/* ══════════ STICKY HEADER ══════════ */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-slate-200"
        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Logo />

          {/* Desktop center nav */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={desktopLinkClass(pathname === item.href)}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.type === "mega") {
                const isOpen = openMega === item.id;
                return (
                  <div key={item.id} style={{ position: "relative" }}>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => toggleMega(item.id)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                        isOpen
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                      style={{ border: "none", cursor: "pointer", background: isOpen ? undefined : "transparent" }}
                    >
                      {item.label}
                      <ChevronDown open={isOpen} />
                    </button>
                    <MegaPanel item={item} open={isOpen} />
                  </div>
                );
              }

              return null;
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden items-center gap-2 md:flex">
            {userName ? (
              <>
                <Link href="/pacientes" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-50">
                  {userName}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  style={{ cursor: "pointer" }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 no-underline transition hover:bg-slate-50 hover:text-slate-900">
                  Iniciar sesión
                </Link>
                <Link
                  href="/solicitar-demo"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline transition"
                  style={{ background: "var(--color-primary-500)", boxShadow: "var(--shadow-gold)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-600)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-500)"; }}
                >
                  Solicitar Demo
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center justify-center rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            style={{ border: "none", cursor: "pointer", background: "transparent" }}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* ══════════ MOBILE DRAWER ══════════ */}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className="fixed inset-0 z-[60] md:hidden"
        style={{
          background: "rgba(2,6,23,0.5)",
          backdropFilter: "blur(2px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 250ms ease",
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed bottom-0 right-0 top-0 z-[70] flex flex-col bg-white md:hidden"
        style={{
          width: "min(340px, 92vw)",
          boxShadow: "var(--shadow-2xl)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <Logo onClick={closeDrawer} />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={closeDrawer}
            className="flex items-center justify-center rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
            style={{ border: "none", cursor: "pointer", background: "transparent" }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={mobileLinkClass(pathname === item.href)}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.type === "mega") {
              return (
                <AccordionSection
                  key={item.id}
                  item={item}
                  open={openAccordion === item.id}
                  onToggle={() => toggleAccordion(item.id)}
                  onLinkClick={closeDrawer}
                />
              );
            }

            return null;
          })}
        </nav>

        {/* Drawer footer — auth */}
        <div className="flex flex-shrink-0 flex-col gap-2 border-t border-slate-200 px-3 py-4">
          {userName ? (
            <>
              <Link href="/pacientes" onClick={closeDrawer} className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-50">
                {userName}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                style={{ border: "none", cursor: "pointer" }}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeDrawer} className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-50">
                Iniciar sesión
              </Link>
              <Link
                href="/solicitar-demo"
                onClick={closeDrawer}
                className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white no-underline"
                style={{ background: "var(--color-primary-500)" }}
              >
                Solicitar Demo
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
