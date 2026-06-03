"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const year = new Date().getFullYear();

const COL_SOLUTIONS = [
  { label: "AI Agents",          href: "/ai-agents" },
  { label: "Voice AI",           href: "/solutions/voice-ai" },
  { label: "WhatsApp AI",        href: "/solutions/whatsapp-ai" },
  { label: "Automation",         href: "/automation" },
  { label: "SaaS Development",   href: "/solutions/saas-development" },
];

const COL_SERVICES = [
  { label: "Web Development",    href: "/web-development" },
  { label: "SEO",                href: "/services/seo-local" },
  { label: "Google Ads",         href: "/services/google-ads" },
  { label: "Meta Ads",           href: "/services/meta-ads" },
  { label: "Consulting",         href: "/services/consulting" },
];

const COL_INDUSTRIES = [
  { label: "Dental Clinics",     href: "/industries/dental" },
  { label: "Healthcare",         href: "/industries/healthcare" },
  { label: "Real Estate",        href: "/industries/real-estate" },
  { label: "Law Firms",          href: "/industries/legal" },
  { label: "Startups",           href: "/industries/startups" },
];

const COL_COMPANY = [
  { label: "About",              href: "/company" },
  { label: "Founder",            href: "/company/founder" },
  { label: "Resources",          href: "/resources" },
  { label: "Blog",               href: "/blog" },
  { label: "Contact",            href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy",            href: "/legal/privacy" },
  { label: "Terms",              href: "/legal/terms" },
  { label: "GDPR",               href: "/legal/gdpr" },
];

const LOCALES = [
  { code: "it", label: "IT" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
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
      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-5">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={locale ? `/${locale}${href}` : href}
              className="text-sm text-silver/60 hover:text-white transition-colors duration-150"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LangSwitcher({ locale }: { locale?: string }) {
  const pathname = usePathname();

  function swapLocale(newLocale: string) {
    const segs = pathname.split("/");
    segs[1] = newLocale;
    return segs.join("/") || "/";
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={swapLocale(code)}
          className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
            locale === code
              ? "text-gold"
              : "text-muted hover:text-silver"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer({ locale }: { locale?: string }) {
  return (
    <footer className="bg-panel border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-md bg-gold flex items-center justify-center font-black text-obsidian text-sm">
                O
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                ORTHONOBA
              </span>
            </div>
            <p className="text-sm text-silver/70 mb-1.5 font-medium">
              AI · Automation · Software
            </p>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Technology platform for companies in Switzerland,
              Europe and Latin America.
            </p>
            <LangSwitcher locale={locale} />
          </div>

          <FooterCol title="Solutions"  links={COL_SOLUTIONS}  locale={locale} />
          <FooterCol title="Services"   links={COL_SERVICES}   locale={locale} />
          <FooterCol title="Industries" links={COL_INDUSTRIES} locale={locale} />
          <FooterCol title="Company"    links={COL_COMPANY}    locale={locale} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {year} ORTHONOBA.APP — All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={locale ? `/${locale}${href}` : href}
                className="text-xs text-muted hover:text-silver transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
