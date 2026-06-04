import Container from "@/components/ui/Container";

const metrics = [
  {
    value: "87%",
    label: "Response Time Reduction",
    description:
      "AI agents respond in under 500ms. Customers get answers instantly instead of waiting hours.",
  },
  {
    value: "40h+",
    label: "Hours Saved Per Week",
    description:
      "Per team member. Repetitive tasks — qualifying, scheduling, follow-ups — run automatically.",
  },
  {
    value: "3×",
    label: "Lead Conversion Rate",
    description:
      "AI-qualified leads that reach a human rep close at 3× the rate of unqualified inbound leads.",
  },
  {
    value: "95%",
    label: "Customer Satisfaction",
    description:
      "Average CSAT across customers using ORTHONOBA AI agents for customer support and reception.",
  },
];

const testimonials = [
  {
    quote:
      "ORTHONOBA reduced our no-show rate by 60% within the first month. The AI receptionist handles all confirmations automatically.",
    author: "Studio Dentale Bianchi",
    role: "Dental Practice — Milan",
  },
  {
    quote:
      "We closed 40% more deals in Q1 because our sales AI was qualifying leads around the clock while our team focused on high-value accounts.",
    author: "Meridian Consulting",
    role: "Professional Services — Zurich",
  },
];

export default function MetricsSection() {
  return (
    <section className="bg-panel py-32">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Proven Results
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-16">
          Not features. Outcomes.
        </h2>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-panel-3 mb-20">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <div className="text-[clamp(40px,4vw,56px)] font-bold text-gold leading-none tracking-tight">
                {m.value}
              </div>
              <div className="text-white text-sm font-semibold mt-4 tracking-tight">
                {m.label}
              </div>
              <p className="text-muted text-xs mt-3 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-panel-3">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-200">
              <div className="text-gold text-2xl leading-none mb-6 font-serif">&ldquo;</div>
              <p className="text-silver text-base leading-relaxed">{t.quote}</p>
              <div className="mt-8 pt-6 border-t border-panel-3">
                <div className="text-white text-sm font-semibold">{t.author}</div>
                <div className="text-muted text-xs tracking-wider mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
