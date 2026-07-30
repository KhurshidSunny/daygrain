type AppHeroProps = {
  displayName: string
  tagline: string
  accent?: string
}

export function AppHero({ displayName, tagline, accent }: AppHeroProps) {
  const parts = displayName.trim().split(/\s+/)
  const accentWord = accent ?? parts[parts.length - 1] ?? ''
  const prefix = accent
    ? displayName.replace(new RegExp(`\\s*${accentWord}$`), '').trim()
    : parts.slice(0, -1).join(' ') || displayName

  const showSplit = parts.length > 1 && accentWord.length > 0

  return (
    <section className="text-center">
      <h1 className="app-hero-title">
        {showSplit ? (
          <>
            {prefix}{' '}
            <span className="app-hero-accent">{accentWord}</span>
          </>
        ) : (
          displayName
        )}
      </h1>
      <p className="app-hero-tagline">{tagline}</p>
    </section>
  )
}
