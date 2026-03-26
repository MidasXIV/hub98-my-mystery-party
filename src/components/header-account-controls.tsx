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
      "supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/40 dark:bg-black/35 shadow-2xl overflow-hidden text-gray-900 dark:text-gray-100",
    userButtonPopoverMain:
      "flex flex-col gap-2 p-3 bg-white/35 dark:bg-black/20 supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150",
    userButtonPopoverUserPreview:
      "rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/75 dark:bg-white/8 px-4 py-3 text-gray-900 dark:text-white shadow-lg shadow-black/5",
    userButtonPopoverUserPreviewMainIdentifier:
      "font-semibold text-sm text-gray-900 dark:text-white",
    userButtonPopoverUserPreviewSecondaryIdentifier:
      "text-xs text-gray-600 dark:text-gray-300",
    userButtonPopoverActionButton:
      "rounded-2xl border border-gray-200/20 dark:border-white/5 bg-white/55 dark:bg-white/5 px-3 py-2.5 text-gray-800 dark:text-white shadow-sm transition hover:-translate-y-0.5 hover:border-gray-200/60 hover:bg-white/85 hover:shadow-md dark:hover:border-white/15 dark:hover:bg-white/12",
    userButtonPopoverActionButtonText:
      "font-mono text-sm text-gray-900 dark:text-white",
    userButtonPopoverActionButtonIcon:
      "text-gray-600 dark:text-gray-300",
    userButtonPopoverActions:
      "gap-2 pb-1",
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