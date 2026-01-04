# Station Zero — Evidence JSON examples

This page captures the evidence **item types** used by the `station-zero` case board (`src/data/station-zero-data.ts`) and provides example JSON payloads.

Notes:
- Board items share a common “board item envelope” (id/type/title/content/position/size/rotation + optional fields like `imageUrl`, `packIn`).
- Many Station Zero items store their “real payload” inside `content` as a **stringified JSON** (i.e. `content: JSON.stringify({...})`).

---

## Common “board item” envelope

Most items look like this on the board:

```json
{
  "id": "some_unique_id",
  "type": "<evidence-type>",
  "title": "Optional title",
  "content": "<string OR stringified JSON>",
  "imageUrl": "/optional/path.jpg",
  "position": { "x": 70, "y": 45 },
  "size": { "width": 220, "height": 280 },
  "rotation": 0,
  "packIn": ["suspect", "evidence"]
}
```

---

## Type: `case-briefing`

### Example JSON (inner payload)

Stored in `content` via `JSON.stringify({ ... })`.

```json
{
  "department": "AETHERNET INTERSTELLAR AUTHORITY",
  "bureau": "Cold Case Division",
  "date": "December 17, 2047",
  "to": "Special Investigator",
  "from": "Director Anaya Sharma",
  "subject": "Re-Opened Investigation - Station Zero Incident (Case File 734-Alpha)",
  "classification": "CLASSIFIED // EYES ONLY",
  "body": "Investigator,\n\nYou are hereby assigned...\n\nGood luck."
}
```

---

## Type: `photo`

Station Zero uses `photo` for crew portraits and (optionally) stills.

### Example JSON (envelope)

```json
{
  "id": "profile_cass",
  "type": "photo",
  "title": "photo of Cassandra 'Cass' Hale",
  "content": "Cassandra 'Cass' Hale",
  "imageUrl": "/cold_case_data/station_zero/profile_cass.jpeg",
  "position": { "x": 30, "y": 10 },
  "size": { "width": 360, "height": 210 },
  "rotation": 0,
  "packIn": ["suspect"]
}
```

---

## Type: `document`

Used for “crew profile” blocks. Here, `content` is **plain text**, not JSON.

### Example (plain text content)

```json
{
  "id": "doc_crew_profile_cassandra_hale",
  "type": "document",
  "content": "CREW PROFILE — CASSANDRA HALE\nROLE: ...",
  "position": { "x": 25, "y": 105 },
  "size": { "width": 48, "height": 62 },
  "rotation": -1,
  "packIn": ["suspect"]
}
```

---

## Type: `transmission-log`

### Example JSON (inner payload)

```json
{
  "location": "AEGISCORP SECURE SERVER",
  "date": "OCT 01 - NOV 10, 2025",
  "operator": "SYSTEM / MULTIPLE",
  "caseRef": "SZ-COMMS-DOSSIER-FINAL",
  "entries": [
    {
      "time": "OCT 01",
      "direction": "IN/OUT",
      "number": "CORP OPS <-> CASS HALE",
      "duration": "48s",
      "notes": "CORP: Station Zero..."
    }
  ]
}
```

---

## Type: `electronic-messages`

Station Zero uses it for an email-style evidence item.

### Example JSON (inner payload)

```json
{
  "type": "EMAIL",
  "platformName": "AegisCorp SecureMail Client v.11.2",
  "caseRef": "SZ-DIG-EVID-001",
  "subject": "URGENT: Anomaly in Project Veridia & Safety Protocol Breach",
  "from": "Cass (Internal Oversight) <C.Oversight.SZ@AegisCorp.int>",
  "to": "Aegis Corp Internal Affairs <IA.HQ@AegisCorp.secure>",
  "printDate": "November 5, 2025",
  "messages": [
    {
      "sender": "Cass (Internal Oversight)",
      "time": "October 28, 2025, 16:45 GMT",
      "body": "To Whom It May Concern..."
    }
  ]
}
```

---

## Type: `autopsy-report`

### Example JSON (inner payload)

```json
{
  "caseNumber": "SZ-CR-001",
  "victimName": "Jax Calder",
  "sex": "Male",
  "age": "31",
  "race": "Caucasian",
  "weight": "84 kg",
  "height": "185 cm",
  "description": "Subject was discovered...",
  "externalInjuries": "Severe third-degree electrical burns...",
  "internalInjuries": "Lungs show acute edema...",
  "causeOfDeath": "Asphyxiation due to environmental failure.",
  "mannerOfDeath": "Undetermined",
  "investigatingOfficer": "Dr. Aris Janicky, Corporate Medical Oversight",
  "recordingOfficer": "S&R Team Lead K. Vance",
  "date": "November 7, 2025",
  "time": "11:30 GMT",
  "coroner": "Dr. Aris Janicky",
  "policeStation": "AegisCorp Security Directorate"
}
```

---

## Type: `diary`

### Example JSON (inner payload)

```json
{
  "title": "KAI MERCER diary log",
  "entriesPerPage": 4,
  "diaryEntries": [
    {
      "date": "October 1, 2025",
      "entries": [
        "Baseline day...",
        "I stood alone in med-bay..."
      ]
    }
  ]
}
```

---

## Top-level collections: `connections` and `objectives`

These are not “evidence items” but appear in the case dataset.

### Connection

```json
{ "from": "mp_elena_parisi_1963", "to": "sar_report_elena_parisi_1963" }
```

### Objective (Station Zero has solutions)

```json
{
  "id": "obj_01",
  "description": "Uncover the scientific explanation...",
  "solution": "The hallucinations were caused by..."
}
```
