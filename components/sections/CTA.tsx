import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const trust = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "GDPR compliant",
];

export default function CTA() {
  return (
    <section className="bg-panel py-32 border-t border-panel-3">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Start Today
            </span>
            <div className="w-10 h-px bg-gold" />
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Ready to transform<br />your business?
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-silver text-lg leading-relaxed max-w-xl mx-auto">
            Book a demo and see how ORTHONOBA can automate your operations,
            qualify your leads and serve your customers — 24 hours a day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/consultation"
              className="inline-block bg-gold text-obsidian px-12 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-panel-3 text-silver px-12 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
            >
              Talk to Sales
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
            {trust.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-muted text-xs tracking-wider"
              >
                <span className="w-1 h-1 bg-gold rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
