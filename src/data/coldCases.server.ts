import "server-only";
import { coldCases as caseMetadata, type ColdCase } from "./coldCases";
import HER_SHADOWS_NAME_DATA from "./her-shadows-name-data";
import PALAZZO_OF_BONES_DATA from "./palazzo-of-bones-data";
import STATION_ZERO_DATA from "./station-zero-data";
import ZERO_SUM_DATA from "./zero-sum-data";
import FINAL_REHEARSAL_DATA from "./the-final-rehearsal-data";
import FINAL_BENCH_OFF_DATA from "./the-final-bench-off-data";
import SINS_OF_SAINT_LAZARUS_DATA from "./sins-of-saint-lazarus-data";
import THE_LAST_CHECK_IN_DATA from "./the-last-check-in";
import KISMET_CASINO_DATA from "./kismet-casino-data";

type CaseWithEvidence = ColdCase & { evidence?: Record<string, unknown> };

const evidenceBySlug: Record<string, Record<string, unknown>> = {
  "station-zero": STATION_ZERO_DATA,
  "the-final-bench-off": FINAL_BENCH_OFF_DATA,
  "the-final-rehearsal": FINAL_REHEARSAL_DATA,
  "the-murder-at-kismet-casino": KISMET_CASINO_DATA,
  "sins-of-saint-lazarus": SINS_OF_SAINT_LAZARUS_DATA,
  "the-last-check-in": THE_LAST_CHECK_IN_DATA,
  "palazzo-of-bones": PALAZZO_OF_BONES_DATA,
  "sentinel-1-the-zero-sum-game": ZERO_SUM_DATA,
  "her-shadows-name": HER_SHADOWS_NAME_DATA,
};

export const coldCases: CaseWithEvidence[] = caseMetadata.map((caseFile) => ({
  ...caseFile,
  evidence: evidenceBySlug[caseFile.slug],
}));

export function getCaseBySlug(slug: string) {
  return coldCases.find((caseFile) => caseFile.slug === slug);
}
