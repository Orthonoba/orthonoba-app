import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const automations = [
  {
    index: "01",
    title: "Workflow Automation",
    description: "Replace manual, repetitive processes with intelligent workflows. Triggered by events, time or data changes — running without human intervention.",
  },
  {
    index: "02",
    title: "Sales Automation",
    description: "Automate the entire sales cycle. Lead capture, qualification, follow-up sequences, proposal generation and pipeline updates — all on autopilot.",
  },
  {
    index: "03",
    title: "Customer Journey Automation",
    description: "Design multi-step customer journeys that adapt in real time. Onboarding flows, retention campaigns and re-engagement sequences that work 24/7.",
  },
  {
    index: "04",
    title: "Operations Automation",
    description: "Connect your business systems and automate the data flow between them. Eliminate manual entry, reduce errors and free your team from operational overhead.",
  },
  {
    index: "05",
    title: "Internal Process Automation",
    description: "Streamline internal operations: approvals, notifications, reporting and task assignments — all automated and tracked without spreadsheets.",
  },
];

const outcomes = [
  { metric: "70%", label: "Reduction in manual tasks" },
  { metric: "40h+", label: "Hours saved per team per week" },
  { metric: "500+", label: "Pre-built integrations" },
  { metric: "10M+", label: "Automations executed" },
];

export default function BusinessAutomationSection() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Business Automation
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            Automate everything.
            <br />
            <span className="text-gold">Every system connected.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Complete automation of business processes. From simple tasks to complex multi-system workflows — designed to scale with your operations.
          </p>
        </div>

        {/* Outcomes strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-panel-3 mb-16">
          {outcomes.map((o) => (
            <div key={o.label} className="bg-panel px-8 py-7">
              <div className="text-3xl font-bold text-gold tracking-tight">{o.metric}</div>
              <div className="text-silver text-xs mt-1.5 tracking-wide">{o.label}</div>
            </div>
          ))}
        </div>

        {/* Automations list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-panel-3 mb-10">
          {automations.map((a) => (
            <div
              key={a.index}
              className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <div className="flex items-start gap-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase pt-1 flex-shrink-0">
                  {a.index}
                </span>
                <div>
                  <h3 className="text-white text-base font-semibold tracking-tight mb-2 group-hover:text-gold transition-colors duration-200">
                    {a.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="bg-panel p-8 flex flex-col justify-between border border-gold/10">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Custom Automations
              </p>
              <p className="text-silver text-sm leading-relaxed">
                Need a process automated that doesn&apos;t fit a template? Our team builds custom automation solutions for complex enterprise workflows.
              </p>
            </div>
            <Link
              href="/consultation"
              className="inline-block mt-8 text-xs text-gold font-bold tracking-widest uppercase border-b border-gold/30 hover:border-gold pb-0.5 transition-colors"
            >
              Request Custom Build →
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/consultation"
            className="bg-gold text-obsidian px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
          >
            Book a Free Demo
          </Link>
        </div>
      </Container>
    </section>
  );
}
