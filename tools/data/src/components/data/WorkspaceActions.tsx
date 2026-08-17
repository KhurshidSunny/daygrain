import { Check, Copy, Download, Eraser } from 'lucide-react'
import { useState } from 'react'
import type { CleanAction } from '../../lib/clean'

type WorkspaceActionsProps = {
  onClean: (action: CleanAction) => void
  onExportCsv: () => void
  onExportReport: () => void
  onCopyReport: () => Promise<boolean>
  onReset: () => void
}

const ACTIONS: { id: CleanAction; label: string; hint: string }[] = [
  { id: 'trim', label: 'Trim spaces', hint: 'Strip leading/trailing whitespace' },
  { id: 'dropEmpty', label: 'Drop empty rows', hint: 'Remove rows with no values' },
  { id: 'dropDuplicates', label: 'Drop duplicates', hint: 'Keep the first copy of each row' },
  { id: 'fillMissing', label: 'Fill missing', hint: 'Median for numbers, mode otherwise' },
]

export function WorkspaceActions({
  onClean,
  onExportCsv,
  onExportReport,
  onCopyReport,
  onReset,
}: WorkspaceActionsProps) {
  const [copied, setCopied] = useState(false)

  return (
    <section className="data-card" aria-label="Clean and export">
      <h2 className="text-sm font-semibold text-charcoal">Clean</h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">
        Runs locally. Fill uses median for numeric columns and the most common value otherwise.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onClean(action.id)}
            className="rounded-xl border border-sage/15 bg-cream/40 px-3 py-3 text-left transition-colors hover:border-sage hover:bg-sage/5"
          >
            <span className="text-sm font-semibold text-charcoal">{action.label}</span>
            <span className="mt-0.5 block text-xs text-charcoal-muted">{action.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={onExportCsv} className="btn-primary inline-flex items-center gap-2 py-3">
          <Download className="h-4 w-4" aria-hidden />
          Download cleaned CSV
        </button>
        <button type="button" onClick={onExportReport} className="btn-ghost inline-flex items-center gap-2 py-3">
          <Download className="h-4 w-4" aria-hidden />
          Quality report
        </button>
        <button
          type="button"
          onClick={() => {
            void onCopyReport().then((ok) => {
              if (!ok) return
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1600)
            })
          }}
          className="btn-ghost inline-flex items-center gap-2 py-3"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? 'Copied' : 'Copy report'}
        </button>
        <button type="button" onClick={onReset} className="btn-ghost inline-flex items-center gap-2 py-3 text-charcoal-muted">
          <Eraser className="h-4 w-4" aria-hidden />
          Start over
        </button>
      </div>
    </section>
  )
}
