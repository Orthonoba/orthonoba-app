"use client";

import { useState, useEffect } from "react";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";
import MegaMenu from "@/components/layout/MegaMenu";
import type { NavDropdown } from "@/types";

// ── Navigation Data ───────────────────────────────

const servicesMenu: NavDropdown = {
  label: "Services",
  cols: 2,
  sections: [
    {
      title: "AI Workforce",
      items: [
        {
          label: "AI Receptionist",
          href: "/products/ai-receptionist",
          description: "Front desk AI — voice, chat and WhatsApp",
        },
        {
          label: "AI Sales Agent",
          href: "/products/ai-sales",
          description: "Automated pipeline — lead to close",
        },
        {
          label: "AI Lead Qualifier",
          href: "/products/lead-qualifier",
          description: "Score and route every inbound lead",
        },
        {
          label: "AI Appointment Assistant",
          href: "/products/appointments",
          description: "Zero friction scheduling across all channels",
        },
        {
          label: "AI Customer Support",
          href: "/products/ai-support",
          description: "Instant resolution from your knowledge base",
        },
      ],
    },
    {
      title: "Automation & Integrations",
      items: [
        {
          label: "Workflow Automation",
          href: "/automation",
          description: "End-to-end process automation",
        },
        {
          label: "Sales Automation",
          href: "/automation/sales",
          description: "Pipeline on autopilot",
        },
        {
          label: "Customer Journey Automation",
          href: "/automation/crm",
          description: "Lifecycle flows that adapt in real time",
        },
        {
          label: "500+ Integrations",
          href: "/platform",
          description: "Connect any tool via API or pre-built connector",
        },
      ],
    },
  ],
};

const growthMenu: NavDropdown = {
  label: "Growth",
  cols: 2,
  sections: [
    {
      title: "CRM & Revenue Operations",
      items: [
        {
          label: "Lead Management",
          href: "/platform/crm",
          description: "Capture, qualify and convert every lead",
        },
        {
          label: "Pipeline Management",
          href: "/platform/crm",
          description: "AI-powered forecasting and deal intelligence",
        },
        {
          label: "Communication Hub",
          href: "/platform/crm",
          description: "Email, WhatsApp and voice in one inbox",
        },
      ],
    },
    {
      title: "Marketing & Demand",
      items: [
        {
          label: "SEO & Local SEO",
          href: "/marketing",
          description: "Dominate search in your market",
        },
        {
          label: "Performance Ads",
          href: "/marketing",
          description: "Google Ads + Meta Ads with AI optimization",
        },
        {
          label: "Lead Generation",
          href: "/marketing",
          description: "Predictable pipeline from all channels",
        },
      ],
    },
  ],
};

const transformationMenu: NavDropdown = {
  label: "Transformation",
  cols: 2,
  sections: [
    {
      title: "Digital Transformation",
      items: [
        {
          label: "Software Development",
          href: "/web-development",
          description: "Custom apps, platforms and SaaS products",
        },
        {
          label: "AI Adoption",
          href: "/ai-agents",
          description: "Embed AI into your existing processes",
        },
        {
          label: "Systems Integration",
          href: "/platform",
          description: "Connect your entire technology stack",
        },
      ],
    },
    {
      title: "Industries",
      items: [
        {
          label: "Healthcare & Dental",
          href: "/industries/healthcare",
          description: "Clinical workflows and patient operations",
        },
        {
          label: "Legal & Professional",
          href: "/industries/legal",
          description: "Case management and client automation",
        },
        {
          label: "Real Estate & Finance",
          href: "/industries/real-estate",
          description: "Property CRM and client engagement",
        },
        {
          label: "Education & Enterprise",
          href: "/industries/education",
          description: "Custom enterprise deployments",
        },
      ],
    },
  ],
};

const simpleNavLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
];

const mobileLinks = [
  { label: "AI Workforce", href: "/products" },
  { label: "Automation", href: "/automation" },
  { label: "CRM & Growth", href: "/platform/crm" },
  { label: "Marketing", href: "/marketing" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

// ── Component ─────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "border-b transition-all duration-300",
        scrolled
          ? "border-panel-3 bg-obsidian/98 backdrop-blur-xl shadow-lg shadow-black/40"
          : "border-transparent bg-obsidian/60 backdrop-blur-sm",
      ].join(" ")}
    >
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-6 h-6 border border-gold/60 flex items-center justify-center group-hover:border-gold transition-colors duration-200">
              <div className="w-2 h-2 bg-gold" />
            </div>
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
              ORTHONOBA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <MegaMenu {...servicesMenu} />
            <MegaMenu {...growthMenu} />
            <MegaMenu {...transformationMenu} />
            {simpleNavLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/consultation"
              className="bg-gold text-obsidian px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-silver hover:text-white p-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l16 16M17 1L1 17" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 3h16M1 9h16M1 15h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-panel-3 py-6 space-y-1">
            {mobileLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="block py-3 text-silver text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="block border border-panel-3 text-silver px-5 py-3 text-xs font-semibold tracking-widest uppercase text-center hover:border-gold hover:text-white transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/consultation"
                className="block bg-gold text-obsidian px-5 py-3 text-xs font-bold tracking-widest uppercase text-center hover:bg-gold-light transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
