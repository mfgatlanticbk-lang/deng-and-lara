"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Music2 } from "lucide-react"
import { sectionType, welcomeTitleSize } from "@/lib/section-typography"

interface SpotifyPlaybackUpdate {
  playingURI: string
  isPaused: boolean
  isBuffering: boolean
  duration: number
  position: number
}

interface SpotifyEmbedController {
  addListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  removeListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  destroy: () => void
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIframeApi) => void
  }
}

let cachedSpotifyIframeApi: SpotifyIframeApi | null = null
const spotifyApiReadyQueue: Array<(api: SpotifyIframeApi) => void> = []

function getSpotifyUri(spotifyUrl: string): string {
  const match = spotifyUrl.match(
    /open\.spotify\.com\/(playlist|album|track|episode)\/([^/?]+)/
  )
  if (!match) return spotifyUrl
  return `spotify:${match[1]}:${match[2]}`
}

function loadSpotifyIframeApi(onReady: (api: SpotifyIframeApi) => void) {
  if (cachedSpotifyIframeApi) {
    onReady(cachedSpotifyIframeApi)
    return
  }

  spotifyApiReadyQueue.push(onReady)

  if (spotifyApiReadyQueue.length > 1) return

  const previousReady = window.onSpotifyIframeApiReady
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    cachedSpotifyIframeApi = IFrameAPI
    previousReady?.(IFrameAPI)
    spotifyApiReadyQueue.splice(0).forEach((callback) => callback(IFrameAPI))
  }

  const existingScript = document.querySelector(
    'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
  )
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://open.spotify.com/embed/iframe-api/v1"
    script.async = true
    document.body.appendChild(script)
  }
}

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

const palette = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const glassPanelStyle = {
  background: "rgba(255, 255, 255, 0.52)",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: "rgba(255, 255, 255, 0.72)",
  boxShadow:
    "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.92)",
} as const

const innerSurfaceStyle = {
  background: "rgba(255, 255, 255, 0.36)",
  borderColor: "rgba(255, 255, 255, 0.58)",
} as const

function GlassSurfaceLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/65 via-white/28 to-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/55"
        aria-hidden
      />
    </>
  )
}

const ct = {
  btn: "text-[0.625rem] sm:text-[0.6875rem] md:text-xs",
} as const

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: palette.accent }}
        aria-hidden
      />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
    </div>
  )
}

function PlaylistTitle({ title, script }: { title: string; script: string }) {
  return (
    <div
      className="welcome-title-lockup relative mx-auto mt-2 w-full max-w-full text-center sm:mt-3 md:mt-4"
      style={
        {
          "--title-size": welcomeTitleSize.main,
          "--script-size": welcomeTitleSize.script,
          "--script-overlap": welcomeTitleSize.overlap,
        } as CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{ fontSize: "var(--title-size)", color: palette.heading }}
      >
        {title}
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: palette.accent,
        }}
      >
        {script}
      </span>
      <span className="sr-only">{script}</span>
    </div>
  )
}

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, spotifyUrl } = siteConfig.playlist
  const spotifyUri = getSpotifyUri(spotifyUrl)
  const embedContainerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const playbackStateRef = useRef<"playing" | "paused">("paused")
  const { pauseMusic, resumeMusic } = useAudio()

  useEffect(() => {
    const container = embedContainerRef.current
    if (!container) return

    let mounted = true

    const handlePlaybackStateChange = (isPlaying: boolean) => {
      if (isPlaying && playbackStateRef.current !== "playing") {
        playbackStateRef.current = "playing"
        pauseMusic()
      } else if (!isPlaying && playbackStateRef.current === "playing") {
        playbackStateRef.current = "paused"
        resumeMusic()
      }
    }

    const initController = (IFrameAPI: SpotifyIframeApi) => {
      if (!mounted || !embedContainerRef.current) return

      IFrameAPI.createController(
        embedContainerRef.current,
        {
          uri: spotifyUri,
          width: "100%",
          height: "352",
        },
        (EmbedController) => {
          if (!mounted) return

          controllerRef.current = EmbedController

          const handlePlaybackUpdate = (event: { data: SpotifyPlaybackUpdate }) => {
            handlePlaybackStateChange(!event.data.isPaused)
          }

          const handlePlaybackStarted = () => {
            handlePlaybackStateChange(true)
          }

          EmbedController.addListener("playback_update", handlePlaybackUpdate)
          EmbedController.addListener("playback_started", handlePlaybackStarted)
        }
      )
    }

    loadSpotifyIframeApi(initController)

    return () => {
      mounted = false
      if (playbackStateRef.current === "playing") {
        resumeMusic()
      }
      playbackStateRef.current = "paused"
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [pauseMusic, resumeMusic, spotifyUri])

  return (
    <section
      id="playlist"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 overflow-visible bg-transparent py-6 sm:py-10 md:py-12 lg:py-16`}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-2 sm:px-3 md:px-4 lg:px-6">
        <div
          className="relative overflow-visible rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
          style={glassPanelStyle}
        >
          <GlassSurfaceLayers />

          <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            {/* Header */}
            <div className="relative mx-auto mb-4 max-w-2xl text-center sm:mb-6 md:mb-8">
              <div className="mx-auto mb-5 flex items-center justify-center gap-1.5 sm:mb-6 md:mb-7">
                <SectionDivider />
              </div>

              <PlaylistTitle title={title} script={playlistName} />

              <div
                className={`font-goudy-italic mx-auto mt-5 max-w-lg space-y-3 px-2 sm:mt-6 ${sectionType.textRelaxed}`}
                style={{ color: palette.body }}
              >
                {subtitle.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center sm:mt-5">
                <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
              </div>
            </div>

            {/* Playlist card */}
            <div
              className="relative mx-auto max-w-2xl overflow-visible rounded-lg border backdrop-blur-md sm:rounded-xl md:rounded-2xl"
              style={{
                ...innerSurfaceStyle,
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
              }}
            >
              <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                <p
                  className={`${cinzel.className} mb-4 text-center ${sectionType.label} font-semibold uppercase tracking-[0.2em] sm:mb-5 sm:tracking-[0.24em]`}
                  style={{ color: palette.heading }}
                >
                  {playlistName}
                </p>

                <div
                  ref={embedContainerRef}
                  title={`${playlistName} — Spotify playlist`}
                  className="w-full min-h-[232px] overflow-hidden rounded-xl md:min-h-[352px] [&_iframe]:border-0"
                />

                <div className="mt-5 flex justify-center sm:mt-6">
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cinzel.className} group relative inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-2.5 font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:tracking-[0.24em] md:px-10 md:py-3.5 md:tracking-[0.28em] ${ct.btn}`}
                    style={{
                      backgroundColor: palette.accent,
                      borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                      color: "var(--color-welcome-bg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = palette.heading
                      e.currentTarget.style.borderColor = palette.accent
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = palette.accent
                      e.currentTarget.style.borderColor =
                        "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
                    }}
                  >
                    <Music2 className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="relative z-10">Open in Spotify</span>
                    <div
                      className="absolute inset-0 -z-0 rounded-sm opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
                      style={{ backgroundColor: "var(--color-motif-deep)" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
