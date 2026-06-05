import Link from "next/link";
import { getAllBriefings } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const briefings = getAllBriefings();
  const [latest, ...rest] = briefings;

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      {briefings.length === 0 ? (
        <div className="text-slate-600">
          <p className="text-lg font-semibold mb-2">No briefings yet.</p>
          <p className="text-sm">
            The first weekly briefing will publish Friday at 6:00 PM ET.
          </p>
        </div>
      ) : (
        <>
          <section className="mb-10">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
              Latest briefing
            </p>
            <Link
              href={`/briefings/${latest.slug}`}
              className="block rounded-xl border border-slate-200 p-6 hover:border-[#0a1628] transition-colors"
            >
              <h1 className="text-2xl font-bold text-[#0a1628] mb-1">
                {latest.title}
              </h1>
              <p className="text-sm text-slate-500 mb-4">
                {formatDate(latest.date)}
              </p>
              {latest.top_story && (
                <p className="text-base text-slate-700">
                  <span className="font-semibold">Top story: </span>
                  {latest.top_story}
                </p>
              )}
              <p className="mt-4 text-sm font-semibold text-[#0a1628]">
                Read briefing →
              </p>
            </Link>
          </section>

          {rest.length > 0 && (
            <section>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Earlier
              </p>
              <ul className="divide-y divide-slate-200">
                {rest.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/briefings/${b.slug}`}
                      className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                    >
                      <p className="font-semibold text-[#0a1628]">{b.title}</p>
                      <p className="text-xs text-slate-500">
                        {formatDate(b.date)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
