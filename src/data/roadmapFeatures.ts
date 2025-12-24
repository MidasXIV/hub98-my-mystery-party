export type RoadmapFeatureStatus = "idea" | "planned" | "in-progress" | "beta" | "launched";
export type RoadmapCategory = "core" | "ui" | "performance" | "gameplay" | "integrations";

export type RoadmapPriority = "low" | "medium" | "high";

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  status: RoadmapFeatureStatus;
  votes: number;
  createdAt: string; // ISO string
  tags?: string[];
  /**
   * Relative prioritization independent of votes.
   * Used internally to surface strategically important items (e.g. offline support).
   */
  priority?: RoadmapPriority;
}

// Initial hard-coded features (replace with DB/API later)
export const roadmapFeatures: RoadmapFeature[] = [
  {
    id: "digital-evidence-board",
    title: "Digital Evidence Board",
    description:
      "A virtual board for organizing and visualizing evidence, timelines, and connections between clues.",
    category: "core",
    status: "launched",
    votes: 123,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    tags: ["multiplayer", "realtime"],
  },
  {
    id: "timeline-collaboration",
    title: "Real‑time Collaborative Timeline Editing",
    description:
      "Allow multiple players to annotate and rearrange the investigation timeline simultaneously with presence indicators.",
    category: "core",
    status: "idea",
    votes: 42,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    tags: ["multiplayer", "realtime"],
  },
  {
    id: "evidence-ai-summarizer",
    title: "AI Evidence Summarizer",
    description:
      "A contextual summarizer that condenses collected clues into short briefs you can pin to the board.",
    category: "integrations",
    status: "idea",
    votes: 67,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    tags: ["ai", "ux"],
  },
  {
    id: "darkroom-mode",
    title: "Darkroom Photo Enhancements",
    description:
      "Interactive filters for enlarging, enhancing, and marking photographs like a real forensic darkroom.",
    category: "ui",
    status: "idea",
    votes: 58,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    tags: ["images", "filters"],
  },
  {
    id: "case-sharing-template",
    title: "Shareable Case Setup Templates",
    description:
      "Export & import curated case configurations so community members can remix cold cases.",
    category: "gameplay",
    status: "idea",
    votes: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    tags: ["community"],
  },
  {
    id: "performance-offline",
    title: "Offline Investigation Mode",
    description:
      "Cache board data & evidence so investigations continue with flaky connections.",
    category: "performance",
    status: "in-progress",
    votes: 90,
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    tags: ["pwa"],
  },
  {
    id: "downloadable-case-files",
    title: "Downloadable Case Files (Offline Packs)",
    description:
      "Allow players to download encrypted case bundles for travel or limited connectivity sessions.",
    category: "core",
    status: "in-progress",
    votes: 55,
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0.5).toISOString(),
    tags: ["offline", "portability"],
  },
  {
    id: "character-location-customization",
    title: "Character & Location Customization",
    description:
      "Enable renaming suspects and customizing investigation locations for personalized or themed game nights.",
    category: "gameplay",
    status: "planned",
    votes: 38,
    priority: "medium",
    createdAt: new Date(Date.now()).toISOString(),
    tags: ["personalization"],
  },
  {
    id: "discord-integration",
    title: "Discord Presence & Clue Sync",
    description:
      "Surface active case progress and let teams sync pinned clues to a Discord channel.",
    category: "integrations",
    status: "idea",
    votes: 52,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    tags: ["social"],
  },
];

export const statusLabels: Record<RoadmapFeatureStatus, string> = {
  idea: "Idea",
  planned: "Planned",
  "in-progress": "In Progress",
  beta: "Beta",
  launched: "Launched",
};

export const categoryLabels: Record<RoadmapCategory, string> = {
  core: "Core",
  ui: "UI/Design",
  performance: "Performance",
  gameplay: "Gameplay",
  integrations: "Integrations",
};

export const priorityLabels: Record<RoadmapPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High Priority",
};
