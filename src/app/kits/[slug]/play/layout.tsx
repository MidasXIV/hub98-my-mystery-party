import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

export default async function KitPlayLayout({ children }: { children: React.ReactNode }) {
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
          <main className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%),linear-gradient(135deg,_rgba(17,24,39,0.98),_rgba(3,7,18,1))] px-6 text-white">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                Sign in required
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Sign in to access play mode</h1>
              <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                To play a kit, save progress, and unlock interactive features, you’ll need to sign in first.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SignInButton mode="modal">
                  <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200">
                    Sign in to play
                  </button>
                </SignInButton>
                <Link
                  href="/kits"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Browse kits
                </Link>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-white/65">
                <li>• Access the interactive board and evidence overlays</li>
                <li>• Keep your mystery progress tied to your account</li>
                <li>• Jump back into active kits without losing your place</li>
              </ul>
            </div>
          </main>
        )}
      </ThemeProvider>
    </div>
  );
}
