import { Check } from 'lucide-react'
import { useState } from 'react'
import {
  contrastText,
  copyText,
  hexToRgb,
  normalizeHex,
} from '../../lib/color'

type SwatchGridProps = {
  colors: readonly [string, string, string]
  labels?: readonly [string, string, string]
}

export function SwatchGrid({
  colors,
  labels = ['Primary', 'Accent', 'Soft'],
}: SwatchGridProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleCopy = async (hex: string) => {
    const value = normalizeHex(hex)
    const ok = await copyText(value)
    if (!ok) return
    setCopiedHex(value)
    window.setTimeout(() => setCopiedHex(null), 1600)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {colors.map((hex, i) => {
        const value = normalizeHex(hex)
        const rgb = hexToRgb(value)
        const text = contrastText(value)
        const isCopied = copiedHex === value

        return (
          <button
            key={`${value}-${i}`}
            type="button"
            onClick={() => void handleCopy(value)}
            className="group relative overflow-hidden rounded-2xl border border-black/5 text-left shadow-md transition-transform hover:scale-[1.02] active:scale-[0.99]"
            style={{ backgroundColor: value, color: text }}
            aria-label={`Copy ${labels[i]} color ${value}`}
          >
            <div className="flex min-h-[140px] flex-col justify-between p-4 sm:min-h-[160px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                  {labels[i]}
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight">{value}</p>
                <p className="mt-0.5 text-xs opacity-75">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </p>
              </div>
              <p className="text-xs font-medium opacity-80">
                {isCopied ? (
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Copied
                  </span>
                ) : (
                  'Tap to copy HEX'
                )}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
