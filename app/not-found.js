'use client';

// O GitHub Pages devolve esta página (404.html) pra qualquer endereço que não
// existe. Os endereços do painel antigo (/dashboard/alunos/ etc.) caem aqui e
// vão pro web novo; /i/CODIGO (indicação) vai pro /i/?c=CODIGO; o resto
// mostra a página de não encontrado.
import { useEffect, useState } from 'react';
import IrParaApp from '@/components/IrParaApp';

export default function NotFound() {
  const [painelAntigo, setPainelAntigo] = useState(false);

  useEffect(() => {
    // Link de indicação no formato de caminho (/i/MATHEUS27): o export
    // estático não gera página por código, então vai pro /i/?c=MATHEUS27.
    const ind = /^\/i\/([A-Za-z0-9-]{3,24})\/?$/.exec(window.location.pathname);
    if (ind) { window.location.replace(`/i/?c=${encodeURIComponent(ind[1].toUpperCase())}`); return; }
    setPainelAntigo(/^\/(dashboard|login)(\/|$)/.test(window.location.pathname));
  }, []);

  if (painelAntigo) return <IrParaApp />;

  return (
    <div className="min-h-full flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-[15px] text-white/60">Página não encontrada.</p>
      <a href="/" className="text-[14px] font-medium text-accent">Ir para o início</a>
    </div>
  );
}
