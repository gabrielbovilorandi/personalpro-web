import Inicio from '../Inicio';
import { alternates } from '@/lib/idioma';

// Página inicial em espanhol (México e América Latina). O <html lang="es">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = {
  title: 'PersonalPro · La app para entrenadores personales',
  description: 'Alumnos, entrenamientos, agenda, pagos y evaluaciones en una sola app. Gratis hasta 3 alumnos.',
  alternates: alternates('inicio', 'es'),
  openGraph: { locale: 'es_MX' },
};

export default function Page() {
  return <Inicio idioma="es" />;
}
