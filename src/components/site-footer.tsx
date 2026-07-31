import Link from "next/link"
import { siteConfig, tools, getToolAppUrl } from "@/lib/site-config"

const focusUrl = getToolAppUrl(tools.find((t) => t.slug === "focus")!)
const decideUrl = getToolAppUrl(tools.find((t) => t.slug === "decide")!)

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#060910]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-5 sm:px-6">
        <div className="sm:col-span-2">
          <p className="text-xl font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            {siteConfig.tagline}. Free online productivity tools—focus timer, study timer, and
            decision apps at getdaygrain.com. No signup required.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Product</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>
              <Link href="/tools">All free online tools</Link>
            </li>
            <li>{focusUrl ? <a href={focusUrl}>Online focus timer</a> : null}</li>
            <li>{decideUrl ? <a href={decideUrl}>Online decision matrix</a> : null}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/disclaimer">Disclaimer</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Social</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>
              <a href={siteConfig.socials.facebook}>Facebook</a>
            </li>
            <li>
              <a href={siteConfig.socials.instagram}>Instagram</a>
            </li>
            <li>
              <a href={siteConfig.socials.tiktok}>TikTok</a>
            </li>
            <li>
              <a href={siteConfig.socials.github}>GitHub</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © 2026 {siteConfig.name}. All rights reserved.
        <span className="mx-2">•</span>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-slate-200">
          {siteConfig.email}
        </a>
      </div>
    </footer>
  )
}
