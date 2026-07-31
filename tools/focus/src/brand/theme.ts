export const BRAND = {
  name: 'Daygrain',
  product: 'Focus',
  displayName: 'Daygrain Focus',
  heroTagline: 'One task. One timer. Done.',
  tagline: 'Minimal tools for modern minds.',
  footerLine: 'A Daygrain tool — simple, private, free.',
  email: 'getdaygrain@gmail.com',
  hubUrl: 'https://getdaygrain.com',
  logoSrc: '/daygrain-logo1.PNG',
} as const

export const DURATIONS = [12, 25, 45] as const
export type DurationMinutes = (typeof DURATIONS)[number]

export const BREAK_MINUTES = 5
export const MAX_RECENT_SESSIONS = 7
export const STORAGE_KEY = 'daygrain-focus-sessions'
