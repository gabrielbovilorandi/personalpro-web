import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/idioma';

// Texto: content/legal/termos.pt.html — o mesmo do app (components/TermoDeUso.js).
export const metadata = {
  title: 'Termo de Uso · Personal Pro',
  description: 'As regras de uso do aplicativo Personal Pro.',
  alternates: alternates('termos', 'pt-BR'),
};

export default function Termos() {
  return <PaginaLegal doc="termos" idioma="pt-BR" />;
}
