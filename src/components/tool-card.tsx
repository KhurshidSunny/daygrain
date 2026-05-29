import Link from "next/link"
import type { ToolItem } from "@/lib/site-config"
import { getToolAppUrl } from "@/lib/site-config"

type ToolCardProps = ToolItem

export function ToolCard(tool: ToolCardProps) {
  const live = tool.status === "Live"
  const appUrl = getToolAppUrl(tool)
  const headingId = `tool-${tool.slug}-title`

  const buttonBase =
    "inline-flex min-h-[2.5rem] w-full items-center justify-center px-3.5 py-2 whitespace-nowrap"

  return (
    <article
      className="glass card-hover flex h-full flex-col rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      aria-labelledby={headingId}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-300">{tool.tag}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs ${
            live ? "bg-cyan-300/20 text-cyan-200" : "bg-violet-300/20 text-violet-200"
          }`}
        >
          {tool.status}
        </span>
      </div>
      <h3 id={headingId} className="mt-4 text-xl font-semibold text-white">
        {tool.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{tool.desc}</p>
      <div className="mt-5">
        {live && appUrl ? (
          <a
            href={appUrl}
            className={`btn-primary ${buttonBase}`}
            title={tool.seoTitle}
            aria-label={`Open ${tool.name} — ${tool.seoDescription}`}
          >
            Open tool
          </a>
        ) : (
          <Link
            href="/tools"
            className={`btn-secondary ${buttonBase}`}
            title={tool.seoTitle}
          >
            Coming soon
          </Link>
        )}
      </div>
    </article>
  )
}
