import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const agents = [
  {
    type: "Voice",
    name: "AI Receptionist",
    description:
      "Answers calls, qualifies inquiries and books appointments 24/7 — in the caller's language.",
    channels: ["Voice", "WhatsApp"],
    useCase: "Front desk · Reception · Scheduling",
  },
  {
    type: "Sales",
    name: "AI Sales Agent",
    description:
      "Follows up leads, sends proposals and moves deals through your pipeline automatically.",
    channels: ["Email", "WhatsApp"],
    useCase: "Lead nurturing · Pipeline · Closing",
  },
  {
    type: "Support",
    name: "AI Support Agent",
    description:
      "Resolves customer queries instantly from your knowledge base. Escalates only when needed.",
    channels: ["Chat", "Email"],
    useCase: "Helpdesk · FAQ · Ticket resolution",
  },
  {
    type: "Lead",
    name: "AI Lead Qualifier",
    description:
      "Engages inbound leads in real time, scores them and routes high-intent prospects to your team.",
    channels: ["WhatsApp", "Chat"],
    useCase: "Lead capture · Scoring · Routing",
  },
  {
    type: "Knowledge",
    name: "AI Knowledge Assistant",
    description:
      "Answers questions from your internal documents, SOPs and policies. Zero hallucinations.",
    channels: ["Chat", "Voice"],
    useCase: "Internal ops · Onboarding · Compliance",
  },
  {
    type: "Custom",
    name: "Custom AI Agent",
    description:
      "Build any agent from scratch with your own system prompt, tools and integrations via API.",
    channels: ["Any channel"],
    useCase: "Bespoke workflows · API · SDK",
  },
];

export default function Platform() {
  return (
    <section className="bg-panel section-py">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            AI Agents
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Meet your<br />AI workforce.
          </h2>
          <p className="text-silver text-base leading-relaxed max-w-md">
            Deploy pre-built agents in minutes or build custom ones with our
            no-code studio. Every agent is connected, observable, and auditable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="bg-obsidian border border-panel-3 p-8 hover:border-gold/30 transition-all duration-300 group"
            >
              {/* Type badge */}
              <div className="inline-flex items-center px-2.5 py-1 bg-gold/10 border border-gold/20 mb-5">
                <span className="text-gold text-[10px] font-semibold tracking-widest uppercase">
                  {agent.type}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                {agent.name}
              </h3>
              <p className="mt-3 text-silver text-sm leading-relaxed">
                {agent.description}
              </p>

              {/* Channels */}
              <div className="mt-5 pt-5 border-t border-panel-3 flex flex-col gap-2">
                <div className="flex gap-2 flex-wrap">
                  {agent.channels.map((ch) => (
                    <span
                      key={ch}
                      className="text-[10px] text-muted tracking-widest uppercase border border-panel-3 px-2 py-0.5"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
                <p className="text-muted text-xs">{agent.useCase}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-6">
          <Link
            href="/products"
            className="inline-block bg-gold text-obsidian px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
          >
            Explore All Products
          </Link>
          <Link
            href="/consultation"
            className="text-silver text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-200 border-b border-panel-3 pb-0.5"
          >
            Talk to an Expert →
          </Link>
        </div>
      </Container>
    </section>
  );
}
