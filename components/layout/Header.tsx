"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";
import MegaMenu from "@/components/layout/MegaMenu";
import type { NavDropdown } from "@/types";

// ── Navigation Data ───────────────────────────────

const platformMenu: NavDropdown = {
  label: "Platform",
  cols: 2,
  sections: [
    {
      title: "Core Modules",
      items: [
        {
          label: "AI Agents",
          href: "/platform/ai-agents",
          description: "Custom intelligent agents for any workflow",
        },
        {
          label: "Voice Agents",
          href: "/platform/voice-agents",
          description: "24/7 AI voice reception in any language",
        },
        {
          label: "CRM",
          href: "/platform/crm",
          description: "Full customer lifecycle management",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          label: "Automation",
          href: "/platform/automation",
          description: "Visual workflow builder — 500+ integrations",
        },
        {
          label: "Knowledge Base",
          href: "/platform/knowledge-base",
          description: "AI-powered document intelligence",
        },
        {
          label: "Analytics",
          href: "/platform/analytics",
          description: "Real-time business intelligence",
        },
      ],
    },
  ],
};

const solutionsMenu: NavDropdown = {
  label: "Solutions",
  cols: 2,
  sections: [
    {
      items: [
        {
          label: "Dental",
          href: "/solutions/dental",
          description: "Digital dental platform & lab management",
        },
        {
          label: "Healthcare",
          href: "/solutions/healthcare",
          description: "Patient management & clinical workflows",
        },
        {
          label: "Legal",
          href: "/solutions/legal",
          description: "Case management & document automation",
        },
        {
          label: "Real Estate",
          href: "/solutions/real-estate",
          description: "Property CRM & client automation",
        },
      ],
    },
    {
      items: [
        {
          label: "Education",
          href: "/solutions/education",
          description: "LMS & student management",
        },
        {
          label: "Consulting",
          href: "/solutions/consulting",
          description: "Project & client management",
        },
        {
          label: "E-Commerce",
          href: "/solutions/ecommerce",
          description: "Order & customer automation",
        },
        {
          label: "Enterprise",
          href: "/solutions/enterprise",
          description: "Custom enterprise deployments",
        },
      ],
    },
  ],
};

const productsMenu: NavDropdown = {
  label: "Products",
  cols: 2,
  sections: [
    {
      title: "AI Products",
      items: [
        {
          label: "AI Receptionist",
          href: "/products/ai-receptionist",
          description: "Voice & chat front desk, always on",
        },
        {
          label: "AI Sales Agent",
          href: "/products/ai-sales",
          description: "Automated sales pipeline management",
        },
        {
          label: "AI Support",
          href: "/products/ai-support",
          description: "24/7 intelligent customer support",
        },
        {
          label: "AI Lead Qualifier",
          href: "/products/lead-qualifier",
          description: "Qualify and score leads automatically",
        },
      ],
    },
    {
      title: "Specialized",
      items: [
        {
          label: "AI Voice Assistant",
          href: "/products/voice-assistant",
          description: "Voice-first conversational interface",
        },
        {
          label: "AI Appointment System",
          href: "/products/appointments",
          description: "Smart scheduling without back-and-forth",
        },
        {
          label: "AI Knowledge Assistant",
          href: "/products/knowledge",
          description: "Answer anything from your documents",
        },
      ],
    },
  ],
};

const automationsMenu: NavDropdown = {
  label: "Automations",
  cols: 1,
  sections: [
    {
      items: [
        {
          label: "WhatsApp Automation",
          href: "/automation/whatsapp",
          description: "Conversational flows on WhatsApp Business",
        },
        {
          label: "Email Automation",
          href: "/automation/email",
          description: "Intelligent email sequences & campaigns",
        },
        {
          label: "CRM Automation",
          href: "/automation/crm",
          description: "Automate your entire sales pipeline",
        },
        {
          label: "Sales Automation",
          href: "/automation/sales",
          description: "Lead to close on autopilot",
        },
        {
          label: "Marketing Automation",
          href: "/automation/marketing",
          description: "AI-powered campaign orchestration",
        },
      ],
    },
  ],
};

const simpleNavLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Partners", href: "/partners" },
  { label: "Resources", href: "/resources" },
];

const mobileLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Automations", href: "/automation" },
  { label: "Pricing", href: "/pricing" },
  { label: "Partners", href: "/partners" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

// ── Component ─────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-panel-3 bg-obsidian/98 backdrop-blur-md">
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
            <MegaMenu {...platformMenu} />
            <MegaMenu {...solutionsMenu} />
            <MegaMenu {...productsMenu} />
            <MegaMenu {...automationsMenu} />
            {simpleNavLinks.map((link) => (
              <Link
                key={link.href}
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
                key={link.href}
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
