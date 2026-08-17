import { BRAND } from '../brand/theme'
import { ColumnTable } from '../components/data/ColumnTable'
import { DistributionChart } from '../components/data/DistributionChart'
import { DropZone } from '../components/data/DropZone'
import { IssueList } from '../components/data/IssueList'
import { OverviewStrip } from '../components/data/OverviewStrip'
import { PreviewTable } from '../components/data/PreviewTable'
import { WorkspaceActions } from '../components/data/WorkspaceActions'
import { AppHero } from '../components/layout/AppHero'
import { PageHelmet } from '../components/seo/PageHelmet'
import { homeMeta, jsonLdFaq, jsonLdWebApp } from '../data/seo'
import { useDataset } from '../hooks/useDataset'

export function HomePage() {
  const dataset = useDataset()
  const selected = dataset.profile?.columns.find((col) => col.index === dataset.selectedIndex)

  return (
    <>
      <PageHelmet
        title={homeMeta.title}
        description={homeMeta.description}
        keywords={homeMeta.keywords}
        jsonLd={[jsonLdWebApp, jsonLdFaq]}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />

        <div className="mx-auto max-w-3xl">
          <AppHero displayName={BRAND.displayName} tagline={BRAND.heroTagline} accent={BRAND.product} />
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <DropZone
            error={dataset.error}
            samples={dataset.samples}
            onFile={(file) => void dataset.loadFile(file)}
            onSample={dataset.loadSample}
            onPaste={dataset.loadText}
          />
        </div>

        {dataset.loaded && dataset.profile ? (
          <div className="mt-6 space-y-4 animate-fade-in">
            <OverviewStrip
              sourceName={dataset.sourceName}
              truncated={dataset.truncated}
              profile={dataset.profile}
            />
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <IssueList issues={dataset.profile.issues} />
              <DistributionChart column={selected} />
            </div>
            <ColumnTable
              columns={dataset.profile.columns}
              selectedIndex={dataset.selectedIndex}
              onSelect={dataset.setSelectedIndex}
              onDrop={dataset.removeColumn}
            />
            <PreviewTable
              headers={dataset.headers}
              rows={dataset.rows}
              page={dataset.previewPage}
              onPage={dataset.setPreviewPage}
            />
            <WorkspaceActions
              onClean={dataset.runClean}
              onExportCsv={dataset.exportCsv}
              onExportReport={dataset.exportReport}
              onCopyReport={dataset.copyReport}
              onReset={dataset.reset}
            />
          </div>
        ) : null}

        <article
          id="how-it-works"
          className="prose-daygrain mx-auto mt-14 max-w-3xl border-t border-sage/10 pt-12 text-left sm:mt-16"
        >
          <h2>Free online CSV profiler — inspect data quality in your browser</h2>
          <p>
            <strong>Daygrain Data</strong> is a free CSV profiler and cleaner. Open a table, infer
            column types, measure missing values, catch duplicates and IQR outliers, then export a
            cleaned file and a quality report. The file never leaves this device.
          </p>
          <h3>How it works</h3>
          <ol>
            <li>Drop a CSV, paste text, or load a sample dataset.</li>
            <li>Read the overview: rows, completeness, duplicate rows.</li>
            <li>Open quality flags, then click a column to see its distribution.</li>
            <li>Trim, drop empties/duplicates, fill missing, or drop a column.</li>
            <li>Download the cleaned CSV or copy the quality report.</li>
          </ol>
          <h3>When a spreadsheet is too much</h3>
          <p>
            Searching for an <em>online csv profiler</em>, a <em>data quality checker</em>, or a{' '}
            <em>missing values analyzer</em> usually means you want a quick look at a file. Daygrain
            Data infers types, flags missing cells and duplicates, and shows distributions so you
            can clean the table and export it.
          </p>
          <h3>Privacy</h3>
          <p>
            Parsing and cleaning run in your browser. We do not upload your CSV and we do not
            require an account.
          </p>
        </article>
      </div>
    </>
  )
}
