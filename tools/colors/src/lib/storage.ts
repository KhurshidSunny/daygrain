import { STORAGE_KEY } from '../brand/theme'

export type ShuffleState = {
  dateKey: string
  index: number
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function loadShuffle(): ShuffleState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ShuffleState
    if (parsed.dateKey !== todayKey()) return null
    if (typeof parsed.index !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

export function saveShuffle(index: number): void {
  const payload: ShuffleState = { dateKey: todayKey(), index }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function clearShuffle(): void {
  localStorage.removeItem(STORAGE_KEY)
}
