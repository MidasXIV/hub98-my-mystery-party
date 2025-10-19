"use client";
// import Image from "next/image"; // (Removed unused import)
import Link from "next/link";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/call-to-action";
import FAQ from "@/components/FAQ";
import Footer from "@/components/footer";
import Features from "@/components/features";
import { useTheme } from "next-themes";


import { coldCases } from "@/data/coldCases";
import TeamSection from "@/components/team-section";


gsap.registerPlugin(ScrollTrigger);

function CaseCard({ caseData }: { caseData: (typeof coldCases)[0] }) {
  return (
    <Link
      href={`/cases/${caseData.slug}`}
      className="relative w-80 md:w-96 h-[500px] flex-shrink-0 group transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-3xl"
    >
      <div className="relative w-80 md:w-96 h-[500px] flex-shrink-0 cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-105">
        <div
          className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
          style={{ backgroundImage: `url(${caseData.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
        </div>

        <div className="absolute top-5 left-5 right-5 p-3 flex justify-between items-center bg-black/10 backdrop-blur-md rounded-2xl text-white">
          <h3 className="font-semibold">{caseData.title}</h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-300 group-hover:rotate-[-45deg]"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
          {caseData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs text-white bg-white/20 backdrop-blur-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ColdCaseFiles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelectorAll(".case-card"), {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-surface text-text-primary py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          SOLVE THE UNSOLVABLE
        </h2>
        <h3 className="text-sm font-semibold text-text-secondary tracking-[0.2em] mb-6">
          COLD CASE FILE GAMES
        </h3>
        <p className="max-w-2xl text-text-secondary mb-12">
          Looking for a unique date night or a fun challenge with friends? Our
          immersive Cold Case Files put you in the role of a detective as you
          work through police reports, witness statements, and crime scene
          evidence to crack unsolved cases. Perfect for couples, game nights, or
          anyone who loves true crime and investigative puzzles.
        </p>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 md:space-x-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {coldCases.map((caseFile) => (
          <div key={caseFile.id} className="case-card">
            <CaseCard caseData={caseFile} />
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const { setTheme, theme } = useTheme();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const mainContainerRef = useRef(null);
  const footerRef = useRef<HTMLElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  // ThemeProvider in layout handles html class; we only persist preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme ?? "light");
    }
  }, [theme]);



  return (
    <div
      ref={rootRef}
      className="bg-background text-text-primary font-sans overflow-x-hidden"
    >
      <Hero />

      <div ref={mainContainerRef}>
        {/* --- MAIN CONTENT & FOOTER WRAPPER --- */}
        <main ref={mainContentRef} className="relative z-10 bg-background">
          <Testimonials />
          <Features />
          {/* <HowItWorks /> */}
          <ColdCaseFiles />
          <FAQ />
          <TeamSection />
        </main>
        <CallToAction />
        <Footer footerRef={footerRef as React.RefObject<HTMLElement>} />
      </div>
    </div>
  );
}

export default App;
