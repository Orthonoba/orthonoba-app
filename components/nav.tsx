"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown, ArrowRight } from "lucide-react";

const LOCALES = [
  { code: "it", label: "Italiano" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

function getCurrentLocale(pathname: string) {
  const seg = pathname.split("/")[1];
  return LOCALES.find((l) => l.code === seg)?.code ?? "it";
}

function swapLocale(pathname: string, newLocale: string) {
  const segs = pathname.split("/");
  segs[1] = newLocale;
  return segs.join("/") || "/";
}

// ─── Navigation Data ───────────────────────────────────────────────────────────

const SOLUTIONS_MENU = [
  {
    group: "AI Solutions",
    items: [
      { label: "AI Agents", href: "solutions/ai-agents", desc: "Custom agents for automation" },
      { label: "Voice AI", href: "solutions/voice-ai", desc: "AI-powered voice systems 24/7" },
      { label: "WhatsApp AI", href: "solutions/whatsapp-ai", desc: "Conversational AI on WhatsApp" },
      { label: "Enterprise AI", href: "solutions/enterprise-ai", desc: "AI at scale for enterprise" },
    ],
  },
  {
    group: "Automation",
    items: [
      { label: "CRM Automation", href: "solutions/crm-automation", desc: "Automate your CRM workflows" },
      { label: "Workflows", href: "solutions/workflows", desc: "N8N & Make automations" },
      { label: "Business Processes", href: "solutions/automation", desc: "End-to-end process automation" },
    ],
  },
  {
    group: "Software",
    items: [
      { label: "Web Applications", href: "solutions/web-applications", desc: "Custom web app development" },
      { label: "SaaS Development", href: "solutions/saas-development", desc: "Build your SaaS product" },
      { label: "Dashboards & BI", href: "solutions/dashboards", desc: "Data visualization & reporting" },
    ],
  },
];

const SERVICES_MENU = [
  {
    group: "Web & Digital",
    items: [
      { label: "Web Development", href: "services/web-development" },
      { label: "WordPress", href: "services/wordpress" },
      { label: "E-Commerce", href: "services/ecommerce" },
      { label: "Landing Pages", href: "services/landing-pages" },
    ],
  },
  {
    group: "SEO & Advertising",
    items: [
      { label: "SEO Local", href: "services/seo-local" },
      { label: "SEO International", href: "services/seo-international" },
      { label: "Google Ads", href: "services/google-ads" },
      { label: "Meta Ads", href: "services/meta-ads" },
      { label: "LinkedIn Ads", href: "services/linkedin-ads" },
    ],
  },
  {
    group: "AI & Growth",
    items: [
      { label: "Marketing Automation", href: "services/marketing-automation" },
      { label: "AI Consulting", href: "services/ai-consulting" },
      { label: "Digital Transformation", href: "services/digital-transformation" },
    ],
  },
];

const INDUSTRIES_MENU = [
  { label: "Healthcare", href: "industries/healthcare" },
  { label: "Dental Clinics", href: "industries/dental" },
  { label: "Real Estate", href: "industries/real-estate" },
  { label: "Luxury & Jewelry", href: "industries/luxury" },
  { label: "Restaurants", href: "industries/restaurants" },
  { label: "Hospitality", href: "industries/hospitality" },
  { label: "Logistics", href: "industries/logistics" },
  { label: "Legal", href: "industries/legal" },
  { label: "Consulting", href: "industries/consulting" },
  { label: "Small Business", href: "industries/small-business" },
  { label: "Enterprise", href: "industries/enterprise" },
];

const RESOURCES_MENU = [
  { label: "Blog", href: "resources/blog", desc: "Articles & industry insights" },
  { label: "Guides", href: "resources/guides", desc: "In-depth implementation guides" },
  { label: "FAQ", href: "resources/faq", desc: "Common questions answered" },
  { label: "AI Center", href: "resources/ai-center", desc: "AI knowledge & tutorials" },
  { label: "Automation Center", href: "resources/automation-center", desc: "Automation resources" },
  { label: "Software Center", href: "resources/software-center", desc: "Development resources" },
];

const COMPANY_MENU = [
  { label: "About ORTHONOBA", href: "company/about" },
  { label: "Our Founder", href: "company/founder" },
  { label: "Our Story", href: "company/story" },
  { label: "Methodology", href: "company/methodology" },
  { label: "Technology Stack", href: "company/technology" },
  { label: "Partners", href: "company/partners" },
  { label: "Careers", href: "company/careers" },
];

// ─── Mega Panel Sub-Components ─────────────────────────────────────────────────

function SolutionsPanel({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {SOLUTIONS_MENU.map(({ group, items }) => (
        <div key={group}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-3">
            {group}
          </p>
          <ul className="space-y-0.5">
            {items.map(({ label, href, desc }) => (
              <li key={href}>
                <Link
                  href={`/${locale}/${href}`}
                  className="block px-3 py-2 rounded-lg hover:bg-white/[0.04] group transition-colors"
                >
                  <span className="block text-sm font-medium text-white group-hover:text-gold transition-colors">
                    {label}
                  </span>
                  <span className="block text-xs text-silver/70 mt-0.5">{desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ServicesPanel({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {SERVICES_MENU.map(({ group, items }) => (
        <div key={group}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-3">
            {group}
          </p>
          <ul className="space-y-0.5">
            {items.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={`/${locale}/${href}`}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-silver hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function IndustriesPanel({ locale }: { locale: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-4">
        Industries We Serve
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {INDUSTRIES_MENU.map(({ label, href }) => (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-silver hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ResourcesPanel({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {RESOURCES_MENU.map(({ label, href, desc }) => (
        <Link
          key={href}
          href={`/${locale}/${href}`}
          className="block px-3 py-3 rounded-lg hover:bg-white/[0.04] group transition-colors"
        >
          <span className="block text-sm font-medium text-white group-hover:text-gold transition-colors">
            {label}
          </span>
          <span className="block text-xs text-silver/70 mt-0.5">{desc}</span>
        </Link>
      ))}
    </div>
  );
}

function CompanyPanel({ locale }: { locale: string }) {
  return (
    <div className="flex gap-12">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-3">
          Company
        </p>
        <ul className="space-y-0.5">
          {COMPANY_MENU.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={`/${locale}/${href}`}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-silver hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-gold/[0.04] border border-gold/10 rounded-xl p-5">
        <p className="text-xs font-semibold text-gold mb-2">Book a Strategy Call</p>
        <p className="text-sm text-silver mb-4">
          Free 30-minute consultation with our team. No commitment required.
        </p>
        <Link
          href={`/${locale}/consultation`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
        >
          Schedule now <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── Main Nav Component ─────────────────────────────────────────────────────────

type MenuId = "solutions" | "services" | "industries" | "resources" | "company";

const TOP_MENU_ITEMS: { id: MenuId; labelKey: string }[] = [
  { id: "solutions",  labelKey: "solutions" },
  { id: "services",   labelKey: "services" },
  { id: "industries", labelKey: "industries" },
  { id: "resources",  labelKey: "resources" },
  { id: "company",    labelKey: "company" },
];

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [langOpen, setLangOpen]         = useState(false);
  const [activeMenu, setActiveMenu]     = useState<MenuId | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const locale = getCurrentLocale(pathname);

  const closeMobile = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 bg-obsidian/95 backdrop-blur-md border-b border-white/[0.06]"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 shrink-0 mr-8"
            onClick={closeMobile}
          >
            <div className="w-7 h-7 rounded-md bg-gold flex items-center justify-center font-black text-obsidian text-xs select-none">
              O
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
              ORTHONOBA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {TOP_MENU_ITEMS.map(({ id, labelKey }) => (
              <button
                key={id}
                onMouseEnter={() => setActiveMenu(id)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeMenu === id
                    ? "text-gold bg-gold/[0.08]"
                    : "text-silver hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {t(labelKey)}
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${activeMenu === id ? "rotate-180 text-gold" : ""}`}
                />
              </button>
            ))}

            <div className="w-px h-4 bg-white/10 mx-1" />

            <Link
              href={`/${locale}/contact`}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-silver hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2 ml-4 shrink-0">
            {/* Locale switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-silver hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Globe size={13} />
                <span className="uppercase font-semibold text-xs">{locale}</span>
                <ChevronDown size={10} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-panel border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden min-w-[140px] z-50">
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={swapLocale(pathname, l.code)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        l.code === locale
                          ? "text-gold bg-gold/10"
                          : "text-silver hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/consultation`}
              className="ml-1 px-4 py-2 bg-gold text-obsidian rounded-lg text-sm font-bold hover:bg-gold-light transition-colors"
            >
              {t("bookConsultation")}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => { setLangOpen((v) => !v); setMobileOpen(false); }}
                className="flex items-center gap-1 px-2 py-2 rounded-lg text-silver hover:text-white transition-colors"
              >
                <Globe size={14} />
                <span className="text-xs uppercase font-semibold">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-panel border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden min-w-[140px] z-60">
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={swapLocale(pathname, l.code)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        l.code === locale
                          ? "text-gold bg-gold/10"
                          : "text-silver hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => { setMobileOpen((v) => !v); setLangOpen(false); }}
              className="p-2 rounded-lg text-silver hover:text-white transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mega Panel ──────────────────────────────────────── */}
        {activeMenu && (
          <div className="hidden lg:block absolute top-full left-0 right-0 bg-obsidian/98 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/70">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {activeMenu === "solutions"  && <SolutionsPanel  locale={locale} />}
              {activeMenu === "services"   && <ServicesPanel   locale={locale} />}
              {activeMenu === "industries" && <IndustriesPanel locale={locale} />}
              {activeMenu === "resources"  && <ResourcesPanel  locale={locale} />}
              {activeMenu === "company"    && <CompanyPanel    locale={locale} />}
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Overlay ──────────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* ── Mobile Slide Panel ─────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-obsidian border-l border-white/[0.06] z-50 flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
          <span className="font-bold text-white text-sm tracking-tight">ORTHONOBA</span>
          <button onClick={closeMobile} className="p-1.5 rounded-lg text-silver hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Panel nav */}
        <nav className="flex flex-col py-3 px-3 flex-1">
          {/* Accordion sections */}
          {[
            { id: "solutions",  label: t("solutions"),  items: SOLUTIONS_MENU.flatMap(g => g.items.map(i => ({ label: i.label, href: i.href }))) },
            { id: "services",   label: t("services"),   items: SERVICES_MENU.flatMap(g => g.items.map(i => ({ label: i.label, href: i.href }))) },
            { id: "industries", label: t("industries"), items: INDUSTRIES_MENU },
            { id: "resources",  label: t("resources"),  items: RESOURCES_MENU.map(i => ({ label: i.label, href: i.href })) },
            { id: "company",    label: t("company"),    items: COMPANY_MENU },
          ].map(({ id, label, items }) => (
            <div key={id} className="border-b border-white/[0.04]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === id ? null : id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-silver hover:text-white transition-colors"
              >
                {label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${mobileExpanded === id ? "rotate-180 text-gold" : ""}`}
                />
              </button>
              {mobileExpanded === id && (
                <div className="pb-2 pl-4">
                  {items.map(({ label: itemLabel, href }) => (
                    <Link
                      key={href}
                      href={`/${locale}/${href}`}
                      onClick={closeMobile}
                      className="block px-4 py-2 text-sm text-silver/80 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                    >
                      {itemLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href={`/${locale}/contact`}
            onClick={closeMobile}
            className="flex items-center px-4 py-3 text-sm font-medium text-silver hover:text-white transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Panel CTA */}
        <div className="px-4 py-5 border-t border-white/[0.06] shrink-0">
          <Link
            href={`/${locale}/consultation`}
            onClick={closeMobile}
            className="block w-full px-4 py-3 text-center bg-gold text-obsidian rounded-xl text-sm font-bold hover:bg-gold-light transition-colors"
          >
            {t("bookConsultation")}
          </Link>
        </div>
      </div>
    </>
  );
}
