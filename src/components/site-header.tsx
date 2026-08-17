"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrandLogo } from "./brand-logo"
import { tools, getToolAppUrl } from "@/lib/site-config"

const focusUrl = getToolAppUrl(tools.find((t) => t.slug === "focus")!)
const decideUrl = getToolAppUrl(tools.find((t) => t.slug === "decide")!)
const colorsUrl = getToolAppUrl(tools.find((t) => t.slug === "colors")!)
const dataUrl = getToolAppUrl(tools.find((t) => t.slug === "data")!)

const internalNav = [
  { href: "/", label: "Home", exact: true },
  { href: "/tools", label: "Tools", exact: false },
  { href: "/contact", label: "Contact", exact: true },
]

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <BrandLogo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {internalNav.map((item) => {
            const active = isActive(pathname, item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-link nav-link-active" : "nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
          {focusUrl ? (
            <a href={focusUrl} className="nav-link">
              Focus
            </a>
          ) : null}
          {decideUrl ? (
            <a href={decideUrl} className="nav-link">
              Decide
            </a>
          ) : null}
          {colorsUrl ? (
            <a href={colorsUrl} className="nav-link">
              Colors
            </a>
          ) : null}
          {dataUrl ? (
            <a href={dataUrl} className="nav-link">
              Data
            </a>
          ) : null}
        </nav>
        <Link href="/tools" className="btn-primary shrink-0 px-3 py-2 sm:px-4">
          Open tools
        </Link>
      </div>
    </header>
  )
}
