// Contraste de texto (WCAG AA) em todas as páginas, nos temas claro e escuro.
const { chromium } = require('playwright');
const BASE = 'http://localhost:8080';
const PAGES = ['/', '/produtos/', '/produtos/iphone-15/', '/a-loja/', '/privacidade/', '/cookies/', '/direitos-do-titular/', '/termos/', '/entrega-e-frete/', '/trocas-e-devolucoes/', '/condicoes-comerciais/', '/acessibilidade/'];
(async () => {
  const b = await chromium.launch(); let total = 0;
  for (const scheme of ['light', 'dark']) {
    const ctx = await b.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
    for (const path of PAGES) {
      await p.goto(BASE + path);
      await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')));
      const bad = await p.evaluate(() => {
        const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
        const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
        const bg = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length >= 3 && (c[3] === undefined || c[3] > .5)) return c.slice(0, 3); e = e.parentElement; } return parse(getComputedStyle(document.body).backgroundColor).slice(0, 3); };
        const res = [];
        document.querySelectorAll('h1,h2,h3,p,a,li,span,button,strong,dt,dd,label,address,th,td,mark,caption').forEach((el) => {
          if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
          const r = el.getBoundingClientRect(); if (!r.width || !r.height || getComputedStyle(el).position === 'absolute' && r.width <= 1) return;
          const L1 = lum(parse(getComputedStyle(el).color).slice(0, 3)), L2 = lum(bg(el)); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
          const size = parseFloat(getComputedStyle(el).fontSize); const large = size >= 24 || (size >= 18.66 && +getComputedStyle(el).fontWeight >= 700);
          if (ratio < (large ? 3 : 4.5)) res.push(`${el.tagName}.${el.className} "${el.textContent.trim().slice(0, 28)}" ${ratio.toFixed(2)}`);
        }); return res;
      });
      total += bad.length; if (bad.length) console.log(`[${scheme}] ${path}:\n  ${bad.slice(0, 6).join('\n  ')}`);
    }
    if (scheme === 'dark') { await p.goto(BASE + '/'); await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible'))); await p.click('[data-consent="reject"]'); await p.waitForTimeout(400); await p.screenshot({ path: '/tmp/claude-0/shots/home-dark.png', fullPage: true }); }
    await ctx.close();
  }
  console.log(`Falhas de contraste: ${total}`); await b.close();
})();
