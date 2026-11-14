import { SITE, waLink, instagramUrl, pend } from '../site.mjs';
import { PRODUCTS, CATEGORIES, brl } from '../products.mjs';
import { icon, productCard, productArt, priceText, breadcrumb, esc } from '../components.mjs';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.city} - ${SITE.address.state}`)}`;
const ext = '<span class="sr-only"> (abre em nova aba)</span>';

const feature = ({ id, reverse, eyebrow, title, text, link, img, alt }) => `
<section class="feature${reverse ? ' reverse' : ''}" aria-labelledby="${id}" data-reveal>
  <div class="container feature-grid">
    <div class="feature-text">
      <p class="eyebrow">${eyebrow}</p>
      <h2 id="${id}">${title}</h2>
      <p class="lead">${text}</p>
      <a class="text-link" href="${link[0]}">${link[1]}${icon.arrow}</a>
    </div>
    <figure class="feature-media"><img src="/assets/img/${img}.svg" width="1200" height="900" alt="${alt}" loading="lazy" decoding="async"></figure>
  </div>
</section>`;

const home = () => {
  const featured = ['iphone-14-pro', 'iphone-15', 'xiaomi', 'perfumes-arabes'].map((s) => PRODUCTS.find((p) => p.slug === s));
  return {
    path: '/',
    current: '/',
    title: `${SITE.name} — iPhone, Xiaomi, perfumes e acessórios`,
    description: `Loja física em ${SITE.address.city}/${SITE.address.state} com envio para todo o Brasil. iPhone, Xiaomi, perfumes importados e acessórios, com atendimento direto pelo WhatsApp.`,
    jsonld: [{
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: SITE.name,
      url: `${SITE.url}/`,
      telephone: `+${SITE.whatsapp}`,
      address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.state, addressCountry: 'BR' },
      sameAs: [instagramUrl],
      paymentAccepted: SITE.payments.join(', '),
    }],
    body: `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-text">
      <p class="eyebrow">Loja física em ${SITE.address.city}/${SITE.address.state} · Enviamos para todo o Brasil</p>
      <h1 id="hero-title">Tecnologia que combina com você.</h1>
      <p class="lead">iPhone, Xiaomi, perfumes importados e acessórios, com atendimento direto e transparente pelo WhatsApp.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="/produtos/">Ver produtos</a>
        <a class="btn btn-secondary" href="${waLink('Olá, Nijet Imports! Vim pelo site e gostaria de atendimento.')}" target="_blank" rel="noopener noreferrer">${icon.wa}<span>Falar no WhatsApp${ext}</span></a>
      </div>
    </div>
    <figure class="hero-media"><img src="/assets/img/art-hero.svg" width="1200" height="900" alt="Ilustração de dois smartphones em cores diferentes, um de frente e outro de costas" fetchpriority="high"></figure>
  </div>
</section>

<section class="facts" aria-label="Informações da loja">
  <div class="container">
    <ul>
      <li><strong>Loja física</strong><span>${SITE.address.city}/${SITE.address.state}</span></li>
      <li><strong>Envio</strong><span>Para todo o Brasil</span></li>
      <li><strong>Pagamento</strong><span>Pix, dinheiro e cartão</span></li>
      <li><strong>Atendimento</strong><span>Direto pelo WhatsApp</span></li>
    </ul>
  </div>
</section>

${feature({ id: 'f-qualidade', eyebrow: 'Qualidade', title: 'Cada produto, com informação clara.', text: 'Antes de fechar, você sabe o modelo, a condição e o que está incluso. Dúvidas? Fale com a loja e tire todas elas antes de decidir.', link: ['/trocas-e-devolucoes/', 'Trocas, devoluções e garantia'], img: 'art-quality', alt: 'Ilustração de um smartphone com selos de verificação' })}
${feature({ id: 'f-tecnologia', reverse: true, eyebrow: 'Tecnologia', title: 'iPhone e Xiaomi para cada perfil.', text: 'Da linha iPhone aos aparelhos Xiaomi, a loja ajuda a escolher o modelo certo para o seu uso e o seu orçamento.', link: ['/produtos/', 'Explorar aparelhos'], img: 'art-tech', alt: 'Ilustração de dois smartphones de costas, um azul e outro verde' })}
${feature({ id: 'f-voce', eyebrow: 'Você', title: 'Perfumes e acessórios para completar.', text: 'Fragrâncias importadas, body splash e acessórios. Atendimento de pessoa para pessoa, na loja em Guaimbê ou pelo WhatsApp.', link: ['/a-loja/', 'Conhecer a loja'], img: 'art-you', alt: 'Ilustração de um perfume, sua caixa e um carregador com cabo' })}

<section class="section" aria-labelledby="destaques" data-reveal>
  <div class="container">
    <div class="section-head">
      <h2 id="destaques">Em destaque</h2>
      <a class="text-link" href="/produtos/">Ver todos os produtos${icon.arrow}</a>
    </div>
    <ul class="product-grid">${featured.map(productCard).join('')}</ul>
    <p class="muted-sm note">Preços, disponibilidade e condição variam. Confirme com a loja antes de decidir.</p>
  </div>
</section>

<section class="cta-banner" aria-labelledby="cta-title" data-reveal>
  <div class="container cta-inner">
    <h2 id="cta-title">Encontre o seu próximo aparelho.</h2>
    <p>Conte o que você procura e receba as opções disponíveis, com valores e condições, direto no WhatsApp.</p>
    <a class="btn btn-light" href="${waLink('Olá, Nijet Imports! Gostaria de saber as opções disponíveis.')}" target="_blank" rel="noopener noreferrer">${icon.wa}<span>Chamar no WhatsApp${ext}</span></a>
  </div>
</section>`,
  };
};

const catalog = () => ({
  path: '/produtos/',
  current: '/produtos/',
  title: `Produtos — ${SITE.name}`,
  description: 'iPhone, Xiaomi, perfumes importados, body splash e acessórios. Consulte disponibilidade, condição e valores com a loja.',
  body: `
<section class="page-head">
  <div class="container">
    ${breadcrumb([['/', 'Início'], ['/produtos/', 'Produtos']])}
    <h1>Produtos</h1>
    <p class="lead">Escolha por categoria e consulte disponibilidade, condição e valores diretamente com a loja.</p>
  </div>
</section>
<section class="section tight" aria-label="Lista de produtos">
  <div class="container">
    <h2 class="sr-only">Lista de produtos</h2>
    <div class="filters" id="filters" role="group" aria-label="Filtrar por categoria" hidden>
      <button type="button" class="chip" data-filter="all" aria-pressed="true">Todos</button>
      ${CATEGORIES.map((c) => `<button type="button" class="chip" data-filter="${c.id}" aria-pressed="false">${c.label}</button>`).join('')}
    </div>
    <p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
    <ul class="product-grid" id="product-grid">${PRODUCTS.map(productCard).join('')}</ul>
    <p class="muted-sm note">As imagens são ilustrações genéricas. Fotos reais do aparelho ou produto disponível são enviadas no atendimento. Preços sob consulta até que a loja informe os valores.</p>
  </div>
</section>`,
});

const productPage = (p) => {
  const cat = CATEGORIES.find((c) => c.id === p.category).label;
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, category: cat, description: p.summary,
    image: `${SITE.url}/assets/img/${p.slug}.svg`, brand: undefined };
  if (p.price) ld.offers = { '@type': 'Offer', priceCurrency: 'BRL', price: p.price.toFixed(2), availability: 'https://schema.org/InStock', url: `${SITE.url}/produtos/${p.slug}/`, seller: { '@type': 'Organization', name: SITE.name } };
  const msg = `Olá, Nijet Imports! Tenho interesse em: ${p.name}. Podem me passar disponibilidade, condição e valor?`;
  return {
    path: `/produtos/${p.slug}/`,
    current: '/produtos/',
    title: `${p.name} — ${SITE.name}`,
    description: `${p.name}: ${p.summary}`.slice(0, 158),
    jsonld: [ld],
    body: `
<section class="page-head compact">
  <div class="container">${breadcrumb([['/', 'Início'], ['/produtos/', 'Produtos'], [`/produtos/${p.slug}/`, p.name]])}</div>
</section>
<section class="product-detail">
  <div class="container detail-grid">
    <figure class="detail-media">${productArt(p, { eager: true })}<figcaption class="muted-sm">Ilustração genérica, não corresponde ao aparelho exato.</figcaption></figure>
    <div class="detail-info">
      <p class="eyebrow">${cat}${p.condition ? ` · ${p.condition}` : ''}</p>
      <h1>${esc(p.name)}</h1>
      <p class="detail-price">${priceText(p)}</p>
      <p class="lead">${esc(p.summary)}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener noreferrer">${icon.wa}<span>Consultar no WhatsApp${ext}</span></a>
        <button type="button" class="btn btn-secondary" data-add data-id="${p.slug}" data-name="${esc(p.name)}">Adicionar à minha seleção</button>
      </div>
      <h2 class="h3">Informações da compra</h2>
      <dl class="spec">
        <div><dt>Condição</dt><dd>${p.condition || 'Confirmada no atendimento'}</dd></div>
        <div><dt>Cores e armazenamento</dt><dd>Confirmados no atendimento, conforme estoque</dd></div>
        <div><dt>Garantia</dt><dd>Garantia legal do Código de Defesa do Consumidor. Garantia contratual: ${pend('prazo de garantia contratual')}. <a href="/trocas-e-devolucoes/">Saiba mais</a></dd></div>
        <div><dt>Entrega</dt><dd>Envio para todo o Brasil. Prazo e frete: ${pend('prazo e valor do frete')}. <a href="/entrega-e-frete/">Saiba mais</a></dd></div>
        <div><dt>Pagamento</dt><dd>${SITE.payments.join(', ')}. <a href="/condicoes-comerciais/">Condições comerciais</a></dd></div>
      </dl>
    </div>
  </div>
</section>`,
  };
};

const store = () => ({
  path: '/a-loja/',
  current: '/a-loja/',
  title: `A loja e contato — ${SITE.name}`,
  description: `Loja física em ${SITE.address.city}/${SITE.address.state}. Endereço, WhatsApp, Instagram e como comprar com a ${SITE.name}.`,
  body: `
<section class="page-head">
  <div class="container">
    ${breadcrumb([['/', 'Início'], ['/a-loja/', 'A loja']])}
    <h1>A loja e contato</h1>
    <p class="lead">Atendimento direto, na loja física ou pelo WhatsApp, com envio para todo o Brasil.</p>
  </div>
</section>
<section class="section tight">
  <div class="container two-col">
    <div class="card-soft">
      <h2 class="h3">Onde estamos</h2>
      <address>
        ${SITE.address.street}<br>${SITE.address.city}/${SITE.address.state}<br>
        CEP e bairro: ${pend('CEP e bairro da loja')}
      </address>
      <p><a class="text-link" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir no mapa${ext}${icon.arrow}</a></p>
      <p>Horário de atendimento: ${pend('horário de atendimento da loja')}</p>
    </div>
    <div class="card-soft">
      <h2 class="h3">Fale com a gente</h2>
      <ul class="plain">
        <li>WhatsApp: <a href="${waLink()}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a></li>
        <li>Instagram: <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer">@${SITE.instagram}${ext}</a></li>
        <li>E-mail: ${pend('e-mail de atendimento')}</li>
      </ul>
      <p class="muted-sm">Solicitações sobre dados pessoais: <a href="/direitos-do-titular/">formulário de direitos do titular</a>.</p>
    </div>
  </div>
</section>
<section class="section" aria-labelledby="como-comprar">
  <div class="container narrow">
    <h2 id="como-comprar">Como comprar</h2>
    <ol class="steps">
      <li><strong>Escolha</strong> os produtos de seu interesse e monte sua lista de seleção.</li>
      <li><strong>Envie</strong> a lista pelo WhatsApp ou visite a loja em ${SITE.address.city}.</li>
      <li><strong>Confirme</strong> disponibilidade, condição, valor total e prazo de entrega com a loja.</li>
      <li><strong>Pague</strong> por ${SITE.payments.slice(0, 3).join(', ').toLowerCase()} ou ${SITE.payments[3].toLowerCase()}, conforme combinado.</li>
      <li><strong>Receba</strong> em casa (envio para todo o Brasil) ou retire na loja.</li>
    </ol>
    <p class="muted-sm">Este site não processa pagamentos nem finaliza pedidos; a compra é combinada diretamente com a loja.</p>
  </div>
</section>`,
});

export const mainPages = () => [home(), catalog(), ...PRODUCTS.map(productPage), store()];
