import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";

const ROOT = process.cwd();
const BRIEFINGS_DIR = path.join(ROOT, "content", "briefings");
const LEARNING_DIR = path.join(ROOT, "content", "learning");

// gray-matter's YAML parser auto-converts unquoted `date: 2026-07-03`-style front matter
// into native Date objects instead of strings — normalize back to "YYYY-MM-DD" here so
// every caller gets a real string, not a Date wearing a `string` type assertion.
export function toISODate(value: unknown, fallback: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return fallback;
}

export function toISODateOptional(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return undefined;
}

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

export type Topic = {
  slug: string;
  title: string;
  blurb: string;
};

export type LessonMeta = {
  topic_slug: string;
  slug: string; // the date-based slug, e.g., "2026-05-12"
  title: string;
  date: string;
  key_terms?: string[];
};

export type Lesson = LessonMeta & {
  contentHtml: string;
};

// The 26-topic Section G rotation. Order matches the instructions file.
export const TOPIC_CATALOG: Topic[] = [
  { slug: "pre-money-vs-post-money-valuation", title: "Pre-money vs. Post-money Valuation", blurb: "Why the same dollar amount can mean very different ownership stakes." },
  { slug: "safe-notes-vs-convertible-notes-vs-priced-rounds", title: "SAFE Notes vs. Convertible Notes vs. Priced Rounds", blurb: "How money goes in, and what each instrument actually gives you." },
  { slug: "cap-table-mechanics-and-dilution", title: "Cap Table Mechanics and Dilution", blurb: "Reading a cap table — and how each round redistributes ownership." },
  { slug: "due-diligence-frameworks", title: "Due Diligence Frameworks for Early-Stage Companies", blurb: "What to actually verify before writing the check." },
  { slug: "deal-flow-sourcing-and-filtering", title: "Deal Flow: Sourcing and Filtering Opportunities", blurb: "Building proprietary deal flow and saying no efficiently." },
  { slug: "term-sheet-anatomy", title: "Term Sheet Anatomy — Key Terms and What to Negotiate", blurb: "The economic and control terms that actually determine returns." },
  { slug: "board-seats-observer-rights-governance", title: "Board Seats, Observer Rights, and Governance", blurb: "When governance rights matter — and when they don't." },
  { slug: "pro-rata-rights", title: "Pro-Rata Rights and Why They Matter", blurb: "The right to defend your ownership in the winners." },
  { slug: "portfolio-construction", title: "Portfolio Construction: Diversification vs. Concentration", blurb: "How many bets to make and how to size them." },
  { slug: "power-law-vc-returns", title: "The Power Law in VC Returns", blurb: "Why a few outliers carry the entire portfolio." },
  { slug: "founder-evaluation", title: "Founder Evaluation: What to Look For Beyond the Pitch", blurb: "Reading the founder, not just the deck." },
  { slug: "product-market-fit-signals", title: "Product-Market Fit Signals at Pre-Seed/Seed", blurb: "Distinguishing real traction from vanity metrics." },
  { slug: "market-sizing-tam-sam-som", title: "Market Sizing: TAM/SAM/SOM and When They Matter", blurb: "Honest market math, and when 'big TAM' is a red flag." },
  { slug: "burn-rate-and-runway", title: "Burn Rate, Runway, and Cash Management Signals", blurb: "Reading capital efficiency from the financials." },
  { slug: "anti-dilution-provisions", title: "Anti-Dilution Provisions and Their Effects", blurb: "Full ratchet vs. weighted average — and who actually pays for a down round." },
  { slug: "exit-scenarios", title: "Exit Scenarios: M&A, IPO, Secondary Sales", blurb: "How angels actually get liquid — and the trade-offs of each path." },
  { slug: "follow-on-investing-strategy", title: "Follow-On Investing Strategy", blurb: "Doubling down on winners — and the bias trap of doing it for losers." },
  { slug: "angel-syndicates-and-spvs", title: "Angel Syndicates and SPVs", blurb: "Pooling capital, accessing better deals, and the lead's economics." },
  { slug: "convertible-note-mechanics", title: "Convertible Note Mechanics — Discount, Cap, Interest", blurb: "The three mechanics that determine if you got a great deal or a mediocre one." },
  { slug: "risk-at-each-stage", title: "How VCs Think About Risk at Each Stage", blurb: "Pre-seed, seed, Series A+ — different bets, different evaluation frameworks." },
  { slug: "network-effects-as-a-moat", title: "Network Effects as a Moat", blurb: "When network effects are real, and when they're claimed but absent." },
  { slug: "yc-and-accelerators", title: "The YC Model and What Accelerators Signal to Investors", blurb: "What accelerator pedigree actually tells you about a company." },
  { slug: "investment-memo", title: "How to Write an Investment Memo", blurb: "The discipline that forces you to make your thesis explicit." },
  { slug: "red-flags-in-pitches", title: "Red Flags in Early-Stage Pitches", blurb: "The patterns that should make you pass — and the ones that shouldn't." },
  { slug: "founder-friendly-vs-investor-friendly-terms", title: "Founder-Friendly vs. Investor-Friendly Terms", blurb: "Negotiating tradeoffs without poisoning the relationship." },
  { slug: "fundable-vs-investable", title: "Fundable vs. Investable", blurb: "Why a great pitch and a great business are two different questions." },
];

const TOPIC_BY_SLUG: Map<string, Topic> = new Map(
  TOPIC_CATALOG.map((t) => [t.slug, t]),
);

// Reference taxonomy for the 26-topic core curriculum, plus one forward-looking
// category with no core topics yet — it's fed entirely by the dynamic "advanced tier"
// (lessons picked from live research once the core rotation completes). Static
// reference only; not used to drive rotation logic.
export type LearningCategory = {
  name: string;
  description: string;
  topicSlugs: string[];
  futureThemes?: string[];
};

export const LEARNING_CATEGORIES: LearningCategory[] = [
  {
    name: "Deal Structuring & Terms",
    description: "Instruments, valuation, cap tables, and the protective provisions that decide who wins in a down round.",
    topicSlugs: [
      "pre-money-vs-post-money-valuation",
      "safe-notes-vs-convertible-notes-vs-priced-rounds",
      "convertible-note-mechanics",
      "cap-table-mechanics-and-dilution",
      "term-sheet-anatomy",
      "anti-dilution-provisions",
      "pro-rata-rights",
      "founder-friendly-vs-investor-friendly-terms",
    ],
  },
  {
    name: "Founder & Team Evaluation",
    description: "Reading the person and the pitch — signal versus story.",
    topicSlugs: ["founder-evaluation", "red-flags-in-pitches"],
  },
  {
    name: "Market & Product Evaluation",
    description: "Sizing the opportunity and testing whether the product actually has legs.",
    topicSlugs: ["product-market-fit-signals", "market-sizing-tam-sam-som", "network-effects-as-a-moat"],
  },
  {
    name: "Financial & Business Diligence",
    description: "Stress-testing the numbers and the underlying business case.",
    topicSlugs: ["due-diligence-frameworks", "burn-rate-and-runway", "fundable-vs-investable"],
  },
  {
    name: "Governance & Control",
    description: "Board seats, voting rights, and who actually controls the company after the round.",
    topicSlugs: ["board-seats-observer-rights-governance"],
  },
  {
    name: "Portfolio Strategy & Returns",
    description: "How many bets, how sized, and why a handful of outcomes carry the whole portfolio.",
    topicSlugs: ["portfolio-construction", "power-law-vc-returns", "follow-on-investing-strategy", "risk-at-each-stage"],
  },
  {
    name: "Deal Sourcing & Ecosystem",
    description: "Where deals come from, who else is in them, and how to write up your own thesis.",
    topicSlugs: ["deal-flow-sourcing-and-filtering", "angel-syndicates-and-spvs", "yc-and-accelerators", "investment-memo"],
  },
  {
    name: "Exit & Liquidity",
    description: "How angels actually get paid — M&A, IPO, and secondaries.",
    topicSlugs: ["exit-scenarios"],
  },
  {
    name: "Venture Investing in the Age of AI",
    description: "How AI is reshaping deal sourcing, founder evaluation, moat economics, and the syndicate/VC model itself — the newest category, fed entirely by future dynamic-tier lessons.",
    topicSlugs: [],
    futureThemes: [
      "AI-Native Deal Sourcing & Diligence",
      "Moat Economics for AI-Era Startups",
      "Compressed Fundraising Cycles & Founder Evaluation in the AI Era",
      "The AI-Powered Syndicate & the Future of VC Fund Operations",
      "Valuation Discipline in an AI Hype Cycle",
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPIC_BY_SLUG.get(slug);
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) return false;
  return true;
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
        date: toISODate(data.date, slug),
        week_of: toISODateOptional(data.week_of),
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
    date: toISODate(data.date, slug),
    week_of: toISODateOptional(data.week_of),
    top_story: data.top_story as string | undefined,
    sections_covered: data.sections_covered as string[] | undefined,
    contentHtml,
  };
}

function readLessonMeta(topicSlug: string, fileName: string): LessonMeta {
  const raw = fs.readFileSync(path.join(LEARNING_DIR, topicSlug, fileName), "utf8");
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

export function getAllLessonMeta(): LessonMeta[] {
  if (!ensureDir(LEARNING_DIR)) return [];
  const topics = fs
    .readdirSync(LEARNING_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const out: LessonMeta[] = [];
  for (const topicSlug of topics) {
    const topicDir = path.join(LEARNING_DIR, topicSlug);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      out.push(readLessonMeta(topicSlug, f));
    }
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLessonsByTopic(topicSlug: string): LessonMeta[] {
  const topicDir = path.join(LEARNING_DIR, topicSlug);
  if (!fs.existsSync(topicDir)) return [];
  return fs
    .readdirSync(topicDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readLessonMeta(topicSlug, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getLesson(
  topicSlug: string,
  dateSlug: string,
): Promise<Lesson | null> {
  const full = path.join(LEARNING_DIR, topicSlug, `${dateSlug}.md`);
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

export type TopicWithLessonStats = Topic & {
  lesson_count: number;
  latest_date?: string;
};

export function getTopicCatalogWithStats(): TopicWithLessonStats[] {
  const allLessons = getAllLessonMeta();
  const byTopic = new Map<string, LessonMeta[]>();
  for (const lesson of allLessons) {
    const arr = byTopic.get(lesson.topic_slug) ?? [];
    arr.push(lesson);
    byTopic.set(lesson.topic_slug, arr);
  }
  return TOPIC_CATALOG.map((t) => {
    const lessons = byTopic.get(t.slug) ?? [];
    return {
      ...t,
      lesson_count: lessons.length,
      latest_date: lessons[0]?.date,
    };
  });
}

export function getAllTopicLessonParams(): { topic: string; slug: string }[] {
  return getAllLessonMeta().map((l) => ({ topic: l.topic_slug, slug: l.slug }));
}

export function getAllTopicSlugsWithLessons(): string[] {
  const lessons = getAllLessonMeta();
  return Array.from(new Set(lessons.map((l) => l.topic_slug)));
}
