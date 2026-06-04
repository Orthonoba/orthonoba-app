import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const services = [
  {
    index: "01",
    title: "SEO & Local SEO",
    description: "Dominate search results in your market. Technical SEO, content strategy and local search optimization — built for sustainable organic growth.",
    result: "Top 3 local rankings",
  },
  {
    index: "02",
    title: "Google Ads",
    description: "Performance campaigns managed with AI optimization. Maximize return on ad spend with continuous testing and intelligent bidding strategies.",
    result: "4× average ROAS",
  },
  {
    index: "03",
    title: "Meta Ads",
    description: "Social advertising at scale. Audience targeting, creative testing and funnel optimization across Facebook and Instagram.",
    result: "Lower CPA by 35%",
  },
  {
    index: "04",
    title: "Lead Generation",
    description: "Multi-channel lead generation systems that fill your pipeline consistently. Paid, organic, content and referral channels working together.",
    result: "Predictable pipeline",
  },
  {
    index: "05",
    title: "Conversion Optimization",
    description: "Analyze, test and optimize every step of your conversion funnel. Turn more visitors into leads and more leads into customers.",
    result: "2× landing page conversion",
  },
];

export default function MarketingGrowthSection() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Marketing Growth
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-xl">
            More clients.
            <br />
            More revenue.
            <br />
            <span className="text-gold">Measurable growth.</span>
          </h2>
          <div className="max-w-sm md:text-right">
            <p className="text-silver text-sm leading-relaxed">
              Marketing automation and performance advertising designed to grow your business — not just generate traffic.
            </p>
            <Link
              href="/consultation"
              className="inline-block mt-4 text-xs text-gold font-semibold tracking-widest uppercase border-b border-gold/30 hover:border-gold pb-0.5 transition-colors"
            >
              Book a Free Demo →
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3 mb-10">
          {services.map((s) => (
            <div
              key={s.index}
              className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
                  {s.index}
                </span>
              </div>
              <h3 className="text-white text-base font-semibold tracking-tight mb-3 group-hover:text-gold transition-colors duration-200">
                {s.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">{s.description}</p>
              <div className="pt-5 border-t border-panel-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <span className="text-silver text-xs font-medium">{s.result}</span>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="bg-panel p-8 border border-gold/10 flex flex-col justify-between">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                Custom Growth Strategy
              </p>
              <p className="text-silver text-sm leading-relaxed">
                Every business is different. Book a free strategy call and get a custom growth plan built around your specific goals.
              </p>
            </div>
            <Link
              href="/consultation"
              className="inline-block mt-8 bg-gold text-obsidian px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors text-center"
            >
              Free Strategy Call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
