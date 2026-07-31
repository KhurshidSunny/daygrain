import type { Metadata } from "next"
import { BreadcrumbStructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/site-config"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Daygrain (getdaygrain.com): cookies, Google Analytics, AdSense, and how we handle your data on our free online tools.",
  path: "/privacy",
  keywords: ["Daygrain privacy policy", "getdaygrain privacy", "cookies policy"],
})

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
    <article className="max-w-3xl pt-12 text-slate-300">
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-6 space-y-5 text-sm leading-7">
        <p>
          This Privacy Policy explains how Daygrain (getdaygrain.com) handles information in
          connection with its websites and tools.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-white">Data collection</h2>
          <p>We may collect limited technical data such as IP address, browser type, and pages visited.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Cookies and analytics</h2>
          <p>
            Daygrain may use cookies and analytics tools (including Google Analytics) to
            understand usage patterns and improve product experience.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Advertising</h2>
          <p>
            Third-party vendors, including Google, may use cookies to serve ads based on prior
            visits to this website or other websites. Users may opt out of personalized
            advertising by visiting Google Ads Settings and related opt-out resources.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Third-party services</h2>
          <p>We may use hosting, analytics, and ad service providers that process technical data.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>Questions about privacy: {siteConfig.email}</p>
        </section>
      </div>
    </article>
    </>
  )
}
