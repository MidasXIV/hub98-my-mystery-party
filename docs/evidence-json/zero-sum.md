# Zero Sum — Evidence JSON examples

This page captures the evidence **item types** used by the `zero-sum` case board (`src/data/zero-sum-data.ts`) and provides example JSON payloads.

Notes:
- `zero-sum-data.ts` contains some commented “example evidence” objects at top; the live `items` list includes the same types as other cases.

---

## Type: `newspaper`

### Example JSON (inner payload)

```json
{
  "publication": "The Financial Times",
  "headline": "Institute Shares Soar on 'Zero Sum' Announcement",
  "subheadline": "Dean Singhal calls Srivastav's upcoming formula 'A New Era'...",
  "dateline": "MUMBAI",
  "date": "Friday, October 14, 2005",
  "author": "Sarah Jenkins",
  "authorRole": "Economics Editor",
  "hasPhoto": true,
  "imageCaption": "Dean Vikram Singhal (left) and Professor Aryan Srivastav (right)...",
  "body": "The Institute of Mathematical Sciences saw its stock valuation..."
}
```

---

## Type: `autopsy-report`

### Example JSON (inner payload)

```json
{
  "caseNumber": "CC-2009-45B",
  "victimName": "Aryan Srivastav",
  "sex": "Male",
  "age": "42 years",
  "race": "South Asian",
  "weight": "74 kg",
  "height": "176 cm",
  "description": "The body is that of a male...",
  "externalInjuries": "Head/Neck: Severe trauma...",
  "internalInjuries": "Stomach: High concentration...",
  "causeOfDeath": "Blunt force trauma... followed by asphyxiation",
  "mannerOfDeath": "Homicide",
  "investigatingOfficer": "Sub-Inspector Rajesh Verma...",
  "recordingOfficer": "Head Constable Amit Singh",
  "date": "October 17, 2005",
  "time": "17:15",
  "coroner": "Dr. Anjali Gupta, Chief Medical Officer, AIIMS New Delhi"
}
```

---

## Type: `person-of-interest-report`

### Example JSON (inner payload)

```json
{
  "lastName": "Mehra",
  "firstName": "Alisha",
  "age": "34",
  "height": "165 cm",
  "weight": "58 kg",
  "hair": "Dark Brown",
  "eyes": "Hazel",
  "occupation": "Associate Professor",
  "statement": "I have nothing to hide...",
  "conclusion": "**MOTIVE ESTABLISHED.** Subject sent a threatening text..."
}
```

---

## Type: `formal-alibi`

(Used for witness statements + maintenance logs in this case.)

### Example 1: Witness statement

```json
{
  "witnessName": "Alisha Mehra",
  "statementBody": "I was in the East Wing Lecture Hall from 4:00 PM to 6:00 PM...",
  "pageNumber": "1"
}
```

### Example 2: Log-style statement (same schema)

```json
{
  "witnessName": "Head of Janitorial Services",
  "statementBody": "Date: 10/14/2005\nTime: 14:00\nLocation: Admin Block...",
  "pageNumber": "1"
}
```

---

## Type: `electronic-messages`

### Example JSON (inner payload)

```json
{
  "type": "EMAIL",
  "platformName": "Microsoft Outlook Express 6.0",
  "caseRef": "EVID-DIG-004",
  "subject": "URGENT: Regarding the Press Conference Tomorrow—It's Not Sound.",
  "from": "Professor Aryan Srivastav <a.srivastav@institute.edu>",
  "to": "Dean Vikram Singhal <V.Singhal@institute.edu>",
  "printDate": "10/18/2005",
  "messages": [
    {
      "sender": "Professor Aryan Srivastav",
      "time": "October 14, 2005, 4:58 PM",
      "body": "Vikram,\n\nI can't do it...\n\n- Aryan"
    }
  ]
}
```

#### Variant notes
- The commented “SMS” example includes `participants` and an `isMe` boolean on messages.
