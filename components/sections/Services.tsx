import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const capabilities = [
  {
    index: "01",
    title: "AI Agents",
    description:
      "Custom intelligent agents built on Claude and GPT-4o. Automate complex reasoning, document processing, and decision workflows at enterprise scale.",
    href: "/platform/ai-agents",
  },
  {
    index: "02",
    title: "Voice Agents",
    description:
      "24/7 AI voice reception powered by ElevenLabs. Handle calls, book appointments and qualify leads in 40+ languages without human intervention.",
    href: "/platform/voice-agents",
  },
  {
    index: "03",
    title: "CRM & Pipeline",
    description:
      "Full customer lifecycle management — contacts, leads, deals, and activities unified in one intelligent workspace built for your team.",
    href: "/platform/crm",
  },
  {
    index: "04",
    title: "Business Automation",
    description:
      "Visual workflow builder with 500+ integrations. Connect WhatsApp, email, CRM and any external tool. Run operations 24/7 without headcount.",
    href: "/platform/automation",
  },
  {
    index: "05",
    title: "Knowledge Base",
    description:
      "AI-powered document intelligence. Upload PDFs, policies and manuals. Your agents answer questions instantly from your company knowledge.",
    href: "/platform/knowledge-base",
  },
  {
    index: "06",
    title: "Analytics",
    description:
      "Real-time business intelligence across all modules. Track agent performance, pipeline velocity, automation ROI and customer metrics in one dashboard.",
    href: "/platform/analytics",
  },
];

export default function Services() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            The Platform
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Everything your business<br />needs to operate with AI.
          </h2>
          <Link
            href="/platform"
            className="shrink-0 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:text-gold-light transition-colors duration-200 border-b border-gold/40 pb-0.5"
          >
            Explore Platform →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3">
          {capabilities.map((item) => (
            <Link
              key={item.index}
              href={item.href}
              className="bg-obsidian p-10 hover:bg-panel transition-colors duration-300 group block"
            >
              <span className="text-gold text-xs font-mono tracking-widest">
                {item.index}
              </span>
              <h3 className="mt-5 text-xl font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                {item.title}
              </h3>
              <p className="mt-4 text-silver text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-6 text-muted text-xs tracking-widest uppercase group-hover:text-gold transition-colors duration-200">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
