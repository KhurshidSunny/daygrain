import { BRAND } from '../brand/theme'

export const SITE_URL = 'https://getdaygrain.com/decide'

export const SITE_KEYWORDS = [
  'Daygrain Decide',
  'decision matrix online free',
  'compare two job offers tool',
  'pros cons calculator',
  'online decision matrix',
  'weighted decision maker',
  'compare options online',
  'decision making tool free',
  'choose between options',
  'job offer comparison tool',
  'pros and cons scorer',
  'multi criteria decision analysis',
  'free decision helper',
  'pick between choices online',
  'decision matrix template online',
  'getdaygrain decide',
].join(', ')

export const homeMeta = {
  title: 'Daygrain Decide — Free Online Decision Matrix',
  description:
    'Free online decision matrix. Enter 2–4 options, pick criteria, rate them 1–5, and get a clear weighted winner in under a minute—no signup.',
  keywords: SITE_KEYWORDS,
}

export const privacyMeta = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Daygrain Decide at getdaygrain.com/decide — local storage, cookies, and AdSense disclosures.',
}

export const termsMeta = {
  title: 'Terms & Conditions',
  description: 'Terms of use for Daygrain Decide, the free online decision matrix by Daygrain.',
}

export const disclaimerMeta = {
  title: 'Disclaimer',
  description:
    'Disclaimer for Daygrain Decide — a decision helper for informational use, not professional advice.',
}

export const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daygrain Decide',
  alternateName: 'Daygrain Decision Matrix',
  applicationCategory: 'UtilitiesApplication',
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
    'Compare 2–4 options',
    'Custom or preset criteria',
    '1–5 ratings with optional weights',
    'Instant winner and score bars',
    'Copyable summary',
    'No account required',
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
      name: 'What is Daygrain Decide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daygrain Decide is a free online decision matrix. You list a few options, choose criteria that matter, rate each option, and get a weighted score that highlights a winner.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this just a random decision wheel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Decide uses your ratings and optional criterion weights so the result reflects what you care about—not pure chance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Everything runs in your browser. You can optionally keep the last decision in localStorage on your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many options can I compare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Between 2 and 4 options, scored against 3 criteria. That keeps the matrix fast enough for everyday choices.',
      },
    },
  ],
}
