import { BoardItem } from "./boardTypes";

// Core declutter algorithm extracted from page component.
// Returns a new array of BoardItems with updated positions (and normalized rotation).
// Side-effect free: callers are responsible for undo bookkeeping and view reset.
export function computeDeclutterLayout(
  items: BoardItem[],
  viewportWidth: number,
  viewportHeight: number
): BoardItem[] {
  if (!viewportWidth || !viewportHeight) return items;

  // Group items by type
  const groups: Record<string, BoardItem[]> = {};
  items.forEach((it) => (groups[it.type] ||= []).push(it));
  const types = Object.keys(groups).sort();

  // Layout parameters (tuned for readability)
  const MARGIN_X = 40;
  const MARGIN_Y = 40;
  const SECTION_GAP_Y = 110;
  const ROW_GAP_PX = 28;
  const COL_GAP_PX = 28;
  const availableWidthPx = viewportWidth - MARGIN_X * 2;
  const straightenRotation = true;

  interface PositionedItem { item: BoardItem; x: number; y: number }
  const positioned: PositionedItem[] = [];
  let currentSectionTop = MARGIN_Y;

  const hasAlibis = !!groups["formal-alibi"]?.length;
  const hasTranscripts = !!groups["interrogation-transcript"]?.length;
  const pairedTypes = hasAlibis && hasTranscripts;

  // Newspaper vertical section first
  if (groups["newspaper"]) {
    let xCursor = MARGIN_X;
    let yCursor = currentSectionTop;
    let rowHeight = 0;
    groups["newspaper"].forEach((item) => {
      if (xCursor + item.size.width > MARGIN_X + availableWidthPx) {
        xCursor = MARGIN_X;
        yCursor += rowHeight + ROW_GAP_PX;
        rowHeight = 0;
      }
      positioned.push({ item, x: xCursor, y: yCursor });
      xCursor += item.size.width + COL_GAP_PX;
      rowHeight = Math.max(rowHeight, item.size.height);
    });
    currentSectionTop = yCursor + rowHeight + SECTION_GAP_Y;
  }

  // Alibi + Transcript side-by-side if both
  if (pairedTypes) {
    const alibiItems = groups["formal-alibi"];
    const transcriptItems = groups["interrogation-transcript"];
    const BLOCK_GAP_X = 40;
    const blockWidth = (availableWidthPx - BLOCK_GAP_X) / 2;
    const layoutTwoColumn = (blockItems: BoardItem[], startX: number) => {
      const sorted = [...blockItems];
      const maxItemWidth = Math.min(
        blockWidth,
        Math.max(...sorted.map((i) => i.size.width))
      );
      const colWidth = Math.min(maxItemWidth, (blockWidth - COL_GAP_PX) / 2);
      let xCursor = startX;
      let yCursor = currentSectionTop;
      let rowHeight = 0;
      let colCount = 0;
      let blockHeight = 0;
      sorted.forEach((itm) => {
        if (colCount === 2) {
          xCursor = startX;
          yCursor += rowHeight + ROW_GAP_PX;
          rowHeight = 0;
          colCount = 0;
        }
        positioned.push({ item: itm, x: xCursor, y: yCursor });
        xCursor += colWidth + COL_GAP_PX;
        colCount++;
        rowHeight = Math.max(rowHeight, itm.size.height);
        blockHeight = Math.max(blockHeight, yCursor - currentSectionTop + rowHeight);
      });
      return blockHeight;
    };
    const alibiHeight = layoutTwoColumn(alibiItems, MARGIN_X);
    const transcriptStartX = MARGIN_X + blockWidth + BLOCK_GAP_X;
    const transcriptHeight = layoutTwoColumn(transcriptItems, transcriptStartX);
    currentSectionTop += Math.max(alibiHeight, transcriptHeight) + SECTION_GAP_Y;
  }

  // Remaining types (exclude already placed ones)
  const remainingTypes = types.filter(
    (t) =>
      t !== "newspaper" &&
      (!pairedTypes || (t !== "formal-alibi" && t !== "interrogation-transcript"))
  );

  remainingTypes.forEach((type) => {
    const groupItems = groups[type];
    if (!groupItems) return;
    const sorted = [...groupItems].sort(
      (a, b) => b.size.width - a.size.width || b.size.height - a.size.height
    );
    let xCursor = MARGIN_X;
    let yCursor = currentSectionTop;
    let rowHeight = 0;
    sorted.forEach((itm) => {
      if (xCursor + itm.size.width > MARGIN_X + availableWidthPx) {
        xCursor = MARGIN_X;
        yCursor += rowHeight + ROW_GAP_PX;
        rowHeight = 0;
      }
      positioned.push({ item: itm, x: xCursor, y: yCursor });
      xCursor += itm.size.width + COL_GAP_PX;
      rowHeight = Math.max(rowHeight, itm.size.height);
    });
    currentSectionTop = yCursor + rowHeight + SECTION_GAP_Y;
  });

  // Collision resolution (push down to eliminate overlaps)
  type MutablePlaced = { item: BoardItem; x: number; y: number; w: number; h: number };
  const working: MutablePlaced[] = positioned.map((p) => ({
    item: p.item,
    x: p.x,
    y: p.y,
    w: p.item.size.width,
    h: p.item.size.height,
  }));
  working.sort((a, b) => a.y - b.y || a.x - b.x);
  const overlaps = (a: MutablePlaced, b: MutablePlaced) =>
    !(
      a.x + a.w <= b.x ||
      b.x + b.w <= a.x ||
      a.y + a.h <= b.y ||
      b.y + b.h <= a.y
    );
  for (let i = 0; i < working.length; i++) {
    let moved = true;
    while (moved) {
      moved = false;
      for (let j = 0; j < i; j++) {
        if (overlaps(working[i], working[j])) {
          working[i].y = working[j].y + working[j].h + ROW_GAP_PX;
          moved = true;
        }
      }
    }
  }

  // Baseline shift (combine alibi + transcript if paired)
  const baselineShiftMap = new Map<string, number>();
  let accumulatedY = MARGIN_Y;
  const orderedForBaseline = types.filter(
    (t) =>
      t === "newspaper" ||
      t === "formal-alibi" ||
      t === "interrogation-transcript" ||
      (t !== "newspaper" && t !== "formal-alibi" && t !== "interrogation-transcript")
  );
  const processedCombo = pairedTypes ? new Set<string>() : undefined;
  orderedForBaseline.forEach((t) => {
    if (pairedTypes && (t === "formal-alibi" || t === "interrogation-transcript")) {
      if (processedCombo && processedCombo.size === 0) {
        const comboItems = working.filter(
          (w) => w.item.type === "formal-alibi" || w.item.type === "interrogation-transcript"
        );
        if (comboItems.length) {
          const minY = Math.min(...comboItems.map((i) => i.y));
          const maxY = Math.max(...comboItems.map((i) => i.y + i.h));
          const desiredTop = baselineShiftMap.size === 0 ? MARGIN_Y : accumulatedY;
          const delta = desiredTop - minY;
          baselineShiftMap.set("formal-alibi", delta);
          baselineShiftMap.set("interrogation-transcript", delta);
          accumulatedY = desiredTop + (maxY - minY) + SECTION_GAP_Y;
        }
        processedCombo?.add("formal-alibi");
        processedCombo?.add("interrogation-transcript");
      }
      return;
    }
    const typeItems = working.filter((w) => w.item.type === t);
    if (!typeItems.length) return;
    const minY = Math.min(...typeItems.map((i) => i.y));
    const maxY = Math.max(...typeItems.map((i) => i.y + i.h));
    const desiredTop = baselineShiftMap.size === 0 ? MARGIN_Y : accumulatedY;
    const delta = desiredTop - minY;
    baselineShiftMap.set(t, delta);
    accumulatedY = desiredTop + (maxY - minY) + SECTION_GAP_Y;
  });
  working.forEach((m) => {
    const shift = baselineShiftMap.get(m.item.type) || 0;
    m.y += shift;
  });

  return working.map((m) => ({
    ...m.item,
    position: { x: (m.x / viewportWidth) * 100, y: (m.y / viewportHeight) * 100 },
    rotation: straightenRotation ? 0 : m.item.rotation,
  }));
}
