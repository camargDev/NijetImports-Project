// Gera PNGs (favicon, apple-touch-icon, og-image) a partir de SVG próprio, usando o Chromium/Playwright instalado.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const dist = path.join(__dirname, '..', 'dist');
const mark = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${s}" height="${s}"><rect width="40" height="40" rx="${s > 100 ? 0 : 10}" fill="#0b1220"/><path d="M11 29V11l18 18V11" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="9.5" r="3" fill="#e11d48"/></svg>`;
(async () => {
  const b = await chromium.launch(); 
  const shot = async (html, w, h, out) => { const p = await b.newPage({ viewport: { width: w, height: h } }); await p.setContent(html); await p.screenshot({ path: path.join(dist, out) }); await p.close(); };
  await shot(`<body style="margin:0">${mark(32)}</body>`, 32, 32, 'favicon-32.png');
  await shot(`<body style="margin:0">${mark(180)}</body>`, 180, 180, 'apple-touch-icon.png');
  const hero = fs.readFileSync(path.join(dist, 'assets/img/art-hero.svg'), 'utf8').replace('aria-hidden="true"', '');
  fs.mkdirSync(path.join(dist, 'assets/img'), { recursive: true });
  await shot(`<body style="margin:0;width:1200px;height:630px;background:linear-gradient(135deg,#fff,#eef0f5);font-family:Segoe UI,system-ui,sans-serif;display:flex;align-items:center;overflow:hidden">
    <div style="padding:0 0 0 80px;width:560px"><div style="font-size:30px;letter-spacing:.3em;font-weight:700;color:#566074">NIJET IMPORTS</div>
    <div style="font-size:68px;font-weight:800;letter-spacing:-.04em;line-height:1.02;color:#0b1220;margin-top:18px">Tecnologia que combina com você.</div>
    <div style="font-size:26px;color:#3b4454;margin-top:22px">iPhone · Xiaomi · Perfumes · Acessórios</div></div>
    <div style="width:640px;margin-left:auto;margin-right:-20px">${hero.replace('width="1200" height="900"', 'width="640" height="480"')}</div></body>`, 1200, 630, 'assets/img/og-image.png');
  await b.close();
})();
