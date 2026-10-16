'use client';

// O painel antigo do site (/login e /dashboard) saiu do ar em 15/10/2026. Ele
// gravava no mesmo Firestore que o app com código parado desde 09/10 e ia
// ficando mais desatualizado a cada mudança do app. Quem chega por um favorito
// antigo é mandado pro web novo.
import { useEffect } from 'react';
import { APP_WEB_ENTRAR } from '@/lib/appWeb';

export default function IrParaApp() {
  useEffect(() => { window.location.replace(APP_WEB_ENTRAR); }, []);

  return (
    <div className="min-h-full flex items-center justify-center px-4">
      <a href={APP_WEB_ENTRAR} className="text-[14px] text-white/60 hover:text-white transition-colors">
        Abrindo o Personal Pro…
      </a>
    </div>
  );
}
