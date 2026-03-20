import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";

// Dedicated layout for /play section to maximize board area and remove scrolling/header.
// Keeps full-screen space, prevents body scroll, and provides an isolated theme context.

export default async function PlaySectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {userId ? (
          children
        ) : (
          <main className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#05070b] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: "url('/hero_wideshot/woman-vanishing.png')",
              }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,204,119,0.14),_transparent_34%),linear-gradient(180deg,_rgba(4,6,11,0.35)_0%,_rgba(4,6,11,0.82)_48%,_rgba(4,6,11,0.98)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff08_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />

            <div className="relative z-10 grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_35%,transparent_65%,rgba(245,158,11,0.06))]" />

                <div className="relative max-w-2xl">
                  <div className="mb-5 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-amber-100/90">
                    Interactive case access
                  </div>

                  <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Step into the evidence board like the rest of the experience.
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
                    Sign in to open your playable case board, move through the evidence, and keep your progress attached to your account. Same mystery atmosphere. Full interactive experience.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <SignInButton mode="modal">
                      <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-950/20 transition hover:bg-amber-200">
                        Sign in to play
                      </button>
                    </SignInButton>
                    <Link
                      href="/cases"
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                    >
                      Browse cases first
                    </Link>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                      <p className="text-[11px] uppercase tracking-[0.26em] text-white/45">
                        Evidence
                      </p>
                      <p className="mt-2 text-sm text-white/85">
                        Open files, notes, overlays, and hidden details in one place.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                      <p className="text-[11px] uppercase tracking-[0.26em] text-white/45">
                        Progress
                      </p>
                      <p className="mt-2 text-sm text-white/85">
                        Leave and come back without losing your investigation state.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                      <p className="text-[11px] uppercase tracking-[0.26em] text-white/45">
                        Playback
                      </p>
                      <p className="mt-2 text-sm text-white/85">
                        Jump straight from browsing a case into the interactive board.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="grid gap-6">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/features_section/all-your-evidence.png"
                      alt="Evidence board preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/85">
                        Full board mode
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/82">
                        Built for side-by-side evidence reading, annotation, and clue tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-amber-100/80">
                    Why sign in?
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
                    <li>• Access the interactive board and evidence overlays</li>
                    <li>• Keep your mystery progress tied to your account</li>
                    <li>• Jump back into active cases without losing your place</li>
                  </ul>
                </div>
              </aside>
            </div>
          </main>
        )}
      </ThemeProvider>
    </div>
  );
}