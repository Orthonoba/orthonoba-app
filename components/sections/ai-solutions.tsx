"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bot, CheckCircle2, ArrowRight, FlaskConical } from "lucide-react";

export default function AISolutions() {
  const t = useTranslations("aiSolutions");
  const { locale } = useParams<{ locale: string }>();

  const features: string[] = t.raw("features") as string[];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Bot size={13} />
            AI Agents
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">{t("subtitle")}</p>

          <ul className="space-y-3 mb-10">
            {features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-violet-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/${locale}/ai-agents`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-500 transition-colors"
          >
            {t("cta")}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Right: Demo coming soon */}
        <div className="relative">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
              <FlaskConical size={26} />
            </div>
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
              Live Demo
            </p>
            <h3 className="text-xl font-bold text-white mb-3">
              {t("demoTitle")}
            </h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {t("demoDesc")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 border border-slate-700 text-slate-300 rounded-xl text-sm font-medium hover:border-violet-500/40 hover:text-violet-400 transition-colors"
            >
              {t("demoRequest")}
              <ArrowRight size={13} />
            </Link>
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 bg-violet-500/[0.05] rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
