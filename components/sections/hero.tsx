"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-24 pb-20 px-6">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Amber glow */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/[0.07] blur-[80px] pointer-events-none" />
      {/* Blue glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-600/[0.06] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
          <Sparkles size={13} />
          {t("badge")}
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl">
          {t("headline")}
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          {t("subheadline")}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 text-slate-900 rounded-xl font-bold text-sm hover:bg-amber-300 transition-colors"
          >
            {t("cta")}
            <ArrowRight size={16} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.06] text-white rounded-xl font-semibold text-sm border border-white/[0.10] hover:bg-white/[0.10] transition-colors"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="mt-16 flex flex-wrap items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-950"
                />
              ))}
            </div>
            <span>50+ clienti soddisfatti</span>
          </div>
          <div className="w-px h-4 bg-slate-800 hidden sm:block" />
          <span>Svizzera · Italia · Europa</span>
          <div className="w-px h-4 bg-slate-800 hidden sm:block" />
          <span>Risposta in 24h</span>
        </div>
      </div>
    </section>
  );
}
