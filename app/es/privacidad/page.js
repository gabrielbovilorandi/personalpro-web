import PaginaLegal from '@/components/legal/PaginaLegal';
import { metadataPagina } from '@/lib/seo';

// Tradução de /privacidade/ (content/legal/privacidad.es.html). O <html lang="es">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = metadataPagina({
  pagina: 'privacidade',
  idioma: 'es',
  title: 'Política de privacidad · Personal Pro',
  description: 'Cómo Personal Pro trata tus datos, conforme a la Ley General de Protección de Datos de Brasil (LGPD).',
});

export default function Privacidad() {
  return <PaginaLegal doc="privacidade" idioma="es" />;
}
