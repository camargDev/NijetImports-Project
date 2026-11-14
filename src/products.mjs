// Catálogo inicial. Nenhum preço, especificação ou garantia foi informado, então nada foi inventado:
// preencha `price` (número, em reais) para exibir valor e habilitar dados estruturados de oferta.

export const CATEGORIES = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'xiaomi', label: 'Xiaomi' },
  { id: 'perfumes', label: 'Perfumes' },
  { id: 'acessorios', label: 'Acessórios' },
];

export const PRODUCTS = [
  {
    slug: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    category: 'iphone',
    condition: 'Seminovo',
    price: null,
    art: { kind: 'phone', c1: '#6d5a92', c2: '#2b2340' },
    summary: 'Linha de seminovos divulgada pela loja. Consulte cores, armazenamento e estado de conservação disponíveis.',
  },
  {
    slug: 'iphone-15',
    name: 'iPhone 15',
    category: 'iphone',
    condition: 'Seminovo',
    price: null,
    art: { kind: 'phone', c1: '#4a5160', c2: '#161a22' },
    summary: 'Linha de seminovos divulgada pela loja. Consulte cores, armazenamento e estado de conservação disponíveis.',
  },
  {
    slug: 'iphone-13',
    name: 'iPhone 13',
    category: 'iphone',
    condition: null,
    price: null,
    art: { kind: 'phone', c1: '#4f86c6', c2: '#1d3f73' },
    summary: 'Modelo divulgado pela loja. Consulte disponibilidade, condição (novo ou seminovo) e cores.',
  },
  {
    slug: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    category: 'iphone',
    condition: null,
    price: null,
    art: { kind: 'phone', c1: '#d9d6d0', c2: '#8c877f' },
    summary: 'Modelo divulgado pela loja. Consulte disponibilidade, condição (novo ou seminovo) e cores.',
  },
  {
    slug: 'xiaomi',
    name: 'Linha Xiaomi',
    category: 'xiaomi',
    condition: null,
    price: null,
    art: { kind: 'phoneRound', c1: '#5f9c8a', c2: '#1f4a3f' },
    summary: 'A loja trabalha com aparelhos Xiaomi. Peça a lista de modelos disponíveis no momento.',
  },
  {
    slug: 'perfumes-arabes',
    name: 'Perfumes importados',
    category: 'perfumes',
    condition: null,
    price: null,
    art: { kind: 'perfume', c1: '#d8b36a', c2: '#8a6a2b' },
    summary: 'Fragrâncias importadas divulgadas pela loja. Consulte as marcas, tamanhos e disponibilidade.',
  },
  {
    slug: 'body-splash-locao',
    name: 'Body splash e loções',
    category: 'perfumes',
    condition: null,
    price: null,
    art: { kind: 'splash', c1: '#e8b9a6', c2: '#b9775f' },
    summary: 'Linha de body splash e loções corporais divulgada pela loja. Consulte opções e disponibilidade.',
  },
  {
    slug: 'acessorios',
    name: 'Acessórios',
    category: 'acessorios',
    condition: null,
    price: null,
    art: { kind: 'accessory', c1: '#f2f2f4', c2: '#c9ccd3' },
    summary: 'Carregadores, cabos e outros acessórios. Informe o seu aparelho para indicarmos a opção compatível.',
  },
];

export const brl = (n) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
