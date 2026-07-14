export interface DiaryDay {
  date?: string;
  entries: string[];
}

export type RenderDiaryDay = DiaryDay & {
  continuedFromPrevious?: boolean;
  continuedToNext?: boolean;
  overflowMarginText?: string;
};

export type DiaryLayoutOptions = {
  handwritten: boolean;
  sectionsPerPage: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function estimateEntryCost(text: string, hasPreviousEntry: boolean): number {
  const newlineCount = (text.match(/\n/g) || []).length;
  const paragraphPenalty = hasPreviousEntry ? 12 : 0;
  return text.length + newlineCount * 24 + paragraphPenalty;
}

function splitAtNaturalBoundary(text: string, limit: number): [string, string] {
  const clean = text.trim();
  if (clean.length <= limit) return [clean, ""];

  const windowStart = Math.max(0, limit - 90);
  const window = clean.slice(windowStart, limit + 1);
  let splitOffset = -1;

  for (let i = window.length - 1; i >= 0; i -= 1) {
    const c = window[i];
    if (c === "." || c === "!" || c === "?" || c === ";") {
      splitOffset = i + 1;
      break;
    }
  }

  if (splitOffset === -1) {
    for (let i = window.length - 1; i >= 0; i -= 1) {
      if (/\s/.test(window[i])) {
        splitOffset = i;
        break;
      }
    }
  }

  const absoluteSplit = splitOffset === -1 ? limit : windowStart + splitOffset;
  const head = clean.slice(0, absoluteSplit).trim();
  const tail = clean.slice(absoluteSplit).trim();
  return [head || clean.slice(0, limit).trim(), tail || clean.slice(limit).trim()];
}

function getCapacityBudgets(options: DiaryLayoutOptions): {
  mainLimit: number;
  marginLimit: number;
} {
  const normalizedSections = clamp(Math.floor(options.sectionsPerPage || 1), 1, 6);
  const baseMainLimit = options.handwritten ? 460 : 640;
  const baseMarginLimit = options.handwritten ? 130 : 160;

  const scale = 2 / normalizedSections;
  const mainLimit = clamp(Math.round(baseMainLimit * scale), 180, 1300);
  const marginLimit = clamp(Math.round(baseMarginLimit * Math.sqrt(scale)), 90, 280);

  return { mainLimit, marginLimit };
}

export function buildRenderableDays(
  days: DiaryDay[],
  options: DiaryLayoutOptions,
): RenderDiaryDay[] {
  const { mainLimit, marginLimit } = getCapacityBudgets(options);
  const result: RenderDiaryDay[] = [];

  for (const day of days) {
    const sourceEntries = day.entries
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter((entry) => entry.length > 0);

    if (sourceEntries.length === 0) {
      result.push({
        date: day.date,
        entries: [""],
        continuedFromPrevious: false,
        continuedToNext: false,
      });
      continue;
    }

    const pending = [...sourceEntries];
    let isContinuation = false;

    while (pending.length > 0) {
      let capacity = mainLimit;
      const segmentEntries: string[] = [];
      let overflowMarginText: string | undefined;

      while (pending.length > 0 && capacity > 40) {
        const current = pending[0];
        const estimatedCost = estimateEntryCost(current, segmentEntries.length > 0);

        if (estimatedCost <= capacity) {
          segmentEntries.push(current);
          pending.shift();
          capacity -= estimatedCost;
          continue;
        }

        const [mainPart, remainderAfterMain] = splitAtNaturalBoundary(
          current,
          Math.max(80, capacity),
        );

        if (mainPart.length > 0) {
          segmentEntries.push(mainPart);
          capacity = 0;
        }

        if (remainderAfterMain.length > 0) {
          const [marginPart, carryForward] = splitAtNaturalBoundary(
            remainderAfterMain,
            marginLimit,
          );
          overflowMarginText = marginPart;
          pending[0] = carryForward;
        }
        break;
      }

      if (segmentEntries.length === 0 && pending.length > 0) {
        const [forcedPart, forcedRemainder] = splitAtNaturalBoundary(
          pending[0],
          Math.max(120, mainLimit - 40),
        );
        segmentEntries.push(forcedPart);
        pending[0] = forcedRemainder;
      }

      if (pending[0] !== undefined && pending[0].trim().length === 0) {
        pending.shift();
      }

      result.push({
        date: day.date,
        entries: segmentEntries,
        overflowMarginText,
        continuedFromPrevious: isContinuation,
        continuedToNext: pending.length > 0,
      });

      isContinuation = true;
    }
  }

  return result;
}
