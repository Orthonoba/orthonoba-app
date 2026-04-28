"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/beneficios", label: "Beneficios" },
  { href: "/solicitar-demo", label: "Solicitar Demo" },
  { href: "/contacto", label: "Contacto" },
];

const HIDDEN_ON = ["/dashboard", "/login", "/register", "/forgot-password"];

export default function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-black text-slate-900 text-sm select-none">
            O
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            ORTHONOBA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-amber-400 bg-amber-400/10"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/solicitar-demo"
            className="px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-300 transition-colors"
          >
            Demo gratis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide panel (lateral desde la derecha) */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-slate-900 border-l border-white/[0.06] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
          <span className="font-bold text-white tracking-tight">ORTHONOBA</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel links */}
        <nav className="flex flex-col gap-1 px-4 py-4 flex-1 overflow-y-auto">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-amber-400 bg-amber-400/10"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Panel actions */}
        <div className="px-4 py-6 border-t border-white/[0.06] flex flex-col gap-3 shrink-0">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-center text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/solicitar-demo"
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-center bg-amber-400 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-300 transition-colors"
          >
            Demo gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
