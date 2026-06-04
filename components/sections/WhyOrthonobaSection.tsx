import Container from "@/components/ui/Container";

const pillars = [
  {
    index: "01",
    title: "One Platform, Not a Stack",
    description:
      "AI agents, automation, CRM, voice and marketing in a single workspace. Every module shares context — a sales conversation automatically updates your pipeline. No separate tools to integrate.",
  },
  {
    index: "02",
    title: "Deployed in Hours, Not Months",
    description:
      "Pre-built AI agents go live in 2–4 hours. No lengthy implementation projects, no dedicated IT team required. Your first agent is operational before the end of your first week.",
  },
  {
    index: "03",
    title: "Industry Pre-Configured",
    description:
      "Pre-built workflows for Dental, Healthcare, Legal, Real Estate and Professional Services. Not a blank platform you adapt — a system already calibrated for how your industry operates.",
  },
  {
    index: "04",
    title: "Managed From Day One",
    description:
      "We configure, train and monitor your AI workforce. You don't buy software and figure it out alone — you get a system that runs, and a team that keeps it optimized.",
  },
  {
    index: "05",
    title: "European by Architecture",
    description:
      "GDPR-compliant by design. Data stays in Europe. No data processed outside EU jurisdiction — built for industries where compliance is non-negotiable.",
  },
  {
    index: "06",
    title: "Results-First Engagement",
    description:
      "We define KPIs before deployment. You see ROI metrics from week one. Every engagement is tied to a measurable business outcome — not a delivery milestone.",
  },
];

const awards = [
  { value: "GDPR", label: "Compliant" },
  { value: "ISO 27001", label: "Principles" },
  { value: "EU Data", label: "Residency" },
  { value: "99.9%", label: "SLA Uptime" },
];

export default function WhyOrthonobaSection() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Why Orthonoba
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            Not an agency.
            <br />
            Not a SaaS tool.
            <br />
            <span className="text-gold">An operating system for your business.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Agencies bill hours and leave. SaaS tools require you to do the work. ORTHONOBA deploys an AI workforce, builds the automation layer and stays accountable to your results.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3 mb-12">
          {pillars.map((p) => (
            <div
              key={p.index}
              className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase block mb-5">
                {p.index}
              </span>
              <h3 className="text-white text-base font-semibold tracking-tight mb-3 group-hover:text-gold transition-colors duration-200">
                {p.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="border border-panel-3 bg-panel">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-panel-3">
            {awards.map((a) => (
              <div key={a.label} className="px-8 py-6 text-center">
                <div className="text-lg font-bold text-gold tracking-tight">{a.value}</div>
                <div className="text-muted text-xs tracking-[0.2em] uppercase mt-1">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
