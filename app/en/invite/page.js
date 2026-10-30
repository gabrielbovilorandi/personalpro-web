import Convite from '@/app/convite/Convite';
import { metadataPagina } from '@/lib/seo';

// /convite/ em inglês. O código chega na query (?codigo=), igual ao português.
export const metadata = metadataPagina({
  pagina: 'convite',
  idioma: 'en',
  title: 'Your trainer invited you · Personal Pro',
  description: 'Download Personal Pro and join with your invite code.',
  // Página de quem recebeu um código: sem valor na busca, fica fora do índice.
  indexar: false,
});

export default function Page() {
  return <Convite idioma="en" />;
}
