import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/idioma';

// Tradução de /termos/ (content/legal/terminos.es.html).
export const metadata = {
  title: 'Términos de uso · PersonalPro',
  description: 'Las reglas para usar la app PersonalPro.',
  alternates: alternates('termos', 'es'),
  openGraph: { locale: 'es_MX' },
};

export default function Terminos() {
  return <PaginaLegal doc="termos" idioma="es" />;
}
