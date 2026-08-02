"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { sectionType } from "@/lib/section-typography"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const palette = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const messageCardStyle = {
  background: "var(--color-welcome-bg)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const skeletonBg = "color-mix(in srgb, var(--color-motif-deep) 12%, var(--color-welcome-bg))"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

function MessageCardShell({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <article
      className={`relative min-w-0 overflow-visible rounded-lg border px-4 py-4 sm:rounded-xl sm:px-5 sm:py-5 md:rounded-2xl md:px-6 md:py-6 ${className}`}
      style={{ ...messageCardStyle, ...style }}
    >
      <SectionCornerDecorations size="card" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px sm:inset-x-5"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-motif-yellow), transparent)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </article>
  )
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    }
    setVisibleMessages([])
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <MessageCardShell key={i}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton
                  className="h-8 w-8 rounded-full sm:h-9 sm:w-9"
                  style={{ backgroundColor: skeletonBg }}
                />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24 sm:w-32" style={{ backgroundColor: skeletonBg }} />
                  <Skeleton className="h-2.5 w-20" style={{ backgroundColor: skeletonBg }} />
                </div>
              </div>
            </div>
            <Skeleton
              className="h-14 w-full rounded-lg sm:h-16"
              style={{ backgroundColor: skeletonBg }}
            />
          </MessageCardShell>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <MessageCardShell className="text-center px-5 py-8 sm:py-10 md:py-12">
        <h3
          className={`${cinzel.className} mb-2 font-semibold sm:mb-3 ${sectionType.subheader}`}
          style={{ color: palette.heading }}
        >
          No messages yet
        </h3>
        <p
          className={`font-goudy-italic mx-auto mb-5 max-w-md sm:mb-6 ${sectionType.textRelaxed}`}
          style={{ color: palette.body }}
        >
          Be the first to leave a note for the happy couple.
        </p>
        <span
          className={`font-goudy-italic inline-block ${sectionType.label} rounded-md border px-4 py-2`}
          style={{
            color: palette.heading,
            background: "var(--color-welcome-bg-soft)",
            borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
          }}
        >
          Your message will appear here
        </span>
      </MessageCardShell>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <motion.div
          key={`${msg.timestamp}-${msg.name}-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={
            isAnimating
              ? { opacity: 0, y: 16 }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: 0.55,
            delay: index * 0.08,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <MessageCardShell className="group transition-shadow duration-300 hover:shadow-xl">
            <div className="mb-2 flex items-start justify-between sm:mb-3">
              <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10"
                  style={{
                    backgroundColor: palette.accent,
                    boxShadow:
                      "0 4px 12px color-mix(in srgb, var(--color-motif-deep) 18%, transparent)",
                  }}
                >
                  <span
                    className={`${cinzel.className} ${sectionType.label} font-semibold`}
                    style={{ color: "var(--color-welcome-bg)" }}
                  >
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`${cinzel.className} ${sectionType.text} truncate font-semibold`}
                    style={{ color: palette.heading }}
                  >
                    {msg.name}
                  </h4>
                  <span className={sectionType.label} style={{ color: palette.label }}>
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative py-1 pl-5 pr-1 sm:py-2 sm:pl-6">
              <span
                className="font-goudy-italic absolute left-0 top-0 select-none text-2xl leading-none sm:text-3xl"
                style={{ color: palette.accent, opacity: 0.45 }}
              >
                &ldquo;
              </span>
              <p
                className={`font-goudy-italic relative z-10 italic ${sectionType.textRelaxed}`}
                style={{ color: palette.body }}
              >
                {msg.message}
              </p>
            </div>
          </MessageCardShell>
        </motion.div>
      ))}
    </div>
  )
}
