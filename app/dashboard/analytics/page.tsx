import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  ArrowUpRight,
  Calendar,
  Target,
} from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const metricCards = [
  {
    label: "Total Revenue Impact",
    value: "—",
    change: "Track with plan upgrade",
    icon: TrendingUp,
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
  },
  {
    label: "Leads Generated",
    value: "—",
    change: "This month",
    icon: Target,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Conversations",
    value: "—",
    change: "All channels",
    icon: MessageSquare,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Automations Run",
    value: "—",
    change: "Workflows executed",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
];

const reportTypes = [
  {
    title: "AI Performance Report",
    description: "Response rates, resolution rates and CSAT across all AI agents.",
    period: "Weekly",
  },
  {
    title: "Lead Pipeline Report",
    description: "Lead volume, qualification rate, conversion and revenue attribution.",
    period: "Monthly",
  },
  {
    title: "Automation Impact Report",
    description: "Hours saved, errors prevented and cost reduction from automation.",
    period: "Monthly",
  },
  {
    title: "Voice Intelligence Report",
    description: "Call volume, outcomes, no-show reduction and customer satisfaction.",
    period: "Weekly",
  },
  {
    title: "Revenue Growth Report",
    description: "Total revenue tracked, growth trends and forecast.",
    period: "Monthly",
  },
  {
    title: "Customer Retention Report",
    description: "Churn indicators, satisfaction scores and lifecycle stage distribution.",
    period: "Monthly",
  },
];

export default function AnalyticsPage() {
  return (
    <>
      <DashboardTopbar title="Analytics" />
      <div className="p-6 space-y-5 max-w-6xl">

        {/* Date range selector */}
        <div className="flex items-center justify-between">
          <p className="text-[#71717A] text-sm">Business intelligence for your AI platform</p>
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-[#555]" />
            <span className="text-xs text-[#888] border border-white/[0.06] px-3 py-1.5 rounded">
              Last 30 days
            </span>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCards.map(({ label, value, change, icon: Icon, color, bg }) => (
            <div key={label} className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5">
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon size={15} className={color} />
              </div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-white font-medium mt-1">{label}</p>
              <p className="text-[10px] text-[#555] mt-0.5">{change}</p>
            </div>
          ))}
        </div>

        {/* Main chart area — empty state */}
        <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <BarChart3 size={14} className="text-[#D4AF37]" />
              <span className="text-sm font-medium text-white">Growth Overview</span>
            </div>
            <div className="flex items-center gap-2">
              {["7d", "30d", "90d", "1y"].map((p) => (
                <button
                  key={p}
                  className={`text-[10px] tracking-wider uppercase px-2.5 py-1 transition-colors ${
                    p === "30d"
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#555] hover:text-[#888]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="px-5 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
              <BarChart3 size={22} className="text-[#555]" />
            </div>
            <p className="text-sm text-white font-medium mb-1">Analytics activate with usage</p>
            <p className="text-xs text-[#71717A] max-w-[260px] leading-relaxed mb-5">
              Deploy AI agents and automations to start generating business intelligence data.
            </p>
            <Link
              href="/dashboard/agents"
              className="inline-block text-xs text-[#D4AF37] font-semibold tracking-widest uppercase border-b border-[#D4AF37]/30 hover:border-[#D4AF37] pb-0.5 transition-colors"
            >
              Deploy First Agent →
            </Link>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <span className="text-sm font-medium text-white">Available Reports</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {reportTypes.map(({ title, description, period }) => (
              <div
                key={title}
                className="bg-[#0E0E0E] p-5 hover:bg-[#161616] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-white font-medium group-hover:text-[#D4AF37] transition-colors flex-1 pr-2">
                    {title}
                  </p>
                  <ArrowUpRight size={12} className="text-[#555] group-hover:text-[#D4AF37] transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-[#71717A] leading-relaxed mb-3">{description}</p>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#D4AF37]/60 uppercase border border-[#D4AF37]/15 px-2 py-0.5">
                  {period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade prompt */}
        <div className="bg-[#0E0E0E] border border-[#D4AF37]/10 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">
              Advanced Analytics — Professional Plan
            </p>
            <p className="text-[#71717A] text-xs">
              Real-time dashboards, revenue attribution, predictive forecasting and custom report builder.
            </p>
          </div>
          <Link
            href="/dashboard/billing"
            className="flex-shrink-0 flex items-center gap-1.5 bg-[#D4AF37] text-black text-xs font-bold tracking-wider uppercase px-4 py-2.5 hover:bg-[#F5C542] transition-colors"
          >
            Upgrade
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </>
  );
}
