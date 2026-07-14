export interface BoardingPassData {
  type: "private-jet" | "commercial" | "charter" | "generic";
  passengerName?: string;
  passengerId?: string;
  flightNumber?: string;
  tailNumber?: string; // for private jets
  departure: string;
  arrival: string;
  departTime?: string;
  arriveTime?: string;
  seat?: string;
  class?: string;
  ticketNumber?: string;
  bookingRef?: string;
  gate?: string;
  boardingGroup?: string;
  boarding?: string;
  caseRef?: string;
  notes?: string;
  provider?: string;
  date?: string;
}

export function parseBoardingPass(content: string): BoardingPassData {
  try {
    const json = JSON.parse(content);
    // basic normalization
    return {
      type: (json.type as BoardingPassData['type']) || "generic",
      passengerName: json.passengerName || json.name || undefined,
      passengerId: json.passengerId || json.passenger_id || undefined,
      flightNumber: json.flightNumber || json.flight_number || undefined,
      tailNumber: json.tailNumber || json.tail_number || undefined,
      departure: json.departure || json.from || "UNKNOWN",
      arrival: json.arrival || json.to || "UNKNOWN",
      departTime: json.departTime || json.depart_time || undefined,
      arriveTime: json.arriveTime || json.arrive_time || undefined,
      seat: json.seat || undefined,
      class: json.class || json.travelClass || undefined,
      ticketNumber: json.ticketNumber || json.ticket_number || undefined,
      bookingRef: json.bookingRef || json.booking_ref || undefined,
      gate: json.gate || undefined,
      boardingGroup: json.boardingGroup || json.boarding_group || undefined,
      boarding: json.boarding || undefined,
      caseRef: json.caseRef || json.case_ref || undefined,
      notes: json.notes || undefined,
      provider: json.provider || undefined,
      date: json.date || undefined,
    };
  } catch {
    // fallback: try to parse by regex-ish excerpts
    const lines = String(content).split(/\n/).map((l) => l.trim());
    const get = (label: string) => {
      const match = lines.find((l) => l.toLowerCase().startsWith(label.toLowerCase()));
      return match ? match.split(":").slice(1).join(":").trim() : undefined;
    };
    return {
      type: "generic",
      passengerName: get("name") || get("passenger") || undefined,
      flightNumber: get("flight") || undefined,
      tailNumber: get("tail") || undefined,
      departure: get("from") || "UNKNOWN",
      arrival: get("to") || "UNKNOWN",
      departTime: get("depart") || undefined,
      arriveTime: get("arrive") || undefined,
      seat: get("seat") || undefined,
      class: get("class") || undefined,
      ticketNumber: get("ticket") || undefined,
      bookingRef: get("booking") || undefined,
      gate: get("gate") || undefined,
      boardingGroup: get("group") || undefined,
      boarding: get("boarding") || undefined,
      caseRef: get("case") || undefined,
      notes: lines.join(" ") || undefined,
      provider: get("provider") || undefined,
      date: get("date") || undefined,
    };
  }
}
