import { useCallback, useEffect, useRef, useState } from 'react'
import type { DurationMinutes } from '../brand/theme'
import { BREAK_MINUTES } from '../brand/theme'
import { formatTimer } from '../lib/formatTime'
import { playCompletionChime } from '../lib/sounds'
import { saveSession } from '../lib/storage'

export type TimerPhase = 'idle' | 'focus' | 'paused' | 'break' | 'complete'

interface UseFocusTimerOptions {
  onPhaseChange?: (phase: TimerPhase) => void
}

export function useFocusTimer({ onPhaseChange }: UseFocusTimerOptions = {}) {
  const [phase, setPhase] = useState<TimerPhase>('idle')
  const [task, setTask] = useState('')
  const [durationMinutes, setDurationMinutes] = useState<DurationMinutes>(25)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [pausedByVisibility, setPausedByVisibility] = useState(false)
  const endAtRef = useRef<number | null>(null)
  const phaseRef = useRef(phase)

  phaseRef.current = phase

  const setPhaseSafe = useCallback(
    (next: TimerPhase) => {
      setPhase(next)
      onPhaseChange?.(next)
    },
    [onPhaseChange],
  )

  const syncRemaining = useCallback(() => {
    if (!endAtRef.current) return
    const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000))
    setRemainingSeconds(left)
    if (left <= 0) {
      endAtRef.current = null
      const current = phaseRef.current
      if (current === 'focus' || current === 'paused') {
        void playCompletionChime()
        saveSession({
          task: task.trim(),
          durationMinutes,
          completedAt: new Date().toISOString(),
        })
        setPhaseSafe('complete')
      } else if (current === 'break') {
        void playCompletionChime()
        setPhaseSafe('idle')
      }
    }
  }, [durationMinutes, setPhaseSafe, task])

  useEffect(() => {
    if (phase !== 'focus' && phase !== 'break' && phase !== 'paused') return
    syncRemaining()
    const id = window.setInterval(syncRemaining, 250)
    return () => clearInterval(id)
  }, [phase, syncRemaining])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && phaseRef.current === 'focus') {
        setPhaseSafe('paused')
        setPausedByVisibility(true)
        if (endAtRef.current) {
          const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000))
          setRemainingSeconds(left)
          endAtRef.current = null
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [setPhaseSafe])

  useEffect(() => {
    if (phase === 'focus' || phase === 'break') {
      const label = phase === 'break' ? 'Break' : task.trim() || 'Focus'
      document.title = `🔴 ${formatTimer(remainingSeconds)} — ${label} | Daygrain Focus`
    } else if (phase === 'paused') {
      document.title = `⏸ ${formatTimer(remainingSeconds)} — Paused | Daygrain Focus`
    } else {
      document.title = 'Daygrain Focus — Free Online Study & Focus Timer'
    }
    return () => {
      document.title = 'Daygrain Focus — Free Online Study & Focus Timer'
    }
  }, [phase, remainingSeconds, task])

  const startFocus = useCallback(() => {
    const trimmed = task.trim()
    if (!trimmed) return false
    const total = durationMinutes * 60
    setRemainingSeconds(total)
    endAtRef.current = Date.now() + total * 1000
    setPausedByVisibility(false)
    setPhaseSafe('focus')
    return true
  }, [durationMinutes, setPhaseSafe, task])

  const pause = useCallback(() => {
    if (phase !== 'focus') return
    if (endAtRef.current) {
      const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000))
      setRemainingSeconds(left)
      endAtRef.current = null
    }
    setPhaseSafe('paused')
  }, [phase, setPhaseSafe])

  const resume = useCallback(() => {
    if (phase !== 'paused' || remainingSeconds <= 0) return
    endAtRef.current = Date.now() + remainingSeconds * 1000
    setPausedByVisibility(false)
    setPhaseSafe('focus')
  }, [phase, remainingSeconds, setPhaseSafe])

  const startBreak = useCallback(() => {
    const total = BREAK_MINUTES * 60
    setRemainingSeconds(total)
    endAtRef.current = Date.now() + total * 1000
    setPhaseSafe('break')
  }, [setPhaseSafe])

  const endSession = useCallback(() => {
    endAtRef.current = null
    setRemainingSeconds(0)
    setPhaseSafe('idle')
    setPausedByVisibility(false)
  }, [setPhaseSafe])

  const resetToIdle = useCallback(
    (keepTask = true) => {
      endAtRef.current = null
      setRemainingSeconds(0)
      setPhaseSafe('idle')
      setPausedByVisibility(false)
      if (!keepTask) setTask('')
    },
    [setPhaseSafe],
  )

  const restartFocus = useCallback(() => {
    const trimmed = task.trim()
    if (!trimmed) return false
    const total = durationMinutes * 60
    setRemainingSeconds(total)
    endAtRef.current = Date.now() + total * 1000
    setPausedByVisibility(false)
    setPhaseSafe('focus')
    return true
  }, [durationMinutes, setPhaseSafe, task])

  const progress =
    phase === 'focus' || phase === 'paused'
      ? 1 - remainingSeconds / (durationMinutes * 60)
      : phase === 'break'
        ? 1 - remainingSeconds / (BREAK_MINUTES * 60)
        : 0

  return {
    phase,
    task,
    setTask,
    durationMinutes,
    setDurationMinutes,
    remainingSeconds,
    pausedByVisibility,
    progress: Math.min(1, Math.max(0, progress)),
    startFocus,
    pause,
    resume,
    startBreak,
    endSession,
    resetToIdle,
    restartFocus,
  }
}
