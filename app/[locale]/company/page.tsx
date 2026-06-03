import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, User, BookOpen, Cpu, Handshake, Briefcase, MapPin, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Company | ORTHONOBA",
  description: "About ORTHONOBA — our founder, story, methodology, technology and team.",
};

const COMPANY_LINKS = [
  {
    icon: MapPin,
    label: "About ORTHONOBA",
    href: "company/about",
    desc: "Who we are, what we believe in, and how we operate.",
  },
  {
    icon: User,
    label: "Our Founder",
    href: "company/founder",
    desc: "José Gregorio Rodríguez — 30+ years of business and technology experience.",
  },
  {
    icon: BookOpen,
    label: "Our Story",
    href: "company/story",
    desc: "From dental clinics to AI — the journey that built ORTHONOBA.",
  },
  {
    icon: Lightbulb,
    label: "Methodology",
    href: "company/methodology",
    desc: "How we approach every project — from discovery to delivery.",
  },
  {
    icon: Cpu,
    label: "Technology Stack",
    href: "company/technology",
    desc: "The tools and technologies we use to build for our clients.",
  },
  {
    icon: Handshake,
    label: "Partners",
    href: "company/partners",
    desc: "Technology partners and strategic alliances.",
  },
  {
    icon: Briefcase,
    label: "Careers",
    href: "company/careers",
    desc: "Join ORTHONOBA — open positions and how to apply.",
  },
];

export default async function CompanyPage({
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Company</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Built on Real Experience
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            ORTHONOBA was built by someone who ran real businesses for 30 years — not by engineers who theorised about them.
          </p>
        </div>
      </section>

      {/* Company links */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY_LINKS.map(({ icon: Icon, label, href, desc }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="group bg-panel border border-white/6 rounded-2xl p-6 hover:border-gold/20 hover:bg-panel-2 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                <Icon size={16} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors mb-2">{label}</h3>
              <p className="text-xs text-silver/70 leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-xs text-gold/50 group-hover:text-gold transition-colors">
                Learn more <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
