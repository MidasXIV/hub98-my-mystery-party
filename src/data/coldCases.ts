import HER_SHADOWS_NAME_DATA from "./her-shadows-name-data";
import PALAZZO_OF_BONES_DATA from "./palazzo-of-bones-data";
import STATION_ZERO_DATA from "./station-zero-data";
import ZERO_SUM_DATA from "./zero-sum-data";
import FINAL_REHEARSAL_DATA from "./the-final-rehearsal-data";

export interface Evidence {
  title: string;
  description: string;
  imageUrl?: string;
}

// Note: case data provides its own imagery; keeping prior placeholders removed to avoid unused vars

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
  evidence?: Record<string, unknown> | Evidence[];
  /** Optional packaging columns available for this case's index (e.g. suspect, evidence, bonus) */
  packagingColumns?: Array<"suspect" | "evidence" | "bonus">;
  /** Whether the case can currently be purchased */
  isPurchasable?: boolean;
  /** Whether a sample download is available */
  hasDownloadSample?: boolean;

  preview?: Array<{
    name: string;
    typeOfPreview: string;
    title?: string;
    profile?: string;
    content: string;
    mediaUrl?: string;
    thumbnail?: string;
    hideProfile?: boolean;
  }>;
}

export const coldCases: ColdCase[] = [
  {
    id: 6,
    slug: "station-zero",
    title: "Station Zero: Ghost of the Machine",
    imageUrl: "/cold_cases/thumbnails/station_zero.png",
    tags: ["Puzzle Heavy", "High Difficulty"],
    description:
      "A marine research station sends one last garbled transmission. Dive into sonar maps, lab notes, and encrypted logs to find what lurks beneath.",
    difficulty: "Hard",
    players: "1-4",
    duration: "3-5 hours",
    price: 39.0,
    evidence: STATION_ZERO_DATA,
    // For Station Zero we maintain two packaging destinations only
    packagingColumns: ["suspect", "evidence"],
    // Intentionally mark this one as not yet purchasable / downloadable
    isPurchasable: false,
    hasDownloadSample: false,
    preview: [
      {
        name: "The Investigation Board",
        profile: "/cold_cases/previews/station_zero/preview-board.png",
        thumbnail: "/cold_cases/previews/station_zero/preview-board.png",
        title: "Become the Detective",
        typeOfPreview: "image",
        content:
          "Welcome to your new HQ. Our interactive case board lets you pin, link, and jump between scattered clues. No hand-holding, just pure, messy detective work. Your investigation starts now.",
        hideProfile: true,
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/SZ_demo-1.mp4",
      },
      {
        name: "The Case Briefing",
        profile: "/cold_cases/previews/station_zero/preview-case-briefing.png",
        thumbnail:
          "/cold_cases/previews/station_zero/preview-case-briefing.png",
        title: "Your Mission Awaits",
        typeOfPreview: "image",
        content:
          "Receive your classified case file from the Director of the Cold Case Division. The official story is a lie. It’s your job to uncover what really happened aboard Station Zero.",
        hideProfile: true,
      },
      {
        name: "The Crew's Diaries",
        profile: "/cold_cases/previews/station_zero/preview-diary.png",
        thumbnail: "/cold_cases/previews/station_zero/preview-diary.png",
        title: "Unlock Their Final Thoughts",
        typeOfPreview: "image",
        content:
          "Go beyond the official reports. With our custom diary viewer, you'll read the final, terrified entries of the crew. Uncover secrets and lies hidden in their own words. This is evidence you won't find anywhere else!",
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/SZ_demo-3.mp4",
      },
      {
        name: "The Haunting",
        profile: "/cold_cases/previews/station_zero/preview-haunting.jpeg",
        thumbnail: "/cold_cases/previews/station_zero/preview-haunting.jpeg",
        title: "Fact vs. Phantom",
        typeOfPreview: "video",
        content:
          "The crew's final message spoke of a 'ghost in the machine.' Was the station truly haunted, or was it a cover for something far more sinister? Analyze the chilling evidence and separate supernatural horror from cold-blooded murder.",
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/Whisk_iwyhrjzjlzykhjz50iymntytizywqtl0mjmk1co.mp4",
      },
      {
        name: "Connecting Clues",
        profile:
          "/cold_cases/previews/station_zero/preview-connecting-clues.png",
        thumbnail:
          "/cold_cases/previews/station_zero/preview-connecting-clues.png",
        title: "Connect the Dots. Expose the Truth.",
        typeOfPreview: "image",
        content:
          "A torn note... a suspicious system log... a transcript from a forgotten past. The clues are all there, but they're disconnected. It's your job to draw the lines, uncover the motive, and reveal the killer's web of lies.",
        hideProfile: true,
      },
      {
        name: "Dig for Clues",
        profile:
          "/cold_cases/previews/station_zero/preview-transmission-log.png",
        thumbnail:
          "/cold_cases/previews/station_zero/preview-transmission-log.png",
        title: "Dig Through the Data Ghost",
        typeOfPreview: "image",
        content:
          "The truth is buried in the static. Shuffle through dozens of evidence items—from corrupted CCTV stills to cryptic personal notes. The killer made a mistake. Your job is to find it.",
        hideProfile: true,
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/SZ_demo-2.mp4",
      },
    ],
  },
  {
    id: 4,
    slug: "the-final-rehearsal",
    title: "The Final Rehearsal",
    imageUrl: "/cold_cases/thumbnails/final_rehearsal.png",
    tags: [
      "School Mystery",
      "Who Dun It",
      "Detective Game",
      "For Teens",
      "1-2 Players",
      "Easy",
    ],
    description:
      "The curtain falls on the final rehearsal, but the real drama is just beginning! When the star actress is found mysteriously locked in the prop vault right before opening night, it’s up to you to solve this hilarious high school who dun it. Dig through evidence like secret notes, suspicious security logs, and dramatic witness interviews to uncover a plot that’s bigger than just backstage jealousy. Was it a rival actor, a framed techie, or a faculty member with a shocking secret agenda? Crack the case before the show is ruined for good!",
    difficulty: "Easy/Medium",
    players: "1-2",
    duration: "1.5-2 hours",
    price: 0,
    evidence: FINAL_REHEARSAL_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
    preview: [
      {
        name: "The Game Board",
        profile:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_preview.png",
        thumbnail:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_preview.png",
        title: "A Whole Hot Mess",
        typeOfPreview: "video",
        content:
          "Welcome to your evidence board: a digital collection of clues messier than a group chat after a breakup. Drag, drop, and pin everything together to sort the facts from the fiction. It’s up to you to clean up this drama.",
        hideProfile: true,
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/the_final_rehearsal/final%20rehearsal_board.mp4",
      },
      {
        name: "The Campus Map",
        profile: "/cold_cases/previews/final_rehearsal/school_map.png",
        thumbnail: "/cold_cases/previews/final_rehearsal/school_map.png",
        title: "Mapping the Lies",
        typeOfPreview: "image",
        content:
          "Check the map to see if Cora was actually in her dance studio or if she was doing some 'secret cardio' near the Prop Vault. If someone claims they were in the booth but the logs say they were at the snack bar, you've caught a liar.",
        hideProfile: true,
      },
      {
        name: "Spill the Tea",
        profile:
          "/cold_cases/previews/final_rehearsal/justin_interrogation.png",
        thumbnail:
          "/cold_cases/previews/final_rehearsal/justin_interrogation.png",
        title: "Diva Rants & Gamer Excuses",
        typeOfPreview: "image",
        content:
          "Read through interviews filled with 'Her Leadness' diva fits and Ray’s gaming excuses. Everyone is lying about something. Type in your theories in plain English and if you’re right, you’ll expose the liars and move the story forward.",
      },
      {
        name: "Evidence Drops",
        profile:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_more_evidence.png",
        thumbnail:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_more_evidence.png",
        title: "Loot for Brains",
        typeOfPreview: "image",
        content:
          "Solve an objective and get rewarded with a fresh 'loot drop' of evidence photos. Every correct answer unlocks two new snapshots that help you unmask the person who tried to sabotage the school play for football gear.",
      },
    ],
  },
  // {
  //   id: 1,
  //   slug: "mayfield-manor-mystery",
  //   title: "The Mayfield Manor Mystery",
  //   imageUrl: "/cold_cases/thumbnails/shining_star.png",
  //   tags: ["Date Night", "1-2 Players", "High Difficulty"],
  //   description:
  //     "An unsolved disappearance in an old manor. Piece together letters, blueprints, and alibis to reveal what really happened one stormy night.",
  //   difficulty: "Hard",
  //   players: "1-2",
  //   duration: "2-3 hours",
  //   price: 29.99,
  //   evidence: [
  //     {
  //       title: "Letter from the Manor",
  //       description: "A cryptic letter found in the study.",
  //       imageUrl: "/cold_cases/thumbnails/evidence_letter.png",
  //     },
  //     {
  //       title: "Blueprints",
  //       description: "Blueprints of the manor with hidden markings.",
  //       imageUrl: "/cold_cases/thumbnails/evidence_blueprint.png",
  //     },
  //   ],
  //   isPurchasable: false,
  //   hasDownloadSample: false,
  // },
  {
    id: 2,
    slug: "palazzo-of-bones",
    title: "The Palazzo of Bones",
    imageUrl: "/cold_cases/thumbnails/palazzo_of_bones.jpeg",
    tags: ["Date Night", "1-2 Players", "High Difficulty"],
    description:
      "An unsolved disappearance in an old manor. Piece together letters, blueprints, and alibis to reveal what really happened one stormy night.",
    difficulty: "Hard",
    players: "1-2",
    duration: "2-3 hours",
    price: 79.99,
    evidence: PALAZZO_OF_BONES_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
  },

  {
    id: 3,
    slug: "zero-sum",
    title: "Zero Sum",
    imageUrl: "/cold_cases/thumbnails/zero_sum_2.jpeg",
    tags: ["Date Night", "1-2 Players", "Medium Difficulty"],
    description:
      "A celebrated actor vanishes during a film shoot in a remote location. Analyze scripts, call sheets, and personal notes to uncover hidden motives and secrets.",
    difficulty: "Medium",
    players: "1-2",
    duration: "2-3 hours",
    price: 24.99,
    evidence: ZERO_SUM_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
  },

  {
    id: 7,
    slug: "her-shadows-name",
    title: "Her Shadow's Name",
    imageUrl: "/cold_cases/thumbnails/her_shadows_name.jpeg",
    tags: ["Missing", "1-2 Players", "High Difficulty"],
    description: `
      In the secluded, fog-choked town of Black Creek, Maine, some secrets are woven into the very wood and stone.
On October 28th, Eleanor Vance, Age 24, disappeared.
Her last location was 412 Hemlock Lane—a house heavy with its own history—where her grandmother, Edith Vance, maintained that Eleanor simply left. The front door was found unlocked. Her keys and wallet were on the counter.
The only item missing: Eleanor's private journal.
Days later, it was found near the old Black Creek Bridge. Its pages were not the record of a sane mind, but a chilling testament to a descent into shared madness:
> ...the calls come after three. He never speaks my name. Only hers.
> 
The local report cites "severe isolation and self-induced psychosis," pointing to Ellie's obsession with the single, whispered word in her diary: Cora.
Yet, in Black Creek, a name is never just a name. It is a promise. It is a warning.
Eleanor Vance's body was never recovered. The file is closed. But if you look closely at the faded photographs and the scribbled entries, you have to ask:
Did Eleanor wander off? Or did she answer the call of her shadow's name?
      `,
    difficulty: "Hard",
    players: "1-2",
    duration: "4-5 hours",
    price: 49.99,
    evidence: HER_SHADOWS_NAME_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
  },
];

export function getCaseBySlug(slug: string) {
  return coldCases.find((c) => c.slug === slug);
}
