import Inicio from '../Inicio';
import JsonLd from '@/components/JsonLd';
import { metadataPagina, jsonLdInicio } from '@/lib/seo';

// Página inicial em espanhol (México e América Latina). O <html lang="es">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = metadataPagina({
  pagina: 'inicio',
  idioma: 'es',
  title: 'Personal X · La app para entrenadores personales',
  description: 'Alumnos, entrenamientos, agenda, pagos y evaluaciones en una sola app. 30 días gratis, alumnos ilimitados, sin tarjeta.',
});

export default function Page() {
  return (
    <>
      <JsonLd dados={jsonLdInicio('es')} />
      <Inicio idioma="es" />
    </>
  );
}
