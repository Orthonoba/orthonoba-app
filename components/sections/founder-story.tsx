"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

const TIMELINE = [
  {
    year: "1995",
    label: "Dental Industry",
    desc: "30+ years building and operating dental clinics and healthcare businesses across Europe and Latin America.",
  },
  {
    year: "2020",
    label: "Digital Transformation",
    desc: "Discovered how software and automation could solve the real operational problems he had experienced first-hand.",
  },
  {
    year: "2023",
    label: "AI & Automation",
    desc: "Deep specialization in artificial intelligence — building the first AI agents for healthcare and professional services.",
  },
  {
    year: "2026",
    label: "ORTHONOBA",
    desc: "Launched a full technology platform serving companies across Switzerland, Europe and Latin America.",
  },
];

const ROLES = [
  "Business Technologist",
  "AI Automation Specialist",
  "Healthcare Digital Expert",
];

export default function FounderStory() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel border-y border-white/5 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — Story */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              30 Years of Real Business Experience
            </h2>
            <p className="text-silver/75 text-sm leading-relaxed mb-10">
              ORTHONOBA was not built by engineers who read about business in
              textbooks. It was built by someone who{" "}
              <span className="text-white font-medium">
                ran real businesses for three decades
              </span>
              , experienced the problems first-hand, and then discovered that
              technology could solve them systematically.
            </p>

            {/* Timeline */}
            <div className="space-y-7">
              {TIMELINE.map(({ year, label, desc }, i) => (
                <div key={year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-gold/10 mt-2" />
                    )}
                  </div>
                  <div className="pb-7">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-bold text-gold">{year}</span>
                      <span className="text-sm font-semibold text-white">{label}</span>
                    </div>
                    <p className="text-xs text-silver/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/company/founder`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold/70 hover:text-gold transition-colors mt-4"
            >
              Full story <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-panel-2 border border-white/7 rounded-2xl p-10">
              {/* Monogram */}
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-black text-xl mb-7 mx-auto">
                JG
              </div>

              <div className="text-center mb-8">
                <p className="text-base font-bold text-white">
                  José Gregorio Rodríguez
                </p>
                <p className="text-sm text-gold mt-1.5">Founder & CEO</p>
                <p className="text-xs text-silver/50 mt-1">ORTHONOBA.APP</p>
              </div>

              {/* Role chips */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {ROLES.map((role) => (
                  <span
                    key={role}
                    className="text-[11px] px-3 py-1 rounded-full bg-gold/8 border border-gold/15 text-gold/80 font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/6 pt-6">
                <p className="text-xs text-silver/45 italic leading-relaxed text-center">
                  &ldquo;Real business problems deserve real technology
                  solutions — not theory.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
