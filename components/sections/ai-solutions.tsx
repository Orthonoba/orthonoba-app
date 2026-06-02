"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bot, CheckCircle2, ArrowRight } from "lucide-react";

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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">{t("subtitle")}</p>

          <ul className="space-y-3 mb-10">
            {features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-violet-400 mt-0.5 shrink-0" />
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

        {/* Right: visual */}
        <div className="relative">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            {/* Mock chat UI */}
            {[
              { role: "user", text: "Vorrei prenotare una consulenza" },
              { role: "ai", text: "Certo! Ho trovato 3 slot disponibili questa settimana. Quale preferisce?" },
              { role: "user", text: "Giovedì alle 15:00" },
              { role: "ai", text: "Perfetto! Appuntamento confermato per giovedì 5 giugno alle 15:00. Riceverà una email di conferma." },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-br-sm"
                      : "bg-slate-800 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Bot size={11} className="text-violet-400" />
                      <span className="text-[10px] text-violet-400 font-semibold">AI Agent</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <div className="flex-1 h-9 bg-slate-800 rounded-xl" />
              <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 bg-violet-500/10 rounded-3xl blur-xl -z-10" />
        </div>
      </div>
    </section>
  );
}
