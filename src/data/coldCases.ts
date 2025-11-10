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
  evidence?: Record<string, unknown> | Evidence[];
  /** Whether the case can currently be purchased */
  isPurchasable?: boolean;
  /** Whether a sample download is available */
  hasDownloadSample?: boolean;
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
        imageUrl: "/cold_cases/thumbnails/evidence_letter.png",
      },
      {
        title: "Blueprints",
        description: "Blueprints of the manor with hidden markings.",
        imageUrl: "/cold_cases/thumbnails/evidence_blueprint.png",
      },
    ],
    isPurchasable: false,
    hasDownloadSample: false,
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
        imageUrl: "/cold_cases/thumbnails/evidence_code.png",
      },
      {
        title: "Artifact Photo",
        description: "A blurry photo of the stolen artifact.",
        imageUrl: "/cold_cases/thumbnails/evidence_artifact.png",
      },
    ],
    isPurchasable: true,
    hasDownloadSample: true,
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
        imageUrl: "/cold_cases/thumbnails/evidence_memo.png",
      },
      {
        title: "Gossip Column",
        description: "A newspaper clipping with rumors.",
        imageUrl: "/cold_cases/thumbnails/evidence_gossip.png",
      },
    ],
    isPurchasable: true,
    hasDownloadSample: true,
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
        imageUrl: "/cold_cases/thumbnails/evidence_mural.png",
      },
      {
        title: "Timeline Chart",
        description: "A chart of overlapping timelines.",
        imageUrl: "/cold_cases/thumbnails/evidence_timeline.png",
      },
    ],
    isPurchasable: true,
    hasDownloadSample: true,
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
        imageUrl: "/cold_cases/thumbnails/evidence_sonar.png",
      },
      {
        title: "Lab Notes",
        description: "Encrypted lab notes from the station.",
        imageUrl: "/cold_cases/thumbnails/evidence_lab.png",
      },
    ],
    isPurchasable: true,
    hasDownloadSample: true,
  },
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
    evidence: {
      items: [
        {
          id: "audio_log_cass_1",
          type: "document",
          content:
            "Station log, Cass speaking. We're getting hit with some serious interference from this solar storm. The comms are full of static... whispers. It's unsettling. Jax says it's just 'crossed wires,' but it sounds... organic. Almost like voices. I've logged a formal request for a full diagnostic.",
          position: {
            x: 37.98,
            y: 105.17,
          },
          size: {
            width: 38.62,
            height: 45.42,
          },
          rotation: -13.06,
        },
        {
          id: "cctv_hydroponics",
          type: "photo",
          content:
            "Image shows Ren in the hydroponics bay, bathed in the eerie green glow of Myco-Veridia. A distorted, elongated face is visible in the reflection of the glass behind her.",
          position: {
            x: 86.84,
            y: 10.33,
          },
          size: {
            width: 43.19,
            height: 38.12,
          },
          rotation: 28.53,
        },
        {
          id: "medical_log_kai_1",
          type: "document",
          content:
            "Zane came to me again last night. Severe paranoia. Says he keeps seeing 'shadows' out of the corner of his eye. He's convinced the station is haunted. I've prescribed a sedative, but his vitals are erratic. I'm concerned about the cumulative stress on the crew. I've noticed a tremor in my own hands.",
          position: {
            x: 10.27,
            y: -11.97,
          },
          size: {
            width: 45.45,
            height: 34.09,
          },
          rotation: -27.16,
        },
        {
          id: "email_cass_corp",
          type: "document",
          content:
            "Subject: URGENT: Anomaly in Project Veridia. Body: Ren's research has taken an unauthorized turn. The fungal spores are exhibiting unexpected psychoactive properties. My preliminary analysis suggests she has been aware of this for some time. This is a direct violation of protocol. Requesting immediate intervention. The crew is not safe.",
          position: {
            x: 60.03,
            y: 75.31,
          },
          size: {
            width: 32.22,
            height: 26.69,
          },
          rotation: 18.23,
        },
        {
          id: "engineering_log_jax_1",
          type: "document",
          content:
            "Life support is on the fritz. The CO2 scrubbers are failing intermittently. Every time I think I've fixed it, the system glitches again. It's not a hardware issue. It's like something is rewriting the code as I work. And this damn headache won't go away.",
          position: {
            x: 28.69,
            y: 62.47,
          },
          size: {
            width: 26.69,
            height: 48.01,
          },
          rotation: -36.56,
        },
        {
          id: "blackbox_final_trans",
          type: "document",
          content:
            "Transcript: ELARA: (Shouting) 'The nav-system is gone! I'm flying blind!' ZANE: (Static, strained) '...not the storm... it's her...' CASS: (Panicked) 'Mayday, Mayday! Station Zero... there's a ghost in the machine! It's in the walls! It's—' (A loud, metallic screech, followed by silence)",
          position: {
            x: 104.99,
            y: 30.56,
          },
          size: {
            width: 49.33,
            height: 45.92,
          },
          rotation: 6.84,
        },
        {
          id: "alibi_jax",
          type: "formal-alibi",
          content:
            "STATEMENT OF JAXON 'JAX' RYDER: 'On October 31st, I was primarily in Engineering attempting to stabilize the failing life support systems. I had sporadic contact with other crew members but remained focused on my tasks throughout the critical period, isolated by the emergency.' ",
          position: {
            x: 5.17,
            y: 28.32,
          },
          size: {
            width: 29.87,
            height: 38.35,
          },
          rotation: -2.57,
        },
        {
          id: "alibi_ren",
          type: "formal-alibi",
          content:
            "STATEMENT OF DR. RENATA 'REN' KHAN: 'My focus was exclusively on the Myco-Veridia project in the Hydroponics Bay, monitoring environmental controls. I was experiencing severe disorientation and hallucinations, which kept me confined to my research area, believing the fungal properties were escalating unpredictably.'",
          position: {
            x: 75.38,
            y: 48.07,
          },
          size: {
            width: 25.12,
            height: 45.65,
          },
          rotation: 21.05,
        },
        {
          id: "alibi_cass",
          type: "formal-alibi",
          content:
            "STATEMENT OF CASSANDRA 'CASS' LIN: 'I was at the Communications console attempting to re-establish contact with HQ and send distress signals. The solar storm caused significant interference, and I was continuously troubleshooting the comms array. My last conscious memory is sending a frantic Mayday call.'",
          position: {
            x: 95.83,
            y: 101.99,
          },
          size: {
            width: 46.52,
            height: 42.66,
          },
          rotation: 33.72,
        },
        {
          id: "alibi_kai",
          type: "formal-alibi",
          content:
            "STATEMENT OF DR. KAIA 'KAI' EVANS: 'I was attending to the crew's medical needs, specifically administering sedatives and monitoring vitals due to widespread anxiety and sleep deprivation. I remained in the Medical Bay, preparing for potential emergencies and observing the crew's deteriorating mental state.'",
          position: {
            x: 48.27,
            y: -19.95,
          },
          size: {
            width: 26.61,
            height: 49.37,
          },
          rotation: -15.11,
        },
        {
          id: "alibi_elara",
          type: "formal-alibi",
          content:
            "STATEMENT OF ELARA VANCE: 'I was in the Cockpit, attempting to maintain navigational control of Station Zero amidst the solar storm. The systems were failing erratically, and I was solely focused on manual flight corrections and preparing the emergency escape pod for evacuation, following protocol.'",
          position: {
            x: 113.84,
            y: 66.82,
          },
          size: {
            width: 38.67,
            height: 29.57,
          },
          rotation: -18.89,
        },
        {
          id: "transcript_jax",
          type: "interrogation-transcript",
          content:
            "INTERVIEW DATE: November 15, XXXX. SUBJECT: Jaxon Ryder. 'Look, I just did my job. Things broke, I fixed them. Or I tried. This 'ghost in the machine' stuff? I don't know. But I did notice the system failures felt... deliberate. Not like a storm. More like someone *knew* what they were doing to break things. But who?'",
          position: {
            x: 17.52,
            y: 80.93,
          },
          size: {
            width: 36.31,
            height: 21.09,
          },
          rotation: -30.08,
        },
        {
          id: "transcript_ren",
          type: "interrogation-transcript",
          content:
            "INTERVIEW DATE: November 15, XXXX. SUBJECT: Renata Khan. 'Yes, I knew about the psychoactive properties. It was a side effect, a potential breakthrough! I wasn't trying to harm anyone! The solar storm must have amplified it, made it uncontrollable. Zane's words... 'it's her'... he must have been referring to me, thinking I'd caused it. But it wasn't me!'",
          position: {
            x: 46.03,
            y: 42.64,
          },
          size: {
            width: 24.38,
            height: 38.38,
          },
          rotation: 12.26,
        },
        {
          id: "transcript_cass",
          type: "interrogation-transcript",
          content:
            "INTERVIEW DATE: November 15, XXXX. SUBJECT: Cassandra Lin. 'My role was to observe. And what I observed was Ren's increasing secrecy and a distinct shift in the station's atmosphere. The email I tried to send... it wasn't an accusation, just a warning. I heard whispers, saw things... but the comms, they weren't just static. Someone was *manipulating* the frequencies.'",
          position: {
            x: 80.64,
            y: 87.82,
          },
          size: {
            width: 46.72,
            height: 39.54,
          },
          rotation: -0.67,
        },
        {
          id: "transcript_kai",
          type: "interrogation-transcript",
          content:
            "INTERVIEW DATE: November 15, XXXX. SUBJECT: Kaia Evans. 'The psychological toll was immense. Zane was particularly vulnerable. His past... it haunted him. He talked about Elara, how she watched him, judged him. He was terrified of being found out. I saw the fear in his eyes, but I never imagined it would come to this.'",
          position: {
            x: 64.91,
            y: -1.02,
          },
          size: {
            width: 39.81,
            height: 45.45,
          },
          rotation: 38.82,
        },
        {
          id: "transcript_elara",
          type: "interrogation-transcript",
          content:
            "INTERVIEW DATE: November 15, XXXX. SUBJECT: Elara Vance. 'Zane was a liability. Reckless. He shouldn't have been on this mission. But to suggest I orchestrated this catastrophe? Ludicrous! I was trying to save us all! The escape pod malfunctioned. It was the station, the storm, Ren's fungi... not me. Zane was delusional at the end, he didn't know what he was saying.'",
          position: {
            x: 105.77,
            y: 80.11,
          },
          size: {
            width: 40.83,
            height: 30.63,
          },
          rotation: 42.69,
        },
        {
          id: "autopsy_zane",
          type: "autopsy-report",
          content:
            "AUTOPSY REPORT: ZANE MILLER. DATE OF DEATH: 10.31.XXXX. CAUSE OF DEATH: Hypoxia, exacerbated by severe psychological distress. FINDINGS: No external trauma. Internal examination reveals severe oxygen deprivation. Traces of airborne neurotoxin (Myco-Veridia derivative) detected in lung tissue, indicating prolonged exposure. Brain scans show evidence of extreme stress and hallucinogenic effects. Time of death consistent with gradual systems failure, not instantaneous event. Body recovered from central habitation module. Suggests victim was attempting to reach escape pod or secure area before succumbing.",
          position: {
            x: 25.26,
            y: 12.39,
          },
          size: {
            width: 43.46,
            height: 48.33,
          },
          rotation: -44.52,
        },
        {
          id: "corp_directive_veridia",
          type: "document",
          content:
            "CLASSIFIED CORPORATE DIRECTIVE 734-ALPHA-OV: Project Veridia Oversight. Effective immediately, all research involving Myco-Veridia is subject to weekly review by corporate auditor (C. Lin). Any unauthorized deviations from stated research parameters, particularly concerning psychoactive properties, are grounds for immediate termination of project and personnel. Data integrity is paramount.",
          position: {
            x: 65.55,
            y: 109.13,
          },
          size: {
            width: 30.95,
            height: 38.99,
          },
          rotation: -7.77,
        },
        {
          id: "ren_lab_notes",
          type: "note",
          content:
            "Oct 28: Initial spore exposure to Type-C solar radiation. Oct 29: Subject 734-A (fungus) shows unexpected bioluminescence increase, along with faint, unusual frequency resonance. Oct 30: Lab mice exhibiting heightened sensory input, some auditory hallucinations. Remarkable! Must investigate potential therapeutic applications. Keep isolated from main vents for now.",
          position: {
            x: 68.32,
            y: 28.52,
          },
          size: {
            width: 35.84,
            height: 37.03,
          },
          rotation: 3.73,
        },
        {
          id: "newspaper_silence",
          type: "newspaper",
          content:
            '{"headline": "Station Zero Goes Silent: Crew of Six Feared Lost After Solar Storm", "date": "November 2, XXXX", "body": "Interstellar research outpost Station Zero has ceased all communications following a severe solar storm event. The six-person crew, including renowned botanist Dr. Renata Khan and veteran pilot Elara Vance, are presumed lost. Corporate officials state extreme radiation interference likely caused system failures, leading to the tragedy. Rescue efforts are deemed impossible due to the station\'s deep-space location and trajectory."}',
          position: {
            x: 92.56,
            y: -16.48,
          },
          size: {
            width: 42.66,
            height: 33.19,
          },
          rotation: 22.86,
        },
        {
          id: "newspaper_theory",
          type: "newspaper",
          content:
            '{"headline": "Station Zero Tragedy: Whispers of \'Mass Psychosis\' Amidst Final Logs", "date": "November 18, XXXX", "body": "Recent analysis of recovered, partial data logs from the ill-fated Station Zero suggests the crew may have suffered a mass psychotic episode in their final hours. Reports indicate shared hallucinations and extreme paranoia, possibly induced by radiation exposure. The \'ghost in the machine\' theory, once dismissed, is gaining traction as investigators grapple with the inexplicable events preceding the station\'s demise. The possibility of internal conflict is not ruled out."}',
          position: {
            x: -10.59,
            y: 102.57,
          },
          size: {
            width: 20.3,
            height: 45.47,
          },
          rotation: 42.15,
        },
      ],
      connections: [
        {
          from: "audio_log_cass_1",
          to: "engineering_log_jax_1",
        },
        {
          from: "cctv_hydroponics",
          to: "ren_lab_notes",
        },
        {
          from: "medical_log_kai_1",
          to: "autopsy_zane",
        },
        {
          from: "email_cass_corp",
          to: "transcript_ren",
        },
        {
          from: "blackbox_final_trans",
          to: "transcript_elara",
        },
        {
          from: "corp_directive_veridia",
          to: "email_cass_corp",
        },
        {
          from: "transcript_jax",
          to: "engineering_log_jax_1",
        },
        {
          from: "transcript_kai",
          to: "transcript_elara",
        },
        {
          from: "ren_lab_notes",
          to: "email_cass_corp",
        },
      ],
      objectives: [
        {
          id: "obj_01",
          description:
            "Determine the true cause of the 'haunting' on Station Zero.",
        },
        {
          id: "obj_02",
          description:
            "Identify the individual responsible for the crew's demise.",
        },
        {
          id: "obj_03",
          description:
            "Uncover the motive behind the sabotage of Station Zero.",
        },
        {
          id: "obj_04",
          description:
            "Reconstruct the timeline of events leading to the station's failure.",
        },
      ],
    },
    // Intentionally mark this one as not yet purchasable / downloadable
    isPurchasable: false,
    hasDownloadSample: false,
  },
];

export function getCaseBySlug(slug: string) {
  return coldCases.find((c) => c.slug === slug);
}
