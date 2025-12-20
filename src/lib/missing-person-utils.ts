/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface FieldNoteEntry {
  time: string;
  location: string;
  source: string;
  note: string;
}

export interface MissingPersonData {
  // Page 1: Intake
  caseNumber: string;
  dateFiled: string;
  reportingOfficer: string;
  
  // Subject Identity
  name: string;
  nickname: string;
  dob: string;
  age: string;
  sex: string;
  race: string;
  
  // Media
  imageUrl: string;
  
  // Physical Description
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  scarsMarks: string;
  dental: string;
  
  // Disappearance
  lastSeenDate: string;
  lastSeenTime: string;
  lastSeenLocation: string;
  clothingWorn: string;
  
  // Narrative
  summary: string;

  // Page 2: Police Work
  fieldNotes: FieldNoteEntry[];
}

export function parseMissingPersonData(content: string): MissingPersonData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = {};
  }

  return {
    caseNumber: json.caseNumber || `MP-${Math.floor(Math.random() * 9999)}`,
    dateFiled: json.dateFiled || "UNKNOWN",
    reportingOfficer: json.reportingOfficer || "Desk Sgt.",
    name: json.name || json.subject || "UNKNOWN SUBJECT",
    nickname: json.nickname || "",
    dob: json.dob || "Unknown",
    age: json.age || "Unknown",
    sex: json.sex || "Unknown",
    race: json.race || "Unknown",
    height: json.height || "Unknown",
    weight: json.weight || "Unknown",
    hair: json.hair || "Unknown",
    eyes: json.eyes || "Unknown",
    scarsMarks: json.scarsMarks || "None listed",
    dental: json.dental || "N/A",
    imageUrl:
      json.imageUrl || json.photoUrl || "/cold_case_data/palazzo_of_bones/portrait_elena_parisi.jpeg",
    lastSeenDate: json.lastSeenDate || "Unknown",
    lastSeenTime: json.lastSeenTime || "Unknown",
    lastSeenLocation: json.lastSeenLocation || "Unknown",
    clothingWorn: json.clothingWorn || "Unknown",
    summary: json.summary || "No statement provided.",
    fieldNotes: Array.isArray(json.fieldNotes) ? json.fieldNotes : []
  };
}