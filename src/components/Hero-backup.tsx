"use client";
import React from "react";
import {
  BentoCell,
  BentoGrid,
  ContainerScale,
  ContainerScroll,
  ContainerPin,
} from "./hero-gallery-scroll-animation";
import Image from "next/image";

const IMAGES = [
  "/hero/evidence1.png",
  "/hero/evidence2.png",
  "/hero/evidence3.png",
  "/hero/evidence4.png",
  "/hero/evidence5.png",
  "/hero/evidence6.png",
  "/hero/evidence7.png",
  "/hero/evidence8.png",
  "/hero/evidence9.png",
  "/hero/evidence10.png",
  "/hero/evidence11.png",
  "/hero/evidence12.png",
  "/hero/evidence13.png",
  "/hero/evidence14.png",
  "/hero/evidence15.png",
];

export default function Hero() {
  return (
    <ContainerScroll className="relative z-30 h-[250vh]">
      <ContainerPin className="z-20">
        <BentoGrid
          variant="fourCells"
          className="h-screen w-[min(1200px,90vw)] p-4"
        >
          {IMAGES.map((imageUrl: string, index: number) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-xl shadow-xl"
            >
              <Image
                className="size-full object-cover object-center"
                src={imageUrl}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </BentoCell>
          ))}
        </BentoGrid>
      </ContainerPin>

      <ContainerScale className="relative z-30 text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 ">
          Your Animated Hero
        </h1>
        <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
          Yet another hero section, this time with scroll trigger animations,
          animating the hero content with motion.
        </p>
        {/* <div className="flex items-center justify-center gap-4">
          <Button className="bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
            Get Started
          </Button>
          <Button
            variant="link"
            className="bg-transparent px-4 py-2 font-medium"
          >
            Learn more
          </Button>
        </div> */}
      </ContainerScale>
    </ContainerScroll>
  );
}
