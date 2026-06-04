import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
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
    <main className="bg-obsidian min-h-screen">

      {/* Header */}
      <section className="pt-36 pb-16 border-b border-panel-3">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Pricing
              </span>
              <div className="w-10 h-px bg-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              {t("title")}
            </h1>
            <p className="text-silver text-lg leading-relaxed">{t("subtitle")}</p>
          </div>
        </Container>
      </section>

      {/* Agency packages */}
      <section className="section-py border-b border-panel-3">
        <Container>
          {/* Section label */}
          <div className="flex items-center gap-5 mb-12">
            <div className="h-px flex-1 bg-panel-3" />
            <div className="flex items-center gap-2.5 px-5 py-2 border border-gold/20 bg-gold/5">
              <Globe size={12} className="text-gold" />
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("agencyTitle")}
              </span>
            </div>
            <div className="h-px flex-1 bg-panel-3" />
          </div>

          <p className="text-muted text-sm text-center mb-10 -mt-4">{t("agencyDesc")}</p>

          <div className="grid md:grid-cols-2 gap-px bg-panel-3 max-w-3xl mx-auto">
            {agencyPackages.map((pkg) => {
              const features: string[] = t.raw(`agency.${pkg}.features`) as string[];
              return (
                <div
                  key={pkg}
                  className="bg-panel p-8 flex flex-col hover:bg-panel-2 transition-colors duration-300"
                >
                  <div className="mb-8">
                    <h3 className="text-white text-lg font-bold tracking-tight mb-1.5">
                      {t(`agency.${pkg}.name`)}
                    </h3>
                    <p className="text-muted text-sm">{t(`agency.${pkg}.tagline`)}</p>
                  </div>

                  <div className="mb-8 flex-1">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.25em] mb-5">
                      {t("included")}
                    </p>
                    <ul className="space-y-3">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={13} className="text-gold mt-0.5 shrink-0" />
                          <span className="text-silver text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-panel-3 text-silver text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-white active:scale-[0.98] transition-all duration-200"
                  >
                    {t("requestQuote")}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Studio packages */}
      <section className="section-py border-b border-panel-3">
        <Container>
          {/* Section label */}
          <div className="flex items-center gap-5 mb-12">
            <div className="h-px flex-1 bg-panel-3" />
            <div className="flex items-center gap-2.5 px-5 py-2 border border-gold/20 bg-gold/5">
              <Bot size={12} className="text-gold" />
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("studioTitle")}
              </span>
            </div>
            <div className="h-px flex-1 bg-panel-3" />
          </div>

          <p className="text-muted text-sm text-center mb-10 -mt-4">{t("studioDesc")}</p>

          <div className="grid md:grid-cols-2 gap-px bg-panel-3 max-w-3xl mx-auto">
            {studioPackages.map((pkg, index) => {
              const features: string[] = t.raw(`studio.${pkg}.features`) as string[];
              const isRecommended = index === 1; // Full Automation is the featured plan
              return (
                <div
                  key={pkg}
                  className={[
                    "flex flex-col p-8 relative transition-colors duration-300",
                    isRecommended
                      ? "bg-panel-2 hover:bg-panel-3"
                      : "bg-panel hover:bg-panel-2",
                  ].join(" ")}
                >
                  {isRecommended && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gold/50" />
                  )}

                  <div className="mb-8">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-white text-lg font-bold tracking-tight">
                        {t(`studio.${pkg}.name`)}
                      </h3>
                      {isRecommended && (
                        <Badge variant="gold" className="shrink-0 mt-0.5">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted text-sm">{t(`studio.${pkg}.tagline`)}</p>
                  </div>

                  <div className="mb-8 flex-1">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.25em] mb-5">
                      {t("included")}
                    </p>
                    <ul className="space-y-3">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={13} className="text-gold mt-0.5 shrink-0" />
                          <span className="text-silver text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/${locale}/contact`}
                    className={[
                      "flex items-center justify-center gap-2 w-full py-3.5",
                      "text-xs font-bold tracking-widest uppercase",
                      "active:scale-[0.98] transition-all duration-200",
                      isRecommended
                        ? "bg-gold text-obsidian hover:bg-gold-light"
                        : "border border-panel-3 text-silver hover:border-gold hover:text-white",
                    ].join(" ")}
                  >
                    {t("requestQuote")}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Enterprise CTA */}
      <section className="section-py">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden border border-gold/15 bg-panel p-10 md:p-14 text-center">
              {/* Subtle gold glow */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-7">
                  <div className="w-8 h-px bg-gold/40" />
                  <span className="text-gold/70 text-[10px] font-bold tracking-[0.35em] uppercase">
                    Enterprise
                  </span>
                  <div className="w-8 h-px bg-gold/40" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                  {t("enterprise")}
                </h2>
                <p className="text-silver text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  {t("enterpriseDesc")}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2.5 bg-gold text-obsidian px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light active:scale-[0.98] transition-all duration-200"
                >
                  {t("contactUs")}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
