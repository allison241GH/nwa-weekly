import Link from "next/link";
import { getTopicCatalogWithStats } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const metadata = {
  title: "Venture Learning — Weekly NWA Briefings",
  description: "Weekly coaching lessons across 25 angel and venture investing topics.",
};

export default function LearningIndex() {
  const topics = getTopicCatalogWithStats();
  const withLessons = topics
    .filter((t) => t.lesson_count > 0)
    .sort((a, b) => ((a.latest_date ?? "") < (b.latest_date ?? "") ? 1 : -1));
  const empty = topics.filter((t) => t.lesson_count === 0);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#059669] mb-3">
          Venture Learning
        </h1>
        <p className="text-slate-700 text-base">
          A weekly coaching curriculum across 25 angel and venture investing topics —
          one lesson per week, building a complete foundation over time. Below: every
          topic you&rsquo;ve already covered, plus the ones still ahead.
        </p>
      </header>

      {withLessons.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            Covered ({withLessons.length} of {topics.length}) — most recent first
          </h2>
          <ul className="divide-y divide-slate-200">
            {withLessons.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/learning/${t.slug}`}
                  className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-[#047857]">
                        {t.title}
                        {i === 0 && (
                          <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-white bg-[#059669] rounded-full px-2 py-0.5">
                            Latest
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-slate-600 mt-0.5">{t.blurb}</p>
                    </div>
                    <div className="text-right text-xs text-slate-500 shrink-0 pt-1">
                      <span className="font-semibold text-[#047857]">
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
