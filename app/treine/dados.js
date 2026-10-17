// Conteúdo da página de consultoria, separado do layout.
//
// Fica em arquivo próprio por um motivo prático: a prova (depoimentos e fotos
// de transformação) depende de autorização de aluno, e vai chegando aos poucos.
// As seções correspondentes só aparecem quando houver conteúdo aqui — assim a
// página vai ao ar sem buraco, e ganha a prova conforme ela existir, sem tocar
// no arquivo da tela.
//
// NADA aqui pode ser inventado. Depoimento é o que a pessoa escreveu; número é
// o que foi medido na avaliação dela. Depoimento fabricado com nome de aluno
// real quebra a confiança de quem treina com ele e é propaganda enganosa.

// WhatsApp: (19) 99798-4847. Só dígitos, com o 55 na frente — formato do wa.me.
export const WHATSAPP = '5519997984847';

// As três fotos que se alternam no topo. A ordem importa: a de personal vem
// primeiro porque é o rosto dele em contexto de trabalho, e é com ela que a
// pessoa precisa se deparar ao chegar. As outras duas provam, sem precisar
// escrever, que a corrida e o ciclismo que ele vende ele também faz — a de
// corrida tem número de peito com o nome dele.
//
// `pos` é o enquadramento no celular, onde a foto ocupa a tela inteira e o
// texto fica por cima; `posLg` é no computador, onde ela fica na coluna do
// lado. As três têm proporção diferente (9:16, 2:3 e 3:4), então cada uma
// precisa do seu recorte pra não cortar cabeça nem pé.
export const FOTOS_TOPO = [
  { src: '/matheus.jpg',           alt: 'Matheus Barbosa na academia',          pos: 'center 12%', posLg: 'top' },
  // Ordem escolhida pelo Matheus: personal, ciclismo, corrida. A do ciclismo foi
  // trocada em 16/10 por uma que ele escolheu (trilha, rosto e bike inteiros);
  // o original é 9:16 e foi recortado em 3:4, a proporção da coluna. Nome de
  // arquivo novo de propósito: com o nome antigo, o navegador de quem já tinha
  // visitado continuava mostrando a foto da estrada (o Matheus viu isso).
  { src: '/matheus-trilha.jpg',     alt: 'Matheus Barbosa com a bike numa trilha', pos: 'center',     posLg: 'center' },
  { src: '/matheus-corrida.jpg',   alt: 'Matheus Barbosa correndo uma prova',   pos: 'center 25%', posLg: 'center 20%' },
];


// ── PROVA ────────────────────────────────────────────────────────────────────
// Preencher só com autorização por escrito de cada aluno, guardada no WhatsApp.
// A autorização precisa dizer ONDE vai ser publicado (site e Instagram) e a
// pessoa precisa poder escolher entre nome, iniciais, ou sem identificação.

/** @type {{texto:string, quem:string, detalhe?:string}[]} */
export const DEPOIMENTOS = [
  // OITO depoimentos: quatro de musculação e quatro de endurance (dois de
  // ciclismo, dois de corrida). O equilíbrio importa porque a página vende TRÊS
  // modalidades -- com prova só de musculação, "ciclismo e corrida junto" era a
  // única promessa sem ninguém confirmando, e é a mais fácil de duvidar.
  //
  // Chegaram nove. Saíram Fernanda, Mario e Célia pelo critério "fica quem diz
  // algo ESPECÍFICO, sai quem elogia" -- "o suporte é maravilhoso" soa bem e não
  // prova nada. Os textos estão no histórico do git.
  //
  // CADA UM TEM DUAS PARTES, e isso não é enfeite: no cartão a `frase` sai
  // grande e o `resto` pequeno. Antes o corte era automático, no primeiro ponto
  // final -- e quem mandou uma frase só (Fabio, Leonardo, Renata) ficava sem
  // subtítulo, com o cartão visivelmente diferente dos outros. O Matheus viu na
  // hora.
  //
  // Onde a pessoa escreveu tudo emendado, a divisão é de PONTUAÇÃO, não de
  // palavra: entra um ponto onde havia vírgula ou nada. Nenhuma palavra foi
  // trocada, tirada ou reordenada -- com uma exceção, marcada na Talita.
  {
    // O conteúdo é dela, a redação não é a que chegou: o texto original era,
    // frase por frase, o depoimento da Just Move (o concorrente que o próprio
    // Matheus mandou de referência) com o número e o nome trocados. Ele
    // confirmou que a Juliana disse aquilo e assinou embaixo, então o sentido
    // está inteiro -- os 19 kg batem com o 79→60 dela. Publicar o texto do
    // concorrente com outro nome jogaria suspeita nas transformações REAIS.
    frase: 'Perdi 19 quilos desde que comecei o acompanhamento com o Matheus.',
    // Encurtado: era o mais longo dos oito e puxava a altura de todos os
    // cartões pra cima. Saiu "consigo manter a disciplina" (que "não falto
    // mais" já diz) e "nunca me senti tão bem" (elogio, e a página tem outros).
    resto: 'Mas o que mais mudou não foi o corpo, foi a cabeça.',
    quem: 'Juliana',
    detalhe: 'Musculação',
  },
  {
    // A ÚNICA edição de ordem em toda a lista. Chegou como três frases soltas e
    // a comparação com o ano sozinha veio por último -- sendo de longe a mais
    // forte, e só a primeira sai em destaque. Enterrada no fim, seria lida por
    // quem já decidiu ler tudo.
    frase: 'Evoluí mais em 3 meses do que em 1 ano sozinha.',
    resto: 'Pernas e glúteos mudaram muito, e ganhei massa magra.',
    quem: 'Talita',
    detalhe: 'Musculação',
  },
  {
    // O único que ataca a objeção de frente, e por isso vale mesmo sendo o
    // mais longo.
    //
    // Ele cita correção de vídeo pelo WhatsApp. Perguntei ao Matheus se isso
    // valia pra todos os planos -- seria argumento de venda que a página não
    // conta -- e ele respondeu que não: e um comentário dela, não um item da
    // oferta. Fica registrado pra ninguém transformar isso em promessa depois.
    frase: 'Achei que a consultoria online seria fria, apenas mais um treino.',
    // A menção à correção de vídeo saiu junto do encurtamento, e isso resolve
    // duas coisas de uma vez: o cartão fica do tamanho dos outros, E a página
    // para de exibir num depoimento algo que o Matheus confirmou NÃO fazer
    // parte da oferta. Ficar ali era prometer pela boca de uma aluna o que os
    // planos não prometem.
    resto: 'Mas o suporte diário e o bate-papo com o Matheus são impecáveis.',
    quem: 'Renata',
    detalhe: 'Musculação',
  },
  {
    // "Resultado real e sem neura" é a melhor abertura do conjunto: responde
    // sozinha a objeção de quem acha que consultoria vira obsessão com balança.
    frase: 'Resultado real e sem neura.',
    resto: 'Minha autoestima mudou: olho no espelho e amo o que vejo hoje.',
    quem: 'Karina',
    detalhe: 'Musculação',
  },
  {
    // Ciclismo. Veio numa frase só; o ponto entrou antes de "em apenas".
    // Ele confirmou que é ciclismo e pediu pra dizer na frase, não só na
    // etiqueta embaixo do nome: quem passa o olho lê a frase e não chega na
    // etiqueta. "Velocidade" sozinha podia ser corrida.
    frase: 'Minha média no ciclismo melhorou muito.',
    resto: 'Em apenas 2 meses de treino estruturado.',
    quem: 'Fabio',
    detalhe: 'Ciclismo',
  },
  {
    // Ciclismo. Veio numa frase só; o ponto entrou antes do verbo.
    frase: 'Treinos curtos e intensos no rolo durante a semana.',
    resto: 'Mudaram completamente o meu rendimento no fim de semana.',
    quem: 'Leonardo',
    detalhe: 'Ciclismo',
  },
  {
    // Corrida. O melhor da lista pra quem nunca correu: nomeia o motivo real de
    // desistir, o que resolveu, e um marco que qualquer um entende.
    frase: 'Sempre parei por falta de ar.',
    resto: 'Aprendi a controlar meu ritmo e hoje corro meus primeiros 5 km sem parar.',
    quem: 'Fabiana',
    detalhe: 'Corrida',
  },
  {
    // Corrida.
    frase: 'Eu achava que correr era só colocar o tênis e ir.',
    resto: 'Hoje entendo de ritmo e me sinto muito mais segura.',
    quem: 'Débora',
    detalhe: 'Corrida',
  },
];

/** @type {{antes:string, depois:string, quem:string, resultado:string}[]} */
export const TRANSFORMACOES = [
  // Autorizada por ela em 30/08/2026, pelo WhatsApp, sabendo que vai pro site.
  // Pediu pra aparecer só como "Juliana" — sem sobrenome. Respeitar isso: o
  // nome completo dela não pode entrar aqui nem no nome do arquivo.
  // Sem número na legenda, por decisão do Matheus: "a foto fala por si".
  // Tem um ganho aí além do estético — sem dado declarado, não há nada pra
  // alguém contestar. O campo `resultado` continua existindo pra quem vier
  // depois; é só opcional.
  {
    antes: '/prova/juliana-antes.jpg',
    depois: '/prova/juliana-depois.jpg',
    quem: 'Juliana, 40 anos',
  },
  // Autorizada pelo Matheus em 31/08. Duas coisas foram feitas nas fotos dela
  // antes de subir:
  //
  // 1. Uma MULHER DESCONHECIDA aparecia ao fundo, mexendo no armário do
  //    vestiário. Ela não autorizou nada e o rosto dela iria pra um site
  //    público. Foi pixelizada e, depois, cortada de vez do enquadramento --
  //    a pixelização continua por baixo do corte, como rede de segurança.
  // 2. A "antes" era um plano aberto de vestiário e a "depois" era mais
  //    fechada. Nesse par, a Talita apareceria bem menor de um lado que do
  //    outro, e a diferença viria do enquadramento e não do corpo. As duas
  //    foram recortadas pro mesmo tamanho de corpo no quadro.
  //
  // A ordem antes/depois não foi chute: o cartaz atrás dela na primeira diz
  // "SÁBADO | 29.03", o que data a foto em março.
  {
    antes: '/prova/talita-antes.jpg',
    depois: '/prova/talita-depois.jpg',
    quem: 'Talita, 42 anos',
  },
  // Autorizada pelo Matheus em 31/08. Sem ninguém ao fundo em nenhuma das
  // duas, então não precisou pixelizar nada — só o recorte pro corpo ocupar a
  // mesma fatia do quadro nas duas, que é o cuidado que todas levam aqui.
  {
    antes: '/prova/renata-antes.jpg',
    depois: '/prova/renata-depois.jpg',
    quem: 'Renata, 41 anos',
  },
  // O Everton chegou depois: em 30/08 so existia a foto do ANTES, e o par so
  // ficou completo em 02/09, quando ele mandou a de agora.
  //
  // No "antes" a esposa aparecia na frente segurando o celular -- o braco dela
  // foi removido, a pedido do Matheus, pra sobrar so ele.
  //
  // As duas foram recortadas na MESMA fatia de corpo (cabeca ate o quadril).
  // A do antes e de perto e a do depois e num espelho de corpo inteiro: sem
  // equalizar, ele apareceria menor por causa da distancia da camera, e a
  // comparacao mentiria a favor.
  {
    antes: '/prova/everton-antes.jpg',
    depois: '/prova/everton-depois.jpg',
    quem: 'Everton, 38 anos',
  },
  // As duas do Fabio sao de roupa social, e nao de academia como as outras --
  // uma foto profissional e uma no escritorio. Nao tem problema: a mudanca
  // aparece no rosto e no tronco, e roupa social ate ajuda, porque e o mesmo
  // tipo de roupa nas duas.
  //
  // A do depois foi recortada a partir de 130px do topo pra tirar o icone de
  // recorte do proprio celular, que tinha ficado no print.
  {
    antes: '/prova/fabio-antes.jpg',
    depois: '/prova/fabio-depois.jpg',
    quem: 'Fabio, 47 anos',
  },
];

// Confirmados pelo Matheus em 01/09/2026. Estavam comentados desde que a
// página nasceu, esperando ele dizer os números de verdade — número
// inventado numa página de venda é o tipo de coisa que se descobre.
//
// Se algum mudar, muda aqui: a faixa some sozinha se a lista ficar vazia.
/** @type {{n:string, oq:string}[]} */
export const NUMEROS = [
  { n: '8 anos', oq: 'de profissão' },
  { n: '+200', oq: 'alunos atendidos' },
];

// ── REESCRITA DE 16/10/2026: CURTA E DIRETA ─────────────────────────────────
// O Matheus: "muito texto o aluno desiste. precisa ser direto." Tudo daqui pra
// baixo foi reescrito com uma regra só: uma linha por item, sem explicação do
// porquê. As versões longas (e o raciocínio de cada frase) estão no histórico
// do git. O que NÃO mudou: preços, a escada por frequência de revisão, as
// promessas de serviço dele (24h, revisão, garantia de 12 semanas) e o tom de
// exigir a verdade do aluno.
//
// SAÍRAM porque o app não faz mais: relatório mensal em PDF, treino de
// musculação baixado em PDF e "o treino abre sem internet". O que o app faz de
// verdade sem sinal é guardar a carga registrada e enviar quando a rede volta
// (utils/filaOffline.js no app) -- é isso que a página diz agora.
//
// Regra que continua valendo: linha de plano só entra depois que existe.

// ── AS TELAS DO APLICATIVO ───────────────────────────────────────────────────
// Capturas do app v3 que o Gabriel fez pro e-mail de convite (aluna de
// demonstração "Ana", nenhum aluno real). 480x840. Sem tela de endurance: não
// existe captura de demonstração; quando houver, entra como a segunda.
/** @type {{src:string, titulo:string, d:string}[]} */
export const TELAS_APP = [
  { src: '/app/treino-v3.jpg', titulo: 'O treino do dia', d: 'Carga, séries e o vídeo de cada execução.' },
  { src: '/app/recordes-v3.jpg', titulo: 'Seus recordes', d: 'Cada carga que subiu, comparada com a vez anterior.' },
  { src: '/app/inicio-v3.jpg', titulo: 'Sua semana', d: 'O treino de hoje, o próximo e a sua frequência.' },
];

// Só o número, no rodapé: a seção "quem vai montar o seu treino" saiu a
// pedido dele. Formação (UNIMEP, pós em Biomecânica) está no histórico.
export const CREF = 'CREF 167779-G/SP';

// ── PRA QUEM É ───────────────────────────────────────────────────────────────
export const PARA_VOCE = [
  'Treina há anos e parou de evoluir.',
  'Já tentou treino de internet e largou.',
  'Tem pouco tempo e quer que cada treino conte.',
  'Quer correr ou pedalar sem largar a musculação.',
  'Está voltando depois de um tempo parado.',
];

// ── O QUE RECEBE ─────────────────────────────────────────────────────────────
// Só o que o app faz hoje. "Vídeo de execução" e não "de cada exercício": a
// biblioteca de vídeo não cobre todos.
export const RECEBE = [
  { t: 'Treino montado pra você', d: 'No seu objetivo, nos seus dias e no que tem onde você treina.' },
  { t: 'No app, com vídeo de execução', d: 'Séries, carga e descanso na tela. Abriu, treinou.' },
  { t: 'Corrida e ciclismo no mesmo valor', d: 'Planilha semanal por zona. Com prova marcada, o plano vai até ela.' },
  { t: 'WhatsApp direto comigo', d: 'Resposta em até 24 horas, todo dia.' },
  { t: 'Sua carga registrada', d: 'Treino a treino. Sem sinal na academia, ela sobe quando a internet voltar.' },
  { t: 'Avaliação a cada 12 semanas', d: 'Fotos lado a lado com as anteriores e o plano refeito.' },
];

// ── PLANOS ───────────────────────────────────────────────────────────────────
// A escada é por FREQUÊNCIA DE REVISÃO, não por conteúdo (o porquê está no
// histórico, 01/09). Endurance no mesmo valor em todos -- fatiar por
// modalidade é o que ele NÃO faz. Valores dele (31/08).
export const PLANOS = [
  {
    nome: 'Essencial',
    preco: 'R$ 149,90',
    resumo: 'Eu monto, você executa. Reviso uma vez por mês.',
    itens: [
      'Treino no app, com vídeo de execução',
      'Corrida ou ciclismo junto, se quiser',
      'Revisão do programa todo mês',
      'WhatsApp comigo, resposta em 24h',
      'Avaliação com fotos a cada 12 semanas',
    ],
  },
  {
    nome: 'Completo',
    preco: 'R$ 219,90',
    destaque: 'Mais escolhido',
    resumo: 'A cada 15 dias eu abro o seu histórico de carga e mexo no que travou.',
    herda: 'Essencial',
    itens: [
      'Revisão a cada 15 dias',
      'Correção de execução por vídeo',
      'Zonas de corrida e ciclismo por teste',
      'Plano até a sua prova',
      'Ajuste sempre que precisar',
    ],
  },
  {
    nome: 'Individual',
    preco: 'R$ 279,90',
    // A chamada é em CASA, não na academia (correção dele, 01/09).
    resumo: 'Meia hora por mês, só sua, por vídeo.',
    herda: 'Completo',
    itens: [
      'Videochamada de 30 min todo mês',
      'Seus vídeos e sua evolução, vistos juntos',
      'O mês seguinte decidido com você',
    ],
  },
];

export const VALE_PARA_TODOS = [
  'Sem fidelidade',
  'Resposta em até 24h',
  'Garantia de 12 semanas',
];

// ── O COMBINADO ──────────────────────────────────────────────────────────────
// Duas colunas, a DELE primeiro: publicar as próprias obrigações antes das do
// aluno é o que separa quem está seguro do que entrega de quem só cobra. O
// lado do aluno EXIGE a verdade -- "não vou te dar sermão" foi cortado por
// soar frouxo.
export const MINHA_PARTE = [
  'Te responder em até 24 horas, todo dia.',
  'Ajustar na hora se você machucar, viajar ou trocar de academia.',
  'Mexer no treino a partir dos seus números, não do calendário.',
  'Refazer tudo do zero se não funcionar em 12 semanas.',
];

export const SUA_PARTE = [
  'Fotos a cada 12 semanas.',
  'Registrar a carga que você fez de verdade.',
  'Me avisar no dia em que doer.',
  'Não treinou? Me diz que não treinou.',
];

// O passo a passo das fotos, atrás de um clique: quem está decidindo não
// precisa; quem já decidiu quer exatamente isso. Cabeça PIXELIZADA nas três
// (pixelização, não desfoque -- lição do Reels).
export const PROTOCOLO_FOTOS = {
  modelo: [
    { src: '/como-tirar/frontal.jpg', rotulo: 'Frontal' },
    { src: '/como-tirar/lateral.jpg', rotulo: 'Lateral' },
    { src: '/como-tirar/posterior.jpg', rotulo: 'Posterior' },
  ],
  roupa:
    'Roupa de piscina, ou top e shorts. Mesmo lugar, mesma luz e mesma ' +
    'distância nas próximas: é o que deixa a comparação justa.',
};

// ── COMO FUNCIONA ────────────────────────────────────────────────────────────
// Responde a pergunta que ninguém faz em voz alta: QUANDO eu começo. Sem prazo
// em dias pra montar o programa -- ele não combinou nenhum.
export const PASSOS = [
  { quando: 'Agora', t: 'Você preenche o formulário', d: 'Leva um minuto.' },
  // "Mando a cobrança" saiu: dinheiro no primeiro contato esfria.
  { quando: 'No mesmo dia', t: 'Eu te chamo no WhatsApp', d: 'Objetivo, rotina e o que você já treinou. Nada é decidido antes.' },
  { quando: 'Quando quiser começar', t: 'Seu treino chega no app', d: 'Montado nos seus dias e no seu tempo.' },
  { quando: 'Primeiras semanas', t: 'A gente acerta a carga', d: 'O primeiro treino é ponto de partida. Com os seus pesos reais, ele vira seu.' },
];

export const FAQ = [
  { q: 'Preciso de academia?', r: 'Não. Monto com academia completa, simples ou halteres em casa.' },
  { q: 'Tem fidelidade?', r: 'Não. É mensal: cancelou, o mês seguinte não é cobrado.' },
  { q: 'Corrida e ciclismo custam à parte?', r: 'Não. Entram no mesmo valor.' },
  { q: 'Sou iniciante. Serve?', r: 'Serve. O ponto de partida é o seu.' },
  { q: 'As fotos são obrigatórias?', r: 'São. Sem elas o ajuste vira chute. Ficam no app, só entre você e eu.' },
  // Sem valor nem cidade: detalhe de presencial é conversa de WhatsApp.
  { q: 'Atende presencial?', r: 'Atendo. Me chama no WhatsApp.' },
];

// ── GARANTIA ─────────────────────────────────────────────────────────────────
// Doze semanas, presa às FOTOS: é quando existe medida dos dois lados. Em 8
// semanas não há foto nova e a garantia perde o árbitro -- não encurtar.
export const GARANTIA = {
  titulo: 'Garantia de 12 semanas',
  texto: 'Seguiu o plano e não evoluiu? Eu refaço o seu planejamento do zero, sem custo.',
};
