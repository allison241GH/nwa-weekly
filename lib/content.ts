import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const ROOT = process.cwd();
const BRIEFINGS_DIR = path.join(ROOT, "content", "briefings");
const LEARNING_DIR = path.join(ROOT, "content", "learning");

export type BriefingMeta = {
  slug: string;
  title: string;
  date: string;
  week_of?: string;
  top_story?: string;
  sections_covered?: string[];
};

export type Briefing = BriefingMeta & {
  contentHtml: string;
};

export type LessonMeta = {
  slug: string;
  topic_category: string;
  topic: string;
  title: string;
  date: string;
  key_terms?: string[];
};

export type Lesson = LessonMeta & {
  contentHtml: string;
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) return false;
  return true;
}

async function renderMarkdown(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(md);
  return String(file);
}

export function getAllBriefingSlugs(): string[] {
  if (!ensureDir(BRIEFINGS_DIR)) return [];
  return fs
    .readdirSync(BRIEFINGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBriefings(): BriefingMeta[] {
  return getAllBriefingSlugs()
    .map((slug) => {
      const full = path.join(BRIEFINGS_DIR, `${slug}.md`);
      const raw = fs.readFileSync(full, "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? slug,
        week_of: data.week_of as string | undefined,
        top_story: data.top_story as string | undefined,
        sections_covered: data.sections_covered as string[] | undefined,
      } satisfies BriefingMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBriefing(slug: string): Promise<Briefing | null> {
  const full = path.join(BRIEFINGS_DIR, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? slug,
    week_of: data.week_of as string | undefined,
    top_story: data.top_story as string | undefined,
    sections_covered: data.sections_covered as string[] | undefined,
    contentHtml,
  };
}

export function getAllLessonMeta(): LessonMeta[] {
  if (!ensureDir(LEARNING_DIR)) return [];
  const topics = fs
    .readdirSync(LEARNING_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const out: LessonMeta[] = [];
  for (const topic of topics) {
    const topicDir = path.join(LEARNING_DIR, topic);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      const raw = fs.readFileSync(path.join(topicDir, f), "utf8");
      const { data } = matter(raw);
      out.push({
        slug: f.replace(/\.md$/, ""),
        topic_category: topic,
        topic: (data.topic as string) ?? topic,
        title: (data.title as string) ?? f,
        date: (data.date as string) ?? f.replace(/\.md$/, ""),
        key_terms: data.key_terms as string[] | undefined,
      });
    }
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}
