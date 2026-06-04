import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="min-h-screen bg-obsidian flex items-center relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-5xl pt-32 pb-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              AI &amp; Digital Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(48px,7.5vw,96px)] font-bold text-white leading-[0.92] tracking-tight">
            Intelligent
            <br />
            <span className="text-gold">Systems</span>
            <br />
            for Modern
            <br />
            Business.
          </h1>

          {/* Subtitle */}
          <p className="mt-10 text-silver text-lg md:text-xl leading-relaxed max-w-xl">
            We design and deploy AI agents, automated workflows, and digital
            infrastructure that transform how businesses operate and scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gold text-obsidian px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Start a Project
            </Link>
            <Link
              href="/portfolio"
              className="inline-block border border-panel-3 text-silver px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
            >
              View Work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
