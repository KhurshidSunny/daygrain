"use client"

import { useMemo, useState } from "react"
import { tools } from "@/lib/site-config"
import { ToolCard } from "@/components/tool-card"

const categories = ["All", "Productivity", "Decision", "Creativity", "Data", "Mind", "Learning"]

export function ToolsDirectoryClient() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q.length === 0 ||
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q)
      const matchesCategory = category === "All" || tool.tag === category
      return matchesQuery && matchesCategory
    })
  }, [category, query])

  return (
    <>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={category === cat ? "filter-chip filter-chip-active" : "filter-chip"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
      </div>
    </>
  )
}
