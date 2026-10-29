import Inicio from './Inicio';
import SugestaoIdioma from '@/components/SugestaoIdioma';
import { alternates } from '@/lib/idioma';

// Página inicial em português. O conteúdo é o mesmo componente da versão em
// espanhol (/es/), com os textos de inicio.textos.js.
export const metadata = {
  alternates: alternates('inicio', 'pt-BR'),
};

export default function Page() {
  return (
    <>
      <SugestaoIdioma pagina="inicio" />
      <Inicio idioma="pt-BR" />
    </>
  );
}
