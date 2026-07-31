import { Helmet } from 'react-helmet-async'

/** Ensures favicon resolves correctly with Vite base path (/focus/) */
export function FaviconLinks() {
  const base = import.meta.env.BASE_URL

  return (
    <Helmet>
      <link rel="icon" type="image/png" href={`${base}favicon.png`} />
      <link rel="shortcut icon" type="image/png" href={`${base}favicon.png`} />
      <link rel="apple-touch-icon" href={`${base}apple-touch-icon.png`} />
    </Helmet>
  )
}
