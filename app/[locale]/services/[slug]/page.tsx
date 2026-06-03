import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SERVICE_META: Record<string, { title: string; desc: string; category: string }> = {
  "web-development":       { title: "Web Development",       desc: "High-performance websites and web applications built with Next.js and modern technology.", category: "Web & Digital" },
  "wordpress":             { title: "WordPress",             desc: "Scalable WordPress websites with Elementor Pro and premium themes, optimised for conversion.", category: "Web & Digital" },
  "ecommerce":             { title: "E-Commerce",            desc: "Online stores built for the Swiss and European market, optimised for conversion and sales.", category: "Web & Digital" },
  "landing-pages":         { title: "Landing Pages",         desc: "High-converting campaign and product landing pages designed to turn visitors into customers.", category: "Web & Digital" },
  "seo-local":             { title: "SEO Local",             desc: "Local search engine optimisation to capture customers in your geographic area.", category: "SEO & Advertising" },
  "seo-international":     { title: "SEO International",     desc: "Multilingual international SEO for Swiss and European market expansion.", category: "SEO & Advertising" },
  "google-ads":            { title: "Google Ads",            desc: "Performance advertising campaigns on Google Search and Display, focused on measurable ROI.", category: "SEO & Advertising" },
  "meta-ads":              { title: "Meta Ads",              desc: "Facebook and Instagram advertising campaigns that drive leads and sales.", category: "SEO & Advertising" },
  "linkedin-ads":          { title: "LinkedIn Ads",          desc: "B2B advertising on LinkedIn targeting decision-makers and professionals.", category: "SEO & Advertising" },
  "marketing-automation":  { title: "Marketing Automation",  desc: "AI-powered marketing automation that nurtures leads and converts customers at scale.", category: "AI & Growth" },
  "ai-consulting":         { title: "AI Consulting",         desc: "Strategic guidance on AI implementation, tool selection and change management.", category: "AI & Growth" },
  "digital-transformation":{ title: "Digital Transformation", desc: "End-to-end digital transformation strategy and execution for established businesses.", category: "AI & Growth" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = SERVICE_META[slug];
  if (!meta) return { title: "Service | ORTHONOBA" };
  return {
    title: `${meta.title} | ORTHONOBA Services`,
    description: meta.desc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = SERVICE_META[slug];

  if (!meta) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-silver mb-4">Service not found.</p>
          <Link href={`/${locale}/services`} className="text-gold hover:text-gold-light text-sm font-semibold">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="border-b border-white/6 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/services`} className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors">
            <ArrowLeft size={12} /> Services
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">{meta.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">{meta.title}</h1>
          <p className="text-silver text-lg max-w-2xl leading-relaxed mb-8">{meta.desc}</p>
          <Link
            href={`/${locale}/consultation`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
          >
            Request a Quote <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel border border-white/6 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/6 text-gold text-xs font-semibold mb-4">
              In Development
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Detailed Content Coming Soon</h2>
            <p className="text-sm text-silver/70 max-w-md mx-auto leading-relaxed mb-6">
              Full service documentation is being prepared. Contact us to discuss how we can deliver this for your business specifically.
            </p>
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors"
            >
              Book a Strategy Call <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
