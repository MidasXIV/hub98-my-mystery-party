const PREDEFINED_IMAGES = {
  portrait_Alessandra_Bellini:
    "/cold_case_data/palazzo_of_bones/portrait_Alessandra_Bellini.jpeg",
  portrait_Marco_Rossi:
    "/cold_case_data/palazzo_of_bones/portrait_Marco_Rossi.jpeg",
  portrait_Sofia_Lombardi:
    "/cold_case_data/palazzo_of_bones/portrait_Sofia_Lombardi.jpeg",
  portrait_Francesca_Martini:
    "/cold_case_data/palazzo_of_bones/portrait_Francesca_Martini.jpeg",
  portrait_Giovanni_Bellini:
    "/cold_case_data/palazzo_of_bones/portrait_Giovanni_Bellini.jpeg",
  evidence_crime_scene:
    "/cold_case_data/palazzo_of_bones/evidence_crime_scene.jpeg",
  evidence_crime_scene_2:
    "/cold_case_data/palazzo_of_bones/evidence_crime_scene_2.jpeg",
  evidence_cctv: "/cold_case_data/palazzo_of_bones/evidence_cctv.jpeg",
  map_city: "/cold_case_data/palazzo_of_bones/map_city.jpg",
  portrait_elena_parisi:
    "/cold_case_data/palazzo_of_bones/portrait_elena_parisi.png",
  portrait_MARINO_Isabella:
    "/cold_case_data/palazzo_of_bones/portrait_MARINO_Isabella.jpeg",
  portrait_CONTI_Morena:
    "/cold_case_data/palazzo_of_bones/portrait_CONTI_Morena.jpeg",
  portrait_MORETTI_Luisa:
    "/cold_case_data/palazzo_of_bones/portrait_MORETTI_Luisa.png",
  portrait_MARTIN_Eloisa:
    "/cold_case_data/palazzo_of_bones/portrait_MARTIN_Eloisa.jpeg",
  portrait_MILLER_Norina:
    "/cold_case_data/palazzo_of_bones/portrait_MILLER_Norina.jpeg",
  portrait_GIORDANO_Amelia:
    "/cold_case_data/palazzo_of_bones/portrait_GIORDANO_Amelia.png",
};

const PALAZZO_OF_BONES_DATA = {
  items: [
    {
      id: "portrait_alessandra_bellini",
      type: "photo",
      content: JSON.stringify({ title: "Alessandra Bellini", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.portrait_Alessandra_Bellini,
      position: { x: 10, y: 10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "portrait_marco_rossi",
      type: "photo",
      content: JSON.stringify({ title: "Marco Rossi", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.portrait_Marco_Rossi,
      position: { x: 30, y: 10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "portrait_sofia_lombardi",
      type: "photo",
      content: JSON.stringify({ title: "Sofia Lombardi", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.portrait_Sofia_Lombardi,
      position: { x: 50, y: 10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "portrait_francesca_martini",
      type: "photo",
      content: JSON.stringify({ title: "Francesca Martini", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.portrait_Francesca_Martini,
      position: { x: 70, y: 10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "portrait_giovanni_bellini",
      type: "photo",
      content: JSON.stringify({ title: "Giovanni Bellini", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.portrait_Giovanni_Bellini,
      position: { x: 90, y: 10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    // {
    //   id: "evidence_crime_scene_photo",
    //   type: "photo",
    //   content: "Crime Scene Evidence Photo",
    //   imageUrl: PREDEFINED_IMAGES.evidence_crime_scene,
    //   position: { x: 120, y: 100 },
    //   size: { width: 510, height: 300 },
    //   rotation: 0,
    // },
    // {
    //   id: "evidence_crime_scene_photo_2",
    //   type: "photo",
    //   content: "Crime Scene Evidence Photo",
    //   imageUrl: PREDEFINED_IMAGES.evidence_crime_scene_2,
    //   position: { x: 220, y: 120 },
    //   size: { width: 510, height: 300 },
    //   rotation: 0,
    // },
    // {
    //   id: "evidence_cctv_photo",
    //   type: "photo",
    //   content: "CCTV Evidence Photo",
    //   imageUrl: PREDEFINED_IMAGES.evidence_cctv,
    //   position: { x: 150, y: 120 },
    //   size: { width: 510, height: 300 },
    //   rotation: 0,
    // },

    // {
    //   id: "doc_Alessandra_Bellini_trace",
    //   type: "autopsy-report",
    //   title: "Autopsy Report: Alessandra Bellini",
    //   content:
    //     "**Autopsy Report: Alessandra Bellini**\n\n**Case File:** 23-04-B\n\n**Deceased:** Alessandra Bellini\n\n**Date of Autopsy:** October 27, 1948\n\n**Location:** City Morgue, Venice\n\n**Performed By:** Dr. Enrico Rossi\n\n**External Examination:**\n\nThe body presents as that of a Caucasian female, estimated age 32 years, height 5’6”, weight approximately 125 lbs. Rigor mortis is fully established. Lividity is posterior and fixed. The body is clean, save for… well, we'll get to that. No obvious signs of struggle are immediately apparent, though the hands are clenched. There are no defensive wounds on the forearms. The fingernails are clean and manicured.\n\n**Internal Examination:**\n\n*   **Head:** Scalp unremarkable. Skull intact. Brain shows some minor contusions, consistent with… possible impact. Further examination required.\n\n*   **Thorax:** Lungs clear, no evidence of pneumonia or other respiratory distress. Heart appears normal in size and weight. No valvular abnormalities detected. Aorta and major vessels are clear of significant atherosclerosis.\n\n*   **Abdomen:** Liver, spleen, kidneys, and pancreas appear grossly normal. Stomach contains a small amount of partially digested food. No signs of peritonitis.\n\n*   **Cause of Death:** This is… complicated. The initial assessment suggests blunt force trauma to the head, possibly the cause of death. However, there are… inconsistencies. The contusions are… almost too neat. Almost surgical.\n\n*   **Further Notes:** There is a peculiar mark on the victim’s left wrist, resembling a brand or burn. It’s faint, and easily overlooked, but it’s there. Also, and I must stress the sensitive nature of this observation, there is evidence of… recent sexual activity. However, I can find no evidence of forced entry or struggle of that kind. The deceased was… shall we say, *thoroughly* cleaned. Almost too thoroughly. This is not typical for a… clandestine encounter.\n\n**Conclusion:**\n\nThe official cause of death is pending further investigation. While blunt force trauma to the head is a contributing factor, the precise mechanism and surrounding circumstances remain… unclear. I recommend a thorough investigation into the deceased's recent activities and associates. Something here… doesn't quite sit right. I suspect there's more to this than meets the eye. A great deal more.\n\n**Dr. Enrico Rossi**\n\n**Pathologist**\n\n**Addendum (Handwritten):** *For your eyes only, Inspector. The Bellini family has… influence. Tread carefully. And don't let them rush you on this one.*",
    //   position: { x: 10, y: -10 },
    //   size: { width: 210, height: 360 },
    //   rotation: 0,
    // },

    {
      id: "doc_Marco_Rossi_0",
      type: "person-of-interest-report",
      title: "POI Report: Marco Rossi",
      content:
        '{"lastName":"Rossi","firstName":"Marco","age":"62","height":"173 cm","weight":"75 kg","hair":"Grey, thinning","eyes":"Brown","occupation":"Retired Archivist","statement":"I was at home all evening on the 26th, reading \'The House of Medici: Its Rise and Fall\'. I did not leave my apartment.","conclusion":"Suspicious. Subject possesses an unusual depth of knowledge regarding the crime scene\'s historical context and the victim\'s research. His provided alibi is weak and lacks definitive proof. His connection to the lead detective, however distant, is also noted as a point of potential conflict or manipulation. Further investigation is required to verify his movements on the night of the murder."}',

      position: { x: 50, y: -10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_Marco_Rossi_1",
      type: "formal-alibi",
      title: "Witness Statement: Sofia Bianchi",
      content:
        '{"witnessName":"Sofia Bianchi","statementBody":"I\'ve lived next to Marco for almost ten years. He\'s a quiet, scholarly man. On the night that poor girl died, I am certain he was home. I took my dog, Pip, for his last walk around 10:30 PM, and I saw the light on in his study, as usual. I could faintly hear his classical music playing. He keeps to himself, always lost in his books. There\'s no malice in him; he wouldn\'t be capable of something so terrible.","pageNumber":"1"}',

      position: { x: 10, y: 50 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_Marco_Rossi_2",
      type: "interrogation-transcript",
      title: "Interview: Marco Rossi",
      content:
        '{"department":"Florence Polizia di Stato","title":"Interrogation Transcript of Marco Rossi","caseNumber":"00-102724-48B","date":"October 28, 2024","interviewer":"Detective Moretti","subject":"Marco Rossi","bodyRaw":["Detective: Thank you for coming in, Marco Rossi. This won\'t take long. Can you state your full name for the record?","Marco Rossi: Marco Antonio Rossi.","Detective: Mr. Rossi, you are a retired archivist, correct? Specialized in the history of Florence?","Marco Rossi: That is correct. For thirty-five years, I was the senior archivist at the Biblioteca Nazionale Centrale di Firenze.","Detective: A prestigious career. You must have encountered the Bellini family history quite often.","Marco Rossi: Of course. They are one of the cornerstones of the city\'s latter history. You cannot study Florence without studying the Bellini.","Detective: And you knew the victim, Alessandra Bellini?","Marco Rossi: I did. She was a bright young historian. She consulted with me a few times regarding her research into her own family line, specifically Conte Umberto.","Detective: What was the nature of her research?","Marco Rossi: She was fascinated by the Conte\'s... darker interests. The occult, Etruscan rituals. A morbid curiosity, perhaps, but a thorough one. I pointed her toward some relevant manuscripts.","Detective: Where were you on the night of October 26th?","Marco Rossi: I was at home. Reading. It was a quiet evening.","Detective: Your neighbor, Sofia Bianchi, confirms she saw your lights on. What were you reading?","Marco Rossi: \'The House of Medici: Its Rise and Fall\' by Christopher Hibbert. A classic. I was rereading the section on Cosimo I.","Detective: You didn\'t leave your apartment at all that evening? Perhaps for a walk, or a coffee?","Marco Rossi: No. I was engrossed in my book. The night passed quickly.","Detective: It\'s a terrible thing that happened to Alessandra. Found in a hidden chamber, bones arranged... ritualistically. It sounds like something out of one of your history books.","Marco Rossi: It is a grotesque mockery of history. An abomination.","Detective: The arrangement of the bones, the symbols on the wall... it would take a great deal of knowledge to stage such a scene. The kind of knowledge an expert might have.","Marco Rossi: Are you suggesting I... That is absurd. My work is to preserve history, not defile it.","Detective: You know the Palazzo Bellini better than anyone, don\'t you? You\'ve studied its blueprints, its secret histories. You know where the hidden chambers are.","Marco Rossi: I know of them, yes. From historical accounts and architectural drafts. It is my job to know such things. It does not mean I have ever been inside them.","Detective: Mr. Rossi, we have a witness who saw a man matching your description entering the palazzo grounds on the night of the murder.","Marco Rossi: That\'s impossible. Your witness is mistaken. I was at home.","Detective: A man of your height, same grey coat you\'re wearing now, seen walking down the Via de\' Benci around 10 PM. He didn\'t stay long. Just a brief visit.","Marco Rossi: Many men in Florence own grey coats. It is a common color. I was reading about the Medici!","Detective: You seem agitated, Mr. Rossi. It\'s a simple question. Were you at the Palazzo Bellini that night?","Marco Rossi: I was not! This is an outrage! I am a respected scholar, a distant relative of your own Detective Rossi!","Detective: Your relation to Isabella Rossi has no bearing on this investigation. Why would you go to the palazzo, Marco? Did you have more research for Alessandra?","Marco Rossi: I told you, I was not there! I was at home! Ask Sofia, she will tell you!","Detective: She told us she saw a light on and heard music. She didn\'t see you. It\'s not a perfect alibi.","Marco Rossi: It is the truth! I had nothing to do with this. I was only trying to help the girl.","Detective: Help her with what? Understanding the rituals? The layout of the catacombs?","Marco Rossi: With her research! That is all! I am an old man who loves books, not some monster.","Detective: Then help me understand why a witness would place you at the scene of the crime on the very night it happened.","Marco Rossi: I cannot explain what I do not know! Perhaps they saw a ghost. The palazzo is full of them."]}',
      position: { x: 25, y: 50 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },
    {
      id: "doc_Sofia_Lombardi_1",
      type: "person-of-interest-report",
      title: "POI Report: Sofia Lombardi",
      content:
        '{"lastName":"Lombardi","firstName":"Sofia","height":"165 cm","weight":"68 kg","hair":"Dark Brown, often tied back","occupation":"Palazzo Caretaker","statement":"I was at home with my husband, Giovanni Esposito, on the night of the murder. We were together the entire evening.","conclusion":"Suspicious. Subject has motive (financial debt, resentment) and opportunity (unfettered access to the palazzo). Her alibi relies on a single person, her husband. Appears cooperative on the surface but shows signs of stress when finances are mentioned."}',

      position: { x: 75, y: -10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_Sofia_Lombardi_2",
      type: "formal-alibi",
      title: "Witness Statement: Giovanni Esposito",
      content:
        '{"witnessName":"Giovanni Esposito","statementBody":"My Sofia? She was with me. All night. We had dinner, watched some television... one of those silly reality shows she likes. She never left my sight. The idea that she could have anything to do with what happened to Signora Bellini is absurd. She\'s worked for that family for 15 years. She was upset, of course, when we heard the news. We both were. But she was home. With me.","pageNumber":"1"}',

      position: { x: 10, y: 50 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "doc_Sofia_Lombardi_3",
      type: "interrogation-transcript",
      title: "Interview: Sofia Lombardi",
      content:
        '{"department":"Florence Polizia di Stato","title":"INTERROGATION TRANSCRIPT","caseNumber":"C-2024-1027-001","date":"October 28, 2024","interviewer":"Detective Rossi","subject":"Sofia Lombardi","bodyRaw":["Detective Rossi: Thank you for coming in, Sofia Lombardi. This won\'t take long. Can you state your full name for the record?","Sofia Lombardi: Sofia Lombardi.","Detective Rossi: And your position?","Sofia Lombardi: I am the caretaker of the Palazzo Bellini. For fifteen years, now.","Detective Rossi: A long time. You must know the palazzo better than anyone. Every corner, every secret.","Sofia Lombardi: I know my duties, Detective. The leaky faucet in the west wing, the draft from the library windows, which floorboards creak. That is my job.","Detective Rossi: Of course. I understand Signora Bellini\'s death must have been a shock.","Sofia Lombardi: It was a tragedy. A terrible tragedy. She was a kind woman.","Detective Rossi: When was the last time you saw her?","Sofia Lombardi: The afternoon of the 26th. She was heading to the library, excited about some book she had found. That was the last time.","Detective Rossi: And where were you that night? Say, from 10 PM onwards.","Sofia Lombardi: I was at home. With my husband, Giovanni.","Detective Rossi: The entire night? You didn\'t step out for anything?","Sofia Lombardi: No. We had a late dinner, we watched a film. I was tired. It was a normal night.","Detective Rossi: What did you watch?","Sofia Lombardi: I... I don\'t remember the name. An American action film. Loud. Giovanni likes them. I think I fell asleep on the sofa.","Detective Rossi: So you were asleep. What time was that?","Sofia Lombardi: I\'m not sure. Perhaps 11:30? Giovanni would know. He woke me up to go to bed.","Detective Rossi: Fifteen years is a long time to work for a family. The Bellinis... they are very wealthy. That palazzo must be expensive to maintain.","Sofia Lombardi: It is an old building. It requires... constant attention. It is a privilege to care for such a place.","Detective Rossi: A privilege that must not pay very well. Old families, they have assets, but not always cash. We\'ve seen the palazzo\'s accounts. Maintenance has been deferred. Budgets are tight.","Sofia Lombardi: We manage. The family provides. It is not your concern how we manage.","Detective Rossi: It is my concern when it might relate to a murder, Signora Lombardi. Financial pressure makes people do things they wouldn\'t normally do.","Sofia Lombardi: I am a caretaker, not a thief. I have always been loyal to the Bellini family. To suggest otherwise is an insult.","Detective Rossi: I\'m not suggesting theft. But resentment can build. Seeing all that wealth, that privilege, day in and day out, while you\'re the one scrubbing the floors and fixing the pipes... it can wear a person down.","Sofia Lombardi: I take pride in my work. It is honest work. My husband and I, we have enough. We are content.","Detective Rossi: Are you? Our records show your husband\'s business has been struggling. And you have some personal debts. Significant ones.","Sofia Lombardi: What is this? What are you implying? My personal finances are my own business! This has nothing to do with Alessandra!","Detective Rossi: Doesn\'t it? Access to the entire palazzo, knowledge of its layout, and a need for money. You can see how that looks.","Sofia Lombardi: I was at home! Giovanni will tell you! This is ridiculous. I am a victim here too! My employer has been murdered!","Detective Rossi: Did you ever enter the lower levels? The cellars where the renovations were taking place?","Sofia Lombardi: Of course. To check for damp, for rats. It is part of my job. But that hidden room... I never knew it was there. I swear it.","Detective Rossi: But you had the keys to all the known areas. You could move about freely, unseen, especially at night.","Sofia Lombardi: My husband and I live in a small apartment on the grounds. But I was in my own home that night. Not the palazzo.","Detective Rossi: You seem very stressed, Signora Lombardi. If you were just at home watching a film, why so nervous?","Sofia Lombardi: Because you are accusing me of something monstrous! You twist my words, my life, my work... you make it all sound ugly.","Detective Rossi: I\'m just trying to understand the truth. One last time, you are certain you never left your apartment after 10 PM on the night of October 26th?","Sofia Lombardi: I am certain. I was with Giovanni. Ask him. He will tell you the same. Now, am I free to go?","Detective Rossi: For now. Don\'t leave Florence. We\'ll be in touch.","Sofia Lombardi: You have my number."]}',
      position: { x: 35, y: 60 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },
    {
      id: "doc_Francesca_Martini_1",
      type: "person-of-interest-report",
      title: "POI Report: Francesca Martini",
      content:
        '{"lastName":"Martini","firstName":"Francesca","height":"5\' 5\\"","weight":"130 lbs","hair":"Brown","eyes":"Hazel","occupation":"Personal Assistant","statement":"I was with my employer, Giovanni Bellini, at the charity gala for the entire evening of October 26th. I did not leave his side.","conclusion":"The subject is fiercely loyal to her employer, Giovanni Bellini, and their alibis are mutually dependent. Her devotion could be a motive for obstruction or something more. She remains cooperative, but her loyalty makes her a person of interest. Further investigation is required to verify the details of her alibi. Conclusion: Suspicious."}',

      position: { x: 50, y: 150 },
      size: { width: 210, height: 360 },
      rotation: 2, // Slight tilt for realism
    },
    {
      id: "doc_Francesca_Martini_2",
      type: "formal-alibi",
      title: "Witness Statement: Giovanni Bellini",
      content:
        '{"witnessName":"Giovanni Bellini","statementBody":"Francesca Martini, my personal assistant, was indispensable to me at the charity gala on the night of October 26th. She was by my side for the entire duration of the event, from our arrival at approximately 20:00 until our departure after midnight. Her duties required her constant presence, managing my schedule and introductions. There was no point in the evening where she was not accounted for. She is the epitome of a loyal and professional assistant.","pageNumber":"1"}',

      position: { x: 30, y: 150 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },
    {
      id: "doc_Francesca_Martini_3",
      type: "interrogation-transcript",
      title: "Interview: Francesca Martini",
      content:
        '{"department":"Florence Polizia di Stato","title":"INTERROGATION TRANSCRIPT","caseNumber":"PAL-BON-004","date":"October 28, 2024","interviewer":"Detective Isabella Rossi","subject":"Francesca Martini","bodyRaw":["**Detective Rossi:** Thank you for coming in, Ms. Martini. This won\'t take long. Can you state your full name for the record?","**Francesca Martini:** Francesca Martini.","**Detective Rossi:** And you are employed as the personal assistant to Giovanni Bellini?","**Francesca Martini:** Yes, for five years now.","**Detective Rossi:** A long time. You must know him quite well.","**Francesca Martini:** Mr. Bellini is a very good man. A respected man.","**Detective Rossi:** I understand. I need to ask you about the night of October 26th. Where were you?","**Francesca Martini:** I was with Mr. Bellini at the annual Florentine Heritage charity gala. All night.","**Detective Rossi:** \'All night\' is a long time. Can you be more specific? From what time to what time?","**Francesca Martini:** We arrived around eight in the evening and left after midnight, perhaps closer to one in the morning.","**Detective Rossi:** And you were with him the entire time? Every single moment for five hours?","**Francesca Martini:** Yes. My job requires me to be with him, to assist with his networking, to manage his appointments. I was always within a few feet of him.","**Detective Rossi:** Did he seem himself that night? Or was he perhaps distracted? Worried about something?","**Francesca Martini:** He was perfectly fine. Charming, as always. He is a pillar of the community.","**Detective Rossi:** Did he take any private phone calls? Step away for a moment? Even to use the restroom?","**Francesca Martini:** I... Of course he used the restroom. I waited outside the door for him.","**Detective Rossi:** And for how long was he in there?","**Francesca Martini:** I didn\'t time it, Detective. A few minutes. Normal.","**Detective Rossi:** Did you ever see Alessandra Bellini at the palazzo?","**Francesca Martini:** Of course. She was Mr. Bellini\'s niece. She was staying there.","**Detective Rossi:** Did you witness any arguments between them? Any disagreements about her research?","**Francesca Martini:** Disagreements? No. Mr. Bellini was... concerned. He felt she was digging into things best left alone, for her own good.","**Detective Rossi:** For her own good? Or for his?","**Francesca Martini:** Mr. Bellini has no secrets. He was only trying to protect his niece from a painful family history.","**Detective Rossi:** So you overheard their conversations?","**Francesca Martini:** My office is near the main study. It is impossible not to hear things sometimes.","**Detective Rossi:** What did you hear, Francesca? Did you hear Alessandra confront him about a discovery?","**Francesca Martini:** She was excitable. Young. She made grand assumptions. Mr. Bellini was patient with her.","**Detective Rossi:** But what was she assuming? What was she confronting him about?","**Francesca Martini:** I don\'t recall the specifics. It was family business. Not my place.","**Detective Rossi:** It\'s your place now, Ms. Martini. A young woman is dead. Did she threaten to expose something about him?","**Francesca Martini:** Expose what? A respected man\'s history? It\'s absurd. He would never harm anyone, least of all his own family.","**Detective Rossi:** People do desperate things to protect secrets. You know he has secrets, don\'t you? That\'s what your loyalty is for. To help keep them.","**Francesca Martini:** I am loyal because he is a good employer. That is all. He was at the gala. With me. That is the truth.","**Detective Rossi:** Did he receive any texts or calls while in the restroom at the gala?","**Francesca Martini:** I don\'t know. I wasn\'t with him in there, was I?","**Detective Rossi:** You seem very protective of him. Some might say overly so.","**Francesca Martini:** I respect him. There\'s nothing wrong with that.","**Detective Rossi:** Would you lie for him, Francesca?","**Francesca Martini:** I\'m not lying. We were at the gala. Check the guest list, check the photos. We were there.","**Detective Rossi:** Being at a party isn\'t a timeline, Ms. Martini. It\'s a location. A lot can happen in five hours. A man can make a phone call, send a text, give an order.","**Francesca Martini:** He did none of that. He was talking to donors. He was a perfect gentleman.","**Detective Rossi:** We\'ll see. Thank you for your time. We\'ll be in touch.","**Francesca Martini:** I\'ve told you everything I know."]}',

      position: { x: 25, y: 175 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },
    {
      id: "doc_Giovanni_Bellini_1",
      type: "person-of-interest-report",
      title: "POI Report: Giovanni Bellini",
      content:
        '{"lastName":"Bellini","firstName":"Giovanni","height":"175 cm","weight":"82 kg","hair":"Grey, distinguished","occupation":"Retired Art Collector","statement":"I was attending the annual \'Art for Florence\' charity gala at the Palazzo Vecchio on the night of October 26th. My personal assistant, Francesca Martini, was with me the entire evening. We did not leave until after midnight.","conclusion":"Suspicious. Subject is the victim\'s uncle and was reportedly against her research into the family\'s history. His alibi, while corroborated by his personal assistant, places him at a large, public event, which could provide opportunities to slip away unnoticed. His prominent social standing and wealth afford him resources and influence that warrant a thorough investigation. He displayed a controlled, almost detached demeanor when discussing the victim."}',

      position: { x: 150, y: 110 },
      size: { width: 210, height: 360 },
      rotation: 2, // Slight tilt for realism
    },
    {
      id: "doc_Giovanni_Bellini_2",
      type: "formal-alibi",
      title: "Witness Statement: Francesca Martini",
      content:
        '{"witnessName":"Francesca Martini","statementBody":"I was with Mr. Bellini for the entirety of the \'Art for Florence\' charity gala on the evening of October 26th. I picked him up from his residence at 7:30 PM, and we arrived at the Palazzo Vecchio shortly before 8:00 PM. He was a keynote speaker and was in high demand all evening, mingling with donors and city officials. I was never more than a few feet away from him. He gave his speech around 10:00 PM and we remained at the event until approximately 12:30 AM, at which point I drove him directly home. He did not leave the event at any time.","pageNumber":"1"}',
      position: { x: 35, y: 120 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },
    {
      id: "doc_Giovanni_Bellini_3",
      type: "interrogation-transcript",
      title: "Interview: Giovanni Bellini",
      content:
        '{"department":"Florence Polizia di Stato","title":"INTERROGATION TRANSCRIPT","caseNumber":"C-2024-1027-001","date":"October 28, 2024","interviewer":"Detective Rossi","subject":"Giovanni Bellini","bodyRaw":["Detective: Thank you for coming in, Mr. Bellini. This won\'t take long. Can you state your full name for the record?","Giovanni Bellini: Giovanni Umberto Bellini. This is all a dreadful formality, Detective. My niece is dead.","Detective: I understand this is a difficult time. My condolences. We need to understand the events leading up to her death. You were her uncle?","Giovanni Bellini: I was. The last of her direct relations. The Bellini name now ends with me. A tragedy.","Detective: How was your relationship with Alessandra?","Giovanni Bellini: She was a brilliant girl. Headstrong. She had this... fixation on our family\'s past. I found it rather morbid, but I indulged her. Within reason.","Detective: You disapproved of her research?","Giovanni Bellini: Disapproved? I encouraged her academic pursuits. I simply felt her energies were better spent on the glorious aspects of our heritage—the art, the patronage—not on some dusty, imagined skeletons in the closet.","Detective: Where were you on the night of October 26th?","Giovanni Bellini: I was at the \'Art for Florence\' gala at the Palazzo Vecchio. An event I sponsor annually. My assistant, Francesca, was with me. We were there from 8:00 PM until after midnight.","Detective: Were you in her company the entire time?","Giovanni Bellini: Of course. I am an old man, Detective. I don\'t stray far. I spoke with dozens of people. The mayor, the curator of the Uffizi... my presence was well-documented.","Detective: Did you leave the main hall for any reason? A phone call? A private meeting?","Giovanni Bellini: Perhaps for a moment to use the restroom. Or to admire a piece in a quieter corridor. Are you suggesting I slipped away from a gala I was hosting to... what? It\'s absurd.","Detective: Alessandra\'s research focused heavily on Etruscan culture. You\'re a renowned art collector, Mr. Bellini. Does your collection include any Etruscan pieces?","Giovanni Bellini: A few minor pieces. Some pottery, a bronze mirror. Nothing of significant ritualistic importance, if that\'s what you\'re implying. They are museum-quality, of course.","Detective: She was particularly interested in Etruscan rituals. Did she ever discuss them with you? Perhaps certain herbs, or ceremonial practices?","Giovanni Bellini: She rambled on about such things. I paid little attention. It sounded like academic fantasy, trying to build a narrative where there was none. It\'s a common failing of young historians.","Detective: The crime scene was... arranged. It had a ritualistic quality. Does that mean anything to you?","Giovanni Bellini: It means my niece was murdered by a madman. Someone who read the same books she did and created this disgusting theatre. Perhaps that researcher she was working with, the archivist. Rossi, was it?","Detective: We\'re exploring all avenues. The coroner found a rare substance in her system. A poison derived from a specific blend of herbs. Very obscure. Not something one finds at the local market.","Giovanni Bellini: And you believe I, a collector of fine art, am also an expert in ancient poisons? Detective, you are reaching. This is insulting.","Detective: Not at all. I\'m simply trying to understand who might have access to such things. Knowledge of ancient cultures can come from many sources. A secret society, for instance. Have you ever heard of one in Florence?","Giovanni Bellini: (A cold laugh) You\'ve been watching too many films. Secret societies? We are patrons of the arts, not characters in some historical novel. My only society is the board of the museum.","Detective: Alessandra found a hidden chamber in the palazzo. Were you aware of its existence?","Giovanni Bellini: I was not. The palazzo is ancient. It is riddled with forgotten spaces. That is what happens when a family has lived in one place for five hundred years. It accrues secrets, architecturally speaking.","Detective: You told Alessandra to stop her research. Why?","Giovanni Bellini: Because I saw it was becoming an obsession! It was unhealthy. She was isolating herself, chasing ghosts. I was concerned for her well-being. It seems my concern was tragically justified.","Detective: Did she tell you she was close to a major discovery? Something that would change the Bellini family history?","Giovanni Bellini: She was always close to a \'major discovery\'. It was her nature to be dramatic. I loved my niece, but she had a flair for the theatrical. A flair that, it seems, has cost her her life. Now, if you are done with these baseless insinuations, I have a funeral to arrange."]}',
      position: { x: 30, y: 155 },
      size: { width: 210, height: 260 },
      rotation: 0,
    },

    // ----------------------------------------------------------
    // Newspaper Articles
    // ----------------------------------------------------------
    {
      id: "news_la_nazione_2025_10_28",
      type: "newspaper",
      title: "La Nazione: Heiress Vanishes After Gala",
      content:
        '{\n  "publication": "La Nazione",\n  "headline": "FLORENCE HEIRESS VANISHES WITHOUT A TRACE",\n  "subheadline": "Alessandra Bellini, 28, missing after attending a high-profile restoration fundraiser at the Uffizi Gallery. Family\'s silence deepens the mystery.",\n  "dateline": "FLORENCE",\n  "date": "Tuesday, October 28, 2025",\n  "author": "Marco Ricci",\n  "authorRole": "Lead Crime Reporter",\n  "hasPhoto": true,\n  "imageCaption": "Alessandra Bellini pictured at the Uffizi Gallery fundraiser hours before she was last seen.",\n  "body": "The city is holding its breath for news of Alessandra Bellini, the beloved socialite and heir to the Bellini industrial fortune, who was reported missing Monday morning. Ms. Bellini was last seen leaving a charity gala at the Uffizi Gallery shortly after 11 PM on Sunday evening. She reportedly declined her driver, stating she wished to take a short walk across the Ponte Vecchio.\\n\\nShe never arrived home at the family\'s historic Palazzo in the Oltrarno district. Her phone appears to be off, and there has been no activity on her credit cards. Police have been tight-lipped, confirming only that a \'missing persons investigation is active and ongoing.\' Sources close to the family say they are distraught and have hired a private investigation team to aid the search. The disappearance of one of Florence\'s most prominent figures has sent a chill through the city\'s elite."\n}',
      position: { x: 100, y: 20 },
      size: { width: 380, height: 300 },
      rotation: 1,
    },
    {
      id: "news_corriere_fiorentino_2016_03_15",
      type: "newspaper",
      title: "Corriere Fiorentino: Art Student Missing",
      content:
        '{\n  "publication": "Corriere Fiorentino",\n  "headline": "Fears Grow for Missing Art Student",\n  "subheadline": "Norina Miller, a promising 21-year-old sculptor at the Accademia di Belle Arti, vanished after a late-night study session.",\n  "dateline": "FLORENCE",\n  "date": "Tuesday, March 15, 2016",\n  "author": "Valentina Esposito",\n  "authorRole": "Staff Reporter",\n  "hasPhoto": true,\n  "imageCaption": "A smiling Norina Miller in her studio, provided by her university classmates.",\n  "body": "A search is underway for 21-year-old Norina Miller, a final-year student at the prestigious Accademia di Belle Arti, who has been missing for three days. Friends last saw her leaving the Biblioteca Nazionale Centrale around 10 PM on Saturday. She was on her way to her small apartment near the Sant\'Ambrogio market.\\n\\nHer roommate reported her missing on Sunday when she failed to return. Police found her apartment untouched, with her latest project—a small clay bust—still sitting on its stand. Friends describe her as \'dedicated and quiet,\' not one for spontaneous trips. \'She lived for her art,\' one classmate told reporters, fighting back tears. \'It\'s not like her to just disappear.\' Carabinieri are appealing to the public for any information regarding her whereabouts."\n}',
      position: { x: 100, y: 80 },
      size: { width: 380, height: 300 },
      rotation: -3,
    },
    {
      id: "news_il_giornale_2004_07_22",
      type: "newspaper",
      title: "Il Giornale: Restorer Disappears from Church",
      content:
        '{\n  "publication": "Il Giornale della Toscana",\n  "headline": "Art Restorer Vanishes from Historic Oltrarno Church",\n  "subheadline": "Amelia, 42, failed to return home from her solitary work restoring a 15th-century fresco.",\n  "dateline": "FLORENCE",\n  "date": "Thursday, July 22, 2004",\n  "author": "Leonardo Bruno",\n  "authorRole": "Local Correspondent",\n  "hasPhoto": true,\n  "imageCaption": "The scaffolding inside the Church of San Felice in Piazza where Amelia was working.",\n  "body": "Mystery surrounds the disappearance of respected art restorer Amelia. The 42-year-old specialist was last seen Tuesday afternoon by the parish priest of San Felice, a small church in the Oltrarno district where she was painstakingly restoring a damaged fresco by a student of Ghirlandaio.\\n\\nHer husband raised the alarm when she didn\'t come home. Police found her personal belongings—her purse, keys, and a half-eaten sandwich—on a workbench below the scaffolding. The church was locked from the inside, with no signs of forced entry. \'It\'s as if she dissolved into the air,\' a visibly shaken Father Lorenzo said. \'One moment she was here, bringing beauty back to God\'s house, and the next... gone.\' The investigation is currently treating the site as a potential crime scene."\n}',
      position: { x: 100, y: 100 },
      size: { width: 380, height: 300 },
      rotation: 2,
    },
    {
      id: "news_international_herald_1995_05_11",
      type: "newspaper",
      title: "International Herald Tribune: Tourist Missing in Florence",
      content:
        '{\n  "publication": "International Herald Tribune (European Edition)",\n  "headline": "American Art Student Missing in Florence",\n  "subheadline": "Eloisa Martin, 23, from Boston, disappeared after a visit to the Boboli Gardens. Her journal was found on a park bench.",\n  "dateline": "FLORENCE",\n  "date": "Thursday, May 11, 1995",\n  "author": "David Sterling",\n  "authorRole": "Foreign Correspondent",\n  "hasPhoto": true,\n  "imageCaption": "The tranquil Neptune\'s Fountain in the Boboli Gardens, near where Martin\'s journal was discovered.",\n  "body": "Italian authorities and the U.S. consulate are searching for Eloisa Martin, a 23-year-old art history student on a study-abroad program, who was reported missing two days ago. Martin was last seen entering the Boboli Gardens on Tuesday morning. She failed to meet her friends for dinner that evening.\\n\\nA search of the gardens by park staff uncovered her personal journal left on a secluded bench overlooking the city. The final entry, written that day, describes the \'haunting beauty\' of the ancient statues and mentions her intent to explore \'the hidden grottoes.\' There is no indication of distress in her writing. Her family is flying in from the United States to assist in the search for their daughter."\n}',
      position: { x: 120, y: 20 },
      size: { width: 380, height: 300 },
      rotation: -1,
    },
    {
      id: "news_la_sera_1988_11_30",
      type: "newspaper",
      title: "La Sera: Shopkeeper Vanishes",
      content:
        '{\n  "publication": "La Sera",\n  "headline": "Oltrarno Artisan Disappears After Closing Shop",\n  "subheadline": "Luisa Moretti, 35, a well-known leather worker, never made it home. Her workshop was found locked and secure.",\n  "dateline": "FLORENCE",\n  "date": "Wednesday, November 30, 1988",\n  "author": "Franco Conti",\n  "authorRole": "Reporter",\n  "hasPhoto": false,\n  "imageCaption": "",\n  "body": "The tight-knit artisan community of the Oltrarno is in shock after the disappearance of one of its own. Luisa Moretti, 35, owner of a small but respected leather goods workshop on Via de\' Bardi, has been missing since Monday night. Her husband reported her missing after she failed to return home for dinner.\\n\\nNeighbors confirmed seeing her lock up her shop around 7 PM as usual. The journey to her apartment is a mere ten-minute walk. Police found no signs of a struggle near the workshop and her keys were not at the scene. \'Luisa knew everyone on this street,\' said a neighboring antiques dealer. \'She was the heart of this corner. For her to just vanish is impossible to comprehend.\'"\n}',
      position: { x: 120, y: 80 },
      size: { width: 380, height: 300 },
      rotation: 4,
    },
    {
      id: "news_l_unita_1979_09_18",
      type: "newspaper",
      title: "L'Unità: Activist Missing After Protest",
      content:
        '{\n  "publication": "L\'Unità",\n  "headline": "Student Activist Missing After Demonstration",\n  "subheadline": "Morena Conti, 20, disappeared amid the chaos of a student protest in Piazza della Signoria.",\n  "dateline": "FLORENCE",\n  "date": "Tuesday, September 18, 1979",\n  "author": "Giorgio Sala",\n  "authorRole": "Political Correspondent",\n  "hasPhoto": true,\n  "imageCaption": "File photo of Morena Conti addressing a student rally last month.",\n  "body": "Amid a tense political climate, fears are growing for Morena Conti, a 20-year-old university student and vocal activist, who vanished during a large demonstration last Saturday. The protest in Piazza della Signoria became chaotic, with minor clashes reported between different student factions.\\n\\nFriends of Ms. Conti say they were separated from her during a surge in the crowd near the Loggia dei Lanzi. She was not among those detained by police and has not been seen or heard from since. While authorities are exploring all possibilities, her political affiliations have led some to speculate she may have gone into hiding, a theory her family vehemently denies. \'Gabriella would never run,\' her older brother stated. \'She faced her challenges head-on. Someone has taken her.\'"\n}',
      position: { x: 150, y: 100 },
      size: { width: 380, height: 300 },
      rotation: -2,
    },
    {
      id: "news_gazzetta_toscana_1971_02_05",
      type: "newspaper",
      title: "Gazzetta Toscana: Nightclub Singer Disappears",
      content:
        '{\n  "publication": "Gazzetta Toscana",\n  "headline": "The Siren\'s Silence: Singer Vanishes After Show",\n  "subheadline": "Isabella Marino, known as \'La Scintilla,\' disappeared after her final performance at the Club Paradiso.",\n  "dateline": "FLORENCE",\n  "date": "Friday, February 5, 1971",\n  "author": "Enzo Biagiotti",\n  "authorRole": "Entertainment Editor",\n  "hasPhoto": true,\n  "imageCaption": "Isabella Marino performing at the Club Paradiso last week. Her powerful voice had made her a rising star.",\n  "body": "The music has stopped for Isabella Marino, the 26-year-old singer whose captivating performances were making the Club Paradiso the city\'s most talked-about nightspot. Marino, whose stage name was \'La Scintilla\' (The Spark), finished her set shortly after midnight on Wednesday and retired to her dressing room. She was never seen leaving.\\n\\nThe club\'s owner assumed she had slipped out a back entrance to avoid admirers, a common practice for the private singer. Her coat and handbag, however, were found still in her dressing room the next day. Police have questioned the club staff and a number of her ardent fans, but no credible leads have emerged in the baffling disappearance."\n}',
      position: { x: 120, y: 70 },
      size: { width: 380, height: 300 },
      rotation: 3,
    },
    {
      id: "news_il_mattino_1963_06_12",
      type: "newspaper",
      title: "Il Mattino: Seamstress Never Arrived Home",
      content:
        '{\n  "publication": "Il Mattino di Firenze",\n  "headline": "Young Seamstress Fails to Return From Atelier",\n  "subheadline": "Elena Parisi, 19, disappeared while on her regular walk home from a prominent fashion house near Via de\' Tornabuoni.",\n  "dateline": "FLORENCE",\n  "date": "Wednesday, June 12, 1963",\n  "author": "Paolo Neri",\n  "authorRole": "City Desk",\n  "hasPhoto": false,\n  "imageCaption": "",\n  "body": "A family\'s quiet life has been shattered by the disappearance of 19-year-old Elena Parisi. Elena, a gifted seamstress at a prestigious fashion atelier, finished her work as scheduled on Monday evening. She bid her colleagues farewell and began her usual fifteen-minute walk home. She never arrived.\\n\\nHer mother, with whom she lived, reported her missing late that night. Elena is described by all as a responsible and timid girl, devoted to her family and her craft. There was no young man courting her, and she had no reason to run away. Police have retraced her route from the grand workshops of the city center to her humble home across the river, but they have found no witnesses and no clues as to what happened to the young woman on that short journey."\n}',
      position: { x: 80, y: 40 },
      size: { width: 380, height: 300 },
      rotation: -1.5,
    },

    // {
    //   id: "news_venice_gazette_1948_10_25",
    //   type: "newspaper",
    //   title: "Venice Gazette: Heiress Found Dead",
    //   content: JSON.stringify({
    //     publication: "The Venice Gazette",
    //     headline: "Heiress Alessandra Bellini Found Dead",
    //     subheadline:
    //       "Noted Patron of the Arts Discovered by House Staff; Authorities Suspect Foul Play in Shocking Turn of Events.",
    //     dateline: "VENICE",
    //     date: "Saturday, October 25, 1948",
    //     author: "Giuseppe Vanni",
    //     authorRole: "Senior Crime Correspondent",
    //     hasPhoto: true,
    //     imageCaption:
    //       "The entrance to the Palazzo Bellini, where the body was discovered early this morning.",
    //     body: "Shock ripples through Venice today as Alessandra Bellini, the city's most noted patron of the arts and heir to the Bellini shipping fortune, was discovered dead within the grand foyer of the Bellini Palazzo.\n\nThe discovery was made in the early hours of the morning by the head housekeeper, who arrived to prepare the residence for a scheduled salon. Police were notified immediately, arriving on the scene at approximately 6:00 AM. While authorities remain tight-lipped regarding the specific cause of death, whispers among the staff suggest signs of a struggle, indicating foul play.\n\nChief Inspector Moretti addressed a gathering crowd of reporters earlier this afternoon. 'We are treating this investigation with the utmost severity,' Moretti stated, declining to comment on rumors of a break-in. 'The Inspectorate urges calm as inquiries begin. We have secured the scene and are currently interviewing all household staff.'\n\nAlessandra Bellini was a fixture of Venetian society, known as much for her charitable contributions to the restoration of St. Mark's Basilica as for her private, somewhat reclusive nature in recent years. Her death leaves a void in the cultural heart of the city, and speculation is already mounting regarding the disposition of the Bellini estate.\n\nNeighbors report hearing nothing unusual during the night, deepening the mystery. Was this a robbery gone wrong, or something more sinister connected to the family's long and often tumultuous history in the region? For now, the heavy iron gates of the Palazzo remain closed, guarding their secrets.",
    //   }),
    //   position: { x: 70, y: 15 },
    //   size: { width: 380, height: 300 },
    //   rotation: -2,
    // },
    // {
    //   id: "news_evening_bulletin_1948_10_26",
    //   type: "newspaper",
    //   title: "Evening Bulletin: Unusual Autopsy Notes",
    //   content: JSON.stringify({
    //     publication: "The Evening Bulletin",
    //     headline: "Examiner Notes Anomalies in Bellini Case",
    //     subheadline:
    //       "Morgue Sources cite 'Peculiar Markings' and signs of post-mortem interference not consistent with a standard robbery.",
    //     dateline: "VENICE MUNICIPAL",
    //     date: "Sunday, October 26, 1948",
    //     author: "Maria Rossi",
    //     authorRole: "Medical Beat Reporter",
    //     hasPhoto: true,
    //     imageCaption:
    //       "The Venice Municipal Morgue, currently under police guard.",
    //     body: "Sources close to the municipal morgue have leaked disturbing details regarding the autopsy of Alessandra Bellini. While the official police report is yet to be released, insiders describe 'peculiar markings' found on the victim's torso that do not appear to be the result of the immediate cause of death.\n\nFurthermore, reports suggest the body may have been 'meticulously cleaned' prior to discovery, a detail that has baffled forensic experts. Typically, violent altercations leave behind a wealth of trace evidence, but the scene—and the victim—were reportedly found in a state of eerie preservation.\n\n'It is unlike anything we have seen in a homicide of this nature,' claimed one source who wished to remain anonymous. 'There is a ritualistic quality to the scene preservation that suggests the killer felt remorse, or perhaps, a sense of reverence.'\n\nCitizens have already begun to speculate connections to old Bellini rivalries, dating back to the turn of the century. Is this a crime of passion, or a cold, calculated message sent by a rival faction? The lack of forced entry at the Palazzo only adds to the theory that the killer may have been known to the victim.\n\nPolice officials have refused to comment on the autopsy findings, citing the ongoing nature of the investigation. However, the presence of additional guards outside the morgue this evening suggests that the authorities are taking these anomalies very seriously.",
    //   }),
    //   position: { x: 82, y: 40 },
    //   size: { width: 260, height: 280 },
    //   rotation: 3,
    // },
    // {
    //   id: "news_morning_dispatch_1948_10_27",
    //   type: "newspaper",
    //   title: "Morning Dispatch: Witness Places Archivist Near Scene",
    //   content: JSON.stringify({
    //     publication: "The Morning Dispatch",
    //     headline: "Archivist Reportedly Seen Near Scene",
    //     subheadline:
    //       "Anonymous tip places retired historian Marco Rossi at the Palazzo gates hours before discovery.",
    //     dateline: "SAN MARCO",
    //     date: "Monday, October 27, 1948",
    //     author: "Thomas K. Blackwood",
    //     authorRole: "Investigative Journalist",
    //     hasPhoto: true,
    //     imageCaption:
    //       "Marco Rossi (left) pictured at a Historical Society gala in 1946.",
    //     body: "A potential break in the Bellini murder case has emerged following an anonymous tip received by the Dispatch early this morning. A witness claims to have spotted Marco Rossi, a retired archivist specializing in Florentine history, standing near the rear service entrance of the Bellini Palazzo at approximately 2:00 AM on the night of the murder.\n\nMr. Rossi, who has worked with the Bellini family in the past to catalog their extensive library, was reportedly seen 'pacing nervously' and checking a pocket watch before disappearing into the shadows of the alleyway.\n\nPolice have not officially named Rossi as a suspect, but investigators were seen knocking at his residence in the San Polo district earlier today. Neighbors report that Mr. Rossi has not been seen since the news of the murder broke yesterday morning.\n\nThe connection between a mild-mannered historian and the brutal murder of a high-profile heiress remains unclear. However, given the rumors of 'peculiar markings' found on the body, some are beginning to wonder if the motive lies not in money, but in history itself. Did Alessandra Bellini uncover a secret in her family archives that Rossi was desperate to protect?\n\nInvestigators are urging anyone with information regarding Marco Rossi's whereabouts to contact the precinct immediately.",
    //   }),
    //   position: { x: 65, y: 60 },
    //   size: { width: 260, height: 180 },
    //   rotation: -4,
    // },

    // ----------------------------------
    // Missing person report
    // ----------------------------------
    {
      id: "mp_elena_parisi_1963",
      type: "missing-person-report",
      title: "Missing Person: Elena Parisi",
      content: JSON.stringify({
        caseNumber: "MP-63-112",
        dateFiled: "June 11, 1963",
        reportingOfficer: "Brigadiere Gallo",
        name: "PARISI, Elena",
        nickname: '"Lena"',
        dob: "10/03/1944",
        age: "19",
        sex: "Female",
        race: "Caucasian",
        height: "160 cm",
        weight: "52 kg",
        hair: "Dark Brown, Long, usually worn in a bun.",
        eyes: "Brown",
        scarsMarks: "Numerous pinprick scars on fingertips from sewing work.",
        dental: "No known issues.",
        lastSeenDate: "June 10, 1963",
        lastSeenTime: "19:05 (approx)",
        lastSeenLocation: "Atelier 'Seta Rossa', Via de' Tornabuoni",
        clothingWorn:
          "Simple brown cotton dress, grey wool shawl, dark stockings, worn leather shoes. Wore a small, silver St. Christopher medal on a chain.",
        imageUrl: PREDEFINED_IMAGES.portrait_elena_parisi,
        summary:
          "Subject reported missing by her mother, Sofia Parisi, with whom she resides. Elena is a creature of habit. Her daily routine consists of walking from her home in the Oltrarno to the 'Seta Rossa' atelier on Via de' Tornabuoni, and returning via the same route immediately after work. She has no known romantic interests and a very small social circle. Mother states Elena is timid and would never run away or deviate from her path. She was expected home at approximately 19:30 on June 10th and never arrived.",

        fieldNotes: [
          {
            time: "09:00, June 11",
            location: "Parisi Residence, Oltrarno",
            source: "Mother (Sofia Parisi)",
            note: "Mother is distraught. States Elena has been 'distracted' for the last week. 'Not herself.' She mentioned her recent movements: On Sunday (June 9) she attended morning mass at the Church of San Felice (#1), then took a long, quiet walk through the Boboli Gardens (#2), which is unusual for her. On Saturday (June 8) she went to the Mercato di San Lorenzo (#18) for thread. Mother says Elena had been humming a song she didn't recognize and complained of feeling 'watched' on her walk home. Kept mentioning old wives' tales about 'il Tessitore' — 'the Weaver' who is said to steal the threads of life from girls who walk alone at twilight. I told her it was nonsense.",
          },
          {
            time: "11:30, June 11",
            location: "Atelier Seta Rossa, Via de' Tornabuoni (#9)",
            source: "Head Seamstress (Signora Conti)",
            note: "Confirms Elena left at 19:00 on the dot, as always. Describes her as their most precise and quietest worker. Notes that for the past month, Elena's work had become even more intricate, almost obsessively so. Says Elena never spoke of any troubles or any man. A good, simple girl devoted to God and her mother.",
          },
          {
            time: "14:00, June 11",
            location: "Ponte Vecchio (#5)",
            source: "Chestnut Vendor (Giorgio)",
            note: "Witness recognizes Elena's description. 'Ah, the quiet one. Yes, she crosses every evening. Never looks at the shops, just walks.' He confirms seeing her cross the bridge at her usual time on Monday. He noted she paused halfway across and looked south, towards the Via de' Bardi (#3), for a few moments before continuing on her way. He saw nothing else unusual.",
          },
          {
            time: "16:00, June 11",
            location: "Route Search",
            source: "Brigadiere Gallo (Self)",
            note: "Walked the entire probable route from the atelier to the Parisi residence. Searched alleyways and side streets. No dropped items, no signs of a struggle, and no witnesses have come forward who saw anything happen to the girl. It's as if she vanished from the bridge itself. The mother's talk of a 'Weaver' is just grief-stricken fantasy. For now, we have nothing.",
          },
        ],
      }),
      position: { x: 40, y: 30 },
      size: { width: 220, height: 300 },
      rotation: -1,
    },
    {
      id: "mp_isabella_marino_1971",
      type: "missing-person-report",
      title: "Missing Person: Isabella Marino",
      content: JSON.stringify({
        caseNumber: "MP-71-028",
        dateFiled: "February 4, 1971",
        reportingOfficer: "Maresciallo Vianello",
        name: "MARINO, Isabella",
        nickname: '"La Scintilla" (The Spark)',
        dob: "11/08/1944",
        age: "26",
        sex: "Female",
        race: "Caucasian",
        height: "165 cm",
        weight: "58 kg",
        hair: "Red, shoulder length, usually worn up during performances.",
        eyes: "Green",
        scarsMarks: "Small star tattoo on the inside of her right wrist.",
        dental: "Available upon request from family dentist in Siena.",
        lastSeenDate: "February 4, 1971",
        lastSeenTime: "00:30 (approx)",
        lastSeenLocation: "Dressing Room, Club Paradiso",
        clothingWorn:
          "Black sequined stage dress, long black gloves, rhinestone earrings shaped like musical notes.",
        summary:
          "Subject is a professional singer at the 'Club Paradiso.' The club owner, Franco Rossi, states she completed her final set after midnight and retired to her private dressing room. This was the last time anyone confirms seeing her. It was assumed she left via the rear exit to avoid patrons, a common habit. When she failed to arrive for rehearsals this afternoon, Rossi checked the dressing room and found her coat and handbag untouched. No signs of struggle. Rossi is adamant she was a professional and would never miss a performance.",
        imageUrl: PREDEFINED_IMAGES.portrait_MARINO_Isabella,
        fieldNotes: [
          {
            time: "16:00, Feb. 4",
            location: "Club Paradiso (#7)",
            source: "Owner (Franco Rossi)",
            note: "Rossi claims Isabella was the best thing to happen to his club, but that she was 'a closed book.' He noted a change in her recently. 'She had a fire in her, but the last few weeks, it was like she was trying to burn something away.' He mentions a very wealthy patron who began attending every show. 'Never ordered a drink, just watched. Isabella told me he gave her the shivers, but men like that are part of the business, no?'",
          },
          {
            time: "18:30, Feb. 4",
            location: "Subject's Apartment, Oltrarno",
            source: "Piano Player (Leo Ricci)",
            note: "Leo was her only real friend. He says Isabella had become obsessed with her legacy. On Monday (Feb 1), they visited an old bookstore near the Mercato Nuovo (#8), where she bought a book on Etruscan mythology. She talked about a 'patron god' who could grant a voice that 'echoed in stone forever.' On Tuesday (Feb 2), she seemed panicked, insisted on taking a walk through the crowded Piazza della Signoria (#6) 'to feel safe.' Leo believes her recent success attracted someone dangerous. 'She was a spark, you see. And some men don't want to watch a spark, they want to own it. Or put it out.'",
          },
          {
            time: "19:00, Feb. 4",
            location: "Club Paradiso (#7)",
            source: "Bartender (Marco)",
            note: "Marco confirms the story of the wealthy patron. 'Old money. Sat in the dark corner every night. Always wore a signet ring with a strange 'B' on it. Last night, after her final song, I saw him leave. He didn't use the front door. He walked towards the back, where the staff exit is.' Marco thought it was odd, but he was busy. He says Isabella seemed more frightened of him than flattered.",
          },
          {
            time: "21:00, Feb. 4",
            location: "Via de' Tornabuoni (#9)",
            source: "Flower Vendor (Old Woman)",
            note: "Followed up on a lead that the patron sent flowers. An old flower seller near the luxury shops confirms a well-dressed man paid her handsomely every week to deliver a single, perfect white lily to the Club Paradiso, addressed to 'La Scintilla.' The last delivery was Wednesday. She says the man had 'the saddest eyes in all of Florence.' Did not see where he went.",
          },
        ],
      }),
      position: { x: 50, y: 40 },
      size: { width: 220, height: 300 },
      rotation: 2,
    },
    {
      id: "mp_morena_conti_1979",
      type: "missing-person-report",
      title: "Missing Person: Morena Conti",
      content: JSON.stringify({
        caseNumber: "MP-79-541",
        dateFiled: "September 17, 1979",
        reportingOfficer: "Vice Brigadiere Bianchi",
        name: "CONTI, Morena",
        nickname: "N/A",
        dob: "12/05/1959",
        age: "20",
        sex: "Female",
        race: "Caucasian",
        height: "168 cm",
        weight: "55 kg",
        hair: "Black, short and straight.",
        eyes: "Dark Brown",
        scarsMarks: "Faint scar above right eyebrow.",
        dental: "No known issues.",
        lastSeenDate: "September 15, 1979",
        lastSeenTime: "17:00 (approx)",
        lastSeenLocation: "Piazza della Signoria, near Loggia dei Lanzi",
        clothingWorn:
          "Denim jeans, red turtleneck sweater, brown leather jacket. Carried a canvas shoulder bag.",
        summary:
          "Subject, a university student and known political activist, was reported missing by her brother, Marco Conti. She was last seen during a large student demonstration in Piazza della Signoria (#6) that devolved into minor scuffles. Friends state they were separated in the surging crowd. Subject was not among those detained. Political motivations are being considered, as the subject's brother claims she had 'made enemies.' Possibility of voluntary disappearance to join a radical cell has not been ruled out.",
        imageUrl: PREDEFINED_IMAGES.portrait_CONTI_Morena,
        fieldNotes: [
          {
            time: "10:00, Sept. 17",
            location: "Conti Residence",
            source: "Brother (Marco Conti)",
            note: "Brother is adamant she was taken. 'Morena wouldn't run, she would fight.' He says she spent the last month at the National Library (#15) researching the historical ties between certain powerful Florentine families and the Fascist regime. On Thursday (Sept. 13), after a meeting at the University (#12), she told him she felt she was being watched by 'men who don't wear uniforms.' She was investigating a name: Bellini.",
          },
          {
            time: "14:30, Sept. 17",
            location: "Student Cafe",
            source: "Fellow Activist (Giulia)",
            note: "Giulia confirms Morena's paranoia. 'She wasn't crazy, she was careful.' Last week at a trattoria (#10), Morena showed her an old photograph of a man in a blackshirt uniform standing outside a grand palazzo in the Oltrarno. Morena was convinced the family still pulled strings in the city's politics. She called them 'the ghosts that never left.' This was to be the subject of her next speech.",
          },
          {
            time: "18:00, Sept. 17",
            location: "Piazza della Signoria (#6)",
            source: "Patrol Officer",
            note: "The protest was chaos. It would have been easy for anyone to be pulled into a car or an alleyway unnoticed. We found a canvas bag near the fountain containing political pamphlets and a history book on Etruscan art. No wallet or identification inside. We assumed it was discarded.",
          },
          {
            time: "20:00, Sept. 17",
            location: "Fiesole Roman Ruins (#22)",
            source: "Informant",
            note: "A source mentions seeing a young woman matching the subject's description getting into a large, dark Lancia sedan near Fiesole the evening of the protest. The informant, who has proven unreliable in the past, claimed the car belonged to 'powerful people' and it was best to 'forget he saw anything.' Unsubstantiated.",
          },
        ],
      }),
      position: { x: 60, y: 50 },
      size: { width: 220, height: 300 },
      rotation: -2,
    },
    {
      id: "mp_luisa_moretti_1988",
      type: "missing-person-report",
      title: "Missing Person: Luisa Moretti",
      content: JSON.stringify({
        caseNumber: "MP-88-819",
        dateFiled: "November 29, 1988",
        reportingOfficer: "Appuntato Ricci",
        name: "MORETTI, Luisa",
        nickname: "N/A",
        dob: "07/22/1953",
        age: "35",
        sex: "Female",
        race: "Caucasian",
        height: "162 cm",
        weight: "60 kg",
        hair: "Light Brown/Blonde, usually tied back.",
        eyes: "Blue",
        scarsMarks: "Calloused hands, faint scar on left cheek.",
        dental: "No known issues.",
        lastSeenDate: "November 28, 1988",
        lastSeenTime: "19:00 (approx)",
        lastSeenLocation: "Her workshop, Via de' Bardi",
        clothingWorn:
          "Dark blue work dress, leather apron (likely removed), brown coat, flat shoes. Always wore a simple gold wedding band.",
        summary:
          "Subject reported missing by her husband, Giovanni Moretti. Subject is the owner of a respected leather workshop on Via de' Bardi (#3) and is known for her punctuality and reliability. She was seen locking her workshop at the usual time. The ten-minute walk to her apartment is familiar territory. There were no signs of a robbery or struggle at the scene. Her keys are also missing. Disappearance is highly out of character.",
        imageUrl: PREDEFINED_IMAGES.portrait_MORETTI_Luisa,
        fieldNotes: [
          {
            time: "08:00, Nov. 29",
            location: "Moretti Residence",
            source: "Husband (Giovanni Moretti)",
            note: "Husband states Luisa had been preoccupied for the past two weeks by a new, very lucrative commission from a 'Signor B.' It was for a series of custom-made leather cases of an unusual design. The client was from the Palazzo Bellini (#4). She had to visit the Palazzo for a consultation last week and came back... different. 'Quiet, unnerved.' He says she started locking the workshop door during the day, which she never did. She told him the client had 'collector's eyes,' which he found to be a strange description.",
          },
          {
            time: "10:30, Nov. 29",
            location: "Via de' Bardi (#3)",
            source: "Antique Dealer ( сосед, Niccolò)",
            note: "Niccolò's shop is across the street. He confirms seeing Luisa lock up. He also mentions seeing a dark, expensive-looking car parked near the end of the street for several evenings in a row last week. 'No driver, it just sat there. Looked out of place among our work vans.' He didn't see it last night.",
          },
          {
            time: "13:00, Nov. 29",
            location: "Mercato di San Lorenzo (#18)",
            source: "Leather Supplier (Enzo)",
            note: "Enzo confirms Luisa purchased a large quantity of high-grade calfskin two weeks ago. 'More than she's ever bought at once.' She paid in cash and seemed less excited about the quality and more anxious about the task ahead. She mentioned the client specified the leather had to be dyed a very particular shade of 'Etruscan red,' a difficult and archaic process.",
          },
          {
            time: "16:00, Nov. 29",
            location: "Church of San Felice (#1)",
            source: "Parish Priest",
            note: "The priest confirms Luisa was a regular attendee of Sunday mass. He saw her this past Sunday (Nov. 27). He says she seemed troubled and stayed long after the service to pray alone. He asked if everything was alright, and she simply replied, 'Some work is a blessing, Father, and some is a burden.' A very cryptic remark from a normally straightforward woman.",
          },
        ],
      }),
      position: { x: 70, y: 60 },
      size: { width: 220, height: 300 },
      rotation: 1,
    },
    {
      id: "mp_eloisa_martin_1995",
      type: "missing-person-report",
      title: "Missing Person: Eloisa Martin",
      content: JSON.stringify({
        caseNumber: "MP-95-218",
        dateFiled: "May 10, 1995",
        reportingOfficer: "Agente Scuro (liaising with US Consulate)",
        name: "MARTIN, Eloisa",
        nickname: '"Ellie"',
        dob: "06/12/1971",
        age: "23",
        sex: "Female",
        race: "Caucasian",
        height: "5'8\" (172 cm)",
        weight: "135 lbs (61 kg)",
        hair: "Reddish-brown, curly.",
        eyes: "Blue",
        scarsMarks: "N/A",
        dental: "Records requested from USA.",
        lastSeenDate: "May 9, 1995",
        lastSeenTime: "Morning",
        lastSeenLocation: "Entrance to Boboli Gardens",
        clothingWorn:
          "White sundress, denim jacket, brown sandals. Carried a leather-bound journal.",
        summary:
          "Subject is a US citizen on a university study-abroad program. Reported missing by friends after failing to show up for a planned dinner. Last seen entering the Boboli Gardens (#2). A search located her personal journal on a remote bench, but no other trace of the subject was found. Family has been notified and is en route to Florence. No evidence of foul play at this time.",
        imageUrl: PREDEFINED_IMAGES.portrait_MARTIN_Eloisa,
        fieldNotes: [
          {
            time: "13:00, May 10",
            location: "Student Dormitory",
            source: "Friend (Sarah)",
            note: "Sarah says Eloisa wasn't just interested in textbook art history. She was obsessed with the 'dark Medici' folklore—secret passages, poisons, and pagan rituals that Christianity stamped out. On Sunday (May 7), Eloisa spent all afternoon at an old bookstore near the Mercato Nuovo (#8), buying books on 'Etruscan Mysteries.' She claimed the Boboli Gardens were designed on an ancient energy 'nexus.'",
          },
          {
            time: "15:00, May 10",
            location: "Boboli Gardens (#2)",
            source: "Groundskeeper",
            note: "Groundskeeper found the journal. Says he saw the girl sitting on the bench talking to an older gentleman. 'Very elegant, old-world. Looked like a count from a movie.' He says they were looking at a map together, and then walked off towards the less-manicured, wooded section of the gardens. He assumed they were a couple.",
          },
          {
            time: "17:00, May 10",
            location: "Police HQ",
            source: "Journal Analysis (Excerpt)",
            note: "The final entry is more detailed than initially reported. '...the statues here aren't just art, they're guardians. I met a man who understands. He says his family has watched over this hill for a thousand years. He knew the books I've been reading! He told me the public grottoes are a distraction. He's going to show me the 'real' one—a place the Medici sealed away. He says it's on his family's property, which borders the gardens. How can I not go?'",
          },
          {
            time: "19:30, May 10",
            location: "Piazzale Michelangelo (#20)",
            source: "Tourist Witness",
            note: "A Canadian tourist taking photos thinks he might have seen the girl. 'A redhead in a white dress, with a very serious-looking older man.' They were not here, but he saw them from this viewpoint, walking along a high wall on the far side of the Boboli Gardens, in an area that doesn't appear to have a public path. He thought it was romantic. The time was late afternoon.",
          },
        ],
      }),
      position: { x: 100, y: 90 },
      size: { width: 220, height: 300 },
      rotation: 0,
    },
    {
      id: "mp_amelia_giordano_2004",
      type: "missing-person-report",
      title: "Missing Person: Amelia Giordano",
      content: JSON.stringify({
        caseNumber: "MP-04-391",
        dateFiled: "July 21, 2004",
        reportingOfficer: "Sovrintendente De Angelis",
        name: "GIORDANO, Amelia",
        nickname: "N/A",
        dob: "02/28/1962",
        age: "42",
        sex: "Female",
        race: "Caucasian",
        height: "165 cm",
        weight: "63 kg",
        hair: "Grey-streaked Brown, usually in a ponytail.",
        eyes: "Hazel",
        scarsMarks: "Paint stains on hands and forearms.",
        dental: "On file.",
        lastSeenDate: "July 20, 2004",
        lastSeenTime: "16:00 (approx)",
        lastSeenLocation: "Church of San Felice, Oltrarno",
        clothingWorn:
          "White coveralls over jeans and a t-shirt, sturdy work boots.",
        summary:
          "Subject is a highly respected art restorer reported missing by her husband, Marco. Her current project was a 15th-century fresco inside the Church of San Felice (#1). The parish priest, Father Lorenzo, was the last to see her. The church was later found locked from the inside. All her personal effects (purse, keys, phone, lunch) were left on a workbench. No signs of forced entry or exit.",
        imageUrl: PREDEFINED_IMAGES.portrait_GIORDANO_Amelia,
        fieldNotes: [
          {
            time: "09:00, Jul. 21",
            location: "Giordano Residence",
            source: "Husband (Marco)",
            note: "Marco says Amelia was troubled by the fresco project. About two weeks ago, she told him she'd found something 'wrong.' While cleaning a section, she discovered an 'under-painting'—an older, rougher image beneath the Christian art. She described it as pagan, disturbing. She started having nightmares. Her phone records show several calls to the history department at the University of Florence (#12) last week.",
          },
          {
            time: "11:30, Jul. 21",
            location: "Church of San Felice (#1)",
            source: "Parish Priest (Father Lorenzo)",
            note: "The priest is very shaken. He says Amelia was a professional. He confirms she was worried about what she'd found, but he advised her to simply paint over it and complete her commission. 'Some things are better left buried.' He reluctantly mentions an old parish legend about the church being built on a 'pagan place of sacrifice' to 'tame the old spirits.' He dismisses it as superstition.",
          },
          {
            time: "15:00, Jul. 21",
            location: "State Archives (#17)",
            source: "Archivist",
            note: "A clerk confirms a woman matching Amelia's description was here last Friday (Jul. 16). She wasn't looking at church records. She was requesting architectural blueprints and property deeds for the large palazzo adjacent to the church grounds, dating back to the 16th century.",
          },
          {
            time: "18:00, Jul. 21",
            location: "Church of San Felice (#1)",
            source: "Forensics Team",
            note: "A thorough search of the church reveals no hidden exits. However, we found fine stone dust on the handle of her trowel that does not match the plaster of the church walls. More significantly, we found a small, hastily scrawled note tucked into her wallet, which she left behind. It just says: 'It's not a painting. It's a map.'",
          },
        ],
      }),
      position: { x: 90, y: 80 },
      size: { width: 220, height: 300 },
      rotation: -1,
    },
    {
      id: "mp_norina_miller_2016",
      type: "missing-person-report",
      title: "Missing Person: Norina Miller",
      content: JSON.stringify({
        caseNumber: "MP-16-088",
        dateFiled: "March 14, 2016",
        reportingOfficer: "Ispettore Rossi",
        name: "MILLER, Norina",
        nickname: '"Nori"',
        dob: "04/11/1994",
        age: "21",
        sex: "Female",
        race: "Caucasian",
        height: "170 cm",
        weight: "54 kg",
        hair: "Blonde, often messy in a bun with clay dust.",
        eyes: "Grey",
        scarsMarks: "N/A",
        dental: "All records are with family in Germany.",
        lastSeenDate: "March 12, 2016",
        lastSeenTime: "22:10 (approx)",
        lastSeenLocation: "Exit, Biblioteca Nazionale Centrale",
        clothingWorn:
          "Black hoodie, paint-splattered jeans, grey sneakers, carrying a dark green backpack.",
        summary:
          "Subject is a German national and final-year sculpture student at the Accademia di Belle Arti (#11). Reported missing by her roommate, Alessia, after failing to return from a late-night study session at the National Library (#15). Her phone goes straight to voicemail. Social media accounts are inactive. Subject is described as intensely focused on her final thesis project and not socially active. Disappearance is considered highly unusual.",
        imageUrl: PREDEFINED_IMAGES.portrait_MILLER_Norina,
        fieldNotes: [
          {
            time: "11:00, Mar. 14",
            location: "Shared Apartment, Sant'Ambrogio (#16)",
            source: "Roommate (Alessia)",
            note: "Alessia states Norina's thesis was on 'the permanence of form in Etruscan sculpture.' For the last month, Norina was obsessed with finding a patron for her work. She mentioned meeting an older, wealthy 'collector' at the Archaeology Museum (#12) who was impressed with her knowledge. This man offered her access to his family's private, uncatalogued collection for her research. She was secretive about his identity, only saying his family was 'older than Florence itself.'",
          },
          {
            time: "14:00, Mar. 14",
            location: "Accademia di Belle Arti (#11)",
            source: "Professor Conti",
            note: "Professor describes Norina as his most promising, yet most obsessive, student. He reviewed her recent research notes. They are filled with sketches of a specific Etruscan motif—a stylized, monstrous figure devouring a star. He says these notes have become less academic and more frantic recently, with annotations like 'He says they are not myths' and 'Form is a prison for the spirit.'",
          },
          {
            time: "17:30, Mar. 14",
            location: "Biblioteca Nazionale Centrale (#15)",
            source: "CCTV Footage",
            note: "Reviewed security footage. Subject is seen leaving at 22:08. She does not head east towards her apartment. Instead, she walks west for a moment, then appears to be greeted by someone in a dark, luxury sedan that pulls up to the curb. The license plate is obscured by glare. She gets into the vehicle willingly. The car then heads south, across the Arno.",
          },
          {
            time: "19:00, Mar. 14",
            location: "Local Trattoria (#10)",
            source: "Waiter",
            note: "A waiter remembers Norina. She came in for coffee last Friday (Mar. 11). She wasn't alone. She was with a distinguished, older gentleman in a very expensive suit. 'She looked mesmerized, like a student with a master. He did all the talking. I remember he paid with a black credit card that just had a single, golden 'B' on it.'",
          },
        ],
      }),
      position: { x: 80, y: 70 },
      size: { width: 220, height: 300 },
      rotation: 3,
    },

    // ----------------------------------
    // Receipt: SAR report
    // ----------------------------------
    // {
    //   id: "sar_report_black_creek",
    //   type: "search-and-rescue-report",
    //   title: "SAR Map: Black Creek Sector",
    //   content: JSON.stringify({
    //     operationName: "SEARCH OP: 'ELLIE'",
    //     date: "19 OCT 1998",
    //     sector: "SECTOR 4-BRAVO",
    //     gridReference: "412-990",
    //     // Custom Legend
    //     legend: [
    //       {
    //         color: "#bbf7d0",
    //         label: "Ground Searched (Foot)",
    //         pattern: "solid",
    //       },
    //       { color: "#fca5a5", label: "Unstable / Marsh", pattern: "hatched" },
    //       { color: "#fde047", label: "POI Found (Clothing)", pattern: "solid" },
    //       { color: "#94a3b8", label: "Structure / Cabin", pattern: "solid" },
    //     ],
    //     // Narrative
    //     briefing:
    //       "Subject is a 9-year-old female, last seen wearing a red jacket. Canine units tracked scent to the edge of Black Creek marshlands before losing trail due to rising water levels.",
    //     terrainNotes:
    //       "Heavy fog layer expected at 0600. Ground is extremely soft in Sector 1B. Search teams advised to use tether lines. Visibility < 20 feet.",
    //     // Log Table
    //     searchLog: [
    //       { time: "06:15", unit: "K9-1", notes: "Deployed at trailhead." },
    //       {
    //         time: "07:30",
    //         unit: "ALPHA",
    //         notes: "Sector 1A Cleared. Negative contact.",
    //       },
    //       {
    //         time: "08:45",
    //         unit: "BRAVO",
    //         notes: "Found red fabric on thorn bush. Grid 412-992.",
    //       },
    //       {
    //         time: "09:00",
    //         unit: "HQ",
    //         notes: "All units converge on Grid 412. Diving team requested.",
    //       },
    //     ],
    //     author: "LT. MILLER",
    //     mapImageUrl: PREDEFINED_IMAGES.map_city,
    //   }),
    //   position: { x: 20, y: 20 },
    //   size: { width: 300, height: 200 }, // Preview size
    //   rotation: 0,
    // },
    {
      id: "sar_report_amelia_giordano_2004",
      type: "search-and-rescue-report",
      title: "SAR Report: Amelia Giordano",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'AFFRESCO'",
        date: "21 LUGLIO 2004",
        sector: "SETTORE 1-ALFA: OLTRARNO",
        gridReference: "Map Grid Ref: 48-62",
        legend: [
          {
            color: "#ef4444",
            label: "Primary Scene Lockdown (Church #1)",
            pattern: "solid",
          },
          {
            color: "#22c55e",
            label: "Zone 1 Canvass (Piazza & Public Streets)",
            pattern: "solid",
          },
          {
            color: "#facc15",
            label: "Zone 2 Canvass (Probable Route Trace)",
            pattern: "hatched",
          },
          {
            color: "#a8a29e",
            label: "Private Property (Access Denied)",
            pattern: "solid",
          },
        ],
        briefing:
          "Focus of the operation is the disappearance of art restorer Amelia Giordano from a worksite found locked from the inside. Initial objective is to confirm or deny subject's presence within the primary scene (Church of San Felice) and conduct a thorough canvass of the immediate vicinity for witnesses.",
        terrainNotes:
          "The primary scene is a dense, stone structure. The rear of the church directly abuts the high stone privacy wall of the Palazzo Bellini (#4), a large private estate. This wall is over 4 meters high and presents a significant physical and legal barrier to a wider search.",
        searchLog: [
          {
            time: "08:30",
            unit: "SQUADRA-A",
            notes:
              "Primary Scene (Church, #1) secured. Perimeter established around Piazza San Felice.",
          },
          {
            time: "09:45",
            unit: "SQUADRA-B",
            notes:
              "Commenced Zone 1 Canvass. Door-to-door interviews conducted on all adjacent streets. No witnesses to subject's exit.",
          },
          {
            time: "11:00",
            unit: "HQ",
            notes:
              "Attempted to survey rear of church from adjacent property (Palazzo Bellini, #4). Access was politely but firmly denied by the groundskeeper, citing family privacy. Legal liaison notified.",
          },
          {
            time: "12:15",
            unit: "SCIENTIFICA",
            notes:
              "Forensics reports discovery of note ('It's not a painting. It's a map.') and non-matching stone dust on subject's tools.",
          },
          {
            time: "14:00",
            unit: "SQUADRA-B",
            notes:
              "Zone 2 Canvass initiated, tracing probable walking route from church towards Ponte Vecchio (#5). Negative contact.",
          },
          {
            time: "16:30",
            unit: "INGEGNERI",
            notes:
              "Structural survey of church concluded. No hidden passages, crypts, or points of egress identified. The scene is structurally sound and secure.",
          },
          {
            time: "18:00",
            unit: "HQ",
            notes:
              "All public-access areas within a 500-meter radius have been cleared. With no evidence the subject ever left the inexplicably sealed church, the ground search is suspended. Case transferred to investigative division.",
          },
        ],
        author: "SOVRINTENDENTE DE ANGELIS",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 100, y: 90 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_isabella_marino_1971",
      type: "search-and-rescue-report",
      title: "SAR Report: Isabella Marino",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'SCINTILLA'",
        date: "04 FEBBRAIO 1971",
        sector: "SETTORE 3-DELTA: CENTRO STORICO",
        gridReference: "Map Grid Ref: 40-40",
        legend: [
          {
            color: "#ef4444",
            label: "Primary Scene Lockdown (Club #7)",
            pattern: "solid",
          },
          {
            color: "#22c55e",
            label: "Zone 1 Search (Rear Alley & Exits)",
            pattern: "solid",
          },
          {
            color: "#facc15",
            label: "Zone 2 Canvass (Local Streets)",
            pattern: "hatched",
          },
          {
            color: "#93c5fd",
            label: "Witness Interviewed",
            pattern: "solid",
          },
        ],
        briefing:
          "Initial response to a missing person report for Isabella Marino, a 26-year-old singer. Subject vanished from her dressing room at the Club Paradiso (#7) after a performance, leaving her coat and handbag. The primary theory is that she exited via the rear service alley.",
        terrainNotes:
          "The area is a maze of narrow, poorly lit medieval streets. The club's rear exit opens into a secluded alley with multiple connecting passages, providing numerous routes for a discreet departure or a potential abduction with minimal visibility.",
        searchLog: [
          {
            time: "16:00",
            unit: "PATTUGLIA-1",
            notes:
              "Arrived on scene. Secured Club Paradiso and established a perimeter around the rear service alley.",
          },
          {
            time: "16:45",
            unit: "SQUADRA-A",
            notes:
              "Zone 1 Search initiated. A thorough search of the alleyway and dumpsters reveals no discarded items or signs of a struggle.",
          },
          {
            time: "17:30",
            unit: "HQ",
            notes:
              "Initial interviews with club staff conducted. Owner (F. Rossi) and Bartender (Marco) confirm subject's routine and mention a recurring, unidentified wealthy patron.",
          },
          {
            time: "18:00",
            unit: "PATTUGLIA-1",
            notes:
              "Located and interviewed the subject's pianist, Leo Ricci, at his apartment. He states he left the club via the FRONT entrance at approx. 00:45, as he had to secure his sheet music. He claims to have seen nothing unusual on his way home.",
          },
          {
            time: "19:30",
            unit: "SQUADRA-A",
            notes:
              "Zone 2 Canvass of surrounding streets begins. All-night vendors and residents are interviewed. No one reports seeing the subject or any disturbance.",
          },
          {
            time: "21:00",
            unit: "HQ",
            notes:
              "The search of the physical area has yielded no results. With no witnesses, no physical evidence of a crime, and no ransom note, all active ground search units are recalled. Case is now a matter for the investigative branch.",
          },
        ],
        author: "MARESCIALLO VIANELLO",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 150, y: 25 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_norina_miller_2016",
      type: "search-and-rescue-report",
      title: "SAR Report: Norina Miller",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'TESI'",
        date: "13-14 MARZO 2016",
        sector: "SETTORE 5-CHARLIE: LUNGARNO",
        gridReference: "Map Grid Ref: 70-48",
        legend: [
          {
            color: "#fde047",
            label: "Last Confirmed Sighting (LNS)",
            pattern: "solid",
          },
          {
            color: "#facc15",
            label: "Expected Route (Home)",
            pattern: "hatched",
          },
          {
            color: "#ef4444",
            label: "Actual Vehicle Route (Tracked)",
            pattern: "solid",
          },
          {
            color: "#a8a29e",
            label: "CCTV Blind Spot / Trail Lost",
            pattern: "solid",
          },
        ],
        briefing:
          "Response to a missing persons report for Norina Miller, a 21-year-old German student. Initial investigation focused on her expected route home from the Biblioteca Nazionale (#15) to her apartment near Sant'Ambrogio (#16). Discovery of CCTV footage has significantly altered the search parameters.",
        terrainNotes:
          "The search area is a high-traffic urban core with extensive, but incomplete, CCTV coverage. The vehicle's path towards the Oltrarno district involves numerous small, historic streets with limited camera visibility, presenting a major challenge to continuous tracking.",
        searchLog: [
          {
            time: "10:00, Mar. 13",
            unit: "VOLANTE-1",
            notes:
              "Patrol dispatched to subject's apartment. Confirmed no signs of foul play. Roommate interviewed.",
          },
          {
            time: "14:30, Mar. 13",
            unit: "DIGOS",
            notes:
              "Began canvass of expected route (Library to Sant'Ambrogio). No witnesses found.",
          },
          {
            time: "17:30, Mar. 14",
            unit: "TEC-UNIT",
            notes:
              "CRITICAL UPDATE: CCTV from outside the National Library (#15) shows subject willingly entering a dark, late-model luxury sedan at 22:08. Vehicle license plate is unreadable due to headlight glare.",
          },
          {
            time: "19:00, Mar. 14",
            unit: "TEC-UNIT",
            notes:
              "Cell phone data analyzed. Subject's phone emitted its last signal at 22:15 from a tower near Ponte alle Grazie, consistent with the vehicle heading south across the Arno. Phone has been inactive since.",
          },
          {
            time: "21:00, Mar. 14",
            unit: "HQ",
            notes:
              "City-wide traffic camera footage reviewed. The sedan was briefly tracked south across the bridge before turning west. It was lost to camera coverage in the maze of streets in the Oltrarno district.",
          },
          {
            time: "23:00, Mar. 14",
            unit: "HQ",
            notes:
              "All attempts to identify the vehicle through partial plates or BOLO alerts have failed. With no further digital or physical trail, all active search teams are stood down. Case now relies on identifying the vehicle or its driver.",
          },
        ],
        author: "ISPETTORE ROSSI",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 90, y: 80 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_eloisa_martin_1995",
      type: "search-and-rescue-report",
      title: "SAR Report: Eloisa Martin",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'GIARDINO'",
        date: "10-11 MAGGIO 1995",
        sector: "SETTORE 2-BRAVO: GIARDINO DI BOBOLI",
        gridReference: "Map Grid Ref: 50-75",
        legend: [
          {
            color: "#22c55e",
            label: "Zone 1 Search Grid (Public Gardens)",
            pattern: "solid",
          },
          {
            color: "#fde047",
            label: "POI: Journal Discovered",
            pattern: "solid",
          },
          {
            color: "#facc15",
            label: "Zone 2 Search (Wooded Area / Periphery)",
            pattern: "hatched",
          },
          {
            color: "#a8a29e",
            label: "Adjacent Private Property (Palazzo Bellini)",
            pattern: "solid",
          },
        ],
        briefing:
          "Multi-agency operation (Questura di Firenze, US Consulate liaison) for missing American student Eloisa Martin, 23. Last seen entering the Boboli Gardens (#2). The search is predicated on evidence recovered from the victim's personal journal.",
        terrainNotes:
          "The search area is vast and complex, covering 45,000 square meters of varied terrain, including formal lawns, dense woods, and multiple stone structures. The entire southern and western perimeter is bordered by high stone walls of private estates, most notably the Palazzo Bellini (#4).",
        searchLog: [
          {
            time: "14:00, May 10",
            unit: "PATTUGLIA-3",
            notes:
              "Initiated search based on friends' report. Grid-by-grid sweep of main pathways in Zone 1.",
          },
          {
            time: "15:15, May 10",
            unit: "PATTUGLIA-3",
            notes:
              "Groundskeeper reports discovery of subject's journal on a bench in the upper garden. Location secured as POI.",
          },
          {
            time: "18:00, May 10",
            unit: "HQ",
            notes:
              "Journal contents analyzed. Mention of a meeting with an unidentified male and an invitation to a 'private grotto' on an adjacent property is noted as a priority lead.",
          },
          {
            time: "20:00, May 10",
            unit: "HQ",
            notes:
              "Tip received from a tourist witness at Piazzale Michelangelo (#20) corroborating journal entry. Witness saw a couple matching the description walking along the high western wall of the gardens.",
          },
          {
            time: "09:00, May 11",
            unit: "SQUADRA-C",
            notes:
              "Focused search of Zone 2, the wooded periphery along the western wall bordering the Palazzo Bellini property. No breaches in the wall found. No discarded items.",
          },
          {
            time: "11:30, May 11",
            unit: "HQ",
            notes:
              "Formal request made to the owners of Palazzo Bellini for access to their grounds to search for the 'grotto' mentioned in the journal. Request was denied by the family's legal representative, citing a lack of a warrant or probable cause.",
          },
          {
            time: "16:00, May 11",
            unit: "HQ",
            notes:
              "The search of all public areas of the Boboli Gardens is complete. With the primary lead pointing to inaccessible private property, and no legal grounds to proceed, the physical search is officially suspended. The prevailing theory is voluntary departure with an unknown companion.",
          },
        ],
        author: "AGENTE SCURO",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 110, y: 100 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_morena_conti_1979",
      type: "search-and-rescue-report",
      title: "SAR Report: Morena Conti",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'MANIFESTAZIONE'",
        date: "15-16 SETTEMBRE 1979",
        sector: "SETTORE 6-DELTA: PIAZZA DELLA SIGNORIA",
        gridReference: "Map Grid Ref: 52-45",
        legend: [
          {
            color: "#fca5a5",
            label: "Primary Protest Zone / Area of Chaos",
            pattern: "hatched",
          },
          {
            color: "#fde047",
            label: "POI: Subject's Bag Recovered",
            pattern: "solid",
          },
          {
            color: "#93c5fd",
            label: "Zone 1 Canvass (Activist Hangouts)",
            pattern: "solid",
          },
          {
            color: "#d1d5db",
            label: "Unsubstantiated Tip (Informant)",
            pattern: "solid",
          },
        ],
        briefing:
          "Response to a missing person report filed during a large-scale, unauthorized student demonstration. The operating environment is chaotic and politically charged. The primary theory, given the subject's known affiliations, is either a politically motivated abduction by a rival faction or a voluntary disappearance to join a subversive group.",
        terrainNotes:
          "Piazza della Signoria (#6) was densely packed with an estimated 2,000 individuals. Crowd surges and minor clashes with authorities were reported. Visibility was poor, and the numerous narrow streets exiting the piazza would provide ample opportunity for a discreet abduction.",
        searchLog: [
          {
            time: "18:00, Sep. 15",
            unit: "CELERE-3",
            notes:
              "Report from patrol officer of a discarded canvas bag found near the Fountain of Neptune. Contents include political pamphlets. Bag is taken as abandoned property.",
          },
          {
            time: "23:00, Sep. 15",
            unit: "HQ",
            notes:
              "Missing person report filed by subject's brother. Cross-referenced with list of detained individuals; subject is not in custody. Hospitals checked; negative contact.",
          },
          {
            time: "10:00, Sep. 16",
            unit: "SQUADRA-A",
            notes:
              "Zone 1 Canvass initiated. Plainclothes officers dispatched to student cafes and known activist meeting points near the University (#12). No one has seen or heard from the subject since the protest.",
          },
          {
            time: "14:00, Sep. 16",
            unit: "HQ",
            notes:
              "Brother's claims of subject investigating the 'Bellini' family are noted, but considered less probable than a political motive. Priority remains on known extremist groups.",
          },
          {
            time: "19:00, Sep. 16",
            unit: "INFORMANTE",
            notes:
              "An unreliable informant provides a vague tip about a dark Lancia near Fiesole (#22). Lacks actionable detail and is likely an attempt to collect a reward. Logged but not pursued.",
          },
          {
            time: "21:00, Sep. 16",
            unit: "HQ",
            notes:
              "With no physical trail, the active search is concluded. The nature of the disappearance is deemed political. Case file transferred in its entirety to DIGOS (Divisione Investigazioni Generali e Operazioni Speciali) for further investigation.",
          },
        ],
        author: "VICE BRIGADIERE BIANCHI",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 70, y: 60 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_luisa_moretti_1988",
      type: "search-and-rescue-report",
      title: "SAR Report: Luisa Moretti",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'ARTIGIANO'",
        date: "29 NOVEMBRE 1988",
        sector: "SETTORE 2-ALFA: OLTRARNO",
        gridReference: "Map Grid Ref: 60-55",
        legend: [
          {
            color: "#ef4444",
            label: "Last Known Sighting (Workshop #3)",
            pattern: "solid",
          },
          {
            color: "#facc15",
            label: "Zone 1 Search Grid (Probable Route)",
            pattern: "hatched",
          },
          {
            color: "#22c5ee",
            label: "Canine Unit Search Path",
            pattern: "solid",
          },
          {
            color: "#a8a29e",
            label: "Witness POI (Parked Car)",
            pattern: "solid",
          },
        ],
        briefing:
          "Search operation for missing artisan Luisa Moretti, 35. Subject vanished after locking her workshop on Via de' Bardi (#3) for the evening. The probable route to her home is less than 500 meters. The primary objective is a micro-search of the route for evidence and witnesses.",
        terrainNotes:
          "Via de' Bardi is a narrow, historic street. While there is residential foot traffic, it becomes quiet after the artisan shops close. The short route offers few opportunities for a disappearance to go unnoticed, which is the central challenge of this case.",
        searchLog: [
          {
            time: "08:00, Nov. 29",
            unit: "PATTUGLIA-2",
            notes:
              "Dispatched to subject's workshop (#3). Confirmed shop is locked, secure, and shows no signs of forced entry. Husband's report taken.",
          },
          {
            time: "09:30, Nov. 29",
            unit: "SQUADRA-A",
            notes:
              "Zone 1 Search initiated. A meter-by-meter foot search of Via de' Bardi and all connecting alleyways is underway.",
          },
          {
            time: "10:45, Nov. 29",
            unit: "HQ",
            notes:
              "Interview with neighboring shop owner (Niccolò) provides the only lead: a dark, expensive car was parked near the street's end for several nights. Witness did not see the car on the night of the disappearance.",
          },
          {
            time: "12:00, Nov. 29",
            unit: "K9-UNIT",
            notes:
              "Canine unit deployed at workshop entrance. Dog tracked subject's scent for approximately 15 meters along the pavement before the trail went cold abruptly. Indicates possible entry into a vehicle.",
          },
          {
            time: "15:00, Nov. 29",
            unit: "SQUADRA-A",
            notes:
              "Door-to-door canvass of all residences with a view of Via de' Bardi is complete. No one saw the subject or any disturbance. The parked car mentioned by the witness could not be corroborated.",
          },
          {
            time: "17:00, Nov. 29",
            unit: "HQ",
            notes:
              "The physical search has yielded no evidence. The canine search suggests an abduction by vehicle, which aligns with the (unconfirmed) witness statement. With no further leads, the active search is suspended. Be-on-the-lookout issued for the unidentified vehicle.",
          },
        ],
        author: "APPUNTATO RICCI",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 80, y: 70 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },
    {
      id: "sar_report_elena_parisi_1963",
      type: "search-and-rescue-report",
      title: "SAR Report: Elena Parisi",
      content: JSON.stringify({
        operationName: "OPERAZIONE: 'CUCITRICE'",
        date: "11 GIUGNO 1963",
        sector: "SETTORE 4-GAMMA: PONTE VECCHIO",
        gridReference: "Map Grid Ref: 50-50",
        legend: [
          {
            color: "#facc15",
            label: "Subject's Confirmed Route",
            pattern: "hatched",
          },
          {
            color: "#fde047",
            label: "Last Confirmed Sighting (Witness)",
            pattern: "solid",
          },
          {
            color: "#22c55e",
            label: "Zone 1 Search Grid (Oltrarno)",
            pattern: "solid",
          },
          {
            color: "#93c5fd",
            label: "Riverbank & Water Search",
            pattern: "solid",
          },
        ],
        briefing:
          "Search for a missing 19-year-old female, Elena Parisi. Subject is a creature of habit, and the search is focused on her daily walking route from her place of work on Via de' Tornabuoni (#9) to her home in the Oltrarno district. The primary challenge is the complete lack of witnesses or evidence after the midpoint of her journey.",
        terrainNotes:
          "The search path is heavily urbanized and crosses the Arno river via the Ponte Vecchio (#5), a high-traffic pedestrian bridge lined with shops. The Oltrarno district consists of a dense network of narrow residential streets. The river itself presents a significant search challenge.",
        searchLog: [
          {
            time: "09:30, Jun. 11",
            unit: "PATTUGLIA-4",
            notes:
              "Confirmed subject's departure from Atelier 'Seta Rossa' (#9). Began a foot patrol canvass of the route towards the river.",
          },
          {
            time: "11:00, Jun. 11",
            unit: "PATTUGLIA-4",
            notes:
              "No shopkeepers north of the river recall seeing the subject or any disturbance. Proceeding onto Ponte Vecchio.",
          },
          {
            time: "14:15, Jun. 11",
            unit: "HQ",
            notes:
              "Significant lead: A chestnut vendor (Giorgio) on the Ponte Vecchio (#5) positively identifies the subject. He confirms she crossed the bridge at her usual time but paused to look south. This is her last confirmed sighting.",
          },
          {
            time: "15:00, Jun. 11",
            unit: "SQUADRA-A",
            notes:
              "Zone 1 Search initiated. A comprehensive door-to-door canvass of the streets immediately south of the Ponte Vecchio is underway. No one reports seeing the subject.",
          },
          {
            time: "16:30, Jun. 11",
            unit: "VIGILI DEL FUOCO",
            notes:
              "At our request, the fire brigade has deployed a boat to search the riverbanks and check for any items in the water below the Ponte Vecchio. Negative results.",
          },
          {
            time: "18:00, Jun. 11",
            unit: "HQ",
            notes:
              "The search of the entire probable route is complete. The trail goes completely cold after the witness statement on the bridge. It is illogical for a person to vanish from such a public place without a single witness. With no further leads to pursue, the active search is suspended.",
          },
        ],
        author: "BRIGADIERE GALLO",
        mapImageUrl: PREDEFINED_IMAGES.map_city,
      }),
      position: { x: 50, y: 40 },
      size: { width: 300, height: 200 },
      rotation: 0,
    },

    {
      id: "map_florence_2025",
      type: "map",
      title: "City Map: Florence",
      content: JSON.stringify({
        title: "FLORENCE - CENTRAL DISTRICTS",
        region: "TUSCANY REGION - CASE FILE 7B-822",
        date: "2025 SURVEY",
        imageUrl: PREDEFINED_IMAGES.map_city,
        scale: "1:7,500",
        markers: [
          {
            id: "loc_1",
            x: 48,
            y: 62,
            label: "Church of San Felice",
            description: "A historic church located in the Oltrarno district.",
            type: "landmark",
          },
          {
            id: "loc_2",
            x: 50,
            y: 75,
            label: "Boboli Gardens",
            description: "A large formal garden behind the Pitti Palace.",
            type: "landmark",
          },
          {
            id: "loc_3",
            x: 60,
            y: 55,
            label: "Via de' Bardi",
            description:
              "A street running along the southern bank of the Arno.",
            type: "landmark",
          },
          {
            id: "loc_4",
            x: 50,
            y: 60,
            label: "Palazzo Bellini",
            description: "A large, private residence in the Oltrarno district.",
            type: "hub",
          },
          {
            id: "loc_5",
            x: 50,
            y: 50,
            label: "Ponte Vecchio",
            description:
              "The city's oldest bridge, connecting the two sides of the Arno.",
            type: "landmark",
          },
          {
            id: "loc_6",
            x: 52,
            y: 45,
            label: "Uffizi & Piazza Signoria",
            description:
              "The city's main square, housing the town hall and a major art gallery.",
            type: "landmark",
          },
          {
            id: "loc_7",
            x: 37,
            y: 40,
            label: "Club Paradiso",
            description: "Location of a nightclub",
            type: "landmark",
          },
          {
            id: "loc_8",
            x: 42,
            y: 42,
            label: "Old Bookstore",
            description: "A shop specializing in rare and antique manuscripts.",
            type: "atmospheric",
          },
          {
            id: "loc_9",
            x: 35,
            y: 40,
            label: "Via de' Tornabuoni",
            description: "A street known for its high-end fashion boutiques.",
            type: "landmark",
          },
          {
            id: "loc_10",
            x: 75,
            y: 35,
            label: "Local Trattoria",
            description:
              "A traditional Florentine restaurant in the Sant'Ambrogio area.",
            type: "atmospheric",
          },
          {
            id: "loc_11",
            x: 55,
            y: 20,
            label: "Accademia di Belle Arti",
            description: "The city's primary academy of fine arts.",
            type: "resource",
          },
          {
            id: "loc_12",
            x: 60,
            y: 22,
            label: "Museo Archeologico & University",
            description:
              "The location of the city's main university and the National Archaeology Museum.",
            type: "resource",
          },
          {
            id: "loc_13",
            x: 50,
            y: 10,
            label: "Questura di Firenze",
            description:
              "Main station for the Polizia di Stato and Carabinieri.",
            type: "hub",
          },
          {
            id: "loc_14",
            x: 55,
            y: 12,
            label: "City Morgue",
            description: "The Institute of Legal Medicine.",
            type: "resource",
          },
          {
            id: "loc_15",
            x: 70,
            y: 48,
            label: "Biblioteca Nazionale Centrale",
            description: "One of the most important public libraries in Italy.",
            type: "resource",
          },
          {
            id: "loc_16",
            x: 78,
            y: 38,
            label: "Sant'Ambrogio Market",
            description:
              "A bustling indoor and outdoor market popular with locals.",
            type: "atmospheric",
          },
          {
            id: "loc_17",
            x: 90,
            y: 30,
            label: "Archivio di Stato di Firenze",
            description:
              "The repository for official city and regional historical documents.",
            type: "resource",
          },
          {
            id: "loc_18",
            x: 45,
            y: 30,
            label: "Mercato di San Lorenzo",
            description:
              "A large central market known for leather goods and local produce.",
            type: "landmark",
          },
          {
            id: "loc_19",
            x: 65,
            y: 30,
            label: "Giardino della Gherardesca",
            description:
              "A large and historic private garden in the city's eastern district.",
            type: "landmark",
          },
          {
            id: "loc_20",
            x: 75,
            y: 30,
            label: "Private bookseller",
            description: "A cozy shop filled with rare and antique books.",
            type: "landmark",
          },

          {
            id: "loc_21",
            x: 85,
            y: 45,
            label: "Via Ghibellina",
            description:
              "A long, historic street connecting the center to the eastern districts.",
            type: "landmark",
          },
          {
            id: "loc_22",
            x: 95,
            y: 5,
            label: "Fiesole Roman Ruins",
            description:
              "An archaeological site in the hills with a Roman theatre and Etruscan remains.",
            type: "resource",
          },
          {
            id: "loc_23",
            x: 80,
            y: 85,
            label: "Piazzale Michelangelo",
            description:
              "A large square on a hill offering a panoramic view of Florence.",
            type: "landmark",
          },
          {
            id: "loc_24",
            x: 10,
            y: 90,
            label: "Bellosguardo Hiking Trail",
            description:
              "A scenic walking path in the hills southwest of the city.",
            type: "atmospheric",
          },
        ],
      }),
      position: { x: 50, y: 125 },
      size: { width: 450, height: 450 },
      rotation: 0,
    },

    //     {
    //       id: "receipt_blue_dahlia_1948",
    //       type: "receipt", // You'll map this type to the components below
    //       title: "Receipt: The Blue Dahlia",
    //       content: JSON.stringify({
    //         establishment: "THE BLUE DAHLIA",
    //         address: "42 Sunset Blvd, Venice",
    //         date: "OCT 24, 1948",
    //         time: "10:42 PM",
    //         items: [
    //           { qty: 2, name: "BOURBON (DBL)", price: "1.50" },
    //           { qty: 1, name: "PACK CIGARETTES", price: "0.25" },
    //           { qty: 1, name: "MATCHES", price: "0.05" },
    //         ],
    //         total: "1.80",
    //         paymentMethod: "CASH",
    //         note: "Tbl 4 - Served by Val",
    //       }),
    //       position: { x: 50, y: 50 },
    //       size: { width: 25, height: 50 }, // Receipts are tall and narrow
    //       rotation: 2, // Slight tilt for realism
    //     },
    //     {
    //       id: "ticket_cinema_1948",
    //       type: "ticket",
    //       title: "Cinema Ticket: The Big Sleep",
    //       content: JSON.stringify({
    //         type: "movie",
    //         venue: "Riverdale Cinema",
    //         title: "MATINEE: THE BIG SLEEP",
    //         date: "Oct 24, 1948",
    //         time: "2:30 PM",
    //         price: "$0.35",
    //         serial: "No. 89210",
    //         isPunched: true,
    //       }),
    //       position: { x: 20, y: 20 },
    //       size: { width: 180, height: 100 },
    //       rotation: 5,
    //     },

    //     // 2. Train Ticket Example (Beige/Utilitarian)
    //     {
    //       id: "ticket_train_union",
    //       type: "ticket",
    //       title: "Train Stub: Union Station",
    //       content: JSON.stringify({
    //         type: "train",
    //         venue: "UNION STATION",
    //         title: "ONE-WAY: ZONE 4",
    //         date: "Oct 27, 1948",
    //         time: "07:15 AM",
    //         price: "$1.20",
    //         serial: "TR-4492",
    //         isPunched: true,
    //       }),
    //       position: { x: 30, y: 40 },
    //       size: { width: 180, height: 100 },
    //       rotation: -3,
    //     },

    //     // 3. Parking Stub Example (Blue/Modern-ish)
    //     {
    //       id: "ticket_parking_garage",
    //       type: "ticket",
    //       title: "Parking Stub: Garage A",
    //       content: JSON.stringify({
    //         type: "parking",
    //         venue: "CITY GARAGE A",
    //         date: "10/25/48",
    //         time: "IN: 23:14",
    //         serial: "P-9921",
    //         isPunched: false, // Maybe this wasn't validated, showing they left in a hurry?
    //       }),
    //       position: { x: 40, y: 60 },
    //       size: { width: 180, height: 100 },
    //       rotation: 2,
    //     },
    //     {
    //   id: "log_hotel_regis_1948",
    //   type: "activity-log",
    //   title: "Switchboard Log: Hotel Regis",
    //   content: JSON.stringify({
    //     location: "HOTEL REGIS - NIGHT DESK",
    //     date: "OCT 24, 1948",
    //     operator: "Minnie S.",
    //     caseRef: "EVID-992",
    //     entries: [
    //       {
    //         time: "22:15",
    //         direction: "IN",
    //         number: "Rm 402",
    //         duration: "1m",
    //         notes: "Guest requested 'Do Not Disturb' - sounded agitated."
    //       },
    //       {
    //         time: "22:45",
    //         direction: "OUT",
    //         number: "HA-5-0199",
    //         duration: "12m",
    //         notes: "Long distance. Private residence."
    //       },
    //       {
    //         time: "23:05",
    //         direction: "OUT",
    //         number: "police",
    //         duration: "0m",
    //         notes: "Call cut short. Line went dead."
    //       },
    //       {
    //         time: "23:10",
    //         direction: "IN",
    //         number: "Lobby",
    //         duration: "---",
    //         notes: "Complaints of noise from 4th floor."
    //       }
    //     ]
    //   }),
    //   position: { x: 30, y: 70 },
    //   size: { width: 380, height: 240 }, // A4 ratio essentially
    //   rotation: -2
    // },
    // {
    //   id: "telecom_log_001",
    //   type: "phoneLog", // Map to your new component
    //   title: "Call Log: 555-0199 (Victim)",
    //   content: JSON.stringify({
    //     provider: "RIVERDALE TELECOM",
    //     subscriber: "ASHCROFT, HARMONY",
    //     phoneNumber: "555-0199",
    //     period: "MAY 01 - MAY 09, 1998",
    //     caseId: "POL-REQ-9921",
    //     calls: [
    //       {
    //         time: "05/09 20:15",
    //         direction: "INCOMING",
    //         destination: "555-0900",
    //         duration: "1m 12s",
    //         tower: "SECTOR 4"
    //       },
    //       {
    //         time: "05/09 20:42",
    //         direction: "OUTGOING",
    //         destination: "555-2321",
    //         duration: "0m 45s",
    //         cost: "0.10",
    //         tower: "SECTOR 4"
    //       },
    //       {
    //         time: "05/09 21:05",
    //         direction: "OUTGOING",
    //         destination: "911-0000",
    //         duration: "0m 10s",
    //         cost: "0.00",
    //         tower: "SECTOR 4"
    //       },
    //       {
    //         time: "05/09 21:06",
    //         direction: "INCOMING",
    //         destination: "UNKNOWN",
    //         duration: "0m 00s",
    //         tower: "---"
    //       }
    //     ]
    //   }),
    //   position: { x: 30, y: 70 },
    //   size: { width: 300, height: 200 },
    //   rotation: 0
    // }

    // -------------------------
    // folder tab
    // -------------------------
  ],
  connections: [
    { from: "doc_Marco_Rossi_0", to: "doc_Marco_Rossi_1" },
    { from: "doc_Marco_Rossi_0", to: "doc_Marco_Rossi_2" },
    { from: "doc_Marco_Rossi_0", to: "portrait_Marco_Rossi" },
    { from: "doc_Sofia_Lombardi_1", to: "doc_Sofia_Lombardi_2" },
    { from: "doc_Sofia_Lombardi_1", to: "doc_Sofia_Lombardi_3" },
    { from: "doc_Sofia_Lombardi_1", to: "portrait_Sofia_Lombardi" },
    { from: "doc_Giovanni_Bellini_1", to: "doc_Giovanni_Bellini_2" },
    { from: "doc_Giovanni_Bellini_1", to: "doc_Giovanni_Bellini_3" },
    { from: "doc_Giovanni_Bellini_1", to: "portrait_Giovanni_Bellini" },
    { from: "doc_Francesca_Martini_1", to: "doc_Francesca_Martini_2" },
    { from: "doc_Francesca_Martini_1", to: "doc_Francesca_Martini_3" },
    { from: "doc_Francesca_Martini_1", to: "portrait_Francesca_Martini" },
    { from: "mp_amelia_giordano_2004", to: "sar_report_amelia_giordano_2004" },
    { from: "mp_isabella_marino_1971", to: "sar_report_isabella_marino_1971" },
    { from: "mp_norina_miller_2016", to: "sar_report_norina_miller_2016" },
    { from: "mp_eloisa_martin_1995", to: "sar_report_eloisa_martin_1995" },
    { from: "mp_morena_conti_1979", to: "sar_report_morena_conti_1979" },
    { from: "mp_luisa_moretti_1988", to: "sar_report_luisa_moretti_1988" },
    { from: "mp_elena_parisi_1963", to: "sar_report_elena_parisi_1963" },
  ],
  objectives: [
    {
      id: "objective_001",
      description: "Identify all individuals who lied during their interviews.",
    },
    {
      id: "objective_002",
      description: "Identify where is Allessandra Bellini.",
    },
  ],
};

export default PALAZZO_OF_BONES_DATA;
