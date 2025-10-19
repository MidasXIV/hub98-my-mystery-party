"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva(
  "relative grid gap-4", // Removed default origin transformations here
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr] md:grid-rows-4
          
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3 md:[&>*:first-child]:row-span-2
          [&>*:nth-child(2)]:col-span-4 md:[&>*:nth-child(2)]:col-span-2
          [&>*:nth-child(2)]:row-span-2 md:[&>*:nth-child(2)]:row-span-3
          [&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-4 md:[&>*:nth-child(3)]:col-span-2
          [&>*:nth-child(3)]:row-span-2 md:[&>*:nth-child(3)]:row-span-2
          [&>*:nth-child(3)]:block
          
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(4)]:row-start-3 md:[&>*:nth-child(4)]:row-start-3
          [&>*:nth-child(4)]:col-start-1 md:[&>*:nth-child(4)]:col-start-1

          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
          [&>*:nth-child(5)]:row-start-4 md:[&>*:nth-child(5)]:row-start-3
          [&>*:nth-child(5)]:col-start-1 md:[&>*:nth-child(5)]:col-start-4
          
          [&>*:nth-child(6)]:col-span-4 md:[&>*:nth-child(6)]:col-span-2
          [&>*:nth-child(6)]:row-span-2 md:[&>*:nth-child(6)]:row-span-3
          [&>*:nth-child(6)]:col-start-5 md:[&>*:nth-child(6)]:col-start-7

          [&>*:nth-child(7)]:col-span-4 md:[&>*:nth-child(7)]:col-span-2
          [&>*:nth-child(7)]:row-span-2 md:[&>*:nth-child(7)]:row-span-2
          [&>*:nth-child(7)]:col-start-1 md:[&>*:nth-child(7)]:col-start-7
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
      `,
        fourCells: `
        grid-cols-3 grid-rows-2
        [&>*:first-child]:col-span-1
        [&>*:nth-child(2)]:col-span-2
        [&>*:nth-child(3)]:col-span-2
      `,
        tenCells: `
          grid-cols-6 grid-rows-4 gap-3
          [&>*:nth-child(1)]:col-span-3 [&>*:nth-child(1)]:row-span-2
          [&>*:nth-child(2)]:col-span-3 [&>*:nth-child(2)]:row-span-1
          [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:row-span-2
          [&>*:nth-child(4)]:col-span-2 [&>*:nth-child(4)]:row-span-1
          [&>*:nth-child(5)]:col-span-2 [&>*:nth-child(5)]:row-span-1
          [&>*:nth-child(6)]:col-span-2 [&>*:nth-child(6)]:row-span-2
          [&>*:nth-child(7)]:col-span-2 [&>*:nth-child(7)]:row-span-1
          [&>*:nth-child(8)]:col-span-2 [&>*:nth-child(8)]:row-span-1
          [&>*:nth-child(9)]:col-span-2 [&>*:nth-child(9)]:row-span-2
          [&>*:nth-child(10)]:col-span-4 [&>*:nth-child(10)]:row-span-1
        `,
        // **RE-UPDATED** variant for 15 cells: 4 rows, more visible/even initial scatter, more vertical
        fifteenCells: `
          grid-cols-6 grid-rows-4 gap-3

          /* One large 2x2 top-left */
          [&>*:nth-child(1)]:col-span-2 [&>*:nth-child(1)]:row-span-2 [&>*:nth-child(1)]:col-start-1 [&>*:nth-child(1)]:row-start-1

          /* Four 2x1 stripes down the middle column area (no overlaps) */
          [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(2)]:row-span-1 [&>*:nth-child(2)]:col-start-3 [&>*:nth-child(2)]:row-start-1
          [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:row-span-1 [&>*:nth-child(3)]:col-start-3 [&>*:nth-child(3)]:row-start-2
          [&>*:nth-child(4)]:col-span-2 [&>*:nth-child(4)]:row-span-1 [&>*:nth-child(4)]:col-start-3 [&>*:nth-child(4)]:row-start-3
          [&>*:nth-child(5)]:col-span-2 [&>*:nth-child(5)]:row-span-1 [&>*:nth-child(5)]:col-start-3 [&>*:nth-child(5)]:row-start-4

          /* Ten 1x1 cells distributed without overlaps */
          [&>*:nth-child(6)]:col-start-5 [&>*:nth-child(6)]:row-start-1
          [&>*:nth-child(7)]:col-start-6 [&>*:nth-child(7)]:row-start-1
          [&>*:nth-child(8)]:col-start-5 [&>*:nth-child(8)]:row-start-2
          [&>*:nth-child(9)]:col-start-6 [&>*:nth-child(9)]:row-start-2
          [&>*:nth-child(10)]:col-start-1 [&>*:nth-child(10)]:row-start-3
          [&>*:nth-child(11)]:col-start-2 [&>*:nth-child(11)]:row-start-3
          [&>*:nth-child(12)]:col-start-5 [&>*:nth-child(12)]:row-start-3
          [&>*:nth-child(13)]:col-start-6 [&>*:nth-child(13)]:row-start-3
          [&>*:nth-child(14)]:col-start-1 [&>*:nth-child(14)]:row-start-4
          [&>*:nth-child(15)]:col-start-2 [&>*:nth-child(15)]:row-start-4
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}
const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full overflow-visible isolate", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  )
})
BentoGrid.displayName = "BentoGrid"

const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    // Reduced initial translate magnitude for a less extreme scatter,
    // ensuring more elements are visible initially.
    const translate = useTransform(scrollYProgress, [0.1, 0.9], ["-25%", "0%"]) // Adjusted
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1])

    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        style={{ translate, scale, ...style }}
        {...props}
      ></motion.div>
    )
  }
)
BentoCell.displayName = "BentoCell"

// Inside your components file

const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    // Keep the headline fixed until near the end of the hero scroll
    // so the page doesn't start moving before the gallery animation completes.
    const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0])

    // Release from fixed only when the scroll is ~complete to avoid early scroll.
    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.95 ? "absolute" : "fixed"
    )
    return (
      <motion.div
        ref={ref}
        className={cn(
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-fit z-10", // Added z-10 here
          "flex flex-col items-center justify-center pointer-events-none", // Added flex for centering, pointer-events-none so it doesn't block clicks
          className
        )}
        style={{
          // translate: "-50% -50%", // Combined into tailwind -translate-x/y-1/2 for initial
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    )
  }
)
ContainerScale.displayName = "ContainerScale"
// Additional container that pins its children centered during the scroll
const ContainerPin = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.95 ? "absolute" : "fixed"
    )
    return (
      <motion.div
        ref={ref}
        className={cn(
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-fit",
          className
        )}
        style={{ position, ...style }}
        {...props}
      />
    )
  }
)
ContainerPin.displayName = "ContainerPin"

// ContainerScale component is already updated above for z-index and flex properties.
export { ContainerScroll, BentoGrid, BentoCell, ContainerScale, ContainerPin }