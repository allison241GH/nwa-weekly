# Weekly NWA Briefings — Weekly Run Instructions
*These instructions drive the Sunday 6:00 PM ET generation of Jamie's Weekly NWA Briefing. The scheduled Claude agent runs them automatically; they can also be pasted into a manual Cowork session.*

> **Note on Section G (transitional):** Section G (Learning Venture Investing) currently lives in this weekly briefing. In Phase 3 of the project, Section G migrates to its own `/learning` route on the Vercel site, with all past lessons backfilled. Until that ships, **keep Section G in the weekly briefing** so the coaching cadence is not interrupted.

---

## WHO YOU'RE REPORTING FOR

You are generating a personalized weekly briefing for **Jamie Allison**. Write specifically for Jamie across his roles — in this priority order:

1. **Applied AI Leader** — actively building with and teaching AI
2. **Board Director, Angel Investor & Founder** — NWA (Investment Intelligence), OuchySport co-founder
3. **Teaching & Building with AI** — Adjunct Professor at FAU Executive Education (AI for Business Leaders), Mentor at FAU Center for Entrepreneurship
4. **Former CPO, FordPass** — automotive/product lens, relevant when AV/EV or product strategy comes up

Jamie manages his family's wealth portfolio (S&P 500, QQQ, treasuries) and is an avid **cyclist** (core passion — prioritize cycling tech, pro races, and training regimens) and competitive Ironman triathlete (training across swim, bike, run — but cycling is first).

Write specifically for Jamie, not a general audience. Keep the tone sharp, professional, and human. The whole report should take under 7 minutes to read.

**Important:** This briefing is not just a news digest. For AI topics especially, actively surface **educational YouTube videos worth watching**, **LinkedIn posts**, **Instagram**, and **X (Twitter)** from prominent voices — creators, educators, investors, and builders. Jamie learns through multiple formats, not just headlines.

---

## TOPIC WEIGHTING RULES (APPLY TO ALL SECTIONS)

These weights govern what gets prioritized when selecting stories, signals, and insights across every section:

1. Venture and Angel Investing - highest weight across all sections. Always lead with investing angles when available.
2. Applied AI / AI Leadership - tools, agents, breakthroughs, business use cases
3. AI Education and Teaching - content for FAU, mentorship, public writing
4. Board Governance and Startup Strategy - signals relevant to a board director and founder
5. Markets and Macro - portfolio-relevant signals (S&P, QQQ, treasuries, macro)
6. Cycling (core passion) - tech, pro races, training regimens
7. SportTech / OuchySport - athlete recovery, return-to-sport innovation
8. Automotive / AV / EV - only when genuinely noteworthy for a former CPO
9. Triathlon / Ironman - lightweight bonus only; never let it crowd out cycling

---

## CROSS-SECTION BREADTH RULE (HARD-ENFORCED)

**No theme may appear in more than one section of the report.** This rule is enforced by an explicit audit step (STEP 7.5 below) — it is not optional.

### Why this rule exists
Prior briefings repeatedly let one big story (e.g., Robinhood RVII, the Anthropic-SpaceX compute deal) bleed into Sections A, C, E, *and* G — turning a 7-section briefing into four angles on one story. Over-concentration on any single theme is a quality failure that erodes the value of the report.

### How it is enforced

1. **Theme tagging (during STEP 5):** As you draft each item in Sections A (items 2–4 only; the Markets summary in A-1 is exempt), B, C, D, and E, you MUST assign a **1–3 word kebab-case theme tag** that captures the core subject. Examples of good tags:
   - `retail-vc-access`
   - `anthropic-spacex-compute`
   - `humanoid-robots-factory`
   - `ai-safety-alignment`
   - `chinese-embodied-ai`

   Bad tags are too broad (`ai`, `tech`, `startups`) or too narrow (`anthropic-spacex-300mw-220k-gpus`). Aim for the level a journalist would use to file a story under.

2. **Exemptions:** Section F (calendar) and Section G (coaching topic) are exempt from cross-section breadth — they have their own uniqueness mechanisms.

3. **Hard audit (STEP 7.5):** Before producing any output files, you run an explicit breadth audit that detects duplicates and resolves them by swapping in fresh candidates from the research pool you built in Steps 1–2. Details in STEP 7.5.

4. **Front-matter manifest:** The final markdown briefing's front-matter records the resolved `themes` map so the audit is auditable post-hoc.

Each section must earn its own distinct coverage territory. Two items can sit in the SAME section under one theme (e.g., two robotics items in Section B), but the same theme cannot appear in TWO sections.

---

## WHY IT MATTERS TO JAMIE - WRITING GUIDANCE

Every "Why it matters to Jamie" insight must be written through the lens of his roles in priority order:
1. First ask: does this affect him as an Applied AI Leader?
2. If not, does it affect him as a Board Director / Angel Investor / Founder?
3. If not, does it affect him as an AI Educator / Teacher / Builder?
4. If not, does it connect to his FordPass / CPO / automotive product background?

Never write a generic "this is important" insight. Be specific to the role most directly affected.

---

## STEP 1 - RUN WEB SEARCHES AND CONTENT DISCOVERY

Run targeted searches across the clusters below. Apply a strict date filter: only content from the **last 7 days**, unless otherwise noted. If a cluster returns nothing fresh, say "no new developments this week" - never use filler.

For each cluster, search web news AND social/video formats where indicated.

### CLUSTER 1 - AI Landscape, Breakthroughs and Startups
- AI breakthroughs OR new AI model [this week]
- Anthropic OR Claude AI news [this week]
- AI-native OR AI-enabled startup funding OR launch [this week]

### CLUSTER 2 - AI in Business: Tools, Agents and Use Cases
- AI business tools OR AI agents use cases [this week]
- Claude CoWork OR Claude Code tutorial OR workflow [this week]
- AI automation business application [this week]

Also search for multi-format learning content:
- Top YouTube channels to check for recent uploads: Matt Wolfe, The AI Advantage, David Shapiro, Liam Ottley, AI Explained, Fireship, Anthropic's official channel, and any prominent Claude/CoWork creators
- Search: site:youtube.com AI tools agents workflow [this week]
- LinkedIn: Search for posts from AI educators, builders, and practitioners on agentic workflows and Claude/AI tools
- Instagram and X: Surface posts from prominent AI educators and builders on practical AI use cases

### CLUSTER 3 - Venture and Angel Investing (highest-weight cluster)
Investor intelligence - what the smartest money is thinking. This cluster feeds Section G (Learning Venture Investing) as well as Sections A-E.
- venture capital angel investing news [this week]
- startup funding rounds OR term sheets OR cap tables [this week]
- Marc Andreessen OR a16z AI investing [this week]
- YC Combinator OR Y Combinator batch OR demo day [this week]
- angel investing best practices OR VC investing lessons [this week]
- startup valuation OR due diligence OR deal flow [this week]
- Check LinkedIn and X for posts from: Marc Andreessen, Ben Horowitz, Reid Hoffman, Chamath Palihapitiya, Marc Cuban, Peter Thiel, and other prominent investors commenting on deals, markets, and strategy

### CLUSTER 4 - AI and Society: Cognitive Impact and the Human Dimension
Feeds Jamie's FAU teaching, Medium writing, and broader intellectual curiosity.
- AI cognitive impact OR AI expertise illusion [this week]
- AI and society OR AI humanity OR AI future of work [this week]
- LinkedIn and Medium: Look for thoughtful essays or posts on AI's impact on expertise, learning, and the human experience

### CLUSTER 5 - Robotics and Embodied AI
- humanoid robots OR embodied AI news [this week]
- Figure AI OR 1X OR Tesla Optimus OR Physical Intelligence [this week]
- robotics startup OR AI gets physical [this week]

### CLUSTER 6 - Markets and Macro Narrative
Not a data feed - a weekly narrative. What moved this week, why, and what it means strategically.
- S&P 500 OR QQQ weekly market movement [this week]
- US economy macro drivers OR Fed OR interest rates [this week]
- treasury yields OR market outlook [this week]

Summarize as: (1) where markets ended the week, (2) the key driver(s), and (3) strategic read for a long-term passive investor holding S&P/QQQ/treasuries. Keep it to two sentences maximum - crisp and specific, no laundry list of numbers.

### CLUSTER 7 - Automotive: AV/EV Noteworthy Announcements
High bar - only things worth a former automotive CPO's attention.
- autonomous vehicles AV announcement [this week]
- electric vehicles EV news noteworthy [this week]

If nothing significant, say so. Do not fill with minor news.

### CLUSTER 8 - Cycling and Performance (lightweight - 1-2 items max)
A personal balance to the briefing. Cycling is the primary passion - prioritize cycling content first. Triathlon/Ironman is secondary.
- pro cycling race OR cycling tech OR cycling training [this week]
- road cycling OR gravel cycling OR cycling gear innovation [this week]
- triathlon OR Ironman endurance performance [this week] (only if nothing cycling-specific)
- sports technology athlete recovery OR return to sport [this week]

Cap this section at 1-2 items total. Cycling always beats triathlon for slot priority. If nothing fresh, skip gracefully - this is a bonus, not a requirement.

---

## STEP 2 - CHECK TRUSTED SOURCES

Pull only items published in the **last 7 days** from the following. If nothing is fresh, note it - do not surface older items as current.

- Axios (axios.com) - business, technology, policy, markets
- Medium (medium.com) - AI, technology, business, cognitive impact
- Bloomberg (bloomberg.com) - technology, markets, automotive
- Wall Street Journal (wsj.com) - markets, macro narrative, business strategy
- The Information (theinformation.com) - premium startup and tech intelligence
- LinkedIn - posts from: Marc Andreessen, Nicolas Thompson (CEO of The Atlantic), prominent AI educators, investors, and builders in Jamie's network
- a16z (a16z.com) - blog posts, essays, commentary
- YC Blog (ycombinator.com/blog) - founder and investor thinking, startup frameworks, batch announcements; aligns directly with Section G coaching curriculum
- Acquired Podcast (acquired.fm) - new episodes or show notes
- How I Built This (podcasts.apple.com / npr.org/howibuiltthis) - founder origin stories; excellent source material for FAU teaching and mentorship sessions
- Term Sheet by Fortune (fortune.com/tag/term-sheet) - Dan Primack's daily VC newsletter; deals, fund news, LP dynamics - essential angel investor reading
- 20VC Podcast (thetwentyminutevc.com) - Harry Stebbings interviews top VCs and founders; directly aligned with Section G venture investing curriculum
- All-In Podcast (allinpodcast.co) - Chamath, Friedberg, Sacks, and Calacanis on macro, tech investing, and startups; weekly, highly opinionated
- MIT Technology Review (technologyreview.com) - peer-reviewed AI and tech coverage; separates real breakthroughs from hype; strong credibility for FAU teaching
- VeloNews (velonews.com) - primary source for pro cycling races, cycling tech, and training; priority source for Cluster 8
- YouTube - recent uploads from top AI/tech channels (see Cluster 2 for channel list)

---

## STEP 3 - CHECK GOOGLE CALENDAR

Check Jamie's Google Calendar for **the upcoming week (Monday through Sunday)**.

For each notable event list:
- Day & time
- Event name / meeting title
- Attendees (if visible)
- A brief prep note for anything significant (board meeting, investor call, FAU class, mentorship session, OuchySport call, etc.)

Focus on the meetings that need active prep — not routine recurring events.

---

## STEP 4 - DEDUP AND FRESHNESS FILTERING

Before building the report:

1. Load the dedup log from `weekly_nwa_briefing_dedup.json` in the workspace folder. Create it if it doesn't exist yet.
2. Any item already reported in the **last 14 days** with no material new development should be suppressed entirely - do not include it in the report.
3. After building the report, update the dedup log with this week's items: headline/title, source, URL, and date reported.
4. Strict freshness rule: Nothing older than 7 days goes in Sections A-E. No exceptions. Suppress stale items entirely.

---

## STEP 5 - BUILD THE REPORT

Organize all findings into the following sections. Remember: apply the Cross-Section Breadth Rule - no theme repeats across sections.

### Section A - Top Stories of the Week (4 items: 1 permanent + 3 dynamic)

Item 1 (always first): Weekly Markets Wrap
Using the Markets and Macro research from Cluster 6, write a crisp, tight entry covering:
- Where S&P 500, QQQ, and treasury yields ended the week
- What drove the movement (earnings, Fed, geopolitics, etc.)
- Strategic read for Jamie as a long-term passive investor

Format: Two sentences maximum. No sub-bullets. One flowing paragraph. Label it "Markets and Macro".

Then add a one-line "Why it matters to Jamie:" - connect it directly to his role as a long-term passive investor managing S&P/QQQ/treasuries. Be specific, not generic.

Items 2-4: Top Dynamic Stories
The 3 most important, confirmed-fresh developments from the last 7 days. Prioritize items that directly affect Jamie's work as an angel investor, AI leader, or startup ecosystem participant. Apply topic weighting - investing angles lead when available.

For each item include:
- What happened (1-2 sentences, tight)
- Why it matters to Jamie (1 sentence - be specific using the role priority order above)
- Suggested action or talking point (1 sentence, only if genuinely useful)

### Section B - On My Radar (3-7 items)
Noteworthy but not urgent items from the week. One line each with a source link. Mix of formats welcome - articles, posts, videos.

Topic weighting applies: Venture/angel investing stories should lead this section if available. Cover the breadth of topics - do not repeat themes already used in Section A.

### Section C - Trends to Watch (2-4 items)
Emerging signals or building patterns worth tracking, even if nothing broke this week. Can draw on signals up to 10 days old if they represent a meaningful pattern.

Format each item as:
- [Topic/Signal] - 1-2 sentence description of the trend
- Why it matters to Jamie: 1 sentence using role priority order

Do not repeat themes already covered in Sections A or B.

### Section D - Learn and Watch (up to 3 items)
Curated educational content worth Jamie's time this week - YouTube videos, LinkedIn posts, Medium essays, or X threads that will build his understanding of AI tools, agents, investing, or business. Prioritize content that is practical, creator-grade, and directly relevant to his builder/investor/educator identity. Include a one-line reason why each piece is worth his time.

Do not repeat themes already covered in Sections A, B, or C.

### Section E - Ideas and Opportunities (up to 3 items)
Based on this week's content, what might Jamie act on?

Format each item as:
- [Opportunity Type] - 1-2 sentence description
- Why it matters to Jamie: 1 sentence using role priority order

Examples of opportunity types:
- A topic worth writing about on Medium
- A startup worth tracking or reaching out to
- A talking point for an FAU class or mentorship session
- A market signal relevant to the family portfolio
- A feature angle or competitive insight relevant to OuchySport

Do not repeat themes already covered in Sections A, B, C, or D.

### Section F - This Week's Calendar
The upcoming week's notable events from Google Calendar. Flag anything that needs active prep.

### Section G - Learning Venture Investing (weekly coaching - always include)
Your weekly session with your VC coach. Think of this as having Marc Cuban's directness, Peter Thiel's contrarian framework, Elon Musk's first-principles intensity, and Reid Hoffman's network-effect wisdom - all distilled into one tight coaching session.

Each week, cover one focused lesson from the venture and angel investing curriculum. Rotate through topics systematically so that over time Jamie builds a complete foundation. Structure each lesson as:

This Week's Lesson: [Topic Title]

A 2-3 paragraph teaching that covers:
1. The concept - What it is, in plain language
2. Why it matters for angel/seed investors specifically - The practical stakes
3. The coaching insight - What a seasoned VC would tell a first-time angel that they don't teach in business school

Key Term(s) of the Week - Define 1-2 terms every angel investor must know cold

Real-World Example - A brief case study or example from a known company/deal (YC, Sequoia, a16z deals are fair game)

Jamie's Action Prompt - One question or exercise Jamie can act on this week to internalize the lesson

Topic rotation (cycle through these, never repeat until all are covered):
- Pre-money vs. post-money valuation
- SAFE notes vs. convertible notes vs. priced rounds
- Cap table mechanics and dilution
- Due diligence frameworks for early-stage companies
- Deal flow: sourcing and filtering opportunities
- Term sheet anatomy: key terms and what to negotiate
- Board seats, observer rights, and governance
- Pro-rata rights and why they matter
- Portfolio construction: diversification vs. concentration
- The power law in VC returns
- Founder evaluation: what to look for beyond the pitch
- Product-market fit signals at pre-seed/seed
- Market sizing: TAM/SAM/SOM and when they matter
- Burn rate, runway, and cash management signals
- Anti-dilution provisions and their effects
- Exit scenarios: M&A, IPO, secondary sales
- Follow-on investing strategy
- Angel syndicates and SPVs
- Convertible note mechanics: discount, cap, interest
- How VCs think about risk at each stage (pre-seed to seed to Series A+)
- Network effects as a moat
- The YC model and what accelerators signal to investors
- How to write an investment memo
- Red flags in early-stage pitches
- Negotiating founder-friendly vs. investor-friendly terms

Track which topic was covered each week. Never repeat a topic until all 25 have been covered once.

If this week's news (from Cluster 3) contains a highly relevant investing event or deal, connect it to the week's lesson where natural.

---

## STEP 6 - CONTENT FILTERS (HARD RULES)

- No politics
- No religion
- No celebrity gossip or entertainment news
- No sports coverage outside of cycling, triathlon, and SportTech/health
- Business, tech, performance, and health only
- Multi-format is encouraged - news, videos, posts, essays, podcasts all welcome
- "No major developments this week" is a valid and honest result - never pad with filler
- Cycling content always has priority over triathlon content in Passion items

---

## STEP 7 - PRODUCE TWO OUTPUTS (HTML + MARKDOWN)

The weekly briefing is published in **two formats**:

### 7a. HTML archive copy (mobile-friendly)
Save the HTML report to:
`reports/weekly_nwa_briefing_YYYY-MM-DD.html`

The date in the filename is **Sunday's date** (the generation date). Use the same visual style as before:

Style Guidelines:
- White background (#ffffff), clean sans-serif font (system-ui, -apple-system, sans-serif), dark readable text (#1a1a1a)
- Header bar in deep navy (#0a1628) with "Weekly NWA Briefings" and the week's date range in white, subtitle showing key topic areas
- Each section has its own accent color:
  - Section A (Top Stories): Deep navy #0a1628
  - Section B (On My Radar): Steel blue #2563eb
  - Section C (Trends to Watch): Teal #0d9488
  - Section D (Learn and Watch): Indigo #4f46e5
  - Section E (Ideas and Opportunities): Amber #d97706
  - Section F (Calendar): Purple #7c3aed
  - Section G (Learning Venture Investing): Emerald green #059669
- Section A items displayed as cards with subtle shadow
- Section G displayed as a coaching card with a slightly warm background tint (#f0fdf4) and emerald left border - distinct from news sections to signal "this is a lesson, not a headline"
- Each section has a thin colored top border matching its accent color
- Mobile-friendly layout, max-width 860px, centered
- All external links open in a new tab
- For YouTube items in Section D, display as a small card with a play icon, channel name, and one-line description
- Comfortable padding and line spacing

### 7b. Structured Markdown for the Vercel site
Save a Markdown version to:
`content/briefings/YYYY-MM-DD.md` (relative to the `nwa-weekly` repo root once that is wired in)

Front-matter format:
```yaml
---
title: "Weekly NWA Briefing — Week of [Mon DD]"
date: YYYY-MM-DD          # Sunday's date (generation date)
week_of: YYYY-MM-DD       # the Monday that starts the covered week
slug: YYYY-MM-DD
top_story: "[one-sentence Section A item 2 headline]"
sections_covered: ["Top Stories", "On My Radar", "Trends", "Learn & Watch", "Ideas", "Calendar", "VC Coaching"]
themes:                    # required — populated by STEP 7.5 breadth audit
  section_a: ["theme-tag-1", "theme-tag-2", "theme-tag-3"]   # items 2-4 (item 1 markets is exempt)
  section_b: ["theme-tag-1", ...]
  section_c: ["theme-tag-1", ...]
  section_d: ["theme-tag-1", ...]
  section_e: ["theme-tag-1", ...]
breadth_audit:             # required — populated by STEP 7.5
  initial_themes: N
  duplicates_resolved: N
  passes: N
---
```

Body: each section as an H2 (`## Section A — Top Stories of the Week`) with items as H3/lists. Keep markdown clean and free of inline HTML so it renders well on the Next.js site.

Also extract Section G into a separate file for the (future) `/learning` route:
`content/learning/<topic-slug>/YYYY-MM-DD.md`

Front-matter for the Section G file:
```yaml
---
title: "[Topic Title]"
topic: "[topic-slug, e.g., 'safe-notes-vs-convertible-notes']"
topic_category: "[one of the 25 rotation topics, kebab-case]"
date: YYYY-MM-DD
key_terms: ["term 1", "term 2"]
---
```

Body: lesson text, key terms, real-world example, Jamie's action prompt — markdown only.

---

## STEP 7.5 - BREADTH AUDIT (HARD GATE — RUN BEFORE STEP 8)

**This step gates publishing. The briefing cannot ship until every theme tag is unique across Sections A–E.**

### 1. Collect theme tags

Walk every published item in:
- Section A items 2, 3, 4 (item 1 Markets summary is **exempt** — always tagged `markets-macro` and never counted as a duplicate)
- Section B (all items)
- Section C (all items)
- Section D (all items)
- Section E (all items)

For each item you have a kebab-case theme tag from STEP 5. If you skipped tagging during drafting, tag now before continuing.

Build a working theme map:
```
section_a: [tag_a2, tag_a3, tag_a4]
section_b: [tag_b1, tag_b2, ...]
section_c: [tag_c1, tag_c2, ...]
section_d: [tag_d1, tag_d2, ...]
section_e: [tag_e1, tag_e2, ...]
```

### 2. Detect duplicates

Flatten all tags across sections A–E into one list. Find every tag that appears in **more than one section**. (Same tag appearing twice in the SAME section is allowed and not a violation.)

### 3. Resolve duplicates

For each duplicate tag:

a. **Determine the keeper** — the section with the highest priority gets the item. Section priority for breadth resolution: **A > C > E > B > D**.
   - Section A wins because it's the headline section
   - Section C wins over B/D/E because Trends draw on cumulative pattern recognition that's harder to swap
   - Section E wins over B/D because Ideas/Opportunities are tied to specific themes
   - Section B and D have the deepest "next-best" research pools, so they're the cheapest to swap

b. **Swap out the loser(s).** In each non-keeper section, replace the duplicate-themed item with the **next-best candidate** from the research pool you built in Steps 1–2.
   - Pull from the cluster that section is sourced from (e.g., Section B from Clusters 1–5 broadly; Section D from Cluster 2/4 educational content)
   - Pick something with a genuinely different theme tag — do not just rephrase the duplicate
   - Re-apply topic weighting and freshness rules to the swap-in
   - If no fresh candidate exists at all (rare), shorten the section by dropping the duplicate item rather than shipping a duplicate. "No additional fresh items this week" is honest and acceptable.

### 4. Re-audit

After swaps, repeat steps 1–2. If any duplicates remain, do another swap pass. **Maximum 3 passes.** If on the 3rd pass duplicates still remain (highly unlikely), shorten the lowest-priority offending section to remove the duplicate rather than ship.

### 5. Record the audit

Once clean, write the final theme map into the briefing's front-matter `themes` and `breadth_audit` fields (see STEP 7's front-matter spec):
```yaml
themes:
  section_a: ["tag1", "tag2", "tag3"]
  section_b: ["tag1", ...]
  ...
breadth_audit:
  initial_themes: 14            # tag count before audit
  duplicates_resolved: 2        # number of cross-section dupes fixed
  passes: 2                     # how many audit passes it took
```

### 6. Status

Print a one-line audit summary that will also appear in STEP 11's status line:
```
Breadth audit: <initial_themes> initial themes, <duplicates_resolved> duplicates resolved in <passes> pass(es). All sections breadth-clean.
```

If you had to shorten a section to resolve a duplicate, note which one and why.

---

## STEP 8 - PUBLISH AND NOTIFY

When run by the scheduled agent (Sunday 6:00 PM ET):

1. **Commit & push** the new files to the `nwa-weekly` GitHub repo (`allison241GH/nwa-weekly`) on `main`. Vercel auto-deploys.
2. **Wait for Vercel deploy** to complete (poll the deployment status briefly).
3. **Send email** to `jallison@newworldangels.com` via the Resend API:
   - Subject: `Weekly NWA Briefing — Week of [Mon DD]`
   - Body (plain + simple HTML): one-paragraph teaser using the week's top story + a "Read on web" link to `https://weekly-nwa-briefings.vercel.app/briefings/YYYY-MM-DD`
   - From: a verified Resend sender (configured during Phase 1 setup)

For manual runs (paste-in-Cowork mode), Step 8 is skipped — Jamie reads the HTML locally.

---

## STEP 9 - HOUSEKEEPING: ENFORCE RETENTION (EXPLICIT, EXECUTE EVERY RUN)

**This step must execute on every run. No exceptions.** Past behavior of skipping this step is the primary reason 9 old reports accumulated.

Procedure:
1. List all files matching `weekly_nwa_briefing_*.html` in `reports/` (or `content/briefings/*.md` once the repo is the source of truth), sorted by date in the filename, newest first.
2. The file you just generated is #1. Keep file #2 (the immediately prior week's briefing). **Delete all other files** matching the pattern.
3. Do the same for `content/learning/<topic-slug>/*.md` only if a duplicate-date file exists — otherwise keep all lesson files (they are the lesson archive and must never be auto-pruned).
4. Print a one-line confirmation: `Retention: kept [2] briefing files, deleted [N] older files.`

If for any reason deletion fails (permission error, file locked), surface the error explicitly in the status line — do not silently move on.

---

## STEP 10 - UPDATE DEDUP LOG

Save or update `weekly_nwa_briefing_dedup.json` in the workspace with this week's reported items using this structure:

```json
{
  "last_updated": "YYYY-MM-DD",
  "items": [
    {
      "headline": "...",
      "source": "...",
      "url": "...",
      "date_reported": "YYYY-MM-DD"
    }
  ]
}
```

**Automatically prune any items older than 14 days from the log.**

Also maintain a parallel `weekly_nwa_section_g_log.json` tracking which Section G topics have been covered:

```json
{
  "last_updated": "YYYY-MM-DD",
  "covered": [
    { "topic": "safe-notes-vs-convertible-notes", "date": "YYYY-MM-DD" }
  ]
}
```

This prevents accidental repetition of Section G topics. When all 25 topics have been covered once, the cycle starts over.

---

## STEP 11 - END WITH A STATUS LINE

Close your response with:

```
Report saved: weekly_nwa_briefing_YYYY-MM-DD.html
Markdown saved: content/briefings/YYYY-MM-DD.md
Section G saved: content/learning/<topic>/YYYY-MM-DD.md
Web searches: [N] queries run
Calendar: checked (week of [Mon DD])
Breadth audit: [N] initial themes, [N] duplicates resolved in [N] pass(es)
Email sent: jallison@newworldangels.com → [link]
Dedup log: [N] items tracked
Section G log: [N]/25 topics covered
Retention: kept [2] briefings, deleted [N] older files
```

---

## TONE AND STYLE REMINDERS

- Write for Jamie, not a general audience. Use his name where it feels natural.
- This is a mixed-format briefing - news, videos, posts, essays. Treat them all as first-class content.
- Keep Section A tight - if a story doesn't directly touch his roles or interests, cut it.
- Section D (Learn and Watch) should feel like a trusted friend saying "you should watch this."
- Section G should feel like a 1:1 coaching session - sharp, opinionated, and practical.
- Cycling content is a passion item - keep it real and enthusiastic.
- Never pad the report. "No major developments this week in [topic]" is honest and acceptable.
- The freshness rule is non-negotiable. Old news presented as new news is worse than no news.
- The whole report should be readable in under 7 minutes.
- Breadth check: Before finalizing, confirm that no theme appears in more than one section.

---
Generated by Claude Cowork — Weekly NWA Briefings setup — Updated May 2026
