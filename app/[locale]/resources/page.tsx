import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, HelpCircle, Brain, Zap, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | ORTHONOBA",
  description: "Blog, guides, FAQ and knowledge centers for AI, Automation and Software development.",
};

const RESOURCE_HUBS = [
  {
    icon: Brain,
    label: "AI Center",
    href: "resources/ai-center",
    desc: "In-depth knowledge on AI agents, large language models, and practical AI implementation for business.",
    tag: "Knowledge",
  },
  {
    icon: Zap,
    label: "Automation Center",
    href: "resources/automation-center",
    desc: "N8N, Make and workflow automation guides, templates and best practices.",
    tag: "Guides",
  },
  {
    icon: Code2,
    label: "Software Center",
    href: "resources/software-center",
    desc: "Next.js, SaaS development resources and technology decision guides.",
    tag: "Technical",
  },
];

const RESOURCE_TYPES = [
  { icon: BookOpen, label: "Blog", href: "resources/blog",   desc: "Articles and insights on AI, automation and digital transformation." },
  { icon: FileText, label: "Guides", href: "resources/guides", desc: "Step-by-step implementation guides for AI and automation projects." },
  { icon: HelpCircle, label: "FAQ",   href: "resources/faq",   desc: "Answers to the most common questions about our services and technology." },
];

export default async function ResourcesPage({
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Knowledge & Resources
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            Guides, articles and knowledge centers on AI, automation and software — built for business owners and decision-makers.
          </p>
        </div>
      </section>

      {/* Knowledge Centers */}
      <section className="py-16 px-6 border-b border-white/6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Knowledge Centers</p>
          <div className="grid md:grid-cols-3 gap-4">
            {RESOURCE_HUBS.map(({ icon: Icon, label, href, desc, tag }) => (
              <Link
                key={`${href}-${label}`}
                href={`/${locale}/${href}`}
                className="group bg-panel border border-white/6 rounded-2xl p-6 hover:border-gold/20 hover:bg-panel-2 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold/50 px-2 py-1 rounded-md border border-gold/15">
                    {tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors mb-2">{label}</h3>
                <p className="text-xs text-silver/70 leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-xs text-gold/50 group-hover:text-gold transition-colors">
                  Explore <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog, Guides, FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Content Library</p>
          <div className="grid md:grid-cols-3 gap-4">
            {RESOURCE_TYPES.map(({ icon: Icon, label, href, desc }) => (
              <Link
                key={`${href}-${label}`}
                href={`/${locale}/${href}`}
                className="group flex items-start gap-4 bg-panel border border-white/6 rounded-2xl p-5 hover:border-gold/20 hover:bg-panel-2 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/8 border border-gold/15 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <Icon size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors mb-1">{label}</p>
                  <p className="text-xs text-silver/70 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
