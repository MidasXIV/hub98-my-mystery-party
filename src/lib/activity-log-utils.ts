/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface CallEntry {
  time: string;
  number: string;
  direction: "IN" | "OUT";
  duration: string;
  notes?: string;
}

export interface ActivityLogData {
  location: string; // e.g. "Hotel Cosmopolitan - Front Desk"
  date: string;
  operator: string;
  entries: CallEntry[];
  caseRef?: string;
}

// --- Parsing Logic ---
export function parseActivityLog(content: string): ActivityLogData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    // Fallback: simple text extraction
    json = { entries: [] };
  }

  return {
    location: json.location || "SWITCHBOARD LOG",
    date: json.date || "Unknown Date",
    operator: json.operator || "Operator #4",
    caseRef: json.caseRef || `LOG-${Math.floor(Math.random() * 999)}`,
    entries: Array.isArray(json.entries) ? json.entries : [
      { time: "--:--", number: "---", direction: "IN", duration: "-", notes: "No Data" }
    ]
  };
}