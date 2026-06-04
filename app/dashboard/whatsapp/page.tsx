import { MessageCircle, Plus, CheckCircle2, Phone } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const setupSteps = [
  { label: "Connect WhatsApp Business Account", done: false },
  { label: "Configure webhook endpoint", done: false },
  { label: "Set verify token in Meta Dashboard", done: false },
  { label: "Assign AI Agent to handle messages", done: false },
];

export default function WhatsAppPage() {
  return (
    <>
      <DashboardTopbar title="WhatsApp Platform" />
      <div className="p-6 space-y-6 max-w-7xl">

        <div className="flex items-center justify-between">
          <p className="text-[#A1A1AA] text-sm">
            Connect WhatsApp Business to capture leads and automate conversations.
          </p>
          <Link
            href="/dashboard/whatsapp/connect"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            Connect Account
          </Link>
        </div>

        {/* Setup guide */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl">
          <div className="px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <MessageCircle size={15} className="text-emerald-400" />
              <span className="text-sm font-medium text-white">Setup Guide</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {setupSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2
                  size={16}
                  className={step.done ? "text-emerald-400" : "text-[#71717A]"}
                />
                <span className={`text-sm ${step.done ? "text-white" : "text-[#71717A]"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook info */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5">
          <p className="text-xs text-[#71717A] uppercase tracking-widest mb-3">Webhook URL</p>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5">
            <Phone size={13} className="text-[#71717A] flex-shrink-0" />
            <code className="text-xs text-[#A1A1AA] flex-1 truncate">
              {process.env.NEXT_PUBLIC_APP_URL ?? "https://app.orthonoba.com"}/api/whatsapp/webhook
            </code>
          </div>
          <p className="text-xs text-[#71717A] mt-2">
            Register this URL in your Meta App Dashboard under WhatsApp → Configuration.
          </p>
        </div>

        {/* Empty conversations */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-12 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
            <MessageCircle size={24} className="text-emerald-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">No WhatsApp conversations yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm">
            Connect your WhatsApp Business account to start receiving and managing messages.
          </p>
        </div>
      </div>
    </>
  );
}
