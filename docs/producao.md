# Recomendações para colocar em produção

1. **Preencher todas as pendências** (`docs/pendencias.md`) e **submeter as minutas a advogado**.
2. **Build:** `SITE_URL=https://seudominio.com.br npm run build` (gera `dist/` com canonicals, sitemap e Open Graph corretos).
3. **Hospedagem com HTTPS** e redirecionamento de http para https. Opções: (a) estático (Netlify/Cloudflare Pages: `dist/_headers` já traz os cabeçalhos) **mais** um backend para o formulário de direitos; (b) `PRODUCTION=1 node server/server.mjs` atrás de proxy HTTPS (o proxy deve repassar `X-Forwarded-For`; o servidor confia nele apenas com `PRODUCTION=1`).
4. **Formulário LGPD:** em hospedagem estática sem backend o formulário cai no plano B (mensagem pronta para WhatsApp/copiar). Para receber de verdade: use `server/server.mjs` ou reimplemente `POST /api/direitos-titular` com as mesmas regras (JSON, Origin igual ao host, validação, limite de taxa, corpo ≤ 8 KB). Troque o arquivo `solicitacoes.jsonl` por armazenamento com acesso restrito, backup, criptografia e prazo de retenção; notifique um responsável a cada pedido.
5. **Rate limit distribuído** (Redis ou no CDN/WAF) se houver mais de uma instância; o limite atual é em memória.
6. **Fotos reais** dos produtos (próprias/licenciadas), convertidas para WebP/AVIF, com `width`/`height`, e registro em `docs/imagens-licencas.md`.
7. **Preços:** preencher `price` em `src/products.mjs` (ativa o dado estruturado de oferta) e rebuild.
8. **Se adicionar analytics/publicidade:** cadastrar em `LOADERS` (`src/js/consent.js`), ajustar a CSP, a política de cookies e a de privacidade; só carregar após consentimento.
9. **Pagamento online:** não implementar direto. Usar provedor certificado (checkout hospedado), revisar PCI e a política de privacidade.
10. **Auditorias que não foram executadas aqui:** Lighthouse, axe DevTools, WAVE, OWASP ZAP, teste com NVDA/VoiceOver/TalkBack, `npm audit` (o projeto não tem dependências; ainda assim rode periodicamente se adicionar).
11. **Monitoramento:** uptime, logs de erro, revisão semestral das políticas, plano de resposta a incidentes (LGPD art. 48).
12. Registrar a marca no INPI e redesenhar o logotipo sem o símbolo da Apple.
