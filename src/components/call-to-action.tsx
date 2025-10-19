import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TILE_COUNT = 60;

type Tile = {
  id: number;
  width: number;
  height: number;
  imgUrl: string;
  initial: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
};

function CallToAction() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Tile generation logic (no changes needed)
  useLayoutEffect(() => {
    const newTiles: Tile[] = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    for (let i = 0; i < TILE_COUNT; i++) {
      const width = 100 + Math.random() * 150;
      const height = 100 + Math.random() * 150;
      newTiles.push({
        id: i,
        width,
        height,
        // imgUrl: `https://picsum.photos/seed/${i + 20}/${Math.round(
        //   width
        // )}/${Math.round(height)}`,
        imgUrl: "/hero/evidence" + ((i % 17) + 1) + ".png",
        initial: {
          x: (Math.random() - 0.5) * vw * 2.5,
          y: (Math.random() - 0.5) * vh * 2.5,
          scale: 1 + Math.random() * 0.8,
          rotation: (Math.random() - 0.5) * 0,
        },
      });
    }
    setTiles(newTiles);
  }, []);

  useGSAP(
    () => {
      if (tiles.length === 0) return;

      // --- Hero Animation ---
      tiles.forEach((tile) => {
        gsap.set(`#tile-${tile.id}`, {
          x: tile.initial.x,
          y: tile.initial.y,
          scale: tile.initial.scale,
          rotation: tile.initial.rotation,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 4, // SLOWED DOWN THE ANIMATION EVEN MORE
        },
      });

      tl.to(
        [".header", ".explore-button"],
        { opacity: 0, y: -50, ease: "power2.in" },
        0
      );
      tiles.forEach((tile) => {
        tl.to(
          `#tile-${tile.id}`,
          {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            scale: 0.6,
            rotation: 0,
            ease: "power2.inOut",
          },
          0
        );
      });

      // --- SWIRLING ORB ANIMATION ---
      const swirlTl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      tiles.forEach((tile) => {
        swirlTl.to(
          `#tile-${tile.id}`,
          {
            x: `+=${(Math.random() - 0.5) * 40}`,
            y: `+=${(Math.random() - 0.5) * 40}`,
            rotation: `+=${(Math.random() - 0.5) * 30}`,
            duration: 5 + Math.random() * 5,
            ease: "power1.inOut",
          },
          0
        );
      });

      // --- Start the swirl when the scroll animation is complete ---
      tl.eventCallback("onComplete", () => {
        swirlTl.play();
      });

      // --- REVEAL FINAL CONTENT AT THE END ---
      tl.to(
        ".reveal-content",
        {
          opacity: 1,
          y: "-45%", // Move the content up to the middle of the screen
          ease: "power2.out",
        },
        ">-=0.5" // Start this animation slightly before the end of the scroll
      );
    },
    { scope: canvasRef, dependencies: [tiles] }
  );

  return (
    <div
      ref={canvasRef}
      className="vw-[90%] h-screen relative overflow-hidden flex justify-center items-center"
      // style={{
      //   outline: "4px solid orange",
      //   background: "rgba(0,0,0,1)",
      // }}
    >
      {/* <h1 className="header absolute top-[5vh] left-[5vw] text-base md:text-lg text-white font-medium tracking-wider z-10">
        A brand design studio
      </h1> */}

      {tiles.map((tile) => (
        <div
          key={tile.id}
          id={`tile-${tile.id}`}
          className="absolute origin-center bg-cover bg-center rounded-lg shadow-2xl shadow-black/40"
          style={{
            width: `${tile.width}px`,
            height: `${tile.height}px`,
            backgroundImage: `url(${tile.imgUrl})`,
            willChange: "transform, opacity",
            // border: "2px solid red", // Debug border
          }}
        />
      ))}

      {/* --- NEW CONTENT TO REVEAL --- */}
      <div className="reveal-content absolute inset-0 z-20 text-black opacity-0 p-16 flex justify-between items-end" style={{ pointerEvents: "none" }}>
        <div className="w-1/4">
          <h2 className="text-3xl font-bold">You&apos;ve reviewed all the evidence.</h2>
          <p className="mt-4 text-gray-400 text-sm">
            What&apos;s your next move?
          </p>
        </div>
        <div className="w-1/4 text-right">
          <h3 className="text-3xl font-semibold">Browse</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Murder mystery</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;