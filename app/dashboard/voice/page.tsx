import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Mic,
  Clock,
  TrendingUp,
  Plus,
  Settings,
} from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const agentTypes = [
  {
    type: "Voice Receptionist",
    description: "Answers inbound calls, qualifies callers and books appointments automatically.",
    status: "Configure",
    icon: PhoneIncoming,
  },
  {
    type: "Outbound Campaign Agent",
    description: "Makes outbound calls for follow-ups, reminders and lead recovery at scale.",
    status: "Configure",
    icon: PhoneOutgoing,
  },
  {
    type: "Appointment Confirmation",
    description: "Calls and confirms upcoming appointments — reduces no-shows by up to 60%.",
    status: "Configure",
    icon: Clock,
  },
];

const stats = [
  { label: "Calls Handled", value: "—", icon: Phone },
  { label: "Avg Handle Time", value: "—", icon: Clock },
  { label: "No-Show Reduction", value: "—", icon: TrendingUp },
  { label: "Voice Agents", value: "0", icon: Mic },
];

export default function VoiceCenterPage() {
  return (
    <>
      <DashboardTopbar title="Voice Center" />
      <div className="p-6 space-y-5 max-w-6xl">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                <Icon size={15} className="text-purple-400" />
              </div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#71717A] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Voice agents */}
        <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Mic size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-white">Voice Agents</span>
            </div>
            <button className="flex items-center gap-1.5 bg-[#D4AF37] text-black text-xs font-bold tracking-wider uppercase px-3 py-2 hover:bg-[#F5C542] transition-colors">
              <Plus size={12} />
              Deploy Agent
            </button>
          </div>

          {/* Empty state */}
          <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Phone size={22} className="text-purple-400" />
            </div>
            <p className="text-sm text-white font-medium mb-1">No voice agents deployed</p>
            <p className="text-xs text-[#71717A] max-w-[280px] leading-relaxed mb-5">
              Deploy an AI voice agent to handle inbound calls, reduce no-shows and run automated outbound campaigns — 24/7.
            </p>

            {/* Agent type cards */}
            <div className="w-full max-w-2xl space-y-2 mt-2 text-left">
              {agentTypes.map(({ type, description, icon: Icon }) => (
                <div
                  key={type}
                  className="flex items-start gap-4 bg-[#161616] border border-white/[0.06] rounded-lg p-4 hover:border-purple-400/20 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium group-hover:text-purple-300 transition-colors">{type}</p>
                    <p className="text-xs text-[#71717A] mt-0.5 leading-relaxed">{description}</p>
                  </div>
                  <Settings size={13} className="text-[#555] group-hover:text-purple-400 transition-colors mt-0.5 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#0E0E0E] border border-purple-500/10 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            Voice Intelligence
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
            Voice agents speak naturally in 40+ languages, respond in under 500ms and handle unlimited concurrent calls. Fully integrated with your CRM and calendar.
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            {["40+ Languages", "<500ms Latency", "∞ Concurrent Calls", "CRM Integration", "Calendar Sync", "GDPR Compliant"].map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-[#888]">
                <div className="w-1 h-1 rounded-full bg-purple-400" />
                {f}
              </div>
            ))}
          </div>
          <Link
            href="/consultation"
            className="inline-block mt-4 text-xs text-purple-400 font-semibold tracking-wider uppercase border-b border-purple-400/30 hover:border-purple-400 pb-0.5 transition-colors"
          >
            Talk to Voice Expert →
          </Link>
        </div>
      </div>
    </>
  );
}
