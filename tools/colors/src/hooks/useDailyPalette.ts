import { useCallback, useMemo, useState } from 'react'
import { PALETTES } from '../data/palettes'
import { dayOfYear } from '../lib/day'
import { clearShuffle, loadShuffle, saveShuffle } from '../lib/storage'

function dailyIndex(date = new Date()): number {
  return dayOfYear(date) % PALETTES.length
}

export function useDailyPalette() {
  const todayIndex = useMemo(() => dailyIndex(), [])
  const [index, setIndex] = useState(() => {
    const saved = typeof window !== 'undefined' ? loadShuffle() : null
    return saved?.index ?? todayIndex
  })

  const palette = PALETTES[index] ?? PALETTES[0]
  const isToday = index === todayIndex

  const shuffle = useCallback(() => {
    setIndex((prev) => {
      let next = prev
      if (PALETTES.length > 1) {
        while (next === prev) {
          next = Math.floor(Math.random() * PALETTES.length)
        }
      }
      saveShuffle(next)
      return next
    })
  }, [])

  const restoreToday = useCallback(() => {
    clearShuffle()
    setIndex(todayIndex)
  }, [todayIndex])

  return {
    palette,
    index,
    isToday,
    total: PALETTES.length,
    shuffle,
    restoreToday,
  }
}
