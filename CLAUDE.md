# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack & deployment

Static site — vanilla HTML / CSS / JavaScript, no build step, no package manager, no framework.
Hosted on **GitHub Pages** (user site at `https://nareshvrde5220.github.io/`). Pushing `main` auto-deploys within ~1 minute.

## Local preview

```bash
python -m http.server 8080
# visit http://localhost:8080
```

## Deploying changes

```bash
git add <files>
git commit -m "Describe what changed"
git push origin main
```

After any CSS or JS edit, bump the cache-busting version query in `index.html` — both the `<link>` for `styles.css` and the `<script>` for `script.js` carry `?v=N`. Increment that number in the same commit.

## Architecture

All content lives in **`index.html`** as a single-page layout. Sections in document order:

`#hero` → `#about` → `#journey` (career timeline) → `#experience` → `#skills` → `#certifications` → `#awards` → `#education` → `#publications` → `#contact`

**`styles.css`** owns the entire design system: CSS custom properties for dark/light themes on `[data-theme]`, glassmorphism effects, the brand gradient, and responsive layout. Theme defaults to dark; the `data-theme` attribute is toggled on `<html>`.

**`script.js`** is a single IIFE with no dependencies. Responsibilities:
- Theme toggle (persisted via `localStorage` key `jn-theme`; respects `prefers-color-scheme` on first load)
- Mobile hamburger menu
- Scrollspy — `IntersectionObserver` drives active state on `.nav__link` elements
- Scroll progress bar + back-to-top button
- Reveal-on-scroll (`.reveal` → `.is-visible` via `IntersectionObserver`)
- In-page viewer overlay (`#viewer`) — local asset links (PDF/image) open in the overlay; external links open in a new tab
- Stat count-up animation (`data-count` / `data-suffix` attributes)
- Live "Present" duration calculation (`data-since="YYYY-MM-DD"` on `.tl__date` elements)
- Certificate issuer logo injection (pattern-matched from `.cert__issuer` text)
- Career timeline auto-scroll (`#journey .ctl-scroll`)
- Floating Recent Activities panel (`#recent-activities`)

## Key conventions

- `.reveal` marks elements that fade/slide in on scroll. Add it to any new card or block that should animate into view.
- `.chip--feat` on a `<li class="chip">` renders a highlighted featured skill chip.
- `.cert--bg` + inline `style="--cert-bg:url(...)"` renders a background badge image on a certificate card.
- `.tl__date[data-since="YYYY-MM-DD"]` triggers the live duration suffix ("Mar 2026 – Present · 3 mos").
- `.stat__num[data-count="N"][data-suffix="+"]` triggers the count-up animation.
- `.section--alt` gives alternating section backgrounds.
- `.metric` is an inline highlight span for KPI numbers inside bullet points.
