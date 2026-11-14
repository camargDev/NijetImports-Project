// Servidor de referência (sem dependências): entrega dist/ com cabeçalhos de segurança
// e expõe POST /api/direitos-titular com validação no servidor, limite de taxa e verificação de origem.
// Produção: PRODUCTION=1 PORT=8080 node server/server.mjs  (atrás de proxy HTTPS)
import http from 'node:http';
import { readFile, appendFile, mkdir, stat } from 'node:fs/promises';
import { join, normalize, extname, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), 'data');
const PORT = Number(process.env.PORT || 8080);
const PROD = process.env.PRODUCTION === '1';

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json; charset=utf-8' };

const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'" + (PROD ? '; upgrade-insecure-requests' : '');
const SECURITY = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  ...(PROD ? { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' } : {}),
};

// ---- Validação (espelha a do frontend; esta é a que vale) ----
const TYPES = new Set(['confirmacao', 'acesso', 'correcao', 'anonimizacao_bloqueio_eliminacao', 'portabilidade', 'compartilhamento', 'consequencias_nao_consentir', 'revogacao_consentimento', 'oposicao', 'revisao_decisao_automatizada']);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{10,20}$/;
// eslint-disable-next-line no-control-regex
const clean = (s) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[<>]/g, '').trim();

export function validateRights(body) {
  const errors = {};
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { errors: { _: 'Corpo inválido.' } };
  const v = { name: clean(body.name), contact: clean(body.contact), details: clean(body.details), types: Array.isArray(body.types) ? [...new Set(body.types.map(String))] : [] };
  if (v.name.length < 2 || v.name.length > 120) errors.name = 'Informe seu nome completo.';
  if (!(EMAIL.test(v.contact) || (PHONE.test(v.contact) && v.contact.replace(/\D/g, '').length >= 10)) || v.contact.length > 120) errors.contact = 'Informe um e-mail válido ou um telefone com DDD.';
  if (!v.types.length || v.types.length > TYPES.size || !v.types.every((t) => TYPES.has(t))) errors.types = 'Marque ao menos uma opção válida.';
  if (v.details.length > 1500) errors.details = 'O texto pode ter no máximo 1.500 caracteres.';
  return { errors, value: v };
}

// ---- Limite de taxa em memória (por IP, sem persistir o IP) ----
const hits = new Map();
const WINDOW = 10 * 60 * 1000, MAX = 5;
const limited = (ip) => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  return arr.length > MAX;
};

const json = (res, status, obj, extra = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY, ...extra });
  res.end(JSON.stringify(obj));
};

async function handleRights(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Método não permitido.' }, { Allow: 'POST' });
  // Proteção contra CSRF: exige mesma origem e JSON (tipo que força preflight em requisições cross-site).
  const origin = req.headers.origin;
  if (!origin || new URL(origin).host !== req.headers.host) return json(res, 403, { error: 'Origem não permitida.' });
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return json(res, 415, { error: 'Tipo de conteúdo inválido.' });
  const ip = (PROD && req.headers['x-forwarded-for'] ? String(req.headers['x-forwarded-for']).split(',')[0].trim() : req.socket.remoteAddress) || 'x';
  if (limited(ip)) return json(res, 429, { error: 'Muitas tentativas. Tente novamente mais tarde.' }, { 'Retry-After': '600' });

  let size = 0; const chunks = [];
  for await (const c of req) { size += c.length; if (size > 8 * 1024) return json(res, 413, { error: 'Conteúdo muito grande.' }); chunks.push(c); }
  let body; try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(res, 400, { error: 'JSON inválido.' }); }
  if (body && body.website) return json(res, 200, { id: 'OK-' + randomUUID().slice(0, 8).toUpperCase() }); // honeypot: finge sucesso
  const { errors, value } = validateRights(body);
  if (Object.keys(errors).length) return json(res, 400, { errors });

  const id = 'DT-' + randomUUID().slice(0, 8).toUpperCase();
  await mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
  // Armazena sem IP. Defina política de retenção e acesso restrito antes de produção (ver docs/producao.md).
  await appendFile(join(DATA_DIR, 'solicitacoes.jsonl'), JSON.stringify({ id, createdAt: new Date().toISOString(), ...value }) + '\n', { mode: 0o600 });
  return json(res, 201, { id });
}

async function serveStatic(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD', ...SECURITY }); return res.end(); }
  let path;
  try { path = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400, SECURITY); return res.end(); }
  if (path.includes('\0')) { res.writeHead(400, SECURITY); return res.end(); }
  let file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) { res.writeHead(403, SECURITY); return res.end(); }
  try { if ((await stat(file)).isDirectory()) { if (!path.endsWith('/')) { res.writeHead(301, { Location: path + '/', ...SECURITY }); return res.end(); } file = join(file, 'index.html'); } } catch { /* 404 abaixo */ }
  try {
    const data = await readFile(file);
    const type = MIME[extname(file)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': file.includes('/assets/') ? 'public, max-age=86400' : 'no-cache', ...SECURITY });
    return res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    const nf = await readFile(join(ROOT, '404.html')).catch(() => Buffer.from('Não encontrado'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY });
    return res.end(nf);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  http.createServer((req, res) => {
    const p = (req.url || '').split('?')[0];
    (p === '/api/direitos-titular' ? handleRights(req, res) : serveStatic(req, res)).catch(() => { if (!res.headersSent) json(res, 500, { error: 'Erro interno.' }); else res.end(); });
  }).listen(PORT, () => console.log(`http://localhost:${PORT}`));
}
