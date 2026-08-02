"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import Counter from "@/components/Counter"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { parseWeddingDate } from "@/lib/wedding-date"
import { layeredSectionTitleSize } from "@/lib/section-typography"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownUnitProps {
  value: number
  label: string
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const palette = {
  heading: "var(--color-welcome-navy)",
  accent: "var(--color-welcome-green)",
  counter: "var(--color-welcome-text)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const unitCardStyle = {
  background: "var(--color-welcome-bg-soft)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: palette.accent }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
        }}
      />
    </div>
  )
}

function CountdownTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
          "--script-overlap": layeredSectionTitleSize.overlap,
        } as CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        Counting Down
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: palette.accent,
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        Still shining in silver
      </span>
      <span className="sr-only">Still shining in silver</span>
    </h2>
  )
}

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const places = value >= 100 ? [100, 10, 1] : [10, 1]

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      {/* Card container */}
      <div className="relative w-full max-w-[88px] sm:max-w-[96px] md:max-w-[110px] lg:max-w-[120px]">
        {/* Main card */}
        <div
          className="relative overflow-hidden rounded-md border px-2.5 py-2.5 sm:rounded-lg sm:px-3.5 sm:py-3.5 md:px-4 md:py-4"
          style={unitCardStyle}
        >
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={places}
              fontSize={26}
              padding={4}
              gap={2}
              textColor={palette.counter}
              fontWeight={800}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={0}
              gradientFrom="transparent"
              gradientTo="transparent"
              counterStyle={{
                backgroundColor: "transparent",
              }}
              digitStyle={{
                minWidth: "1.15ch",
                fontFamily: "Arial, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: palette.counter,
              }}
            />
          </div>
        </div>
      </div>

      <span
        className="text-[10px] font-inter font-semibold uppercase tracking-[0.16em] sm:text-xs md:text-sm"
        style={{ color: palette.counter }}
      >
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const siteConfig = useSiteConfig()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const parsedDate = parseWeddingDate(ceremonyDate)
  const ceremonyMonth = parsedDate.month
  const ceremonyDayNumber = parsedDate.day
  const ceremonyYear = parsedDate.year
  const { brideNickname, groomNickname } = siteConfig.couple
  const ceremonyDay = siteConfig.ceremony.day || parsedDate.dayOfWeek
  const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase()
  // Parse the date: December 20, 2025 at 10:30 AM PH Time (GMT+0800)
  // Extract time from "10:30 A.M., PH Time" -> "10:30 A.M."
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim() // "10:30 A.M."
  
  // Create date string in ISO-like format for better parsing
  // December 20, 2025 -> 2025-12-20
  const monthMap: { [key: string]: string } = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12"
  }
  const monthNum =
    monthMap[ceremonyMonth.charAt(0) + ceremonyMonth.slice(1).toLowerCase()] || "12"
  const dayNum = ceremonyDayNumber
  
  // Parse time: "3:00 PM" -> 15:00
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15 // default 3 PM
  let minutes = 0
  
  if (timeMatch) {
    hour = parseInt(timeMatch[1])
    minutes = parseInt(timeMatch[2])
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }
  
  // Create date in GMT+8 (PH Time)
  // Using Date.UTC and adjusting for GMT+8 offset (subtract 8 hours to convert GMT+8 to UTC)
  const parsedTargetDate = new Date(Date.UTC(
    parseInt(ceremonyYear),
    parseInt(monthNum) - 1,
    parseInt(dayNum),
    hour - 8, // Convert GMT+8 to UTC
    minutes,
    0
  ))
  
  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2026, 1, 8, 8, 0, 0)).getTime() // Fallback: February 8, 2026, 4:00 PM GMT+8 = 8:00 AM UTC
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = targetTimestamp
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  return (
    <section
      id="countdown"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-9`}
    >
      <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative min-w-0 overflow-visible rounded-lg border px-4 pt-6 pb-10 @container/countdown sm:rounded-xl sm:px-7 sm:pt-7 sm:pb-12 md:rounded-2xl md:px-8 md:pt-8 md:pb-14"
          style={{
            background: "var(--color-welcome-bg)",
            borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
            boxShadow:
              "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
          }}
        >
          <SectionCornerDecorations size="card" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-motif-yellow), transparent)",
            }}
          />

          {/* Monogram */}
          <div className="relative mb-6 flex justify-center sm:mb-8 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative h-48 w-48 opacity-90 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
                <CloudinaryImage
                  src={siteConfig.couple.monogram}
                  alt={`${groomNickname} & ${brideNickname} Monogram`}
                  fill
                  className="object-contain"
                  style={{
                    filter:
                      "brightness(0) sepia(1) saturate(0.15) hue-rotate(10deg) opacity(0.72)",
                  }}
                  priority={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Header */}
          <div className="relative mb-6 text-center sm:mb-8 md:mb-10">
            <div className="mx-auto mb-4 sm:mb-5">
              <OutsideDivider />
            </div>
            <CountdownTitle />
            <div className="mt-3 flex items-center justify-center sm:mt-4">
              <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
            </div>
          </div>

          {/* Numeric countdown */}
          <div className="font-inter">
            <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
              <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-md sm:gap-4 md:max-w-xl md:grid-cols-4 md:gap-6">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>
          </div>

          {/* Date block */}
          <div className="relative mt-6 p-4 sm:mt-8 sm:p-6 md:p-8">
            <div className="mx-auto w-full max-w-2xl">
              <div
                className={`${cinzel.className} flex flex-col items-center gap-1.5 font-bold sm:gap-2.5 md:gap-3`}
                style={{ color: palette.heading }}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                  {ceremonyMonth}
                </span>

                <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                  <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                    <span
                      className="h-[0.5px] flex-1"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 28%, transparent))",
                      }}
                    />
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                      {ceremonyDayShort}
                    </span>
                    <span
                      className="h-[0.5px] w-6 sm:w-8 md:w-10"
                      style={{
                        background:
                          "color-mix(in srgb, var(--color-motif-deep) 28%, transparent)",
                      }}
                    />
                  </div>

                  <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                    <span
                      className={`${cinzel.className} relative text-[3rem] font-bold leading-none tracking-wider sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]`}
                      style={{ color: palette.counter }}
                    >
                      {ceremonyDayNumber}
                    </span>
                  </div>

                  <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                    <span
                      className="h-[0.5px] w-6 sm:w-8 md:w-10"
                      style={{
                        background:
                          "color-mix(in srgb, var(--color-motif-deep) 28%, transparent)",
                      }}
                    />
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                      {ceremonyTimeDisplay.split(",")[0]}
                    </span>
                    <span
                      className="h-[0.5px] flex-1"
                      style={{
                        background:
                          "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 28%, transparent))",
                      }}
                    />
                  </div>
                </div>

                <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                  {ceremonyYear}
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
