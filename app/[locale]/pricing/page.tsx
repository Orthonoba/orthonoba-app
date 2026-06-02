import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Check, ArrowRight, Globe, Bot } from "lucide-react";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const agencyPackages = ["starter", "growth"] as const;
  const studioPackages = ["agent", "automation"] as const;

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Agency packages */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-slate-800" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5">
              <Globe size={13} className="text-sky-400" />
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">
                {t("agencyTitle")}
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <p className="text-slate-500 text-sm text-center mb-8">{t("agencyDesc")}</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {agencyPackages.map((pkg) => {
              const features: string[] = t.raw(`agency.${pkg}.features`) as string[];
              return (
                <div
                  key={pkg}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {t(`agency.${pkg}.name`)}
                    </h3>
                    <p className="text-sm text-slate-400">{t(`agency.${pkg}.tagline`)}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      {t("included")}
                    </p>
                    <ul className="space-y-2.5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={15} className="text-sky-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/${locale}/contact`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl text-sm font-semibold hover:bg-sky-500/20 transition-colors"
                    >
                      {t("requestQuote")}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studio packages */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-slate-800" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5">
              <Bot size={13} className="text-violet-400" />
              <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">
                {t("studioTitle")}
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <p className="text-slate-500 text-sm text-center mb-8">{t("studioDesc")}</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {studioPackages.map((pkg) => {
              const features: string[] = t.raw(`studio.${pkg}.features`) as string[];
              return (
                <div
                  key={pkg}
                  className="bg-slate-900 border border-violet-500/20 rounded-2xl p-8 flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {t(`studio.${pkg}.name`)}
                    </h3>
                    <p className="text-sm text-slate-400">{t(`studio.${pkg}.tagline`)}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      {t("included")}
                    </p>
                    <ul className="space-y-2.5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={15} className="text-violet-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/${locale}/contact`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-500 transition-colors"
                    >
                      {t("requestQuote")}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
            <h2 className="relative text-2xl font-bold text-white mb-3">{t("enterprise")}</h2>
            <p className="relative text-slate-400 mb-7 max-w-md mx-auto">{t("enterpriseDesc")}</p>
            <Link
              href={`/${locale}/contact`}
              className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 text-slate-900 rounded-xl font-bold text-sm hover:bg-amber-300 transition-colors"
            >
              {t("contactUs")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
