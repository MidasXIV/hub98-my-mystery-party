import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  mergePlayerProgressEvent,
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
    };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

  if (body.type !== "case-opened" && body.type !== "objective-solved") {
    return NextResponse.json({ error: "Unsupported event type" }, { status: 400 });
  }

  if (body.type === "objective-solved" && !isNonEmptyString(body.objectiveId)) {
    return NextResponse.json(
      { error: "objectiveId is required for objective-solved events" },
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
      : {
          type: "objective-solved" as const,
          caseSlug: body.caseSlug,
          objectiveId: body.objectiveId!,
          score: typeof body.score === "number" ? body.score : undefined,
          occurredAt: body.occurredAt,
          markCaseComplete: body.markCaseComplete === true,
          isKit: body.isKit === true,
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
