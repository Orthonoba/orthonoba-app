import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Business Automation — ORTHONOBA",
  description:
    "Automate WhatsApp, email, CRM, sales and marketing workflows with 500+ integrations. Visual workflow builder powered by n8n.",
};

const automationTypes = [
  {
    index: "01",
    title: "WhatsApp Automation",
    slug: "whatsapp",
    description:
      "Build conversational flows on WhatsApp Business. Lead capture, appointment confirmations, customer notifications and support — all automated with AI.",
    useCases: [
      "Appointment confirmation & reminders",
      "Lead qualification flows",
      "Order status notifications",
      "Customer support escalation",
    ],
    trigger: "New WhatsApp message",
  },
  {
    index: "02",
    title: "Email Automation",
    slug: "email",
    description:
      "AI-personalized email sequences that adapt to recipient behavior. Nurture leads, onboard customers and re-engage churned accounts automatically.",
    useCases: [
      "Lead nurturing sequences",
      "Customer onboarding flows",
      "Win-back campaigns",
      "Post-purchase follow-ups",
    ],
    trigger: "New lead or event",
  },
  {
    index: "03",
    title: "CRM Automation",
    slug: "crm",
    description:
      "Keep your CRM perfectly up to date without manual data entry. Auto-create contacts, update deal stages, assign leads and log activities from any source.",
    useCases: [
      "Auto-create contacts from forms",
      "Update deal stages on AI signals",
      "Assign leads by territory or score",
      "Log calls and emails automatically",
    ],
    trigger: "Any CRM event",
  },
  {
    index: "04",
    title: "Sales Automation",
    slug: "sales",
    description:
      "From first contact to closed deal on autopilot. AI agents qualify, follow up, propose and close — your team only steps in for high-value negotiations.",
    useCases: [
      "Lead to proposal in under 5 minutes",
      "Automated follow-up sequences",
      "Contract generation on deal close",
      "Revenue forecasting updates",
    ],
    trigger: "New lead or stage change",
  },
  {
    index: "05",
    title: "Marketing Automation",
    slug: "marketing",
    description:
      "AI-powered campaign orchestration across email, WhatsApp and social. Segment audiences, personalize messages and optimize send times automatically.",
    useCases: [
      "Multi-channel campaign orchestration",
      "Behavioral segmentation",
      "A/B test optimization",
      "ROI tracking per campaign",
    ],
    trigger: "Segment update or schedule",
  },
];

const integrations = [
  "WhatsApp Business API",
  "Gmail / Outlook",
  "HubSpot",
  "Salesforce",
  "Shopify",
  "Stripe",
  "Calendly",
  "Google Sheets",
  "Notion",
  "Slack",
  "Twilio",
  "Zapier",
];

export default function AutomationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian pt-32 pb-20 px-6">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Business Automation
              </span>
            </div>
            <h1 className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.92] tracking-tight">
              Automate everything.<br />
              <span className="text-gold">500+ integrations.</span>
            </h1>
            <p className="mt-8 text-silver text-lg leading-relaxed max-w-2xl">
              Build powerful automation workflows without writing code. Connect
              WhatsApp, email, CRM and any business tool — then let AI agents
              orchestrate the entire process around the clock.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-px bg-panel-3 max-w-lg">
              {[
                { value: "500+", label: "Integrations" },
                { value: "10M+", label: "Automations Run" },
                { value: "40h+", label: "Saved / Week" },
              ].map((s) => (
                <div key={s.label} className="bg-obsidian px-6 py-5">
                  <div className="text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-muted text-xs mt-1 tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Automation types */}
      <section className="bg-panel py-24 px-6">
        <Container>
          <div className="space-y-px bg-panel-3">
            {automationTypes.map((auto) => (
              <div
                key={auto.slug}
                className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-300 group grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                <div>
                  <span className="text-gold text-xs font-mono tracking-widest">
                    {auto.index}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                    {auto.title}
                  </h2>
                  <div className="mt-2 text-muted text-[10px] tracking-widest uppercase border border-panel-3 inline-block px-2.5 py-1">
                    Trigger: {auto.trigger}
                  </div>
                </div>

                <div>
                  <p className="text-silver text-sm leading-relaxed">
                    {auto.description}
                  </p>
                </div>

                <div>
                  <p className="text-muted text-[10px] tracking-widest uppercase mb-3">
                    Use Cases
                  </p>
                  <ul className="space-y-2">
                    {auto.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2.5">
                        <div className="w-1 h-1 bg-gold mt-1.5 shrink-0" />
                        <span className="text-silver text-xs leading-relaxed">{uc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/automation/${auto.slug}`}
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

      {/* Integration strip */}
      <section className="bg-obsidian py-16 px-6 border-t border-panel-3">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-muted text-xs tracking-[0.25em] uppercase shrink-0">
              Works with
            </span>
            <div className="flex flex-wrap gap-3">
              {integrations.map((int) => (
                <span
                  key={int}
                  className="text-silver text-xs font-semibold tracking-wide border border-panel-3 px-3 py-1.5 hover:border-gold/30 hover:text-white transition-all duration-200"
                >
                  {int}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-panel py-24 px-6 border-t border-panel-3">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Ready to automate?
            </h2>
            <p className="mt-4 text-silver text-base">
              We&apos;ll build your first automation workflow during the demo — live, with your actual tools.
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
