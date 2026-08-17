import { HISTOGRAM_BINS } from '../brand/theme'
import { isMissing } from './csv'

export type ColumnKind = 'number' | 'boolean' | 'date' | 'category' | 'text'

export interface HistogramBin {
  label: string
  count: number
}

export interface ColumnProfile {
  name: string
  index: number
  kind: ColumnKind
  missing: number
  missingPct: number
  unique: number
  min?: number
  max?: number
  mean?: number
  median?: number
  std?: number
  outliers?: number
  topValues: { value: string; count: number }[]
  bins: HistogramBin[]
  mixedHint: boolean
}

export interface QualityIssue {
  level: 'warn' | 'info'
  title: string
  detail: string
}

export interface TableProfile {
  rowCount: number
  columnCount: number
  completeness: number
  duplicateRows: number
  emptyRows: number
  columns: ColumnProfile[]
  issues: QualityIssue[]
}

const BOOL = /^(true|false|yes|no|0|1)$/i
const INT = /^[+-]?\d+$/
const FLOAT = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i
const DATE = /^\d{4}-\d{2}-\d{2}(?:[ t]\d{2}:\d{2}(?::\d{2})?)?$/i

function parseNumber(value: string): number | null {
  const trimmed = value.trim().replace(/,/g, '')
  if (!FLOAT.test(trimmed) && !INT.test(trimmed)) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

function quantile(sorted: number[], q: number): number {
  if (!sorted.length) return 0
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  const next = sorted[base + 1]
  if (next === undefined) return sorted[base]
  return sorted[base] + rest * (next - sorted[base])
}

function inferKind(values: string[]): { kind: ColumnKind; mixedHint: boolean } {
  let numbers = 0
  let booleans = 0
  let dates = 0
  let texts = 0

  for (const raw of values) {
    if (isMissing(raw)) continue
    const value = raw.trim()
    if (BOOL.test(value)) {
      booleans += 1
      continue
    }
    if (DATE.test(value) && !Number.isNaN(Date.parse(value))) {
      dates += 1
      continue
    }
    if (parseNumber(value) !== null) {
      numbers += 1
      continue
    }
    texts += 1
  }

  const filled = numbers + booleans + dates + texts
  if (!filled) return { kind: 'text', mixedHint: false }

  const share = (n: number) => n / filled
  if (share(numbers) >= 0.9) return { kind: 'number', mixedHint: texts > 0 }
  if (share(booleans) >= 0.9) return { kind: 'boolean', mixedHint: false }
  if (share(dates) >= 0.9) return { kind: 'date', mixedHint: false }

  const unique = new Set(values.filter((v) => !isMissing(v))).size
  if (unique <= 24 || unique / filled <= 0.35) {
    return { kind: 'category', mixedHint: share(numbers) > 0.15 && share(texts) > 0.15 }
  }
  return { kind: 'text', mixedHint: false }
}

function numericStats(values: string[]) {
  const nums = values
    .map(parseNumber)
    .filter((n): n is number => n !== null)
    .sort((a, b) => a - b)

  if (!nums.length) return null

  const sum = nums.reduce((acc, n) => acc + n, 0)
  const mean = sum / nums.length
  const variance = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0) / nums.length
  const q1 = quantile(nums, 0.25)
  const q3 = quantile(nums, 0.75)
  const iqr = q3 - q1
  const low = q1 - 1.5 * iqr
  const high = q3 + 1.5 * iqr
  const outliers = iqr === 0 ? 0 : nums.filter((n) => n < low || n > high).length

  const min = nums[0]
  const max = nums[nums.length - 1]
  const span = max - min || 1
  const bins: HistogramBin[] = Array.from({ length: HISTOGRAM_BINS }, (_, i) => {
    const start = min + (span * i) / HISTOGRAM_BINS
    const end = min + (span * (i + 1)) / HISTOGRAM_BINS
    return {
      label: `${formatCompact(start)}–${formatCompact(end)}`,
      count: 0,
    }
  })
  for (const n of nums) {
    const idx = Math.min(HISTOGRAM_BINS - 1, Math.floor(((n - min) / span) * HISTOGRAM_BINS))
    bins[idx].count += 1
  }

  return {
    min,
    max,
    mean,
    median: quantile(nums, 0.5),
    std: Math.sqrt(variance),
    outliers,
    bins,
  }
}

function formatCompact(n: number): string {
  if (Math.abs(n) >= 100 || Number.isInteger(n)) return String(Math.round(n))
  return n.toFixed(1)
}

function topValues(values: string[], limit = 8) {
  const counts = new Map<string, number>()
  for (const raw of values) {
    if (isMissing(raw)) continue
    const key = raw.trim()
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }))
}

function categoryBins(values: string[]): HistogramBin[] {
  return topValues(values, 8).map((item) => ({
    label: item.value.length > 18 ? `${item.value.slice(0, 16)}…` : item.value,
    count: item.count,
  }))
}

export function profileTable(headers: string[], rows: string[][]): TableProfile {
  const rowCount = rows.length
  const columnCount = headers.length
  let missingCells = 0
  let emptyRows = 0
  const rowKeys = new Map<string, number>()

  for (const row of rows) {
    if (row.every((cell) => isMissing(cell))) emptyRows += 1
    const key = row.join('\u0001')
    rowKeys.set(key, (rowKeys.get(key) ?? 0) + 1)
    for (const cell of row) {
      if (isMissing(cell)) missingCells += 1
    }
  }

  const duplicateRows = [...rowKeys.values()].reduce((acc, n) => acc + Math.max(0, n - 1), 0)
  const totalCells = Math.max(1, rowCount * columnCount)
  const completeness = 1 - missingCells / totalCells

  const columns = headers.map((name, index) => {
    const values = rows.map((row) => row[index] ?? '')
    const missing = values.filter(isMissing).length
    const filled = values.filter((v) => !isMissing(v))
    const unique = new Set(filled).size
    const { kind, mixedHint } = inferKind(values)
    const stats = kind === 'number' ? numericStats(values) : null

    return {
      name,
      index,
      kind,
      missing,
      missingPct: rowCount ? missing / rowCount : 0,
      unique,
      min: stats?.min,
      max: stats?.max,
      mean: stats?.mean,
      median: stats?.median,
      std: stats?.std,
      outliers: stats?.outliers,
      topValues: topValues(values),
      bins: stats?.bins ?? categoryBins(values),
      mixedHint,
    } satisfies ColumnProfile
  })

  const issues: QualityIssue[] = []
  if (duplicateRows) {
    issues.push({
      level: 'warn',
      title: `${duplicateRows} duplicate row${duplicateRows === 1 ? '' : 's'}`,
      detail: 'Repeated records inflate counts. Drop duplicates if they are copies, not real repeats.',
    })
  }
  if (emptyRows) {
    issues.push({
      level: 'warn',
      title: `${emptyRows} empty row${emptyRows === 1 ? '' : 's'}`,
      detail: 'Rows with no values can be dropped.',
    })
  }
  for (const col of columns) {
    if (col.missingPct >= 0.2) {
      issues.push({
        level: 'warn',
        title: `${col.name} is ${Math.round(col.missingPct * 100)}% missing`,
        detail: 'High missingness biases summaries. Fill, drop, or flag the column.',
      })
    }
    if (col.mixedHint) {
      issues.push({
        level: 'info',
        title: `${col.name} looks mixed-type`,
        detail: 'Numbers and text in one field usually mean a parsing or encoding issue.',
      })
    }
    if ((col.outliers ?? 0) > 0) {
      issues.push({
        level: 'info',
        title: `${col.name} has ${col.outliers} IQR outlier${col.outliers === 1 ? '' : 's'}`,
        detail: 'Check whether extremes are errors or rare but valid values.',
      })
    }
    if (rowCount && col.unique === 1 && col.missing < rowCount) {
      issues.push({
        level: 'info',
        title: `${col.name} is constant`,
        detail: 'A single unique value rarely adds information.',
      })
    }
  }
  if (!issues.length) {
    issues.push({
      level: 'info',
      title: 'No major quality flags',
      detail: 'Still scan distributions — clean data can hide skewed columns.',
    })
  }

  return {
    rowCount,
    columnCount,
    completeness,
    duplicateRows,
    emptyRows,
    columns,
    issues,
  }
}

export function formatPct(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function formatNumber(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return '—'
  if (Math.abs(value) >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 1 })
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(2)
}
