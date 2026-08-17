import { isMissing } from './csv'
import type { ColumnKind, TableProfile } from './profile'

export type CleanAction = 'trim' | 'dropEmpty' | 'dropDuplicates' | 'fillMissing'

function median(values: number[]): string {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const value = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  return Number.isInteger(value) ? String(value) : value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
}

function mode(values: string[]): string {
  const counts = new Map<string, number>()
  let best = values[0] ?? ''
  let bestCount = 0
  for (const value of values) {
    const next = (counts.get(value) ?? 0) + 1
    counts.set(value, next)
    if (next > bestCount) {
      best = value
      bestCount = next
    }
  }
  return best
}

function fillValue(kind: ColumnKind, filled: string[]): string {
  if (kind === 'number') {
    const nums = filled.map(Number).filter((n) => Number.isFinite(n))
    return nums.length ? median(nums) : '0'
  }
  if (!filled.length) return ''
  return mode(filled)
}

export function applyClean(
  rows: string[][],
  profile: TableProfile,
  action: CleanAction,
): string[][] {
  if (action === 'trim') {
    return rows.map((row) => row.map((cell) => cell.trim()))
  }

  if (action === 'dropEmpty') {
    return rows.filter((row) => row.some((cell) => !isMissing(cell)))
  }

  if (action === 'dropDuplicates') {
    const seen = new Set<string>()
    return rows.filter((row) => {
      const key = row.join('\u0001')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  const fills = profile.columns.map((col) => {
    const filled = rows.map((row) => row[col.index] ?? '').filter((cell) => !isMissing(cell))
    return fillValue(col.kind, filled)
  })

  return rows.map((row) =>
    row.map((cell, index) => (isMissing(cell) ? fills[index] : cell)),
  )
}

export function qualityReport(sourceName: string, profile: TableProfile): string {
  const lines = [
    'Daygrain Data — quality report',
    `Source: ${sourceName}`,
    `Rows: ${profile.rowCount}`,
    `Columns: ${profile.columnCount}`,
    `Completeness: ${Math.round(profile.completeness * 100)}%`,
    `Duplicate rows: ${profile.duplicateRows}`,
    `Empty rows: ${profile.emptyRows}`,
    '',
    'Columns',
  ]

  for (const col of profile.columns) {
    const extras =
      col.kind === 'number'
        ? `min=${col.min ?? '—'} max=${col.max ?? '—'} mean=${col.mean?.toFixed(2) ?? '—'} outliers=${col.outliers ?? 0}`
        : `top=${col.topValues.slice(0, 3).map((v) => v.value).join(' | ') || '—'}`
    lines.push(
      `- ${col.name} (${col.kind}): missing ${Math.round(col.missingPct * 100)}%, unique ${col.unique}, ${extras}`,
    )
  }

  lines.push('', 'Flags')
  for (const issue of profile.issues) {
    lines.push(`- [${issue.level}] ${issue.title} — ${issue.detail}`)
  }

  lines.push('', 'https://getdaygrain.com/data')
  return lines.join('\n')
}
