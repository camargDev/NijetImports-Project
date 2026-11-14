import { readJSON, store, announce } from './storage.js';
import { openDialog } from './dialogs.js';

const KEY = 'nijet_consent';
const TTL = 365 * 24 * 60 * 60 * 1000; // 12 meses
const VERSION = 1;

// Registro de ferramentas NÃO essenciais. Hoje está vazio: o site não usa nenhuma.
// Para adicionar, cadastre uma função que injeta o script; ela só roda após consentimento.
// Exemplo: LOADERS.analytics.push(() => { const s = document.createElement('script'); s.src = '...'; document.head.append(s); });
// (Ao adicionar, atualize a CSP, a Política de cookies e a Política de privacidade.)
export const LOADERS = { analytics: [], marketing: [] };

const read = () => {
  const c = readJSON(KEY, null);
  if (!c || c.v !== VERSION || typeof c.ts !== 'number' || Date.now() - c.ts > TTL) return null;
  return { analytics: c.analytics === true, marketing: c.marketing === true };
};
const write = (prefs) => store.set(KEY, JSON.stringify({ v: VERSION, ts: Date.now(), ...prefs }));
const apply = (prefs) => { for (const cat of Object.keys(LOADERS)) if (prefs[cat]) LOADERS[cat].forEach((fn) => fn()); };

export function initConsent() {
  const banner = document.getElementById('consent-banner');
  const dialog = document.getElementById('consent-dialog');
  const form = document.getElementById('consent-form');
  if (!banner || !dialog || !form) return;

  let prefs = read();
  const showBanner = (v) => { banner.hidden = !v; };
  if (prefs) apply(prefs); else showBanner(true);

  const commit = (next, msg) => {
    prefs = next; write(prefs); apply(prefs); showBanner(false);
    if (dialog.open) dialog.close();
    announce(msg);
  };

  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-consent]');
    if (c) {
      const all = c.dataset.consent === 'accept';
      commit({ analytics: all, marketing: all }, all ? 'Preferências salvas: todos os cookies aceitos.' : 'Preferências salvas: apenas cookies necessários.');
      return;
    }
    const open = e.target.closest('[data-open-consent], [data-open-consent-dialog]');
    if (open) {
      form.elements.analytics.checked = !!prefs?.analytics;
      form.elements.marketing.checked = !!prefs?.marketing;
      openDialog(dialog, open);
    }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    commit({ analytics: form.elements.analytics.checked, marketing: form.elements.marketing.checked }, 'Preferências de cookies salvas.');
  });
}
