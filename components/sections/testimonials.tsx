import { useTranslations } from "next-intl";
import { Shield, Globe2, Languages, Cpu } from "lucide-react";

const TRUST_PILLARS = [
  {
    icon: Globe2,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    titleKey: "switzerland",
    descKey: "switzerlandDesc",
  },
  {
    icon: Languages,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    titleKey: "multilingual",
    descKey: "multilingualDesc",
  },
  {
    icon: Cpu,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    titleKey: "aiFirst",
    descKey: "aiFirstDesc",
  },
  {
    icon: Shield,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    titleKey: "privacy",
    descKey: "privacyDesc",
  },
] as const;

export default function TrustSection() {
  const t = useTranslations("trust");

  return (
    <section className="py-24 px-6 bg-slate-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_PILLARS.map(({ icon: Icon, color, bg, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} border flex items-center justify-center ${color} mx-auto mb-4`}>
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-white mb-2">{t(titleKey)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>

        {/* Case studies placeholder */}
        <div className="mt-12 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
            {t("caseStudiesLabel")}
          </p>
          <p className="text-slate-300 font-semibold text-lg">{t("caseStudiesTitle")}</p>
          <p className="text-slate-500 text-sm mt-2">{t("caseStudiesDesc")}</p>
        </div>
      </div>
    </section>
  );
}
