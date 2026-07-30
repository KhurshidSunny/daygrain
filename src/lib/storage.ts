import { MAX_RECENT_SESSIONS, STORAGE_KEY } from '../brand/theme'

export interface FocusSession {
  task: string
  durationMinutes: number
  completedAt: string
}

export function loadSessions(): FocusSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as FocusSession[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveSession(session: FocusSession): void {
  const existing = loadSessions()
  const next = [session, ...existing].slice(0, MAX_RECENT_SESSIONS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
