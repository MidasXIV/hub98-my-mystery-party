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

  // Aliases for the case-data rail style tickets
  const normalizedType = ((): TicketType => {
    const t = String(json.type ?? json.ticketType ?? "generic").toLowerCase();
    if (t.includes("train") || t.includes("rail")) return "train";
    if (t.includes("movie") || t.includes("cinema") || t.includes("film")) return "movie";
    if (t.includes("park")) return "parking";
    return "generic";
  })();

  const venue =
    json.venue ||
    json.provider ||
    json.operator ||
    json.company ||
    json.agency ||
    "ADMIT ONE";

  const date = json.date || json.journeyDate || json.travelDate || "---";
  const time = json.time || json.departureTime || json.boardingTime || undefined;

  const derivedTitle = (() => {
    // Prefer explicit title if present
    if (json.title) return String(json.title);

    // Rail-style: show route + passenger details compactly
    const from = json.from ? String(json.from) : "";
    const to = json.to ? String(json.to) : "";
  const route = from && to ? `${from} - ${to}` : from || to;

    const passengerName = json.passengerName ? String(json.passengerName) : "";
    const coach = json.coach ? String(json.coach) : "";
    const seat = json.seat ? String(json.seat) : "";
    const coachSeat = coach && seat ? `${coach}-${seat}` : coach || seat;

    const bits = [route, passengerName, coachSeat].filter(Boolean);
  return bits.length ? bits.join(" • ") : undefined;
  })();

  const serial =
    json.serial ||
    json.pnr ||
    json.bookingRef ||
    json.ticketNumber ||
    `No. ${Math.floor(Math.random() * 99999)}`;

  return {
    type: normalizedType,
    venue,
    title: derivedTitle,
    date,
    time,
    price: json.price || json.fare || json.amount || undefined,
    serial,
    isPunched: json.isPunched ?? false,
  };
}