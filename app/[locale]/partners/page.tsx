import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Technology Partners — ORTHONOBA",
  description:
    "ORTHONOBA's technology ecosystem — integration partners, AI infrastructure providers and strategic alliances powering the Enterprise AI Growth Platform.",
};

const techPartners = [
  {
    category: "AI & Language Models",
    description: "The AI infrastructure powering every ORTHONOBA agent.",
    partners: [
      {
        name: "Anthropic / Claude",
        role: "Primary reasoning engine for complex AI agents",
        status: "active",
      },
      {
        name: "OpenAI / GPT-4o",
        role: "Complementary language model for specific agent types",
        status: "active",
      },
      {
        name: "ElevenLabs",
        role: "Voice synthesis for AI Voice Agents — 40+ languages",
        status: "active",
      },
      {
        name: "OpenAI Whisper",
        role: "Speech-to-text transcription across all voice channels",
        status: "active",
      },
    ],
  },
  {
    category: "Automation & Integrations",
    description: "The workflow backbone connecting every ORTHONOBA integration.",
    partners: [
      {
        name: "n8n",
        role: "Core automation engine — 500+ native integrations",
        status: "active",
      },
      {
        name: "Twilio",
        role: "Voice and SMS infrastructure for AI Voice Agents",
        status: "active",
      },
      {
        name: "WhatsApp Business API",
        role: "Conversational channel for AI agents and automations",
        status: "active",
      },
      {
        name: "Zapier",
        role: "Extended integration layer for legacy tools",
        status: "active",
      },
    ],
  },
  {
    category: "Infrastructure & Data",
    description: "Enterprise-grade cloud infrastructure ensuring 99.9% uptime.",
    partners: [
      {
        name: "Vercel",
        role: "Edge network and deployment infrastructure",
        status: "active",
      },
      {
        name: "Neon PostgreSQL",
        role: "Serverless database — EU data residency",
        status: "active",
      },
      {
        name: "Cloudflare",
        role: "Security, DDoS protection and CDN",
        status: "active",
      },
      {
        name: "Stripe",
        role: "Payment infrastructure and subscription billing",
        status: "active",
      },
    ],
  },
];

const strategicAlliances = [
  {
    type: "System Integrators",
    description:
      "We partner with regional IT consultancies and system integrators to deploy ORTHONOBA within existing enterprise environments.",
    cta: "Become a System Integrator Partner",
  },
  {
    type: "Digital Agencies",
    description:
      "Agencies can white-label ORTHONOBA's AI workforce capabilities and deliver AI automation to their clients under their own brand.",
    cta: "Explore White-Label Program",
  },
  {
    type: "Industry Specialists",
    description:
      "Domain experts in Healthcare, Legal, Real Estate and other verticals co-develop industry-specific AI agents and workflows.",
    cta: "Join as Industry Partner",
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-obsidian min-h-screen">

      {/* Hero */}
      <section className="pt-40 pb-24 border-b border-panel-3">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Partners
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(36px,5.5vw,72px)] font-bold text-white leading-[0.95] tracking-tight mb-8">
              Technology
              <br />
              <span className="text-gold">Ecosystem</span>
            </h1>
            <p className="text-silver text-lg leading-relaxed max-w-xl">
              ORTHONOBA is built on best-in-class enterprise technology. Every
              partner in our ecosystem was selected for reliability, security and
              scalability — not convenience.
            </p>
          </div>
        </Container>
      </section>

      {/* Technology Partners */}
      <section className="section-py">
        <Container>
          <div className="mb-16">
            <p className="text-muted text-xs font-semibold tracking-[0.35em] uppercase mb-4">
              Technology Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              The infrastructure behind every deployment.
            </h2>
          </div>

          <div className="space-y-16">
            {techPartners.map((category) => (
              <div key={category.category}>
                <div className="flex items-start gap-6 mb-8">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight mb-1">
                      {category.category}
                    </h3>
                    <p className="text-muted text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-panel-3">
                  {category.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="bg-panel p-7 flex items-start justify-between gap-4 hover:bg-panel-2 transition-colors duration-200"
                    >
                      <div>
                        <div className="text-white text-sm font-semibold mb-1.5">
                          {partner.name}
                        </div>
                        <p className="text-muted text-xs leading-relaxed">
                          {partner.role}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold tracking-[0.2em] uppercase text-gold border border-gold/20 px-2 py-0.5">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strategic Alliances */}
      <section className="section-py border-t border-panel-3 bg-panel">
        <Container>
          <div className="mb-16">
            <p className="text-muted text-xs font-semibold tracking-[0.35em] uppercase mb-4">
              Strategic Alliances
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Build with ORTHONOBA.
            </h2>
            <p className="text-silver text-sm mt-4 max-w-xl leading-relaxed">
              We work with system integrators, digital agencies and industry
              specialists to deliver ORTHONOBA solutions to more businesses across
              Europe and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-panel-3 mb-16">
            {strategicAlliances.map((alliance) => (
              <div key={alliance.type} className="bg-panel p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-base font-semibold tracking-tight mb-3">
                    {alliance.type}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {alliance.description}
                  </p>
                </div>
                <p className="mt-8 text-xs text-gold font-semibold tracking-[0.2em] uppercase border-b border-gold/20 pb-0.5 w-fit">
                  {alliance.cta} →
                </p>
              </div>
            ))}
          </div>

          {/* Partner CTA */}
          <div className="border border-gold/15 bg-panel-2 p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Partner Program
              </p>
              <h3 className="text-white text-xl font-bold tracking-tight mb-2">
                Interested in partnering with ORTHONOBA?
              </h3>
              <p className="text-silver text-sm leading-relaxed max-w-lg">
                We&apos;re selectively expanding our partner network in Europe and
                Latin America. If you work with enterprise clients who need AI
                automation, let&apos;s talk.
              </p>
            </div>
            <Link
              href="/consultation"
              className="shrink-0 inline-block bg-gold text-obsidian px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book a Free Demo
            </Link>
          </div>
        </Container>
      </section>

      {/* Coming Soon */}
      <section className="section-py border-t border-panel-3">
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold/40" />
              <span className="text-muted text-xs font-semibold tracking-[0.35em] uppercase">
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
              Partner Marketplace
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              A curated directory of certified ORTHONOBA partners — verified system
              integrators, implementation specialists and white-label resellers
              available by industry and region. Launching Q3 2025.
            </p>
          </div>
        </Container>
      </section>

    </main>
  );
}
