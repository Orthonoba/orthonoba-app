import Container from "@/components/ui/Container";

const services = [
  {
    index: "01",
    title: "AI Agents",
    description:
      "Custom AI agents built on GPT-4o and Claude. Automate complex reasoning, document processing, and decision workflows at scale.",
  },
  {
    index: "02",
    title: "Workflow Automation",
    description:
      "End-to-end automation with n8n. Connect your tools, eliminate manual work, and run operations 24/7 without additional headcount.",
  },
  {
    index: "03",
    title: "Web Development",
    description:
      "Enterprise-grade web applications on Next.js and TypeScript. Fast, secure, built to last, and optimized for conversion.",
  },
  {
    index: "04",
    title: "Digital Infrastructure",
    description:
      "Self-hosted infrastructure on Coolify. CRM, databases, and business tools — fully owned and controlled by you.",
  },
];

export default function Services() {
  return (
    <section className="bg-obsidian py-32">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Services
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-16">
          What we build.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-panel-3">
          {services.map((service) => (
            <div
              key={service.index}
              className="bg-obsidian p-10 hover:bg-panel transition-colors duration-300 group"
            >
              <span className="text-gold text-xs font-mono tracking-widest">
                {service.index}
              </span>
              <h3 className="mt-5 text-xl font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200">
                {service.title}
              </h3>
              <p className="mt-4 text-silver text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
