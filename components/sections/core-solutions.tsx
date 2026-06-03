"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Brain, Zap, Code2, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    label: "AI Agents",
    title: "Intelligent AI Agents",
    description:
      "Custom AI agents for sales, customer service and operations — working around the clock without human intervention.",
    href: "ai-agents",
  },
  {
    icon: Zap,
    label: "Business Automation",
    title: "Process Automation",
    description:
      "Enterprise process automation via AI and intelligent flows. Eliminate repetitive work and scale operations efficiently.",
    href: "automation",
  },
  {
    icon: Code2,
    label: "Software & SaaS",
    title: "Custom Software & SaaS",
    description:
      "Web applications, SaaS platforms and custom software built to grow with your business from day one.",
    href: "solutions/saas-development",
  },
];

export default function CoreSolutions() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-obsidian py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Three Ways We Transform Your Business
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, label, title, description, href }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="group relative bg-panel border border-white/6 rounded-2xl p-9 hover:border-gold/20 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(212,175,55,0.07) 0%, transparent 65%)",
                }}
              />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-7">
                  <Icon size={20} />
                </div>

                {/* Label */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/55 mb-2.5">
                  {label}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-200">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-silver/65 leading-relaxed flex-1">
                  {description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-1.5 mt-10 text-xs font-semibold text-gold/45 group-hover:text-gold transition-colors">
                  Learn more{" "}
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
