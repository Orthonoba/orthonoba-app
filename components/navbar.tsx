"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = window.localStorage.getItem("user");
        if (!raw) return setUserName(null);
        const parsed = JSON.parse(raw) as { name?: string; email?: string } | null;
        setUserName(parsed?.name || parsed?.email || null);
      } catch {
        setUserName(null);
      }
    };

    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  const items = [
    { href: "/", label: "Inicio" },
    { href: "/pacientes", label: "Pacientes" },
    { href: "/beneficios", label: "Beneficios" },
    { href: "/solicitar-demo", label: "Solicitar Demo" },
  ];

  const rightItems = useMemo(() => {
    if (userName) {
      return [{ href: "/pacientes", label: userName }];
    }
    return [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Registrarse" },
    ];
  }, [userName]);

  const onLogout = () => {
    try {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    } catch {
      // ignore
    }
    setUserName(null);
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Orthonoba
        </Link>

        <div className="flex items-center gap-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {rightItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {userName ? (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Salir
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}