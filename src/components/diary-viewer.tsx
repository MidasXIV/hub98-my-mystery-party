"use client";
import React from "react";
import {
  Caveat,
  Fuggles,
  Gloria_Hallelujah,
  Nanum_Pen_Script,
  Reenie_Beanie,
} from "next/font/google";
import {
  buildRenderableDays,
  type DiaryDay,
} from "@/lib/diary-layout";

/*
DiaryViewer
-----------
Parses a BoardItem.content JSON string for diary data.
Expected JSON shape:
{
  "title": "Agent Log",
  "entriesPerPage": 2, // optional, default 2
  "diaryEntries": [
     { "date": "2025-11-01", "entries": ["Entry text 1", "Entry text 2"] },
     { "date": "2025-11-02", "entries": ["Single entry for day"] }
  ]
}
If content is NOT valid JSON the raw text is shown as a single page.
*/

type DiaryMarginNote = {
  text: string;
  page?: number;
  date?: string;
  dayIndex?: number;
  side?: "left" | "right";
  offset?: number;
  rotate?: number;
};

interface DiaryData {
  title?: string;
  entriesPerPage?: number;
  diaryEntries?: DiaryDay[];
  entryFont?: string;
  diaryStyle?: DiaryStyle;
  marginNotes?: DiaryMarginNote[];
}

type DiaryStylePreset = "clean" | "worn" | "distressed";
type DiaryDoodlePack =
  | "none"
  | "minimal"
  | "science"
  | "botanical"
  | "mechanical"
  | "paranoid";
type DiaryEmboss = "none" | "soft" | "deep";

interface DiaryStyle {
  preset?: DiaryStylePreset;
  handwritingStyle?: DiaryEntryFont;
  inkColor?: string;
  paperColor?: string;
  embossLabel?: string;
  embossSubLabel?: string;
  pressureLevel?: number;
  lineOpacity?: number;
  textureOpacity?: number;
  wearLevel?: number;
  neatness?: number;
  neatnessLevel?: number;
  doodlePack?: DiaryDoodlePack;
  emboss?: DiaryEmboss;
}

type ResolvedDiaryStyle = {
  preset: DiaryStylePreset;
  inkColor: string;
  dateColor: string;
  paperColor: string;
  borderColor: string;
  embossLabel: string;
  embossSubLabel: string;
  pressureLevel: number;
  lineOpacity: number;
  textureOpacity: number;
  wearLevel: number;
  neatness: number;
  doodlePack: DiaryDoodlePack;
  emboss: DiaryEmboss;
};

const STYLE_PRESETS: Record<DiaryStylePreset, ResolvedDiaryStyle> = {
  clean: {
    preset: "clean",
    inkColor: "#25211d",
    dateColor: "#3a3128",
    paperColor: "#fffaf1",
    borderColor: "#d8ccb8",
    embossLabel: "FIELD DIARY",
    embossSubLabel: "ARCHIVE COPY",
    pressureLevel: 0.42,
    lineOpacity: 0.14,
    textureOpacity: 0.08,
    wearLevel: 0.16,
    neatness: 0.84,
    doodlePack: "minimal",
    emboss: "soft",
  },
  worn: {
    preset: "worn",
    inkColor: "#2f2a24",
    dateColor: "#493d31",
    paperColor: "#f8efdf",
    borderColor: "#c5b395",
    embossLabel: "FIELD DIARY",
    embossSubLabel: "ARCHIVE COPY",
    pressureLevel: 0.58,
    lineOpacity: 0.2,
    textureOpacity: 0.13,
    wearLevel: 0.45,
    neatness: 0.56,
    doodlePack: "mechanical",
    emboss: "soft",
  },
  distressed: {
    preset: "distressed",
    inkColor: "#2b241d",
    dateColor: "#554536",
    paperColor: "#f3e4cc",
    borderColor: "#b59f7b",
    embossLabel: "FIELD DIARY",
    embossSubLabel: "ARCHIVE COPY",
    pressureLevel: 0.76,
    lineOpacity: 0.24,
    textureOpacity: 0.18,
    wearLevel: 0.72,
    neatness: 0.34,
    doodlePack: "paranoid",
    emboss: "deep",
  },
};

export type DiaryEntryFont =
  | "default"
  | "gloria-hallelujah"
  | "reenie-beanie"
  | "nanum-pen-script"
  | "fuggles"
  | "caveat";

const DIARY_ENTRY_FONTS: DiaryEntryFont[] = [
  "default",
  "gloria-hallelujah",
  "reenie-beanie",
  "nanum-pen-script",
  "fuggles",
  "caveat",
];

function isDiaryEntryFont(value: unknown): value is DiaryEntryFont {
  return typeof value === "string" && DIARY_ENTRY_FONTS.includes(value as DiaryEntryFont);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function seeded(seed: number, salt: number): number {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function asMarginNotes(value: unknown): DiaryMarginNote[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((n) => {
      if (!n || typeof n !== "object") return null;
      const raw = n as Record<string, unknown>;
      if (typeof raw.text !== "string" || raw.text.trim().length === 0) return null;
      const side = raw.side === "left" || raw.side === "right" ? raw.side : undefined;
      return {
        text: raw.text,
        page: typeof raw.page === "number" ? raw.page : undefined,
        date: typeof raw.date === "string" ? raw.date : undefined,
        dayIndex: typeof raw.dayIndex === "number" ? raw.dayIndex : undefined,
        side,
        offset: typeof raw.offset === "number" ? raw.offset : undefined,
        rotate: typeof raw.rotate === "number" ? raw.rotate : undefined,
      } as DiaryMarginNote;
    })
    .filter((n): n is DiaryMarginNote => Boolean(n));
}

function asDiaryStyle(value: unknown): DiaryStyle | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const style: DiaryStyle = {};

  if (raw.preset === "clean" || raw.preset === "worn" || raw.preset === "distressed") {
    style.preset = raw.preset;
  }
  if (typeof raw.inkColor === "string") style.inkColor = raw.inkColor;
  if (typeof raw.paperColor === "string") style.paperColor = raw.paperColor;
  if (typeof raw.embossLabel === "string") style.embossLabel = raw.embossLabel;
  if (typeof raw.embossSubLabel === "string") style.embossSubLabel = raw.embossSubLabel;
  if (isDiaryEntryFont(raw.handwritingStyle)) style.handwritingStyle = raw.handwritingStyle;
  if (typeof raw.pressureLevel === "number") style.pressureLevel = raw.pressureLevel;
  if (typeof raw.lineOpacity === "number") style.lineOpacity = raw.lineOpacity;
  if (typeof raw.textureOpacity === "number") style.textureOpacity = raw.textureOpacity;
  if (typeof raw.wearLevel === "number") style.wearLevel = raw.wearLevel;
  if (typeof raw.neatness === "number") style.neatness = raw.neatness;
  if (typeof raw.neatnessLevel === "number") style.neatnessLevel = raw.neatnessLevel;
  if (
    raw.doodlePack === "none" ||
    raw.doodlePack === "minimal" ||
    raw.doodlePack === "science" ||
    raw.doodlePack === "botanical" ||
    raw.doodlePack === "mechanical" ||
    raw.doodlePack === "paranoid"
  ) {
    style.doodlePack = raw.doodlePack;
  }
  if (raw.emboss === "none" || raw.emboss === "soft" || raw.emboss === "deep") {
    style.emboss = raw.emboss;
  }

  return style;
}

function resolveDiaryStyle(style: DiaryStyle | undefined): ResolvedDiaryStyle {
  const base = STYLE_PRESETS[style?.preset ?? "clean"];
  const resolvedNeatness = style?.neatnessLevel ?? style?.neatness ?? base.neatness;
  return {
    ...base,
    inkColor: style?.inkColor ?? base.inkColor,
    paperColor: style?.paperColor ?? base.paperColor,
    embossLabel: style?.embossLabel ?? base.embossLabel,
    embossSubLabel: style?.embossSubLabel ?? base.embossSubLabel,
    pressureLevel: clamp(style?.pressureLevel ?? base.pressureLevel, 0, 1),
    lineOpacity: clamp(style?.lineOpacity ?? base.lineOpacity, 0.04, 0.36),
    textureOpacity: clamp(style?.textureOpacity ?? base.textureOpacity, 0.03, 0.32),
    wearLevel: clamp(style?.wearLevel ?? base.wearLevel, 0, 1),
    neatness: clamp(resolvedNeatness, 0, 1),
    doodlePack: style?.doodlePack ?? base.doodlePack,
    emboss: style?.emboss ?? base.emboss,
    borderColor: base.borderColor,
    dateColor: base.dateColor,
  };
}

function DiaryDoodles({
  pack,
  seed,
  opacity,
}: {
  pack: DiaryDoodlePack;
  seed: number;
  opacity: number;
}) {
  if (pack === "none") return null;

  const tiltA = seeded(seed, 3) * 14 - 7;
  const tiltB = seeded(seed, 9) * 10 - 5;
  const baseStroke = "#6f5738";

  const scientific = (
    <>
      <path d="M10 12 L54 12" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 28 C30 10, 40 46, 54 26" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="66" cy="18" r="8" stroke={baseStroke} strokeWidth="2" fill="none" />
    </>
  );
  const botanical = (
    <>
      <path d="M16 38 C34 8, 56 8, 72 38" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M44 38 L44 16" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M44 25 C34 24, 30 30, 28 36" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
    </>
  );
  const mechanical = (
    <>
      <rect x="14" y="12" width="18" height="18" stroke={baseStroke} strokeWidth="2" fill="none" />
      <path d="M44 14 L72 14 L72 34" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M46 34 L72 34" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
    </>
  );
  const paranoid = (
    <>
      <path d="M8 30 C22 14, 34 46, 50 24" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M54 30 C64 16, 74 16, 84 30" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M62 42 L70 34 L78 42" stroke={baseStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );

  let leftGlyph = scientific;
  let rightGlyph = mechanical;
  if (pack === "minimal") {
    leftGlyph = paranoid;
    rightGlyph = botanical;
  } else if (pack === "science") {
    leftGlyph = scientific;
    rightGlyph = scientific;
  } else if (pack === "botanical") {
    leftGlyph = botanical;
    rightGlyph = botanical;
  } else if (pack === "mechanical") {
    leftGlyph = mechanical;
    rightGlyph = mechanical;
  } else if (pack === "paranoid") {
    leftGlyph = paranoid;
    rightGlyph = paranoid;
  }

  return (
    <>
      <svg
        className="absolute left-3 top-3 w-16 h-10 pointer-events-none"
        viewBox="0 0 90 50"
        fill="none"
        aria-hidden="true"
        style={{ opacity, transform: `rotate(${tiltA}deg)` }}
      >
        {leftGlyph}
      </svg>
      <svg
        className="absolute right-3 bottom-3 w-16 h-10 pointer-events-none"
        viewBox="0 0 90 50"
        fill="none"
        aria-hidden="true"
        style={{ opacity: opacity * 0.92, transform: `rotate(${tiltB}deg)` }}
      >
        {rightGlyph}
      </svg>
    </>
  );
}

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const reenieBeanie = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const nanumPenScript = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const fuggles = Fuggles({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const entryFontClassByName: Record<Exclude<DiaryEntryFont, "default">, string> = {
  "gloria-hallelujah": gloriaHallelujah.className,
  "reenie-beanie": reenieBeanie.className,
  "nanum-pen-script": nanumPenScript.className,
  fuggles: fuggles.className,
  caveat: caveat.className,
};

function getEntryFontClass(font: DiaryEntryFont): string {
  if (font === "default") return "";
  return entryFontClassByName[font];
}

export function DiaryViewer({
  content,
  entryFont = "default",
}: {
  content: string;
  entryFont?: DiaryEntryFont;
}) {
  let data: DiaryData = {};
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object") data = parsed as DiaryData;
  } catch {
    // fallback: treat raw content as single page with one entry
    data = {
      title: "Diary",
      diaryEntries: [{ entries: [content] }],
      entriesPerPage: 2,
    };
  }

  const entriesPerPage = Math.max(1, data.entriesPerPage ?? 2);
  const days: DiaryDay[] = Array.isArray(data.diaryEntries)
    ? data.diaryEntries.map((d) => ({ entries: d.entries || [], date: d.date }))
    : [];
  const parsedDiaryStyle = asDiaryStyle(data.diaryStyle);
  const resolvedEntryFont =
    parsedDiaryStyle?.handwritingStyle ??
    (isDiaryEntryFont(data.entryFont) ? data.entryFont : entryFont);
  const entryFontClass = getEntryFontClass(resolvedEntryFont);
  const entryFontSizeClass = resolvedEntryFont === "default" ? "text-sm" : "text-[1.12rem]";
  const resolvedStyle = resolveDiaryStyle(parsedDiaryStyle);
  // Use the same font, size, and thickness for date as for entry text
  const dateFontClass = `${entryFontClass} ${entryFontSizeClass}`;
  const renderDays = buildRenderableDays(days, {
    handwritten: resolvedEntryFont !== "default",
    sectionsPerPage: entriesPerPage,
  });
  const totalPages = renderDays.length === 0 ? 1 : Math.ceil(renderDays.length / entriesPerPage);
  const [page, setPage] = React.useState(0);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const startIndex = page * entriesPerPage;
  const visibleDays = renderDays.slice(startIndex, startIndex + entriesPerPage);
  const marginNotes = asMarginNotes(data.marginNotes);

  return (
    <div className="bg-[#f5efe5] text-gray-900 font-special-elite p-6 rounded-md shadow-xl max-w-3xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-staatliches tracking-wider">
          {data.title || "Field Diary"}
        </h2>
        <div className="flex items-center gap-2 text-sm font-mono">
          <span className="px-2 py-1 bg-gray-200 rounded">Page {page + 1}/{totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="px-2 py-1 bg-gray-300 disabled:bg-gray-400 text-gray-800 rounded-sm hover:bg-gray-400 transition"
              aria-label="Previous page"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              disabled={page >= totalPages - 1}
              className="px-2 py-1 bg-gray-300 disabled:bg-gray-400 text-gray-800 rounded-sm hover:bg-gray-400 transition"
              aria-label="Next page"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
      {visibleDays.length === 0 && (
        <p className="italic text-gray-500">No entries recorded.</p>
      )}
      {/* Render days vertically (rows). Each row fills available space equally. */}
      <div className="flex flex-col gap-6 h-[60vh] min-h-[400px] justify-stretch">
        {visibleDays.map((day, idx) => (
          (() => {
            const daySeed = hashSeed(`${data.title ?? ""}-${day.date ?? ""}-${startIndex + idx}`);
            const currentPage = page + 1;
            const notesForPage = marginNotes.filter(
              (note) => note.page === undefined || note.page === currentPage,
            );
            const notesForDay = notesForPage.filter((note) => {
              if (note.date && note.date !== day.date) return false;
              if (typeof note.dayIndex === "number") return note.dayIndex === idx + 1;
              if (note.date) return true;
              return idx === 0;
            });
            const paperTilt = (1 - resolvedStyle.neatness) * (seeded(daySeed, 1) * 1.2 - 0.6);
            const lineOpacity = clamp(
              resolvedStyle.lineOpacity + (seeded(daySeed, 2) - 0.5) * 0.06,
              0.04,
              0.36,
            );
            const textureOpacity = clamp(
              resolvedStyle.textureOpacity + (seeded(daySeed, 4) - 0.5) * 0.05,
              0.03,
              0.32,
            );
            const vignetteOpacity = clamp(resolvedStyle.wearLevel * 0.18, 0, 0.26);
            const doodleOpacity = clamp(0.08 + resolvedStyle.wearLevel * 0.12, 0.06, 0.2);
            const inkAlpha = clamp(0.72 + resolvedStyle.pressureLevel * 0.28, 0.64, 1);
            const inkShadow = `${resolvedStyle.pressureLevel * 0.5}px ${resolvedStyle.pressureLevel * 0.6}px 0 rgba(0,0,0,0.14)`;
            const paragraphNudge = (eIdx: number) =>
              `${(1 - resolvedStyle.neatness) * (seeded(daySeed + eIdx, 8) * 0.8 - 0.4)}px`;
            const embossOpacity = resolvedStyle.emboss === "deep" ? 0.13 : 0.08;
            const embossTilt = seeded(daySeed, 31) * 8 - 4;

            return (
              <div
                key={(day.date || "day") + idx}
                className="relative border rounded-sm p-4 flex flex-col flex-1 min-h-0 justify-start gap-2 overflow-hidden"
                style={{
                  flex: 1,
                  minHeight: 0,
                  borderColor: resolvedStyle.borderColor,
                  backgroundColor: resolvedStyle.paperColor,
                  transform: `rotate(${paperTilt}deg)`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    opacity: textureOpacity,
                    backgroundImage:
                      "radial-gradient(circle at 14% 18%, rgba(95,74,51,0.9) 0 0.75px, transparent 0.95px), radial-gradient(circle at 72% 28%, rgba(95,74,51,0.8) 0 0.7px, transparent 0.9px)",
                    backgroundSize: "5px 5px, 7px 7px",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    opacity: lineOpacity,
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 23px, rgba(70,90,140,0.85) 24px, transparent 25px)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    opacity: vignetteOpacity,
                    background:
                      "radial-gradient(ellipse at center, transparent 55%, rgba(86,64,42,0.9) 100%)",
                  }}
                />
                <DiaryDoodles
                  pack={resolvedStyle.doodlePack}
                  seed={daySeed}
                  opacity={doodleOpacity}
                />
                {notesForDay.map((note, noteIdx) => {
                  const side = note.side ?? (noteIdx % 2 === 0 ? "left" : "right");
                  const sideClass = side === "left" ? "left-2" : "right-2";
                  const topOffset = note.offset ?? 16 + noteIdx * 14;
                  const rotate = note.rotate ?? (seeded(daySeed, 20 + noteIdx) * 12 - 6);
                  return (
                    <p
                      key={`${note.text}-${noteIdx}`}
                      className={`absolute ${sideClass} z-20 max-w-[20mm] text-[11px] leading-[1.05] pointer-events-none ${entryFontClass}`}
                      style={{
                        top: `${topOffset}%`,
                        transform: `rotate(${rotate}deg)`,
                        color: resolvedStyle.inkColor,
                        opacity: clamp(0.52 + resolvedStyle.pressureLevel * 0.28, 0.5, 0.9),
                        textShadow: "0.4px 0.4px 0 rgba(0,0,0,0.1)",
                      }}
                    >
                      {note.text}
                    </p>
                  );
                })}
                {day.overflowMarginText && (
                  <p
                    className={`absolute right-2 top-[22%] z-20 max-w-[22mm] text-[11px] leading-[1.03] pointer-events-none ${entryFontClass}`}
                    style={{
                      color: resolvedStyle.inkColor,
                      opacity: clamp(0.44 + resolvedStyle.pressureLevel * 0.22, 0.42, 0.75),
                      transform: `rotate(${seeded(daySeed, 61) * 10 - 5}deg)`,
                      textShadow: "0.3px 0.3px 0 rgba(0,0,0,0.08)",
                    }}
                  >
                    {day.overflowMarginText}
                  </p>
                )}
                {resolvedStyle.emboss !== "none" && (
                  <div
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none uppercase"
                    aria-hidden="true"
                    style={{
                      opacity: embossOpacity,
                      transform: `rotate(${embossTilt}deg)`,
                    }}
                  >
                    <div
                      className="rounded-full border px-8 py-4 text-center"
                      style={{
                        color: "#5f5f5f",
                        borderColor: "#7c7c7c",
                        background: "transparent",
                        filter: "blur(0.15px)",
                        textShadow: "0.2px 0.2px 0 rgba(255,255,255,0.4), -0.2px -0.2px 0 rgba(0,0,0,0.2)",
                      }}
                    >
                      <p className="text-[10px] tracking-[0.2em] leading-none">{resolvedStyle.embossLabel}</p>
                      <p className="text-[8px] tracking-[0.14em] mt-[2px] leading-none">{resolvedStyle.embossSubLabel}</p>
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex items-center mb-2">
                  <span className={dateFontClass} style={{ color: resolvedStyle.dateColor, fontWeight: "inherit", letterSpacing: "inherit" }}>
                    {day.date || `Day ${startIndex + idx + 1}`}
                    {day.continuedFromPrevious ? " (cont.)" : ""}
                    {day.continuedToNext ? " (continues)" : ""}
                  </span>
                </div>
                <div
                  className={`relative z-10 space-y-3 leading-relaxed flex-1 ${entryFontClass} ${entryFontSizeClass}`}
                  style={{
                    color: resolvedStyle.inkColor,
                    opacity: inkAlpha,
                    textShadow: inkShadow,
                  }}
                >
                  {day.entries.map((entry, eIdx) => (
                    <p
                      key={eIdx}
                      className="whitespace-pre-wrap"
                      style={{ marginLeft: paragraphNudge(eIdx) }}
                    >
                      {entry}
                    </p>
                  ))}
                </div>
              </div>
            );
          })()
        ))}
      </div>
      <div className="mt-6 text-[11px] text-gray-500 font-mono flex justify-between items-center">
        <span>Entries/Page: {entriesPerPage}</span>
        <span>Total Days: {days.length}</span>
      </div>
      {/* <p className="mt-3 text-xs text-gray-400 italic">
        JSON schema: {`{ title?, entriesPerPage?, diaryEntries: [ { date?, entries: string[] } ] }`}
      </p> */}
    </div>
  );
}

export default DiaryViewer;
