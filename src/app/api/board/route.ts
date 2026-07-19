import { NextResponse } from "next/server";
import { POST as generatePost } from "@/lib/api/board/generate";
import { POST as objectivePost } from "@/lib/api/board/objective";
import { GET as badgeGet, POST as badgePost } from "@/lib/api/board/badge";
import { POST as playerProgressPost } from "@/lib/api/board/player-progress";

type BoardApiAction = "generate" | "objective" | "badge" | "player-progress";

function isBoardApiAction(value: unknown): value is BoardApiAction {
  return (
    value === "generate" ||
    value === "objective" ||
    value === "badge" ||
    value === "player-progress"
  );
}

function forwardJsonRequest(req: Request, payload: unknown) {
  const headers = new Headers(req.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return new Request(req.url, {
    method: req.method,
    headers,
    body: JSON.stringify(payload),
  });
}

async function parseRequestBody(req: Request) {
  const raw = await req.text();
  if (!raw.trim()) return null;

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  if (action === "badge") {
    return badgeGet(req);
  }

  return NextResponse.json(
    { error: "Unsupported GET action. Use ?action=badge or POST with an action body." },
    { status: 400 },
  );
}

export async function POST(req: Request) {
  const body = await parseRequestBody(req);

  if (body === undefined) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body?.action;
  if (!isBoardApiAction(action)) {
    return NextResponse.json(
      { error: "Missing or unsupported action" },
      { status: 400 },
    );
  }

  switch (action) {
    case "generate":
      return generatePost(forwardJsonRequest(req, body));
    case "objective":
      return objectivePost(forwardJsonRequest(req, body));
    case "badge":
      return badgePost(forwardJsonRequest(req, body));
    case "player-progress":
      return playerProgressPost(forwardJsonRequest(req, body));
    default:
      return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }
}