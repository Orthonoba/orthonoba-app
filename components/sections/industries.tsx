import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";

export default function Industries() {
  const t = useTranslations("industries");
  const items: string[] = t.raw("items") as string[];

  return (
    <section className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-sm font-medium mb-5">
            <Building2 size={13} />
            Industries
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 hover:border-amber-500/30 hover:text-amber-400 transition-colors cursor-default"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
