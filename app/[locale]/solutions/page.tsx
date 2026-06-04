import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Zap, Code2, ArrowRight, Bot, Phone, MessageSquare, Building2, Settings, GitBranch, AppWindow, LayoutDashboard, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Solutions | ORTHONOBA",
  description: "AI Agents, Automation and Software Development solutions for modern businesses.",
};

const SOLUTION_GROUPS = [
  {
    id: "ai",
    icon: Brain,
    label: "AI Solutions",
    title: "Intelligent AI Agents",
    desc: "Deploy custom AI agents that work for you 24/7 — handling customers, qualifying leads, booking appointments and automating decisions.",
    solutions: [
      { icon: Bot,           label: "AI Agents",          href: "solutions/ai-agents",     desc: "Custom AI agents for any business process" },
      { icon: Phone,         label: "Voice AI",            href: "solutions/voice-ai",      desc: "AI receptionists and voice agents 24/7" },
      { icon: MessageSquare, label: "WhatsApp AI",         href: "solutions/whatsapp-ai",   desc: "Conversational AI on WhatsApp" },
      { icon: Building2,     label: "Enterprise AI",       href: "solutions/enterprise-ai", desc: "AI at scale for large organisations" },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    label: "Automation",
    title: "Business Process Automation",
    desc: "Eliminate repetitive work. Connect your tools. Let N8N, Make and custom workflows handle operations automatically.",
    solutions: [
      { icon: Settings,   label: "CRM Automation",     href: "solutions/crm-automation", desc: "Automate leads, follow-ups and pipeline" },
      { icon: GitBranch,  label: "Workflows",          href: "solutions/workflows",       desc: "N8N & Make automation workflows" },
      { icon: Zap,        label: "Business Processes", href: "solutions/automation",      desc: "End-to-end process automation" },
    ],
  },
  {
    id: "software",
    icon: Code2,
    label: "Software",
    title: "Custom Software & SaaS",
    desc: "Web applications, SaaS platforms, dashboards and business intelligence tools built for growth and scale.",
    solutions: [
      { icon: AppWindow,     label: "Web Applications",      href: "solutions/web-applications",   desc: "Custom Next.js web applications" },
      { icon: Code2,         label: "SaaS Development",      href: "solutions/saas-development",   desc: "End-to-end SaaS product development" },
      { icon: LayoutDashboard, label: "Dashboards",          href: "solutions/dashboards",         desc: "Data dashboards & reporting tools" },
      { icon: BarChart3,     label: "Business Intelligence",  href: "solutions/business-intelligence", desc: "Analytics & data visualisation" },
    ],
  },
];

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6 border-b border-white/6">
        <div
          className="absolute inset-x-0 top-0 h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(212,175,55,0.10) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Technology That Transforms Business
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            From AI agents to custom software — integrated solutions designed to create measurable results for your business.
          </p>
        </div>
      </section>

      {/* Solution Groups */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {SOLUTION_GROUPS.map(({ id, icon: Icon, label, title, desc, solutions }) => (
            <div key={id}>
              {/* Group header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-1">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">{label}</p>
                  <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                  <p className="text-sm text-silver max-w-xl">{desc}</p>
                </div>
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pl-0">
                {solutions.map(({ icon: SIcon, label: slabel, href, desc: sdesc }) => (
                  <Link
                    key={`${href}-${slabel}`}
                    href={`/${locale}/${href}`}
                    className="group bg-panel border border-white/6 rounded-2xl p-5 hover:border-gold/20 hover:bg-panel-2 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/8 border border-gold/15 flex items-center justify-center text-gold mb-4">
                      <SIcon size={15} />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors mb-1.5">
                      {slabel}
                    </p>
                    <p className="text-xs text-silver/70 leading-relaxed mb-4">{sdesc}</p>
                    <div className="flex items-center gap-1 text-xs text-gold/50 group-hover:text-gold transition-colors">
                      Learn more <ArrowRight size={11} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/6 py-16 px-6 text-center">
        <p className="text-silver text-sm mb-4">Not sure which solution fits your business?</p>
        <Link
          href={`/${locale}/consultation`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
        >
          Book a Free Strategy Call <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
