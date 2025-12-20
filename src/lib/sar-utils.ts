/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface MapLegendItem {
  color: string; // e.g. "bg-red-500/50" or hex
  label: string;
  pattern?: "solid" | "hatched" | "dotted";
}

export interface SearchLogEntry {
  time: string;
  unit: string;
  notes: string;
}

export interface SearchAndRescueData {
  operationName: string;
  date: string;
  sector: string;
  gridReference: string;
  // Map Config
  mapImageUrl?: string; // Optional custom map, otherwise we use a generic topo pattern
  legend: MapLegendItem[];
  // Narrative
  briefing: string;
  terrainNotes: string;
  // Tables
  searchLog: SearchLogEntry[];
  // Footer
  author: string;
}

// --- Parser ---
export function parseSARData(content: string): SearchAndRescueData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { briefing: content };
  }

  return {
    operationName: json.operationName || "OP: BLACK CREEK",
    date: json.date || "UNKNOWN DATE",
    sector: json.sector || "SECTOR 1-A",
    gridReference: json.gridReference || "GRID 88-92",
    mapImageUrl: json.mapImageUrl,
    legend: Array.isArray(json.legend) ? json.legend : [
      { color: "#86efac", label: "Sector 1A (Cleared)", pattern: "solid" },
      { color: "#fca5a5", label: "Sector 1B (Unstable)", pattern: "hatched" },
      { color: "#93c5fd", label: "Water Course", pattern: "solid" }
    ],
    briefing: json.briefing || "No briefing data available.",
    terrainNotes: json.terrainNotes || "Heavy vegetation. Visibility < 20ft.",
    searchLog: Array.isArray(json.searchLog) ? json.searchLog : [],
    author: json.author || "SAR COORD"
  };
}