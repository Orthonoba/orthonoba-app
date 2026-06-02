"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const t = useTranslations("contactCta");
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
          {/* Amber glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="relative text-3xl md:text-4xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="relative text-slate-400 text-lg mb-8">
            {t("subtitle")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="relative inline-flex items-center gap-2 px-7 py-4 bg-amber-400 text-slate-900 rounded-xl font-bold hover:bg-amber-300 transition-colors"
          >
            {t("cta")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
