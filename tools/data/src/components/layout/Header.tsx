import { Link } from 'react-router-dom'
import { BRAND } from '../../brand/theme'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="inline-flex shrink-0 transition-transform duration-200 hover:scale-[1.03]">
          <Logo />
        </Link>
        <nav className="flex items-center gap-0.5 text-sm sm:gap-1" aria-label="Main">
          <a href="#how-it-works" className="nav-link hidden sm:inline-flex">
            How it works
          </a>
          <Link to="/privacy" className="nav-link">
            Privacy
          </Link>
          <a href={BRAND.hubUrl} className="nav-link hidden sm:inline-flex" rel="noopener noreferrer">
            All tools
          </a>
        </nav>
      </div>
    </header>
  )
}
