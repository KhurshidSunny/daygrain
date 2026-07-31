import { MAX_RATING, MIN_RATING } from '../../brand/theme'
import type { Criterion, OptionItem, RatingsMap } from '../../lib/score'

type RatingsGridProps = {
  options: OptionItem[]
  criteria: Criterion[]
  ratings: RatingsMap
  onChange: (optionId: string, criterionId: string, value: number) => void
}

export function RatingsGrid({ options, criteria, ratings, onChange }: RatingsGridProps) {
  const namedOptions = options.filter((o) => o.name.trim())
  const namedCriteria = criteria.filter((c) => c.name.trim())

  if (namedOptions.length < 2 || namedCriteria.length === 0) {
    return (
      <section aria-labelledby="ratings-heading">
        <h2 id="ratings-heading" className="text-sm font-semibold text-charcoal">
          Rate each option
        </h2>
        <p className="mt-2 rounded-xl border border-dashed border-sage/25 bg-cream/40 px-4 py-6 text-center text-sm text-charcoal-muted">
          Name at least two options and your criteria first.
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="ratings-heading">
      <h2 id="ratings-heading" className="text-sm font-semibold text-charcoal">
        Rate each option
      </h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">
        1 = weak · 5 = strong for that criterion
      </p>

      <div className="mt-4 space-y-5">
        {namedOptions.map((option) => (
          <div
            key={option.id}
            className="rounded-xl border border-sage/12 bg-white p-3.5 sm:p-4"
          >
            <p className="text-sm font-semibold text-charcoal">{option.name}</p>
            <div className="mt-3 space-y-3">
              {namedCriteria.map((criterion) => {
                const value = ratings[option.id]?.[criterion.id] ?? 3
                return (
                  <div key={criterion.id}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <label
                        htmlFor={`rate-${option.id}-${criterion.id}`}
                        className="text-xs font-medium text-charcoal-muted"
                      >
                        {criterion.name}
                      </label>
                      <span className="tabular-nums text-xs font-semibold text-sage-dark">
                        {value}/{MAX_RATING}
                      </span>
                    </div>
                    <input
                      id={`rate-${option.id}-${criterion.id}`}
                      type="range"
                      min={MIN_RATING}
                      max={MAX_RATING}
                      step={1}
                      value={value}
                      onChange={(e) =>
                        onChange(option.id, criterion.id, Number(e.target.value))
                      }
                      className="w-full accent-sage"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
