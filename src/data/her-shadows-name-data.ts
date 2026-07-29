const PREDEFINED_IMAGES = {
  HSN_Ellie_portrait: "/cold_case_data/her_shadows_name/ellie.png",
  HSN_Grandma_photo: "/cold_case_data/her_shadows_name/grandMA.png",
  HSN_Uncle_photo: "/cold_case_data/her_shadows_name/uncle.png",
  HSN_Meave_photo: "/cold_case_data/her_shadows_name/meave.png",
  HSN_guy_photo: "/cold_case_data/her_shadows_name/guy.png",
  HSN_sherrif_photo: "/cold_case_data/her_shadows_name/sherrif.png",
  HSN_shopkeeper_photo: "/cold_case_data/her_shadows_name/shopkeeper.png",
  HSN_maine_map_photo: "/cold_case_data/her_shadows_name/maine_map.png",
};

const TRUTHS_TO_HELP_LLM = [
  `1. Grandma Edith (Age 75)	Family Matriarch; Former school teacher.	Burns the photos and is unnaturally fixated on Ellie’s schedule. 
She constantly whispers, "Don't go near the water."	
Motive: Preservation of Self/The Secret. Edith accidentally killed her sister Cora 60 years ago. 
She is driving Ellie out (or into madness) to protect herself. 
Her guilt makes her want Ellie to become Cora"`,
  `Ellie’s estranged Uncle (Edith's son); Local realtor.	
He is aggressively trying to sell the family home and pressures Ellie to sign papers, 
suggesting he wants her gone for money.	Motive: Financial & Guilt by Association. 
He wants Ellie gone so he can sell the house, his own business interests.`,
  `Head of Black Creek P.D.	He closes Ellie's case files quickly and refuses external help, citing Ellie’s mental instability. He is always the first one called and the last one to arrive.`,
  `Childhood Friend; Works at the local auto shop.	Too helpful and too familiar with Ellie’s routines. He is the one making the late-night calls under instruction, using old, untraceable landlines.`,
  `Maeve Carter (Age 60)	Town Gossip/Proprietor of the general store.	She always seems to know more than she should, giving Ellie subtle, veiled warnings like, "Don't ask questions about what the family has buried."	Motive: Fear & Misguided Protection. She genuinely fears the town's dark history and believes the "voices" by the bridge are real. Her warnings are meant to save Ellie, but she is too afraid of the town's leaders `,
  `Ellie's calls, her paranoia, and her discovery of the great-grandmother's diary were not driven by external threats, but by Edith's slow, decades-long attempt to psychologically manipulate Ellie into becoming Cora. Edith groomed Ellie to adopt the identity of the sister she killed—the only way Edith could live with her guilt was to resurrect Cora through her granddaughter.

    The Calls: Edith used old recordings, or had Jake set up the calls, but she was the director.

    The Missing: Ellie is not dead. Ellie is found days later, safe, but completely catatonic. She responds only to the name Cora, signing her official statement with that name (or an ambiguous smudge).

The Cold Case File: The file closes as "Ellie Vance: Found, but Mentally Incompetent." The town and Sheriff Carver agree that the solitude drove her mad. Edith continues to care for "Cora," having achieved her twisted goal of fixing her past crime by effectively erasing her granddaughter's life. The secret is buried in plain sight.`,
  `The family found out that edith had killed her sister Cora in a tragic accident when they were children. The family covered it up, and Edith has been living with the guilt ever since. She sees Ellie as a way to redeem herself by making Ellie take on the identity of Cora, effectively erasing Ellie’s own identity and replacing it with that of her deceased sister.`,
  `Edith herself was made to forget that she had a sister, Cora, due to the trauma of the accident and the family's decision to cover it up. This selective memory loss has fueled her obsession with Ellie and her desire to recreate Cora through her granddaughter.`,
  `The town of Black Creek has a long history of mysterious disappearances and unexplained phenomena, which has contributed to the local folklore and the belief in supernatural occurrences. This environment has made it easier for Edith to manipulate Ellie, as the town's residents are more likely to accept strange events as part of the town's lore rather than question them.`,
  `The shop keeper saw ellie on the dy she went missing and said it appeared she was walking towards the bridge, but she was not there when he looked again. He also mentioned that he saw a shadowy figure near the bridge that night, which he described as "not quite human."`,
  `Meave has seen jake around ellies house and says hes a pervert, jake is a mechanic but also good with eleotronics and everyone in town goes to him to fix it, so he could be suspected of calling or routing the phones to call ellie.`,
  `The sherrif could be framed for sabatoging the mayors plans of bringing more tourism to the town, by trying to be incompotent with the case and not helping ellie, but he is also a red herring because he is not the one calling ellie.`,
];

const HER_SHADOWS_NAME_DATA = {
  items: [
    {
      id: "briefing_her_shadows_name",
      type: "case-briefing",
      title: "Case Briefing: Her Shadow's Name",
      content: JSON.stringify({
        department: "BLACK CREEK SHERIFF'S OFFICE",
        bureau: "Missing Persons Unit",
        date: "October 29, 2025",
        to: "Lead Investigator",
        from: "Dispatcher L. Morales",
        subject: 'Missing Adult — Eleanor "Ellie" Vance (Age 24)',
        classification: "ACTIVE INVESTIGATION // URGENT",
        body: `Investigator,

At 7:42 AM, Elanor Vance reported her granddaughter, Eleanor "Ellie" Vance (24), missing from the Vance residence on the edge of Black Creek.

Victim Profile:
- Ellie recently returned to Black Creek to care for her ailing grandmother.
- She is an aspiring writer, emotionally sensitive, and has a documented history of anxiety episodes.
- Personal journals indicate escalating distress connected to repeated late-night phone calls.

Critical Pattern:
- Ellie repeatedly records the same caller phrase: "Is that you, Cora?"
- She does not identify a confirmed caller. Instead, she refers to "the shadow's name" as the identity being forced onto her.
- Final diary passages suggest fear of replacement, not just harassment.

Persons of Interest (Red Herrings):
1) Sheriff Richard "Red" Herring
   - Dismissed Ellie's prior call complaints as stress-related.
   - Discouraged outside state intervention.
   - Relevant call logs later went missing from his desk.

2) Ellie's Uncle
   - Supplied Ellie with cryptic records centered on the old "Bridge Legend."
   - Frequently observed lingering near the Vance property at odd hours.

3) Ellie's Childhood Friend
   - Highly involved in Ellie's situation and unusually inquisitive about her fear responses.
   - Has technical access to old switching hardware and could potentially stage rotating or spoofed calls.

Immediate Objective:
Establish timeline from final 48 hours, recover missing call logs, and identify whether "Cora" is a historical person, alias, or psychological trigger used by a living suspect.

Proceed with caution. Local narrative pressure is high, and witness statements are likely contaminated by folklore.

— Dispatcher L. Morales`,
      }),
      position: { x: 55, y: 25 },
      size: { width: 220, height: 280 },
      rotation: -2,
    },
    {
      id: "news_black_creek_evening_2025_10_12_fog",
      type: "newspaper",
      title: "Black Creek Evening Ledger: Fog Swallows Night Shift",
      content: JSON.stringify({
        publication: "Black Creek Evening Ledger",
        headline: "MYSTERIOUS FOG ENGULFS FACTORIES AND LAKES AFTER DARK",
        subheadline:
          "Workers at Mill Row and residents near Cinder Lake report thick, fast-moving fog banks with sudden temperature drops and near-zero visibility.",
        dateline: "BLACK CREEK",
        date: "Sunday, October 12, 2025",
        author: "Marta Quinley",
        authorRole: "Local Affairs Reporter",
        hasPhoto: false,
        imageCaption: "",
        body: `A string of late-night incidents has raised concern across Black Creek after unusual fog banks rolled into industrial and waterfront areas in less than ten minutes.

At approximately 11:30 PM Friday, employees at the North Thread Factory reported visibility dropping to just a few feet as alarms briefly malfunctioned. Similar conditions were later reported around Pineglass Foundry and the eastern edge of Cinder Lake.

Witnesses described the fog as "too dense" and "unnaturally cold," with several claiming they heard footsteps and voices despite no one being visible nearby. Emergency responders treated three residents for panic-related breathing distress, though no toxic contaminants were found in preliminary air samples.

The Black Creek Utilities Board has denied any industrial gas leak. Sheriff Richard Herring called the events "a seasonal weather anomaly" and urged residents to avoid "spreading folklore as fact."

However, long-time locals note eerie similarities to historical accounts tied to the old Bridge Legend. The municipal council has scheduled an emergency weather and infrastructure review for Tuesday night.`,
      }),
      position: { x: 95, y: 6 },
      size: { width: 380, height: 300 },
      rotation: 1,
    },
    {
      id: "news_black_creek_register_2025_10_21_radio_towers",
      type: "newspaper",
      title: "The Black Creek Register: Tower Buzz Rattles Residents",
      content: JSON.stringify({
        publication: "The Black Creek Register",
        headline:
          "NEW TOURISM RADIO TOWERS LINKED TO NIGHTTIME BUZZING REPORTS",
        subheadline:
          "Officials defend recent tower rollout as an economic boost, while residents near Willow Hill and Lake Road report persistent electrical hum after sunset.",
        dateline: "BLACK CREEK",
        date: "Tuesday, October 21, 2025",
        author: "Jonas Pike",
        authorRole: "City Beat Correspondent",
        hasPhoto: false,
        imageCaption: "",
        body: `A recently installed network of municipal radio towers—part of Black Creek's "Visit the Hollow" tourism campaign—is now at the center of growing complaints about an unexplained buzzing sound heard across multiple neighborhoods at night.

City officials approved the towers in August to improve event broadcasts, emergency alerts, and visitor information coverage for the small city's fall festival season. Since activation last week, residents in Willow Hill, Factory Row, and Lake Road say the buzzing begins around 10:00 PM and intensifies after midnight.

"It's like a low radio static under the walls," said one homeowner. "You can't tell where it's coming from, but everyone hears it." Several callers told the Register the sound appears strongest during heavy fog.

Engineering contractor Northline Signal Group stated that all equipment passed federal compliance checks and that no unsafe emissions have been detected. The mayor's office said the towers remain operational while additional acoustic testing is conducted.

Meanwhile, social media speculation has tied the noise to older local stories involving the bridge and "voices on dead lines." Police urged the public to report disturbances through official channels and avoid trespassing near tower enclosures.`,
      }),
      position: { x: 100, y: 70 },
      size: { width: 380, height: 300 },
      rotation: -1,
    },
    {
      id: "doc_interrogation_shopkeeper",
      type: "interrogation-transcript",
      title: "Interrogation: Shopkeeper (Witness)",
      content: JSON.stringify({
        department: "Black Creek Sheriff's Office",
        title: "Witness Interrogation: Shopkeeper",
        caseNumber: "BC-MP-2025-119",
        date: "October 29, 2025",
        interviewer: "Sheriff Richard Herring",
        subject: "Town Shopkeeper",
        bodyRaw: [
          "Sheriff: State your name and occupation for the record.",
          "Shopkeeper: Thomas Hale. I run the general shop on Main.",
          "Sheriff: When did you last see Ellie Vance?",
          "Shopkeeper: Around 9:10 PM. She bought candles and asked if the bridge road was still open.",
          "Sheriff: Did she appear distressed?",
          "Shopkeeper: Shaken. Kept glancing at the payphone like she expected it to ring.",
          "Sheriff: Did you follow her?",
          "Shopkeeper: No. I watched her head toward Lake Road. Then the fog rolled in thick and she vanished from sight.",
          "Sheriff: Anything else unusual?",
          "Shopkeeper: I heard a humming noise—low, like power lines. Then I saw a dark figure near the bridge rail.",
          "Sheriff: Can you identify the figure?",
          "Shopkeeper: No, sir. Just a silhouette.",
        ],
      }),
      position: { x: 150, y: 70 },
      size: { width: 220, height: 300 },
      rotation: -1,
    },
    {
      id: "doc_interrogation_jake",
      type: "interrogation-transcript",
      title: "Interrogation: Jake (Childhood Friend)",
      content: JSON.stringify({
        department: "Black Creek Sheriff's Office",
        title: "Suspect Interrogation: Jake Mercer",
        caseNumber: "BC-MP-2025-119",
        date: "October 29, 2025",
        interviewer: "Sheriff Richard Herring",
        subject: "Jake Mercer",
        bodyRaw: [
          "Sheriff: Jake Mercer, mechanic at Black Creek Auto, correct?",
          "Jake: That's right.",
          "Sheriff: Witnesses place you near the Vance house late at night. Why?",
          "Jake: Ellie asked me to check her porch light and phone wiring. Said calls kept cutting in with static.",
          "Sheriff: You have access to old switching gear and landline parts?",
          "Jake: Sure, I salvage old electronics. Doesn't make me a stalker.",
          "Sheriff: Did you call her from untraceable lines?",
          "Jake: No. I called once from the auto shop, in daylight, to see if she was okay.",
          'Sheriff: Did Ellie mention the phrase "Is that you, Cora?" to you?',
          "Jake: Yeah. She asked if it meant anything to me. I told her no.",
          "Sheriff: Where were you between 10 PM and midnight last night?",
          "Jake: At the garage finishing a radiator job. Camera should have me there.",
        ],
      }),
      position: { x: 0, y: 20 },
      size: { width: 220, height: 300 },
      rotation: 1,
    },
    {
      id: "brochure_black_creek_tourism",
      type: "brochure",
      title: "Black Creek Visitor's Guide",
      content: JSON.stringify({
        title: "Discover Black Creek",
        location: "Black Creek Tourism & Development Board",
        edition: "Official Visitor's Guide & Map",
        stamp: "Visit The Whispering Bridge!",
        front: {
          eyebrow: "A Hidden Gem of the Valley",
          headline: "Welcome To Black Creek",
          subheadline:
            "Where history, folklore, and natural beauty flow together in perfect harmony.",
          body: `Nestled deep in the quiet valleys of the Pacific Northwest, Black Creek invites you to lose yourself in our pristine forests, historic storefronts, and timeless local charm. Come walk our misty pathways and experience a community where the past is never truly gone.

[A frantic, shaky note is scrawled in red ink across the paragraph above: "Because she won't let it die. I can't escape. She knows my schedule. She burns the photos. She is watching me."]`,
          bullets: [
            "Explore miles of scenic hiking trails along the riverbank",
            "Visit local heritage shops and Maeve's General Store",
            "Experience our peaceful, close-knit mountain community",
          ],
          footer: "Supported by the Office of the Mayor and local businesses",
        },
        back: {
          eyebrow: "Local Legends",
          headline: "The Mystery Of Whispering Bridge",
          subheadline:
            "An architectural landmark with a hauntingly beautiful legend of its own.",
          body: `The historic Whispering Bridge has spanned the deepest gorge of the creek for nearly a century. Named for the unique acoustic wind patterns that drift through its wooden trusses, visitors often swear they can hear soft, child-like whispers laughing in the breeze. It remains our most popular spot for evening walks and local photography.

[More red ink is aggressively scribbled at the bottom, nearly tearing the paper: "It is not the wind. It's Cora. She says I have to take her place. 'Ellie' is a lie. I have to go to the water. Grandma says it's the only way to make it right."]`,
          bullets: [
            "Unique acoustic phenomena perfect for folklore enthusiasts",
            "Beautiful twilight views of the misty gorge waters below",
            "A landmark rich in local history dating back to 1966",
          ],
          footer:
            "WARNING: Please respect safety barriers. Do not approach the water after dark.",
        },
      }),
      position: { x: 120, y: 65 },
      size: { width: 180, height: 256 },
      rotation: 3,
      packIn: ["evidence"],
    },
    {
      id: "doc_interrogation_uncle",
      type: "interrogation-transcript",
      title: "Interrogation: Ellie's Uncle",
      content: JSON.stringify({
        department: "Black Creek Sheriff's Office",
        title: "Interrogation: Mark Vance (Uncle)",
        caseNumber: "BC-MP-2025-119",
        date: "October 29, 2025",
        interviewer: "Sheriff Richard Herring",
        subject: "Mark Vance",
        bodyRaw: [
          "Sheriff: You were seen around the Vance property multiple times this week.",
          "Uncle Mark: It's family property. I check on my mother and the house.",
          "Sheriff: Why did you provide Ellie with bridge records and old town archives?",
          "Uncle Mark: She asked questions about the family history. I gave her what was in storage.",
          "Sheriff: Did you pressure her to sign real estate paperwork?",
          "Uncle Mark: I asked her to consider options. The home is expensive to maintain.",
          "Sheriff: Last contact with Ellie?",
          "Uncle Mark: Yesterday evening. She sounded tired and paranoid about phone calls.",
          "Sheriff: Did you go to the bridge last night?",
          "Uncle Mark: No. I was at my office closing month-end books.",
        ],
      }),
      position: { x: 150, y: 35 },
      size: { width: 220, height: 300 },
      rotation: 0,
    },
    {
      id: "doc_interrogation_meave",
      type: "interrogation-transcript",
      title: "Interrogation: Maeve Carter",
      content: JSON.stringify({
        department: "Black Creek Sheriff's Office",
        title: "Witness Interrogation: Maeve Carter",
        caseNumber: "BC-MP-2025-119",
        date: "October 29, 2025",
        interviewer: "Sheriff Richard Herring",
        subject: "Maeve Carter",
        bodyRaw: [
          "Sheriff: Ms. Carter, you warned Ellie to stop asking questions. Why?",
          "Maeve: Because people who chase old Black Creek stories end up hurt or gone.",
          "Sheriff: You also claim you saw Jake near Ellie's house.",
          "Maeve: Twice this week. Past midnight. He had tools and wire in his truck bed.",
          "Sheriff: Did you hear anything last night?",
          "Maeve: That buzzing again, from the tower side. Then the fog came down like a curtain.",
          "Sheriff: Did you see Ellie after 9 PM?",
          "Maeve: No. But I saw lights at Edith's upstairs window and someone pacing.",
          "Sheriff: Can you identify who was pacing?",
          "Maeve: No, Sheriff. Just a shape moving back and forth.",
        ],
      }),
      position: { x: 40, y: 105 },
      size: { width: 220, height: 300 },
      rotation: -1,
    },
    {
      id: "doc_interrogation_grandma_edith",
      type: "interrogation-transcript",
      title: "Interrogation: Grandma Edith Vance",
      content: JSON.stringify({
        department: "Black Creek Sheriff's Office",
        title: "Primary Family Interview: Edith Vance",
        caseNumber: "BC-MP-2025-119",
        date: "October 29, 2025",
        interviewer: "Sheriff Richard Herring",
        subject: "Edith Vance",
        bodyRaw: [
          "Sheriff: Mrs. Vance, when did you last see Ellie?",
          "Edith: Just before midnight. She was restless and said the phone kept calling her name.",
          "Sheriff: Did she leave the house willingly?",
          "Edith: She took her coat and notebook. She said she needed air.",
          "Sheriff: Did you hear a vehicle, footsteps, or voices?",
          "Edith: Only the buzzing from outside and the old house pipes. Then nothing.",
          "Sheriff: Why were old family photos burned in the fireplace?",
          "Edith: They were damaged by damp and mold. I threw ruined things away.",
          "Sheriff: Did Ellie ever discuss someone named Cora with you?",
          "Edith: She asked once. I told her old names are best left buried.",
          "Sheriff: Do you believe Ellie is in danger?",
          "Edith: In Black Creek, everyone is in danger after dark.",
        ],
      }),
      position: { x: 110, y: 105 },
      size: { width: 220, height: 300 },
      rotation: 1,
    },
    {
      id: "ellie_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Ellie", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Ellie_portrait,
      position: { x: 22, y: -6 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "grandma_photo",
      type: "photo",
      content: JSON.stringify({ title: "Grandma", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Grandma_photo,
      position: { x: 101, y: -6 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "uncle_photo",
      type: "photo",
      content: JSON.stringify({ title: "Uncle", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Uncle_photo,
      position: { x: 130, y: 38 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "meave_photo",
      type: "photo",
      content: JSON.stringify({ title: "Meave", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Meave_photo,
      position: { x: 26, y: 100 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "sherrif_photo",
      type: "photo",
      content: JSON.stringify({ title: "Sheriff", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_sherrif_photo,
      position: { x: 85, y: 100 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "guy_photo",
      type: "photo",
      content: JSON.stringify({ title: "Guy", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_guy_photo,
      position: { x: 0, y: 60 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "shopkeeper_photo",
      type: "photo",
      content: JSON.stringify({ title: "Shopkeeper", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_shopkeeper_photo,
      position: { x: 130, y: 100 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "maine_map_photo",
      type: "photo",
      content: JSON.stringify({ title: "Maine map", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.HSN_maine_map_photo,
      position: { x: 10, y: 100 },
      size: { width: 1200, height: 600 },
      rotation: 0,
    },
    {
      id: "ellie_diary",
      type: "diary",
      content: JSON.stringify({
        title: "Eleanor's Journal",
        entriesPerPage: 4,
        diaryEntries: [
          {
            date: "September 15, 2025",
            entries: [
              "Arrived in Black Creek. The welcome sign is covered in moss. It feels less like a town and more like a secret.",
              "Grandma's house smells of old paper and rain. She says she's glad to have me, but her eyes seem to look right through me.",
            ],
          },
          {
            date: "September 18, 2025",
            entries: [
              "The fog here is a living thing. It creeps in from the woods at dusk and doesn't leave until late morning.",
              "There's a constant dripping sound in the walls. Grandma says it's just the old pipes.",
            ],
          },
          {
            date: "September 21, 2025",
            entries: [
              "Walked into town for the first time. People stare. Not in a friendly way, but in a curious, quiet way. Like they're waiting for me to do something.",
            ],
          },
          {
            date: "September 24, 2025",
            entries: [
              "Grandma hums a strange, simple tune when she thinks I'm not listening. It's unsettling.",
              "Found an old photo album, but all the pictures of Grandma as a young girl have been carefully cut out.",
            ],
          },
          {
            date: "September 28, 2025",
            entries: [
              "I swear I heard someone whisper my name from the woods when I was taking out the trash. When I turned, there was nothing but trees.",
            ],
          },
          {
            date: "October 1, 2025",
            entries: [
              "The house phone rang late last night. When I answered, there was just static, like the sound of a distant ocean. Grandma said it does that sometimes.",
            ],
          },
          {
            date: "October 4, 2025",
            entries: [
              "Woke up freezing. The window in my room was wide open, but I know I locked it before bed.",
              "Grandma told me a story about a girl who fell from the Black Creek Bridge a long time ago. She said the town never forgot her.",
            ],
          },
          {
            date: "October 7, 2025",
            entries: [
              "The whispers are getting clearer. I was in the kitchen, and I heard it from the hallway vent. A single word. A name.",
              "Cora.",
            ],
          },
          {
            date: "October 10, 2025",
            entries: [
              "Grandma called me Cora this morning. She corrected herself immediately, but there was no apology in her eyes. Just a strange, cold flicker.",
            ],
          },
          {
            date: "October 14, 2025",
            entries: [
              "Heard the whisper again—Cora.",
              "Grandma pretends not to notice.",
            ],
          },
          {
            date: "October 16, 2025",
            entries: [
              "Went to the town library to do some writing. Found the name 'Cora' written in the margin of a book on local history. The ink looked fresh.",
            ],
          },
          {
            date: "October 18, 2025",
            entries: [
              "Bridge water black tonight.",
              "Shadow under the pines matched my steps.",
            ],
          },
          {
            date: "October 19, 2025",
            entries: [
              "I called the sheriff about the whispering. He told me old houses make noises and that I should get more sleep. He didn't believe me. No one does.",
            ],
          },
          {
            date: "October 20, 2025",
            entries: [
              "I'm not imagining it. I saw it today. The name. Scratched into the fog on the outside of the kitchen window. C-O-R-A.",
            ],
          },
          {
            date: "October 22, 2025",
            entries: [
              "Phone rang 3:07 AM. No voice—just breathing.",
              "The name written in dust on the stair: Cora.",
            ],
          },
          {
            date: "October 23, 2025",
            entries: [
              "I feel like a ghost in this house. In this town. Maybe I'm the one haunting this place.",
              "My reflection in the window looked wrong today. For a second, her face wasn't mine.",
            ],
          },
          {
            date: "October 25, 2025",
            entries: [
              "Saw Grandma by the fireplace. She was burning an old photograph. I asked her what it was, and she said 'just bad memories.'",
              "I think it was a photo of me as a baby... with someone else.",
            ],
          },
          {
            date: "October 26, 2025",
            entries: [
              "My theory: I had a sister. A twin, maybe. Something happened to her in this house. Her name was Cora, and Grandma is trying to erase her. Is she haunting me?",
            ],
          },
          {
            date: "October 27, 2025",
            entries: [
              "Dream: door in the river. I knew if I opened it I'd lose my own.",
              "Left the key on the counter. If I go—I don't want to return.",
            ],
          },
          {
            date: "October 28, 2025",
            entries: [
              "I found it. A locked trunk in the attic. Inside... not my things. Her things. A silver locket with 'Cora' engraved. A yellowed newspaper clipping: LOCAL GIRL IN TRAGIC BRIDGE ACCIDENT, 1962. It was Grandma's sister.",
              "The picture... it wasn't me. It was my grandmother as a girl. With her sister. The one she killed.",
            ],
          },
          {
            date: "October 28, 2025 - 11:00 PM",
            entries: [
              "The calls, the whispers, my name... it's not a haunting. It's an invitation. A replacement.",
              "She doesn't want to erase Cora. She wants to bring her back. In me.",
            ],
          },
          {
            date: "October 28, 2025 - Final Entry",
            entries: [
              "She knows I know. The way she looks at me... it's not my grandmother anymore. The door is locked. She's humming that lullaby outside my room.",
              "I know Her Shadow's Name. She didn't go missing. She became part of the town.",
            ],
          },
        ],
      }),
      position: { x: 55, y: -5 },
      size: { width: 220, height: 260 },
      rotation: -6.5,
    },
  ],
  connections: [
    { from: "briefing_her_shadows_name", to: "doc_interrogation_shopkeeper" },
    { from: "briefing_her_shadows_name", to: "doc_interrogation_jake" },
    { from: "briefing_her_shadows_name", to: "doc_interrogation_uncle" },
    { from: "briefing_her_shadows_name", to: "doc_interrogation_meave" },
    {
      from: "briefing_her_shadows_name",
      to: "doc_interrogation_grandma_edith",
    },
    { from: "shopkeeper_photo", to: "doc_interrogation_shopkeeper" },
    { from: "guy_photo", to: "doc_interrogation_jake" },
    { from: "uncle_photo", to: "doc_interrogation_uncle" },
    { from: "meave_photo", to: "doc_interrogation_meave" },
    { from: "grandma_photo", to: "doc_interrogation_grandma_edith" },
  ],
} as const;

export default HER_SHADOWS_NAME_DATA;
