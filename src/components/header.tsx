"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { HeaderMegaMenu } from "./header-coldcases-menu";
import { HeaderGuidesMenu } from "./header-guides-menu";
import type { GuidesMenuPayload } from "./header-guides-menu";

type HeaderProps = {
  guidesData: GuidesMenuPayload;
};

const Header = ({ guidesData }: HeaderProps) => {
  // Only rely on resolvedTheme; next-themes injects an inline script that
  // applies the correct html.class BEFORE React hydration, so we can lean
  // on Tailwind's dark: variants for initial paint without hiding both icons.
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [guidesOpen, setGuidesOpen] = React.useState(false);
  const guidesTriggerRef = React.useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const closeGuidesTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  React.useEffect(() => setMounted(true), []);
  // Detect current route to conditionally show a Home button when not on the homepage
  const pathname = usePathname();
  const showHomeButton = pathname !== "/";

  const effectiveTheme = mounted ? resolvedTheme : undefined; // undefined during SSR/hydration
  const toggleTheme = () => {
    const next = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuOpen(true);
  };

  const closeMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  };

  const openGuidesMenu = () => {
    if (closeGuidesTimeoutRef.current) {
      clearTimeout(closeGuidesTimeoutRef.current);
      closeGuidesTimeoutRef.current = null;
    }
    setGuidesOpen(true);
  };

  const closeGuidesMenu = () => {
    if (closeGuidesTimeoutRef.current) {
      clearTimeout(closeGuidesTimeoutRef.current);
    }
    closeGuidesTimeoutRef.current = setTimeout(() => {
      setGuidesOpen(false);
    }, 200);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  };

  const handleGuidesBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeGuidesMenu();
    }
  };

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (closeGuidesTimeoutRef.current)
        clearTimeout(closeGuidesTimeoutRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        // restore focus
        mobileMenuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed left-1/2 top-8 z-99 -translate-x-1/2 inline-flex items-center px-4 py-2 bg-white/80 dark:bg-black/40 border border-gray-200/60 dark:border-white/10 shadow-xl rounded-full w-fit max-w-[calc(100vw-1.5rem)] gap-3 backdrop-blur-md flex-wrap">
      {showHomeButton && (
        <Link
          href="/"
          aria-label="Go to homepage"
          className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/60 dark:border-white/10 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 shadow transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5l9-7.5 9 7.5M5.25 9.75V20.25h5.25v-4.5h3v4.5h5.25V9.75"
            />
          </svg>
        </Link>
      )}

      {/* Mobile-only menu button (desktop nav is hidden on small screens) */}
      <button
        ref={mobileMenuButtonRef}
        type="button"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
        className="inline-flex sm:hidden items-center gap-2 font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
      >
        <span>Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-4"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Cold Cases with custom hover panel (no NavigationMenuContent) */}
      <div
        ref={triggerRef}
        className="relative group hidden sm:block"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onFocusCapture={openMenu}
        onBlurCapture={handleBlur}
      >
        <Link
          href="/#cases"
          className="inline-flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
        >
          <span>Mysteries</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.162l3.71-2.93a.75.75 0 01.92 1.18l-4.2 3.32a.75.75 0 01-.92 0l-4.2-3.32a.75.75 0 01.02-1.17z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <HeaderMegaMenu
        open={menuOpen}
        anchorRef={triggerRef}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      />
      {/* <Link
        href="/invitations"
        className="font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
      >
        Invitations
      </Link> */}
      {/* Guides with custom hover panel, mirroring Cold Cases */}

      <div
        ref={guidesTriggerRef}
        className="relative group hidden sm:block"
        onMouseEnter={openGuidesMenu}
        onMouseLeave={closeGuidesMenu}
        onFocusCapture={openGuidesMenu}
        onBlurCapture={handleGuidesBlur}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
        >
          <span>Guides</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.162l3.71-2.93a.75.75 0 01.92 1.18l-4.2 3.32a.75.75 0 01-.92 0l-4.2-3.32a.75.75 0 01.02-1.17z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <HeaderGuidesMenu
        open={guidesOpen}
        anchorRef={guidesTriggerRef}
        onMouseEnter={openGuidesMenu}
        onMouseLeave={closeGuidesMenu}
        data={guidesData}
      />
      <Link
        href="/#faq"
        className="hidden sm:inline-flex font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
      >
        FAQ
      </Link>
      <div className="flex-1" />
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="ml-2 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/60 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition"
      >
        <span className="sr-only">Toggle theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-all duration-300 ${
            effectiveTheme === "light"
              ? "opacity-100 rotate-0"
              : "opacity-0 -rotate-90 scale-50 absolute"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-all duration-300 ${
            effectiveTheme === "dark"
              ? "opacity-100 rotate-0"
              : "opacity-0 rotate-90 scale-50 absolute"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </button>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-1/2 top-[5.25rem] w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/90 dark:bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 dark:border-white/10">
              <div className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                Menu
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300/60 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="p-3">
              {showHomeButton && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
                >
                  <span>Home</span>
                  <span aria-hidden>›</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => toggleTheme()}
                className="w-full flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
              >
                <span>Toggle theme</span>
                <span className="text-xs font-normal text-gray-600 dark:text-gray-300">
                  {effectiveTheme === "dark" ? "Dark" : "Light"}
                </span>
              </button>

              <div className="my-2 h-px bg-gray-200/60 dark:bg-white/10" />

              <Link
                href="/cases"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
              >
                <span>Mysteries</span>
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/kits"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
              >
                <span>Mystery Kits</span>
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
              >
                <span>Guides</span>
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100/70 dark:hover:bg-white/10 transition"
              >
                <span>FAQ</span>
                <span aria-hidden>›</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
