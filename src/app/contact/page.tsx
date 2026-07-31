import type { Metadata } from "next"
import { BreadcrumbStructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/site-config"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Daygrain for support, partnerships, feedback, and press inquiries. Email getdaygrain@gmail.com.",
  path: "/contact",
  keywords: ["contact Daygrain", "getdaygrain support", "Daygrain email"],
})

export default function ContactPage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Daygrain inquiry")}`

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="pt-12 pb-10">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Contact Daygrain</h1>
        <p className="hero-subtext mt-3 max-w-2xl text-sm leading-7">
          Reach out for support, collaboration, and feedback about our free online productivity tools.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Send a message</h2>
            <p className="hero-subtext mt-3 text-sm leading-7">Email us directly — we read every message.</p>
            <a href={mailto} className="btn-primary mt-5 inline-flex px-5 py-2.5">
              Email {siteConfig.email}
            </a>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Email</h2>
              <a href={mailto} className="mt-3 inline-block text-sm text-cyan-300 hover:text-cyan-200">
                {siteConfig.email}
              </a>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Social links</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>
                  <a href={siteConfig.socials.facebook} className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socials.instagram} className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socials.tiktok} className="hover:text-white">
                    TikTok
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socials.github} className="hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
