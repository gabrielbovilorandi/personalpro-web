import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/idioma';

// Tradução de /termos/ (content/legal/terms.en.html).
export const metadata = {
  title: 'Terms of Use · PersonalPro',
  description: 'The rules for using the PersonalPro app.',
  alternates: alternates('termos', 'en'),
  openGraph: { locale: 'en_US' },
};

export default function Terms() {
  return <PaginaLegal doc="termos" idioma="en" />;
}
