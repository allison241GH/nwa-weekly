import Link from "next/link";
import { getAiTopicCatalogWithStats, AI_LEARNING_CATEGORIES } from "@/lib/ai-investing";

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const metadata = {
  title: "AI Investing — Weekly NWA Briefings",
  description: "Weekly coaching lessons on how AI is reshaping venture and angel investing itself.",
};

export default function AiInvestingIndex() {
  const topics = getAiTopicCatalogWithStats();
  const lessonCountBySlug = new Map(topics.map((t) => [t.slug, t.lesson_count]));
  const withLessons = topics
    .filter((t) => t.lesson_count > 0)
    .sort((a, b) => ((a.latest_date ?? "") < (b.latest_date ?? "") ? 1 : -1));
  const empty = topics.filter((t) => t.lesson_count === 0);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#7c3aed] mb-3">
          AI Investing
        </h1>
        <p className="text-slate-700 text-base">
          A weekly coaching curriculum across 25 topics on how AI is reshaping venture
          and angel investing itself — deal sourcing, moat economics, founder evaluation,
          valuation, and the VC/fund model. Separate from the core Venture Learning
          curriculum, one lesson per week.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-1">
          Categories
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          A reference map of this curriculum by theme.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {AI_LEARNING_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50/50"
            >
              <p className="font-semibold text-[#6d28d9] text-sm">{cat.name}</p>
              <p className="text-xs text-slate-600 mt-1 mb-2">{cat.description}</p>
              {cat.topicSlugs.length > 0 && (
                <ul className="text-xs text-slate-700 space-y-0.5">
                  {cat.topicSlugs.map((slug) => {
                    const topic = topics.find((t) => t.slug === slug);
                    if (!topic) return null;
                    const hasLesson = (lessonCountBySlug.get(slug) ?? 0) > 0;
                    return (
                      <li key={slug}>
                        {hasLesson ? (
                          <Link href={`/ai-investing/${slug}`} className="hover:underline hover:text-[#6d28d9]">
                            {topic.title}
                          </Link>
                        ) : (
                          <span className="text-slate-500">{topic.title}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {withLessons.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            Covered ({withLessons.length} of {topics.length}) — most recent first
          </h2>
          <ul className="divide-y divide-slate-200">
            {withLessons.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/ai-investing/${t.slug}`}
                  className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-[#6d28d9]">
                        {t.title}
                        {i === 0 && (
                          <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-white bg-[#7c3aed] rounded-full px-2 py-0.5">
                            Latest
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-slate-600 mt-0.5">{t.blurb}</p>
                    </div>
                    <div className="text-right text-xs text-slate-500 shrink-0 pt-1">
                      <span className="font-semibold text-[#6d28d9]">
                        {t.lesson_count} {t.lesson_count === 1 ? "lesson" : "lessons"}
                      </span>
                      {t.latest_date && (
                        <p className="mt-0.5">{formatDate(t.latest_date)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {empty.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            Not yet covered ({empty.length})
          </h2>
          <ul className="divide-y divide-slate-200">
            {empty.map((t) => (
              <li key={t.slug} className="py-3">
                <p className="font-medium text-slate-700">{t.title}</p>
                <p className="text-sm text-slate-500 mt-0.5">{t.blurb}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
