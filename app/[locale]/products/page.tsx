import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "AI Products — ORTHONOBA",
  description:
    "Pre-built AI products ready to deploy — AI Receptionist, AI Sales Agent, AI Support, Lead Qualifier, Voice Assistant and more.",
};

const products = [
  {
    index: "01",
    name: "AI Receptionist",
    slug: "ai-receptionist",
    type: "Voice & Chat",
    headline: "Never miss an inquiry again.",
    description:
      "A voice and chat AI that handles your front desk 24/7. Books appointments, qualifies callers, answers FAQs and escalates to your team when needed. Available in 40+ languages.",
    benefits: [
      "Handles inbound calls & chats simultaneously",
      "Books appointments directly to your calendar",
      "Qualifies and routes inquiries",
      "Works nights, weekends and holidays",
    ],
    deployTime: "Deploy in 2 hours",
    industries: ["Dental", "Healthcare", "Legal", "Real Estate"],
  },
  {
    index: "02",
    name: "AI Sales Agent",
    slug: "ai-sales",
    type: "Email & WhatsApp",
    headline: "Your best sales rep — always working.",
    description:
      "An AI agent that follows up leads via email and WhatsApp, sends personalized proposals and moves deals through your pipeline on autopilot. Integrates with your CRM.",
    benefits: [
      "Follows up every lead within 2 minutes",
      "Sends personalized email sequences",
      "Moves leads through pipeline stages",
      "Logs all activity in CRM automatically",
    ],
    deployTime: "Deploy in 4 hours",
    industries: ["Consulting", "Real Estate", "E-Commerce", "Education"],
  },
  {
    index: "03",
    name: "AI Support Agent",
    slug: "ai-support",
    type: "Chat & Email",
    headline: "Resolve 80% of tickets automatically.",
    description:
      "A support agent trained on your knowledge base that resolves customer questions instantly — with citations. Escalates complex cases to your team with full context.",
    benefits: [
      "Answers questions from your knowledge base",
      "Provides source citations for every answer",
      "Escalates with full conversation context",
      "Available across chat, email and WhatsApp",
    ],
    deployTime: "Deploy in 3 hours",
    industries: ["E-Commerce", "SaaS", "Healthcare", "Consulting"],
  },
  {
    index: "04",
    name: "AI Lead Qualifier",
    slug: "lead-qualifier",
    type: "WhatsApp & Chat",
    headline: "Only talk to ready-to-buy leads.",
    description:
      "Engages every inbound lead in real time, scores them based on your criteria and routes high-intent prospects to your sales team. The rest are nurtured automatically.",
    benefits: [
      "Scores leads instantly on contact",
      "Routes high-intent leads to sales",
      "Nurtures low-intent leads automatically",
      "Syncs scores to your CRM",
    ],
    deployTime: "Deploy in 2 hours",
    industries: ["Real Estate", "Consulting", "Legal", "Financial Services"],
  },
  {
    index: "05",
    name: "AI Voice Assistant",
    slug: "voice-assistant",
    type: "Voice",
    headline: "Voice-first interface for your business.",
    description:
      "A dedicated voice assistant that operators can call to query data, check schedules and trigger actions — hands-free. Built for field teams and busy professionals.",
    benefits: [
      "Query CRM data by voice",
      "Trigger workflows by voice command",
      "Check schedules and availability",
      "Works on any phone, no app needed",
    ],
    deployTime: "Deploy in 4 hours",
    industries: ["Healthcare", "Dental", "Field Services", "Logistics"],
  },
  {
    index: "06",
    name: "AI Appointment System",
    slug: "appointments",
    type: "Voice, Chat & WhatsApp",
    headline: "Zero back-and-forth scheduling.",
    description:
      "An AI that books, confirms and reschedules appointments across all channels — voice, chat and WhatsApp — without any human involvement. Syncs to your calendar in real time.",
    benefits: [
      "Books across voice, chat and WhatsApp",
      "Sends confirmations and reminders",
      "Handles rescheduling and cancellations",
      "Reduces no-show rate by 60%",
    ],
    deployTime: "Deploy in 2 hours",
    industries: ["Dental", "Healthcare", "Legal", "Beauty & Wellness"],
  },
  {
    index: "07",
    name: "AI Knowledge Assistant",
    slug: "knowledge",
    type: "Chat & Slack",
    headline: "Every answer from your own documents.",
    description:
      "Upload your SOPs, policies and manuals. Your team gets instant AI-powered answers from your internal knowledge base — with full source citations. Zero hallucinations.",
    benefits: [
      "Upload PDFs, Word docs and web pages",
      "AI answers with citations",
      "Available in Slack, chat and web",
      "Access control per document",
    ],
    deployTime: "Deploy in 1 hour",
    industries: ["All industries", "Enterprise", "HR", "Legal & Compliance"],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian pt-32 pb-20 px-6">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                AI Products
              </span>
            </div>
            <h1 className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.92] tracking-tight">
              Pre-built AI agents.<br />
              <span className="text-gold">Deploy in hours.</span>
            </h1>
            <p className="mt-8 text-silver text-lg leading-relaxed max-w-2xl">
              Every ORTHONOBA product is a pre-configured AI agent optimized
              for a specific business function. Connect to your data, configure
              your brand voice, and deploy in under a day.
            </p>
          </div>
        </Container>
      </section>

      {/* Products grid */}
      <section className="bg-panel py-24 px-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-px bg-panel-3">
            {products.map((product) => (
              <div
                key={product.slug}
                className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-gold text-xs font-mono tracking-widest">
                    {product.index}
                  </span>
                  <span className="text-[10px] text-muted tracking-widest uppercase border border-panel-3 px-2 py-0.5">
                    {product.type}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200 mb-2">
                  {product.name}
                </h2>
                <p className="text-gold text-xs font-semibold mb-4 tracking-wide">
                  {product.headline}
                </p>
                <p className="text-silver text-sm leading-relaxed flex-1 mb-6">
                  {product.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 bg-gold mt-1.5 shrink-0" />
                      <span className="text-muted text-xs leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom */}
                <div className="pt-5 border-t border-panel-3 flex items-center justify-between">
                  <span className="text-muted text-[10px] tracking-widest uppercase">
                    {product.deployTime}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-gold text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-light transition-colors duration-200"
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
              Not sure which product fits?
            </h2>
            <p className="mt-4 text-silver text-base">
              Book a 30-minute session and we&apos;ll map the right AI product to your specific workflow.
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
