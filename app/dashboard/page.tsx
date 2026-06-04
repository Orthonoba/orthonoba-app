import {
  Bot,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  Activity,
  Phone,
  BarChart3,
  Target,
  Clock,
} from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const kpis = [
  {
    label: "AI Operations",
    value: "—",
    sub: "Active agents",
    icon: Bot,
    href: "/dashboard/agents",
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
  },
  {
    label: "Conversations",
    value: "—",
    sub: "This month",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Lead Pipeline",
    value: "—",
    sub: "Active leads",
    icon: TrendingUp,
    href: "/dashboard/leads",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Voice Center",
    value: "—",
    sub: "Calls handled",
    icon: Phone,
    href: "/dashboard/voice",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    label: "Automations",
    value: "—",
    sub: "Workflows active",
    icon: Zap,
    href: "/dashboard/automations",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    label: "Contacts",
    value: "—",
    sub: "Total managed",
    icon: Users,
    href: "/dashboard/contacts",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

const quickActions = [
  { label: "Create AI Agent", href: "/dashboard/agents", icon: Bot, description: "Deploy a new AI workforce member" },
  { label: "View Conversations", href: "/dashboard/conversations", icon: MessageSquare, description: "Messaging center & inbox" },
  { label: "Lead Pipeline", href: "/dashboard/leads", icon: Target, description: "Manage and qualify leads" },
  { label: "New Automation", href: "/dashboard/automations", icon: Zap, description: "Build a workflow" },
  { label: "Voice Center", href: "/dashboard/voice", icon: Phone, description: "Call management & AI voice" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Business intelligence" },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardTopbar title="Executive Dashboard" />
      <div className="p-6 space-y-6 max-w-7xl">

        {/* Welcome banner */}
        <div className="bg-[#0E0E0E] border border-[#D4AF37]/15 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Platform Operational</p>
              <p className="text-[#71717A] text-xs mt-0.5">All AI systems running · Ready to scale your business</p>
            </div>
          </div>
          <Link
            href="/dashboard/agents"
            className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase border-b border-[#D4AF37]/30 hover:border-[#D4AF37] pb-0.5 transition-colors"
          >
            Deploy Agent →
          </Link>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {kpis.map(({ label, value, sub, icon: Icon, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon size={16} className={color} />
                </div>
                <ArrowUpRight
                  size={13}
                  className="text-[#555] group-hover:text-[#D4AF37] transition-colors"
                />
              </div>
              <p className="text-2xl font-bold text-white mb-0.5">{value}</p>
              <p className="text-[10px] text-[#71717A] tracking-wider uppercase">{sub}</p>
              <p className="text-xs text-[#A1A1AA] mt-2 font-medium">{label}</p>
            </Link>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Activity feed */}
          <div className="lg:col-span-2 bg-[#0E0E0E] border border-white/[0.06] rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#D4AF37]" />
                <span className="text-sm font-medium text-white tracking-wide">Recent Activity</span>
              </div>
              <span className="text-[10px] text-[#555] tracking-widest uppercase">Live</span>
            </div>
            <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
                <Activity size={20} className="text-[#555]" />
              </div>
              <p className="text-sm text-[#A1A1AA] font-medium mb-1">No activity yet</p>
              <p className="text-xs text-[#555] max-w-[240px] leading-relaxed">
                Events will appear here as your AI platform handles conversations, leads and automations
              </p>
              <Link
                href="/dashboard/agents"
                className="mt-5 inline-block text-xs text-[#D4AF37] font-semibold tracking-widest uppercase border-b border-[#D4AF37]/30 hover:border-[#D4AF37] pb-0.5 transition-colors"
              >
                Create Your First Agent →
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <span className="text-sm font-medium text-white tracking-wide">Quick Actions</span>
            </div>
            <div className="p-3 space-y-1">
              {quickActions.map(({ label, href, icon: Icon, description }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                      {label}
                    </p>
                    <p className="text-[10px] text-[#555] mt-0.5 truncate">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Growth indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Response Time</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">—</p>
            <p className="text-xs text-[#71717A]">Average AI response time</p>
            <p className="text-[10px] text-[#555] mt-2">Target: &lt;500ms</p>
          </div>
          <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Conversion Rate</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">—</p>
            <p className="text-xs text-[#71717A]">Lead to customer</p>
            <p className="text-[10px] text-[#555] mt-2">Industry avg: 3.2%</p>
          </div>
          <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Automation ROI</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">—</p>
            <p className="text-xs text-[#71717A]">Revenue impact</p>
            <p className="text-[10px] text-[#555] mt-2">Tracked monthly</p>
          </div>
        </div>

      </div>
    </>
  );
}
