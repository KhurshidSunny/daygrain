import { BRAND } from '../brand/theme'

export const SITE_URL = 'https://getdaygrain.com/colors'

export const SITE_KEYWORDS = [
  'Daygrain Colors',
  'color palette of the day',
  'daily color inspiration',
  'color scheme generator',
  'daily color palette',
  'free color palette generator',
  'hex color palette today',
  'css color variables copy',
  'tailwind color palette',
  'color mood board online',
  'design color inspiration',
  'harmonious color scheme',
  'getdaygrain colors',
].join(', ')

export const homeMeta = {
  title: 'Daygrain Colors — Daily Color Palette of the Day',
  description:
    'Free daily color palette with three harmonious colors, a mood name, and copy-paste HEX, CSS, and Tailwind snippets—no signup.',
  keywords: SITE_KEYWORDS,
}

export const privacyMeta = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Daygrain Colors at getdaygrain.com/colors — local storage, cookies, and AdSense disclosures.',
}

export const termsMeta = {
  title: 'Terms & Conditions',
  description: 'Terms of use for Daygrain Colors, the free daily color palette tool by Daygrain.',
}

export const disclaimerMeta = {
  title: 'Disclaimer',
  description:
    'Disclaimer for Daygrain Colors — color inspiration for creative use, not professional design advice.',
}

export const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daygrain Colors',
  alternateName: 'Daily Color Mood Board',
  applicationCategory: 'DesignApplication',
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
    'Daily curated color palette',
    'Three harmonious swatches',
    'Mood name and description',
    'Copy HEX, CSS, and Tailwind',
    'Shuffle for more inspiration',
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
      name: 'What is Daygrain Colors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daygrain Colors is a free daily color palette tool. Each day shows three harmonious colors with a mood name, plus one-click copy for HEX, CSS variables, and Tailwind-style snippets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the palette change every day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Today’s palette is selected from a curated set using the day of the year, so a refresh shows the same palette until you shuffle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a different palette today?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Tap Shuffle for another curated set. Tap Today to return to the day’s featured palette.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Everything runs in your browser. Shuffle preference can stay in localStorage on your device.',
      },
    },
  ],
}
