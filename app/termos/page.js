import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/legal';

// Texto: content/legal/termos.pt.html — o mesmo do app (components/TermoDeUso.js).
export const metadata = {
  title: 'Termo de Uso · PersonalPro',
  description: 'As regras de uso do aplicativo PersonalPro.',
  alternates: alternates('termos', 'pt-BR'),
};

export default function Termos() {
  return <PaginaLegal doc="termos" idioma="pt-BR" />;
}
