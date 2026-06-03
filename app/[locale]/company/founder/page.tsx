import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Founder | ORTHONOBA",
  description: "José Gregorio Rodríguez — 30+ years in business and healthcare, now building AI and digital transformation solutions.",
};

const TIMELINE = [
  {
    year: "1995",
    label: "Dental Industry",
    detail:
      "Started managing and operating dental clinics across Europe and Latin America. Built deep expertise in healthcare operations, patient management and clinical workflows.",
  },
  {
    year: "2010",
    label: "Multi-Clinic Operations",
    detail:
      "Scaled to managing multiple dental practices simultaneously. Experienced first-hand the operational complexity that comes with growth — and the lack of adequate digital tools.",
  },
  {
    year: "2020",
    label: "Digital Transformation",
    detail:
      "Began exploring software and digital systems to solve operational problems in dental clinics. Discovered the gap between what technology could do and what businesses actually had access to.",
  },
  {
    year: "2023",
    label: "AI & Automation",
    detail:
      "Deep immersion into artificial intelligence — studying LLMs, building AI agents and testing automation workflows. Built the first AI-powered systems for healthcare use cases.",
  },
  {
    year: "2024",
    label: "ORTHONOBA Product",
    detail:
      "Launched Orthonoba.app — a specialised SaaS platform for dental clinics, combining patient management, CAD/CAM workflows and clinical data management.",
  },
  {
    year: "2026",
    label: "ORTHONOBA.APP",
    detail:
      "Pivoted to a full digital transformation company. Combining 30 years of real business experience with AI, automation and software development to serve businesses in Switzerland, Europe and Latin America.",
  },
];

const PRINCIPLES = [
  { title: "Technology Must Solve Real Problems", desc: "Every solution we build starts with a real business problem, not a technology looking for a use case." },
  { title: "Measure What Matters", desc: "Success is defined by your KPIs — revenue, time saved, customers acquired — not vanity metrics." },
  { title: "No Fake Results", desc: "We will never show you inflated case studies, fake testimonials or invented statistics. Trust is everything." },
  { title: "Long-Term Partnership", desc: "We are not vendors. We are partners who grow as your business grows." },
];

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Back */}
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href={`/${locale}/company`} className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors">
            <ArrowLeft size={12} /> Company
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6 border-b border-white/6">
        <div
          className="absolute inset-x-0 top-0 h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Founder card */}
            <div className="lg:col-span-1">
              <div className="bg-panel border border-white/8 rounded-2xl p-8 text-center sticky top-24">
                <div className="w-24 h-24 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-black text-3xl mx-auto mb-5">
                  JG
                </div>
                <p className="text-lg font-bold text-white mb-1">José Gregorio Rodríguez</p>
                <p className="text-sm text-gold mb-1">Founder & CEO</p>
                <p className="text-xs text-silver/50 mb-6">ORTHONOBA.APP</p>
                <div className="space-y-2.5 text-left">
                  {["30+ years dental & healthcare", "Digital transformation specialist", "AI & automation practitioner", "Switzerland · Europe · LatAm"].map((pt) => (
                    <div key={pt} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                      <span className="text-xs text-silver/70">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/6">
                  <p className="text-xs text-silver/40 italic leading-relaxed">
                    &ldquo;Real problems deserve real solutions — not theory.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Our Founder</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                30 Years of Building Real Businesses Before Building Technology
              </h1>
              <div className="space-y-4 text-sm text-silver/80 leading-relaxed">
                <p>
                  ORTHONOBA was not founded by an engineer who read about business problems in a textbook.
                  It was founded by someone who spent three decades operating real businesses, managing teams,
                  serving patients and clients, and experiencing operational complexity from the inside.
                </p>
                <p>
                  José Gregorio Rodríguez spent over 30 years in the dental and healthcare industry — building,
                  managing and scaling clinics across Europe and Latin America. He understands what it means
                  to run a business with tight margins, demanding clients, regulatory requirements and a team
                  that needs reliable systems to function.
                </p>
                <p>
                  The pivot to technology was not a career change — it was a recognition that the problems
                  he spent decades trying to solve <span className="text-white font-medium">could now actually be solved</span> with AI and automation.
                  That insight became ORTHONOBA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-8">Journey</p>
          <div className="space-y-0">
            {TIMELINE.map(({ year, label, detail }, i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-gold/10 my-1" style={{ minHeight: "2rem" }} />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gold">{year}</span>
                    <span className="text-sm font-bold text-white">{label}</span>
                  </div>
                  <p className="text-sm text-silver/70 leading-relaxed max-w-xl">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 px-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">Principles</p>
          <h2 className="text-2xl font-bold text-white mb-8">What ORTHONOBA Stands For</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRINCIPLES.map(({ title, desc }) => (
              <div key={title} className="bg-panel border border-white/6 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-silver/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <p className="text-silver text-sm mb-4">Ready to work with someone who understands your business?</p>
        <Link
          href={`/${locale}/consultation`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
        >
          Book a Strategy Call <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
