import Link from "next/link";
import {
  getAllWatches,
  getOptionsTopicCatalogWithStats,
  OPTIONS_DISCLAIMER,
} from "@/lib/options";

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const metadata = {
  title: "Options — Weekly NWA Briefings",
  description:
    "Covered-Call Watch for QQQ and F, plus a novice-friendly options learning curriculum.",
};

export default function OptionsHub() {
  const watches = getAllWatches();
  const [latestWatch, ...earlierWatches] = watches;
  const topics = getOptionsTopicCatalogWithStats();
  const withLessons = topics.filter((t) => t.lesson_count > 0);
  const empty = topics.filter((t) => t.lesson_count === 0);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#0e7490] mb-3">Options</h1>
        <p className="text-slate-700 text-base">
          Two things live here: a weekly <strong>Covered-Call Watch</strong> on the positions
          you own (QQQ and F), and an <strong>Options Learning</strong> curriculum that builds
          covered-call fluency from the ground up.
        </p>
      </header>

      {/* ---- Covered-Call Watch ---- */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          Covered-Call Watch
        </h2>

        {!latestWatch ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 bg-slate-50">
            <p className="text-slate-700">
              The first Covered-Call Watch will publish with the next weekly run.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-wider text-[#0e7490] mb-2">
              Latest watch
            </p>
            <Link
              href={`/options/watch/${latestWatch.slug}`}
              className="block rounded-xl border border-slate-200 p-6 hover:border-[#0891b2] transition-colors"
            >
              <h3 className="text-xl font-bold text-[#0e7490] mb-1">
                {latestWatch.title}
              </h3>
              <p className="text-sm text-slate-500 mb-3">{formatDate(latestWatch.date)}</p>
              {latestWatch.positions && latestWatch.positions.length > 0 && (
                <p className="text-xs text-slate-600 mb-2">
                  Positions: {latestWatch.positions.join(" · ")}
                </p>
              )}
              {latestWatch.summary && (
                <p className="text-base text-slate-700">{latestWatch.summary}</p>
              )}
              <p className="mt-4 text-sm font-semibold text-[#0e7490]">
                Open watch →
              </p>
            </Link>

            {earlierWatches.length > 0 && (
              <ul className="divide-y divide-slate-200 mt-6">
                {earlierWatches.map((w) => (
                  <li key={w.slug}>
                    <Link
                      href={`/options/watch/${w.slug}`}
                      className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                    >
                      <p className="font-semibold text-[#0e7490]">{w.title}</p>
                      <p className="text-xs text-slate-500">{formatShortDate(w.date)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      {/* ---- Options Learning ---- */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-1">
          Options Learning
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          A step-by-step covered-call curriculum — start at the top if you&rsquo;re new.
        </p>

        {withLessons.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Covered ({withLessons.length} of {topics.length})
            </h3>
            <ul className="divide-y divide-slate-200">
              {withLessons.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/options/learning/${t.slug}`}
                    className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#155e75]">{t.title}</p>
                        <p className="text-sm text-slate-600 mt-0.5">{t.blurb}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500 shrink-0 pt-1">
                        <span className="font-semibold text-[#155e75]">
                          {t.lesson_count} {t.lesson_count === 1 ? "lesson" : "lessons"}
                        </span>
                        {t.latest_date && (
                          <p className="mt-0.5">{formatShortDate(t.latest_date)}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {empty.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              Not yet covered ({empty.length})
            </h3>
            <ul className="divide-y divide-slate-200">
              {empty.map((t) => (
                <li key={t.slug} className="py-3">
                  <p className="font-medium text-slate-700">{t.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{t.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
        {OPTIONS_DISCLAIMER}
      </p>
    </div>
  );
}
