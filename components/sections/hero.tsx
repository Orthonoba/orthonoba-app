import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const stats = [
  { value: "10M+", label: "Automations Executed" },
  { value: "40+", label: "Languages Supported" },
  { value: "500+", label: "Integrations Available" },
  { value: "99.9%", label: "SLA Uptime" },
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-obsidian flex flex-col justify-center relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold radial glow — top right */}
      <div
        className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
      />
      {/* Subtle glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
      />

      {/* Main content */}
      <Container className="relative z-10">
        <div className="max-w-5xl pt-36 pb-20">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10 animate-fade-up">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Enterprise AI Growth Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(40px,6.5vw,88px)] font-bold text-white leading-[0.92] tracking-tight animate-fade-up stagger-1">
            Transform Your Business
            <br />
            With AI, Automation
            <br />
            <span className="text-gold">&amp; Intelligent Operations.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-10 text-silver text-lg md:text-xl leading-relaxed max-w-2xl animate-fade-up stagger-2">
            Scale your company with intelligent agents, automated workflows,
            customer operations and digital transformation solutions — designed
            for modern businesses that compete to win.
          </p>

          {/* Value props inline */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 animate-fade-up stagger-3">
            {["More Revenue", "More Clients", "Less Operating Cost", "24/7 Operations"].map((v) => (
              <div key={v} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span className="text-muted text-xs tracking-wider">{v}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12 animate-fade-up stagger-4">
            <Link
              href="/consultation"
              className="inline-block bg-gold text-obsidian px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light active:scale-[0.98] transition-all duration-200"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/platform"
              className="inline-block border border-panel-3 text-silver px-9 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-muted text-xs tracking-wider animate-fade-up stagger-5">
            Free 30-min strategy session · No commitment · GDPR compliant · Response within 24h
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
