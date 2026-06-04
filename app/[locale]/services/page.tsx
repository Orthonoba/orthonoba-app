import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Search, TrendingUp, ShoppingBag, LayoutTemplate, Bot, Megaphone, LineChart, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | ORTHONOBA",
  description: "Web development, SEO, Google Ads, Meta Ads, AI Consulting and Digital Transformation services.",
};

const SERVICE_GROUPS = [
  {
    label: "Web & Digital",
    services: [
      { icon: Globe,         label: "Web Development",    href: "services/web-development",  desc: "High-performance websites and web apps" },
      { icon: LayoutTemplate, label: "WordPress",          href: "services/wordpress",         desc: "Scalable CMS with premium themes" },
      { icon: ShoppingBag,   label: "E-Commerce",         href: "services/ecommerce",         desc: "Online stores optimised for conversion" },
      { icon: Megaphone,     label: "Landing Pages",       href: "services/landing-pages",    desc: "High-converting campaign pages" },
    ],
  },
  {
    label: "SEO & Advertising",
    services: [
      { icon: Search,        label: "SEO Local",           href: "services/seo-local",            desc: "Local search visibility and rankings" },
      { icon: Search,        label: "SEO International",   href: "services/seo-international",    desc: "Multilingual international SEO" },
      { icon: TrendingUp,    label: "Google Ads",          href: "services/google-ads",           desc: "Performance advertising with ROI focus" },
      { icon: LineChart,     label: "Meta Ads",            href: "services/meta-ads",             desc: "Facebook & Instagram advertising" },
      { icon: ExternalLink,  label: "LinkedIn Ads",        href: "services/linkedin-ads",         desc: "B2B advertising on LinkedIn" },
    ],
  },
  {
    label: "AI & Growth",
    services: [
      { icon: Bot,           label: "Marketing Automation", href: "services/marketing-automation",    desc: "AI-powered automated marketing campaigns" },
      { icon: Bot,           label: "AI Consulting",        href: "services/ai-consulting",           desc: "Strategic AI implementation guidance" },
      { icon: TrendingUp,    label: "Digital Transformation", href: "services/digital-transformation", desc: "End-to-end digital business transformation" },
    ],
  },
];

export default async function ServicesPage({
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Digital Services for Modern Business
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            Web development, SEO, advertising and AI services that deliver measurable results for your business.
          </p>
        </div>
      </section>

      {/* Service Groups */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {SERVICE_GROUPS.map(({ label, services }) => (
            <div key={label}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">{label}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {services.map(({ icon: Icon, label: slabel, href, desc }) => (
                  <Link
                    key={`${href}-${slabel}`}
                    href={`/${locale}/${href}`}
                    className="group bg-panel border border-white/6 rounded-2xl p-5 hover:border-gold/20 hover:bg-panel-2 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/8 border border-gold/15 flex items-center justify-center text-gold mb-4">
                      <Icon size={15} />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors mb-1.5">
                      {slabel}
                    </p>
                    <p className="text-xs text-silver/70 leading-relaxed mb-4">{desc}</p>
                    <div className="flex items-center gap-1 text-xs text-gold/50 group-hover:text-gold transition-colors">
                      Learn more <ArrowRight size={11} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/6 py-16 px-6 text-center">
        <p className="text-silver text-sm mb-4">Ready to grow your business?</p>
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
