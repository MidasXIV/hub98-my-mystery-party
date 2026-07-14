export interface BrochureSide {
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  bullets: string[];
  footer: string;
  imageUrl?: string;
}

export interface BrochureData {
  title: string;
  location: string;
  edition: string;
  stamp: string;
  front: BrochureSide;
  back: BrochureSide;
}

type SideInput =
  | string
  | {
      eyebrow?: unknown;
      headline?: unknown;
      subheadline?: unknown;
      body?: unknown;
      bullets?: unknown;
      footer?: unknown;
      imageUrl?: unknown;
    }
  | null
  | undefined;

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => asString(entry))
      .filter((entry) => entry.length > 0)
      .slice(0, 5);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|\s*[|;,]\s*/)
      .map((entry) => entry.replace(/^[\-•*]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);
  }

  return [];
}

function parseRawSides(content: string): Pick<BrochureData, "front" | "back"> {
  const [frontText, backText] = content
    .split(/\n\s*---+\s*\n/)
    .map((part) => part.trim());

  return {
    front: {
      eyebrow: "Souvenir Brochure",
      headline: "Visitor Guide",
      subheadline: "A keepsake tucked into the case file.",
      body: frontText || "No brochure front content provided.",
      bullets: [],
      footer: "Front Side",
    },
    back: {
      eyebrow: "Reverse Side",
      headline: "What The Town Won't Say",
      subheadline: "Use the back panel to seed plot context and hidden tension.",
      body:
        backText ||
        "Add a second side after a line with --- to include the back of the brochure.",
      bullets: [],
      footer: "Back Side",
    },
  };
}

function parseSide(
  input: SideInput,
  fallback: Partial<BrochureSide>,
): BrochureSide {
  if (typeof input === "string") {
    return {
      eyebrow: fallback.eyebrow || "Brochure",
      headline: fallback.headline || "Untitled Side",
      subheadline: fallback.subheadline || "",
      body: input.trim() || fallback.body || "",
      bullets: fallback.bullets || [],
      footer: fallback.footer || "",
      imageUrl: fallback.imageUrl,
    };
  }

  const source = input && typeof input === "object" ? input : {};

  return {
    eyebrow: asString(source.eyebrow, fallback.eyebrow || "Brochure"),
    headline: asString(source.headline, fallback.headline || "Untitled Side"),
    subheadline: asString(source.subheadline, fallback.subheadline || ""),
    body: asString(source.body, fallback.body || ""),
    bullets:
      asStringArray(source.bullets).length > 0
        ? asStringArray(source.bullets)
        : fallback.bullets || [],
    footer: asString(source.footer, fallback.footer || ""),
    imageUrl: asString(source.imageUrl) || fallback.imageUrl,
  };
}

export function parseBrochureContent(content: string): BrochureData {
  try {
    const parsed = JSON.parse(content) as {
      title?: unknown;
      location?: unknown;
      edition?: unknown;
      stamp?: unknown;
      front?: SideInput;
      back?: SideInput;
      main?: SideInput;
      reverse?: SideInput;
      body?: unknown;
      plotSummary?: unknown;
      highlights?: unknown;
      reveals?: unknown;
    };

    const front = parseSide(parsed.front ?? parsed.main, {
      eyebrow: "Souvenir Brochure",
      headline: asString(parsed.title, "Visitor Guide"),
      subheadline: asString(parsed.location, "A place worth remembering."),
      body: asString(parsed.body, "No brochure front content provided."),
      bullets: asStringArray(parsed.highlights),
      footer: asString(parsed.edition, "Front Side"),
    });

    const back = parseSide(parsed.back ?? parsed.reverse, {
      eyebrow: "Behind The Facade",
      headline: "Plot Notes",
      subheadline: "A slim reverse side for quiet revelations.",
      body: asString(
        parsed.plotSummary,
        "No reverse-side plot notes were provided.",
      ),
      bullets: asStringArray(parsed.reveals),
      footer: "Back Side",
    });

    return {
      title: asString(parsed.title, front.headline || "Souvenir Brochure"),
      location: asString(parsed.location, front.subheadline || "Unknown Locale"),
      edition: asString(parsed.edition, "Collector Edition"),
      stamp: asString(parsed.stamp, "Keep As Evidence"),
      front,
      back,
    };
  } catch {
    const rawSides = parseRawSides(content);
    return {
      title: rawSides.front.headline,
      location: rawSides.front.subheadline,
      edition: "Collector Edition",
      stamp: "Keep As Evidence",
      front: rawSides.front,
      back: rawSides.back,
    };
  }
}