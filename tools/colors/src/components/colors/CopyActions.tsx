import { Check, Code2, Copy, Hash, Share2, Shuffle, Wind } from 'lucide-react'
import { useState } from 'react'
import type { Palette } from '../../data/palettes'
import {
  copyText,
  formatCssVariables,
  formatHexList,
  formatShareText,
  formatTailwindSnippet,
} from '../../lib/color'

type CopyActionsProps = {
  palette: Palette
  isToday: boolean
  onShuffle: () => void
  onToday: () => void
}

type ActionKey = 'hex' | 'css' | 'tailwind' | 'share'

export function CopyActions({ palette, isToday, onShuffle, onToday }: CopyActionsProps) {
  const [copied, setCopied] = useState<ActionKey | null>(null)

  const runCopy = async (key: ActionKey, text: string) => {
    const ok = await copyText(text)
    if (!ok) return
    setCopied(key)
    window.setTimeout(() => setCopied(null), 1600)
  }

  const actions: {
    key: ActionKey
    label: string
    icon: typeof Copy
    getText: () => string
  }[] = [
    {
      key: 'hex',
      label: 'Copy HEX',
      icon: Hash,
      getText: () => formatHexList(palette),
    },
    {
      key: 'css',
      label: 'Copy CSS',
      icon: Code2,
      getText: () => formatCssVariables(palette),
    },
    {
      key: 'tailwind',
      label: 'Copy Tailwind',
      icon: Copy,
      getText: () => formatTailwindSnippet(palette),
    },
    {
      key: 'share',
      label: 'Copy share text',
      icon: Share2,
      getText: () => formatShareText(palette),
    },
  ]

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {actions.map(({ key, label, icon: Icon, getText }) => (
          <button
            key={key}
            type="button"
            onClick={() => void runCopy(key, getText())}
            className="btn-ghost inline-flex items-center justify-center gap-2 py-3"
          >
            {copied === key ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onShuffle}
          className="btn-primary inline-flex flex-1 items-center justify-center gap-2 py-3 sm:flex-none"
        >
          <Shuffle className="h-4 w-4" aria-hidden />
          Shuffle
        </button>
        {!isToday ? (
          <button
            type="button"
            onClick={onToday}
            className="btn-ghost inline-flex items-center gap-2 py-3"
          >
            <Wind className="h-4 w-4" aria-hidden />
            Today&apos;s palette
          </button>
        ) : null}
      </div>
    </div>
  )
}
