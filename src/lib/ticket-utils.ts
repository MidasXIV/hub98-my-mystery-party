/* eslint-disable @typescript-eslint/no-explicit-any */
// --- Types ---
export type TicketType = "movie" | "train" | "parking" | "generic";

export interface TicketData {
  /** The type determines the visual theme (Red for movies, Beige for train, Blue for parking) */
  type: TicketType;
  /** Main header (e.g. "RIVERDALE CINEMA" or "UNION STATION") */
  venue: string;
  /** Specific event or details (e.g. "Matinee: The Big Sleep" or "Zone 4 Entry") */
  title?: string;
  /** Date string */
  date: string;
  /** Time string */
  time?: string;
  /** Price (e.g. "$0.50") */
  price?: string;
  /** Seat number, Platform, or Serial ID */
  serial?: string;
  /** Whether the ticket has been "punched" (used) */
  isPunched?: boolean;
}

// --- Parsing Logic ---
export function parseTicketData(content: string): TicketData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    // Fallback: Try to guess based on raw string
    const venueMatch = content.match(/^(.*?)(?:\n|$)/);
    json = { venue: venueMatch ? venueMatch[1] : "TICKET" };
  }

  return {
    type: json.type || "generic",
    venue: json.venue || "ADMIT ONE",
    title: json.title || undefined,
    date: json.date || "---",
    time: json.time || undefined,
    price: json.price || undefined,
    serial: json.serial || `No. ${Math.floor(Math.random() * 99999)}`,
    isPunched: json.isPunched ?? true,
  };
}