// Acesso seguro ao localStorage (pode falhar em modo privado ou com dados bloqueados).
export const store = {
  get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } },
  remove(key) { try { window.localStorage.removeItem(key); } catch { /* ignora */ } },
};
export const readJSON = (key, fallback) => {
  const raw = store.get(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
};
export const announce = (msg) => {
  const el = document.getElementById('live-region');
  if (!el) return;
  el.textContent = '';
  window.setTimeout(() => { el.textContent = msg; }, 50);
};
