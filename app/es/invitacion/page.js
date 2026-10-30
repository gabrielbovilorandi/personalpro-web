import Convite from '@/app/convite/Convite';
import { alternates } from '@/lib/idioma';

// /convite/ em espanhol. O código chega na query (?codigo=), igual ao português.
export const metadata = {
  title: 'Tu entrenador te invitó · Personal Pro',
  description: 'Descarga Personal Pro y entra con tu código de invitación.',
  alternates: alternates('convite', 'es'),
  openGraph: { locale: 'es_MX' },
};

export default function Page() {
  return <Convite idioma="es" />;
}
