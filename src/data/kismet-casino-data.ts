const PREDEFINED_IMAGES = {
  jatin_nair_profile: "/cold_case_data/kismet_casino/jatin_nair_profile.jpeg",
  garima_gill_profile: "/cold_case_data/kismet_casino/garima_gill_profile.jpeg",
  nandini_mittal_profile:
    "/cold_case_data/kismet_casino/nandini_mittal_profile.jpeg",
  lakshya_luthra_profile:
    "/cold_case_data/kismet_casino/lakshya_luthra_profile.jpeg",

  school_map: "/cold_case_data/kismet_casino/school_map.png",
  Listening_device_on_table:
    "/cold_case_data/kismet_casino/Listening_device_on_table.jpeg",
  magician_performing_card_trick:
    "/cold_case_data/kismet_casino/magician_performing_card_trick.jpeg",
  bottling_plant_ablaze:
    "/cold_case_data/kismet_casino/bottling_plant_ablaze.jpeg",
  magician_and_assistant_performing:
    "/cold_case_data/kismet_casino/magician_and_assistant_performing.jpeg",
  police_investigation_homicide:
    "/cold_case_data/kismet_casino/police_investigation_homicide.jpeg",

  nikki_punj_profile: "/cold_case_data/kismet_casino/nikki_punj.jpeg",
  nakul_punj_profile: "/cold_case_data/kismet_casino/nakul_punj.jpeg",
  farhan_haider_profile: "/cold_case_data/kismet_casino/farhan_haider.jpeg",
  case_badge:
    "/cold_case_data/the_final_rehearsal/the_final_rehearsal_badge.png",
  kismet_case_badge: "/cold_case_data/kismet_casino/kismet_casino_badge.png",
};

const KISMET_CASINO_DATA = {
  items: [
    {
      id: "briefing_kismet_casino",
      type: "case-briefing",
      title: "Case Briefing: The Murder at Kismet Casino",
      content: JSON.stringify({
        department: "MUMBAI METROPOLITAN POLICE",
        bureau: "Crime Branch (Unit I)",
        date: "April 3, 2015",
        to: "Senior Inspector P. L. Ayar",
        from: "Deputy Commissioner Deshmukh",
        subject: "Investigation into the Murder of Chetan Yadav",
        classification: "INTERNAL // AUTHORIZED PERSONNEL ONLY",
        body: `
Ayar, 

We’ve got a real mess on our hands at the Aaina Mahal. 

Chetan Yadav—the former stage magician—has been found dead. His body was discovered stuffed inside a garbage dumpster behind the Aaina Mahal restaurant on the night of Tuesday, March 31, 2015. 

The discovery was made around 11:00 PM by a kitchen helper named Bablu, who was out for a quick cigarette break. When he went to throw his empty pack away, he found the body. He panicked, ran inside to alert the kitchen manager, Franky D'Souza, who immediately dialed 100 and called the casino's in-house doctor, Gauri Acharya. But the magician's final act was already over—he was dead on arrival. 

Chetan was already running from us after he was caught cheating at a high-stakes card table a week ago. But here is where it gets highly suspicious: we found a burner phone on his body. Someone was blackmailing him, forcing him into a high-risk corporate espionage mission to bug Singhania & Co. 

We are starting our investigation with the following local persons of interest:
- Jatin Nair: The casino croupier who was immediately fired to cover up Chetan's cheating scandal. He lost his career because of Chetan's stunt.
- Sanjay Singhania: The billionaire owner of the whole empire. Chetan was caught at his tables, and someone was trying to force Chetan to bug his offices. What is Singhania hiding?
- Nandini Mittal: A wealthy regular who lost over ₹42 Lakhs at Chetan's table. She claims she was cheated out of her life savings and was heard making severe threats against him.
- Garima Gill: The mother of Jackie Gill—Chetan's assistant who was killed in a tragic car crash years ago. Chetan served a long prison sentence for her homicide, and Garima was furious to see him walking free.
- Lakshya Luthra: The famous playback singer. He was the co-passenger in that fatal crash and served time as an accessory. He was performing at the Aaina Mahal the night Chetan was killed. 

We have secured the following evidence for your immediate review:
- Criminal Profiles of the suspects, shared confidentially by our colleagues in the State CID.
- Burner Phone SMS logs.
- Autopsy and Ballistics Report.
- Formal alibis of all suspects.


Every single one of these people has a solid alibi for the exact time of the murder. But my gut says someone's story is completely fabricated. Find the crack in their alibis first. 

Once we clear this initial layer, we can figure out who is really pulling the strings from the shadows of the Aaina Mahal. Be careful.
`,
      }),
      position: { x: 70, y: 45 },
      size: { width: 220, height: 280 },
      rotation: 0,
      packIn: ["evidence"],
    },

    {
      id: "briefing_kismet_casino_followup",
      type: "case-briefing",
      title: "Case Briefing Addendum: Syndicate Link Analysis",
      content: JSON.stringify({
        department: "MUMBAI METROPOLITAN POLICE",
        bureau: "Crime Branch (Unit I)",
        date: "April 3, 2015",
        to: "Senior Inspector P. L. Ayar",
        from: "Deputy Commissioner Deshmukh",
        subject: "Phase Two: Underworld Coordination Around Chetan Yadav",
        classification: "INTERNAL // AUTHORIZED PERSONNEL ONLY",
        body: `
Ayar,

Good work cutting through the noise and clearing out our initial pool of suspects. Nandini and Garima are officially off the board—their alibis held up, and frankly, neither of them had the hardware or the stomach to pull off a professional hit. 

Take a fresh look at the autopsy and ballistics reports: that silenced .32 ACP bullet isn’t from some local amateur's pocket. 

Just on the side, we came across an incident report about Harpreet Dhillon's house being attacked a few nights ago. We brought him in for questioning immediately, and you will want to read what he has to say in his transcript. I have also pulled up some more background intelligence files on active crime syndicates in the state that may be related to the case.

Your next task is to figure out the connections between the Punj twins, Dhillon's testimony, and Farhan Haider. 

We need to know who had the network to organize this hit, who had the motive, and who had the access. 

Treat this as an escalation. 
`,
      }),
      position: { x: 185, y: 87 },
      size: { width: 220, height: 280 },
      rotation: 1,
      unlockOnObjectiveId: "obj_01",
      packIn: ["evidence"],
    },

    {
      id: "news_mumbai_chronicle_2015_03_28_plant",
      type: "newspaper",
      title: "The Mumbai Chronicle: Bottling Plant To Lose Protection",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: "FIRE-DAMAGED BOTTLING PLANT TO LOSE HISTORIC PROTECTION",
        subheadline:
          "Gujarat Heritage Council decides the ruined Hindustan Bottling Plant no longer holds historical value, paving the way for a lucrative land sale; activists suspect Sanjay Singhania’s involvement.",
        dateline: "BHUJ",
        date: "Saturday, March 28, 2015",
        author: "Dinesh Hari",
        authorRole: "Regional Affairs Correspondent",
        hasPhoto: true,
        imageCaption: "The Hindustan Bottling Plant ablaze.",
        imageUrl: PREDEFINED_IMAGES.bottling_plant_ablaze,
        body: `The Gujarat State Heritage Council (GSHC) said yesterday that the historic Hindustan Bottling Plant will be struck from the Register of Protected Heritage Sites following the catastrophic fire last week.

Janardan Apte, a spokesperson for the GSHC, said that, having carefully discussed the issue and having weighed up the merits of both arguments, they decided the fire had damaged the building to such an extent that the structure no longer held any historical value and was therefore no longer worthy of being protected. "The Hindustan fire was a great tragedy for the region, and we did not make this decision lightly. We looked into every possibility of keeping the ruins of the Plant standing, but the fire damaged the structural integrity of the building in such a way that we feel it would be unsafe for it to remain standing."

The news comes as a blow as the Gujarat Historical Society (GHS) had been campaigning to keep the building protected. Lata Patel of the GHS said: "The Hindustan Plant is the oldest bottling plant in the State. It provided an essential service to the people of this state and beyond in the days before water chlorination. While it has been some time since it was a working plant, there’s no escaping the fact that, by providing safe drinking water, the Plant made it possible for people to live in this region. I think that it should be preserved, even if the building is in ruins. I mean, imagine if the Greeks and the Italians destroyed a place just because it was in ruins!"

The removal of the Plant's protection means the land the Plant stands on, purchased by the State when the Plant went out of operation in 1979 to help protect it, will now be sold off. GHS campaigners are hoping the eventual buyer of the land may decide to keep the ruins standing, but they don't expect this to happen. Said Lata Patel: "My bet is that Sanjay Singhania will get the land, and he'll bulldoze it to make way for something else. He’s never shown an interest in preserving history; it just gets in the way of his business interests."

The Chronicle approached Singhania Enterprises for comment, but they refused to respond to our or Ms. Patel's comments.

The GSHC is hoping to install some of the 19th-century cast-iron bottling machinery that survived the fire in the Kutch Heritage Museum as part of a permanent exhibit on the history of the Hindustan Plant and water distribution in general. Said Janardan Apte: "While it is a great tragedy what has happened to the Plant, it is our intention that every measure is taken to ensure that it remains a key part of the state's history that continues to be taught for as long as the city stands."

Meanwhile, the police investigation into how the fire started is still ongoing.`,
      }),
      position: { x: 105, y: 155 },
      size: { width: 380, height: 300 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "news_mumbai_chronicle_2015_03_27",
      type: "newspaper",
      title: "The Mumbai Chronicle: Magician on the Run",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: "FORMER MAGICIAN ON THE RUN AFTER CHEATING AT POKER",
        subheadline:
          "Chetan 'Chiku' Yadav flees Aaina Mahal Casino after rigging high-stakes card game; police launch manhunt for convicted felon.",
        dateline: "MUMBAI",
        date: "Friday, March 27, 2015",
        author: "Vijay Kanth",
        authorRole: "Crime & Investigative Reporter",
        hasPhoto: false,
        imageCaption: "",
        body: `Police were called to the Aaina Mahal Casino last night after a player was caught cheating at one of the casino's private poker tables. The man immediately fled the scene and was able to evade the casino's security guards — police have said they have issued a warrant for his arrest and have begun a manhunt to find him and bring him to justice.

While reviewing the casino's CCTV footage, investigators recognized the cheater as former stage magician Chetan Yadav. Yadav's career ended when he was sent to prison in 1994 on a culpable homicide charge and had been released last year when his sentence came to an end. Allegedly, Yadav's attempts to restart his stage career repeatedly faltered due to his reputation being irreversibly damaged by his crimes.

Showbiz promoter Deepa Roy said to us: "He was eager to pick up where he left off and make a big return — the 20 years behind bars hadn't affected his enthusiasm or his skill. However, what he did 20 years ago had affected the public's appetite to pay to watch him perform." 

When asked if this had all been a stunt to generate publicity, Ms. Roy said: "I doubt it. I initially thought it might be—that the Aaina Mahal had signed Chetan and that this was all an act engineered by the AM management to get his name out. But I've heard through the grapevine that this is not an act, and the AM owners are pretty steamed, to put it mildly. If he was trying to rebuild his career, I don't think he'd risk being thrown back into prison. My bet is that he was trying to raise a bit of dough when he couldn't get any elsewhere. Or maybe he felt he had nothing to lose and wanted to see if he could get away with it. You'd have to ask him yourself."

The police are asking anyone with any information to come forward. They are also warning the public that Mr. Yadav may be armed and dangerous.`,
      }),
      position: { x: -9, y: 130 },
      size: { width: 380, height: 300 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "doc_termination_jatin_nair_2",
      type: "letter",
      title: "Notice of Termination: Jatin Nair",
      content: JSON.stringify({
        letterhead: "Aaina Mahal Casino • March 25, 2015",
        heading: "NOTICE OF TERMINATION",
        content: `It has come to our attention that several games have taken place at your table involving a man now known to have been cheating, Chetan Yadav. As a trained croupier, you should have noticed this man was cheating and brought the matter to our attention. The fact that you allowed this to happen has the possibility of damaging the reputation of this casino and perhaps encouraging further copycat incidents.

Since you either did not notice this cheating, or noticed it and refused to report it, we have lost our trust and faith in you and your ability to perform your duties to the level we expect. As such, we have taken the decision to terminate your employment with immediate effect.`,
        sign: "The Management, Aaina Mahal Casino",
        variant: "chic",
        footer:
          "Aaina Mahal Casino is a part of Singhania Enterprises. Registered no. 456090-456-765-713. This is a confidential document for the eyes of authorized parties only.",
      }),
      position: { x: 130, y: 20 },
      size: { width: 220, height: 290 },
      rotation: -2,
      packIn: ["evidence"],
    },

    {
      id: "doc_autopsy_chetan",
      type: "autopsy-report",
      title: "Autopsy & Ballistics Report: Chetan Yadav",
      content: JSON.stringify({
        caseNumber: "456-MK-90",
        victimName: "Chetan 'Chiku' Yadav",
        sex: "Male",
        age: "55",
        race: "South Asian",
        weight: "77.11 kg",
        height: "180.34 cm",

        description:
          "Body discovered in a dumpster behind the Aaina Mahal (Magic Mirror Casino) on the night of March 31, 2015. Subject was recently released from custody on November 1, 2014. Forensic findings indicate a professional execution utilizing specialized equipment.",

        externalInjuries:
          "Bullet wounds to the front of the torso. High deformation and mushrooming of entry wounds indicate the gun was fired at close range, estimated at exactly six feet. Notable absence of gunpowder stippling around the wounds suggests a suppression device was utilized.",

        internalInjuries:
          "Heart and lungs destroyed by multiple gunshots. Recovery of .32 ACP projectiles from a semi-automatic pistol. Microscopic analysis of recovered rounds detected traces of black rubber residue, consistent with the wipes of a professional silencer.",

        causeOfDeath: "Heart and lungs destroyed by gunshots.",
        mannerOfDeath:
          "Victim was shot in the chest at point-blank range, dying instantaneously.",

        investigatingOfficer: "Inspector Pratap Pathak",
        recordingOfficer: "Hawaldar Rajat",
        date: "April 1, 2015",
        time: "Death estimated between 22:10 and 22:40",
        coroner: "Dr. Meera",
        policeStation: "Crime Branch CID, Mumbai",
      }),

      position: { x: 13, y: 59 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "news_mumbai_chronicle_2015_04_01",
      type: "newspaper",
      title: "The Mumbai Chronicle: Disgraced Magician Dead",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: "DISGRACED MAGICIAN FOUND DEAD",
        subheadline:
          "Former stage headliner Chetan Yadav found shot in the chest, body dumped in alley behind Aaina Mahal; was on the run after cheating scandal.",
        dateline: "MUMBAI",
        date: "Wednesday, April 1, 2015",
        author: "Devendra Hari",
        authorRole: "Crime & Metropolitan Correspondent",
        hasPhoto: true,
        imageUrl: PREDEFINED_IMAGES.magician_performing_card_trick,
        imageCaption:
          "Archive image: Chetan Yadav performing card manipulation on stage.",
        body: `Late last night, Mumbai Police discovered the body of former stage magician Chetan Yadav. He was found in a trash dumpster behind the Aaina Mahal Casino complex. Yadav, 55, had been shot in the chest. Police have confirmed that a homicide investigation has been launched and are urging any possible witnesses or anyone with information to come forward. For a week now, Yadav had been on the run from the law after he was caught cheating at high-stakes poker at the Aaina Mahal.

Yadav was born in Rajkot, Gujarat, beginning his performance career in 1981. By 1983, he made his first major television appearance on Doordarshan, and soon after was touring his magic act nationwide. In 1986, he moved to Mumbai to become a regular headliner at the Aaina Mahal, where his grand illusions quickly became one of the venue's most popular attractions.

While performing there, he befriended popular playback singer Lakshya Luthra, and in 1988, they co-founded the 'Gyan Foundation', an annual charity gala dedicated to fighting illiteracy. However, both men were embroiled in severe controversy in 1994 following a tragic drunk-driving accident that resulted in the death of Yadav's stage assistant, Jackie Gill. 

Luthra, who was ruled to be only an accessory to the culpable homicide, was released from prison nearly nine years ago and has reportedly found it difficult to rebuild his musical career. Similarly, when Yadav was released last year after serving his sentence, he faced extreme difficulty finding a manager willing to take him on. Investigators believe this financial desperation may explain why he resorted to cheating at card games earlier this year.

Mr. Yadav was unmarried and had no next of kin. It is understood that his remaining estate will be donated to various local charities.`,
      }),
      position: { x: -14, y: 58 },
      size: { width: 380, height: 300 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "news_mumbai_chronicle_2015_03_15",
      type: "newspaper",
      title: "The Mumbai Chronicle: Prison Racket Expose",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: "EXPOSE: THE PROTECTION RACKET IN MAHARASHTRA'S PRISONS",
        subheadline:
          "Investigation reveals how powerful underworld cartels run violent extortion rings inside Arthur Road and Yerwada jails, trapping convicts for life.",
        dateline: "MUMBAI",
        date: "Sunday, March 15, 2015",
        author: "Jitendra Sen",
        authorRole: "Senior Investigative Journalist",
        hasPhoto: false,
        imageCaption: "",
        body: `Arthur Road Jail is the largest maximum-security prison in the state. As one might expect from such an institution, the threat of violence is rife. While the facility is heavily guarded, the wardens are there mostly to keep prisoners from escaping. Keeping prisoners in line is another part of their job, but many inmates do not trust them to do so. Simply put, the guards do not provide much deterrence against misbehavior—they break up fights once they start, but they do little to prevent them from beginning in the first place. For inmates who want to complete their sentences unscathed, they cannot simply rely on the guards for protection. That is where gangs come in.

Many of our sources chose to remain anonymous for this piece due to the threat of violent reprisals if they spoke out, but the stories they tell are consistent: first-time prisoners, fearful for their safety, are approached by gang members who exploit their terror of random attacks. The gangs offer to protect them for the duration of their sentences and tell them of the unfortunate fates met by those who refuse their services. Once the deal is struck, the gang makes it clear that the inmate is affiliated with them, and that anyone who attacks them will face violent retribution. Of course, this protection is not offered for free. It is provided on the condition that, once released, the inmate will repay the gang—extorted by the threat of violence into working for them. Repaying these favors often, if not always, involves illegal activity and has therefore become a major cause of repeat offending.

In the course of our investigation, we found that protection rackets linked to the Mumbai Underworld have been operating within several state prisons, some for as long as 40 years. We discovered that ten years ago, after a brutal intergang fight at Arthur Road Jail, various crime syndicates formed a pact and divided the prison rackets among themselves. They feared further prison violence would expose the rackets and lead to crackdowns by prison management. As a result, new inmates fall under the protection of a specific gang at a specific prison. For example, the Haider Cartel controls the racket at Arthur Road Jail, while the rival Punj Syndicate runs the racket at the Yerwada Central Jail. While this truce has been shaky at times, it still stands today.

When we presented our findings to Karan Sharma, Director General of Maharashtra Prisons, he simply stated: "We are aware of the problem, and since taking this post, I have made cracking down on this behavior a priority. We are committed to ensuring that those incarcerated in our prisons are fully rehabilitated upon release and never have cause to re-offend."`,
      }),
      position: { x: 110, y: 110 },
      size: { width: 380, height: 300 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "news_old_town_1994_11_03",
      type: "newspaper",
      title: "Old Town Newsletter: Stage Magician Convicted",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: "STAGE MAGICIAN SENTENCED IN TRAGIC ACCIDENT CASE",
        subheadline:
          "Chetan 'Chiku' Yadav sentenced to 20 years; popular singer Lakshya Luthra gets 12 years as accessory in tragic crash that killed assistant Jackie Gill.",
        dateline: "BHUJ",
        date: "Thursday, November 3, 1994",
        author: "Ameeta Gokhale",
        authorRole: "Crime & Legal Correspondent",
        hasPhoto: true,
        imageCaption:
          "Chetan Yadav performing with assistant Jackie Gill on stage.",
        imageUrl: PREDEFINED_IMAGES.magician_and_assistant_performing,
        body: `The stage magician Chetan 'Chiku' Yadav, 35, has been sentenced to 20 years for the manslaughter of his assistant Jackie Gill. Gill had been a passenger in Yadav's car when he drove into a street light at 85mph near the suburb town Valley Park.

Also in the vehicle was popular singer Lakshya Luthra, Yadav's friend and co-organizer of the 'Read It and Don't Weep' charity fundraiser, who has been sentenced to 12 years for being an accessory to Gill's manslaughter.

Leaving court yesterday, Yadav's manager read a statement on his behalf, saying: "Chetan had much affection for Ms. Gill. He once again expresses his sorrow for her death and sends his apologies to her family — he hopes his incarceration can aid the healing process."

Meanwhile, Lakshya Luthra has denied being an accessory to Gill's death, saying: "I don't deserve this sentence — Chetan set me up to take some of the heat off him and get time off his sentence. His claims that I was goofing around and distracting him were exaggerated beyond belief! I was sitting still the entire time — he deserves all the blame, 100% of it."

Luthra also expressed anger over Yadav's claim — that Luthra had provided the drugs which fuelled his reckless driving. Lakshya believes that Yadav also used this as a ploy to get a more lenient sentence at his expense. He said: "maybe it's technically true the drugs Chetan and I took that night were mine, but he buys plenty of the stuff himself, he just happened to have run out that night. The opportunistic b*****d used me as the fall guy to get less time."

Garima Gill, Jackie's mother, said: "While we are glad to see justice prevail, we believe the sentences are far too lenient considering all they have done and all we will have to go through, so we plan to appeal this ruling."`,
      }),
      position: { x: 28, y: 129 },
      size: { width: 380, height: 300 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "sms_chetan_yadav_burner",
      type: "electronic-messages",
      title: "SMS Log: Chetan Yadav & Unknown Contact",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump",
        caseRef: "456-MK-90",
        participants: "Chetan Yadav & Unknown Contact",
        messages: [
          {
            sender: "Unknown",
            time: "19:34",
            body: "Hello, time for me to call in the favor you owe",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "19:35",
            body: "It seems this might be an opportune time for me, because I see you got in trouble with the law last week. I could help with that you know - we have connections to Mr Singhania drop the charges",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "19:36",
            body: "How'd you do that?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "19:36",
            body: "Never mind that, that's not for you to know",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "19:36",
            body: "But if you got me off the hook, wouldn't that just mean another favor I'd have to repay?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "19:37",
            body: "Yes, it would. But I'm offering to help. Think you can wait it out until the heat dies down? It'll be a long time before that happens. Get real - how many other people can help you now?",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "19:39",
            body: "...It seems none - as I thought",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "19:40",
            body: "No need to worry though - this little favor's an easy one",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "19:43",
            body: "I've got to be at Ajit’s Adda tonight. The bathroom attendant there is a good friend of mine. He offers various products - mints, fragrance, hair product etc. Ask him if he has any strawberry paan, you will need that to know where to go and he will give you a listening device too. When you've got it, text me and I'll give you further instructions",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "19:43",
            body: "Where are you now anyway? I take it you're not at home",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "19:44",
            body: "Misdirection. Allowed me to hide where they'll never look for me.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "21:49",
            body: "I've just left the device with the bathroom attendant.",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "22:01",
            body: "OK, I've got it. What do I do now?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "22:02",
            body: "Gain entry to the address and plant the device immediately. Meet me later and we'll square things with Singhania & Co.",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "22:12",
            body: "I'm in, how do I do this? How do I turn it on?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "22:13",
            body: "However you want, I don't care, just get it done. The device is always on, it can't be turned off. I can hear them in the background but it's not very clear. Move it.",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "22:13",
            body: "Give me a chance, it's still in my pocket. I'm waiting for the opportune moment.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "22:20",
            body: "The sound is still unclear.",
            isMe: false,
          },
          {
            sender: "Chetan",
            time: "22:21",
            body: "I know I am still hiding, I can't escape yet.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "22:22",
            body: "How have you done that? The feed has completely dropped...",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "22:23",
            body: "Hello?",
            isMe: false,
          },
        ],
      }),
      position: { x: 15, y: 90 },
      size: { width: 140, height: 180 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "buner_phone",
      type: "note",
      title: "Detective Note: Buner Phone on Chetan",
      content:
        "This device was found on Chetan. We believe it is a burner phone. We are unsure of who the other number belongs to, probably burner.",
      position: { x: 10, y: 100 },
      size: { width: 100, height: 100 },
      rotation: 2,
      packIn: ["clues"],
    },

    {
      id: "doc_blackmail_letter_chetan",
      type: "letter",
      title: "Threatening Letter: Anonymous Hand-off",
      content: JSON.stringify({
        letterhead: "Anonymous Correspondence",
        heading: "HELLO CHETAN,",
        content: `Glad to hear your little stay in the joint has come to an end, hope it's not too hard adjusting back to life on the outside. I trust your stay away wasn't too hard on your health, after all, I have it on good authority from my associates that you were well looked after. Of course, they didn't look after you for nothing. We scratched your back, so now it's time for you to scratch ours.

Included in this package is a burner phone. Next week it'll receive some texts. I advise you to read them, because I have a favor for you — if you don't respond, there will be repercussions. Don't try and pretend the package got lost — we'll be sure to send it tracked and signed for.`,
        sign: "— Anonymous",
        variant: "handwritten",
        hideLetterhead: true,
        hideFooter: true,
        footer:
          "Recovered from police files. Do not disclose to unauthorized parties.",
      }),
      position: { x: 34, y: 66 },
      size: { width: 220, height: 290 },
      rotation: -2,
      packIn: ["evidence"],
    },

    {
      id: "note_chetan_trash_letter",
      type: "note",
      title: "Detective Note: Letter in Trash",
      content:
        "Found in the trash by Police investigating Chetan Yadav's house, March 25.",
      position: { x: 43, y: 85 },
      size: { width: 110, height: 110 },
      rotation: 4,
      packIn: ["clues"],
    },
    {
      id: "police_investigation_homicide_photo",
      type: "photo",
      title:
        "The following items were found on Chetan Yadav's body during the police investigation of his homicide.",

      content: JSON.stringify({
        title: "Photo: Items on Chetan Yadav's body",
        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.police_investigation_homicide,
      position: { x: -14, y: 95 },
      size: { width: 340, height: 260 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "listening_device_on_table_photo",
      type: "photo",
      title:
        "This was found in the right breast pocket of Chetan Yadav's jacket. It is yet to be identified, but it would appear to be a listening device, it is currently not working",

      content: JSON.stringify({
        title: "Photo: Listening Device on Table",

        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.Listening_device_on_table,
      position: { x: -23, y: 73 },
      size: { width: 340, height: 260 },
      rotation: 1,
      packIn: ["evidence"],
    },

    {
      id: "sms_jatin_nair_records",
      type: "electronic-messages",
      title: "SMS Log: Jatin Nair & Unknown",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump",
        caseRef: "456-MK-90",
        participants: "Jatin Nair & Unknown",
        messages: [
          {
            sender: "Unknown",
            time: "3/30, 10:10",
            body: "Hey, how's it going?",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 10:14",
            body: "Well, I lost my job last week - how do you think?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 10:15",
            body: "I might have the thing to cheer you up...",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 10:15",
            body: "Revenge?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 10:16",
            body: '...how about a "night out" tomorrow?',
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 10:16",
            body: "Not the best of ideas is it, I have no money.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 10:36",
            body: "Can't you still get free drinks and tickets at AM?",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 10:38",
            body: "Well, yeah but it relies on my old colleagues, and it will only be for me. I can't take guests. I will have to sneak out halfway through to meet you.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 10:44",
            body: "OK, well sort yourself out. Just let me know your plans.",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 13:54",
            body: "Ok, just called Komal, that's the first half of my night sorted, have you told The Boss what we are doing?",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 13:55",
            body: "Leave that to me, I will meet you after you've seen Lakshya!",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/30, 13:57",
            body: "OK, let's hope it is not a complete disaster.",
            isMe: true,
          },
          {
            sender: "Unknown",
            time: "3/30, 14:31",
            body: "Don't hold me accountable if it all goes wrong!",
            isMe: false,
          },
          {
            sender: "Unknown",
            time: "3/31, 20:23",
            body: "You ready? We are doing it at 10.30, but we still have to be there by 9. The Boss is calling the shots on this one!",
            isMe: false,
          },
          {
            sender: "Jatin",
            time: "3/31, 20:28",
            body: "Yes, one second, Komal is helping me slip out the back undetected. Don't want security spotting me. Meet me there.",
            isMe: true,
          },
        ],
      }),
      position: { x: 105, y: 45 },
      size: { width: 140, height: 180 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "doc_interview_harpreet_dhillon",
      type: "interrogation-transcript",
      title: "Interview: Harpreet 'Harry' Dhillon (Senior VP)",
      content: JSON.stringify({
        department: "Gujarat Police Force, Crime Branch Division",
        title: "Interrogation Transcript: Harpreet 'Harry' Dhillon",
        caseNumber: "456-MK-90",
        date: "March 31, 2015",
        interviewer: "Sub-Inspector Vikram Singh",
        subject: "Harpreet 'Harry' Dhillon",
        bodyRaw: [
          "Sub-Inspector Singh: This is Sub-Inspector Vikram Singh, Crime Branch. I am currently at the Gandhidham Ring Road bungalow of Mr. Harpreet 'Harry' Dhillon, Senior VP of Singhania Enterprises. The time is 9:45 PM, Tuesday, 31st March, 2015. We're following up on the incident from March 28th, when someone set fire to Mr. Dhillon's front lawn. Sorry to disturb you at this hour, Dhillon-saab, but we've just picked up a suspect matching the description of the guy your neighbors saw running away. We think he has ties to local Mumbai gangs, so we need to wrap this up quickly. Do you have any idea why someone would target your home?",
          "Harpreet Dhillon: None at all, Inspector-saab. Why don't you lock the goon up and ask him yourself?",
          "Singh: We tried, but the man won't open his mouth. Here's the thing: we suspect this guy is working for the Punj twins. Any reason Nakul and Nikki Punj would want you dead? This wasn't a random prank; it was a targeted hit. You must have some idea.",
          "Dhillon: No clue, yaar. Sorry.",
          "Singh: Let's look at this photo. This is a security still from the Aaina Mahal. It shows the Punj twins playing cards last Tuesday. They're playing, they find out someone is cheating, and they lose their minds. But our tech team analyzed the footage — the deck was clearly stacked in their favor from the start. Dhillon-saab, there’s some serious hera-pheri going on between Singhania & Co. and the Punj twins, and we want answers.",
          "Dhillon: [PAUSE] I've got nothing to say.",
          "Singh: I highly suggest you cooperate. It's better for you.",
          "Dhillon: If I speak, it will drag our company's name through the mud.",
          "Singh: Honestly, Dhillon-saab, your company's name is already in the mud.",
          "Dhillon: Look... it all goes back to Sanjay Singhania’s 'Grand Acres' township project. Sanjay wanted to buy this massive plot of land for a new housing colony. The only roadblock was the old Hindustan Soda Factory sitting right in the middle of it. Because it's a protected heritage building, municipal corporation rules wouldn't let us touch it. The only way to knock it down was if it magically lost its historical value. Now, Sanjay is a big businessman — he has to keep his hands clean and maintain a high-society image. So, he usually gets the Punj twins to handle his dirty work and clear the roadblocks.",
          "Singh: So you are saying Nakul and Nikki Punj were hired to burn down the Hindustan Soda Factory?",
          "Dhillon: Exactly. That's what happened.",
          "Singh: And what was Sanjay Singhania doing for them in return? Big criminals don't work for free.",
          "Dhillon: Paying them, of course. Sanjay pays handsomely. But obviously, he couldn't just do a bank transfer or hand over bags of cash — too easy for tax departments to trace. So he set up a clever workaround. They would play a game of poker at his private tables inside the Aaina Mahal, and the cards would be rigged so they’d conveniently 'win' the exact payout. They had it all pre-planned, down to which hands they would bet on, so it wouldn't look too suspicious to the other players.",
          "Singh: Then what went wrong?",
          "Dhillon: There was another player at the table. This guy was somehow winning the exact hands that were rigged for the Punjes. Turns out, the guy was a professional cheat himself. When we ran the CCTV back, we couldn't believe it. It was Chetan Yadav — that washed-up stage magician who got locked up years ago. The moment he realized he was caught, he slipped out of the casino before security could grab him.",
          "Singh: How did the Punj twins react?",
          "Dhillon: They went absolutely wild. Sanjay tried to explain that the magician had nothing to do with us, but they wouldn't listen. People in their line of work don't believe in coincidences. They assumed Sanjay was trying to double-cross them, pocket the money, and use this magician as a 'plant' to block their win. They swore they'd make him pay.",
          "Singh: And how did Sanjay Singhania take that?",
          "Dhillon: He was furious. Not only did he lose his two main fixers, but he was terrified the casino's reputation would be ruined if the cheating story leaked — especially with a known figure like Yadav involved, which it did. Sanjay wanted blood. He put a massive bounty on Chetan's head, hoping some local gang would bring him in.",
          "Singh: No, I mean, how did Sanjay react to the Punj twins threatening him?",
          "Dhillon: Oh, he didn't care. Classic Sanjay bluster — he just dismissed it as empty threats from small-time goons. Told me not to worry about it. He thinks the Punjes will calm down and realize they made a mistake. Plus, the twins want a formal apology, and a man like Sanjay Singhania will never bow down.",
          "Singh: So why did they target your house?",
          "Dhillon: To send a message to Sanjay, obviously. To show him they aren't playing games.",
          "Singh: Okay, thank you, Mr. Dhillon. Since it's late, my forensic team needs to scan your main gate for fingerprints using UV lamps. Can you wait in the bungalow for a couple of hours while we finish up?",
          "Dhillon: Fine, but please ask your boys to keep it quiet. I don't want the neighborhood gossiping.",
        ],
      }),
      position: { x: 190, y: 140 },
      size: { width: 220, height: 280 },
      rotation: 0,
      unlockOnObjectiveId: "obj_01",
      packIn: ["evidence"],
    },
    {
      id: "photo_jatin_nair_profile",
      type: "photo",
      title: "Photo: Jatin Nair",
      content: JSON.stringify({
        title: "Jatin Nair",
        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.jatin_nair_profile,
      position: { x: 131, y: -3 },
      size: { width: 140, height: 160 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "photo_nandini_mittal_profile",
      type: "photo",
      title: "Photo: Nandini Mittal",
      content: JSON.stringify({
        title: "Nandini Mittal",
        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.nandini_mittal_profile,
      position: { x: 30, y: -15 },
      size: { width: 140, height: 160 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "photo_garima_gill_profile",
      type: "photo",
      title: "Photo: Garima Gill",
      content: JSON.stringify({
        title: "Garima Gill",
        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.garima_gill_profile,
      position: { x: 96, y: -29 },
      size: { width: 140, height: 160 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "photo_lakshya_luthra_profile",
      type: "photo",
      title: "Photo: Lakshya Luthra",
      content: JSON.stringify({
        title: "Lakshya Luthra",
        variant: "polaroid",
      }),
      imageUrl: PREDEFINED_IMAGES.lakshya_luthra_profile,
      position: { x: 92, y: 100 },
      size: { width: 140, height: 160 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "poi_nandini_mittal",
      type: "person-of-interest-report",
      title: "Person of Interest: Nandini Mittal",
      content: JSON.stringify({
        id: "POI-NM-31",
        referenceId: "POI-NM-31",
        firstName: "Nandini",
        middleName: "",
        lastName: "Mittal",
        alias: "Nandu",
        address: "Flat 8B, Seabreeze Residency, Worli",
        city: "Mumbai",
        state: "MH",
        zipCode: "400018",
        phone: "+91-98201-44091",
        dob: "14/09/1986",
        age: "28",
        sex: "F",
        race: "SA",
        height: "165 cm",
        weight: "58 kg",
        hair: "Black",
        eyes: "Brown",
        scars: "None visible",
        occupation: "High-stakes Gambler / Investor",
        employer: "Independent",
        arrests: "None",
        vehicles: [
          {
            year: "2013",
            make: "Honda",
            model: "City",
            color: "Pearl White",
            plate: "MH-01-DL-7712",
          },
        ],
        statement:
          "I am Nandini Mittal, and yes, I lost serious money the night Chetan cheated us at Aaina Mahal. I was furious and humiliated, and I said things in anger that I regret. But on 31 March, during the time he was killed, I was in a marriage counselling session with my husband. I stayed there through the full session window and did not step out to meet Chetan or anyone connected to him.",
        conclusion:
          "Strong grievance-based motive, but current alibi supported by counsellor logbook and spouse testimony. Maintain as person of interest pending independent verification of session records.",
        narrativeDate: "04/02/2015",
        narrativeTime: "10:15",
        caseNumber: "456-MK-90",
        policeStation: "Crime Branch CID, Mumbai",
      }),
      position: { x: 31, y: 10 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["suspect", "evidence"],
    },
    {
      id: "poi_garima_gill",
      type: "person-of-interest-report",
      title: "Person of Interest: Garima Gill",
      content: JSON.stringify({
        id: "POI-GG-32",
        referenceId: "POI-GG-32",
        firstName: "Garima",
        middleName: "",
        lastName: "Gill",
        alias: "Mrs. Gill",
        address: "22 Shanti Vihar, Andheri West",
        city: "Mumbai",
        state: "MH",
        zipCode: "400053",
        phone: "+91-98190-55610",
        dob: "03/11/1964",
        age: "50",
        sex: "F",
        race: "SA",
        height: "160 cm",
        weight: "63 kg",
        hair: "Dark Brown",
        eyes: "Brown",
        scars: "None visible",
        occupation: "Homemaker",
        employer: "N/A",
        arrests: "None",
        vehicles: [
          {
            year: "2010",
            make: "Maruti",
            model: "Swift",
            color: "Silver",
            plate: "MH-02-BR-1094",
          },
        ],
        statement:
          "I am Garima Gill, Jackie Gill's mother, and I have never hidden my anger toward Chetan for what happened to my daughter. I have shouted, cried, and cursed his name more times than I can count. But on the night he was murdered, I was at home with my husband the entire time. We did not leave the building. I wanted justice through the law, not blood in the street.",
        conclusion:
          "High emotional motive, but presently supported domestic alibi via spouse witness. Keep under observation for any contradictory movement evidence.",
        narrativeDate: "04/02/2015",
        narrativeTime: "10:32",
        caseNumber: "456-MK-90",
        policeStation: "Crime Branch CID, Mumbai",
      }),
      position: { x: 75, y: -30 },
      size: { width: 220, height: 280 },
      rotation: 1,
      packIn: ["suspect", "evidence"],
    },
    {
      id: "poi_jatin_nair",
      type: "person-of-interest-report",
      title: "Person of Interest: Jatin Nair",
      content: JSON.stringify({
        id: "POI-JN-33",
        referenceId: "POI-JN-33",
        firstName: "Jatin",
        middleName: "",
        lastName: "Nair",
        alias: "Jat",
        address: "Room 17, Prerna Chawl, Dadar East",
        city: "Mumbai",
        state: "MH",
        zipCode: "400014",
        phone: "+91-98200-32841",
        dob: "21/07/1989",
        age: "25",
        sex: "M",
        race: "SA",
        height: "173 cm",
        weight: "69 kg",
        hair: "Black",
        eyes: "Brown",
        scars: "Old burn mark on right forearm",
        occupation: "Former Casino Handler / Croupier",
        employer: "Aaina Mahal (terminated 25/03/2015)",
        arrests: "None",
        vehicles: [
          {
            year: "2012",
            make: "Bajaj",
            model: "Pulsar 150",
            color: "Black",
            plate: "MH-01-CT-5528",
          },
        ],
        statement:
          "I am Jatin Nair. Getting fired after the cheating scandal broke me, and yes, I was angry enough to talk big and reckless. But on 31 March, I went to Aaina Mahal to disappear into the crowd, drink, and watch Lakshya's show. Komal helped me get in quietly. I stayed inside the venue during the critical period and did not meet Chetan or leave to confront him.",
        conclusion:
          "Revenge motive remains plausible, but alibi supported by witness Komal Mohatta and event attendance context. Requires final corroboration through venue surveillance timestamps.",
        narrativeDate: "04/02/2015",
        narrativeTime: "10:48",
        caseNumber: "456-MK-90",
        policeStation: "Crime Branch CID, Mumbai",
      }),
      position: { x: 110, y: 5 },
      size: { width: 220, height: 280 },
      rotation: -2,
      packIn: ["suspect", "evidence"],
    },
    {
      id: "poi_lakshya_luthra",
      type: "person-of-interest-report",
      title: "Person of Interest: Lakshya Luthra",
      content: JSON.stringify({
        id: "POI-LL-34",
        referenceId: "POI-LL-34",
        firstName: "Lakshya",
        middleName: "",
        lastName: "Luthra",
        alias: "Lucky",
        address: "Penthouse 3, Skyline Crest, Bandra",
        city: "Mumbai",
        state: "MH",
        zipCode: "400050",
        phone: "+91-98920-77110",
        dob: "12/02/1982",
        age: "33",
        sex: "M",
        race: "SA",
        height: "178 cm",
        weight: "74 kg",
        hair: "Dark Brown",
        eyes: "Hazel",
        scars: "Small scar above left eyebrow",
        occupation: "Singer / Live Performer",
        employer: "Independent Artist",
        arrests: "Prior conviction in Jackie Gill crash case",
        vehicles: [
          {
            year: "2014",
            make: "BMW",
            model: "5 Series",
            color: "Midnight Blue",
            plate: "MH-01-LX-9001",
          },
        ],
        statement:
          "Lakshya Luthra has a known prior link to Chetan Yadav through the historical Jackie Gill case. Potential friction and reputation risk justified inclusion as person of interest. On 31 March 2015, multiple attendees and venue staff place him on stage at the club during the murder window, performing a song set followed by stand-up comedy, limiting opportunity to commit the homicide.",
        conclusion:
          "Currently low probability as direct shooter due to strong crowd-based alibi and continuous public visibility at performance venue.",
        narrativeDate: "04/02/2015",
        narrativeTime: "11:04",
        caseNumber: "456-MK-90",
        policeStation: "Crime Branch CID, Mumbai",
      }),
      position: { x: 80, y: 125 },
      size: { width: 220, height: 280 },
      rotation: 2,
      packIn: ["suspect", "evidence"],
    },
    {
      id: "formal_alibi_jatin_nair_komal",
      type: "formal-alibi",
      title: "Witness Statement: Komal Mohatta",
      content: JSON.stringify({
        department: "Crime Branch CID, Mumbai - Witness Intake Desk",
        witnessName: "Komal Mohatta",
        incidentNumber: "MK-WS-2015-031",
        date: "April 1, 2015",
        address: "Aaina Mahal Casino Complex, Goa Coast",
        dob: "11/05/1991",
        phone: "+91-98924-11762",
        statementBody:
          "My name is Komal Mohatta. I was the usher on duty in the Aaina Mahal 'Sheesh Mahal' Auditorium on the evening of Tuesday, 31 March. My job mostly involves checking tickets and ensuring that people do not sneak in and out during the performances. Well, paying customers I mean.\n\n" +
          "The employees at the Aaina Mahal like to look after each other, and on our nights off, we often let off-duty staff slip in and out of the shows before we head out to the Zanzibar Club nearby. It's been like a ritual for us for years—we start here and end up at Zanzibar, it's all good fun.\n\n" +
          "That evening, I let through three colleagues and a good friend of mine, Jatin Nair, who worked as a croupier here up until he was fired last week. He sneaked in to watch Lakshya Luthra's stand-up comedy and singing set, which started at 7:30 PM. However, Jatin only stayed for about an hour before slipping out. The other three colleagues stayed until the very end of the performance.\n\n" +
          "Anyway, the show finished at 11:00 PM and the audience cleared out. Nobody else had snuck in or out of the auditorium during that entire time.",
        pageNumber: "1",
      }),
      position: { x: 130, y: 60 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "formal_alibi_garima_gill_watchman",
      type: "formal-alibi",
      title: "Witness Statement: Society Security",
      content: JSON.stringify({
        department: "Crime Branch CID, Mumbai - Witness Intake Desk",
        witnessName: "Mahadev Shinde (Night Security)",
        incidentNumber: "MK-WS-2015-032",
        date: "April 1, 2015",
        address: "Shanti Vihar Apartments, Andheri West, Mumbai",
        dob: "09/08/1972",
        phone: "+91-98703-66145",
        statementBody:
          "My name is Mahadev Shinde, and I was on night security duty at Shanti Vihar on 31 March. Mrs. Garima Gill and her husband were inside the building compound that evening. While I did not see either of them pass my main gate post during the relevant hour, I feel it is critical to report some highly unusual and concerning behavior from Mrs. Gill over the last few days.\n\n" +
          "Ever since the news broke that the man who killed her daughter 20 years ago was released from prison, her mental state has been extremely fragile. A few days ago, a middle-aged man matching Chetan Yadav's description was hanging around our main gate, asking if Mrs. Gill lived here. He told me he was looking to 'make amends and seek forgiveness' for the past. I turned him away, but Mrs. Gill must have seen him from her balcony, and it completely shattered her composure.\n\n" +
          "On the night of March 31, during my 10:00 PM rounds, I saw Mrs. Gill pacing the lobby in an absolute rage. She was holding a copy of her recently published book—the one about fruits and geese that Doubleback published a few months ago, which she wrote to cope with her grief—and she was literally tearing the pages apart. I overheard her shouting to her husband: 'That monster is allowed to pick up his life where he left it in '94! My Jackie won't be able to do the same thing, so why should he be able to?' Given her volatile state of mind and her recent talk of taking justice into her own hands, I am deeply concerned about what she might have been driven to do.",
        pageNumber: "1",
      }),
      position: { x: 74, y: -70 },
      size: { width: 220, height: 280 },
      rotation: 2,
      packIn: ["evidence"],
    },
    {
      id: "formal_alibi_nandini_mittal_counseling",
      type: "formal-alibi",
      title: "Witness Statement: Marriage Counselor",
      content: JSON.stringify({
        department: "Crime Branch CID, Mumbai - Witness Intake Desk",
        witnessName: "Dr. Rhea Sanyal (Marriage Counselor)",
        incidentNumber: "MK-WS-2015-033",
        date: "April 1, 2015",
        address: "Sanyal Relationship Clinic, Pali Hill, Bandra, Mumbai",
        dob: "22/02/1978",
        phone: "+91-98111-44220",
        statementBody:
          "I am Dr. Rhea Sanyal, a licensed marriage counselor. On the evening of Tuesday, 31 March, 2015, I conducted an emergency joint counseling session for Mrs. Nandini Mittal and her husband, Aditya. They arrived at my clinic at 9:30 PM, remained present throughout the active session, and exited together at approximately 10:45 PM.\n\n" +
          "While this session places Mrs. Mittal in my office during the critical window of the homicide (10:10 PM to 10:40 PM), I believe it is important to disclose the highly tense nature of our discussion. The couple came to me due to Mrs. Mittal's severe gambling debts, which peaked earlier that week when she lost a staggering ₹42,09,300 (over 42 Lakhs) at the Aaina Mahal casino. Her husband expressed deep concern, stating he could no longer trust her with their finances.\n\n" +
          "Mrs. Mittal, however, was highly defensive. She vehemently insisted she was an excellent gambler and claimed her loss was entirely due to another player at her table—whom we now know to be Chetan Yadav—cheating the game. Most concerningly, Mrs. Mittal harbored an alarming amount of vicious hostility toward this individual, repeatedly stating that he 'deserved to be punished' for ruining her family's life. While they agreed to put future casino visits on hold and seek addiction treatment, her intense anger toward the victim was deeply unsettling.",
        pageNumber: "1",
      }),
      position: { x: 10, y: 10 },
      size: { width: 220, height: 280 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "criminal_profile_naina_punj",
      type: "criminal-profile",
      title: "Criminal Profile: Naina 'Ketu' Punj",
      content: JSON.stringify({
        profileId: "CP-CID-015",
        name: "Naina Punj",
        alias: "Ketu",
        dob: "29/02/1990", // Kept the original prop's leap year birthdate
        height: "157 cm", // Adjusted to typical average height
        weight: "50.35 kg",
        hair: "Dark Brown",
        eyes: "Brown",
        imageUrl: PREDEFINED_IMAGES.nikki_punj_profile,
        signedBy: "Insp. R. Malhotra",
        jurisdiction: "Crime Branch CID, Mumbai",
        caseRef: "FIR No. 112/CB-2015",
        preparedDate: "04/03/2015",
        reviewedDate: "04/04/2015",
        preparedBy: "Sub-Inspector A. Rao",
        preparedBadge: "MS-CID-781",
        approvedBy: "Insp. R. Malhotra",
        approvedBadge: "MS-CID-104",
        lastConfirmedSighting: "Aaina Mahal Casino, Goa, 03/31/2015 22:31",
        linkedEvidenceIds: "CCTV-14, AUD-09, LOG-22",
        objectiveLink: "obj_02",
        bio: "Naina 'Ketu' Punj is assessed as the tactical executor and cleanup lead for the Punj syndicate. Operating as the 'tail' (Ketu) of the duo, she specializes in direct asset liquidation and shielding leadership from exposure. Along with her twin brother Nakul ('Rahu'), she was groomed by the late North Indian cartel patriarch Eshwar 'Grand' Gill before his suspicious death in a boating accident on Lake Pichola in 2013. CCTV footage places her at the VIP lounge of the Aaina Mahal offshore casino in Goa when Chetan Yadav was caught cheating on March 25, 2015. Intercepted cellular captures later trace her coordinating operations from the Valley Road safehouse in South Mumbai during the exact homicide window. Her profile suggests she directly authorized or brokered the silenced .32 caliber execution to permanently eliminate Yadav as a security liability.",
      }),
      position: { x: 160, y: 100 },
      size: { width: 220, height: 280 },
      rotation: 1,
      unlockOnObjectiveId: "obj_01",
      packIn: ["suspect", "evidence"],
    },
    {
      id: "criminal_profile_nakul_punj",
      type: "criminal-profile",
      title: "Criminal Profile: Nakul 'Rahu' Punj",
      content: JSON.stringify({
        profileId: "CP-CID-016",
        name: "Nakul Punj",
        alias: "Rahu",
        dob: "29/02/1990",
        height: "170 cm",
        weight: "54.43 kg",
        hair: "Black",
        eyes: "Brown",
        imageUrl: PREDEFINED_IMAGES.nakul_punj_profile,
        signedBy: "Insp. R. Malhotra",
        jurisdiction: "Crime Branch CID, Mumbai",
        caseRef: "FIR No. 112/CB-2015",
        preparedDate: "04/03/2015",
        reviewedDate: "04/04/2015",
        preparedBy: "Sub-Inspector A. Rao",
        preparedBadge: "MS-CID-781",
        approvedBy: "Insp. R. Malhotra",
        approvedBadge: "MS-CID-104",
        lastConfirmedSighting:
          "Valley Road Safehouse, Mumbai, 03/31/2015 23:02",
        linkedEvidenceIds: "CCTV-11, WAV-07, BNR-19",
        objectiveLink: "obj_02",
        bio: "Nakul 'Rahu' Punj is profiled as the calculating mastermind and frontline strategist of the Punj cartel. Positioned as the 'head' (Rahu) of the twin alliance, he manages high-society political connections, offshore accounts, and the post-Gill syndicate transition. Although officially logged as having fled Mumbai's jurisdiction for Dubai in 2014, multi-source intelligence placed him back in Goa at the Aaina Mahal casino complex one week before the homicide. Audio surveillance captured him at the Valley Road safehouse on March 31, 2015, during the probable kill window. Intercepted communications reveal his cold insulation strategy ('we have street assets to handle the trash'), keeping his own hands clean. Current analytical assessment points to Rahu as the architect who planned Chetan Yadav's execution to send a ruthless deterrence message to rival syndicates.",
      }),
      position: { x: 161, y: 145 },
      size: { width: 220, height: 280 },
      rotation: 0,
      unlockOnObjectiveId: "obj_01",
      packIn: ["suspect", "evidence"],
    },
    {
      id: "criminal_profile_farhan_haider",
      type: "criminal-profile",
      title: "Criminal Profile: Farhan Haider",
      content: JSON.stringify({
        profileId: "CP-CID-015",
        name: "Farhan Haider",
        alias: "Bhoora",
        dob: "05/01/1987",
        height: "188 cm",
        weight: "89.81 kg",
        hair: "Dark Brown",
        eyes: "Brown",
        imageUrl: PREDEFINED_IMAGES.farhan_haider_profile,
        signedBy: "Insp. R. Malhotra",
        jurisdiction: "Crime Branch CID, Mumbai",
        caseRef: "FIR No. 112/CB-2015",
        preparedDate: "04/03/2015",
        reviewedDate: "04/04/2015",
        preparedBy: "Sub-Inspector A. Rao",
        preparedBadge: "MS-CID-781",
        approvedBy: "Insp. R. Malhotra",
        approvedBadge: "MS-CID-104",
        lastConfirmedSighting: "Fled Mumbai Jurisdiction, 06/04/2010",
        linkedEvidenceIds: "FIR-01, BNR-14, BNR-15",
        objectiveLink: "obj_01",
        bio: "Farhan Haider is believed to have been an integral part of his father Tajdar Haider’s (Tony Hadorag) criminal empire since his youth, fully committing to the family business after dropping out of secondary school. While he holds the rank of second-in-command, intelligence reports suggest he possesses next-to-no actual control over the syndicate’s strategic decisions, remaining completely subordinate to Tajdar’s commands. Farhan serves as the primary enforcer, tasked with punishing insubordination and executing the gang’s most violent reprisals, blackmail, and coercion schemes. Although he fled the Mumbai jurisdiction on April 6, 2010, he remains a 'successor-in-waiting,' prepared to assume the mantle of Don when the time comes. His signature 'misdirection' tactics have allowed him to remain a ghost to authorities for over a decade, hiding where the law never thinks to look.",
      }),
      position: { x: 161, y: 51 },
      size: { width: 220, height: 280 },
      rotation: 0,
      unlockOnObjectiveId: "obj_01",
      packIn: ["suspect", "evidence"],
    },
    {
      id: "news_mumbai_chronicle_2015_03_25",
      type: "newspaper",
      title: "The Mumbai Chronicle: City is Safe",
      content: JSON.stringify({
        publication: "The Mumbai Chronicle",
        headline: '"CITY IS SAFE" — POLICE COMMISSIONER',
        subheadline:
          "Commissioner Sunil Gaikwad dismisses rumors of an escalating gang war between the Haider Cartel and the Punj Syndicate following the death of Don Tariq Haider.",
        dateline: "MUMBAI",
        date: "Wednesday, March 25, 2015",
        author: "Javed Latif",
        authorRole: "Senior Metro Editor",
        hasPhoto: false,
        imageCaption: "",
        body: `Sunil Gaikwad, Commissioner of the Mumbai Police, has stated that his department will step up efforts to maintain law and order in the city if violence between organized crime groups escalates. 

Speaking in an exclusive interview with Radio City host Kabir Sen yesterday, Gaikwad said that local authorities are working in close coordination with central intelligence agencies to stamp out organized crime in the metro area. When asked by Sen to respond to reports that the deep-seated rivalry between the Haider Cartel and the Punj Syndicate was intensifying on the streets, Gaikwad said: "The Haider family and the Punjes have been the two largest crime syndicates operating in this city for quite some time now. They have always been pitted against one another, and I don't think that is ever going to change. Of course, our priority is to keep the public safe and ensure criminals are brought to book. If crime levels rise, our counter-efforts will rise to meet them."

Underworld tensions have been incredibly high in Mumbai since the death of notorious mafia don Tariq Haider, head of the Haider syndicate, three weeks ago. Uncertainties remain within police intelligence circles about the strategy his successor will take in running the cartel, and how much it might affect the former territorial status quo. However, Gaikwad denied being concerned: "Sure, we were familiar with the way Tariq used to operate, but we will adapt to and learn the new don's operating style."

Gaikwad went on to vehemently deny the allegations that the Mumbai Police were intentionally doing nothing to prevent skirmishes between the Punjes and the Haiders in a bid to let the two rivals destroy each other. "We are not going to sit back and let a violent war of attrition break out on our streets. We are stepping up active patrols to keep things under control. We are doing everything in our power to ensure that violence levels do not increase." He concluded the interview by reassuring citizens: "I want to make it totally clear right here and now that there is absolutely no cause for the public to be concerned. The city is safe, and it shall remain safe."`,
      }),
      position: { x: 30, y: 140 },
      size: { width: 380, height: 300 },
      rotation: -1,
      unlockOnObjectiveId: "obj_01",
      packIn: ["evidence"],
    },
    {
      id: "email_singhania_corporate_jet",
      type: "electronic-messages",
      title: "Email: S. Singhania to Aviation Manager",
      content: JSON.stringify({
        type: "EMAIL",
        platformName: "Singhania Webmail Portal [RECOVERED]",
        caseRef: "456-MK-90",
        subject: "RE: Corporate jet list update",
        from: "Sanjay Singhania <s.singhania@singhania-ent.com>",
        to: "Harish Bakshi <h.bakshi@aviation-charters.com>",
        printDate: "March 01, 2015",
        messages: [
          {
            sender: "Sanjay Singhania",
            time: "March 01, 2015, 13:26",
            body: "Harish,\n\nFollowing my divorce, I would like to update the list of people entitled to use the corporate jet (registration N6964N).\n\nThe complete list is as follows:\n* Company President\n* Senior Vice-President\n* (And the pilots & steward)\n\nIf anyone not on the list wishes to use the corporate jet, they must first ask for and receive permission from the Company President. I'd like to take this opportunity to say that I will never give permission for anyone else to use the jet unless they are on the list.\n\nYours,\nSanjay Singhania\nCompany President\nSinghania Enterprises",
          },
        ],
      }),
      position: { x: 200, y: 42 },
      size: { width: 320, height: 280 },
      rotation: -2,
      unlockOnObjectiveId: "obj_01",
      packIn: ["evidence"],
    },
    {
      id: "note_singhania_webmail_clue",
      type: "note",
      title: "Detective Note: Singhania's Webmail",
      content:
        "As a key suspect in this case, we asked Singhania for access to his webmail and this was the only thing of recent interest. — MMP Crime Branch",
      position: { x: 217, y: 67 },
      size: { width: 100, height: 100 },
      rotation: 2,
      unlockOnObjectiveId: "obj_01",
      packIn: ["clues"],
    },
    {
      id: "ticket_sanjay_singhania_flight",
      type: "boarding-pass",
      title: "Flight Record: Corporate Jet Manifest (Sanjay Singhania)",
      content: JSON.stringify({
        type: "private-jet",
        passengerName: "Sanjay Singhania",
        passengerId: "EMP-0001",
        flightNumber: "N6964N",
        tailNumber: "N6964N",
        departure: "Mumbai (BOM)",
        arrival: "New York (JFK)",
        departTime: "9:30 PM",
        arriveTime: "7:10 AM",
        seat: "(VIP)",
        class: "Private",
        ticketNumber: "DGCA-FORM-7233",
      }),
      position: { x: 220, y: 80 },
      size: { width: 200, height: 100 },
      rotation: 1,
      packIn: ["evidence"],
      unlockOnObjectiveId: "obj_01",
    },
    {
      id: "spec_soundwave_7014",
      type: "spectrography-report",
      title: "Acoustic Spectrography: 7014 Gandhidham",
      content: JSON.stringify({
        instrument: "Parabolic Microphone Array (Rec-009)",
        sampleId: "456-MK-90",
        analyzedAt: "2015-04-03T10:00:00Z",
        operator: "Inspector Jayesh Ishwar",
        summary:
          "As part of our investigation, we deployed a parabolic mic array directed at 7014 Gandhidham Ring Road. We isolated an active conversation on the night of March 31. Voiceprint analysis confirms the speakers match cartel leadership. The complete flatline intervals indicate periods when the building was entirely empty.",
        peaks: [
          { mz: 21.1, intensity: 0 },
          { mz: 21.15, intensity: 0 },
          { mz: 21.2, intensity: 0 },
          { mz: 21.25, intensity: 0 },
          { mz: 22.1, intensity: 15 },
          { mz: 22.15, intensity: 35 },
          { mz: 22.2, intensity: 50 },
          { mz: 22.25, intensity: 45 },
          { mz: 22.3, intensity: 85 }, // Climax/Struggle window
          { mz: 22.35, intensity: 65 },
          { mz: 22.4, intensity: 2 }, // Flatline begins (Silence)
          { mz: 22.45, intensity: 2 },
          { mz: 22.5, intensity: 2 },
          { mz: 22.55, intensity: 2 },
          { mz: 23.0, intensity: 28 }, // Brief closing door activity
          { mz: 23.05, intensity: 2 }, // Quiet
        ],
      }),
      position: { x: 260, y: 120 },
      size: { width: 150, height: 180 },
      rotation: 0,
      packIn: ["evidence"],
      unlockOnObjectiveId: "obj_01",
    },
    {
      id: "badge_kismet_casino",
      type: "objectives-cleared-badge",
      title: "Official Commendation: Kismet Casino",
      content: JSON.stringify({
        imageUrl: PREDEFINED_IMAGES.kismet_case_badge,
        caseId: "KC-2015-456",
        issueDate: new Date().toLocaleDateString(),
        officerSignature: "Deputy Commissioner Deshmukh",
        text: "This commendation is formally awarded for exceptional investigative work during the Kismet Casino case. Your efforts have uncovered the crucial links and ensured justice was served.",
      }),
      position: { x: 70, y: 40 },
      size: { width: 250, height: 250 },
      rotation: 0,
      packIn: ["bonus"],
    },
  ],
  connections: [
    {
      from: "briefing_kismet_casino",
      to: "poi_nandini_mittal",
    },
    {
      from: "briefing_kismet_casino",
      to: "briefing_kismet_casino_followup",
    },
    {
      from: "briefing_kismet_casino",
      to: "poi_garima_gill",
    },
    {
      from: "briefing_kismet_casino",
      to: "poi_jatin_nair",
    },
    {
      from: "briefing_kismet_casino",
      to: "poi_lakshya_luthra",
    },
    {
      from: "poi_jatin_nair",
      to: "doc_termination_jatin_nair_2",
    },
    {
      from: "poi_jatin_nair",
      to: "sms_jatin_nair_records",
    },
    {
      from: "poi_jatin_nair",
      to: "photo_jatin_nair_profile",
    },
    {
      from: "poi_garima_gill",
      to: "photo_garima_gill_profile",
    },
    {
      from: "poi_nandini_mittal",
      to: "photo_nandini_mittal_profile",
    },
    {
      from: "poi_lakshya_luthra",
      to: "photo_lakshya_luthra_profile",
    },
    {
      from: "poi_jatin_nair",
      to: "formal_alibi_jatin_nair_komal",
    },
    {
      from: "poi_garima_gill",
      to: "formal_alibi_garima_gill_watchman",
    },
    {
      from: "poi_nandini_mittal",
      to: "formal_alibi_nandini_mittal_counseling",
    },
    {
      from: "spec_soundwave_7014",
      to: "criminal_profile_nakul_punj",
    },
    {
      from: "spec_soundwave_7014",
      to: "criminal_profile_naina_punj",
    },
    {
      from: "spec_soundwave_7014",
      to: "briefing_kismet_casino_followup",
    },
    {
      from: "criminal_profile_farhan_haider",
      to: "news_mumbai_chronicle_2015_03_15",
    },
    {
      from: "news_mumbai_chronicle_2015_03_28_plant",
      to: "criminal_profile_naina_punj",
    },
    {
      from: "news_mumbai_chronicle_2015_03_28_plant",
      to: "criminal_profile_nakul_punj",
    },
    {
      from: "doc_interview_harpreet_dhillon",
      to: "criminal_profile_naina_punj",
    },
    {
      from: "doc_interview_harpreet_dhillon",
      to: "criminal_profile_nakul_punj",
    },
    {
      from: "briefing_kismet_casino_followup",
      to: "criminal_profile_farhan_haider",
    },
    {
      from: "briefing_kismet_casino_followup",
      to: "doc_interview_harpreet_dhillon",
    },
    {
      from: "briefing_kismet_casino_followup",
      to: "criminal_profile_naina_punj",
    },
    {
      from: "email_singhania_corporate_jet",
      to: "ticket_sanjay_singhania_flight",
    },
    {
      from: "email_singhania_corporate_jet",
      to: "note_singhania_webmail_clue",
    },
  ],
  objectives: [
    {
      id: "obj_01",
      description:
        "We need to narrow down our investigation. Prove which two suspects from our initial list can be 100% eliminated from the crime scene based on their verified physical locations in Mumbai during the time of death.",
      solution: "Nandini Mittal & Garima Gill",
    },
    {
      id: "obj_02",
      description:
        "How did Chetan Yadav manage to survive his long prison sentence completely unscathed?",
      solution:
        "The Haider gang protected Chetan Yadav and guaranteed his safety while inside.",
    },
    {
      id: "obj_03",
      description:
        "Who blackmailed Chetan Yadav, and what was their motive for doing so?",
      solution:
        "Nikki and Nakul Punj blackmailed Chetan Yadav to bug Singhania's office to get their money back. When the mission failed, they executed him.",
    },
  ],
  clues: [],
};

export default KISMET_CASINO_DATA;
