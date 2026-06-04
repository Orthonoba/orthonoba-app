import {
  Bot,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const stats = [
  {
    label: "Active Agents",
    value: "—",
    change: null,
    icon: Bot,
    href: "/dashboard/agents",
  },
  {
    label: "Conversations",
    value: "—",
    change: null,
    icon: MessageSquare,
    href: "/dashboard/conversations",
  },
  {
    label: "New Leads",
    value: "—",
    change: null,
    icon: TrendingUp,
    href: "/dashboard/leads",
  },
  {
    label: "Contacts",
    value: "—",
    change: null,
    icon: Users,
    href: "/dashboard/contacts",
  },
];

const quickActions = [
  { label: "Create AI Agent", href: "/dashboard/agents/new", icon: Bot },
  { label: "View Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { label: "Add Contact", href: "/dashboard/contacts/new", icon: Users },
  { label: "New Automation", href: "/dashboard/automations/new", icon: Zap },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardTopbar title="Overview" />
      <div className="p-6 space-y-6 max-w-7xl">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-[#0E0E0E] border border-white/5 rounded-xl p-5 hover:border-[#D4AF37]/20 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon size={16} className="text-[#A1A1AA]" />
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-[#71717A] group-hover:text-[#D4AF37] transition-colors"
                />
              </div>
              <p className="text-2xl font-semibold text-white mb-0.5">{value}</p>
              <p className="text-xs text-[#71717A]">{label}</p>
            </Link>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Activity feed */}
          <div className="lg:col-span-2 bg-[#0E0E0E] border border-white/5 rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-[#D4AF37]" />
                <span className="text-sm font-medium text-white">Recent Activity</span>
              </div>
            </div>
            <div className="px-5 py-8 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <Activity size={18} className="text-[#71717A]" />
              </div>
              <p className="text-sm text-[#71717A]">No activity yet</p>
              <p className="text-xs text-[#71717A]/60 mt-1">
                Events will appear here as your platform is used
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#0E0E0E] border border-white/5 rounded-xl">
            <div className="px-5 py-4 border-b border-white/5">
              <span className="text-sm font-medium text-white">Quick Actions</span>
            </div>
            <div className="p-3 space-y-1">
              {quickActions.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                    {label}
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="ml-auto text-[#71717A] group-hover:text-[#D4AF37] transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Platform status */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-[#A1A1AA]">Platform operational</span>
          </div>
          <Link
            href="/dashboard/billing"
            className="text-xs text-[#D4AF37] hover:underline"
          >
            Upgrade plan
          </Link>
        </div>
      </div>
    </>
  );
}
