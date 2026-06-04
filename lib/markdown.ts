import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// Wrap each `## Section X` heading in a colored `<section>` block so the briefing
// CSS can tint it. Only fires when "Section A"–"Section G" headings are present,
// so it is a no-op for lesson/watch prose that has no such headings.
export function addSectionClasses(html: string): string {
  const pattern = /<h2>Section ([A-G])([^<]*)<\/h2>/g;
  if (!pattern.test(html)) return html;
  const wrapped = html.replace(
    pattern,
    (_match, letter: string, rest: string) => {
      const cls = `section-${letter.toLowerCase()}`;
      return `</section><section class="section-block ${cls}"><h2 class="section-heading ${cls}">Section ${letter}${rest}</h2>`;
    },
  );
  // Strip the orphan `</section>` inserted before the first section, then close the last section.
  return wrapped.replace("</section>", "") + "</section>";
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(md);
  return addSectionClasses(String(file));
}
