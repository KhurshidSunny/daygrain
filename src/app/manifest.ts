import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b14",
    theme_color: "#67e8f9",
    lang: "en",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.ogImage,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
