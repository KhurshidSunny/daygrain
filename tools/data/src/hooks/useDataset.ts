import { useCallback, useMemo, useState } from 'react'
import { MAX_FILE_BYTES, MAX_ROWS } from '../brand/theme'
import { SAMPLE_FILES, type SampleFile } from '../data/samples'
import { applyClean, qualityReport, type CleanAction } from '../lib/clean'
import { downloadText, parseCsv, toCsv } from '../lib/csv'
import { profileTable } from '../lib/profile'

export function useDataset() {
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])
  const [sourceName, setSourceName] = useState('')
  const [error, setError] = useState('')
  const [truncated, setTruncated] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [previewPage, setPreviewPage] = useState(0)

  const profile = useMemo(() => {
    if (!headers.length) return null
    return profileTable(headers, rows)
  }, [headers, rows])

  const loadParsed = useCallback((text: string, name: string) => {
    const parsed = parseCsv(text, MAX_ROWS)
    if (!parsed.headers.length) {
      setError('No header row found. Check that the file is a CSV.')
      return false
    }
    if (!parsed.rows.length) {
      setError('The file has headers but no data rows.')
      return false
    }
    setHeaders(parsed.headers)
    setRows(parsed.rows)
    setSourceName(name)
    setTruncated(parsed.truncated)
    setSelectedIndex(0)
    setPreviewPage(0)
    setError('')
    return true
  }, [])

  const loadFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_BYTES) {
        setError('File is over 5 MB. Split it or export a smaller CSV.')
        return false
      }
      const text = await file.text()
      return loadParsed(text, file.name)
    },
    [loadParsed],
  )

  const loadSample = useCallback(
    (sample: SampleFile) => loadParsed(sample.csv, sample.filename),
    [loadParsed],
  )

  const loadText = useCallback(
    (text: string) => loadParsed(text, 'pasted.csv'),
    [loadParsed],
  )

  const runClean = useCallback(
    (action: CleanAction) => {
      if (!profile) return
      setRows((prev) => applyClean(prev, profile, action))
      setPreviewPage(0)
    },
    [profile],
  )

  const removeColumn = useCallback((index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index))
    setRows((prev) => prev.map((row) => row.filter((_, i) => i !== index)))
    setSelectedIndex(0)
    setPreviewPage(0)
  }, [])

  const reset = useCallback(() => {
    setHeaders([])
    setRows([])
    setSourceName('')
    setError('')
    setTruncated(false)
    setSelectedIndex(0)
    setPreviewPage(0)
  }, [])

  const exportCsv = useCallback(() => {
    const name = sourceName.replace(/\.csv$/i, '') || 'dataset'
    downloadText(`${name}-clean.csv`, toCsv(headers, rows), 'text/csv')
  }, [headers, rows, sourceName])

  const exportReport = useCallback(() => {
    if (!profile) return
    const name = sourceName.replace(/\.csv$/i, '') || 'dataset'
    downloadText(`${name}-quality-report.txt`, qualityReport(sourceName, profile))
  }, [profile, sourceName])

  const copyReport = useCallback(async () => {
    if (!profile) return false
    try {
      await navigator.clipboard.writeText(qualityReport(sourceName, profile))
      return true
    } catch {
      return false
    }
  }, [profile, sourceName])

  return {
    headers,
    rows,
    sourceName,
    error,
    truncated,
    selectedIndex,
    previewPage,
    profile,
    samples: SAMPLE_FILES,
    loaded: headers.length > 0,
    setSelectedIndex,
    setPreviewPage,
    loadFile,
    loadSample,
    loadText,
    runClean,
    removeColumn,
    reset,
    exportCsv,
    exportReport,
    copyReport,
  }
}
