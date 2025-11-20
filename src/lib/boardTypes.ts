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
  // New multi-entry log / journal item type
  "diary",
] as const;

export type BoardItemType = (typeof ITEM_TYPES)[number];

export interface BoardItem {
  id: string;
  type: BoardItemType;
  content: string;
  position: { x: number; y: number }; // percentage values relative to viewport
  size: { width: number; height: number }; // pixel dimensions
  rotation: number; // degrees
  /** Optional direct image URL/path for photo items. If provided and item.type === 'photo', this is used instead of any name-based lookup. */
  imageUrl?: string;
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
