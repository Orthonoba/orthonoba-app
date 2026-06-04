import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const industries = [
  {
    slug: "dental",
    title: "Dental",
    description:
      "Digital dental platform with lab management, case tracking, STL file handling and patient portal.",
    features: ["Case management", "Lab workflow", "Patient portal"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description:
      "Patient management, clinical workflows and AI-assisted scheduling for clinics and medical practices.",
    features: ["Patient records", "Appointment AI", "Clinical CRM"],
  },
  {
    slug: "legal",
    title: "Legal",
    description:
      "Case management, document automation and client communication for law firms and legal departments.",
    features: ["Case tracking", "Document AI", "Client portal"],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description:
      "Property CRM, lead qualification and client automation for agencies and individual agents.",
    features: ["Property CRM", "Lead AI", "Client automation"],
  },
  {
    slug: "education",
    title: "Education",
    description:
      "Student management, course delivery and AI tutoring for academies, schools and online platforms.",
    features: ["Student CRM", "Course management", "AI tutoring"],
  },
  {
    slug: "consulting",
    title: "Consulting",
    description:
      "Project management, proposal automation and client relationship tools for consultants and agencies.",
    features: ["Project management", "Proposal AI", "Client CRM"],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    description:
      "Order management, customer support automation and marketing workflows for online stores.",
    features: ["Order management", "Support AI", "Marketing automation"],
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    description:
      "Custom enterprise deployments with SSO, dedicated infrastructure, SLA and white-label options.",
    features: ["Custom deployment", "SSO & security", "White-label"],
  },
];

export default function Industries() {
  return (
    <section className="bg-obsidian section-py">
      <Container>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Industry Solutions
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Built for your industry.<br />Ready from day one.
          </h2>
          <p className="text-silver text-base leading-relaxed max-w-sm">
            Each vertical ships with pre-configured agents, workflows and
            dashboards designed for that specific industry's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-panel-3">
          {industries.map((item, index) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className="bg-obsidian p-8 hover:bg-panel transition-colors duration-300 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-gold text-xs font-mono tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-4 h-px bg-panel-3 group-hover:bg-gold transition-colors duration-300" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-gold transition-colors duration-200 mb-3">
                {item.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed flex-1">
                {item.description}
              </p>
              <ul className="mt-5 pt-5 border-t border-panel-3 space-y-1.5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold shrink-0" />
                    <span className="text-muted text-xs">{f}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
