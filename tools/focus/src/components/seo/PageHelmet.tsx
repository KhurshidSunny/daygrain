import { Helmet } from 'react-helmet-async'
import { BRAND } from '../../brand/theme'
import { SITE_URL } from '../../data/seo'

interface PageHelmetProps {
  title: string
  description: string
  path?: string
  keywords?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function PageHelmet({
  title,
  description,
  path = '',
  keywords,
  jsonLd,
}: PageHelmetProps) {
  const canonical = `${SITE_URL}${path}`
  const fullTitle = path === '' ? title : `${title} | Daygrain Focus`
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={`${BRAND.name} Focus`} />
      <meta property="og:image" content={`${SITE_URL}/${BRAND.logoSrc.replace(/^\//, '')}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="robots" content="index, follow" />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
