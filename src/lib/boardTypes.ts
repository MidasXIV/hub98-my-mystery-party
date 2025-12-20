// Shared board types and constants
export const ITEM_TYPES = [
  "photo",
  "document",
  "note",
  "clue",
  "folder-tab",
  "autopsy-report",
  "formal-alibi",
  "interrogation-transcript",
  "newspaper",
  "diary",
  "person-of-interest-report",
  "receipt",
  "ticket", // train , movie, parking, office card
  "phoneLog",
  "activity-log", // guest log, inventory log, any table log
  "map",
  "search-and-rescue-report",
  "missing-person-report",
  "electronic-messages", // (email and sms/chat)
  "case-briefing",
  "transmission-log",
] as const;

export type BoardItemType = (typeof ITEM_TYPES)[number];

export type PackagingSlot = "suspect" | "evidence" | "bonus";

export interface BoardItem {
  id: string;
  title?: string;
  type: BoardItemType;
  content: string;
  position: { x: number; y: number }; // percentage values relative to viewport
  size: { width: number; height: number }; // pixel dimensions
  rotation: number; // degrees
  /** Optional direct image URL/path for photo items. If provided and item.type === 'photo', this is used instead of any name-based lookup. */
  imageUrl?: string;
  /** Packaging destinations for this evidence item (index builder). */
  packIn: PackagingSlot[];
}

export interface Connection {
  from: string;
  to: string;
}

export interface Objective {
  id: string;
  description: string;
}

export interface BoardData {
  items: BoardItem[];
  connections: Connection[];
  objectives: Objective[];
}
