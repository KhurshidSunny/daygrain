# Daygrain Hub

Main website for all Daygrain tools: [https://getdaygrain.com](https://getdaygrain.com)

## Structure

```
daygrain-hub/                 ← this git repo (hub + tools)
  src/                        ← Next.js hub site (home, tools directory, legal)
  public/                     ← hub static assets
  public/focus/               ← built Focus app (generated, gitignored)
  tools/
    focus/                    ← Daygrain Focus (Vite) → /focus/
    decide/                   ← Daygrain Decide → /decide/
    colors/                   ← Daygrain Colors → /colors/
    data/                     ← Daygrain Data → /data/
```

## URLs

| Path | App |
|------|-----|
| `/` | Daygrain hub |
| `/tools` | Tools directory |
| `/focus/` | Daygrain Focus |
| `/decide/` | Daygrain Decide |
| `/colors/` | Daygrain Colors |
| `/data/` | Daygrain Data |

## Local development

```bash
npm install
npm run build:data
npm run dev
```

Open:

- Hub: `http://localhost:3000`
- Data: `http://localhost:3000/data`

## Production build (Netlify)

```bash
npm run build
```

Builds Focus, Decide, Colors, and Data into `public/<slug>`, then the Next.js hub.

## License

Private - All rights reserved.
