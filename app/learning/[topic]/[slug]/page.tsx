import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTopicLessonParams,
  getLesson,
  getTopicBySlug,
} from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTopicLessonParams();
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

export default async function LessonPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const lesson = await getLesson(topic, slug);
  const topicMeta = getTopicBySlug(topic);
  if (!lesson || !topicMeta) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href={`/learning/${topic}`}
        className="text-sm text-slate-500 hover:text-[#059669] mb-4 inline-block"
      >
        ← {topicMeta.title}
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wider text-[#059669] mb-2">
          Lesson
        </p>
        <h1 className="text-3xl font-bold text-[#047857] mb-2">{lesson.title}</h1>
        <p className="text-sm text-slate-500">{formatDate(lesson.date)}</p>
      </header>
      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />
    </article>
  );
}
