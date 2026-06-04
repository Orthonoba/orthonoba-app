type Step = { label: string; key: string };

const STEPS: Step[] = [
  { label: "Business", key: "organization" },
  { label: "Plan", key: "plan" },
  { label: "Agent", key: "agent" },
  { label: "WhatsApp", key: "whatsapp" },
  { label: "Done", key: "complete" },
];

type Props = {
  current: "organization" | "plan" | "agent" | "whatsapp" | "complete";
  title: string;
  subtitle: string;
};

export default function StepHeader({ current, title, subtitle }: Props) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="mb-8">
      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-8">
        {STEPS.map((step, idx) => {
          const done = idx < currentIdx;
          const active = idx === currentIdx;
          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    done
                      ? "bg-[#D4AF37] text-black"
                      : active
                      ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]"
                      : "bg-white/5 border border-white/10 text-[#71717A]"
                  }`}
                >
                  {done ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    active ? "text-[#D4AF37]" : done ? "text-[#A1A1AA]" : "text-[#71717A]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 mx-1 ${done ? "bg-[#D4AF37]/50" : "bg-white/5"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
        <p className="text-[#71717A] text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
