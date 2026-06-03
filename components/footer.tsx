import Link from "next/link";

const year = new Date().getFullYear();

const COL_SOLUTIONS = [
  { label: "AI Agents",             href: "/solutions/ai-agents" },
  { label: "Voice AI",              href: "/solutions/voice-ai" },
  { label: "Automation",            href: "/solutions/automation" },
  { label: "SaaS Development",      href: "/solutions/saas-development" },
  { label: "Business Intelligence", href: "/solutions/dashboards" },
];

const COL_SERVICES = [
  { label: "Web Development",       href: "/services/web-development" },
  { label: "SEO",                   href: "/services/seo-local" },
  { label: "Google Ads",            href: "/services/google-ads" },
  { label: "Meta Ads",              href: "/services/meta-ads" },
  { label: "Marketing Automation",  href: "/services/marketing-automation" },
];

const COL_INDUSTRIES = [
  { label: "Healthcare",    href: "/industries/healthcare" },
  { label: "Real Estate",   href: "/industries/real-estate" },
  { label: "Luxury",        href: "/industries/luxury" },
  { label: "Restaurants",   href: "/industries/restaurants" },
  { label: "SMEs",          href: "/industries/small-business" },
];

const COL_COMPANY = [
  { label: "About",    href: "/company/about" },
  { label: "Founder",  href: "/company/founder" },
  { label: "Resources", href: "/resources" },
  { label: "Contact",  href: "/contact" },
  { label: "Privacy",  href: "/legal/privacy" },
];

function FooterCol({
  title,
  links,
  locale,
}: {
  title: string;
  links: { label: string; href: string }[];
  locale?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/70 mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={locale ? `/${locale}${href}` : href}
              className="text-sm text-silver/70 hover:text-white transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ locale }: { locale?: string }) {
  return (
    <footer className="bg-panel border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-gold flex items-center justify-center font-black text-obsidian text-sm">
                O
              </div>
              <span className="font-bold text-white text-base tracking-tight">ORTHONOBA</span>
            </div>
            <p className="text-sm text-silver/80 mb-1.5 font-medium">
              AI · Automation · Software · Growth
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Switzerland · Europe · Latin America
            </p>
          </div>

          {/* Col 2 — Solutions */}
          <FooterCol title="Solutions" links={COL_SOLUTIONS} locale={locale} />

          {/* Col 3 — Services */}
          <FooterCol title="Services" links={COL_SERVICES} locale={locale} />

          {/* Col 4 — Industries */}
          <FooterCol title="Industries" links={COL_INDUSTRIES} locale={locale} />

          {/* Col 5 — Company */}
          <FooterCol title="Company" links={COL_COMPANY} locale={locale} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {year} ORTHONOBA.APP — All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="text-xs text-muted hover:text-silver transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-xs text-muted hover:text-silver transition-colors">
              Terms
            </Link>
            <Link href="/legal/gdpr" className="text-xs text-muted hover:text-silver transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
