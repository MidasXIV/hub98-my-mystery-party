"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

type HeaderAccountControlsProps = {
  signInButtonClassName: string;
};

type HeaderNotificationItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  href?: string;
  isUnread?: boolean;
};

const HEADER_NOTIFICATIONS: HeaderNotificationItem[] = [
  {
    id: "notif-001",
    title: "New case: The Murder at Kismet Casino",
    description: "A fresh investigation has been added. Open the case file and start solving.",
    createdAt: "2026-07-30T15:45:00.000Z",
    href: "/cases/the-murder-at-kismet-casino",
    isUnread: true,
  },
  {
    id: "notif-002",
    title: "Moderation server is back up",
    description: "Objectives can be played and evaluated again.",
    createdAt: "2026-07-30T13:10:00.000Z",
    isUnread: true,
  },
  {
    id: "notif-003",
    title: "Roadmap update",
    description: "Board clues can now include richer item previews.",
    createdAt: "2026-07-18T09:30:00.000Z",
  },
];

const RECENT_NOTIFICATION_WINDOW_DAYS = 7;

function formatNotificationTimestamp(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return {
      relativeLabel: "Unknown time",
      calendarDate: "",
    };
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const calendarDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  if (diffMs < 0 || diffDays > RECENT_NOTIFICATION_WINDOW_DAYS) {
    return {
      relativeLabel: calendarDate,
      calendarDate,
    };
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (seconds < 60) {
    return {
      relativeLabel: "just now",
      calendarDate,
    };
  }
  if (minutes < 60) {
    return {
      relativeLabel: rtf.format(-minutes, "minute"),
      calendarDate,
    };
  }
  if (hours < 24) {
    return {
      relativeLabel: rtf.format(-hours, "hour"),
      calendarDate,
    };
  }

  return {
    relativeLabel: rtf.format(-diffDays, "day"),
    calendarDate,
  };
}

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
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = React.useMemo(
    () => HEADER_NOTIFICATIONS.filter((item) => item.isUnread).length,
    [],
  );

  React.useEffect(() => {
    if (!notificationsOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [notificationsOpen]);

  if (isSignedIn) {
    return (
      <div ref={notificationsRef} className="relative flex items-center gap-2">
        <button
          type="button"
          aria-label="Open notifications"
          aria-expanded={notificationsOpen}
          aria-haspopup="dialog"
          onClick={() => setNotificationsOpen((value) => !value)}
          className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white shadow-sm transition hover:bg-white/90 dark:hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.286 3.86L1.82 18A2 2 0 003.535 21h16.93a2 2 0 001.715-3L13.714 3.86a2 2 0 00-3.428 0z"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white dark:ring-black">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
          <section
            role="dialog"
            aria-label="Notifications"
            className="absolute left-0 top-[calc(100%+0.65rem)] z-[120] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-gray-200/60 bg-white/90 shadow-2xl shadow-black/10 backdrop-blur-xl sm:left-auto sm:right-0 dark:border-white/10 dark:bg-black/70"
          >
            <header className="flex items-center justify-between border-b border-gray-200/70 px-4 py-3 dark:border-white/10">
              <h3 className="font-mono text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <span className="rounded-full border border-gray-200/80 bg-white/80 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:border-white/15 dark:bg-white/10 dark:text-gray-200">
                {unreadCount} unread
              </span>
            </header>

            <ul className="max-h-80 space-y-2 overflow-y-auto p-3">
              {HEADER_NOTIFICATIONS.map((item) => {
                const { relativeLabel, calendarDate } = formatNotificationTimestamp(item.createdAt);

                const content = (
                  <>
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      {item.isUnread && (
                        <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-rose-500" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">{item.description}</p>
                    <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                      {relativeLabel}
                      {calendarDate && relativeLabel !== calendarDate ? ` • ${calendarDate}` : ""}
                    </p>
                  </>
                );

                return (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-gray-200/70 bg-white/85 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setNotificationsOpen(false)}
                        className="block cursor-pointer rounded-2xl px-3 py-3 hover:bg-gray-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:hover:bg-white/10"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="px-3 py-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <UserButton showName appearance={userButtonAppearance}>
          <UserButton.MenuItems>
            {/* <UserButton.Link
              label="Achievements"
              labelIcon={<span aria-hidden className="text-base">📌</span>}
              href="/achievements"
            /> */}
          </UserButton.MenuItems>
        </UserButton>
      </div>
    );
  }

  return (
    <SignInButton>
      <button className={signInButtonClassName}>Sign in</button>
    </SignInButton>
  );
}