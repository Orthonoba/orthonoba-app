"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

const TIMELINE = [
  { year: "1995", label: "Dental Industry", desc: "30+ years building and operating dental clinics across Europe and Latin America." },
  { year: "2020", label: "Digital Transformation", desc: "Discovered the power of software and automation to transform traditional industries." },
  { year: "2023", label: "AI & Automation", desc: "Deep dive into artificial intelligence — building the first AI agents for healthcare." },
  { year: "2026", label: "ORTHONOBA.APP", desc: "Launched a full digital transformation company serving Switzerland, Europe and Latin America." },
];

export default function FounderStory() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel border-y border-white/6 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Story */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
              Our Founder
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              30 Years of Real Business Experience
            </h2>
            <p className="text-silver text-sm leading-relaxed mb-8">
              ORTHONOBA was not built by engineers who read about business in textbooks.
              It was built by someone who <span className="text-white font-medium">ran real businesses</span> for three decades,
              experienced the problems first-hand, and then discovered that technology could solve them.
            </p>

            {/* Timeline */}
            <div className="space-y-6">
              {TIMELINE.map(({ year, label, desc }, i) => (
                <div key={year} className="flex gap-5">
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-gold/10 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gold">{year}</span>
                      <span className="text-sm font-semibold text-white">{label}</span>
                    </div>
                    <p className="text-xs text-silver/70 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/company/founder`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors mt-2"
            >
              Read full story <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — Founder Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-panel-2 border border-white/8 rounded-2xl p-8">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-black text-2xl mb-6 mx-auto">
                JG
              </div>

              <div className="text-center mb-6">
                <p className="text-base font-bold text-white">José Gregorio Rodríguez</p>
                <p className="text-sm text-gold mt-1">Founder & CEO</p>
                <p className="text-xs text-silver/60 mt-2">ORTHONOBA.APP</p>
              </div>

              <div className="space-y-3">
                {[
                  "30+ years dental & healthcare industry",
                  "Digital transformation specialist",
                  "AI & automation practitioner",
                  "Switzerland · Europe · Latin America",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-xs text-silver/70">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/6">
                <p className="text-xs text-silver/50 italic leading-relaxed text-center">
                  &ldquo;Real business problems deserve real technology solutions — not theory.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
