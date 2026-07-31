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
   * Focus is a Vite SPA built into public/focus.
   * Next does not auto-serve public/focus/index.html for /focus,
   * and trailingSlash:false redirects /focus/ → /focus (which 404s).
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
      ],
      afterFiles: [],
      fallback: [
        {
          // SPA client routes (/focus/privacy, etc.) — real files like
          // /focus/assets/* are served from public/ first.
          source: "/focus/:path*",
          destination: "/focus/index.html",
        },
      ],
    }
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/tools/**", "**/.git/**", "**/public/focus/**"],
      }
    }
    return config
  },
}

export default nextConfig
