import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SOLUTION_META: Record<string, { title: string; desc: string; category: string }> = {
  "ai-agents":           { title: "AI Agents",            desc: "Custom AI agents that automate customer interactions, qualify leads and manage tasks around the clock.", category: "AI Solutions" },
  "voice-ai":            { title: "Voice AI",              desc: "AI-powered voice agents that answer calls, book appointments and handle customer service 24/7.", category: "AI Solutions" },
  "whatsapp-ai":         { title: "WhatsApp AI",           desc: "Intelligent chatbots on WhatsApp for sales automation, support and customer retention.", category: "AI Solutions" },
  "enterprise-ai":       { title: "Enterprise AI",         desc: "Large-scale AI deployment for enterprise operations, process intelligence and organisational automation.", category: "AI Solutions" },
  "crm-automation":      { title: "CRM Automation",        desc: "Automated lead management, follow-up sequences and sales pipeline management integrated with your CRM.", category: "Automation" },
  "workflows":           { title: "Workflow Automation",   desc: "N8N and Make workflows that connect your tools and automate repetitive business processes.", category: "Automation" },
  "automation":          { title: "Business Automation",   desc: "End-to-end automation of business operations — from lead capture to delivery and reporting.", category: "Automation" },
  "software-development":{ title: "Software Development",  desc: "Custom software solutions built with modern technology stacks designed to scale with your business.", category: "Software" },
  "web-applications":    { title: "Web Applications",      desc: "High-performance web applications built with Next.js, TypeScript and modern infrastructure.", category: "Software" },
  "saas-development":    { title: "SaaS Development",      desc: "End-to-end SaaS product development — from architecture and design to launch and scaling.", category: "Software" },
  "dashboards":          { title: "Dashboards & BI",       desc: "Custom data dashboards and business intelligence tools that turn raw data into actionable insights.", category: "Software" },
  "business-intelligence":{ title: "Business Intelligence", desc: "Analytics infrastructure, reporting systems and data visualisation for data-driven decisions.", category: "Software" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = SOLUTION_META[slug];
  if (!meta) return { title: "Solution | ORTHONOBA" };
  return {
    title: `${meta.title} | ORTHONOBA Solutions`,
    description: meta.desc,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = SOLUTION_META[slug];

  if (!meta) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-silver mb-4">Solution not found.</p>
          <Link href={`/${locale}/solutions`} className="text-gold hover:text-gold-light text-sm font-semibold">
            ← Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Back */}
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/solutions`}
            className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Solutions
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">{meta.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">{meta.title}</h1>
          <p className="text-silver text-lg max-w-2xl leading-relaxed mb-8">{meta.desc}</p>
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
          >
            Get a Custom Proposal <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Coming soon content */}
      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel border border-white/6 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-4">
              In Development
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Detailed Content Coming Soon</h2>
            <p className="text-sm text-silver/70 max-w-md mx-auto leading-relaxed mb-6">
              We are preparing comprehensive documentation for this solution. In the meantime, contact us to learn how we can implement this for your business.
            </p>
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
            >
              Book a Strategy Call <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
