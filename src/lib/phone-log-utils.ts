/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PhoneCall {
  time: string;
  destination: string; // The number called
  direction: "INCOMING" | "OUTGOING";
  duration: string;
  cost?: string;
  tower?: string; // For early mobile, or exchange location
}

export interface TelecomLogData {
  provider: string; // e.g. "Riverdale Bell" or "AT&T"
  subscriber: string; // The victim's name
  phoneNumber: string; // The victim's number
  period: string; // "Oct 01 - Oct 31"
  caseId: string;
  calls: PhoneCall[];
}

export function parseTelecomLog(content: string): TelecomLogData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { calls: [] };
  }

  return {
    provider: json.provider || "RIVERDALE TELECOM",
    subscriber: json.subscriber || "UNKNOWN SUBSCRIBER",
    phoneNumber: json.phoneNumber || "555-0000",
    period: json.period || "CURRENT CYCLE",
    caseId: json.caseId || `REQ-${Math.floor(Math.random() * 99999)}`,
    calls: Array.isArray(json.calls) ? json.calls : []
  };
}