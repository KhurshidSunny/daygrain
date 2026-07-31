import { useCallback, useState } from 'react'
import { Target } from 'lucide-react'
import { BRAND } from '../brand/theme'
import { CompleteScreen } from '../components/focus/CompleteScreen'
import { DurationChips } from '../components/focus/DurationChips'
import { FocusOverlay } from '../components/focus/FocusOverlay'
import { RecentSessions } from '../components/focus/RecentSessions'
import { AppHero } from '../components/layout/AppHero'
import { PageHelmet } from '../components/seo/PageHelmet'
import { homeMeta, jsonLdFaq, jsonLdWebApp } from '../data/seo'
import { useFocusTimer } from '../hooks/useFocusTimer'

export function HomePage() {
  const [taskError, setTaskError] = useState(false)
  const [sessionsKey, setSessionsKey] = useState(0)

  const timer = useFocusTimer({
    onPhaseChange: (p) => {
      if (p === 'idle' || p === 'complete') setSessionsKey((k) => k + 1)
    },
  })

  const handleStart = useCallback(() => {
    const ok = timer.startFocus()
    if (!ok) {
      setTaskError(true)
      return
    }
    setTaskError(false)
  }, [timer])

  const showChrome = timer.phase === 'idle'
  const inFocus = timer.phase === 'focus' || timer.phase === 'paused' || timer.phase === 'break'
  const showComplete = timer.phase === 'complete'

  return (
    <>
      <PageHelmet
        title={homeMeta.title}
        description={homeMeta.description}
        keywords={homeMeta.keywords}
        jsonLd={[jsonLdWebApp, jsonLdFaq]}
      />

      {inFocus && (
        <FocusOverlay
          phase={timer.phase}
          task={timer.task}
          remainingSeconds={timer.remainingSeconds}
          progress={timer.progress}
          pausedByVisibility={timer.pausedByVisibility}
          onPause={timer.pause}
          onResume={timer.resume}
          onEnd={timer.endSession}
        />
      )}

      {showComplete && (
        <CompleteScreen
          task={timer.task}
          durationMinutes={timer.durationMinutes}
          onBreak={timer.startBreak}
          onAgain={() => timer.restartFocus()}
          onDone={() => timer.resetToIdle(true)}
        />
      )}

      {showChrome && (
        <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />

          <AppHero displayName={BRAND.displayName} tagline={BRAND.heroTagline} accent={BRAND.product} />

          <section className="focus-card mx-auto mt-8 max-w-lg sm:mt-10" aria-label="Start focus session">
            <label htmlFor="task-input" className="sr-only">
              Your one task
            </label>
            <div className="relative">
              <Target
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage/70"
                aria-hidden
              />
              <input
                id="task-input"
                type="text"
                value={timer.task}
                onChange={(e) => {
                  timer.setTask(e.target.value)
                  if (taskError) setTaskError(false)
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="What are you focusing on?"
                maxLength={120}
                autoComplete="off"
                autoFocus
                className={`task-input w-full rounded-xl border bg-white py-4 pl-12 pr-4 text-lg text-charcoal placeholder:text-charcoal-muted/45 ${
                  taskError
                    ? 'border-red-400 ring-2 ring-red-400/20'
                    : 'border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/15'
                }`}
              />
            </div>
            {taskError && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                Add a task before you start — one line is enough.
              </p>
            )}

            <p className="mt-6 mb-3 text-center text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
              Duration
            </p>
            <DurationChips value={timer.durationMinutes} onChange={timer.setDurationMinutes} />

            <button type="button" onClick={handleStart} className="btn-start mt-7 w-full">
              Start focus
            </button>
            <p className="mt-3 text-center text-xs text-charcoal-muted/70">Space to pause · Esc to end</p>
          </section>

          <RecentSessions key={sessionsKey} />

          <article id="how-it-works" className="prose-daygrain mt-14 border-t border-sage/10 pt-12 text-left sm:mt-16">
            <h2>Free online focus timer for study &amp; deep work</h2>
            <p>
              <strong>Daygrain Focus</strong> is a minimal online focus timer and Pomodoro-style
              study tool. Name one task, pick 12, 25, or 45 minutes, and work fullscreen until
              the chime—no projects, lists, or accounts.
            </p>
            <h3>How it works</h3>
            <ol>
              <li>Write one specific task (e.g. &ldquo;Review chapter 4 notes&rdquo;).</li>
              <li>Choose 12, 25, or 45 minutes.</li>
              <li>Focus fullscreen until the timer ends.</li>
              <li>Take an optional 5-minute break, then go again.</li>
            </ol>
            <h3>Why one task only?</h3>
            <p>
              Most focus apps became mini project managers. Daygrain Focus keeps only what
              helps you start: a single line, a timer, and a calm fullscreen view—ideal when
              you search for a <em>study focus tool online</em> or a{' '}
              <em>free pomodoro timer</em> without signup.
            </p>
            <h3>Privacy</h3>
            <p>
              Recent sessions stay in your browser&apos;s localStorage only. We don&apos;t run a
              server for your task list.
            </p>
          </article>
        </div>
      )}
    </>
  )
}
