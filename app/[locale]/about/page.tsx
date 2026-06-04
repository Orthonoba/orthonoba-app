import { getTranslations } from "next-intl/server";
import { Lightbulb, BarChart3, Eye, Handshake } from "lucide-react";

const VALUE_ICONS = [Lightbulb, BarChart3, Eye, Handshake];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const valueKeys = [0, 1, 2, 3] as const;

  return (
    <>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400 mb-4">{t("subtitle")}</p>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t("mission")}
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            {t("values.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-white mb-2">
                    {t(`values.items.${i}.title`)}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {t(`values.items.${i}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
