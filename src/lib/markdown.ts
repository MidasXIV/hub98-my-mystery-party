import { marked } from "marked";

/**
 * Convert markdown string to HTML.
 *
 * Notes:
 * - Uses `marked` which is already a dependency in this repo.
 * - This function does NOT sanitize output. If any markdown content
 *   comes from untrusted users, run the output through a sanitizer such
 *   as `sanitize-html` or `dompurify` (server-side with JSDOM) before
 *   rendering with `dangerouslySetInnerHTML`.
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Configure marked options for readable HTML from MD
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  // marked.parse can be async depending options; we force sync behavior here.
  const parsed = marked.parse(markdown, { async: false });
  return typeof parsed === "string" ? parsed : "";
}

export type { MarkedOptions } from "marked";
