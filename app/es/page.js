import Inicio from '../Inicio';
import JsonLd from '@/components/JsonLd';
import { metadataPagina, jsonLdInicio } from '@/lib/seo';

// Página inicial em espanhol (México e América Latina). O <html lang="es">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = metadataPagina({
  pagina: 'inicio',
  idioma: 'es',
  title: 'Personal Pro · La app para entrenadores personales',
  description: 'Alumnos, entrenamientos, agenda, pagos y evaluaciones en una sola app. Gratis hasta 3 alumnos.',
});

export default function Page() {
  return (
    <>
      <JsonLd dados={jsonLdInicio('es')} />
      <Inicio idioma="es" />
    </>
  );
}
