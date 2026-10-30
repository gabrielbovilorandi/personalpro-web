import Inicio from '../Inicio';
import JsonLd from '@/components/JsonLd';
import { metadataPagina, jsonLdInicio } from '@/lib/seo';

// Página inicial em inglês (americano). O <html lang="en"> vem de
// scripts/idioma-html.mjs, no fim do build.
export const metadata = metadataPagina({
  pagina: 'inicio',
  idioma: 'en',
  title: 'Personal Pro · The app for personal trainers',
  description: 'Clients, workouts, scheduling, payments, and assessments in one app. Free for up to 3 clients.',
});

export default function Page() {
  return (
    <>
      <JsonLd dados={jsonLdInicio('en')} />
      <Inicio idioma="en" />
    </>
  );
}
