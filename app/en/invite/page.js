import Convite from '@/app/convite/Convite';
import { alternates } from '@/lib/idioma';

// /convite/ em inglês. O código chega na query (?codigo=), igual ao português.
export const metadata = {
  title: 'Your trainer invited you · PersonalPro',
  description: 'Download Personal Pro and join with your invite code.',
  alternates: alternates('convite', 'en'),
  openGraph: { locale: 'en_US' },
};

export default function Page() {
  return <Convite idioma="en" />;
}
