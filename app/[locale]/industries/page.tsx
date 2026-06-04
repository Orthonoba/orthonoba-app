import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries | ORTHONOBA",
  description: "AI, Automation and Software solutions tailored for Healthcare, Real Estate, Luxury, Restaurants, Legal and more.",
};

const INDUSTRIES = [
  {
    label: "Healthcare",
    href: "industries/healthcare",
    emoji: "🏥",
    desc: "Patient management, appointment AI, workflow automation and GDPR-compliant digital systems for healthcare providers.",
  },
  {
    label: "Dental Clinics",
    href: "industries/dental",
    emoji: "🦷",
    desc: "Specialised dental clinic software, patient portals, appointment automation and CAD/CAM workflow management.",
  },
  {
    label: "Real Estate",
    href: "industries/real-estate",
    emoji: "🏢",
    desc: "AI lead qualification, property management systems, CRM automation and multilingual marketing for real estate agencies.",
  },
  {
    label: "Luxury & Jewelry",
    href: "industries/luxury",
    emoji: "💎",
    desc: "Premium digital experiences, exclusive e-commerce, VIP client management and high-end brand positioning.",
  },
  {
    label: "Restaurants",
    href: "industries/restaurants",
    emoji: "🍽️",
    desc: "Online ordering, table booking automation, WhatsApp AI for reservations and loyalty programme management.",
  },
  {
    label: "Hospitality",
    href: "industries/hospitality",
    emoji: "🏨",
    desc: "Guest communication automation, booking management, review systems and multi-channel digital presence.",
  },
  {
    label: "Logistics",
    href: "industries/logistics",
    emoji: "🚛",
    desc: "Fleet tracking, delivery automation, client communication systems and operational efficiency software.",
  },
  {
    label: "Legal",
    href: "industries/legal",
    emoji: "⚖️",
    desc: "Client intake automation, document management, AI research assistants and GDPR-compliant practice software.",
  },
  {
    label: "Consulting",
    href: "industries/consulting",
    emoji: "📊",
    desc: "Client portal, proposal automation, knowledge management and business intelligence dashboards.",
  },
  {
    label: "Small Business",
    href: "industries/small-business",
    emoji: "🏪",
    desc: "Affordable AI and automation solutions that give small businesses the tools of large enterprises.",
  },
  {
    label: "Enterprise",
    href: "industries/enterprise",
    emoji: "🌐",
    desc: "Large-scale AI deployment, enterprise software development, data infrastructure and digital transformation.",
  },
];

export default async function IndustriesPage({
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Industries</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Solutions Built for Your Sector
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            We combine deep industry knowledge with modern AI and software to deliver solutions that fit your specific sector.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map(({ label, href, emoji, desc }) => (
            <Link
              key={`${href}-${label}`}
              href={`/${locale}/${href}`}
              className="group bg-panel border border-white/6 rounded-2xl p-6 hover:border-gold/20 hover:bg-panel-2 transition-all"
            >
              <div className="text-3xl mb-4">{emoji}</div>
              <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors mb-2">
                {label}
              </h3>
              <p className="text-xs text-silver/70 leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-xs text-gold/50 group-hover:text-gold transition-colors">
                Explore solutions <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/6 py-16 px-6 text-center">
        <p className="text-silver text-sm mb-4">Don&apos;t see your industry? We serve all sectors.</p>
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
