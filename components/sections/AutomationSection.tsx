import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const channels = [
  { name: "WhatsApp", color: "text-emerald-400" },
  { name: "Email", color: "text-blue-400" },
  { name: "CRM", color: "text-purple-400" },
  { name: "Slack", color: "text-yellow-400" },
  { name: "Calendly", color: "text-cyan-400" },
  { name: "Stripe", color: "text-indigo-400" },
  { name: "Google Sheets", color: "text-green-400" },
  { name: "Notion", color: "text-white" },
  { name: "HubSpot", color: "text-orange-400" },
  { name: "Shopify", color: "text-lime-400" },
];

const workflowSteps = [
  { step: "01", trigger: "New lead from WhatsApp", action: "Trigger" },
  { step: "02", trigger: "AI qualifies intent and score", action: "Process" },
  { step: "03", trigger: "Add to CRM pipeline", action: "Update" },
  { step: "04", trigger: "Send personalized email sequence", action: "Notify" },
  { step: "05", trigger: "Schedule follow-up call", action: "Complete" },
];

const stats = [
  { value: "500+", label: "Integrations" },
  { value: "10M+", label: "Automations Run" },
  { value: "40h+", label: "Saved Per Week" },
];

export default function AutomationSection() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Business Automation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Automate everything.<br />
              <span className="text-gold">Focus on what matters.</span>
            </h2>
            <p className="mt-6 text-silver text-base leading-relaxed">
              Connect your tools, trigger workflows and run operations around
              the clock — without writing a single line of code. Visual builder
              powered by n8n with 500+ pre-built connectors.
            </p>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-px bg-panel-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-obsidian px-6 py-5">
                  <div className="text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-muted text-xs mt-1 tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Integration badges */}
            <div className="mt-8">
              <p className="text-muted text-xs tracking-widest uppercase mb-4">
                Connects with
              </p>
              <div className="flex flex-wrap gap-2">
                {channels.map((ch) => (
                  <span
                    key={ch.name}
                    className={`text-xs font-semibold tracking-wide border border-panel-3 px-3 py-1.5 ${ch.color}`}
                  >
                    {ch.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/automation"
                className="inline-block bg-gold text-obsidian px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
              >
                Explore Automations
              </Link>
            </div>
          </div>

          {/* Right: workflow visual */}
          <div className="bg-panel border border-panel-3 p-8">
            <p className="text-muted text-[10px] font-semibold tracking-[0.3em] uppercase mb-6">
              Example Workflow — Lead Qualification
            </p>
            <div className="space-y-0">
              {workflowSteps.map((s, i) => (
                <div key={s.step} className="flex items-stretch gap-4">
                  {/* Connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 border border-gold/40 flex items-center justify-center shrink-0">
                      <span className="text-gold text-[9px] font-mono">{s.step}</span>
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <div className="w-px flex-1 bg-panel-3 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-medium">{s.trigger}</p>
                      <span className="text-[10px] text-muted tracking-widest uppercase border border-panel-3 px-2 py-0.5">
                        {s.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-panel-3 mt-2">
              <p className="text-muted text-xs">
                This workflow runs automatically — no manual work required.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
