import type { Metadata } from "next"
import { ToolsDirectoryClient } from "./tools-directory-client"
import { ToolsPageStructuredData } from "@/components/structured-data"
import { siteConfig, tools } from "@/lib/site-config"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Free Online Productivity Tools Directory",
  description:
    "Browse all Daygrain tools: online focus timer, study timer, decision maker, and upcoming creativity & learning apps. Filter by category and search by name.",
  path: "/tools",
  keywords: [
    "productivity tools directory",
    "free online tools list",
    "focus timer online",
    "study tools free",
    "decision maker tool",
    ...tools.flatMap((t) => t.keywords),
  ],
})

export default function ToolsPage() {
  return (
    <>
      <ToolsPageStructuredData />
      <section className="pt-12 pb-10">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Free online productivity tools
        </h1>
        <p className="hero-subtext mt-3 max-w-2xl text-sm leading-7 sm:text-base">
          Search and filter Daygrain apps—focus timers, decision helpers, and more. All tools are
          free to use in your browser with no account required.
        </p>
        <ToolsDirectoryClient />
      </section>
    </>
  )
}
