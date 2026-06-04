import Container from "@/components/ui/Container";

const agents = [
  {
    index: "01",
    name: "AI Receptionist",
    role: "Front Desk",
    description:
      "Handles every inbound inquiry across web, WhatsApp and voice. Books appointments, answers questions and routes to the right person — with zero wait time.",
    outcomes: ["Eliminate missed inquiries", "Always available", "Instant response"],
  },
  {
    index: "02",
    name: "AI Sales Agent",
    role: "Revenue",
    description:
      "Identifies, engages and qualifies prospects automatically. Follows up at the right time with the right message, moving leads through the pipeline while your team focuses on closing.",
    outcomes: ["3× conversion rate", "Zero lead drop-off", "Automated follow-up"],
  },
  {
    index: "03",
    name: "AI Customer Support",
    role: "Retention",
    description:
      "Resolves support tickets, answers product questions and escalates complex cases. Trained on your knowledge base. Customers get answers in seconds, not hours.",
    outcomes: ["95% CSAT score", "80% auto-resolution", "Reduced support cost"],
  },
  {
    index: "04",
    name: "AI Lead Qualifier",
    role: "Pipeline",
    description:
      "Engages every inbound lead immediately. Scores, qualifies and enriches contact data automatically before handing off to sales — only qualified prospects reach your team.",
    outcomes: ["Instant engagement", "Automatic scoring", "Enriched profiles"],
  },
  {
    index: "05",
    name: "AI Appointment Assistant",
    role: "Scheduling",
    description:
      "Eliminates scheduling friction. Books, confirms and reminds automatically across all channels. Integrates with your calendar and reduces no-shows significantly.",
    outcomes: ["Fewer no-shows", "Zero back-and-forth", "Multi-channel booking"],
  },
  {
    index: "06",
    name: "AI Knowledge Assistant",
    role: "Intelligence",
    description:
      "Gives every team member instant access to company knowledge. Answers internal questions, surfaces relevant documents and accelerates onboarding with AI-powered search.",
    outcomes: ["Instant knowledge access", "Faster onboarding", "Reduced internal tickets"],
  },
  {
    index: "07",
    name: "AI Voice Agent",
    role: "Voice & Calls",
    description:
      "Every call answered in under 0.5 seconds. Books appointments, qualifies callers and routes inquiries — in 40+ languages, around the clock without adding headcount.",
    outcomes: ["<0.5s response time", "40+ languages", "Unlimited concurrent calls"],
  },
];

export default function AIWorkforceSection() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            AI Workforce
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            A digital team that{" "}
            <span className="text-gold">never stops working.</span>
          </h2>
          <div className="md:text-right max-w-sm">
            <p className="text-silver text-sm leading-relaxed">
              Deploy specialized AI agents for every business function. Each agent is trained for its role, integrated with your systems and operational from day one.
            </p>
          </div>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3">
          {agents.map((agent) => (
            <div
              key={agent.index}
              className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
                  {agent.index}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-gold/70 uppercase border border-gold/20 px-2 py-0.5">
                  {agent.role}
                </span>
              </div>
              <h3 className="text-white text-lg font-semibold tracking-tight mb-3">
                {agent.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {agent.description}
              </p>
              <div className="space-y-1.5 pt-5 border-t border-panel-3">
                {agent.outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    <span className="text-silver text-xs">{o}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
