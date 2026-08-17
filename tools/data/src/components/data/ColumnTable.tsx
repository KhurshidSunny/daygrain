import { formatNumber, formatPct, type ColumnProfile } from '../../lib/profile'

type ColumnTableProps = {
  columns: ColumnProfile[]
  selectedIndex: number
  onSelect: (index: number) => void
  onDrop: (index: number) => void
}

export function ColumnTable({ columns, selectedIndex, onSelect, onDrop }: ColumnTableProps) {
  return (
    <section className="data-card overflow-hidden" aria-labelledby="columns-heading">
      <h2 id="columns-heading" className="text-sm font-semibold text-charcoal">
        Columns
      </h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">Tap a row to see its distribution</p>
      <div className="mt-4 -mx-1 overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Missing</th>
              <th>Unique</th>
              <th>Range / top</th>
              <th>
                <span className="sr-only">Drop</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {columns.map((col) => {
              const active = col.index === selectedIndex
              const summary =
                col.kind === 'number'
                  ? `${formatNumber(col.min)} → ${formatNumber(col.max)}`
                  : col.topValues[0]?.value ?? '—'
              return (
                <tr
                  key={col.name}
                  className={active ? 'bg-sage/10' : 'hover:bg-cream/80'}
                >
                  <td>
                    <button
                      type="button"
                      onClick={() => onSelect(col.index)}
                      className="font-semibold text-charcoal"
                    >
                      {col.name}
                    </button>
                  </td>
                  <td className="capitalize">{col.kind}</td>
                  <td className={col.missingPct >= 0.2 ? 'font-semibold text-amber-800' : ''}>
                    {formatPct(col.missingPct)}
                  </td>
                  <td>{col.unique}</td>
                  <td className="text-charcoal-muted">{summary}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => onDrop(col.index)}
                      className="text-xs font-semibold text-charcoal-muted hover:text-red-600"
                      disabled={columns.length <= 1}
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
