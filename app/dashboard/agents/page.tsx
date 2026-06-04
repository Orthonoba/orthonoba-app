import { Bot, Plus, Zap, MessageSquare, Phone } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const agentTypes = [
  { type: "CHAT", icon: MessageSquare, label: "Web Chat", color: "text-blue-400" },
  { type: "WHATSAPP", icon: MessageSquare, label: "WhatsApp", color: "text-emerald-400" },
  { type: "VOICE", icon: Phone, label: "Voice", color: "text-purple-400" },
  { type: "LEAD_QUALIFIER", icon: Zap, label: "Lead Qualifier", color: "text-[#D4AF37]" },
];

export default function AgentsPage() {
  return (
    <>
      <DashboardTopbar title="AI Agents" />
      <div className="p-6 space-y-6 max-w-7xl">

        {/* Header actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">
              Deploy AI agents across chat, WhatsApp, and voice channels.
            </p>
          </div>
          <Link
            href="/dashboard/agents/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            New Agent
          </Link>
        </div>

        {/* Empty state */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
            <Bot size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="text-white font-semibold mb-2">No agents yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm mb-6">
            Create your first AI agent to start automating conversations across any channel.
          </p>
          <Link
            href="/dashboard/agents/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            Create Agent
          </Link>
        </div>

        {/* Agent type cards */}
        <div>
          <p className="text-[#71717A] text-xs uppercase tracking-widest mb-3">Available Types</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {agentTypes.map(({ type, icon: Icon, label, color }) => (
              <div
                key={type}
                className="bg-[#0E0E0E] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
              >
                <Icon size={18} className={`${color} mb-3`} />
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
