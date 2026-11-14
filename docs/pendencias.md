# Pendências que dependem do responsável pelo site

No site, cada item aparece como **[PENDENTE: ...]** (busque por `PENDENTE` nos arquivos `src/`).

| # | Informação | Onde aparece |
|---|---|---|
| 1 | Razão social e CNPJ | Rodapé, privacidade, termos |
| 2 | CEP e bairro da loja | Rodapé, A loja |
| 3 | E-mail de atendimento | Rodapé, A loja, políticas |
| 4 | Horário de atendimento da loja | A loja, condições comerciais |
| 5 | Encarregado (DPO) ou canal de privacidade | Privacidade, direitos do titular |
| 6 | Prazos de retenção de dados (por categoria) | Privacidade |
| 7 | Provedor e país da hospedagem; lista de operadores (transportadora, pagamento, contabilidade) | Privacidade |
| 8 | Frete: serviço de envio, valor, prazo por região, rastreamento | Entrega e frete, produtos |
| 9 | Garantia contratual (prazo, cobertura, exclusões) e regra para seminovos | Trocas e garantia, produtos |
| 10 | Procedimento de devolução e política de troca voluntária | Trocas e garantia |
| 11 | Parcelamento/juros e formas de pagamento por canal (loja x à distância) | Condições comerciais |
| 12 | Política de nota fiscal e de confirmação de pedido | Condições comerciais |
| 13 | Preços e condição (novo/seminovo) de cada produto | `src/products.mjs` (campo `price`) |
| 14 | Domínio do site | Build: `SITE_URL=...` |
| 15 | Nome definitivo da marca: o prompt diz "Nijet import"; o Instagram e a logo dizem "Nijet Imports" (usado no site) | `src/site.mjs` |
| 16 | Medidas organizacionais de segurança da loja | Privacidade |
| 17 | Novo logotipo sem o símbolo da Apple (ver riscos) | Identidade visual |
| 18 | Confirmar os textos de marketing (ex.: "informação clara", "atendimento direto") | Home |
