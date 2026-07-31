import { MAX_RATING } from '../brand/theme'

export interface Criterion {
  id: string
  name: string
  weight: number
}

export interface OptionItem {
  id: string
  name: string
}

/** ratings[optionId][criterionId] = 1..5 */
export type RatingsMap = Record<string, Record<string, number>>

export interface ScoredOption {
  id: string
  name: string
  raw: number
  score100: number
}

export interface CriterionLead {
  criterion: Criterion
  winnerRating: number
  runnerRating: number
  weightedLead: number
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

const MIN_FALLBACK = 1

export function scoreOptions(
  options: OptionItem[],
  criteria: Criterion[],
  ratings: RatingsMap,
): ScoredOption[] {
  const weightSum = criteria.reduce((sum, c) => sum + Math.max(0, c.weight), 0) || 1

  const scored = options.map((option) => {
    const raw = criteria.reduce((sum, criterion) => {
      const rating = ratings[option.id]?.[criterion.id] ?? MIN_FALLBACK
      return sum + rating * Math.max(0, criterion.weight)
    }, 0)
    const avg = raw / weightSum
    const score100 = Math.round((avg / MAX_RATING) * 100)
    return { id: option.id, name: option.name, raw, score100 }
  })

  return scored.sort((a, b) => b.score100 - a.score100 || b.raw - a.raw)
}

/** How much each criterion helped the winner vs runner-up (highest first). */
export function getCriterionLeads(
  winnerId: string,
  runnerId: string,
  criteria: Criterion[],
  ratings: RatingsMap,
): CriterionLead[] {
  return criteria
    .map((criterion) => {
      const winnerRating = ratings[winnerId]?.[criterion.id] ?? MIN_FALLBACK
      const runnerRating = ratings[runnerId]?.[criterion.id] ?? MIN_FALLBACK
      return {
        criterion,
        winnerRating,
        runnerRating,
        weightedLead: (winnerRating - runnerRating) * criterion.weight,
      }
    })
    .sort((a, b) => b.weightedLead - a.weightedLead)
}

export function buildInsight(
  ranked: ScoredOption[],
  criteria: Criterion[],
  ratings: RatingsMap,
): string {
  if (ranked.length < 2) return 'Add at least two options to compare.'

  const [winner, runnerUp] = ranked
  const margin = winner.score100 - runnerUp.score100
  const leads = getCriterionLeads(winner.id, runnerUp.id, criteria, ratings)
  const top = leads[0]

  if (margin === 0) {
    return `${winner.name} and ${runnerUp.name} are tied at ${winner.score100}/100. Try adjusting weights or ratings on ${top.criterion.name} to break the tie.`
  }

  if (top.weightedLead > 0) {
    return `${winner.name} wins with ${winner.score100}/100 — ${margin} point${margin === 1 ? '' : 's'} ahead of ${runnerUp.name}. The biggest edge came from ${top.criterion.name} (${top.winnerRating} vs ${top.runnerRating}${top.criterion.weight > 1 ? `, weight ×${top.criterion.weight}` : ''}).`
  }

  return `${winner.name} wins with ${winner.score100}/100 — ${margin} point${margin === 1 ? '' : 's'} ahead of ${runnerUp.name}. Scores were close across criteria; small rating differences added up.`
}

export function formatSummary(
  ranked: ScoredOption[],
  criteria: Criterion[],
  insight: string,
  ratings?: RatingsMap,
): string {
  const lines = [
    'Daygrain Decide summary',
    '',
    ...ranked.map((o, i) => `${i + 1}. ${o.name} — ${o.score100}/100`),
    '',
    `Criteria: ${criteria.map((c) => `${c.name} (weight ${c.weight})`).join(', ')}`,
  ]

  if (ratings && ranked.length) {
    lines.push('', 'Ratings (1–5):')
    for (const option of ranked) {
      const cells = criteria.map((c) => {
        const value = ratings[option.id]?.[c.id] ?? MIN_FALLBACK
        return `${c.name}=${value}`
      })
      lines.push(`  ${option.name}: ${cells.join(', ')}`)
    }
  }

  lines.push('', insight, '', 'https://getdaygrain.com/decide')
  return lines.join('\n')
}
