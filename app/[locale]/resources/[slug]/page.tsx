import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const RESOURCE_META: Record<string, { title: string; desc: string }> = {
  "blog":               { title: "Blog",                desc: "Articles and insights on AI, automation and digital transformation." },
  "guides":             { title: "Guides",              desc: "Step-by-step implementation guides for AI, automation and software projects." },
  "faq":                { title: "FAQ",                 desc: "Answers to the most common questions about our services, technology and approach." },
  "ai-center":          { title: "AI Center",           desc: "In-depth knowledge on AI agents, LLMs and practical AI implementation for business." },
  "automation-center":  { title: "Automation Center",   desc: "N8N, Make and workflow automation guides, templates and best practices." },
  "software-center":    { title: "Software Center",     desc: "Next.js, SaaS development resources and technology decision guides." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = RESOURCE_META[slug];
  if (!meta) return { title: "Resources | ORTHONOBA" };
  return { title: `${meta.title} | ORTHONOBA Resources`, description: meta.desc };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = RESOURCE_META[slug];

  if (!meta) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-silver mb-4">Resource not found.</p>
          <Link href={`/${locale}/resources`} className="text-gold hover:text-gold-light text-sm font-semibold">
            ← Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/resources`} className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors">
            <ArrowLeft size={12} /> Resources
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">{meta.title}</h1>
          <p className="text-silver text-lg max-w-2xl leading-relaxed">{meta.desc}</p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel border border-white/6 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-4">
              Coming Soon
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Content in Preparation</h2>
            <p className="text-sm text-silver/70 max-w-md mx-auto leading-relaxed mb-6">
              We are building this knowledge center with curated, high-quality content. Subscribe or check back soon.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/25 text-gold rounded-lg text-sm font-semibold hover:bg-gold/6 transition-colors"
            >
              Get notified when ready <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
