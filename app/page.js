import Inicio from './Inicio';
import SugestaoIdioma from '@/components/SugestaoIdioma';
import JsonLd from '@/components/JsonLd';
import { metadataPagina, jsonLdInicio } from '@/lib/seo';

// Página inicial em português. O conteúdo é o mesmo componente da versão em
// espanhol (/es/), com os textos de inicio.textos.js.
export const metadata = metadataPagina({
  pagina: 'inicio',
  idioma: 'pt-BR',
  title: 'Personal Pro · O app para personal trainers',
  description: 'Alunos, treinos, agenda, pagamentos e avaliações em um só app. Grátis até 3 alunos.',
});

export default function Page() {
  return (
    <>
      <SugestaoIdioma pagina="inicio" />
      <JsonLd dados={jsonLdInicio('pt-BR')} />
      <Inicio idioma="pt-BR" />
    </>
  );
}
