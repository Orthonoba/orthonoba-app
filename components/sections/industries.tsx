"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const INDUSTRIES = [
  { label: "Dental Clinics",   href: "industries/dental" },
  { label: "Healthcare",       href: "industries/healthcare" },
  { label: "Real Estate",      href: "industries/real-estate" },
  { label: "Law Firms",        href: "industries/legal" },
  { label: "Logistics",        href: "industries/logistics" },
  { label: "Local Business",   href: "industries/small-business" },
  { label: "E-Commerce",       href: "industries/ecommerce" },
  { label: "Startups",         href: "industries/startups" },
  { label: "Luxury & Premium", href: "industries/luxury" },
];

export default function Industries() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel border-y border-white/5 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">
              Industries
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Built for Your Sector
            </h2>
          </div>
          <Link
            href={`/${locale}/industries`}
            className="text-sm font-semibold text-gold/75 hover:text-gold transition-colors self-start md:self-auto shrink-0"
          >
            All industries →
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {INDUSTRIES.map(({ label, href }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/8 bg-panel-2 text-sm text-silver/75 font-medium hover:text-white hover:border-gold/25 hover:bg-gold/4 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
