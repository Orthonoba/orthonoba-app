import Container from "@/components/ui/Container";

const industries = [
  {
    title: "Healthcare & Dental",
    description:
      "Digital infrastructure for clinics, dental labs, and health professionals. From patient management to CAD/CAM workflows.",
  },
  {
    title: "Professional Services",
    description:
      "Automation and AI tools for law firms, consultancies, and agencies operating in regulated environments.",
  },
  {
    title: "E-Commerce & Retail",
    description:
      "Intelligent workflows and customer engagement systems for online businesses looking to scale operations.",
  },
  {
    title: "Manufacturing & CAD",
    description:
      "Digital production management and file handling for industrial and precision manufacturing workflows.",
  },
];

export default function Industries() {
  return (
    <section className="bg-obsidian py-32">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Industries
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-16">
          Who we work with.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {industries.map((item, index) => (
            <div key={item.title} className="flex gap-7 border-t border-panel-3 pt-8">
              <span className="text-gold text-xs font-mono tracking-widest mt-1 flex-shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-white text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-silver text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
