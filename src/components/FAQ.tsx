import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Updated FAQ content for Beta launch of the digital cold case experience.
// Keep answers conversational, concise, and focused on current (free) feature set.
const faqs = [
  {
    question: "What is My Mystery Party?",
    answer:
      "It's a digital sleuthing platform where you and your friends investigate interactive cold case files directly in your browser—no PDFs, no printing, just pure detective work."
  },
  {
    question: "Are we in Beta right now?",
    answer:
      "Yes! You're using the open beta. That means features are still evolving, some panels may feel bare, and we're actively gathering feedback before full launch."
  },
  {
    question: "What makes it different from traditional mystery party kits?",
    answer:
      "Instead of hosting with printed packets, everything—objectives, evidence, timelines, suspects—is structured as dynamic panels you explore and unlock digitally. It's built for easier sharing, faster setup, and replay hosting."
  },
  {
    question: "Is everything free right now?",
    answer:
      "Yep. During beta all available cases are 100% free to play. Paid cases, add‑ons, and premium features will roll out after we stabilize core gameplay."
  },
  {
    question: "Can I download or buy cases yet?",
    answer:
      "Not yet. Downloads and purchase flows are disabled in beta. Your progress lives in the app. A marketplace + optional printable bundles are planned post‑beta."
  },
  {
    question: "How do I start playing a case?",
    answer:
      "Pick a cold case from the Cases page, open its board, and dive into objectives and evidence. You can collaborate live by sharing your screen or playing side‑by‑side. Multiplayer accounts and synced sessions are coming later."
  },
  {
    question: "Can I replay a case?",
    answer:
      "You can absolutely host or guide new players through the same case again. If you've already solved it, the core culprit won't change—so it's best to take a facilitator role on replays."
  },
  {
    question: "How long does a typical case take?",
    answer:
      "Most current beta cases take 1–2 hours for focused groups; casual play or thorough clue combing can stretch to ~2–3. Feel free to pause—your progress persists locally."
  },
  {
    question: "Do I need any special setup?",
    answer:
      "Just a modern browser and a reasonably sized screen. Mobile optimization is underway; desktop/laptop gives the best experience right now."
  },
  {
    question: "Where can I suggest features or report bugs?",
    answer:
      "Head to the Roadmap section to see what's coming and drop feedback. We're prioritizing based on player input during beta."
  }
];
// Reusable Chevron Icon Component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`transform transition-transform duration-300 flex-shrink-0 ${
      isOpen ? "rotate-180" : ""
    }`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* The SVG path is flipped to point up by default, so rotating 180 makes it point down */}
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Start with the first item open
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
     if (!componentRef.current) return;
    // Set up GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Animate the main title
      gsap.from(".faq-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-title",
          start: "top 90%",
        },
      });

      // Stagger animation for each FAQ item
      gsap.from(".faq-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 85%",
        },
      });
    }, componentRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={componentRef} className="bg-black text-white font-sans py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="faq-title text-4xl md:text-5xl text-center mb-16">
          Questions? Totally fair.
        </h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-medium">FAQ</h3>
        </div>

        <div className="space-y-3 faq-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-4 bg-[#1C1C1E] rounded-3xl cursor-pointer transition-colors duration-300 hover:bg-[#2C2C2E]"
                  aria-expanded={isOpen}
                >
                  <span className="text-white text-md pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gray-500">
                    <ChevronIcon isOpen={isOpen} />
                  </span>
                </button>
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight ?? 0}px`
                      : "0px",
                  }}
                >
                  <div className="px-4 pt-4 pb-2 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;