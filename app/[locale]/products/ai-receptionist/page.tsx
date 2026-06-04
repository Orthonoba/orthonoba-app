import {
  Bot,
  MessageCircle,
  Phone,
  Users,
  Calendar,
  Database,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    icon: MessageCircle,
    title: "Web Chat",
    description: "Embed an AI receptionist on your website. Available 24/7 to answer questions and capture leads.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Your AI receptionist responds instantly on WhatsApp Business. No missed messages.",
  },
  {
    icon: Phone,
    title: "Voice Agent",
    description: "Natural voice conversations in multiple languages. Handles calls when you can't.",
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Every conversation automatically captures contact details and creates a lead in your CRM.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Connects to your calendar and books appointments without human intervention.",
  },
  {
    icon: Database,
    title: "Knowledge Base",
    description: "Train on your content — FAQs, pricing, services — so it always knows the right answer.",
  },
];

const useCases = [
  "Answer FAQs 24/7",
  "Qualify inbound leads automatically",
  "Book demos and appointments",
  "Route conversations to the right team",
  "Follow up with leads via WhatsApp",
  "Sync contacts to your CRM instantly",
];

const industries = [
  "Medical Clinics",
  "Dental Practices",
  "Legal Firms",
  "Real Estate",
  "Financial Services",
  "SMB Retail",
];

export default function AIReceptionistPage() {
  return (
    <main className="bg-obsidian min-h-screen">

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-6">
          <Bot size={13} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-medium">Product — AI Receptionist</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Your business,<br />
          <span className="text-[#D4AF37]">always available.</span>
        </h1>

        <p className="text-[#A1A1AA] text-lg max-w-2xl mb-8 leading-relaxed">
          AI Receptionist handles every inbound interaction — web chat, WhatsApp, and voice —
          capturing leads, booking appointments, and syncing to your CRM. Automatically.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/agents/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            Deploy Now
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/consultation"
            className="flex items-center gap-2 px-5 py-3 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Request Demo
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-8">
          {["14-day free trial", "No credit card required", "GDPR compliant"].map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#D4AF37]" />
              <span className="text-[#A1A1AA] text-sm">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">Capabilities</p>
          <h2 className="text-2xl font-bold text-white mb-10">One agent. Every channel.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5 hover:border-[#D4AF37]/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{title}</h3>
                <p className="text-[#71717A] text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + Industries */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">What it does</p>
            <h2 className="text-xl font-bold text-white mb-6">Built for real workflows</h2>
            <ul className="space-y-3">
              {useCases.map((uc) => (
                <li key={uc} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="text-[#A1A1AA] text-sm">{uc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">Industries</p>
            <h2 className="text-xl font-bold text-white mb-6">Works across verticals</h2>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-[#A1A1AA] text-xs border border-white/5"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">Setup</p>
          <h2 className="text-2xl font-bold text-white mb-10">Live in 15 minutes</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", icon: Database, label: "Upload your knowledge base" },
              { step: "02", icon: Globe, label: "Connect your channels" },
              { step: "03", icon: Zap, label: "Configure automations" },
              { step: "04", icon: Bot, label: "Go live" },
            ].map(({ step, icon: Icon, label }) => (
              <div key={step} className="relative">
                <div className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest">{step}</span>
                  <Icon size={20} className="text-white mt-3 mb-2" />
                  <p className="text-sm text-[#A1A1AA]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to deploy your AI Receptionist?
          </h2>
          <p className="text-[#A1A1AA] mb-8">
            Start your 14-day trial. No credit card required.
          </p>
          <Link
            href="/dashboard/agents/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#F5C542] transition-colors text-sm"
          >
            Start Free Trial
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
