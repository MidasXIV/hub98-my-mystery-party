"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // Use resolvedTheme so 'system' doesn't cause ambiguous flicker.
  const current = resolvedTheme || theme; // fallback
  const toggleTheme = () => {
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
  };

  return (
    <header
      className="fixed left-1/2 top-8 z-50 transform -translate-x-1/2 flex items-center px-4 py-2 bg-white/80 dark:bg-black/40 border border-gray-200/60 dark:border-white/10 shadow-xl rounded-full w-[360px] max-w-full gap-3 backdrop-blur-md"
    >
      <Link
        href="/#cases"
        className="font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
      >
        Cold Cases
      </Link>
      <Link
        href="/#faq"
        className="font-mono text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-semibold shadow border border-gray-300/60 dark:border-white/10 transition"
      >
        FAQ
      </Link>
      <div className="flex-1" />
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/60 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition"
      >
        <span className="sr-only">Toggle theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-all duration-300 ${
            current === "light"
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
            current === "dark"
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
    </header>
  );
};

export default Header;
