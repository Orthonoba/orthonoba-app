import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const voiceFeatures = [
  {
    stat: "24/7",
    label: "Always available",
    description: "Never miss a call. Your AI receptionist handles every inquiry, day or night.",
  },
  {
    stat: "40+",
    label: "Languages",
    description: "Speak to your customers in their native language. Multilingual by default.",
  },
  {
    stat: "<0.5s",
    label: "Response latency",
    description: "Human-quality conversation speed. No awkward pauses or delays.",
  },
  {
    stat: "∞",
    label: "Concurrent calls",
    description: "Handle unlimited simultaneous calls with zero additional staffing cost.",
  },
];

const capabilities = [
  "Book and confirm appointments automatically",
  "Qualify callers and route to the right team",
  "Answer FAQs from your knowledge base",
  "Follow up with voicemail and SMS",
  "Transcribe and log every conversation",
  "Escalate to human agents when needed",
];

export default function VoiceAgents() {
  return (
    <section className="bg-panel section-py">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Voice Agents
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Your AI receptionist<br />never sleeps.
            </h2>
            <p className="mt-6 text-silver text-base leading-relaxed">
              Deploy a voice AI agent that handles inbound calls with
              human-quality conversation — scheduling, qualifying, answering,
              and routing. In any language. At any scale.
            </p>

            {/* Capability list */}
            <ul className="mt-8 space-y-3">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="w-4 h-4 mt-0.5 border border-gold/40 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 bg-gold" />
                  </span>
                  <span className="text-silver text-sm leading-relaxed">{cap}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-4">
              <Link
                href="/products/ai-receptionist"
                className="inline-block bg-gold text-obsidian px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
              >
                See AI Receptionist
              </Link>
              <Link
                href="/products/voice-assistant"
                className="inline-block border border-panel-3 text-silver px-7 py-3.5 text-xs font-semibold tracking-widest uppercase hover:border-gold hover:text-white transition-all duration-200"
              >
                Voice Assistant
              </Link>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-px bg-panel-3">
            {voiceFeatures.map((item) => (
              <div
                key={item.label}
                className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-200"
              >
                <div className="text-4xl font-bold text-gold tracking-tight">
                  {item.stat}
                </div>
                <div className="text-white text-sm font-semibold mt-2 tracking-wide">
                  {item.label}
                </div>
                <p className="text-muted text-xs mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration strip */}
        <div className="mt-16 pt-10 border-t border-panel-3 flex flex-col md:flex-row items-center gap-8">
          <span className="text-muted text-xs tracking-[0.25em] uppercase shrink-0">
            Powered by
          </span>
          <div className="flex items-center gap-8 flex-wrap">
            {["ElevenLabs", "Twilio", "WhatsApp Business API", "OpenAI Whisper", "Claude"].map((tech) => (
              <span
                key={tech}
                className="text-silver text-xs font-semibold tracking-wide border-b border-panel-3 pb-px"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
