import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

type PageSeoOptions = {
  /** Page title (template adds "| Daygrain" unless absoluteTitle is set). */
  title: string
  description: string
  /** Path only, e.g. `/tools` */
  path: string
  keywords?: readonly string[]
  /** Use for homepage to avoid duplicate brand in tab title. */
  absoluteTitle?: string
}

export function buildPageMetadata(options: PageSeoOptions): Metadata {
  const { title, description, path, keywords, absoluteTitle } = options
  const url = `${siteConfig.domain}${path}`
  const keywordList = [...(keywords ?? siteConfig.keywords)]

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: keywordList,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: absoluteTitle ?? `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ?? `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}
