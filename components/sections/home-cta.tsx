"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";

export default function HomeCTA() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel-2 border-t border-white/5 py-28 px-6 relative overflow-hidden">
      {/* Bottom gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 50% 130%, rgba(212,175,55,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-5">
          Get Started
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Ready to Transform Your Business?
        </h2>
        <p className="text-silver/70 text-base leading-relaxed mb-12 max-w-xl mx-auto">
          Book a free 30-minute strategy session. We analyse your situation
          and deliver a concrete action plan — no commitment required.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-obsidian rounded-xl font-bold text-sm hover:bg-gold-light transition-colors shadow-2xl shadow-gold/25"
          >
            <Calendar size={16} />
            Book a Free Strategy Session
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/10 text-white rounded-xl font-semibold text-sm hover:border-white/22 hover:bg-white/4 transition-all"
          >
            Send a Message
            <ArrowRight size={15} className="text-silver/60" />
          </Link>
        </div>
      </div>
    </section>
  );
}
