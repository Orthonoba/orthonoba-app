import { Shield, Languages, BrainCircuit, BarChart2, Clock, Globe2 } from "lucide-react";

const FEATURES = [
  {
    icon: Globe2,
    title: "Swiss Precision",
    desc: "Headquartered in Switzerland with European quality standards. Reliable, structured, compliant.",
  },
  {
    icon: Languages,
    title: "Truly Multilingual",
    desc: "We operate natively in Italian, German, French, English and Spanish — no translation layers.",
  },
  {
    icon: BrainCircuit,
    title: "AI-First Approach",
    desc: "We use OpenAI, Anthropic, and custom models. AI is not a feature here — it is the core of everything.",
  },
  {
    icon: Shield,
    title: "Privacy & Compliance",
    desc: "Swiss and European GDPR standards by default. Your data and your clients' data are always protected.",
  },
  {
    icon: Clock,
    title: "Real Business Experience",
    desc: "30+ years operating real businesses before building technology. We understand problems before code.",
  },
  {
    icon: BarChart2,
    title: "Results-Driven",
    desc: "We measure success through your KPIs — not vanity metrics, traffic reports or slide decks.",
  },
];

export default function WhyOrthonoba() {
  return (
    <section className="bg-obsidian py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-3">
            Why ORTHONOBA
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            What Sets Us Apart
          </h2>
          <p className="text-silver max-w-lg mx-auto text-sm leading-relaxed">
            We combine real industry experience with cutting-edge AI to deliver outcomes that matter.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-panel border border-white/6 rounded-2xl p-6 hover:border-gold/15 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                <Icon size={16} />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
              <p className="text-xs text-silver/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
