import { PREVIEW_PAGE_SIZE } from '../../brand/theme'

type PreviewTableProps = {
  headers: string[]
  rows: string[][]
  page: number
  onPage: (page: number) => void
}

export function PreviewTable({ headers, rows, page, onPage }: PreviewTableProps) {
  const pageCount = Math.max(1, Math.ceil(rows.length / PREVIEW_PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const start = safePage * PREVIEW_PAGE_SIZE
  const slice = rows.slice(start, start + PREVIEW_PAGE_SIZE)

  return (
    <section className="data-card" aria-labelledby="preview-heading">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="preview-heading" className="text-sm font-semibold text-charcoal">
            Preview
          </h2>
          <p className="mt-0.5 text-xs text-charcoal-muted">
            Rows {start + 1}–{Math.min(start + slice.length, rows.length)} of {rows.length}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-ghost px-3 py-1.5 text-xs"
            disabled={safePage === 0}
            onClick={() => onPage(safePage - 1)}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn-ghost px-3 py-1.5 text-xs"
            disabled={safePage >= pageCount - 1}
            onClick={() => onPage(safePage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 max-h-[340px] overflow-auto rounded-xl border border-sage/10">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => (
              <tr key={`${start}-${i}`}>
                {row.map((cell, j) => (
                  <td key={`${j}-${cell}`} title={cell}>
                    {cell || <span className="text-charcoal-muted/50">empty</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
