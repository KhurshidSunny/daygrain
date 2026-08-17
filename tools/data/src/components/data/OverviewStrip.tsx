import { formatPct } from '../../lib/profile'
import type { TableProfile } from '../../lib/profile'

type OverviewStripProps = {
  sourceName: string
  truncated: boolean
  profile: TableProfile
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/80 px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">{label}</p>
      <p className="mt-1 text-lg font-bold tabular-nums text-charcoal">{value}</p>
    </div>
  )
}

export function OverviewStrip({ sourceName, truncated, profile }: OverviewStripProps) {
  return (
    <section className="data-card" aria-label="Dataset overview">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Profile</p>
          <h2 className="mt-1 text-lg font-bold text-charcoal">{sourceName}</h2>
        </div>
        {truncated ? (
          <p className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
            First 50,000 rows only
          </p>
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Rows" value={profile.rowCount.toLocaleString()} />
        <Stat label="Columns" value={String(profile.columnCount)} />
        <Stat label="Complete" value={formatPct(profile.completeness)} />
        <Stat label="Duplicate rows" value={String(profile.duplicateRows)} />
      </div>
    </section>
  )
}
