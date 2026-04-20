"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            ORTHONOBA
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/soluciones" className="hover:text-black transition">
            Soluciones
          </Link>
          <Link href="/alineadores" className="hover:text-black transition">
            Alineadores
          </Link>
          <Link href="/apnea" className="hover:text-black transition">
            Apnea del sueño
          </Link>
          <Link href="/cad" className="hover:text-black transition">
            CAD
          </Link>
          <Link href="/precios" className="hover:text-black transition">
            Precios
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Login
          </Link>

          <Link
            href="/demo"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          >
            Solicitar demo
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-700 text-sm">
          <Link href="/soluciones">Soluciones</Link>
          <Link href="/alineadores">Alineadores</Link>
          <Link href="/apnea">Apnea del sueño</Link>
          <Link href="/cad">CAD</Link>
          <Link href="/precios">Precios</Link>

          <hr />

          <Link href="/login">Login</Link>

          <Link
            href="/demo"
            className="bg-black text-white px-4 py-2 rounded-lg text-center"
          >
            Solicitar demo
          </Link>
        </div>
      )}
    </nav>
  );
}
