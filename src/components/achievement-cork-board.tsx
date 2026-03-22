import Link from "next/link";
import { Award, BookOpenText, CheckCircle2, Compass, Sparkles, Star } from "lucide-react";
import type { PlayerCaseProgress, PlayerProgressPublicMetadata } from "@/lib/player-progress";
import { coldCases } from "@/data/coldCases";
import { cn } from "@/lib/utils";

type AchievementCorkBoardProps = {
  progress: PlayerProgressPublicMetadata;
  className?: string;
};

type AchievementPin = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Star;
  tone: string;
  unlocked: boolean;
};

const CASE_TITLE_BY_SLUG = new Map(coldCases.map((entry) => [entry.slug, entry.title]));

function getCaseTitle(slug: string) {
  return CASE_TITLE_BY_SLUG.get(slug) ?? slug.replace(/-/g, " ");
}

function formatDate(date: string | undefined) {
  if (!date) return "Just now";
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(parsed));
}

function buildPins(progress: PlayerProgressPublicMetadata): AchievementPin[] {
  const completedCases = progress.cases.filter((entry) => entry.status === "completed");
  const totalObjectives = progress.cases.reduce(
    (sum, entry) => sum + entry.objectives.length,
    0,
  );

  return [
    {
      id: "first-case",
      title: "First Footprints",
      subtitle:
        progress.cases.length > 0
          ? `Opened ${getCaseTitle(progress.cases[0]!.caseSlug)}`
          : "Open your first mystery to claim this pin",
      icon: Compass,
      tone: "from-amber-200 via-yellow-300 to-orange-500",
      unlocked: progress.cases.length > 0,
    },
    {
      id: "objective-hunter",
      title: "Clue Hunter",
      subtitle:
        totalObjectives > 0
          ? `${totalObjectives} objectives cracked across your board`
          : "Solve an objective to unlock your first enamel pin",
      icon: Sparkles,
      tone: "from-sky-200 via-cyan-300 to-blue-500",
      unlocked: totalObjectives > 0,
    },
    {
      id: "case-closer",
      title: "Case Closer",
      subtitle:
        completedCases.length > 0
          ? `${completedCases.length} mystery ${completedCases.length === 1 ? "closed" : "closures"}`
          : "Finish a case to pin this victory badge",
      icon: CheckCircle2,
      tone: "from-emerald-200 via-lime-300 to-green-500",
      unlocked: completedCases.length > 0,
    },
    {
      id: "night-archivist",
      title: "Night Archivist",
      subtitle:
        progress.cases.length >= 3
          ? `Built a trail across ${progress.cases.length} mysteries`
          : "Investigate 3 cases to earn this collector pin",
      icon: BookOpenText,
      tone: "from-fuchsia-200 via-pink-300 to-rose-500",
      unlocked: progress.cases.length >= 3,
    },
    {
      id: "master-sleuth",
      title: "Master Sleuth",
      subtitle:
        completedCases.length >= 3
          ? "A seasoned detective with a wall full of wins"
          : "Close 3 mysteries to unlock this rare pin",
      icon: Award,
      tone: "from-violet-200 via-purple-300 to-indigo-500",
      unlocked: completedCases.length >= 3,
    },
  ];
}

function getRecentHighlights(cases: PlayerCaseProgress[]) {
  return [...cases]
    .sort((a, b) => Date.parse(b.lastPlayedAt) - Date.parse(a.lastPlayedAt))
    .slice(0, 3);
}

export function AchievementCorkBoard({ progress, className }: AchievementCorkBoardProps) {
  const pins = buildPins(progress);
  const totalObjectives = progress.cases.reduce(
    (sum, entry) => sum + entry.objectives.length,
    0,
  );
  const recentHighlights = getRecentHighlights(progress.cases);
  const completedCases = progress.cases.filter((entry) => entry.status === "completed");

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-amber-950/20 bg-[linear-gradient(180deg,rgba(142,87,37,0.88),rgba(109,67,28,0.96))] p-5 shadow-[0_32px_80px_rgba(55,28,5,0.35)] sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_25%_75%,rgba(0,0,0,0.18),transparent_22%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-size:140px_140px] [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-amber-100/80">
                Detective display
              </p>
              <h2 className="mt-2 font-[var(--font-staatliches)] text-4xl tracking-[0.08em] text-amber-50 sm:text-5xl">
                Achievement Cork Board
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-50/80 sm:text-base">
                Your enamel-pin wall of wins. Every case opened, clue cracked, and finale solved gets the full detective-board treatment.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/15 bg-black/15 px-5 py-4 text-right text-amber-50 shadow-inner shadow-black/10 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-100/70">Pinned so far</div>
              <div className="mt-2 text-4xl font-black leading-none">{pins.filter((pin) => pin.unlocked).length}</div>
              <div className="mt-2 text-sm text-amber-50/70">of {pins.length} enamel pins unlocked</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pins.map((pin, index) => {
              const Icon = pin.icon;
              return (
                <article
                  key={pin.id}
                  className={cn(
                    "relative min-h-[210px] rounded-[1.75rem] border px-5 pb-5 pt-8 shadow-[0_18px_40px_rgba(34,16,3,0.24)] transition-transform duration-200",
                    pin.unlocked
                      ? "rotate-[-1.5deg] border-white/25 bg-gradient-to-br from-white/95 via-white/90 to-amber-50/85 text-stone-900"
                      : "rotate-[1deg] border-white/10 bg-black/20 text-amber-50/70",
                    index % 2 === 1 && "rotate-[1.25deg]",
                    index % 3 === 2 && "rotate-[-0.75deg]",
                  )}
                >
                  <div className="absolute left-5 top-4 h-4 w-4 rounded-full border border-black/10 bg-gradient-to-br from-slate-100 to-slate-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.25)]" />
                  <div className="absolute right-5 top-4 h-4 w-4 rounded-full border border-black/10 bg-gradient-to-br from-red-100 to-rose-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.25)]" />

                  <div
                    className={cn(
                      "mx-auto flex h-20 w-20 items-center justify-center rounded-[1.6rem] border shadow-lg",
                      pin.unlocked
                        ? `bg-gradient-to-br ${pin.tone} border-white/60 text-slate-950`
                        : "border-white/10 bg-white/5 text-amber-50/45",
                    )}
                  >
                    <Icon className="h-10 w-10" strokeWidth={2.2} />
                  </div>

                  <div className="mt-5 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-current/60">
                      {pin.unlocked ? "Unlocked" : "Locked"}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-tight">{pin.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-current/75">{pin.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="grid gap-5">
          <div className="rounded-[1.75rem] border border-white/15 bg-amber-50/10 p-5 text-amber-50 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-100/70">
              Board stats
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="text-3xl font-black">{progress.cases.length}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-100/70">Cases opened</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="text-3xl font-black">{completedCases.length}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-100/70">Cases closed</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="text-3xl font-black">{totalObjectives}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-100/70">Objectives solved</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="text-3xl font-black">
                  {progress.cases[0]?.lastPlayedAt ? formatDate(progress.cases[0].lastPlayedAt).split(",")[0] : "—"}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-100/70">Latest note</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-stone-950/20 p-5 text-amber-50/90">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-100/70">Recent pins</p>
            {recentHighlights.length > 0 ? (
              <div className="mt-4 space-y-3">
                {recentHighlights.map((entry) => (
                  <Link
                    key={entry.caseSlug}
                    href={`/play/${entry.caseSlug}`}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-amber-50">{getCaseTitle(entry.caseSlug)}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100/60">
                          {entry.status === "completed" ? "Closed case" : "Active investigation"}
                        </div>
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-amber-50/75">
                        {entry.objectives.length} clues
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-amber-50/70">
                      Last updated {formatDate(entry.lastPlayedAt)}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-amber-50/75">
                Your board is ready for its first pin. Jump into a case and your detective milestones will start appearing here.
              </p>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 text-amber-50 shadow-inner shadow-black/10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-100/70">Next unlocks</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-50/80">
              <li>• Open 3 mysteries to earn the <span className="font-semibold text-amber-100">Night Archivist</span> pin.</li>
              <li>• Close 3 full investigations to reveal <span className="font-semibold text-amber-100">Master Sleuth</span>.</li>
              <li>• Keep solving objectives to build a board that actually looks gloriously over-pinned.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}