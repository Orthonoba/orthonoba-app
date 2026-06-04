import {
  Settings,
  Building2,
  Globe,
  Bell,
  Shield,
  Palette,
  Upload,
  ChevronRight,
} from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const sections = [
  {
    icon: Building2,
    title: "Organization",
    description: "Name, slug, billing email and organization details.",
    tag: null,
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Custom logo, accent color and white-label settings for your organization.",
    tag: "Multi-Tenant",
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Language, timezone, regional format and locale preferences.",
    tag: null,
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email alerts for leads, conversations, billing and system events.",
    tag: null,
  },
  {
    icon: Shield,
    title: "Security",
    description: "API keys, webhooks, SSO configuration and access control.",
    tag: null,
  },
];

export default function SettingsPage() {
  return (
    <>
      <DashboardTopbar title="Settings" />
      <div className="p-6 space-y-5 max-w-3xl">

        {/* Settings sections */}
        <div className="space-y-1.5">
          {sections.map(({ icon: Icon, title, description, tag }) => (
            <button
              key={title}
              className="w-full bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4 hover:border-white/[0.12] transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                <Icon size={16} className="text-[#A1A1AA] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-white">{title}</p>
                  {tag && (
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#D4AF37]/70 uppercase border border-[#D4AF37]/20 px-1.5 py-0.5">
                      {tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#71717A]">{description}</p>
              </div>
              <ChevronRight
                size={14}
                className="text-[#555] group-hover:text-[#D4AF37] transition-colors flex-shrink-0"
              />
            </button>
          ))}
        </div>

        {/* Brand Identity preview card */}
        <div className="bg-[#0E0E0E] border border-[#D4AF37]/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={14} className="text-[#D4AF37]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              Brand Identity — Multi-Tenant
            </p>
          </div>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
            Make Orthonoba look like your own platform. Upload your logo, set your brand colors and configure white-label settings so every customer interaction reflects your business identity.
          </p>

          {/* Brand preview area */}
          <div className="bg-[#161616] border border-white/[0.06] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              {/* Logo placeholder */}
              <div className="w-12 h-12 rounded-lg border border-dashed border-white/[0.15] flex items-center justify-center hover:border-[#D4AF37]/40 transition-colors cursor-pointer group">
                <Upload size={16} className="text-[#555] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Organization Logo</p>
                <p className="text-[#555] text-xs">PNG, SVG — Recommended 128×128px</p>
              </div>
            </div>

            {/* Color picker placeholder */}
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-[#888] mb-1.5">Primary Accent Color</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#D4AF37] border border-white/10 cursor-pointer" />
                  <div className="w-7 h-7 rounded bg-[#3B82F6] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-colors" />
                  <div className="w-7 h-7 rounded bg-[#10B981] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-colors" />
                  <div className="w-7 h-7 rounded bg-[#8B5CF6] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-colors" />
                  <div className="w-7 h-7 rounded bg-[#EF4444] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-colors" />
                  <div className="w-7 h-7 rounded bg-white/[0.08] border border-dashed border-white/[0.15] flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
                    <Settings size={10} className="text-[#555]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] text-[#555]">
              <div className="w-1 h-1 rounded-full bg-[#555]" />
              White-label dashboard
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#555]">
              <div className="w-1 h-1 rounded-full bg-[#555]" />
              Custom email domain
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#555]">
              <div className="w-1 h-1 rounded-full bg-[#555]" />
              Custom subdomain
            </div>
          </div>
          <p className="text-[10px] text-[#555] mt-3">
            Full branding customization available on Professional plan and above.
          </p>
        </div>

        {/* Danger zone */}
        <div className="bg-[#0E0E0E] border border-red-500/10 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
            Danger Zone
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Delete Organization</p>
              <p className="text-xs text-[#71717A] mt-0.5">
                Permanently delete all data, agents and automations. This cannot be undone.
              </p>
            </div>
            <button className="px-3 py-1.5 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
