import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  /**
   * Tool SPAs (Vite) live under public/<slug>.
   * Next does not auto-serve public/<slug>/index.html for /<slug>,
   * and trailingSlash:false redirects /<slug>/ → /<slug> (which 404s).
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/focus",
          destination: "/focus/index.html",
        },
        {
          source: "/focus/",
          destination: "/focus/index.html",
        },
        {
          source: "/decide",
          destination: "/decide/index.html",
        },
        {
          source: "/decide/",
          destination: "/decide/index.html",
        },
        {
          source: "/colors",
          destination: "/colors/index.html",
        },
        {
          source: "/colors/",
          destination: "/colors/index.html",
        },
      ],
      afterFiles: [],
      fallback: [
        {
          // SPA client routes — real files like /focus/assets/* are served first.
          source: "/focus/:path*",
          destination: "/focus/index.html",
        },
        {
          source: "/decide/:path*",
          destination: "/decide/index.html",
        },
        {
          source: "/colors/:path*",
          destination: "/colors/index.html",
        },
      ],
    }
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/tools/**",
          "**/.git/**",
          "**/public/focus/**",
          "**/public/decide/**",
          "**/public/colors/**",
        ],
      }
    }
    return config
  },
}

export default nextConfig
