import { CreditCard, CheckCircle2, ArrowUpRight, Zap } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const plans = [
  {
    id: "STARTER",
    name: "Starter",
    price: "€97",
    interval: "/ month",
    description: "Perfect for small teams getting started with AI automation.",
    features: ["1 AI Agent", "500 conversations / mo", "1,000 contacts", "5 automations", "Web chat", "Email support"],
    highlight: false,
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: "€297",
    interval: "/ month",
    description: "For growing businesses that need multi-channel automation.",
    features: ["5 AI Agents", "5,000 conversations / mo", "10,000 contacts", "25 automations", "WhatsApp + Voice", "Priority support"],
    highlight: true,
  },
  {
    id: "BUSINESS",
    name: "Business",
    price: "€697",
    interval: "/ month",
    description: "Full platform power for scaling operations.",
    features: ["20 AI Agents", "25,000 conversations / mo", "Unlimited contacts", "Unlimited automations", "Full WhatsApp platform", "Dedicated support"],
    highlight: false,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "Custom",
    interval: "",
    description: "Custom SLAs, on-premise option, and dedicated CSM.",
    features: ["Unlimited agents", "Unlimited everything", "Custom integrations", "SLA guarantee", "Dedicated CSM", "On-premise option"],
    highlight: false,
  },
];

export default function BillingPage() {
  return (
    <>
      <DashboardTopbar title="Billing" />
      <div className="p-6 space-y-6 max-w-5xl">

        {/* Current plan */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <Zap size={18} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Starter Plan</p>
              <p className="text-[#71717A] text-xs mt-0.5">14-day free trial active</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
            Trial
          </span>
        </div>

        {/* Plans grid */}
        <div>
          <p className="text-[#71717A] text-xs uppercase tracking-widest mb-4">Choose a Plan</p>
          <div className="grid lg:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#0E0E0E] rounded-xl p-5 border transition-colors ${
                  plan.highlight
                    ? "border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/20"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wide mb-3">
                    Most Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-1">
                  <p className="text-white font-semibold">{plan.name}</p>
                  <div className="text-right">
                    <span className="text-white font-bold text-lg">{plan.price}</span>
                    {plan.interval && (
                      <span className="text-[#71717A] text-xs ml-1">{plan.interval}</span>
                    )}
                  </div>
                </div>
                <p className="text-[#71717A] text-xs mb-4">{plan.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#D4AF37] flex-shrink-0" />
                      <span className="text-xs text-[#A1A1AA]">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                    plan.id === "ENTERPRISE"
                      ? "border border-white/10 text-[#A1A1AA] hover:text-white hover:border-white/20"
                      : plan.highlight
                      ? "bg-[#D4AF37] text-black hover:bg-[#F5C542]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.id === "ENTERPRISE" ? "Contact Sales" : "Upgrade"}
                  <ArrowUpRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
            <CreditCard size={15} className="text-[#71717A]" />
            <span className="text-sm font-medium text-white">Invoices</span>
          </div>
          <div className="px-5 py-8 text-center">
            <p className="text-[#71717A] text-sm">No invoices yet</p>
          </div>
        </div>
      </div>
    </>
  );
}
