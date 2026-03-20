import { connection } from "next/server";
import { connect } from "node:http2";

const PREDEFINED_IMAGES = {
  TLCI_Eleanor_portrait: "/cold_case_data/the_last_check_in/eleanor.png",
  TLCI_Arthur_portrait: "/cold_case_data/the_last_check_in/arthur.png",
  TLCI_Chloe_portrait: "/cold_case_data/the_last_check_in/chloe.png",
  TLCI_Dr_Harrison_portrait:
    "/cold_case_data/the_last_check_in/dr_harrison.png",
  TLCI_Lenny_portrait: "/cold_case_data/the_last_check_in/lenny.png",
  TLCI_Maya_portrait: "/cold_case_data/the_last_check_in/maya.png",
  TLCI_Richard_portrait: "/cold_case_data/the_last_check_in/richard.png",
  TLCI_Roxy_portrait: "/cold_case_data/the_last_check_in/roxy.png",
  TLCI_Samir_portrait: "/cold_case_data/the_last_check_in/samir.png",
  TLCI_Crimson_hotel: "/cold_case_data/the_last_check_in/crimson_hotel.png",
  TLCI_Evidence_board:
    "/cold_case_data/the_last_check_in/Whisk_3ef3e0a2bebb62ca30a40204ce5bb830dr.png",
};

const THE_LAST_CHECK_IN_DATA = {
  items: [
    {
      id: "briefing_the_last_check_in",
      type: "case-briefing",
      title: "Case Briefing: The Last Check-In",
      content: JSON.stringify({
        department: "HOMICIDE DIVISION",
        bureau: "Major Crimes Unit",
        date: "April 14, 2026",
        to: "Lead Detective",
        from: "Captain Marcus",
        subject: "Investigation into the Crimson Motel Murders",
        classification: "CONFIDENTIAL // EYES ONLY",
        body: `Detective,

You are assigned to the most twisted case we have seen in years. Thirty days ago, a strict health lockdown forced nine people to stay at the cheap Crimson Motel. No one was allowed to leave. 

Yesterday, the lockdown finally ended. When our officers opened the front doors, only five people walked out alive.

We found four dead bodies locked inside their motel rooms. At first, the five survivors claimed the victims died from a bad virus. They said they stayed away from the sick rooms to stay safe. But our medical team just checked the bodies. They did not die from a sickness. They were murdered. 

The killer is one of the five people sitting in our police station right now. 

To make things worse, a large duffel bag full of cash is missing from one of the victim's rooms. The survivors are all blaming each other. They are all lying, and they all have dark secrets to hide.

We have secured the following evidence for your review:
- Check-in photos taken by the motel manager.
- Police interviews with all five survivors.
- A map of the motel rooms.
- Crime scene details and medical reports.

Your goal is to find the truth. You must figure out who stole the cash and who killed those four people. 

Do not trust anyone. They had a whole month to get their stories straight.`,
      }),
      position: { x: 50, y: 40 },
      size: { width: 220, height: 280 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "eleanor_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Eleanor", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Eleanor_portrait,
      position: { x: 15, y: -5 },
      size: { width: 340, height: 220 },
      rotation: -2,
    },
    {
      id: "arthur_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Arthur", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Arthur_portrait,
      position: { x: 30, y: -40 },
      size: { width: 340, height: 220 },
      rotation: 2,
    },
    {
      id: "chloe_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Chloe", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Chloe_portrait,
      position: { x: 30, y: 95 },
      size: { width: 340, height: 220 },
      rotation: -1,
    },
    {
      id: "dr_harrison_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Dr. Harrison", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Dr_Harrison_portrait,
      position: { x: 75, y: -5 },
      size: { width: 340, height: 220 },
      rotation: 3,
    },
    {
      id: "samir_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Samir", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Samir_portrait,
      position: { x: 45, y: -5 },
      size: { width: 340, height: 220 },
      rotation: -1,
    },
    {
      id: "lenny_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Lenny", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Lenny_portrait,
      position: { x: 15, y: 55 },
      size: { width: 340, height: 220 },
      rotation: -3,
    },
    {
      id: "maya_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Maya", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Maya_portrait,

      position: { x: 60, y: -40 },
      size: { width: 340, height: 220 },
      rotation: 1,
    },
    {
      id: "richard_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Richard", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Richard_portrait,
      position: { x: 60, y: 95 },
      size: { width: 340, height: 220 },
      rotation: -2,
    },
    {
      id: "roxy_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Roxy", variant: "overlay" }),
      imageUrl: PREDEFINED_IMAGES.TLCI_Roxy_portrait,
      position: { x: 75, y: 55 },
      size: { width: 340, height: 220 },
      rotation: 2,
    },

    {
      id: "log_crimson_hotel_checkins",
      type: "activity-log",
      title: "Crimson Hotel Guest Registry",
      content: JSON.stringify({
        title: "Front Desk Guest Registry",
        previewLabel: "Guest Log",
        location: "THE CRIMSON HOTEL - LOBBY DESK",
        date: "APRIL 14, 2026",
        operator: "Arthur Pendelton (Manager)",
        caseRef: "CASE-CRIMSON-2026",
        variant: "handwritten",
        columnOrder: ["checkIn", "name", "checkOut", "room"],
        columnLayout: {
          checkIn: "w-28",
          name: "flex-1",
          checkOut: "w-28",
          room: "w-16",
        },
        headers: {
          checkIn: "Check-In",
          name: "Guest Name",
          checkOut: "Check-Out",
          room: "Room",
        },
        entries: [
          // Early week arrivals + a random guest
          {
            checkIn: "Mar 09, 14:00",
            name: "Lenny B.",
            checkOut: "PENDING",
            room: "101",
          },
          {
            checkIn: "Mar 09, 16:30",
            name: "John Smith",
            checkOut: "Mar 11, 09:15",
            room: "108",
          },
          {
            checkIn: "Mar 10, 15:45",
            name: "Roxy D.",
            checkOut: "PENDING",
            room: "102",
          },
          // Mid-week arrivals and randoms
          {
            checkIn: "Mar 11, 11:00",
            name: "Alice Wong",
            checkOut: "Mar 13, 08:30",
            room: "109",
          },
          {
            checkIn: "Mar 11, 21:15",
            name: "Dr. Harrison",
            checkOut: "PENDING",
            room: "103",
          },
          {
            checkIn: "Mar 12, 23:50",
            name: "Samir T.",
            checkOut: "PENDING",
            room: "106",
          },
          // The weekend before the lockdown
          {
            checkIn: "Mar 13, 13:20",
            name: "Mark Davis",
            checkOut: "Mar 14, 10:00",
            room: "110",
          },
          {
            checkIn: "Mar 13, 19:10",
            name: "Richard & Eleanor V.", // The wealthy couple checking in together
            checkOut: "PENDING",
            room: "104",
          },
          {
            checkIn: "Mar 14, 15:00",
            name: "The Miller Family",
            checkOut: "Mar 15, 07:45", // Escaped just in time!
            room: "108",
          },
          {
            checkIn: "Mar 14, 22:30",
            name: "Chloe S.",
            checkOut: "PENDING",
            room: "105",
          },
          // The final guest just hours before the lockdown
          {
            checkIn: "Mar 15, 14:15",
            name: "Maya K.",
            checkOut: "PENDING",
            room: "107",
          },
          // The Manager's note when the police sealed the doors
          {
            checkIn: "Mar 15, 18:00",
            name: "*** SYSTEM LOCKDOWN ***",
            checkOut: "N/A",
            room: "ALL",
          },
        ],
      }),
      position: { x: 110, y: -40 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "map_crimson_hotel_blueprint",
      type: "map",
      title: "Crimson Hotel Police Schematic",
      content: JSON.stringify({
        title: "Crimson Hotel Floor Plan & POI",
        region: "CRIMSON - CASE FILE 7B-822",
        date: "1998",
        imageUrl: PREDEFINED_IMAGES.TLCI_Crimson_hotel,
        scale: "1:7,500",
        markers: [
          {
            id: "front_desk",
            showLabel: true,
            x: 32,
            y: 47,
            label: "Front Desk",
            type: "landmark",
            description:
              "Where guests checked in and out. CCTV cameras monitored the lobby from here.",
          },
          {
            id: "lobby",
            showLabel: true,
            x: 40,
            y: 45,
            label: "Lobby",
            type: "landmark",
            description: "Has the master key vault and CCTV monitors.",
          },
          {
            id: "office",
            showLabel: true,
            x: 33,
            y: 70,
            label: "Manager's Suite",
            type: "landmark",
            description:
              "Arthur's living quarters. Hidden crawlspace access found here.",
          },
          {
            id: "ground_floor_washroom",
            x: 33,
            y: 55,
            label: "Ground floor washroom",
            type: "landmark",
            description: "Ground floor common washroom.",
          },
          {
            id: "room_101",
            showLabel: true,
            x: 42,
            y: 62.5,
            label: "101",
            type: "incident",
            description:
              "Room 101 Victim 1. Suffocated in sleep. Door sealed with duct tape.",
          },
          {
            id: "room_102",
            showLabel: true,
            x: 42,
            y: 70,
            label: "102",
            type: "incident",
            description:
              "Victim 4. Drowned in bathtub. Door deadbolted from inside.",
          },
          {
            id: "room_103",
            showLabel: true,
            x: 42,
            y: 81,
            label: "103",
            description:
              "Used as a makeshift clinic. Contains stolen medical supplies.",
          },
          {
            id: "room_104",
            showLabel: true,
            x: 58,
            y: 42.5,
            label: "104",
            type: "incident",
            description:
              "Victim 2. Poisoned. Eleanor abandoned the room after he 'got sick'.",
          },
          {
            id: "utilities_room",
            x: 58,
            y: 51.5,
            label: "Utilities Room",
            type: "landmark",
            description:
              "Contains the water heater and electrical panels. No guest access.",
          },
          {
            id: "laundry_room",
            x: 58,
            y: 58,
            label: "Laundry Room",
            type: "landmark",
            description: "Contains the washing machines and dryers.",
          },
          {
            id: "room_105",
            showLabel: true,
            x: 58,
            y: 68,
            label: "105",
            type: "incident",
            description: "Victim 3. Neck snapped. Missing duffel bag of cash.",
          },
          {
            id: "room_106",
            showLabel: true,
            x: 58,
            y: 80,
            label: "106",
            type: "incident",
            description: "Victim 3. Neck snapped. Missing duffel bag of cash.",
          },
          {
            id: "room_107",
            showLabel: true,
            x: 67,
            y: 42.5,
            label: "107",
            type: "incident",
            description:
              "Victim 2. Poisoned. Eleanor abandoned the room after he 'got sick'.",
          },

          {
            id: "room_108",
            showLabel: true,
            x: 67,
            y: 68,
            label: "108",
            type: "incident",
            description: "Victim 3. Neck snapped. Missing duffel bag of cash.",
          },
          {
            id: "room_109",
            showLabel: true,
            x: 67,
            y: 80,
            label: "106",
            type: "incident",
            description: "Victim 3. Neck snapped. Missing duffel bag of cash.",
          },
          {
            id: "room_110",
            showLabel: true,
            x: 67,
            y: 58,
            label: "110",
            type: "landmark",
            description: "Common washroom of second floor.",
          },
        ],
      }),
      position: { x: 110, y: 55 },
      size: { width: 300, height: 450 },
      rotation: 0,
      packIn: ["evidence"],
    },
    {
      id: "news_chronicle_2026_04_15",
      type: "newspaper",
      title: "The Chronicle: House of Horrors",
      content: JSON.stringify({
        publication: "The Daily Chronicle (State Edition)",
        headline:
          "HOUSE OF HORRORS: LOCKDOWN LIFTS TO MASSACRE AT CRIMSON HOTEL",
        subheadline:
          "Four found dead as a month-long viral quarantine ends. Authorities confirm victims did not die of illness, but were systematically murdered. Five surviving guests are now detained on-site as prime suspects.",
        dateline: "HIGHWAY 9",
        date: "Wednesday, April 15, 2026",
        author: "Elena Rostova",
        authorRole: "Lead Crime Correspondent",
        hasPhoto: true,
        imageCaption:
          "Crime scene tape surrounds the Crimson Hotel on Highway 9. The five surviving guests have been ordered to remain quarantined on the premises while homicide detectives sweep the building.",
        body: `What was supposed to be a strict but routine 30-day health lockdown has ended in unimaginable tragedy. When health officials and state police finally broke the quarantine seal on the roadside Crimson Hotel yesterday morning, they expected to find frustrated, hungry guests. Instead, they walked into a slaughterhouse.

Four individuals were discovered dead, their bodies rotting inside sealed motel rooms. The deceased have been identified as 30-year-old Lenny B., wealthy businessman Richard V., 19-year-old runaway Chloe S., and 50-year-old former actress Roxy D. 

Initially, the five surviving guests claimed the victims had succumbed to the severe viral outbreak, stating they had isolated the sick individuals in their rooms to prevent the illness from spreading. However, that chilling cover story collapsed within minutes of authorities arriving. 

Medical examiners on the scene quickly determined that the deaths were not viral. Preliminary reports indicate signs of suffocation, poisoning, blunt force trauma, and drowning. The bodies have been heavily wrapped and moved to the county morgue for full autopsies to determine exact causes and times of death.

Now, a terrifying reality has set in: a cold-blooded killer used the panic of the virus as the perfect cover for a month-long killing spree. 

Because the killer is undoubtedly one of the five survivors, police have taken extreme measures. The five remaining individuals—motel manager Arthur Pendelton, widow Eleanor V., stranded student Maya K., former surgeon Dr. Harrison, and commercial trucker Samir T.—have been designated as prime suspects. Citing ongoing health protocols and flight risks, a judge has ordered all five to remain quarantined at the motel under heavy, 24-hour armed police guard.

"It is a literal locked-room nightmare," one anonymous investigator told The Chronicle. "They were trapped in there for thirty days. No phones, no power, no way out. The killer is sitting right there in the lobby, pointing fingers at everyone else."

Adding to the mystery, rumors are swirling about a large sum of missing cash linked to one of the victims, suggesting these were not just crimes of cabin fever, but of calculated greed. 

As forensics teams continue to tear the Crimson Hotel apart looking for the murder weapons, the public is left with a deeply unsettling question: What really happened in the dark during those 30 days?`,
      }),
      position: { x: 110, y: 0 },
      size: { width: 400, height: 380 },
      rotation: -2,
      packIn: ["evidence"],
    },

    {
      id: "doc_autopsy_lenny",
      type: "autopsy-report",
      title: "Autopsy Report: LENNY B.",
      content: JSON.stringify({
        caseNumber: "CR-2026-001",
        victimName: "Leonard Barnes",
        sex: "Male",
        age: "34",
        race: "Caucasian",
        weight: "78 kg",
        height: "175 cm",

        description:
          "Subject was discovered in Room 101, lying supine on the bed. The room door had been sealed from the outside with heavy-duty duct tape. Due to the month-long lockdown, the body is in an advanced state of decomposition. Survivors claimed he was the first to die from the virus.",

        externalInjuries:
          "Pronounced petechial hemorrhaging (burst blood vessels) in the eyes and inside the eyelids. Faint, irregular bruising around the nose and mouth. No defensive wounds found on the hands or arms.",

        internalInjuries:
          "Examination of the lungs reveals absolutely no presence of severe viral infection or pneumonia. Tissue damage is strictly consistent with sudden oxygen deprivation.",

        causeOfDeath:
          "Asphyxiation due to smothering (likely with a soft object, such as a pillow).",
        mannerOfDeath: "Homicide",

        investigatingOfficer: "Det. Marcus Thorne, Major Crimes Unit",
        recordingOfficer: "Officer H. Davis",
        date: "April 15, 2026",
        time: "09:00 AM",
        coroner: "Dr. Gregory Vance",
        policeStation: "County Medical Examiner's Office",
      }),
      position: { x: 10, y: 105 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },

    {
      id: "doc_autopsy_richard",
      type: "autopsy-report",
      title: "Autopsy Report: RICHARD V.",
      content: JSON.stringify({
        caseNumber: "CR-2026-002",
        victimName: "Richard Vance",
        sex: "Male",
        age: "46",
        race: "Caucasian",
        weight: "92 kg",
        height: "180 cm",

        description:
          "Subject was discovered on the floor of Room 104 near an overturned chair. An empty scotch glass was found on the nightstand. The room was locked from the outside. Survivors assumed he suffered a fever-induced heart attack.",

        externalInjuries:
          "Dried foam and minor traces of blood present around the lips and chin. No signs of blunt force trauma or a physical struggle.",

        internalInjuries:
          "Massive chemical burns and severe necrosis (tissue death) found along the esophagus and stomach lining. TOXICOLOGY: Blood tests indicate a lethal concentration of sodium hypochlorite (industrial laundry bleach) mixed with high-proof alcohol.",

        causeOfDeath:
          "Internal hemorrhaging and organ failure due to ingestion of a toxic chemical agent.",
        mannerOfDeath: "Homicide",

        investigatingOfficer: "Det. Marcus Thorne, Major Crimes Unit",
        recordingOfficer: "Officer H. Davis",
        date: "April 15, 2026",
        time: "11:15 AM",
        coroner: "Dr. Gregory Vance",
        policeStation: "County Medical Examiner's Office",
      }),
      position: { x: 64, y: 140 },
      size: { width: 220, height: 280 },
      rotation: 2,
      packIn: ["evidence"],
    },

    {
      id: "doc_autopsy_chloe",
      type: "autopsy-report",
      title: "Autopsy Report: CHLOE S.",
      content: JSON.stringify({
        caseNumber: "CR-2026-003",
        victimName: "Chloe Summers",
        sex: "Female",
        age: "19",
        race: "Caucasian",
        weight: "54 kg",
        height: "162 cm",

        description:
          "Subject was discovered in Room 105, partially hidden between the bed and the wall. The room showed signs of a brief struggle, with a lamp knocked over. Survivors claimed she self-isolated out of fear and never came out.",

        externalInjuries:
          "A deep contusion on the back of the skull, consistent with being struck from behind by a heavy, blunt cylindrical object. Severe, dark bruising present on the left and right sides of the neck.",

        internalInjuries:
          "Complete fracture of the C1 and C2 cervical vertebrae. The spinal cord was entirely severed. No viral markers found in the bloodstream.",

        causeOfDeath:
          "Cervical spine fracture (manual neck snapping) preceded by blunt force head trauma.",
        mannerOfDeath: "Homicide",

        investigatingOfficer: "Det. Marcus Thorne, Major Crimes Unit",
        recordingOfficer: "Officer H. Davis",
        date: "April 15, 2026",
        time: "14:30 PM",
        coroner: "Dr. Gregory Vance",
        policeStation: "County Medical Examiner's Office",
      }),
      position: { x: 35, y: 140 },
      size: { width: 220, height: 280 },
      rotation: -2,
      packIn: ["evidence"],
    },

    {
      id: "doc_autopsy_roxy",
      type: "autopsy-report",
      title: "Autopsy Report: ROXY D.",
      content: JSON.stringify({
        caseNumber: "CR-2026-004",
        victimName: "Roxanne Dupree",
        sex: "Female",
        age: "52",
        race: "Caucasian",
        weight: "61 kg",
        height: "168 cm",

        description:
          "Subject was found fully clothed in a vintage gown, submerged in the bathtub of Room 102. The room's deadbolt was engaged from the inside, requiring police to break the door down. Two empty wine glasses were on the bathroom counter.",

        externalInjuries:
          "Extreme skin maceration (waterlogging) due to prolonged exposure to bathwater. Faint, finger-shaped bruising on the upper shoulders and wrists, suggesting the subject was forcefully held underwater.",

        internalInjuries:
          "Lungs are heavy, expanded, and filled with tap water matching the tub's contents. TOXICOLOGY: Blood Alcohol Content (BAC) was 0.18%, indicating heavy intoxication at the time of death.",

        causeOfDeath: "Asphyxiation due to forced drowning.",
        mannerOfDeath: "Homicide",

        investigatingOfficer: "Det. Marcus Thorne, Major Crimes Unit",
        recordingOfficer: "Officer H. Davis",
        date: "April 15, 2026",
        time: "16:45 PM",
        coroner: "Dr. Gregory Vance",
        policeStation: "County Medical Examiner's Office",
      }),
      position: { x: 90, y: 105 },
      size: { width: 220, height: 280 },
      rotation: 1,
      packIn: ["evidence"],
    },
    {
      id: "doc_poi_arthur_pendelton",
      type: "person-of-interest-report",
      title: "POI Report: Arthur Pendelton",
      content: JSON.stringify({
        lastName: "Pendelton",
        firstName: "Arthur",
        middleName: "Eugene",
        alias: "Artie",
        address: "Crimson Hotel, Manager's Suite (Room 100), Highway 9",
        city: "Oakhaven",
        state: "TX",
        zipCode: "78006",
        phone: "555-019-2834",
        dob: "11/14/1963",
        age: "62",
        sex: "Male",
        race: "Caucasian",
        height: "178 cm",
        weight: "85 kg",
        hair: "Receding, grey",
        eyes: "Hazel",
        scars: "Cigar burn scar on right forearm",
        occupation: "Motel Manager",
        employer: "Crimson Hotel LLC",
        arrests:
          "1998 - Petty Larceny (Charges dropped); 2004 - Price Gouging during a state emergency.",
        vehicles: [
          {
            year: "1992",
            make: "Ford",
            model: "Econoline Van",
            color: "Faded White",
            plate: "CRZ-9921",
          },
        ],
        statement:
          "I didn't check those rooms because I didn't want to die of some plague! If they wanted to lock themselves in and starve, that was their business. I stayed behind my desk where it was safe. I don't know anything about a bag of cash.",
        conclusion:
          "Highly Suspicious. Subject is the sole authorized holder of the motel's master keys, which explains how several victims were locked in their rooms from the outside. Financial records show the motel is bankrupt, giving him a clear motive to steal the missing duffel bag of cash. He had full access to the CCTV monitors and was actively extorting guests for basic food rations. Investigators find it highly improbable that he was completely unaware of four decomposing bodies on his own property.",
        narrativeDate: "April 15, 2026",
        narrativeTime: "10:30 AM",
        caseNumber: "CR-2026-000",
        policeStation: "Highway 9 Precinct, Major Crimes Unit",
        displayName: "Arthur Pendelton",
        referenceId: "POI-001",
      }),
      position: { x: 25, y: -90 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "doc_poi_samir_tariq",
      type: "person-of-interest-report",
      title: "POI Report: Samir Tariq",
      content: JSON.stringify({
        lastName: "Tariq",
        firstName: "Samir",
        middleName: "Farouk",
        alias: "Big Sam",
        address: "442 Westheimer Rd, Apt 4B",
        city: "Houston",
        state: "TX",
        zipCode: "77098",
        phone: "555-014-9923",
        dob: "08/22/1990",
        age: "35",
        sex: "Male",
        race: "Middle Eastern",
        height: "193 cm",
        weight: "115 kg",
        hair: "Black, thick beard",
        eyes: "Brown",
        scars: "Faint surgical scar on left knee",
        occupation: "Long-Haul Truck Driver",
        employer: "Independent Owner-Operator",
        arrests:
          "2018 - Commercial logbook violation; 2021 - Assault (Charges dropped)",
        vehicles: [
          {
            year: "2018",
            make: "Peterbilt",
            model: "389 Sleeper Cab",
            color: "Black",
            plate: "TX-LHAUL1",
          },
        ],
        statement:
          "Listen to me, I was just hauling produce. The refrigeration unit died when the power grid flickered in week two. That smell in the trailer? Just rotten meat, I swear to God. I didn't hurt anyone. I stayed in room 106, read my Quran, and prayed I wouldn't catch the sickness. I don't know anything about a snapped neck or missing money. You have to let me go, my family is waiting for me.",
        conclusion:
          "Subject is highly evasive and sweating profusely. A search of his 18-wheeler revealed a false bulkhead containing high-grade narcotics that were ruined due to the 30-day lockdown. Subject is now in massive debt to organized crime. He possesses the extreme physical strength required to snap Victim 3's (Chloe) neck. Subject is desperate to avoid both the police and his cartel employers, giving him a severe motive to steal the missing duffel bag of cash.",
        narrativeDate: "April 15, 2026",
        narrativeTime: "11:45 AM",
        caseNumber: "CR-2026-000",
        policeStation: "Highway 9 Precinct, Major Crimes Unit",
        displayName: "Samir Tariq",
        referenceId: "POI-002",
      }),
      position: { x: 50, y: -90 },
      size: { width: 220, height: 280 },
      rotation: 1,
      packIn: ["evidence"],
    },

    {
      id: "doc_poi_eleanor_vance",
      type: "person-of-interest-report",
      title: "POI Report: Eleanor Vance",
      content: JSON.stringify({
        lastName: "Vance",
        firstName: "Eleanor",
        middleName: "Beatrice",
        alias: "None",
        address: "12400 Bel Air Rd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90077",
        phone: "555-012-8841",
        dob: "04/05/1986",
        age: "40",
        sex: "Female",
        race: "Caucasian",
        height: "170 cm",
        weight: "58 kg",
        hair: "Blonde",
        eyes: "Blue",
        scars: "None",
        occupation: "Philanthropist / Socialite",
        employer: "Vance Family Trust",
        arrests: "None",
        vehicles: [
          {
            year: "2025",
            make: "Mercedes-Benz",
            model: "Maybach GLS",
            color: "Silver",
            plate: "VANCE-1", // Note: This vehicle was impounded prior to their arrival at the motel.
          },
        ],
        statement:
          "This is an absolute outrage. I have been locked in a squalid, mold-infested cell for a month, and now you are treating me like a criminal! I want my lawyers on the phone immediately. Richard? Richard drank himself to death because he was weak, not because of a virus, and certainly not because of me. Am I supposed to weep for a man who dragged me into this hellhole? Do not speak to me again until my legal counsel arrives.",
        conclusion:
          "Subject is extremely hostile, entitled, and uncooperative. Showed absolutely zero remorse or grief upon learning her husband (Victim 2) had been poisoned. Subject moved to a separate room (109) mere days before her husband's murder, providing her with a convenient excuse to not check on him. Financial background checks reveal Richard Vance filed for hidden bankruptcy just before the trip, but held a newly updated $5 million life insurance policy payable directly to the subject.",
        narrativeDate: "April 15, 2026",
        narrativeTime: "13:10 PM",
        caseNumber: "CR-2026-000",
        policeStation: "Highway 9 Precinct, Major Crimes Unit",
        displayName: "Eleanor Vance",
        referenceId: "POI-003",
      }),
      position: { x: 5, y: -70 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "doc_poi_elias_harrison",
      type: "person-of-interest-report",
      title: "POI Report: Elias Harrison",
      content: JSON.stringify({
        lastName: "Harrison",
        firstName: "Elias",
        middleName: "Julian",
        alias: "Dr. Harrison",
        address: "Transient / Unknown",
        city: "Seattle",
        state: "WA",
        zipCode: "98104",
        phone: "555-018-4472",
        dob: "10/30/1971",
        age: "54",
        sex: "Male",
        race: "Caucasian",
        height: "182 cm",
        weight: "79 kg",
        hair: "Greying, unkempt",
        eyes: "Grey",
        scars: "None",
        occupation: "Disgraced Surgeon (License Revoked)",
        employer: "Unemployed",
        arrests:
          "2023 - Medical Malpractice; 2024 - Theft of Schedule II Narcotics, Prescription Fraud.",
        vehicles: [
          {
            year: "2015",
            make: "Lexus",
            model: "RX 350",
            color: "Charcoal",
            plate: "WA-MED19",
          },
        ],
        statement:
          "You are looking at the only reason these people are still alive. I took charge. When people started showing symptoms, I established strict quarantine protocols. I didn't examine the bodies closely because I lacked basic PPE, and touching a highly contagious corpse is suicide. If they were murdered, it happened behind closed doors. I am a man of medicine, Detective. I save lives, I don't end them.",
        conclusion:
          "PRIME SUSPECT. Subject possesses immense medical and anatomical knowledge. He is fully capable of snapping a C1/C2 vertebrae (Victim 3) and synthesizing the bleach-based poison used on Victim 2. Subject acted as the de facto authority on the 'virus,' deliberately preventing others from checking on the victims by diagnosing them as highly contagious. He effectively operated a month-long cover-up in plain sight. Given his disgraced status and severe financial ruin, the missing cash provides a strong motive.",
        narrativeDate: "April 15, 2026",
        narrativeTime: "14:45 PM",
        caseNumber: "CR-2026-000",
        policeStation: "Highway 9 Precinct, Major Crimes Unit",
        displayName: "Dr. Elias Harrison",
        referenceId: "POI-004",
      }),
      position: { x: 95, y: -70 },
      size: { width: 220, height: 280 },
      rotation: 2,
      packIn: ["evidence"],
    },

    {
      id: "doc_poi_maya_kendrick",
      type: "person-of-interest-report",
      title: "POI Report: Maya Kendrick",
      content: JSON.stringify({
        lastName: "Kendrick",
        firstName: "Maya",
        middleName: "Lynn",
        alias: "None",
        address: "712 College Ave, Dorm 4B",
        city: "Austin",
        state: "TX",
        zipCode: "78705",
        phone: "555-010-3312",
        dob: "02/18/2006",
        age: "20",
        sex: "Female",
        race: "Caucasian",
        height: "160 cm",
        weight: "52 kg",
        hair: "Brown, shoulder-length",
        eyes: "Green",
        scars:
          "Small scrape on left knuckles (Subject claims from fixing her car)",
        occupation: "University Student",
        employer: "Campus Bookstore",
        arrests:
          "Active Warrant (2026) - Grand Theft and Fleeing Jurisdiction (University Lab Equipment).",
        vehicles: [
          {
            year: "2010",
            make: "Honda",
            model: "Civic",
            color: "Faded Blue",
            plate: "TX-STU99",
          },
        ],
        statement:
          "I was so scared the whole time. Everyone was yelling, the food was running out, and people were dying of the virus right next door. Dr. Harrison said we couldn't go near the sick rooms, so I just stayed in Room 107 and locked my door. I heard some thumping a few nights, but I thought it was just the wind. I didn't kill anyone! I don't even know how to fight!",
        conclusion:
          "Subject is highly cooperative but visibly traumatized. Background check reveals an active warrant for theft, explaining why she was fleeing cross-country before her vehicle broke down. Physically, she is the weakest of the group, making it highly improbable that she could overpower Victim 3 (Chloe) or forcefully drown Victim 4 (Roxy). However, her room (107) sits directly above Victim 3's room, giving her a clear line of sight to the missing cash. Kept on suspect list due to flight risk, but considered a low-level threat.",
        narrativeDate: "April 15, 2026",
        narrativeTime: "16:00 PM",
        caseNumber: "CR-2026-000",
        policeStation: "Highway 9 Precinct, Major Crimes Unit",
        displayName: "Maya Kendrick",
        referenceId: "POI-005",
      }),
      position: { x: 75, y: -90 },
      size: { width: 220, height: 280 },
      rotation: -1,
      packIn: ["evidence"],
    },

    {
      id: "sms_samir_cartel_lockdown",
      type: "electronic-messages",
      title: "SMS Log: Samir Tariq & Dispatch",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump (Burner Phone)",
        caseRef: "SMS-SAM-106",
        participants: "Samir Tariq & 'Dispatch' (Unidentified)",
        messages:[
          {
            sender: "Samir",
            time: "Mar 13, 08:15",
            body: "Made it to Oakhaven. Stopped at the Crimson Hotel. State troopers are blocking the highway ahead. They are talking about a health quarantine.",
            isMe: true,
          },
          {
            sender: "Dispatch",
            time: "Mar 13, 08:20",
            body: "Park the rig in the back, out of sight. Keep the reefer (refrigeration) unit running. Do not let cops near the trailer.",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 15, 18:30",
            body: "They just sealed the motel doors. Military and police are outside. Nobody is allowed to leave for a month.",
            isMe: true,
          },
          {
            sender: "Dispatch",
            time: "Mar 15, 18:45",
            body: "Unacceptable. The buyer needs that product in one week. You find a way out, or we find your wife in Houston. Understand?",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 15, 18:50",
            body: "I can't break a military perimeter! There are guys with rifles outside! I am trying my best!",
            isMe: true,
          },
          {
            sender: "Samir",
            time: "Mar 19, 14:10",
            body: "Boss, the town power grid flickered. The motel lost power and my trailer's reefer unit died. It's warming up. The product is going to rot.",
            isMe: true,
          },
          {
            sender: "Dispatch",
            time: "Mar 19, 14:30",
            body: "You just cost us $250,000, Samir.",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 19, 14:32",
            body: "It wasn't my fault! The state cut the power! Please, you know I am good for it.",
            isMe: true,
          },
          {
            sender: "Dispatch",
            time: "Mar 19, 14:40",
            body: "I don't care about the state. You owe us a quarter million in cash. If you don't have it by the time those doors open, your kids are going to pay the balance.",
            isMe: false,
          },
        ],
      }),
      position: { x: -20, y: -40 },
      size: { width: 200, height: 250 },
      rotation: 2,
      packIn:["evidence"],
    },{
      id: "sms_samir_wife_lockdown",
      type: "electronic-messages",
      title: "SMS Log: Samir Tariq & Aisha",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump",
        caseRef: "SMS-SAM-106-B",
        participants: "Samir Tariq & Aisha Tariq",
        messages:[
          {
            sender: "Samir",
            time: "Mar 15, 19:10",
            body: "Aisha, I'm stuck at a place called the Crimson Hotel. The military sealed the roads for a health quarantine. I won't be home for a while.",
            isMe: true,
          },
          {
            sender: "Aisha",
            time: "Mar 15, 19:15",
            body: "What? For how long? Are you safe? What about the cargo?",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 19, 15:00", // Right after the cartel threatened him
            body: "Listen to me very carefully. Pack a bag for you and the kids right now. Go to your brother's house in San Antonio. Do not tell anyone where you are going.",
            isMe: true,
          },
          {
            sender: "Aisha",
            time: "Mar 19, 15:02",
            body: "Samir you are scaring me. What happened with the delivery? Who is coming?",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 19, 15:05",
            body: "The motel lost power. The cargo is ruined. They are going to come looking for you to make me pay. PLEASE LEAVE NOW. Throw your phone away after you read this.",
            isMe: true,
          },
          {
            sender: "Aisha",
            time: "Mar 20, 08:30",
            body: "We are safe at Tariq's house using his phone. The kids are crying. How much do we owe them?",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Mar 20, 08:45",
            body: "A quarter million. Stay hidden. I will fix this.",
            isMe: true,
          },
          {
            sender: "Samir",
            time: "Mar 26, 21:10",
            body: "People are getting sick here. They are locking themselves in their rooms. It's bad. But I noticed something today. I might have found a way to get the cash we need.",
            isMe: true,
          },
          {
            sender: "Aisha",
            time: "Mar 26, 21:15",
            body: "Please don't do anything stupid. Just come back to us alive.",
            isMe: false,
          },
          {
            sender: "Aisha",
            time: "Apr 04, 22:15",
            body: "Samir, call me please. I am so scared.",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Apr 04, 22:40",
            body: "Can't call, battery is dying and power is out again. Someone else died today. I swear on my life I will get the money and get out of here.",
            isMe: true,
          },
          {
            sender: "Aisha",
            time: "Apr 14, 08:00",
            body: "The news says the quarantine ends tomorrow morning! Are you coming straight here?",
            isMe: false,
          },
          {
            sender: "Samir",
            time: "Apr 14, 08:30", // The day before the doors open
            body: "Yes. The nightmare is almost over. I am bringing enough to make everything right. Just hold on.",
            isMe: true,
          },
        ],
      }),
      position: { x: -40, y: -40 },
      size: { width: 200, height: 250 },
      rotation: -1,
      packIn:["evidence"],
    },
    {
      id: "sms_eleanor_samir_flirt",
      type: "electronic-messages",
      title: "SMS Log: Eleanor Vance & Samir Tariq",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump (Eleanor's Phone)",
        caseRef: "SMS-ELE-109",
        participants: "Eleanor Vance & Samir Tariq",
        messages:[
          {
            sender: "Eleanor",
            time: "Mar 18, 21:30",
            body: "Is this the big guy from 106? It's Eleanor. I got your number from Arthur's emergency contact sheet. Richard is snoring and driving me absolutely insane.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Mar 20, 19:45",
            body: "You looked very impressive carrying those water jugs for everyone today. A real man. Not like the pathetic excuse I'm locked in here with.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Mar 23, 22:10",
            body: "I saw you pacing on the balcony. It's awfully cold tonight. Are you sure you don't want some company? I could sneak upstairs. I'm very good at keeping secrets. 😉",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Mar 25, 23:05",
            body: "Ignoring me? Playing hard to get is cute, but we're going to be stuck here a long time. We might as well have some fun while the world ends.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Mar 28, 20:15", // Right around the time Richard is poisoned!
            body: "Well, Richard is locked in his room. Claims he has the fever. I moved to Room 109 so I don't catch whatever he has. I'm all by myself now... door's unlocked if you want to play hero.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Mar 29, 22:30",
            body: "I even found a bottle of decent wine Arthur was hiding. Come on, big guy. I'm bored out of my mind.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Apr 02, 21:00",
            body: "Suit yourself. Your loss. Enjoy the rotting rations.",
            isMe: true,
          },
        ],
      }),
      position: { x: -20, y: 0 },
      size: { width: 200, height: 250 },
      rotation: 1,
      packIn:["evidence"],
    },
    {
      id: "sms_eleanor_richard_bickering",
      type: "electronic-messages",
      title: "SMS Log: Eleanor & Richard Vance",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump (Eleanor's Phone)",
        caseRef: "SMS-ELE-104-109",
        participants: "Eleanor Vance & Richard Vance",
        messages:[
          {
            sender: "Eleanor",
            time: "Mar 14, 09:30",
            body: "This place is a literal biohazard. The sheets are damp. Get us out of here today.",
            isMe: true,
          },
          {
            sender: "Richard",
            time: "Mar 14, 09:35",
            body: "The SUV is completely dead. We are stuck until a tow truck can get out here on Monday. Just deal with it.",
            isMe: false,
          },
          {
            sender: "Richard",
            time: "Mar 16, 14:20",
            body: "I saw the way you were looking at that trucker down by the vending machines. Have some class, Eleanor. You are my wife.",
            isMe: false,
          },
          {
            sender: "Eleanor",
            time: "Mar 16, 14:25",
            body: "I was looking at a man who actually possesses a spine. You wouldn't know anything about that.",
            isMe: true,
          },
          {
            sender: "Richard",
            time: "Mar 22, 18:00",
            body: "Stop telling the other guests I lost the company. It's a temporary restructuring.",
            isMe: false,
          },
          {
            sender: "Eleanor",
            time: "Mar 22, 18:05",
            body: "You are totally bankrupt, Richard. You have zero cash. The only thing of value you have left to your name is that $5 million life insurance policy.",
            isMe: true,
          },
          {
            sender: "Richard",
            time: "Mar 27, 21:45", // The night Maya poisons his drink!
            body: "My chest is on fire. I'm throwing up. What the hell did you put in my scotch?",
            isMe: false,
          },
          {
            sender: "Eleanor",
            time: "Mar 27, 21:48",
            body: "Don't be so dramatic. It's cheap motel liquor. Drink some tap water and go to sleep.",
            isMe: true,
          },
          {
            sender: "Richard",
            time: "Mar 28, 08:30",
            body: "I'm locking the deadbolt. I think I caught the virus from that creep in 101. Do not come in here.",
            isMe: false,
          },
          {
            sender: "Eleanor",
            time: "Mar 28, 08:35",
            body: "Fine by me. I got Arthur to give me the keys to Room 109 so I don't catch your plague. Suffer in silence.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Apr 02, 10:00", // Days after Richard is already dead
            body: "Arthur left stale crackers outside your door. Are you going to get them or just let the rats have them?",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Apr 06, 14:20",
            body: "Still pouting? You've been locked in there for over a week. I know you're just hiding from your creditors.",
            isMe: true,
          },
          {
            sender: "Eleanor",
            time: "Apr 13, 19:00", // Two days before the police arrive
            body: "The radio said the lockdown ends on the 15th. I'm hiring a private car. You can find your own way back to LA. We're done, Richard.",
            isMe: true,
          },
        ],
      }),
      position: { x: -40, y: 0 },
      size: { width: 200, height: 250 },
      rotation: -2,
      packIn: ["evidence"],
    },
    {
      id: "sms_lenny_arthur_blackmail",
      type: "electronic-messages",
      title: "SMS Log: Lenny B. & Arthur P.",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Local Wi-Fi Network (Intercepted)",
        caseRef: "SMS-LEN-101",
        participants: "Lenny Barnes & Arthur Pendelton",
        messages:[
          {
            sender: "Lenny",
            time: "Mar 15, 20:15",
            body: "Hey Artie. Since we're all locked in here together, I thought you should know I found the little pinhole camera behind the smoke detector in 101.",
            isMe: true,
          },
          {
            sender: "Arthur",
            time: "Mar 15, 20:20",
            body: "Watch your mouth, boy. I can still throw you out into the parking lot with the National Guard.",
            isMe: false,
          },
          {
            sender: "Lenny",
            time: "Mar 15, 20:25",
            body: "No you can't. Health department won't let you. Give me the IP address and the admin password for the camera feeds.",
            isMe: true,
          },
          {
            sender: "Arthur",
            time: "Mar 15, 20:30",
            body: "You're out of your mind. I'll break your jaw.",
            isMe: false,
          },
          {
            sender: "Lenny",
            time: "Mar 15, 20:35",
            body: "Give me the login, or I walk into the lobby right now and tell the trucker, the rich guy, and the runaway that you've been recording them undress. How long do you think you'll survive?",
            isMe: true,
          },
          {
            sender: "Arthur",
            time: "Mar 16, 09:00",
            body: "192.168.1.55. Port 8080. Pass is Crimson_Admin. If you alter any of the DVR logs, I swear to God I will bury you under the empty pool.",
            isMe: false,
          },
          {
            sender: "Lenny",
            time: "Mar 16, 09:05",
            body: "Pleasure doing business. Let's see what our fellow guests are up to...",
            isMe: true,
          },
          {
            sender: "Lenny",
            time: "Mar 17, 02:15", // The night Lenny dies!
            body: "Holy crap. Artie, are you seeing camera 4? The courtyard feed?",
            isMe: true,
          },
          {
            sender: "Arthur",
            time: "Mar 17, 08:30",
            body: "I was asleep. Seeing what? Don't play games with me.",
            isMe: false,
          },
          {
            sender: "Lenny",
            time: "Mar 17, 23:45",
            body: "I think I just found my retirement fund. I'm going to pay a little visit to one of our guests.",
            isMe: true,
          },
          {
            sender: "Arthur",
            time: "Mar 18, 09:10", // The morning after Lenny is murdered
            body: "Lenny? What did you see? If you steal from my guests, I get a cut.",
            isMe: false,
          },
          {
            sender: "Arthur",
            time: "Mar 19, 11:00",
            body: "Dr. Harrison says you're sick and coughing blood, and we had to tape your door shut. Fine by me. Keep the infection in there and keep your mouth shut.",
            isMe: false,
          },
          {
            sender: "Arthur",
            time: "Mar 22, 14:00",
            body: "Still nothing? Good. Starve in there.",
            isMe: false,
          },
        ],
      }),
      position: { x: -20, y: 40 },
      size: { width: 200, height: 250 },
      rotation: -1,
      packIn: ["evidence"],
    },
    {
      id: "sms_motel_girls_group",
      type: "electronic-messages",
      title: "Group Chat: Motel Hostages 🎬",
      content: JSON.stringify({
        type: "SMS",
        platformName: "Mobile Network Dump (Maya's Phone)",
        caseRef: "SMS-GRP-102-105-107",
        participants: "Roxy D., Chloe S., Maya K.",
        messages:[
          {
            sender: "Roxy",
            time: "Mar 17, 10:00",
            body: "Welcome to the group chat, darlings! If we're going to survive this ghastly lockdown, we need to stick together. 🍷✨",
            isMe: false,
          },
          {
            sender: "Chloe",
            time: "Mar 17, 10:05",
            body: "Whatever. Just let me know if rationing starts. And tell that creep in 101 to stop staring at my duffel bag when I walk by the window.",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Mar 17, 10:08",
            body: "Lenny? Yeah, he's super weird. He was standing in the courtyard at 2 AM last night just watching the balconies.",
            isMe: true,
          },
          {
            sender: "Roxy",
            time: "Mar 18, 14:30",
            body: "Well, Lenny won't be bothering us anymore! The Doctor just duct-taped his door shut. Said he's got the virus bad.",
            isMe: false,
          },
          {
            sender: "Roxy",
            time: "Mar 18, 14:35",
            body: "But get this... I was playing detective, and Lenny's sneakers are OUTSIDE his door. If he locked himself inside to isolate, who left his shoes in the hallway? 🕵️‍♀️",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Mar 18, 14:40",
            body: "Maybe Arthur made him leave them outside so he wouldn't track germs? Don't overthink it Roxy, people are dying.",
            isMe: true,
          },
          {
            sender: "Roxy",
            time: "Mar 20, 19:15",
            body: "Okay, new gossip. Eleanor the 'grieving wife' is totally hitting on the big trucker guy by the ice machine. Her husband is literally dying of a fever in 104 and she's flirting! Scandalous!",
            isMe: false,
          },
          {
            sender: "Chloe",
            time: "Mar 21, 11:00",
            body: "Don't trust the doctor either. Lenny told me yesterday that he recognized Dr. Harrison from a news article. Said the guy lost his medical license for stealing pills.",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Mar 21, 11:05",
            body: "Wait, really? That's so scary. We shouldn't take any medicine he gives us.",
            isMe: true,
          },
          {
            sender: "Maya",
            time: "Mar 23, 16:20",
            body: "Hey guys, random question. Does anyone have a spare bar of hard soap? I ran out and Arthur wants $10 for a new one.",
            isMe: true,
          },
          {
            sender: "Roxy",
            time: "Mar 23, 16:25",
            body: "I stole a few from the maid's cart on day one! I'll leave one on your windowsill, darling. 🧼",
            isMe: false,
          },
          {
            sender: "Roxy",
            time: "Mar 25, 09:00",
            body: "Chloe? You didn't come out for the cracker rations this morning. Are you okay?",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Mar 25, 10:15",
            body: "I heard her coughing all night through the floorboards. Dr. Harrison went to her door and said she's isolating. We should stay away from Room 105.",
            isMe: true,
          },
          {
            sender: "Roxy",
            time: "Apr 04, 21:30",
            body: "Maya... I've been thinking about this like a movie script. Richard was 'poisoned' by bad liquor. Lenny's shoes were outside. Chloe never said she was sick, she just went quiet. And her blinds are open just a crack... she hasn't moved from the floor.",
            isMe: false,
          },
          {
            sender: "Roxy",
            time: "Apr 04, 21:35",
            body: "Someone is faking these virus deaths. And you're the only one whose room has a direct balcony drop-down to Chloe's patio... You've been awfully quiet, sweetie.",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Apr 04, 21:40",
            body: "Roxy, you're scaring me. You're drinking too much of that wine. Why don't I come over to 102 and we can talk about it? I don't want to be alone.",
            isMe: true,
          },
          {
            sender: "Roxy",
            time: "Apr 04, 21:42",
            body: "Door is unlocked, darling. Bring your innocent act, let's see how it holds up. 🍷",
            isMe: false,
          },
          {
            sender: "Maya",
            time: "Apr 05, 08:30", // The morning after Roxy is murdered!
            body: "Roxy? Are you awake? You didn't answer the door.",
            isMe: true,
          },
          {
            sender: "Maya",
            time: "Apr 07, 12:15",
            body: "Hey guys, just checking in. Dr. Harrison says Roxy caught the fever too and locked her deadbolt from the inside. I'm so scared. I hope you guys are okay in there.",
            isMe: true,
          },
        ],
      }),
      position: { x: -20, y: 80 },
      size: { width: 200, height: 250 },
      rotation: 1,
      packIn:["evidence"],
    }
  ],
  connections: [
    { from: "lenny_portrait", to: "doc_autopsy_lenny" },
    { from: "lenny_portrait", to: "sms_lenny_arthur_blackmail" },
    { from: "richard_portrait", to: "doc_autopsy_richard" },
    { from: "richard_portrait", to: "sms_eleanor_richard_bickering" },
    { from: "chloe_portrait", to: "doc_autopsy_chloe" },
    { from: "chloe_portrait", to: "sms_motel_girls_group" },
    { from: "roxy_portrait", to: "doc_autopsy_roxy" },
    { from: "roxy_portrait", to: "sms_motel_girls_group" },
    { from: "arthur_portrait", to: "doc_poi_arthur_pendelton" },
    { from: "arthur_portrait", to: "sms_lenny_arthur_blackmail" },
    { from: "samir_portrait", to: "doc_poi_samir_tariq" },
    { from: "samir_portrait", to: "sms_samir_cartel_lockdown" },
    { from: "samir_portrait", to: "sms_samir_wife_lockdown" },
    { from: "samir_portrait", to: "sms_eleanor_samir_flirt" },
    { from: "eleanor_portrait", to: "doc_poi_eleanor_vance" },
    { from: "eleanor_portrait", to: "sms_eleanor_samir_flirt" },
    { from: "eleanor_portrait", to: "sms_eleanor_richard_bickering" },
    { from: "dr_harrison_portrait", to: "doc_poi_elias_harrison" },
    { from: "maya_portrait", to: "doc_poi_maya_kendrick" },
    { from: "maya_portrait", to: "sms_motel_girls_group" },
  ],
} as const;

export default THE_LAST_CHECK_IN_DATA;
