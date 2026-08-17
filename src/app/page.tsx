import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Gauge, ShieldCheck, Rocket } from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { HomeStructuredData } from "@/components/structured-data"
import { tools, getToolAppUrl, siteConfig } from "@/lib/site-config"
import { buildPageMetadata } from "@/lib/seo"

const TestimonialsCarousel = dynamic(
  () =>
    import("@/components/testimonials-carousel").then((m) => m.TestimonialsCarousel),
  { loading: () => <div className="mt-16 h-48" aria-hidden /> }
)

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  absoluteTitle: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  keywords: [
    ...siteConfig.keywords,
    "best free productivity website",
    "online tools for students",
    "focus and study apps free",
  ],
})

const focusTool = tools.find((t) => t.slug === "focus")
const focusAppUrl = focusTool ? getToolAppUrl(focusTool) : null

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <div className="pb-16">
        <section className="relative overflow-hidden pt-10 sm:pt-20" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Daygrain
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold sm:mt-4 sm:text-xl">
              <span className="gradient-text">{siteConfig.tagline}</span>
            </p>
            <p className="hero-subtext mx-auto mt-3 max-w-xl text-xs leading-6 sm:mt-4 sm:text-sm sm:leading-7">
              {siteConfig.heroDescription}
            </p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/tools" className="btn-primary px-5 py-3 text-center">
                Explore free online tools
              </Link>
              {focusAppUrl ? (
                <a href={focusAppUrl} className="btn-primary px-5 py-3 text-center">
                  Open focus timer online
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16" aria-labelledby="featured-tools-heading">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="featured-tools-heading" className="text-xl font-semibold text-white sm:text-3xl">
              Featured productivity tools
            </h2>
            <Link href="/tools" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              View all tools
            </Link>
          </div>
          <div className="mt-5 grid auto-rows-fr gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.filter((t) => t.status === "Live").map((tool) => (
              <ToolCard key={tool.slug} {...tool} />
            ))}
          </div>
        </section>

        <section className="glass mt-12 rounded-2xl p-6 sm:mt-16 sm:p-8" aria-labelledby="about-daygrain">
          <h2 id="about-daygrain" className="text-xl font-semibold text-white sm:text-2xl">
            Free online focus &amp; productivity tools
          </h2>
          <div className="hero-subtext mt-4 space-y-4 text-sm leading-7 sm:text-base sm:leading-8">
            <p>
              <strong className="font-medium text-slate-200">Daygrain</strong> is a growing suite of
              free web apps for focus, study, decisions, color, and data. Use our{" "}
              <strong className="font-medium text-slate-200">online focus timer</strong>,{" "}
              <strong className="font-medium text-slate-200">Daygrain Decide</strong> for a weighted
              decision matrix,{" "}
              <strong className="font-medium text-slate-200">Daygrain Colors</strong> for palettes,
              or <strong className="font-medium text-slate-200">Daygrain Data</strong> to profile a
              CSV in your browser.
            </p>
            <p>
              Whether you search for a <em>study focus tool online</em>, a{" "}
              <em>online csv profiler</em>, or <em>minimal productivity apps</em>, Daygrain is built
              to load quickly, stay private, and work on any device.
            </p>
          </div>
          <Link href="/tools" className="btn-primary mt-6 inline-flex px-4 py-2.5">
            Browse all Daygrain tools
          </Link>
        </section>

        <section className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3" aria-label="Why Daygrain">
          <div className="glass card-hover rounded-2xl p-5">
            <Gauge className="h-5 w-5 text-cyan-300" aria-hidden />
            <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Built for speed</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Lightweight pages optimized for fast load and Core Web Vitals.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-5">
            <ShieldCheck className="h-5 w-5 text-cyan-300" aria-hidden />
            <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Privacy-first</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Clear policies and minimal data collection on getdaygrain.com.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-5">
            <Rocket className="h-5 w-5 text-cyan-300" aria-hidden />
            <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Growing product suite</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              New free online tools for creativity, learning, and focus—shipping regularly.
            </p>
          </div>
        </section>

        <TestimonialsCarousel />
      </div>
    </>
  )
}
