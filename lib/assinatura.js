'use client';
import { httpsCallable } from 'firebase/functions';
import { functions, auth } from './firebase';

export const ALUNOS_GRATIS = 3;
export const CARENCIA_DIAS = 7;

// Tabelas e janela de fundador: lib/precosAssinatura.js (sem Firebase, a página
// inicial usa). Quem assinou antes segue no preço dela — o Asaas cobra o valor
// de quando a assinatura nasceu.
export { planosVigentes, emJanelaFundador, proximaTroca, PLANOS_REGULAR, PLANOS_FUNDADOR, FUNDADOR_INICIO, FUNDADOR_FIM } from './precosAssinatura';

export const LABEL_PLANO = {
  mensal: '1 mês', trimestral: '3 meses', semestral: '6 meses', anual: '12 meses',
};

export function fmtBRL(v) {
  return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',');
}

export function avaliarAssinatura(assinatura, hoje = new Date()) {
  if (!assinatura || !assinatura.status) {
    return { estado: 'sem', liberado: false, diasRestantes: 0, validade: null };
  }
  const validade = assinatura.validade ? new Date(assinatura.validade) : null;
  const dias = validade ? Math.ceil((validade.getTime() - hoje.getTime()) / 86400000) : -9999;
  const cancelada = assinatura.status === 'cancelada';

  if (!cancelada && (assinatura.status === 'trial' || assinatura.status === 'ativa') && dias >= 0) {
    return { estado: assinatura.status, liberado: true, diasRestantes: dias, validade };
  }
  if (!cancelada && dias < 0 && dias >= -CARENCIA_DIAS) {
    return { estado: 'pendente', liberado: true, diasRestantes: CARENCIA_DIAS + dias, validade };
  }
  return { estado: 'bloqueada', liberado: false, diasRestantes: 0, validade };
}

async function assertAuth() {
  const user = auth.currentUser;
  if (!user) throw new Error('Sessão expirada. Saia e entre novamente.');
  await user.getIdToken(true);
}

export async function iniciarTrialAssinatura() {
  await assertAuth();
  const res = await httpsCallable(functions, 'iniciarTrial')();
  return res.data;
}

// `precoVisto` = o preço que a tela mostrou. O servidor nunca cobra por ele
// (escolhe a tabela pelo próprio relógio); se não bater, não cria nada e
// devolve { precoMudou: true, preco, agora }.
export async function criarCheckoutAssinatura(planoId, cpf, precoVisto) {
  await assertAuth();
  const res = await httpsCallable(functions, 'criarCheckout')({ planoId, cpf, precoVisto });
  return res.data;
}

// "Já paguei": consulta o Asaas na hora e libera o acesso se já foi pago
// (não depende só do webhook). @returns {{ status: string }}
export async function verificarPagamentoAssinatura() {
  await assertAuth();
  const res = await httpsCallable(functions, 'verificarPagamento')();
  return res.data;
}
