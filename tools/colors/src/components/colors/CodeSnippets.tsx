import { useState } from 'react'
import { Check, Code2 } from 'lucide-react'
import type { Palette } from '../../data/palettes'
import { copyText, formatCssVariables, formatTailwindSnippet } from '../../lib/color'

type CodeSnippetsProps = {
  palette: Palette
}

export function CodeSnippets({ palette }: CodeSnippetsProps) {
  const [tab, setTab] = useState<'css' | 'tailwind'>('css')
  const [copied, setCopied] = useState(false)

  const code = tab === 'css' ? formatCssVariables(palette) : formatTailwindSnippet(palette)

  const handleCopy = async () => {
    const ok = await copyText(code)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="rounded-2xl border border-sage/15 bg-charcoal p-4 text-left sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Code2 className="h-4 w-4 text-sage-light" aria-hidden />
          Ready to paste
        </div>
        <div className="flex gap-1 rounded-lg bg-white/10 p-0.5">
          <button
            type="button"
            onClick={() => setTab('css')}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
              tab === 'css' ? 'bg-white text-charcoal' : 'text-white/70 hover:text-white'
            }`}
          >
            CSS
          </button>
          <button
            type="button"
            onClick={() => setTab('tailwind')}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
              tab === 'tailwind' ? 'bg-white text-charcoal' : 'text-white/70 hover:text-white'
            }`}
          >
            Tailwind
          </button>
        </div>
      </div>

      <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-3 text-xs leading-6 text-sage-light sm:text-[13px]">
        <code>{code}</code>
      </pre>

      <button
        type="button"
        onClick={() => void handleCopy()}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden />
            Copied snippet
          </>
        ) : (
          'Copy this snippet'
        )}
      </button>
    </div>
  )
}
