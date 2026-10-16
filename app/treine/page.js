'use client';

// Página de consultoria online do Matheus, destino do link da bio do Instagram
// (@matheusseupersonal). O formulário leva ao WhatsApp dele com tudo
// preenchido; a cobrança é feita depois, na conversa. A venda é na WEB de
// propósito: cobrança dentro do app pode ser enquadrada pela Apple como compra
// digital.
//
// 16/10/2026, terceira forma desta página:
// - VISUAL do app (Grafite & Lima), a pedido dele.
// - TEXTO curto: "muito texto o aluno desiste. precisa ser direto." A prova
//   (transformações) vem logo depois do topo; cada item tem uma linha.
// - MOVIMENTO revisado (auditoria de motion): fotos do topo trocam sem o
//   escurecido do meio, carrosséis aceitam o dedo e só giram na tela,
//   depoimento não some no meio da leitura, "reduzir movimento" respeitado
//   também nos cliques.
// As versões anteriores, com o raciocínio de cada seção, estão no git.
//
// Continua de propósito: a foto dele abre a página (é o que nenhum template
// tem), seções com pesos diferentes, nada de grade de cards com ícone.

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  WHATSAPP, PLANOS, VALE_PARA_TODOS, DEPOIMENTOS, TRANSFORMACOES, NUMEROS,
  PARA_VOCE, RECEBE, PASSOS, FAQ, GARANTIA, FOTOS_TOPO, TELAS_APP, CREF,
  MINHA_PARTE, SUA_PARTE, PROTOCOLO_FOTOS,
} from './dados';
import { CURVA, prefereMenosMovimento, useNaTela, useArrastar } from './movimento';

// CPF não é pedido aqui: no primeiro contato ele não serve pra nada e afasta
// quem chegou do Instagram há trinta segundos. Volta na hora de cobrar.

const TITULO_SECAO = 'text-3xl font-semibold tracking-tight sm:text-4xl';

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
            i === atual ? 'w-7 bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/50'
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

export default function Treine() {
  const [form, setForm] = useState({
    nome: '', nascimento: '', whatsapp: '', email: '', modalidade: 'musculacao', plano: '',
  });
  const [erro, setErro] = useState('');

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
  const paginasDep = Math.ceil(DEPOIMENTOS.length / porPagina);
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

  // ── Barra fixa "Quero começar" (só celular) ────────────────────────────────
  // Aparece depois da dobra e some quando o formulário entra em cena, pra não
  // tampar o campo que a pessoa está preenchendo.
  const [barra, setBarra] = useState(false);
  useEffect(() => {
    const alvo = document.getElementById('comecar');
    let noFormulario = false;
    const atualizar = () => setBarra(window.scrollY > window.innerHeight * 0.9 && !noFormulario);
    const obs = alvo
      ? new IntersectionObserver(([e]) => { noFormulario = e.isIntersecting; atualizar(); }, { rootMargin: '0px 0px -35% 0px' })
      : null;
    if (obs) obs.observe(alvo);
    window.addEventListener('scroll', atualizar, { passive: true });
    atualizar();
    return () => { if (obs) obs.disconnect(); window.removeEventListener('scroll', atualizar); };
  }, []);

  const campo = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (erro) setErro('');
  };

  // O botão do plano GRAVA a escolha, que viaja na mensagem. Sem isso o
  // Matheus recebia o contato sem saber o plano.
  function escolherPlano(nome) {
    setForm((f) => ({ ...f, plano: nome }));
    document.getElementById('comecar')?.scrollIntoView({ behavior: prefereMenosMovimento() ? 'auto' : 'smooth' });
  }

  function enviar(e) {
    e.preventDefault();
    // Nada opcional: ele prefere um contato completo a um pela metade.
    const faltando = [];
    if (!form.nome.trim()) faltando.push('nome');
    if (!form.nascimento) faltando.push('data de nascimento');
    if (!form.whatsapp.trim()) faltando.push('WhatsApp');
    if (!form.email.trim()) faltando.push('e-mail');
    if (!form.plano) faltando.push('plano');
    if (faltando.length) return setErro(`Falta preencher: ${faltando.join(', ')}.`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return setErro('Confira o e-mail — parece que faltou alguma coisa.');
    }

    // <input type="date"> guarda AAAA-MM-DD; no WhatsApp vai DD/MM/AAAA.
    const [ano, mes, diaN] = form.nascimento.split('-');
    const modalidade = {
      musculacao: 'Só musculação',
      corrida: 'Musculação + corrida',
      ciclismo: 'Musculação + ciclismo',
    }[form.modalidade];

    const msg = [
      'Olá Matheus! Quero começar a consultoria online.',
      '',
      `Nome: ${form.nome.trim()}`,
      `Nascimento: ${diaN}/${mes}/${ano}`,
      `WhatsApp: ${form.whatsapp.trim()}`,
      `E-mail: ${form.email.trim()}`,
      `Quero: ${modalidade}`,
      `Plano: ${form.plano}`,
    ].join('\n');

    window.location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  const input =
    'h-13 w-full rounded-[14px] bg-surface-2 px-4 text-base text-ink ring-1 ring-white/[0.06] ' +
    'placeholder-white/25 outline-none transition focus:ring-2 focus:ring-accent/70';
  const label = 'mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3';
  const botaoLima =
    'inline-flex items-center justify-center gap-2 rounded-[14px] bg-accent font-bold text-on-accent ' +
    'transition hover:bg-accent-hover active:scale-[0.98] motion-reduce:active:scale-100';
  const transicaoSlide = { transitionTimingFunction: CURVA };

  return (
    <main className="pb-24">

      {/* ── ABERTURA ─────────────────────────────────────────────────────────
          Academia, trilha e corrida: a página promete corrida e ciclismo junto
          da musculação, e essa é a promessa mais fácil de duvidar. As fotos
          respondem sem texto. No celular empilha (foto inteira, texto embaixo);
          no computador, lado a lado. */}
      <section ref={refTopo} className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(80% 60% at 100% 0%, rgba(198,244,50,0.10), transparent 60%)' }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">

          {/* Troca em CAMADAS: a nova sobe por cima da atual, que só some
              depois (delay-700). Esmaecendo as duas juntas, no meio da troca
              cada uma ficava a meio caminho e o fundo escuro aparecia através
              delas -- uma piscada a cada 3 s. A nova também assenta de 105%
              pra 100%, devagar: dá vida à foto sem virar efeito. */}
          <div className="relative aspect-[3/4] w-full touch-pan-y overflow-hidden rounded-[22px] bg-surface lg:order-2" {...arrastoFoto}>
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
                    className={`object-cover transition-transform duration-[4000ms] ease-out motion-reduce:transition-none ${
                      ativa ? 'scale-100' : 'scale-105'
                    }`}
                    style={{ objectPosition: f.posLg }}
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-accent/20">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Consultoria online
            </p>

            {/* Concede o que é commodity (montar treino, inclusive de graça na
                internet) pra reivindicar o que não é: acompanhar. */}
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[3.4rem] xl:text-[4rem]">
              Treino,
              <br />
              qualquer um monta.
              <br />
              <span className="text-accent">Acompanhar é outra coisa.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
              Musculação, corrida e ciclismo, com alguém do outro lado olhando o que você faz.
            </p>

            <a href="#comecar" className={`${botaoLima} mt-8 h-14 w-fit px-8 text-base shadow-lg shadow-black/30`}>
              Quero começar <span aria-hidden>→</span>
            </a>

            <p className="mt-5 text-sm text-ink-3">
              {NUMEROS.map(({ n, oq }) => `${n} ${oq}`).join(' · ')} · Sem fidelidade
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[['‹', 'Foto anterior', -1], ['›', 'Próxima foto', 1]].map(([s, rot, p]) => (
                <button key={rot} type="button" onClick={() => trocarFoto(p)} aria-label={rot}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 pb-0.5 text-xl leading-none text-ink-2 ring-1 ring-white/[0.06] transition hover:text-ink hover:ring-white/20 active:scale-95">
                  {s}
                </button>
              ))}
              <div className="ml-2">
                <Bolinhas total={FOTOS_TOPO.length} atual={foto} ir={setFoto} rotulo={(i) => FOTOS_TOPO[i].alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">

        {/* ── TRANSFORMAÇÕES ─────────────────────────────────────────────────
            Logo depois do topo: é a prova, e prova prende mais que promessa.
            Fila contínua (lista duplicada, o trilho anda metade + um vão, a
            emenda some). As bordas esmaecem pra o cartão que entra e sai não
            parecer cortado. Pausa com o mouse em cima ou o dedo segurando. */}
        {TRANSFORMACOES.length > 0 && (
          <section className="pt-16">
            <h2 className={TITULO_SECAO}>Corpos transformados</h2>

            <div
              className={`fila -mx-6 mt-8 overflow-hidden ${filaParada ? 'fila-parada' : ''}`}
              onTouchStart={() => setFilaParada(true)}
              onTouchEnd={() => setFilaParada(false)}
              onTouchCancel={() => setFilaParada(false)}
            >
              <div className="fila-trilho flex w-max gap-5">
                {[...TRANSFORMACOES, ...TRANSFORMACOES].map((t, n) => (
                  <figure key={n} aria-hidden={n >= TRANSFORMACOES.length} className="w-[260px] shrink-0 sm:w-[300px]">
                    <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-[18px]">
                      {[['Antes', t.antes], ['Depois', t.depois]].map(([rotulo, src]) => (
                        <div key={rotulo} className="relative aspect-[9/16] overflow-hidden">
                          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                          <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                            rotulo === 'Depois' ? 'bg-accent text-on-accent' : 'bg-black/70 text-white/80'
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

            <style jsx>{`
              .fila {
                -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
                mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
              }
              .fila-trilho { animation: corre 34s linear infinite; }
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

        {/* ── PRA QUEM É ───────────────────────────────────────────────────── */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>É pra você que…</h2>
          <ul className="mt-8 divide-y divide-white/[0.06] rounded-[22px] bg-surface px-6">
            {PARA_VOCE.map((linha) => (
              <li key={linha} className="flex gap-4 py-4 text-lg leading-snug text-ink">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {linha}
              </li>
            ))}
          </ul>
        </section>

        {/* ── O QUE RECEBE ─────────────────────────────────────────────────── */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>O que você recebe</h2>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {RECEBE.map(({ t, d }) => (
              <div key={t} className="border-l-2 border-accent/60 pl-4">
                <h3 className="text-lg leading-snug">{t}</h3>
                <p className="mt-1 leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── O APP POR DENTRO ─────────────────────────────────────────────────
            Uma tela por vez, grande o bastante pra LER. Desliza com o dedo,
            pausa com o mouse em cima ou o dedo segurando, só gira na tela. */}
        {TELAS_APP.length > 0 && (
          <section ref={refTelas} className="pt-20">
            <h2 className={TITULO_SECAO}>O app por dentro</h2>

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

        {/* ── DEPOIMENTOS ──────────────────────────────────────────────────────
            Uma página por vez, com bolinhas. Pausa enquanto a pessoa lê (mouse,
            dedo ou foco): antes ele trocava no meio da frase. Espaçamento por
            DENTRO do cartão (px-2.5), não gap: com gap a conta do deslize erra
            alguns pixels por página. */}
        {DEPOIMENTOS.length > 0 && (
          <section ref={refDep} className="pt-20">
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
                {DEPOIMENTOS.map((d, i) => (
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

        {/* ── COMO FUNCIONA ────────────────────────────────────────────────────
            Linha do tempo com o "quando" na frente: a pergunta de quem decide é
            quando começa a treinar. */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>Como funciona</h2>
          <ol className="mt-8">
            {PASSOS.map(({ quando, t, d }, i) => (
              <li key={t} className="relative flex gap-6 pb-7 last:pb-0">
                {i < PASSOS.length - 1 && (
                  <span aria-hidden className="absolute left-[5px] top-4 h-full w-px bg-white/10" />
                )}
                <span aria-hidden className="relative mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-accent ring-4 ring-accent/15" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{quando}</p>
                  <h3 className="mt-1 text-xl leading-snug">{t}</h3>
                  <p className="mt-1 leading-relaxed text-ink-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── O COMBINADO ──────────────────────────────────────────────────────
            A parte DELE primeiro. Vem antes do preço: quem descobre a exigência
            das fotos depois de pagar trava e não manda. */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>O combinado</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { titulo: 'Minha parte', itens: MINHA_PARTE, minha: true },
              { titulo: 'Sua parte', itens: SUA_PARTE, minha: false },
            ].map(({ titulo, itens, minha }) => (
              <div key={titulo}
                className={`rounded-[22px] p-6 ${minha ? 'ring-1 ring-accent/25' : 'bg-surface'}`}
                style={minha ? { background: 'radial-gradient(90% 60% at 100% 0%, rgba(198,244,50,0.08), transparent 60%), #141619' } : undefined}>
                <h3 className={`text-sm font-semibold uppercase tracking-[0.14em] ${minha ? 'text-accent' : 'text-ink-3'}`}>
                  {titulo}
                </h3>
                <ul className="mt-5 space-y-3">
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

        {/* ── PLANOS ───────────────────────────────────────────────────────────
            Escada por frequência de revisão. Cada plano diz "tudo do anterior,
            mais", pra a pessoa ver só o que muda. Mais largo que a coluna no
            computador: em 768 px a Sora quebrava o preço. */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>Planos</h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-2">
            Você não está assinando um app. Está contratando alguém pra olhar o seu treino.
          </p>

          <div className="mt-8 grid gap-5 lg:-mx-20 lg:grid-cols-3">
            {PLANOS.map(({ nome, preco, resumo, destaque, herda, itens }) => (
              <div key={nome}
                className={`flex flex-col rounded-[22px] p-6 ${destaque ? 'ring-2 ring-accent' : 'bg-surface'}`}
                style={destaque ? { background: 'radial-gradient(100% 60% at 100% 0%, rgba(198,244,50,0.12), transparent 60%), #141619' } : undefined}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl">{nome}</h3>
                  {destaque && (
                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-on-accent">
                      {destaque}
                    </span>
                  )}
                </div>

                <p className="mt-3 whitespace-nowrap font-display text-3xl font-semibold">
                  {preco}
                  <span className="font-sans text-base font-normal text-ink-3">/mês</span>
                </p>
                <p className="mt-2 leading-relaxed text-ink-2">{resumo}</p>

                {herda && (
                  <p className="mt-5 border-t border-white/[0.06] pt-4 text-sm font-semibold text-ink">
                    Tudo do {herda}, mais:
                  </p>
                )}
                <ul className={`flex-1 space-y-2 ${herda ? 'mt-3' : 'mt-5 border-t border-white/[0.06] pt-5'}`}>
                  {itens.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-snug text-ink-2">
                      <span aria-hidden className="font-bold text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button type="button" onClick={() => escolherPlano(nome)}
                  className={`mt-6 h-12 w-full rounded-[14px] px-6 font-bold transition active:scale-[0.98] motion-reduce:active:scale-100 ${
                    destaque ? 'bg-accent text-on-accent hover:bg-accent-hover' : 'bg-surface-2 text-ink hover:bg-white/[0.12]'
                  }`}>
                  Quero o {nome}
                </button>
              </div>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {VALE_PARA_TODOS.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-2">
                <span aria-hidden className="text-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Garantia logo depois do preço, que é onde a dúvida aparece. */}
          <div className="mt-8 rounded-[22px] p-6 ring-1 ring-accent/20"
            style={{ background: 'radial-gradient(90% 70% at 0% 0%, rgba(198,244,50,0.10), transparent 60%), #141619' }}>
            <h3 className="text-xl">{GARANTIA.titulo}</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink-2">{GARANTIA.texto}</p>
          </div>
        </section>

        {/* ── DÚVIDAS ──────────────────────────────────────────────────────── */}
        <section className="pt-20">
          <h2 className={TITULO_SECAO}>Dúvidas</h2>
          <div className="mt-8 divide-y divide-white/[0.06] rounded-[22px] bg-surface px-6">
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

        {/* ── FORMULÁRIO ───────────────────────────────────────────────────────
            Última seção, depois das dúvidas: quem lê até o fim é quem está mais
            perto de decidir, e precisa encontrar o campo de nome, não rolar de
            volta. */}
        <section id="comecar" className="scroll-mt-6 pt-20">
          <h2 className={TITULO_SECAO}>Começar</h2>
          <p className="mt-3 text-lg text-ink-2">Preenche aqui que eu te chamo no WhatsApp. Leva um minuto.</p>

          <form onSubmit={enviar} className="mt-8 space-y-5 rounded-[22px] bg-surface p-6 sm:p-8" noValidate>
            <div>
              <label className={label} htmlFor="nome">Nome completo</label>
              <input id="nome" className={input} value={form.nome} onChange={campo('nome')} autoComplete="name" />
            </div>

            {/* A idade muda a prescrição: perguntar aqui uma vez sai mais
                barato que perguntar em todo primeiro contato. */}
            <div>
              <label className={label} htmlFor="nascimento">Data de nascimento</label>
              <input id="nascimento" type="date" className={input} value={form.nascimento}
                onChange={campo('nascimento')} max={new Date().toISOString().slice(0, 10)} autoComplete="bday" />
            </div>

            <div>
              <label className={label} htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" type="tel" inputMode="tel" className={input} value={form.whatsapp}
                onChange={campo('whatsapp')} autoComplete="tel" placeholder="(00) 00000-0000" />
            </div>

            <div>
              <label className={label} htmlFor="email">E-mail</label>
              <input id="email" type="email" inputMode="email" className={input} value={form.email}
                onChange={campo('email')} autoComplete="email" placeholder="seu@email.com" />
            </div>

            <div>
              <label className={label} htmlFor="plano">Plano</label>
              <select id="plano" className={input} value={form.plano} onChange={campo('plano')}>
                <option value="">Selecione o plano</option>
                {PLANOS.map((pl) => (
                  <option key={pl.nome} value={pl.nome}>{pl.nome} — {pl.preco}/mês</option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} htmlFor="modalidade">Quero treinar</label>
              <select id="modalidade" className={input} value={form.modalidade} onChange={campo('modalidade')}>
                <option value="musculacao">Só musculação</option>
                <option value="corrida">Musculação + corrida</option>
                <option value="ciclismo">Musculação + ciclismo</option>
              </select>
            </div>

            {erro && (
              <p role="alert" className="rounded-[14px] bg-danger/[0.14] px-4 py-3 text-sm text-danger">{erro}</p>
            )}

            <button type="submit" className={`${botaoLima} h-14 w-full px-8 text-base`}>
              Continuar
            </button>

            {/* Saída discreta pra quem quer presencial: chegou ao fim e percebeu
                que está no lugar errado precisa de caminho, não de beco. */}
            <p className="pt-1 text-center text-sm text-ink-3">
              Quer treinar comigo presencialmente?{' '}
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá Matheus! Vi a sua página e queria saber sobre o treino presencial.')}`}
                className="font-semibold text-ink underline decoration-accent/60 underline-offset-4 transition hover:text-accent"
              >
                Me chama no WhatsApp
              </a>
            </p>
          </form>
        </section>

        <footer className="mt-20 border-t border-white/[0.06] pt-8 text-sm text-ink-3">
          <p className="font-medium text-ink-2">Matheus Barbosa · {CREF}</p>
          <p className="mt-1">O treino é entregue pelo aplicativo Personal Pro, para Android e iPhone.</p>
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
        <a href="#comecar" tabIndex={barra ? 0 : -1} className={`${botaoLima} h-12 w-full px-6 text-base`}>
          Quero começar
        </a>
      </div>
    </main>
  );
}
