import { SITE, waLink, pend } from '../site.mjs';
import { breadcrumb } from '../components.mjs';

const UPDATED = '13/11/2026';
const ext = '<span class="sr-only"> (abre em nova aba)</span>';

const draft = `<p class="draft-note"><strong>Minuta sujeita à validação jurídica.</strong> Este texto foi preparado como ponto de partida e não garante conformidade legal. Campos marcados como pendentes dependem de informações do responsável pelo site. Versão de ${UPDATED}.</p>`;

const legal = ({ path, title, description, h1, intro, body, noToc }) => ({
  path,
  current: null,
  title: `${title} — ${SITE.name}`,
  description,
  body: `
<section class="page-head">
  <div class="container narrow">
    ${breadcrumb([['/', 'Início'], [path, h1]])}
    <h1>${h1}</h1>
    ${intro ? `<p class="lead">${intro}</p>` : ''}
  </div>
</section>
<article class="section tight">
  <div class="container narrow prose">
    ${draft}
    ${body}
  </div>
</article>`,
});

const controller = `
<ul class="plain">
  <li>Razão social: ${pend('razão social')}</li>
  <li>CNPJ: ${pend('CNPJ')}</li>
  <li>Endereço: ${SITE.address.street}, ${SITE.address.city}/${SITE.address.state}, CEP ${pend('CEP')}</li>
  <li>WhatsApp: <a href="${waLink()}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a></li>
  <li>E-mail: ${pend('e-mail de atendimento')}</li>
</ul>`;

const privacy = () => legal({
  path: '/privacidade/', title: 'Política de privacidade',
  description: `Como a ${SITE.name} trata dados pessoais neste site, com base na LGPD (Lei nº 13.709/2018).`,
  h1: 'Política de privacidade',
  intro: 'Explicamos quais dados tratamos, por quê, por quanto tempo e como você exerce seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
  body: `
<h2>1. Quem é o controlador</h2>
<p>O controlador dos dados tratados neste site é:</p>${controller}
<p>Encarregado pelo tratamento de dados (DPO) e canal de privacidade: ${pend('encarregado (DPO) / canal de privacidade')}.</p>

<h2>2. Quais dados coletamos, para quê e com qual base legal</h2>
<p>Coletamos o mínimo necessário. O consentimento não é usado como justificativa automática: cada tratamento abaixo indica a base legal que entendemos aplicável (art. 7º da LGPD).</p>
<div class="table-wrap"><table>
<caption class="sr-only">Dados tratados, finalidades, bases legais e retenção</caption>
<thead><tr><th scope="col">Dado</th><th scope="col">Finalidade</th><th scope="col">Base legal</th><th scope="col">Retenção</th></tr></thead>
<tbody>
<tr><th scope="row">Registros de acesso (endereço IP, data e hora, navegador, página acessada), gerados pelo servidor</th><td>Segurança, prevenção a abusos e funcionamento do site</td><td>Legítimo interesse (art. 7º, IX) e, se aplicável, obrigação legal (art. 7º, II)</td><td>${pend('prazo de retenção de dados')}</td></tr>
<tr><th scope="row">Lista de seleção de produtos</th><td>Montar sua lista de interesse neste navegador</td><td>Não há tratamento pela loja: o dado fica só no seu dispositivo</td><td>Até você remover os itens ou limpar os dados do navegador</td></tr>
<tr><th scope="row">Sua escolha de cookies</th><td>Registrar a preferência para não perguntar de novo</td><td>Legítimo interesse (registrar sua escolha)</td><td>12 meses, no seu dispositivo</td></tr>
<tr><th scope="row">Dados do <a href="/direitos-do-titular/">formulário de direitos do titular</a>: nome, contato para resposta, tipo de pedido e detalhes</th><td>Identificar, atender e comprovar o atendimento da sua solicitação</td><td>Obrigação legal (art. 7º, II) e exercício regular de direitos (art. 7º, VI)</td><td>${pend('prazo de retenção de dados')}</td></tr>
<tr><th scope="row">Dados enviados por você ao conversar com a loja pelo WhatsApp (número, nome do perfil e conteúdo das mensagens)</th><td>Atender, informar valores e disponibilidade e concluir a compra, se você quiser</td><td>Procedimentos preliminares e execução de contrato a seu pedido (art. 7º, V)</td><td>${pend('prazo de retenção de dados')}</td></tr>
<tr><th scope="row">Dados de compra (identificação, endereço de entrega, dados fiscais e forma de pagamento), se você comprar pela loja ou pelo WhatsApp</th><td>Concluir a venda, emitir documento fiscal e entregar o produto</td><td>Execução de contrato (art. 7º, V) e obrigação legal (art. 7º, II)</td><td>${pend('prazo de retenção de dados')}</td></tr>
</tbody></table></div>
<p>Este site não coleta dados de cartão ou outros dados financeiros e não possui cadastro, login ou área de cliente. Não solicitamos dados pessoais sensíveis.</p>

<h2>3. Com quem compartilhamos</h2>
<ul>
<li><strong>WhatsApp (Meta):</strong> quando você clica em um botão de WhatsApp, sai deste site e passa a usar o serviço do WhatsApp, com política própria.</li>
<li><strong>Hospedagem do site:</strong> ${pend('provedor de hospedagem')}.</li>
<li><strong>Transportadoras, meios de pagamento e contabilidade (operação da loja):</strong> apenas o necessário para entregar, receber e cumprir obrigações fiscais. Fornecedores: ${pend('lista de operadores e fornecedores')}.</li>
<li><strong>Autoridades:</strong> quando houver obrigação legal ou ordem de autoridade competente.</li>
</ul>
<p>Este site não utiliza ferramentas de publicidade, de estatística de terceiros nem fontes, mapas ou vídeos incorporados de terceiros.</p>

<h2>4. Transferência internacional</h2>
<p>O uso do WhatsApp pode envolver transferência internacional de dados pela Meta. A hospedagem do site também pode estar fora do Brasil: ${pend('provedor de hospedagem e país')}. Nesses casos, a transferência deve observar o art. 33 da LGPD.</p>

<h2>5. Como protegemos os dados</h2>
<p>O site é entregue por HTTPS, com política de segurança de conteúdo (CSP), sem scripts de terceiros e com validação de dados também no servidor. Medidas organizacionais da loja para dados de clientes: ${pend('medidas organizacionais de segurança')}.</p>

<h2>6. Por quanto tempo guardamos</h2>
<p>Pelo tempo necessário para a finalidade informada ou para cumprir obrigações legais. Prazos definitivos: ${pend('prazo de retenção de dados')}.</p>

<h2>7. Seus direitos</h2>
<p>Conforme o art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos, inexatos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade; portabilidade; eliminação de dados tratados com base no consentimento; informação sobre compartilhamento; informação sobre a possibilidade de não consentir e suas consequências; revogação do consentimento; oposição a tratamento feito sem consentimento, quando houver descumprimento da lei; e revisão de decisões automatizadas (art. 20).</p>
<p>Para exercer seus direitos, use o <a href="/direitos-do-titular/">formulário de direitos do titular</a> ou o WhatsApp da loja. Podemos pedir informações para confirmar sua identidade. A confirmação de existência ou o acesso são atendidos de forma simplificada imediatamente ou, por declaração completa, em até 15 dias (art. 19). Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>

<h2>8. Cookies e tecnologias semelhantes</h2>
<p>Veja a <a href="/cookies/">Política de cookies</a>. Você controla suas escolhas em “Preferências de cookies”, no rodapé.</p>

<h2>9. Crianças e adolescentes</h2>
<p>O site não é direcionado a crianças. Se houver tratamento de dados de menores de 18 anos, ele será feito no melhor interesse do menor e, quando exigido, com consentimento de um responsável (art. 14).</p>

<h2>10. Alterações desta política</h2>
<p>Podemos atualizar esta política. A data da versão vigente aparece no topo da página.</p>`,
});

const terms = () => legal({
  path: '/termos/', title: 'Termos de serviço',
  description: `Condições de uso do site da ${SITE.name}.`,
  h1: 'Termos de serviço',
  intro: 'Regras para usar este site. Elas não limitam os direitos que a lei garante a você como consumidor.',
  body: `
<h2>1. Quem somos</h2>${controller}

<h2>2. O que este site oferece</h2>
<p>Este é um site de apresentação de produtos (iPhone, Xiaomi, perfumes e acessórios). Ele não processa pagamentos nem finaliza pedidos. Valores, disponibilidade, condição, prazo de entrega e demais condições da compra são confirmados com a loja antes da contratação.</p>

<h2>3. Condições de utilização e regras de uso</h2>
<p>Você pode navegar livremente. É proibido tentar acessar áreas restritas, interferir no funcionamento do site, enviar conteúdo ilícito ou ofensivo pelos canais de contato, usar robôs para sobrecarregar o serviço ou copiar o conteúdo para fins comerciais sem autorização.</p>

<h2>4. Responsabilidades do usuário</h2>
<p>Fornecer informações verdadeiras ao falar com a loja e usar o site conforme a lei e estes termos.</p>

<h2>5. Responsabilidades da loja</h2>
<p>Manter o conteúdo do site o mais correto e atualizado possível e informar de forma clara as características essenciais, o preço total e as condições de cada compra, nos termos do Código de Defesa do Consumidor (Lei nº 8.078/1990) e do Decreto nº 7.962/2013. As imagens do site são ilustrações genéricas; fotos do produto disponível são fornecidas no atendimento. Havendo divergência entre este site e a oferta confirmada pela loja, vale a informação clara e específica prestada ao consumidor antes da compra, sem prejuízo dos direitos legais.</p>

<h2>6. Propriedade intelectual</h2>
<p>Textos, ilustrações, layout e identidade visual do site pertencem à ${SITE.name} ou são usados sob licença. Apple, iPhone, Xiaomi e outras marcas citadas pertencem a seus titulares e são mencionadas apenas para identificar os produtos comercializados, sem vínculo ou endosso.</p>

<h2>7. Limitação de responsabilidade</h2>
<p>Nos limites permitidos pela lei, a loja não responde por indisponibilidade temporária do site, por falhas de serviços de terceiros (como o WhatsApp) ou por links externos. Nada neste termo exclui ou reduz responsabilidades que a lei impõe ao fornecedor, em especial as previstas no Código de Defesa do Consumidor.</p>

<h2>8. Disponibilidade</h2>
<p>O site pode ficar indisponível para manutenção ou por motivos técnicos, sem aviso prévio.</p>

<h2>9. Alterações</h2>
<p>Estes termos podem ser alterados. A versão vigente é a publicada nesta página, com a data no topo.</p>

<h2>10. Legislação e foro</h2>
<p>Aplica-se a legislação brasileira. O consumidor pode propor ação no foro de seu domicílio, conforme o art. 101, I, do Código de Defesa do Consumidor.</p>

<h2>11. Atendimento</h2>
<p>WhatsApp <a href="${waLink()}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a>. E-mail: ${pend('e-mail de atendimento')}.</p>`,
});

const cookies = () => legal({
  path: '/cookies/', title: 'Política de cookies',
  description: `Quais cookies e armazenamentos o site da ${SITE.name} usa e como gerenciar suas preferências.`,
  h1: 'Política de cookies',
  intro: 'Mostramos o que o site guarda no seu navegador, para quê e por quanto tempo.',
  body: `
<p><button type="button" class="btn btn-secondary" data-open-consent>Gerenciar preferências de cookies</button></p>

<h2>Categorias</h2>
<div class="table-wrap"><table>
<caption class="sr-only">Categorias de cookies</caption>
<thead><tr><th scope="col">Categoria</th><th scope="col">Finalidade</th><th scope="col">Situação neste site</th></tr></thead>
<tbody>
<tr><th scope="row">Estritamente necessários</th><td>Funcionamento do site e registro das suas escolhas</td><td>Em uso. Não dependem de consentimento.</td></tr>
<tr><th scope="row">Desempenho</th><td>Medir velocidade e erros</td><td>Não utilizada</td></tr>
<tr><th scope="row">Analíticos</th><td>Entender como o site é usado</td><td>Não utilizada</td></tr>
<tr><th scope="row">Publicidade</th><td>Exibir e medir anúncios</td><td>Não utilizada</td></tr>
</tbody></table></div>
<p>Se a loja passar a usar ferramentas das categorias acima, elas só serão carregadas depois da sua autorização, e esta política será atualizada com nome, fornecedor e duração de cada uma.</p>

<h2>Itens armazenados atualmente</h2>
<div class="table-wrap"><table>
<caption class="sr-only">Armazenamentos em uso</caption>
<thead><tr><th scope="col">Nome</th><th scope="col">Tipo</th><th scope="col">Finalidade</th><th scope="col">Duração</th><th scope="col">Fornecedor</th></tr></thead>
<tbody>
<tr><th scope="row">nijet_consent</th><td>Armazenamento local (localStorage)</td><td>Guardar sua escolha de cookies</td><td>12 meses</td><td>Próprio (${SITE.name})</td></tr>
<tr><th scope="row">nijet_selection</th><td>Armazenamento local (localStorage)</td><td>Guardar sua lista de seleção de produtos</td><td>Até você remover ou limpar os dados do navegador</td><td>Próprio (${SITE.name})</td></tr>
</tbody></table></div>
<p>Esses dados ficam apenas no seu dispositivo e não são enviados ao servidor do site.</p>

<h2>Como mudar de ideia</h2>
<p>Use o botão acima ou o link “Preferências de cookies” no rodapé. Você também pode apagar os dados do site nas configurações do navegador.</p>`,
});

const rights = () => legal({
  path: '/direitos-do-titular/', title: 'Direitos do titular (LGPD)',
  description: `Solicite acesso, correção, eliminação e outros direitos sobre seus dados pessoais tratados pela ${SITE.name}.`,
  h1: 'Direitos do titular de dados',
  intro: 'Use este formulário para exercer seus direitos previstos no art. 18 da LGPD.',
  body: `
<p>Pedimos apenas o necessário para identificar e responder à sua solicitação. Não envie documentos, senhas ou dados sensíveis neste formulário: se precisarmos confirmar sua identidade, avisaremos como fazer isso com segurança.</p>
<p>Base legal do tratamento dos dados deste formulário: obrigação legal e exercício regular de direitos (art. 7º, II e VI). Detalhes na <a href="/privacidade/">Política de privacidade</a>.</p>

<form id="rights-form" class="form" action="/api/direitos-titular" method="post" novalidate>
  <div id="form-errors" class="form-errors" role="alert" tabindex="-1" hidden></div>

  <div class="field">
    <label for="rf-name">Nome completo</label>
    <input id="rf-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="120" aria-describedby="rf-name-err">
    <p class="error" id="rf-name-err" hidden></p>
  </div>

  <div class="field">
    <label for="rf-contact">E-mail ou telefone para resposta</label>
    <input id="rf-contact" name="contact" type="text" inputmode="email" autocomplete="email" required maxlength="120" aria-describedby="rf-contact-hint rf-contact-err">
    <p class="hint" id="rf-contact-hint">Usaremos somente para responder a este pedido.</p>
    <p class="error" id="rf-contact-err" hidden></p>
  </div>

  <fieldset class="field" aria-describedby="rf-types-err">
    <legend>O que você deseja solicitar? <span class="hint-inline">(marque uma ou mais opções)</span></legend>
    <label class="check"><input type="checkbox" name="types" value="confirmacao"><span>Confirmação da existência de tratamento</span></label>
    <label class="check"><input type="checkbox" name="types" value="acesso"><span>Acesso aos meus dados</span></label>
    <label class="check"><input type="checkbox" name="types" value="correcao"><span>Correção de dados incompletos, inexatos ou desatualizados</span></label>
    <label class="check"><input type="checkbox" name="types" value="anonimizacao_bloqueio_eliminacao"><span>Anonimização, bloqueio ou eliminação de dados</span></label>
    <label class="check"><input type="checkbox" name="types" value="portabilidade"><span>Portabilidade dos dados</span></label>
    <label class="check"><input type="checkbox" name="types" value="compartilhamento"><span>Informações sobre compartilhamento de dados</span></label>
    <label class="check"><input type="checkbox" name="types" value="consequencias_nao_consentir"><span>Informações sobre a possibilidade de não consentir e suas consequências</span></label>
    <label class="check"><input type="checkbox" name="types" value="revogacao_consentimento"><span>Revogação de consentimento, quando essa for a base utilizada</span></label>
    <label class="check"><input type="checkbox" name="types" value="oposicao"><span>Oposição a tratamento feito sem consentimento</span></label>
    <label class="check"><input type="checkbox" name="types" value="revisao_decisao_automatizada"><span>Revisão de decisão tomada de forma automatizada</span></label>
    <p class="error" id="rf-types-err" hidden></p>
  </fieldset>

  <div class="field">
    <label for="rf-details">Detalhes <span class="hint-inline">(opcional)</span></label>
    <textarea id="rf-details" name="details" rows="5" maxlength="1500" aria-describedby="rf-details-hint rf-details-err"></textarea>
    <p class="hint" id="rf-details-hint">Máximo de 1.500 caracteres. Não inclua dados sensíveis.</p>
    <p class="error" id="rf-details-err" hidden></p>
  </div>

  <div class="hp" aria-hidden="true"><label>Não preencha este campo <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

  <button type="submit" class="btn btn-primary" id="rf-submit"><span data-label>Enviar solicitação</span></button>
  <div id="form-result" class="form-result" role="status" tabindex="-1" hidden></div>
</form>

<h2>Prazos e outros canais</h2>
<p>Confirmação e acesso simplificado: imediatamente, ou declaração completa em até 15 dias (art. 19 da LGPD). Demais pedidos: o mais breve possível, conforme regulamentação da ANPD. Você também pode escrever pelo WhatsApp <a href="${waLink('Olá! Gostaria de exercer meus direitos de titular de dados (LGPD).')}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a>. Canal do encarregado (DPO): ${pend('encarregado (DPO) / canal de privacidade')}.</p>`,
});

const delivery = () => legal({
  path: '/entrega-e-frete/', title: 'Entrega e frete',
  description: `Como funciona a entrega dos produtos da ${SITE.name}, que envia para todo o Brasil.`,
  h1: 'Entrega e frete',
  intro: 'Enviamos para todo o Brasil. Antes de fechar a compra, informamos o valor do frete e o prazo.',
  body: `
<h2>Abrangência</h2><p>Envio para todo o território brasileiro. Retirada ou visita na loja física em ${SITE.address.city}/${SITE.address.state}.</p>
<h2>Forma de envio e valor do frete</h2><p>${pend('prazo e valor do frete')} O valor do frete é informado de forma discriminada, junto do preço do produto, antes da confirmação da compra (Decreto nº 7.962/2013, art. 2º).</p>
<h2>Prazo</h2><p>O prazo de entrega é informado antes da compra: ${pend('prazo de entrega por região')}.</p>
<h2>Rastreamento</h2><p>${pend('serviço de envio e rastreamento')}</p>
<h2>Recebimento</h2><p>Confira o produto ao receber. Se houver avaria, divergência ou problema, avise a loja imediatamente pelo WhatsApp, para que a ocorrência seja tratada. Veja também <a href="/trocas-e-devolucoes/">trocas, devoluções e garantia</a>.</p>
<h2>Formas de pagamento</h2><p>Veja as <a href="/condicoes-comerciais/">condições comerciais</a>.</p>`,
});

const returns = () => legal({
  path: '/trocas-e-devolucoes/', title: 'Trocas, devoluções e garantia',
  description: `Direito de arrependimento, garantia legal e contratual e como solicitar troca ou devolução na ${SITE.name}.`,
  h1: 'Trocas, devoluções e garantia',
  intro: 'Resumo dos seus direitos como consumidor e do procedimento para exercê-los.',
  body: `
<h2>Direito de arrependimento (compras à distância)</h2>
<p>Quando a compra é feita fora do estabelecimento (internet, WhatsApp ou telefone), você pode desistir em até <strong>7 dias corridos</strong> contados do recebimento do produto, sem precisar justificar (art. 49 do Código de Defesa do Consumidor e art. 5º do Decreto nº 7.962/2013). Os valores pagos, inclusive frete, são devolvidos de imediato e corrigidos monetariamente.</p>
<p>Como solicitar: pelo WhatsApp <a href="${waLink('Olá! Gostaria de exercer o direito de arrependimento de uma compra.')}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a> ou e-mail ${pend('e-mail de atendimento')}. Informe nome, produto e data de recebimento. Procedimento de devolução do produto: ${pend('procedimento de devolução')}.</p>

<h2>Compras feitas na loja física</h2>
<p>O direito de arrependimento legal não se aplica a compras feitas no estabelecimento, mas os direitos por defeito do produto continuam valendo. Política de troca voluntária, se houver: ${pend('política de troca voluntária')}.</p>

<h2>Garantia legal por defeito (produtos novos e seminovos)</h2>
<p>O Código de Defesa do Consumidor assegura garantia legal contra vícios: <strong>30 dias</strong> para produtos não duráveis e <strong>90 dias</strong> para duráveis, contados da entrega (defeitos aparentes) ou do momento em que o defeito for percebido (defeitos ocultos). Em caso de vício, o fornecedor tem até 30 dias para sanar. Se não resolver, você pode escolher entre substituição, restituição do valor ou abatimento proporcional do preço (art. 18). Regra específica para seminovos: ${pend('validação jurídica da garantia de seminovos')}.</p>

<h2>Garantia contratual</h2>
<p>Prazo, cobertura e exclusões: ${pend('prazo de garantia contratual')}. A garantia contratual é complementar à legal e deve ser entregue por escrito, em linguagem clara (art. 50 do CDC).</p>`,
});

const commercial = () => legal({
  path: '/condicoes-comerciais/', title: 'Condições comerciais',
  description: `Preços, formas de pagamento e atendimento ao consumidor na ${SITE.name}.`,
  h1: 'Condições comerciais',
  intro: 'Como informamos preços, pagamento e atendimento.',
  body: `
<h2>Preços</h2>
<p>Os valores variam conforme modelo, condição e disponibilidade. Antes de fechar, informamos o preço total, com frete e eventuais outros custos discriminados. O site exibe “preço sob consulta” enquanto a loja não publicar valores.</p>
<h2>Formas de pagamento</h2>
<ul><li>${SITE.payments.join('</li><li>')}</li></ul>
<p>Parcelamento e juros no cartão: ${pend('parcelamento e juros no cartão')}. Disponibilidade de cada forma por canal (loja ou à distância): ${pend('formas de pagamento por canal')}. Este site não processa pagamentos.</p>
<h2>Informações sobre o produto</h2>
<p>Modelo, condição (novo ou seminovo), cor, armazenamento, itens inclusos e garantia são informados antes da compra, por escrito.</p>
<h2>Nota fiscal</h2><p>${pend('política de emissão de nota fiscal')}</p>
<h2>Confirmação do pedido</h2><p>A loja confirma o recebimento da sua solicitação e os termos da compra por escrito, pelo mesmo canal do atendimento (Decreto nº 7.962/2013, art. 4º). Procedimento: ${pend('procedimento de confirmação do pedido')}.</p>
<h2>Atendimento ao consumidor</h2>
<p>WhatsApp <a href="${waLink()}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a>; e-mail ${pend('e-mail de atendimento')}; loja em ${SITE.address.street}, ${SITE.address.city}/${SITE.address.state}. Horário: ${pend('horário de atendimento da loja')}.</p>
<h2>Veja também</h2>
<ul><li><a href="/entrega-e-frete/">Entrega e frete</a></li><li><a href="/trocas-e-devolucoes/">Trocas, devoluções e garantia</a></li></ul>`,
});

const a11y = () => legal({
  path: '/acessibilidade/', title: 'Acessibilidade',
  description: `Compromisso de acessibilidade do site da ${SITE.name} e como relatar barreiras.`,
  h1: 'Acessibilidade',
  intro: 'Buscamos atender às diretrizes WCAG 2.2, nível AA, e às recomendações do eMAG.',
  body: `
<h2>O que fazemos</h2>
<ul>
<li>HTML semântico, hierarquia de títulos e links para pular ao conteúdo.</li>
<li>Navegação completa por teclado, com indicador de foco visível.</li>
<li>Contraste de cores e áreas de toque adequados.</li>
<li>Formulários com rótulos, mensagens de erro identificadas e resumo de erros.</li>
<li>Respeito à preferência de redução de movimento.</li>
<li>Textos alternativos nas imagens.</li>
</ul>
<h2>Limitações conhecidas</h2>
<p>Os testes com leitores de tela reais (NVDA, VoiceOver, TalkBack) ainda não foram feitos e não há avaliação por terceiros: ${pend('avaliação de acessibilidade por especialista')}.</p>
<h2>Encontrou uma barreira?</h2>
<p>Conte pelo WhatsApp <a href="${waLink('Olá! Encontrei uma dificuldade de acessibilidade no site.')}" target="_blank" rel="noopener noreferrer">${SITE.whatsappDisplay}${ext}</a>.</p>`,
});

export const legalPages = () => [privacy(), terms(), cookies(), rights(), delivery(), returns(), commercial(), a11y()];
