export type RoadmapFeatureStatus = "idea" | "planned" | "in-progress" | "beta" | "launched";
export type RoadmapCategory = "core" | "ui" | "performance" | "gameplay" | "integrations";

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  status: RoadmapFeatureStatus;
  votes: number;
  createdAt: string; // ISO string
  tags?: string[];
}

// Initial hard-coded features (replace with DB/API later)
export const roadmapFeatures: RoadmapFeature[] = [
  {
    id: "timeline-collaboration",
    title: "Real‑time Collaborative Timeline Editing",
    description:
      "Allow multiple players to annotate and rearrange the investigation timeline simultaneously with presence indicators.",
    category: "core",
    status: "planned",
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
    status: "in-progress",
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
    status: "planned",
    votes: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    tags: ["pwa"],
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
