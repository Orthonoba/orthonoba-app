"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const INDUSTRIES = [
  { label: "Healthcare",     href: "industries/healthcare",    emoji: "🏥" },
  { label: "Dental Clinics", href: "industries/dental",        emoji: "🦷" },
  { label: "Real Estate",    href: "industries/real-estate",   emoji: "🏢" },
  { label: "Luxury",         href: "industries/luxury",        emoji: "💎" },
  { label: "Restaurants",    href: "industries/restaurants",   emoji: "🍽️" },
  { label: "Hospitality",    href: "industries/hospitality",   emoji: "🏨" },
  { label: "Logistics",      href: "industries/logistics",     emoji: "🚛" },
  { label: "Legal",          href: "industries/legal",         emoji: "⚖️" },
  { label: "Consulting",     href: "industries/consulting",    emoji: "📊" },
  { label: "Small Business", href: "industries/small-business", emoji: "🏪" },
  { label: "Enterprise",     href: "industries/enterprise",    emoji: "🌐" },
];

export default function Industries() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel border-y border-white/6 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">
              Industries
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Built for Your Sector
            </h2>
          </div>
          <Link
            href={`/${locale}/industries`}
            className="text-sm font-semibold text-gold hover:text-gold-light transition-colors self-start md:self-auto"
          >
            All industries →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map(({ label, href, emoji }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/8 bg-obsidian text-sm text-silver hover:text-white hover:border-gold/25 hover:bg-gold/4 transition-all"
            >
              <span className="text-base leading-none">{emoji}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
