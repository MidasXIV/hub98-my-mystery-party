/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface CallEntry {
  time: string;
  number: string;
  direction: "IN" | "OUT";
  duration: string;
  notes?: string;
}

// A more flexible row shape for dynamic logs.
export type ActivityLogEntry = Record<string, unknown>;

export interface ActivityLogData {
  /** Optional document/page title displayed in the viewer (e.g. "Telephone Log"). */
  title?: string;
  /** Optional small label for preview header (e.g. "Switchboard"). */
  previewLabel?: string;
  location: string; // e.g. "Hotel Cosmopolitan - Front Desk"
  date: string;
  operator: string;
  /**
   * Rows for the activity log. Historically this was `CallEntry[]`, but we allow
   * arbitrary keys to support dynamic columns.
   */
  entries: ActivityLogEntry[];
  caseRef?: string;
  /** Optional column headers. If provided, the UI should render using these labels. */
  headers?: Record<string, string>;
  /** Optional explicit column order. If omitted, we infer from headers/object keys. */
  columnOrder?: string[];
  /** Optional per-column layout classes (e.g. width/alignment). */
  columnLayout?: Record<string, string>;
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

  const headers: Record<string, string> | undefined =
    typeof json.headers === "object" && json.headers ? json.headers : undefined;

  const columnOrder: string[] | undefined = Array.isArray(json.columnOrder)
    ? json.columnOrder.filter((k: unknown) => typeof k === "string")
    : undefined;

  const columnLayout: Record<string, string> | undefined =
    typeof json.columnLayout === "object" && json.columnLayout
      ? json.columnLayout
      : undefined;

  return {
    title: typeof json.title === "string" ? json.title : undefined,
    previewLabel: typeof json.previewLabel === "string" ? json.previewLabel : undefined,
    location: json.location || "SWITCHBOARD LOG",
    date: json.date || "Unknown Date",
    operator: json.operator || "Operator #4",
    caseRef: json.caseRef || `LOG-${Math.floor(Math.random() * 999)}`,
    headers,
    columnOrder,
    columnLayout,
    entries: Array.isArray(json.entries)
      ? json.entries
      : [{ time: "--:--", number: "---", direction: "IN", duration: "-", notes: "No Data" }],
  };
}