import Container from "@/components/ui/Container";

const categories = [
  {
    title: "CRM Systems",
    description: "Sync contacts, deals and interactions with your existing CRM.",
    count: "12+",
  },
  {
    title: "Communication Platforms",
    description: "Connect messaging, email, voice and video channels.",
    count: "18+",
  },
  {
    title: "Business Applications",
    description: "Integrate project management, productivity and collaboration tools.",
    count: "25+",
  },
  {
    title: "Accounting Systems",
    description: "Automate invoicing, billing and financial data flows.",
    count: "8+",
  },
  {
    title: "Marketing Platforms",
    description: "Sync leads, campaigns and audience data across marketing tools.",
    count: "20+",
  },
  {
    title: "Customer Support Systems",
    description: "Connect ticketing, helpdesk and service platforms.",
    count: "10+",
  },
  {
    title: "AI & Data Systems",
    description: "Integrate language models, analytics and data warehouses.",
    count: "15+",
  },
  {
    title: "Custom APIs",
    description: "Connect any system via REST, GraphQL or webhook.",
    count: "∞",
  },
];

export default function EnterpriseIntegrationsSection() {
  return (
    <section className="bg-panel py-32">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Enterprise Integrations
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            Connects everything.
            <br />
            <span className="text-gold">Automates across all of it.</span>
          </h2>
          <p className="text-silver text-sm leading-relaxed max-w-sm lg:text-right">
            Orthonoba connects and automates your entire digital ecosystem — from the tools you use today to the systems you&apos;ll build tomorrow.
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-muted text-sm mb-14 max-w-3xl">
          No rip-and-replace. Orthonoba integrates with your existing stack, enhances it with AI automation and creates a unified operational layer across all your systems.
        </p>

        {/* Integration categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-panel-3 mb-10">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-panel-2 p-7 hover:bg-[#1E1E1E] transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white text-sm font-semibold tracking-tight group-hover:text-gold transition-colors duration-200 flex-1 pr-3">
                  {cat.title}
                </h3>
                <span className="text-gold text-xs font-bold tracking-wider flex-shrink-0">
                  {cat.count}
                </span>
              </div>
              <p className="text-muted text-xs leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="bg-panel border border-gold/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-base font-semibold mb-1">
              500+ pre-built integrations. Custom connections available.
            </p>
            <p className="text-muted text-sm">
              If your system has an API, we can connect it. Our team handles the integration — you focus on the results.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-center px-5 py-3 border border-panel-3">
              <div className="text-xl font-bold text-gold">500+</div>
              <div className="text-muted text-[10px] tracking-wider uppercase">Integrations</div>
            </div>
            <div className="text-center px-5 py-3 border border-panel-3">
              <div className="text-xl font-bold text-gold">48h</div>
              <div className="text-muted text-[10px] tracking-wider uppercase">Setup Time</div>
            </div>
            <div className="text-center px-5 py-3 border border-panel-3">
              <div className="text-xl font-bold text-gold">0</div>
              <div className="text-muted text-[10px] tracking-wider uppercase">Data Migration</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
