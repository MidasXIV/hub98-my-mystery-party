// Station Zero board data with packaging flags for index generation

import { BoardItem, Connection, Objective } from "@/lib/boardTypes";

const PREDEFINED_IMAGES = {
  profile_cass: "/cold_case_data/station_zero/profile_cass.jpeg",
  profile_jax: "/cold_case_data/station_zero/profile_jax.jpeg",
  profile_kai: "/cold_case_data/station_zero/profile_kai.jpeg",
  profile_ren: "/cold_case_data/station_zero/profile_ren.jpeg",
  profile_elara: "/cold_case_data/station_zero/profile_elara.jpeg",
  profile_zane: "/cold_case_data/station_zero/profile_zane.jpeg",
  still_cockpit: "/cold_case_data/station_zero/still_cockpit.jpeg",
  still_irregular: "/cold_case_data/station_zero/still_irregular.png",
  still_system_fault: "/cold_case_data/station_zero/still_system_fault.jpeg",
  still_confrontation: "/cold_case_data/station_zero/still_confrontation.jpeg",
};

const STATION_ZERO_DATA: {
  items: Array<BoardItem>;
  connections: Array<Connection>;
  objectives: Array<Objective>;
} = {
  items: [
    {
      id: "briefing_case_734_alpha",
      type: "case-briefing",
      title: "Case Briefing: The Ghost of Station Zero",
      content: JSON.stringify({
        department: "AETHERNET INTERSTELLAR AUTHORITY",
        bureau: "Cold Case Division",
        date: "December 17, 2047",
        to: "Special Investigator",
        from: "Director Anaya Sharma",
        subject:
          "Re-Opened Investigation - Station Zero Incident (Case File 734-Alpha)",
        classification: "CLASSIFIED // EYES ONLY",
        body: `Investigator,

You are hereby assigned to re-open Case File 734-Alpha, codenamed 'The Ghost of Station Zero.' Five years ago, on October 31st, 2042, all contact was lost with the deep space research platform, Station Zero. The six-person crew was presumed lost.

The crew were specialists, but they were also outcasts—brilliant minds given a second chance. Their classified mission was to cultivate and study 'Myco-Veridia,' a xenobotanical fungus with unprecedented potential. Officially, it was a simple research assignment. Unofficially, it was a high-risk, high-reward gamble.

Their last transmission, received during a severe solar storm, was a nightmare. A panicked voice spoke of whispers in the static, of shadows in the corridors, of a 'ghost in the machine' before the signal flatlined into an endless silence. The official inquiry cited mass psychosis brought on by extreme radiation, leading to a cascade of fatal system failures. The case was closed.

We are reopening it because the official story is a lie.

An anonymous source has recovered the station's 'data ghost'—a corrupted server packet containing the fragmented personal logs and diaries of all six crew members. These are not official reports; they are their final, terrified thoughts.

Your objective is to live through their final days by analyzing these logs. The truth is buried under layers of paranoia, hallucination, and fear. Everyone is a victim, but the evidence suggests one of them was also a killer. Find the truth that was buried in the cold of space.

The dead of Station Zero have one last story to tell. It is your job to listen.

Good luck.`,
      }),
      position: { x: 70, y: 45 },
      size: { width: 220, height: 280 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "profile_cass",
      type: "photo",
      title: "photo of Cassandra 'Cass' Hale",
      content: JSON.stringify({ title: "Cassandra 'Cass' Hale", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_cass,
      position: { x: 30, y: 10 },
      size: { width: 360, height: 210 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_cassandra_hale",
      type: "document",
      content:
        "CREW PROFILE — CASSANDRA HALE\nROLE: Corporate Auditor / Compliance & Oversight\n\nBACKGROUND:\nCass Hale transferred to Internal Oversight after reporting financial misconduct by a former supervisor. The move was lateral, not promotional.\n\nPERSONAL NOTES:\nFormally distant. Socially isolated. Displays strong belief in institutional rules and accountability.\n\nBEHAVIORAL OBSERVATIONS:\nExtensive private logs tracking minor anomalies and personnel behavior. Drafted an unsent priority report to Corporate during the final days.\n\nINVESTIGATIVE NOTE:\nCass’s access to internal communications, logs, and reporting systems places her at the center of information flow. Her actions suggest both protective intent and potential motive for concealment.",
      position: { x: 25, y: 105 },
      size: { width: 48, height: 62 },
      rotation: -1,
      packIn: ["suspect"],
    },

    {
      id: "profile_kai",
      type: "photo",
      title: "photo of Kai Mercer",
      content: JSON.stringify({ title: "Kai Mercer", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_kai,
      position: { x: 55, y: 7 },
      size: { width: 360, height: 220 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_kai_mercer",
      type: "document",
      content:
        "CREW PROFILE — DR. KAI MERCER\nROLE: Medical Officer / Psychological Assessment\n\nBACKGROUND:\nDr. Kai Mercer specialized in long-duration isolation psychology. Station Zero was his first assignment with full medical authority.\n\nPERSONAL NOTES:\nConfident, articulate, and academically respected. Maintains professional detachment from crew outside scheduled evaluations.\n\nBEHAVIORAL OBSERVATIONS:\nDismissed early signs of cognitive and emotional decline among crew members as stress-related. Later logs show inconsistencies and self-reported tremors.\n\nINVESTIGATIVE NOTE:\nAs medical officer, Kai controlled sedatives, bio-monitor interpretations, and mental fitness clearances. Errors in judgment—or intent—could have catastrophic consequences.",
      position: { x: 75, y: 80 },
      size: { width: 48, height: 62 },
      rotation: 0,
      packIn: ["suspect"],
    },

    {
      id: "profile_jax",
      type: "photo",
      title: "photo of Jax Calder",
      content: JSON.stringify({ title: "Jax Calder", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_jax,
      position: { x: 80, y: 10 },
      size: { width: 360, height: 220 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_jax_calder",
      type: "document",
      content:
        "CREW PROFILE — JAX CALDER\nROLE: Station Engineer / Life Support & Infrastructure\n\nBACKGROUND:\nJax Calder previously served on multiple commercial orbital platforms. Known for crisis response and improvisational problem-solving.\n\nPERSONAL NOTES:\nAffable, cooperative, emotionally open. Frequently assists other crew members outside formal duty assignments.\n\nBEHAVIORAL OBSERVATIONS:\nResponsible for several undocumented system adjustments intended to improve efficiency. These changes were not cleared through official channels.\n\nINVESTIGATIVE NOTE:\nAs primary engineer, Jax had hands-on access to life support, power distribution, and atmospheric systems. Unauthorized modifications introduce both risk and opportunity.",
      position: { x: 80, y: 105 },
      size: { width: 48, height: 62 },
      rotation: 2,
      packIn: ["suspect"],
    },

    {
      id: "profile_ren",
      type: "photo",
      title: "photo of Ren Ilyanova",
      content: JSON.stringify({ title: "Ren Ilyanova", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_ren,
      position: { x: 40, y: 30 },
      size: { width: 360, height: 220 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_ren_ilyanova",
      type: "document",
      content:
        "CREW PROFILE — REN ILYANOVA\nROLE: Xenobotanist / Lead Myco-Veridia Researcher\n\nBACKGROUND:\nRen Ilyanova is a leading authority in extremophile biology. Her work has drawn both acclaim and criticism for its ethical ambiguity. Station Zero marked her first long-duration off-world assignment.\n\nPERSONAL NOTES:\nHighly intelligent, intensely private. Maintains encrypted research folders. Displays discomfort with oversight and auditing procedures.\n\nBEHAVIORAL OBSERVATIONS:\nReports of fatigue, irritability, and secrecy increased following experimental trials. Several data entries were intentionally omitted from official research logs.\n\nINVESTIGATIVE NOTE:\nRen’s work directly involved a classified biological organism. Any containment failure, accidental or deliberate, would likely originate within her lab domain.",
      position: { x: 40, y: 115 },
      size: { width: 48, height: 62 },
      rotation: -3,
      packIn: ["suspect"],
    },

    {
      id: "profile_elara",
      type: "photo",
      title: "photo of Elara Voss",
      content: JSON.stringify({ title: "Elara Voss", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_elara,
      position: { x: 105, y: 25 },
      size: { width: 360, height: 220 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_elara_voss",
      type: "document",
      content:
        "CREW PROFILE — ELARA VOSS\nROLE: Flight Systems Specialist / Mission Operations\n\nBACKGROUND:\nElara Voss was recruited following an exemplary career as a test pilot and systems analyst. She trained under Commander Althea Rostova, a decorated flight instructor whose fatal accident remains a subject of internal review. Elara later transitioned into operations and navigation systems, citing a desire for 'control over outcomes.'\n\nPERSONAL NOTES:\nDescribed by peers as precise, emotionally reserved, and intolerant of procedural deviation. Maintains meticulous logs. Limited social engagement aboard the station.\n\nBEHAVIORAL OBSERVATIONS:\nRepeated interpersonal conflicts logged with External Systems Technician Zane Moreno. Displays heightened vigilance regarding station safety and protocol.\n\nINVESTIGATIVE NOTE:\nElara’s access to core navigation, power routing, and command systems would allow for significant operational influence. Her rigid adherence to procedure may mask personal motivations.",
      position: { x: 105, y: 100 },
      size: { width: 48, height: 62 },
      rotation: -2,
      packIn: ["suspect"],
    },

    {
      id: "profile_zane",
      type: "photo",
      title: "photo of Zane Moreno",
      content: JSON.stringify({ title: "Zane Moreno", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.profile_zane,
      position: { x: 95, y: 40 },
      size: { width: 360, height: 220 },
      rotation: 0,
      packIn: ["suspect"],
    },
    {
      id: "doc_crew_profile_zane_moreno",
      type: "document",
      content:
        "CREW PROFILE — ZANE MORENO\nROLE: External Systems & Navigation Technician\n\nBACKGROUND:\nZane Moreno joined Station Zero after clearance from a past flight training incident investigation. Though officially absolved, records indicate the event resulted in a fatality and lasting professional stigma.\n\nPERSONAL NOTES:\nQuiet, withdrawn. Avoids extended social interaction. Known to work long hours alone during station night cycles.\n\nBEHAVIORAL OBSERVATIONS:\nMedical logs indicate recurring nightmares, anxiety, and reports of visual disturbances prior to the incident. Increased isolation noted during the final weeks.\n\nINVESTIGATIVE NOTE:\nZane’s technical access to external cameras, navigation sensors, and maintenance corridors positions him near multiple unexplained system anomalies. Psychological stressors raise concerns about judgment under pressure.",
      position: { x: 120, y: 90 },
      size: { width: 48, height: 62 },
      rotation: 1,
      packIn: ["suspect"],
    },

    // {
    //   id: "still_cockpit",
    //   type: "photo",
    //   title: "Still of Cockpit",
    //   content: "Cockpit",
    //   imageUrl: PREDEFINED_IMAGES.still_cockpit,
    //   position: { x: 80, y: 90 },
    //   size: { width: 360, height: 220 },
    //   rotation: 0,
    //   packIn: ["evidence"],
    // },
    // {
    //   id: "still_confrontation",
    //   type: "photo",
    //   title: "Still of Confrontation",
    //   content: "Confrontation",
    //   imageUrl: PREDEFINED_IMAGES.still_confrontation,
    //   position: { x: 100, y: 80 },
    //   size: { width: 360, height: 220 },
    //   rotation: 0,
    //   packIn: ["evidence"],
    // },
    // {
    //   id: "still_irregular",
    //   type: "photo",
    //   title: "Still of Irregular",
    //   content: "Irregular",
    //   imageUrl: PREDEFINED_IMAGES.still_irregular,
    //   position: { x: 50, y: 70 },
    //   size: { width: 360, height: 220 },
    //   rotation: 0,
    //   packIn: ["evidence"],
    // },
    // {
    //   id: "still_system_fault",
    //   type: "photo",
    //   title: "Still of System Failure",
    //   content: "System Failure",
    //   imageUrl: PREDEFINED_IMAGES.still_system_fault,
    //   position: { x: 120, y: 30 },
    //   size: { width: 360, height: 220 },
    //   rotation: 0,
    //   packIn: ["evidence"],
    // },
    {
      id: "log_station_zero_comms",
      type: "transmission-log",
      title: "STATION ZERO — COMMUNICATIONS & TRANSMISSION RECORD",
      content: JSON.stringify({
        location: "AEGISCORP SECURE SERVER",
        date: "OCT 01 - NOV 10, 2025",
        operator: "SYSTEM / MULTIPLE",
        caseRef: "SZ-COMMS-DOSSIER-FINAL",
        entries: [
          {
            time: "OCT 01",
            direction: "IN/OUT",
            number: "CORP OPS <-> CASS HALE",
            duration: "48s",
            notes:
              "CORP: Station Zero, confirm baseline operational status." +
              "\nCASS: Confirmed. All systems nominal. Crew stable. No reportable deviations." +
              "\nCORP: Acknowledged. Maintain standard observation cadence." +
              "\nCASS: Always.",
          },
          {
            time: "OCT 09",
            direction: "LOG",
            number: "CASS HALE (MEMO)",
            duration: "---",
            notes:
              "Minor unauthorized power deviation detected (Hydroponics Bay). Logged and under observation. No immediate safety risk.\n// PERSONAL ANNOTATION: The station hums differently near the bay. Probably nothing.",
          },
          {
            time: "OCT 18",
            direction: "IN/OUT",
            number: "CORP MED <-> CASS HALE",
            duration: "48s",
            notes:
              "CORP: Received weekly psych eval summary. Minor irritability noted. Isolation consistent." +
              "\nCASS: Affirmative. Monitoring continues." +
              "\nCORP: No action required unless symptoms escalate to delusion or panic behavior." +
              "\nCASS: Understood.",
          },
          {
            time: "OCT 26",
            direction: "BCAST",
            number: "CORP OPS -> ALL CREW",
            duration: "1m 02s",
            notes:
              "PRIORITY AUDIO: Forecast confirms long-duration solar storm. Suspend external activity immediately. Expect comms degradation. Log all anomalies as storm-related unless otherwise critical.",
          },
          {
            time: "OCT 30",
            direction: "LOG",
            number: "CASS HALE (AUDIO)",
            duration: "45s",
            notes:
              "FILE #1 TRANSCRIPT:\n“Station log, Cass speaking. We’re getting hit with some serious interference from this solar storm. The comms are full of static… whispers. It’s unsettling. Jax says it’s just ‘crossed wires,’ but it sounds… organic. Almost like voices. I’ve logged a formal request for a full diagnostic.”" +
              "\n// NOTE: Linguistic analysis of background audio inconclusive. Duplicate file flagged due to repeated playback artifacts.",
          },
          {
            time: "OCT 30",
            direction: "IN/OUT",
            number: "CORP OPS <-> CASS HALE",
            duration: "11m",
            notes:
              "RE: AUDIO SAMPLE." +
              "\nCORP: Interference consistent with solar storm effects." +
              "\nCASS: It sounds intentional." +
              "\nCORP: Clarify." +
              "\nCASS: The static repeats phrases. Old ones. Things said days ago." +
              "\nCORP: Stress response noted. Continue logging. No further action.",
          },
          {
            time: "OCT 31",
            direction: "LOG",
            number: "JAX (ENGINEERING)",
            duration: "---",
            notes:
              "FILE #5 FRAGMENT:\n" +
              "“Life support is on the fritz... It’s not a hardware issue. It’s like something is rewriting the code as I work... Swear to god the walls just… sighed.”",
          },
          {
            time: "OCT 31",
            direction: "INT.",
            number: "ZANE <-> CASS",
            duration: "31s",
            notes:
              "INTERNAL COMMS:\n" +
              "ZANE: Cass. It’s not random. The station’s responding.\n" +
              "CASS: Responding to what?\n" +
              "ZANE: To us. To her.\n" +
              "CASS: Zane, you need to rest.\n" +
              "ZANE: You hear it too. Don’t lie.\n" +
              "// NOTE: Call terminated by Cass.",
          },
          {
            time: "OCT 31",
            direction: "B-BOX",
            number: "COCKPIT RECORDER",
            duration: "18s",
            notes:
              "FINAL TRANSMISSION:\n" +
              "ELARA: “The nav-system is gone! I’m flying blind!”\n" +
              "ZANE: (static) “…not the storm… it’s her…”\n" +
              "CASS: (panicked) “Mayday, Mayday! Station Zero— there’s a ghost in the machine! It’s in the walls! It’s—”\n" +
              "// EVENT: Loud metallic screech. Signal loss.",
          },
          {
            time: "NOV 05",
            direction: "IN",
            number: "SAR LEAD -> CORP",
            duration: "1m 15s",
            notes:
              "SAR: Station is dark. Escape pod clamps fused. No signs of external breach..." +
              "\nCORP: Cause of death?\n" +
              "SAR: Atmospheric failure. But… the comms array was still warm when we boarded." +
              "\n// CORP: Log equipment behavior only.",
          },
          {
            time: "NOV 10",
            direction: "MEMO",
            number: "CORPORATE INTERNAL",
            duration: "---",
            notes:
              "FINAL DETERMINATION: Crew succumbed to cascading system failures exacerbated by solar storm and mass psychogenic response. Audio references to “voices” or “haunting” are attributed to stress-induced delusion. Case classified.",
          },
          {
            time: "UNDATED",
            direction: "---",
            number: "UNFILED NOTE",
            duration: "---",
            notes:
              "If it was only madness,\nwhy did the station keep talking after they were gone?",
          },
        ],
      }),
      position: { x: 30, y: 70 },
      size: { width: 380, height: 240 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "doc_email_cass_undelivered",
      type: "electronic-messages",
      title: "Encrypted Email - From CASS to Corporate HQ (Undelivered)",
      content: JSON.stringify({
        type: "EMAIL",
        platformName: "AegisCorp SecureMail Client v.11.2",
        caseRef: "SZ-DIG-EVID-001",
        subject: "URGENT: Anomaly in Project Veridia & Safety Protocol Breach",
        from: "Cass (Internal Oversight) <C.Oversight.SZ@AegisCorp.int>",
        to: "Aegis Corp Internal Affairs <IA.HQ@AegisCorp.secure>",
        printDate: "November 5, 2025",
        messages: [
          {
            sender: "Cass (Internal Oversight)",
            time: "October 28, 2025, 16:45 GMT",
            body: "To Whom It May Concern,\n\nPursuant to my duties as Internal Oversight Officer for Station Zero, I am filing this urgent report.\n\nRen's research on 'Project Veridia' has taken an unauthorized and hazardous turn. The fungal spores, subject of my ongoing investigation (Ref: Log 7B-11), are exhibiting unexpected and potent psychoactive properties. My preliminary analysis of her hidden data suggests she has been aware of this for approximately sixteen days and has deliberately concealed it from official station logs.\n\nThis constitutes a direct and severe violation of corporate research protocol and station safety mandates. Given the enclosed nature of the station's life support, any accidental release could be catastrophic.\n\nRequesting immediate intervention and guidance. The crew is not safe.\n\n[SENDING FAILED: NO UPLINK - QUEUED FOR NEXT TRANSMISSION WINDOW]",
          },
        ],
      }),
      position: {
        x: 85,
        y: 70,
      },
      size: {
        width: 320,
        height: 280,
      },
      rotation: 0,
      packIn: ["evidence"],
    },

    // --------------------------------------
    // !SECTION AUTOPSY REPORTS
    // --------------------------------------
    {
      id: "doc_autopsy_jax",
      type: "autopsy-report",
      title: "Autopsy Report: JAX CALDER",
      content: JSON.stringify({
        caseNumber: "SZ-CR-001",
        victimName: "Jax Calder",
        sex: "Male",
        age: "31",
        race: "Caucasian",
        weight: "84 kg",
        height: "185 cm",

        description:
          "Subject was discovered in the Engineering section, near the primary life support control panel. The body's posture suggests a state of frantic activity at the time of death. The panel itself is catastrophically damaged by what appears to be both a power surge and forced manual override.",

        externalInjuries:
          "Severe third-degree electrical burns are present on the subject's palms and forearms, consistent with attempting to manipulate a malfunctioning, high-voltage system. Fingernails are broken and torn, indicating a desperate struggle with the panel's fused casing.",

        internalInjuries:
          "Lungs show acute edema characteristic of rapid depressurization and hypoxia. TOXICOLOGY: A significant concentration of an unidentified psychoactive compound was found in the blood. Neurological markers suggest a state of extreme paranoia and disorganized thought, which would be inconsistent with the focused work required of an engineer in a crisis.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "11:30 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "AegisCorp Security Directorate",
      }),

      position: { x: 10, y: -15 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "doc_autopsy_ren",
      type: "autopsy-report",
      title: "Autopsy Report: REN ILYANOVA",
      content: JSON.stringify({
        caseNumber: "SZ-CR-002",
        victimName: "Ren Ilyanova",
        sex: "Female",
        age: "34",
        race: "East Asian",
        weight: "61 kg",
        height: "168 cm",

        description:
          "Subject was found in the Hydroponics Bay. The primary containment unit for a specimen labeled 'Myco-Veridia' was breached. The subject was found on the floor, facing the breached unit. Her expression is one of profound terror.",

        externalInjuries:
          "A faint, greenish-black residue was observed around the subject's nostrils and mouth. Skin shows signs of severe cyanosis (blue discoloration) due to oxygen deprivation.",

        internalInjuries:
          "Subject's respiratory tract, from trachea to lungs, shows extreme inflammation and is coated with the same foreign residue seen externally. Microscopic analysis confirms the presence of non-terrestrial fungal spores. TOXICOLOGY: Subject's bloodstream contains the highest concentration of the unidentified psychoactive compound among all crew members, by a significant margin.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "12:15 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "AegisCorp Security Directorate",
      }),

      position: { x: 15, y: 20 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "doc_autopsy_cass",
      type: "autopsy-report",
      title: "Autopsy Report: CASS ",
      content: JSON.stringify({
        caseNumber: "SZ-CR-003",
        victimName: "Cass Hale",
        sex: "Female",
        age: "29",
        race: "Caucasian",
        weight: "66 kg",
        height: "173 cm",

        description:
          "Subject was located at the main communications hub, collapsed beneath the console. Her hand was outstretched towards the emergency broadcast activation switch. The console logs were wiped by a massive power surge.",

        externalInjuries:
          "Deep excoriations (scratch marks) are present on the subject's own arms and neck, suggesting a state of extreme, self-injurious panic. No other signs of physical trauma.",

        internalInjuries:
          "Standard signs of death by asphyxiation. Adrenal glands were exceptionally taxed, and cortisol levels were the highest recorded. The physiological data indicates the subject was experiencing a state of absolute terror for a prolonged period before death.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "10:45 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "AegisCorp Security Directorate",
      }),

      position: { x: 0, y: 20 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "doc_autopsy_kai",
      type: "autopsy-report",
      title: "Autopsy Report: KAI",
      content: JSON.stringify({
        caseNumber: "SZ-CR-004",
        victimName: "Dr. Kai Mercer",
        sex: "Male",
        age: "45",
        race: "Hispanic",
        weight: "79 kg",
        height: "180 cm",

        description:
          "Subject was located in the Med-Bay, slumped against a medical supply locker. An empty auto-injector was found on the floor near his right hand.",

        externalInjuries:
          "A single, fresh puncture wound is visible on the subject's left quadriceps, consistent with the use of an auto-injector. Post-mortem muscle tissue analysis reveals cellular degradation consistent with a chronic nervous system disorder (tremor).",

        internalInjuries:
          "Evidence of death by asphyxiation is present. TOXICOLOGY: Subject's blood contains the unidentified psychoactive compound, as well as a massive dose of a standard-issue anxiolytic (anti-anxiety) agent. It is notable that the sedative appears to have had no mitigating effect on the neurotoxin's activity.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "13:00 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "AegisCorp Security Directorate",
      }),

      position: { x: 15, y: 50 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "doc_autopsy_zane",
      type: "autopsy-report",
      title: "Autopsy Report: ZANE",
      content: JSON.stringify({
        caseNumber: "SZ-CR-005",
        victimName: "Zane Moreno",
        sex: "Male",
        age: "36",
        race: "Afro-Caribbean",
        weight: "88 kg",
        height: "190 cm",

        description:
          "Subject was discovered in the main corridor between the Hub and the Cockpit access tunnel. His body was oriented towards the cockpit, with one arm outstretched in that direction. His position suggests he was crawling towards it when he expired.",

        externalInjuries:
          "Significant contusions on knees and elbows, consistent with crawling. A laceration on the forehead appears to be from a fall.",

        internalInjuries:
          "Standard signs of death by asphyxiation. TOXICOLOGY NOTE: Subject's blood contains the lowest concentration of the psychoactive compound. Therapeutic levels of a prescribed sedative (matching the one used by subject Kai) were also present. It is theorized the sedative may have offered some minor resistance to the neurotoxin's effects.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "10:50 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "AegisCorp Security Directorate",
      }),

      position: { x: 10, y: 60 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "doc_autopsy_elara",
      type: "autopsy-report",
      title: "Autopsy Report: ELARA",
      content: JSON.stringify({
        caseNumber: "SZ-CR-006",
        victimName: "Elara Voss",
        sex: "Female",
        age: "28",
        race: "Caucasian",
        weight: "63 kg",
        height: "175 cm",

        description:
          "Subject was discovered in the command chair of the station's cockpit. Unlike other crew members who showed signs of panic or struggle, the subject's posture was composed. The cockpit's internal logs were precisely wiped by a targeted power surge that originated from this console.",

        externalInjuries:
          "None. Subject shows no signs of struggle, panic, or self-injury.",

        internalInjuries:
          "Cause of death is consistent with asphyxiation. TOXICOLOGY: Subject has a high concentration of the psychoactive compound in her system, comparable to subjects Jax and Cass. CRITICAL NOTE: There is a profound and unexplained discrepancy between the subject's high neurotoxin levels and her complete lack of physiological panic markers. Her physical state suggests calm, deliberate action, not a hallucinatory psychosis.",

        causeOfDeath: "Asphyxiation due to environmental failure.",
        mannerOfDeath: "Undetermined",

        investigatingOfficer: "Dr. Aris Janicky, Corporate Medical Oversight",
        recordingOfficer: "S&R Team Lead K. Vance",
        date: "November 7, 2025",
        time: "14:00 GMT",
        coroner: "Dr. Aris Janicky",
        policeStation: "Police Department",
      }),

      position: { x: 25, y: 40 },
      size: { width: 210, height: 320 },
      rotation: 0,
      packIn: ["evidence"],
    },
    // --------------------------------------
    // DIARIES
    // --------------------------------------
    {
      id: "kai_diary",
      type: "diary",
      title: "KAI MERCER diary log",
      content: JSON.stringify({
        title: "KAI MERCER diary log",
        entriesPerPage: 4,
        diaryEntries: [
          {
            date: "October 1, 2025",
            entries: [
              "Baseline day. That’s what I wrote in the official log, because that’s what you’re supposed to write when nothing is screaming yet. Baseline implies stability, a flat line that means safety. But I’ve learned that flat lines are lies. Everything living vibrates, even in stillness.",
              "Jax came out of the maintenance crawlspace grinning, oil-streaked, alive in the way engineers are when machines obey them. Ren sang to her plants again — a low, absent melody like she was soothing a child. Zane hovered at the edges, quiet but present. Quiet isn’t broken. I keep reminding myself of that.",
              "I stood alone in med-bay afterward, listening to the hum of life-support systems pretending to be eternal. I closed my eyes and tried to remember the smell of rain on concrete. It’s been years. The station smells like antiseptic and metal and recycled breath. Earth smelled like forgiveness.",
            ],
          },
          {
            date: "October 2, 2025",
            entries: [
              "Routine checks. No anomalies. That should comfort me. It doesn’t.",
              "I paused in the corridor today because I thought someone was walking behind me. I could hear breathing, shallow and uneven. When I stopped, it stopped. When I breathed, it breathed. The brain mirrors under isolation — I know this clinically. Knowing doesn’t make the hairs on your arms lie down.",
              "I miss small human things. The weight of gravity pressing decisions into your bones. The way strangers cough in public spaces. Proof you aren’t alone.",
            ],
          },
          {
            date: "October 3, 2025",
            entries: [
              "Elara shut Zane down in briefing. Clean. Efficient. The way military tribunals speak when they’ve already chosen a narrative.",
              "Cass logged it as minor interpersonal friction. Cass believes documentation saves people. I envy that belief. I lost mine somewhere between the desert and the review board.",
              "The lights flickered when Elara spoke. Electrical coincidence. Still — my chest tightened like it used to when something was about to go wrong and no one wanted to hear it.",
            ],
          },
          {
            date: "October 4, 2025",
            entries: [
              "Med-bay calibration complete. All systems nominal.",
              "While alone, I heard a single heart monitor tone. Clean. Perfect. No patient attached. No error flagged. Just a reminder of a sound I’ve waited for too many times.",
              "I checked the wiring twice. Then a third time. Then I sat down because my hands were shaking and I didn’t want the station to see.",
            ],
          },
          {
            date: "October 5, 2025",
            entries: [
              "Zane finally spoke about the dreams. Rostova at the controls. Eyes empty. The moment before impact stretched so long it felt merciful. He wakes before the end. Always.",
              "I told him nightmares don’t equal instability. I believe that. I signed him fit for duty anyway. My pen felt heavier than it should have. It always does when I make decisions that echo.",
              "There are ghosts you meet again and again in different bodies. I’m tired of recognizing them.",
            ],
          },
          {
            date: "October 6, 2025",
            entries: [
              "Woke up thinking someone had called my name. Not shouted — whispered. Familiar.",
              "Auditory hallucinations occur under stress, especially isolation. Textbook. I wrote that textbook once. Still locked the door.",
              "I dreamed of my daughter’s hair wet from rain, sticking to her cheeks. I don’t remember the sound of her laugh anymore. That scares me more than the whisper.",
            ],
          },
          {
            date: "October 7, 2025",
            entries: [
              "Jax rerouted power for Ren. Unauthorized. Dangerous. Kind.",
              "I didn’t report it. I told myself compassion is part of medicine. The truth is I didn’t want to be the man who takes light away from someone who needs it.",
              "While writing, something thudded inside the wall behind me. A slow, deliberate knock. Three beats. Then silence.",
            ],
          },
          {
            date: "October 8, 2025",
            entries: [
              "Cass watches the logs like a priest watches scripture.",
              "While reviewing vitals, the monitor briefly labeled me as the patient. Heart rate elevated. Anxiety response. Accurate.",
              "I laughed when it corrected itself. The laugh sounded wrong in the empty room.",
            ],
          },
          {
            date: "October 9, 2025",
            entries: [
              "Power anomaly confirmed.",
              "Dreamt I was back in the desert clinic. Sand everywhere. A soldier asking me if he was okay and me saying yes because I wanted to believe it.",
              "Woke up tasting metal and guilt.",
            ],
          },
          {
            date: "October 10, 2025",
            entries: [
              "No incidents logged today.",
              "The station felt like it was holding its breath.",
              "I’ve learned silence isn’t peace. It’s anticipation.",
            ],
          },
          {
            date: "October 11, 2025",
            entries: [
              "Ren avoided eye contact. Her pupils were dilated. Hands cold. She asked if the brain can hear things the ears can’t.",
              "I laughed. I shouldn’t have. I’ve seen brains invent gods, demons, absolution.",
              "Sometimes science feels like prayer. Other times it feels like betrayal.",
            ],
          },
          {
            date: "October 12, 2025",
            entries: [
              "Comms interference during Ren’s experiment.",
              "Later, alone, I heard whispering layered under static. Structured. Intentional. Not random.",
              "I turned the volume down. The whispering didn’t care.",
            ],
          },
          {
            date: "October 13, 2025",
            entries: [
              "Headache. Pressure. The walls feel closer.",
              "I pressed my palms against them just to feel something solid push back.",
              "The station didn’t feel solid today.",
            ],
          },
          {
            date: "October 14, 2025",
            entries: [
              "Jax asked about Ren. I gave him a careful answer that said nothing.",
              "He nodded like he understood. He didn’t. That look — the one right before trust breaks — I’ve seen it too often.",
              "I thought I saw someone standing at the end of the corridor. When I focused, it dissolved like breath in cold air.",
            ],
          },
          {
            date: "October 15, 2025",
            entries: [
              "Counting breaths again. Old habit from old failures.",
              "The lights dimmed when I exhaled. Brightened when I inhaled.",
              "Correlation is not causation. I repeated it until it stopped sounding true.",
            ],
          },
          {
            date: "October 16, 2025",
            entries: [
              "Elara called Zane a liability. He didn’t react.",
              "Flattened affect scares me more than rage. Rage means fight. Flat means resignation.",
              "The floor vibrated faintly after she left. Like something settling.",
            ],
          },
          {
            date: "October 17, 2025",
            entries: [
              "Found my notes in my pocket. I don’t remember putting them there.",
              "Memory gaps start small. Like cracks.",
              "Cracks are how pressure wins.",
            ],
          },
          {
            date: "October 18, 2025",
            entries: [
              "Filed the weekly report. ‘Increased irritability consistent with isolation.’",
              "My hand shook while writing. Not fear. Recognition.",
              "The monitor reflected someone behind me. I didn’t turn around.",
            ],
          },
          {
            date: "October 19, 2025",
            entries: [
              "The station smells damp. Mold shouldn’t exist here.",
              "Footsteps above med-bay again. Slow. Patient.",
              "There is nothing above med-bay.",
            ],
          },
          {
            date: "October 20, 2025",
            entries: [
              "Elara asked if guilt expires.",
              "I said guilt is information. She smiled like she’d already decided what to do with hers.",
              "The lights flickered. Again.",
            ],
          },
          {
            date: "October 21, 2025",
            entries: [
              "Lost five minutes. Just gone.",
              "Vitals stable. Mine.",
              "Time doesn’t disappear unless something takes it.",
            ],
          },
          {
            date: "October 22, 2025",
            entries: [
              "Jax and Ren laughed over dinner. It echoed too long.",
              "The station felt hostile to the sound. Like joy was an infection.",
              "I locked med-bay early. Childish. Necessary.",
            ],
          },
          {
            date: "October 23, 2025",
            entries: [
              "Zane reported peripheral movement.",
              "I see it too now. Shadows that hesitate.",
              "That’s when I stopped pretending this was just stress.",
            ],
          },
          {
            date: "October 24, 2025",
            entries: [
              "Prescribed Zane a sedative.",
              "The pill tray rattled on its own.",
              "I told myself it was vibration. I’ve told myself worse.",
            ],
          },
          {
            date: "October 25, 2025",
            entries: [
              "Dreamt the station was alive. Organs. Veins. A pulse.",
              "I was standing inside it, apologizing.",
              "Woke up mid-sentence.",
            ],
          },
          {
            date: "October 26, 2025",
            entries: [
              "Solar storm incoming.",
              "Storms disrupt signals. Minds are signals.",
              "I feel watched. Not emotionally. Clinically.",
            ],
          },
          {
            date: "October 27, 2025",
            entries: [
              "Zane’s vitals spiked during diagnostics.",
              "I felt it too — pressure behind the eyes, like something tuning us.",
              "The station screamed without sound.",
            ],
          },
          {
            date: "October 28, 2025",
            entries: [
              "Cass sent her report. She believes help is coming.",
              "I didn’t correct her. Mercy or cowardice — I don’t know anymore.",
              "I heard my own voice over comms. It said my name like a question.",
            ],
          },
          {
            date: "October 29, 2025",
            entries: [
              "Everyone calm. Too calm.",
              "Elara hasn’t slept. Or she doesn’t need to.",
              "I sharpened needles that didn’t need sharpening. Old muscle memory for fear.",
            ],
          },
          {
            date: "October 30, 2025",
            entries: [
              "Whispers on comms. Labeled interference.",
              "They say our names now.",
              "One of them sounded like my daughter.",
            ],
          },
          {
            date: "October 31, 2025",
            entries: [
              "Headache. Disorientation. Air tastes wrong.",
              "Zane says the shadows are lying.",
              "I believe him. They lie to me too.",
            ],
          },
          {
            date: "October 31, 2025 - Final Entry",
            entries: [
              "Zane pointed. Cass tried to listen. Elara screamed lies like oxygen.",
              "The monitors went dark one by one. The hum stopped. Silence rushed in.",
              "If anyone finds this: I tried to notice in time. I loved people badly but honestly. I miss rain. I miss dirt. I miss the sound of someone breathing next to me in the dark. I’m so tired.",
            ],
          },
        ],
      }),
      position: { x: 120, y: -12 },
      size: { width: 240, height: 300 },
      rotation: -4.2,
      packIn: ["evidence"],
    },
    {
      id: "zane_diary",
      type: "diary",
      title: "ZANE MORENO diary log",
      content: JSON.stringify({
        title: "ZANE MORENO diary log",
        entriesPerPage: 4,
        diaryEntries: [
          {
            date: "October 1, 2025",
            entries: [
              "First of the month. Same rotation. Same corridors. I cleaned panel B-17 twice because it gives me something to do with my hands.",
              "Jax fixed the water system again. Guy talks to machines like they listen. Maybe they do.",
              "Ren’s plants are growing. I stood there longer than I meant to. Green feels illegal out here.",
              "Kai asked how I was. I said fine. That’s the truth most days. Quiet isn’t broken.",
            ],
          },
          {
            date: "October 2, 2025",
            entries: [
              "Dreamt of Rostova again. Not the crash. Just her laughing in the cockpit, telling me I fly too tight.",
              "Woke up angry at myself for missing that version of her.",
              "Scrubbed the galley floor. Cass didn’t look at me. That’s normal.",
            ],
          },
          {
            date: "October 3, 2025",
            entries: [
              "Suggested a cargo shift optimization during briefing. Elara shut it down before I finished the sentence.",
              "She didn’t even look at the data.",
              "Cass wrote something down. I could feel the room decide who mattered and who didn’t.",
              "I used to brief admirals. Now I count my words so they don’t get used against me.",
            ],
          },
          {
            date: "October 4, 2025",
            entries: [
              "Station hum felt off today. Slight oscillation. Probably nothing.",
              "I notice these things because flying teaches you when ‘probably nothing’ is actually something.",
              "Nobody asks pilots for instincts once they ground you.",
            ],
          },
          {
            date: "October 5, 2025",
            entries: [
              "Kai asked about the dreams. I told him they’re getting closer together.",
              "He listened. Really listened. That counts for something.",
              "He says I’m fit for duty. I want to earn that sentence.",
            ],
          },
          {
            date: "October 6, 2025",
            entries: [
              "I replay the hearing sometimes. Elara’s testimony. So calm. So precise.",
              "She talked about limits. Funny thing is, I’m the only one in that cockpit who respected them.",
            ],
          },
          {
            date: "October 7, 2025",
            entries: [
              "Jax rerouted power for Ren. I saw him coming out of the access panel grinning.",
              "Rules bend around people like that. I used to be one of them.",
              "Didn’t report it. Don’t care.",
            ],
          },
          {
            date: "October 8, 2025",
            entries: [
              "Ren looked exhausted today. Pale. Still brilliant.",
              "Elara watched her from the cockpit glass like she was cataloging weaknesses.",
            ],
          },
          {
            date: "October 9, 2025",
            entries: [
              "Cass is watching the power logs now. I can tell.",
              "She believes in systems the way people used to believe in gods.",
              "I wonder if she knows systems need scapegoats to stay clean.",
            ],
          },
          {
            date: "October 10, 2025",
            entries: [
              "Nothing remarkable today. Those are the days that make me uneasy.",
              "Silence before turbulence.",
            ],
          },
          {
            date: "October 11, 2025",
            entries: [
              "I checked the external camera mounts near the cockpit. Standard maintenance.",
              "Elara was already watching when I finished.",
            ],
          },
          {
            date: "October 12, 2025",
            entries: [
              "Ren locked herself in the lab most of the day.",
              "Heard her arguing with someone over comms. Couldn’t make out the words.",
              "Later she laughed. Not happy laughter. The other kind.",
            ],
          },
          {
            date: "October 13, 2025",
            entries: [
              "Station smelled… different today. Metallic. Like overheated wiring.",
              "Probably recycled air messing with me.",
            ],
          },
          {
            date: "October 14, 2025",
            entries: [
              "Jax tried to check on Ren. I heard the argument through the corridor.",
              "She pushed him away hard. Fear does that to people.",
              "Elara watched. Again.",
            ],
          },
          {
            date: "October 15, 2025",
            entries: [
              "I used to think redemption was one perfect act.",
              "Now I think it’s surviving long enough to be believed.",
            ],
          },
          {
            date: "October 16, 2025",
            entries: [
              "Elara accused me of loitering near the cockpit cameras.",
              "Security risk. That’s the phrase she used.",
              "I wanted to laugh. Or scream.",
              "She knows exactly where to press.",
            ],
          },
          {
            date: "October 17, 2025",
            entries: [
              "Kai checked my vitals. Asked if I was feeling watched.",
              "I said no.",
              "I lied.",
            ],
          },
          {
            date: "October 18, 2025",
            entries: [
              "Everyone’s shorter with each other lately.",
              "I noticed Kai’s hand shaking when he wrote something down.",
              "Doctors notice everything. They hate when someone notices them.",
            ],
          },
          {
            date: "October 19, 2025",
            entries: [
              "I ran flight sims in my head while cleaning. Old habit.",
              "Elara flies like she wants an audience.",
            ],
          },
          {
            date: "October 20, 2025",
            entries: [
              "Elara spent a long time in the logs today.",
              "People don’t dig that deep unless they’re looking for leverage.",
            ],
          },
          {
            date: "October 21, 2025",
            entries: [
              "I miss Earth food. Real bread. Burnt edges.",
              "Funny the things that come back when you’re scared.",
            ],
          },
          {
            date: "October 22, 2025",
            entries: [
              "Jax and Ren shared a meal. Laughter echoed down the corridor.",
              "I stood there longer than I should have. Sound carries up here.",
              "It felt like listening to a future that didn’t include me.",
            ],
          },
          {
            date: "October 23, 2025",
            entries: [
              "Shadows in my peripheral vision today. Just flickers.",
              "Could be fatigue. Could be nothing.",
              "But nothing has patterns.",
            ],
          },
          {
            date: "October 24, 2025",
            entries: [
              "Told Kai I’m seeing things. He gave me something to help me sleep.",
              "He looked worried but kind.",
              "I don’t want to be broken. I want to be right.",
            ],
          },
          {
            date: "October 25, 2025",
            entries: ["Sedative makes the world quieter.", "Too quiet."],
          },
          {
            date: "October 26, 2025",
            entries: [
              "Solar storm coming. External lockdown.",
              "Storms are cover. Every pilot knows that.",
              "Elara smiled today.",
            ],
          },
          {
            date: "October 27, 2025",
            entries: [
              "Heart raced out of nowhere today. Like turbulence without warning.",
              "Something broadcast over comms. I felt it in my teeth.",
              "Elara called it diagnostics.",
              "Diagnostics don’t feel like that.",
            ],
          },
          {
            date: "October 28, 2025",
            entries: [
              "Cass looked rattled. Said she’d sent something to Corporate.",
              "I hope someone listens to her the way no one listened to me.",
            ],
          },
          {
            date: "October 29, 2025",
            entries: [
              "Everyone calm today. Too calm.",
              "Elara ran sims for hours.",
              "I slept without dreams for the first time in weeks.",
            ],
          },
          {
            date: "October 30, 2025",
            entries: [
              "Whispers over comms. Blamed on the storm.",
              "I recognized one voice. Couldn’t place it.",
              "My head hurts. But my thoughts feel sharper.",
            ],
          },
          {
            date: "October 31, 2025",
            entries: [
              "Something is wrong. The failures aren’t random.",
              "Patterns converge at the cockpit.",
              "I tried to tell Cass. She didn’t hear me.",
              "I’m not crazy. I know this the way I know altitude by pressure.",
            ],
          },
          {
            date: "October 31, 2025 - Final Entry",
            entries: [
              "Air’s bad. Lights flicker.",
              "I’m heading for the hub.",
              "If this is the last thing I write: I didn’t break the ship. I tried to save it. I tried again.",
            ],
          },
        ],
      }),
      position: { x: 52, y: -25 },
      size: { width: 240, height: 300 },
      rotation: -5.0,
      packIn: ["evidence"],
    },
    {
      id: "jax_diary",
      type: "diary",
      title: "JAX CALDER diary log",
      content: JSON.stringify({
        title: "JAX CALDER diary log",
        entriesPerPage: 3,
        diaryEntries: [
          {
            date: "October 1",
            entries: [
              "Baseline day. Reclamation loop still drifting below optimal efficiency. I patched it with a temporary bypass—clean, elegant. No alerts. That’s the thing about rules: they exist to protect people who don’t understand systems.",
              "Ren’s Myco-Veridia germinated successfully. She looked proud. Tired. Brilliant. I worry she forgets to eat.",
              "Station Zero hums at 41 Hz when everything’s healthy. I like that sound. It means things are working.",
            ],
          },
          {
            date: "October 2",
            entries: [
              "Routine inspections. Cargo rails misaligned by 0.4 degrees—corrected.",
              "I caught myself talking to the station today. Not out loud. Just… mentally. Like asking it to cooperate.",
              "Probably loneliness. Space does that.",
            ],
          },
          {
            date: "October 3",
            entries: [
              "Briefing went sideways. Zane suggested a cargo optimization tweak. Elara shut him down fast. Too fast.",
              "Engineering note: internal cameras briefly desynced by 200 milliseconds. Self-corrected.",
              "For a second, the feed lag made it look like someone was standing behind me. Just latency.",
            ],
          },
          {
            date: "October 4",
            entries: [
              "Power draw spike near Hydroponics again. I know Cass will see it eventually.",
              "I refined the bypass—smoothed the curve, reduced noise. It’s beautiful work. Anyone else would call it reckless.",
              "Heard a knock while inside the conduit. No one was scheduled nearby.",
            ],
          },
          {
            date: "October 5",
            entries: [
              "Kai checked in with Zane today. Everyone’s tense.",
              "I dropped a wrench because my hand jerked unexpectedly. First time that’s ever happened.",
              "When I bent to pick it up, I swear something scurried deeper into the wall.",
            ],
          },
          {
            date: "October 6",
            entries: [
              "Ran long-form diagnostics overnight. Missed an alert window. That bothers me.",
              "The station sounds… different at night. The hum modulates, like breathing.",
              "Rational explanation: thermal cycling.",
            ],
          },
          {
            date: "October 7",
            entries: [
              "Gave Ren the extra power. Told her it was a glitch. She smiled anyway. She always knows.",
              "She thanked me by touching my arm. That carried me through the whole shift.",
              "Later, in Engineering, a panel display flickered and spelled my name before correcting itself.",
            ],
          },
          {
            date: "October 8",
            entries: [
              "Cass is watching logs more closely. I can feel it.",
              "I ran the same equation three times and got three different answers. That’s not possible.",
              "The walls creaked like they were settling into new shapes.",
            ],
          },
          {
            date: "October 9",
            entries: [
              "Unauthorized power drain officially flagged.",
              "I reviewed the footage frame by frame. On frame 1142, the corridor is empty. On 1143—there’s a shadow where there shouldn’t be one.",
              "Deleted the frame. No reason to alarm anyone.",
            ],
          },
          {
            date: "October 10",
            entries: [
              "Dreamt I was back at the launch site. Engines screaming. Except the scream didn’t stop when I shut them down.",
              "Woke up with the taste of metal in my mouth.",
              "Engineering work slower today. Brain feels… thick.",
            ],
          },
          {
            date: "October 11",
            entries: [
              "Ren barely spoke. She’s hiding something.",
              "I thought I saw condensation on the inside of my helmet visor. I wasn’t wearing a helmet.",
              "The station lights dimmed in sequence—like something blinking.",
            ],
          },
          {
            date: "October 12",
            entries: [
              "Comms feedback during Ren’s experiment. Logged as interference.",
              "Later, I heard singing in the maintenance shafts. Soft. Familiar. My mother used to hum like that.",
              "I sealed the shaft and pretended I hadn’t heard it.",
            ],
          },
          {
            date: "October 13",
            entries: [
              "Headache all day. Pressure behind the eyes.",
              "I stared at a schematic for ten minutes before realizing it was upside down.",
              "The station smells damp.",
            ],
          },
          {
            date: "October 14",
            entries: [
              "Asked Ren if she was okay. She snapped. I deserved it.",
              "Found fingerprints on a panel I cleaned yesterday. Too many fingers.",
              "I washed my hands until they hurt.",
            ],
          },
          {
            date: "October 15",
            entries: [
              "Missed a minor pressure fluctuation. Caught it late.",
              "That cannot happen again.",
              "Something whispered ‘almost’ behind me.",
            ],
          },
          {
            date: "October 16",
            entries: [
              "Elara accused Zane of loitering. The word echoed too long in the room.",
              "I couldn’t remember the standard lockout procedure. Had to check the manual.",
              "I helped write the manual.",
            ],
          },
          {
            date: "October 17",
            entries: [
              "The hum is louder. Or I’m quieter.",
              "I saw movement in a sealed bulkhead. There is nothing inside sealed bulkheads.",
              "I didn’t log it.",
            ],
          },
          {
            date: "October 18",
            entries: [
              "Kai says irritability is normal.",
              "My reflection lagged again today.",
              "It smiled when I didn’t.",
            ],
          },
          {
            date: "October 19",
            entries: [
              "Power fluctuations spreading. Patterns don’t match known faults.",
              "The station feels crowded.",
              "I miss Earth. I miss silence.",
            ],
          },
          {
            date: "October 20",
            entries: [
              "Ran a full systems sweep. Everything nominal.",
              "That’s worse.",
              "Nominal systems don’t whisper.",
            ],
          },
          {
            date: "October 21",
            entries: [
              "Lost time. Thirty minutes unaccounted for.",
              "Found a schematic drawn on my console in grease. It wasn’t there before.",
              "It was almost right.",
            ],
          },
          {
            date: "October 22",
            entries: [
              "Dinner with Ren. For a moment, the station faded away.",
              "When I returned to Engineering, all alarms were muted.",
              "They turned back on when I spoke out loud.",
            ],
          },
          {
            date: "October 23",
            entries: [
              "CO2 alarm false positive.",
              "Then another.",
              "Then laughter over the speakers.",
            ],
          },
          {
            date: "October 24",
            entries: [
              "I told Kai I was fine.",
              "I am not fine.",
              "Something watches from the vents.",
            ],
          },
          {
            date: "October 25",
            entries: [
              "I forgot Ren’s last name for a second.",
              "That terrified me more than the voices.",
              "The station remembers her. Why don’t I?",
            ],
          },
          {
            date: "October 26",
            entries: [
              "Solar storm inbound.",
              "The station feels excited.",
              "I think it’s been waiting.",
            ],
          },
          {
            date: "October 27",
            entries: [
              "Comms spike.",
              "My hands won’t stop shaking.",
              "The walls are breathing.",
            ],
          },
          {
            date: "October 28",
            entries: [
              "Cass sent something urgent. I couldn’t read it—the letters crawled.",
              "I tried to fix a breaker and cut my hand because I forgot where my fingers were.",
              "Blood looks wrong in low gravity.",
            ],
          },
          {
            date: "October 29",
            entries: [
              "Prep complete. Or incomplete. I can’t tell anymore.",
              "The station keeps asking me to stay.",
              "I think it means forever.",
            ],
          },
          {
            date: "October 30",
            entries: [
              "Whispers over comms. Blamed on storm.",
              "They know my name.",
              "They sound like Ren.",
            ],
          },
          {
            date: "October 31 — Final Entry",
            entries: [
              "Life support failed. I fixed it. I think I fixed it.",
              "The station laughed. Not through speakers. Through the walls.",
              "If anyone finds this: it’s not broken. It’s hungry. And it knows how we’re put together.",
            ],
          },
        ],
      }),
      position: { x: 82, y: -25 },
      size: { width: 245, height: 310 },
      rotation: -4.6,
      packIn: ["evidence"],
    },
    {
      id: "ren_diary",
      type: "diary",
      title: "REN ILYANOVA diary log",
      content: JSON.stringify({
        title: "REN ILYANOVA diary log",
        entriesPerPage: 2,
        diaryEntries: [
          {
            date: "October 1",
            entries: [
              "The Myco-Veridia germinated today. I should feel triumphant. But there’s a thin wire of fear running through it, the way joy sometimes feels when it knows it isn’t supposed to last.",
              "The filaments are impossibly delicate—translucent threads catching the grow lights like spider silk. I sang to them again without realizing. My mother used to sing when she gardened, barefoot in the mud. I miss that smell more than I miss people.",
              "Jax fixed the water reclamation unit. He moves through the station like it’s an extension of his body. I wonder what it feels like to be that sure of your place in the world.",
            ],
          },
          {
            date: "October 3",
            entries: [
              "Elara dismissed Zane today. Sharp. Final. Watching it made my stomach tighten. Authority is loud up here. It echoes.",
              "The fungi responded unusually well to the nutrient tweak—faster synaptic branching, almost like neural mapping. I shouldn’t anthropomorphize it. I know better. But sometimes when I adjust the lights, it *leans*.",
              "I caught myself whispering apologies to it when I pruned a growth cluster. That’s not scientific. That scares me.",
            ],
          },
          {
            date: "October 7",
            entries: [
              "Jax rerouted power to my lab today. He called it a “glitch in my favor,” like the universe had blinked.",
              "I hugged him before thinking. He smelled like oil and ozone and warmth—human warmth, not recycled air. For a moment, I forgot where we were.",
              "I told myself not to read into it. People confuse proximity with intimacy all the time in isolation. Still… when he left, the lab felt colder. The Myco-Veridia pulsed brighter tonight. I swear it did.",
            ],
          },
          {
            date: "October 9",
            entries: [
              "Cass noticed the power draw. Of course she did. I don’t resent her. I envy her certainty. Rules are clean. Discovery is messy.",
              "The fungus reacted strangely when the comms array passed overhead—a subtle vibration, like breath held too long. I logged it as a radiation response. I didn’t log how my heart started racing for no reason. I slept badly. Dreamt the plants were growing *inside* the station walls.",
            ],
          },
          {
            date: "October 12",
            entries: [
              "I made a mistake today. I exposed the Myco-Veridia to a full comms frequency sweep. When the array hit a specific band, the fungus released a faint aerosol. Beautiful. Terrifying.",
              "I inhaled it. For three seconds, I heard my name spoken in my mother’s voice. Clear. Loving. Impossible.",
              "I didn’t tell anyone. I locked the data. Buried it. Because if this is what I think it is—if this can *touch the mind*—Corporate will tear it apart. Weaponize it. And because part of me is afraid that if I say it out loud, it will become real.",
            ],
          },
          {
            date: "October 14",
            entries: [
              "Jax asked if I was okay. I snapped at him. I hate myself for that.",
              "My hands shake sometimes now. My sleep fractures into pieces. The fungus responds faster than I predict—anticipates adjustments. That’s not possible. That’s just stress.",
              "But sometimes I feel watched in the lab, not like surveillance—like attention. I am afraid of what I’ve found. I am more afraid of losing it.",
            ],
          },
          {
            date: "October 18",
            entries: [
              "Kai watched me carefully today. Too carefully. He asked about headaches. I lied.",
              "My reflection in the lab glass looked wrong—delayed, like it wasn’t quite done copying me yet.",
              "I keep thinking: what if the fear is the point? What if the fungus doesn’t just cause hallucinations—what if it reveals what’s already there? I don’t want to see what’s already there.",
            ],
          },
          {
            date: "October 20",
            entries: [
              "Someone accessed my terminal. Elara. I know because the logs were too clean. Because the silence afterward felt *satisfied*.",
              "I feel sick. Not poisoned—exposed. Like my thoughts are no longer mine alone. The fungus reacted violently tonight, growth surging like it was excited. Or alarmed. I don’t know which is worse.",
            ],
          },
          {
            date: "October 22",
            entries: [
              "Jax apologized for prying. I almost cried. We talked about Earth—he misses thunderstorms, I miss dirt under my nails. We laughed.",
              "I wanted to tell him everything. I wanted to ask him to take me far away from this lab, from my own mind. Instead, I kissed his cheek and said goodnight. Fear makes cowards of us all.",
            ],
          },
          {
            date: "October 24",
            entries: [
              "Zane says he’s seeing things. I wanted to tell him it’s not his fault. That something here is *wrong*. But if I say that, then I have to say why.",
              "The spores are venting farther than I planned. The filters should catch them. They should. The fungus keeps blooming when the comms array passes overhead, like it’s listening. What if it’s learning us?",
            ],
          },
          {
            date: "October 26",
            entries: [
              "Solar storm incoming. Everyone sounds calm. Professional. Prepared. I am not.",
              "Storms amplify signals. Signals amplify minds. Minds break. I stood in the lab and apologized out loud today. To the fungus. To the station. To the ghosts that haven’t arrived yet.",
            ],
          },
          {
            date: "October 31",
            entries: [
              "The storm is here. The lab feels alive—too alive. The fungus blooms in waves, responding to something I can’t hear but feel deep in my teeth. The air is thick. Warm. Breathing feels intimate, invasive.",
              "I saw a face in the glass today. Smiling. Patient. I am so afraid. Not of dying—of knowing that my curiosity opened the door. That Jax might die thinking this was an accident.",
              "If anyone reads this: I wanted to heal minds. I think I taught it how to grow instead. I miss rain. I miss dirt. I’m sorry.",
            ],
          },
        ],
      }),
      position: { x: 50, y: 75 },
      size: { width: 245, height: 310 },
      rotation: -4.6,
      packIn: ["evidence"],
    },
    {
      id: "cass_diary",
      type: "diary",
      title: "CASSANDRA HALE diary log",
      content: JSON.stringify({
        title: "CASSANDRA HALE diary log",
        entriesPerPage: 2,
        diaryEntries: [
          {
            date: "October 1",
            entries: [
              "Baseline day. That’s the word Corporate likes. As if human beings ever arrive neutral.",
              "Systems nominal. Water reclamation patched by Jax. Ren’s germination report passed review. Zane noted as quiet but stable per Kai’s assessment.",
              "Sometimes, late at night, I can hear the station breathing. I tell myself it’s airflow through bulkheads. I need to believe machines don’t dream.",
            ],
          },
          {
            date: "October 3",
            entries: [
              "Elara dismissed Zane during briefing. Precise. Surgical. Logged as “minor interpersonal friction” because language matters. Emotion corrodes records.",
              "Zane looked… diminished afterward. That’s not an actionable metric. I didn’t write it down. I wonder sometimes if the station notices tone.",
            ],
          },
          {
            date: "October 7",
            entries: [
              "Unauthorized power draw detected in Hydroponics. Minor. Brief. Jax was nearby. He smiled when questioned—the kind of smile that says *I fixed something the system didn’t know was broken*.",
              "Ren wouldn’t meet my eyes. I logged the deviation, but the station felt… attentive afterward. Like something had leaned closer.",
            ],
          },
          {
            date: "October 9",
            entries: [
              "The power anomaly repeated. Same duration. Same subsystem. Patterns are how disasters introduce themselves politely.",
              "I started cross-referencing historical data. I don’t know why I felt watched while doing it. The idea of being observed in return is irrational. Still—I locked my terminal manually before sleeping.",
            ],
          },
          {
            date: "October 12",
            entries: [
              "Ren spent most of the day sealed in her lab. The comms array spiked during a routine sweep. Static layered over itself, warping into something almost vocal.",
              "For half a second, I thought I heard my name. I replayed the recording. Nothing intelligible. I archived it anyway. Evidence doesn’t care about embarrassment. The station felt colder tonight, though environmental controls say otherwise.",
            ],
          },
          {
            date: "October 16",
            entries: [
              "Elara accused Zane of loitering near the cockpit cameras. Security risk. Her words, exact.",
              "I reviewed camera logs later. Nothing out of bounds. But when I scrubbed the footage frame by frame, one reflection lagged behind the others. I blamed compression artifacts.",
            ],
          },
          {
            date: "October 18",
            entries: [
              "Filed report: “Increased irritability consistent with long-term isolation.” My hand shook slightly while typing. I corrected the error and didn’t log the tremor.",
              "The station hum is louder now. Or maybe I’m listening harder. I dreamed of corridors that rearranged themselves when I wasn’t looking.",
            ],
          },
          {
            date: "October 20",
            entries: [
              "Someone accessed Ren’s terminal with elevated credentials. Not a breach. An internal override. Elara has clearance. So do I.",
              "Clearance doesn’t mean innocence. It means responsibility. The station’s lights flickered during the log review. Once. Deliberate. Like punctuation.",
            ],
          },
          {
            date: "October 24",
            entries: [
              "Zane reported seeing movement in his peripheral vision. Kai prescribed a sedative. I flagged the report.",
              "I have worked in facilities where people swear machines watch them. I’ve always assumed guilt creates imagination. But this feels older than guilt.",
            ],
          },
          {
            date: "October 26",
            entries: [
              "Solar storm incoming. External activity suspended. Storms excuse anomalies. They’re convenient. I don’t like convenient explanations.",
              "The comms array has begun emitting faint echoes of prior transmissions—fragments replayed out of order. I hear voices that shouldn’t be there. Not distorted. *Remembered*.",
            ],
          },
          {
            date: "October 28",
            entries: [
              "I finalized my report to Corporate. Unauthorized research. Power misuse. Environmental anomalies. I didn’t mention the whispers. You don’t accuse a building of being haunted in an official document.",
              "I hesitated before sending. Not doubt. Fear of being *correct*. The station does not feel empty anymore.",
            ],
          },
          {
            date: "October 30",
            entries: [
              "Whispers across open channels. Blamed on storm interference. I recorded everything.",
              "Some voices repeat phrases from earlier logs. Others say things no one here has ever said. The station is talking to itself. Or something else is talking *through it*.",
            ],
          },
          {
            date: "October 31",
            entries: [
              "Air tastes sweet. Wrong. Lights dimmed without fault indicators. Shadows don’t align with light sources anymore.",
              "Zane pointed toward the cockpit and said, “It’s wearing the ship.” I believe him.",
              "I reached the hub. Tried to broadcast. Something pushed back—not electronically. Intentionally.",
              "This station remembers us. If anyone finds this: I followed the rules. I warned them. I listened. And the station listened back.",
            ],
          },
        ],
      }),
      position: { x: 130, y: 50 },
      size: { width: 245, height: 310 },
      rotation: -4.6,
      packIn: ["evidence"],
    },
    {
      id: "elara_diary",
      type: "diary",
      title: "ELARA VOSS diary log",
      content: JSON.stringify({
        title: "ELARA VOSS diary log",
        entriesPerPage: 2,
        diaryEntries: [
          {
            date: "October 1",
            entries: [
              "Baseline day. Systems stable. Station holds course like it should.",
              "I like mornings here — the station still feels asleep, as if it hasn’t started watching yet. Zane was quiet. He always is. Quiet people make fewer mistakes, or better ones. Hard to tell.",
              "I ran nav checks twice. Didn’t need to. But repetition keeps ghosts out of your hands.",
            ],
          },
          {
            date: "October 3",
            entries: [
              "Briefing. Zane spoke out of turn. Suggested optimizing cargo shifts.",
              "I shut it down immediately. The room went still. I don’t regret it.",
              "Some people shouldn’t be allowed to improvise.",
            ],
          },
          {
            date: "October 4",
            entries: [
              "Routine course correction. I thought I saw movement reflected in the cockpit glass — like someone standing behind me.",
              "When I turned, there was only my own chair. Stress artifact. Long rotations do that.",
              "Still — I locked the cockpit afterward. I don’t usually.",
            ],
          },
          {
            date: "October 5",
            entries: [
              "Kai met with Zane. Nightmares. Trauma. Funny how consequences wait years before they knock.",
              "I reviewed the old accident report again tonight. The language is so clean. So final. Fire never reads that neatly.",
            ],
          },
          {
            date: "October 7",
            entries: [
              "Unauthorized power reroute detected. Jax called it a glitch. I logged it mentally.",
              "Glitches are just truths wearing masks.",
            ],
          },
          {
            date: "October 10",
            entries: [
              "Nothing of note. I like days like this. Blank pages don’t accuse you of anything.",
            ],
          },
          {
            date: "October 12",
            entries: [
              "Something happened today. I was reviewing comms alignment near Hydroponics when the frequency spiked. The lights dimmed. The air thickened.",
              "I saw someone standing between the grow racks. Too tall. Bent wrong. Smiling so wide it hurt to look at. Its eyes were empty — not dark, just *missing*. Like holes punched through reality.",
              "It tilted its head. Slowly. Like it knew me. Then the alarms kicked in and it was gone.",
              "I vomited afterward. Logged it as vertigo. I didn’t sleep.",
            ],
          },
          {
            date: "October 14",
            entries: [
              "Ren looked ill. Defensive. Cornered. Jax tried to help her. People always do that right before things fall apart.",
              "I smelled soil in the cockpit today. That shouldn’t be possible.",
            ],
          },
          {
            date: "October 16",
            entries: [
              "Argument with Zane. He lingered near the cockpit cams again. Watching. Always watching.",
              "I accused him of loitering. He didn’t deny it. Just stared at me like I was something fragile. I hate that look.",
            ],
          },
          {
            date: "October 20",
            entries: [
              "I accessed Ren’s terminal. Her data is… incomplete. Intentionally so.",
              "She found something and then flinched away from it. I don’t flinch.",
              "The first rule of flight: if something is trying to talk to you, listen.",
            ],
          },
          {
            date: "October 24",
            entries: [
              "Zane reported seeing things. Kai medicated him. Interesting choice.",
            ],
          },
          {
            date: "October 26",
            entries: [
              "Solar storm warning received. Five days of noise. Interference. Static. Cover.",
              "The universe has timing.",
            ],
          },
          {
            date: "October 27",
            entries: [
              "Ran comms diagnostic. For a second — just one — the cockpit filled with whispers. Overlapping. Excited.",
              "Zane’s vitals spiked immediately. That felt… significant.",
            ],
          },
          {
            date: "October 30",
            entries: [
              "The whispers are louder now. I don’t think they’re meant for everyone.",
              "Some people hear storms. Some hear instructions.",
            ],
          },
          {
            date: "October 31",
            entries: [
              "The station is breathing wrong. Ren saw something on the cameras. A face. Good.",
              "Zane is moving through the corridors like a man chasing a confession.",
              "The storm is beautiful from here. The cockpit feels warm. Almost welcoming.",
              "If ghosts exist, they prefer pilots. They need steady hands.",
            ],
          },
        ],
      }),
      position: { x: 110, y: 60 },
      size: { width: 245, height: 310 },
      rotation: -4.6,
      packIn: ["evidence"],
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
        "Uncover the scientific explanation for the crew's shared hallucinations and the 'ghostly' phenomena.",
      solution:
        "tHE HALLUCINATIONS WERE CAUSED BY THE MYCO-VERIDIA FUNGUS RELEASED SPORES AFFECTING THE CREW'S PERCEPTIONS. The solar storm amplified THE EFFECTS. Elara Voss witnessed the manifestations of these hallucinations in the cockpit.",
    },
    {
      id: "obj_02",
      description:
        "Prove that the life support and system failures were a result of deliberate sabotage, not the solar storm.",
      solution:
        "Analyze system logs and crew interactions leading up to the failures.",
    },
    {
      id: "obj_03",
      description:
        "Expose the secret rivalry and past trauma that created the motive for murder.",
      solution:
        "In the backstory of Elara Voss and the diary of Zane Moerno it is mentioned that Elara's mentor died because of something Zane did which led to a deep-seated resentment.",
    },
    {
      id: "obj_04",
      description:
        "Identify the saboteur who orchestrated the 'haunting' and manipulated the station's systems from the cockpit.",
      solution:
        "Elara Voss is the saboteur, and the haunting was hallucinations.",
    },
    {
      id: "obj_05",
      description:
        "Determine how the killer's own plan for a perfect escape ultimately sealed their fate aboard Station Zero.",
      solution:
        "Elara tried to divert the power from the cockpit and amplify the frequencies to make the myco-verdia spores more potent, but the plan caused the increase in power to fuse the safety pods shut.",
    },
  ],
};

export default STATION_ZERO_DATA;
