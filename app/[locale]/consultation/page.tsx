"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const COUNTRIES = [
  "Switzerland", "Germany", "Italy", "France", "Spain",
  "United Kingdom", "Austria", "United States", "Latin America", "Other",
];

const CHALLENGES = [
  "Lead generation & sales",
  "Customer service automation",
  "Internal process automation",
  "Website & web application",
  "SEO & digital marketing",
  "AI agent implementation",
  "SaaS development",
  "Digital transformation strategy",
  "Other",
];

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", country: "", email: "", phone: "", challenge: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6 border-b border-white/6">
        <div
          className="absolute inset-x-0 top-0 h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(212,175,55,0.10) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Free Consultation</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Book a Strategy Call
          </h1>
          <p className="text-silver leading-relaxed">
            A free 30-minute session with our team. We analyse your situation and propose a concrete action plan — no commitment, no pressure.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-panel border border-white/6 rounded-2xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mx-auto mb-5">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Request Received</h2>
              <p className="text-silver/70 text-sm leading-relaxed max-w-sm mx-auto">
                Thank you. We will review your request and contact you within 24 hours to schedule your strategy call.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-panel border border-white/6 rounded-2xl p-8 space-y-5"
            >
              {/* Name + Company */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-silver/80 mb-2">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-silver/80 mb-2">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-silver/80 mb-2">
                  Country <span className="text-gold">*</span>
                </label>
                <select
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors appearance-none"
                >
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-silver/80 mb-2">
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-silver/80 mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+41 79 000 0000"
                    className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              {/* Challenge */}
              <div>
                <label className="block text-xs font-semibold text-silver/80 mb-2">
                  Main Business Challenge <span className="text-gold">*</span>
                </label>
                <select
                  name="challenge"
                  required
                  value={form.challenge}
                  onChange={handleChange}
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors appearance-none"
                >
                  <option value="" disabled>Select your main challenge</option>
                  {CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-silver/80 mb-2">Additional Context</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your situation, goals or timeline..."
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-obsidian rounded-lg font-bold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
              >
                {loading ? "Sending..." : "Request Strategy Call"}
                {!loading && <ArrowRight size={15} />}
              </button>

              <p className="text-center text-xs text-muted">
                No spam. No commitment. We will contact you within 24 hours.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
