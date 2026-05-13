import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBriefingSlugs,
  getBriefing,
} from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllBriefingSlugs().map((slug) => ({ slug }));
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

export default async function BriefingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const briefing = await getBriefing(slug);
  if (!briefing) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href="/"
        className="text-sm text-slate-500 hover:text-[#0a1628] mb-4 inline-block"
      >
        ← All briefings
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-2">
          {briefing.title}
        </h1>
        <p className="text-sm text-slate-500">{formatDate(briefing.date)}</p>
      </header>
      <div
        className="briefing-content"
        dangerouslySetInnerHTML={{ __html: briefing.contentHtml }}
      />
    </article>
  );
}
