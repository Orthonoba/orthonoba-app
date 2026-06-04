import Container from "@/components/ui/Container";

export default function Founder() {
  return (
    <section className="bg-panel py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Photo placeholder */}
          <div className="bg-panel-2 border border-panel-3 aspect-square max-w-sm flex items-center justify-center self-start">
            <span className="text-muted text-xs tracking-widest uppercase">
              Photo
            </span>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Founder
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Built by someone who<br />understands your industry.
            </h2>
            <p className="mt-8 text-silver text-base leading-relaxed">
              Orthonoba was founded with a clear mission: bring enterprise-grade
              digital tools to businesses that can&apos;t afford a full tech team.
            </p>
            <p className="mt-4 text-silver text-base leading-relaxed">
              From dental clinics to professional services, we build the
              systems that let you focus on your work — not on managing software.
            </p>
            <div className="mt-10 pt-8 border-t border-panel-3">
              <div className="text-white font-semibold tracking-wide">
                Jose Gregorio
              </div>
              <div className="text-muted text-xs tracking-widest mt-1 uppercase">
                Founder &amp; CEO, Orthonoba
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
