import { announce } from './storage.js';
export function initFilter() {
  const bar = document.getElementById('filters');
  const grid = document.getElementById('product-grid');
  if (!bar || !grid) return;
  bar.hidden = false;
  const cards = [...grid.querySelectorAll('.product-card')];
  const apply = (cat) => {
    let n = 0;
    cards.forEach((c) => { const show = cat === 'all' || c.dataset.category === cat; c.hidden = !show; if (show) n += 1; });
    bar.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    const status = document.getElementById('filter-status');
    if (status) status.textContent = `${n} ${n === 1 ? 'produto exibido' : 'produtos exibidos'}`;
  };
  bar.addEventListener('click', (e) => { const b = e.target.closest('[data-filter]'); if (b) apply(b.dataset.filter); });
  const initial = new URLSearchParams(location.search).get('categoria');
  if (initial && cards.some((c) => c.dataset.category === initial)) apply(initial);
}
