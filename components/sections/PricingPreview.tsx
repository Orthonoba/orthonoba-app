import { Link } from "@/src/i18n/navigation";
import Container from "@/components/ui/Container";

const plans = [
  {
    tier: "Starter",
    price: "€99",
    interval: "/month",
    description: "For small teams getting started with AI automation.",
    features: [
      "3 AI Agents",
      "500 AI messages / month",
      "1 Voice Agent",
      "Basic CRM",
      "5 Automations",
      "10 GB Storage",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
  },
  {
    tier: "Professional",
    price: "€299",
    interval: "/month",
    description: "For growing businesses scaling their AI operations.",
    features: [
      "10 AI Agents",
      "5,000 AI messages / month",
      "3 Voice Agents",
      "Full CRM & Pipeline",
      "Unlimited Automations",
      "100 GB Storage",
      "WhatsApp Integration",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    tier: "Business",
    price: "€699",
    interval: "/month",
    description: "For larger teams with advanced AI and compliance needs.",
    features: [
      "Unlimited AI Agents",
      "20,000 AI messages / month",
      "10 Voice Agents",
      "Advanced CRM & Analytics",
      "Unlimited Automations",
      "500 GB Storage",
      "Full Omnichannel",
      "Knowledge Base",
      "API Access",
      "SLA guarantee",
    ],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    interval: "",
    description: "Dedicated infrastructure, white-label and enterprise SLA.",
    features: [
      "Everything in Business",
      "Dedicated infrastructure",
      "White-label options",
      "SSO & SAML",
      "Custom AI model fine-tuning",
      "Unlimited storage",
      "Dedicated success manager",
      "99.99% SLA",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPreview() {
  return (
    <section className="bg-obsidian py-32">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Pricing
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Simple, transparent pricing.<br />Scale as you grow.
          </h2>
          <Link
            href="/pricing"
            className="shrink-0 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:text-gold-light transition-colors duration-200 border-b border-gold/40 pb-0.5"
          >
            Full pricing details →
          </Link>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-panel-3">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`flex flex-col p-8 transition-colors duration-300 ${
                plan.highlighted
                  ? "bg-gold/[0.07] border-t-2 border-gold"
                  : "bg-obsidian hover:bg-panel"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="inline-flex items-center mb-4">
                  <span className="text-[10px] text-obsidian bg-gold font-bold tracking-widest uppercase px-2.5 py-1">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-white text-sm font-bold tracking-widest uppercase mb-2">
                {plan.tier}
              </div>

              {/* Price */}
              <div className="flex items-end gap-1 mb-3">
                <span className={`text-4xl font-bold tracking-tight ${plan.highlighted ? "text-gold" : "text-white"}`}>
                  {plan.price}
                </span>
                {plan.interval && (
                  <span className="text-muted text-sm mb-1.5">{plan.interval}</span>
                )}
              </div>

              <p className="text-muted text-xs leading-relaxed mb-6">
                {plan.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 mt-0.5 border border-gold/30 flex items-center justify-center shrink-0">
                      <div className="w-1 h-1 bg-gold" />
                    </div>
                    <span className="text-silver text-xs leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
                  plan.highlighted
                    ? "bg-gold text-obsidian hover:bg-gold-light"
                    : "border border-panel-3 text-silver hover:border-gold hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-muted text-xs mt-8 tracking-wider">
          All plans include a 14-day free trial. No credit card required to start.
        </p>
      </Container>
    </section>
  );
}
