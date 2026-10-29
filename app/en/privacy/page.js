import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/legal';

// Tradução de /privacidade/ (content/legal/privacy.en.html). O <html lang="en">
// vem de scripts/idioma-html.mjs, no fim do build.
export const metadata = {
  title: 'Privacy Policy · PersonalPro',
  description: 'How PersonalPro handles your data, in compliance with the Brazilian General Data Protection Law (LGPD).',
  alternates: alternates('privacidade', 'en'),
  openGraph: { locale: 'en_US' },
};

export default function Privacy() {
  return <PaginaLegal doc="privacidade" idioma="en" />;
}
