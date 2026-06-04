import Container from "@/components/ui/Container";

const pillars = [
  {
    index: "01",
    title: "Enterprise Experience",
    description:
      "Built by a team with decades of combined experience in enterprise software, SaaS and digital transformation across Europe and international markets.",
  },
  {
    index: "02",
    title: "AI Applied to Real Business",
    description:
      "We don't implement AI for AI's sake. Every solution is mapped to a specific business outcome — more revenue, lower cost, higher efficiency.",
  },
  {
    index: "03",
    title: "Industry-Specific Intelligence",
    description:
      "Our AI agents are trained on industry-specific knowledge. A dental practice, a law firm and a real estate agency require different intelligence — and we build it that way.",
  },
  {
    index: "04",
    title: "Measurable Results",
    description:
      "Every engagement is defined by measurable KPIs. We set targets upfront and track performance against them — not vanity metrics, but business outcomes.",
  },
  {
    index: "05",
    title: "European Standards",
    description:
      "GDPR-compliant by design. Data stays in Europe. No shortcuts on security, privacy or data sovereignty — critical for regulated industries.",
  },
  {
    index: "06",
    title: "Partner, Not Vendor",
    description:
      "We work as an extension of your team. Long-term relationships, proactive recommendations and genuine investment in your growth — not just project delivery.",
  },
];

const awards = [
  { value: "GDPR", label: "Compliant" },
  { value: "ISO", label: "27001 Aligned" },
  { value: "SOC 2", label: "Preparation" },
  { value: "99.9%", label: "SLA Uptime" },
];

export default function WhyOrthonobaSection() {
  return (
    <section className="bg-obsidian py-32">
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
            The platform built for
            <br />
            <span className="text-gold">businesses that scale.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Orthonoba is not a generic tool. It&apos;s a platform built specifically for businesses that want to operate at a higher level with AI and automation.
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
