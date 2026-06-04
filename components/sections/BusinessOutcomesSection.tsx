import Container from "@/components/ui/Container";

const outcomes = [
  {
    metric: "3×",
    label: "Revenue Growth",
    description:
      "Average revenue increase for clients in the first 12 months. AI sales automation and lead qualification drive consistent pipeline growth.",
    category: "Growth",
  },
  {
    metric: "87%",
    label: "Response Time Reduction",
    description:
      "From hours to milliseconds. AI agents respond instantly across all channels — customers never wait, opportunities never go cold.",
    category: "Operations",
  },
  {
    metric: "40h+",
    label: "Hours Saved Weekly",
    description:
      "Per team member. Repetitive tasks — qualifying, scheduling, follow-ups, data entry — run automatically without human intervention.",
    category: "Productivity",
  },
  {
    metric: "60%",
    label: "No-Show Reduction",
    description:
      "Automated appointment confirmation and reminder sequences reduce no-shows across healthcare, legal, consulting and professional services.",
    category: "Retention",
  },
  {
    metric: "95%",
    label: "Customer Satisfaction",
    description:
      "Average CSAT for companies using Orthonoba AI for customer operations. Faster responses and 24/7 availability drive loyalty.",
    category: "Experience",
  },
  {
    metric: "−45%",
    label: "Operating Cost",
    description:
      "Cost reduction in customer operations, administration and marketing execution. Do more with your existing team.",
    category: "Efficiency",
  },
];

const testimonials = [
  {
    quote:
      "We scaled from €200K to €800K ARR in 18 months. Orthonoba's AI sales agent qualified leads around the clock while our team focused exclusively on closing high-value deals.",
    author: "Meridian Consulting",
    role: "Professional Services — Zurich",
    metric: "4× ARR Growth",
  },
  {
    quote:
      "Our administrative overhead dropped by 60% in the first quarter. Appointment booking, patient reminders, follow-ups — all automated. Our team now spends their time on what actually matters.",
    author: "Clinica Bianchi",
    role: "Healthcare — Milan",
    metric: "60% Admin Reduction",
  },
];

export default function BusinessOutcomesSection() {
  return (
    <section className="bg-panel py-32">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Business Outcomes
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            Not features.
            <br />
            <span className="text-gold">Business results.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Every metric below comes from real customers. We measure what matters: revenue, efficiency and operational impact.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3 mb-16">
          {outcomes.map((o) => (
            <div
              key={o.label}
              className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-[clamp(40px,4vw,56px)] font-bold text-gold leading-none tracking-tight">
                  {o.metric}
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-gold/60 uppercase border border-gold/15 px-2 py-0.5 mt-1">
                  {o.category}
                </span>
              </div>
              <div className="text-white text-sm font-semibold mb-3 tracking-tight">
                {o.label}
              </div>
              <p className="text-muted text-xs leading-relaxed">{o.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-panel-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-panel p-10 hover:bg-panel-2 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-gold text-2xl leading-none font-serif">&ldquo;</div>
                <span className="text-xs font-bold text-gold border border-gold/20 px-3 py-1">
                  {t.metric}
                </span>
              </div>
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
