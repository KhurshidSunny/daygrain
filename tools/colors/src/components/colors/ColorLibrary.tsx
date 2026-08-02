import { Check, Search } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import {
  COLOR_FAMILIES,
  COLOR_LIBRARY,
  formatColorCss,
  searchColors,
  type NamedColor,
} from '../../data/colorLibrary'
import { contrastText, copyText } from '../../lib/color'

type CopyKind = 'hex' | 'tailwind' | 'css'

function CopyChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
        active
          ? 'bg-sage text-white'
          : 'bg-cream text-charcoal-muted ring-1 ring-sage/15 hover:bg-sage/10 hover:text-sage-dark'
      }`}
    >
      {active ? (
        <span className="inline-flex items-center gap-1">
          <Check className="h-3 w-3" aria-hidden />
          Copied
        </span>
      ) : (
        label
      )}
    </button>
  )
}

function ColorCard({
  color,
  copiedKey,
  onCopy,
}: {
  color: NamedColor
  copiedKey: string | null
  onCopy: (color: NamedColor, kind: CopyKind) => void
}) {
  const text = contrastText(color.hex)
  const key = (kind: CopyKind) => `${color.id}:${kind}`

  return (
    <article className="overflow-hidden rounded-xl border border-sage/15 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className="flex h-16 items-end px-3 pb-2 sm:h-[4.5rem]"
        style={{ backgroundColor: color.hex, color: text }}
        aria-hidden
      >
        <span className="truncate text-xs font-semibold opacity-90">{color.hex}</span>
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-charcoal">{color.name}</h3>
        <p className="mt-0.5 truncate font-mono text-[11px] text-charcoal-muted">
          {color.tailwind}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <CopyChip
            label="HEX"
            active={copiedKey === key('hex')}
            onClick={() => onCopy(color, 'hex')}
          />
          <CopyChip
            label="Tailwind"
            active={copiedKey === key('tailwind')}
            onClick={() => onCopy(color, 'tailwind')}
          />
          <CopyChip
            label="CSS"
            active={copiedKey === key('css')}
            onClick={() => onCopy(color, 'css')}
          />
        </div>
      </div>
    </article>
  )
}

export function ColorLibrary() {
  const [query, setQuery] = useState('')
  const [family, setFamily] = useState('all')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => searchColors(deferredQuery, family),
    [deferredQuery, family],
  )

  const handleCopy = async (color: NamedColor, kind: CopyKind) => {
    const value =
      kind === 'hex'
        ? color.hex
        : kind === 'tailwind'
          ? color.tailwind
          : formatColorCss(color.hex)

    const ok = await copyText(value)
    if (!ok) return
    const key = `${color.id}:${kind}`
    setCopiedKey(key)
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600)
  }

  return (
    <section id="color-library" className="colors-card scroll-mt-24" aria-labelledby="library-heading">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Color library</p>
          <h2 id="library-heading" className="mt-1 text-xl font-bold tracking-tight text-charcoal">
            Find any color
          </h2>
          <p className="mt-1 text-sm text-charcoal-muted">
            {COLOR_LIBRARY.length} named colors — copy HEX, Tailwind token, or CSS
          </p>
        </div>
      </div>

      <div className="relative mt-5">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted/60"
          aria-hidden
        />
        <label htmlFor="color-search" className="sr-only">
          Search colors by name, hex, or Tailwind class
        </label>
        <input
          id="color-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, hex, or Tailwind… e.g. sky, #0ea5e9"
          autoComplete="off"
          className="w-full rounded-xl border border-sage/20 bg-white py-3 pl-10 pr-3.5 text-sm text-charcoal placeholder:text-charcoal-muted/50 transition-all focus:border-sage focus:ring-2 focus:ring-sage/15"
        />
      </div>

      <div
        className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Color families"
      >
        {COLOR_FAMILIES.map((item) => {
          const active = family === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFamily(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-sage text-white'
                  : 'bg-cream text-charcoal-muted ring-1 ring-sage/15 hover:bg-sage/10'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-charcoal-muted" aria-live="polite">
        {results.length} color{results.length === 1 ? '' : 's'}
        {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ''}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-sage/25 bg-cream/50 px-4 py-8 text-center text-sm text-charcoal-muted">
          No colors match. Try a family name, shade like 500, or a hex code.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              copiedKey={copiedKey}
              onCopy={(c, kind) => void handleCopy(c, kind)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
