import { Settings, Building2, Globe, Bell, Shield } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const sections = [
  {
    icon: Building2,
    title: "Organization",
    description: "Name, slug, logo, and billing email.",
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Language, timezone, and regional settings.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email alerts for leads, conversations, and billing.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "API keys, webhooks, and access control.",
  },
];

export default function SettingsPage() {
  return (
    <>
      <DashboardTopbar title="Settings" />
      <div className="p-6 space-y-5 max-w-3xl">

        <div className="space-y-2">
          {sections.map(({ icon: Icon, title, description }) => (
            <button
              key={title}
              className="w-full bg-[#0E0E0E] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#A1A1AA]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{description}</p>
              </div>
              <Settings
                size={14}
                className="text-[#71717A] group-hover:text-[#D4AF37] transition-colors"
              />
            </button>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-[#0E0E0E] border border-red-500/10 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
            Danger Zone
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Delete Organization</p>
              <p className="text-xs text-[#71717A] mt-0.5">
                Permanently delete all data. This cannot be undone.
              </p>
            </div>
            <button className="px-3 py-1.5 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/10 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
