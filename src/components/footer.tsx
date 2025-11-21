"use client";
import React from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

// The component is now very simple. It only needs the ref.
// All animation is handled by the parent.
// footerRef is optional so server components can render <Footer /> without creating a ref.
function Footer({ footerRef }: { footerRef?: React.RefObject<HTMLElement | null> }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Inversion logic: when overall theme is dark, footer uses light styling; vice versa.
  const containerClasses = clsx(
    'p-8 md:p-16 relative transition-colors',
    isDark
      ? 'bg-white text-black'
      : 'bg-black text-white'
  );
  const subtleText = clsx(
    'mt-2',
    isDark ? 'text-black/60' : 'text-white/60'
  );
  const tertiaryBadge = clsx(
    'border rounded-full px-3 py-1 text-xs',
    isDark ? 'border-black/20 text-black/50' : 'border-white/20 text-white/50'
  );
  const linkClass = clsx(
    'transition-colors',
    isDark ? 'hover:text-black/70' : 'hover:text-white/70'
  );
  const accentButton = clsx(
    'absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-opacity',
    isDark ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-white/80'
  );
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // The footer is now just a standard component. The `bg-surface` will be the dark gray.
  // The positioning (fixed/sticky behavior) is handled entirely by the GSAP pinning logic.
  return (
    <footer ref={footerRef} className="font-sans w-full relative z-0">
      <div className={containerClasses}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h1 className={clsx('text-8xl lg:text-9xl font-bold tracking-tighter', isDark ? 'text-black' : 'text-white')}>
              hub98
            </h1>
            <p className={subtleText}>
              Immersive Entertainment Experiences
            </p>
          </div>
          <div className="space-y-4">
            <span className={tertiaryBadge}>Contact</span>
            <div className={clsx(isDark ? 'text-black/80' : 'text-white/80')}>
              <p>My Mystery Party</p>
              <p>A Hub98 Entertainment Product</p>
              <a
                href="mailto:hello@mymysteryparty.com"
                className={linkClass}
              >
                hello@mymysteryparty.com
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <span className={tertiaryBadge}>Links</span>
            <ul className="space-y-2">
              {['Instagram','Facebook','Newsletter','FAQ','Terms of Service','Privacy Policy'].map(label => (
                <li key={label}><a href="#" className={linkClass}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className={accentButton}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;