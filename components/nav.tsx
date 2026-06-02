"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const LOCALES = [
  { code: "it", label: "Italiano" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

function getCurrentLocale(pathname: string) {
  const seg = pathname.split("/")[1];
  return LOCALES.find((l) => l.code === seg)?.code ?? "it";
}

function swapLocale(pathname: string, newLocale: string) {
  const segs = pathname.split("/");
  segs[1] = newLocale;
  return segs.join("/") || "/";
}

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const locale = getCurrentLocale(pathname);

  const PRIMARY_LINKS = [
    { href: `/${locale}`,                 label: t("home") },
    { href: `/${locale}/services`,        label: t("services") },
    { href: `/${locale}/ai-agents`,       label: t("aiAgents") },
    { href: `/${locale}/automation`,      label: t("automation") },
    { href: `/${locale}/web-development`, label: t("webDevelopment") },
    { href: `/${locale}/pricing`,         label: t("pricing") },
  ];

  const SECONDARY_LINKS = [
    { href: `/${locale}/portfolio`, label: t("portfolio") },
    { href: `/${locale}/blog`,      label: t("blog") },
    { href: `/${locale}/about`,     label: t("about") },
    { href: `/${locale}/contact`,   label: t("contact") },
  ];

  const ALL_LINKS = [...PRIMARY_LINKS, ...SECONDARY_LINKS];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(href)
        ? "text-amber-400 bg-amber-400/10"
        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 shrink-0 mr-6"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-black text-slate-900 text-xs select-none">
            O
          </div>
          <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
            ORTHONOBA
          </span>
        </Link>

        {/* Desktop primary nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
          {PRIMARY_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
          <div className="w-px h-4 bg-slate-800 mx-1" />
          {SECONDARY_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2 ml-4 shrink-0">
          {/* Locale switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Globe size={13} />
              <span className="uppercase font-semibold text-xs">{locale}</span>
              <ChevronDown size={11} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden min-w-[130px] z-50">
                {LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={swapLocale(pathname, l.code)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      l.code === locale
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/contact`}
            className="ml-1 px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-300 transition-colors"
          >
            {t("getStarted")}
          </Link>
        </div>

        {/* Mobile: lang + burger */}
        <div className="lg:hidden flex items-center gap-1">
          <div className="relative">
            <button
              onClick={() => { setLangOpen((v) => !v); setMobileOpen(false); }}
              className="flex items-center gap-1 px-2 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Globe size={14} />
              <span className="text-xs uppercase font-semibold">{locale}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden min-w-[130px] z-60">
                {LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={swapLocale(pathname, l.code)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      l.code === locale
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => { setMobileOpen((v) => !v); setLangOpen(false); }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-slate-950 border-l border-white/[0.06] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
          <span className="font-bold text-white text-sm tracking-tight">ORTHONOBA</span>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1 overflow-y-auto">
          {ALL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-amber-400 bg-amber-400/10"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/[0.06] shrink-0">
          <Link
            href={`/${locale}/contact`}
            onClick={() => setMobileOpen(false)}
            className="block w-full px-4 py-3 text-center bg-amber-400 text-slate-900 rounded-xl text-sm font-bold hover:bg-amber-300 transition-colors"
          >
            {t("getStarted")}
          </Link>
        </div>
      </div>
    </header>
  );
}
