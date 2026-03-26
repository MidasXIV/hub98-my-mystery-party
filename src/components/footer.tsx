"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { coldCases } from "@/data/coldCases";

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
    return <div className={props.className}>{children}</div>;
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

function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const containerClasses = clsx(
    "px-6 pb-3 pt-14 md:px-16 md:pb-8 md:pt-20 relative transition-colors flex flex-col min-h-screen md:min-h-0",
    mounted
      ? isDark
        ? "bg-white text-black"
        : "bg-black text-white"
      : "bg-black text-white dark:bg-white dark:text-black",
  );

  const tertiaryBadge = clsx(
    "inline-flex w-fit self-start border rounded-full px-3 py-1 text-xs",
    mounted
      ? isDark
        ? "border-black/20 text-black/50"
        : "border-white/20 text-white/50"
      : "border-white/20 text-white/50 dark:border-black/20 dark:text-black/50",
  );

  const linkClass = clsx(
    "transition-colors text-sm md:text-base block py-1",
    mounted
      ? isDark
        ? "hover:text-black/60 text-black/80"
        : "hover:text-white/60 text-white/80"
      : "hover:text-white/60 text-white/80 dark:hover:text-black/60 dark:text-black/80",
  );

  const pillButton = clsx(
    "inline-block border rounded-full px-5 py-2 text-xs md:text-sm font-medium transition-all",
    mounted
      ? isDark
        ? "border-black hover:bg-black hover:text-white"
        : "border-white hover:bg-white hover:text-black"
      : "border-white hover:bg-white hover:text-black dark:border-black dark:hover:bg-black dark:hover:text-white",
  );

  const bottomLinkClass = clsx(
    "text-[10px] md:text-xs uppercase tracking-tighter transition-colors",
    mounted
      ? isDark
        ? "text-black/60 hover:text-black"
        : "text-white/60 hover:text-white"
      : "text-white/60 dark:text-black/60",
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "FAQ", href: "/#faq" },
    { label: "Waitlist", href: "/waitlist" },
    { label: "System Status", href: "/status" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Acceptable Use", href: "/acceptable-use" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Security Policy", href: "/security-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Accessibility", href: "/accessibility-statement" },
    {
      label: "Pinterest",
      href: "https://www.pinterest.com/mymysterypartypins/",
      external: true,
    },
  ];

  const utilityLabels = [
    "Terms of Service",
    "Acceptable Use",
    "Privacy Policy",
    "Security Policy",
    "Disclaimer",
    "Accessibility",
  ];
  const mainNavLinks = links.filter((l) =>
    ["FAQ", "System Status"].includes(l.label),
  );
  const socialLink = links.find((l) => l.label === "Pinterest");
  const bottomUtilityLinks = links.filter((l) =>
    utilityLabels.includes(l.label),
  );
  const footerCases = coldCases.slice(0, 5);

  return (
    <>
      <div
        id="footer-divider"
        className={clsx("relative z-10 h-6", isDark ? "bg-white" : "bg-black")}
      >
        <div
          className={clsx(
            "absolute inset-0 rounded-b-xl",
            isDark ? "bg-black" : "bg-white",
          )}
        ></div>
      </div>

      {/* FOOTER WRAPPER: Removed hard height, used min-height for reveal effect */}
      <footer
        className="relative min-h-screen md:min-h-[680px] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="md:fixed bottom-0 w-full z-50">
          {/* STICKY CONTAINER: Ensures content flows naturally on mobile if it exceeds viewport */}
          <div className="relative md:sticky bottom-0 h-full overflow-hidden">
            <div className={containerClasses}>
              <div
                aria-hidden
                className="absolute inset-0 isolate z-0 contain-strict overflow-hidden pointer-events-none"
              >
                <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.04)_0,transparent_70%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col min-h-full pt-6 md:pt-8">
                {/* 1. TOP CTA SECTION */}
                <AnimatedContainer className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-5xl font-medium tracking-tight max-w-2xl mb-6 md:mb-8 leading-tight">
                    Stay connected for early access to our newest tools and
                    local events
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    {socialLink && (
                      <a
                        href={socialLink.href}
                        className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:opacity-70 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-[10px] font-bold">P</span>
                      </a>
                    )}
                    <Link href="/waitlist" className={pillButton}>
                      Join the waitlist for new cases
                    </Link>
                  </div>
                </AnimatedContainer>

                {/* 2. THREE-COLUMN NAVIGATION GRID: Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-8">
                  <AnimatedContainer delay={0.2}>
                    <h3 className={tertiaryBadge}>Navigation</h3>
                    <ul className="space-y-1">
                      {mainNavLinks.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className={linkClass}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>

                  <AnimatedContainer delay={0.3}>
                    <h3 className={tertiaryBadge}>Contact</h3>

                    <div className="space-y-1">
                      <p className={linkClass}>My Mystery Party</p>
                      <p className={linkClass}>A Hub98 Entertainment Product</p>
                      <a
                        href="mailto:support@mymystery.party"
                        className={clsx(
                          linkClass,
                          "block mt-4 underline underline-offset-4",
                        )}
                      >
                        support@mymystery.party
                      </a>
                    </div>
                  </AnimatedContainer>

                  <AnimatedContainer delay={0.3}>
                    <h3 className={tertiaryBadge}>Cold Cases</h3>

                    <ul className="space-y-1">
                      {footerCases.map((coldCase) => (
                        <li key={coldCase.slug}>
                          <Link
                            href={`/cases/${coldCase.slug}`}
                            className={linkClass}
                          >
                            {coldCase.pageTitle || coldCase.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>
                </div>

                {/* 3. LARGE BRANDING: Responsive size (vw units) */}
                <AnimatedContainer
                  delay={0.5}
                  className="mt-2 md:mt-6 select-none"
                >
                  {/* Decorative brand mark: keep visual style but remove semantic H1 to avoid multiple H1 per page */}
                  <div
                    aria-hidden="true"
                    className="text-[20vw] md:text-[19vw] font-bold tracking-tighter leading-[0.75] -ml-1 md:-ml-2"
                  >
                    hub98
                  </div>
                </AnimatedContainer>

                {/* 4. BOTTOM UTILITY BAR: Stacks on mobile */}
                <div
                  className={clsx(
                    "mt-4 md:mt-6 pt-5 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-2 md:pb-0",
                    isDark ? "border-black/10" : "border-white/10",
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full md:w-auto">
                    <span className="font-bold text-sm tracking-tighter hidden md:block">
                      hub98
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 md:gap-x-5 gap-y-3">
                      {bottomUtilityLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className={bottomLinkClass}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={scrollToTop}
                    className={clsx(
                      bottomLinkClass,
                      "hover:opacity-60 flex items-center gap-1",
                    )}
                  >
                    Back to top <span>↑</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
