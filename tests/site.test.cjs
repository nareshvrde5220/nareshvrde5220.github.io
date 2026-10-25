const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');

let chromium = null;
try {
  ({ chromium } = require('playwright'));
} catch {
  chromium = null;
}

const root = process.env.PORTFOLIO_ROOT || path.resolve(__dirname, '..');
let browser, server, base;

before(async () => {
  server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg' };
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  if (chromium) {
    try {
      browser = await chromium.launch({
        ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : { channel: 'msedge' }),
        headless: true
      });
    } catch {
      try {
        browser = await chromium.launch({ headless: true });
      } catch {
        browser = null;
      }
    }
  }
  if (process.env.CI === 'true') {
    assert.ok(browser, 'Expected Playwright browser to launch in CI environment');
  }
});

after(async () => {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
});

async function pageFor(t, options = {}, blockScript = false) {
  const context = await browser.newContext(options);
  t.after(() => context.close());
  await context.route('**/*', route => {
    const url = route.request().url();
    return !url.startsWith(base + '/') || (blockScript && url.includes('/script.js')) ? route.abort() : route.continue();
  });
  const page = await context.newPage();
  await page.goto(base);
  return page;
}

test('static HTML, CSS, local assets, fragment targets, and 2026 resume alignment verify cleanly', async () => {
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const css = await fs.readFile(path.join(root, 'styles.css'), 'utf8');

  // Verify cache-busting v=57
  assert.match(html, /href="styles\.css\?v=57"/);
  assert.match(html, /src="script\.js\?v=57"/);

  // Verify 2026 JPMC AI Lead Resume alignment
  assert.match(html, /<title>Jampala Naresh — Agentic AI &amp; GenAI Lead \| Multi-Agent Systems on AWS<\/title>/);
  assert.match(html, /data-count="10" data-suffix="\+" data-career-start="2015-05-25">10\+<\/span>/);
  assert.match(html, /<p class="eyebrow"><span data-career-years>10\+<\/span> yrs · 8 roles<\/p>/);
  assert.match(html, /45 days to 7 days/);
  assert.match(html, /96% accuracy/);
  assert.match(html, /AWS Nova Challenge 2025/);
  assert.match(html, /2022 – May 2027 \(expected\)/);

  const skillGroups = [...html.matchAll(/<article class="skill-group reveal">/g)];
  assert.equal(skillGroups.length, 6, 'Expected 6 resume skill categories');

  // Verify no duplicate IDs and all in-page #anchors exist
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs found in index.html');
  const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(m => m[1]).filter(Boolean);
  for (const anchor of anchors) {
    assert.ok(ids.includes(anchor), `Missing anchor target #${anchor}`);
  }

  // Verify all local asset links & CSS url() files exist and return HTTP 200
  const assetRefs = new Set();
  for (const m of html.matchAll(/\b(?:src|href)="([^"#?]+)(?:\?[^"]*)?"/g)) {
    const ref = m[1];
    if (!/^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) {
      assetRefs.add(ref);
    }
  }
  for (const m of (html + '\n' + css).matchAll(/url\(["']?([^)'"\s?#]+)(?:\?[^)'"\s]*)?["']?\)/g)) {
    const ref = m[1];
    if (!/^(https?:|data:|#|%23)/i.test(ref)) {
      assetRefs.add(ref);
    }
  }
  for (const relPath of assetRefs) {
    const res = await fetch(`${base}/${relPath.replace(/^\//, '')}`);
    assert.equal(res.status, 200, `Asset failed to resolve (HTTP ${res.status}): ${relPath}`);
  }

  // Verify updated Resume PDF and Cover Letter PDF are valid PDFs
  for (const pdfRel of ['assets/docs/Naresh_Resume_HighRes.pdf', 'assets/docs/Jampala_Naresh_Cover_Letter.pdf']) {
    const buf = await fs.readFile(path.join(root, pdfRel));
    assert.equal(buf.subarray(0, 5).toString('ascii'), '%PDF-', `${pdfRel} must have valid %PDF- header`);
    assert.ok(buf.length > 50000, `${pdfRel} appears truncated (${buf.length} bytes)`);
  }
});

for (const mode of ['disabled', 'blocked']) {
  test(`core content remains readable when JavaScript is ${mode}`, async t => {
    if (!browser) return;
    const page = await pageFor(t, { javaScriptEnabled: mode !== 'disabled' }, mode === 'blocked');
    const invisible = await page.locator('.reveal').evaluateAll(els => els.filter(el => getComputedStyle(el).opacity === '0').length);
    assert.equal(invisible, 0);
    assert.equal(await page.locator('#recent-activities').isVisible(), false);
  });
}

test('viewer preserves modified clicks, downloads, other protocols and non-media navigation', async t => {
  if (!browser) return;
  const page = await pageFor(t);
  const result = await page.evaluate(() => {
    const cases = [
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', ctrlKey: true },
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', metaKey: true },
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', shiftKey: true },
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', altKey: true },
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', button: 1 },
      { href: 'assets/docs/Naresh_Resume_HighRes.pdf', download: true },
      { href: 'index.html' },
      { href: 'sms:+123456789' }
    ];
    window.open = () => null;
    return cases.map(c => {
      const a = document.createElement('a'); a.href = c.href;
      if (c.download) a.setAttribute('download', '');
      document.body.append(a);
      let intercepted;
      window.addEventListener('click', e => { intercepted = e.defaultPrevented; e.preventDefault(); }, { once: true });
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ...c }));
      a.remove();
      return { href: c.href, intercepted };
    });
  });
  assert.deepEqual(result.filter(r => r.intercepted), []);
  assert.equal(await page.locator('#viewer').isVisible(), false);
});

test('touch PDF preview uses the original local URL and exposes a fallback', async t => {
  if (!browser) return;
  const page = await pageFor(t, { hasTouch: true, isMobile: true, viewport: { width: 375, height: 812 } });
  await page.locator('.contact__docs a').first().dispatchEvent('click');
  assert.equal(await page.locator('#viewer').isVisible(), true);
  assert.equal(await page.locator('#viewer iframe').getAttribute('src'), base + '/assets/docs/Naresh_Resume_HighRes.pdf');
  assert.equal(await page.locator('#viewer-open').getAttribute('href'), base + '/assets/docs/Naresh_Resume_HighRes.pdf');
  assert.equal(await page.locator('#viewer-hint').isVisible(), true);
});

test('collapsed activities cannot receive focus and Escape restores the toggle', async t => {
  if (!browser) return;
  const page = await pageFor(t);
  await page.locator('#ra-toggle').focus();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('#ra-panel')), false);
  await page.locator('#ra-toggle').focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('#ra-panel')), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#ra-toggle').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'ra-toggle');
});

test('image viewer closes and restores focus; theme toggle works', async t => {
  if (!browser) return;
  const page = await pageFor(t);
  await page.locator('#theme-toggle').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  const trigger = page.locator('a[href$=".jpg"]').first();
  await trigger.focus();
  await trigger.dispatchEvent('click');
  assert.equal(await page.locator('#viewer img').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#viewer').isVisible(), false);
  assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
});

test('all local assets, image sources, and fragment targets resolve without page errors', async t => {
  if (!browser) return;
  const page = await pageFor(t);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  const refs = await page.evaluate(() => ({
    ids: Array.from(document.querySelectorAll('[id]'), el => el.id),
    anchors: Array.from(document.querySelectorAll('a[href^="#"]'), el => el.hash.slice(1)).filter(Boolean),
    assets: Array.from(document.querySelectorAll('[src], link[rel="stylesheet"], a[href]'), el => el.src || el.href).filter(url => url.startsWith(location.origin + '/') && !url.includes('#')),
    cssAssets: Array.from(document.querySelectorAll('[style]'), el => el.getAttribute('style')).join('\n')
  }));
  assert.equal(new Set(refs.ids).size, refs.ids.length, 'duplicate IDs');
  for (const id of refs.anchors) assert.ok(refs.ids.includes(id), `missing #${id}`);
  const css = await fs.readFile(path.join(root, 'styles.css'), 'utf8');
  for (const match of (css + refs.cssAssets).matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
    if (!/^(data:|https?:|#)/.test(match[1])) refs.assets.push(new URL(match[1], base).href);
  }
  for (const url of new Set(refs.assets)) {
    const response = await page.request.get(url);
    assert.equal(response.status(), 200, url);
  }
  assert.deepEqual(errors, []);
});

test('responsive layouts keep the page and viewer within the viewport', async t => {
  if (!browser) return;
  const page = await pageFor(t);
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, elements: Array.from(document.querySelectorAll('body > *, .nav__inner, .hero__grid, .hero__media, .hero__photo, .hero__content')).map(el => ({ element: el.className, x: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width })) }));
    assert.ok(overflow.scrollWidth <= width, `overflow at ${width}: ${JSON.stringify(overflow)}`);
    await page.locator('.contact__docs a').first().dispatchEvent('click');
    const bounds = await page.locator('.viewer__panel').boundingBox();
    assert.ok(bounds.x >= -1 && bounds.x + bounds.width <= width + 1, `viewer overflow at ${width}`);
    await page.keyboard.press('Escape');
  }
});
