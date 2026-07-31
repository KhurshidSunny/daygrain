import { STORAGE_KEY } from '../brand/theme'
import type { Criterion, OptionItem, RatingsMap } from './score'

export interface SavedDecision {
  options: OptionItem[]
  criteria: Criterion[]
  ratings: RatingsMap
  savedAt: string
}

export function loadLastDecision(): SavedDecision | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SavedDecision
    if (!parsed?.options?.length || !parsed?.criteria?.length) return null
    return parsed
  } catch {
    return null
  }
}

export function saveLastDecision(data: Omit<SavedDecision, 'savedAt'>): void {
  const payload: SavedDecision = {
    ...data,
    savedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function clearLastDecision(): void {
  localStorage.removeItem(STORAGE_KEY)
}
