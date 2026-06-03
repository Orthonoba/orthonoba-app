"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="relative overflow-hidden bg-obsidian pt-44 pb-36 px-6">
      {/* Gold radial glow — top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(212,175,55,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.035,
        }}
      />
      {/* Left edge glow */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-[11px] font-bold tracking-widest uppercase mb-14">
          {t("badge")}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-[78px] xl:text-[88px] font-bold text-white leading-[1.03] tracking-[-0.025em] mb-8">
          {t.rich("headline", {
            gold: (chunks) => (
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #F5C542 55%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {chunks}
              </span>
            ),
          })}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-silver/70 max-w-2xl mx-auto leading-relaxed mb-14 font-light">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-obsidian rounded-xl font-bold text-sm hover:bg-gold-light transition-colors shadow-2xl shadow-gold/25"
          >
            {t("cta")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-white rounded-xl font-semibold text-sm border border-white/10 hover:border-white/22 hover:bg-white/[0.04] transition-all"
          >
            <MessageSquare size={15} className="text-silver/50" />
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Geo strip */}
        <div className="mt-28 pt-6 border-t border-white/[0.05]">
          <p className="text-[10px] text-muted tracking-[0.25em] uppercase">
            Switzerland · Europe · Latin America
          </p>
        </div>
      </div>
    </section>
  );
}
