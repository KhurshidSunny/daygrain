import { CRITERIA_PRESETS } from '../../data/presets'
import type { Criterion } from '../../lib/score'

type CriteriaEditorProps = {
  criteria: Criterion[]
  onChangeName: (id: string, name: string) => void
  onChangeWeight: (id: string, weight: number) => void
  onApplyPreset: (id: string, name: string) => void
}

export function CriteriaEditor({
  criteria,
  onChangeName,
  onChangeWeight,
  onApplyPreset,
}: CriteriaEditorProps) {
  return (
    <section aria-labelledby="criteria-heading">
      <h2 id="criteria-heading" className="text-sm font-semibold text-charcoal">
        What matters
      </h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">
        Three criteria. Raise weight on what matters more.
      </p>

      <div className="mt-4 space-y-4">
        {criteria.map((criterion, index) => (
          <div
            key={criterion.id}
            className="rounded-xl border border-sage/12 bg-cream/60 p-3.5 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`crit-name-${criterion.id}`}
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted"
                >
                  Criterion {index + 1}
                </label>
                <input
                  id={`crit-name-${criterion.id}`}
                  type="text"
                  value={criterion.name}
                  onChange={(e) => onChangeName(criterion.id, e.target.value)}
                  placeholder="e.g. Pay"
                  maxLength={40}
                  autoComplete="off"
                  className="field-input"
                />
              </div>
              <div className="sm:w-36">
                <label
                  htmlFor={`crit-weight-${criterion.id}`}
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted"
                >
                  Weight {criterion.weight}
                </label>
                <input
                  id={`crit-weight-${criterion.id}`}
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={criterion.weight}
                  onChange={(e) => onChangeWeight(criterion.id, Number(e.target.value))}
                  className="w-full accent-sage"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {CRITERIA_PRESETS.slice(0, 8).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onApplyPreset(criterion.id, preset)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                    criterion.name === preset
                      ? 'bg-sage text-white'
                      : 'bg-white text-charcoal-muted ring-1 ring-sage/15 hover:bg-sage/10 hover:text-sage-dark'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
