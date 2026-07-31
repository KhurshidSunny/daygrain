import { useEffect, useRef, useState } from 'react'
import { BRAND } from '../brand/theme'
import { CriteriaEditor } from '../components/decide/CriteriaEditor'
import { OptionsList } from '../components/decide/OptionsList'
import { RatingsGrid } from '../components/decide/RatingsGrid'
import { ResultsPanel } from '../components/decide/ResultsPanel'
import { AppHero } from '../components/layout/AppHero'
import { PageHelmet } from '../components/seo/PageHelmet'
import { homeMeta, jsonLdFaq, jsonLdWebApp } from '../data/seo'
import { useDecision } from '../hooks/useDecision'
import { loadLastDecision } from '../lib/storage'

export function HomePage() {
  const decision = useDecision()
  const [hasSaved, setHasSaved] = useState(false)
  const [formError, setFormError] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHasSaved(Boolean(loadLastDecision()))
  }, [decision.showResults])

  const handleCalculate = () => {
    if (!decision.canScore) {
      setFormError('Name at least two options and fill in all three criteria.')
      return
    }
    setFormError('')
    decision.calculate()
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleRestore = () => {
    if (decision.restoreLast()) {
      setFormError('')
      window.requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <>
      <PageHelmet
        title={homeMeta.title}
        description={homeMeta.description}
        keywords={homeMeta.keywords}
        jsonLd={[jsonLdWebApp, jsonLdFaq]}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />

        <AppHero displayName={BRAND.displayName} tagline={BRAND.heroTagline} accent={BRAND.product} />

        {hasSaved ? (
          <div className="mt-5 flex justify-center">
            <button type="button" onClick={handleRestore} className="btn-ghost text-xs">
              Restore last decision
            </button>
          </div>
        ) : null}

        <div className="decide-card mx-auto mt-8 space-y-8 sm:mt-10">
          <OptionsList
            options={decision.options}
            onChangeName={decision.setOptionName}
            onAdd={decision.addOption}
            onRemove={decision.removeOption}
          />

          <div className="border-t border-sage/10" />

          <CriteriaEditor
            criteria={decision.criteria}
            onChangeName={decision.setCriterionName}
            onChangeWeight={decision.setCriterionWeight}
            onApplyPreset={decision.applyPreset}
          />

          <div className="border-t border-sage/10" />

          <RatingsGrid
            options={decision.options}
            criteria={decision.criteria}
            ratings={decision.ratings}
            onChange={decision.setRating}
          />

          {formError ? (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleCalculate}
            disabled={!decision.canScore}
            className="btn-primary w-full"
          >
            See the winner
          </button>
          <p className="text-center text-xs text-charcoal-muted/70">
            Scores stay on this device · no account needed
          </p>
        </div>

        <div ref={resultsRef} className="mx-auto mt-6 max-w-3xl scroll-mt-24">
          {decision.showResults ? (
            <ResultsPanel
              ranked={decision.ranked}
              insight={decision.insight}
              criteria={decision.namedCriteria}
              ratings={decision.ratings}
              copied={decision.copied}
              onCopy={() => void decision.copySummary()}
              onReset={decision.reset}
            />
          ) : null}
        </div>

        <article id="how-it-works" className="prose-daygrain mt-14 border-t border-sage/10 pt-12 text-left sm:mt-16">
          <h2>Free online decision matrix — compare options in under a minute</h2>
          <p>
            <strong>Daygrain Decide</strong> is a free online decision matrix and pros/cons
            scorer. List 2–4 options, pick three criteria that matter, rate each option 1–5,
            and get a weighted winner—clearer than a random wheel, lighter than a spreadsheet.
          </p>
          <h3>How it works</h3>
          <ol>
            <li>Enter the choices you are stuck between (job offers, cities, plans).</li>
            <li>Set three criteria—use presets like Pay, Happiness, Growth, or write your own.</li>
            <li>Optionally raise the weight on what matters more.</li>
            <li>Rate every option, then tap <em>See the winner</em> for scores and a short insight.</li>
            <li>Copy the summary to share with a partner or save in your notes.</li>
          </ol>
          <h3>When to use a decision matrix</h3>
          <p>
            Search for a <em>decision matrix online free</em>, a{' '}
            <em>compare two job offers tool</em>, or a <em>pros cons calculator</em> when gut
            feel alone is not enough—and a full spreadsheet feels like overkill. Decide keeps
            the math simple so you finish in about a minute.
          </p>
          <h3>Privacy</h3>
          <p>
            Your last decision can stay in this browser&apos;s localStorage only. We don&apos;t
            require an account and we don&apos;t sync your ratings to a server.
          </p>
        </article>
      </div>
    </>
  )
}
