import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { getCaseBySlug } from "@/data/coldCases";

type BoardObjective = { id: string; description: string; solution?: string };
type BoardData = {
  items?: unknown[];
  connections?: unknown[];
  objectives?: BoardObjective[];
};

type BoardConnection = { from: string; to: string };
type BoardItem = {
  id: string;
  unlockOnObjectiveId?: string;
  [k: string]: unknown;
};

type ModerationCategory =
  | "HONEST_ATTEMPT"
  | "INAPPROPRIATE_LANGUAGE"
  | "CHEATING_OR_PROBING"
  | "OTHER";

type ModerationResult = {
  category: ModerationCategory;
  reason: string;
};

type ScoreResult = {
  score: number;
  correct: boolean;
  rationale?: string;
};

type ObjectiveEvaluationPayload = {
  allowed: boolean;
  category: "HONEST_ATTEMPT";
  correct: boolean;
  score: number;
  reason?: string;
  items: BoardItem[];
  connections: BoardConnection[];
};

type LLMProvider = "cloudflare" | "gemini";

function getLLMProvider(): LLMProvider {
  const raw = (process.env.LLM_PROVIDER ?? "cloudflare").toLowerCase();
  return raw === "gemini" ? "gemini" : "cloudflare";
}

function getCloudflareConfig() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const model =
    process.env.CLOUDFLARE_AI_MODEL ?? "@cf/meta/llama-3-8b-instruct";
  if (!accountId || !token) {
    throw new Error(
      "Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN on server"
    );
  }
  return { accountId, token, model };
}

function assertProviderConfig(provider: LLMProvider) {
  if (provider === "gemini") {
    if (!process.env.API_KEY) {
      throw new Error("Missing API_KEY on server");
    }
    return;
  }

  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN on server");
  }
}

async function runCloudflareAI(model: string, input: unknown) {
  const { accountId, token } = getCloudflareConfig();
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `Cloudflare AI request failed (${response.status}): ${JSON.stringify(result)}`
    );
  }
  return result as { result?: Record<string, unknown> };
}

function buildStructuredJsonInstructions() {
  return [
    "Return strictly valid JSON only.",
    "Do not include markdown, code fences, commentary, or extra explanatory text.",
    "Follow the requested schema exactly.",
    "Be generous to concise but materially correct mystery-solving answers when the player identifies the correct core cause, culprit, mechanism, or key entity.",
  ].join(" ");
}

function buildModerationPrompt(args: {
  objectiveId?: string;
  objectiveDescription?: string;
  solutionText: string;
}) {
  return `Classify this player submission. Return JSON with {category, reason}.
Categories: HONEST_ATTEMPT, INAPPROPRIATE_LANGUAGE, CHEATING_OR_PROBING, OTHER.
Objective: ${args.objectiveDescription ?? args.objectiveId ?? "[unknown]"}
Answer: ${args.solutionText}`;
}

function buildScoringPrompt(args: {
  canonicalSolution: string;
  solutionText: string;
}) {
  return `Evaluate the player's answer against the canonical solution.
Return strict JSON with {score, correct, rationale}. score is 0..1.
Judge conceptual alignment, names, causality, and key facts.
If the player correctly identifies the primary cause, culprit, mechanism, or key entity, give substantial credit even if the explanation is brief.
Do not require every supporting detail to mark an answer correct.
Examples:
- A concise answer naming the correct root cause/entity can still be correct.
- A fuller explanation with mechanism/context should score higher than a short correct answer.
Partial matches: 0.25–0.55. Concise but core-correct answers: 0.55–0.8. Near-exact: 0.8+.

Canonical solution:\n${args.canonicalSolution}\n\nPlayer answer:\n${args.solutionText}`;
}

function buildFailurePayload(reason: string, status = 400) {
  return NextResponse.json({ error: reason }, { status });
}

function buildBlockedPayload(reason: string, status = 400, hints?: string[]) {
  return NextResponse.json(
    {
      allowed: false,
      reason,
      ...(hints ? { hints } : {}),
    },
    { status },
  );
}

function buildAssessmentPayload(
  overrides: Partial<ObjectiveEvaluationPayload>,
): ObjectiveEvaluationPayload {
  return {
    allowed: true,
    category: "HONEST_ATTEMPT",
    correct: false,
    score: 0,
    items: [],
    connections: [],
    ...overrides,
  };
}

function extractTextFromCloudflare(result: { result?: Record<string, unknown> }) {
  const data = result?.result ?? {};
  return (
    (data.response as string) ||
    (data.text as string) ||
    (data.output_text as string) ||
    (data.message as { content?: string } | undefined)?.content ||
    ""
  );
}

function stripMarkdownCodeFences(raw: string) {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

function extractFirstBalancedJsonObject(raw: string) {
  const text = stripMarkdownCodeFences(raw);
  const start = text.indexOf("{");
  if (start === -1) return text.trim();

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const char = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") {
      depth--;
      if (depth === 0) {
        return text.slice(start, i + 1).trim();
      }
    }
  }

  return text.slice(start).trim();
}

function repairCommonJsonIssues(raw: string) {
  let repaired = raw.trim();

  // Remove a trailing comma before a closing object/array brace.
  repaired = repaired.replace(/,\s*([}\]])/g, "$1");

  // If braces are unbalanced at the end, close them conservatively.
  const openBraces = (repaired.match(/{/g) || []).length;
  const closeBraces = (repaired.match(/}/g) || []).length;
  if (openBraces > closeBraces) {
    repaired += "}".repeat(openBraces - closeBraces);
  }

  return repaired;
}

function safeJsonPreview(raw: string, maxLength = 400) {
  return raw.length <= maxLength ? raw : `${raw.slice(0, maxLength)}…`;
}

function parseJsonWithRecovery(raw: string) {
  const extracted = extractFirstBalancedJsonObject(raw);

  try {
    return JSON.parse(extracted);
  } catch (initialError) {
    const repaired = repairCommonJsonIssues(extracted);
    try {
      return JSON.parse(repaired);
    } catch (repairError) {
      const initialMessage =
        initialError instanceof Error ? initialError.message : String(initialError);
      const repairMessage =
        repairError instanceof Error ? repairError.message : String(repairError);

      throw new SyntaxError(
        `Unable to parse LLM JSON response. Initial parse failed: ${initialMessage}. ` +
          `Recovery parse failed: ${repairMessage}. Raw preview: ${safeJsonPreview(extracted)}`,
      );
    }
  }
}

async function generateJsonFromLLM(options: {
  provider: LLMProvider;
  prompt: string;
  schema: unknown;
  systemInstruction?: string;
  geminiModel?: string;
  cloudflareModel?: string;
}) {
  const systemInstruction = options.systemInstruction ?? buildStructuredJsonInstructions();
  if (options.provider === "gemini") {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY ?? "" });
    const resp = await ai.models.generateContent({
      model: options.geminiModel ?? "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemInstruction}\n\n${options.prompt}`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: options.schema,
      },
    });
    const raw = resp.text?.trim() ?? "";
    return parseJsonWithRecovery(raw);
  }

  const { model: defaultModel } = getCloudflareConfig();
  const cfResp = await runCloudflareAI(options.cloudflareModel ?? defaultModel, {
    messages: [
      {
        role: "system",
        content: systemInstruction,
      },
      { role: "user", content: options.prompt },
    ],
  });
  const rawText = extractTextFromCloudflare(cfResp);
  return parseJsonWithRecovery(rawText);
}

function isBoardItem(val: unknown): val is BoardItem {
  if (!val || typeof val !== "object") return false;
  const obj = val as Record<string, unknown>;
  return typeof obj.id === "string";
}

function isBoardConnection(val: unknown): val is BoardConnection {
  return (
    Boolean(val) &&
    typeof val === "object" &&
    typeof (val as Record<string, unknown>).from === "string" &&
    typeof (val as Record<string, unknown>).to === "string"
  );
}

interface ObjectiveRequestBody {
  caseSlug?: string;
  boardData: BoardData;
  objectiveId?: string;
  objectiveDescription?: string;
  solutionText: string;
}

type CaseEvidence = {
  items?: unknown[];
  connections?: unknown[];
  objectives?: BoardObjective[];
};

function getEvidenceSource(caseSlug: string | undefined, fallback: BoardData): CaseEvidence {
  if (!caseSlug) return fallback;
  const cf = getCaseBySlug(caseSlug);
  const ev = cf?.evidence as unknown;
  if (!ev || typeof ev !== "object") return fallback;
  const obj = ev as Record<string, unknown>;
  // Basic shape check
  if (!Array.isArray(obj.items) || !Array.isArray(obj.objectives)) return fallback;
  return ev as CaseEvidence;
}

function findObjective(
  objectives: BoardObjective[],
  objectiveId?: string,
  objectiveDescription?: string,
) {
  if (objectiveId) {
    const byId = objectives.find((objective) => objective.id === objectiveId);
    if (byId) return byId;
  }

  if (!objectiveDescription) return undefined;
  const normalizedDescription = normalizeText(objectiveDescription);
  return objectives.find(
    (objective) => normalizeText(objective.description) === normalizedDescription,
  );
}

function getUnlockedEvidence(
  evidenceSource: CaseEvidence,
  objectiveKey: string,
  correct: boolean,
) {
  const items: BoardItem[] = Array.isArray(evidenceSource.items)
    ? (evidenceSource.items.filter(isBoardItem) as BoardItem[])
    : [];

  if (!correct) {
    return { items: [], connections: [] as BoardConnection[] };
  }

  const unlockedItems = items.filter(
    (item) => item.unlockOnObjectiveId === objectiveKey,
  );
  const unlockedIds = new Set(unlockedItems.map((item) => item.id));

  const connections: BoardConnection[] = Array.isArray(evidenceSource.connections)
    ? (evidenceSource.connections.filter(isBoardConnection) as BoardConnection[])
    : [];

  const unlockedConnections = connections.filter(
    (connection) => unlockedIds.has(connection.from) || unlockedIds.has(connection.to),
  );

  return { items: unlockedItems, connections: unlockedConnections };
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

function scoreKeyPhrases(user: string, truth: string): number {
  const normalizedUser = normalizeText(user);
  const truthKeywords = keywords(truth);

  if (truthKeywords.length === 0) return 0;

  const candidatePhrases = Array.from(
    new Set(
      truthKeywords
        .filter((token) => token.length >= 5)
        .concat(
          truth
            .split(/[.!?]/)
            .map((segment) => normalizeText(segment))
            .flatMap((segment) => {
              const parts = segment.split(" ").filter(Boolean);
              const phrases: string[] = [];
              for (let i = 0; i < parts.length - 1; i++) {
                const phrase = `${parts[i]} ${parts[i + 1]}`.trim();
                if (phrase.length >= 9) phrases.push(phrase);
              }
              return phrases;
            }),
        ),
    ),
  );

  if (candidatePhrases.length === 0) return 0;

  let hits = 0;
  for (const phrase of candidatePhrases) {
    if (normalizedUser.includes(phrase)) hits++;
  }
  return hits / candidatePhrases.length;
}

function evaluateHeuristicAnswer(user: string, truth: string) {
  const keywordScore = scoreAnswer(user, truth);
  const phraseScore = scoreKeyPhrases(user, truth);
  const combinedScore = Math.max(keywordScore, phraseScore * 1.15);
  const correct = combinedScore >= 0.45 || phraseScore >= 0.2;

  return {
    score: Math.max(0, Math.min(1, combinedScore)),
    correct,
  };
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
  const provider = getLLMProvider();
  try {
    assertProviderConfig(provider);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Missing server LLM configuration";
    return buildFailurePayload(message, 500);
  }

  let body: ObjectiveRequestBody;
  try {
    body = await req.json();
  } catch {
    return buildFailurePayload("Invalid JSON body");
  }

  const { boardData, objectiveId, objectiveDescription, solutionText } = body;
  if (!boardData || !solutionText) {
    return buildFailurePayload("Missing required fields");
  }

  // Quick non-AI quality gate to block obvious gibberish/spam
  if (isLikelyGibberish(solutionText)) {
    return buildBlockedPayload(
      "Please enter a meaningful answer (your current input looks like gibberish).",
      400,
      [
        "Write in complete sentences—state your theory clearly.",
        "Reference specific evidence (documents, transcripts, photos) that support your claim.",
        "Include key names, places, and causal links (who did what, why, and how).",
        "Avoid random characters; use plain language and relevant case terms.",
      ],
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
    return buildBlockedPayload("Rate limit exceeded. Please wait and try again.", 429);
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
    return buildBlockedPayload(
      "Too many attempts for this objective. Please slow down.",
      429,
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

  // 1) Guardrail moderation via cheap model with strict JSON schema
  let moderation: ModerationResult | null = null;
  try {
    moderation = await generateJsonFromLLM({
      provider,
      prompt: buildModerationPrompt({
        objectiveId,
        objectiveDescription,
        solutionText,
      }),
      schema: moderationSchema,
      geminiModel: "gemini-2.5-flash",
    }) as ModerationResult;
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
  const evidenceSource = getEvidenceSource(body.caseSlug, boardData);

  const objectives = Array.isArray(evidenceSource.objectives)
    ? evidenceSource.objectives
    : [];
  const target = findObjective(objectives, objectiveId, objectiveDescription);

  if (!target) {
    return NextResponse.json(
      buildAssessmentPayload({ reason: "Objective not found in board data" }),
    );
  }

  if (!target.solution || normalizeText(target.solution).length === 0) {
    return NextResponse.json(
      buildAssessmentPayload({
        reason: "No canonical solution available for this objective",
      }),
    );
  }

  // 3) Deterministic correctness check (cheap): keyword coverage ratio
  // Prefer LLM-based scoring for conceptual alignment; fallback to heuristic if it fails
  let score = 0;
  let correct = false;
  try {
    const parsed = (await generateJsonFromLLM({
      provider,
      prompt: buildScoringPrompt({
        canonicalSolution: target.solution,
        solutionText,
      }),
      schema: scoringSchema,
      geminiModel: "gemini-2.5-flash",
    })) as ScoreResult;
    score =
      typeof parsed.score === "number"
        ? Math.max(0, Math.min(1, parsed.score))
        : 0;
    correct = Boolean(parsed.correct);
  } catch (err) {
    console.warn("LLM scoring failed, using heuristic fallback", err);
    const heuristic = evaluateHeuristicAnswer(solutionText, target.solution);
    score = heuristic.score;
    correct = heuristic.correct;
  }

  const objectiveKeyForUnlock = objectiveId ?? target.id;

  const unlockedEvidence = getUnlockedEvidence(
    evidenceSource,
    objectiveKeyForUnlock,
    correct,
  );

  const payload = buildAssessmentPayload({
    correct,
    score,
    items: unlockedEvidence.items,
    connections: unlockedEvidence.connections,
  });
  cache.set(cacheKey, { expires: now() + CACHE_TTL_MS, payload });
  return NextResponse.json(payload);
}
