import HER_SHADOWS_NAME_DATA from "./her-shadows-name-data";
import PALAZZO_OF_BONES_DATA from "./palazzo-of-bones-data";
import STATION_ZERO_DATA from "./station-zero-data";
import ZERO_SUM_DATA from "./zero-sum-data";
import FINAL_REHEARSAL_DATA from "./the-final-rehearsal-data";
import SINS_OF_SAINT_LAZARUS_DATA from "./sins-of-saint-lazarus-data"

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
  seoTitle?: string;
  pageTitle?: string;
  shortDescription?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  betaNotice?: string;
  imageUrl: string;
  tags: string[];
  description: string;
  difficulty?: string;
  players?: string;
  duration?: string;
  price?: number;
  seoSections?: Array<{
    title: string;
    body: string;
  }>;
  evidence?: Record<string, unknown> | Evidence[];
  /** Optional packaging columns available for this case's index (e.g. suspect, evidence, bonus) */
  packagingColumns?: Array<"suspect" | "evidence" | "bonus">;
  /** Whether the case can currently be purchased */
  isPurchasable?: boolean;
  /** Whether a sample download is available */
  hasDownloadSample?: boolean;
  /** Whether the interactive board/play experience is available */
  isPlayable?: boolean;

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
    seoTitle: "Sci-Fi Cold Case Date Night | Station Zero: Ghost of the Machine",
    pageTitle: "Station Zero: Ghost of the Machine",
    shortDescription:
      "A sci-fi cold case for date night set aboard a silent deep-space station, where you investigate corrupted logs, crew diaries, and a deadly sabotage plot.",
    seoDescription:
      "Play Station Zero, a sci-fi cold case date night mystery set on a deep-space research station. Review crew diaries, corrupted transmissions, and classified research to solve a chilling space horror investigation.",
    seoKeywords: [
      "free cold case date night scifi cold case",
      "sci-fi cold case",
      "space mystery game",
      "date night mystery game",
      "space horror investigation",
      "interactive cold case game",
    ],
    betaNotice:
      "Station Zero is currently in beta. The core mystery is playable, but some features, polish, and pacing details may still change. If you're planning a date night and want the smoothest experience possible, treat this as an early-access investigation rather than a fully finalized premium case.",
    imageUrl: "/cold_cases/thumbnails/station_zero.png",
    tags: ["Sci-Fi Mystery", "Space Horror", "Puzzle Heavy", "High Difficulty"],
    description:
      "Station Zero is a sci-fi cold case set aboard a deep-space research platform that went silent during a brutal solar storm. The last thing anyone heard was a terrified voice, whispers tangled in static, and one phrase that never should’ve made it into an official report: a ‘ghost in the machine.’\n\nNow the Cold Case Division has recovered a fragmented ‘data ghost’—crew diaries, corrupted system logs, classified xenobotany research, and sealed incident records tied to Myco‑Veridia. Your job is to investigate the station’s final days, sort sabotage from hallucination, and uncover what really happened behind those locked bulkheads. If you want a cinematic space mystery game with layered evidence, tense deduction, and a dark sci-fi horror atmosphere, this is your case.",
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
    // Board/play exists
    isPlayable: true,
    seoSections: [
      {
        title: "Why Station Zero works as a sci-fi cold case date night",
        body:
          "Station Zero blends the tension of a classic cold case with the atmosphere of a deep-space thriller. Instead of racing through a short set of clues, you and your partner can slowly piece together crew diaries, corrupted system logs, research files, and fractured transmissions. That makes it a strong choice for players who want a more immersive date night mystery: there is enough evidence to discuss, argue over, and revisit as your theories change. The mystery is readable and cinematic, but still layered enough to reward careful attention.",
      },
      {
        title: "What you investigate inside the Station Zero mystery",
        body:
          "The case begins after a long-abandoned research platform goes silent during a solar storm. From there, your investigation moves through personal diaries, technical failures, classified xenobotany records, and signs of possible sabotage. Every document adds context to the crew’s final days. Some clues point toward psychological collapse. Others suggest a very human conspiracy hiding behind the station’s haunting final message. The result is a sci-fi cold case that feels more like reconstructing a disaster than following a simple trail of breadcrumbs.",
      },
      {
        title: "Who should play this space mystery game",
        body:
          "Station Zero is best for players who enjoy solving dense mysteries, comparing notes, and sitting with uncertainty before the full picture comes into focus. If you want a fast free mystery game, one of the lighter cases on the site may be a better match. But if you want a longer sci-fi investigation for date night, game night, or a solo weekend puzzle session, Station Zero is designed for that deeper experience. The evidence is substantial, the tone is darker, and the case asks you to think like an investigator rather than wait for the story to hand you answers.",
      },
      {
        title: "Is Station Zero a good case for date night?",
        body:
          "Yes, if your idea of a great date night is solving a deeper mystery together. Station Zero gives you enough evidence to compare theories, debate motives, and work through the case as a team. It is less of a quick casual game and more of an atmospheric investigative experience.",
      },
      {
        title: "How hard is the Station Zero sci-fi cold case?",
        body:
          "Station Zero is one of the more challenging cases on the site. It asks you to read carefully, connect scattered clues, and stay patient while the bigger picture comes together. If you enjoy puzzle-heavy mysteries and slow-burn reveals, it should feel rewarding rather than overwhelming.",
      },
      {
        title: "What kind of evidence is included in Station Zero?",
        body:
          "You investigate crew diaries, corrupted transmission logs, classified research files, and other digital evidence recovered from the station. The mix of personal writing and technical records helps the mystery feel grounded while still delivering the eerie sci-fi tone.",
      },
      {
        title: "Can Station Zero be played solo or with a group?",
        body:
          "Yes. The case works for solo players who like immersive deduction, but it is also designed for small groups. Two players make a strong pair for date night, while a larger group can split up clue review and compare interpretations as the investigation unfolds.",
      },
    ],
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
    seoTitle: "Free Cold Case Date Night | The Final Rehearsal High School Mystery",
    pageTitle: "The Final Rehearsal",
    shortDescription:
      "A free cold case date night mystery with a high school setting, where you sort through notes, security logs, and witness interviews to uncover who locked the lead actress away before opening night.",
    seoDescription:
      "Play The Final Rehearsal, a free cold case date night mystery with a high school setting. Review backstage clues, suspicious security logs, and messy witness statements to solve a funny interactive whodunit.",
    seoKeywords: [
      "free cold case date night high school cold case",
      "free cold case date night",
      "high school cold case",
      "free mystery game for date night",
      "high school mystery game",
      "interactive whodunit game",
    ],
    betaNotice:
      "The Final Rehearsal is currently in beta. The full mystery is playable, but details, pacing, and UI polish may still shift as we keep improving the experience.",
    imageUrl: "/cold_cases/thumbnails/final_rehearsal.png",
    tags: [
      "Free Cold Case",
      "Free Mystery",
      "Date Night",
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
    // Board/play exists
    isPlayable: true,
    seoSections: [
      {
        title: "Why The Final Rehearsal works for a free cold case date night",
        body:
          "The Final Rehearsal is an easy pick for date night because it is free, funny, and built for one or two players. You are not walking into a grim or overly dense mystery. Instead, you get a lighter high school cold case full of backstage gossip, dramatic suspects, and clues that are simple to follow without feeling boring. That makes it a good option for couples who want to solve something together without committing to a long or emotionally heavy investigation.",
      },
      {
        title: "What happens in this high school cold case",
        body:
          "Right before opening night, the lead actress is discovered locked inside the prop vault. That turns the school’s final rehearsal into a full-blown investigation. You will dig through secret notes, interview transcripts, suspicious security logs, and other messy backstage clues to figure out who planned the sabotage. The case keeps the stakes fun and dramatic, but there is still a real mystery to solve beneath the jokes and teen chaos.",
      },
      {
        title: "Is The Final Rehearsal actually free to play?",
        body:
          "Yes. The Final Rehearsal is one of the free cold case games on the site, which is part of why it ranks well as a date night option. If you want a no-risk mystery to try together before moving on to a bigger or darker case, this is a strong place to start. You get a complete investigation experience without needing to buy a premium case first.",
      },
      {
        title: "Who should play The Final Rehearsal",
        body:
          "This case is best for new detectives, couples looking for a relaxed date night mystery, and anyone who likes high school comedy with a little sabotage mixed in. Because the difficulty sits around easy to medium and the playtime is short, it is also great for players who want a complete mystery in one evening. If you want something heavier, darker, or more puzzle-dense, you can always move up to one of the harder cases after this one.",
      },
    ],
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
    id: 1,
    slug: "sins-of-saint-lazarus",
    title: "The Sins of Saint Lazarus",
    seoTitle: "Medical Mystery Game | The Sins of Saint Lazarus",
    pageTitle: "The Sins of Saint Lazarus",
    shortDescription:
      "A dark medical mystery set inside a troubled hospital, where you follow medical records, personal betrayals, and hidden motives to uncover what really happened in the operating theater.",
    seoDescription:
      "Play The Sins of Saint Lazarus, a dark hospital mystery game about medical negligence, secret affairs, and professional sabotage. Work through layered evidence in a tense interactive investigation.",
    seoKeywords: [
      "medical mystery game",
      "hospital murder mystery",
      "interactive cold case game",
      "dark hospital mystery",
      "medical negligence mystery",
      "sins of saint lazarus mystery",
    ],
    betaNotice:
      "The Sins of Saint Lazarus is currently in beta. The investigation is available, but some presentation details and quality-of-life touches may still change.",
    imageUrl: "/cold_cases/thumbnails/sins_of_saint_lazarus.png",
    tags: [
      "Medical Mystery",
      "Hospital Thriller",
      "1-2 Players",
      "High Difficulty",
    ],
    description:
      "After a mysterious six-month hiatus, the brilliant Dr. Khanna has returned to the operating theater at St. Lazarus. But his first surgery back isn't a triumph, it’s a massacre.When a routine procedure ends in an 'insane' act of negligence, the police are pulled into a labyrinth of illicit affairs, family betrayals, and professional sabotage. Everyone is a suspect, everyone has a motive, and the man at the center of it all is a doctor who seems like a total stranger to those who love him most.",
    difficulty: "Hard",
    players: "1-2",
    duration: "2-3 hours",
    price: 19.99,
    evidence: SINS_OF_SAINT_LAZARUS_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
    isPlayable: true,
    seoSections: [
      {
        title: "Why The Sins of Saint Lazarus stands out as a medical mystery",
        body:
          "The Sins of Saint Lazarus stands out because it mixes personal betrayal with institutional pressure inside a hospital setting. This is not a light or playful mystery. It is built around negligence, secrecy, family strain, and professional sabotage, which gives the case a heavier and more dramatic tone than the rest of the catalog. If you like mysteries that feel tense, morally messy, and character-driven, Lazarus has the right kind of weight.",
      },
      {
        title: "What makes this hospital mystery different",
        body:
          "Instead of focusing on a single obvious suspect, The Sins of Saint Lazarus drops you into a hospital environment full of layered pressure points. Medical records, personal betrayals, family strain, and professional sabotage all collide around one catastrophic surgery. That gives the mystery a very particular energy: every clue feels tied to both personal emotion and institutional failure. The result is a medical mystery game that feels claustrophobic, high-stakes, and deeply human.",
      },
      {
        title: "What evidence you investigate in Saint Lazarus",
        body:
          "As you work through the case, you will examine evidence connected to the operating theater, the people around Dr. Khanna, and the wider collapse of trust inside St. Lazarus. The case leans into layered documents and contradictory accounts rather than quick gimmicks. You are asked to weigh negligence against intent, emotional fallout against hard proof, and personal loyalty against self-preservation.",
      },
      {
        title: "Who should play The Sins of Saint Lazarus",
        body:
          "This case is best for players who enjoy darker mystery fiction, complicated suspects, and a more mature tone. If you like unraveling affairs, institutional pressure, and morally messy decisions, this case fits well. If you want something lighter or more beginner-friendly, one of the easier cases may be a better first stop before returning to Saint Lazarus.",
      },
    ],
  },
  {
    id: 2,
    slug: "palazzo-of-bones",
    title: "The Palazzo of Bones",
    betaNotice:
      "The Palazzo of Bones is currently in beta. Expect the mystery to be playable, with some areas still being refined as we continue polishing the case experience.",
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
    isPlayable: false,
  },

  {
    id: 3,
    slug: "zero-sum",
    title: "Zero Sum",
    betaNotice:
      "Zero Sum is currently in beta. Core content is in place, but we are still iterating on polish, flow, and overall presentation.",
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
    isPlayable: false,
  },

  {
    id: 7,
    slug: "her-shadows-name",
    title: "Her Shadow's Name",
    betaNotice:
      "Her Shadow's Name is currently in beta. The mystery experience is being actively refined, so some elements may still evolve as we improve the case.",
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
    isPlayable: false,
  },
];

export function getCaseBySlug(slug: string) {
  return coldCases.find((c) => c.slug === slug);
}
