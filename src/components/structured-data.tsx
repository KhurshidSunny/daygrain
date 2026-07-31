import { siteConfig, tools, getToolAppUrl } from "@/lib/site-config"

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function GlobalStructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.email,
    logo: `${siteConfig.domain}${siteConfig.ogImage}`,
    description: siteConfig.description,
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@type": "Organization", name: siteConfig.name },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.domain}/tools`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  )
}

export function HomeStructuredData() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daygrain Tools",
    description: "Free online productivity and focus tools by Daygrain",
    itemListElement: tools.map((tool, index) => {
      const appUrl = getToolAppUrl(tool)
      return {
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        description: tool.seoDescription,
        url: appUrl ?? `${siteConfig.domain}/tools`,
      }
    }),
  }

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.domain,
    isPartOf: { "@type": "WebSite", url: siteConfig.domain },
  }

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={webPage} />
    </>
  )
}

export function ToolsPageStructuredData() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Daygrain Tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        description: tool.seoDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: getToolAppUrl(tool) ?? `${siteConfig.domain}/tools`,
      },
    })),
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.domain}/tools` },
    ],
  }

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumb} />
    </>
  )
}

type BreadcrumbItem = { name: string; path: string }

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  }

  return <JsonLd data={breadcrumb} />
}
