// Preços da ASSINATURA do personal (SaaS) que o site MOSTRA. Sem Firebase:
// pode ser importado pela página inicial sem puxar o SDK.
//
// Quem COBRA é o servidor (functions/planosAssinatura.js no repo do app) — o
// site só mostra. Espelha a tabela regular de utils/assinatura.js do app.
// Mudou aqui, mude lá (e vice-versa).
//
// Sem janela de fundador automática: a oferta da live (28/11) é o cupom LIVE28,
// resgatado no app (app.personalx.app.br → Assinatura) e validado no servidor.
// O site mostra sempre o preço cheio.

// Tabela regular. porMes = preço ÷ meses; `de` = mensal × meses; desconto =
// quanto o período sai mais barato que pagar o mensal todo mês, arredondado.
export const PLANOS_REGULAR = Object.freeze([
  { id: 'mensal',     meses: 1,  preco: 79.90,  porMes: 79.90 },
  { id: 'trimestral', meses: 3,  preco: 199.90, porMes: 66.63, de: 239.70, desconto: '17% OFF' },
  { id: 'semestral',  meses: 6,  preco: 359.90, porMes: 59.98, de: 479.40, desconto: '25% OFF' },
  { id: 'anual',      meses: 12, preco: 599.90, porMes: 49.99, de: 958.80, desconto: '37% OFF', popular: true },
].map(Object.freeze));

/** Quanto o plano economiza contra o mensal DA MESMA tabela, em % inteiro (0 no mensal). */
export function economiaVsMensal(plano, tabela) {
  const mensal = tabela.find(p => p.id === 'mensal');
  if (!mensal || plano.meses <= 1) return 0;
  return Math.round((1 - plano.preco / (mensal.preco * plano.meses)) * 100);
}
