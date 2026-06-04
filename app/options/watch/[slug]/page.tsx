import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWatchSlugs, getWatch, OPTIONS_DISCLAIMER } from "@/lib/options";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllWatchSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const watch = await getWatch(slug);
  if (!watch) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href="/options"
        className="text-sm text-slate-500 hover:text-[#0e7490] mb-4 inline-block"
      >
        ← Options
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wider text-[#0e7490] mb-2">
          Covered-Call Watch
        </p>
        <h1 className="text-3xl font-bold text-[#0e7490] mb-2">{watch.title}</h1>
        <p className="text-sm text-slate-500">{formatDate(watch.date)}</p>
      </header>
      <div
        className="watch-content"
        dangerouslySetInnerHTML={{ __html: watch.contentHtml }}
      />
      <p className="text-xs text-slate-400 border-t border-slate-200 mt-10 pt-4">
        {OPTIONS_DISCLAIMER}
      </p>
    </article>
  );
}
