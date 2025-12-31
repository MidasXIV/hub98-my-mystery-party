"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

type BlogCard = {
  slug: string
  title: string
  description: string
  shortDescription: string
  image: string
}

interface Card {
  id: number
  data: BlogCard
}

// Cards loaded dynamically from /api/blog/cards

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
  { scale: 0.85, y: -72 },
  { scale: 0.8, y: -100 },
]

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({ data }: { data: BlogCard }) {

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="relative -outline-offset-1 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl outline outline-black/10 dark:outline-white/10">
        <Image
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 512px"
          className="object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium text-foreground">{data.title}</span>
          <span className="text-muted-foreground line-clamp-2">{data.shortDescription || data.description}</span>
        </div>
        <Link href={`/blog/${data.slug}`} className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full bg-foreground pl-4 pr-3 text-sm font-medium text-background">
          Read
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card
  index: number
  isAnimating: boolean
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-t-xl border-x border-t border-border bg-card p-1 shadow-lg will-change-transform sm:w-[512px]"
    >
      <CardContent data={card.data} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState<Card[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(6)
  const [pool, setPool] = useState<BlogCard[]>([])
  const [nextPoolIndex, setNextPoolIndex] = useState(5)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/blog/cards")
        const data: BlogCard[] = await res.json()
        if (cancelled) return
        setPool(data)
        const initial = data.slice(0, 5).map((d, i) => ({ id: i + 1, data: d }))
        setCards(initial)
        setNextId(initial.length + 1)
        setNextPoolIndex(initial.length)
      } catch (e) {
        console.error("Failed to load blog cards", e)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleAnimate = () => {
    setIsAnimating(true)
    if (pool.length === 0 || cards.length === 0) {
      setIsAnimating(false)
      return
    }
    const next = pool[nextPoolIndex % pool.length]
    setCards([...cards.slice(1), { id: nextId, data: next }])
    setNextId((prev) => prev + 1)
    setNextPoolIndex((prev) => (prev + 1) % pool.length)
    setIsAnimating(false)
  }

  const handleNext = () => handleAnimate()

  const handlePrev = () => {
    setIsAnimating(true)
    if (pool.length === 0 || cards.length === 0) {
      setIsAnimating(false)
      return
    }
    const prevIndex = (nextPoolIndex - 6 + pool.length) % pool.length
    const prevItem = pool[prevIndex]
    setCards([{ id: nextId, data: prevItem }, ...cards.slice(0, Math.max(0, cards.length - 1))])
    setNextId((prev) => prev + 1)
    setNextPoolIndex((prev) => (prev - 1 + pool.length) % pool.length)
    setIsAnimating(false)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="relative h-[380px] w-full overflow-hidden sm:w-[644px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 5).map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} isAnimating={isAnimating} />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center gap-3 border-t border-border py-4">
        <button
          onClick={handlePrev}
          disabled={pool.length === 0 || cards.length === 0}
          className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-background px-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={pool.length === 0 || cards.length === 0}
          className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-background px-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Next
        </button>
        <Link
          href="/blog"
          className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-foreground px-3 font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Read all
        </Link>
      </div>
    </div>
  )
}
