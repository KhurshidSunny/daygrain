import type { Palette } from '../data/palettes'

export function normalizeHex(hex: string): string {
  const clean = hex.trim().replace(/^#/, '').toUpperCase()
  return `#${clean}`
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = normalizeHex(hex).slice(1)
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  }
}

/** Relative luminance for contrast decisions (sRGB). */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const channel = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastText(hex: string): '#1A1A1A' | '#FAFAF8' {
  return relativeLuminance(hex) > 0.45 ? '#1A1A1A' : '#FAFAF8'
}

export function formatCssVariables(palette: Palette): string {
  const [a, b, c] = palette.colors.map(normalizeHex)
  return [
    `:root {`,
    `  --color-primary: ${a};`,
    `  --color-accent: ${b};`,
    `  --color-soft: ${c};`,
    `}`,
  ].join('\n')
}

export function formatTailwindSnippet(palette: Palette): string {
  const [a, b, c] = palette.colors.map(normalizeHex)
  return [
    `// ${palette.name}`,
    `colors: {`,
    `  primary: '${a}',`,
    `  accent: '${b}',`,
    `  soft: '${c}',`,
    `}`,
  ].join('\n')
}

export function formatHexList(palette: Palette): string {
  return palette.colors.map(normalizeHex).join(' ')
}

export function formatShareText(palette: Palette): string {
  return `Today's palette — ${palette.name}: ${formatHexList(palette)} · https://getdaygrain.com/colors`
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
