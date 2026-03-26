export interface MysteryKit {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  difficulty?: string;
  players?: string;
  playerOptions?: string[];
  languages?: string[];
  duration?: string;
  price?: number;
  rating?: number;
  ratingCount?: number;
  isPurchasable?: boolean;
  hasDownloadSample?: boolean;
  includes?: string[];
  isPlayable?: boolean;
  participantPacket?: Array<{
    id: string;
    title: string;
    eyebrow?: string;
    order?: number;
    html: string;
  }>;
  characters?: Array<{
    id: string;
    slug: string;
    name: string;
    role: string;
    summary: string;
    participantDossierHtml?: string;
    alibi?: string;
    secret?: string;
    imageUrl?: string;
    packetItems?: Array<{
      id: string;
      title: string;
      eyebrow?: string;
      order?: number;
      html: string;
    }>;
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
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  experienceSteps?: Array<{
    step: string;
    title: string;
    body: string;
    accent?: string;
  }>;
  materialPreviews?: Array<{
    label: string;
    title: string;
    body: string;
    badge?: string;
    style?: string;
  }>;
  experienceHighlights?: Array<{
    title: string;
    quote: string;
    name: string;
    accent?: string;
    tilt?: string;
  }>;
  heroEyebrow?: string;
  heroCaption?: string;
  partyEnergyLabel?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  ctaSampleLabel?: string;
  helperMessage?: string;
  perfectFor?: string[];
  hostNotes?: Array<{
    title: string;
    body: string;
  }>;
  hostInstructions?: string;
  guestInstructions?: string;
  forensicExaminationReport?: string;
  seoBlock?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export const mysteryKits: MysteryKit[] = [
  {
    id: "valentines-mixer-swipe-for-murder-kit",
    slug: "valentines-mixer-swipe-for-murder-kit",
    title: "Valentines Mixer: Swipe for Murder!",
    description:
      "A flirty Valentine’s mixer turns fatal when the event’s star matchmaker is found dead mid-game. Guests must piece together timelines, jealous motives, and digital breadcrumbs to unmask a killer hiding behind a perfect profile.",
    imageUrl: "/mystery_kits/swipe_right_or_die_trying/hero.jpeg",
    tags: [
      "Valentine’s",
      "Singles Mixer",
      "Printable",
      "Blind Date Event",
      "Party Game",
      "4 to 16 Players",
    ],
    difficulty: "Medium",
    players: "4 to 16",
    playerOptions: [
      "4 to 8",
      "4 to 12",
      "4 to 16",
      "4 to 20",
      "Equal number of girls and boys",
    ],
    languages: ["English"],
    duration: "90-120 minutes",
    price: 0,
    rating: 5,
    ratingCount: 366,
    isPurchasable: false,
    hasDownloadSample: false,
    isPlayable: true,
    openingBrief:
      "Welcome to the Cupid’s Clipboard Mixer—an interactive night of mini-dates, secret prompts, and ‘swipe’ votes. The host, Arden Vale, promised the perfect matches… until the music cut out and Arden collapsed beside the ballot box. Now the venue is locked down, the guest list is a suspect list, and every ‘harmless’ flirtation has teeth. Your mission: interview, trade clues, and reconstruct the final hour to reveal who turned matchmaking into murder.",
    includes: [
      "Host guide (PDF)",
      "Player instructions + rules (PDF)",
      "16 character cards (printable)",
      "Clue set: messages, receipts, notes, and props",
      "Round prompts for speed-dates + voting",
      "Solution reveal + optional epilogue",
      "Game Ballot Book",
    ],
    hostInstructions: `
      <h2>Host Instructions</h2>
      <p>Welcome to <strong>Swipe for Murder</strong>. Your job is to keep the energy high, control reveal timing, and make sure every player gets a chance to flirt, interrogate, and accuse.</p>
      <h3>Before guests arrive</h3>
      <ul>
        <li>Assign characters before the first round and ask guests to read only their own dossier.</li>
        <li>Prepare the ballot box, evidence pieces, and any printed prompts you want to hand out physically.</li>
        <li>Choose a clear reveal area for the final accusation and solution speech.</li>
      </ul>
      <h3>Suggested party flow</h3>
      <ol>
        <li><strong>Opening briefing:</strong> introduce Arden Vale’s collapse, lock the party into the mystery, and frame everyone as a suspect.</li>
        <li><strong>Round one:</strong> let guests mingle in character and share only safe surface-level information.</li>
        <li><strong>Round two:</strong> release the first evidence item and prompt guests to challenge weak alibis.</li>
        <li><strong>Round three:</strong> introduce the ballots, private prompt drama, and any final clue that sharpens motive.</li>
        <li><strong>Final accusation:</strong> ask each guest to name the killer, motive, and most suspicious clue before reading the solution.</li>
      </ol>
      <h3>Hosting tips</h3>
      <ul>
        <li>If the room gets quiet, ask who saw the victim last or who benefits most from Arden’s death.</li>
        <li>If one player dominates, redirect with a new clue and ask another suspect to respond first.</li>
        <li>Encourage dramatic accusations, but remind players not to read each other’s private instructions.</li>
      </ul>
    `,
    guestInstructions: `
      <h2>Guest Instructions</h2>
      <p>You are not just solving a murder — you are <strong>playing a role inside the scandal</strong>. Stay in character, protect your secrets, and pay attention to every slip, flirtation, and accusation.</p>
      <h3>How to play</h3>
      <ul>
        <li>Read only your own character page and do not spoil another player’s secret.</li>
        <li>Share your public persona freely, but decide carefully when to reveal private information.</li>
        <li>Question other guests, compare alibis, and notice contradictions.</li>
        <li>You may lie, deflect, flirt, or redirect — just stay believable.</li>
      </ul>
      <h3>During each round</h3>
      <ul>
        <li>Find at least two people to speak with directly.</li>
        <li>Offer one useful detail and hold one dangerous detail back until it matters.</li>
        <li>Watch how others react when the victim, ballots, or missing prompt are mentioned.</li>
      </ul>
      <h3>Final accusation</h3>
      <p>At the end of the game, you’ll name who killed Arden Vale, why they did it, and which clue proves it best. You do <em>not</em> need to be innocent to make the right accusation.</p>
    `,
    forensicExaminationReport: `
      <h2>Forensic Examination Report</h2>
      <p><strong>Case Reference:</strong> CCBM-14<br /><strong>Decedent:</strong> Arden Vale<br /><strong>Examiner:</strong> Dr. Mira Sloane, Contract Forensic Consultant</p>
      <h3>Summary of examination</h3>
      <p>The decedent was recovered beside the mixer ballot box shortly after the house music cut out. No immediate signs of a prolonged physical struggle were observed at the scene, though the body position suggests collapse occurred rapidly and in public view.</p>
      <h3>External findings</h3>
      <ul>
        <li>Superficial bruising present along the left wrist, recent in origin.</li>
        <li>Trace cosmetic transfer located near the collar and jawline.</li>
        <li>No major defensive wounds identified on forearms or hands.</li>
      </ul>
      <h3>Preliminary forensic notes</h3>
      <ul>
        <li>A partially smeared fingerprint was recovered from the swapped ballot materials.</li>
        <li>Glass residue and a sweetened alcohol trace were found near the decedent’s final position.</li>
        <li>Time-of-collapse estimate aligns with the final mixer voting window.</li>
      </ul>
      <h3>Working conclusion</h3>
      <p>Arden Vale was targeted by someone who had both close social access and an opportunity to interfere with the flow of the mixer without drawing immediate suspicion. The evidence suggests planning, staging, or both.</p>
    `,
    participantPacket: [
      {
        id: "guest-instructions",
        title: "Guest Instructions",
        eyebrow: "Start here",
        order: 0,
        html: `
          <h2>Guest Instructions</h2>
          <p>You are not just solving a murder — you are <strong>playing a role inside the scandal</strong>. Stay in character, protect your secrets, and pay attention to every slip, flirtation, and accusation.</p>
          <h3>How to play</h3>
          <ul>
            <li>Read only your own character page and do not spoil another player’s secret.</li>
            <li>Share your public persona freely, but decide carefully when to reveal private information.</li>
            <li>Question other guests, compare alibis, and notice contradictions.</li>
            <li>You may lie, deflect, flirt, or redirect — just stay believable.</li>
          </ul>
          <h3>Final accusation</h3>
          <p>At the end of the game, name who killed Arden Vale, why they did it, and which clue proves it best.</p>
        `,
      },
      {
        id: "forensic-examination-report",
        title: "Forensic Examination Report",
        eyebrow: "Case file",
        order: 10,
        html: `
          <h2>Forensic Examination Report</h2>
          <p><strong>Case Reference:</strong> CCBM-14<br /><strong>Decedent:</strong> Arden Vale<br /><strong>Examiner:</strong> Dr. Mira Sloane, Contract Forensic Consultant</p>
          <h3>Summary of examination</h3>
          <p>The decedent was recovered beside the mixer ballot box shortly after the house music cut out. No immediate signs of a prolonged physical struggle were observed at the scene, though the body position suggests collapse occurred rapidly and in public view.</p>
          <h3>Preliminary forensic notes</h3>
          <ul>
            <li>A partially smeared fingerprint was recovered from the swapped ballot materials.</li>
            <li>Glass residue and a sweetened alcohol trace were found near the decedent’s final position.</li>
            <li>Time-of-collapse estimate aligns with the final mixer voting window.</li>
          </ul>
        `,
      },
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
        participantDossierHtml: `
          <p>You are the villa’s obvious physical threat: loud, powerful, and easy for everyone to blame. Lean into the fact that people underestimate your intelligence while quietly protecting how desperate your finances really are. Your job is to look suspicious without handing anyone a clean motive-and-opportunity confession.</p>
          <h3>Your Alibi</h3>
          <p>Was in the outdoor gym doing 1000 crunches. The cameras were off, but he swears he was counting loud.</p>
          <h3>Your Secret</h3>
          <p>He's actually bankrupt and bet against himself in his last fight. Needs the prize money to pay off loan sharks.</p>
        `,
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
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/theo.jpeg",
        participantDossierHtml: `
          <p>You present yourself as the villa’s safest pair of hands: calm, caring, and morally above the drama. That makes you useful in conversations about the victim’s condition, but it also means every medical detail you mention can raise suspicion. Play the sincere healer while hiding how much professional ruin you have to lose if Arden exposed you.</p>
          <h3>Your Alibi</h3>
          <p>Was in the kitchen separating the recycling. He's very passionate about the environment.</p>
          <h3>Your Secret</h3>
          <p>Lost his medical license last week for prescribing placebo pills to hypochondriacs.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/giovanni.jpeg",
        participantDossierHtml: `
          <p>You are the villa peacock: vain, magnetic, and impossible to ignore. Use charm and swagger to make people laugh off your ego, but remember that arrogance reads a lot like guilt when tensions spike. Keep the spotlight on your confidence instead of the fragile empire Arden may have been ready to collapse.</p>
          <h3>Your Alibi</h3>
          <p>Was on the terrace looking at his own reflection in the sliding glass doors.</p>
          <h3>Your Secret</h3>
          <p>His 'business' is actually a front for a pyramid scheme selling subpar olive oil.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/jayden.jpeg",
        participantDossierHtml: `
          <p>You’re one of the most liked people in the villa, which makes you socially powerful in a subtle way. Your role is to seem relaxed, lovable, and above the worst of the drama while quietly steering suspicion away from anything that could expose your carefully built image. Let other people underestimate how strategic popularity can be.</p>
          <h3>Your Alibi</h3>
          <p>Was in the pool floating on a flamingo inflatable. He fell asleep.</p>
          <h3>Your Secret</h3>
          <p>He is actually 5'11"; he wears lifts in his shoes and avoids standing next to measuring tapes.</p>
        `,
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
        participantDossierHtml: `
          <p>You are comic relief with a dangerous habit of taking jokes too far. People expect noise, immaturity, and chaos from you, which means your best defense is to act like the whole investigation is overblown. Underneath that energy, though, you know a prank with Arden already put you on thin ice before the murder happened.</p>
          <h3>Your Alibi</h3>
          <p>Was giving the security guard a fade in the blind spot behind the villa.</p>
          <h3>Your Secret</h3>
          <p>He accidentally shaved the victim's hair off in their sleep as a prank gone wrong the night before.</p>
        `,
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
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/rex_flex.jpeg",
        participantDossierHtml: `
          <p>You are the villa’s designated troublemaker, and everyone already believes you’re capable of cruelty. That makes you a perfect suspect and a perfect manipulator. Play into the idea that you enjoy drama for sport, but stay alert: if people connect your blackmail leverage over Arden with the wrong clue, the room may turn on you fast.</p>
          <h3>Your Alibi</h3>
          <p>Was in the diary room confessing his love for himself.</p>
          <h3>Your Secret</h3>
          <p>He was blackmailing the victim with embarrassing photos from a holiday in Ibiza.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/julian_tango.jpeg",
        participantDossierHtml: `
          <p>You move through the villa as the polished gentleman who notices everything and judges silently. Your calm manner makes people open up around you, which means you can gather more than most suspects without seeming aggressive. The danger is emotional, not physical: if your hidden history with Arden slips out, your heartbreak becomes motive instantly.</p>
          <h3>Your Alibi</h3>
          <p>Was teaching the producers how to salsa dance near the fire pit.</p>
          <h3>Your Secret</h3>
          <p>He is a control freak who was secretly dating the victim outside the villa and they broke his heart.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/billy_biro.jpeg",
        participantDossierHtml: `
          <p>You look harmless on purpose. The more forgettable and ordinary you seem, the less anyone notices how closely you’re studying everyone else. Your role is to gather gossip, dodge scrutiny, and keep the investigation from revealing that you came into this villa hunting a scandal long before Arden died.</p>
          <h3>Your Alibi</h3>
          <p>Was sketching a portrait of his dog on a napkin at the bar.</p>
          <h3>Your Secret</h3>
          <p>He's not a salesman; he's an undercover journalist writing a hit piece on the show.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/finley_fish.jpeg",
        participantDossierHtml: `
          <p>You are the villa’s most intense romantic, the kind of person who mistakes obsession for devotion. Other guests may see you as awkward or overinvested, which is useful until jealousy becomes the obvious explanation for murder. Play earnest and heart-led, but be careful how much anger you reveal about Arden crossing your line.</p>
          <h3>Your Alibi</h3>
          <p>Was watching the girls get ready from a distance 'just to make sure they were okay'.</p>
          <h3>Your Secret</h3>
          <p>Saw the victim flirting with his partner and threatened them earlier that day.</p>
        `,
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
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/chad.jpeg",
        participantDossierHtml: `
          <p>You are polished, vain, and far more calculated than people expect. Your role is to project control: perfect grooming, perfect branding, perfect confidence. The cracks appear when money comes up. If Arden knew where your business funding really came from, then your clean image is sitting on top of a very dirty motive.</p>
          <h3>Your Alibi</h3>
          <p>Was applying fake tan in the bathroom. It takes 20 minutes to dry.</p>
          <h3>Your Secret</h3>
          <p>The victim knows Chad's gym is funded by stolen money.</p>
        `,
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
        imageUrl:
          "/mystery_kits/swipe_right_or_die_trying/characters/orla.jpeg",
        participantDossierHtml: `
          <p>You are blunt, funny, and impossible to intimidate, which makes you one of the few people willing to say what everyone else is muttering. That honesty can earn trust fast, but it also means your earlier argument with Arden feels louder than most conflicts. Use your firecracker energy to go on offense before anyone boxes you into the role of jealous rival.</p>
          <h3>Your Alibi</h3>
          <p>Was shouting at a producer because they ran out of white wine.</p>
          <h3>Your Secret</h3>
          <p>She was seen arguing with the victim about a brand deal they both wanted.</p>
        `,
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
        participantDossierHtml: `
          <p>You are the villa’s status symbol: glamorous, curated, and always half-performing for an invisible audience. Your role is to stay composed, image-aware, and socially powerful even when things turn ugly. The problem is Arden apparently held proof that your influence is manufactured, which turns reputation panic into a very real motive.</p>
          <h3>Your Alibi</h3>
          <p>Was taking selfies in the hideaway. Check the timestamps on the photos.</p>
          <h3>Your Secret</h3>
          <p>The victim had proof that Bella buys all her followers.</p>
        `,
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
        participantDossierHtml: `
          <p>You live for performance, exaggeration, and emotional chaos. People never know whether you’re being sincere, which makes you dangerous in a mystery because every reaction can be dismissed as acting. Use that ambiguity to your advantage while making sure no one digs too deeply into the lie your whole public identity is built on.</p>
          <h3>Your Alibi</h3>
          <p>Was crying on the balcony, but no tears were coming out.</p>
          <h3>Your Secret</h3>
          <p>She isn't actually famous; she was an extra in one episode 5 years ago and lied to get on the show.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/lottie.jpeg",
        participantDossierHtml: `
          <p>You play sweet, privileged, and slightly helpless, which encourages people to underestimate you. Your job is to make the room see you as frivolous rather than strategic. Beneath that surface, though, Arden knew your money story was collapsing, so every accusation about status, inheritance, or desperation hits dangerously close to the truth.</p>
          <h3>Your Alibi</h3>
          <p>Was on the phone to her 'daddy' complaining about the lack of blow dryers.</p>
          <h3>Your Secret</h3>
          <p>The victim knew her dad actually cut her off financially months ago.</p>
        `,
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
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/liv.jpeg",
        participantDossierHtml: `
          <p>You intimidate people before you even open your mouth, and once you do, they usually regret engaging. That presence can either scare suspicion away or pull it directly toward you. Use your confidence like armor, but don’t forget that debt to Arden gives everyone a simple reason to believe this argument finally turned fatal.</p>
          <h3>Your Alibi</h3>
          <p>Was having a cigarette near the back gate. Alone.</p>
          <h3>Your Secret</h3>
          <p>She owes the victim money from a poker game gone wrong.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/penny.jpeg",
        participantDossierHtml: `
          <p>You come across as the villa’s conscience: gentle, intelligent, and too decent for this mess. That innocence is powerful because people want to protect you. The twist is that pressure changes you. Your role is to seem soft while quietly managing the fear that, if pushed hard enough, you might say or do something that proves everyone misread you.</p>
          <h3>Your Alibi</h3>
          <p>Was reading a book on feminism by the pool.</p>
          <h3>Your Secret</h3>
          <p>She snaps under pressure. She isn't a bomb expert; she defused a conflict once at a bar.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/sasha.jpeg",
        participantDossierHtml: `
          <p>You’re stylish, sharp, and not especially interested in making men comfortable. Your role in the group is to cut through nonsense with attitude and taste, but that confidence also makes other guests assume you’re hiding something. Since you actually were hiding something, steer attention toward your wit and away from the small theft that could grow into a bigger suspicion.</p>
          <h3>Your Alibi</h3>
          <p>Was fixing her eyelashes in the dressing room mirror.</p>
          <h3>Your Secret</h3>
          <p>She stole the victim's designer sunglasses and was trying to hide them.</p>
        `,
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
        imageUrl: "/mystery_kits/swipe_right_or_die_trying/characters/tia.jpeg",
        participantDossierHtml: `
          <p>You are the quietest kind of threat: calm, confident, and underestimated because you don’t need to shout. Your role is to unsettle the room by staying composed while others spiral. Let people project motives onto louder suspects while you protect the fact that your whole identity in this villa is built on a carefully maintained lie.</p>
          <h3>Your Alibi</h3>
          <p>Was sleeping on the daybed. She sleeps a lot.</p>
          <h3>Your Secret</h3>
          <p>She is actually 35, not 24 as she claimed on her application.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/chloe.jpeg",
        participantDossierHtml: `
          <p>You are the human spark plug of the villa: fun, impulsive, and one bad idea away from total disaster. People forgive your chaos because you make every room livelier, but that also means they can imagine you causing harm without meaning to. Keep things playful while making sure your drunken slip about Arden doesn’t start sounding like the first domino in a fatal chain.</p>
          <h3>Your Alibi</h3>
          <p>Was stuck in the toilet because the lock jammed.</p>
          <h3>Your Secret</h3>
          <p>She was drunk and accidentally revealed the victim's secret to the whole villa.</p>
        `,
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
          "/mystery_kits/swipe_right_or_die_trying/characters/libbie.jpeg",
        participantDossierHtml: `
          <p>You are everyone’s safe space: warm, loyal, and so sincere that people rarely consider you dangerous. That makes you uniquely powerful in this story because you may know more than anyone else in the room. Your role is to navigate the tension between friendship and truth while hiding the fact that fear—not innocence—is shaping what you reveal.</p>
          <h3>Your Alibi</h3>
          <p>Was writing a poem about sisterhood on her phone.</p>
          <h3>Your Secret</h3>
          <p>She saw the murder happen but is too scared to speak up because she thinks it was her friend.</p>
        `,
      },
    ],
    evidence: [
      {
        id: "evidence-swipe-ballots",
        title: "Swipe Ballots (Round 3)",
        summary:
          "Cards showing last-round votes. Several are smudged, one appears to have been swapped after collection.",
        type: "document",
      },
      {
        id: "evidence-red-envelope",
        title: "Red Envelope: Private Prompt",
        summary:
          "A sealed prompt meant for a secret mini-date. It’s opened—and the note inside is missing.",
        type: "artifact",
      },
      {
        id: "evidence-phone-lockscreen",
        title: "Lockscreen Notification Screenshot",
        summary:
          "A captured notification: ‘Stop playing matchmaker. Last warning.’ sent minutes before Arden fell.",
        type: "digital",
      },
      {
        id: "evidence-tab-receipt",
        title: "Bar Tab Receipt",
        summary:
          "Two drinks ordered under Arden’s name at times Arden was publicly hosting. Someone borrowed their wristband.",
        type: "document",
      },
    ],
    locations: [
      {
        id: "mixer-main-floor",
        name: "Main Mixer Floor",
        detail:
          "Where the speed-dates happen and the vote box sits under string lights.",
      },
      {
        id: "mixer-dj-booth",
        name: "DJ Booth",
        detail:
          "Controls music and lighting cues. From here you can see the crowd—but not the corners.",
      },
      {
        id: "mixer-coat-check",
        name: "Coat Check + Gift Bags",
        detail:
          "A cluttered table of tote bags, name tags, and props. Easy place to stash something fast.",
      },
      {
        id: "mixer-back-hall",
        name: "Back Hallway",
        detail:
          "Service corridor with the breaker panel and storage closet. Footsteps echo here.",
      },
    ],
    faqs: [
      {
        question: "How many people can play this mystery kit?",
        answer:
          "The full mixer experience is designed for 8 to 16 players. You can choose the player setup that best fits your party size from the included character combinations.",
      },
      {
        question: "Is this kit printable, digital, or both?",
        answer:
          "It is built as a printable party kit first, with interactive support for play mode where available. You can print the character cards, host guide, and clue material for an in-person event.",
      },
      {
        question: "Can the host play too?",
        answer:
          "Yes. The host can guide the event and still enjoy the mystery, especially if you use the structured host materials and reveal flow included in the kit.",
      },
      {
        question: "How long does the game take?",
        answer:
          "Most groups will finish the full experience in about 90 to 120 minutes, depending on how long you let players mingle, interrogate, and debate suspects.",
      },
      {
        question: "Is this mystery kit good for a singles mixer or social event?",
        answer:
          "Yes. This kit is especially well suited to singles mixers, hosted social events, and Valentine-style gatherings because the structure naturally encourages guests to rotate, talk, flirt, share clues, and react to each other in character.",
      },
      {
        question: "Can this be used for a blind date event or speed dating night?",
        answer:
          "Yes. The theme and flow work well for blind date events, speed dating nights, and playful matchmaking formats. The game already uses mini-date energy, secret prompts, and social interaction, so it feels like a natural fit for that type of event.",
      },
      {
        question: "Does this work if guests do not already know each other?",
        answer:
          "It does. In fact, it can work especially well when guests are meeting for the first time because the roles, prompts, and mystery structure give everyone a reason to start conversations quickly without awkward small talk.",
      },
      {
        question: "Can an event planner or party coordinator run this easily?",
        answer:
          "Yes. The kit is designed so an event planner, party host, or coordinator can run it without building a mystery night from scratch. The host guide, character materials, and clue flow provide enough structure to keep the event organized while still feeling lively and spontaneous.",
      },
      {
        question: "Can this mystery kit be hosted online or as a hybrid event?",
        answer:
          "Yes. While it is built as a printable party kit first, the structure can also be adapted for online social events or hybrid gatherings. Hosts can share character assignments digitally, guide rounds live, and use the built-in prompts and evidence to keep remote guests engaged.",
      },
    ],
    experienceSteps: [
      {
        step: "01",
        title: "Set the villa lineup",
        body: "Choose the player count that fits your guest list, send out the roles, and set the tone before everyone arrives.",
        accent: "from-fuchsia-200 to-rose-100",
      },
      {
        step: "02",
        title: "Drop guests into character",
        body: "Every player gets a suspicious persona, a public story, and private information that immediately sparks drama.",
        accent: "from-sky-200 to-cyan-100",
      },
      {
        step: "03",
        title: "Reveal receipts and red flags",
        body: "Use ballots, screenshots, secret prompts, and timeline clues to keep the room moving from flirting to finger-pointing.",
        accent: "from-amber-200 to-yellow-100",
      },
      {
        step: "04",
        title: "Expose the killer",
        body: "Let the group make a final accusation and then reveal which islander turned the mixer into a murder scene.",
        accent: "from-emerald-200 to-teal-100",
      },
    ],
    materialPreviews: [
      {
        label: "Host Guide",
        title: "A villa-ready hosting script",
        body: "Round-by-round pacing, reveal cues, and hosting notes that make the night feel effortless even for first-time hosts.",
        badge: "Run the night",
        style: "from-fuchsia-50 via-white to-rose-50",
      },
      {
        label: "Character Sheets",
        title: "16 chaotic bombshells and suspects",
        body: "Each role comes with a public persona, juicy secrets, and enough motive to turn every conversation into gossip fuel.",
        badge: "Instant roleplay",
        style: "from-sky-50 via-white to-cyan-50",
      },
      {
        label: "Evidence Pack",
        title: "Screenshots, ballots, and hidden prompts",
        body: "Clues feel like they belong inside the villa itself—messy, funny, dramatic, and easy for guests to follow.",
        badge: "4 clue drops",
        style: "from-amber-50 via-white to-yellow-50",
      },
    ],
    experienceHighlights: [
      {
        title: "Perfect for playful, outgoing groups",
        quote:
          "The whole kit feels like stepping into a chaotic reality-show finale—fast, funny, and suspicious from the first round.",
        name: "Main Mixer Floor",
        accent: "from-fuchsia-200 via-rose-100 to-orange-100",
        tilt: "lg:-rotate-1",
      },
      {
        title: "Host friendly, even with a big cast",
        quote:
          "Between the host guide, character sheets, and evidence moments, the night keeps its momentum without feeling overcomplicated.",
        name: "90–120 minute party arc",
        accent: "from-sky-200 via-cyan-100 to-teal-100",
        tilt: "lg:rotate-1",
      },
    ],
    heroEyebrow: "Bespoke Reality-TV Mystery",
    heroCaption:
      "Flirty chaos, suspicious islanders, and a dramatic final reveal built for a high-energy party night.",
    partyEnergyLabel: "Chaotic • stylish • guest-friendly",
    ctaPrimaryLabel: "Enter Play Mode",
    ctaSecondaryLabel: "Custom Version Soon",
    ctaSampleLabel: "Sample Pack",
    helperMessage:
      "Playable now for your next party night. Personalized versions and expanded kit options are on the way.",
    perfectFor: [
      "Valentine’s parties",
      "Girls’ night in",
      "Birthday dinners",
      "Reality TV superfans",
    ],
    hostNotes: [
      {
        title: "No over-prepping needed",
        body: "The host guide is structured so you can keep the evening moving without memorising every clue in advance.",
      },
      {
        title: "Best with bold personalities",
        body: "This kit works especially well when guests are happy to flirt, gossip, accuse, and play up the drama.",
      },
      {
        title: "Flexible for mixed groups",
        body: "You can lean fully theatrical or keep it casual and still get a fun, satisfying reveal by the finale.",
      },
    ],
    seoBlock:
      "An online Valentine’s murder mystery party kit for 8–16 players, designed for easy hosting, immersive roleplay, and dramatic speed-dating gameplay. Hub98 mystery kits blend printable clues, character secrets, and guided party structure for a stylish at-home mystery night.",
    seoTitle:
      "Online Valentine’s Murder Mystery Kit for 8–16 Players | Hub98",
    seoDescription:
      "Host an online Valentine’s murder mystery party for 8–16 players with dramatic speed-dating gameplay, printable clues, suspicious characters, and an easy-to-run host guide.",
    seoKeywords: [
      "printable valentine murder mystery",
      "valentine mystery party kit",
      "singles mixer game",
      "blind date event game",
      "online event game for adults",
      "party game for event planners",
      "valentines mixer game",
      "murder mystery for singles event",
      "hosted social mixer game",
      "murder mystery party kit for 8-16 players",
      "valentine party game printable",
      "speed dating murder mystery game",
      "easy to host murder mystery kit",
    ],
  },
];

export function getMysteryKitBySlug(slug: string) {
  return mysteryKits.find((k) => k.slug === slug);
}
