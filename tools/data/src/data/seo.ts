import { BRAND } from '../brand/theme'

export const SITE_URL = 'https://getdaygrain.com/data'

export const SITE_KEYWORDS = [
  'Daygrain Data',
  'online csv profiler',
  'csv data quality checker',
  'missing values analyzer',
  'csv cleaner online free',
  'data profiling tool browser',
  'inspect csv types missing duplicates',
  'client side csv analyzer',
  'data quality report generator',
  'free csv statistics tool',
  'schema inference csv',
  'privacy csv profiler',
  'getdaygrain data',
].join(', ')

export const homeMeta = {
  title: 'Daygrain Data — Free Online CSV Profiler',
  description:
    'Free in-browser CSV profiler. Infer types, find missing values and duplicates, view distributions, clean the table, and export a quality report—no upload, no signup.',
  keywords: SITE_KEYWORDS,
}

export const privacyMeta = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Daygrain Data at getdaygrain.com/data — files stay in your browser.',
}

export const termsMeta = {
  title: 'Terms & Conditions',
  description: 'Terms of use for Daygrain Data, the free online CSV profiler by Daygrain.',
}

export const disclaimerMeta = {
  title: 'Disclaimer',
  description:
    'Disclaimer for Daygrain Data — a data quality helper for informational use, not professional analysis.',
}

export const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daygrain Data',
  alternateName: 'Online CSV Profiler',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: homeMeta.description,
  url: SITE_URL,
  image: `${SITE_URL}/daygrain-logo1.PNG`,
  author: {
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.hubUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.hubUrl,
  },
  featureList: [
    'CSV parse in the browser',
    'Type inference and missing-value rates',
    'Duplicate and outlier flags',
    'Column distributions',
    'Trim, fill, and drop-clean actions',
    'Export cleaned CSV and quality report',
    'No file upload',
  ],
}

export const jsonLdBreadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})

export const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Daygrain Data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daygrain Data is a free online CSV profiler. It infers column types, measures missingness, finds duplicates and outliers, and lets you clean and export the table — all in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my CSV uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Parsing, profiling, and cleaning run locally. The file never leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I clean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can trim whitespace, drop empty or duplicate rows, fill missing values (median for numbers, mode for categories), drop a column, and download a cleaned CSV plus a quality report.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Open a file or try a sample dataset and start profiling immediately.',
      },
    },
  ],
}
