import Treine from './Treine';
import SugestaoIdioma from '@/components/SugestaoIdioma';

// A tela é a mesma da /es/entrena/ (Treine.js); o metadata fica no layout.
export default function Page() {
  return (
    <>
      <SugestaoIdioma pagina="treine" />
      <Treine idioma="pt-BR" />
    </>
  );
}
