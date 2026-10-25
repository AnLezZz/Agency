const { chromium } = require('playwright');
const URL = process.env.URL || 'http://localhost:4173/';
const results = [];
const t = async (name, fn) => { try { await fn(); results.push([name, 'PASS']); } catch (e) { results.push([name, 'FAIL: ' + e.message.split('\n')[0]]); } };
const ok = (c, m) => { if (!c) throw new Error(m); };
(async () => {
  const b = await chromium.launch();
  for (const [vn, vp] of [['desktop', { width: 1280, height: 800 }], ['375px', { width: 375, height: 700 }]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto(URL);
    const P = (n) => `[${vn}] ${n}`;
    await t(P('S1 one h1 w/ name visible above fold'), async () => {
      ok(await p.locator('h1').count() === 1, 'h1 count != 1');
      const bx = await p.locator('h1').boundingBox(); const txt = (await p.locator('h1').innerText()).trim();
      ok(txt.length > 0, 'empty h1'); ok(bx && bx.y + bx.height <= vp.height, 'h1 not within viewport: ' + JSON.stringify(bx));
    });
    await t(P('S1 tagline mentions Auckland under h1'), async () => {
      const h = await p.locator('h1').boundingBox();
      const tag = p.locator('h1 ~ p, h1 + p, header p, section p').filter({ hasText: /Auckland/ }).first();
      ok(await tag.count(), 'no tagline w/ Auckland'); const bx = await tag.boundingBox();
      ok(bx.y >= h.y + h.height - 1 && bx.y - (h.y + h.height) < 120, 'tagline not directly under h1');
      ok(await tag.isVisible(), 'not visible');
    });
    await t(P('S1 CTA to #menu'), async () => {
      const a = p.locator('a[href="#menu"]').first(); ok(await a.isVisible(), 'CTA not visible');
      await a.click(); await p.waitForTimeout(500); ok(p.url().endsWith('#menu'), 'url ' + p.url());
    });
    await t(P('S1 title has café name'), async () => {
      const title = await p.title(); const h1 = (await p.locator('h1').innerText()).trim();
      ok(title.toLowerCase().includes(h1.toLowerCase().split(/\s+/)[0]), `title "${title}" vs h1 "${h1}"`);
    });
    await t(P('S2 menu section, heading, 6 items'), async () => {
      ok(await p.locator('section#menu, #menu').count() >= 1, 'no #menu');
      ok(await p.locator('#menu h2', { hasText: /^Menu$/ }).count() === 1, 'no Menu heading');
      const items = p.locator('#menu li, #menu article'); ok(await items.count() === 6, 'items = ' + await items.count());
      for (let i = 0; i < 6; i++) { const tx = await items.nth(i).innerText(); ok(/\$\d+\.\d{2}/.test(tx), 'no price item ' + i + ': ' + tx); ok(tx.split('\n').filter(s => s.trim()).length >= 3, 'item ' + i + ' lacks name/desc/price'); }
    });
    if (vn === '375px') await t(P('S2 single column'), async () => {
      const items = p.locator('#menu li, #menu article'); const xs = new Set();
      for (let i = 0; i < 6; i++) xs.add(Math.round((await items.nth(i).boundingBox()).x));
      ok(xs.size === 1, 'multiple columns x=' + [...xs]);
    });
    await t(P('S3 hours'), async () => {
      ok(await p.locator('#hours h2', { hasText: /^Opening hours$/ }).count() === 1, 'no heading');
      const rows = p.locator('#hours li, #hours tr'); const txt = await p.locator('#hours').innerText();
      for (const d of ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']) ok(txt.includes(d), 'missing ' + d);
      ok(await rows.count() >= 7, 'rows ' + await rows.count());
      ok(await p.locator('#hours img').count() === 0, 'image used');
      for (let i = 0; i < await rows.count(); i++) { const r = await rows.nth(i).innerText(); ok(/\d|Closed/i.test(r), 'row no time: ' + r); }
    });
    await t(P('S4 location'), async () => {
      ok(await p.locator('#location h2', { hasText: /^Find us$/ }).count() === 1, 'no heading');
      ok(/Auckland/.test(await p.locator('#location').innerText()), 'no Auckland address');
      const a = p.locator('#location a', { hasText: 'View on map' }); ok(await a.count() === 1, 'no link');
      ok(/google\.[a-z.]+\/maps|maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps/.test(await a.getAttribute('href')), 'href ' + await a.getAttribute('href'));
      ok(await a.getAttribute('target') === '_blank', 'target'); ok((await a.getAttribute('rel') || '').includes('noopener'), 'rel');
      await a.scrollIntoViewIfNeeded(); const bx = await a.boundingBox(); ok(bx && bx.x >= 0 && bx.x + bx.width <= vp.width, 'link off-screen');
    });
    await t(P('S5 contact button'), async () => {
      const a = p.locator('#contact a', { hasText: 'Contact us' }); ok(await a.count() === 1, 'no button');
      const h = await a.getAttribute('href'); ok(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+/.test(h) || /^tel:\+?[\d\s-]{6,}/.test(h), 'href ' + h);
      await a.scrollIntoViewIfNeeded(); const bx = await a.boundingBox();
      ok(bx.height >= 44, 'height ' + bx.height); ok(bx.x >= 0 && bx.x + bx.width <= vp.width, 'not fully visible');
    });
    await t(P('S5 nav link to #contact'), async () => {
      await p.goto(URL); const a = p.locator('header a[href="#contact"], nav a[href="#contact"]').first();
      ok(await a.count(), 'no header link'); ok(await a.isVisible(), 'header link not visible');
      await a.click(); await p.waitForTimeout(500); ok(p.url().endsWith('#contact'), 'url ' + p.url());
    });
    await t(P('no horizontal scroll'), async () => {
      const w = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      ok(w[0] <= w[1], `scrollWidth ${w[0]} > ${w[1]}`);
    });
    await p.close();
  }
  await b.close();
  results.forEach(r => console.log(r[1].startsWith('PASS') ? 'PASS' : 'FAIL', r[0], r[1].slice(4)));
  process.exit(results.some(r => r[1] !== 'PASS') ? 1 : 0);
})();
