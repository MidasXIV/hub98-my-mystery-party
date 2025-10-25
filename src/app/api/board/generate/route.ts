import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

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

export async function POST() {
  if (!process.env.API_KEY) {
    return NextResponse.json({ error: 'Missing API_KEY on server' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a JSON for an evidence board about 'Operation Shadowfall'.
1.  Create five specific photo items with the exact content "Dr Verma image", "Mrs Sharma image", "Nurse Agnes image", "Rohan Sharma image", and "Karan Kholi image".
2.  Create five items of type 'formal-alibi', one for each of the five suspects listed above. The content should be a plausible, formal alibi statement for each person.
3.  Create five items of type 'interrogation-transcript', one for each suspect. The content must be a tense, revealing interview snippet. It MUST begin with two lines: 'INTERVIEW DATE: [Month Day, YYYY]' and 'SUBJECT: [Suspect Name]'.
4.  Create one item of type 'autopsy-report' with detailed, multi-section content for a victim named John Doe.
5.  Include the following three pieces of evidence pointing to Dr. Verma as 'document' items: a deleted email, a witness statement, and a forensic search history report.
6.  Include 1-2 other items like classified documents or handwritten notes.
7.  Do not include any maps.
8.  Create 2 newspaper items with stringified JSON (headline, date, body).
9.  Create 7-8 connections linking evidence logically.
10. Spread positions (x,y between -20 and 120) for wide exploration.
11. Create 3-4 objectives with unique id + description.`,
      config: { responseMimeType: 'application/json', responseSchema: boardSchema },
    });

    const data = JSON.parse(response.text.trim());
    return NextResponse.json(data);
  } catch (err) {
    console.error('Board generation failed', err);
    return NextResponse.json({ error: 'Failed to generate board' }, { status: 500 });
  }
}
