
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
    "decision making tool online",
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
    desc: "A fast online decision picker—add options, spin or randomize, and choose with less overthinking.",
    status: "Live",
    appPath: "/decide",
    seoTitle: "Daygrain Decide — Online Decision Maker Tool",
    seoDescription:
      "Free decision maker and random choice picker for everyday choices. Simple, beautiful, and instant—no signup.",
    keywords: [
      "decision maker online",
      "random choice picker",
      "pick between options",
      "decision wheel alternative",
      "online decision tool",
    ],
  },
  {
    slug: "colors",
    name: "Daygrain Colors",
    tag: "Creativity",
    desc: "Color inspiration and palettes for creators, designers, and builders.",
    status: "Soon",
    seoTitle: "Daygrain Colors — Color Palette Inspiration",
    seoDescription: "Coming soon: color palette inspiration for creators and UI designers.",
    keywords: ["color palette generator", "color inspiration tool", "design colors online"],
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
  return `${toolBaseUrl.replace(/\/$/, "")}${tool.appPath}`
}
