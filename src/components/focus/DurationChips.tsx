import { DURATIONS, type DurationMinutes } from '../../brand/theme'

interface DurationChipsProps {
  value: DurationMinutes
  onChange: (d: DurationMinutes) => void
  disabled?: boolean
}

export function DurationChips({ value, onChange, disabled }: DurationChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Focus duration">
      {DURATIONS.map((min) => {
        const selected = value === min
        return (
          <button
            key={min}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(min)}
            className={`min-w-[4.5rem] rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              selected
                ? 'bg-sage text-cream shadow-md shadow-sage/25'
                : 'border border-sage/20 bg-white text-charcoal-muted hover:border-sage/40 hover:text-charcoal'
            } disabled:opacity-50`}
          >
            {min} min
          </button>
        )
      })}
    </div>
  )
}
