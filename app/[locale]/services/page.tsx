import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactCTA from "@/components/sections/contact-cta";
import {
  Globe, Search, TrendingUp, LayoutTemplate, ShoppingBag,
  Bot, Mic, MessageCircle, Zap, Server,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return { title: t("title"), description: t("description") };
}

const AGENCY_SERVICES = [
  { icon: Globe,          color: "text-sky-400",    bg: "bg-sky-500/10 border-sky-500/20",    key: "webDesign" },
  { icon: LayoutTemplate, color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",  key: "wordpress" },
  { icon: Search,         color: "text-lime-400",   bg: "bg-lime-500/10 border-lime-500/20",  key: "seo" },
  { icon: TrendingUp,     color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20",  key: "marketing" },
  { icon: ShoppingBag,    color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", key: "googleAds" },
] as const;

const STUDIO_SERVICES = [
  { icon: Bot,            color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", key: "aiAgents" },
  { icon: Mic,            color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", key: "voiceAI" },
  { icon: MessageCircle,  color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",   key: "whatsappAI" },
  { icon: Zap,            color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20",   key: "automation" },
  { icon: Server,         color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20",     key: "saas" },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

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

      {/* Agency Division */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-800" />
            <div className="px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">
                {t("agencyLabel")}
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <p className="text-slate-500 text-sm text-center mb-8">{t("agencyDesc")}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {AGENCY_SERVICES.map(({ icon: Icon, color, bg, key }) => (
              <div
                key={key}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center ${color} mb-4`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{t(`agency.${key}.title`)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t(`agency.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Division */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-800" />
            <div className="px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5">
              <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">
                {t("studioLabel")}
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <p className="text-slate-500 text-sm text-center mb-8">{t("studioDesc")}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {STUDIO_SERVICES.map(({ icon: Icon, color, bg, key }) => (
              <div
                key={key}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center ${color} mb-4`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{t(`studio.${key}.title`)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t(`studio.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
