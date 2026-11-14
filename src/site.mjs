// Dados da marca. Só entram aqui fatos informados pelo responsável (perfil do Instagram).
// Tudo que não foi informado fica em PENDING e aparece no site como campo "PENDENTE".

export const SITE = {
  name: 'Nijet Imports',
  shortName: 'Nijet',
  tagline: 'Qualidade, tecnologia e você.',
  lang: 'pt-BR',
  // Defina SITE_URL no build de produção: SITE_URL=https://seudominio.com.br node build.mjs
  url: (process.env.SITE_URL || 'https://SEU-DOMINIO.com.br').replace(/\/$/, ''),
  urlIsPlaceholder: !process.env.SITE_URL,
  whatsapp: '5514997368423',
  whatsappDisplay: '(14) 99736-8423',
  instagram: 'nijet_imports',
  address: { street: 'Altamiro Belmiro Rocha, 32', city: 'Guaimbê', state: 'SP' },
  payments: ['Pix', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  year: new Date().getFullYear(),
};

export const waLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const instagramUrl = `https://www.instagram.com/${SITE.instagram}/`;

/** Campo de preenchimento pendente, identificado por texto (não só por cor). */
export const pend = (label) =>
  `<mark class="pending" data-pending="${label}">[PENDENTE: ${label}]</mark>`;

/** Lista usada para gerar docs/pendencias.md */
export const PENDING_FIELDS = [
  'razão social',
  'CNPJ',
  'CEP e bairro da loja',
  'e-mail de atendimento',
  'horário de atendimento da loja',
  'encarregado (DPO) / canal de privacidade',
  'prazos de retenção de dados',
  'provedor de hospedagem',
  'prazo e valor do frete',
  'prazo de garantia contratual',
  'parcelamento e juros no cartão',
  'domínio do site',
];
