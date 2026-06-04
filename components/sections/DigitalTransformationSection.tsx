import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const pillars = [
  {
    index: "01",
    title: "Software Development",
    description: "Custom web applications, business platforms and SaaS products built with modern technology. From concept to production, designed for scale.",
  },
  {
    index: "02",
    title: "Business Systems Integration",
    description: "Connect your existing tools into a unified operating environment. CRM, ERP, accounting, marketing — all synchronized and automated.",
  },
  {
    index: "03",
    title: "AI Adoption",
    description: "Embed AI into your existing processes. We identify high-ROI automation opportunities and implement AI solutions with measurable business impact.",
  },
  {
    index: "04",
    title: "Digital Infrastructure",
    description: "Modern, secure and scalable digital foundations. Cloud architecture, security posture, data pipelines and operational infrastructure.",
  },
];

const steps = [
  { label: "Assess", detail: "Audit your current systems and identify transformation opportunities" },
  { label: "Design", detail: "Build a phased digital transformation roadmap aligned with your goals" },
  { label: "Implement", detail: "Deploy solutions with minimal disruption to existing operations" },
  { label: "Optimize", detail: "Measure results, iterate and scale what delivers ROI" },
];

export default function DigitalTransformationSection() {
  return (
    <section className="bg-panel section-py">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Digital Transformation
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            Modernize your business.
            <br />
            <span className="text-gold">Compete at the next level.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Strategic technology transformation that delivers measurable ROI — not just digital projects, but business results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Left — pillars */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-panel-3">
            {pillars.map((p) => (
              <div key={p.index} className="bg-panel-2 p-8 hover:bg-[#1E1E1E] transition-colors duration-300 group">
                <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase block mb-4">
                  {p.index}
                </span>
                <h3 className="text-white text-base font-semibold tracking-tight mb-3 group-hover:text-gold transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Right — process */}
          <div className="bg-panel border border-panel-3 p-8">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-8">
              Our Process
            </p>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                  {/* Vertical line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-panel-3" />
                  )}
                  <div className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5 bg-panel">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{step.label}</p>
                    <p className="text-muted text-xs leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/consultation"
              className="inline-block w-full mt-8 bg-gold text-obsidian px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors text-center"
            >
              Start Transformation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
