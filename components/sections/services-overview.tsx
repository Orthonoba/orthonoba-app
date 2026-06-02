import { useTranslations } from "next-intl";
import { Bot, Mic, MessageCircle, Zap, Globe, Server, TrendingUp, Search, Lightbulb } from "lucide-react";

const SERVICE_META = [
  { key: "aiAgents",    icon: Bot,          color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { key: "voiceAI",     icon: Mic,          color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  { key: "whatsappAI",  icon: MessageCircle, color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  { key: "automation",  icon: Zap,          color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  { key: "webDev",      icon: Globe,        color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
  { key: "saas",        icon: Server,       color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20" },
  { key: "marketing",   icon: TrendingUp,   color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20" },
  { key: "seo",         icon: Search,       color: "text-lime-400",   bg: "bg-lime-500/10 border-lime-500/20" },
  { key: "consulting",  icon: Lightbulb,    color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
] as const;

export default function ServicesOverview() {
  const t = useTranslations("servicesOverview");

  return (
    <section className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_META.map(({ key, icon: Icon, color, bg }) => (
            <div
              key={key}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors group"
            >
              <div className={`w-11 h-11 rounded-xl ${bg} border flex items-center justify-center ${color} mb-4`}>
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">{t(`items.${key}.title`)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
