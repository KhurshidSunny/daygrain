import type { QualityIssue } from '../../lib/profile'

type IssueListProps = {
  issues: QualityIssue[]
}

export function IssueList({ issues }: IssueListProps) {
  return (
    <section className="data-card" aria-labelledby="quality-heading">
      <h2 id="quality-heading" className="text-sm font-semibold text-charcoal">
        Quality flags
      </h2>
      <p className="mt-0.5 text-xs text-charcoal-muted">
        Problems found in this table before you export.
      </p>
      <ul className="mt-4 space-y-2.5">
        {issues.map((issue) => (
          <li
            key={`${issue.title}-${issue.detail}`}
            className="rounded-xl border border-sage/12 bg-cream/50 px-3.5 py-3"
          >
            <p className="text-sm font-semibold text-charcoal">
              <span
                className={`mr-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  issue.level === 'warn'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-sage/15 text-sage-dark'
                }`}
              >
                {issue.level}
              </span>
              {issue.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-charcoal-muted">{issue.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
