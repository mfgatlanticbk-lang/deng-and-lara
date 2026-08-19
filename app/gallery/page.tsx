import MasonryGallery from "@/components/masonry-gallery"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { getSiteConfig } from "@/lib/site-config"
import { fetchGalleryImages } from "@/lib/fetch-gallery-images"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { Camera } from "lucide-react"

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

export const dynamic = "force-static"

function GalleryCoupleLabel({ groom, bride }: { groom: string; bride: string }) {
  const lineStyle = {
    background:
      "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-welcome-navy) 35%, transparent))",
  }

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
      <span className="h-px w-5 sm:w-7 md:w-9" style={lineStyle} aria-hidden />
      <p
        className={`${cinzel.className} shrink-0 py-0.5 text-[0.525rem] font-semibold uppercase leading-normal tracking-[0.34em] min-[400px]:text-[0.55rem] min-[400px]:tracking-[0.38em] sm:text-[0.575rem] sm:tracking-[0.44em]`}
        style={{ color: "var(--color-welcome-navy)" }}
      >
        With {groom}
        <span
          className={`${aboveTheBeyond.className} mx-1.5 inline-block normal-case tracking-normal sm:mx-2`}
          style={{
            fontSize: "1.35em",
            color: "var(--color-welcome-green)",
            verticalAlign: "middle",
          }}
          aria-hidden
        >
          &
        </span>
        {bride}
      </p>
      <span
        className="h-px w-5 sm:w-7 md:w-9"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-welcome-navy) 35%, transparent))",
        }}
        aria-hidden
      />
    </div>
  )
}

function GalleryTitle() {
  return (
    <h1
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
          "--script-overlap": "clamp(-0.65rem, -2.8vw, -1.5rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em]`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
        Gallery
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        from 25 years ago
      </span>
      <span className="sr-only">from 25 years ago</span>
    </h1>
  )
}

export default async function GalleryPage() {
  const siteConfig = await getSiteConfig()
  const allImages = await fetchGalleryImages()
  const images = allImages.map((src) => ({
    src,
    category: src.includes("/desktop-background/")
      ? ("desktop" as const)
      : ("mobile" as const),
    width: 1200,
    height: 900,
    orientation: src.includes("/mobile-background/")
      ? ("portrait" as const)
      : ("landscape" as const),
  }))

  return (
    <main
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-hidden`}
      style={{ background: "var(--color-welcome-bg)" }}
    >
      <SectionCornerDecorations />

      <section className="relative z-20 mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-6 px-3 text-center sm:mb-8 sm:px-4 md:mb-10">
          <GalleryCoupleLabel
            groom={siteConfig.couple.groomNickname}
            bride={siteConfig.couple.brideNickname}
          />
          <div className="my-4 sm:my-5 md:my-6">
            <GalleryTitle />
          </div>
          <div className="mx-auto max-w-2xl space-y-3 px-2 sm:space-y-3.5">
            <p
              className="font-goudy-italic text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
              style={{ color: "var(--color-welcome-text)" }}
            >
              Looking back at our wedding day 25 years ago today, through every season, we are so
              grateful for this beautiful life together, made even richer by the endless love and
              support of our family, friends, and community.
            </p>
            <p
              className={`${cinzel.className} font-semibold uppercase tracking-[0.26em] sm:tracking-[0.30em]`}
              style={{
                fontSize: "clamp(0.88rem, 2.4vw, 1.05rem)",
                color: "var(--color-welcome-green)",
              }}
            >
              ALL IS GRACE.
            </p>
            <p
              className="font-goudy-italic text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
              style={{ color: "var(--color-welcome-text)" }}
            >
              God blessed us and sustains us.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4">
            <span
              className="h-px w-8 sm:w-12 md:w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-welcome-navy) 38%, transparent))",
              }}
            />
            <Camera
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              style={{ color: "var(--color-welcome-green)" }}
              aria-hidden
            />
            <span
              className="h-px w-8 sm:w-12 md:w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-welcome-navy) 38%, transparent))",
              }}
            />
          </div>
        </div>

        {images.length > 0 && <MasonryGallery images={images} />}
      </section>
    </main>
  )
}
