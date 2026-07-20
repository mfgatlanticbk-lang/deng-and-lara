"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType } from "@/lib/section-typography"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { parseWeddingDate } from "@/lib/wedding-date"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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

function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

interface HeroProps {
  visible?: boolean
}

export function Hero({ visible = true }: HeroProps) {
  const siteConfig = useSiteConfig()
  const [phase, setPhase] = useState(0)

  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom

  useEffect(() => {
    if (!visible) {
      setPhase(0)
      return
    }

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 380),
      setTimeout(() => setPhase(3), 640),
      setTimeout(() => setPhase(4), 860),
      setTimeout(() => setPhase(5), 1060),
    ]
    return () => timers.forEach(clearTimeout)
  }, [visible])

  const vis = (minPhase: number) =>
    phase >= minPhase
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-5 transition-all duration-700 ease-out"

  const parsedDate = useMemo(
    () => parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date),
    [siteConfig.ceremony.date, siteConfig.wedding.date],
  )
  const ceremonyMonth = parsedDate.month
  const ceremonyDayNumber = parsedDate.day
  const ceremonyYear = parsedDate.year
  const ceremonyDay = (siteConfig.ceremony.day ?? parsedDate.dayOfWeek).toUpperCase()
  const ceremonyTime = siteConfig.ceremony.time ?? siteConfig.wedding.time

  const dateLabelStyle = {
    fontFamily: "var(--font-cinzel), Cinzel, serif",
    fontSize: "clamp(0.56rem, 1.35vw, 0.68rem)",
    letterSpacing: "0.20em",
    textTransform: "uppercase" as const,
    color: "rgba(28, 28, 30, 0.48)",
  }

  const verticalRuleStyle = {
    width: "1px",
    height: "clamp(2.4rem, 6.5vw, 3.5rem)",
    background:
      "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-motif-deep) 22%, transparent), transparent)",
    flexShrink: 0,
  }

  return (
    <section
      id="home"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen flex items-start justify-center overflow-hidden`}
    >
      <div className="relative z-10 w-full flex items-start justify-center px-4 sm:px-6 pt-5 pb-14 sm:pt-7 sm:pb-16">
        <div
          className={`relative min-w-0 w-full max-w-md sm:max-w-lg overflow-visible text-center transition-all duration-700 ease-out ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background: "var(--color-welcome-bg)",
            border: "1px solid color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
            borderRadius: "20px",
            padding:
              "clamp(1.5rem, 4vw, 2.25rem) clamp(1.75rem, 6vw, 3.5rem) clamp(2rem, 5vw, 3rem)",
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

          <div
            className={`flex justify-center mt-8 sm:mt-10 mb-8 sm:mb-10 ${
              phase >= 1
                ? "opacity-100 scale-100 transition-all duration-700 ease-out"
                : "opacity-0 scale-95 transition-all duration-700 ease-out"
            }`}
          >
            <Image
              src={siteConfig.couple.monogram}
              alt={`${brideName} & ${groomName} monogram`}
              width={160}
              height={160}
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain object-center"
              style={{
                filter:
                  "brightness(0) sepia(1) saturate(0.15) hue-rotate(10deg) opacity(0.72)",
              }}
              priority
            />
          </div>

          <div className={`mt-4 mb-4 sm:mt-5 sm:mb-5 ${vis(2)}`}>
            <OrnamentalDivider compact />
          </div>

          <div className={`${vis(2)} space-y-0.5`}>
            <p
              className={`${theSeasons.className} uppercase tracking-[0.10em] min-[400px]:tracking-[0.12em] sm:tracking-[0.14em]`}
              style={{
                fontSize: "clamp(1.35rem, 4.5vw, 1.85rem)",
                color: "var(--color-welcome-navy)",
                lineHeight: 1.1,
              }}
            >
              {siteConfig.hero.eventTitle}
            </p>
            <p
              className={`${aboveTheBeyond.className} mx-auto w-fit max-w-full px-1 leading-[0.9]`}
              style={{
                marginTop: "clamp(-0.35rem, -1vw, -0.15rem)",
                fontSize: "clamp(0.95rem, 2.8vw, 1.25rem)",
                color: "var(--color-welcome-green)",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              {siteConfig.hero.eventSubtitle}
            </p>
          </div>

          <div
            role="img"
            aria-label={`${brideName} and ${groomName}`}
            className={`mt-6 sm:mt-7 w-full max-w-[min(90vw,18rem)] sm:max-w-xs mx-auto aspect-[528/473] ${vis(3)}`}
            style={{
              transitionDelay: "40ms",
              backgroundColor: "var(--color-welcome-navy)",
              WebkitMaskImage: "url(/Details/couplenames.png)",
              maskImage: "url(/Details/couplenames.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter:
                "drop-shadow(0 2px 12px color-mix(in srgb, var(--color-motif-deep) 12%, transparent))",
            }}
          />

          <div className={`mt-6 sm:mt-7 space-y-3 sm:space-y-3.5 ${vis(3)}`} style={{ transitionDelay: "80ms" }}>
            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
              <p
                className={`${aboveTheBeyond.className} text-[1rem] leading-snug min-[400px]:text-[1.1rem] sm:text-[1.15rem]`}
                style={{
                  color: "var(--color-welcome-green)",
                  textShadow:
                    "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
                }}
              >
                {siteConfig.hero.togetherWith}
              </p>
              <p
                className={`${theSeasons.className} leading-tight tracking-[0.06em] min-[400px]:tracking-[0.08em] sm:tracking-[0.10em]`}
                style={{
                  fontSize: "clamp(1.05rem, 3.2vw, 1.35rem)",
                  color: "var(--color-welcome-navy)",
                }}
              >
                {siteConfig.hero.hosts.first}
              </p>
              <p
                className={`${aboveTheBeyond.className} leading-none text-[0.95rem] min-[400px]:text-[1.05rem] sm:text-[1.15rem]`}
                style={{
                  color: "var(--color-welcome-green)",
                  textShadow:
                    "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
                }}
              >
                and
              </p>
              <p
                className={`${theSeasons.className} leading-tight tracking-[0.06em] min-[400px]:tracking-[0.08em] sm:tracking-[0.10em]`}
                style={{
                  fontSize: "clamp(1.05rem, 3.2vw, 1.35rem)",
                  color: "var(--color-welcome-navy)",
                }}
              >
                {siteConfig.hero.hosts.second}
              </p>
            </div>

            {/* <p
              className={`${cinzel.className} mx-auto max-w-[18rem] font-medium uppercase leading-relaxed tracking-[0.18em] min-[400px]:tracking-[0.22em] sm:max-w-xs sm:tracking-[0.26em]`}
              style={{
                fontSize: "clamp(0.58rem, 1.45vw, 0.72rem)",
                color: "rgba(28, 28, 30, 0.52)",
              }}
            >
              {siteConfig.hero.inviteLine}
            </p> */}
          </div>

          <div className={`mt-6 sm:mt-7 ${vis(4)}`}>
            <div className="mx-auto flex w-full max-w-[20rem] flex-col items-center gap-3 sm:max-w-sm sm:gap-3.5">
              <div
                className="h-px w-full max-w-[10rem]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 28%, transparent), transparent)",
                }}
              />

              <p
                className={`${cinzel.className} font-semibold uppercase tracking-[0.30em] sm:tracking-[0.34em]`}
                style={{
                  ...dateLabelStyle,
                  color: "rgba(28, 28, 30, 0.55)",
                  fontSize: "clamp(0.64rem, 1.55vw, 0.78rem)",
                  letterSpacing: "0.30em",
                }}
              >
                {ceremonyMonth}
              </p>

              <div className="flex w-full items-center justify-center" style={{ lineHeight: 1 }}>
                <p
                  className={`${cinzel.className} shrink-0 font-semibold uppercase`}
                  style={{
                    ...dateLabelStyle,
                    paddingRight: "clamp(0.6rem, 2vw, 1rem)",
                  }}
                >
                  {ceremonyDay}
                </p>

                <div style={verticalRuleStyle} aria-hidden />

                <p
                  className={`${theSeasons.className} shrink-0 tabular-nums`}
                  style={{
                    fontSize: "clamp(2.65rem, 8.5vw, 3.75rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--color-welcome-navy)",
                    padding: "0 clamp(0.6rem, 2vw, 1rem)",
                    lineHeight: 1,
                  }}
                >
                  {ceremonyDayNumber}
                </p>

                <div style={verticalRuleStyle} aria-hidden />

                <p
                  className={`${cinzel.className} shrink-0 font-semibold uppercase`}
                  style={{
                    ...dateLabelStyle,
                    letterSpacing: "0.14em",
                    paddingLeft: "clamp(0.6rem, 2vw, 1rem)",
                  }}
                >
                  At {ceremonyTime}
                </p>
              </div>

              <p
                className={`${cinzel.className} font-semibold uppercase tabular-nums tracking-[0.30em] sm:tracking-[0.34em]`}
                style={{
                  ...dateLabelStyle,
                  color: "rgba(28, 28, 30, 0.42)",
                  fontSize: "clamp(0.64rem, 1.55vw, 0.78rem)",
                  letterSpacing: "0.30em",
                }}
              >
                {ceremonyYear}
              </p>
            </div>
          </div>

          <div className={`mt-8 flex flex-col items-center gap-6 ${vis(5)}`}>
            <div className="space-y-2">
              <p
                className={`${cinzel.className} ${sectionType.label} font-semibold uppercase tracking-[0.40em] sm:tracking-[0.44em]`}
                style={{ color: "var(--color-welcome-green)" }}
              >
                Ceremony
              </p>
              <p
                className={`${cinzel.className} ${sectionType.label} font-semibold uppercase tracking-[0.16em] sm:tracking-[0.20em] leading-relaxed`}
                style={{ color: "var(--color-welcome-text)" }}
              >
                {siteConfig.ceremony.location}
              </p>
            </div>

            <OrnamentalDivider compact />
          </div>

          <div className={`mt-10 flex justify-center ${vis(5)}`}>
            <a
              href="#guest-list"
              className={`${cinzel.className} ${sectionType.label} group relative inline-flex items-center justify-center rounded-sm border px-12 py-3.5 font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              style={{
                backgroundColor: "var(--color-welcome-green)",
                borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                color: "var(--color-welcome-bg)",
                boxShadow:
                  "0 10px 24px color-mix(in srgb, var(--color-motif-deep) 25%, transparent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
                e.currentTarget.style.borderColor = "var(--color-welcome-green)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
              }}
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
