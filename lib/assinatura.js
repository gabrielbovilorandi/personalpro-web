'use client';
import { httpsCallable } from 'firebase/functions';
import { functions, auth } from './firebase';

// Plano grátis LEGADO (até 3 alunos ativos): só contas antigas, sem trialAte.
// Conta nova tem 30 dias de teste com alunos ilimitados e depois assina
// (functions/acessoPersonal.js no app). Não usar em texto de venda.
export const ALUNOS_GRATIS = 3;
export const CARENCIA_DIAS = 7;

// Tabela de preços: lib/precosAssinatura.js (sem Firebase, a página inicial usa).
export { PLANOS_REGULAR } from './precosAssinatura';

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

// Checkout: o site não vende — "Assinar" leva pro app web
// (app.personalx.app.br), que tem o campo de cupom (LIVE28) e indicação.

// "Já paguei": consulta o Asaas na hora e libera o acesso se já foi pago
// (não depende só do webhook). @returns {{ status: string }}
export async function verificarPagamentoAssinatura() {
  await assertAuth();
  const res = await httpsCallable(functions, 'verificarPagamento')();
  return res.data;
}
