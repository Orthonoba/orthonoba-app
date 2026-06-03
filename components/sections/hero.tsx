"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, MoveRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="relative overflow-hidden bg-obsidian pt-32 pb-28 px-6">
      {/* Radial gold glow */}
      <div
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/25 bg-gold/[0.06] text-gold text-xs font-semibold tracking-wide mb-8">
          AI · Automation · Software · Growth
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          {t("headline")}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-silver max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            {t("cta")}
            <ArrowRight size={15} />
          </Link>
          <Link
            href={`/${locale}/solutions`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white rounded-lg font-medium text-sm border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all"
          >
            {t("ctaSecondary")}
            <MoveRight size={15} className="text-silver" />
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-wrap justify-center items-center gap-8 text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 inline-block" />
            Switzerland · Europe · Latin America
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 inline-block" />
            IT · DE · FR · EN · ES
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 inline-block" />
            OpenAI · Anthropic · n8n
          </span>
        </div>
      </div>
    </section>
  );
}
