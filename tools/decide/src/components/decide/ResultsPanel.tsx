import { Check, Copy, Trophy } from 'lucide-react'
import { MAX_RATING } from '../../brand/theme'
import {
  getCriterionLeads,
  type Criterion,
  type RatingsMap,
  type ScoredOption,
} from '../../lib/score'

type ResultsPanelProps = {
  ranked: ScoredOption[]
  insight: string
  criteria: Criterion[]
  ratings: RatingsMap
  copied: boolean
  onCopy: () => void
  onReset: () => void
}

export function ResultsPanel({
  ranked,
  insight,
  criteria,
  ratings,
  copied,
  onCopy,
  onReset,
}: ResultsPanelProps) {
  if (!ranked.length) return null

  const winner = ranked[0]
  const runnerUp = ranked[1]
  const maxScore = Math.max(...ranked.map((r) => r.score100), 1)
  const margin = runnerUp ? winner.score100 - runnerUp.score100 : 0

  const leads = runnerUp
    ? getCriterionLeads(winner.id, runnerUp.id, criteria, ratings)
    : []
  const topLead = leads.find((l) => l.weightedLead > 0) ?? leads[0]

  return (
    <section
      id="results"
      className="animate-fade-in space-y-4"
      aria-labelledby="results-heading"
      aria-live="polite"
    >
      <div className="rounded-2xl border border-sage/25 bg-white p-5 shadow-xl shadow-sage/10 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/15">
            <Trophy className="h-6 w-6 text-sage-dark" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">
              {margin === 0 && runnerUp ? 'Tie for first' : 'Winner'}
            </p>
            <h2
              id="results-heading"
              className="mt-0.5 text-2xl font-bold tracking-tight text-charcoal sm:text-[1.75rem]"
            >
              {winner.name}
            </h2>
            <p className="mt-1.5 text-sm text-charcoal-muted">
              Overall score{' '}
              <span className="font-semibold tabular-nums text-sage-dark">
                {winner.score100}/100
              </span>
              {runnerUp && margin > 0 ? (
                <>
                  {' '}
                  — ahead of <span className="font-medium text-charcoal">{runnerUp.name}</span> by{' '}
                  <span className="font-semibold tabular-nums text-sage-dark">{margin}</span>{' '}
                  point{margin === 1 ? '' : 's'}
                </>
              ) : null}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-sage/15 bg-cream/80 px-4 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage-dark/70">
            Why this won
          </p>
          <p className="mt-1.5 text-sm leading-6 text-charcoal">{insight}</p>
          {topLead && runnerUp && topLead.weightedLead > 0 ? (
            <p className="mt-2 text-xs leading-5 text-charcoal-muted">
              Strongest factor:{' '}
              <strong className="font-semibold text-charcoal">{topLead.criterion.name}</strong>{' '}
              — you rated {winner.name} {topLead.winnerRating}/{MAX_RATING} vs{' '}
              {runnerUp.name} {topLead.runnerRating}/{MAX_RATING}
              {topLead.criterion.weight > 1
                ? ` (weight ×${topLead.criterion.weight})`
                : ''}
              .
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-sage/15 bg-white p-5 shadow-lg shadow-sage/5 sm:p-6">
        <h3 className="text-sm font-semibold text-charcoal">Full ranking</h3>
        <p className="mt-0.5 text-xs text-charcoal-muted">
          Higher bar = stronger fit for your weighted criteria
        </p>

        <ol className="mt-5 space-y-4">
          {ranked.map((item, index) => {
            const isWinner = index === 0
            return (
              <li key={item.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <span
                      className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isWinner ? 'bg-sage text-white' : 'bg-sage/10 text-sage-dark'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isWinner ? 'text-sage-dark' : 'text-charcoal'
                      }`}
                    >
                      {item.name}
                    </span>
                    {isWinner ? (
                      <span className="ml-2 text-[11px] font-medium text-sage">Best match</span>
                    ) : null}
                  </div>
                  <span className="shrink-0 tabular-nums text-sm font-bold text-charcoal">
                    {item.score100}
                    <span className="font-medium text-charcoal-muted">/100</span>
                  </span>
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full bg-sage/12"
                  role="img"
                  aria-label={`${item.name} scored ${item.score100} out of 100`}
                >
                  <span
                    className={`block h-full rounded-full transition-[width] duration-500 ease-out ${
                      isWinner ? 'bg-sage' : 'bg-sage/45'
                    }`}
                    style={{ width: `${(item.score100 / maxScore) * 100}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="rounded-2xl border border-sage/15 bg-white p-5 shadow-lg shadow-sage/5 sm:p-6">
        <h3 className="text-sm font-semibold text-charcoal">How each criterion scored</h3>
        <p className="mt-0.5 text-xs text-charcoal-muted">
          Your 1–{MAX_RATING} ratings · weight raises importance
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[280px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-sage/15 text-xs text-charcoal-muted">
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Criterion
                </th>
                {ranked.map((option) => (
                  <th
                    key={option.id}
                    scope="col"
                    className={`px-2 py-2 text-center font-semibold ${
                      option.id === winner.id ? 'text-sage-dark' : ''
                    }`}
                  >
                    <span className="line-clamp-2 max-w-[5.5rem] sm:max-w-none">
                      {option.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion.id} className="border-b border-sage/8">
                  <th scope="row" className="py-2.5 pr-3 font-medium text-charcoal">
                    {criterion.name}
                    <span className="mt-0.5 block text-[10px] font-normal text-charcoal-muted">
                      weight ×{criterion.weight}
                    </span>
                  </th>
                  {ranked.map((option) => {
                    const value = ratings[option.id]?.[criterion.id] ?? 1
                    const best = Math.max(
                      ...ranked.map((o) => ratings[o.id]?.[criterion.id] ?? 1),
                    )
                    const isBest = value === best && ranked.length > 1
                    return (
                      <td
                        key={option.id}
                        className={`px-2 py-2.5 text-center tabular-nums ${
                          isBest
                            ? 'font-bold text-sage-dark'
                            : 'font-medium text-charcoal-muted'
                        }`}
                      >
                        {value}
                        <span className="text-charcoal-muted/60">/{MAX_RATING}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="btn-primary inline-flex flex-1 items-center justify-center gap-2 py-3 sm:flex-none"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden />
              Copy summary
            </>
          )}
        </button>
        <button type="button" onClick={onReset} className="btn-ghost px-4 py-3">
          Start over
        </button>
      </div>
    </section>
  )
}
