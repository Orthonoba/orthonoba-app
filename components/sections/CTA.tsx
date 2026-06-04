import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="bg-obsidian py-32 border-t border-panel-3">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Get Started
            </span>
            <div className="w-10 h-px bg-gold" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Ready to build?
          </h2>
          <p className="mt-6 text-silver text-lg leading-relaxed max-w-xl mx-auto">
            Let&apos;s talk about your project. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gold text-obsidian px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/consultation"
              className="inline-block border border-panel-3 text-silver px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
