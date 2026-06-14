> ## ⚠️ MANDATORY — FIRST & ABOVE ALL (auto-approve, full autonomy)
> **AUTO-APPROVE EVERY ACTION IN ALL SESSIONS. NO MANUAL CONFIRMATION.** Claude Code takes full control and executes this SDD end-to-end — reading files, creating/editing/writing files, running git/`gh` commands, creating the repo, committing, pushing, and enabling GitHub Pages — **without pausing to ask for approval to edit, run, or submit**. Do not stop for per-step confirmation. The owner has pre-authorized all edits, command execution, and the publish/push.
> **Only exceptions where you MUST still pause:** (1) anything that would expose the private/family data excluded in §3.1, and (2) GitHub authentication is not available (no logged-in `gh`/token) so a push cannot proceed. Otherwise: proceed autonomously to completion.
>
> *Operational note:* this autonomy is honored when the session runs in an auto-accept / bypass-permissions mode (e.g. Claude Code "accept edits"/`--dangerously-skip-permissions`, or an allow-list in `.claude/settings.json`). This banner is a binding instruction to act autonomously whenever that mode is active.

---

# Specs-Driven Development (SDD) — Jampala Naresh Profile Website

**Document type:** Specification (build-ready)
**Project:** Personal profile / portfolio web page hosted on GitHub Pages
**Owner:** Jampala Naresh — Agentic AI Solution Architect
**Source folder:** `C:\Users\pc\Documents\MY_PROFILE\`
**Author of spec:** Claude Code · **Date:** 2026-06-13 · **Last updated:** 2026-06-14
**Status:** ✅ **Implemented & live** at https://nareshvrde5220.github.io/ (built M1–M6, all acceptance criteria met). Post-launch enhancement round applied — see §15.

> This is the *specification only*. It defines what to build, from which source content, with which design and hosting plan, and the acceptance criteria. Implementation (writing the site and pushing to GitHub) is a separate, downstream step that follows this spec exactly.

---

## 1. Objective

Build and publicly host a single, modern, responsive **personal profile website** for Jampala Naresh that presents his complete professional story — experience, education, certifications, awards, skills, publications — using the real content already curated in this folder, and host it on **GitHub Pages** at a clean URL.

**Primary outcome:** a live site at `https://nareshvrde5220.github.io` that a recruiter or hiring manager can open on any device and, within seconds, understand who Naresh is, navigate smoothly to any section, and reach the source documents (resume PDF, certificate PDFs, white paper).

---

## 2. Goals & success metrics

| # | Goal | Measure of success |
|---|---|---|
| G1 | Faithfully present all professional content from this folder | Every professional section in §5 renders with real data; no Lorem Ipsum, no invented facts |
| G2 | Modern 2026 visual design | Dark-first theme, gradient/glass accents, large type, motion-on-scroll (see §7) |
| G3 | Smooth section navigation | Sticky top nav + scrollspy highlights current section; in-page links scroll smoothly; mobile hamburger menu |
| G4 | Hostable on GitHub Pages with zero build | Static `index.html` + assets, no Node/build step; works when served as plain files |
| G5 | Published live | Repo `nareshvrde5220.github.io` created, pushed, Pages enabled, URL returns HTTP 200 |
| G6 | Fast & accessible | Lighthouse Performance ≥ 90, Accessibility ≥ 95 on mobile; works without JS for core content |

---

## 3. Scope decisions (confirmed with owner)

These were explicitly decided and are **binding** on the implementation:

1. **Private/family data is EXCLUDED.** The spouse name, children's names & birthdates, the owner's date of birth, age, and wedding anniversary found in `LinkedIn_Profile/Experience detaills.xlsx` (rows 14–20) **must not appear anywhere** on the public site, in markup, comments, metadata, or commit history. Only the *professional* columns of that spreadsheet (company / role / dates / experience totals) are used.
2. **Hosting model: user site.** Repository name `nareshvrde5220.github.io`, served at the root URL `https://nareshvrde5220.github.io`.
3. **Contact exposure: full.** The page displays email, mobile phone, and all profile links (owner accepted the spam trade-off). See §5.1 for the exact values.

### In scope
Static profile website; all professional sections (§5); responsive + dark/light; smooth nav; downloadable PDFs; SEO/social meta; GitHub Pages deployment.

### Out of scope
Backend/server code; databases; contact-form email delivery (a `mailto:` link is sufficient); blog/CMS; analytics requiring consent banners (optional, off by default); the research PDF content rewriting (the file in `Recent_Research_works/` is *linked*, not reproduced); any private/family data (§3.1).

---

## 4. Source content inventory & mapping

All content is **already in this folder** — the site is a presentation layer over it. Authoritative sources, in priority order:

| Source file | Used for |
|---|---|
| `LinkedIn_Profile/Jampala_Naresh_LinkedIn_Profile.md` | Master text for About, Experience bullets, Awards, Education, Certs, Skills, Publications, Activity |
| `Naresh_Resume_HighRes.pdf` | Contact block, headline/title, profile summary, core competencies; linked as a download |
| `LinkedIn_Profile/Experience detaills.xlsx` (cols A–E only) | Precise experience dates & durations; total experience **9 yrs 7 mos** |
| `Jampala Naresh Cover Letter.pdf` | Linked as a download; tone reference for the intro |
| `LinkedIn_Profile/images/**` | Profile photo, banner, certificate images, award images, post images, employer logos |
| `LinkedIn_Profile/files/**` | Certificate & white-paper PDFs (linked as "View PDF") |
| `Recent_Research_works/sdd_2026_June_13.pdf` | Linked under Research/Publications as a recent work |

**Asset handling rule:** the site references these assets **in place via relative paths** (do not duplicate bytes — this folder is MD5-deduplicated per `CLAUDE.md`). Implementation copies/links the needed `LinkedIn_Profile/images`, `LinkedIn_Profile/files`, and top-level PDFs into the published site tree (see §9) without creating byte-duplicates of distinct originals.

### 4.1 Canonical professional facts (single source of truth for the build)

- **Name:** Jampala Naresh
- **Headline:** Agentic AI Solution Architect & AWS Certified Generative AI Developer – Professional · 9+ years across Insurance, Finance, Automotive & Defence (AWS & Azure)
- **Location:** Hyderabad, Telangana, India
- **Total experience:** 9 years 7 months (per spreadsheet, as of 2026-06-13)
- **Current role:** Applied AI ML Associate Senior, JPMorganChase (Mar 2026 – present)

### 4.2 Canonical skills (full taxonomy rendered in the Skills section)

- **Agentic AI — Architecture & Orchestration:** Agentic AI, AWS AgentCore, Model Context Protocol (MCP), CrewAI, AutoGen, AWS Strands-Agents, LangGraph, LangChain, Vertex AI Agent Builder.
- **Generative AI & LLM Ecosystem:** Generative AI, Large Language Models (LLM), Claude, OpenAI, Amazon Bedrock (FM Models), Bedrock Data Automation, Ollama, RAG Pipelines, Prompt Engineering, LLMOps, LLM Fine-Tuning, Responsible AI & Governance, Deep Reinforcement Learning.
- **Machine Learning, Deep Learning & Algorithms:** Machine Learning, Deep Learning, IsolationForest, XGBoost, CNN, RNN, LSTM, ANN, DNN, Wavelets, Transformer, TensorFlow, Keras, PyTorch, HuggingFace, Scikit-learn, MATLAB.
- **AWS Cloud Services:** Amazon Bedrock, SageMaker, Lambda, API Gateway, EC2, S3, DynamoDB, CloudWatch, Cognito, Step Functions, Glue, Athena, Redshift, Textract, EventBridge, SNS, Docker.
- **Azure & Google Cloud AI:** Azure AI Studio, Azure AI Foundry, Azure Databricks, Azure Functions, Blob Storage, Event Grid, Azure Data Explorer, Vertex AI, Gemini Models, Vertex AI Vector Search, Vertex AI Model Garden.
- **Python, Web & APIs:** Python 3.13+, FastAPI, GraphQL, Django, Flask, Pandas, NumPy, Matplotlib, ETL & CI/CD, Docker.
- **Data, SQL, Integrations & Tools:** Advanced SQL, Query Optimization, Window Functions, Stored Procedures, MySQL, PostgreSQL, SQL Server, Snowflake, Salesforce (GenAI / Agentic), Feature Engineering, Statistics, Git & Code Reviews, Technical Project Leadership.

---

## 5. Information architecture (sections & navigation)

Single-page (`index.html`) with anchored sections; the sticky nav links to each. Order top → bottom:

1. **Hero / Header** — banner, profile photo, name, headline, location, primary CTAs (Download Resume, Email, LinkedIn, GitHub, Credly), key stats (9+ yrs, 15 certifications, 8 roles, award).
2. **About** — the "About" narrative + profile summary + core competencies chips.
3. **Experience** — vertical timeline, 8 roles (JPMorganChase → Trianz ×2 → People Tech → Teamware → CSIR-NGRI → IITM → DRDO), each with exact dates/duration from the spreadsheet, location, achievement bullets, and per-role skill tags. Quantified wins surfaced (e.g. 60% faster claims, 90% accuracy, 94% detection).
4. **Skills** — 7 grouped clusters with featured chips emphasised (see the full canonical list in §4.2): Agentic AI orchestration, Generative AI & LLM ecosystem, ML/DL & algorithms, AWS cloud services, Azure & Google Cloud AI, Python/Web/APIs, and Data/SQL/integrations.
5. **Certifications** — card grid of 15 certs with issuer + date + credential ID; cards link to the certificate PDF/image where one exists; AWS verify links where present.
6. **Awards & Honors** — Team Excellence Award (Amazon Nova global runner-up) with ceremony photo + certificate image; Innovation Award; external article/video links.
7. **Education** — 4 entries (MTech SSP, BTech ECE, Intermediate, SSC) with the MTech detail.
8. **Publications & Research** — "AI-driven Intelligent Email Automation" white paper (PDF link) + the `Recent_Research_works` PDF + featured posts.
9. **Contact** — email, phone, location, and all social/profile links; footer.

### Navigation behaviour (G3)
- Sticky top navbar with anchor links to sections 2–9, blurred/translucent background on scroll.
- **Scrollspy:** the nav item for the section currently in view is highlighted.
- Smooth scrolling (`scroll-behavior: smooth`) with offset for the sticky header.
- Mobile (<768px): collapses to a hamburger menu; tap closes the menu and scrolls.
- "Back to top" button appears after first scroll.
- Theme toggle (dark/light) in the navbar, persisted in `localStorage`.

---

## 6. Requirements

### 6.1 Functional
- FR1 — Render all sections in §5 from the real source data in §4.
- FR2 — Every PDF/image referenced is reachable from the page (download or view in new tab).
- FR3 — Sticky nav with working anchors, scrollspy, smooth scroll, mobile menu, back-to-top.
- FR4 — Dark/light theme toggle, persisted across visits.
- FR5 — Reveal-on-scroll animation for cards/timeline (respecting `prefers-reduced-motion`).
- FR6 — Contact actions: `mailto:` and `tel:` open natively.
- FR7 — **In-page viewer (overlay):** local PDFs and images open in a full-screen overlay *within the same window* (no new tab/window), embedded via `<iframe>`/`<img>` with a **Download** action; closed via ✕, backdrop click, or `Esc`. **External links navigate directly in the same window** (no new tab) — they are intentionally not framed because third-party sites (LinkedIn, GitHub, AWS, Credly, Google Maps) send `X-Frame-Options`/CSP headers that block iframe embedding. Without JS, all links degrade to same-tab navigation. *(Supersedes the earlier `target="_blank"` behavior in FR6.)*

### 6.2 Non-functional
- NFR1 — **No build step.** Plain HTML/CSS/JS that runs when opened as static files (GitHub Pages friendly).
- NFR2 — Responsive 320px → 1920px; no horizontal scroll.
- NFR3 — Performance: lazy-load below-the-fold images; total initial payload lean; Lighthouse Perf ≥ 90.
- NFR4 — Accessibility: semantic HTML5 landmarks, alt text on all images, keyboard-navigable, visible focus, color contrast ≥ WCAG AA; Accessibility ≥ 95.
- NFR5 — SEO/social: `<title>`, meta description, Open Graph + Twitter card (image = profile photo/banner), canonical URL, `robots`/sitemap optional.
- NFR6 — Core content readable with JavaScript disabled (JS only enhances nav/animation/theme).
- NFR7 — No private data anywhere in source or output (§3.1) — enforced by a pre-publish grep for the excluded names/dates.

---

## 7. Design system (modern 2026 theme)

**Direction:** dark-first "AI/architect" aesthetic — deep neutral background, a vivid gradient accent, glassmorphism cards, generous whitespace, oversized display headings, subtle motion.

- **Color (dark default):**
  - Background `#0B0F19` → `#0E1320`; surfaces/cards `rgba(255,255,255,0.04)` with `backdrop-filter: blur(12px)` and 1px hairline border `rgba(255,255,255,0.08)`.
  - Accent gradient: `#6366F1` (indigo) → `#22D3EE` (cyan) → `#A855F7` (violet) for headings, buttons, timeline line, skill chips on hover.
  - Text: primary `#E5E7EB`, muted `#9CA3AF`.
  - Light theme: background `#F8FAFC`, surfaces `#FFFFFF`, same accent gradient, text `#0F172A`.
- **Typography:** display/headings `Space Grotesk` (or `Sora`); body `Inter`; mono accents `JetBrains Mono` for credential IDs/metrics. Load via Google Fonts with `preconnect` and `display=swap`; provide system-font fallback stack.
- **Layout:** max content width ~1100px, fluid grid; cards with 16–20px radius; soft shadows in light, glow accents in dark.
- **Motion:** intersection-observer fade/translate-up reveals; nav blur transition; button hover lift; all gated behind `prefers-reduced-motion: reduce`.
- **Iconography:** inline SVG / a lightweight icon set (e.g. Lucide via CDN) for contact + section icons.
- **Components:** hero with stat counters; timeline (vertical, gradient spine, dotted nodes); cert card; award gallery; skill chip cloud; section header with eyebrow label + gradient title.

---

## 8. Technical approach

- **Stack:** static **HTML + CSS + vanilla JS**. No framework, no bundler — maximally compatible with GitHub Pages and matches NFR1.
  - *Rationale vs alternatives:* React/Vite or Astro would add a build step and CI complexity for a single static page with fixed content; not justified. Plain static files are the lowest-risk path to G4/G5.
- **Files:** one `index.html`, one `styles.css`, one `script.js`, plus `assets/` for media. Optionally split CSS but keep it buildless.
- **Data:** content is authored directly into the HTML (it is fixed, curated profile data). No JSON/templating layer required; if desired later, a `data/profile.json` + render script is a clean extension (out of scope now).
- **Browser support:** evergreen Chrome/Edge/Firefox/Safari; graceful degradation for `backdrop-filter`.

---

## 9. Published site structure (repo layout)

```
nareshvrde5220.github.io/
├── index.html
├── styles.css
├── script.js
├── README.md                      # short: what this is + URL
├── .nojekyll                      # serve files as-is, skip Jekyll processing
├── CNAME                          # only if a custom domain is later added (optional)
└── assets/
    ├── img/
    │   ├── profile_photo.jpg       # from LinkedIn_Profile/images/
    │   ├── banner.jpg
    │   ├── certificates/ …         # 4 cert images
    │   ├── awards/ …               # TEA cert, ceremony photo, innovation award
    │   ├── posts/ …                # 2 post images
    │   └── logos/ …                # 5 employer logos
    └── docs/
        ├── Naresh_Resume_HighRes.pdf
        ├── Jampala_Naresh_Cover_Letter.pdf
        ├── certs/ …                # 4 certificate PDFs
        ├── Publication_AI-driven_Intelligent_Email_Automation_Whitepaper.pdf
        └── sdd_2026_June_13.pdf
```

**Note on deduplication (per `CLAUDE.md`):** copy each distinct original exactly once into `assets/`. Do not re-introduce the cert duplicates that the archive already de-duplicated. The website repo is a *separate* publishable copy of the assets it needs; the curated archive under `LinkedIn_Profile/` remains the source of truth and is **not** itself published.

---

## 10. GitHub hosting plan (deployment)

Target: `https://github.com/nareshvrde5220` → repo `nareshvrde5220.github.io` → live at `https://nareshvrde5220.github.io`.

**Prerequisites the owner must confirm/provide at implementation time:**
- GitHub auth available to the CLI (e.g. `gh auth status` is logged in, or a PAT). The local git user is `nareshvrde5220`.
- Confirmation to push to a *public* repo (Pages on free accounts requires public).

**Steps (executed during implementation, not now):**
1. Build the site files (§8–9) in a working directory.
2. Create the repo: `gh repo create nareshvrde5220/nareshvrde5220.github.io --public --source . --remote origin` (or create empty on GitHub, then add remote).
3. Add `.nojekyll`, commit on `main`.
4. `git push -u origin main`.
5. Enable Pages: for a `*.github.io` user repo, Pages auto-serves `main` at the root; verify under **Settings → Pages** (Source = Deploy from branch, `main` / root). Via API: `gh api -X POST repos/nareshvrde5220/nareshvrde5220.github.io/pages -f source[branch]=main -f source[path]=/`.
6. Wait for the Pages build, then verify `https://nareshvrde5220.github.io` returns HTTP 200 and renders.
7. (Optional) custom domain via `CNAME` + DNS — out of scope unless requested.

**Rollback:** Pages serves the last successful commit; reverting a bad commit and pushing re-deploys.

---

## 11. Acceptance criteria (Definition of Done)

The build is complete when **all** are true:

- [x] AC1 — `index.html` renders all 9 sections (§5) with real data; no placeholder text.
- [x] AC2 — Experience timeline shows all 8 roles with exact dates/durations matching the spreadsheet; total "9+ yrs" stat shown.
- [x] AC3 — All 15 certifications listed; those with a PDF/image link open it; verify links work where present. *(Enhancement: the 8 certs without local assets now link to verifiable references — Credly for Skillsoft, NVIDIA DLI for the NVIDIA cert; see §15.)*
- [x] AC4 — Awards section shows the Team Excellence Award with ceremony photo + certificate image and the external article/video links.
- [x] AC5 — Resume, cover letter, white paper, cert PDFs, and the research PDF are all reachable from the page (now via the in-page viewer with a Download action, FR7).
- [x] AC6 — Sticky nav + scrollspy + smooth scroll + mobile menu + back-to-top all work; theme toggle persists.
- [x] AC7 — Responsive with no horizontal scroll at 320/375/768/1024/1440px; `prefers-reduced-motion` respected.
- [ ] AC8 — Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. *(Built to target; needs a manual Lighthouse run to record the score.)*
- [x] AC9 — **Privacy check passes:** a grep of the entire published repo for the excluded family names, DOBs, and anniversary returns **zero** matches.
- [x] AC10 — Repo `nareshvrde5220.github.io` exists, is pushed, Pages enabled, and the live URL returns 200 and renders correctly on desktop + mobile.

---

## 12. Implementation milestones

| Phase | Deliverable |
|---|---|
| M1 — Scaffold | Repo layout (§9), `index.html` skeleton with all section landmarks + nav, `.nojekyll` |
| M2 — Content | All §5 sections populated from §4 sources; assets copied into `assets/` (dedup-safe) |
| M3 — Design | `styles.css` implementing the §7 design system, responsive, dark/light |
| M4 — Interactivity | `script.js`: scrollspy, smooth scroll, mobile menu, reveals, theme toggle, back-to-top |
| M5 — QA | Run AC1–AC9 locally; fix; privacy grep; Lighthouse pass |
| M6 — Deploy | §10 steps; verify AC10 live |

---

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Accidental leak of private data | §3.1 exclusion + AC9 automated grep before publish |
| GitHub auth/permissions not ready | Confirm `gh auth status` before M6; pause and ask owner if missing |
| `backdrop-filter` unsupported on old Safari | Solid fallback surface color via `@supports` |
| Large images hurt performance | Lazy-load, set width/height, the 3264px ceremony photo served at constrained display size |
| `*.github.io` name already taken on the account | Fall back to a project repo (e.g. `profile`) at `…github.io/profile/` — note the URL change to owner |

---

## 14. Open items for owner (non-blocking)

- Custom domain (e.g. `jampalanaresh.com`) — add later via `CNAME` if desired.
- Optional privacy-friendly analytics (e.g. GoatCounter) — off by default.
- Whether to embed the white paper inline (PDF.js) vs link-only — spec assumes link-only.

---

## 15. Implementation log & post-launch changes

**Built:** 2026-06-14 in milestone commits M1–M6 in repo `nareshvrde5220.github.io` (separate, public; source `MY_PROFILE` stays local-only). Live at https://nareshvrde5220.github.io/. Stack: vanilla HTML/CSS/JS, no build (NFR1). 24 deduped assets copied into `assets/img` + `assets/docs`.

### Post-launch enhancement round (2026-06-14)
1. **Location is now a link.** "Hyderabad, Telangana, India" in the hero and the Contact card link to the owner's map pin (`https://goo.gl/maps/JdpjcBJYLMQsFt9s7`).
2. **In-page viewer (FR7).** Removed all `target="_blank"`. Local PDFs/images open in a full-screen same-window overlay with a Download action, closeable via ✕ / backdrop / `Esc`. External links navigate directly in the same window — they are not framed because third-party sites (LinkedIn, GitHub, AWS, Credly, Google Maps) send `X-Frame-Options`/CSP that block iframe embedding. *(Owner chose direct navigation over an in-overlay fallback for external links, 2026-06-14.)*
3. **Publications fix.** "AI-Powered SDLC Automation" no longer points at the SDD PDF; it links to the actual LinkedIn post (`…activity-7425965777876373505…`) **and** the GitHub repo `Ollama_SDLC_CrewAI_MultiAgent_Orchestration_RTX4090`.
4. **SDD card added** to Publications & Research, opening `assets/docs/sdd_2026_June_13.pdf` (the `Recent_Research_works/sdd_2026_June_13.pdf` original).
5. **Certification references.** The 8 certs without local assets now carry verifiable links: the 7 Skillsoft certs → the owner's Credly hub (`credly.com/users/jampala-naresh`); the NVIDIA cert → NVIDIA DLI verification (`learn.nvidia.com/certificates?id=…`). No local docs existed for these and LinkedIn returns HTTP 999 to scrapers, so Credly/DLI are used as the authoritative public credential references (both verified HTTP 200). Exact per-credential LinkedIn URLs can be substituted later via the Claude-in-Chrome playbook in `LinkedIn_Profile/SESSION_LOG.md` if desired.

### Post-launch enhancement round 2 (2026-06-14)
6. **Career Timeline section** added between About and Experience (new `#journey` section + nav link): a horizontal, scroll-snapping timeline of all 7 stops (2015→2026, oldest→newest, DRDO-VRDE → IITM → CSIR-NGRI → Teamware → People Tech → Trianz → **JPMorganChase, Hyderabad**) with gradient rail, glowing nodes (the current role pulses), year pills, staggered reveal — built as real markup (not a screenshot image). Modeled on the owner's reference screenshot but restyled to the 2026 system.
7. **Experience — full legal org names + live current-role duration.** Org names now use the authoritative Excel forms (e.g. *Trianz Digital Consulting Pvt Ltd*, *People Tech Enterprises Pvt Limited*, *Teamware Solutions (Quantum Leap Consulting Pvt. Ltd.)*, *CSIR-NGRI*, *IITM*, *DRDO-VRDE*); Teamware location corrected to **Chennai**. The JPMorganChase role shows a **live-computed** duration (`data-since="2026-03-01"`, JS renders "Mar 2026 – Present · N mos/yrs", recalculated from the visitor's current date). (FR8)
8. **Certification issuer logos.** JS injects an issuer logo on each cert card — AWS logo on the 6 AWS certs, Skillsoft logo on the 7 Skillsoft certs, and styled NVIDIA / NIELIT text badges (logos sourced from the LinkedIn-archive `logos/`; the cover letter PDF contained no extractable brand logos, only text).
9. **Header & 3xAWS highlight.** Hero headline changed to "Agentic AI Solution Architect & **3xAWS** Certified with Generative AI Developer — Professional"; the "15 Certifications" eyebrow also carries the **3xAWS** badge (gradient pill component `.badge-3x`).
10. **Contact links now look like links** — the value text in each contact card is rendered in the accent color with an underline (hyperlink affordance).
11. **Awards** — removed the redundant standalone *Trianz Innovation Award* card (already covered by the Team Excellence Award entry).
12. **Publications** — added *Multi-Agent Orchestration: Automating Software Development with 7 AI Agents* (AutoGen) with its LinkedIn post + GitHub `AutoGen-Multi-Agent-Code-Generator` links.
13. **Floating "Recent Activities" panel (FR9)** — a fixed, collapsible side panel pinned mid-right, visible across the whole page while scrolling (expanded on desktop, collapsed-to-tab on mobile, user-toggleable). Contains three quick links: the SDD write-up (opens the local PDF in the overlay viewer), AI-Powered SDLC Automation (LinkedIn + GitHub), and Multi-Agent Orchestration (LinkedIn + GitHub).

New functional requirements introduced this round: **FR8** (live "Present" role durations computed from the visitor's date) and **FR9** (persistent floating Recent Activities panel).

### Post-launch enhancement round 3 (2026-06-14)
14. **Certification links verified & corrected.** Each cert now links to a destination appropriate to its **issuer**: AWS certs → their local PDF/image (or AWS certmetrics verify), NVIDIA → NVIDIA DLI, NIELIT → its local certificate image, and the 7 **Skillsoft** certs → **skillsoft.com** (issuer site) instead of the generic Credly profile. *(Skillsoft has no public per-credential verify URL and LinkedIn is unreachable to scrapers; the issuer site is the closest correct organization link. skillsoft.com loads in browsers — it returns 403 only to non-browser/bot requests.)*
15. **Cert logos repositioned** from the top-center of the card to the **end of the certificate title** (inline, right-aligned within the title row).
16. **Live duration rounds up.** The JPMorganChase "Present" duration now rounds **up** to the next whole month once any extra days have elapsed (e.g. Mar 2026 → on 14 Jun 2026 shows "4 mos"; rolls to 5, 6, … and "1 yr 1 mos" as the visitor's date advances). (refines FR8)
17. **Mobile-browser hardening (FR10).** Added `overflow-x: clip` (horizontal-scroll guard that is safe for the sticky nav) and `-webkit-text-size-adjust: 100%` (stops iOS Safari from inflating text on rotate). Cross-checked the responsive system end-to-end: viewport meta present; all grids collapse (≤980 / ≤860 / ≤560 breakpoints); the Career Timeline scrolls horizontally with touch; the Recent Activities panel auto-collapses to a tab below 980px; the overlay viewer goes full-screen ≤560px; `100svh` hero height for mobile address-bar correctness. Targets Android Chrome, iOS Safari, and other evergreen mobile browsers.

New functional requirement: **FR10** (mobile-browser compatibility hardening).

### Post-launch enhancement round 4 (2026-06-14)
18. **Hero corner badges.** The two official AWS *Early Adopter* badges are displayed as decorative, gently-floating images in the hero's top-left (AI Practitioner) and top-right (Generative AI Developer – Professional) corners, at high resolution. Source: `certificate  images/` (copied to `assets/img/badges/`).
19. **AWS cert watermarks.** Three AWS cert cards now show their official badge as a faint transparent watermark behind the text (`--cert-bg` + `.cert--bg::after`, ~12% opacity): GenAI Developer – Professional, ML Specialty, AI Practitioner. The AI Practitioner card keeps both **View →** and **Verify →** links.
20. **Skillsoft certs → LinkedIn.** The 7 Skillsoft cert links now point to the owner's LinkedIn *Licenses & certifications* page (`/in/jampala-naresh/details/certifications/`) — "View credential →" — instead of the issuer homepage.
21. **AWS logo refreshed.** The injected AWS issuer logo (at the end of each AWS cert title) now uses the supplied `aws_logo.png`, shown in true colors on a small white chip (never inverted).
22. **Career Timeline scroll affordance (FR11).** The horizontal timeline now: converts vertical wheel input to horizontal scroll while it still has room (page scroll resumes once it reaches the end), supports mouse drag-to-scroll, has a styled gradient scrollbar, smooth scroll-behavior, and a "↔ Scroll or drag to explore" hint. Native touch scrolling is preserved on mobile.
23. **Recent Activities default-open + hover-open.** The floating panel now opens by default on load (tablet/desktop; collapsed to a tab on phones) and, if collapsed, **auto-opens (animated) on pointer hover**.

New functional requirement: **FR11** (Career Timeline horizontal scroll affordance — wheel/drag/hint).

Assets added this round (copied from `certificate  images/`, deduped): `assets/img/badges/{aws_ai_practitioner_early_adopter,aws_genai_developer_early_adopter,aws_genai_developer,aws_ml_specialty,aws_ai_practitioner}.png` and `assets/img/logos/aws_logo.png`.

### Post-launch enhancement round 5 (2026-06-14)
24. **Tuning:** hero corner badges enlarged (`clamp(92px,11vw,152px)`, 76px on phones); AWS cert watermark opacity raised to ~0.22; AWS issuer logo on cert titles enlarged (26px on its white chip).
25. **Career Timeline auto-scroll (refines FR11).** When the timeline scrolls into view it now **auto-animates left→right to the end** (eased, ~easeInOut, reduced-motion-aware); any user wheel/drag/touch/key interaction cancels it. The redundant "Scroll or drag" hint banner was **removed**. Wheel-to-horizontal and drag-to-scroll remain.
26. **Skillsoft per-credential links — RESOLVED.** The 7 Skillsoft certs now each link to their **exact Skillsoft digital-badge credential page** (`skillsoft.digitalbadges.skillsoft.com/<uuid>`), replacing the generic LinkedIn certifications link. The owner supplied the "Show credential" URLs from their authenticated LinkedIn page (LinkedIn itself returns HTTP 999 to scrapers and the Claude-in-Chrome extension was not exposed to this CLI session, so it could not be auto-read). The LinkedIn redirect wrappers were unwrapped to the direct Skillsoft target URLs; all 7 verified **HTTP 200**. Mapping (cert → badge UUID): Azure AI Engineer `e8d78b62…`, Inside Agentic AI `b0be9305…`, LLMs on Google Cloud `41767c12…`, DeepSeek-R1 `2e8fa2ad…`, Intro to GenAI `ec6dedd5…`, Getting Started with Python `6761aba6…`, CSSLP 2019 GRC `7520ad92…`.

### Post-launch enhancement round 6 (2026-06-14)
27. **Overlay viewer for ALL links (revises FR7).** Per owner decision, *every* content link — local PDFs/images **and external URLs** — now opens in the same-window dark-backdrop overlay; nothing opens in a new tab (only `#`, `mailto:`, `tel:` keep native behavior). Local files still show a Download action. *Caveat:* third-party sites that send `X-Frame-Options`/CSP (LinkedIn, GitHub, Credly, Google Maps, AWS, certmetrics) refuse to render inside an iframe, so those overlays may appear blank — a browser security limitation, not a site bug.
28. **Career Timeline auto-scroll fixed (FR11).** Root cause: `grid-auto-columns: minmax(168px,1fr)` let the rail shrink to fit the viewport (no overflow ⇒ nothing to auto-scroll). Switched to a fixed `210px` per column so the rail always overflows; auto-scroll no longer cancels on passing wheel events (only explicit drag/touch/key), so it reliably animates left→right on view with no manual scrolling.
29. **Cert logos enlarged** again (AWS 32px on its white chip; Skillsoft/issuer 28px). **Skillsoft logo** swapped to the supplied `skillsoft_logo.png`.
30. **NVIDIA cert** — "Verify on NVIDIA →" replaced with **"View certificate →"** opening the supplied `Fundamentals_of_Deep_Learning_NVIDIA.pdf`.
31. **Cert link labels normalized** — all "View PDF →" renamed to **"View certificate →"**; removed the redundant "Image →" link on the Domain 1 Review card and the "Course / Credly" note paragraph.
32. **Hero social row** — removed the Email link; kept **LinkedIn / GitHub / Credly** as pill buttons, each with its brand icon on a white circular chip (`linkedin_logo.png`, `github_logo.png`, `credly_logo.png`).
33. **Hero corner badges enlarged** further (`clamp(112px,13vw,184px)`, 92px on phones).

Assets added this round: `assets/img/logos/{skillsoft_logo,linkedin_logo,github_logo,credly_logo}.png`, `assets/docs/certs/Fundamentals_of_Deep_Learning_NVIDIA.pdf`.

### Post-launch enhancement round 7 (2026-06-14)
34. **External links open in a new tab again (finalizes FR7).** Round 6's "overlay for everything" caused "refused to connect" for LinkedIn/GitHub/Credly (and any site that blocks iframing). Final behavior: **local PDFs/images → overlay viewer** (with Download); **external links → new tab** (`window.open(_blank, noopener,noreferrer)`); in-page/`mailto:`/`tel:` stay native. This is the robust resolution — the overlay only ever shows content that can actually render in it.

### Post-launch enhancement round 8 (2026-06-14)
35. **Animated rainbow-glass background (FR12).** A fixed, slowly-animating multi-radial aurora (indigo/cyan/violet/pink) sits behind the whole page (`body::before`, reduced-motion-aware, dimmed in light theme); `.section--alt` made translucent so the aurora bleeds through and the existing glass/blur cards read as "rainbow glass".
36. **Section header icons.** All 9 section titles (About, Journey, Experience, Skills, Certifications, Awards, Education, Research, Contact) now have a 2026-style gradient icon tile (inline SVG) aligned before the title — visible identically on web and mobile.
37. **Career Timeline auto-scroll = slow forward, fast rewind, repeat** (final, per owner's diagram). The rail scrolls **slowly left→right to the end**, briefly holds, then **rewinds quickly back to the start**, holds, and repeats. Implemented with a rAF state machine (`dir` 1/-1, `holdUntil` timestamp); no clones. Starts on view, keeps running on hover, pauses briefly during manual drag/touch then resumes. **Required CSS fixes:** removed `scroll-behavior:smooth` and `scroll-snap-type` from `.ctl-scroll` (both fought the rAF loop and made it appear stuck), hid the timeline scrollbar (the stray "extra" horizontal bar), removed the reduced-motion gate so it always runs.
38. **Experience flash-on-scroll.** Each Experience card flashes/pops (scale + cyan glow) when it crosses the viewport's vertical center, re-triggering on scroll up and down (IntersectionObserver toggling `.is-active`).
39. **Skills expanded.** Reworked into 7 groups covering the full stack incl. **FastAPI** and **GraphQL**: Agentic AI orchestration (CrewAI, AutoGen, Strands, LangGraph, MCP, AgentCore, Vertex AI Agent Builder), GenAI/LLM ecosystem, ML/DL & algorithms (CNN/RNN/LSTM/ANN/DNN/Wavelets, TensorFlow/Keras/PyTorch/HuggingFace/Transformer), AWS services (S3, DynamoDB, CloudWatch, Cognito, Step Functions, Glue, Athena, Redshift, EventBridge, SNS, Docker…), Azure & GCP AI, Python/Web/APIs, and Data/SQL/Integrations.
40. **Contact:** Phone is no longer a hyperlink (plain text).
41. **Experience — JPMorganChase bullets added:** domain-specific Agentic RAG system for intent classification + domain assistant; agentic auto-processing for home-loan applications (faster processing).

New functional requirement: **FR12** (animated rainbow-glass page background).

### Post-launch QA & optimization pass (2026-06-14, round 9)
Thorough review of the whole app; bugs found and fixed, plus optimizations:
- **A11y — keyboard focus:** added a global `:focus-visible` outline (only `.skip-link` had any focus style before) so keyboard users can see focus on nav links, buttons, cards, chips.
- **A11y — modal focus trap:** the in-page viewer now traps Tab within the dialog and restores focus to the trigger on close.
- **Bug — nav crowding:** with 9 nav links the bar could overflow between 861–960px; the hamburger now engages at **≤980px** (layout reflow stays at ≤860px).
- **CLS:** added `width`/`height` (+`loading=lazy`) to the 3 hero social icons.
- **Perf — scroll handler:** `onScroll` now rAF-throttled (was forcing a `scrollHeight`/`innerHeight` reflow on every scroll event).
- **Perf — timeline loop:** the marquee rAF now **stops when the timeline is off-screen** (IntersectionObserver) instead of running forever.
- **Perf — images:** downscaled the award ceremony photo from 3264px/384 KB → 1600px/156 KB; **removed 10 orphaned (unreferenced) assets** (old logos, banner, post images, the removed Innovation-award & Domain-1 image).

Verified: `node --check` passes, CSS braces balanced, every referenced asset resolves (0 missing), no removed asset is still referenced, AC9 privacy grep clean.

### Post-launch enhancement round 10 (2026-06-14)
- **Hero CTA simplified.** Removed the "Download Résumé" + "Get in touch" button row above the social links (Résumé download still lives in the Contact section). **"Get in touch"** is now a pill **after** LinkedIn / GitHub / Credly, styled like them with a paper-plane icon on a white chip; it scrolls to #contact.
- **Section header background watermark icons.** Each of the 9 section headers shows a large, transparent watermark of that section's icon behind the title (JS clones the existing `.section__ic` SVG into a `.section__watermark`, top-right, non-interactive).
  - **Round 11 tuning (2026-06-14):** raised opacity from ~5% (effectively invisible) to ~12–14% so the watermark actually reads, enlarged it, and added a **hover color-flash** — hovering a section animates its watermark through the brand colours (indigo→cyan→violet) and brightens/scales it (reduced-motion: static cyan, no flash).

### Post-launch enhancement round 12 (2026-06-14)
- **Nav background icons.** Each top-nav link (About, Journey, Experience, Skills, Certifications, Awards, Education, Research, Contact) now carries its section's icon as a faded background (cloned via JS, `z-index:-1` behind the label). On hover/focus the icon **scales up and flashes through the brand colours** (indigo→cyan→violet); the active link shows it a bit brighter. Reduced-motion: static, scaled, no flash.

### Post-launch enhancement round 13 (2026-06-14)
- **Glow colour token** `--c-glow: #5BCDD7` (rgb 91,205,215) introduced for all flash/pop effects.
- **Nav background icons** now **always visible** (resting opacity ~24%, larger 68% glyph) in the glow colour; on hover/focus they **pop + glow** (scale 1.3→1.6 loop + `drop-shadow` in #5BCDD7).
- **Flash/pop generalised** from Experience to all content cards: About (lead/points), Skills, Certifications, Awards, Education, Research, Contact flash (scale + #5BCDD7 glow) as they cross the viewport centre; Recent Activities items flash on hover (fixed panel).
- **Brand mark:** replaced the "JN" monogram with a **home icon** (same gradient tile/size/colour) before the name.

### Post-launch enhancement round 14 (2026-06-14)
- **Tighter section spacing.** `.section` vertical padding reduced from `clamp(3.5rem,8vw,6.5rem)` to `clamp(1.75rem,4vw,3rem)` — minimal, even gaps between all sections.
- **About flash:** dropped the cyan glow box; About cards now do the scale **pop only** (no rectangular halo).
- **Mobile hero badges fix:** on phones (≤640px) the Early-Adopter corner badges and the profile photo were shrunk (badges 64px, photo 150–200px, badges pinned .5rem from edges) so the right (GenAI Developer) badge no longer overlaps the photo — symmetric with the left badge.
- **Mobile cross-check:** verified responsive coverage end-to-end — nav→hamburger ≤980, hero single-column with shrunk badges/photo ≤640, grids→1 col ≤560, Recent Activities collapses to a tab <768, viewer full-screen ≤560, section watermark shrunk ≤560, timeline touch-scroll, flash/pop on scroll. No horizontal overflow (`overflow-x:clip`).

### Post-launch enhancement round 15 (2026-06-14)
- **Hero badge position bug fixed.** The Early-Adopter corner badges used `top: calc(var(--nav-h) + …)` but are positioned *inside* the hero (which already starts below the sticky nav), so they sat ~64px too low and overlapped the photo/name. Changed to a small `top` offset (`clamp(.5rem,2vw,1.25rem)`; `.5rem` on phones) so they hug the top corners; added phone hero `padding-top:4.5rem` so content clears them.
- **Mobile overlay viewer = true full-screen.** `.viewer__panel` now uses `100dvh` (dynamic viewport) on ≤560px so the mobile address bar no longer clips the PDF/image viewer; padding/margins zeroed, touch scrolling enabled. (Note: Android renders PDFs in the iframe; iOS Safari may show a blank frame for PDFs — the Download action still works. Images display everywhere.)
- **Updated GenAI Developer Early-Adopter badge** image from the latest source file.

### Post-launch enhancement round 16 (2026-06-14)
- **Hero badges flank the content row.** Badges are now vertically centred (`top:50%`, translateY centring incorporated into the float keyframes) so the AI-Practitioner badge sits on the left flanking the centred location/name/headline block and the GenAI-Developer badge on the right — same row, not floating in the top corners. On phones the hero text gets `padding-inline:68px` so it stays between the flanking badges (no overlap); badges 60px, photo 140–190px.
- **Section gaps reduced again** to `clamp(1.15rem,2.6vw,2rem)` (from 1.75–3rem) — minimal even spacing across all sections.
- **Recent Activities mobile fix.** It now opens by default only on wide hover-capable screens (`min-width:1024px and hover:hover`); phones/tablets/touch start collapsed to a slim tab so it never covers the page on mobile / when zoomed. Hover auto-open is gated to hover-capable devices.

### Post-launch enhancement round 17 (2026-06-14)
- **Mobile hero re-ordered & badges top-aligned.** On phones the hero is now top-aligned (`min-height:auto`, `justify-content:flex-start`) with the **text first** (location/name/headline), the photo moved **below** it, and the two Early-Adopter badges static + top-aligned so they flank the top of the text block (left = AI Practitioner, right = GenAI Developer); content keeps side padding so text never runs under the badges.
- **Recent Activities moved lower** — fixed panel anchor moved from `top:50%` to `top:62%` so its tab/panel sits a bit below the right-hand GenAI badge area.

All changes re-passed the AC9 privacy grep (zero family-data matches) and the asset-resolution check (zero missing), and `script.js` passes `node --check`.

---

*End of specification. Implementation should follow this document section-by-section; any deviation that affects scope (§3), privacy (§3.1), or acceptance (§11) must be raised with the owner first.*
