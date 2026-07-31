import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../brand/theme'
import { PageHelmet } from '../components/seo/PageHelmet'
import { disclaimerMeta, jsonLdBreadcrumb, privacyMeta, termsMeta } from '../data/seo'

function LegalLayout({
  title,
  meta,
  path,
  children,
}: {
  title: string
  meta: { title: string; description: string }
  path: string
  children: ReactNode
}) {
  return (
    <>
      <PageHelmet
        title={meta.title}
        description={meta.description}
        path={path}
        jsonLd={jsonLdBreadcrumb([
          { name: 'Focus Timer', path: '' },
          { name: title, path },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link to="/" className="text-sm font-medium text-sage transition-colors hover:text-sage-dark">
          ← Back to Focus timer
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-charcoal">{title}</h1>
        <p className="mt-2 text-sm text-charcoal-muted">Last updated: May 2026</p>
        <div className="prose-legal mt-10">{children}</div>
      </div>
    </>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" meta={privacyMeta} path="/privacy">
      <section>
        <h2>Overview</h2>
        <p>
          {BRAND.name} Focus is a free browser-based focus timer at getdaygrain.com/focus.
          We designed it to work without accounts and with minimal data collection.
        </p>
      </section>
      <section>
        <h2>Data on your device</h2>
        <p>
          When you complete a session, the app may save your task text, duration, and
          completion time in your browser&apos;s <strong>localStorage</strong>. This data
          stays on your device unless you clear site data.
        </p>
      </section>
      <section>
        <h2>Analytics &amp; cookies</h2>
        <p>
          We may use Google Analytics or similar tools to understand usage. Third-party ad
          partners, including Google, may use cookies when ads are enabled. See{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            Google&apos;s ad policies
          </a>{' '}
          and opt out via{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Privacy questions: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </p>
      </section>
    </LegalLayout>
  )
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" meta={termsMeta} path="/terms">
      <section>
        <h2>Acceptance</h2>
        <p>
          By using Daygrain Focus, you agree to these terms. If you do not agree, please do
          not use the app.
        </p>
      </section>
      <section>
        <h2>Use of the service</h2>
        <p>
          Daygrain Focus is provided free for personal productivity. Do not misuse the
          service, attempt to disrupt it, or use it for unlawful purposes.
        </p>
      </section>
      <section>
        <h2>No warranty</h2>
        <p>
          The app is provided &ldquo;as is&rdquo; without warranties. We do not guarantee
          uninterrupted availability or error-free operation.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </p>
      </section>
    </LegalLayout>
  )
}

export function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" meta={disclaimerMeta} path="/disclaimer">
      <section>
        <h2>General</h2>
        <p>
          Daygrain Focus is a productivity tool for informational purposes only. It is not
          medical, psychological, or professional advice.
        </p>
      </section>
      <section>
        <h2>External links</h2>
        <p>
          Links to {BRAND.hubUrl} or third-party sites are provided for convenience. We
          are not responsible for their content or policies.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </p>
      </section>
    </LegalLayout>
  )
}
