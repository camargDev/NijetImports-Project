import { announce } from './storage.js';

const WA = '5514997368423';
const TYPE_LABELS = {
  confirmacao: 'Confirmação da existência de tratamento',
  acesso: 'Acesso aos dados',
  correcao: 'Correção de dados',
  anonimizacao_bloqueio_eliminacao: 'Anonimização, bloqueio ou eliminação',
  portabilidade: 'Portabilidade',
  compartilhamento: 'Informações sobre compartilhamento',
  consequencias_nao_consentir: 'Consequências de não consentir',
  revogacao_consentimento: 'Revogação de consentimento',
  oposicao: 'Oposição ao tratamento',
  revisao_decisao_automatizada: 'Revisão de decisão automatizada',
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{10,20}$/;

const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Informe seu nome completo.';
  const c = v.contact.trim();
  if (!c) errors.contact = 'Informe um e-mail ou telefone para resposta.';
  else if (!EMAIL.test(c) && !(PHONE.test(c) && c.replace(/\D/g, '').length >= 10)) errors.contact = 'Informe um e-mail válido (nome@exemplo.com) ou um telefone com DDD.';
  if (!v.types.length) errors.types = 'Marque ao menos uma opção.';
  if (v.details.length > 1500) errors.details = 'O texto pode ter no máximo 1.500 caracteres.';
  return errors;
};

export function initRightsForm() {
  const form = document.getElementById('rights-form');
  if (!form) return;
  const summary = document.getElementById('form-errors');
  const result = document.getElementById('form-result');
  const btn = document.getElementById('rf-submit');
  const label = btn.querySelector('[data-label]');
  const idFor = { name: 'rf-name', contact: 'rf-contact', details: 'rf-details', types: 'rf-types-err' };

  const clearErrors = () => {
    form.querySelectorAll('.error').forEach((p) => { p.hidden = true; p.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
    summary.hidden = true; summary.replaceChildren();
  };
  const showErrors = (errors) => {
    const h = document.createElement('h2'); h.textContent = 'Corrija os campos abaixo:';
    const ul = document.createElement('ul');
    Object.entries(errors).forEach(([k, msg]) => {
      const p = document.getElementById(k === 'types' ? 'rf-types-err' : `${idFor[k]}-err`);
      p.textContent = msg; p.hidden = false;
      const input = k === 'types' ? form.querySelector('input[name="types"]') : document.getElementById(idFor[k]);
      if (k !== 'types') input.setAttribute('aria-invalid', 'true');
      const li = document.createElement('li'); const a = document.createElement('a');
      a.href = `#${input.id || 'rf-types-err'}`; a.textContent = msg;
      a.addEventListener('click', (ev) => { ev.preventDefault(); input.focus(); });
      li.append(a); ul.append(li);
    });
    summary.append(h, ul); summary.hidden = false; summary.focus();
  };
  const setBusy = (busy) => {
    btn.disabled = busy; btn.setAttribute('aria-busy', String(busy));
    label.textContent = busy ? 'Enviando…' : 'Enviar solicitação';
  };
  const message = (v, id) =>
    `Olá! Solicitação de direitos do titular (LGPD).\nProtocolo: ${id}\nNome: ${v.name}\nContato: ${v.contact}\nSolicitações: ${v.types.map((t) => TYPE_LABELS[t]).join('; ')}${v.details ? `\nDetalhes: ${v.details}` : ''}`;

  const showResult = ({ ok, id, v }) => {
    result.replaceChildren(); result.classList.toggle('is-warn', !ok); result.hidden = false;
    const p = document.createElement('p'); const strong = document.createElement('strong');
    if (ok) {
      strong.textContent = 'Solicitação recebida.';
      p.append(strong, ` Protocolo ${id}. Responderemos pelo contato informado, dentro dos prazos legais.`);
      result.append(p);
    } else {
      strong.textContent = 'Não foi possível enviar automaticamente.';
      p.append(strong, ' Seus dados não foram enviados. Você pode mandar a solicitação pelo WhatsApp da loja (a mensagem já está pronta) ou copiar o texto.');
      const text = message(v, id);
      const a = document.createElement('a'); a.className = 'btn btn-primary'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.href = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`; a.textContent = 'Enviar pelo WhatsApp (abre em nova aba)';
      const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'btn btn-secondary'; copy.textContent = 'Copiar texto';
      copy.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(text); announce('Texto copiado.'); copy.textContent = 'Texto copiado'; }
        catch { announce('Não foi possível copiar. Selecione o texto manualmente.'); }
      });
      const row = document.createElement('div'); row.className = 'btn-row'; row.append(a, copy);
      result.append(p, row);
    }
    result.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors(); result.hidden = true;
    const fd = new FormData(form);
    const v = {
      name: String(fd.get('name') || ''), contact: String(fd.get('contact') || ''),
      types: fd.getAll('types').map(String), details: String(fd.get('details') || ''), website: String(fd.get('website') || ''),
    };
    const errors = validate(v);
    if (Object.keys(errors).length) { showErrors(errors); return; }
    setBusy(true);
    const localId = `LOCAL-${Date.now().toString(36).toUpperCase()}`;
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 10000);
      const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v), signal: ctl.signal, credentials: 'same-origin' });
      clearTimeout(t);
      if (res.status === 400) {
        const body = await res.json().catch(() => ({}));
        if (body.errors) { showErrors(body.errors); return; }
      }
      if (res.status === 429) { showResult({ ok: false, id: localId, v }); announce('Muitas tentativas. Use o WhatsApp ou tente mais tarde.'); return; }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      showResult({ ok: true, id: String(data.id || localId).replace(/[^\w-]/g, ''), v });
      form.reset();
    } catch {
      showResult({ ok: false, id: localId, v });
    } finally { setBusy(false); }
  });
}
