import { useTranslations } from "next-intl";
import { Zap, GitBranch, Mail, Database } from "lucide-react";

const ITEM_ICONS = [Database, Mail, GitBranch];

export default function AutomationSection() {
  const t = useTranslations("automationSection");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-5">
            <Zap size={13} />
            Automation
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = ITEM_ICONS[i];
            return (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
