import PaginaLegal from '@/components/legal/PaginaLegal';
import { alternates } from '@/lib/idioma';

// Texto: content/legal/privacidade.pt.html (ver lib/legal.js). Até a 1.2 esta
// página copiava a política de personalpro-1d4bc.web.app no build; com a
// versão em inglês (pedido da Garmin, 29/10/2026) as duas moram aqui, lado a
// lado, pra nunca ficarem em versões diferentes.
export const metadata = {
  title: 'Política de Privacidade · Personal Pro',
  description: 'Como o Personal Pro trata os seus dados, em conformidade com a LGPD (Lei nº 13.709/2018).',
  alternates: alternates('privacidade', 'pt-BR'),
};

export default function Privacidade() {
  return <PaginaLegal doc="privacidade" idioma="pt-BR" />;
}
