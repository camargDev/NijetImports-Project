// Gerador estático sem dependências. Uso: node build.mjs   (SITE_URL=https://dominio.com.br para produção)
import { mkdir, writeFile, readFile, readdir, rm, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/site.mjs';
import { PRODUCTS } from './src/products.mjs';
import { renderArt } from './src/art.mjs';
import { header, footer, globalUi, esc } from './src/components.mjs';
import { mainPages } from './src/pages/main-pages.mjs';
import { legalPages } from './src/pages/legal-pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'";

const layout = (page) => {
  const url = `${SITE.url}${page.path}`;
  const ogImage = `${SITE.url}/assets/img/og-image.png`;
  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0e14" media="(prefers-color-scheme: dark)">
<meta name="robots" content="${page.noindex ? 'noindex, nofollow' : 'index, follow'}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SITE.name} — ${SITE.tagline}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/css/site.css">
<script src="/assets/js/boot.js"></script>
<script type="module" src="/assets/js/main.js"></script>
${(page.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body>
${header(page.current)}
<main id="conteudo" tabindex="-1">
${page.body}
</main>
${footer()}
${globalUi()}
</body>
</html>
`;
};

const notFound = {
  path: '/404.html', current: null, noindex: true,
  title: `Página não encontrada — ${SITE.name}`,
  description: 'A página que você procura não foi encontrada.',
  body: `<section class="page-head"><div class="container narrow"><h1>Página não encontrada</h1><p class="lead">O endereço pode ter mudado ou estar incorreto.</p><div class="btn-row"><a class="btn btn-primary" href="/">Voltar ao início</a><a class="btn btn-secondary" href="/produtos/">Ver produtos</a></div></div></section>`,
};

const write = async (rel, data) => {
  const file = join(DIST, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, data);
};

await rm(DIST, { recursive: true, force: true });

// Páginas
const pages = [...mainPages(), ...legalPages()];
for (const p of pages) await write(join(p.path, 'index.html'), layout(p));
await write('404.html', layout(notFound));

// CSS (concatenado na ordem dos arquivos)
const cssFiles = (await readdir(join(ROOT, 'src/css'))).filter((f) => f.endsWith('.css')).sort();
const css = (await Promise.all(cssFiles.map((f) => readFile(join(ROOT, 'src/css', f), 'utf8')))).join('\n');
await write('assets/css/site.css', css);

// JS (módulos copiados)
await cp(join(ROOT, 'src/js'), join(DIST, 'assets/js'), { recursive: true });

// Ilustrações
for (const p of PRODUCTS) await write(`assets/img/${p.slug}.svg`, renderArt(p.art.kind, p.art));
for (const k of ['hero', 'quality', 'tech', 'you']) await write(`assets/img/art-${k}.svg`, renderArt(k));
await write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#0b1220"/><path d="M11 29V11l18 18V11" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="9.5" r="3" fill="#e11d48"/></svg>`);

// Vercel: cabeçalhos de segurança (deploy da pasta dist)
await cp(join(ROOT, 'vercel.json'), join(DIST, 'vercel.json'));

// SEO
const today = new Date().toISOString().slice(0, 10);
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Cabeçalhos de segurança para hospedagens que leem _headers (Netlify/Cloudflare Pages)
await write('_headers', `/*\n  Content-Security-Policy: ${CSP}; frame-ancestors 'none'; upgrade-insecure-requests\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  Cross-Origin-Opener-Policy: same-origin\n  X-Frame-Options: DENY\n/assets/*\n  Cache-Control: public, max-age=86400\n`);

console.log(`OK: ${pages.length + 1} páginas, ${PRODUCTS.length + 4} ilustrações → dist/` + (SITE.urlIsPlaceholder ? '\nAviso: SITE_URL não definido (domínio provisório nos canonicals/sitemap).' : ''));
