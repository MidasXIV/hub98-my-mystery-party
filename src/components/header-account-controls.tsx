"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

type HeaderAccountControlsProps = {
  signInButtonClassName: string;
};

const userButtonAppearance = {
  elements: {
    userButtonTrigger:
      "rounded-full border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md px-2 py-1 hover:bg-white/80 dark:hover:bg-white/10",
    userButtonAvatarBox:
      "h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-gray-900 ring-2 ring-white/80 dark:from-slate-800 dark:to-slate-900 dark:text-white dark:ring-white/20",
    userButtonPopoverCard:
      "bg-white/85 dark:bg-black/70 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl",
    userButtonPopoverActionButton:
      "text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-white/10",
    userButtonPopoverActionButtonText: "font-mono",
    userButtonPopoverFooter: "hidden",
  },
} as const;

export function HeaderAccountControls({ signInButtonClassName }: HeaderAccountControlsProps) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <UserButton showName appearance={userButtonAppearance}>
        <UserButton.MenuItems>
          {/* <UserButton.Link
            label="Achievements"
            labelIcon={<span aria-hidden className="text-base">📌</span>}
            href="/achievements"
          /> */}
        </UserButton.MenuItems>
      </UserButton>
    );
  }

  return (
    <SignInButton>
      <button className={signInButtonClassName}>Sign in</button>
    </SignInButton>
  );
}