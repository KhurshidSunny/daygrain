import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadSessions, type FocusSession } from '../../lib/storage'

function formatWhen(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function RecentSessions() {
  const [sessions, setSessions] = useState<FocusSession[]>([])

  useEffect(() => {
    setSessions(loadSessions())
  }, [])

  if (sessions.length === 0) return null

  return (
    <section className="mt-10 w-full" aria-labelledby="recent-heading">
      <h2
        id="recent-heading"
        className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-charcoal-muted"
      >
        <Clock className="h-4 w-4 text-sage" aria-hidden />
        Recent focus sessions
      </h2>
      <ul className="mx-auto max-w-md space-y-2 text-left">
        {sessions.map((s, i) => (
          <li
            key={`${s.completedAt}-${i}`}
            className="flex items-start justify-between gap-3 rounded-xl border border-sage/10 bg-white px-4 py-3 text-sm shadow-sm"
          >
            <span className="min-w-0 flex-1 truncate font-medium text-charcoal">{s.task}</span>
            <span className="shrink-0 text-xs text-charcoal-muted">
              {s.durationMinutes}m · {formatWhen(s.completedAt)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-xs text-charcoal-muted/70">Stored only on this device</p>
    </section>
  )
}
