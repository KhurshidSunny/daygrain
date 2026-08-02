import { BRAND } from '../brand/theme'
import { CopyActions } from '../components/colors/CopyActions'
import { CodeSnippets } from '../components/colors/CodeSnippets'
import { PalettePreview } from '../components/colors/PalettePreview'
import { SwatchGrid } from '../components/colors/SwatchGrid'
import { AppHero } from '../components/layout/AppHero'
import { PageHelmet } from '../components/seo/PageHelmet'
import { homeMeta, jsonLdFaq, jsonLdWebApp } from '../data/seo'
import { useDailyPalette } from '../hooks/useDailyPalette'
import { formatLongDate } from '../lib/day'

export function HomePage() {
  const { palette, isToday, shuffle, restoreToday, total } = useDailyPalette()

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

        <p className="mt-4 text-center text-xs text-charcoal-muted">
          {isToday ? 'Today’s palette' : 'Shuffled palette'} · {formatLongDate()}
        </p>

        <section className="colors-card mx-auto mt-6 animate-fade-in sm:mt-8" aria-label="Daily palette">
          <div className="mb-5 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">Mood board</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
              {palette.name}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-charcoal-muted">{palette.mood}</p>
          </div>

          <SwatchGrid colors={palette.colors} />

          <div className="mt-6">
            <CopyActions
              palette={palette}
              isToday={isToday}
              onShuffle={shuffle}
              onToday={restoreToday}
            />
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PalettePreview palette={palette} />
          <CodeSnippets palette={palette} />
        </div>

        <article id="how-it-works" className="prose-daygrain mt-14 border-t border-sage/10 pt-12 text-left sm:mt-16">
          <h2>Daily color palette of the day — free inspiration</h2>
          <p>
            <strong>Daygrain Colors</strong> is a free online color palette of the day. Each
            day brings three harmonious colors with a mood name—plus one-click copy for HEX,
            CSS variables, and Tailwind-style snippets. No account, no overwhelm.
          </p>
          <h3>How it works</h3>
          <ol>
            <li>Open the page to see today&apos;s curated mood board.</li>
            <li>Tap any swatch to copy its HEX code.</li>
            <li>Copy CSS or Tailwind snippets for your project.</li>
            <li>Shuffle for another set, or return to today&apos;s palette anytime.</li>
          </ol>
          <h3>Why a daily palette?</h3>
          <p>
            Big palette generators are powerful but noisy. If you search for{' '}
            <em>color palette of the day</em>, <em>daily color inspiration</em>, or a simple{' '}
            <em>color scheme generator</em>, Daygrain Colors gives you one clear trio—chosen
            from {total}+ curated sets—so you can ship a landing page, story, or UI without
            decision fatigue.
          </p>
          <h3>Privacy</h3>
          <p>
            Shuffle preference can stay in this browser&apos;s localStorage for the day. We
            don&apos;t require an account and we don&apos;t upload your colors.
          </p>
        </article>
      </div>
    </>
  )
}
