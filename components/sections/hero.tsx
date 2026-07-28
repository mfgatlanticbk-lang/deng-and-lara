"use client"

import { useEffect, useState } from "react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { sectionType } from "@/lib/section-typography"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"

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

const HERO_DATE = {
  month: "DECEMBER",
  dayOfWeek: "SUNDAY",
  dayNumber: "13",
  year: "2026",
  time: "3pm",
}

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
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!visible) {
      setPhase(0)
      return
    }

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 380),
      setTimeout(() => setPhase(3), 620),
      setTimeout(() => setPhase(4), 860),
      setTimeout(() => setPhase(5), 1080),
      setTimeout(() => setPhase(6), 1280),
      setTimeout(() => setPhase(7), 1480),
      setTimeout(() => setPhase(8), 1680),
    ]
    return () => timers.forEach(clearTimeout)
  }, [visible])

  const vis = (minPhase: number) =>
    phase >= minPhase
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-5 transition-all duration-700 ease-out"

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

          <div className={`mt-8 sm:mt-10 mb-5 sm:mb-6 ${vis(2)}`}>
            {/* <OrnamentalDivider compact /> */}
          </div>

          <div className={`${vis(2)} space-y-5 sm:space-y-6`}>
            <p
              className={`${cinzel.className} font-semibold uppercase tracking-[0.26em] sm:tracking-[0.30em]`}
              style={{
                fontSize: "clamp(0.88rem, 2.4vw, 1.05rem)",
                color: "var(--color-welcome-green)",
              }}
            >
              — ALL IS GRACE —
            </p>

            <p
              className={`${theSeasons.className} mx-auto max-w-[24rem] sm:max-w-md leading-[1.65] tracking-[0.02em]`}
              style={{
                fontSize: "clamp(1.05rem, 3vw, 1.2rem)",
                color: "var(--color-welcome-text)",
              }}
            >
              With Gods grace, unconditional love, forgiveness, faith, and unceasing prayers
              stand the test of time, and our parents are the beautiful proof.
            </p>
          </div>

          <div className={`mt-8 sm:mt-9 space-y-4 sm:space-y-4.5 ${vis(3)}`}>
            <div className="flex flex-col items-center gap-2 sm:gap-2.5">
              <p
                className={`${theSeasons.className} leading-tight tracking-[0.06em] min-[400px]:tracking-[0.08em] sm:tracking-[0.10em]`}
                style={{
                  fontSize: "clamp(1.25rem, 4vw, 1.65rem)",
                  color: "var(--color-welcome-navy)",
                }}
              >
                Emanuel Dengabriel
              </p>
              <p
                className={`${aboveTheBeyond.className} leading-none`}
                style={{
                  fontSize: "clamp(1.15rem, 3.4vw, 1.45rem)",
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
                  fontSize: "clamp(1.25rem, 4vw, 1.65rem)",
                  color: "var(--color-welcome-navy)",
                }}
              >
                Imanuel Yoshua
              </p>
            </div>

            <p
              className={`${aboveTheBeyond.className} mx-auto w-fit max-w-full px-1 leading-snug`}
              style={{
                fontSize: "clamp(0.95rem, 2.6vw, 1.15rem)",
                color: "var(--color-welcome-green)",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              invite you to celebrate 25 years of marriage
            </p>

            <p
              className={`${aboveTheBeyond.className} leading-snug`}
              style={{
                fontSize: "clamp(1.1rem, 3.2vw, 1.4rem)",
                color: "var(--color-welcome-green)",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              honoring
            </p>
          </div>

          <div className={`mt-6 sm:mt-7 ${vis(4)}`}>
            <h2
              className="mx-auto w-full max-w-[min(92vw,36rem)] text-center"
              aria-label="Deng and Lara"
            >
              <span
                className={`${theSeasons.className} block uppercase`}
                style={{
                  fontSize: "clamp(3.5rem, 11.5vw, 6.5rem)",
                  color: "var(--color-welcome-navy)",
                  lineHeight: 1.12,
                  letterSpacing: "0.06em",
                  textShadow:
                    "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 8px 28px color-mix(in srgb, var(--color-motif-deep) 6%, transparent)",
                }}
              >
                Deng
              </span>

              <span
                className={`${aboveTheBeyond.className} block`}
                style={{
                  fontSize: "clamp(1.35rem, 3.5vw, 2.1rem)",
                  color: "var(--color-welcome-green)",
                  lineHeight: 1.1,
                  marginTop: "clamp(0.45rem, 2vw, 0.95rem)",
                  marginBottom: "clamp(0.45rem, 2vw, 0.95rem)",
                  textShadow:
                    "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
                }}
              >
                and
              </span>

              <span
                className={`${theSeasons.className} block uppercase`}
                style={{
                  fontSize: "clamp(3.5rem, 11.5vw, 6.5rem)",
                  color: "var(--color-welcome-navy)",
                  lineHeight: 1.12,
                  letterSpacing: "0.06em",
                  textShadow:
                    "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 8px 28px color-mix(in srgb, var(--color-motif-deep) 6%, transparent)",
                }}
              >
                Lara
              </span>
            </h2>
          </div>

          <div className={`mt-7 sm:mt-8 ${vis(5)}`}>
            <p
              className={`${theSeasons.className} mx-auto max-w-[22rem] sm:max-w-sm leading-[1.6] tracking-[0.02em]`}
              style={{
                fontSize: "clamp(1.05rem, 3vw, 1.2rem)",
                color: "var(--color-welcome-text)",
              }}
            >
              Join us for an evening of love, laughter, and memories.
            </p>
          </div>

          <div className={`mt-7 sm:mt-8 ${vis(6)}`}>
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
                {HERO_DATE.month}
              </p>

              <div className="flex w-full items-center justify-center" style={{ lineHeight: 1 }}>
                <p
                  className={`${cinzel.className} shrink-0 font-semibold uppercase`}
                  style={{
                    ...dateLabelStyle,
                    paddingRight: "clamp(0.6rem, 2vw, 1rem)",
                  }}
                >
                  {HERO_DATE.dayOfWeek}
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
                  {HERO_DATE.dayNumber}
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
                  At {HERO_DATE.time}
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
                {HERO_DATE.year}
              </p>
            </div>
          </div>

          <div className={`mt-7 sm:mt-8 flex flex-col items-center gap-5 ${vis(7)}`}>
            <p
              className={`${cinzel.className} font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-relaxed`}
              style={{
                color: "var(--color-welcome-text)",
                fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)",
              }}
            >
              Venue details to follow
            </p>

            <OrnamentalDivider compact />

            <p
              className={`${cinzel.className} font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em]`}
              style={{
                color: "rgba(28, 28, 30, 0.52)",
                fontSize: "clamp(0.68rem, 1.65vw, 0.8rem)",
              }}
            >
              RSVP by September 12, 2026
            </p>
          </div>

          <div className={`mt-8 flex justify-center ${vis(8)}`}>
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
