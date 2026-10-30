'use client';

// Página do LINK DE INDICAÇÃO (personal indica personal — "Indique e ganhe").
//
// Quem cai aqui é um personal que ganhou o 1º MÊS GRÁTIS de um amigo. Tarefa
// única: levar até a assinatura sem perder o código.
//  - "Assinar pelo site" abre o web app (onde o iPhone assina: o app de iOS
//    não vende) com ?indicacao=CODIGO — o app guarda o código e o checkout já
//    abre preenchido.
//  - Android: baixar o app; quem já tem abre direto pelo personalpro:// (o
//    app guarda o código igual).
//
// Meses grátis (spec final, 30/10): todo personal novo tem 30 dias de teste;
// código de personal (MATHEUS27) dá +1 → 2 meses; cupom de vendedor
// (JOAO-7K2M, com hífen, vale 7 dias) dá +2 → 3 meses. O nome do amigo sai do
// próprio código de personal (1º nome + 2 ou 3 dígitos).
import { useEffect, useState } from 'react';
import { APP_WEB_ENTRAR } from '@/lib/appWeb';
import { LOJA_APPLE, LOJA_PLAY } from '@/lib/seo';

const normalizar = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9-]/g, '').slice(0, 24);

function nomeDoCodigo(codigo) {
  const m = /^([A-Z]{2,10})[2-9]{2,3}$/.exec(codigo);
  if (!m || m[1] === 'PERSONAL') return '';
  return m[1].charAt(0) + m[1].slice(1).toLowerCase();
}

const ehCupomVendedor = (codigo) => /^[A-Z]{2,10}-[A-Z0-9]{4}$/.test(codigo);

export default function Indicacao() {
  const [codigo, setCodigo] = useState('');
  const [copiado, setCopiado] = useState(false);

  // Lido no cliente: com export estático não há servidor pra ler a query.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setCodigo(normalizar(q.get('c') || q.get('codigo') || ''));
  }, []);

  const nome = nomeDoCodigo(codigo);
  const meses = ehCupomVendedor(codigo) ? 3 : 2;
  const assinarSite = codigo ? `${APP_WEB_ENTRAR}?indicacao=${encodeURIComponent(codigo)}` : APP_WEB_ENTRAR;
  const abrirApp = `personalpro://indicacao?c=${encodeURIComponent(codigo)}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o código está na tela.
    }
  };

  return (
    <main lang="pt-BR" className="relative min-h-full flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src="/logo.png" alt="Personal Pro" className="h-14 mx-auto mb-8" />
          <h1 className="text-3xl font-semibold tracking-tight font-display">
            {codigo ? (nome ? `${nome} te deu ${meses} meses grátis` : `Você ganhou ${meses} meses grátis`) : 'Você ganhou meses grátis'}
          </h1>
          <p className="mt-3 text-white/60 leading-relaxed">
            Organize alunos, treinos, agenda e cobranças no Personal Pro. Crie sua conta, use o código abaixo ao assinar e só paga depois de {codigo ? meses : 2} meses, em qualquer plano.{ehCupomVendedor(codigo) ? ' O cupom vale por 7 dias.' : ''}
          </p>
        </div>

        {codigo ? (
          <button
            onClick={copiar}
            className="mt-8 w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-6 py-5 text-center transition hover:bg-white/[0.07]"
          >
            <span className="block text-[11px] font-medium tracking-[0.18em] text-white/40">CÓDIGO DE INDICAÇÃO</span>
            <span className="mt-1 block font-mono text-3xl tracking-[0.2em] text-accent font-display">{codigo}</span>
            <span className="mt-2 block text-xs text-white/40">{copiado ? 'Copiado!' : 'Toque para copiar'}</span>
          </button>
        ) : (
          <p className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-sm text-white/50">
            Peça o código de indicação ao seu amigo e digite na hora de assinar, em “Tem código de indicação?”.
          </p>
        )}

        <div className="mt-8 space-y-3">
          <a
            href={assinarSite}
            className="block rounded-[14px] bg-accent px-6 py-4 text-center font-semibold text-on-accent transition hover:bg-accent-hover"
          >
            {codigo ? `Assinar pelo site com ${meses} meses grátis` : 'Assinar pelo site'}
          </a>
          <a
            href={LOJA_PLAY}
            className="block rounded-[14px] border border-white/15 px-6 py-4 text-center font-medium transition hover:bg-white/5"
          >
            Baixar no Android
          </a>
          <a
            href={LOJA_APPLE}
            className="block rounded-[14px] border border-white/15 px-6 py-4 text-center font-medium transition hover:bg-white/5"
          >
            Baixar no iPhone
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-white/35 leading-relaxed">
          No iPhone, a assinatura é feita pelo site (o primeiro botão) e vale no app na hora.
          {codigo && (
            <>
              {' '}Já tem o app no Android?{' '}
              <a href={abrirApp} className="underline text-white/55">Abrir no app</a>
              {' '}e assinar em Perfil › Assinatura.
            </>
          )}
        </p>
      </div>
    </main>
  );
}
