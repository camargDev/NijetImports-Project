import { readJSON, store, announce } from './storage.js';
import { openDialog } from './dialogs.js';

const KEY = 'nijet_selection';
const WA = '5514997368423';

const load = () => {
  const data = readJSON(KEY, []);
  return Array.isArray(data) ? data.filter((i) => i && typeof i.id === 'string' && typeof i.name === 'string').slice(0, 50) : [];
};
const save = (items) => store.set(KEY, JSON.stringify(items));

export function initSelection() {
  const dialog = document.getElementById('selection-dialog');
  const list = document.getElementById('selection-list');
  const empty = document.getElementById('selection-empty');
  const send = document.getElementById('selection-send');
  const clear = document.getElementById('selection-clear');
  let items = load();

  const render = () => {
    const n = items.length;
    document.querySelectorAll('[data-selection-count]').forEach((b) => { b.textContent = String(n); b.hidden = n === 0; });
    document.querySelectorAll('[data-selection-count-text]').forEach((b) => { b.textContent = String(n); });
    if (!list) return;
    list.replaceChildren(...items.map((it) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/produtos/${encodeURIComponent(it.id)}/`;
      a.textContent = it.name; // textContent: sem injeção de HTML
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.remove = it.id;
      btn.textContent = 'Remover';
      const sr = document.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = ` ${it.name}`;
      btn.append(sr);
      li.append(a, btn);
      return li;
    }));
    empty.hidden = n > 0;
    clear.hidden = n === 0;
    const text = n
      ? `Olá, Nijet Imports! Tenho interesse nestes itens:\n${items.map((i) => `- ${i.name}`).join('\n')}\nPodem me passar disponibilidade, condição e valores?`
      : 'Olá, Nijet Imports!';
    send.href = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
    send.setAttribute('aria-disabled', String(n === 0));
  };

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const { id, name } = add.dataset;
      if (items.some((i) => i.id === id)) { announce(`${name} já está na sua seleção.`); return; }
      items = [...items, { id, name }];
      save(items); render();
      announce(`${name} adicionado à sua seleção. ${items.length} ${items.length === 1 ? 'item' : 'itens'}.`);
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      items = items.filter((i) => i.id !== rm.dataset.remove);
      save(items); render();
      announce('Item removido da seleção.');
      return;
    }
    const open = e.target.closest('[data-open-selection]');
    if (open) openDialog(dialog, open);
  });
  send?.addEventListener('click', (e) => { if (!items.length) e.preventDefault(); });
  clear?.addEventListener('click', () => { items = []; save(items); render(); announce('Lista limpa.'); });
  window.addEventListener('storage', (e) => { if (e.key === KEY) { items = load(); render(); } });
  render();
}
