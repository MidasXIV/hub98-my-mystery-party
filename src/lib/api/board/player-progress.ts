import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  mergePlayerProgressEvent,
  normalizePlayerProgressMetadata,
  PLAYER_PROGRESS_PUBLIC_METADATA_KEY,
} from "@/lib/player-progress";

type ProgressEventRequestBody =
  | {
      type: "case-opened";
      caseSlug?: string;
      occurredAt?: string;
      isKit?: boolean;
    }
  | {
      type: "objective-solved";
      caseSlug?: string;
      objectiveId?: string;
      score?: number;
      occurredAt?: string;
      markCaseComplete?: boolean;
      isKit?: boolean;
    }
  | {
      type: "notify-new-case-preference";
      caseSlug?: string;
      wantsNewCaseNotifications?: boolean;
      occurredAt?: string;
    };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function GET(req: Request) {
  const { userId } = await auth();
  const url = new URL(req.url);
  const caseSlug = url.searchParams.get("caseSlug");
  const isKit = url.searchParams.get("isKit") === "true";

  if (!isNonEmptyString(caseSlug)) {
    return NextResponse.json({ error: "caseSlug is required" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({
      ok: true,
      authenticated: false,
      caseProgress: null,
      completedObjectiveIds: [],
    });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const metadata = normalizePlayerProgressMetadata(
    user.publicMetadata?.[PLAYER_PROGRESS_PUBLIC_METADATA_KEY],
  );

  const source = isKit ? metadata.kits ?? [] : metadata.cases;
  const caseProgress = source.find((entry) => entry.caseSlug === caseSlug) ?? null;

  return NextResponse.json({
    ok: true,
    authenticated: true,
    caseProgress,
    completedObjectiveIds: Array.from(
      new Set(caseProgress?.objectives.map((objective) => objective.objectiveId) ?? []),
    ),
  });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ProgressEventRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || !isNonEmptyString(body.caseSlug)) {
    return NextResponse.json({ error: "caseSlug is required" }, { status: 400 });
  }

  if (
    body.type !== "case-opened" &&
    body.type !== "objective-solved" &&
    body.type !== "notify-new-case-preference"
  ) {
    return NextResponse.json({ error: "Unsupported event type" }, { status: 400 });
  }

  if (body.type === "objective-solved" && !isNonEmptyString(body.objectiveId)) {
    return NextResponse.json(
      { error: "objectiveId is required for objective-solved events" },
      { status: 400 },
    );
  }

  if (
    body.type === "notify-new-case-preference" &&
    typeof body.wantsNewCaseNotifications !== "boolean"
  ) {
    return NextResponse.json(
      {
        error:
          "wantsNewCaseNotifications must be a boolean for notify-new-case-preference events",
      },
      { status: 400 },
    );
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentMetadata = user.publicMetadata?.[PLAYER_PROGRESS_PUBLIC_METADATA_KEY];
  const nextProgress = mergePlayerProgressEvent(currentMetadata, {
    ...(body.type === "case-opened"
      ? {
          type: "case-opened" as const,
          caseSlug: body.caseSlug,
          occurredAt: body.occurredAt,
          isKit: body.isKit === true,
        }
      : body.type === "objective-solved"
        ? {
            type: "objective-solved" as const,
            caseSlug: body.caseSlug,
            objectiveId: body.objectiveId!,
            score: typeof body.score === "number" ? body.score : undefined,
            occurredAt: body.occurredAt,
            markCaseComplete: body.markCaseComplete === true,
            isKit: body.isKit === true,
          }
        : {
            type: "notify-new-case-preference" as const,
            caseSlug: body.caseSlug,
            wantsNewCaseNotifications: body.wantsNewCaseNotifications === true,
            occurredAt: body.occurredAt,
          }),
  });

  await client.users.updateUser(userId, {
    // Ensure we don't attempt to spread undefined if the user has no publicMetadata yet
    publicMetadata: {
      ...(user.publicMetadata ?? {}),
      [PLAYER_PROGRESS_PUBLIC_METADATA_KEY]: nextProgress,
    },
  });

  return NextResponse.json({ ok: true, progress: nextProgress });
}
