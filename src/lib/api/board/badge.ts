import { NextResponse } from "next/server";
import { getCaseBySlug } from "@/data/coldCases";
import type { BoardItem } from "@/lib/boardTypes";

type BadgeRequestBody = {
  caseSlug?: string;
};

function isBadgeItem(item: unknown): item is BoardItem {
  if (!item || typeof item !== "object") return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    obj.type === "objectives-cleared-badge"
  );
}

function getBadgeFromCase(caseSlug: string) {
  const caseFile = getCaseBySlug(caseSlug);
  const evidence = caseFile?.evidence as { items?: unknown[] } | undefined;

  if (!evidence || !Array.isArray(evidence.items)) {
    return null;
  }

  const rawBadge = evidence.items.find(isBadgeItem);
  return rawBadge ?? null;
}

async function resolveCaseSlug(req: Request) {
  let caseSlug: string | undefined;

  try {
    const body = (await req.json()) as BadgeRequestBody;
    if (typeof body?.caseSlug === "string" && body.caseSlug.trim()) {
      caseSlug = body.caseSlug.trim();
    }
  } catch {
    // Ignore JSON parse errors for GET/empty body requests.
  }

  if (!caseSlug) {
    const url = new URL(req.url);
    const qp = url.searchParams.get("case");
    if (qp && qp.trim()) caseSlug = qp.trim();
  }

  return caseSlug;
}

export async function GET(req: Request) {
  const caseSlug = await resolveCaseSlug(req);
  if (!caseSlug) {
    return NextResponse.json(
      { error: "Missing case slug. Provide ?case=<slug>." },
      { status: 400 },
    );
  }

  const badge = getBadgeFromCase(caseSlug);
  return NextResponse.json({ item: badge });
}

export async function POST(req: Request) {
  const caseSlug = await resolveCaseSlug(req);
  if (!caseSlug) {
    return NextResponse.json(
      { error: "Missing case slug. Provide { caseSlug: string } or ?case=<slug>." },
      { status: 400 },
    );
  }

  const badge = getBadgeFromCase(caseSlug);
  return NextResponse.json({ item: badge });
}
