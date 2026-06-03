import {
  BrainCircuit,
  Zap,
  Users,
  Code2,
  Globe,
  BarChart2,
  Link2,
  TrendingUp,
  Settings2,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    label: "AI Agents",
    desc: "Custom intelligent agents for every business process",
  },
  {
    icon: Zap,
    label: "Automation",
    desc: "Intelligent flows that eliminate manual repetitive work",
  },
  {
    icon: Users,
    label: "CRM & Sales",
    desc: "Pipeline management and automated customer nurturing",
  },
  {
    icon: Code2,
    label: "Custom Software",
    desc: "Web apps and platforms built exactly to specification",
  },
  {
    icon: Globe,
    label: "SaaS Development",
    desc: "Scalable software products ready for the digital market",
  },
  {
    icon: TrendingUp,
    label: "Digital Marketing",
    desc: "SEO, paid advertising and marketing automation",
  },
  {
    icon: BarChart2,
    label: "Data & Analytics",
    desc: "Dashboards and BI for real-time business insight",
  },
  {
    icon: Link2,
    label: "Integrations",
    desc: "Connect all your existing tools and data sources",
  },
  {
    icon: Settings2,
    label: "Enterprise Management",
    desc: "End-to-end digital operations for growing companies",
  },
];

export default function Platform() {
  return (
    <section className="bg-obsidian py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header — left aligned */}
        <div className="max-w-3xl mb-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
            The Platform
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
            ORTHONOBA is not just an agency.
          </h2>
          <p className="text-silver/75 text-lg leading-relaxed">
            It is a technology platform that integrates everything your business
            needs to operate, grow and scale in the digital era.
          </p>
        </div>

        {/* Capabilities grid — border grid effect */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.05] bg-white/[0.04]">
          {CAPABILITIES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-obsidian p-8 hover:bg-panel transition-colors duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold mb-5">
                <Icon size={16} />
              </div>
              <p className="text-sm font-bold text-white mb-2 group-hover:text-gold transition-colors duration-200">
                {label}
              </p>
              <p className="text-xs text-silver/55 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
