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
] as const;

export type BoardItemType = (typeof ITEM_TYPES)[number];

export interface BoardItem {
  id: string;
  type: BoardItemType;
  content: string;
  position: { x: number; y: number }; // percentage values relative to viewport
  size: { width: number; height: number }; // pixel dimensions
  rotation: number; // degrees
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
