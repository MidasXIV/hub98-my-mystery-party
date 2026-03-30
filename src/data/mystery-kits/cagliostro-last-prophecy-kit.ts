export const cagliostroLastProphecyKit = {
  id: "cagliostros-last-prophecy-kit",
  slug: "cagliostros-last-prophecy-kit",
  title: "Cagliostro's Last Prophecy",
  description:
    "A candlelit occult supper turns deadly when the host mystic collapses mid-vision. Decode rivalries, hidden debts, and ritual misdirection to uncover who poisoned Cagliostro before he could name their future.",
  imageUrl: "/mystery_kits/cagliostro_last_prophecy/hero.jpeg",
  tags: [
    "Occult",
    "Dinner Party",
    "Printable",
    "Whodunit",
    "8 to 16 Players",
    "Halloween Friendly",
  ],
  difficulty: "Medium",
  players: "8 to 16",
  playerOptions: ["8 to 10", "8 to 12", "8 to 16", "10 to 16"],
  languages: ["English"],
  duration: "90-120 minutes",
  price: 0,
  rating: 5,
  ratingCount: 0,
  isPurchasable: false,
  hasDownloadSample: false,
  isPlayable: true,
  openingBrief:
    "Read this first: We were all invited to a spooky dinner by a famous Mystic named Cagliostro. He claimed he could see the future. But during the main course, Cagliostro looked into his crystal ball, screamed, and fell face-first into his plate. He was poisoned. Now we have to find out who did it.",
  includes: [
    "Host guide (PDF)",
    "Guest instructions + table rules (PDF)",
    "Evidence set: menu notes, ritual cards, and private messages",
    "Timeline board handout",
    "Final accusation + solution reveal",
    "Printable clue index",
  ],
  hostInstructions: `
    <h2>Host Instructions</h2>
    <p>Welcome to <strong>Cagliostro's Last Prophecy</strong>. Your role is to pace the mystery, release clues at the right moments, and keep everyone immersed in the eerie dinner atmosphere.</p>
    <h3>Before guests arrive</h3>
    <ul>
      <li>Assign roles before the event and ask each guest to read only their own material.</li>
      <li>Set up a dramatic table centerpiece (candles, crystal ball prop, old letters, menu cards).</li>
      <li>Prepare your clue drops in order so the reveal escalates naturally.</li>
    </ul>
    <h3>Suggested party flow</h3>
    <ol>
      <li><strong>Opening scene:</strong> explain Cagliostro's collapse and lock everyone into suspect mode.</li>
      <li><strong>Round one:</strong> guests share public backstories and establish alibis.</li>
      <li><strong>Round two:</strong> release physical evidence and challenge contradictions.</li>
      <li><strong>Round three:</strong> reveal private motive clues and hidden relationships.</li>
      <li><strong>Final accusation:</strong> each guest names the killer, motive, and key proof.</li>
    </ol>
    <h3>Hosting tips</h3>
    <ul>
      <li>If momentum dips, ask who gained most if Cagliostro's prophecy stayed unheard.</li>
      <li>If one person dominates, redirect with a fresh clue and call on quieter suspects.</li>
      <li>Encourage dramatic roleplay while protecting private instructions until reveal time.</li>
    </ul>
  `,
  guestInstructions: `
    <h2>Guest Instructions</h2>
    <p>You are a suspect at a cursed supper where every whisper matters. Stay in character, defend your alibi, and uncover why someone silenced Cagliostro forever.</p>
    <h3>How to play</h3>
    <ul>
      <li>Read only your own character materials.</li>
      <li>Share public details freely, but guard your private motives carefully.</li>
      <li>Question other guests, compare timelines, and track contradictions.</li>
      <li>You may bluff, deflect, accuse, or confess strategically — as long as you stay believable.</li>
    </ul>
    <h3>Final accusation</h3>
    <p>At the end, name who poisoned Cagliostro, why they did it, and which evidence proves your case.</p>
  `,
  forensicExaminationReport: `
    <h2>Forensic Examination Report</h2>
    <p><strong>Case Reference:</strong> CLP-01<br /><strong>Decedent:</strong> Cagliostro<br /><strong>Examiner:</strong> Dr. Elara Voss, Consulting Pathologist</p>
    <h3>Summary of examination</h3>
    <p>The decedent collapsed abruptly during dinner after handling a crystal ball and consuming plated food. No prolonged physical struggle was observed at the scene.</p>
    <h3>External findings</h3>
    <ul>
      <li>Facial impact consistent with sudden forward collapse into tableware.</li>
      <li>Trace dark residue on fingertips and right cuff.</li>
      <li>No major defensive wounds on forearms or hands.</li>
    </ul>
    <h3>Preliminary forensic notes</h3>
    <ul>
      <li>Poisoning is strongly suspected based on rapid symptom onset.</li>
      <li>Residue sampled from the crystal ball stand and wine rim.</li>
      <li>Estimated time of fatal exposure aligns with the main course service.</li>
    </ul>
    <h3>Working conclusion</h3>
    <p>Cagliostro appears to have been targeted by someone with close table access and confidence they could act unnoticed in a crowded ritual setting.</p>
  `,
  participantPacket: [
    {
      id: "guest-instructions",
      title: "Guest Instructions",
      eyebrow: "Start here",
      order: 0,
      html: `
        <h2>Guest Instructions</h2>
        <p>You are a suspect at a cursed supper where every whisper matters. Stay in character, defend your alibi, and uncover why someone silenced Cagliostro forever.</p>
        <h3>How to play</h3>
        <ul>
          <li>Read only your own character materials.</li>
          <li>Question guests, compare details, and expose contradictions.</li>
          <li>Protect your private information until timing benefits your strategy.</li>
        </ul>
      `,
    },
    {
      id: "forensic-examination-report",
      title: "Forensic Examination Report",
      eyebrow: "Case file",
      order: 10,
      html: `
        <h2>Forensic Examination Report</h2>
        <p><strong>Case Reference:</strong> CLP-01<br /><strong>Decedent:</strong> Cagliostro</p>
        <h3>Preliminary forensic notes</h3>
        <ul>
          <li>Poisoning is strongly suspected based on rapid symptom onset.</li>
          <li>Residue sampled from the crystal ball stand and wine rim.</li>
          <li>Estimated time of fatal exposure aligns with the main course service.</li>
        </ul>
      `,
    },
  ],
  evidence: [
    {
      id: "evidence-stained-menu",
      title: "Stained Tasting Menu",
      summary:
        "The main-course card has a dark ring on one corner and a handwritten symbol that does not match the official menu style.",
      type: "document",
    },
    {
      id: "evidence-crystal-stand-residue",
      title: "Crystal Stand Residue",
      summary:
        "A chalky residue was recovered from the base of the crystal ball stand and from the decedent's right cuff.",
      type: "forensic",
    },
    {
      id: "evidence-sealed-warning-note",
      title: "Sealed Warning Note",
      summary:
        "A folded note found under a charger plate reads: 'Tell them tonight and you won't see dawn.'",
      type: "artifact",
    },
    {
      id: "evidence-cellar-door-log",
      title: "Cellar Door Access Log",
      summary:
        "The service cellar door was opened twice during the main course by someone using a borrowed key tag.",
      type: "digital",
    },
  ],
  locations: [
    {
      id: "seance-dining-hall",
      name: "Seance Dining Hall",
      detail:
        "Long candlelit table where Cagliostro hosted the fatal prophecy dinner.",
    },
    {
      id: "mirror-corridor",
      name: "Mirror Corridor",
      detail:
        "Narrow hallway lined with antique mirrors where whispers carry farther than expected.",
    },
    {
      id: "service-cellar",
      name: "Service Cellar",
      detail:
        "Cool storage room for wine and herbs, accessible through a staff door near the kitchen.",
    },
    {
      id: "observatory-parlor",
      name: "Observatory Parlor",
      detail:
        "Private reading room containing ritual objects, old journals, and the backup crystal sphere.",
    },
  ],
  faqs: [
    {
      question: "How many people can play this mystery kit?",
      answer:
        "This story is designed for 8 to 16 players, with flexible role setups depending on your guest count.",
    },
    {
      question: "Is this mystery more spooky or more comedic?",
      answer:
        "It is spooky in atmosphere but still social and party-friendly, with dramatic reveals rather than horror content.",
    },
    {
      question: "Can the host play too?",
      answer:
        "Yes. The host can facilitate rounds and still participate by following the structured reveal flow.",
    },
    {
      question: "How long does the game take?",
      answer:
        "Most groups finish in 90 to 120 minutes, depending on discussion pace and roleplay depth.",
    },
  ],
  experienceSteps: [
    {
      step: "01",
      title: "Seat the suspects",
      body: "Assign roles, set the mood, and begin with Cagliostro's dramatic final prophecy scene.",
      accent: "from-purple-200 to-fuchsia-100",
    },
    {
      step: "02",
      title: "Uncover hidden motives",
      body: "Guests interrogate each other and expose secrets tied to the mystic's influence.",
      accent: "from-indigo-200 to-violet-100",
    },
    {
      step: "03",
      title: "Analyze poison clues",
      body: "Review forensic residue, timeline inconsistencies, and suspicious access points.",
      accent: "from-emerald-200 to-teal-100",
    },
    {
      step: "04",
      title: "Name the killer",
      body: "Deliver final accusations and reveal who silenced Cagliostro at the table.",
      accent: "from-amber-200 to-orange-100",
    },
  ],
  materialPreviews: [
    {
      label: "Host Guide",
      title: "Run a cinematic occult dinner",
      body: "Timed round structure, clue pacing notes, and smooth reveal prompts for first-time hosts.",
      badge: "Easy to host",
      style: "from-purple-50 via-white to-fuchsia-50",
    },
    {
      label: "Evidence Pack",
      title: "Menus, warning notes, and forensic traces",
      body: "Clues are designed to feel diegetic and visually tied to the cursed dinner setting.",
      badge: "4 clue drops",
      style: "from-emerald-50 via-white to-teal-50",
    },
    {
      label: "Timeline Tools",
      title: "Track movements during the meal",
      body: "Help players reconstruct who could access the victim at each critical moment.",
      badge: "Debate-ready",
      style: "from-amber-50 via-white to-orange-50",
    },
  ],
  experienceHighlights: [
    {
      title: "Perfect for themed dinner parties",
      quote:
        "The atmosphere is rich, the clues are tactile, and the reveal lands with dramatic weight.",
      name: "Candlelit table arc",
      accent: "from-purple-200 via-fuchsia-100 to-rose-100",
      tilt: "lg:-rotate-1",
    },
    {
      title: "Big cast without chaos",
      quote:
        "The structure keeps large groups engaged while still leaving room for improvisation.",
      name: "90–120 minute flow",
      accent: "from-indigo-200 via-violet-100 to-sky-100",
      tilt: "lg:rotate-1",
    },
  ],
  heroEyebrow: "Occult Dinner Mystery",
  heroCaption:
    "A poisoned prophecy, a table full of suspects, and one final reveal that changes everything.",
  partyEnergyLabel: "Spooky • dramatic • social",
  ctaPrimaryLabel: "Enter Play Mode",
  ctaSecondaryLabel: "Custom Version Soon",
  ctaSampleLabel: "Sample Pack",
  helperMessage:
    "Playable now for atmospheric dinner parties. Expanded versions and personalized options are coming soon.",
  perfectFor: [
    "Halloween parties",
    "Dinner mystery nights",
    "Birthday gatherings",
    "Occult and noir fans",
  ],
  hostNotes: [
    {
      title: "Lean into the atmosphere",
      body: "Lighting, music, and table styling dramatically improve immersion for this story.",
    },
    {
      title: "Keep clues paced",
      body: "Release evidence in rounds so the mystery escalates without overwhelming new players.",
    },
    {
      title: "Invite bold accusations",
      body: "This story shines when players challenge each other's motives and timeline details out loud.",
    },
  ],
  betaNotice:
    "Character roster is intentionally pending and will be added in a follow-up update.",
  seoBlock:
    "A printable occult dinner murder mystery kit for 8–16 players featuring poison clues, ritual atmosphere, and guided hosting flow for immersive social gameplay.",
  seoTitle: "Occult Dinner Murder Mystery Kit for 8–16 Players | Hub98",
  seoDescription:
    "Host a spooky dinner mystery where the mystic Cagliostro is poisoned mid-prophecy. Includes printable clues, host guide, and dramatic reveal flow.",
  seoKeywords: [
    "occult murder mystery party",
    "spooky dinner game",
    "printable mystery kit",
    "halloween murder mystery",
    "poison mystery game",
    "dinner party whodunit",
    "mystic themed party game",
    "8 to 16 player mystery",
    "murder mystery party for adults",
    "Hub98 mystery kits",
  ],
};
