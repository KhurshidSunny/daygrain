import { Helmet } from 'react-helmet-async'

export function FaviconLinks() {
  return (
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="/daygrain-logo.svg" />
      <link rel="shortcut icon" type="image/svg+xml" href="/daygrain-logo.svg" />
      <link rel="apple-touch-icon" href="/daygrain-logo.svg" />
    </Helmet>
  )
}
