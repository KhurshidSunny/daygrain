export type Delimiter = ',' | ';' | '\t'

export interface ParsedTable {
  headers: string[]
  rows: string[][]
  delimiter: Delimiter
  truncated: boolean
}

const MISSING = /^(null|na|n\/a|none|undefined|-)?$/i

export function isMissing(value: string): boolean {
  return MISSING.test(value.trim())
}

function detectDelimiter(firstLine: string): Delimiter {
  const counts: Record<Delimiter, number> = {
    ',': countUnquoted(firstLine, ','),
    ';': countUnquoted(firstLine, ';'),
    '\t': countUnquoted(firstLine, '\t'),
  }
  const ranked = (Object.entries(counts) as [Delimiter, number][]).sort((a, b) => b[1] - a[1])
  return ranked[0][1] > 0 ? ranked[0][0] : ','
}

function countUnquoted(line: string, char: string): number {
  let count = 0
  let quoted = false
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i]
    if (c === '"') {
      quoted = !quoted
      continue
    }
    if (!quoted && c === char) count += 1
  }
  return count
}

function parseLine(line: string, delimiter: Delimiter): string[] {
  const cells: string[] = []
  let current = ''
  let quoted = false

  for (let i = 0; i < line.length; i += 1) {
    const c = line[i]
    if (quoted) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i += 1
        } else {
          quoted = false
        }
      } else {
        current += c
      }
      continue
    }

    if (c === '"') {
      quoted = true
      continue
    }
    if (c === delimiter) {
      cells.push(current)
      current = ''
      continue
    }
    current += c
  }

  cells.push(current)
  return cells
}

function splitRecords(text: string): string[] {
  const records: string[] = []
  let current = ''
  let quoted = false

  for (let i = 0; i < text.length; i += 1) {
    const c = text[i]
    if (c === '"') {
      quoted = !quoted
      current += c
      continue
    }
    if (!quoted && (c === '\n' || c === '\r')) {
      if (c === '\r' && text[i + 1] === '\n') i += 1
      records.push(current)
      current = ''
      continue
    }
    current += c
  }

  if (current.length) records.push(current)
  return records.filter((line, index) => line.length > 0 || index === 0)
}

function uniqueHeaders(raw: string[]): string[] {
  const seen = new Map<string, number>()
  return raw.map((name, index) => {
    const base = name.trim() || `column_${index + 1}`
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}_${count + 1}`
  })
}

export function parseCsv(text: string, maxRows: number): ParsedTable {
  const cleaned = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const records = splitRecords(cleaned)
  if (!records.length) {
    return { headers: [], rows: [], delimiter: ',', truncated: false }
  }

  const delimiter = detectDelimiter(records[0])
  const headers = uniqueHeaders(parseLine(records[0], delimiter))
  const width = headers.length
  const rows: string[][] = []
  let truncated = false

  for (let i = 1; i < records.length; i += 1) {
    if (rows.length >= maxRows) {
      truncated = true
      break
    }
    const parsed = parseLine(records[i], delimiter)
    const row = Array.from({ length: width }, (_, col) => (parsed[col] ?? '').trim())
    rows.push(row)
  }

  return { headers, rows, delimiter, truncated }
}

export function toCsv(headers: string[], rows: string[][]): string {
  const escape = (value: string) => {
    if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
    return value
  }
  const lines = [headers.map(escape).join(',')]
  for (const row of rows) {
    lines.push(row.map((cell) => escape(cell ?? '')).join(','))
  }
  return `${lines.join('\n')}\n`
}

export function downloadText(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
