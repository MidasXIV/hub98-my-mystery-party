/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface CaseBriefingData {
  department: string; // e.g. "Riverdale Police Dept."
  bureau: string; // e.g. "Major Crimes Division"
  date: string;
  to: string; // e.g. "Det. Unit 4"
  from: string; // e.g. "Chief Moretti"
  subject: string; // e.g. "Case 992 - The Silent Heiress"
  classification: "CONFIDENTIAL" | "SECRET" | "UNCLASSIFIED";
  body: string; // The main story text
}

// --- Parser ---
export function parseBriefingData(content: string): CaseBriefingData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    // Fallback if raw text is passed
    json = { body: content };
  }

  return {
    department: json.department || "POLICE DEPARTMENT",
    bureau: json.bureau || "Office of the Chief",
    date: json.date || "UNKNOWN DATE",
    to: json.to || "Investigating Officer",
    from: json.from || "Command",
    subject: json.subject || "CASE BRIEFING",
    classification: json.classification || "CONFIDENTIAL",
    body: json.body || "No briefing content provided."
  };
}