const TECH_STACK = [
  "OpenAI",
  "Anthropic",
  "N8N",
  "Next.js",
  "Vercel",
  "Neon",
  "PostgreSQL",
  "Prisma",
];

export default function TrustBar() {
  return (
    <section className="bg-panel border-y border-white/6 py-6 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted whitespace-nowrap mr-2">
            Built with
          </span>
          {TECH_STACK.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold text-silver/50 hover:text-silver/80 transition-colors whitespace-nowrap cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
