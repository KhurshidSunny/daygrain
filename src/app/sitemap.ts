import type { MetadataRoute } from "next"
import { siteConfig, tools } from "@/lib/site-config"

const hubRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = tools
    .filter((t) => t.status === "Live" && t.appPath)
    .map((t) => ({
      path: t.appPath!,
      priority: 0.85,
      changeFrequency: "weekly" as const,
    }))

  const all = [...hubRoutes, ...toolRoutes]

  return all.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
