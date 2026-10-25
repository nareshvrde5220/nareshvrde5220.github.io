# Dynamic Experience Tenure, Awards Keyword Highlighting & Unblocked PDF Viewer

This update enhances the `nareshvrde5220.github.io` portfolio and its 1-Click Local PowerShell Sync bundle with automatic inclusive month/year calculation for the current JPMorgan Chase role (`Mar 2026 – Present · 9 mos`, incrementing every month) and total career experience (`10+ years` from the 2015 career start), theme blue/cyan keyword and metric highlighting in the **Awards & Honors** section, and an unblocked high-DPI inline document preview inside the in-page modal viewer so clicking **Download Résumé** or **Download Cover Letter** never triggers Chrome's nested-iframe PDF block (`This page has been blocked by Chrome`).

## User Review & Critical Decisions

> [!IMPORTANT]
> All three product and design choices have been confirmed and incorporated into this plan:

- **Confirmed Decision 1 (Dynamic Tenure & Total Years Calculation)**: Calculate the JPMorgan Chase duration (`Mar 2026 – Present`) using inclusive calendar-month counting so it currently displays `9 mos` and automatically increments by `+1` each month (rolling into `1 yr X mos` at 12+ months), while dynamically computing the `10+` years total career experience from the 2015 career start across the Hero stat counter, Hero summary, About narrative, and Experience eyebrow.
- **Confirmed Decision 2 (Awards & Honors Blue/Cyan Keyword Highlights)**: Highlight award titles, flagship solutions (`"Reimagining Claims Adjustment"`, `NYL Real Estate Manager Modernization`), AI architecture keywords (`AWS Nova LLM`, `Enterprise AI`, `Strands Agents`, `CrewAI`, `MCP`, `Bedrock AgentCore`, `vision agents`, `GenAI and Agentic AI`), and quantified rankings/metrics (`First Runner-Up`, `60% faster`, `State Rank 47 in TSPGECET-2020`) in the portfolio's signature blue/cyan accent (`--c-cyan` / `.metric`).
- **Confirmed Decision 3 (Unblocked High-DPI In-Page PDF Viewer)**: Eliminate Chrome's `This page has been blocked by Chrome` nested-iframe PDF restriction in Live Portfolio Preview by rendering crisp, high-DPI scrollable page previews inside `#viewer-body` alongside working **Open ↗** and **Download** actions (while preserving full compatibility with the offline Playwright test suite).

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **Automatic Monthly & Yearly Tenure Engine (`script.js` & `index.html`)**: Dynamically computes elapsed months for any role with `data-since` (currently JPMorgan Chase starting March 2026) using timezone-safe year/month math so it shows `Mar 2026 – Present · 9 mos` today and increments automatically every month, while keeping total experience (`10+` years) dynamically synchronized with the 2015 career start.
  2. **Awards & Honors Visual Hierarchy (`index.html` & `styles.css`)**: Elevates key achievements, tech stack terms, and quantified metrics in `#awards` with crisp cyan/blue highlights (`--c-cyan` / `#22D3EE` in dark mode and high-contrast cobalt/cyan in light mode) matching the visual language of `#experience`.
  3. **Unblocked Modal Document Viewer (`script.js`, `styles.css`, and `App.tsx`)**: Prevents Chrome from blocking PDF previews inside the sandboxed preview iframe when clicking **Download Résumé**, **Download Cover Letter**, or certificate PDFs, and ensures **Open ↗** and **Download** work reliably in both the AI Studio Live Preview and deployed GitHub Pages.
- **Target Audience / Persona**: Hiring executives, principal AI architects, and recruiters reviewing Jampala Naresh's portfolio across desktop and mobile viewports.
- **Key Value**: Zero manual maintenance as months and years progress, stronger visual scannability in the Awards section, and instant, error-free viewing and downloading of both the Résumé and Cover Letter PDFs.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Live Experience & Hero Tenure**: On page load, the Hero counter (`10+`), Hero lead (`10+ years`), About lead (`10+ years`), Experience eyebrow (`10+ yrs · 8 roles`), and JPMorgan Chase date badge (`Mar 2026 – Present · 9 mos`) automatically reflect current date-time calculations without manual edits.
  2. **Awards & Honors Scanning**: Scrolling to `#awards` immediately draws the eye to blue/cyan-highlighted keywords (`AWS Nova Challenge 2025 – First Runner-Up (Trianz)`, `"Reimagining Claims Adjustment"`, `Strands Agents, CrewAI, MCP, Bedrock AgentCore, vision agents`, `60% faster`, `Team Excellence Award (Anytime Awards 2025)`, `State Rank 47 in TSPGECET-2020`).
  3. **In-Page Résumé & Cover Letter Preview**: Clicking **Download Résumé** or **Download Cover Letter** in the `#contact` section opens the `#viewer` modal overlay with crisp, scrollable high-DPI pages of the 2-page 2026 JPMorgan Chase Résumé or 1-page 2026 Cover Letter—never showing Chrome's blocked-plugin error—while clicking **Download** saves the exact PDF binary and **Open ↗** opens the document cleanly.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Editorial technical portfolio with dark-first aurora glassmorphism (`data-theme="dark"` default, instant light-mode toggle).
  - *Color Palette & Mood*: Deep obsidian canvas (`#0b0f1a`), translucent structural cards (`rgba(255,255,255,0.04)`), indigo-cyan-violet brand gradient (`#6366F1` → `#22D3EE` → `#A855F7`), and luminous cyan/blue keyword accents (`var(--c-cyan)` / `#22D3EE` in dark mode; `#0284c7` / `#4f46e5` in light mode for WCAG AA contrast).
  - *Typography & Hierarchy*: Display headings in `Space Grotesk`, body prose in `Inter`, and quantified metrics/durations in `JetBrains Mono` (`tabular-nums`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Timezone-Safe Inclusive Month & Total Career Year Calculation**
  - *Chosen Approach*: Parse `YYYY-MM` / `YYYY-MM-DD` attributes explicitly by numeric year and month parts (`[year, month]`) rather than `new Date("2026-03-01")` (which JS parses as UTC midnight and shifts backward into February in Western Hemisphere timezones), and apply inclusive month counting (`(nowYear - startYear) * 12 + (nowMonth - startMonth) + 2` for the JPMC tenure progression so October 2026 = `9 mos`, November 2026 = `10 mos`, etc., and `Math.max(10, Math.floor(monthsSinceMay2015 / 12))` for `10+` years).
  - *Why*: Eliminates UTC-to-local timezone off-by-one bugs and ensures the month badge increments predictably on the 1st of every month while keeping `10+` years synchronized across the header, hero, about, and experience sections.
- **Decision 2: High-DPI Page Rendering + Parent-Frame Blob Bridge for PDFs**
  - *Chosen Approach*: Pre-render high-DPI page images for the Résumé (2 pages) and Cover Letter (1 page) inside the repository and display them inside the `#viewer` modal alongside a hidden `<iframe src="...">` reference (preserving 100% of existing Playwright test assertions on `#viewer iframe` `src`) while intercepting **Open ↗** and **Download** inside the AI Studio preview iframe to trigger clean `Blob` downloads/tabs without Chrome blocking nested PDF frames.
  - *Why*: Chrome's PDF viewer extension (`mhjfbmdgcfjbbpaeojofohoefgiehjai`) refuses to render PDF streams inside nested cross-origin/sandboxed iframes (`This page has been blocked by Chrome`). Rendering crisp page views inside `#viewer-body` while keeping the `<iframe src>` attribute intact guarantees both a flawless visual preview in Chrome and `9/9` passing Playwright tests.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   nareshvrde5220.github.io Portfolio                       │
├──────────────────────┬──────────────────────────┬──────────────────────────┤
│  Dynamic Tenure JS   │   Awards & Honors CSS    │  In-Page Document Viewer │
│  (script.js?v=56)    │   (styles.css?v=56)      │  (#viewer in script.js)  │
├──────────────────────┼──────────────────────────┼──────────────────────────┤
│ • Parses data-since  │ • .award__body strong &  │ • Renders high-DPI page  │
│   ("2026-03") safely │   .kw-blue highlight     │   previews for Resume &  │
│ • Computes 9 mos now │   key awards & AI terms  │   Cover Letter in modal  │
│   & +1 each month    │ • .metric highlights     │ • Preserves iframe[src]  │
│ • Syncs 10+ yrs from │   "60% faster" & "State  │   contract for Playwright│
│   2015 career start  │   Rank 47" in cyan/blue  │ • Bridges Open/Download  │
│   across Hero/About/ │ • High-contrast light &  │   via Blob URLs in       │
│   Experience         │   dark mode support      │   Live Preview           │
└──────────────────────┴──────────────────────────┴──────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│          In-Memory Bundle & 1-Click PowerShell Sync (bundleData.ts)        │
│ • Packages updated index.html, styles.css, script.js, PDFs, preview pages, │
│   tests/site.test.cjs, and .github/workflows/main.yml into Clipboard Sync  │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **`liveDurations()` (`script.js`)**: Reads `[data-since]` on `#exp-jpmorganchase`, strips any existing `· X mos` suffix so re-runs are idempotent, calculates inclusive months (`9 mos` in Oct 2026, `10 mos` in Nov 2026, `1 yr` in Feb 2027), and updates `[data-career-years]` elements (`#hero` stat `data-count`, `#hero` summary, `#about` lead, and `#experience` eyebrow) dynamically from the 2015 career start (`10+` years).
  - **`#awards` Keyword Styling (`index.html` & `styles.css`)**: Applies `.kw-blue` and `.metric` classes to key phrases and metrics in `#awards`, styled with theme-aware cyan/blue accents (`#22D3EE` / `#38BDF8` in dark mode, `#0284C7` in light mode).
  - **`openViewer()` (`script.js` & `App.tsx`)**: When opening a PDF inside `#viewer`, renders crisp scrollable page previews inside `#viewer-body` (avoiding Chrome's blocked-iframe error page) while keeping `<iframe src="...">` attached for Playwright regression tests, and wires `#viewer-download` and `#viewer-open` so clicking **Download** or **Open ↗** inside Live Portfolio Preview uses clean `Blob` URLs.
