import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllOptionsTopicLessonParams,
  getOptionsLesson,
  getOptionsTopicBySlug,
  OPTIONS_DISCLAIMER,
} from "@/lib/options";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllOptionsTopicLessonParams();
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

export default async function OptionsLessonPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const lesson = await getOptionsLesson(topic, slug);
  const topicMeta = getOptionsTopicBySlug(topic);
  if (!lesson || !topicMeta) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href={`/options/learning/${topic}`}
        className="text-sm text-slate-500 hover:text-[#0e7490] mb-4 inline-block"
      >
        ← {topicMeta.title}
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wider text-[#0e7490] mb-2">
          Options Learning
        </p>
        <h1 className="text-3xl font-bold text-[#155e75] mb-2">{lesson.title}</h1>
        <p className="text-sm text-slate-500">{formatDate(lesson.date)}</p>
      </header>
      <div
        className="options-content"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />
      <p className="text-xs text-slate-400 border-t border-slate-200 mt-10 pt-4">
        {OPTIONS_DISCLAIMER}
      </p>
    </article>
  );
}
