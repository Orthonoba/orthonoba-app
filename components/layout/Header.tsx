"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";
import MegaMenu from "@/components/layout/MegaMenu";

const solutionsItems = [
  { label: "AI Agents", href: "/ai-agents", description: "Intelligent automation powered by GPT-4o and Claude" },
  { label: "Automation", href: "/automation", description: "End-to-end workflow automation with n8n" },
  { label: "Web Development", href: "/web-development", description: "Enterprise apps on Next.js & TypeScript" },
  { label: "Marketing", href: "/marketing", description: "Digital strategy and growth systems" },
];

const companyItems = [
  { label: "About", href: "/company" },
  { label: "Founder", href: "/company/founder" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
];

const mobileLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-panel-3 bg-obsidian/95 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-sm tracking-[0.2em] uppercase shrink-0"
          >
            ORTHONOBA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <MegaMenu label="Solutions" items={solutionsItems} />
            <Link
              href="/services"
              className="text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              href="/industries"
              className="text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
            >
              Industries
            </Link>
            <MegaMenu label="Company" items={companyItems} />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="bg-gold text-obsidian px-5 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-silver hover:text-white p-2"
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
          <div className="md:hidden border-t border-panel-3 py-6">
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
            <Link
              href="/contact"
              className="block mt-6 bg-gold text-obsidian px-5 py-3 text-xs font-semibold tracking-widest uppercase text-center hover:bg-gold-light transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
