"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
  CreditCard,
  Settings,
  MessageCircle,
  ChevronRight,
  Mic,
  BarChart3,
  Layers,
  Phone,
} from "lucide-react";

const navSections = [
  {
    label: "Operations",
    items: [
      { href: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/agents", label: "AI Operations", icon: Bot },
      { href: "/dashboard/conversations", label: "Messaging Center", icon: MessageSquare },
      { href: "/dashboard/voice", label: "Voice Center", icon: Phone },
      { href: "/dashboard/automations", label: "Automations", icon: Zap },
    ],
  },
  {
    label: "Customer Growth",
    items: [
      { href: "/dashboard/leads", label: "Lead Pipeline", icon: TrendingUp },
      { href: "/dashboard/contacts", label: "Contacts", icon: Users },
      { href: "/dashboard/whatsapp", label: "WhatsApp", icon: MessageCircle },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#0A0A0A] border-r border-white/[0.06] flex flex-col z-40">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
          <Layers size={15} className="text-black" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none tracking-wide">ORTHONOBA</p>
          <p className="text-[#71717A] text-[10px] mt-0.5 tracking-wider uppercase">Enterprise AI Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#555]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-all duration-150 group ${
                      active
                        ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/15"
                        : "text-[#888] hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={active ? "text-[#D4AF37]" : "text-[#555] group-hover:text-[#A1A1AA] transition-colors"}
                    />
                    <span className="flex-1 tracking-wide">{label}</span>
                    {active && <ChevronRight size={10} className="text-[#D4AF37]/60" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI Status indicator */}
      <div className="px-3 pb-2">
        <div className="bg-[#0E0E0E] border border-[#D4AF37]/10 rounded-md px-3 py-2.5 flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#888] tracking-wider uppercase">AI Status</p>
            <p className="text-xs text-white font-medium truncate">All Systems Operational</p>
          </div>
          <Mic size={11} className="text-[#D4AF37]/50 flex-shrink-0" />
        </div>
      </div>

      {/* Footer — org info */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer">
          <div className="w-6 h-6 rounded bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#D4AF37] text-[10px] font-bold">O</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-medium truncate">Organization</p>
            <p className="text-[#555] text-[9px] tracking-wider uppercase">Starter Plan</p>
          </div>
          <Settings size={11} className="text-[#555] flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
