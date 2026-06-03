import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | ORTHONOBA",
  description: "Real results from AI, Automation and Software projects. Coming soon.",
};

const CATEGORIES = [
  { label: "AI Projects", slug: "ai" },
  { label: "Automation", slug: "automation" },
  { label: "Software", slug: "software" },
  { label: "Marketing", slug: "marketing" },
  { label: "Websites", slug: "websites" },
];

export default async function CaseStudiesPage({
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Real Results. Real Projects.
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            We document the outcomes of our AI, automation and software projects — measurable results for real businesses.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-white/6 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map(({ label }) => (
            <span
              key={label}
              className="px-3.5 py-1.5 rounded-full border border-white/8 text-xs font-medium text-silver/60 cursor-default"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-panel border border-white/6 rounded-2xl p-12">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-2xl mx-auto mb-6">
              📋
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-5">
              Coming Soon
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Case Studies in Preparation</h2>
            <p className="text-silver/70 text-sm leading-relaxed max-w-md mx-auto mb-8">
              We are currently documenting the results of our first pilot projects across AI, automation and software. These will be published with full transparency — real numbers, real clients (with permission), real outcomes.
            </p>
            <p className="text-xs text-muted mb-8">
              No fake testimonials. No made-up statistics. Only verified results.
            </p>
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
            >
              Become a Pilot Client <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
