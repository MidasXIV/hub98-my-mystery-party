import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getCaseBySlug } from '@/data/coldCases';

  const images = { Dr_Verma_image:
    "https://github.com/user-attachments/assets/83616c10-f1b9-4d45-924b-f7e2d06fea61",
  Mrs_Sharma_image:
    "https://github.com/user-attachments/assets/5bc1200d-2c58-47a2-83fe-b9834eb1bd60",
  Nurse_Agnes_image:
    "https://github.com/user-attachments/assets/8cbb6265-dcda-4a03-aca4-cf57cfff4ccf",
  Rohan_Sharma_image:
    "https://github.com/user-attachments/assets/5e7a703d-2dbf-4661-8838-4e7fce270f91",
  Karan_Kholi_image:
    "https://github.com/user-attachments/assets/ca6bea85-0753-4a2d-8114-1c537df204e3",
    
  };

const mockData = {
  "items": [
    {
      "id": "photo_verma",
      "type": "photo",
      "content": "Dr Verma image",
      "position": { "x": 10, "y": 15 },
      "size": { "width": 180, "height": 180 },
      "rotation": 5,
      "imageUrl": images.Dr_Verma_image,
    },
    {
      "id": "photo_sharma_mrs",
      "type": "photo",
      "content": "Mrs Sharma image",
      "position": { "x": -5, "y": 60 },
      "size": { "width": 180, "height": 180 },
      "rotation": -3,
      "imageUrl": images.Mrs_Sharma_image,
    },
    {
      "id": "photo_agnes",
      "type": "photo",
      "content": "Nurse Agnes image",
      "position": { "x": 20, "y": 100 },
      "size": { "width": 180, "height": 180 },
      "rotation": 8,
      "imageUrl": images.Nurse_Agnes_image,
    },
    {
      "id": "photo_sharma_rohan",
      "type": "photo",
      "content": "Rohan Sharma image",
      "position": { "x": 40, "y": 5 },
      "size": { "width": 180, "height": 180 },
      "rotation": -7,
      "imageUrl": images.Rohan_Sharma_image,
    },
    {
      "id": "photo_kholi",
      "type": "photo",
      "content": "Karan Kholi image",
      "position": { "x": 70, "y": 20 },
      "size": { "width": 180, "height": 180 },
      "rotation": 10,
      "imageUrl": images.Karan_Kholi_image,
    },
    {
      "id": "alibi_verma",
      "type": "formal-alibi",
      "content": "FORMAL ALIBI STATEMENT - DR. ANIL VERMA: On the evening of October 27, 2023, from 7:00 PM to 11:00 PM, Dr. Verma was attending the 'Annual Medical Research Symposium' in Boston, MA. He delivered a keynote speech between 8:30 PM and 9:15 PM, as evidenced by conference records, attendee signatures, and a digital recording of his presentation. He remained at the event for networking until its conclusion.",
      "position": { "x": 15, "y": 40 },
      "size": { "width": 40, "height": 50 },
      "rotation": -2
    },
    {
      "id": "alibi_sharma_mrs",
      "type": "formal-alibi",
      "content": "FORMAL ALIBI STATEMENT - MRS. CHANDRA SHARMA: Mrs. Sharma states that on the night of October 27, 2023, she was at her residence in complete isolation due to a severe migraine, which began around 6:00 PM. Her personal physician, Dr. Lena Khan, confirmed a house call at 9:30 PM for medication and observed her incapacitated state. No other individuals were present at the residence.",
      "position": { "x": -10, "y": 80 },
      "size": { "width": 38, "height": 48 },
      "rotation": 4
    },
    {
      "id": "alibi_agnes",
      "type": "formal-alibi",
      "content": "FORMAL ALIBI STATEMENT - NURSE AGNES REID: Nurse Reid was on duty at St. Jude's Hospital, Ward 4, from 6:00 PM on October 27, 2023, until 6:00 AM on October 28, 2023. Her shifts are recorded via biometric scan. Witness statements from fellow nurses, Mr. David Chen and Ms. Emily Stone, corroborate her presence and active involvement in patient care throughout the specified period, with no extended breaks or departures.",
      "position": { "x": 30, "y": 110 },
      "size": { "width": 42, "height": 50 },
      "rotation": -6
    },
    {
      "id": "alibi_sharma_rohan",
      "type": "formal-alibi",
      "content": "FORMAL ALIBI STATEMENT - ROHAN SHARMA: Mr. Sharma reports being at the university library, studying for his upcoming finals, from 7:30 PM to 10:45 PM on October 27, 2023. His student ID swipe access logs confirm entry and exit times. Furthermore, he claims to have been with a study group; however, attempts to verify this with named individuals have yielded inconsistent responses regarding their exact presence.",
      "position": { "x": 50, "y": 30 },
      "size": { "width": 36, "height": 46 },
      "rotation": 9
    },
    {
      "id": "alibi_kholi",
      "type": "formal-alibi",
      "content": "FORMAL ALIBI STATEMENT - KARAN KHOLI: Mr. Kholi states he was on a business trip to Seattle, WA, from October 26-28, 2023. Flight manifests, hotel receipts, and taxi records confirm his travel and accommodation. He provided a restaurant bill from Seattle dated October 27, 2023, 8:15 PM, for dinner with a client, Mr. Marcus Thorne, who also corroborated the meeting.",
      "position": { "x": 80, "y": 45 },
      "size": { "width": 39, "height": 49 },
      "rotation": 1
    },
    {
      "id": "transcript_verma",
      "type": "interrogation-transcript",
      "content": "INTERVIEW DATE: November 01, 2023\nSUBJECT: Dr. Anil Verma\nDETECTIVE: Dr. Verma, we know you had significant financial dealings with Mr. Doe. Did these dealings cause any tension?\nVERMA: (Clears throat) My relationship with John was purely professional. Any financial matters were confidential and settled amicably. No tension at all. I was at a conference, as my alibi states.\nDETECTIVE: Settled amicably? Our records show a rather... aggressive email from you just days before John's death, regarding a payment overdue for 'Project Nightingale'.",
      "position": { "x": 25, "y": 70 },
      "size": { "width": 45, "height": 50 },
      "rotation": 7
    },
    {
      "id": "transcript_sharma_mrs",
      "type": "interrogation-transcript",
      "content": "INTERVIEW DATE: November 02, 2023\nSUBJECT: Mrs. Chandra Sharma\nDETECTIVE: Mrs. Sharma, your husband, Rohan, mentioned you had a heated argument with John Doe a week before his passing. Can you elaborate?\nSHARMA: (Voice trembling) That's... that's a private family matter. John was interfering where he shouldn't have been. He was trying to manipulate Rohan, turn him against me. It was nothing. Just a disagreement.\nDETECTIVE: A disagreement strong enough to warrant threats, according to your son?",
      "position": { "x": -15, "y": 100 },
      "size": { "width": 43, "height": 47 },
      "rotation": -1
    },
    {
      "id": "transcript_agnes",
      "type": "interrogation-transcript",
      "content": "INTERVIEW DATE: November 03, 2023\nSUBJECT: Nurse Agnes Reid\nDETECTIVE: Nurse Reid, during your shift, did you notice anything unusual around the time of Mr. Doe's death? Anyone out of place?\nAGNES: (Hesitates) There was a man. Tall, dark coat. I saw him near the hospital's north entrance, where staff usually park. He seemed... agitated. He was talking on the phone, very quietly. I didn't recognize him, but he wasn't a regular.\nDETECTIVE: Did you see his face clearly? Could you identify him from a lineup?",
      "position": { "x": 40, "y": 80 },
      "size": { "width": 40, "height": 48 },
      "rotation": 3
    },
    {
      "id": "transcript_sharma_rohan",
      "type": "interrogation-transcript",
      "content": "INTERVIEW DATE: November 04, 2023\nSUBJECT: Rohan Sharma\nDETECTIVE: Rohan, your study group's accounts of your presence at the library are inconsistent. Some say you left for an hour. Where did you go?\nROHAN: (Eyes darting) I... I went to grab a coffee. Needed a break. It was just for a few minutes, maybe twenty. I came right back.\nDETECTIVE: Twenty minutes, or an hour? Your phone's GPS data shows you were near the docks at that time. A strange place for coffee, wouldn't you say?",
      "position": { "x": 60, "y": 50 },
      "size": { "width": 42, "height": 49 },
      "rotation": -4
    },
    {
      "id": "transcript_kholi",
      "type": "interrogation-transcript",
      "content": "INTERVIEW DATE: November 05, 2023\nSUBJECT: Karan Kholi\nDETECTIVE: Mr. Kholi, your business trip to Seattle. You checked into your hotel at 6 PM on the 26th, but didn't check out until 11 AM on the 28th. However, flight records indicate you took a private jet back to the city on the evening of the 27th, returning early on the 28th. Care to explain the discrepancy?\nKHOLI: (Smiles thinly) Business opportunities sometimes require... flexibility. I had a last-minute meeting that couldn't wait. It was brief. My presence in Seattle was always maintained, for appearances.",
      "position": { "x": 90, "y": 70 },
      "size": { "width": 44, "height": 50 },
      "rotation": 12
    },
    {
      "id": "autopsy_doe",
      "type": "autopsy-report",
      "content": "AUTOPSY REPORT\nVICTIM: John Doe\nCASE NUMBER: OS-2023-001\nDATE OF EXAMINATION: October 28, 2023\nEXAMINING PATHOLOGIST: Dr. Elena Petrova\n\nEXTERNAL EXAMINATION:\nBody identified as John Doe, male, approximately 45 years old, 180 cm tall, 85 kg. Rigor mortis is established. Lividity is fixed dorsally. A small puncture wound, approximately 2mm in diameter, noted on the left lateral neck, just inferior to the earlobe. No significant external bruising or signs of struggle observed apart from minor abrasions on the right forearm, consistent with a fall.\n\nINTERNAL EXAMINATION:\nRESPIRATORY SYSTEM: Lungs show no significant pathology. Airways clear.\nCARDIOVASCULAR SYSTEM: Heart is normal size. Coronary arteries patent. No evidence of myocardial infarction.\nGASTROINTESTINAL SYSTEM: Unremarkable. Stomach contents indicate a recent meal, primarily protein and vegetables, consumed within 2-3 hours of death.\nCENTRAL NERVOUS SYSTEM: Brain appears normal. No intracranial hemorrhage. Evidence of mild cerebral edema.\n\nTOXICOLOGY REPORT:\nPreliminary tests revealed the presence of a potent neurotoxin, identified as 'Vipera Toxin-B', in the victim's bloodstream and cerebrospinal fluid. Concentration suggests a rapid onset of paralysis and cardiac arrest. No other illicit drugs or significant alcohol content detected.\n\nCAUSE OF DEATH:\nCardiac arrest due to acute neurotoxicosis (Vipera Toxin-B) administered via injection.\n\nCONCLUSION:\nManner of death is homicide. The puncture wound on the neck is consistent with the delivery of the neurotoxin. The rapid action of the toxin would have incapacitated the victim quickly, likely explaining the lack of significant defensive injuries.",
      "position": { "x": 75, "y": -10 },
      "size": { "width": 48, "height": 50 },
      "rotation": 2
    },
    {
      "id": "doc_verma_email",
      "type": "document",
      "content": "DELETED EMAIL RECOVERY\nTO: John Doe\nFROM: Dr. Anil Verma\nDATE: October 25, 2023\nSUBJECT: RE: Project Nightingale - DELAYED PAYMENT\nJohn, I cannot express my disappointment enough. We had an agreement. The 'Project Nightingale' payment was crucial, and your delay is jeopardizing everything. My patience is wearing thin. If this isn't resolved by end of day tomorrow, I will be forced to take... alternative measures. This isn't a threat, it's a promise.",
      "position": { "x": 0, "y": -10 },
      "size": { "width": 37, "height": 45 },
      "rotation": -8
    },
    {
      "id": "doc_verma_witness",
      "type": "document",
      "content": "WITNESS STATEMENT - MS. LILA SINGH\nDATE: October 29, 2023\nSTATEMENT: I was taking my usual evening stroll near the old abandoned warehouse district, close to where John Doe was found. It was around 8:45 PM on October 27th. I distinctly saw Dr. Anil Verma's car, a dark blue sedan, parked a few blocks away. He was getting out of it, wearing a dark jacket. He looked very tense, checking his surroundings. I thought nothing of it at the time, but after the news, it struck me as odd.",
      "position": { "x": 20, "y": -5 },
      "size": { "width": 36, "height": 44 },
      "rotation": 11
    },
    {
      "id": "doc_verma_search",
      "type": "document",
      "content": "FORENSIC SEARCH HISTORY REPORT - DR. ANIL VERMA\nDEVICE ID: AV-Laptop-2023\nPERIOD: October 20-27, 2023\nSEARCH QUERIES:\n- 'Vipera Toxin-B symptoms'\n- 'undetectable poisons for injection'\n- 'rapid acting neurotoxins'\n- 'disposal of medical waste home'\n- 'private jet rentals east coast last minute'\n- 'abandoned warehouse locations district 7'\n- 'Project Nightingale John Doe contract clauses'",
      "position": { "x": 45, "y": -15 },
      "size": { "width": 41, "height": 49 },
      "rotation": -10
    },
    {
      "id": "doc_classified",
      "type": "document",
      "content": "CLASSIFIED DOCUMENT: OPERATION SHADOWFALL - PHASE 1\nSTATUS: Active\nCLASSIFICATION: TOP SECRET\nPROJECT LEAD: Dr. K. Evans\nDATE INITIATED: September 10, 2023\nOBJECTIVE: Development of advanced bio-agents for pharmaceutical applications, specifically targeting rapid cellular regeneration. Research involves synthesis of novel peptides and neurotoxins for controlled therapeutic use. John Doe was a key biochemist involved in early-stage synthesis protocols for Vipera Toxin-B derivatives. Project funding secured via undisclosed private investors.",
      "position": { "x": 100, "y": 100 },
      "size": { "width": 46, "height": 47 },
      "rotation": 6
    },
    {
      "id": "note_cryptic",
      "type": "note",
      "content": "Handwritten Note: 'The serpent's kiss reveals the betrayer. Nightingale sings in the dark. Follow the money trail to the shadow.'",
      "position": { "x": 110, "y": 70 },
      "size": { "width": 30, "height": 35 },
      "rotation": -13
    },
    {
      "id": "newspaper_1",
      "type": "newspaper",
      "content": "{\"headline\": \"Prominent Biochemist John Doe Found Deceased - Homicide Suspected\", \"date\": \"October 29, 2023\", \"body\": \"Local authorities have confirmed that John Doe, a well-known biochemist previously associated with several high-profile pharmaceutical projects, was found deceased in a remote industrial district late Friday night. While details remain scarce, sources close to the investigation indicate that foul play is suspected. A full autopsy is underway, and police are appealing for witnesses.\"}",
      "position": { "x": -18, "y": 20 },
      "size": { "width": 38, "height": 40 },
      "rotation": -5
    },
    {
      "id": "newspaper_2",
      "type": "newspaper",
      "content": "{\"headline\": \"Mystery Surrounds 'Project Nightingale' - Key Figure Dies\", \"date\": \"November 06, 2023\", \"body\": \"The death of biochemist John Doe has cast a long shadow over the clandestine 'Project Nightingale', a highly sensitive pharmaceutical research initiative. Insiders suggest Doe was a pivotal figure in the project, which reportedly involves cutting-edge neurotoxin research. Concerns are now being raised about the security of the research and the implications of Doe's untimely demise. No official comment has been made by project administrators.\"}",
      "position": { "x": 115, "y": 25 },
      "size": { "width": 39, "height": 42 },
      "rotation": 14
    }
  ],
  "connections": [
    { "from": "autopsy_doe", "to": "doc_verma_search" },
    { "from": "doc_verma_email", "to": "doc_verma_search" },
    { "from": "doc_classified", "to": "autopsy_doe" },
    { "from": "doc_classified", "to": "newspaper_2" },
    { "from": "photo_verma", "to": "doc_verma_witness" },
    { "from": "doc_verma_witness", "to": "doc_verma_search" },
    { "from": "transcript_verma", "to": "doc_verma_email" },
    { "from": "alibi_sharma_rohan", "to": "transcript_sharma_rohan" },
    { "from": "alibi_kholi", "to": "transcript_kholi" },
    { "from": "note_cryptic", "to": "doc_classified" }
  ],
  "objectives": [
    {
      "id": "obj_001",
      "description": "Identify the individual responsible for John Doe's murder."
    },
    {
      "id": "obj_002",
      "description": "Determine the motive behind the 'Operation Shadowfall' neurotoxin development."
    },
    {
      "id": "obj_003",
      "description": "Unravel the discrepancies in the suspects' alibis and testimonies."
    },
    {
      "id": "obj_004",
      "description": "Connect Dr. Anil Verma to the murder weapon and scene."
    }
  ]
};

const caseData = `
### **Case File: 734-Alpha ("The Ghost of Station Zero")**

**Primary Investigator:** [User's Name/ID]
**Case Status:** Cold. Crew presumed lost.
**Objective:** Analyze the recovered data logs from Station Zero to determine the cause of the "incident" and the fate of its six crew members.

### **The Core Narrative: The "Haunting"**

On October 31st, during a solar storm, Station Zero reported a series of inexplicable events. The crew experienced shared hallucinations, whispered voices over the comms, and fleeting apparitions on the station's periphery. The station's life support systems began to fail intermittently, and the crew's bio-monitors showed signs of extreme psychological distress. The final data transmission was a garbled, panicked message from Communications Officer Cass, mentioning a "ghost in the machine" before the station went dark. The prevailing theory at the time was a mass psychotic event induced by radiation, but the logs you are about to review may suggest something far more deliberate.

**The "Supernatural" Element (The Deception):** The station's experimental hydroponics bay, tended by REN, was cultivating a new strain of bioluminescent fungi, designated "Myco-Veridia." Unbeknownst to the crew, when this fungus is exposed to a specific combination of radiation (from the solar storm) and a unique frequency emitted by the station's communication array, it releases a potent hallucinogenic neurotoxin into the air recycling system. This toxin is what caused the shared hallucinations and the feeling of a supernatural presence. The "ghosts" were nothing more than products of their own terrified minds, amplified by the station's failing systems.

**The Murder (The Reality):** Amidst the chaos of the "haunting," one crew member used the confusion as a cover to sabotage the station and eliminate the rest of the crew. The motive was not supernatural, but deeply personal and rooted in a secret held by one of the crew. The death was not a singular event but a slow, calculated process of letting the station's systems fail while the crew was too disoriented to notice until it was too late.

### **The Characters and Their Secrets**

*   **JAX (The Engineer):** The workhorse of the station, Jax was secretly in love with Ren. He was growing increasingly concerned about her obsession with the Myco-Veridia and believed she was pushing herself too hard. He has a history of minor infractions for overriding safety protocols to "get the job done faster."
*   **REN (The Botanist):** Passionate and brilliant, Ren was under immense pressure from the corporation funding the station to produce results from her research. She had discovered the hallucinogenic properties of the fungi but kept it a secret, hoping to study and control it, seeing it as a potential breakthrough in psychological treatment.
*   -   **CASS (The Communications Officer):** Calm and collected, Cass was the station's information hub. She was also an undercover corporate auditor, sent to ensure the mission was on track and to report any "unnecessary risks." She was growing suspicious of Ren's secrecy.
*   **KAI (The Medic):** The crew's confidant, Kai was a compassionate and empathetic presence. He was treating several crew members for anxiety and sleep deprivation, including Zane, who was having recurring nightmares. Kai was also the first to notice the subtle cognitive decline in the crew.
*   **ELARA (The Pilot):** A sharp and ambitious pilot, Elara was laser-focused on her career. She saw Station Zero as a stepping stone to a command position on the first mission to Mars. She had a rivalry with Zane, viewing him as reckless and unprofessional.
*   **ZANE (The Crew Member on Break / The Victim):** Seemingly relaxed and easy-going, Zane was actually a disgraced ex-pilot who had been involved in a fatal training accident years ago. Elara was the only other person on the station who knew the full story, as her former mentor was the one who died in the accident. Zane was on this mission as a form of penance, a last chance to prove himself.

### **The Evidence Files**

Here is a series of data logs and evidence that you, the investigator, will piece together.

**File #1: Audio Log - CASS 10.30.XXXX**
*   **Transcript:** "Station log, Cass speaking. We're getting hit with some serious interference from this solar storm. The comms are full of static... whispers. It's unsettling. Jax says it's just 'crossed wires,' but it sounds... organic. Almost like voices. I've logged a formal request for a full diagnostic."

**File #2: CCTV Still - Hydroponics Bay - 10.31.XXXX 02:13 GMT**
*   **Description:** The image is dark, lit only by the eerie green glow of the Myco-Veridia. Ren is visible, her back to the camera, working on a control panel. In the reflection of the glass, for a split second, a distorted, elongated face seems to be looking over her shoulder. *This is a key piece of "supernatural" evidence.*

**File #3: Medical Log - KAI 10.31.XXXX**
*   **Entry:** "Zane came to me again last night. Severe paranoia. Says he keeps seeing 'shadows' out of the corner of his eye. He's convinced the station is haunted. I've prescribed a sedative, but his vitals are erratic. I'm concerned about the cumulative stress on the crew. I've noticed a tremor in my own hands."

**File #4: Encrypted Email - From CASS to Corporate HQ (Undelivered)**
*   **Subject:** URGENT: Anomaly in Project Veridia
*   **Body:** "Ren's research has taken an unauthorized turn. The fungal spores are exhibiting unexpected psychoactive properties. My preliminary analysis suggests she has been aware of this for some time. This is a direct violation of protocol. Requesting immediate intervention. The crew is not safe."

**File #5: Engineering Log - JAX 10.31.XXXX**
*   **Entry:** "Life support is on the fritz. The CO2 scrubbers are failing intermittently. Every time I think I've fixed it, the system glitches again. It's not a hardware issue. It's like something is rewriting the code as I work. And this damn headache won't go away."

**File #6: Audio Log - Black Box Recording - Cockpit 10.31.XXXX (FINAL TRANSMISSION)**
*   **Transcript:**
    *   **ELARA:** (Shouting) "The nav-system is gone! I'm flying blind!"
    *   **ZANE:** (Static, strained) "...not the storm... it's her..."
    *   **CASS:** (Panicked) "Mayday, Mayday! Station Zero... there's a ghost in the machine! It's in the walls! It's—"
    *   *(A loud, metallic screech, followed by silence)*

### **The Twist and the Truth**

**The Red Herring:** The evidence points to Ren as the likely culprit. Her secret research, the hallucinogenic fungi, and Zane's cryptic final words ("it's her") seem to frame her perfectly. It would appear she lost control of her experiment, leading to the crew's demise.

**The Real Killer: ELARA**

*   **Motive:** Elara's career was everything. She discovered Zane was on board and knew he was a black mark on her record by association. The "haunting" provided the perfect opportunity. She saw a way to eliminate Zane and create a narrative that would paint her as the sole, heroic survivor of a tragic, unexplainable event.
*   **The How:**
    1.  **Amplifying the "Haunting":** Elara used her access as a pilot to subtly manipulate the station's communication frequency, increasing the potency of the neurotoxin being released by Ren's fungi. She wanted the crew disoriented and paranoid.
    2.  **The Sabotage:** While the crew was hallucinating, Elara used her intimate knowledge of the station's systems to sabotage life support and the navigation systems from the cockpit. She made it look like the station itself was failing.
    3.  **Framing Ren:** Elara knew about Cass's suspicions of Ren. She planted a corrupted data file on Ren's personal terminal that made it look like Ren was maliciously releasing the toxin.
    4.  **Zane's Final Words:** Zane wasn't referring to Ren. He had started to piece together that the system failures were too precise for a random event and that they all originated from the cockpit. He was trying to warn Cass about Elara before she cut the comms.
    5.  **The Escape:** Elara's plan was to use the station's only emergency escape pod, claiming the rest of the crew had succumbed to the "madness." However, her sabotage was too effective, and a power surge she initiated to cover her tracks fried the pod's launch system, trapping her on the dying station with the rest of the crew.

The player, as the investigator, must connect the dots: the comms frequency manipulation, the origin of the system failures in the cockpit, and the rivalry between Elara and Zane, to see past the supernatural smokescreen and expose the cold, calculated murder that lies beneath.
`;

// Shared schema definitions (can be extracted later)
const boardItemSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    type: {
      type: Type.STRING,
      enum: [
        'photo',
        'document',
        'note',
        'folder-tab',
        'autopsy-report',
        'formal-alibi',
        'interrogation-transcript',
        'newspaper',
        'clue',
      ],
    },
    content: { type: Type.STRING },
    position: {
      type: Type.OBJECT,
      properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } },
      required: ['x', 'y'],
    },
    size: {
      type: Type.OBJECT,
      properties: { width: { type: Type.NUMBER }, height: { type: Type.NUMBER } },
      required: ['width', 'height'],
    },
    rotation: { type: Type.NUMBER },
  },
  required: ['id', 'type', 'content', 'position', 'size', 'rotation'],
};

const boardSchema = {
  type: Type.OBJECT,
  properties: {
    items: { type: Type.ARRAY, items: boardItemSchema },
    connections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { from: { type: Type.STRING }, to: { type: Type.STRING } },
        required: ['from', 'to'],
      },
    },
    objectives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { id: { type: Type.STRING }, description: { type: Type.STRING } },
        required: ['id', 'description'],
      },
    },
  },
  required: ['items', 'connections', 'objectives'],
};

/**
 * POST /api/board/generate
 * Request Body (JSON): { "case": "station-zero" }
 * or Query Param: /api/board/generate?case=station-zero
 * Returns a mock evidence board for the requested case slug.
 * Supported slugs:
 *  - station-zero (deep space sabotage scenario)
 *  - operation-shadowfall (John Doe neurotoxin homicide; legacy mock)
 *  - default / any other valid cold case slug -> currently returns the Shadowfall mock until bespoke data added.
 */

export async function POST(req: Request) {
  if (!process.env.API_KEY) {
    return NextResponse.json({ error: 'Missing API_KEY on server' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: `Generate a JSON for an evidence board about the following case data:

//       ## Case Data:
// ${caseData}

// ***

// ## Requirements:
// Create evidence for the above case including:
// 2.  Create five items of type 'formal-alibi', one for each of the five suspects listed above. The content should be a plausible, formal alibi statement for each person.
// 3.  Create five items of type 'interrogation-transcript', one for each suspect. The content must be a tense, revealing interview snippet. It MUST begin with two lines: 'INTERVIEW DATE: [Month Day, YYYY]' and 'SUBJECT: [Suspect Name]'.
// 4.  Create one item of type 'autopsy-report' with detailed, multi-section content for a victim named John Doe.
// 6.  Include 1-2 other items like classified documents or handwritten notes.
// 7.  Do not include any maps.
// 8.  Create 2 newspaper items with stringified JSON (headline, date, body).
// 9.  Create 7-8 connections linking evidence logically.
// 10. Spread positions (x,y between -20 and 120) for wide exploration.
// 11. Create 3-4 objectives with unique id + description.`,
//       config: { responseMimeType: 'application/json', responseSchema: boardSchema },
//     });

    // Guard against undefined or empty model response text
    // const raw = response.text?.trim();
    // if (!raw) {
    //   return NextResponse.json({ error: 'Empty response from model' }, { status: 502 });
    // }
    // Determine requested case slug from body or query param.
    let caseSlug: string | undefined;
    // Try body first
    try {
      // referer: 'http://localhost:3000/play/her-shadows-name'
      const referer = req.headers?.get?.('referer') ?? req.headers?.get?.('referrer');
      caseSlug = referer ? String(referer).split('/play/')[1]?.trim() : undefined;
    } catch {/* ignore body parse errors */}

    console.log('caseSlug from body:', caseSlug);
    // Fallback to query param
    if (!caseSlug) {
      const url = new URL(req.url);
      const qp = url.searchParams.get('case');
      if (qp) caseSlug = qp.trim();
    }

    if (!caseSlug) {
      return NextResponse.json({ error: 'Missing case slug. Provide { "case": "station-zero" } in body or ?case=station-zero.' }, { status: 400 });
    }

    // Special handling for station-zero (reuse rich evidence defined in coldCases data file).
    if (caseSlug === 'station-zero') {
      const station = getCaseBySlug('station-zero');
      const stationBoard = (station?.evidence && 'items' in station.evidence) ? station.evidence : undefined;
      if (!stationBoard) {
        return NextResponse.json({ error: 'Board data not available for station-zero.' }, { status: 404 });
      }
      return NextResponse.json(stationBoard);
    }

    if(caseSlug === 'her-shadows-name') {
      const board = getCaseBySlug('her-shadows-name');
      const boardData = (board?.evidence && 'items' in board.evidence) ? board.evidence : undefined;
      if (!boardData) {
        return NextResponse.json({ error: 'Board data not available for her_shadows_name.' }, { status: 404 });
      }
      return NextResponse.json(boardData);
    }
    if( caseSlug === 'palazzo-of-bones') {
      const board = getCaseBySlug('palazzo-of-bones');
      const boardData = (board?.evidence && 'items' in board.evidence) ? board.evidence : undefined;
      if (!boardData) {
        return NextResponse.json({ error: 'Board data not available for the-last-witch.' }, { status: 404 });
      }
      return NextResponse.json(boardData);
    }
    if( caseSlug === 'zero-sum') {
      const board = getCaseBySlug('zero-sum');
      const boardData = (board?.evidence && 'items' in board.evidence) ? board.evidence : undefined;
      if (!boardData) {
        return NextResponse.json({ error: 'Board data not available for the-last-witch.' }, { status: 404 });
      }
      return NextResponse.json(boardData);
    }

    // Legacy homicide board for operation-shadowfall / john-doe scenario.
    if (caseSlug === 'operation-shadowfall' || caseSlug === 'john-doe') {
      return NextResponse.json(mockData);
    }

    // If the slug matches another cold case, return placeholder (currently Shadowfall mock until bespoke data is authored).
    const existing = getCaseBySlug(caseSlug);
    if (existing) {
      return NextResponse.json({
        warning: 'No bespoke board yet for this case; returning default mock.',
        ...mockData,
      });
    }

    // Unknown slug entirely.
    return NextResponse.json({ error: `Unknown case slug '${caseSlug}'.` }, { status: 404 });
  } catch (err) {
    console.error('Board generation failed', err);
    return NextResponse.json({ error: 'Failed to generate board' }, { status: 500 });
  }
}
