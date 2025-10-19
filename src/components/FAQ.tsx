import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// It's a good practice to register the GSAP plugin you are using.
// gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "So, how does this actually work?",
        answer: "Super simple! You pick a mystery you love, purchase it, and you'll get an email with a link to instantly download all the materials as a PDF. Just print them out, invite your friends, and you're ready to host a killer party."
    },
    {
        question: "What do I get with my download?",
        answer: "You get everything you need to play. The download includes a complete host guide with instructions, character booklets for all the suspects, clues to be revealed during the game, and themed invitations to send to your guests."
    },
    {
        question: "Do I need to be a professional actor to play?",
        answer: "Not at all! The games are designed for everyone to have fun. Each character booklet has all the information, secrets, and lines your guests will need. The main goal is to laugh and have a great time sleuthing together."
    },
    {
        question: "Is it difficult to host a party?",
        answer: "We've made it as easy as possible. The Host Guide walks you through everything, step-by-step, from setting up to solving the crime. You're not a performer; you're just the guide who keeps the story moving. If you can read instructions, you can host!"
    },
    {
        question: "What if I have more or fewer guests than the game says?",
        answer: "Each game is designed for a specific number of suspects, as these are the core characters needed for the story to work. Some games have optional characters you can add to include more people, which will be clearly noted in the game's description."
    },
    {
        question: "Can I play the same mystery more than once?",
        answer: "Since the murderer is the same every time, you can only be a *player* once. However, you can absolutely host the same mystery again and again for different groups of friends!"
    },
    {
        question: "What do I need to provide myself?",
        answer: "Besides a fun group of people, you'll just need a printer, some paper (we recommend around 20-30 sheets, but it varies by game), and a pair of scissors to cut out the clues. That's it!"
    },
    {
        question: "How long does a typical game last?",
        answer: "Most games are designed to be played over 2-3 hours. This gives everyone enough time to get into character, mingle, review clues, and make their accusations without feeling rushed."
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
    <section ref={componentRef} className="bg-black text-white font-sans py-20 sm:py-24">
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