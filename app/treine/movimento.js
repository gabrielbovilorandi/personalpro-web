'use client';

// Ajudantes de movimento da /treine (auditoria de 16/10/2026).
//
// Os três carrosséis (fotos do topo, telas do app e depoimentos) tinham os
// mesmos defeitos: giravam com a seção fora da tela, não respondiam ao dedo
// no celular e, com "reduzir movimento" ligado, ainda deslizavam no clique.

import { useEffect, useRef, useState } from 'react';

// Curva de saída forte: chega rápido e assenta devagar. Usada em toda troca
// de conteúdo da página, pra que todas tenham o mesmo jeito de mexer.
export const CURVA = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function prefereMenosMovimento() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// A seção está na tela e a aba está visível? O carrossel só gira nesse caso:
// quem rola de volta encontra a troca começando, não no meio da sequência.
export function useNaTela() {
  const ref = useRef(null);
  const [naTela, setNaTela] = useState(false);
  const [abaVisivel, setAbaVisivel] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    const vis = () => setAbaVisivel(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', vis);
    return () => { obs.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, []);

  return [ref, naTela && abaVisivel];
}

// Deslizar com o dedo. Conta como gesto só quando o movimento é mais lateral
// que vertical -- senão quem está rolando a página troca de slide sem querer.
// Rápido e curto também vale (pela velocidade), não só arrasto longo.
export function useArrastar(anterior, proximo) {
  const inicio = useRef(null);
  return {
    onTouchStart: (e) => {
      const t = e.touches[0];
      inicio.current = { x: t.clientX, y: t.clientY, em: performance.now() };
    },
    onTouchEnd: (e) => {
      const i = inicio.current;
      inicio.current = null;
      if (!i) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - i.x;
      const dy = t.clientY - i.y;
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const velocidade = Math.abs(dx) / Math.max(1, performance.now() - i.em);
      if (Math.abs(dx) > 48 || (Math.abs(dx) > 20 && velocidade > 0.4)) {
        (dx < 0 ? proximo : anterior)();
      }
    },
  };
}
