export interface Evidence {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ColdCase {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  tags: string[];
  description: string;
  difficulty?: string;
  players?: string;
  duration?: string;
  price?: number;
  evidence?: Evidence[];
}

export const coldCases: ColdCase[] = [
  {
    id: 1,
    slug: "mayfield-manor-mystery",
    title: "The Mayfield Manor Mystery",
    imageUrl: "/cold_cases/thumbnails/shining_star.png",
    tags: ["Date Night", "1-2 Players", "High Difficulty"],
    description:
      "An unsolved disappearance in an old manor. Piece together letters, blueprints, and alibis to reveal what really happened one stormy night.",
    difficulty: "Hard",
    players: "1-2",
    duration: "2-3 hours",
    price: 29.99,
    evidence: [
      {
        title: "Letter from the Manor",
        description: "A cryptic letter found in the study.",
        imageUrl: "/cold_cases/thumbnails/evidence_letter.png"
      },
      {
        title: "Blueprints",
        description: "Blueprints of the manor with hidden markings.",
        imageUrl: "/cold_cases/thumbnails/evidence_blueprint.png"
      }
    ],
  },
  {
    id: 2,
    slug: "golden-lotus-conspiracy",
    title: "Golden Lotus Conspiracy",
    imageUrl: "/cold_cases/thumbnails/golden_lotus.png",
    tags: ["True Crime", "Group Fun", "Hard Difficulty"],
    description:
      "A shadowy society, a priceless artifact, and a trail of coded messages. Decode the conspiracy before it vanishes without a trace.",
    difficulty: "Hard",
    players: "2-4",
    duration: "2-4 hours",
    price: 34.99,
    evidence: [
      {
        title: "Coded Message",
        description: "A message written in cipher.",
        imageUrl: "/cold_cases/thumbnails/evidence_code.png"
      },
      {
        title: "Artifact Photo",
        description: "A blurry photo of the stolen artifact.",
        imageUrl: "/cold_cases/thumbnails/evidence_artifact.png"
      }
    ],
  },
  {
    id: 3,
    slug: "silent-starlet",
    title: "The Silent Starlet",
    imageUrl: "/cold_cases/thumbnails/andi_bell.png",
    tags: ["Solo Mission", "2-3 Hours", "Historical"],
    description:
      "A 1940s Hollywood star disappears on the eve of her biggest premiere. Examine studio memos, film stills, and gossip columns to uncover the truth.",
    difficulty: "Medium",
    players: "1-3",
    duration: "2-3 hours",
    price: 27.5,
    evidence: [
      {
        title: "Studio Memo",
        description: "A memo from the film studio.",
        imageUrl: "/cold_cases/thumbnails/evidence_memo.png"
      },
      {
        title: "Gossip Column",
        description: "A newspaper clipping with rumors.",
        imageUrl: "/cold_cases/thumbnails/evidence_gossip.png"
      }
    ],
  },
  {
    id: 4,
    slug: "gone-before-dawn",
    title: "Gone Before Dawn",
    imageUrl: "/cold_cases/thumbnails/free_the_bees.png",
    tags: ["4+ Players", "Twisted Plot", "Easy Difficulty"],
    description:
      "A small town wakes to a missing person and a cryptic mural overnight. Unravel overlapping timelines to bring the victim home.",
    difficulty: "Easy",
    players: "3-6",
    duration: "1.5-2.5 hours",
    price: 24.99,
    evidence: [
      {
        title: "Mural Photo",
        description: "A photo of the mysterious mural.",
        imageUrl: "/cold_cases/thumbnails/evidence_mural.png"
      },
      {
        title: "Timeline Chart",
        description: "A chart of overlapping timelines.",
        imageUrl: "/cold_cases/thumbnails/evidence_timeline.png"
      }
    ],
  },
  {
    id: 5,
    slug: "echoes-of-the-deep",
    title: "Echoes of the Deep",
    imageUrl: "/cold_cases/thumbnails/missing_person.png",
    tags: ["Date Night", "Puzzle Heavy", "High Difficulty"],
    description:
      "A marine research station sends one last garbled transmission. Dive into sonar maps, lab notes, and encrypted logs to find what lurks beneath.",
    difficulty: "Hard",
    players: "1-4",
    duration: "3-5 hours",
    price: 39.0,
    evidence: [
      {
        title: "Sonar Map",
        description: "A sonar map with strange readings.",
        imageUrl: "/cold_cases/thumbnails/evidence_sonar.png"
      },
      {
        title: "Lab Notes",
        description: "Encrypted lab notes from the station.",
        imageUrl: "/cold_cases/thumbnails/evidence_lab.png"
      }
    ],
  },
];

export function getCaseBySlug(slug: string) {
  return coldCases.find((c) => c.slug === slug);
}
