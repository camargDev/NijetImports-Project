import { SITE, waLink, instagramUrl, pend } from './site.mjs';
import { brl, CATEGORIES } from './products.mjs';
import { ART_DIMENSIONS } from './art.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icon = {
  cart: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 4h2.2l2 11h10.2l2-8H6.4"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  wa: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800 11.800 11.800 0 0 0 4.600 4.100c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.5-.3Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r="1" fill="currentColor" stroke="none"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};
export { icon };

export const logoMark = `<svg class="brand-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="12" fill="#0b1220"/><path d="M11 29V11l18 18V11" stroke="#fff" stroke-width="3.400" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="9.500" r="3" fill="#e11d48"/></svg>`;

const NAV = [
  ['/', 'Início'],
  ['/produtos/', 'Produtos'],
  ['/a-loja/', 'A loja'],
  ['/entrega-e-frete/', 'Entrega e pagamento'],
];

export const header = (current) => `
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${SITE.name} — página inicial">
      ${logoMark}
      <span class="brand-text"><strong>NIJET</strong><span>IMPORTS</span></span>
    </a>
    <nav id="primary-nav" class="primary-nav" aria-label="Principal">
      <ul>
        ${NAV.map(([href, label]) => `<li><a href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="header-actions">
      <button class="icon-btn" type="button" data-open-selection aria-haspopup="dialog">
        ${icon.cart}<span class="sr-only">Minha seleção (<span data-selection-count-text>0</span> itens)</span>
        <span class="badge" data-selection-count hidden aria-hidden="true">0</span>
      </button>
      <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        ${icon.menu}<span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
</header>`;

export const footer = () => `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" aria-label="${SITE.name} — página inicial">${logoMark}<span class="brand-text"><strong>NIJET</strong><span>IMPORTS</span></span></a>
        <p class="footer-blurb">${SITE.tagline} Loja física em ${SITE.address.city}/${SITE.address.state} e envio para todo o Brasil.</p>
        <ul class="social">
          <li><a class="social-link" href="${waLink()}" rel="noopener noreferrer" target="_blank">${icon.wa}<span>WhatsApp<span class="sr-only"> (abre em nova aba)</span></span></a></li>
          <li><a class="social-link" href="${instagramUrl}" rel="noopener noreferrer" target="_blank">${icon.ig}<span>Instagram<span class="sr-only"> (abre em nova aba)</span></span></a></li>
        </ul>
      </div>
      <nav aria-label="Compre com segurança">
        <h2 class="footer-title">Comprar</h2>
        <ul>
          <li><a href="/produtos/">Produtos</a></li>
          <li><a href="/entrega-e-frete/">Entrega e frete</a></li>
          <li><a href="/trocas-e-devolucoes/">Trocas, devoluções e garantia</a></li>
          <li><a href="/condicoes-comerciais/">Condições comerciais</a></li>
        </ul>
      </nav>
      <nav aria-label="Institucional e legal">
        <h2 class="footer-title">Institucional</h2>
        <ul>
          <li><a href="/a-loja/">A loja e contato</a></li>
          <li><a href="/privacidade/">Política de privacidade</a></li>
          <li><a href="/termos/">Termos de serviço</a></li>
          <li><a href="/cookies/">Política de cookies</a></li>
          <li><a href="/direitos-do-titular/">Direitos do titular (LGPD)</a></li>
          <li><a href="/acessibilidade/">Acessibilidade</a></li>
          <li><button type="button" class="link-btn" data-open-consent>Preferências de cookies</button></li>
        </ul>
      </nav>
      <div>
        <h2 class="footer-title">Contato</h2>
        <address>
          ${SITE.address.street}<br>${SITE.address.city}/${SITE.address.state}<br>
          <span class="muted-sm">CEP: ${pend('CEP')}</span><br>
          WhatsApp: <a href="${waLink()}" rel="noopener noreferrer" target="_blank">${SITE.whatsappDisplay}</a><br>
          E-mail: ${pend('e-mail de atendimento')}
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${SITE.year} ${SITE.name}. ${pend('razão social')} · CNPJ ${pend('CNPJ')}</p>
      <p class="muted-sm">Apple, iPhone e Xiaomi são marcas de seus respectivos titulares. A ${SITE.name} é uma loja independente, sem vínculo com essas empresas. Ilustrações do site são representações genéricas e não correspondem ao aparelho exato.</p>
    </div>
  </div>
</footer>`;

const dialogClose = (label) =>
  `<button type="button" class="icon-btn dialog-close" data-close-dialog>${icon.close}<span class="sr-only">${label}</span></button>`;

/** Diálogos globais: seleção, consentimento e banner. */
export const globalUi = () => `
<div class="sr-only" role="status" aria-live="polite" id="live-region"></div>

<dialog class="drawer" id="selection-dialog" aria-labelledby="selection-title">
  <div class="dialog-head"><h2 id="selection-title">Minha seleção</h2>${dialogClose('Fechar minha seleção')}</div>
  <p class="muted" id="selection-empty">Você ainda não adicionou itens. Escolha produtos para enviar à loja em uma única mensagem.</p>
  <ul class="selection-list" id="selection-list"></ul>
  <p class="muted-sm">Aqui você monta uma lista de interesse. Nenhum pagamento é feito neste site: preço, disponibilidade e condições são confirmados com a loja pelo WhatsApp.</p>
  <div class="dialog-actions">
    <a class="btn btn-primary" id="selection-send" href="${waLink()}" rel="noopener noreferrer" target="_blank">${icon.wa}<span>Enviar pelo WhatsApp<span class="sr-only"> (abre em nova aba)</span></span></a>
    <button type="button" class="btn btn-ghost" id="selection-clear">Limpar lista</button>
  </div>
</dialog>

<section class="consent-banner" id="consent-banner" aria-labelledby="consent-title" hidden>
  <h2 id="consent-title">Sua privacidade</h2>
  <p>Usamos apenas o armazenamento necessário para o site funcionar (sua lista de seleção e esta escolha). Hoje não há cookies de estatística nem de publicidade. Se isso mudar, nada será ativado sem a sua escolha. <a href="/cookies/">Política de cookies</a>.</p>
  <div class="consent-actions">
    <button type="button" class="btn btn-secondary" data-consent="accept">Aceitar todos</button>
    <button type="button" class="btn btn-secondary" data-consent="reject">Rejeitar não essenciais</button>
    <button type="button" class="btn btn-ghost" data-open-consent-dialog>Personalizar</button>
  </div>
</section>

<dialog class="modal" id="consent-dialog" aria-labelledby="consent-dialog-title">
  <form method="dialog" id="consent-form" class="stack">
    <div class="dialog-head"><h2 id="consent-dialog-title">Preferências de cookies</h2>${dialogClose('Fechar preferências')}</div>
    <p class="muted">Você pode mudar sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé.</p>
    <fieldset class="consent-field">
      <legend class="sr-only">Categorias de cookies</legend>
      <label class="check"><input type="checkbox" checked disabled><span><strong>Estritamente necessários</strong> — sempre ativos. Guardam sua lista de seleção e sua escolha de cookies neste navegador.</span></label>
      <label class="check"><input type="checkbox" name="analytics"><span><strong>Estatísticas e desempenho</strong> — nenhuma ferramenta em uso no momento.</span></label>
      <label class="check"><input type="checkbox" name="marketing"><span><strong>Publicidade</strong> — nenhuma ferramenta em uso no momento.</span></label>
    </fieldset>
    <div class="dialog-actions">
      <button type="submit" class="btn btn-primary" value="save">Salvar preferências</button>
      <button type="button" class="btn btn-ghost" data-close-dialog>Cancelar</button>
    </div>
  </form>
</dialog>`;

export const productArt = (p, { eager = false, size = 'card' } = {}) => {
  const [w, h] = ART_DIMENSIONS[p.art.kind];
  return `<img src="/assets/img/${p.slug}.svg" width="${w}" height="${h}" alt="Ilustração genérica de ${esc(p.name)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
};

export const priceText = (p) => (p.price ? brl(p.price) : 'Preço sob consulta');

export const productCard = (p) => {
  const cat = CATEGORIES.find((c) => c.id === p.category)?.label;
  return `
<li class="product-card" data-category="${p.category}">
  <a class="product-media" href="/produtos/${p.slug}/" tabindex="-1" aria-hidden="true">${productArt(p)}</a>
  <div class="product-body">
    <p class="eyebrow">${cat}${p.condition ? ` · ${p.condition}` : ''}</p>
    <h3 class="product-name"><a href="/produtos/${p.slug}/">${esc(p.name)}</a></h3>
    <p class="product-price">${priceText(p)}</p>
    <div class="product-actions">
      <a class="btn btn-secondary btn-sm" href="/produtos/${p.slug}/">Ver detalhes<span class="sr-only"> de ${esc(p.name)}</span></a>
      <button type="button" class="btn btn-ghost btn-sm" data-add data-id="${p.slug}" data-name="${esc(p.name)}">Adicionar<span class="sr-only"> ${esc(p.name)} à minha seleção</span></button>
    </div>
  </div>
</li>`;
};

export const breadcrumb = (items) => `
<nav class="breadcrumb" aria-label="Você está em">
  <ol>${items.map(([href, label], i) => i === items.length - 1
    ? `<li><span aria-current="page">${esc(label)}</span></li>`
    : `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ol>
</nav>`;
