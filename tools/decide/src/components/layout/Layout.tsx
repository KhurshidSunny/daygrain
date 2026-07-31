import { Outlet } from 'react-router-dom'
import { FaviconLinks } from './FaviconLinks'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <FaviconLinks />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
