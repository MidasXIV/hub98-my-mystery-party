import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

type BoardObjective = { id: string; description: string; solution?: string };
type BoardData = {
  items?: unknown[];
  connections?: unknown[];
  objectives?: BoardObjective[];
};

interface ObjectiveRequestBody {
  boardData: BoardData;
  objectiveId?: string;
  objectiveDescription?: string;
  solutionText: string;
}

const moderationSchema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      enum: [
        "HONEST_ATTEMPT",
        "INAPPROPRIATE_LANGUAGE",
        "CHEATING_OR_PROBING",
        "OTHER",
      ],
    },
    reason: { type: Type.STRING },
  },
  required: ["category", "reason"],
};

const scoringSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER }, // 0..1
    correct: { type: Type.BOOLEAN },
    rationale: { type: Type.STRING },
  },
  required: ["score", "correct"],
};

function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "into",
  "from",
  "up",
  "down",
  "as",
  "is",
  "was",
  "were",
  "be",
  "been",
  "being",
  "that",
  "this",
  "it",
  "its",
  "their",
  "his",
  "her",
  "they",
  "them",
  "we",
  "you",
  "i",
  "our",
  "ours",
  "your",
  "yours",
  "my",
  "mine",
]);

function keywords(s: string): string[] {
  return normalizeText(s)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t) && t.length > 2);
}

function scoreAnswer(user: string, truth: string): number {
  const u = new Set(keywords(user));
  const t = keywords(truth);
  if (t.length === 0) return 0;
  let match = 0;
  for (const k of t) {
    if (u.has(k)) match++;
  }
  return match / t.length; // 0..1 coverage of truth-keywords present in user answer
}

// Lightweight gibberish/quality checks (no AI, no deps)
const COMMON_ENGLISH_WORDS = new Set([
  'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us'
]);

function isLikelyGibberish(input: string): boolean {
  const text = (input || '').trim();
  if (text.length < 8) return true; // too short
  const letters = text.match(/[a-zA-Z]/g) || [];
  const letterRatio = letters.length / Math.max(1, text.length);
  if (letterRatio < 0.5) return true; // mostly non-letters

  const lower = text.toLowerCase();
  const vowels = (lower.match(/[aeiou]/g) || []).length;
  const vowelRatio = vowels / Math.max(1, letters.length);
  if (vowelRatio < 0.2 || vowelRatio > 0.9) return true; // unlikely distribution

  // long consonant runs (e.g., fdfngdigndfgidgf)
  if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(lower)) return true;

  // excessive repeated same char
  if (/(.)\1{4,}/.test(lower)) return true;

  // word-level checks
  const words = lower.split(/\s+/).filter(Boolean);
  const avgLen = words.reduce((a, w) => a + w.length, 0) / Math.max(1, words.length);
  if (avgLen > 14) return true;

  const commonHits = words.filter((w) => COMMON_ENGLISH_WORDS.has(w)).length;
  if (letters.length > 20 && commonHits === 0) return true; // no common words in a longer input

  return false;
}

// --- Cheap rate limiting and caching ---
// Note: In-memory stores reset when the serverless instance recycles.
// This is acceptable for free tier; consider external KV for stronger guarantees.
const RATE_WINDOW_MS = 60_000; // 1 min
const MAX_REQS_PER_IP = 10; // per minute
const MAX_ATTEMPTS_PER_OBJECTIVE = 5; // per minute
const CACHE_TTL_MS = 300_000; // 5 min

const ipWindow = new Map<string, number[]>(); // ip -> timestamps
const objectiveWindow = new Map<string, number[]>(); // `${ip}:${objectiveId}` -> timestamps
const cache = new Map<string, { expires: number; payload: unknown }>();

function now() {
  return Date.now();
}

function pruneWindow(arr: number[], windowMs: number) {
  const cutoff = now() - windowMs;
  let i = 0;
  while (i < arr.length && arr[i] < cutoff) i++;
  if (i > 0) arr.splice(0, i);
}

function recordAndCheckLimit(
  key: string,
  limit: number,
  windowMs: number,
  store: Map<string, number[]>
) {
  const ts = store.get(key) ?? [];
  pruneWindow(ts, windowMs);
  ts.push(now());
  store.set(key, ts);
  return ts.length <= limit;
}

function getClientId(req: Request) {
  const xfwd = req.headers?.get?.("x-forwarded-for") || "";
  const ip = xfwd.split(",")[0]?.trim();
  const realIp = req.headers?.get?.("x-real-ip") || "";
  return ip || realIp || "anonymous";
}

function djb2(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h << 5) + h + str.charCodeAt(i);
  // Convert to unsigned and hex
  return (h >>> 0).toString(16);
}

export async function POST(req: Request) {
  if (!process.env.API_KEY) {
    return NextResponse.json(
      { error: "Missing API_KEY on server" },
      { status: 500 }
    );
  }

  let body: ObjectiveRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { boardData, objectiveId, objectiveDescription, solutionText } = body;
  if (!boardData || !solutionText) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Quick non-AI quality gate to block obvious gibberish/spam
  if (isLikelyGibberish(solutionText)) {
    return NextResponse.json(
      {
        allowed: false,
        reason:
          "Please enter a meaningful answer (your current input looks like gibberish).",
        hints: [
          "Write in complete sentences—state your theory clearly.",
          "Reference specific evidence (documents, transcripts, photos) that support your claim.",
          "Include key names, places, and causal links (who did what, why, and how).",
          "Avoid random characters; use plain language and relevant case terms.",
        ],
      },
      { status: 400 }
    );
  }

  // Rate limit: per-IP and per-objective window checks
  const clientId = getClientId(req);
  const okIp = recordAndCheckLimit(
    clientId,
    MAX_REQS_PER_IP,
    RATE_WINDOW_MS,
    ipWindow
  );
  if (!okIp) {
    return NextResponse.json(
      {
        allowed: false,
        reason: "Rate limit exceeded. Please wait and try again.",
      },
      { status: 429 }
    );
  }
  const objectiveKeyBase =
    objectiveId ?? normalizeText(objectiveDescription ?? "");
  const objectiveKey = `${clientId}:${objectiveKeyBase}`;
  const okObjective = recordAndCheckLimit(
    objectiveKey,
    MAX_ATTEMPTS_PER_OBJECTIVE,
    RATE_WINDOW_MS,
    objectiveWindow
  );
  if (!okObjective) {
    return NextResponse.json(
      {
        allowed: false,
        reason: "Too many attempts for this objective. Please slow down.",
      },
      { status: 429 }
    );
  }

  // Cache: avoid repeated LLM calls for identical submissions
  const cacheKey = djb2(
    JSON.stringify({
      objectiveId: objectiveId ?? normalizeText(objectiveDescription ?? ""),
      answer: normalizeText(solutionText),
    })
  );
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > now()) {
    return NextResponse.json(cached.payload);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 1) Guardrail moderation via cheap model with strict JSON schema
  let moderation: {
    category:
      | "HONEST_ATTEMPT"
      | "INAPPROPRIATE_LANGUAGE"
      | "CHEATING_OR_PROBING"
      | "OTHER";
    reason: string;
  } | null = null;
  try {
    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Classify this player submission. Return JSON with {category, reason}.
Categories: HONEST_ATTEMPT, INAPPROPRIATE_LANGUAGE, CHEATING_OR_PROBING, OTHER.
Objective: ${objectiveDescription ?? objectiveId ?? "[unknown]"}
Answer: ${solutionText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: moderationSchema,
      },
    });
    const raw = resp.text?.trim();
    if (raw) moderation = JSON.parse(raw);
  } catch (err) {
    // If moderation fails, default to OTHER to avoid blocking legitimate attempts
    console.warn("Moderation classification failed", err);
    moderation = {
      category: "OTHER",
      reason: "Moderation service unavailable",
    };
  }

  if (moderation && moderation.category !== "HONEST_ATTEMPT") {
    // Soft-block with an allowed=false response; client can show message
    const payload = {
      allowed: false,
      category: moderation.category,
      reason: moderation.reason,
    };
    cache.set(cacheKey, { expires: now() + CACHE_TTL_MS, payload });
    return NextResponse.json(payload);
  }

  // 2) Find the objective's canonical solution in the provided boardData
  const objectives = Array.isArray(boardData.objectives)
    ? boardData.objectives
    : [];
  let target: BoardObjective | undefined;
  if (objectiveId) {
    target = objectives.find((o) => o.id === objectiveId);
  }
  if (!target && objectiveDescription) {
    const norm = normalizeText(objectiveDescription);
    target = objectives.find((o) => normalizeText(o.description) === norm);
  }

  if (!target) {
    return NextResponse.json({
      allowed: true,
      correct: false,
      score: 0,
      reason: "Objective not found in board data",
    });
  }

  if (!target.solution || normalizeText(target.solution).length === 0) {
    return NextResponse.json({
      allowed: true,
      correct: false,
      score: 0,
      reason: "No canonical solution available for this objective",
    });
  }

  // 3) Deterministic correctness check (cheap): keyword coverage ratio
  // Prefer LLM-based scoring for conceptual alignment; fallback to heuristic if it fails
  let score = 0;
  let correct = false;
  try {
    const evalResp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Evaluate the player's answer against the canonical solution.
Return strict JSON with {score, correct, rationale}. score is 0..1.
Judge conceptual alignment, names, causality, and key facts.
Partial matches: 0.2–0.5. Near-exact: 0.8+.

Canonical solution:\n${target.solution}\n\nPlayer answer:\n${solutionText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: scoringSchema,
      },
    });
    const rawEval = evalResp.text?.trim();
    console.log(rawEval)
    if (!rawEval) throw new Error("Empty scoring response");
    const parsed = JSON.parse(rawEval) as { score: number; correct: boolean };
    score =
      typeof parsed.score === "number"
        ? Math.max(0, Math.min(1, parsed.score))
        : 0;
    correct = Boolean(parsed.correct);
  } catch (err) {
    console.warn("LLM scoring failed, using heuristic fallback", err);
    score = scoreAnswer(solutionText, target.solution);
    correct = score >= 0.6; // heuristic threshold; can tune later
  }

  const payload = {
    allowed: true,
    category: "HONEST_ATTEMPT",
    correct,
    score,
  };
  cache.set(cacheKey, { expires: now() + CACHE_TTL_MS, payload });
  return NextResponse.json(payload);
}
