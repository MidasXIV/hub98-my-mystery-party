/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

// Beta-focused player testimonials highlighting the digital cold case experience.
const testimonials = [
  {
    stars: 5,
    title: "No printing. Just vibes + clues.",
    text: "We literally opened a case and started poking around in like 30 seconds. No PDFs. No 47-page host guide. Bless whoever decided to kill the printer drama.",
  },
  {
    stars: 5,
    title: "Feels like an actual evidence wall",
    text: "The board got messy (in a good way). Timelines, suspect stuff, little clue cards popping open—chef's kiss. My friend said, 'I feel like the over-caffeinated detective in a show.' Accurate.",
  },
  {
    stars: 4,
    title: "Beta rough edges but I'm hooked",
    text: "Some panels are a bit 'coming soon' but chasing the threads was legit fun. We argued about a receipt for 15 straight minutes. Needed snacks. Worth it.",
  },
  {
    stars: 5,
    title: "Zero prep. Maximum drama.",
    text: "Invited people over. Opened a case after dessert. Everyone instantly suspicious of literally everyone. I barely 'hosted'. 10/10 lazy GM experience.",
  },
  {
    stars: 5,
    title: "Replay totally works if you narrate",
    text: "Already solved it, came back as the 'ghost narrator' guiding new players. Watching them chase the wrong lead? Pure entertainment.",
  },
  {
    stars: 5,
    title: "Group brain mode activated",
    text: "We all huddled around my monitor like it was a forbidden artifact. Digital layout keeps the chaos contained vs paper piles. My table is thankful.",
  },
  {
    stars: 5,
    title: "It's FREE?? Okay then",
    text: "Beta being totally free feels kind of outrageous. I'm mentally ready to throw money at premium stuff when it lands ngl.",
  },
  {
    stars: 4,
    title: "Need multi-device sync asap",
    text: "Screen sharing works but I want everyone clicking around in real time like gremlins. Devs, I believe in you. Make the chaos scalable.",
  },
  {
    stars: 5,
    title: "Accidentally stayed up late",
    text: "Case said '1–2 hours'. We took 3 because we overthought everything and someone made a suspect spreadsheet. Zero regrets though.",
  },
  {
    stars: 4,
    title: "UI mostly smooth, one hiccup",
    text: "Had a clue load kinda slow once; we mocked it and moved on. Otherwise buttery. Dark mode supremacy.",
  },
];

function MagnifierIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-[#D4AF37]" : "text-gray-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.24 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ review }: { review: (typeof testimonials)[0] }) {
  return (
    <div className="bg-[#1C1C1E] rounded-3xl p-4 w-72 md:w-80">
      <StarRating rating={review.stars} />
      <h5 className="text-white text-sm font-medium mt-3 mb-2">
        {review.title}
      </h5>
      <p className="text-gray-400 text-xs leading-relaxed">{review.text}</p>
    </div>
  );
}

function Testimonials() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // This effect handles the seamless marquee animation.
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Get all the individual testimonial cards
    const boxes = gsap.utils.toArray<HTMLElement>(".testimonial-card-wrapper");
    if (boxes.length === 0) return;

    // GSAP context for proper cleanup in React
    const ctx = gsap.context(() => {
      const loop = horizontalLoop(boxes, {
        paused: false,
        repeat: -1, // Infinite loop
        speed: 0.5, // Adjust speed here (lower is faster)
      });

      // Optional: Pause on hover
      wrapper.addEventListener("mouseenter", () => loop.pause());
      wrapper.addEventListener("mouseleave", () => loop.play());
    }, wrapper);

    return () => ctx.revert();
  }, []);

  // GSAP's official seamless loop helper function for robustness
  // This is the best practice for this type of animation
  type HorizontalLoopConfig = {
    repeat?: number;
    paused?: boolean;
    speed?: number;
    snap?: number | false;
    paddingRight?: number;
    reversed?: boolean;
  };

  function horizontalLoop(items: HTMLElement[], config: HorizontalLoopConfig) {
  items = gsap.utils.toArray(items);
    config = config || {};
    const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => {
          tl.totalTime(tl.rawTime() + tl.duration() * 100);
        },
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: number[] = [],
      widths: number[] = [],
      xPercents: number[] = [],
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: any) => v
          : gsap.utils.snap(config.snap || 1);

    let totalWidth: number = 0,
      curIndex = 0,
      curX: number = 0,
      distanceToStart: number = 0,
      distanceToLoop: number = 0,
      item: HTMLElement = null as any,
      i: string | number = 0;
    gsap.set(items, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px") as string
        ));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
            Number(gsap.getProperty(el, "xPercent"))
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (parseFloat(String(config.paddingRight)) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart +
        widths[i] * (gsap.getProperty(item, "scaleX") as number);
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          totalWidth / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index: number, vars: any) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars: any) => toIndex(curIndex + 1, vars);
    tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      if (typeof tl.vars.onReverseComplete === "function") {
        tl.vars.onReverseComplete();
      }
      tl.reverse();
    }
    return tl;
  }

  return (
    <section className="bg-black text-white py-24 sm:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 mb-12">
        <div className="flex items-center gap-2.5">
          <MagnifierIcon />
          <h2 className="text-lg font-medium text-gray-400">
            Beta Player Feedback
          </h2>
        </div>
      </div>
      {/*
        FIX: The wrapper now only handles layout, not animation classes.
        The ref is used by GSAP to control the pausing.
      */}
      <div ref={wrapperRef} className="relative w-full flex">
        {/*
          FIX: Removed the outer `scrolling-content` div. We will have GSAP
          handle the positioning of two duplicated blocks for a seamless loop.
        */}
        <div className="flex gap-4">
          {testimonials.map((review, index) => (
            <div
              key={`original-${index}`}
              className="testimonial-card-wrapper flex-shrink-0"
            >
              <TestimonialCard review={review} />
            </div>
          ))}
          {testimonials.map((review, index) => (
            <div
              key={`clone-${index}`}
              className="testimonial-card-wrapper flex-shrink-0"
            >
              <TestimonialCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
