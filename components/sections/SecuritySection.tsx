import Container from "@/components/ui/Container";

const securityFeatures = [
  {
    title: "GDPR Compliant",
    description:
      "Full compliance with EU data protection regulations. Data residency in Europe. Right to erasure built-in.",
  },
  {
    title: "End-to-End Encryption",
    description:
      "All data encrypted at rest (AES-256) and in transit (TLS 1.3). Encryption keys managed per organization.",
  },
  {
    title: "SOC 2-Aligned Practices",
    description:
      "Infrastructure built against SOC 2 Type II controls. Security policies, access controls and audit logging aligned with SOC 2 requirements.",
  },
  {
    title: "Role-Based Access",
    description:
      "Granular RBAC with 8 roles and per-module permissions. Every action logged in the immutable audit trail.",
  },
  {
    title: "Immutable Audit Log",
    description:
      "Every action by every user is logged with timestamp, IP and context. Tamper-proof. Exportable for compliance.",
  },
  {
    title: "99.9% SLA Uptime",
    description:
      "Distributed infrastructure on Vercel Edge Network + Neon serverless Postgres. Automatic failover.",
  },
];

const certifications = [
  "GDPR",
  "ISO 27001 Principles",
  "HIPAA-Ready Architecture",
  "TLS 1.3",
  "AES-256",
  "Neon PostgreSQL",
  "Vercel Edge",
  "Cloudflare",
];

export default function SecuritySection() {
  return (
    <section className="bg-panel section-py border-t border-panel-3">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Enterprise Security
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Security that<br />enterprises trust.
          </h2>
          <p className="text-silver text-base leading-relaxed max-w-md">
            {"Built with enterprise-grade security from the ground up. Your data stays in Europe. Your customers' trust stays intact."}
          </p>
        </div>

        {/* Security features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-3 mb-16">
          {securityFeatures.map((item, i) => (
            <div
              key={item.title}
              className="bg-panel p-8 hover:bg-panel-2 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 border border-gold/40 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gold" />
                </div>
                <span className="text-gold text-[10px] font-mono tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-white text-sm font-bold tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="flex flex-col md:flex-row items-center gap-6 pt-10 border-t border-panel-3">
          <span className="text-muted text-xs tracking-[0.25em] uppercase shrink-0">
            Standards & Infrastructure
          </span>
          <div className="flex items-center gap-4 flex-wrap">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="text-silver text-xs font-semibold tracking-wide border border-panel-3 px-3 py-1.5"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
