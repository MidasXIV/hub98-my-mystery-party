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

const HER_SHADOWS_NAME_DATA = {
  items: [
    {
      id: "ellie_portrait",
      type: "photo",
      content: JSON.stringify({ title: "Ellie", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Ellie_portrait,
      position: { x: 10, y: -10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "grandma_photo",
      type: "photo",
      content: JSON.stringify({ title: "Grandma", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Grandma_photo,
      position: { x: 30, y: -10 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "uncle_photo",
      type: "photo",
      content: JSON.stringify({ title: "Uncle", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Uncle_photo,
      position: { x: 10, y: 45 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "meave_photo",
      type: "photo",
      content: JSON.stringify({ title: "Meave", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_Meave_photo,
      position: { x: 30, y: 45 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "sherrif_photo",
      type: "photo",
      content: JSON.stringify({ title: "Sheriff", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_sherrif_photo,
      position: { x: 50, y: 45 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "guy_photo",
      type: "photo",
      content: JSON.stringify({ title: "Guy", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_guy_photo,
      position: { x: 70, y: 45 },
      size: { width: 210, height: 360 },
      rotation: 0,
    },
    {
      id: "shopkeeper_photo",
      type: "photo",
      content: JSON.stringify({ title: "Shopkeeper", variant: "polaroid" }),
      imageUrl: PREDEFINED_IMAGES.HSN_shopkeeper_photo,
      position: { x: 90, y: 45 },
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
} as const;

export default HER_SHADOWS_NAME_DATA;
