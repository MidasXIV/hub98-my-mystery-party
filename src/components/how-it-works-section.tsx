import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Placeholder Icons ---
const MagnifyingGlassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;

const howItWorksCardsData = [
  { id: "hiw-1", title: "1. Choose Your Case", imageUrl: "https://picsum.photos/seed/howitworks1/800/1200", Icon: MagnifyingGlassIcon },
  { id: "hiw-2", title: "2. Instantly Download & Print", imageUrl: "https://picsum.photos/seed/howitworks2/800/1200", Icon: DownloadIcon },
  { id: "hiw-3", title: "3. Host a Killer Night", imageUrl: "https://picsum.photos/seed/howitworks3/800/1200", Icon: UsersIcon },
  { id: "hiw-4", title: "4. Distribute Character Roles", imageUrl: "https://picsum.photos/seed/howitworks4/800/1200", Icon: UserGroupIcon },
  { id: "hiw-5", title: "5. Uncover Clues Together", imageUrl: "https://picsum.photos/seed/howitworks5/800/1200", Icon: PuzzleIcon },
];
const valuePropositionCardsData = [
  { title: "Create Unforgettable Memories", imageUrl: "https://picsum.photos/seed/valueprop1/800/1200" },
  { title: "Everything You Need Included", imageUrl: "https://picsum.photos/seed/valueprop2/800/1200" },
  { title: "Become the Ultimate Host", imageUrl: "https://picsum.photos/seed/valueprop3/800/1200" },
  { title: "Spark Spontaneous Laughter", imageUrl: "https://picsum.photos/seed/valueprop4/800/1200" },
  { title: "Deepen Your Friendships", imageUrl: "https://picsum.photos/seed/valueprop5/800/1200" },
];

function HowItWorksCard({ title, imageUrl, Icon, cardId, className = "" }: { title: string; imageUrl: string; Icon?: React.ElementType; cardId?: string; className?: string; }) {
  return (
    <div data-card-id={cardId} className={`relative aspect-[2/3] w-full rounded-3xl overflow-hidden shadow-2xl how-it-works-card ${className}`}>
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <h3 className="absolute bottom-6 left-6 text-xl md:text-2xl font-semibold text-white flex items-center">
        {Icon && <Icon />} {title}
      </h3>
    </div>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const howItWorksTextRef = useRef<HTMLDivElement>(null);
  const valuePropTextRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const [svgPath, setSvgPath] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // --- NEW: Parallax Background Animation ---
        gsap.to(section, {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".how-it-works-card").forEach((card) => {
          gsap.from(card, { opacity: 0, y: 120, ease: "power3.out", duration: 1, scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none none" } });
        });

        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const leftCol = leftColRef.current;
          const rightCol = rightColRef.current;
          const triggerElement = triggerRef.current;
          const howItWorksText = howItWorksTextRef.current;
          const valuePropText = valuePropTextRef.current;

          if (!leftCol || !rightCol || !triggerElement || !howItWorksText || !valuePropText) return;

          // --- SVG Path Calculation (with sorting logic) ---
          const cards = gsap.utils.toArray<HTMLElement>('[data-card-id^="hiw-"]');
          // IMPORTANT: Sort cards by their vertical position to draw the line correctly
          cards.sort((a, b) => a.offsetTop - b.offsetTop);

          const points: { x: number; y: number }[] = [];
          cards.forEach((card) => {
            const x = card.offsetLeft + card.offsetWidth / 2;
            const y = card.offsetTop + card.offsetHeight / 2;
            points.push({ x, y });
          });

          if (points.length > 0) {
            let pathData = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
              pathData += ` L ${points[i].x} ${points[i].y}`;
            }
            setSvgPath(pathData);
          }

          // --- Main Pinning Animation ---
          ScrollTrigger.create({ trigger: section, start: "top top", end: () => `+=${leftCol.offsetHeight - rightCol.offsetHeight}`, pin: rightCol, pinSpacing: true, invalidateOnRefresh: true });

          // --- Parallax for cards ---
          gsap.utils.toArray<HTMLElement>(".how-it-works-card").forEach((card) => {
            gsap.to(card, { yPercent: -15, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
          });

          // --- Text Cross-fade ---
          const tl = gsap.timeline({ scrollTrigger: { trigger: triggerElement, start: "top center", end: "+=300", scrub: true } });
          tl.to(howItWorksText, { autoAlpha: 0, ease: "power2.in" }).to(valuePropText, { autoAlpha: 1, ease: "power2.out" }, "<");
        });
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const path = svgPathRef.current;
    if (!path || !svgPath) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 1 });

    const st = ScrollTrigger.create({
      trigger: leftColRef.current,
      start: 'top top',
      end: () => `+=${leftColRef.current?.offsetHeight || window.innerHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const drawLength = pathLength * self.progress;
        gsap.set(path, { strokeDashoffset: pathLength - drawLength });
      },
    });

    return () => { st.kill(); };
  }, [svgPath]);

  return (
    <section
      ref={sectionRef}
      className="bg-background text-text-primary py-24 md:py-40 font-sans relative"
      // --- NEW: Added background image for parallax effect ---
      style={{
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)',
        backgroundSize: 'auto',
        backgroundPosition: '50% 0%',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Optional: Dark overlay for better text contrast */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={leftColRef} className="md:col-span-2 grid grid-cols-2 gap-4 md:gap-8 relative">
          <div className="absolute top-0 left-0 w-full h-full hidden md:block pointer-events-none">
            <svg width="100%" height="100%" className="overflow-visible">
              <path ref={svgPathRef} d={svgPath} fill="none" stroke="rgba(255, 215, 0, 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0, filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.7))' }} />
            </svg>
          </div>
          <div className="space-y-4 md:space-y-8">
            {howItWorksCardsData.filter((_, i) => i % 2 === 0).map((card, index) => <div key={`hiw-col1-${index}`}><HowItWorksCard cardId={card.id} title={card.title} imageUrl={card.imageUrl} Icon={card.Icon} /></div>)}
            <div ref={triggerRef} className="h-1 w-full"></div>
            {valuePropositionCardsData.filter((_, i) => i % 2 === 0).map((card, index) => <div key={`vp-col1-${index}`}><HowItWorksCard title={card.title} imageUrl={card.imageUrl} /></div>)}
          </div>
          <div className="space-y-4 md:space-y-8 mt-12 md:mt-24">
            {howItWorksCardsData.filter((_, i) => i % 2 !== 0).map((card, index) => <div key={`hiw-col2-${index}`}><HowItWorksCard cardId={card.id} title={card.title} imageUrl={card.imageUrl} Icon={card.Icon} /></div>)}
            {valuePropositionCardsData.filter((_, i) => i % 2 !== 0).map((card, index) => <div key={`vp-col2-${index}`}><HowItWorksCard title={card.title} imageUrl={card.imageUrl} /></div>)}
          </div>
        </div>
        <div ref={rightColRef} className="h-screen hidden md:flex items-center justify-start">
            <div className="relative w-full max-w-md">
                <div ref={howItWorksTextRef} className="absolute inset-0 flex flex-col justify-center">
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Your entire party, ready in minutes.</h2>
                    <p className="mt-6 text-lg text-text-secondary">Forget complicated board games and endless planning. We provide everything you need in an instant download. Just choose your mystery, print the materials, and get ready for a night of unforgettable fun.</p>
                    <div aria-hidden="true" className="mt-8 px-6 py-3 rounded-full font-semibold self-start invisible">Explore Our Mysteries</div>
                </div>
                <div ref={valuePropTextRef} style={{ visibility: "hidden" }} className="absolute inset-0 flex flex-col justify-center">
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">More than a game. It's an experience.</h2>
                    <p className="mt-6 text-lg text-text-secondary">We create immersive stories that become the centerpiece of your event. It’s an icebreaker, a team-builder, and a memory-maker, all in one box—or in this case, one download.</p>
                    <button className="mt-8 bg-accent text-accent-text px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity self-start">Explore Our Mysteries</button>
                </div>
            </div>
        </div>
        <div className="md:hidden mt-16 space-y-20">
            {/* Mobile text content... */}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;