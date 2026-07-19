"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

type PlayAccessGateProps = {
  children: ReactNode;
  browseHref: string;
  browseLabel: string;
  heading: string;
  description: string;
  bullets: string[];
  wrapperClassName: string;
};

export default function PlayAccessGate({
  children,
  browseHref,
  browseLabel,
  heading,
  description,
  bullets,
  wrapperClassName,
}: PlayAccessGateProps) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div className={wrapperClassName} />;
  }

  if (userId) {
    return <>{children}</>;
  }

  return (
    <main className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%),linear-gradient(135deg,_rgba(17,24,39,0.98),_rgba(3,7,18,1))] px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Sign in required
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">{description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SignInButton mode="modal">
            <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200">
              Sign in to play
            </button>
          </SignInButton>
          <Link
            href={browseHref}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            {browseLabel}
          </Link>
        </div>

        <ul className="mt-8 space-y-3 text-sm text-white/65">
          {bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}