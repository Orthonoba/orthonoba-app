import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const modules = [
  {
    title: "Lead Management",
    description: "Capture, qualify and nurture every lead from every source. Unified pipeline with automated scoring and prioritization.",
    tag: "Acquisition",
  },
  {
    title: "Customer Lifecycle",
    description: "Track every customer from first contact to long-term retention. Automated touchpoints at every stage of the relationship.",
    tag: "Retention",
  },
  {
    title: "Pipeline Management",
    description: "Visual sales pipeline with AI-powered forecasting. Know which deals will close and when — before your sales meeting.",
    tag: "Revenue",
  },
  {
    title: "Communication Hub",
    description: "All customer conversations — email, WhatsApp, chat, voice — in a single unified inbox with full history and context.",
    tag: "Engagement",
  },
  {
    title: "Customer Intelligence",
    description: "AI-powered insights on customer behavior, satisfaction and churn risk. Act on data before problems become visible.",
    tag: "Intelligence",
  },
];

export default function CustomerOperationsSection() {
  return (
    <section className="bg-panel py-32">
      <Container>
        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Left sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Customer Operations
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Every customer.
              <br />
              <span className="text-gold">Every interaction.</span>
              <br />
              One platform.
            </h2>
            <p className="text-silver text-sm leading-relaxed mb-10">
              Manage the entire customer relationship — from first contact to lifetime value — with intelligent automation and real-time visibility.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-silver">
                <div className="w-5 h-px bg-gold/50" />
                Unified customer view across all channels
              </div>
              <div className="flex items-center gap-3 text-xs text-silver">
                <div className="w-5 h-px bg-gold/50" />
                AI-powered predictions and recommendations
              </div>
              <div className="flex items-center gap-3 text-xs text-silver">
                <div className="w-5 h-px bg-gold/50" />
                Automated follow-ups and lifecycle triggers
              </div>
              <div className="flex items-center gap-3 text-xs text-silver">
                <div className="w-5 h-px bg-gold/50" />
                Real-time reporting and revenue forecasting
              </div>
            </div>
            <Link
              href="/platform/crm"
              className="inline-block mt-10 bg-gold text-obsidian px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              Explore CRM Platform
            </Link>
          </div>

          {/* Right — modules */}
          <div className="lg:col-span-3 space-y-px bg-panel-3">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="bg-panel p-7 hover:bg-panel-2 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white text-base font-semibold tracking-tight mb-2 group-hover:text-gold transition-colors duration-200">
                      {mod.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{mod.description}</p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] font-semibold tracking-[0.25em] text-gold/60 uppercase border border-gold/15 px-2 py-0.5">
                    {mod.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
