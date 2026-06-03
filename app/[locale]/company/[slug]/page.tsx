import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const COMPANY_META: Record<string, { title: string; desc: string }> = {
  "about":       { title: "About ORTHONOBA",   desc: "Who we are, what we believe, and how we operate as a digital transformation company." },
  "story":       { title: "Our Story",          desc: "The journey from dental clinics to AI — how ORTHONOBA was built." },
  "methodology": { title: "Our Methodology",    desc: "How we approach every project from discovery to delivery and long-term support." },
  "technology":  { title: "Technology Stack",   desc: "The tools and technologies we use to build robust, scalable solutions for our clients." },
  "partners":    { title: "Partners",           desc: "Technology partners and strategic alliances that power our solutions." },
  "careers":     { title: "Careers",            desc: "Open positions and how to join the ORTHONOBA team." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = COMPANY_META[slug];
  if (!meta) return { title: "Company | ORTHONOBA" };
  return { title: `${meta.title} | ORTHONOBA`, description: meta.desc };
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = COMPANY_META[slug];

  if (!meta) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-silver mb-4">Page not found.</p>
          <Link href={`/${locale}/company`} className="text-gold hover:text-gold-light text-sm font-semibold">
            ← Company
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/company`} className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors">
            <ArrowLeft size={12} /> Company
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">Company</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">{meta.title}</h1>
          <p className="text-silver text-lg max-w-2xl leading-relaxed">{meta.desc}</p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel border border-white/6 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-4">
              In Development
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Page Coming Soon</h2>
            <p className="text-sm text-silver/70 max-w-md mx-auto leading-relaxed mb-6">
              This page is being prepared. In the meantime, feel free to reach out directly.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/25 text-gold rounded-lg text-sm font-semibold hover:bg-gold/6 transition-colors"
            >
              Contact us <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
