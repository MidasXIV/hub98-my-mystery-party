import HER_SHADOWS_NAME_DATA from "./her-shadows-name-data";
import PALAZZO_OF_BONES_DATA from "./palazzo-of-bones-data";
import STATION_ZERO_DATA from "./station-zero-data";
import ZERO_SUM_DATA from "./zero-sum-data";
import FINAL_REHEARSAL_DATA from "./the-final-rehearsal-data";
import FINAL_BENCH_OFF_DATA from "./the-final-bench-off-data";
import SINS_OF_SAINT_LAZARUS_DATA from "./sins-of-saint-lazarus-data";
import THE_LAST_CHECK_IN_DATA from "./the-last-check-in";

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
  playTitle?: string;
  pageTitle?: string;
  shortDescription?: string;
  seoDescription?: string;
  playDescription?: string;
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
    seoTitle:
      "Sci-Fi Cold Case Date Night | Station Zero: Ghost of the Machine",
    playTitle: "Play Station Zero: Ghost of the Machine",
    pageTitle: "Station Zero: Ghost of the Machine",
    shortDescription:
      "A sci-fi cold case for date night set aboard a silent deep-space station, where you investigate corrupted logs, crew diaries, and a deadly sabotage plot.",
    seoDescription:
      "Play Station Zero, a sci-fi cold case date night mystery set on a deep-space research station. Review crew diaries, corrupted transmissions, and classified research to solve a chilling space horror investigation.",
    playDescription:
      "Enter the interactive Station Zero case board to connect evidence, inspect recovered transmissions, and solve the mystery in a playable investigation interface.",
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
    tags: [
      "Sci-Fi",
      "Horror",
      "Sci-Fi Mystery",
      "Space Horror",
      "Puzzle Heavy",
      "High Difficulty",
    ],
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
        body: "Station Zero blends the tension of a classic cold case with the atmosphere of a deep-space thriller. Instead of racing through a short set of clues, you and your partner can slowly piece together crew diaries, corrupted system logs, research files, and fractured transmissions. That makes it a strong choice for players who want a more immersive date night mystery: there is enough evidence to discuss, argue over, and revisit as your theories change. The mystery is readable and cinematic, but still layered enough to reward careful attention.",
      },
      {
        title: "What you investigate inside the Station Zero mystery",
        body: "The case begins after a long-abandoned research platform goes silent during a solar storm. From there, your investigation moves through personal diaries, technical failures, classified xenobotany records, and signs of possible sabotage. Every document adds context to the crew’s final days. Some clues point toward psychological collapse. Others suggest a very human conspiracy hiding behind the station’s haunting final message. The result is a sci-fi cold case that feels more like reconstructing a disaster than following a simple trail of breadcrumbs.",
      },
      {
        title: "Who should play this space mystery game",
        body: "Station Zero is best for players who enjoy solving dense mysteries, comparing notes, and sitting with uncertainty before the full picture comes into focus. If you want a fast free mystery game, one of the lighter cases on the site may be a better match. But if you want a longer sci-fi investigation for date night, game night, or a solo weekend puzzle session, Station Zero is designed for that deeper experience. The evidence is substantial, the tone is darker, and the case asks you to think like an investigator rather than wait for the story to hand you answers.",
      },
      {
        title: "Is Station Zero a good case for date night?",
        body: "Yes, if your idea of a great date night is solving a deeper mystery together. Station Zero gives you enough evidence to compare theories, debate motives, and work through the case as a team. It is less of a quick casual game and more of an atmospheric investigative experience.",
      },
      {
        title: "How hard is the Station Zero sci-fi cold case?",
        body: "Station Zero is one of the easier cases on the site. It asks you to read carefully, connect scattered clues, and stay patient while the bigger picture comes together. If you enjoy puzzle-heavy mysteries and slow-burn reveals, it should feel rewarding rather than overwhelming.",
      },
      {
        title: "What kind of evidence is included in Station Zero?",
        body: "You investigate crew diaries, corrupted transmission logs, classified research files, and other digital evidence recovered from the station. The mix of personal writing and technical records helps the mystery feel grounded while still delivering the eerie sci-fi tone.",
      },
      {
        title: "Can Station Zero be played solo or with a group?",
        body: "Yes. The case works for solo players who like immersive deduction, but it is also designed for small groups. Two players make a strong pair for date night, while a larger group can split up clue review and compare interpretations as the investigation unfolds.",
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
    id: 8,
    slug: "the-final-bench-off",
    title: "The Final [2] Bench-Off",
    seoTitle:
      "Free Cold Case Date Night | The Final Bench-Off Oakwood Fitness Mystery",
    playTitle: "Play The Final Bench-Off",
    pageTitle: "The Final Bench-Off",
    shortDescription:
      "A free sequel to The Final Rehearsal where Oakwood's Fitness Gala goes off the rails after influencer-student Jim Nasium's limited Neon-Aura stash vanishes from the Gym Vault.",
    seoDescription:
      "Play The Final Bench-Off, a free high school cold case sequel set at Oakwood's Fitness Gala. Investigate missing Neon-Aura cans, tangled alibis, and chaotic witness statements in a funny interactive whodunit.",
    playDescription:
      "Jump into The Final Bench-Off interactive board to inspect Gym Vault logs, cross-check witness statements, and solve Oakwood's most dramatic hydration scandal.",
    seoKeywords: [
      "free cold case date night sequel",
      "the final bench off",
      "oakwood high mystery game",
      "high school mystery game",
      "interactive whodunit game",
      "funny detective game",
    ],
    betaNotice:
      "The Final Bench-Off is currently in beta. The full mystery is playable, with ongoing polish to pacing, visuals, and a few interface details.",
    imageUrl: "/cold_cases/thumbnails/the_final_bench_off.png",
    tags: [
      "Family Friendly",
      "School",
      "Free Cold Case",
      "Part 2",
      "Date Night",
      "School Mystery",
      "Comedy Mystery",
      "Who Dun It",
      "Detective Game",
      "1-2 Players",
      "Easy/Medium",
    ],
    description:
      "Oakwood is back, and so is the chaos. Right before the Oakwood Fitness Gala, influencer-student Jim Nasium discovers his private stash of limited-edition Neon-Aura has vanished from the high-security Gym Vault. Without it, his aura is 'depleted' and he's 'literally a flop.' Naturally, the panic spreads faster than pre-workout in an empty stomach.\n\nAs the lead investigator, you'll revisit familiar Oakwood legends like Anita Break, Ray Deo-o, and Justin Case—plus meet the school's new no-nonsense principal, Skye Th'Limit. Was this a petty energy-drink heist, a policy crackdown gone rogue, or another masterpiece of student-level overreaction? Dig through logs, interviews, and digital messages to separate flex from facts and solve this pun-packed sequel before the gala face-plants.",
    difficulty: "Easy/Medium",
    players: "1-2",
    duration: "1.5-2 hours",
    price: 0,
    evidence: FINAL_BENCH_OFF_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
    isPlayable: true,
    seoSections: [
      {
        title: "Why The Final Bench-Off is a great free sequel for date night",
        body: "The Final Bench-Off keeps everything players loved about The Final Rehearsal: quick setup, funny suspect dialogue, and a mystery that is easy to follow but still satisfying to solve. It works especially well for date night because the case is free, the pacing is tight, and the tone stays playful instead of grim. You can finish it in one evening, compare theories, and still have time left to celebrate your detective gains.",
      },
      {
        title: "What happens in this Oakwood Fitness Gala mystery",
        body: "Hours before the Oakwood Fitness Gala, Jim Nasium's limited Neon-Aura stash disappears from the Gym Vault, triggering a full-scale campus meltdown. You investigate witness statements, vault logs, and group-chat messages from returning fan favorites Anita Break, Ray Deo-o, and Justin Case, while new principal Skye Th'Limit enforces strict policy changes. The case blends goofy school drama with a real clue trail, so every joke still points you toward the truth.",
      },
      {
        title: "Is The Final Bench-Off actually free to play?",
        body: "Yes. The Final Bench-Off is available as a free playable case, making it a low-risk way to jump back into Oakwood's world. If you enjoyed The Final Rehearsal and want a direct follow-up with the same comedy-forward style, this is the natural next case to open.",
      },
      {
        title: "Who should play The Final Bench-Off",
        body: "This case is ideal for new detectives, returning Oakwood fans, and couples looking for a fun mystery game that doesn't require a huge time commitment. Because the difficulty sits around easy to medium, it's friendly for first-time players but still gives enough twists to keep experienced sleuths entertained. If your group likes puns, school chaos, and fast-moving clue work, this case is all reps and no rest.",
      },
    ],
    preview: [
      {
        name: "The Game Board",
        profile:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_preview.png",
        thumbnail:
          "/cold_cases/previews/final_rehearsal/final_rehearsal_preview.png",
        title: "A New Oakwood Meltdown",
        typeOfPreview: "video",
        content:
          "Same Oakwood chaos, new crime scene. Pin clues, compare alibis, and bench-press your way through contradictory stories on the interactive board.",
        hideProfile: true,
        mediaUrl:
          "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/the_final_rehearsal/final%20rehearsal_board.mp4",
      },
      {
        name: "Vault Access Evidence",
        profile: "/cold_cases/previews/final_rehearsal/school_map.png",
        thumbnail: "/cold_cases/previews/final_rehearsal/school_map.png",
        title: "Track the Movement",
        typeOfPreview: "image",
        content:
          "Use movement logs and map markers to catch who really went near the Gym Vault during the Neon-Aura disappearance window.",
        hideProfile: true,
      },
      {
        name: "Witness Drama",
        profile:
          "/cold_cases/previews/final_rehearsal/justin_interrogation.png",
        thumbnail:
          "/cold_cases/previews/final_rehearsal/justin_interrogation.png",
        title: "Interrogate the Vibes",
        typeOfPreview: "image",
        content:
          "Read hilariously inconsistent interviews, test your theory in plain English, and expose who lied when the pressure was on.",
      },
    ],
  },
  {
    id: 4,
    slug: "the-final-rehearsal",
    title: "The Final Rehearsal",
    seoTitle:
      "Free Cold Case Date Night | The Final Rehearsal High School Mystery",
    playTitle: "Play The Final Rehearsal",
    pageTitle: "The Final Rehearsal",
    shortDescription:
      "A free cold case date night mystery with a high school setting, where you sort through notes, security logs, and witness interviews to uncover who locked the lead actress away before opening night.",
    seoDescription:
      "Play The Final Rehearsal, a free cold case date night mystery with a high school setting. Review backstage clues, suspicious security logs, and messy witness statements to solve a funny interactive whodunit.",
    playDescription:
      "Open The Final Rehearsal's playable case board to review backstage clues, compare witness statements, and work through the mystery step by step.",
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
      "Family Friendly",
      "School",
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
        body: "The Final Rehearsal is an easy pick for date night because it is free, funny, and built for one or two players. You are not walking into a grim or overly dense mystery. Instead, you get a lighter high school cold case full of backstage gossip, dramatic suspects, and clues that are simple to follow without feeling boring. That makes it a good option for couples who want to solve something together without committing to a long or emotionally heavy investigation.",
      },
      {
        title: "What happens in this high school cold case",
        body: "Right before opening night, the lead actress is discovered locked inside the prop vault. That turns the school’s final rehearsal into a full-blown investigation. You will dig through secret notes, interview transcripts, suspicious security logs, and other messy backstage clues to figure out who planned the sabotage. The case keeps the stakes fun and dramatic, but there is still a real mystery to solve beneath the jokes and teen chaos.",
      },
      {
        title: "Is The Final Rehearsal actually free to play?",
        body: "Yes. The Final Rehearsal is one of the free cold case games on the site, which is part of why it ranks well as a date night option. If you want a no-risk mystery to try together before moving on to a bigger or darker case, this is a strong place to start. You get a complete investigation experience without needing to buy a premium case first.",
      },
      {
        title: "Who should play The Final Rehearsal",
        body: "This case is best for new detectives, couples looking for a relaxed date night mystery, and anyone who likes high school comedy with a little sabotage mixed in. Because the difficulty sits around easy to medium and the playtime is short, it is also great for players who want a complete mystery in one evening. If you want something heavier, darker, or more puzzle-dense, you can always move up to one of the harder cases after this one.",
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
  {
    id: 1,
    slug: "sins-of-saint-lazarus",
    title: "The Sins of Saint Lazarus",
    seoTitle: "Medical Mystery Game | The Sins of Saint Lazarus",
    playTitle: "Play The Sins of Saint Lazarus",
    pageTitle: "The Sins of Saint Lazarus",
    shortDescription:
      "A dark medical mystery set inside a troubled hospital, where you follow medical records, personal betrayals, and hidden motives to uncover what really happened in the operating theater.",
    seoDescription:
      "Play The Sins of Saint Lazarus, a dark hospital mystery game about medical negligence, secret affairs, and professional sabotage. Work through layered evidence in a tense interactive investigation.",
    playDescription:
      "Use the Saint Lazarus interactive case board to review hospital evidence, track suspect motives, and follow the investigation through a playable mystery interface.",
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
      "Medical",
      "Medical Mystery",
      "Classic",
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
        body: "The Sins of Saint Lazarus stands out because it mixes personal betrayal with institutional pressure inside a hospital setting. This is not a light or playful mystery. It is built around negligence, secrecy, family strain, and professional sabotage, which gives the case a heavier and more dramatic tone than the rest of the catalog. If you like mysteries that feel tense, morally messy, and character-driven, Lazarus has the right kind of weight.",
      },
      {
        title: "What makes this hospital mystery different",
        body: "Instead of focusing on a single obvious suspect, The Sins of Saint Lazarus drops you into a hospital environment full of layered pressure points. Medical records, personal betrayals, family strain, and professional sabotage all collide around one catastrophic surgery. That gives the mystery a very particular energy: every clue feels tied to both personal emotion and institutional failure. The result is a medical mystery game that feels claustrophobic, high-stakes, and deeply human.",
      },
      {
        title: "What evidence you investigate in Saint Lazarus",
        body: "As you work through the case, you will examine evidence connected to the operating theater, the people around Dr. Khanna, and the wider collapse of trust inside St. Lazarus. The case leans into layered documents and contradictory accounts rather than quick gimmicks. You are asked to weigh negligence against intent, emotional fallout against hard proof, and personal loyalty against self-preservation.",
      },
      {
        title: "Who should play The Sins of Saint Lazarus",
        body: "This case is best for players who enjoy darker mystery fiction, complicated suspects, and a more mature tone. If you like unraveling affairs, institutional pressure, and morally messy decisions, this case fits well. If you want something lighter or more beginner-friendly, one of the easier cases may be a better first stop before returning to Saint Lazarus.",
      },
    ],
  },
  {
    id: 1,
    slug: "the-last-check-in",
    title: "The Last Check-In",
    seoTitle: "Locked Room Mystery Game | The Last Check-In",
    playTitle: "Play The Last Check-In",
    pageTitle: "The Last Check-In",
    shortDescription:
      "A claustrophobic locked-room mystery where nine strangers are forced into a month-long quarantine at a cheap roadside motel. When the lockdown lifts, only five walk out alive.",
    seoDescription:
      "Play The Last Check-In, a psychological locked-room mystery game. Nine guests quarantined in a motel, but only five survive. Interrogate suspects and find the killer.",
    playDescription:
      "Use the interactive case board to review police interrogations, motel security photos, and crime scene evidence to determine which of the five survivors is a cold-blooded killer.",
    seoKeywords: [
      "locked room mystery game",
      "motel murder mystery",
      "quarantine thriller game",
      "whodunit cold case",
      "interactive detective game",
      "closed circle mystery",
    ],
    betaNotice:
      "The Last Check-In is currently in beta. The investigation is available, but some presentation details and quality-of-life touches may still change.",
    imageUrl: "/cold_cases/thumbnails/the_last_check_in.png",
    tags: [
      "Classic",
      "Locked Room Mystery",
      "Psychological Thriller",
      "1-2 Players",
      "Hard Difficulty",
    ],
    description:
      "9 Checked In. 5 Walked Out. When a sudden, strict viral lockdown forces nine strangers to quarantine inside a squalid roadside motel for a month, paranoia quickly sets in. As the days bleed together, guests start showing 'symptoms' and isolating in their rooms, never to be seen again. But when the authorities finally break the seal 30 days later, they discover the isolated guests didn't succumb to a virus—they were brutally murdered. Now, you must cross-examine the five traumatized survivors, sift through their lies, and uncover the wolf hiding in plain sight.",
    difficulty: "Hard",
    players: "1-2",
    duration: "2-3 hours",
    price: 19.99,
    evidence: THE_LAST_CHECK_IN_DATA,
    isPurchasable: false,
    hasDownloadSample: false,
    isPlayable: false,
    seoSections: [
      {
        title: "Why The Last Check-In stands out as a locked-room mystery",
        body: "The Last Check-In takes the classic 'closed-circle' whodunit and adds the agonizing, slow-burn tension of a month-long quarantine. It plays heavily on psychological paranoia. The killer uses the threat of a viral sickness to their advantage, tricking the other guests into leaving the victims completely alone. If you love mysteries built on cabin fever, mounting dread, and brilliant cover-ups, this case provides an incredibly immersive atmosphere.",
      },
      {
        title: "What makes this motel mystery different",
        body: "Instead of tracking a killer on the run, you already have your suspects trapped in a room together. When the game begins, four people are dead, and the five remaining survivors are all pointing fingers at each other. Every single survivor—from the cynical motel manager to the disgraced surgeon—has a dark secret they were hiding before the lockdown even started. The tension comes from untangling who committed murder for survival, and who is just a very good liar.",
      },
      {
        title: "What evidence you investigate in The Last Check-In",
        body: "As you work through the case, you will examine gritty check-in photos taken from the manager's desk, rationing logs, fake medical assessments, and highly contradictory police interrogations from the five survivors. You are asked to reconstruct the timeline of a 30-day lockdown, figure out how the bodies were locked inside their rooms from the outside, and track a missing duffel bag of cash that serves as the ultimate motive.",
      },
      {
        title: "Who should play The Last Check-In",
        body: "This case is perfect for fans of Agatha Christie-style setups, true-crime aesthetics, and psychological thrillers. If you enjoy analyzing character motives, spotting inconsistencies in witness testimonies, and unraveling a web of red herrings, you will thrive here. Because the killer is deeply manipulative and hiding among the victims, players will need a sharp eye for detail and a healthy dose of skepticism.",
      },
    ],
  },
  {
    id: 2,
    slug: "palazzo-of-bones",
    title: "The Palazzo of Bones",
    playTitle: "Play The Palazzo of Bones",
    betaNotice:
      "The Palazzo of Bones is currently in beta. Expect the mystery to be playable, with some areas still being refined as we continue polishing the case experience.",
    playDescription:
      "Explore The Palazzo of Bones through the interactive case board, where you can examine evidence, connect suspects, and investigate the mystery at your own pace.",
    imageUrl: "/cold_cases/thumbnails/palazzo_of_bones.jpeg",
    tags: ["Historical", "Date Night", "1-2 Players", "High Difficulty"],
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
    id: 5,
    slug: "sentinel-1-the-zero-sum-game",
    title: "Sentinel 1: The Zero Sum Game",
    seoTitle: "Unsolved Cold Case Online | Sentinel 1: The Zero Sum Game",
    playTitle: "Play The Zero Sum Game",
    pageTitle: "Sentinel 1: The Zero Sum Game",
    shortDescription:
      "An AI judge finds you 98% guilty of murder. Use its own evidence to find the truth and lower your guilt in a race against time to survive execution.",
    seoDescription:
      "Play Sentinel 1: The Zero Sum Game, an interactive unsolved cold case where you must prove your innocence to an AI judge. Analyze forensic data, digital footprints, and crime scene evidence to solve your own murder mystery before time runs out.",
    playDescription:
      "Open the Sentinel case file to analyze forensic reports, review digital evidence, and argue against the AI's logic to prove your innocence.",
    seoKeywords: [
      "unsolved cold case online",
      "AI judge game",
      "solve a murder mystery game",
      "interactive crime investigation",
      "sci-fi mystery game",
      "detective simulator game",
      "zero sum game",
    ],
    betaNotice:
      "Sentinel 1: The Zero Sum Game is currently in beta. The core mystery is fully playable, with ongoing polish and balancing updates in progress.",
    imageUrl: "/cold_cases/thumbnails/sentinel_1_zero_sum.png",
    tags: [
      "Sci-Fi",
      "Unsolved Cold Case",
      "Sci-Fi Mystery",
      "AI Judge",
      "Detective Game",
      "Single Player",
      "High Stakes",
      "Hard",
      "Immersive Sim",
    ],
    description:
      "Dive into the most immersive unsolved cold case online. In SENTINEL, you aren’t just a detective; you are the lead suspect in a trial where the verdict is already written.\n\nThe year is 2026. Los Angeles is governed by the Mercy Court—a fully autonomous AI justice system designed to act as judge, jury, and executioner. You are Dr. Aris Thorne, a brilliant chemical engineer whose logic is now being used against him. The tables have turned. You stand accused of the brutal murder of your wife.\n\nThe Sentinel AI has analyzed your digital footprint, your movements, and forensic data from the scene. Its verdict? 98% Probability of Guilt. In 90 minutes, the fatal pulse will be delivered. Your only hope is to use the Sentinel’s own interface to scour the evidence, revisit the crime scene, and find the 'glitches' in the facts.\n\nTo survive, you must dismantle the case piece by piece. Lower your guilt percentage to below 60% by uncovering hidden truths the AI ignored. Can you solve the most personal cold case in history before the clock hits zero? Or will you become another statistic in the perfect system you once admired?",
    difficulty: "Hard",
    players: "1",
    duration: "1.5-2 hours",
    price: 0,
    evidence: ZERO_SUM_DATA,
    isPurchasable: true,
    hasDownloadSample: false,
    isPlayable: false,
    seoSections: [
      {
        title: "Why is this an 'unsolved cold case online' with a twist?",
        body: "The Zero Sum Game takes the classic cold case format and turns it on its head. Instead of being an outside detective, you are the prime suspect with a 98% guilt rating. The twist is that your judge is a flawless AI, and all the evidence is presented through its digital interface. You must re-examine facts that have already led to a verdict, making it a high-stakes investigation into your own life.",
      },
      {
        title: "How do you play against an AI that can't be wrong?",
        body: "Sentinel's logic is perfect, but it lacks human context. Your goal isn't to prove the AI made a mistake, but to provide it with new data that forces a recalculation. By analyzing digital footprints, smart home logs, and drone footage, you can find 'glitches' in the narrative—evidence of human emotion, motive, or opportunity that the machine miscategorized. Each discovery lowers your guilt percentage and gets you closer to survival.",
      },
      {
        title: "What is the 60% Guilt Threshold?",
        body: "This isn't a traditional trial about guilt or innocence; it's a battle of probabilities. To win, you don't need to find the real killer or prove yourself 100% innocent. You simply need to introduce enough new evidence to lower Sentinel's guilt calculation to below 60%. This creates enough 'reasonable doubt' for the AI to stay its own execution order, making every piece of evidence critical to your survival.",
      },
      {
        title: "Who is this detective game for?",
        body: "This case is perfect for players who love high-stakes thrillers, sci-fi mysteries, and escape room-style pressure. If you enjoy analyzing evidence, challenging logic, and racing against a clock, The Zero Sum Game offers a challenging single-player experience. It’s for the detective who wants to solve the most difficult and personal case imaginable.",
      },
    ],
    preview: [
      {
        name: "The Sentinel Interface",
        profile: "/cold_cases/previews/zero_sum_game/sentinel_interface.png",
        thumbnail: "/cold_cases/previews/zero_sum_game/sentinel_interface.png",
        title: "The Logic of the Machine",
        typeOfPreview: "video",
        content:
          "Welcome to your courtroom and your prison. The Sentinel interface gives you access to every piece of evidence used to condemn you. Drag, connect, and analyze forensic reports, server data, and surveillance footage to see the case through the AI's eyes—and find what it missed.",
        hideProfile: true,
        mediaUrl: "https://your-video-host.com/sentinel_interface_preview.mp4",
      },
      {
        name: "The Digital Footprint",
        profile: "/cold_cases/previews/zero_sum_game/digital_footprint.png",
        thumbnail: "/cold_cases/previews/zero_sum_game/digital_footprint.png",
        title: "Trace the Digital Ghost",
        typeOfPreview: "image",
        content:
          "The AI logged your every move. Now, use that data against it. Review smart-home activity logs, vehicle GPS data, and university lab access records. If your alibi was dismissed as irrelevant, it's up to you to prove its significance and force a recalculation.",
        hideProfile: true,
      },
      {
        name: "Arguing with the AI",
        profile: "/cold_cases/previews/zero_sum_game/ai_interaction.png",
        thumbnail: "/cold_cases/previews/zero_sum_game/ai_interaction.png",
        title: "Challenge the Hard Facts",
        typeOfPreview: "image",
        content:
          "You can't talk to a human jury, but you can interact with Sentinel. Use voice commands and text inputs to present your theories. If you connect two pieces of evidence in a way the AI hadn't considered, you might just lower that guilt percentage.",
      },
      {
        name: "Evidence Unlocked",
        profile: "/cold_cases/previews/zero_sum_game/evidence_unlocked.png",
        thumbnail: "/cold_cases/previews/zero_sum_game/evidence_unlocked.png",
        title: "Glitches in the Data",
        typeOfPreview: "image",
        content:
          "As you successfully lower your guilt score, Sentinel is forced to release previously suppressed or low-priority evidence for your review. Every objective you solve unlocks a new layer of the mystery, giving you more tools to fight for your life.",
      },
    ],
  },

  {
    id: 7,
    slug: "her-shadows-name",
    title: "Her Shadow's Name",
    playTitle: "Play Her Shadow's Name",
    betaNotice:
      "Her Shadow's Name is currently in beta. The mystery experience is being actively refined, so some elements may still evolve as we improve the case.",
    playDescription:
      "Enter the Her Shadow's Name case board to sift through clues, trace connections, and investigate the mystery inside the playable experience.",
    imageUrl: "/cold_cases/thumbnails/her_shadows_name.jpeg",
  tags: ["Horror", "Missing", "1-2 Players", "High Difficulty"],
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
