import { formatNumber, type ColumnProfile } from '../../lib/profile'

type DistributionChartProps = {
  column: ColumnProfile | undefined
}

export function DistributionChart({ column }: DistributionChartProps) {
  if (!column) return null
  const max = Math.max(...column.bins.map((bin) => bin.count), 1)

  return (
    <section className="data-card" aria-labelledby="dist-heading">
      <h2 id="dist-heading" className="text-sm font-semibold text-charcoal">
        {column.name}
      </h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">
        {column.kind === 'number'
          ? `mean ${formatNumber(column.mean)} · median ${formatNumber(column.median)} · std ${formatNumber(column.std)}`
          : `${column.unique} unique values`}
      </p>
      <ul className="mt-5 space-y-2">
        {column.bins.map((bin) => (
          <li key={bin.label} className="grid grid-cols-[minmax(0,7rem)_1fr_2.5rem] items-center gap-2">
            <span className="truncate text-[11px] text-charcoal-muted" title={bin.label}>
              {bin.label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-sage/12">
              <span
                className="block h-full rounded-full bg-sage"
                style={{ width: `${(bin.count / max) * 100}%` }}
              />
            </div>
            <span className="text-right text-xs tabular-nums text-charcoal">{bin.count}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
