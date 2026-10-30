import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/idioma';

// Tradução de /privacidade/ (content/legal/privacidad.es.html). O <html lang="es">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = {
  title: 'Política de privacidad · PersonalPro',
  description: 'Cómo PersonalPro trata tus datos, conforme a la Ley General de Protección de Datos de Brasil (LGPD).',
  alternates: alternates('privacidade', 'es'),
  openGraph: { locale: 'es_MX' },
};

export default function Privacidad() {
  return <PaginaLegal doc="privacidade" idioma="es" />;
}
