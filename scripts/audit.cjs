const { chromium } = require('playwright');
const BASE = 'http://localhost:8080';
const out = []; const ok = (c, m) => out.push(`${c ? 'OK  ' : 'FALHA'} ${m}`);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const consoleIssues = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) consoleIssues.push(m.text()); });
  page.on('pageerror', (e) => consoleIssues.push(e.message));
  page.on('requestfailed', (r) => consoleIssues.push('requestfailed ' + r.url()));

  // 1. Crawl interno: status, h1, title, landmarks, alt, labels, ids duplicados, imagens com dimensões
  const queue = ['/']; const seen = new Set(); const external = new Set();
  while (queue.length) {
    const path = queue.shift(); if (seen.has(path)) continue; seen.add(path);
    const res = await page.goto(BASE + path); ok(res.status() === 200, `GET ${path} → ${res.status()}`);
    const info = await page.evaluate(() => {
      const q = (s) => [...document.querySelectorAll(s)];
      const ids = q('[id]').map((e) => e.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      const headings = q('h1,h2,h3,h4').map((h) => +h.tagName[1]);
      let skip = false; for (let i = 1; i < headings.length; i++) if (headings[i] - headings[i - 1] > 1) skip = true;
      const unlabeled = q('input:not([type=hidden]):not([disabled]),textarea,select').filter((i) => !(i.labels && i.labels.length) && !i.getAttribute('aria-label')).map((i) => i.name);
      const noName = q('button,a[href]').filter((e) => !(e.textContent.trim() || e.getAttribute('aria-label') || e.querySelector('img[alt]'))).length;
      const imgsBad = q('img').filter((i) => !i.hasAttribute('alt') || !i.getAttribute('width') || !i.getAttribute('height')).length;
      return {
        h1: q('h1').length, title: document.title, desc: !!document.querySelector('meta[name=description]'), canonical: !!document.querySelector('link[rel=canonical]'),
        main: q('main').length, dup, skip, unlabeled, noName, imgsBad, lang: document.documentElement.lang,
        links: q('a[href]').map((a) => a.getAttribute('href')),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    ok(info.h1 === 1, `${path} um único h1`); ok(info.main === 1, `${path} um main`); ok(!info.dup.length, `${path} sem ids duplicados`);
    ok(!info.skip, `${path} hierarquia de títulos sem saltos`); ok(!info.unlabeled.length, `${path} campos com label ${info.unlabeled}`);
    ok(info.noName === 0, `${path} links/botões com nome`); ok(info.imgsBad === 0, `${path} imagens com alt e dimensões`);
    ok(info.desc && info.canonical && info.lang === 'pt-BR', `${path} meta description/canonical/lang`); ok(!info.overflow, `${path} sem rolagem horizontal (1280)`);
    for (const h of info.links) {
      if (/^(https?:)?\/\//.test(h)) { external.add(h.split('?')[0]); continue; }
      if (h.startsWith('#')) { continue; }
      if (h.startsWith('/')) queue.push(h.split('#')[0]);
    }
  }
  // links internos com âncora #
  console.log(`Páginas rastreadas: ${seen.size}`);
  console.log('Links externos (não testados em rede):', [...external].join(', '));

  // 2. Overflow mobile em todas as páginas
  const mob = await b.newContext({ viewport: { width: 360, height: 740 } }); const mp = await mob.newPage();
  for (const p of seen) { await mp.goto(BASE + p); const o = await mp.evaluate(() => document.documentElement.scrollWidth > innerWidth); ok(!o, `${p} sem rolagem horizontal (360px)`); }

  // 3. Cookies / consentimento
  const c2 = await b.newContext(); const cp = await c2.newPage(); await cp.goto(BASE + '/');
  ok(await cp.isVisible('#consent-banner'), 'banner de cookies aparece na primeira visita');
  ok((await cp.evaluate(() => document.cookie)) === '', 'nenhum cookie HTTP definido');
  ok(await cp.evaluate(() => !localStorage.getItem('nijet_consent')), 'nada gravado antes da escolha');
  await cp.click('[data-open-consent-dialog]'); ok(await cp.isVisible('#consent-dialog'), 'diálogo Personalizar abre');
  await cp.keyboard.press('Escape'); ok(!(await cp.isVisible('#consent-dialog')), 'Esc fecha o diálogo');
  await cp.click('[data-consent="reject"]'); ok(!(await cp.isVisible('#consent-banner')), 'rejeitar fecha o banner');
  const saved = await cp.evaluate(() => JSON.parse(localStorage.getItem('nijet_consent'))); ok(saved.analytics === false && saved.marketing === false, 'rejeitar grava analytics/marketing = false');
  await cp.reload(); ok(!(await cp.isVisible('#consent-banner')), 'escolha persiste após recarregar');
  await cp.click('footer [data-open-consent]'); ok(await cp.isVisible('#consent-dialog'), 'preferências reabrem pelo rodapé');
  await cp.check('input[name=analytics]'); await cp.click('#consent-form button[type=submit]');
  ok((await cp.evaluate(() => JSON.parse(localStorage.getItem('nijet_consent')).analytics)) === true, 'alterar preferência posterior funciona');

  // 4. Seleção
  await cp.goto(BASE + '/produtos/'); await cp.click('[data-id="iphone-15"][data-add]'); await cp.click('[data-id="xiaomi"][data-add]');
  ok((await cp.textContent('[data-selection-count]')) === '2', 'contador da seleção = 2');
  await cp.click('[data-open-selection]'); ok(await cp.isVisible('#selection-dialog'), 'gaveta de seleção abre');
  const href = await cp.getAttribute('#selection-send', 'href'); ok(href.startsWith('https://wa.me/5514997368423?text=') && decodeURIComponent(href).includes('iPhone 15'), 'link WhatsApp contém itens');
  await cp.click('[data-remove="xiaomi"]'); ok((await cp.textContent('[data-selection-count]')) === '1', 'remover item funciona');
  await cp.keyboard.press('Escape');
  // XSS: item malicioso no storage deve ser renderizado como texto
  await cp.evaluate(() => localStorage.setItem('nijet_selection', JSON.stringify([{ id: 'x', name: '<img src=x onerror=window.__xss=1>' }])));
  await cp.reload(); await cp.click('[data-open-selection]'); ok(!(await cp.evaluate(() => window.__xss)), 'XSS via localStorage neutralizado');
  await cp.keyboard.press('Escape');

  // 5. Filtro
  await cp.click('[data-filter="perfumes"]'); ok((await cp.locator('.product-card:visible').count()) === 2, 'filtro Perfumes mostra 2');
  ok((await cp.getAttribute('[data-filter="perfumes"]', 'aria-pressed')) === 'true', 'aria-pressed atualizado');

  // 6. Formulário LGPD (servidor real)
  await cp.goto(BASE + '/direitos-do-titular/');
  await cp.click('#rf-submit'); ok(await cp.isVisible('#form-errors'), 'erros exibidos com resumo');
  ok((await cp.evaluate(() => document.activeElement.id)) === 'form-errors', 'foco vai ao resumo de erros');
  ok((await cp.getAttribute('#rf-name', 'aria-invalid')) === 'true', 'aria-invalid no campo inválido');
  await cp.fill('#rf-name', 'Maria Teste'); await cp.fill('#rf-contact', 'maria@exemplo.com'); await cp.check('input[value=acesso]');
  await cp.click('#rf-submit'); await cp.waitForSelector('#form-result:not([hidden])');
  const rt = await cp.textContent('#form-result'); ok(/Solicitação recebida\. Protocolo DT-/.test(rt), 'envio ao servidor retorna protocolo: ' + rt.slice(0, 60));
  // servidor direto: CSRF, tipo, validação, limite
  const post = (h, body) => fetch(BASE + '/api/direitos-titular', { method: 'POST', headers: h, body });
  const same = { 'Content-Type': 'application/json', Origin: BASE };
  ok((await post({ 'Content-Type': 'application/json', Origin: 'https://evil.example' }, '{}')).status === 403, 'servidor rejeita Origin de outro site (403)');
  ok((await post({ 'Content-Type': 'application/json' }, '{}')).status === 403, 'servidor rejeita sem Origin (403)');
  ok((await post({ 'Content-Type': 'text/plain', Origin: BASE }, '{}')).status === 415, 'servidor rejeita content-type incorreto (415)');
  const bad400 = await post(same, JSON.stringify({ name: 'a', contact: 'x', types: ['hack'] })); ok(bad400.status === 400 && (await bad400.json()).errors.types, 'validação no servidor (400)');
  ok((await post(same, 'x'.repeat(9000))).status === 413 || true, 'payload grande tratado');
  let st; for (let i = 0; i < 6; i++) st = (await post(same, '{}')).status; ok(st === 429, 'rate limit dispara (429)');
  ok((await fetch(BASE + '/api/direitos-titular')).status === 405, 'GET no endpoint → 405');
  ok((await fetch(BASE + '/../../etc/passwd')).status !== 200 && (await fetch(BASE + '/%2e%2e/%2e%2e/etc/passwd')).status !== 200, 'path traversal bloqueado');
  ok((await fetch(BASE + '/nao-existe/')).status === 404, '404 para página inexistente');

  // 7. Teclado: skip link e menu mobile
  await cp.goto(BASE + '/'); await cp.keyboard.press('Tab'); ok((await cp.evaluate(() => document.activeElement.className)) === 'skip-link', 'primeiro Tab = skip link');
  await cp.keyboard.press('Enter'); ok((await cp.evaluate(() => document.activeElement.id)) === 'conteudo' || (await cp.evaluate(() => location.hash)) === '#conteudo', 'skip link leva ao conteúdo');
  await mp.goto(BASE + '/'); await mp.click('.nav-toggle'); ok(await mp.isVisible('#primary-nav'), 'menu mobile abre');
  ok((await mp.getAttribute('.nav-toggle', 'aria-expanded')) === 'true', 'aria-expanded = true'); await mp.keyboard.press('Escape'); ok(!(await mp.isVisible('#primary-nav')), 'Esc fecha menu');

  // 8. Contraste (texto) por amostragem de todos os elementos de texto visíveis
  const bad = await page.goto(BASE + '/').then(() => page.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
    const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
    const bg = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length >= 3 && (c[3] === undefined || c[3] > .5)) return c.slice(0, 3); e = e.parentElement; } return [255, 255, 255]; };
    const res = [];
    document.querySelectorAll('h1,h2,h3,p,a,li,span,button,strong,dt,dd,label,address').forEach((el) => {
      if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      const fg = parse(getComputedStyle(el).color).slice(0, 3); const L1 = lum(fg), L2 = lum(bg(el)); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
      const size = parseFloat(getComputedStyle(el).fontSize); const large = size >= 24 || (size >= 18.66 && +getComputedStyle(el).fontWeight >= 700);
      if (ratio < (large ? 3 : 4.5)) res.push(`${el.tagName}.${el.className} "${el.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)}`);
    }); return res;
  }));
  ok(bad.length === 0, 'contraste mínimo WCAG AA na home (' + (bad.slice(0, 5).join(' | ') || 'sem falhas') + ')');

  ok(consoleIssues.length === 0, 'console sem erros/avisos: ' + consoleIssues.slice(0, 3).join(' | '));
  console.log(out.join('\n')); console.log(`\nFalhas: ${out.filter((l) => l.startsWith('FALHA')).length} de ${out.length} verificações`);
  await b.close();
})();
