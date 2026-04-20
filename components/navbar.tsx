"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b p-4 flex justify-between items-center bg-white">
      {/* LOGO */}
      <h1 className="text-xl font-bold">ORTHONOBA</h1>

      {/* DESKTOP */}
      <div className="hidden md:flex gap-6">
        <Link href="/soluciones">Soluciones</Link>
        <Link href="/alineadores">Alineadores</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      {/* BOTÓN MOBILE */}
      <button
        className="md:hidden border px-3 py-1"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* MENU MOBILE */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white border-t flex flex-col p-4 gap-4 md:hidden">
          <Link href="/soluciones">Soluciones</Link>
          <Link href="/alineadores">Alineadores</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      )}
    </nav>
  );
}
