import { getTranslations } from "next-intl/server";
import { TrendingUp, Mail, Target, BarChart3 } from "lucide-react";

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesOverview" });

  const items = [
    {
      icon: Target,
      key: "marketing" as const,
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
    },
    {
      icon: Mail,
      key: "seo" as const,
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
    },
    {
      icon: BarChart3,
      key: "consulting" as const,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
  ];

  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
            <TrendingUp size={14} />
            Marketing
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Marketing Automation & SEO
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, key, color, bg }) => (
            <div
              key={key}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} border flex items-center justify-center ${color} mb-5`}>
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
