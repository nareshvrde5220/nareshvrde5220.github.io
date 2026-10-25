# Test verification report — 2026-10-25

## Scope

The deployed portfolio is a buildless static site. This verification covered
`index.html`, `styles.css?v=63`, `script.js?v=63`, local assets, and the expanded
Playwright suite in `tests/site.test.cjs`. Browser checks used a temporary local
HTTP server and desktop/mobile Playwright contexts.

## Repeated results

The full suite was run **three consecutive times**. Each run completed with
**11 passed, 0 failed, 0 skipped**: **33 passing test executions** total.

Additional checks:

- `node --check script.js`: passed.
- `git diff --check`: passed.
- The employment test fixes the browser date to 25 Oct 2026, verifies all eight
  role-duration strings and **10 Years 0 Months 3 Days**, then changes the
  clock to 25 Nov 2026 and verifies JPMorgan at **0 years, 8 months, 23 days**
  and the total at **10 Years 1 Month 3 Days**.

## Desktop and mobile coverage

- Desktop at 1440 × 900 and mobile emulation at 375 × 812: all 10 primary
  sections exist and are visible; all 8 experience roles, 15 certifications,
  6 skill groups, both contact document links, and the total-work-experience
  display are present.
- On both desktop and mobile, the About section has at least 20 highlighted
  certificate names, keywords, technologies, solutions, and metrics; browser
  computed styles confirm sky blue in dark theme (`#7DD3FC`) and blue in light
  theme (`#1D4ED8`). Automated contrast checks require WCAG AA's 4.5:1 minimum
  against each theme's page background.
- Mobile navigation strip is present, contains all 9 section links, and can
  scroll horizontally.
- Responsive widths: 320, 375, 768, 1024, 1440, and 1920 pixels; page and
  desktop overlay viewer bounds remain within the viewport.
- Touch PDF links for both résumé and cover letter open their original local
  PDF URLs, with cache tokens matching each file's SHA-256 digest, in a new
  browser tab; the desktop viewer remains available for images and PDFs.
- Static checks verify each linked PDF has a valid header, expected size, and a
  cache token matching its current bytes.
- With JavaScript disabled or blocked, core professional content stays
  readable.
- Modified clicks, downloads, other protocols, non-media navigation, viewer
  focus behavior, Recent Activities keyboard behavior, theme switching, asset
  resolution, unique IDs, fragment targets, and JavaScript page errors pass.

## Limits

Mobile PDF checks verify that both links reach the correct PDF URL in a new
browser tab; they do not verify how the PDF renders on physical iOS or Android
devices. Mobile coverage uses browser emulation, not physical phones or tablets.
The midnight timer is not advanced in the automated clock test; the test does
verify updates after the page becomes visible with a changed date. This run did
not repeat screenshot-based visual review or measure Lighthouse scores.

External destinations, Google Fonts availability, screen-reader behavior, and
production deployment were not checked by this local suite.
