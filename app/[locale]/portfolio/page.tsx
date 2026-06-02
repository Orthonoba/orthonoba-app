import { getTranslations } from "next-intl/server";
import ContactCTA from "@/components/sections/contact-cta";
import { Briefcase } from "lucide-react";

const PROJECTS = [
  { title: "Voice AI Receptionist", category: "AI Agent", client: "Clinica Dentale Lugano", tags: ["Voice AI", "Automation"] },
  { title: "WhatsApp Bot E-Commerce", category: "WhatsApp AI", client: "Gioielleria Milano", tags: ["WhatsApp AI", "Sales"] },
  { title: "CRM Automation", category: "Automation", client: "Agenzia Immobiliare Zurigo", tags: ["N8N", "CRM"] },
  { title: "Landing Page Premium", category: "Web Dev", client: "Studio Legale Berna", tags: ["Next.js", "SEO"] },
  { title: "SaaS Platform", category: "SaaS", client: "Startup HealthTech", tags: ["SaaS", "AI"] },
  { title: "Marketing Automation", category: "Marketing", client: "Ristorante Ginevra", tags: ["Email", "AI"] },
];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Briefcase size={14} />
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors group"
            >
              <div className="h-36 bg-slate-800 rounded-xl mb-5 group-hover:bg-slate-700 transition-colors" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {p.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-1">{p.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{p.client}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
