"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-28 pb-24 px-6">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Amber glow — top right */}
      <div className="absolute -top-40 right-[-10%] w-[700px] h-[700px] rounded-full bg-amber-500/[0.06] blur-[100px] pointer-events-none" />
      {/* Blue glow — bottom left */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-10">
          <Sparkles size={13} />
          {t("badge")}
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-6 max-w-4xl">
          {t("headline")}
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light">
          {t("subheadline")}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-colors shadow-sm"
          >
            {t("cta")}
            <ArrowRight size={15} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-slate-300 rounded-xl font-medium text-sm border border-slate-700 hover:border-slate-600 hover:text-white transition-colors"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Trust strip — verified facts only */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-wrap items-center gap-8 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Switzerland · Italy · Europe
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            IT · DE · FR · EN
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
            OpenAI · Anthropic · n8n
          </span>
        </div>
      </div>
    </section>
  );
}
