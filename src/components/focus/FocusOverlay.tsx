import { Pause, Play, X } from 'lucide-react'
import { useEffect } from 'react'
import { BREAK_MINUTES } from '../../brand/theme'
import type { TimerPhase } from '../../hooks/useFocusTimer'
import { formatTimer } from '../../lib/formatTime'
import { FocusRing } from './FocusRing'

interface FocusOverlayProps {
  phase: TimerPhase
  task: string
  remainingSeconds: number
  progress: number
  pausedByVisibility: boolean
  onPause: () => void
  onResume: () => void
  onEnd: () => void
}

export function FocusOverlay({
  phase,
  task,
  remainingSeconds,
  progress,
  pausedByVisibility,
  onPause,
  onResume,
  onEnd,
}: FocusOverlayProps) {
  const isBreak = phase === 'break'
  const isPaused = phase === 'paused'
  const label = isBreak ? 'Break' : task

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (isPaused) onResume()
        else if (!isBreak) onPause()
      }
      if (e.code === 'Escape') {
        if (window.confirm('End this session?')) onEnd()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isBreak, isPaused, onEnd, onPause, onResume])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-sage-deep via-sage-dark to-[#152a20] text-cream animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={isBreak ? 'Break timer' : 'Focus session'}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-sage-light/80">
          Daygrain Focus
        </span>
        <button
          type="button"
          onClick={onEnd}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-cream/75 transition-colors hover:bg-white/10 hover:text-cream"
          aria-label="End session"
        >
          <X className="h-4 w-4" />
          End
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        {pausedByVisibility && isPaused && (
          <p className="mb-4 rounded-full bg-white/10 px-4 py-1.5 text-sm text-sage-light">
            Paused — tab switched
          </p>
        )}

        <p className="mb-6 max-w-md text-center text-lg font-medium text-cream/95 sm:mb-8 sm:text-xl">
          {isBreak ? 'Take a short break' : label}
        </p>

        <div className="relative flex items-center justify-center">
          <FocusRing progress={progress} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-mono text-6xl font-light tabular-nums tracking-tight sm:text-7xl"
              aria-live="polite"
              aria-atomic="true"
            >
              {formatTimer(remainingSeconds)}
            </span>
            <span className="mt-2 text-sm text-sage-light/75">
              {isBreak ? `${BREAK_MINUTES} min break` : 'Stay on this task'}
            </span>
          </div>
        </div>

        <div className="mt-10 flex gap-3 sm:mt-12">
          {!isBreak &&
            (isPaused ? (
              <button type="button" onClick={onResume} className="btn-focus-primary">
                <Play className="h-5 w-5 fill-current" />
                Resume
              </button>
            ) : (
              <button type="button" onClick={onPause} className="btn-focus-secondary">
                <Pause className="h-5 w-5" />
                Pause
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
