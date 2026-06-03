"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function HomeCTA() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <section className="bg-panel-2 border-t border-white/6 py-24 px-6 relative overflow-hidden">
      {/* Gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 120%, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
          Get Started
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="text-silver text-sm leading-relaxed mb-10 max-w-xl mx-auto">
          Book a free 30-minute strategy call with our team. We will analyse your situation
          and propose a concrete action plan — no commitment required.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            Book a Free Strategy Call
            <ArrowRight size={15} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white rounded-lg font-medium text-sm hover:border-white/30 hover:bg-white/[0.04] transition-all"
          >
            Send us a message
          </Link>
        </div>
      </div>
    </section>
  );
}
