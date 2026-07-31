import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { PrivacyPage, TermsPage, DisclaimerPage } from './pages/LegalPages'

function resolveBasename() {
  const configuredBase = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (!configuredBase) return undefined

  const pathname = window.location.pathname
  const isOnBase =
    pathname === configuredBase || pathname.startsWith(`${configuredBase}/`)

  return isOnBase ? configuredBase : undefined
}

function App() {
  const basename = resolveBasename()

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
