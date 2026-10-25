'use client';

// Página de consultoria online do Matheus, destino do link da bio do Instagram
// (@matheusseupersonal). O quiz leva ao WhatsApp dele com as respostas
// preenchidas; a cobrança é feita depois, na conversa. A venda é na WEB de
// propósito: cobrança dentro do app pode ser enquadrada pela Apple como compra
// digital.
//
// 25/10/2026, quarta forma desta página (aprovada pelo Gabriel e pelo Matheus
// em cima dos rascunhos de celular):
// - UM PLANO só, "Consultoria": R$ 109,90 nas primeiras 50 vagas (contador
//   real, em dados.js), depois R$ 149,90, e o ciclo de 12 semanas pago de uma
//   vez. Essencial/Completo/Individual saíram: ninguém pagava os dois de cima.
// - QUIZ de 3 perguntas no lugar do formulário de seis campos. Mostra uma
//   semana de EXEMPLO e manda as respostas pro WhatsApp.
// - GARANTIAS juntas (7 dias do CDC, 12 semanas, sem fidelidade), "pra quem
//   não é", um bloco curto sobre ele e o rodapé com CPF e cidade (Decreto
//   7.962/2013).
// - Saíram "O que você recebe" e "Como funciona": o cartão do plano e o quiz
//   já dizem isso. Menos texto, a pedido dele.
//
// 16/10/2026, terceira forma: visual do app (Grafite & Lima), texto curto,
// movimento revisado (carrosséis aceitam o dedo, só giram na tela, "reduzir
// movimento" respeitado também nos cliques). As versões anteriores, com o
// raciocínio de cada seção, estão no git.
//
// Continua de propósito: a foto dele abre a página (é o que nenhum template
// tem), seções com pesos diferentes, nada de grade de cards com ícone.

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  WHATSAPP, CONSULTORIA, VAGAS, SELOS_PLANO, DEPOIMENTOS, TRANSFORMACOES, NUMEROS,
  PARA_VOCE, NAO_PARA_VOCE, FAQ, GARANTIAS, FOTOS_TOPO, TELAS_APP, CREF, CPF, CIDADE,
  MINHA_PARTE, SUA_PARTE, PROTOCOLO_FOTOS, QUIZ, SEMANA_EXEMPLO,
} from './dados';
import { CURVA, prefereMenosMovimento, useNaTela, useArrastar } from './movimento';

const TITULO_SECAO = 'text-3xl font-semibold tracking-tight sm:text-4xl';
const ROTULO = 'text-[12px] font-bold uppercase tracking-[0.14em] text-accent';
const BOTAO_LIMA =
  'inline-flex items-center justify-center gap-2 rounded-[16px] bg-accent font-bold text-on-accent ' +
  'transition hover:bg-accent-hover active:scale-[0.98] motion-reduce:active:scale-100';
const BOTAO_CINZA =
  'inline-flex items-center justify-center rounded-[16px] bg-surface-2 font-bold text-ink ' +
  'transition hover:bg-white/[0.12] active:scale-[0.98] motion-reduce:active:scale-100';

// ── Preço ────────────────────────────────────────────────────────────────────
// Tudo calculado de dados.js: mudou o número de vagas ou o preço lá, a página
// inteira acompanha (cartão, quiz e mensagem do WhatsApp).
const brl = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`;
const centavos = (v) => Math.round(v * 100) / 100;
const RESTAM = Math.max(0, VAGAS.total - VAGAS.ocupadas);
const TEM_VAGA = RESTAM > 0;
const PRECO_MES = TEM_VAGA ? CONSULTORIA.lancamento : CONSULTORIA.depois;
const CICLO_MES = centavos(CONSULTORIA.ciclo12 / 3);
const CICLO_ECONOMIA = centavos(CONSULTORIA.lancamento * 3 - CONSULTORIA.ciclo12);

// (19) 99798-4847, a partir dos dígitos do wa.me.
const TELEFONE = (() => {
  const d = WHATSAPP.slice(2);
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
})();
const LINK_WHATS_DIRETO =
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá Matheus! Vi a sua página e queria conversar sobre a consultoria.')}`;

// O destaque da prova é a primeira transformação, com o depoimento da MESMA
// pessoa (Juliana: os 19 kg do depoimento batem com as fotos). Os outros vão
// na fila e no carrossel, sem repetir.
const DESTAQUE = TRANSFORMACOES[0];
const DESTAQUE_FRASE = DESTAQUE && DEPOIMENTOS.find((d) => DESTAQUE.quem.split(',')[0].trim() === d.quem);
const OUTRAS_TRANSF = TRANSFORMACOES.slice(1);
const OUTROS_DEP = DEPOIMENTOS.filter((d) => d !== DESTAQUE_FRASE);

function rolarPara(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: prefereMenosMovimento() ? 'auto' : 'smooth' });
}

// Bolinhas dos carrosséis: a ativa estica. Largura animada de propósito (são
// três pontos de 6 px, custo nenhum) com a mesma curva das trocas.
function Bolinhas({ total, atual, ir, rotulo }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => ir(i)}
          aria-label={rotulo(i)}
          aria-current={i === atual}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
            i === atual ? 'w-7 bg-accent' : 'w-1.5 bg-white/35 hover:bg-white/60'
          }`}
          style={{ transitionTimingFunction: CURVA }}
        />
      ))}
    </div>
  );
}

// O navegador de celular finge um mouse depois do toque e nunca manda o
// mouseleave: sem esta checagem a pausa por hover grudava no primeiro toque.
const temMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Pausa de carrossel: mouse em cima (computador), dedo segurando (celular) ou
// foco do teclado dentro dele.
function usePausa() {
  const [parado, setParado] = useState(false);
  const handlers = {
    onMouseEnter: () => { if (temMouse()) setParado(true); },
    onMouseLeave: () => { if (temMouse()) setParado(false); },
    onFocus: () => setParado(true),
    onBlur: () => setParado(false),
  };
  return [parado, setParado, handlers];
}

function Seta({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-[3px] shrink-0 text-accent">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────────────────────
// Três perguntas, uma por vez; tocar na resposta já avança. O resultado mostra
// a semana de EXEMPLO (e diz que é exemplo), o plano com o preço e o campo de
// nome. O botão abre o WhatsApp dele com tudo escrito.
function Quiz({ ciclo }) {
  const [passo, setPasso] = useState(0);
  const [resp, setResp] = useState({});
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const total = QUIZ.length;
  const noResultado = passo >= total;
  const q = QUIZ[Math.min(passo, total - 1)];
  const textoDe = (k) => QUIZ.find((x) => x.k === k).ops.find((o) => o.v === resp[k])?.t;

  const escolher = (v) => {
    setResp((r) => ({ ...r, [q.k]: v }));
    setPasso((p) => p + 1);
  };

  const objetivo = {
    massa: 'ganhar massa', secar: 'perder gordura', correr: 'correr e pedalar melhor', voltar: 'voltar com segurança',
  }[resp.obj] || 'você';
  const dias = resp.dias || 4;
  const semana = SEMANA_EXEMPLO[resp.obj === 'correr' ? 'endurance' : 'musculacao'][dias];

  const comCiclo = ciclo && TEM_VAGA;
  const precoTexto = comCiclo ? `${brl(CONSULTORIA.ciclo12)} por 12 semanas` : `${brl(PRECO_MES)}/mês`;

  function enviar(e) {
    e.preventDefault();
    if (!nome.trim()) return setErro('Escreve o seu nome pra eu saber com quem estou falando.');
    const msg = [
      `Olá Matheus! Sou ${nome.trim()} e montei meu plano na sua página.`,
      '',
      `Objetivo: ${textoDe('obj')}`,
      `Dias por semana: ${textoDe('dias')}`,
      `Onde treino: ${textoDe('onde')}`,
      `Plano: ${CONSULTORIA.nome}${comCiclo ? ', ciclo de 12 semanas' : ' mensal'} (${precoTexto})`,
    ].join('\n');
    window.location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="rounded-[22px] bg-surface p-4 ring-1 ring-white/[0.06] sm:p-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => { setPasso((p) => Math.max(0, p - 1)); setErro(''); }}
          aria-label="Voltar" disabled={passo === 0}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink transition hover:bg-white/[0.12] disabled:opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar"
          aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(passo, total)} aria-label="Progresso do quiz">
          <div className="h-full rounded-full bg-accent transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${(Math.min(passo, total) / total) * 100}%`, transitionTimingFunction: CURVA }} />
        </div>
        <p className="w-12 text-right text-sm tabular-nums text-ink-2">{noResultado ? 'pronto' : `${passo + 1}/${total}`}</p>
      </div>

      {/* `key` no passo: cada troca remonta o bloco e a entrada curta roda de
          novo. Com "reduzir movimento", aparece direto. */}
      <div key={passo} className="quiz-entra mt-6" aria-live="polite">
        {!noResultado ? (
          <>
            <p className={ROTULO}>{q.rotulo}</p>
            <h3 className="mt-1.5 text-[1.6rem] leading-tight">{q.titulo}</h3>
            <div className="mt-5 grid gap-2.5">
              {q.ops.map((o) => (
                <button key={String(o.v)} type="button" onClick={() => escolher(o.v)}
                  className={`flex min-h-[60px] items-center gap-3 rounded-[16px] bg-bg/60 px-4 py-3 text-left ring-1 transition hover:ring-accent/60 active:scale-[0.99] motion-reduce:active:scale-100 ${
                    resp[q.k] === o.v ? 'ring-2 ring-accent' : 'ring-white/[0.08]'
                  }`}>
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-base font-semibold text-ink">{o.t}</span>
                    {o.d && <span className="text-sm text-ink-2">{o.d}</span>}
                  </span>
                  <span aria-hidden className="text-xl leading-none text-ink-3">›</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={enviar} noValidate>
            <p className={ROTULO}>Seu ponto de partida</p>
            <h3 className="mt-1.5 text-[1.6rem] leading-tight">Plano pra {objetivo}, {dias} dias por semana</h3>

            <div className="mt-5 rounded-[18px] bg-bg/60 p-4 ring-1 ring-white/[0.08]">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-2">Exemplo de semana</p>
              <ul className="mt-2 divide-y divide-white/[0.06]">
                {semana.map(([dia, oq]) => (
                  <li key={dia} className="flex items-center gap-3 py-2.5">
                    <span className="w-9 text-sm font-bold text-accent">{dia}</span>
                    <span className="text-[15px] text-ink">{oq}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[13px] leading-snug text-ink-3">
                É só um exemplo. O treino de verdade é montado por mim depois da conversa.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-[16px] bg-accent/10 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-accent">{CONSULTORIA.nome}</p>
                <p className="text-sm leading-snug text-ink-2">
                  {comCiclo
                    ? `Ciclo de 12 semanas, pago de uma vez. Sai ${brl(CICLO_MES)}/mês.`
                    : TEM_VAGA
                      ? `Valor de lançamento, só pras primeiras ${VAGAS.total} vagas.`
                      : 'Mensal, sem fidelidade.'}
                </p>
              </div>
              <p className="whitespace-nowrap font-display text-lg font-semibold">
                {comCiclo ? brl(CONSULTORIA.ciclo12) : brl(PRECO_MES)}
                <span className="font-sans text-sm font-normal text-ink-3">{comCiclo ? '' : '/mês'}</span>
              </p>
            </div>

            <label htmlFor="quiz-nome" className="mt-6 mb-2 block text-[12px] font-bold uppercase tracking-[0.12em] text-ink-2">
              Seu nome
            </label>
            <input id="quiz-nome" value={nome} autoComplete="given-name" placeholder="Como você quer ser chamado"
              onChange={(e) => { setNome(e.target.value); if (erro) setErro(''); }}
              className="h-13 w-full rounded-[14px] bg-surface-2 px-4 text-base text-ink placeholder-white/30 outline-none ring-1 ring-white/[0.06] transition focus:ring-2 focus:ring-accent/70" />

            {erro && <p role="alert" className="mt-3 rounded-[14px] bg-danger/[0.14] px-4 py-3 text-sm text-danger">{erro}</p>}

            <button type="submit" className={`${BOTAO_LIMA} mt-4 h-14 w-full whitespace-nowrap px-4 text-[15px] sm:text-base`}>
              Mandar pro Matheus no WhatsApp
            </button>
            <p className="mt-3 text-center text-[13px] text-ink-3">
              Suas respostas vão junto na mensagem. Nada é cobrado agora.
            </p>
          </form>
        )}
      </div>

      <style jsx>{`
        .quiz-entra { animation: entra 360ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes entra {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .quiz-entra { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function Treine() {
  // Mensal ou ciclo de 12 semanas: escolhido no cartão do plano, vai junto no
  // resultado do quiz e na mensagem.
  const [ciclo, setCiclo] = useState(false);

  // ── Fotos do topo ──────────────────────────────────────────────────────────
  // 3 s por foto, a pedido dele: quem chega precisa ver que existem várias
  // ANTES de decidir rolar.
  const [foto, setFoto] = useState(0);
  const [refTopo, topoNaTela] = useNaTela();
  useEffect(() => {
    if (!topoNaTela || prefereMenosMovimento()) return;
    const t = setTimeout(() => setFoto((i) => (i + 1) % FOTOS_TOPO.length), 3000);
    return () => clearTimeout(t);
  }, [foto, topoNaTela]);
  const trocarFoto = (passo) => setFoto((i) => (i + passo + FOTOS_TOPO.length) % FOTOS_TOPO.length);
  const arrastoFoto = useArrastar(() => trocarFoto(-1), () => trocarFoto(1));

  // ── Telas do app ───────────────────────────────────────────────────────────
  const [tela, setTela] = useState(0);
  const [refTelas, telasNaTela] = useNaTela();
  const [telaParada, setTelaParada, pausaTela] = usePausa();
  useEffect(() => {
    if (TELAS_APP.length < 2 || telaParada || !telasNaTela || prefereMenosMovimento()) return;
    const t = setTimeout(() => setTela((i) => (i + 1) % TELAS_APP.length), 5000);
    return () => clearTimeout(t);
  }, [tela, telaParada, telasNaTela]);
  const passoTela = (p) => setTela((i) => (i + p + TELAS_APP.length) % TELAS_APP.length);
  const arrastoTela = useArrastar(() => passoTela(-1), () => passoTela(1));

  // ── Depoimentos ────────────────────────────────────────────────────────────
  // 3 por página no computador, 2 no tablet, 1 no celular. Precisa ser estado
  // porque o NÚMERO DE BOLINHAS depende disso; a largura do cartão vem do CSS.
  const [dep, setDep] = useState(0);
  const [porPagina, setPorPagina] = useState(3);
  const [refDep, depNaTela] = useNaTela();
  const [depParado, setDepParado, pausaDep] = usePausa();
  useEffect(() => {
    const medir = () => {
      const l = window.innerWidth;
      setPorPagina(l >= 1024 ? 3 : l >= 640 ? 2 : 1);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);
  const paginasDep = Math.ceil(OUTROS_DEP.length / porPagina);
  useEffect(() => { setDep((i) => Math.min(i, Math.max(0, paginasDep - 1))); }, [paginasDep]);
  useEffect(() => {
    if (paginasDep < 2 || depParado || !depNaTela || prefereMenosMovimento()) return;
    const t = setTimeout(() => setDep((i) => (i + 1) % paginasDep), 7000);
    return () => clearTimeout(t);
  }, [dep, paginasDep, depParado, depNaTela]);
  const passoDep = (p) => setDep((i) => (i + p + paginasDep) % paginasDep);
  const arrastoDep = useArrastar(() => passoDep(-1), () => passoDep(1));

  // Fila das transformações: dedo segurando pausa, soltar volta.
  const [filaParada, setFilaParada] = useState(false);

  // ── Barra fixa (só celular) ────────────────────────────────────────────────
  // Aparece depois da dobra e some quando o quiz entra em cena, pra não tampar
  // o campo de nome nem o botão do WhatsApp.
  const [barra, setBarra] = useState(false);
  useEffect(() => {
    const alvo = document.getElementById('comecar');
    let noQuiz = false;
    const atualizar = () => setBarra(window.scrollY > window.innerHeight * 0.9 && !noQuiz);
    const obs = alvo
      ? new IntersectionObserver(([e]) => { noQuiz = e.isIntersecting; atualizar(); }, { rootMargin: '0px 0px -35% 0px' })
      : null;
    if (obs) obs.observe(alvo);
    window.addEventListener('scroll', atualizar, { passive: true });
    atualizar();
    return () => { if (obs) obs.disconnect(); window.removeEventListener('scroll', atualizar); };
  }, []);

  const transicaoSlide = { transitionTimingFunction: CURVA };
  const anos = NUMEROS.find((x) => x.oq.includes('profissão'));

  return (
    <main className="pb-24 lg:pb-0">

      {/* ── ABERTURA ─────────────────────────────────────────────────────────
          Academia, trilha e corrida: a página promete corrida e ciclismo junto
          da musculação, e essa é a promessa mais fácil de duvidar. As fotos
          respondem sem texto. No celular a foto ocupa a tela e o título fica
          por cima, no pé dela (grade com as duas coisas na mesma célula); no
          computador, lado a lado. */}
      <section ref={refTopo} className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(80% 60% at 100% 0%, rgba(198,244,50,0.10), transparent 60%)' }} />
        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-12 lg:px-6 lg:py-20">

          {/* Troca em CAMADAS: a nova sobe por cima da atual, que só some
              depois (delay-700). Esmaecendo as duas juntas, no meio da troca
              cada uma ficava a meio caminho e o fundo escuro aparecia através
              delas -- uma piscada a cada 3 s. A nova também assenta de 105%
              pra 100%, devagar: dá vida à foto sem virar efeito. */}
          <div className="relative isolate col-start-1 row-start-1 h-[min(680px,80svh)] min-h-[560px] w-full touch-pan-y overflow-hidden bg-surface lg:col-start-2 lg:row-span-2 lg:aspect-[3/4] lg:h-auto lg:min-h-0 lg:rounded-[22px]"
            {...arrastoFoto}>
            {FOTOS_TOPO.map((f, i) => {
              const ativa = i === foto;
              return (
                <div
                  key={f.src}
                  aria-hidden={!ativa}
                  className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
                    ativa ? 'z-10 opacity-100' : 'z-0 opacity-0 delay-700'
                  }`}
                  style={transicaoSlide}
                >
                  <Image
                    src={f.src} alt={ativa ? f.alt : ''}
                    fill priority={i === 0} sizes="(min-width: 1024px) 45vw, 100vw"
                    className={`object-cover [object-position:var(--pos)] lg:[object-position:var(--pos-lg)] transition-transform duration-[4000ms] ease-out motion-reduce:transition-none ${
                      ativa ? 'scale-100' : 'scale-105'
                    }`}
                    style={{ '--pos': f.pos, '--pos-lg': f.posLg }}
                  />
                </div>
              );
            })}
            {/* Escurece o pé da foto no celular, onde o título fica por cima. */}
            <div aria-hidden className="absolute inset-0 z-20 lg:hidden"
              style={{ background: 'linear-gradient(180deg, rgba(10,11,13,0) 28%, rgba(10,11,13,0.82) 60%, #0A0B0D 100%)' }} />
            <div className="absolute right-4 top-4 z-30 rounded-full bg-black/45 px-3 py-2 backdrop-blur-md lg:bottom-4 lg:top-auto">
              <Bolinhas total={FOTOS_TOPO.length} atual={foto} ir={setFoto} rotulo={(i) => FOTOS_TOPO[i].alt} />
            </div>
          </div>

          <div className="relative z-10 col-start-1 row-start-1 self-end px-5 pb-6 lg:px-0 lg:pb-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/20 backdrop-blur-sm">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Consultoria online · {CREF}
            </p>

            {/* Concede o que é commodity (montar treino, inclusive de graça na
                internet) pra reivindicar o que não é: acompanhar. */}
            <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] xl:text-[4rem]">
              Treino, qualquer um monta.{' '}
              <span className="text-accent">Acompanhar é outra coisa.</span>
            </h1>

            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#C9CDD3] lg:text-lg">
              Musculação, corrida e ciclismo num plano só. Eu vejo cada carga que você registra e mexo no que travou.
            </p>
          </div>

          <div className="col-start-1 row-start-2 self-start px-5 pb-12 lg:px-0 lg:pb-0 lg:pt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#comecar" className={`${BOTAO_LIMA} h-14 whitespace-nowrap px-7 text-base shadow-lg shadow-black/30`}>
                Montar meu plano em 1 minuto <Seta />
              </a>
              <a href={LINK_WHATS_DIRETO} className={`${BOTAO_CINZA} h-12 whitespace-nowrap px-6 text-[15px] sm:h-14`}>
                Prefiro falar no WhatsApp
              </a>
            </div>

            {/* Os números são os confirmados por ele (dados.js); o "24 h" é a
                promessa de resposta, a mesma do combinado. */}
            <dl className="mt-5 grid grid-cols-3 gap-2 sm:max-w-md">
              {[...NUMEROS, { n: '24 h', oq: 'pra responder' }].map(({ n, oq }) => (
                <div key={oq} className="rounded-[14px] bg-surface px-3 py-3">
                  <dt className="sr-only">{oq}</dt>
                  <dd className="font-display text-xl font-semibold">{n}</dd>
                  <dd className="text-[12px] leading-tight text-ink-2">{oq}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 sm:px-6">

        {/* ── COMO EU ACOMPANHO ────────────────────────────────────────────────
            O rascunho chamava isto de "o que ninguém mais faz". Saiu: é
            superlativo que ninguém consegue provar. O cartão é ILUSTRATIVO --
            exercício, cargas e recado inventados -- e a legenda diz isso com
            todas as letras. O que ele mostra é real (MINHA_PARTE: mexer no
            treino a partir dos seus números). */}
        <section className="grid items-center gap-6 border-t border-white/[0.06] pt-12 sm:grid-cols-2 sm:gap-10 lg:pt-16">
          <div>
            <p className={ROTULO}>Como eu acompanho</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold leading-tight sm:text-4xl">
              Você treina. Eu leio os seus números e ajusto.
            </h2>
          </div>
          <figure>
            <div className="rounded-[20px] bg-surface p-4 ring-1 ring-white/[0.07]">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold">Supino reto com barra</p>
                <p className="text-xs text-ink-2">terça</p>
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {['60 kg × 10', '60 kg × 10', '60 kg × 9'].map((s, i) => (
                  <p key={i} className="rounded-[10px] bg-surface-2 py-2 text-center text-[13px] tabular-nums">{s}</p>
                ))}
              </div>
              <div className="mt-2.5 flex items-start gap-2.5 rounded-[14px] bg-accent/10 p-3">
                <img src="/matheus.jpg" alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" style={{ objectPosition: 'center 12%' }} />
                <div>
                  <p className="text-[13px] font-bold text-accent">Matheus ajustou</p>
                  <p className="text-sm leading-snug">Fechou as 3 séries perto do alvo. Na próxima: 62,5 kg, mesmas repetições.</p>
                </div>
              </div>
            </div>
            <figcaption className="mt-2.5 text-[13px] text-ink-3">
              Exemplo ilustrativo: exercício, cargas e recado inventados pra mostrar como é o ajuste.
            </figcaption>
          </figure>
        </section>

        {/* ── PROVA ────────────────────────────────────────────────────────────
            Logo depois do topo: prova prende mais que promessa. Em destaque, a
            transformação com o depoimento da mesma aluna; as outras numa fila
            contínua (lista duplicada, o trilho anda metade + um vão, a emenda
            some). As bordas da fila esmaecem pra o cartão que entra e sai não
            parecer cortado. Pausa com o mouse em cima ou o dedo segurando. */}
        {DESTAQUE && (
          <section className="pt-16 lg:pt-20">
            <h2 className={TITULO_SECAO}>Corpos transformados</h2>

            <figure className="mt-8 grid items-center gap-5 sm:grid-cols-2 sm:gap-8">
              <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-[20px]">
                {[['Antes', DESTAQUE.antes], ['Depois', DESTAQUE.depois]].map(([rotulo, src]) => (
                  <div key={rotulo} className="relative aspect-[3/4] overflow-hidden">
                    <img src={src} alt={`${DESTAQUE.quem.split(',')[0]}, ${rotulo.toLowerCase()}`} loading="lazy" className="h-full w-full object-cover" />
                    <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                      rotulo === 'Depois' ? 'bg-accent text-on-accent' : 'bg-black/70 text-white/85'
                    }`}>
                      {rotulo}
                    </span>
                  </div>
                ))}
              </div>
              <figcaption>
                {DESTAQUE_FRASE && (
                  <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">&ldquo;{DESTAQUE_FRASE.frase}&rdquo;</p>
                )}
                <p className="mt-3 text-[13px] text-ink-2">
                  {DESTAQUE.quem}{DESTAQUE_FRASE?.detalhe ? ` · ${DESTAQUE_FRASE.detalhe}` : ''}. Resultados variam de pessoa pra pessoa.
                </p>
              </figcaption>
            </figure>

            {OUTRAS_TRANSF.length > 0 && (
              <div
                className={`fila -mx-5 mt-10 overflow-hidden sm:-mx-6 ${filaParada ? 'fila-parada' : ''}`}
                onTouchStart={() => setFilaParada(true)}
                onTouchEnd={() => setFilaParada(false)}
                onTouchCancel={() => setFilaParada(false)}
              >
                <div className="fila-trilho flex w-max gap-5">
                  {[...OUTRAS_TRANSF, ...OUTRAS_TRANSF].map((t, n) => (
                    <figure key={n} aria-hidden={n >= OUTRAS_TRANSF.length} className="w-[240px] shrink-0 sm:w-[280px]">
                      <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-[18px]">
                        {[['Antes', t.antes], ['Depois', t.depois]].map(([rotulo, src]) => (
                          <div key={rotulo} className="relative aspect-[9/16] overflow-hidden">
                            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                            <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                              rotulo === 'Depois' ? 'bg-accent text-on-accent' : 'bg-black/70 text-white/85'
                            }`}>
                              {rotulo}
                            </span>
                          </div>
                        ))}
                      </div>
                      <figcaption className="mt-3 font-semibold">{t.quem}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <style jsx>{`
              .fila {
                -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
                mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
              }
              .fila-trilho { animation: corre 30s linear infinite; }
              /* Computador: mouse em cima. Só com ponteiro de verdade -- no
                 celular o :hover gruda no toque e a fila nunca mais voltava. */
              @media (hover: hover) and (pointer: fine) {
                .fila:hover .fila-trilho { animation-play-state: paused; }
              }
              .fila-parada .fila-trilho { animation-play-state: paused; }
              @media (prefers-reduced-motion: reduce) {
                .fila { overflow-x: auto; }
                .fila-trilho { animation: none; }
              }
              @keyframes corre {
                from { transform: translateX(calc(-50% - 0.625rem)); }
                to   { transform: translateX(0); }
              }
            `}</style>
          </section>
        )}

        {/* ── DEPOIMENTOS ──────────────────────────────────────────────────────
            Uma página por vez, com bolinhas. Pausa enquanto a pessoa lê (mouse,
            dedo ou foco): antes ele trocava no meio da frase. Espaçamento por
            DENTRO do cartão (px-2.5), não gap: com gap a conta do deslize erra
            alguns pixels por página. */}
        {OUTROS_DEP.length > 0 && (
          <section ref={refDep} className="pt-16 lg:pt-20">
            <h2 className={TITULO_SECAO}>Quem já treina comigo</h2>

            <div
              className="-mx-2.5 mt-8 touch-pan-y overflow-hidden"
              {...pausaDep}
              onTouchStart={(e) => { setDepParado(true); arrastoDep.onTouchStart(e); }}
              onTouchEnd={(e) => { setDepParado(false); arrastoDep.onTouchEnd(e); }}
              onTouchCancel={() => setDepParado(false)}
            >
              <div
                className="flex transition-transform duration-[600ms] motion-reduce:transition-none"
                style={{ ...transicaoSlide, transform: `translateX(-${dep * 100}%)` }}
              >
                {OUTROS_DEP.map((d, i) => (
                  <div key={i} className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3"
                    aria-hidden={Math.floor(i / porPagina) !== dep}>
                    <figure className="flex h-full flex-col rounded-[22px] bg-surface p-6">
                      <span aria-hidden className="font-display text-3xl leading-none text-accent">&ldquo;</span>
                      <p className="mt-2 text-lg font-semibold leading-snug text-ink">{d.frase}</p>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">{d.resto}</p>
                      <figcaption className="mt-5 border-t border-white/[0.06] pt-4">
                        <p className="text-sm font-semibold leading-tight">{d.quem}</p>
                        {d.detalhe && <p className="text-xs text-ink-3">{d.detalhe}</p>}
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {paginasDep > 1 && (
              <div className="mt-6 flex justify-center">
                <Bolinhas total={paginasDep} atual={dep} ir={setDep} rotulo={(i) => `Página ${i + 1} de ${paginasDep}`} />
              </div>
            )}
          </section>
        )}

        {/* ── O APP POR DENTRO ─────────────────────────────────────────────────
            Uma tela por vez, grande o bastante pra LER. Desliza com o dedo,
            pausa com o mouse em cima ou o dedo segurando, só gira na tela. */}
        {TELAS_APP.length > 0 && (
          <section ref={refTelas} className="pt-16 lg:pt-20">
            <p className={ROTULO}>No app</p>
            <h2 className={`${TITULO_SECAO} mt-2`}>Abriu, treinou.</h2>

            <div
              className="mt-8 touch-pan-y overflow-hidden"
              {...pausaTela}
              onTouchStart={(e) => { setTelaParada(true); arrastoTela.onTouchStart(e); }}
              onTouchEnd={(e) => { setTelaParada(false); arrastoTela.onTouchEnd(e); }}
              onTouchCancel={() => setTelaParada(false)}
            >
              <div
                className="flex transition-transform duration-[600ms] motion-reduce:transition-none"
                style={{ ...transicaoSlide, transform: `translateX(-${tela * 100}%)` }}
              >
                {TELAS_APP.map((t, i) => (
                  <div key={t.src} aria-hidden={i !== tela}
                    className="grid w-full shrink-0 items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <div className="mx-auto w-[220px] overflow-hidden rounded-[2rem] border-[6px] border-surface-2 bg-bg shadow-2xl shadow-black/60 sm:mx-0 sm:w-[240px]">
                      {/* Moldura na proporção real das capturas (480x840):
                          com proporção de aparelho, o cover cortava as laterais. */}
                      <img src={t.src} alt={t.titulo} loading={i === 0 ? undefined : 'lazy'}
                        className="aspect-[480/840] w-full rounded-[1.6rem] object-cover" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl leading-snug">{t.titulo}</h3>
                      <p className="mt-2 text-lg leading-relaxed text-ink-2">{t.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {TELAS_APP.length > 1 && (
              <div className="mt-6 flex justify-center sm:justify-start">
                <Bolinhas total={TELAS_APP.length} atual={tela} ir={setTela} rotulo={(i) => TELAS_APP[i].titulo} />
              </div>
            )}
          </section>
        )}

        {/* ── QUIZ ─────────────────────────────────────────────────────────────
            Depois da prova e antes do preço: quem chegou aqui já viu que
            funciona, e o resultado do quiz já traz o plano e o valor. */}
        <section id="comecar" className="scroll-mt-6 pt-16 lg:pt-20">
          <p className={ROTULO}>Começar</p>
          <h2 className={`${TITULO_SECAO} mt-2`}>Seu plano em 1 minuto</h2>
          <p className="mt-3 text-lg text-ink-2">3 perguntas. As respostas vão direto pro meu WhatsApp.</p>
          <div className="mt-7">
            <Quiz ciclo={ciclo} />
          </div>
          <p className="mt-4 text-center text-sm text-ink-3">
            <a href={LINK_WHATS_DIRETO}
              className="font-semibold text-ink underline decoration-accent/60 underline-offset-4 transition hover:text-accent">
              Prefiro falar no WhatsApp
            </a>
          </p>
        </section>

        {/* ── O PLANO ──────────────────────────────────────────────────────────
            Um cartão só. O contador de vagas sai de dados.js (número REAL,
            atualizado à mão): esgotou, o preço vira o cheio e o contador some.
            O ciclo de 12 semanas só aparece enquanto existe o valor de
            lançamento -- é sobre ele que o desconto foi calculado. */}
        <section id="plano" className="scroll-mt-6 pt-16 lg:pt-20">
          <p className={ROTULO}>Plano</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold leading-tight sm:text-4xl">
            Você não está assinando um app. Está contratando alguém pra olhar o seu treino.
          </h2>

          <div className="mt-8 max-w-xl rounded-[22px] p-5 ring-2 ring-accent sm:p-7"
            style={{ background: 'radial-gradient(100% 60% at 100% 0%, rgba(198,244,50,0.12), transparent 60%), #141619' }}>

            {TEM_VAGA && (
              <div className="mb-5 flex gap-1 rounded-[14px] bg-bg/70 p-1" role="group" aria-label="Forma de pagamento">
                {[[false, 'Mensal'], [true, '12 semanas']].map(([v, rot]) => (
                  <button key={rot} type="button" onClick={() => setCiclo(v)} aria-pressed={ciclo === v} aria-label={v ? 'Ciclo de 12 semanas' : 'Mensal'}
                    className={`h-11 flex-1 rounded-[11px] px-2 text-sm font-bold transition ${
                      ciclo === v ? 'bg-surface-2 text-ink ring-1 ring-white/10' : 'text-ink-2 hover:text-ink'
                    }`}>
                    {v && <span className="hidden sm:inline">Ciclo de </span>}{rot}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl">{CONSULTORIA.nome}</h3>
              {TEM_VAGA && (
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-on-accent">
                  Valor de lançamento
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="whitespace-nowrap font-display text-[2.4rem] font-semibold leading-none tracking-tight">
                {ciclo && TEM_VAGA ? brl(CONSULTORIA.ciclo12) : brl(PRECO_MES)}
              </p>
              <p className="text-base text-ink-2">{ciclo && TEM_VAGA ? '/12 semanas' : '/mês'}</p>
              {TEM_VAGA && !ciclo && (
                <p className="text-base text-ink-3">
                  <span className="sr-only">Depois das vagas, </span>
                  <s>{brl(CONSULTORIA.depois)}</s>
                </p>
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-accent">
              {ciclo && TEM_VAGA
                ? `${brl(CICLO_MES)}/mês · economiza ${brl(CICLO_ECONOMIA)}`
                : 'Mensal, cancela quando quiser'}
            </p>

            {TEM_VAGA && (
              <div className="mt-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]" role="progressbar"
                  aria-valuemin={0} aria-valuemax={VAGAS.total} aria-valuenow={VAGAS.ocupadas}
                  aria-label="Vagas ocupadas no valor de lançamento">
                  <div className="h-full rounded-full bg-warn" style={{ width: `${(VAGAS.ocupadas / VAGAS.total) * 100}%` }} />
                </div>
                <p className="mt-2 text-sm font-bold text-warn">
                  Restam {RESTAM} de {VAGAS.total} vagas neste valor. Depois, {brl(CONSULTORIA.depois)}.
                </p>
              </div>
            )}

            <p className="mt-4 leading-relaxed text-ink-2">{CONSULTORIA.resumo}</p>

            <ul className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4">
              {CONSULTORIA.itens.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => rolarPara('comecar')}
              className={`${BOTAO_LIMA} mt-6 h-13 w-full px-6 text-base`}>
              Quero a {CONSULTORIA.nome}
            </button>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {SELOS_PLANO.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-2">
                <span aria-hidden className="text-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── GARANTIAS ────────────────────────────────────────────────────────
            Logo depois do preço, que é onde a dúvida aparece. */}
        <section className="pt-16 lg:pt-20">
          <p className={ROTULO}>Sem risco</p>
          <h2 className={`${TITULO_SECAO} mt-2`}>Três garantias, por escrito.</h2>
          <ul className="mt-7 grid gap-2.5">
            {GARANTIAS.map(({ marca, t, d }) => (
              <li key={marca} className="flex gap-4 rounded-[18px] bg-surface p-4 sm:p-5">
                <p className="w-[64px] shrink-0 font-display text-[1.35rem] font-semibold leading-tight text-accent">{marca}</p>
                <div>
                  <h3 className="text-base leading-snug">{t}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-2">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── O COMBINADO ──────────────────────────────────────────────────────
            A parte DELE primeiro: publicar as próprias obrigações antes das do
            aluno é o que separa quem está seguro do que entrega. */}
        <section className="pt-16 lg:pt-20">
          <h2 className={TITULO_SECAO}>O combinado</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {[
              { titulo: 'Minha parte', itens: MINHA_PARTE, minha: true },
              { titulo: 'Sua parte', itens: SUA_PARTE, minha: false },
            ].map(({ titulo, itens, minha }) => (
              <div key={titulo}
                className={`rounded-[22px] p-5 sm:p-6 ${minha ? 'ring-1 ring-accent/30' : 'bg-surface'}`}
                style={minha ? { background: 'radial-gradient(90% 60% at 100% 0%, rgba(198,244,50,0.08), transparent 60%), #141619' } : undefined}>
                <h3 className={`text-sm font-semibold uppercase tracking-[0.14em] ${minha ? 'text-accent' : 'text-ink-2'}`}>
                  {titulo}
                </h3>
                <ul className="mt-4 space-y-3">
                  {itens.map((item) => (
                    <li key={item} className="flex gap-3 leading-snug text-ink">
                      <span aria-hidden className={minha ? 'text-accent' : 'text-ink-3'}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Como tirar as fotos: atrás de um clique, dentro de quem
                    vai precisar mandar. */}
                {!minha && (
                  <details className="duvida group mt-5 rounded-[18px] bg-surface-2 px-5 py-4">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-ink-2 transition marker:hidden hover:text-ink">
                      <span aria-hidden className="mr-2 inline-block text-accent transition-transform duration-300 group-open:rotate-90 motion-reduce:transition-none">›</span>
                      Como tirar as fotos
                    </summary>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {PROTOCOLO_FOTOS.modelo.map((m) => (
                        <figure key={m.rotulo}>
                          <img src={m.src} alt={`Exemplo de foto ${m.rotulo.toLowerCase()}`} loading="lazy" className="w-full rounded-[10px]" />
                          <figcaption className="mt-1.5 text-xs font-semibold text-ink">{m.rotulo}</figcaption>
                        </figure>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{PROTOCOLO_FOTOS.roupa}</p>
                  </details>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PRA QUEM É, PRA QUEM NÃO É ─────────────────────────────────────── */}
        <section className="pt-16 lg:pt-20">
          <p className={ROTULO}>Seja sincero</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { titulo: 'É pra você se…', itens: PARA_VOCE, sim: true },
              { titulo: 'Não é pra você se…', itens: NAO_PARA_VOCE, sim: false },
            ].map(({ titulo, itens, sim }) => (
              <div key={titulo} className="rounded-[22px] bg-surface p-5 sm:p-6">
                <h2 className="text-xl">{titulo}</h2>
                <ul className="mt-3 space-y-2.5">
                  {itens.map((linha) => (
                    <li key={linha} className="flex gap-3 leading-snug text-[#C9CDD3]">
                      <span aria-hidden className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${sim ? 'bg-accent' : 'bg-danger'}`} />
                      {linha}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUEM É ───────────────────────────────────────────────────────────
            Curto de propósito (a seção longa saiu a pedido dele, 16/10). A
            foto de prova com número de peito diz mais que currículo. */}
        <section className="mt-16 flex items-center gap-4 border-t border-white/[0.06] pt-10 lg:mt-20">
          <img src="/matheus-corrida.jpg" alt="Matheus Barbosa correndo uma prova"
            className="h-[120px] w-24 shrink-0 rounded-[18px] object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold">Matheus Barbosa</p>
            <p className="text-[13px] text-ink-2">Personal trainer · {CREF}</p>
            <p className="mt-1.5 text-[15px] leading-snug text-[#C9CDD3]">
              {anos ? `${anos.n} ${anos.oq}. ` : ''}Corro e pedalo o que eu passo pra você.
            </p>
          </div>
        </section>

        {/* ── DÚVIDAS ──────────────────────────────────────────────────────── */}
        <section className="pt-16 lg:pt-20">
          <h2 className={TITULO_SECAO}>Dúvidas</h2>
          <div className="mt-7 divide-y divide-white/[0.06] rounded-[22px] bg-surface px-5 sm:px-6">
            {FAQ.map(({ q, r }) => (
              <details key={q} className="duvida group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold marker:hidden">
                  {q}
                  <span aria-hidden className="shrink-0 text-xl text-accent transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="pt-2 leading-relaxed text-ink-2">{r}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="pt-12">
          <a href="#comecar" className={`${BOTAO_LIMA} h-14 w-full px-7 text-base sm:w-auto`}>
            Montar meu plano em 1 minuto <Seta />
          </a>
        </div>

        {/* Rodapé: quem vende, com CPF e cidade. O Decreto 7.962/2013 exige a
            identificação do fornecedor na página de venda. */}
        <footer className="mt-14 border-t border-white/[0.06] py-8 text-[13px] leading-relaxed text-ink-3">
          <p className="font-medium text-ink-2">
            {['Matheus Barbosa', `CPF ${CPF}`, CIDADE, CREF].map((t, i) => (
              <span key={t} className="whitespace-nowrap">{i > 0 && '· '}{t}</span>
            )).reduce((acc, el) => [...acc, ' ', el], []).slice(1)}
          </p>
          <p className="mt-1">
            Contato: <a href={LINK_WHATS_DIRETO} className="text-ink-2 underline-offset-4 hover:underline">{TELEFONE}</a>
            {' '}· O treino é entregue pelo aplicativo Personal Pro, para Android e iPhone.
          </p>
          <p className="mt-3">
            <a href="/privacidade/" className="text-ink-2 underline decoration-white/20 underline-offset-4 transition hover:text-ink">
              Privacidade
            </a>
          </p>
        </footer>
      </div>

      {/* Barra fixa no celular. Sobe com a curva de folha do iOS: chega
          decidida e assenta, sem quicar. */}
      <div
        aria-hidden={!barra}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-bg/90 px-4 py-3 backdrop-blur-xl transition-transform duration-500 motion-reduce:transition-none lg:hidden ${
          barra ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <a href="#comecar" tabIndex={barra ? 0 : -1} className={`${BOTAO_LIMA} h-12 w-full px-6 text-base`}>
          Montar meu plano em 1 minuto
        </a>
      </div>
    </main>
  );
}
