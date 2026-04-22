"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 border-b">
      <Link href="/">Inicio</Link>
      <Link href="/beneficios">Beneficios</Link>
      <Link href="/solicitar-demo">Solicitar Demo</Link>
    </nav>
  );
}