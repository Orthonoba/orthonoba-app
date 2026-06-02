import { getTranslations } from "next-intl/server";
import { BookOpen } from "lucide-react";

const POSTS = [
  {
    title: "Come gli AI Agent stanno rivoluzionando il customer service",
    category: "ai",
    date: "2026-05-20",
    readTime: "5 min",
    excerpt: "Scopri come le aziende svizzere stanno usando Voice AI e WhatsApp AI per automatizzare il supporto clienti.",
  },
  {
    title: "N8N vs Make: quale automazione scegliere per il tuo business?",
    category: "automation",
    date: "2026-05-15",
    readTime: "7 min",
    excerpt: "Un confronto approfondito tra le due piattaforme di workflow automation più popolari.",
  },
  {
    title: "SEO multilingue per il mercato svizzero: guida pratica",
    category: "seo",
    date: "2026-05-10",
    readTime: "8 min",
    excerpt: "Strategie SEO per posizionarsi in italiano, tedesco e francese sul mercato svizzero.",
  },
  {
    title: "ChatBot WhatsApp: come aumentare le vendite del 40%",
    category: "marketing",
    date: "2026-05-05",
    readTime: "6 min",
    excerpt: "Caso studio reale: implementazione di un AI Agent WhatsApp per una gioielleria.",
  },
  {
    title: "Next.js 15 per siti web ad alta performance",
    category: "web",
    date: "2026-04-28",
    readTime: "5 min",
    excerpt: "Perché Next.js è la scelta giusta per siti business nel 2026.",
  },
  {
    title: "Trasformazione digitale per le PMI: da dove iniziare",
    category: "ai",
    date: "2026-04-20",
    readTime: "10 min",
    excerpt: "Una roadmap pratica per le PMI che vogliono adottare l'AI senza investimenti enormi.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  ai: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  automation: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  seo: "text-green-400 bg-green-500/10 border-green-500/20",
  marketing: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  web: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen size={14} />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="h-40 bg-slate-800 rounded-xl mb-5" />
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-2.5 py-1 border rounded-lg text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}
                >
                  {t(`categories.${post.category}`)}
                </span>
                <span className="text-xs text-slate-500">{post.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-white mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="text-xs text-slate-600">{post.date}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
