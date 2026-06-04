import { Zap, Plus, Play, Pause } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const integrations = [
  { name: "n8n", desc: "Self-hosted automation" },
  { name: "Make", desc: "Visual workflow builder" },
  { name: "Zapier", desc: "App integrations" },
  { name: "Webhooks", desc: "Custom endpoints" },
];

export default function AutomationsPage() {
  return (
    <>
      <DashboardTopbar title="Automations" />
      <div className="p-6 space-y-6 max-w-7xl">

        <div className="flex items-center justify-between">
          <p className="text-[#A1A1AA] text-sm">
            Automate lead capture, follow-ups, and CRM sync.
          </p>
          <Link
            href="/dashboard/automations/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            New Automation
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active Workflows", value: "0", icon: Play },
            { label: "Paused", value: "0", icon: Pause },
            { label: "Total Runs", value: "0", icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5">
              <Icon size={16} className="text-[#71717A] mb-3" />
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-xs text-[#71717A] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-14 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
            <Zap size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="text-white font-semibold mb-2">No automations yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm mb-6">
            Build workflows that trigger on new leads, messages, or custom webhooks.
          </p>
          <Link
            href="/dashboard/automations/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            Create Automation
          </Link>
        </div>

        {/* Integrations */}
        <div>
          <p className="text-[#71717A] text-xs uppercase tracking-widest mb-3">Supported Integrations</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {integrations.map(({ name, desc }) => (
              <div
                key={name}
                className="bg-[#0E0E0E] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
              >
                <p className="text-sm font-semibold text-white mb-0.5">{name}</p>
                <p className="text-xs text-[#71717A]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
