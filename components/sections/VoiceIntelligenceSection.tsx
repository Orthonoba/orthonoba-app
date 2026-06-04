import Container from "@/components/ui/Container";
import { Link } from "@/src/i18n/navigation";

const capabilities = [
  {
    label: "Voice Receptionist",
    description: "Answers every call. Qualifies the caller, answers questions and books appointments — without putting anyone on hold.",
  },
  {
    label: "Call Automation",
    description: "Automates outbound calling campaigns for follow-ups, reminders and surveys at scale.",
  },
  {
    label: "Lead Recovery",
    description: "Re-engages lost leads with personalized voice outreach before they go cold.",
  },
  {
    label: "Appointment Confirmation",
    description: "Calls and confirms upcoming appointments automatically, reducing no-shows by up to 60%.",
  },
  {
    label: "Customer Follow-Up",
    description: "Post-service calls that capture feedback, generate reviews and identify upsell opportunities.",
  },
];

const stats = [
  { value: "<0.5s", label: "Response Latency" },
  { value: "40+", label: "Languages" },
  { value: "∞", label: "Concurrent Calls" },
  { value: "24/7", label: "Always On" },
];

export default function VoiceIntelligenceSection() {
  return (
    <section className="bg-panel py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Voice Intelligence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Every call answered.
              <br />
              <span className="text-gold">Every opportunity captured.</span>
            </h2>
            <p className="text-silver text-base leading-relaxed mb-10">
              AI voice agents that speak naturally, understand intent and take action. Your business stays responsive around the clock without adding headcount.
            </p>

            <div className="space-y-5">
              {capabilities.map((cap) => (
                <div key={cap.label} className="flex gap-4">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">{cap.label}</p>
                    <p className="text-muted text-xs leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/platform/voice-agents"
              className="inline-block mt-10 bg-gold text-obsidian px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              Explore Voice Intelligence
            </Link>
          </div>

          {/* Right — stats + visual */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-px bg-panel-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-panel-2 p-8 text-center">
                  <div className="text-[clamp(32px,3.5vw,48px)] font-bold text-gold leading-none">
                    {s.value}
                  </div>
                  <div className="text-muted text-xs tracking-[0.2em] uppercase mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature callout */}
            <div className="bg-panel-2 border border-gold/10 p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">
                Live Example
              </p>
              <p className="text-white text-sm font-medium mb-1">
                &ldquo;Hello, I&apos;d like to book an appointment for next Tuesday.&rdquo;
              </p>
              <p className="text-muted text-xs leading-relaxed">
                AI detects intent → checks availability → confirms booking → sends confirmation → updates CRM → notifies team. All in under 30 seconds.
              </p>
            </div>

            {/* Tech strip */}
            <div className="bg-panel border border-panel-3 px-6 py-4">
              <p className="text-muted text-[10px] tracking-[0.25em] uppercase mb-3">Powered by enterprise infrastructure</p>
              <div className="flex flex-wrap gap-3">
                {["Natural Language AI", "Real-Time Synthesis", "Multi-Channel", "CRM Sync", "GDPR Compliant"].map((t) => (
                  <span key={t} className="text-[10px] text-silver border border-panel-3 px-2.5 py-1 tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
