// Preços da ASSINATURA do personal (SaaS) que o site MOSTRA. Sem Firebase:
// pode ser importado pela página inicial sem puxar o SDK.
//
// Quem COBRA é o servidor (functions/planosAssinatura.js no repo do app), pelo
// relógio dele — o site só mostra. Espelha utils/assinatura.js do app: tabela
// REGULAR sempre, exceto na JANELA DE FUNDADOR da live de lançamento
// (28/11/2026, 11:00 a 23:59:59 em Brasília), em que vale a de fundador.
// Mudou aqui, mude lá (e vice-versa).

// Tabela regular. porMes = preço ÷ meses; `de` = mensal × meses; desconto =
// quanto o período sai mais barato que pagar o mensal todo mês, arredondado.
export const PLANOS_REGULAR = Object.freeze([
  { id: 'mensal',     meses: 1,  preco: 79.90,  porMes: 79.90 },
  { id: 'trimestral', meses: 3,  preco: 199.90, porMes: 66.63, de: 239.70, desconto: '17% OFF' },
  { id: 'semestral',  meses: 6,  preco: 359.90, porMes: 59.98, de: 479.40, desconto: '25% OFF' },
  { id: 'anual',      meses: 12, preco: 599.90, porMes: 49.99, de: 958.80, desconto: '37% OFF', popular: true },
].map(Object.freeze));

// Preço de FUNDADOR (a tabela antiga), só durante a janela. `de` aqui é o
// preço regular do MESMO plano (aparece riscado) e o desconto é contra ele.
export const PLANOS_FUNDADOR = Object.freeze([
  { id: 'mensal',     meses: 1,  preco: 39.90,  porMes: 39.90, de: 79.90,  desconto: '50% OFF', fundador: true },
  { id: 'trimestral', meses: 3,  preco: 109.90, porMes: 36.63, de: 199.90, desconto: '45% OFF', fundador: true },
  { id: 'semestral',  meses: 6,  preco: 199.90, porMes: 33.32, de: 359.90, desconto: '44% OFF', fundador: true },
  { id: 'anual',      meses: 12, preco: 359.90, porMes: 29.99, de: 599.90, desconto: '40% OFF', fundador: true, popular: true },
].map(Object.freeze));

// JANELA DE FUNDADOR — o único lugar pra mudar no site se o horário da live
// mudar. Instantes absolutos (Brasília = UTC-3, sem horário de verão).
//   início: 28/11/2026 11:00 BRT = 14:00 UTC (inclusivo)
//   fim:    29/11/2026 00:00 BRT = 03:00 UTC (exclusivo → vale até 23:59:59)
export const FUNDADOR_INICIO = Date.parse('2026-11-28T14:00:00Z');
export const FUNDADOR_FIM    = Date.parse('2026-11-29T03:00:00Z');

const emMs = (agora) => (typeof agora === 'number' ? agora : new Date(agora).getTime());

/** true se `agora` (Date ou ms) está dentro da janela de fundador. */
export function emJanelaFundador(agora = new Date()) {
  const ms = emMs(agora);
  return ms >= FUNDADOR_INICIO && ms < FUNDADOR_FIM;
}

/** Tabela de planos que vale no instante `agora` (Date ou ms). */
export function planosVigentes(agora = new Date()) {
  return emJanelaFundador(agora) ? PLANOS_FUNDADOR : PLANOS_REGULAR;
}

/** Próximo instante em que a tabela troca (pra página aberta atravessar a borda), ou null. */
export function proximaTroca(agora = new Date()) {
  const ms = emMs(agora);
  if (ms < FUNDADOR_INICIO) return FUNDADOR_INICIO;
  if (ms < FUNDADOR_FIM) return FUNDADOR_FIM;
  return null;
}

/** Quanto o plano economiza contra o mensal DA MESMA tabela, em % inteiro (0 no mensal). */
export function economiaVsMensal(plano, tabela) {
  const mensal = tabela.find(p => p.id === 'mensal');
  if (!mensal || plano.meses <= 1) return 0;
  return Math.round((1 - plano.preco / (mensal.preco * plano.meses)) * 100);
}
