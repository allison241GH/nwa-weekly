import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import { toISODate } from "./content";
import type { Topic, LessonMeta, Lesson, LearningCategory } from "./content";

const ROOT = process.cwd();
const AI_INVESTING_DIR = path.join(ROOT, "content", "ai-investing");

// AI Investing curriculum — a dedicated 25-topic rotation on how AI is reshaping
// venture and angel investing itself (deal sourcing, moats, founder evaluation,
// valuation, and the VC/fund model). Mirrors the Venture Learning rotation
// structure but is a separate catalog, section, and weekly slot.
export const AI_TOPIC_CATALOG: Topic[] = [
  { slug: "ai-native-deal-sourcing", title: "AI-Native Deal Sourcing", blurb: "How AI tools are already changing where angels find their next deal." },
  { slug: "diligence-at-machine-speed", title: "Diligence at Machine Speed", blurb: "Using AI to stress-test a pitch — and where it still can't replace judgment." },
  { slug: "the-new-ai-series-a-bar", title: "The New AI Series A Bar", blurb: "Why $3.5M ARR, 120% NRR, and sub-2x burn multiples are the new normal." },
  { slug: "foundation-model-vs-application-layer", title: "Foundation-Model vs. Application-Layer Companies", blurb: "Two different businesses wearing the same 'AI startup' label." },
  { slug: "compute-efficiency-as-a-diligence-metric", title: "Compute Efficiency as a Diligence Metric", blurb: "Why inference cost per query is becoming as important as CAC." },
  { slug: "wrapper-risk", title: "Wrapper Risk", blurb: "Spotting a business with no defensibility beyond someone else's model." },
  { slug: "data-moats-vs-model-moats", title: "Data Moats vs. Model Moats", blurb: "What defends an AI business once the model itself is commoditized." },
  { slug: "open-source-model-commoditization", title: "Open-Source Model Commoditization", blurb: "As frontier capability leaks into open weights, what's left to differentiate?" },
  { slug: "distribution-as-the-new-ai-moat", title: "Distribution as the New AI Moat", blurb: "Why owning the customer relationship beats owning the model." },
  { slug: "workflow-lock-in-and-switching-costs", title: "Workflow Lock-In and Switching Costs", blurb: "The un-sexy moat outlasting every 'proprietary model' claim." },
  { slug: "solo-founder-ai-leveraged-teams", title: "Solo-Founder, AI-Leveraged Teams", blurb: "Rethinking team-size signals when two people do the work of twenty." },
  { slug: "evaluating-technical-founders-ai-era", title: "Evaluating Technical Founders in the AI Era", blurb: "Separating real ML depth from 'I use ChatGPT well.'" },
  { slug: "founder-judgment-vs-model-access", title: "Founder Judgment vs. Model Access", blurb: "What's actually scarce now that everyone has the same foundation models." },
  { slug: "compressed-fundraising-cycles", title: "Compressed Fundraising Cycles", blurb: "What $0-to-$1B-ARR-in-24-months does to how much diligence time you get." },
  { slug: "reference-checking-ai-pedigree", title: "Reference-Checking AI Pedigree", blurb: "The ex-OpenAI/Anthropic halo effect, and telling signal from resume shine." },
  { slug: "ai-valuation-premiums", title: "AI Valuation Premiums: Justified or Froth?", blurb: "Why AI startups price 30-40% above peers, and when that premium is real." },
  { slug: "mega-round-economics", title: "Mega-Round Economics", blurb: "What $10B+ foundation-model rounds signal for every deal downstream." },
  { slug: "structuring-terms-for-unprecedented-growth-curves", title: "Structuring Terms for Unprecedented Growth Curves", blurb: "When ARR triples in a quarter, what actually protects your ownership?" },
  { slug: "safes-and-uncapped-notes-in-the-ai-era", title: "SAFEs and Uncapped Notes in the AI Era", blurb: "Round dynamics when every investor fears missing the next breakout." },
  { slug: "the-ai-premium-discount-framework", title: "The AI-Premium Discount Framework", blurb: "A disciplined way to decide how much hype tax you're willing to pay." },
  { slug: "ai-copilots-for-investors", title: "AI Copilots for Investors", blurb: "Deal triage, memo drafting, and LP reporting — what to automate, what not to." },
  { slug: "solo-gps-and-ai-augmented-micro-funds", title: "Solo GPs and AI-Augmented Micro-Funds", blurb: "How one-person funds now compete with traditional partnerships." },
  { slug: "evergreen-funds-and-continuous-deployment", title: "Evergreen Funds and Continuous-Deployment Capital", blurb: "A structural alternative to the 10-year fund cycle." },
  { slug: "ai-reshaped-syndicates-and-spvs", title: "AI-Reshaped Syndicates and SPVs", blurb: "How angel syndication changes as AI handles the operational overhead." },
  { slug: "algorithmic-underwriting-vs-partner-judgment", title: "Algorithmic Underwriting vs. Partner Judgment", blurb: "Where the line holds, and where it's already moved." },
];

const AI_TOPIC_BY_SLUG: Map<string, Topic> = new Map(
  AI_TOPIC_CATALOG.map((t) => [t.slug, t]),
);

export function getAiTopicBySlug(slug: string): Topic | undefined {
  return AI_TOPIC_BY_SLUG.get(slug);
}

// Static reference taxonomy for the /ai-investing index page.
export const AI_LEARNING_CATEGORIES: LearningCategory[] = [
  {
    name: "Deal Sourcing & Diligence in the AI Era",
    description: "Finding deals and stress-testing them when AI changes both the pitch and the process.",
    topicSlugs: [
      "ai-native-deal-sourcing",
      "diligence-at-machine-speed",
      "the-new-ai-series-a-bar",
      "foundation-model-vs-application-layer",
      "compute-efficiency-as-a-diligence-metric",
    ],
  },
  {
    name: "Moat Economics for AI-Era Startups",
    description: "What actually defends an AI business once the model itself is commoditized.",
    topicSlugs: [
      "wrapper-risk",
      "data-moats-vs-model-moats",
      "open-source-model-commoditization",
      "distribution-as-the-new-ai-moat",
      "workflow-lock-in-and-switching-costs",
    ],
  },
  {
    name: "Founder & Team Evaluation in the AI Era",
    description: "Reading founders and teams when AI tooling changes what a small team can do.",
    topicSlugs: [
      "solo-founder-ai-leveraged-teams",
      "evaluating-technical-founders-ai-era",
      "founder-judgment-vs-model-access",
      "compressed-fundraising-cycles",
      "reference-checking-ai-pedigree",
    ],
  },
  {
    name: "Valuation & Deal Structure in an AI Hype Cycle",
    description: "Pricing and structuring deals when growth curves and round dynamics break historical norms.",
    topicSlugs: [
      "ai-valuation-premiums",
      "mega-round-economics",
      "structuring-terms-for-unprecedented-growth-curves",
      "safes-and-uncapped-notes-in-the-ai-era",
      "the-ai-premium-discount-framework",
    ],
  },
  {
    name: "The Future of the VC/Angel Model Itself",
    description: "How AI is reshaping the operating model of investing, not just what gets invested in.",
    topicSlugs: [
      "ai-copilots-for-investors",
      "solo-gps-and-ai-augmented-micro-funds",
      "evergreen-funds-and-continuous-deployment",
      "ai-reshaped-syndicates-and-spvs",
      "algorithmic-underwriting-vs-partner-judgment",
    ],
  },
];

function dirExists(dir: string): boolean {
  return fs.existsSync(dir);
}

function readAiLessonMeta(topicSlug: string, fileName: string): LessonMeta {
  const raw = fs.readFileSync(path.join(AI_INVESTING_DIR, topicSlug, fileName), "utf8");
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

export function getAllAiLessonMeta(): LessonMeta[] {
  if (!dirExists(AI_INVESTING_DIR)) return [];
  const topics = fs
    .readdirSync(AI_INVESTING_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const out: LessonMeta[] = [];
  for (const topicSlug of topics) {
    const topicDir = path.join(AI_INVESTING_DIR, topicSlug);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      out.push(readAiLessonMeta(topicSlug, f));
    }
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAiLessonsByTopic(topicSlug: string): LessonMeta[] {
  const topicDir = path.join(AI_INVESTING_DIR, topicSlug);
  if (!fs.existsSync(topicDir)) return [];
  return fs
    .readdirSync(topicDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readAiLessonMeta(topicSlug, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAiLesson(
  topicSlug: string,
  dateSlug: string,
): Promise<Lesson | null> {
  const full = path.join(AI_INVESTING_DIR, topicSlug, `${dateSlug}.md`);
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

export type AiTopicWithLessonStats = Topic & {
  lesson_count: number;
  latest_date?: string;
};

export function getAiTopicCatalogWithStats(): AiTopicWithLessonStats[] {
  const allLessons = getAllAiLessonMeta();
  const byTopic = new Map<string, LessonMeta[]>();
  for (const lesson of allLessons) {
    const arr = byTopic.get(lesson.topic_slug) ?? [];
    arr.push(lesson);
    byTopic.set(lesson.topic_slug, arr);
  }
  return AI_TOPIC_CATALOG.map((t) => {
    const lessons = byTopic.get(t.slug) ?? [];
    return {
      ...t,
      lesson_count: lessons.length,
      latest_date: lessons[0]?.date,
    };
  });
}

export function getAllAiTopicLessonParams(): { topic: string; slug: string }[] {
  return getAllAiLessonMeta().map((l) => ({ topic: l.topic_slug, slug: l.slug }));
}
