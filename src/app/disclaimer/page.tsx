import type { Metadata } from "next"
import { BreadcrumbStructuredData } from "@/components/structured-data"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Disclaimer",
  description:
    "Disclaimer for Daygrain free online tools: informational use only, no professional advice, external links.",
  path: "/disclaimer",
  keywords: ["Daygrain disclaimer", "tool disclaimer", "getdaygrain disclaimer"],
})

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer" },
        ]}
      />
    <article className="max-w-3xl pt-12 text-slate-300">
      <h1 className="text-3xl font-semibold text-white">Disclaimer</h1>
      <div className="mt-6 space-y-5 text-sm leading-7">
        <p>Daygrain tools are provided for informational and productivity support purposes only.</p>
        <p>
          We do not guarantee correctness, completeness, or suitability of every output for
          every context. Validate critical decisions independently.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-white">External links</h2>
          <p>
            Daygrain may link to third-party websites. We are not responsible for third-party
            content, services, or policies.
          </p>
        </section>
      </div>
    </article>
    </>
  )
}
