import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "AI Agents", href: "/ai-agents" },
      { label: "Automation", href: "/automation" },
      { label: "Web Development", href: "/web-development" },
      { label: "Marketing", href: "/marketing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Founder", href: "/company/founder" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Free Consultation", href: "/consultation" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-panel border-t border-panel-3">
      <Container>
        <div className="py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
              ORTHONOBA
            </span>
            <p className="mt-5 text-muted text-sm leading-relaxed max-w-xs">
              AI &amp; Digital Agency.
              <br />
              Intelligent systems for modern business.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase">
                {col.title}
              </span>
              <ul className="mt-5 space-y-3">
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
          <span className="text-muted text-xs tracking-wider">
            © {new Date().getFullYear()} Orthonoba. All rights reserved.
          </span>
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
          </div>
        </div>
      </Container>
    </footer>
  );
}
