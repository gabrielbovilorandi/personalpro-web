import Convite from './Convite';
import SugestaoIdioma from '@/components/SugestaoIdioma';
import { metadataPagina } from '@/lib/seo';

// A tela é a mesma da /es/invitacion/ (Convite.js).
export const metadata = metadataPagina({
  pagina: 'convite',
  idioma: 'pt-BR',
  title: 'Seu personal te convidou · Personal Pro',
  description: 'Baixe o Personal Pro e entre com o seu código de convite.',
  // Página de quem recebeu um código: sem valor na busca, fica fora do índice.
  indexar: false,
});

export default function Page() {
  return (
    <>
      <SugestaoIdioma pagina="convite" />
      <Convite idioma="pt-BR" />
    </>
  );
}
