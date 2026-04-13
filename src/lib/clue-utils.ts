export interface ParsedClueContent {
  clue: string;
  forObjective?: string;
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function parseClueContent(content: string): ParsedClueContent {
  const raw = typeof content === "string" ? content : String(content ?? "");
  const trimmed = raw.trim();

  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      const clue =
        asNonEmptyString((parsed as { clue?: unknown }).clue) ??
        asNonEmptyString((parsed as { content?: unknown }).content) ??
        asNonEmptyString((parsed as { text?: unknown }).text) ??
        asNonEmptyString((parsed as { message?: unknown }).message) ??
        trimmed;

      const forObjective =
        asNonEmptyString((parsed as { forObjective?: unknown }).forObjective) ??
        asNonEmptyString((parsed as { objectiveId?: unknown }).objectiveId) ??
        asNonEmptyString((parsed as { objective?: unknown }).objective);

      return { clue, forObjective };
    }
  } catch {
    // plain text clue fallback
  }

  // Plain text parser fallback (handles authored formats like:
  // "for objective: obj_01\nThe clue text" or "[obj_01] The clue text")
  const objectiveMatch = trimmed.match(
    /(?:for\s*objective\s*[:\-]\s*|objective\s*[:\-]\s*|\[)([a-z0-9_\-]+)(?:\])?/i,
  );
  const forObjective = objectiveMatch?.[1]?.trim();

  const clue = trimmed
    .replace(/^(?:for\s*objective\s*[:\-]\s*|objective\s*[:\-]\s*)[a-z0-9_\-]+\s*/i, "")
    .replace(/^\[[a-z0-9_\-]+\]\s*/i, "")
    .trim();

  return { clue: clue || trimmed || raw, forObjective };
}
