# nareshvrde5220.github.io

Personal portfolio website for **Jampala Naresh** — Agentic AI Solution Architect & AWS Certified Generative AI Developer (Professional).

🔗 **Live:** https://nareshvrde5220.github.io/

## Stack

Static site — vanilla **HTML / CSS / JavaScript**, no build step. Hosted on **GitHub Pages** (user site).

| File | Purpose |
|---|---|
| `index.html` | Page structure + all section landmarks |
| `styles.css` | 2026 design system (dark-first, glassmorphism, brand gradient) + responsive layout |
| `script.js` | Theme toggle, mobile menu, scrollspy, scroll progress, back-to-top, reveal-on-scroll |
| `assets/img/` | Images (profile photo, logos, certificate/award thumbnails) |
| `assets/docs/` | Downloadable PDFs (certificates, publications) |
| `.nojekyll` | Disables Jekyll so all assets are served as-is |

## Sections

Hero · About · Experience · Skills · Certifications · Awards & Honors · Education · Publications & Research · Contact

## Local preview

No build required — open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Committing & deploying changes (from local)

Whenever you edit any file (`index.html`, `styles.css`, `script.js`, assets, …), commit and push — GitHub Pages auto-deploys the `main` branch within ~1 minute.

```bash
# 1. go to the project folder
cd "C:/Users/pc/Documents/nareshvrde5220.github.io"

# 2. see what changed (optional)
git status

# 3. stage all changes
git add .

# 4. commit with a short message
git commit -m "Describe what you changed"

# 5. push to GitHub (auto-deploys the live site)
git push origin main
```

After the push, wait ~1 minute, then hard-refresh the live site (**Ctrl+F5**) to see the update.

> **Tip — cache busting:** `styles.css` and `script.js` are loaded with a version query (e.g. `styles.css?v=28`) so browsers don't serve a stale copy. After editing CSS or JS, bump that number in `index.html` (e.g. `?v=28` → `?v=29` for both the CSS link and the JS script tag) in the **same commit**.

First time on a new machine? Clone it first:

```bash
git clone https://github.com/nareshvrde5220/nareshvrde5220.github.io.git
```

## Development

Built and tracked in milestone commits:

- **M1** — scaffold (structure, design tokens, navigation behaviors)
- **M2** — content population
- **M3** — full visual design
- **M4** — interactivity polish
- **M5** — QA (accessibility, responsiveness, privacy review)
- **M6** — deploy & verify

---

© Jampala Naresh
