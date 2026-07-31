import { useCallback, useMemo, useState } from 'react'
import {
  CRITERIA_COUNT,
  MAX_OPTIONS,
  MAX_RATING,
  MIN_OPTIONS,
  MIN_RATING,
} from '../brand/theme'
import {
  buildInsight,
  createId,
  formatSummary,
  scoreOptions,
  type Criterion,
  type OptionItem,
  type RatingsMap,
} from '../lib/score'
import { loadLastDecision, saveLastDecision } from '../lib/storage'

function blankRatings(options: OptionItem[], criteria: Criterion[]): RatingsMap {
  const map: RatingsMap = {}
  for (const option of options) {
    map[option.id] = {}
    for (const criterion of criteria) {
      map[option.id][criterion.id] = 3
    }
  }
  return map
}

function defaultState() {
  const options: OptionItem[] = [
    { id: createId('opt'), name: '' },
    { id: createId('opt'), name: '' },
  ]
  const criteria: Criterion[] = [
    { id: createId('crit'), name: 'Pay', weight: 1 },
    { id: createId('crit'), name: 'Happiness', weight: 1 },
    { id: createId('crit'), name: 'Growth', weight: 1 },
  ]
  return {
    options,
    criteria,
    ratings: blankRatings(options, criteria),
    showResults: false,
  }
}

export function useDecision() {
  const initial = defaultState()
  const [options, setOptions] = useState<OptionItem[]>(initial.options)
  const [criteria, setCriteria] = useState<Criterion[]>(initial.criteria)
  const [ratings, setRatings] = useState<RatingsMap>(initial.ratings)
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const namedOptions = useMemo(
    () => options.filter((o) => o.name.trim().length > 0),
    [options],
  )

  const namedCriteria = useMemo(
    () => criteria.filter((c) => c.name.trim().length > 0),
    [criteria],
  )

  const canScore =
    namedOptions.length >= MIN_OPTIONS && namedCriteria.length === CRITERIA_COUNT

  const ranked = useMemo(() => {
    if (!canScore) return []
    return scoreOptions(namedOptions, namedCriteria, ratings)
  }, [canScore, namedCriteria, namedOptions, ratings])

  const insight = useMemo(
    () => (ranked.length ? buildInsight(ranked, namedCriteria, ratings) : ''),
    [namedCriteria, ranked, ratings],
  )

  const addOption = useCallback(() => {
    setOptions((prev) => {
      if (prev.length >= MAX_OPTIONS) return prev
      const next = [...prev, { id: createId('opt'), name: '' }]
      setRatings((r) => {
        const copy = { ...r }
        copy[next[next.length - 1].id] = Object.fromEntries(
          criteria.map((c) => [c.id, 3]),
        )
        return copy
      })
      return next
    })
    setShowResults(false)
  }, [criteria])

  const removeOption = useCallback((id: string) => {
    setOptions((prev) => {
      if (prev.length <= MIN_OPTIONS) return prev
      return prev.filter((o) => o.id !== id)
    })
    setRatings((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
    setShowResults(false)
  }, [])

  const setOptionName = useCallback((id: string, name: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)))
    setShowResults(false)
  }, [])

  const setCriterionName = useCallback((id: string, name: string) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)))
    setShowResults(false)
  }, [])

  const setCriterionWeight = useCallback((id: string, weight: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, weight: Math.max(1, Math.min(5, weight)) } : c)),
    )
    setShowResults(false)
  }, [])

  const applyPreset = useCallback((id: string, name: string) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)))
    setShowResults(false)
  }, [])

  const setRating = useCallback((optionId: string, criterionId: string, value: number) => {
    const clamped = Math.max(MIN_RATING, Math.min(MAX_RATING, value))
    setRatings((prev) => ({
      ...prev,
      [optionId]: {
        ...(prev[optionId] ?? {}),
        [criterionId]: clamped,
      },
    }))
    setShowResults(false)
  }, [])

  const calculate = useCallback(() => {
    if (!canScore) return false
    saveLastDecision({ options, criteria, ratings })
    setShowResults(true)
    return true
  }, [canScore, criteria, options, ratings])

  const reset = useCallback(() => {
    const next = defaultState()
    setOptions(next.options)
    setCriteria(next.criteria)
    setRatings(next.ratings)
    setShowResults(false)
    setCopied(false)
  }, [])

  const restoreLast = useCallback(() => {
    const saved = loadLastDecision()
    if (!saved) return false
    setOptions(saved.options)
    setCriteria(saved.criteria)
    setRatings(saved.ratings)
    setShowResults(true)
    return true
  }, [])

  const copySummary = useCallback(async () => {
    if (!ranked.length) return false
    const text = formatSummary(ranked, namedCriteria, insight, ratings)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
      return true
    } catch {
      return false
    }
  }, [insight, namedCriteria, ranked, ratings])

  return {
    options,
    criteria,
    ratings,
    showResults,
    copied,
    namedOptions,
    namedCriteria,
    canScore,
    ranked,
    insight,
    addOption,
    removeOption,
    setOptionName,
    setCriterionName,
    setCriterionWeight,
    applyPreset,
    setRating,
    calculate,
    reset,
    restoreLast,
    copySummary,
  }
}
