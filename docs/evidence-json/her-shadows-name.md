# Her Shadow’s Name — Evidence JSON examples

This page captures the evidence **item types** used by the `her-shadows-name` case board (`src/data/her-shadows-name-data.ts`) and provides example JSON payloads.

---

## Type: `photo`

In this case, many items are simple photo cards.

```json
{
  "id": "ellie_portrait",
  "type": "photo",
  "content": "Ellie portrait",
  "imageUrl": "/cold_case_data/her_shadows_name/ellie.png",
  "position": { "x": 10, "y": -10 },
  "size": { "width": 210, "height": 360 },
  "rotation": 0
}
```

---

## Type: `diary`

The diary is stored in `content` as `JSON.stringify({ ... })`.

### Example JSON (inner payload)

```json
{
  "title": "Eleanor's Journal",
  "entriesPerPage": 4,
  "diaryEntries": [
    {
      "date": "September 15, 2025",
      "entries": [
        "Arrived in Black Creek...",
        "Grandma's house smells..."
      ]
    },
    {
      "date": "October 28, 2025 - Final Entry",
      "entries": [
        "She knows I know...",
        "I know Her Shadow's Name..."
      ]
    }
  ]
}
```
