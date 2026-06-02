import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactCTA from "@/components/sections/contact-cta";
import { Bot, Mic, MessageCircle, Mail, Database } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.aiAgents" });
  return { title: t("title"), description: t("description") };
}

const AGENT_ICONS = [Mic, MessageCircle, Mail, Database];

export default async function AIAgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aiAgents" });
  const types = ["voice", "whatsapp", "email", "crm"] as const;

  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Bot size={14} />
            AI Agents
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {types.map((type, i) => {
            const Icon = AGENT_ICONS[i];
            return (
              <div
                key={type}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`types.${type}.title`)}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {t(`types.${type}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
