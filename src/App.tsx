import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { PrivacyPage, TermsPage, DisclaimerPage } from './pages/LegalPages'

function App() {
  return (
    <BrowserRouter>
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
