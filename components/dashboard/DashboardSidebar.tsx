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
  Layers,
} from "lucide-react";

const navSections = [
  {
    label: "Platform",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/agents", label: "AI Agents", icon: Bot },
      { href: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
      { href: "/dashboard/automations", label: "Automations", icon: Zap },
    ],
  },
  {
    label: "CRM",
    items: [
      { href: "/dashboard/leads", label: "Leads", icon: TrendingUp },
      { href: "/dashboard/contacts", label: "Contacts", icon: Users },
      { href: "/dashboard/whatsapp", label: "WhatsApp", icon: MessageCircle },
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
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#0E0E0E] border-r border-white/5 flex flex-col z-40">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
          <Layers size={16} className="text-black" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">Orthonoba</p>
          <p className="text-[#71717A] text-xs mt-0.5">AI Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#71717A]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors group ${
                      active
                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-[#D4AF37]" : "text-[#71717A] group-hover:text-white"}
                    />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight size={12} className="text-[#D4AF37]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white/5">
          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#D4AF37] text-xs font-bold">O</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Organization</p>
            <p className="text-[#71717A] text-[10px]">Starter Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
