import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const stats = [
  { value: "500+", label: "Companies" },
  { value: "8", label: "Industries" },
  { value: "10M+", label: "Automations Run" },
  { value: "99.9%", label: "Platform Uptime" },
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-obsidian flex flex-col justify-center relative overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold glow — top left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #D4AF37, transparent 70%)",
        }}
      />

      {/* Main content */}
      <Container className="relative z-10">
        <div className="max-w-5xl pt-36 pb-20">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Enterprise AI Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(44px,7vw,92px)] font-bold text-white leading-[0.9] tracking-tight">
            AI Agents.
            <br />
            Automation.
            <br />
            <span className="text-gold">Business Operations.</span>
            <br />
            One Platform.
          </h1>

          {/* Subheadline */}
          <p className="mt-10 text-silver text-lg md:text-xl leading-relaxed max-w-2xl">
            Transform your company with intelligent agents, voice automation,
            CRM and enterprise workflows — built for any industry, any scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
            <Link
              href="/consultation"
              className="inline-block bg-gold text-obsidian px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book Demo
            </Link>
            <Link
              href="/platform"
              className="inline-block border border-panel-3 text-silver px-9 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
            >
              Watch Platform Tour
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-muted text-xs tracking-wider">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </Container>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-panel-3 bg-panel/50">
        <Container>
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-panel-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-panel/80 px-8 py-6 flex flex-col items-center md:items-start"
              >
                <span className="text-3xl font-bold text-gold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-muted text-xs tracking-[0.2em] uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
