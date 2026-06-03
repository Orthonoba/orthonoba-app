"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Brain, Zap, Code2, TrendingUp, ArrowRight } from "lucide-react";

const SOLUTIONS = [
  {
    icon: Brain,
    label: "AI Solutions",
    title: "Intelligent AI Agents",
    description:
      "Custom AI agents for voice, WhatsApp, email and CRM. Automate customer interactions around the clock without human intervention.",
    items: ["Voice AI", "WhatsApp AI", "CRM Automation", "Enterprise AI"],
    href: "solutions/ai-agents",
    accent: "#D4AF37",
  },
  {
    icon: Zap,
    label: "Automation",
    title: "Business Process Automation",
    description:
      "Eliminate repetitive manual work with N8N and Make workflows. Connect your tools and let automation drive operations.",
    items: ["CRM Workflows", "Lead Nurturing", "N8N / Make", "API Integrations"],
    href: "solutions/automation",
    accent: "#D4AF37",
  },
  {
    icon: Code2,
    label: "Software",
    title: "Custom Software & SaaS",
    description:
      "Web applications, SaaS platforms and dashboards built with Next.js and modern infrastructure for scalable business growth.",
    items: ["Web Applications", "SaaS Platforms", "Dashboards", "Business Intelligence"],
    href: "solutions/software-development",
    accent: "#D4AF37",
  },
  {
    icon: TrendingUp,
    label: "Growth",
    title: "Digital Marketing & SEO",
    description:
      "Data-driven marketing combining SEO, Google Ads, Meta Ads and automation to acquire customers profitably at scale.",
    items: ["SEO Local & International", "Google Ads", "Meta Ads", "Marketing Automation"],
    href: "services",
    accent: "#D4AF37",
  },
];

export default function CoreSolutions() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-obsidian py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Four Ways We Transform Your Business
          </h2>
          <p className="text-silver max-w-xl mx-auto text-sm leading-relaxed">
            From AI implementation to software development — integrated solutions that create measurable growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {SOLUTIONS.map(({ icon: Icon, label, title, description, items, href }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="group relative bg-panel border border-white/6 rounded-2xl p-8 hover:border-gold/20 hover:bg-panel-2 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5">
                  <Icon size={18} />
                </div>

                {/* Label */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/70 mb-2">
                  {label}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-silver/80 leading-relaxed mb-6">
                  {description}
                </p>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-silver/70 border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gold/60 group-hover:text-gold transition-colors">
                  Learn more <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
