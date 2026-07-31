import { BRAND } from '../brand/theme'

export const SITE_URL = 'https://getdaygrain.com/focus'

export const SITE_KEYWORDS = [
  'Daygrain Focus',
  'online focus timer',
  'study focus tool online',
  'free focus timer',
  'pomodoro timer online',
  'one task focus timer',
  'study timer online',
  'deep work timer',
  'concentration timer',
  'focus timer no signup',
  'fullscreen focus app',
  'ADHD focus timer',
  '12 minute focus timer',
  '25 minute pomodoro',
  '45 minute deep work',
  'productivity timer free',
  'online study timer',
  'minimal focus app',
  'distraction free timer',
  'getdaygrain focus',
].join(', ')

export const homeMeta = {
  title: 'Daygrain Focus — Free Online Study & Focus Timer',
  description:
    'Free online focus timer for study and deep work. One task, pick 12/25/45 minutes, fullscreen mode—no signup, data stays on your device.',
  keywords: SITE_KEYWORDS,
}

export const privacyMeta = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Daygrain Focus at getdaygrain.com/focus — local storage, cookies, analytics, and Google AdSense disclosures.',
}

export const termsMeta = {
  title: 'Terms & Conditions',
  description: 'Terms of use for Daygrain Focus, the free online focus and study timer by Daygrain.',
}

export const disclaimerMeta = {
  title: 'Disclaimer',
  description: 'Disclaimer for Daygrain Focus — informational productivity tool, no professional advice.',
}

export const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daygrain Focus',
  alternateName: 'Daygrain Study Focus Timer',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: homeMeta.description,
  url: SITE_URL,
  image: `${SITE_URL}/${BRAND.logoSrc.replace(/^\//, '')}`,
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
    'One-task focus timer',
    '12, 25, and 45 minute sessions',
    'Fullscreen focus mode',
    'Optional 5-minute break',
    'Local session history',
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
      name: 'What is Daygrain Focus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daygrain Focus is a free online focus timer. You enter one task, choose 12, 25, or 45 minutes, and work in fullscreen until the timer ends.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Daygrain Focus works instantly in your browser with no signup or login.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data stored on a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Recent sessions are saved only in your browser localStorage. Task text is not sent to Daygrain servers.",
      },
    },
    {
      '@type': 'Question',
      name: 'What timer lengths are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can choose 12, 25, or 45 minute focus sessions, plus an optional 5-minute break after completing a session.',
      },
    },
  ],
}
