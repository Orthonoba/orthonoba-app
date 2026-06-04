import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Platform — ORTHONOBA",
  description:
    "The complete AI Business Platform — AI Agents, Voice, CRM, Automation, Knowledge Base and Analytics in one unified workspace.",
};

const modules = [
  {
    index: "01",
    title: "AI Agents",
    slug: "ai-agents",
    tagline: "Intelligent automation for any workflow",
    description:
      "Deploy pre-built AI agents or build custom ones from scratch. Chat agents, qualification agents, support agents and domain-specific reasoning — all connected to your data.",
    tech: ["Claude Sonnet", "GPT-4o", "RAG", "Tool Use"],
    metrics: ["10M+ messages processed", "8 agent types", "Custom system prompts"],
  },
  {
    index: "02",
    title: "Voice Agents",
    slug: "voice-agents",
    tagline: "24/7 voice reception in any language",
    description:
      "Human-quality voice AI for inbound and outbound calls. Handles appointment booking, lead qualification and customer support with sub-500ms latency.",
    tech: ["ElevenLabs", "Twilio", "WhatsApp", "OpenAI Whisper"],
    metrics: ["40+ languages", "<500ms latency", "Unlimited concurrent calls"],
  },
  {
    index: "03",
    title: "CRM",
    slug: "crm",
    tagline: "Full customer lifecycle management",
    description:
      "Contacts, leads, deals, activities and pipelines — unified. Every interaction with AI agents is automatically logged in the CRM. Your sales team sees the full context.",
    tech: ["Pipeline view", "Lead scoring", "Activity timeline", "Deal forecasting"],
    metrics: ["Unified contact record", "AI lead scoring", "Visual pipeline"],
  },
  {
    index: "04",
    title: "Automation",
    slug: "automation",
    tagline: "Visual workflow builder — 500+ integrations",
    description:
      "Connect any tool. Build workflows visually without code. Trigger automations from new leads, calls, form submissions or webhooks. Powered by n8n.",
    tech: ["n8n Engine", "500+ connectors", "Webhook triggers", "API actions"],
    metrics: ["10M+ automations run", "500+ integrations", "Zero-code builder"],
  },
  {
    index: "05",
    title: "Knowledge Base",
    slug: "knowledge-base",
    tagline: "AI-powered document intelligence",
    description:
      "Upload PDFs, SOPs, policies and product manuals. Your AI agents answer questions from your documents with full citations. Zero hallucinations mode available.",
    tech: ["RAG", "Vector search", "PDF ingestion", "Citation mode"],
    metrics: ["Instant answers", "Source citations", "Multi-format support"],
  },
  {
    index: "06",
    title: "Analytics",
    slug: "analytics",
    tagline: "Real-time business intelligence",
    description:
      "Track agent performance, pipeline velocity, automation ROI, customer satisfaction and team productivity. All data visible across every module in one dashboard.",
    tech: ["Real-time dashboards", "Custom reports", "Webhooks export", "API access"],
    metrics: ["Real-time data", "Cross-module view", "Export to BI tools"],
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian pt-32 pb-20 px-6">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                The Platform
              </span>
            </div>
            <h1 className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.92] tracking-tight">
              One platform.<br />
              <span className="text-gold">Every operation.</span>
            </h1>
            <p className="mt-8 text-silver text-lg leading-relaxed max-w-2xl">
              ORTHONOBA is a unified AI Business Operating System. Every module is
              connected — agents share CRM context, automations trigger from conversations,
              analytics cover everything.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/consultation"
                className="inline-block bg-gold text-obsidian px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
              >
                Book Demo
              </Link>
              <Link
                href="/pricing"
                className="inline-block border border-panel-3 text-silver px-9 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <section className="bg-panel py-24 px-6">
        <Container>
          <div className="space-y-px bg-panel-3">
            {modules.map((mod) => (
              <div
                key={mod.index}
                className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-300 group grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                {/* Left */}
                <div>
                  <span className="text-gold text-xs font-mono tracking-widest">
                    {mod.index}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                    {mod.title}
                  </h2>
                  <p className="mt-2 text-silver text-sm">{mod.tagline}</p>
                </div>

                {/* Middle: description */}
                <div>
                  <p className="text-silver text-sm leading-relaxed">{mod.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {mod.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-muted tracking-widest uppercase border border-panel-3 px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: metrics + CTA */}
                <div className="flex flex-col justify-between">
                  <ul className="space-y-2">
                    {mod.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gold shrink-0" />
                        <span className="text-muted text-xs">{m}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/platform/${mod.slug}`}
                    className="mt-6 inline-block text-gold text-xs font-semibold tracking-[0.2em] uppercase border-b border-gold/40 pb-0.5 hover:text-gold-light transition-colors duration-200"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-obsidian py-24 px-6 border-t border-panel-3">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Ready to explore the platform?
            </h2>
            <p className="mt-4 text-silver text-base">
              Book a 30-minute demo and we&apos;ll show you exactly how ORTHONOBA fits your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-block bg-gold text-obsidian px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
              >
                Book Demo
              </Link>
              <Link
                href="/contact"
                className="inline-block border border-panel-3 text-silver px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
