import PaginaLegal from '@/components/legal/PaginaLegal';
import { metadataPagina } from '@/lib/seo';

// Texto: content/legal/termos.pt.html — o mesmo do app (components/TermoDeUso.js).
export const metadata = metadataPagina({
  pagina: 'termos',
  idioma: 'pt-BR',
  title: 'Termo de Uso · Personal Pro',
  description: 'Termo de uso do aplicativo Personal Pro para personal trainers e seus alunos.',
});

export default function Termos() {
  return <PaginaLegal doc="termos" idioma="pt-BR" />;
}
