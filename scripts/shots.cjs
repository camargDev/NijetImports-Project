const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const errs = [];
  for (const [name, vp] of [['desk', { width: 1366, height: 900 }], ['mob', { width: 390, height: 844 }]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(`${name} ${m.type()}: ${m.text()}`); });
    p.on('pageerror', (e) => errs.push(`${name} pageerror: ${e.message}`));
    await p.goto('http://localhost:8080/');
    await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
    await p.click('[data-consent="reject"]');
    await p.waitForTimeout(500);
    await p.screenshot({ path: `/tmp/claude-0/shots/home-${name}.png`, fullPage: true });
    await ctx.close();
  }
  console.log(errs.join('\n') || 'sem erros de console');
  await b.close();
})();
