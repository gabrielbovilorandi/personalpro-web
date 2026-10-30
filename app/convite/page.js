import Convite from './Convite';
import SugestaoIdioma from '@/components/SugestaoIdioma';
import { alternates } from '@/lib/idioma';

// A tela é a mesma da /es/invitacion/ (Convite.js).
export const metadata = {
  alternates: alternates('convite', 'pt-BR'),
};

export default function Page() {
  return (
    <>
      <SugestaoIdioma pagina="convite" />
      <Convite idioma="pt-BR" />
    </>
  );
}
