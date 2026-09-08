# Test verification report — 2026-09-08

Reviewed baseline: `d4e7ed3` on `main`.
Site: static HTML/CSS/JavaScript; no application build required.

## Reproduced failures and fixes

| Failure on baseline | Fix | Verification |
|---|---|---|
| 59 reveal blocks invisible when JavaScript was disabled or blocked | Default visible CSS; observer explicitly opts elements into reveal hiding | Both no-JS browser cases pass |
| Link interceptor swallowed modifier clicks, downloads, other protocols and local HTML navigation | Only intercept eligible ordinary clicks and local PDF/image paths | All eight native-navigation cases pass |
| Touch preview asked Google to fetch a loopback URL it cannot access | Use original PDF URL with Open/Download fallback hint | Touch-emulated URL/actions check passes |
| Tab reached off-screen collapsed activities links | Inert/hidden collapsed panel, Escape and focus restoration | Keyboard open/tab/close sequence passes |
| Document scroll width reached 420px at a 320px viewport | Clip overflow at the root as well as body; constrain viewer title | Page and viewer bounds pass at six widths |

## Actual checks

- Baseline browser suite: **2 passed, 6 failed** (before fixes).
- Final `node --test tests/site.test.cjs`: **8 passed, 0 failed** in headless
  Microsoft Edge using Playwright and a temporary loopback HTTP server.
- `node --check script.js`: **passed**.
- `git diff --check`: **passed**.
- Responsive browser checks: **320, 375, 768, 1024, 1440, 1920px**.
- Local HTML/JS asset sources, inline/CSS image URLs and linked local files:
  **HTTP 200**; fragments resolve; no duplicate IDs or JavaScript page errors.
- Image viewer open/close, focus restoration and theme toggle: **passed**.
- Visual inspection: **375px and 1440px page previews**, plus **320px PDF viewer
  controls**. Screenshot font requests were blocked, exercising local fallback
  fonts. Hero text bounds were also checked and fit their content column.

## Limits

The tests intentionally block external requests. They do not verify live
external destinations, Google Fonts availability, Lighthouse scores, production
deployment, full screen-reader behavior, or physical Android/iOS behavior.
Touch emulation confirms routing and controls, not native PDF rendering.
The headless viewer screenshot showed an empty document area; successful PDF
rendering is not claimed. Browsers lacking inline support can use Open/Download.

No professional content or document bytes were changed. No commit, push or
deployment was performed during this review.
