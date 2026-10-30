'use client';
import { useState } from 'react';
import Image from 'next/image';
import { APP_WEB_ENTRAR } from '@/lib/appWeb';
import { PAGINAS } from '@/lib/idioma';
import TrocaIdioma from '@/components/legal/TrocaIdioma';
import { TEXTOS_INICIO, precoR$ } from './inicio.textos';
import {
  Users, Dumbbell, DollarSign, CalendarDays, Activity,
  ChevronDown, ChevronRight, Check, Star, ArrowRight,
  Smartphone, BarChart2, BookOpen, Bell, LayoutDashboard, Wallet,
} from 'lucide-react';

// Os textos (português, inglês e espanhol) estão em inicio.textos.js; aqui ficam
// os ícones e os números, que são os mesmos em todos os idiomas.
const ICONES_FEATURES = [Users, Dumbbell, DollarSign, CalendarDays, Activity, Smartphone];

const PLANOS = [
  { id: 'mensal', preco: 39.90, porMes: 39.90, popular: false },
  { id: 'trimestral', preco: 109.90, porMes: 36.63, de: 119.70, popular: false },
  { id: 'semestral', preco: 199.90, porMes: 33.32, de: 239.40, popular: false },
  { id: 'anual', preco: 359.90, porMes: 29.99, de: 478.80, popular: true },
];

// O site é a única coisa na bio do Instagram, e quem chega de lá está no
// CELULAR procurando um app. Antes não havia um único link pras lojas — o
// visitante concluía que era só um sistema web (achado pelo dono).
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.matheuspersonalpro.personalpro';
const IOS_URL  = 'https://apps.apple.com/br/app/personal-pro/id6782193425';

function BotoesLoja({ className = '', t }) {
  const base = 'flex items-center justify-center gap-2.5 px-5 py-3 rounded-[22px] bg-white/[0.06] ring-1 ring-white/[0.12] hover:bg-white/[0.10] hover:ring-white/25 transition-all';
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className={base}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="#34d399" d="M3.6 1.8 13.5 12 3.6 22.2A2 2 0 0 1 3 20.8V3.2c0-.53.23-1.02.6-1.4Z" />
          <path fill="#C6F432" d="M16.4 8.9 5.6 2.6 4.9 2.2l10 10Z" />
          <path fill="#fbbf24" d="M16.4 15.1 14.9 12l5.4-3.1c1 .6 1 2.6 0 3.2Z" />
          <path fill="#fb7185" d="M4.9 21.8 14.9 12l1.5 3.1-10.8 6.3Z" />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] text-white/40 leading-none">{t.loja.play}</span>
          <span className="block text-[14px] font-bold text-white leading-tight">Google Play</span>
        </span>
      </a>
      <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className={base}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-white" aria-hidden="true">
          <path d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.6.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.3 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.9ZM14.2 5.6c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4Z" />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] text-white/40 leading-none">{t.loja.apple}</span>
          <span className="block text-[14px] font-bold text-white leading-tight">App Store</span>
        </span>
      </a>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="text-[15px] font-semibold text-white/85">{q}</span>
        <ChevronDown size={16} className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="text-[14px] text-white/50 leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function LandingPage({ idioma = 'pt-BR' }) {
  const t = TEXTOS_INICIO[idioma];
  return (
    <div lang={idioma} className="min-h-full bg-bg text-white">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.05]"
        style={{ background: 'rgba(10,11,13,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Image src="/logo.png" alt="Personal Pro" width={130} height={36} style={{ objectFit: 'contain', height: 32, width: 'auto' }} loading="eager" />
          <div className="flex items-center gap-1 sm:gap-3">
            {/* No celular a barra não tem lugar pro seletor: ele fica no rodapé. */}
            <TrocaIdioma atual={idioma} caminhos={PAGINAS.inicio} className="hidden md:flex" />
            <a href={APP_WEB_ENTRAR}
              className="whitespace-nowrap text-[13px] font-medium text-white/50 hover:text-white transition-colors px-2 sm:px-3 py-2">
              {t.entrar}
            </a>
            {/* A barra é fixa e acompanha a rolagem toda — era o botão mais
                visível da página e mandava pro login web, contradizendo o
                produto, que é um app de celular. */}
            <a href="#baixar"
              className="flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-[14px] bg-accent hover:bg-accent-hover text-[13px] font-semibold text-on-accent transition-all shadow-lg shadow-black/30">
              {t.baixarApp} <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </nav>

      {/* <main> só marca o conteúdo pra leitor de tela e buscador: sem estilo. */}
      <main>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 ring-1 ring-accent/20 text-[12px] font-semibold text-accent mb-6">
              <Star size={11} fill="currentColor" /> {t.selo}
            </div>
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.1] mb-6 font-display">
              <span>
                {t.titulo1}
              </span>
              <br />
              <span className="text-accent">{t.titulo2}</span>
            </h1>
            <p className="text-[16px] text-white/45 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              {t.sub}
            </p>
            {/* Baixar o app é a ação PRINCIPAL: o produto é um app de celular,
                e a maior parte de quem chega vem da bio do Instagram, no
                telefone. O login web fica como caminho secundário — serve pra
                quem já é cliente e quer usar no computador. */}
            <BotoesLoja t={t} className="justify-center md:justify-start mb-4" />
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <p className="text-[12px] text-white/30">{t.gratis}</p>
              <span className="hidden sm:block text-white/15">·</span>
              <a href={APP_WEB_ENTRAR}
                className="text-[12px] font-medium text-accent hover:text-accent-pale transition-colors">
                {t.pc}
              </a>
            </div>
          </div>

          {/* Celular: o Inicio do personal, como esta no app depois do redesign
              Grafite & Lima (proxima sessao em destaque, recebido x previsto e a
              lista de acao). Antes mostrava a grade de 4 blocos coloridos do app
              antigo -- a pagina prometia uma tela que o app nao tem mais. */}
          <div className="shrink-0 relative">
            <div className="w-[250px] md:w-[290px] rounded-[44px] bg-black p-2 ring-1 ring-white/10 shadow-2xl shadow-black/50">
              <div className="rounded-[36px] overflow-hidden bg-bg">
                <div className="h-7 flex items-center justify-center">
                  <div className="w-16 h-1.5 rounded-full bg-white/10" />
                </div>
                <div className="px-4 pb-4 space-y-3.5">
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[10px] text-ink-3 uppercase tracking-[0.12em] font-semibold">{t.mock.saudacao}</p>
                      <p className="text-[19px] text-ink font-display font-semibold leading-tight">Matheus</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-[12px] font-display font-semibold text-ink">M</div>
                  </div>

                  <div className="rounded-[22px] p-4 space-y-2.5"
                    style={{ background: 'radial-gradient(120% 90% at 100% 0%, rgba(198,244,50,0.16), transparent 60%), #141619' }}>
                    <p className="text-[9.5px] text-ink-3 uppercase tracking-[0.12em] font-semibold">{t.mock.proxima}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-[34px] leading-none font-display font-semibold text-accent">09:30</p>
                      <span className="text-[10.5px] font-semibold px-2.5 py-1.5 rounded-full bg-accent/15 text-accent">{t.mock.emMin}</span>
                    </div>
                    <p className="text-[12px] text-ink-2">{t.mock.aluno}</p>
                  </div>

                  <div className="rounded-[18px] bg-surface p-3.5 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[9.5px] text-ink-3 uppercase tracking-[0.12em] font-semibold">{t.mock.recebido}</p>
                      <p className="text-[10.5px] text-ink-3">{t.mock.de}</p>
                    </div>
                    <p className="text-[24px] leading-none font-display font-semibold text-ink">{t.mock.valor}</p>
                    <div className="h-1 rounded-full bg-surface-2 overflow-hidden">
                      <div className="h-full w-[77%] rounded-full bg-accent" />
                    </div>
                  </div>

                  <div className="divide-y divide-white/[0.06]">
                    {t.mock.lista.map(l => (
                      <div key={l.nome} className="flex items-center gap-3 py-2.5">
                        <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-[10px] font-display font-semibold text-ink shrink-0">
                          {l.nome.split(' ').map(x => x[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-ink leading-tight">{l.nome}</p>
                          <p className="text-[10.5px] text-ink-3">{l.info}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-full ${l.tom}`}>{l.chip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-around border-t border-white/[0.06] px-2 pt-2.5 pb-3.5">
                  {[LayoutDashboard, CalendarDays, BookOpen, Users, Wallet].map((Icone, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1 text-[9px] font-semibold ${i === 0 ? 'text-accent' : 'text-ink-3'}`}>
                      <Icone size={17} />
                      {t.mock.abas[i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Brilho */}
            <div className="absolute -inset-8 -z-10 rounded-full opacity-[0.10]"
              style={{ background: 'radial-gradient(circle, #C6F432 0%, transparent 70%)' }} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">{t.featRotulo}</p>
          <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight font-display">
            <span>
              {t.featTitulo}
            </span>
          </h2>
          <p className="text-[15px] text-white/35 mt-3 max-w-md mx-auto">{t.featSub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.map((f, i) => {
            const Icone = ICONES_FEATURES[i];
            return (
              <div key={f.title} className="rounded-[22px] bg-surface ring-1 ring-white/[0.04] p-6 hover:ring-white/[0.10] transition-all">
                <Icone size={22} className="text-accent mb-4" />
                <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">{t.planosRotulo}</p>
          <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight font-display">
            <span>
              {t.planosTitulo}
            </span>
          </h2>
          <p className="text-[15px] text-white/35 mt-3">{t.planosSub}</p>
        </div>

        {/* Grátis */}
        <div className="rounded-[22px] bg-surface ring-1 ring-white/[0.04] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[14px] bg-white/[0.05] flex items-center justify-center">
              <Users size={18} className="text-white/40" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[15px] font-bold text-white">{t.gratuito}</p>
              <p className="text-[13px] text-white/35">{t.gratuitoInfo}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[22px] font-semibold text-white/50 font-display">R$ 0</p>
            <a href={APP_WEB_ENTRAR}
              className="px-5 py-2.5 rounded-[14px] border border-white/[0.12] text-[13px] font-semibold text-white/60 hover:text-white hover:border-white/25 transition-all">
              {t.comecarGratis}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANOS.map(p => { const tp = t.planos[p.id]; return (
            <div key={p.id} className={`relative rounded-[22px] p-6 flex flex-col transition-all ${p.popular ? 'bg-accent shadow-2xl shadow-black/40 pt-8' : 'bg-surface ring-1 ring-white/[0.04] hover:ring-white/[0.12]'}`}>
              {tp.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${p.popular ? 'bg-on-accent text-accent' : 'bg-accent/15 text-accent ring-1 ring-accent/25'}`}>
                  {tp.badge}
                </div>
              )}
              <p className={`text-[13px] font-semibold mb-1 ${p.popular ? 'text-on-accent/70' : 'text-white/50'}`}>{tp.nome}</p>
              {/* O preço grande é o que é COBRADO no período (decisão do
                  Matheus, 29/10/2026). Riscado, o mesmo período no plano
                  mensal (mensal × meses), e embaixo, pequeno, quanto dá por
                  mês. Antes o grande era o por-mês e o riscado era o total do
                  período: comparava coisas diferentes e parecia desconto falso. */}
              <div className="flex items-end gap-1 mb-1">
                <p className={`text-[32px] font-black leading-none ${p.popular ? 'text-on-accent' : 'text-white'}`}>
                  {precoR$(p.preco, idioma)}
                </p>
              </div>
              <p className={`text-[11px] mb-1 ${p.popular ? 'text-on-accent/60' : 'text-white/30'}`}>{t.periodo[p.id]}</p>
              {p.de && (
                <p className={`text-[11px] ${p.popular ? 'text-on-accent/50' : 'text-white/25'}`}>
                  {t.precoDe && `${t.precoDe} `}<s>{precoR$(p.de, idioma)}</s>
                </p>
              )}
              {p.id !== 'mensal' && (
                <p className={`text-[11px] ${p.popular ? 'text-on-accent/60' : 'text-white/30'}`}>{t.equivale(precoR$(p.porMes, idioma))}</p>
              )}
              <div className="mb-3" />
              <p className={`text-[12px] leading-relaxed mb-5 flex-1 ${p.popular ? 'text-on-accent/70' : 'text-white/35'}`}>{tp.desc}</p>
              <a href={APP_WEB_ENTRAR}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-[14px] text-[13px] font-bold transition-all ${p.popular ? 'bg-on-accent text-accent hover:bg-black' : 'bg-surface-2 text-ink hover:bg-white/[0.12]'}`}>
                {t.assinar} <ChevronRight size={13} />
              </a>
            </div>
          ); })}
        </div>
        <p className="text-center text-[12px] text-white/25 mt-6">{t.planosNota}</p>
      </section>

      {/* CTA BANNER */}
      <section id="baixar" className="max-w-6xl mx-auto px-4 md:px-8 py-10 scroll-mt-20">
        <div className="rounded-3xl overflow-hidden relative px-8 py-12 md:px-14 md:py-16 text-center"
          style={{ background: 'radial-gradient(120% 90% at 100% 0%, rgba(198,244,50,0.16), transparent 60%), #141619' }}>
          <div className="relative z-10">
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mb-4 font-display">
              {t.ctaTitulo1}<br />{t.ctaTitulo2}
            </h2>
            <p className="text-[15px] text-white/45 mb-8 max-w-md mx-auto">
              {t.ctaSub}
            </p>
            <BotoesLoja t={t} className="justify-center" />
            <a href={APP_WEB_ENTRAR}
              className="inline-block mt-5 text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors">
              {t.ctaPc}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">{t.faqRotulo}</p>
          <h2 className="text-[32px] md:text-[38px] font-semibold tracking-tight font-display">
            <span>
              {t.faqTitulo}
            </span>
          </h2>
        </div>
        <div className="rounded-[22px] bg-surface ring-1 ring-white/[0.04] px-6 divide-y divide-white/[0.06]">
          {t.faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] py-10">
        {/* Ponte pra consultoria do Matheus (/treine), aprovada pelo Gabriel em
            25/10/2026. Discreta de propósito: esta página é pra personal, e o
            link não pode disputar atenção com os botões de baixar o app. */}
        {/* Só em português: a consultoria atende só no Brasil (o Matheus,
            29/10/2026), então a página em espanhol não tem esse link. */}
        {t.consultoria && (
        <p className="max-w-6xl mx-auto px-4 md:px-8 mb-8 text-center text-[13px] text-white/40">
          {t.consultoria}{' '}
          <a href="/treine/" className="font-medium text-white/70 underline decoration-white/20 underline-offset-4 hover:text-accent hover:decoration-accent/60 transition-colors">
            {t.consultoriaLink}
          </a>
        </p>
        )}
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/logo.png" alt="Personal Pro" width={110} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto', opacity: 0.6 }} />
          <p className="text-[12px] text-white/20">© {new Date().getFullYear()} Personal Pro · {t.direitos}</p>
          <div className="flex items-center gap-4">
            <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Google Play</a>
            <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">App Store</a>
            <a href={APP_WEB_ENTRAR} className="text-[12px] text-white/30 hover:text-white/60 transition-colors">{t.entrar}</a>
            <a href={PAGINAS.privacidade[idioma]} className="text-[12px] text-white/30 hover:text-white/60 transition-colors">{t.privacidade}</a>
          </div>
        </div>
        <TrocaIdioma atual={idioma} caminhos={PAGINAS.inicio} className="mt-6 justify-center" />
      </footer>

    </div>
  );
}
