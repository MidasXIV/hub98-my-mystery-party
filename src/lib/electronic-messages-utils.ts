/* eslint-disable @typescript-eslint/no-explicit-any */
export type ElectronicType = "EMAIL" | "SMS" | "WHATSAPP" | "CHAT";

export interface MessageBubble {
  sender: string;
  time: string;
  body: string;
  isMe: boolean; // true = right side (outgoing), false = left side (incoming)
}

export interface ElectronicCommData {
  type: ElectronicType; // Determines layout
  platformName: string; // e.g. "Gmail", "iMessage", "AOL"
  caseRef: string;
  printDate: string;
  
  // Email Specifics
  subject?: string;
  from?: string;
  to?: string;
  
  // Chat Specifics
  participants?: string; // e.g. "Chat with Marco R."
  
  messages: MessageBubble[];
}

export function parseElectronicData(content: string): ElectronicCommData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { messages: [] };
  }

  return {
    type: json.type || "EMAIL",
    platformName: json.platformName || "System Log",
    caseRef: json.caseRef || `DIGITAL-EVID-${Math.floor(Math.random() * 999)}`,
    printDate: json.printDate || new Date().toLocaleDateString(),
    subject: json.subject,
    from: json.from,
    to: json.to,
    participants: json.participants || "Unknown",
    messages: Array.isArray(json.messages) ? json.messages : [
      { sender: "System", time: "--:--", body: content || "No content", isMe: false }
    ]
  };
}