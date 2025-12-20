/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface TransmissionEntry {
  time: string;
  direction: string; // e.g. "IN", "OUT", "INT.", "LOG"
  number: string; // The entity or channel
  duration: string;
  notes: string;
}

export interface TransmissionLogData {
  title: string;
  location: string;
  date: string;
  operator: string;
  caseRef: string;
  entries: TransmissionEntry[];
}

// --- Parsing Logic ---
export function parseTransmissionLog(content: string, titleProp?: string): TransmissionLogData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { entries: [] };
  }

  return {
    title: json.title || titleProp || "TRANSMISSION LOG",
    location: json.location || "UNKNOWN SERVER",
    date: json.date || "UNDATED",
    operator: json.operator || "AUTO-SYS",
    caseRef: json.caseRef || "ERR-000",
    entries: Array.isArray(json.entries) ? json.entries : []
  };
}