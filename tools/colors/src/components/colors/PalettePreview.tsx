import type { Palette } from '../../data/palettes'
import { contrastText, normalizeHex } from '../../lib/color'

type PalettePreviewProps = {
  palette: Palette
}

export function PalettePreview({ palette }: PalettePreviewProps) {
  const [primary, accent, soft] = palette.colors.map(normalizeHex)
  const onPrimary = contrastText(primary)
  const onAccent = contrastText(accent)

  return (
    <div
      className="overflow-hidden rounded-2xl border border-sage/15 shadow-md"
      style={{ backgroundColor: soft }}
      aria-label={`Preview of ${palette.name}`}
    >
      <div className="px-4 py-3 sm:px-5" style={{ backgroundColor: primary, color: onPrimary }}>
        <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">Preview</p>
        <p className="mt-0.5 text-base font-bold">{palette.name}</p>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <p className="text-sm leading-6 text-charcoal/80" style={{ color: '#1A1A1A' }}>
          {palette.mood}
        </p>
        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
            style={{ backgroundColor: accent, color: onAccent }}
          >
            Accent button
          </span>
          <span
            className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: accent, color: accent, backgroundColor: '#fff' }}
          >
            Ghost action
          </span>
        </div>
        <div
          className="h-2 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${primary}, ${accent})`,
          }}
        />
      </div>
    </div>
  )
}
