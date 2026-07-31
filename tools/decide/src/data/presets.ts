export const CRITERIA_PRESETS = [
  'Pay',
  'Happiness',
  'Growth',
  'Learning',
  'Commute',
  'Flexibility',
  'Cost',
  'Time',
  'Risk',
  'Location',
  'Health',
  'Impact',
] as const

export type CriteriaPreset = (typeof CRITERIA_PRESETS)[number]
