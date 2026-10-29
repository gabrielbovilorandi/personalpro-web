'use client';

// Seletor de idioma (PT | EN | ES) das páginas públicas. Mostra só os idiomas
// que a página tem: as legais têm os três, a inicial, a /treine e o convite
// têm PT e ES. Bandeiras a pedido do Matheus (29/10/2026): espanhol com a da
// Espanha, mesmo com o texto em espanhol da América Latina.
//
// Link comum (<a>), não <Link>: a troca recarrega a página, e é isso que faz o
// <html lang> vir certo (ver scripts/idioma-html.mjs). O clique guarda a
// escolha: a sugestão automática (lib/idioma.js) nunca passa por cima dela.
import { CHAVE_IDIOMA } from '@/lib/idioma';

const OPCOES = [
  { idioma: 'pt-BR', rotulo: 'PT', bandeira: '🇧🇷', nome: 'Português' },
  { idioma: 'en', rotulo: 'EN', bandeira: '🇺🇸', nome: 'English' },
  { idioma: 'es', rotulo: 'ES', bandeira: '🇪🇸', nome: 'Español' },
];

const ROTULO_NAV = { 'pt-BR': 'Idioma', en: 'Language', es: 'Idioma' };

export default function TrocaIdioma({ atual, caminhos, className = '' }) {
  const guardar = (idioma) => {
    try { localStorage.setItem(CHAVE_IDIOMA, idioma); } catch { /* sem storage: só não lembra */ }
  };
  const opcoes = OPCOES.filter((o) => caminhos[o.idioma]);
  return (
    <nav aria-label={ROTULO_NAV[atual]} className={`flex items-center gap-1 text-[13px] font-medium ${className}`}>
      {opcoes.map((o, i) => {
        const conteudo = (
          <>
            <span aria-hidden="true" className="mr-1">{o.bandeira}</span>
            {o.rotulo}
          </>
        );
        return (
          <span key={o.idioma} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-ink-3">|</span>}
            {o.idioma === atual ? (
              <span aria-current="page" lang={o.idioma} title={o.nome} className="whitespace-nowrap px-2 py-1 rounded-md bg-surface-2 text-ink">{conteudo}</span>
            ) : (
              <a href={caminhos[o.idioma]} hrefLang={o.idioma} lang={o.idioma} title={o.nome} onClick={() => guardar(o.idioma)}
                className="whitespace-nowrap px-2 py-1 rounded-md text-ink-2 hover:text-accent">{conteudo}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
