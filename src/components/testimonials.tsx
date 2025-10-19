import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    stars: 5,
    title: "One of the most helpful tools",
    text: "This app is one of the most helpful tools I have ever come across. The sheer volume of groups and helpful connections are amazing. There's so many to choose from and I have not found one that I did not find helpful and adequate at delivering a good message.",
  },
  {
    stars: 5,
    title: "Benefit to mind and body",
    text: "If you are pursuing a sober life do not go at it alone. Download the app, select and event and get connected to great people.",
  },
  {
    stars: 4,
    title: "Long overdue",
    text: "This app is long overdue. I wish I would have had something like this years ago. It might have saved me a lot of heartache and trouble. I always struggled with having something to do that didn't revolve around drinking, or meeting people that were in the same boat.",
  },
  {
    stars: 5,
    title: "Amazing for all walks of recovery",
    text: "I have 5 years in recovery and work in the field and this app is perfect all stages of recovery and all walks of recovery. Super excited to spread the word about this app. Good job your team did phenomenal.",
  },
  {
    stars: 5,
    title: "How apps should be",
    text: "I love that NewForm it's easy to navigate and has so many cool communities.",
  },
];

function AppleIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-400"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.228 9.752a2.472 2.472 0 0 1-1.203-2.083 2.53 2.53 0 0 1 .535-1.637c.562-.642.983-1.42 1.132-2.296a2.46 2.46 0 0 0-2.228-2.695c-.88-.124-1.768.1-2.583.504a4.93 4.93 0 0 0-2.028 1.558 4.92 4.92 0 0 0-1.542 2.379c-.43.995-.492 2.043-.194 3.056.492 1.69 1.637 2.972 2.93 3.738-.995.535-2.043 1.02-3.11 1.403a5.54 5.54 0 0 0-2.613.829c-1.28.845-2.18 2.228-2.42 3.77a.49.49 0 0 0 .492.57c.309-.016.632-.047.969-.093a4.91 4.91 0 0 1 4.41-2.812 4.92 4.92 0 0 1 3.282 1.48C14.24 20.298 15.652 22 17.58 22a2.44 2.44 0 0 0 2.42-2.436c0-1.42-.83-2.643-2.06-3.266a4.87 4.87 0 0 0-2.706-.324Z" />
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
  function horizontalLoop(items: HTMLElement[], config: any) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
          onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100);
          },
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: any = [],
      widths: any = [],
      xPercents: any = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: any) => v
          : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px") as string
        ));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
            gsap.getProperty(el, "xPercent")
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
      (parseFloat(config.paddingRight) || 0);
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
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
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
      //@ts-ignore
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  return (
    <section className="bg-black text-white py-24 sm:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 mb-12">
        <div className="flex items-center gap-2.5">
          <AppleIcon />
          <h2 className="text-lg font-medium text-gray-400">
            App Store Reviews
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
