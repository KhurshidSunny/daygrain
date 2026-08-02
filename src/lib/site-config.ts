
export const brandLogoSrc = "/daygrain-logo1.PNG"

export const siteConfig = {
  name: "Daygrain",
  domain: "https://getdaygrain.com",
  locale: "en_US",
  email: "getdaygrain@gmail.com",
  tagline: "Minimal tools for modern minds",
  title: "Daygrain — Free Online Productivity Tools & Focus Apps",
  heroDescription: "Free focus, study, and decision tools—fast, simple, no signup.",
  /** Used for SEO meta descriptions and structured data. */
  description:
    "Daygrain offers free online productivity tools including a focus timer, study timer, and decision helper. Fast, beautiful, distraction-free web apps—no signup required.",
  ogImage: "/daygrain-logo1.PNG",
  keywords: [
    "Daygrain",
    "getdaygrain",
    "free online tools",
    "productivity tools online",
    "focus timer online",
    "study focus tool online",
    "online focus app",
    "pomodoro timer free",
    "study timer online",
    "distraction free focus",
    "minimal web apps",
    "decision matrix online free",
    "compare two job offers tool",
    "color palette of the day",
    "daily color inspiration",
    "free web apps no signup",
    "productivity apps for students",
    "deep work timer",
    "concentration timer",
    "online productivity suite",
  ],
  socials: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    github: "#",
  },
} as const

export const testimonials = [
  { name: "Ayesha K.", quote: "Daygrain Focus helped me start deep work without overthinking my setup." },
  { name: "Daniel M.", quote: "Clean UI, fast load, and exactly the kind of simple tool I keep bookmarked." },
  { name: "Sara L.", quote: "I use Decide when I am stuck between options. It saves mental energy." },
  { name: "Omar H.", quote: "Feels premium but still lightweight. Great for daily productivity." },
  { name: "Mina P.", quote: "No signup friction. I open a tool and get value in seconds." },
] as const

export type ToolItem = {
  slug: string
  name: string
  tag: string
  desc: string
  status: "Live" | "Soon"
  appPath?: string
  seoTitle: string
  seoDescription: string
  keywords: readonly string[]
}

export const tools: ToolItem[] = [
  {
    slug: "focus",
    name: "Daygrain Focus",
    tag: "Productivity",
    desc: "A minimal online focus timer with fullscreen mode, breaks, and session tracking—built for study and deep work.",
    status: "Live",
    appPath: "/focus",
    seoTitle: "Daygrain Focus — Online Study & Focus Timer",
    seoDescription:
      "Free online focus timer for students and professionals. Pomodoro-style sessions, fullscreen focus mode, breaks, and local session history—no account required.",
    keywords: [
      "online focus timer",
      "study focus tool online",
      "focus timer free",
      "pomodoro timer online",
      "study timer",
      "deep work timer",
      "concentration app",
    ],
  },
  {
    slug: "decide",
    name: "Daygrain Decide",
    tag: "Decision",
    desc: "A free online decision matrix—compare 2–4 options on criteria you care about and see a weighted winner in under a minute.",
    status: "Live",
    appPath: "/decide",
    seoTitle: "Daygrain Decide — Free Online Decision Matrix",
    seoDescription:
      "Free online decision matrix and pros/cons scorer. Compare job offers or everyday choices on weighted criteria—clear winner, no signup.",
    keywords: [
      "decision matrix online free",
      "compare two job offers tool",
      "pros cons calculator",
      "weighted decision maker",
      "online decision matrix",
      "decision making tool free",
      "pick between options",
    ],
  },
  {
    slug: "colors",
    name: "Daygrain Colors",
    tag: "Creativity",
    desc: "A free daily color palette—three harmonious colors with a mood name, plus copy-paste HEX, CSS, and Tailwind.",
    status: "Live",
    appPath: "/colors",
    seoTitle: "Daygrain Colors — Daily Color Palette of the Day",
    seoDescription:
      "Free color palette of the day. Three harmonious colors, mood name, and one-click HEX/CSS/Tailwind copy—no signup.",
    keywords: [
      "color palette of the day",
      "daily color inspiration",
      "color scheme generator",
      "daily color palette",
      "free color palette generator",
      "hex color palette",
      "css color variables",
    ],
  },
  {
    slug: "brain",
    name: "Daygrain Brain",
    tag: "Mind",
    desc: "Daily mini brain challenges to keep your thinking sharp and engaged.",
    status: "Soon",
    seoTitle: "Daygrain Brain — Daily Brain Training",
    seoDescription: "Coming soon: quick daily brain challenges for mental sharpness.",
    keywords: ["brain training online", "daily brain games", "mind exercises"],
  },
  {
    slug: "learn",
    name: "Daygrain Learn",
    tag: "Learning",
    desc: "Daily bite-sized learning prompts for consistent growth and curiosity.",
    status: "Soon",
    seoTitle: "Daygrain Learn — Daily Learning Prompts",
    seoDescription: "Coming soon: bite-sized learning prompts for everyday growth.",
    keywords: ["daily learning app", "micro learning prompts", "study habits tool"],
  },
]

const toolBaseUrl = process.env.NEXT_PUBLIC_TOOL_BASE_URL ?? siteConfig.domain

export function getToolAppUrl(tool: ToolItem): string | null {
  if (tool.status !== "Live" || !tool.appPath) return null
  const normalizedPath = tool.appPath.trim().replace(/\/+$/, "") || "/"
  const normalizedBase = toolBaseUrl.replace(/\/$/, "")
  const normalizedDomain = siteConfig.domain.replace(/\/$/, "")

  // Use same-origin relative links by default to avoid host-level redirect loops.
  if (normalizedBase === normalizedDomain) {
    return normalizedPath
  }

  return `${normalizedBase}${normalizedPath}`
}
