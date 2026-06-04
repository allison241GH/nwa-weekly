import Link from "next/link";
import { notFound } from "next/navigation";
import {
  OPTIONS_TOPIC_CATALOG,
  getOptionsLessonsByTopic,
  getOptionsTopicBySlug,
} from "@/lib/options";

export const dynamicParams = false;

export async function generateStaticParams() {
  return OPTIONS_TOPIC_CATALOG.map((t) => ({ topic: t.slug }));
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

export default async function OptionsTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const meta = getOptionsTopicBySlug(topic);
  if (!meta) notFound();
  const lessons = getOptionsLessonsByTopic(topic);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Link
        href="/options"
        className="text-sm text-slate-500 hover:text-[#0e7490] mb-4 inline-block"
      >
        ← Options
      </Link>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wider text-[#0e7490] mb-2">
          Options Learning
        </p>
        <h1 className="text-3xl font-bold text-[#155e75] mb-2">{meta.title}</h1>
        <p className="text-slate-700">{meta.blurb}</p>
      </header>

      {lessons.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 bg-slate-50">
          <p className="text-sm uppercase tracking-wider text-slate-500 mb-2">
            Not yet covered
          </p>
          <p className="text-slate-700">
            This topic hasn&rsquo;t come up in the rotation yet. Lessons will appear here as
            they&rsquo;re taught in upcoming weekly runs.
          </p>
        </div>
      ) : (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
          </h2>
          <ul className="divide-y divide-slate-200">
            {lessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link
                  href={`/options/learning/${topic}/${lesson.slug}`}
                  className="block py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
                >
                  <p className="text-xs text-slate-500">{formatDate(lesson.date)}</p>
                  <p className="font-semibold text-[#155e75] mt-0.5">{lesson.title}</p>
                  {lesson.key_terms && lesson.key_terms.length > 0 && (
                    <p className="text-xs text-slate-600 mt-1">
                      Key terms: {lesson.key_terms.join(" · ")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
