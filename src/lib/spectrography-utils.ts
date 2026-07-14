export interface SpectrographyData {
  instrument?: string;
  sampleId?: string;
  analyzedAt?: string; // ISO date
  operator?: string;
  peaks?: Array<{ mz: number; intensity: number }>;
  summary?: string;
}

export function parseSpectrography(content: string): SpectrographyData {
  try {
    const json = JSON.parse(content);
    return {
      instrument: json.instrument || json.device || undefined,
      sampleId: json.sampleId || json.sample_id || undefined,
      analyzedAt: json.analyzedAt || json.date || undefined,
      operator: json.operator || json.analyst || undefined,
      peaks: json.peaks || undefined,
      summary: json.summary || undefined,
    };
  } catch {
    const lines = content.split(/\r?\n/).map((l) => l.trim());
    const get = (label: string) => {
      const match = lines.find((l) => l.toLowerCase().startsWith(label.toLowerCase()));
      return match ? match.split(":").slice(1).join(":").trim() : undefined;
    };
    return {
      instrument: get("instrument"),
      sampleId: get("sample") || get("sample id"),
      analyzedAt: get("date") || undefined,
      operator: get("operator") || get("analyst"),
      summary: lines.join(" ").substring(0, 400),
    };
  }
}

export default parseSpectrography;