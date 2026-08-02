import { BRAND } from '../brand/theme'
import { CodeSnippets } from '../components/colors/CodeSnippets'
import { ColorLibrary } from '../components/colors/ColorLibrary'
import { CopyActions } from '../components/colors/CopyActions'
import { PalettePreview } from '../components/colors/PalettePreview'
import { SwatchGrid } from '../components/colors/SwatchGrid'
import { AppHero } from '../components/layout/AppHero'
import { PageHelmet } from '../components/seo/PageHelmet'
import { COLOR_LIBRARY } from '../data/colorLibrary'
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

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />

        <div className="mx-auto max-w-3xl">
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
        </div>

        <div className="mt-10 sm:mt-12">
          <ColorLibrary />
        </div>

        <article
          id="how-it-works"
          className="prose-daygrain mx-auto mt-14 max-w-3xl border-t border-sage/10 pt-12 text-left sm:mt-16"
        >
          <h2>Daily color palette &amp; free HEX / Tailwind / CSS color library</h2>
          <p>
            <strong>Daygrain Colors</strong> gives you a free daily color palette of the day —
            three harmonious colors with a mood name — plus a searchable library of{' '}
            {COLOR_LIBRARY.length}+ named colors. Copy HEX, Tailwind tokens, or CSS for any
            swatch. No account.
          </p>
          <h3>How it works</h3>
          <ol>
            <li>Open the page to see today&apos;s curated mood board.</li>
            <li>Tap a daily swatch to copy its HEX, or copy CSS / Tailwind for the full set.</li>
            <li>
              Scroll to the color library — search by name, hex, or Tailwind class (e.g.{' '}
              <em>sky-500</em>).
            </li>
            <li>On any color card, copy <strong>HEX</strong>, <strong>Tailwind</strong>, or{' '}
              <strong>CSS</strong> with one tap.</li>
          </ol>
          <h3>For designers &amp; developers</h3>
          <p>
            Looking up a <em>hex color code</em>, a <em>Tailwind color</em> like{' '}
            <em>blue-600</em>, or a ready-to-paste <em>CSS color</em>? The library lists each
            color with its name and swatch so you can pick the right shade without leaving the
            page. Daily palettes still help when you want <em>color palette of the day</em>{' '}
            inspiration from {total}+ curated sets.
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
