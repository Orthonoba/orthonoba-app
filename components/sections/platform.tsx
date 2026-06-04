import Container from "@/components/ui/Container";

const stack = [
  { name: "Next.js 15", role: "Frontend Framework" },
  { name: "OpenAI GPT-4o", role: "Language Model" },
  { name: "Anthropic Claude", role: "AI Reasoning" },
  { name: "n8n", role: "Workflow Automation" },
  { name: "Coolify", role: "Self-hosted Infra" },
  { name: "PostgreSQL", role: "Data Layer" },
  { name: "Prisma ORM", role: "Database Access" },
  { name: "Twenty CRM", role: "Customer Relations" },
];

export default function Platform() {
  return (
    <section className="bg-panel py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                Platform
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Built on proven<br />technology.
            </h2>
            <p className="mt-6 text-silver text-base leading-relaxed max-w-md">
              We combine best-in-class enterprise tools into cohesive systems
              that integrate seamlessly with how your business already works.
            </p>
            <div className="mt-10 pt-8 border-t border-panel-3">
              <p className="text-muted text-xs tracking-widest uppercase">
                All infrastructure is self-hosted, auditable, and owned by you.
              </p>
            </div>
          </div>

          {/* Stack grid */}
          <div className="grid grid-cols-2 gap-px bg-panel-3">
            {stack.map((item) => (
              <div
                key={item.name}
                className="bg-panel p-6 hover:bg-panel-2 transition-colors duration-200"
              >
                <div className="text-white text-sm font-semibold">
                  {item.name}
                </div>
                <div className="text-muted text-xs mt-1 tracking-wider">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
