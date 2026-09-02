import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllAiTopicLessonParams,
  getAiLesson,
  getAiTopicBySlug,
} from "@/lib/ai-investing";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllAiTopicLessonParams();
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

export default async function AiLessonPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const lesson = await getAiLesson(topic, slug);
  const topicMeta = getAiTopicBySlug(topic);
  if (!lesson || !topicMeta) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href={`/ai-investing/${topic}`}
        className="text-sm text-slate-500 hover:text-[#7c3aed] mb-4 inline-block"
      >
        ← {topicMeta.title}
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wider text-[#7c3aed] mb-2">
          Lesson
        </p>
        <h1 className="text-3xl font-bold text-[#6d28d9] mb-2">{lesson.title}</h1>
        <p className="text-sm text-slate-500">{formatDate(lesson.date)}</p>
      </header>
      <div
        className="ai-content"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />
    </article>
  );
}
