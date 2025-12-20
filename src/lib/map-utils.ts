/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export interface MapMarker {
  id: string;
  x: number; // 0-100% position
  y: number; // 0-100% position
  label: string;
  description?: string;
  type?: "crime" | "suspect" | "clue" | "location";
}

export interface MapData {
  title: string;
  region: string;
  date: string;
  imageUrl: string;
  markers: MapMarker[];
  scale?: string;
}

// --- Parsing Logic ---
export function parseMapData(content: string): MapData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = {};
  }

  return {
    title: json.title || "CITY MAP",
    region: json.region || "RIVERDALE DISTRICT",
    date: json.date || "1948",
    imageUrl: json.imageUrl || "/placeholder-map.jpg", // Fallback if needed
    markers: Array.isArray(json.markers) ? json.markers : [],
    scale: json.scale || "1:10,000"
  };
}