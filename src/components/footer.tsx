import React from 'react';

// The component is now very simple. It only needs the ref.
// All animation is handled by the parent.
function Footer({ footerRef }: { footerRef: React.RefObject<HTMLElement | null> }) {
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
      {/* --- YOUR JSX IS 100% UNCHANGED --- */}
      <div className="bg-surface text-text-secondary p-8 md:p-16 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h1 className="text-8xl lg:text-9xl font-bold text-text-primary tracking-tighter">
              hub98
            </h1>
            <p className="mt-2 text-text-tertiary">
              Immersive Entertainment Experiences
            </p>
          </div>
          <div className="space-y-4">
            <span className="border border-subtle-stroke rounded-full px-3 py-1 text-xs text-text-tertiary">
              Contact
            </span>
            <div>
              <p>My Mystery Party</p>
              <p>A Hub98 Entertainment Product</p>
              <a
                href="mailto:hello@mymysteryparty.com"
                className="hover:text-text-primary transition-colors"
              >
                hello@mymysteryparty.com
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <span className="border border-subtle-stroke rounded-full px-3 py-1 text-xs text-text-tertiary">
              Links
            </span>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className="absolute bottom-8 right-8 w-12 h-12 bg-surface-accent rounded-full flex items-center justify-center text-text-primary hover:bg-opacity-70 transition-opacity"
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