import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { AchievementCorkBoard } from "@/components/achievement-cork-board";
import { normalizePlayerProgressMetadata, PLAYER_PROGRESS_PUBLIC_METADATA_KEY } from "@/lib/player-progress";

export const metadata = {
  title: "Achievements",
  description: "A cork-board view of your mystery-solving milestones and enamel-pin style detective achievements.",
};

export default async function AchievementsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_30%),linear-gradient(180deg,_#140d08,_#050505)] px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-sm">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-amber-200/80">Detective access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Sign in to see your achievement board</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">
            Your enamel pins, cleared cases, and clue milestones are tied to your account. Sign in and this whole board lights up.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Back home
            </Link>
            <Link
              href="/cases"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Browse mysteries
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const progress = normalizePlayerProgressMetadata(
    user.publicMetadata?.[PLAYER_PROGRESS_PUBLIC_METADATA_KEY],
  );
  const firstName = user.firstName?.trim() || user.username || "Detective";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_28%),linear-gradient(180deg,_#140d08,_#050505)] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-amber-200/80">Signed-in extras</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {firstName}&rsquo;s achievement board
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
              A proper cork-board wall for your detective streak — complete with enamel-style pins, active investigations, and a quick tally of how chaotic your mystery career has become.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/cases"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Find another case
            </Link>
            <Link
              href="/play/station-zero"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Jump back in
            </Link>
          </div>
        </div>

        <AchievementCorkBoard progress={progress} />
      </div>
    </main>
  );
}