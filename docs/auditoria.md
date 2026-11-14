# Resultado da auditoria

Executada em 13/11/2026 com `scripts/audit.cjs` (Playwright + Chromium), contra o servidor local (`server/server.mjs`).
**Resultado: 246 verificações, 0 falhas** (após corrigir um salto de títulos em /produtos/ encontrado na primeira execução).

## Realmente executado
- Rastreio de 19 páginas internas: status 200; um `h1` e um `main`; hierarquia de títulos sem saltos; ids únicos; todos os campos com `label`; links e botões com nome acessível; imagens com `alt`, `width` e `height`; `title`, `meta description`, `canonical` e `lang`.
- Sem rolagem horizontal em 1280 px e 360 px em todas as páginas; capturas visuais da home em 1366 px e 390 px.
- Cookies: banner na primeira visita, nenhum cookie HTTP, nada gravado antes da escolha, Aceitar/Rejeitar/Personalizar, persistência, reabertura pelo rodapé, Esc fecha.
- Seleção de produtos (adicionar, remover, mensagem do WhatsApp) e filtro; item malicioso no `localStorage` não executa script (XSS).
- Formulário de direitos: erros com resumo e foco, `aria-invalid`, envio real ao servidor com protocolo.
- Servidor: rejeita Origin de outro site e requisição sem Origin (403), content-type errado (415), validação (400), corpo > 8 KB (413), rate limit (429), GET no endpoint (405), path traversal e 404.
- Teclado: skip link; menu mobile com `aria-expanded` e Esc.
- Contraste WCAG AA por cálculo em todo texto visível da home (sem falhas).
- Console sem erros nem avisos; nenhuma violação da CSP (sem scripts/estilos inline).

## NÃO executado
Lighthouse, axe DevTools, WAVE, OWASP ZAP, `npm audit` (não há dependências), testes com leitores de tela reais, verificação dos links externos em rede (WhatsApp, Instagram, Google Maps), contraste nas demais páginas (mesmos tokens de cor da home), teste em Safari/Firefox.

Para repetir: `npm run build && npm start` e, em outro terminal, `npm run audit`.
