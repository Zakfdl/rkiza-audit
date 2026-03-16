# Rkiza.com — E-Commerce Audit Dashboard

A professional, fully interactive, bilingual (Arabic/English) audit dashboard for **rkiza.com** — a Saudi Arabia e-commerce store selling building materials, plumbing, electrical, and lighting products.

---

## Live Preview

Open `dist/index.html` in any browser — no server required for viewing.  
For development with live reloading: `npm run dev` → http://localhost:3000

---

## Features

| Feature | Details |
|---|---|
| **Bilingual** | Full Arabic + English with one-click language toggle |
| **RTL/LTR** | Document direction switches automatically; full RTL layout for Arabic |
| **9 Sections** | Overview · UX · SEO · Performance · CRO · Competitors · Priorities · Roadmap · Score |
| **Interactive** | Sidebar navigation · Score circles · Progress bars · Filterable tables · SVG charts |
| **Responsive** | Desktop (1440px) · Tablet · Mobile |
| **Persistent lang** | Selected language saved to localStorage |
| **No heavy deps** | React + vanilla CSS only — no UI libraries, no Tailwind |
| **Production build** | Single `app.js` bundle + inlined CSS in `index.html` |

---

## Project Structure

```
rkiza-audit/
├── src/
│   ├── App.jsx                  # Complete dashboard (all sections + components)
│   ├── data/
│   │   └── auditData.js         # All bilingual audit data & metrics
│   ├── utils/
│   │   └── i18n.js              # Translation strings (AR + EN)
│   └── styles/
│       └── design-system.css    # Full design system (tokens, components, RTL)
├── scripts/
│   ├── build.js                 # Production build script (esbuild)
│   ├── dev.js                   # Local dev server
│   └── preview.js               # Preview built dist/
├── public/
│   └── favicon.svg
├── dist/                        # ← Deploy THIS folder to Hostinger
│   ├── index.html               # Entry point (CSS inlined)
│   ├── app.js                   # React app bundle (~270 KB)
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions → Hostinger FTP auto-deploy
├── index.html                   # Dev entry point
├── package.json
├── .gitignore
└── README.md
```

---

## Installation

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Install dependencies

```bash
cd rkiza-audit
npm install
```

This installs **react**, **react-dom**, and **esbuild**.

---

## Running Locally

### Development mode (builds + serves)

```bash
npm run dev
```

Opens at **http://localhost:3000**

> After editing source files, run `npm run build` to rebuild, then refresh the browser.

### Preview the production build

```bash
npm run preview
```

Opens at **http://localhost:4173** — serves the exact `dist/` folder you'll deploy.

---

## Building for Production

```bash
npm run build
```

Output in `dist/`:

```
dist/
├── index.html    ~19 KB   (HTML + inlined CSS)
├── app.js        ~270 KB  (React bundle, minified)
└── favicon.svg   <1 KB
```

The `dist/` folder is fully self-contained and ready for deployment.

---

## Deploying to Hostinger via GitHub

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial audit dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rkiza-audit.git
git push -u origin main
```

### Step 2 — Add GitHub Secrets

In your GitHub repository → **Settings → Secrets and variables → Actions**, add:

| Secret name | Value |
|---|---|
| `FTP_SERVER` | Your Hostinger FTP host (e.g. `ftp.rkiza.com` or the IP from hPanel) |
| `FTP_USERNAME` | Your Hostinger FTP username |
| `FTP_PASSWORD` | Your Hostinger FTP password |

> **Find FTP credentials:** Hostinger hPanel → Files → FTP Accounts

### Step 3 — Auto-Deploy

Every push to `main` will:
1. Install dependencies
2. Run `npm run build`
3. Upload `dist/` to `public_html/` on Hostinger via FTP

The workflow file is at `.github/workflows/deploy.yml`.

### Step 4 — Manual FTP Upload (alternative)

If you prefer not to use GitHub Actions:

1. Run `npm run build` locally
2. Connect to Hostinger via FTP (FileZilla, Cyberduck, etc.)
3. Upload the **contents of `dist/`** to `public_html/`

```
dist/index.html  →  public_html/index.html
dist/app.js      →  public_html/app.js
dist/favicon.svg →  public_html/favicon.svg
```

---

## Customising the Dashboard

### Update audit content
Edit `src/data/auditData.js` — all scores, issues, keywords, roadmap items, and competitor data live here.

### Update translations
Edit `src/utils/i18n.js` — add or change Arabic/English strings.

### Update design
Edit `src/styles/design-system.css` — all design tokens (colors, spacing, typography) are CSS custom properties at the top of the file.

### Add a new section
1. Create a new component function in `src/App.jsx`
2. Add it to `sectionComponents` map
3. Add a nav item to `navItems` array
4. Add translation keys to `src/utils/i18n.js`

---

## Technology Stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| esbuild | 0.27 | Bundler (no Webpack/Vite needed) |
| Cairo font | Google Fonts | Arabic typography |
| Inter font | Google Fonts | Latin typography |
| Vanilla CSS | — | Design system, RTL/LTR, responsive |

---

## Browser Support

All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).  
Arabic RTL tested in Chrome, Firefox, and Safari on both desktop and mobile.

---

## License

MIT — free to use, modify, and deploy.

---

*Built by E-Commerce Consulting Division · March 2026*
