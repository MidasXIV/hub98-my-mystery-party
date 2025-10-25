import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// Reuse schema pieces (duplicate kept minimal for now)
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

const newEvidenceSchema = {
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
  },
  required: ['items', 'connections'],
};

interface ObjectiveRequestBody {
  boardData: unknown; // keep as unknown here; client ensures shape
  objectiveDescription: string;
  solutionText: string;
}

export async function POST(req: Request) {
  if (!process.env.API_KEY) {
    return NextResponse.json({ error: 'Missing API_KEY on server' }, { status: 500 });
  }

  let body: ObjectiveRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { boardData, objectiveDescription, solutionText } = body;

  if (!objectiveDescription || !solutionText || !boardData) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a master crime novelist. Based on the detective's progress, you will add new clues to their evidence board.
The current evidence board is represented by this JSON: ${JSON.stringify(boardData)}.
The detective has just solved the following objective: "${objectiveDescription}".
Their submitted theory was: "${solutionText}".
Generate a JSON object containing 2-3 new pieces of evidence ('items') and 1-2 new 'connections'.
- New items must have unique IDs.
- Position new items with x between 130% and 150%, y between 20% and 80%.
- Ensure connections link to or from new items.
- Keep items diverse and relevant.`,
      config: { responseMimeType: 'application/json', responseSchema: newEvidenceSchema },
    });

    const raw = response.text?.trim();
    if (!raw) {
      return NextResponse.json({ error: 'Empty response from model' }, { status: 502 });
    }

    let newEvidence;
    try {
      newEvidence = JSON.parse(raw);
    } catch (parseErr) {
      console.error('Failed to parse objective JSON', raw, parseErr);
      return NextResponse.json({ error: 'Invalid JSON from model' }, { status: 500 });
    }

    return NextResponse.json(newEvidence);
  } catch (err) {
    console.error('Objective update failed', err);
    return NextResponse.json({ error: 'Failed to generate new evidence' }, { status: 500 });
  }
}
