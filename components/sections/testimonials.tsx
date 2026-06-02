import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marco Rossi",
    role: "Titolare, Clinica Dentale Lugano",
    text: "Il Voice AI Agent ha rivoluzionato la gestione delle prenotazioni. Ora riceviamo il 40% in più di appuntamenti senza lavoro manuale aggiuntivo.",
    rating: 5,
  },
  {
    name: "Sandra Müller",
    role: "CEO, Agenzia Immobiliare Zurigo",
    text: "L'automazione CRM implementata da ORTHONOBA ci ha permesso di triplicare i follow-up senza assumere personale. ROI straordinario.",
    rating: 5,
  },
  {
    name: "Jean-Pierre Dubois",
    role: "Proprietario, Ristorante Ginevra",
    text: "Il WhatsApp AI gestisce le prenotazioni e le richieste dei clienti H24. I nostri clienti adorano la risposta immediata.",
    rating: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-7"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
