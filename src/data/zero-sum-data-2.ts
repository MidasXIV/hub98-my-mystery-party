// Example 1: Email Evidence
const emailEvidence = {
  id: "email_bellini_rossi",
  type: "electronic-messages",
  title: "Email: Rossi to Bellini",
  content: JSON.stringify({
    type: "EMAIL",
    platformName: "Netscape Mail",
    caseRef: "EM-221",
    subject: "RE: The Renovations",
    from: "Marco Rossi <m.rossi@archivio.it>",
    to: "Alessandra Bellini <a.bellini@palazzo.com>",
    printDate: "10/26/1948",
    messages: [
      {
        sender: "Marco Rossi",
        time: "Oct 24, 1948 10:00 AM",
        body: "Alessandra,\n\nI strongly advise against opening the west wing foundation. The documents I found suggest the structure is not stable.\n\nFurthermore, some things are better left buried. We discussed this.\n\n- M",
      },
    ],
  }),
  position: { x:0, y: 50 },
  size: { width: 320, height: 280 },
  rotation: 1,
};

// Example 2: WhatsApp/Chat Evidence (Anachronistic 90s style SMS)
const smsEvidence = {
  id: "sms_victim_fiance",
  type: "electronic-messages",
  title: "SMS Log: Harmony & Christian",
  content: JSON.stringify({
    type: "SMS",
    platformName: "Mobile Network Dump",
    caseRef: "SMS-9921",
    participants: "Harmony A. & Christian P.",
    messages: [
      {
        sender: "Christian",
        time: "21:15",
        body: "Where are you? I'm at the car.",
        isMe: false,
      },
      {
        sender: "Harmony",
        time: "21:16",
        body: "Coming. Forgot my purse inside.",
        isMe: true,
      },
      {
        sender: "Christian",
        time: "21:40",
        body: "Harm? It's been 20 mins.",
        isMe: false,
      },
      {
        sender: "Christian",
        time: "22:00",
        body: "I'm leaving. Call me.",
        isMe: false,
      },
    ],
  }),
  position: { x:0, y: 20 },
  size: { width: 220, height: 300 },
  rotation: -2,
};

const ZERO_SUM_DATA = {
  items: [
    {
      id: "news_financial_times_hype",
      type: "newspaper",
      title: "Newspaper: Zero Sum Announcement",
      content:
        '{\n  "publication": "The Financial Times",\n  "headline": "Institute Shares Soar on \'Zero Sum\' Announcement",\n  "subheadline": "Dean Singhal calls Srivastav\'s upcoming formula \'A New Era\' as stock index hits all-time high.",\n  "dateline": "MUMBAI",\n  "date": "Friday, October 14, 2005",\n  "author": "Sarah Jenkins",\n  "authorRole": "Economics Editor",\n  "hasPhoto": true,\n  "imageCaption": "Dean Vikram Singhal (left) and Professor Aryan Srivastav (right) at the grant ceremony.",\n  "body": "The Institute of Mathematical Sciences saw its stock valuation triple in trading yesterday following the announcement that Professor Aryan Srivastav has solved \'The Zero Sum\' problem. \\n\\nThe formula, which allegedly predicts market crashes with 100% accuracy, is set to be revealed at a press conference tomorrow morning. Dean Vikram Singhal, who secured the controversy-laden government grants for the project, told reporters: \'This is not just math; this is the financial future. We have built this Institute on the promise of this day.\' Market analysts warn that failure to deliver would be catastrophic."\n}',
      position: { x:-20, y: 10 },
      size: { width: 380, height: 300 },
      rotation: 30,
    },
    {
      id: "news_daily_chronicle_crash",
      type: "newspaper",
      title: "Newspaper: The Aftermath",
      content:
        '{\n  "publication": "The Daily Chronicle",\n  "headline": "Market Crash After \'Zero Sum\' No-Show",\n  "subheadline": "Professor Srivastav Missing; Institute Stocks Plummet 60% Overnight.",\n  "dateline": "MUMBAI",\n  "date": "Sunday, October 16, 2005",\n  "author": "Rajeev Mehta",\n  "authorRole": "Senior Correspondent",\n  "hasPhoto": false,\n  "imageCaption": "",\n  "body": "Panic swept the financial sector yesterday after the highly anticipated \'Zero Sum\' press conference was cancelled. Professor Aryan Srivastav failed to appear, leading to immediate speculation of fraud or cold feet. \\n\\nDean Vikram Singhal addressed the angry crowd, stating, \'We are currently unable to locate the Professor, but the math is sound.\' Investors disagreed, pulling millions in funding within hours. Police have now opened a missing persons case, centered on the Institute\'s campus."\n}',
      position: { x:-20, y: 10 },
      size: { width: 380, height: 300 },
      rotation: 2,
    },
    {
      id: "doc_autopsy_aryan",
      type: "autopsy-report",
      title: "Autopsy Report: Aryan Srivastav",
      content: JSON.stringify({
        caseNumber: "CC-2009-45B",
        victimName: "Aryan Srivastav",
        sex: "Male",
        age: "42 years",
        race: "South Asian", // Inferred based on name and New Delhi location
        weight: "74 kg", // Estimated average for height/age demographics
        height: "176 cm", // Estimated average for height/age demographics

        description:
          "The body is that of a male, 42 years of age. The subject was found sealed behind a bookcase in the Archives Wing. Conclusion: The victim was incapacitated by a blow to the head, then moved to the Archives where he suffocated. CRITICAL FORENSIC NOTE: The skin irritation on the neck is a specific reaction caused by the interaction of Menthol (from the lozenges/sweat) and the toxic Stachybotrys spores. This confirms the victim was alive and sweating when exposed to the mold in the Archives.",

        externalInjuries:
          "Head/Neck: Severe trauma to the back of the skull. Unusual pinpoint contusions are visible on the neck. These resemble a severe localized chemical irritation. Hands: Traces of white calcium carbonate (chalk dust) found heavily coating the right hand.",

        internalInjuries:
          "Stomach: High concentration of undigested peppermint oil and menthol. Subject appeared to have consumed 'Minty Fresh' lozenges immediately prior to death. Lungs: Heavy congestion. Presence of fungal spores identified as Stachybotrys chartarum (Black Archival Mold). This mold is specific to the unventilated Archives basement.",

        causeOfDeath:
          "Blunt force trauma to the occipital region followed by asphyxiation",
        mannerOfDeath: "Homicide", // Inferred from "incapacitated by a blow" and "found sealed behind a bookcase"

        investigatingOfficer:
          "Sub-Inspector Rajesh Verma, Delhi Police (Crime Branch)",
        recordingOfficer: "Head Constable Amit Singh",
        date: "October 17, 2005",
        time: "17:15", // Converted from 5:15 PM
        coroner: "Dr. Anjali Gupta, Chief Medical Officer, AIIMS New Delhi",
      }),

      position: { x:0, y: 20 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_poi_alisha",
      type: "person-of-interest-report",
      title: "POI Report: Alisha Mehra",
      content:
        '{"lastName":"Mehra","firstName":"Alisha","age":"34","height":"165 cm","weight":"58 kg","hair":"Dark Brown","eyes":"Hazel","occupation":"Associate Professor","statement":"I have nothing to hide. Aryan and I were partners, even if we fought.","conclusion":"**MOTIVE ESTABLISHED.** Subject sent a threatening text to the victim on the day of the murder: \'I will stop you.\' She stood to lose her career if the fraud was exposed. \\n\\n**MEDICAL NOTE:** Subject suffers from severe allergies to biological contaminants, specifically Black Archival Mold (*Stachybotrys*). Medical records confirm she carries an EpiPen and cannot enter unventilated areas like the Archives Wing without risking anaphylaxis."}',
      position: { x:30, y: 20 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_alibi_alisha",
      type: "formal-alibi",
      title: "Witness Statement: Alisha Mehra",
      content:
        '{"witnessName":"Alisha Mehra","statementBody":"I was in the East Wing Lecture Hall from 4:00 PM to 6:00 PM. I conducted my seminar until 5:00 PM. After the students left, I stayed behind to erase the chalkboards. At 5:15 PM, I saw Dean Singhal running from the hall, looking panicked. I assumed he and Aryan had fought about the funding. I did not see Aryan after that. I stayed in the hall grading papers until 6:00 PM.","pageNumber":"1"}',
      position: { x:-20, y: 90 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_poi_vikram",
      type: "person-of-interest-report",
      title: "POI Report: Vikram Singhal",
      content:
        '{"lastName":"Singhal","firstName":"Vikram","age":"55","height":"180 cm","weight":"85 kg","hair":"Grey","eyes":"Black","occupation":"Dean of the Institute","statement":"My focus is solely on the stability of this institution. I was in meetings all evening.","conclusion":"**SUSPICIOUS CIRCUMSTANCES.** Subject had a massive financial motive to prevent the cancellation of the press conference. During the initial interview, grey dust was observed on his suit jacket. Lab analysis confirms it is quick-setting mortar/cement dust, consistent with the materials used to seal the Archives wall."}',
      position: { x:-30, y: 220 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_alibi_vikram",
      type: "formal-alibi",
      title: "Witness Statement: Vikram Singhal",
      content:
        '{"witnessName":"Vikram Singhal","statementBody":"I was in the Administrative Block (South Wing) from 4:30 PM until nearly 7:00 PM. I was preparing for the press conference and meeting with potential donors. I did not leave the South Wing. The dust on my jacket is simply from the stairwell renovations; the workmen leave materials everywhere. I have no knowledge of Aryan\'s whereabouts after our morning briefing.","pageNumber":"1"}',
      position: { x:40, y: 150 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_poi_rohan",
      type: "person-of-interest-report",
      title: "POI Report: Rohan Das",
      content:
        '{"lastName":"Das","firstName":"Rohan","age":"26","height":"178 cm","weight":"70 kg","hair":"Black","eyes":"Dark Brown","occupation":"PhD Candidate","statement":"I was working alone in the library. I had nothing to do with this.","conclusion":"**ALIBI FALSIFIED.** Subject claims to be in the Main Library. However, maintenance logs confirm the Library was closed for floor waxing from 3:00 PM to 7:00 PM. The fumes were toxic and entry was prohibited. Subject is lying about his location. Investigation into academic theft is pending."}',
      position: { x:-25, y: 120 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_alibi_rohan",
      type: "formal-alibi",
      title: "Witness Statement: Rohan Das",
      content:
        '{"witnessName":"Rohan Das","statementBody":"I was in the Main Library (North Wing) from 3:00 PM to 7:00 PM archiving old historical maps. It is a quiet job and I was alone the entire time. I did not see Professor Srivastav or anyone else. I only left when the security guard did his rounds at 7:00 PM.","pageNumber":"1"}',
      position: { x:0, y: 90 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_log_maintenance_cement",
      type: "formal-alibi",
      title: "Institute Maintenance Log (South Wing)",
      content:
        '{"witnessName":"Head of Janitorial Services","statementBody":"Date: 10/14/2005\\nTime: 14:00\\nLocation: Admin Block (South Wing) Stairwell\\nJob Description: Patchwork on Dean\'s office stairwell\\nNotes: Contractor requested a small quantity of quick-setting mortar and drop cloths. Materials were left staged near the South Wing stairwell for easy access. All material was unguarded after 4:00 PM.\\n\\nDate: 10/14/2005\\nTime: 16:00\\nLocation: East Wing Lecture Hall\\nJob Description: HVAC filter cleaning. Work finished before 5:00 PM.","pageNumber":"1"}',
      position: {
        x: 60,
        y: 20,
      },
      size: {
        width: 210,
        height: 360,
      },
      rotation: 0,
    },

    {
      id: "doc_statement_secretary_routine",
      type: "formal-alibi",
      title: "Witness Statement: Secretary (Chalkboard Routine)",
      content:
        '{"witnessName":"Sunita Devi (Dean\'s Secretary)","statementBody":"Professor Srivastav had a very specific habit. He was addicted to \'Minty Fresh\' peppermint lozenges. He always popped one right before he had to teach a class or use a chalkboard, like a ritual. He said it helped clear his head for complex proofs. He always had a distinctive minty smell when he was working on math.","pageNumber":"1"}',
      position: {
        x: 30,
        y: 40,
      },
      size: {
        width: 250,
        height: 200,
      },
      rotation: 0,
    },
    {
      id: "doc_email_confession_vikram",
      type: "electronic-messages",
      title: "Email: Confession Draft to Vikram",
      content: JSON.stringify({
        type: "EMAIL",
        platformName: "Microsoft Outlook Express 6.0",
        caseRef: "EVID-DIG-004", // Digital Evidence linked to Case CC-2009-45B
        subject:
          "URGENT: Regarding the Press Conference Tomorrow—It's Not Sound.",
        from: "Professor Aryan Srivastav <a.srivastav@institute.edu>",
        to: "Dean Vikram Singhal <V.Singhal@institute.edu>",
        printDate: "10/18/2005", // Printed by investigators post-mortem
        messages: [
          {
            sender: "Professor Aryan Srivastav",
            time: "October 14, 2005, 4:58 PM",
            body: "Vikram,\n\nI can't do it. I just ran the proof one last time on the chalkboard in the East Wing. It's all random variables. The math doesn't hold up; it's a fraud.\n\nWe cannot build this Institute on a lie. I am canceling the press conference immediately. I'm going to release a public statement to the board and begin returning the grant money.\n\n- Aryan",
          },
        ],
      }),
      position: {
        x: 0,
        y: 20,
      },
      size: {
        width: 320, // Kept original size, though 50px is very narrow for a document
        height: 280,
      },
      rotation: 0,
    },
  ],
};

export default ZERO_SUM_DATA;
