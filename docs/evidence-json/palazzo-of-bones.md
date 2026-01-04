# The Palazzo of Bones — Evidence JSON examples

This page captures the evidence **item types** used by the `palazzo-of-bones` case board (`src/data/palazzo-of-bones-data.ts`) and provides example JSON payloads.

Notes:
- Items use a board “envelope” with layout props (`position`, `size`, `rotation`).
- Many items store their structured payload in `content` as a **stringified JSON**.

---

## Type: `photo`

Used for portraits (suspects/people).

```json
{
  "id": "portrait_alessandra_bellini",
  "type": "photo",
  "content": "Alessandra Bellini portrait",
  "imageUrl": "/cold_case_data/palazzo_of_bones/portrait_Alessandra_Bellini.jpeg",
  "position": { "x": 10, "y": 10 },
  "size": { "width": 210, "height": 360 },
  "rotation": 0
}
```

---

## Type: `person-of-interest-report`

### Example JSON (inner payload)

```json
{
  "lastName": "Rossi",
  "firstName": "Marco",
  "age": "62",
  "height": "173 cm",
  "weight": "75 kg",
  "hair": "Grey, thinning",
  "eyes": "Brown",
  "occupation": "Retired Archivist",
  "statement": "I was at home all evening...",
  "conclusion": "Suspicious. Subject possesses..."
}
```

#### Variant notes
- Some POI reports omit fields like `eyes`/`age`.

---

## Type: `formal-alibi`

Used for witness statements, but also used for other “formal document” statements.

### Example JSON (inner payload)

```json
{
  "witnessName": "Sofia Bianchi",
  "statementBody": "I've lived next to Marco for almost ten years...",
  "pageNumber": "1"
}
```

---

## Type: `interrogation-transcript`

### Example JSON (inner payload)

```json
{
  "department": "Florence Polizia di Stato",
  "title": "Interrogation Transcript of Marco Rossi",
  "caseNumber": "00-102724-48B",
  "date": "October 28, 2024",
  "interviewer": "Detective Moretti",
  "subject": "Marco Rossi",
  "bodyRaw": [
    "Detective: Thank you for coming in...",
    "Marco Rossi: Marco Antonio Rossi."
  ]
}
```

---

## Type: `newspaper`

### Example JSON (inner payload)

```json
{
  "publication": "La Nazione",
  "headline": "FLORENCE HEIRESS VANISHES WITHOUT A TRACE",
  "subheadline": "Alessandra Bellini, 28, missing...",
  "dateline": "FLORENCE",
  "date": "Tuesday, October 28, 2025",
  "author": "Marco Ricci",
  "authorRole": "Lead Crime Reporter",
  "hasPhoto": true,
  "imageCaption": "Alessandra Bellini pictured...",
  "body": "The city is holding its breath..."
}
```

#### Variant notes
- Some newspaper entries have `hasPhoto: false` and `imageCaption: ""`.

---

## Type: `missing-person-report`

### Example JSON (inner payload)

```json
{
  "caseNumber": "MP-63-112",
  "dateFiled": "June 11, 1963",
  "reportingOfficer": "Brigadiere Gallo",
  "name": "PARISI, Elena",
  "nickname": "\"Lena\"",
  "dob": "10/03/1944",
  "age": "19",
  "sex": "Female",
  "race": "Caucasian",
  "height": "160 cm",
  "weight": "52 kg",
  "hair": "Dark Brown, Long, usually worn in a bun.",
  "eyes": "Brown",
  "scarsMarks": "Numerous pinprick scars...",
  "dental": "No known issues.",
  "lastSeenDate": "June 10, 1963",
  "lastSeenTime": "19:05 (approx)",
  "lastSeenLocation": "Atelier 'Seta Rossa', Via de' Tornabuoni",
  "clothingWorn": "Simple brown cotton dress...",
  "imageUrl": "/cold_case_data/palazzo_of_bones/portrait_elena_parisi.png",
  "summary": "Subject reported missing by her mother...",
  "fieldNotes": [
    {
      "time": "09:00, June 11",
      "location": "Parisi Residence, Oltrarno",
      "source": "Mother (Sofia Parisi)",
      "note": "Mother is distraught..."
    }
  ]
}
```

---

## Type: `search-and-rescue-report`

### Example JSON (inner payload)

```json
{
  "operationName": "OPERAZIONE: 'CUCITRICE'",
  "date": "11 GIUGNO 1963",
  "sector": "SETTORE 4-GAMMA: PONTE VECCHIO",
  "gridReference": "Map Grid Ref: 50-50",
  "legend": [
    { "color": "#facc15", "label": "Subject's Confirmed Route", "pattern": "hatched" }
  ],
  "briefing": "Search for a missing 19-year-old female...",
  "terrainNotes": "The search path is heavily urbanized...",
  "searchLog": [
    { "time": "09:30, Jun. 11", "unit": "PATTUGLIA-4", "notes": "Confirmed subject's departure..." }
  ],
  "author": "BRIGADIERE GALLO",
  "mapImageUrl": "/cold_case_data/palazzo_of_bones/map_city.jpg"
}
```

---

## Type: `map`

### Example JSON (inner payload)

```json
{
  "title": "FLORENCE - CENTRAL DISTRICTS",
  "region": "TUSCANY REGION - CASE FILE 7B-822",
  "date": "2025 SURVEY",
  "imageUrl": "/cold_case_data/palazzo_of_bones/map_city.jpg",
  "scale": "1:7,500",
  "markers": [
    {
      "id": "loc_1",
      "x": 48,
      "y": 62,
      "label": "Church of San Felice",
      "description": "A historic church located in the Oltrarno district.",
      "type": "landmark"
    }
  ]
}
```
