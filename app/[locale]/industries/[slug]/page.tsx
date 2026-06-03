import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const INDUSTRY_META: Record<string, { title: string; desc: string; emoji: string }> = {
  "healthcare":    { title: "Healthcare",       emoji: "🏥", desc: "AI and automation solutions for healthcare providers — patient management, appointment automation and GDPR-compliant digital systems." },
  "dental":        { title: "Dental Clinics",   emoji: "🦷", desc: "Specialised digital solutions for dental practices — from patient portals to CAD/CAM workflow management and appointment AI." },
  "real-estate":   { title: "Real Estate",      emoji: "🏢", desc: "AI lead qualification, CRM automation and multilingual digital marketing for real estate agencies across Switzerland and Europe." },
  "luxury":        { title: "Luxury & Jewelry", emoji: "💎", desc: "Premium digital experiences and exclusive e-commerce for luxury brands, jewellery and high-end retail." },
  "restaurants":   { title: "Restaurants",      emoji: "🍽️", desc: "Online ordering, WhatsApp AI for reservations, table booking automation and digital loyalty programmes." },
  "hospitality":   { title: "Hospitality",      emoji: "🏨", desc: "Guest communication automation, booking management and multi-channel digital presence for hotels and hospitality businesses." },
  "logistics":     { title: "Logistics",        emoji: "🚛", desc: "Fleet tracking, delivery automation and client communication systems for logistics and transport companies." },
  "legal":         { title: "Legal",            emoji: "⚖️", desc: "Client intake automation, document management and GDPR-compliant practice management software for law firms." },
  "consulting":    { title: "Consulting",       emoji: "📊", desc: "Client portal, proposal automation, knowledge management and business intelligence for consulting firms." },
  "small-business":{ title: "Small Business",  emoji: "🏪", desc: "Affordable AI and automation solutions that give small businesses enterprise-level technology at SME costs." },
  "enterprise":    { title: "Enterprise",       emoji: "🌐", desc: "Large-scale AI deployment, enterprise software and digital transformation for established organisations." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = INDUSTRY_META[slug];
  if (!meta) return { title: "Industry | ORTHONOBA" };
  return {
    title: `${meta.title} Solutions | ORTHONOBA`,
    description: meta.desc,
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = INDUSTRY_META[slug];

  if (!meta) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-silver mb-4">Industry not found.</p>
          <Link href={`/${locale}/industries`} className="text-gold hover:text-gold-light text-sm font-semibold">
            ← All Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/industries`} className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors">
            <ArrowLeft size={12} /> Industries
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-5xl mb-5">{meta.emoji}</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">Industry</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">{meta.title}</h1>
          <p className="text-silver text-lg max-w-2xl leading-relaxed mb-8">{meta.desc}</p>
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
          >
            Discuss Your Project <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel border border-white/6 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-4">
              In Development
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Sector-Specific Content Coming Soon</h2>
            <p className="text-sm text-silver/70 max-w-md mx-auto leading-relaxed mb-6">
              We are preparing detailed case studies and solution documentation for this sector. Book a call to discuss your specific needs now.
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
