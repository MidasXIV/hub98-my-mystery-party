/* eslint-disable @typescript-eslint/no-explicit-any */

export interface LetterData {
  letterhead: string;
  heading: string;
  content: string;
  sign: string;
  footer: string;
  variant: "standard" | "cliche" | "chic" | "handwritten";
  hideLetterhead: boolean;
  hideFooter: boolean;
}

const DEFAULT_LETTER: LetterData = {
  letterhead: "Private Correspondence",
  heading: "To whom it may concern,",
  content: "No message content provided.",
  sign: "— Unknown",
  footer: "Filed as evidence",
  variant: "standard",
  hideLetterhead: false,
  hideFooter: false,
};

function normalizeVariant(value: unknown): LetterData["variant"] {
  if (
    value === "cliche" ||
    value === "chic" ||
    value === "standard" ||
    value === "handwritten"
  ) {
    return value;
  }
  // Legacy alias used in data drafts
  if (value === "minimal") {
    return "handwritten";
  }
  return "standard";
}

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function parseLetterData(raw: string): LetterData {
  try {
    const parsed = JSON.parse(raw) as any;
    const fallbackLetterhead = [
      typeof parsed.recipient === "string" && parsed.recipient.trim()
        ? `To: ${parsed.recipient.trim()}`
        : "",
      typeof parsed.date === "string" && parsed.date.trim()
        ? `Date: ${parsed.date.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join(" • ");

    return {
      letterhead: normalizeText(
        parsed.letterhead,
        fallbackLetterhead || DEFAULT_LETTER.letterhead,
      ),
      heading: normalizeText(
        parsed.heading,
        normalizeText(parsed.subject, DEFAULT_LETTER.heading),
      ),
      content: normalizeText(
        parsed.content,
        normalizeText(parsed.body, DEFAULT_LETTER.content),
      ),
      sign: normalizeText(
        parsed.sign,
        normalizeText(parsed.signature, DEFAULT_LETTER.sign),
      ),
      footer: normalizeText(parsed.footer, DEFAULT_LETTER.footer),
      variant: normalizeVariant(parsed.variant),
      hideLetterhead: normalizeBoolean(
        parsed.hideLetterhead,
        normalizeBoolean(
          typeof parsed.showLetterhead === "boolean"
            ? !parsed.showLetterhead
            : undefined,
          DEFAULT_LETTER.hideLetterhead,
        ),
      ),
      hideFooter: normalizeBoolean(
        parsed.hideFooter,
        normalizeBoolean(
          typeof parsed.showFooter === "boolean" ? !parsed.showFooter : undefined,
          DEFAULT_LETTER.hideFooter,
        ),
      ),
    };
  } catch {
    const plain = normalizeText(raw, DEFAULT_LETTER.content);
    return {
      ...DEFAULT_LETTER,
      content: plain,
    };
  }
}
