import { Link } from 'react-router-dom'
import { BRAND } from '../../brand/theme'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sage/10 bg-cream-dark/50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-center text-sm text-charcoal-muted">{BRAND.footerLine}</p>
        <nav
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-charcoal-muted"
          aria-label="Legal"
        >
          <Link to="/privacy" className="hover:text-sage hover:underline">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-sage hover:underline">
            Terms
          </Link>
          <Link to="/disclaimer" className="hover:text-sage hover:underline">
            Disclaimer
          </Link>
          <a href={`mailto:${BRAND.email}`} className="hover:text-sage hover:underline">
            Contact
          </a>
          <a href={BRAND.hubUrl} className="hover:text-sage hover:underline" rel="noopener noreferrer">
            getdaygrain.com
          </a>
        </nav>
        <p className="mt-3 text-center text-xs text-charcoal-muted/70">{BRAND.tagline}</p>
      </div>
    </footer>
  )
}
