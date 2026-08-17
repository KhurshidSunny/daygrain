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
          { name: 'CSV Profiler', path: '' },
          { name: title, path },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link to="/" className="text-sm font-medium text-sage transition-colors hover:text-sage-dark">
          ← Back to Data
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-charcoal">{title}</h1>
        <p className="mt-2 text-sm text-charcoal-muted">Last updated: August 2026</p>
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
          {BRAND.name} Data is a free browser-based CSV profiler at getdaygrain.com/data. It works
          without accounts. Your files are processed locally.
        </p>
      </section>
      <section>
        <h2>Data on your device</h2>
        <p>
          CSV contents stay in memory in this browser tab. We do not upload spreadsheets to a
          server. Closing the tab discards the table unless you download it yourself.
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
          By using Daygrain Data, you agree to these terms. If you do not agree, please do not use
          the app.
        </p>
      </section>
      <section>
        <h2>Use of the service</h2>
        <p>
          Daygrain Data is provided free for personal data inspection. Do not misuse the service,
          attempt to disrupt it, or use it for unlawful purposes. You remain responsible for files
          you open on your device.
        </p>
      </section>
      <section>
        <h2>No warranty</h2>
        <p>
          The app is provided &ldquo;as is&rdquo; without warranties. Profiling is a helper, not a
          guarantee of statistical correctness.
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
          Daygrain Data is a data-quality helper for informational purposes only. It is not
          professional statistical, scientific, or legal advice. Always review results before
          using them in research or production.
        </p>
      </section>
      <section>
        <h2>External links</h2>
        <p>
          Links to {BRAND.hubUrl} or third-party sites are provided for convenience. We are not
          responsible for their content or policies.
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
