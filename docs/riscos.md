# Análise de riscos jurídicos e operacionais

Avaliação técnica preliminar, **não é parecer jurídico**. O site não pode ser declarado "em conformidade" apenas porque as páginas de política existem.

Situação: **R** resolvido no código · **P** pendente (depende de dados do responsável) · **V** depende de validação externa (jurídica/contábil/segurança).

| # | Risco | Gravidade | Prob. | Impacto | Medida preventiva | Situação |
|---|---|---|---|---|---|---|
| 1 | Descumprimento da LGPD (políticas incompletas, sem controlador/DPO identificado) | Alta | Média | Sanções da ANPD, reclamações | Políticas em minuta, bases legais por finalidade, formulário de direitos; completar controlador, DPO e retenção | P, V |
| 2 | Coleta excessiva de dados | Média | Baixa | Violação do princípio da necessidade | Site sem cadastro/login; formulário só pede nome, contato e tipo de pedido; sem analytics | R |
| 3 | Falta de transparência no tratamento | Média | Média | Descumprimento do art. 9º | Tabela de dados/finalidade/base/retenção na política; preencher retenção | P |
| 4 | Cookies sem gerenciamento | Média | Baixa | Multa, perda de confiança | Banner com Aceitar/Rejeitar/Personalizar de mesmo destaque, registro de ferramentas só após consentimento (vazio hoje), reabertura pelo rodapé; atualizar política ao adicionar qualquer ferramenta | R |
| 5 | **Uso do logotipo da Apple na identidade atual da loja** (visto nos prints) | **Alta** | Média | Notificação/ação por violação de marca; remoção de perfis | O site usa monograma próprio e **não** reproduz o logo atual. Redesenhar o logo da loja sem símbolo da Apple | P, V |
| 6 | Uso indevido de imagens (fotos de terceiros/clientes, marcas d'água) | Alta | Baixa | Ação por direito autoral/imagem | Só ilustrações originais; registro em `imagens-licencas.md`; fotos reais só com origem e autorização | R |
| 7 | Uso indevido de marcas (Apple, iPhone, Xiaomi, marcas de perfume) | Média | Média | Notificações de titulares | Uso nominativo apenas para identificar o produto, aviso de independência no rodapé, sem logos oficiais. Validar com advogado, sobretudo para perfumes de marcas específicas | V |
| 8 | Publicidade enganosa / informação incorreta de produto | Alta | Média | CDC arts. 30, 31, 37; multa e indenização | Imagens rotuladas como ilustração; preço "sob consulta"; nenhuma especificação ou garantia inventada; condição informada por escrito antes da compra. Revisar toda a oferta ao publicar preços | P |
| 9 | **Procedência e regularidade dos produtos importados** (nota fiscal, homologação da Anatel para celulares, registro/notificação na Anvisa para perfumes e cosméticos, origem de seminovos) | **Crítica** | Média | Apreensão, multa, responsabilidade penal/consumerista | Fora do alcance do código. A loja deve manter documentação de origem e regularidade de cada lote antes de divulgar | V |
| 10 | Direito do consumidor (arrependimento, garantia legal em seminovos, vício) | Alta | Média | Passivo consumerista | Páginas de trocas, devoluções e garantia com CDC arts. 18, 26, 49, 50; completar procedimento, garantia contratual e regra de seminovos | P, V |
| 11 | Falta de transparência nas condições comerciais (Decreto 7.962/2013: razão social, CNPJ, endereço, preço total, frete, prazo, pagamento) | Alta | Alta enquanto houver pendências | Autuação do Procon | Rodapé e páginas já exibem os campos; preencher os pendentes antes de divulgar | P |
| 12 | Ausência de canais de atendimento | Média | Baixa | Descumprimento do Decreto 7.962 art. 4º | WhatsApp real informado; faltam e-mail e horário | P |
| 13 | Falhas de segurança (XSS, CSRF, injeção, abuso do formulário) | Alta | Baixa | Vazamento, indisponibilidade | CSP restritiva sem inline, sem dependências, `textContent` em dados dinâmicos, endpoint com validação no servidor, limite de taxa, checagem de Origin, limite de 8 KB, cabeçalhos de segurança. Sem SQL no projeto. Teste real em `auditoria.md`; pentest/OWASP ZAP não executados | R (parcial), V |
| 14 | Vazamento de informações (arquivo `solicitacoes.jsonl` com dados pessoais) | Alta | Baixa | Incidente LGPD | Armazenamento sem IP, permissões 600/700, fora de `dist/`. Em produção: banco/serviço com controle de acesso, criptografia e retenção definida | P, V |
| 15 | Dependência de terceiros (WhatsApp/Meta, hospedagem) | Média | Média | Indisponibilidade; transferência internacional | Nenhum script/fonte/mapa de terceiros; WhatsApp é link de saída; transferência internacional descrita na política; escolher hospedagem e documentar | P |
| 16 | Acessibilidade | Média | Média | Exclusão de usuários, risco reputacional | HTML semântico, foco, rótulos, contraste verificado por script, redução de movimento. Faltam testes com leitores de tela reais e avaliação por especialista | P, V |
| 17 | Responsabilidade por conteúdo de terceiros | Baixa | Baixa | Baixo | Site não hospeda conteúdo de terceiros nem comentários; links externos limitados (WhatsApp, Instagram, mapa) | R |
| 18 | Domínio provisório em canonical/sitemap/OG | Baixa | Alta | SEO incorreto | Definir `SITE_URL` no build | P |
