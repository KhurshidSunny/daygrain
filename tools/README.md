# Daygrain tools

Each subdirectory is a standalone Vite + React app that deploys under a path on getdaygrain.com.

| Folder | Product | URL | Spec (ideas/) |
|--------|---------|-----|----------------|
| `focus/` | Daygrain Focus | `/focus/` | `one-task-focus-timer` |
| `decide/` | Daygrain Decide | `/decide/` | `decision-matrix-lite` (next) |

## Rules

1. Vite `base` must be `/<slug>/`
2. Build output must go to `../../public/<slug>`
3. Register the tool in hub `src/lib/site-config.ts`
4. Follow `ideas/DAYGRAIN_BRAND_GUIDE.txt` for naming, colors, and SEO
