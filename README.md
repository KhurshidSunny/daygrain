# Daygrain Hub

Main website for all Daygrain tools: [https://getdaygrain.com](https://getdaygrain.com)

## Structure

```
daygrain-hub/                 ← this git repo (hub + tools)
  src/                        ← Next.js hub site (home, tools directory, legal)
  public/                     ← hub static assets
  public/focus/               ← built Focus app (generated, gitignored)
  tools/
    focus/                    ← Daygrain Focus (Vite) → deploys at /focus/
    decide/                   ← (next) Daygrain Decide → /decide/
```

## URLs

| Path | App |
|------|-----|
| `/` | Daygrain hub |
| `/tools` | Tools directory |
| `/focus/` | Daygrain Focus |
| `/decide/` | Daygrain Decide (coming soon) |

## Local development

```bash
# Install hub deps
npm install

# Build Focus into public/focus (required once, and after Focus code changes)
npm run build:focus

# Run the hub (Webpack — more stable on Windows)
npm run dev
```

Open:
- Hub: `http://localhost:3000`
- Focus: `http://localhost:3000/focus/`

If you see a Turbopack panic about `tools/focus/node_modules/daygrain-hub`, stop the server, run `npm run build:focus` again, then `npm run dev`. Do not add `daygrain-hub` as a dependency inside `tools/focus`.

## Production build (Netlify)

```bash
npm run build
```

This builds Focus into `public/focus`, then builds the Next.js hub. Netlify serves:

- Hub routes via Next.js
- `/focus/*` as the Focus SPA (see `netlify.toml`)

## Adding the next tool

1. Create `tools/<slug>/` (copy `tools/focus` as a template)
2. Set Vite `base: '/<slug>/'` and `outDir: '../../public/<slug>'`
3. Add the tool to `src/lib/site-config.ts` with `appPath: '/<slug>/'` and `status: 'Live'`
4. Add Netlify SPA redirects for `/<slug>/*` in `netlify.toml`
5. Specs live in `../ideas/<folder>/app_specification.txt`

## License

Private - All rights reserved.
