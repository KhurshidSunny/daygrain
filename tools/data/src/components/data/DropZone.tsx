import { FileSpreadsheet, Lock, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import type { SampleFile } from '../../data/samples'

type DropZoneProps = {
  error: string
  samples: SampleFile[]
  onFile: (file: File) => void
  onSample: (sample: SampleFile) => void
  onPaste: (text: string) => void
}

export function DropZone({ error, samples, onFile, onSample, onPaste }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [pasteOpen, setPasteOpen] = useState(false)
  const [pasteValue, setPasteValue] = useState('')

  return (
    <section className="data-card" aria-label="Open a CSV">
      <button
        type="button"
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) onFile(file)
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex w-full flex-col items-center rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
          dragging
            ? 'border-sage bg-sage/10'
            : 'border-sage/30 bg-cream/50 hover:border-sage hover:bg-sage/5'
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/15 text-sage-dark">
          <Upload className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-4 text-base font-semibold text-charcoal">Drop a CSV here</p>
        <p className="mt-1 text-sm text-charcoal-muted">or click to browse — max 5 MB, up to 50,000 rows</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sage-dark">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          Stays on this device. Nothing is uploaded.
        </p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />

      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
        Or try a sample
      </p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {samples.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSample(sample)}
            className="rounded-xl border border-sage/15 bg-white p-3 text-left transition-colors hover:border-sage hover:bg-sage/5"
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal">
              <FileSpreadsheet className="h-4 w-4 text-sage" aria-hidden />
              {sample.name}
            </span>
            <span className="mt-1 block text-xs leading-5 text-charcoal-muted">{sample.blurb}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPasteOpen((open) => !open)}
        className="mt-4 text-xs font-semibold text-sage hover:underline"
      >
        {pasteOpen ? 'Hide paste box' : 'Paste CSV text instead'}
      </button>
      {pasteOpen ? (
        <div className="mt-3">
          <label htmlFor="paste-csv" className="sr-only">
            Paste CSV
          </label>
          <textarea
            id="paste-csv"
            value={pasteValue}
            onChange={(e) => setPasteValue(e.target.value)}
            rows={5}
            placeholder="ticket_id,wait_min,resolved&#10;T-1,14,yes"
            className="field-input font-mono text-xs"
          />
          <button
            type="button"
            className="btn-primary mt-2 px-4 py-2 text-sm"
            onClick={() => {
              if (pasteValue.trim()) onPaste(pasteValue)
            }}
          >
            Profile pasted table
          </button>
        </div>
      ) : null}
    </section>
  )
}
