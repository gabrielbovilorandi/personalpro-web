import Treine from '@/app/treine/Treine';
import { alternates } from '@/lib/idioma';

// /treine/ em espanhol (México e América Latina), pedido do Matheus em
// 29/10/2026. Mesma tela (app/treine/Treine.js), conteúdo de dados.es.js.
// O <html lang="es"> vem de scripts/idioma-html.mjs, no fim do build.
const DESCRICAO =
  'Asesoría en línea de fuerza, carrera y ciclismo. Tu entrenamiento en la app, con video de técnica. Sin plazos forzosos.';

export const metadata = {
  metadataBase: new URL('https://personalpro.app.br'),
  title: 'Entrena con Matheus Barbosa | Asesoría en línea',
  description: DESCRICAO,
  alternates: alternates('treine', 'es'),
  openGraph: {
    title: 'Entrena con Matheus Barbosa',
    description: DESCRICAO,
    type: 'website',
    locale: 'es_MX',
    url: '/es/entrena/',
    images: [{
      url: '/og-treine-v3.jpg',
      width: 1200,
      height: 630,
      alt: 'Matheus Barbosa: asesoría en línea de fuerza, carrera y ciclismo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrena con Matheus Barbosa',
    images: ['/og-treine-v3.jpg'],
  },
};

export default function Page() {
  return (
    <div className="min-h-full bg-bg text-ink">
      <Treine idioma="es" />
    </div>
  );
}
