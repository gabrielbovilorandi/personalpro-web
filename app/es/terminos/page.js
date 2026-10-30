import PaginaLegal from '@/components/legal/PaginaLegal';
import { metadataPagina } from '@/lib/seo';

// Tradução de /termos/ (content/legal/terminos.es.html).
export const metadata = metadataPagina({
  pagina: 'termos',
  idioma: 'es',
  title: 'Términos de uso · Personal Pro',
  description: 'Términos de uso de la app Personal Pro para entrenadores personales y sus alumnos.',
});

export default function Terminos() {
  return <PaginaLegal doc="termos" idioma="es" />;
}
