# Test verification report — 2026-10-25

## Revision reviewed

Application revision: `d7bbcc1` — Calculate total experience from employment intervals.
The repository is a buildless static site. The verification covered the current
`index.html`, `styles.css?v=60`, `script.js?v=60`, local assets, and the
Playwright suite in `tests/site.test.cjs`.

## Checks run

- `node --test tests/site.test.cjs`: **9 passed, 0 failed, 0 skipped**. The suite
  launched a headless Playwright browser and served the repository through a
  temporary loopback HTTP server.
- `node --check script.js`: **passed**.
- `git diff --check`: **passed**.
- Employment-date arithmetic: manually cross-checked the eight supplied role
  intervals against the 25 Oct 2026 reference date. The separate work intervals
  total **10 years, 0 months, 3 days**, matching the supplied table.

## Coverage

1. Static HTML, CSS, local assets, fragment targets, required portfolio content,
   six skill groups, and the two valid PDF files.
2. Readable core content with JavaScript disabled and with `script.js` blocked.
3. Viewer interception preserves modified clicks, downloads, non-media links,
   other protocols, and native navigation.
4. Touch PDF preview uses its original local URL and exposes the Open/Download
   fallback controls.
5. Collapsed Recent Activities links are skipped by keyboard focus; Enter and
   Escape behavior and focus restoration work.
6. Image viewer close restores focus; theme toggle changes the theme.
7. Local assets and fragment targets resolve, IDs are unique, and the page has
   no JavaScript errors.
8. Page and viewer fit widths of 320, 375, 768, 1024, 1440, and 1920 pixels.

## Employment calculation notes

Each role duration is derived from its exact start and end dates. JPMorgan Chase
uses the visitor's current local date and refreshes on load, at local midnight,
and when the page becomes visible again. Total work experience sums the role
intervals rather than counting gaps between jobs; the current date is included
in the running total. The suite run above does not simulate midnight or assert
every computed duration string, so those behaviors are not claimed as automated
browser-test coverage.

## Limits

This run did not measure Lighthouse scores, verify live external destinations,
inspect a production deployment, or test native PDF rendering on physical iOS
or Android devices. It did not repeat screenshot-based visual inspection.

External requests were blocked by the test setup. Successful external links,
Google Fonts availability, screen-reader behavior, and browser-specific PDF
rendering are outside this report's coverage.
