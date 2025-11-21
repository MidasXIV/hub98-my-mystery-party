"use client";
import React from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// The component is now very simple. It only needs the ref.
// All animation is handled by the parent.
// footerRef is optional so server components can render <Footer /> without creating a ref.
function Footer({
  footerRef,
}: {
  footerRef?: React.RefObject<HTMLElement | null>;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Inversion logic: when overall theme is dark, footer uses light styling; vice versa.
  const containerClasses = clsx(
    "p-8 md:p-16 relative transition-colors",
    isDark ? "bg-white text-black" : "bg-black text-white"
  );
  const subtleText = clsx("mt-2", isDark ? "text-black/60" : "text-white/60");
  const tertiaryBadge = clsx(
    "border rounded-full px-3 py-1 text-xs",
    isDark ? "border-black/20 text-black/50" : "border-white/20 text-white/50"
  );
  const linkClass = clsx(
    "transition-colors",
    isDark ? "hover:text-black/70" : "hover:text-white/70"
  );
  const accentButton = clsx(
    "absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-opacity",
    isDark
      ? "bg-black text-white hover:bg-black/80"
      : "bg-white text-black hover:bg-white/80"
  );
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // The footer is now just a standard component. The `bg-surface` will be the dark gray.
  // The positioning (fixed/sticky behavior) is handled entirely by the GSAP pinning logic.
  return (
    <>
      <div id="footer-divider" className={clsx("relative z-10 h-6", isDark ? "bg-white" : "bg-black")}>
        <div className={clsx("absolute inset-0 rounded-b-xl", isDark ? "bg-black" : "bg-white")}></div>
        <div className="absolute inset-0 shadow-xl"></div>
      </div>
      <footer
        className="relative h-[400px] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-[400px] w-full">
          <div className="sticky top-[calc(100vh-400px)] h-full overflow-y-auto">
            <div className={clsx("size-full border-t", containerClasses)}>
              {/* Decorative radial gradients retained */}
              <div
                aria-hidden
                className="absolute inset-0 isolate z-0 contain-strict"
              >
                <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
              </div>
              <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <AnimatedContainer className="md:col-span-1 space-y-4">
                  <h1
                    className={clsx(
                      "text-8xl lg:text-9xl font-bold tracking-tighter",
                      isDark ? "text-black" : "text-white"
                    )}
                  >
                    hub98
                  </h1>
                  <p className={subtleText}>
                    Immersive Entertainment Experiences
                  </p>
                </AnimatedContainer>
                <AnimatedContainer className="space-y-4">
                  <span className={tertiaryBadge}>Contact</span>
                  <div
                    className={clsx(isDark ? "text-black/80" : "text-white/80")}
                  >
                    <p>My Mystery Party</p>
                    <p>A Hub98 Entertainment Product</p>
                    <a
                      href="mailto:support@mymystery.party"
                      className={linkClass}
                    >
                      support@mymystery.party
                    </a>
                  </div>
                </AnimatedContainer>
                <AnimatedContainer className="space-y-4">
                  <span className={tertiaryBadge}>Links</span>
                  <ul className="space-y-2">
                    {[
                      "Instagram",
                      "Facebook",
                      "Newsletter",
                      "FAQ",
                      "Terms of Service",
                      "Privacy Policy",
                    ].map((label) => (
                      <li key={label}>
                        <a href="#" className={linkClass}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>
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
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
