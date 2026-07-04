import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import { toISODate, toISODateOptional } from "./content";
import type { Topic, LessonMeta, Lesson } from "./content";

const ROOT = process.cwd();
const WATCH_DIR = path.join(ROOT, "content", "options-watch");
const OPTIONS_LEARNING_DIR = path.join(ROOT, "content", "options-learning");

// Standing disclaimer shown on every Covered-Call Watch and the Options Learning footer.
export const OPTIONS_DISCLAIMER =
  "Illustrative and educational, not financial advice. Prices are approximate; verify live quotes, deltas, and ex-dividend dates in your broker before trading.";

export type WatchMeta = {
  slug: string; // date-based, e.g. "2026-06-04"
  title: string;
  date: string;
  week_of?: string;
  positions?: string[]; // e.g. ["QQQ", "F"]
  summary?: string;
};

export type Watch = WatchMeta & {
  contentHtml: string;
};

// Options Learning curriculum — a novice-first covered-call tutorial that mirrors the
// Venture Learning rotation. Order is the rotation order for the weekly auto-generator.
export const OPTIONS_TOPIC_CATALOG: Topic[] = [
  { slug: "what-is-a-covered-call", title: "What Is a Covered Call?", blurb: "Own 100 shares, sell one call, collect the premium — the whole trade in plain language." },
  { slug: "moneyness-and-strike-selection", title: "Moneyness and Strike Selection", blurb: "ITM/ATM/OTM, picking an out-of-the-money strike, and reading delta as your odds of assignment." },
  { slug: "dte-and-theta-decay", title: "DTE and Theta Decay", blurb: "Why the 30–45 day window is the income sweet spot, and how time decay works for the seller." },
  { slug: "premium-yield-and-annualizing", title: "Premium, Yield, and Annualizing the Return", blurb: "Turning a premium into an income number — static vs. if-called return, and annualized yield." },
  { slug: "ex-dividend-and-early-assignment-risk", title: "Ex-Dividend and Early-Assignment Risk", blurb: "The one calendar risk every covered-call seller must respect — and how to sidestep it." },
  { slug: "assignment-and-share-protection", title: "Assignment and Share Protection", blurb: "What assignment really means, the downside cushion, and the dual goal of income plus protection." },
  { slug: "rolling-a-covered-call", title: "Rolling a Covered Call", blurb: "Rolling up and out to defend shares, capture more premium, or avoid an unwanted assignment." },
  { slug: "covered-calls-on-etfs-vs-single-stocks", title: "Covered Calls on ETFs vs. Single Stocks", blurb: "QQQ vs. F: how implied volatility, dividends, and single-name risk change the trade." },
  { slug: "tax-treatment-of-covered-calls", title: "Tax Treatment of Covered Calls", blurb: "Qualified covered calls, holding periods, and why deep-ITM calls can cost you (not tax advice)." },
  { slug: "when-not-to-sell-covered-calls", title: "When NOT to Sell Covered Calls", blurb: "Earnings, strong uptrends, and the cost of capping your upside on a name you love." },
  { slug: "the-wheel-and-cash-secured-puts", title: "The Wheel and Cash-Secured Puts", blurb: "Getting paid to buy shares, then getting paid to sell them — the full income loop." },
  { slug: "poor-mans-covered-call", title: "The Poor Man's Covered Call", blurb: "Using a LEAPS call instead of 100 shares to sell calls with less capital at risk." },
];

const OPTIONS_TOPIC_BY_SLUG: Map<string, Topic> = new Map(
  OPTIONS_TOPIC_CATALOG.map((t) => [t.slug, t]),
);

export function getOptionsTopicBySlug(slug: string): Topic | undefined {
  return OPTIONS_TOPIC_BY_SLUG.get(slug);
}

function dirExists(dir: string): boolean {
  return fs.existsSync(dir);
}

// ---- Covered-Call Watch (dated weekly entries, mirrors briefings) ----

export function getAllWatchSlugs(): string[] {
  if (!dirExists(WATCH_DIR)) return [];
  return fs
    .readdirSync(WATCH_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllWatches(): WatchMeta[] {
  return getAllWatchSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(WATCH_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: toISODate(data.date, slug),
        week_of: toISODateOptional(data.week_of),
        positions: data.positions as string[] | undefined,
        summary: data.summary as string | undefined,
      } satisfies WatchMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getWatch(slug: string): Promise<Watch | null> {
  const full = path.join(WATCH_DIR, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: toISODate(data.date, slug),
    week_of: toISODateOptional(data.week_of),
    positions: data.positions as string[] | undefined,
    summary: data.summary as string | undefined,
    contentHtml,
  };
}

// ---- Options Learning lessons (topic rotation, mirrors Venture Learning) ----

function readOptionsLessonMeta(topicSlug: string, fileName: string): LessonMeta {
  const raw = fs.readFileSync(path.join(OPTIONS_LEARNING_DIR, topicSlug, fileName), "utf8");
  const { data } = matter(raw);
  const slug = fileName.replace(/\.md$/, "");
  return {
    topic_slug: (data.topic_slug as string) ?? topicSlug,
    slug,
    title: (data.title as string) ?? slug,
    date: toISODate(data.date, slug),
    key_terms: data.key_terms as string[] | undefined,
  };
}

export function getAllOptionsLessonMeta(): LessonMeta[] {
  if (!dirExists(OPTIONS_LEARNING_DIR)) return [];
  const topics = fs
    .readdirSync(OPTIONS_LEARNING_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const out: LessonMeta[] = [];
  for (const topicSlug of topics) {
    const topicDir = path.join(OPTIONS_LEARNING_DIR, topicSlug);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      out.push(readOptionsLessonMeta(topicSlug, f));
    }
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getOptionsLessonsByTopic(topicSlug: string): LessonMeta[] {
  const topicDir = path.join(OPTIONS_LEARNING_DIR, topicSlug);
  if (!fs.existsSync(topicDir)) return [];
  return fs
    .readdirSync(topicDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readOptionsLessonMeta(topicSlug, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getOptionsLesson(
  topicSlug: string,
  dateSlug: string,
): Promise<Lesson | null> {
  const full = path.join(OPTIONS_LEARNING_DIR, topicSlug, `${dateSlug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  return {
    topic_slug: (data.topic_slug as string) ?? topicSlug,
    slug: dateSlug,
    title: (data.title as string) ?? dateSlug,
    date: toISODate(data.date, dateSlug),
    key_terms: data.key_terms as string[] | undefined,
    contentHtml,
  };
}

export type OptionsTopicWithLessonStats = Topic & {
  lesson_count: number;
  latest_date?: string;
};

export function getOptionsTopicCatalogWithStats(): OptionsTopicWithLessonStats[] {
  const allLessons = getAllOptionsLessonMeta();
  const byTopic = new Map<string, LessonMeta[]>();
  for (const lesson of allLessons) {
    const arr = byTopic.get(lesson.topic_slug) ?? [];
    arr.push(lesson);
    byTopic.set(lesson.topic_slug, arr);
  }
  return OPTIONS_TOPIC_CATALOG.map((t) => {
    const lessons = byTopic.get(t.slug) ?? [];
    return {
      ...t,
      lesson_count: lessons.length,
      latest_date: lessons[0]?.date,
    };
  });
}

export function getAllOptionsTopicLessonParams(): { topic: string; slug: string }[] {
  return getAllOptionsLessonMeta().map((l) => ({ topic: l.topic_slug, slug: l.slug }));
}
