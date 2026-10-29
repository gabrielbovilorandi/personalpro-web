'use client';

// PT | EN no topo das páginas legais. Link comum (<a>), não <Link>: a troca
// recarrega a página, e é isso que faz o <html lang> vir certo (ver
// scripts/idioma-html.mjs). O clique guarda a escolha: a sugestão automática
// de inglês (script em PaginaLegal) nunca passa por cima de uma escolha feita.
import { CHAVE_IDIOMA } from '@/lib/idiomaLegal';

export default function TrocaIdioma({ atual, caminhos }) {
  const guardar = (idioma) => {
    try { localStorage.setItem(CHAVE_IDIOMA, idioma); } catch { /* sem storage: só não lembra */ }
  };
  const opcoes = [
    { idioma: 'pt-BR', rotulo: 'PT', nome: 'Português' },
    { idioma: 'en', rotulo: 'EN', nome: 'English' },
  ];
  return (
    <nav aria-label={atual === 'en' ? 'Language' : 'Idioma'} className="flex items-center gap-1 text-[13px] font-medium">
      {opcoes.map((o, i) => (
        <span key={o.idioma} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-ink-3">|</span>}
          {o.idioma === atual ? (
            <span aria-current="page" lang={o.idioma} title={o.nome} className="px-2 py-1 rounded-md bg-surface-2 text-ink">{o.rotulo}</span>
          ) : (
            <a href={caminhos[o.idioma]} hrefLang={o.idioma} lang={o.idioma} title={o.nome} onClick={() => guardar(o.idioma)}
              className="px-2 py-1 rounded-md text-ink-2 hover:text-accent">{o.rotulo}</a>
          )}
        </span>
      ))}
    </nav>
  );
}
