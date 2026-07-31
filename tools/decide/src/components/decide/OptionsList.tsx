import { Plus, Trash2 } from 'lucide-react'
import { MAX_OPTIONS, MIN_OPTIONS } from '../../brand/theme'
import type { OptionItem } from '../../lib/score'

type OptionsListProps = {
  options: OptionItem[]
  onChangeName: (id: string, name: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

export function OptionsList({ options, onChangeName, onAdd, onRemove }: OptionsListProps) {
  return (
    <section aria-labelledby="options-heading">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 id="options-heading" className="text-sm font-semibold text-charcoal">
            Your options
          </h2>
          <p className="mt-0.5 text-xs text-charcoal-muted">
            {MIN_OPTIONS}–{MAX_OPTIONS} choices to compare
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={options.length >= MAX_OPTIONS}
          className="btn-ghost inline-flex items-center gap-1.5 py-2 text-xs disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-2.5">
        {options.map((option, index) => (
          <li key={option.id} className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-xs font-semibold text-sage-dark"
              aria-hidden
            >
              {index + 1}
            </span>
            <label className="sr-only" htmlFor={`option-${option.id}`}>
              Option {index + 1}
            </label>
            <input
              id={`option-${option.id}`}
              type="text"
              value={option.name}
              onChange={(e) => onChangeName(option.id, e.target.value)}
              placeholder={
                index === 0 ? 'e.g. TechCorp offer' : index === 1 ? 'e.g. Stay current job' : 'Another option'
              }
              maxLength={60}
              autoComplete="off"
              className="field-input"
            />
            {options.length > MIN_OPTIONS ? (
              <button
                type="button"
                onClick={() => onRemove(option.id)}
                className="rounded-lg p-2 text-charcoal-muted transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label={`Remove option ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
