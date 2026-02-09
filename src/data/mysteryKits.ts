export interface MysteryKit {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  difficulty?: string;
  players?: string;
  duration?: string;
  price?: number;
  isPurchasable?: boolean;
  hasDownloadSample?: boolean;
  includes?: string[];
  isPlayable?: boolean;
  characters?: Array<{
    id: string;
    slug: string;
    name: string;
    role: string;
    summary: string;
    alibi?: string;
    secret?: string;
    imageUrl?: string;
  }>;
  evidence?: Array<{
    id: string;
    title: string;
    summary: string;
    type: string;
  }>;
  locations?: Array<{
    id: string;
    name: string;
    detail: string;
  }>;
  openingBrief?: string;
}

export const mysteryKits: MysteryKit[] = [
  {
    id: "shadow-portfolio",
    slug: "shadow-portfolio-starter-kit",
    title: "Shadow Portfolio: Starter Kit",
    description:
      "A starter mystery party kit for new hosts. Includes a compact storyline, character dossiers, and a curated set of printable clues to run a 60-90 minute whodunit at home.",
    imageUrl: "/mystery_kits/swipe_right_or_die_trying/hero.jpeg",
    tags: ["Starter", "Printable", "1-6 Players"],
    difficulty: "Easy",
    players: "3-6",
    duration: "60-90 minutes",
    price: 0,
    isPurchasable: false,
    hasDownloadSample: true,
    isPlayable: true,
    openingBrief:
      "A storm shuts down the lights at the Hawthorne Gallery. When the curator is found unconscious and the signature portfolio is missing, every guest becomes a suspect. Your job: decode motives, track timelines, and reveal who stole the art.",
    includes: [
      "Host guide (PDF)",
      "6 character cards",
      "Clue envelope set",
      "Quick-start timeline",
      "Solution reveal script",
    ],
    characters: [
      {
        id: "rocco-steel",
        slug: "rocco-steel",
        name: "Rocco Steel",
        role: "Professional Boxer",
        summary:
          "A heavy hitter with a heart of gold (allegedly). Not the sharpest tool in the shed, but definitely the strongest.",
        alibi:
          "Was in the outdoor gym doing 1000 crunches. The cameras were off, but he swears he was counting loud.",
        secret:
          "He's actually bankrupt and bet against himself in his last fight. Needs the prize money to pay off loan sharks.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/rocco-Steel.jpeg",
      },
      {
        id: "dr-theo-cure",
        slug: "dr-theo-cure",
        name: "Dr. Theo Cure",
        role: "A&E Doctor",
        summary:
          "The 'nice guy' of the villa. Constantly sunburned and awkward around women. He's here to find a wife, not a fling.",
        alibi:
          "Was in the kitchen separating the recycling. He's very passionate about the environment.",
        secret:
          "Lost his medical license last week for prescribing placebo pills to hypochondriacs.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/theo.png",
      },
      {
        id: "giovanni-moretti",
        slug: "giovanni-moretti",
        name: "Giovanni Moretti",
        role: "Italian Business Owner",
        summary:
          "Calls himself a 'Lion'. Cooks carbonara to seduce women. Extremely arrogant but undeniably charming.",
        alibi:
          "Was on the terrace looking at his own reflection in the sliding glass doors.",
        secret:
          "His 'business' is actually a front for a pyramid scheme selling subpar olive oil.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/giovanni.png",
      },
      {
        id: "jayden-hoops",
        slug: "jayden-hoops",
        name: "Jayden Hoops",
        role: "Pro Basketball Player",
        summary:
          "6'7\", cool, calm, and collected. He says 'Message!' whenever he gets a text. Everyone loves him.",
        alibi:
          "Was in the pool floating on a flamingo inflatable. He fell asleep.",
        secret:
          "He is actually 5'11\"; he wears lifts in his shoes and avoids standing next to measuring tapes.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/jayden.png",
      },
      {
        id: "alfie-snips",
        slug: "alfie-snips",
        name: "Alfie 'Snips' Cutter",
        role: "Essex Barber",
        summary:
          "Small, loud, and creates raps about the other islanders. The villa's chaotic little brother.",
        alibi:
          "Was giving the security guard a fade in the blind spot behind the villa.",
        secret:
          "He accidentally shaved the victim's hair off in their sleep as a prank gone wrong the night before.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/alfie-cutter.jpeg",
      },
      {
        id: "rex-flex",
        slug: "rex-flex",
        name: "Rex Flex",
        role: "Personal Trainer",
        summary:
          "The villain. Steals girls for sport. Has a snake tattoo and creates drama just to feel something.",
        alibi: "Was in the diary room confessing his love for himself.",
        secret:
          "He was blackmailing the victim with embarrassing photos from a holiday in Ibiza.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/rex.png",
      },
      {
        id: "julian-tango",
        slug: "julian-tango",
        name: "Julian Tango",
        role: "Ballroom Dancer",
        summary:
          "Overly polite, makes everyone coffee in the morning. Has a 'beak' for other people's business.",
        alibi:
          "Was teaching the producers how to salsa dance near the fire pit.",
        secret:
          "He is a control freak who was secretly dating the victim outside the villa and they broke his heart.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/julian.png",
      },
      {
        id: "billy-biro",
        slug: "billy-biro",
        name: "Billy Biro",
        role: "Pen Salesman",
        summary:
          "Just a regular geezer. Teeth blindingly white. Loves a bit of toast.",
        alibi: "Was sketching a portrait of his dog on a napkin at the bar.",
        secret:
          "He's not a salesman; he's an undercover journalist writing a hit piece on the show.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/billy.png",
      },
      {
        id: "finley-fish",
        slug: "finley-fish",
        name: "Finley Fish",
        role: "Fishmonger",
        summary:
          "Obsessive and intense. Falls in love after 45 minutes. Wears flip-flops with jeans.",
        alibi:
          "Was watching the girls get ready from a distance 'just to make sure they were okay'.",
        secret:
          "Saw the victim flirting with his partner and threatened them earlier that day.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/finley.png",
      },
      {
        id: "chad-glute",
        slug: "chad-glute",
        name: "Chad Glute",
        role: "Gym Owner",
        summary:
          "Shaves his legs. Makes his mum wash his gym kit. Extremely well-groomed.",
        alibi:
          "Was applying fake tan in the bathroom. It takes 20 minutes to dry.",
        secret: "The victim knows Chad's gym is funded by stolen money.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/chad.png",
      },

      // --- THE GIRLS ---
      {
        id: "orla-ohara",
        slug: "orla-ohara",
        name: "Orla O'Hara",
        role: "Grid Girl",
        summary:
          "Irish firecracker. Says exactly what she thinks. Uses 'fanny flutters' in casual conversation.",
        alibi: "Was shouting at a producer because they ran out of white wine.",
        secret:
          "She was seen arguing with the victim about a brand deal they both wanted.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/orla.png",
      },
      {
        id: "bella-bambi",
        slug: "bella-bambi",
        name: "Bella Bambi",
        role: "Social Media Influencer",
        summary:
          "Lives with a stuffed teddy bear. The villa's 'it girl'. Already has 2 million followers.",
        alibi:
          "Was taking selfies in the hideaway. Check the timestamps on the photos.",
        secret: "The victim had proof that Bella buys all her followers.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/bella-bambi.jpeg",
      },
      {
        id: "sophia-drama",
        slug: "sophia-drama",
        name: "Sophia Drama",
        role: "Soap Opera Actress",
        summary:
          "Crawls on the terrace floor to spy. Tells lies for fun. An absolute chaotic icon.",
        alibi: "Was crying on the balcony, but no tears were coming out.",
        secret:
          "She isn't actually famous; she was an extra in one episode 5 years ago and lied to get on the show.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/sophia-drama.jpeg",
      },
      {
        id: "lottie-gee",
        slug: "lottie-gee",
        name: "Lottie Gee",
        role: "Aspiring Actress",
        summary:
          "Daughter of a very famous Cockney actor. Sweet but slightly entitled. Won't say who her dad is (but mentions it daily).",
        alibi:
          "Was on the phone to her 'daddy' complaining about the lack of blow dryers.",
        secret:
          "The victim knew her dad actually cut her off financially months ago.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/lottie.png",
      },
      {
        id: "liv-vicious",
        slug: "liv-vicious",
        name: "Liv Vicious",
        role: "Motorsport Model",
        summary:
          "Tall, blonde, and argumentative. Will start a fight in an empty room. Hilarious but terrifying.",
        alibi: "Was having a cigarette near the back gate. Alone.",
        secret: "She owes the victim money from a poker game gone wrong.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/liv.png",
      },
      {
        id: "penny-peace",
        slug: "penny-peace",
        name: "Penny Peace",
        role: "Bomb Disposal Expert",
        summary:
          "Too pure for this world. Speaks softly, hates confrontation. The nation's sweetheart.",
        alibi: "Was reading a book on feminism by the pool.",
        secret:
          "She snaps under pressure. She isn't a bomb expert; she defused a conflict once at a bar.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/penny.png",
      },
      {
        id: "sasha-vibes",
        slug: "sasha-vibes",
        name: "Sasha Vibes",
        role: "Hotel Waitress",
        summary:
          "Fashion icon. Sassy, plays the flute badly. Doesn't take nonsense from men.",
        alibi: "Was fixing her eyelashes in the dressing room mirror.",
        secret:
          "She stole the victim's designer sunglasses and was trying to hide them.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/sasha.png",
      },
      {
        id: "tia-temptress",
        slug: "tia-temptress",
        name: "Tia Temptress",
        role: "Glamour Model",
        summary:
          "Quietly confident. Steals your man without raising her voice. The ultimate bombshell.",
        alibi: "Was sleeping on the daybed. She sleeps a lot.",
        secret: "She is actually 35, not 24 as she claimed on her application.",
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/tia.png",
      },
      {
        id: "chloe-chaos",
        slug: "chloe-chaos",
        name: "Chloe Chaos",
        role: "Marketing Exec",
        summary:
          "Uses a fake accent when she's drunk. Runs around causing havoc. The life of the party.",
        alibi: "Was stuck in the toilet because the lock jammed.",
        secret:
          "She was drunk and accidentally revealed the victim's secret to the whole villa.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/chloe.png",
      },
      {
        id: "libbie-liberty",
        slug: "libbie-liberty",
        name: "Libbie Liberty",
        role: "Nando's Waitress",
        summary:
          "All about 'self-love'. Very loyal, a bit naive. Everyone's best friend.",
        alibi: "Was writing a poem about sisterhood on her phone.",
        secret:
          "She saw the murder happen but is too scared to speak up because she thinks it was her friend.",
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/libbie.png",
      },
    ],
    evidence: [
      {
        id: "evidence-guest-list",
        title: "Guest List with Annotations",
        summary:
          "A seating chart marked with last-minute changes and a note about a VIP arrival.",
        type: "document",
      },
      {
        id: "evidence-broken-lock",
        title: "Broken Display Lock",
        summary:
          "The lock from the portfolio case shows signs of a precise tool, not brute force.",
        type: "artifact",
      },
      {
        id: "evidence-text-message",
        title: "Encrypted Text Message",
        summary:
          "A message on the curator's phone reads: 'Midnight swap. No mistakes.'",
        type: "digital",
      },
    ],
    locations: [
      {
        id: "gallery-main-hall",
        name: "Main Exhibit Hall",
        detail:
          "The lights failed here first, plunging the crowd into darkness.",
      },
      {
        id: "gallery-vault",
        name: "Secure Vault",
        detail: "Access requires a keypad code and a biometric scan.",
      },
      {
        id: "gallery-control-room",
        name: "Security Control Room",
        detail: "The only place where camera feeds and alarm logs are stored.",
      },
    ],
  },
];

export function getMysteryKitBySlug(slug: string) {
  return mysteryKits.find((k) => k.slug === slug);
}
