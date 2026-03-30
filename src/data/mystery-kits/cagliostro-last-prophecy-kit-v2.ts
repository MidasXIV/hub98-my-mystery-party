export const cagliostroLastProphecyKitV2 = {
  id: "cagliostros-last-prophecy-kit",
  slug: "cagliostros-last-prophecy-kit",
  title: "Cagliostro's Last Prophecy",
  description:
    "A spooky magic dinner turns into comic chaos when famous mystic Cagliostro predicts doom and then drops face-first into noodles. Follow the clues, test alibis, and expose who poisoned the fortune teller.",
  imageUrl: "/mystery_kits/cagliostro_last_prophecy/hero.jpeg",
  tags: [
    "Mystic",
    "Dinner Party",
    "Printable",
    "Whodunit",
    "Comedy",
    "8 to 15 Players",
  ],
  difficulty: "Easy-Medium",
  players: "8 to 15",
  playerOptions: ["8 to 10", "8 to 12", "8 to 15"],
  languages: ["English"],
  duration: "75-110 minutes",
  price: 0,
  rating: 5,
  ratingCount: 0,
  isPurchasable: false,
  hasDownloadSample: false,
  isPlayable: true,
  openingBrief:
    "Read this card first: We were all invited to a spooky 'Magic Dinner' by a famous Mystic named Cagliostro. He claimed he could see the future, but he could not even see the fly in his soup. During dinner, Cagliostro stood up, yelled 'I see a dark cloud!', and then fell face-first into a plate of noodles. He was poisoned! Comedic interaction: everyone must look under their chairs right now to make sure there are no ghosts hiding there.",
  includes: [
    "Host guide (PDF)",
    "Guest instructions + comedy interaction cues (PDF)",
    "15 character dossiers (printable)",
    "Evidence set: notes, receipts, stolen-item clues, and detective scraps",
    "Round-by-round reveal flow",
    "Final accusation + solution reveal",
  ],
  hostInstructions: `
    <h2>Host Instructions</h2>
    <p>Welcome to <strong>Cagliostro's Last Prophecy</strong>. Keep the mystery playful, fast-paced, and easy for all reading levels.</p>
    <h3>Before guests arrive</h3>
    <ul>
      <li>Assign characters and remind guests to read only their own dossier.</li>
      <li>Set a silly-spooky table: candles, old menus, and one dramatic noodle plate.</li>
      <li>Prepare the intro and run the required ghost-under-chair comedy interaction.</li>
    </ul>
    <h3>Suggested flow</h3>
    <ol>
      <li><strong>Intro:</strong> read the setup and have everyone check under their chairs for ghosts.</li>
      <li><strong>Round 1:</strong> each character gives their turn speech and basic alibi.</li>
      <li><strong>Round 2:</strong> reveal stolen-item clues and challenge motive stories.</li>
      <li><strong>Round 3:</strong> reveal detective and family links, then push final contradictions.</li>
      <li><strong>Final accusation:</strong> each guest names killer, motive, and best proof.</li>
    </ol>
    <h3>Hosting tips</h3>
    <ul>
      <li>If energy drops, ask: who benefits most if Cagliostro never confesses?</li>
      <li>If a player dominates, redirect with a new clue and invite two quieter players first.</li>
      <li>Encourage dramatic acting, but keep reveals fair and sequential.</li>
    </ul>
  `,
  guestInstructions: `
    <h2>Guest Instructions</h2>
    <p>You are at a spooky dinner with silly chaos, suspicious stories, and one very dead mystic. Stay in character, protect your secrets, and catch the poisoner.</p>
    <h3>The Vibe</h3>
    <p>This game should feel hilarious and weird — not scary. Go big with jokes, dramatic reactions, and over-the-top roleplay.</p>
    <h3>How to play</h3>
    <ul>
      <li>Read only your own character page.</li>
      <li>Share your public story, but reveal secrets carefully.</li>
      <li>Compare alibis, ask questions, and spot contradictions.</li>
      <li>Be dramatic, be funny, and keep the mystery moving.</li>
    </ul>
    <h3>Final accusation</h3>
    <p>At the end, name who poisoned Cagliostro, why they did it, and what clue proves it.</p>
  `,
  forensicExaminationReport: `
    <h2>Forensic Examination Report</h2>
    <p><strong>Case Reference:</strong> CLP-FT-15<br /><strong>Decedent:</strong> Cagliostro<br /><strong>Examiner:</strong> Dr. Mireille Fontaine</p>
    <h3>Summary</h3>
    <p>The decedent collapsed suddenly during dinner after a loud prophetic outburst. Collapse was immediate and forward into a noodle plate.</p>
    <h3>Findings</h3>
    <ul>
      <li>No major defensive wounds.</li>
      <li>Possible oral toxin exposure during the main course window.</li>
      <li>Trace residue recovered from dish rim and nearby crystal-ball stand.</li>
    </ul>
    <h3>Working conclusion</h3>
    <p>Likely intentional poisoning by someone with close dinner access and confidence in a crowded room.</p>
  `,
  participantPacket: [
    {
      id: "read-this-first",
      title: "Read This Card First",
      eyebrow: "Start here",
      order: 0,
      html: `
        <h2>The Intro</h2>
        <p>We were all invited to a spooky <strong>Magic Dinner</strong> by a famous Mystic named Cagliostro. He claimed he could see the future, but he could not even see the fly in his soup.</p>
        <p>During dinner, Cagliostro stood up, yelled <em>"I see a dark cloud!"</em>, and fell face-first into a plate of noodles. He was poisoned!</p>
        <p><strong>Comedic interaction:</strong> Everyone must look under their chairs right now to check for ghosts.</p>
      `,
    },
    {
      id: "guest-instructions",
      title: "Guest Instructions",
      eyebrow: "How to play",
      order: 1,
      html: `
        <h2>Guest Instructions</h2>
        <ul>
          <li>Stay in character and protect your private secrets.</li>
          <li>Ask direct questions and test alibis.</li>
          <li>Use evidence to support accusations.</li>
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
        <p><strong>Decedent:</strong> Cagliostro</p>
        <ul>
          <li>Sudden collapse during main course.</li>
          <li>Probable toxin exposure.</li>
          <li>No major signs of physical struggle.</li>
        </ul>
      `,
    },
  ],
  characters: [
    {
      id: "gavroche",
      slug: "gavroche",
      name: "Gavroche",
      role: "Delivery Boy",
      summary:
        "18-year-old bike courier who arrived with a glitter package and walked into a murder scene.",
      alibi:
        "Dropped off a package and hung around the hallway arguing with his melting ice cream delivery timer.",
      secret:
        "Cagliostro tipped him $1,000 for a simple drop-off, which felt weirdly generous and suspicious.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/gavroche.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a bike helmet three sizes too big and has "pizza sauce" stains on his face.</p>
        <h3>Wacky Quirk</h3>
        <p>He must make "Vroom Vroom" noises every time he walks to a new spot in the room.</p>
        <h3>Turn</h3>
        <p>What's up? I'm Gavroche. I'm 18 and I deliver packages on my bike. I don't know this Cagliostro guy. I just came to bring him a box of glitter! But I will say, the old guy gave me a tip of $1,000! I thought he was magic. Now I think he was just crazy!</p>
        <h3>If Arrested</h3>
        <p>I'm just the delivery guy! Arrest someone else, dude! I have ice cream in my bag and it's melting!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>I'm just the delivery guy! Arrest someone else, dude! I have ice cream in my bag and it's melting!</p>`,
        },
      ],
    },
    {
      id: "madame-danglars",
      slug: "madame-danglars",
      name: "Madame Danglars",
      role: "Banker",
      summary:
        "Married banker who saw Cagliostro empty his accounts right before the dinner.",
      alibi:
        "Spent most of dinner comparing ledgers and receipts with her husband, Monsieur Danglars.",
      secret:
        "She heard Cagliostro say he planned to give away all his money because he had done terrible things.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/madame-danglars.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a dress made of (fake) money and has gold coins taped to her glasses.</p>
        <h3>Wacky Quirk</h3>
        <p>She can't say numbers; she has to say "Cha-Ching!" instead. (Example: "I am Cha-Ching! years old!")</p>
        <h3>Turn</h3>
        <p>I am Madame Danglars. My husband and I work at the bank. Cagliostro was a customer for years. Yesterday he came in and took out all his money. He looked sick—probably from eating too many fortune cookies. I asked if he was going on a trip. He said, 'No, I'm giving it all away because my crystal ball told me I'm a jerk.'</p>
        <h3>If Arrested</h3>
        <p>I'm a banker! I don't kill people, I just charge them late fees! You've arrested the wrong person!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>I'm a banker! I don't kill people, I just charge them late fees! You've arrested the wrong person!</p>`,
        },
      ],
    },
    {
      id: "esmeralda",
      slug: "esmeralda",
      name: "Esmeralda",
      role: "Performance Artist",
      summary:
        "Famous dancer who once fired Cagliostro after stolen hair-clips vanished during production.",
      alibi:
        "Spent dinner retelling old backstage drama to anyone who would listen.",
      secret:
        "She still blames Cagliostro for stolen gold clips and a public embarrassment.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/esmeralda.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears 50 jingling bracelets and a giant feathered hat.</p>
        <h3>Wacky Quirk</h3>
        <p>She doesn't walk; she must jazz-walk or moonwalk everywhere.</p>
        <h3>Turn</h3>
        <p>You all know me! I'm the famous dancer, Esmeralda. Cagliostro worked for me as a 'Spirit Advisor' while I was recording my dance video. He was fired after my collection of gold hair-clips was stolen. I fired everyone, even my cat. I was sure he stole them. I hired a detective, but he couldn't prove anything because Cagliostro 'disappeared' the evidence!</p>
        <h3>If Arrested</h3>
        <p>What! No way would I risk my fame and ruin my hair! You've got the wrong girl!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>What! No way would I risk my fame and ruin my hair! You've got the wrong girl!</p>`,
        },
      ],
    },
    {
      id: "monsieur-danglars",
      slug: "monsieur-danglars",
      name: "Monsieur Danglars",
      role: "Banker Husband",
      summary:
        "Math-loving banker and husband of Madame Danglars, surprised to learn his client was a mystic.",
      alibi:
        "Sat with his wife reviewing account notes and joking about Cagliostro's strange business stories.",
      secret:
        "Cagliostro still owed him a tiny personal debt, which he brought up way too often.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/monsieur-danglars.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a suit with a giant calculator tied around his neck like a necklace.</p>
        <h3>Wacky Quirk</h3>
        <p>Every time someone says the word "Money," he has to scream "I love math!"</p>
        <h3>Turn</h3>
        <p>I'm Monsieur Danglars. You met my wife. We work at the bank where Cagliostro kept his gold. He always brought in huge bags of cash. I didn't know he was a 'Mystic' until tonight! I thought he was a billionaire who sold invisible umbrellas. He was a nice old guy, and I'm sad he's gone because he still owes me a nickel.</p>
        <h3>If Arrested</h3>
        <p>No way! I didn't do it! I'm just a banker who loves math!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>No way! I didn't do it! I'm just a banker who loves math!</p>`,
        },
      ],
    },
    {
      id: "baron-von-munchausen",
      slug: "baron-von-munchausen",
      name: "Baron Von Munchausen",
      role: "Grumpy Aristocrat",
      summary:
        "Outraged nobleman who blames Cagliostro for missing art, missing socks, and hat-related insults.",
      alibi:
        "Spent the meal complaining loudly from his end of the table and polishing his mustache.",
      secret:
        "He hired Cagliostro before and has held a grudge ever since valuables disappeared.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/baron-von-munchausen.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>A mustache so long it has to be held up by balloons.</p>
        <h3>Wacky Quirk</h3>
        <p>He must start every sentence with a fake boast. (Example: "When I climbed the moon on a ladder made of cheese, I saw...")</p>
        <h3>Turn</h3>
        <p>I am the Baron! I own a giant house and many fancy paintings. Well, I have fewer paintings now! I hired that Mystic to find my lost socks, and then my art went missing! The police couldn't prove he took them, but I know it was him! That man was a menace! A ruffian! He once called my hat 'ugly'!</p>
        <h3>If Arrested</h3>
        <p>You're wrong! I didn't poison the fake wizard! I am a gentleman! Look at my mustache!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>You're wrong! I didn't poison the fake wizard! I am a gentleman! Look at my mustache!</p>`,
        },
      ],
    },
    {
      id: "madame-javert",
      slug: "madame-javert",
      name: "Madame Javert",
      role: "The Killer",
      summary:
        "Married to Inspector Javert; she claims she acted to end her husband's years of detective misery.",
      alibi:
        "Moved between guests offering sympathy while listening for who suspected the 'Mystic Marauder.'",
      secret:
        "You poisoned Cagliostro because you could not stand watching your husband suffer over the unsolved case.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/madame-javert.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a "disguise" that is just a tiny mustache over her regular face.</p>
        <h3>Wacky Quirk</h3>
        <p>Whenever anyone looks at her, she has to do shifty eyes and whistle a nervous tune.</p>
        <h3>Turn</h3>
        <p>I am Madame Javert. I am married to Henry. I've never met the Mystic, but I know all about him. See, my husband is a detective and he thought this guy was the 'Mystic Marauder.' He comes home every night crying into his pillow because he can't solve the case. I hated seeing him so sad. I'm glad this is over. Evil Laugh.</p>
        <h3>If Arrested</h3>
        <p>That's right! I did it! I couldn't stand seeing my husband so miserable! And I would have gotten away with it if you guys weren't so annoying!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>That's right! I did it! I couldn't stand seeing my husband so miserable! And I would have gotten away with it if you guys weren't so annoying!</p>`,
        },
      ],
    },
    {
      id: "marius",
      slug: "marius",
      name: "Marius",
      role: "The Son",
      summary:
        "Cagliostro's neglected son, raised in wealth but starved of honesty and affection.",
      alibi:
        "Stayed near the side table avoiding direct eye contact with Cagliostro until the collapse.",
      secret:
        "He suspects his father's fortune came from years of theft and lies.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/marius.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a shirt that says "I'm with the Mystic" and carries a pet rock named "Bob."</p>
        <h3>Wacky Quirk</h3>
        <p>He repeats the last word of every sentence three times. (Example: "My dad was a liar... liar... liar...")</p>
        <h3>Turn</h3>
        <p>The guy you call 'The Mystic' was actually my dad. He never paid attention to me because he was too busy talking to his pet rock. I grew up in a mansion with 20 maids, but I never knew where he got his millions. He was a liar. Tonight he said he was sorry and was going to pay everyone back. I think he just wanted a free dinner.</p>
        <h3>If Arrested</h3>
        <p>Look, I wasn't close to my dad, but I'm not a murderer. Arrest someone else. I have a date at the mall!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>Look, I wasn't close to my dad, but I'm not a murderer. Arrest someone else. I have a date at the mall!</p>`,
        },
      ],
    },
    {
      id: "dartagnan",
      slug: "dartagnan",
      name: "D'Artagnan",
      role: "The Champion",
      summary:
        "Decorated sword champion who blames Cagliostro for a vanished medal and broken trust.",
      alibi:
        "Demonstrated imaginary fencing moves near the fireplace during most of the meal.",
      secret:
        "His treasured gold medal disappeared after he consulted Cagliostro.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/dartagnan.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a gold medal the size of a pizza pan around his neck.</p>
        <h3>Wacky Quirk</h3>
        <p>He must shout "En Garde!" before he talks to anyone.</p>
        <h3>Turn</h3>
        <p>Hi, I'm D'Artagnan. I won a gold medal for sword fighting 8 years ago. I hired a few Mystics to tell me if I'd win again. One of them was the guy who died tonight. Then my gold medal disappeared! You can't just buy those! You have to poke people with swords to get them! That was the last time I saw him.</p>
        <h3>If Arrested</h3>
        <p>I am a Champion! Cheating is against my honor! Also, my sword is at the cleaners!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>I am a Champion! Cheating is against my honor! Also, my sword is at the cleaners!</p>`,
        },
      ],
    },
    {
      id: "madame-valjean",
      slug: "madame-valjean",
      name: "Madame Valjean",
      role: "Ex-Fiancee",
      summary:
        "Cagliostro's former fiancee who left him decades ago over stolen sandwich money.",
      alibi:
        "Sat with tea and recounted old relationship disasters to nearby guests.",
      secret:
        "She knows Cagliostro built a life of lies and romantic manipulation.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/madame-valjean.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a wedding veil over a tracksuit.</p>
        <h3>Wacky Quirk</h3>
        <p>She is very dramatic and must "faint" onto a chair at least three times during the game.</p>
        <h3>Turn</h3>
        <p>I'm Madame Valjean. I grew up with Cagliostro. We almost got married 50 years ago, but I found out he was stealing my sandwich money! I left him at the altar. I couldn't marry a thief. I heard he had a son with another woman, but I bet he told her he was a prince or a talking frog.</p>
        <h3>If Arrested</h3>
        <p>Me? A killer? I'm just an old lady! Arrest someone with more energy!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>Me? A killer? I'm just an old lady! Arrest someone with more energy!</p>`,
        },
      ],
    },
    {
      id: "cosette",
      slug: "cosette",
      name: "Cosette",
      role: "Grown-up Kid",
      summary:
        "Adult witness from one of Cagliostro's earlier households, with memories of theft accusations.",
      alibi:
        "Spent dinner discussing childhood memories with guests near the dessert cart.",
      secret:
        "She remembers a major family argument over missing jewelry and even a stolen rubber ducky.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/cosette.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a fancy dress but carries a giant, squeaky rubber ducky everywhere.</p>
        <h3>Wacky Quirk</h3>
        <p>If she gets nervous, she has to squeak her rubber ducky instead of talking.</p>
        <h3>Turn</h3>
        <p>My name is Cosette. The Mystic worked for my family when I was a little girl. I remember my parents screaming at him one night. He was accused of stealing my mother's shiny jewelry and my favorite rubber ducky. I hadn't seen him since that fight. I guess he was fired.</p>
        <h3>If Arrested</h3>
        <p>No way did I poison the crystal-ball guy! Arrest someone else!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>No way did I poison the crystal-ball guy! Arrest someone else!</p>`,
        },
      ],
    },
    {
      id: "passepartout",
      slug: "passepartout",
      name: "Passepartout",
      role: "Servant",
      summary:
        "Longtime servant in Cagliostro's mansion who handled household routines but never saw the full truth.",
      alibi:
        "Was rotating between service duties and table checks throughout dinner.",
      secret:
        "He spent 30 years maintaining the mystic's mansion without knowing where the wealth came from.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/passepartout.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Has feather dusters tucked into his belt like swords.</p>
        <h3>Wacky Quirk</h3>
        <p>He is obsessed with dust and must "dust" other players' shoulders while they are talking.</p>
        <h3>Turn</h3>
        <p>The Mystic didn't work for me—I worked for him! He was a very rich man. I spent 30 years cleaning his mansion and dusting his magic hats. I didn't know where his money came from. He never told me. I guess it's time for me to find a job cleaning for someone who isn't a fake wizard.</p>
        <h3>If Arrested</h3>
        <p>Why would I kill my boss? That's crazy. Who is going to pay me now? You?</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>Why would I kill my boss? That's crazy. Who is going to pay me now? You?</p>`,
        },
      ],
    },
    {
      id: "inspector-javert",
      slug: "inspector-javert",
      name: "Inspector Javert",
      role: "Private Detective",
      summary:
        "Veteran investigator mocked for chasing the 'Mystic Marauder' case for decades.",
      alibi:
        "Reviewed notes and questioned guests during dinner while trying to stay professional.",
      secret:
        "He believed Cagliostro was his prime suspect for 30 years but never found hard evidence.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/inspector-javert.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Carries a magnifying glass so big he has to use two hands to hold it.</p>
        <h3>Wacky Quirk</h3>
        <p>He speaks in a dark Batman voice even when he's just asking for the salt.</p>
        <h3>Turn</h3>
        <p>I am Inspector Javert. I've been looking for a thief called the 'Mystic Marauder' for 30 years. The man who died today was my prime suspect, but I never had hard evidence. Everyone at the police station makes fun of me. They call me 'No-Clue Javert.' It really hurts my feelings.</p>
        <h3>If Arrested</h3>
        <p>Are you kidding? I'm a police man! I believe in justice! And donuts! Mostly justice!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>Are you kidding? I'm a policeman! I believe in justice! And donuts! Mostly justice!</p>`,
        },
      ],
    },
    {
      id: "gringoire",
      slug: "gringoire",
      name: "Gringoire",
      role: "Bitter Coworker",
      summary:
        "Former coworker who claims he saw Cagliostro steal and then lose everyone their jobs.",
      alibi:
        "Stayed near the kitchen door venting about unemployment and stale cracker dinners.",
      secret:
        "He deeply resented Cagliostro for ruining his career after the Esmeralda incident.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/gringoire.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a necklace made of saltine crackers.</p>
        <h3>Wacky Quirk</h3>
        <p>He is always hungry and must ask other characters if he can eat their "buttons" because they look like snacks.</p>
        <h3>Turn</h3>
        <p>My name is Gringoire. I worked with the Mystic for Esmeralda until we all got fired. It was his fault we got the sack! I saw him stealing her gold hair-clips! But she fired us before I could tell on him. It took me a year to find a new job. The worst part is he got away with it and I had to eat crackers for dinner for months!</p>
        <h3>If Arrested</h3>
        <p>I admit, I hated the guy, but I didn't kill him! I'm too busy being grumpy!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>I admit, I hated the guy, but I didn't kill him! I'm too busy being grumpy!</p>`,
        },
      ],
    },
    {
      id: "madame-thenardier",
      slug: "madame-thenardier",
  name: "Madame Thénardier",
      role: "Candlestick Lady",
      summary:
        "Antique collector convinced Cagliostro stole her silver spoons and tried to charm his way into her jewelry.",
      alibi:
        "Spent dinner guarding her handbag and listing every missing household item from memory.",
      secret:
        "She previously hired a detective over theft suspicions but never recovered the spoons.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/madame-thenardier.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Has spoons taped to her hat like a crown.</p>
        <h3>Wacky Quirk</h3>
        <p>She is very suspicious and must check people's elbows to see if they are hiding her spoons there.</p>
        <h3>Turn</h3>
        <p>I am Madame Thénardier and that Mystic was a horrible thief! I couldn't prove it, but I know he stole my antique silver spoons. He worked for me for a week until I caught him trying to 'predict' his way into my jewelry box. I hired a detective, but he found nothing. I never saw my spoons again!</p>
        <h3>If Arrested</h3>
        <p>What! I'm mad at the guy, but I'm no murderer! Arrest someone else! I'm busy looking for my spoons!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>What! I'm mad at the guy, but I'm no murderer! Arrest someone else! I'm busy looking for my spoons!</p>`,
        },
      ],
    },
    {
      id: "fantine",
      slug: "fantine",
      name: "Fantine",
      role: "Secret Mother",
      summary:
        "Marius's mother, separated for decades after Cagliostro took their baby and vanished.",
      alibi:
        "Arrived focused on Cagliostro's promised reunion and stayed emotional but visible during dinner.",
      secret:
        "She came to reclaim her son, not to kill, and planned to confront Cagliostro publicly.",
      imageUrl:
        "/mystery_kits/cagliostro_last_prophecy/characters/fantine.jpeg",
      participantDossierHtml: `
        <h3>The Look</h3>
        <p>Wears a "Hello My Name Is: MOM" sticker.</p>
        <h3>Wacky Quirk</h3>
        <p>She tries to mother everyone and must fix people's hair or tuck in their shirts while they speak.</p>
        <h3>Turn</h3>
        <p>My name is Fantine. Thirty years ago, the Mystic and I fell in love. We had a son named Marius. After he was born, the Mystic stole the baby and ran away! I never knew what happened to them. When he invited me tonight, he said I would finally see my son. (Turn to Marius) Marius! I am your mother! Give me a hug!</p>
        <h3>If Arrested</h3>
        <p>I've hated that man for years, but tonight he was giving me my son back. I'm no murderer. Arrest someone else!</p>
      `,
      packetItems: [
        {
          id: "if-arrested",
          title: "If Arrested",
          order: 1,
          html: `<p>I've hated that man for years, but tonight he was giving me my son back. I'm no murderer. Arrest someone else!</p>`,
        },
      ],
    },
  ],
  evidence: [
    {
      id: "evidence-noodle-plate",
      title: "Noodle Plate Residue",
      summary:
        "Forensic swab from Cagliostro's plate suggests toxin exposure during the main course.",
      type: "forensic",
    },
    {
      id: "evidence-bank-withdrawal-slip",
      title: "Bank Withdrawal Slip",
      summary:
        "Record shows Cagliostro emptied major accounts one day before the dinner.",
      type: "document",
    },
    {
      id: "evidence-detective-note",
      title: "Mystic Marauder Case Note",
      summary:
        "Inspector Javert's old case note links multiple theft complaints to one suspect profile.",
      type: "document",
    },
    {
      id: "evidence-glitter-parcel",
      title: "Glitter Delivery Parcel",
      summary:
        "A package delivered by Gavroche contains glitter and a strange handwritten warning.",
      type: "artifact",
    },
  ],
  locations: [
    {
      id: "magic-dinner-hall",
      name: "Magic Dinner Hall",
      detail: "Main dining room where Cagliostro made his final prophecy and collapsed.",
    },
    {
      id: "chair-row",
      name: "Chair Row",
      detail: "Where guests checked under seats for 'ghosts' during the comedic interaction.",
    },
    {
      id: "service-corridor",
      name: "Service Corridor",
      detail: "Narrow route between kitchen and dining room, useful for unseen movement.",
    },
    {
      id: "private-parlor",
      name: "Private Parlor",
      detail: "Small room containing Cagliostro's crystal ball, old letters, and account records.",
    },
  ],
  faqs: [
    {
      question: "How many people can play this mystery kit?",
      answer:
        "This case includes 15 characters and works best with 8 to 15 players, depending on your group size.",
    },
    {
      question: "Is this mystery suitable for younger readers and mixed-age parties?",
      answer:
        "Yes. The writing style uses simple language with playful comedy while keeping the deduction fun for adults too.",
    },
    {
      question: "Do all relationships and story links matter in solving the case?",
      answer:
        "Yes. Family links, marriage links, ex-relationships, and detective history all help narrow motive and opportunity.",
    },
    {
      question: "Can the host still play?",
      answer:
        "Yes. The host can facilitate clue timing and still participate in roleplay and final accusation.",
    },
  ],
  experienceSteps: [
    {
      step: "01",
      title: "Read the spooky intro",
      body: "Start with Cagliostro's dramatic prophecy, collapse, and the ghost-under-chair interaction.",
      accent: "from-purple-200 to-fuchsia-100",
    },
    {
      step: "02",
      title: "Meet all 15 suspects",
      body: "Each character gives a comedic turn statement, plus motive and alibi details.",
      accent: "from-sky-200 to-cyan-100",
    },
    {
      step: "03",
      title: "Connect thefts and secrets",
      body: "Use evidence and relationships to map who feared Cagliostro's final confession.",
      accent: "from-amber-200 to-yellow-100",
    },
    {
      step: "04",
      title: "Expose the poisoner",
      body: "Make final accusations and reveal who ended the Mystic Marauder mystery forever.",
      accent: "from-emerald-200 to-teal-100",
    },
  ],
  materialPreviews: [
    {
      label: "Character Dossiers",
      title: "15 comedic suspects",
      body: "Every role includes a turn speech, alibi, secret, and if-arrested line for easy roleplay.",
      badge: "Full cast",
      style: "from-fuchsia-50 via-white to-rose-50",
    },
    {
      label: "Host Flow",
      title: "Round-by-round mystery pacing",
      body: "Structured reveal timing keeps the case clear, lively, and manageable for first-time hosts.",
      badge: "Easy run",
      style: "from-sky-50 via-white to-cyan-50",
    },
    {
      label: "Evidence Pack",
      title: "Bank slips, notes, and poison clues",
      body: "Clues are designed to support both comedy beats and real deduction.",
      badge: "4 clue drops",
      style: "from-amber-50 via-white to-yellow-50",
    },
  ],
  experienceHighlights: [
    {
      title: "Big cast, clear structure",
      quote:
        "Even with 15 suspects, the rounds stay easy to follow and fun to play.",
      name: "Designed for social groups",
      accent: "from-fuchsia-200 via-rose-100 to-orange-100",
      tilt: "lg:-rotate-1",
    },
    {
      title: "Comedy + mystery balance",
      quote:
        "Silly lines and dramatic clues make this perfect for a playful spooky night.",
      name: "75–110 minute arc",
      accent: "from-sky-200 via-cyan-100 to-teal-100",
      tilt: "lg:rotate-1",
    },
  ],
  heroEyebrow: "Comedic Mystic Murder",
  heroCaption:
    "A fortune teller, a poisoned noodle plate, and 15 suspicious guests with very loud excuses.",
  partyEnergyLabel: "Spooky • silly • guest-friendly",
  ctaPrimaryLabel: "Enter Play Mode",
  ctaSecondaryLabel: "Custom Version Soon",
  ctaSampleLabel: "Sample Pack",
  helperMessage:
    "Playable now with full cast data. Customize names, clues, and reveal style for your event next.",
  perfectFor: [
    "Halloween dinners",
    "Family-friendly mystery nights",
    "Birthday parties",
    "Large social groups",
  ],
  hostNotes: [
    {
      title: "Run the chair check early",
      body: "The ghost-under-chair gag breaks the ice and gets everyone participating immediately.",
    },
    {
      title: "Keep turns snappy",
      body: "Short, clear speeches help all players follow motives and relationships quickly.",
    },
    {
      title: "Use relationship clues often",
      body: "Marriage, family, and old work ties are the fastest route to strong accusations.",
    },
  ],
  seoBlock:
    "A printable comedic mystic murder mystery kit for 8–15 players featuring 15 character dossiers, relationship-driven clues, and an easy host flow for spooky social dinners.",
  seoTitle: "Comedic Mystic Murder Mystery Kit (8–15 Players) | Hub98",
  seoDescription:
    "Host a spooky comedy dinner where Mystic Cagliostro is poisoned mid-prophecy. Includes 15 characters, clues, and a host-friendly reveal flow.",
  seoKeywords: [
    "mystic murder mystery",
    "fortune teller party game",
    "comedy murder mystery kit",
    "printable dinner mystery",
    "15 player mystery party",
    "halloween dinner game",
    "family friendly whodunit",
    "character roleplay party",
    "Hub98 mystery kit",
    "Cagliostro mystery",
  ],
};
