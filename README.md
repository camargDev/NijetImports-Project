# Nijet Imports — site

HTML, CSS e JavaScript puro, sem dependências. Gerador estático em Node (`build.mjs`).

```
npm run build      # gera dist/ (SITE_URL=https://dominio.com.br para produção) e os PNGs
npm start          # servidor de referência em http://localhost:8080 (cabeçalhos de segurança + API LGPD)
npm run audit      # auditoria automatizada (precisa do servidor rodando)
```

```
build.mjs                 gerador (páginas, CSS, sitemap, robots, _headers)
src/site.mjs              dados da marca e campos PENDENTE
src/products.mjs          catálogo (preencha price)
src/art.mjs               ilustrações SVG originais
src/components.mjs        header, footer, diálogos, cards
src/pages/                home/produtos/loja e páginas legais
src/css/                  tokens, base, componentes, seções
src/js/                   consent, selection, filter, rights-form, nav...
server/server.mjs         servidor de referência
scripts/                  render-images, shots, audit
docs/                     riscos, imagens, auditoria, pendências, produção
```
