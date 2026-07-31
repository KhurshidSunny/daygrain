import type { Metadata } from "next"
import { BreadcrumbStructuredData } from "@/components/structured-data"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using Daygrain free online productivity tools at getdaygrain.com.",
  path: "/terms",
  keywords: ["Daygrain terms", "terms of use", "getdaygrain terms"],
})

export default function TermsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
    <article className="max-w-3xl pt-12 text-slate-300">
      <h1 className="text-3xl font-semibold text-white">Terms & Conditions</h1>
      <p className="mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-6 space-y-5 text-sm leading-7">
        <p>By using Daygrain tools, you agree to these terms.</p>
        <section>
          <h2 className="text-xl font-semibold text-white">Fair use</h2>
          <p>Use Daygrain services lawfully and do not abuse or attempt to disrupt the platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Intellectual property</h2>
          <p>
            Daygrain branding, interface assets, and original site content are owned by Daygrain unless stated otherwise.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Service availability</h2>
          <p>We aim for reliability but do not guarantee uninterrupted availability.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Limitation of liability</h2>
          <p>Daygrain is provided as-is without warranties, to the extent permitted by law.</p>
        </section>
      </div>
    </article>
    </>
  )
}
