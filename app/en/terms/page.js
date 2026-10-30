import PaginaLegal from '@/components/legal/PaginaLegal';
import { metadataPagina } from '@/lib/seo';

// Tradução de /termos/ (content/legal/terms.en.html).
export const metadata = metadataPagina({
  pagina: 'termos',
  idioma: 'en',
  title: 'Terms of Use · Personal Pro',
  description: 'Terms of use of the Personal Pro app for personal trainers and their clients.',
});

export default function Terms() {
  return <PaginaLegal doc="termos" idioma="en" />;
}
