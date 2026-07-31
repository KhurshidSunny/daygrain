import { CheckCircle2, Coffee, RotateCcw } from 'lucide-react'

interface CompleteScreenProps {
  task: string
  durationMinutes: number
  onBreak: () => void
  onAgain: () => void
  onDone: () => void
}

export function CompleteScreen({
  task,
  durationMinutes,
  onBreak,
  onAgain,
  onDone,
}: CompleteScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream px-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Session complete"
    >
      <div className="w-full max-w-md text-center">
        <CheckCircle2
          className="mx-auto h-14 w-14 text-sage sm:h-16 sm:w-16"
          strokeWidth={1.5}
          aria-hidden
        />
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
          Session complete
        </h2>
        <p className="mt-3 text-sm leading-7 text-charcoal-muted sm:text-base">
          You focused on <span className="font-semibold text-charcoal">&ldquo;{task}&rdquo;</span>{' '}
          for {durationMinutes} minutes.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onBreak}
            className="btn-start inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base"
          >
            <Coffee className="h-5 w-5" />
            5 min break
          </button>
          <button
            type="button"
            onClick={onAgain}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sage/30 bg-white px-6 py-3.5 text-base font-semibold text-sage transition-colors hover:bg-sage/5"
          >
            <RotateCcw className="h-5 w-5" />
            Focus again
          </button>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="mt-6 text-sm text-charcoal-muted underline-offset-2 transition-colors hover:text-sage hover:underline"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
