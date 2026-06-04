import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "AI Agents", href: "/platform/ai-agents" },
      { label: "Voice Agents", href: "/platform/voice-agents" },
      { label: "CRM", href: "/platform/crm" },
      { label: "Automation", href: "/platform/automation" },
      { label: "Knowledge Base", href: "/platform/knowledge-base" },
      { label: "Analytics", href: "/platform/analytics" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Dental", href: "/solutions/dental" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Legal", href: "/solutions/legal" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Education", href: "/solutions/education" },
      { label: "Enterprise", href: "/solutions/enterprise" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "AI Receptionist", href: "/products/ai-receptionist" },
      { label: "AI Sales Agent", href: "/products/ai-sales" },
      { label: "AI Support", href: "/products/ai-support" },
      { label: "AI Lead Qualifier", href: "/products/lead-qualifier" },
      { label: "AI Appointments", href: "/products/appointments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Founder", href: "/company/founder" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-panel border-t border-panel-3">
      <Container>
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-5 border border-gold/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gold" />
              </div>
              <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
                ORTHONOBA
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              AI Business Operating System for modern enterprise.
            </p>
            <p className="mt-3 text-muted text-xs leading-relaxed">
              Intelligent agents, automation and CRM for any industry.
            </p>
            <div className="mt-6 pt-6 border-t border-panel-3">
              <p className="text-muted text-[11px] leading-relaxed">
                Europe · Latin America · Global
              </p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <span className="text-white text-[10px] font-semibold tracking-[0.3em] uppercase">
                {col.title}
              </span>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted text-sm hover:text-silver transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-panel-3 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-muted text-xs tracking-wider">
              © {new Date().getFullYear()} Orthonoba. All rights reserved.
            </span>
            <span className="text-panel-3 hidden md:block">|</span>
            <span className="text-muted text-xs tracking-wider hidden md:block">
              AI Business Operating System
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted text-xs tracking-widest uppercase hover:text-silver transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted text-xs tracking-widest uppercase hover:text-silver transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/gdpr"
              className="text-muted text-xs tracking-widest uppercase hover:text-silver transition-colors duration-200"
            >
              GDPR
            </Link>
            <Link
              href="/security"
              className="text-muted text-xs tracking-widest uppercase hover:text-silver transition-colors duration-200"
            >
              Security
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
