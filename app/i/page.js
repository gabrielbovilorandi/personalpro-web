import Indicacao from './Indicacao';
import { OG_IMAGEM } from '@/lib/seo';

// Link de INDICAÇÃO do personal (Indique e ganhe, app ≥ feat/indicacao):
//   https://personalpro.app.br/i/?c=MATHEUS27
// O site é export estático: o código vem na query (/i/MATHEUS27 cai no 404,
// que redireciona pra cá — app/not-found.js). Fora da busca: é página de link.
const titulo = 'Você ganhou 1 mês grátis no Personal Pro';
const descricao = 'Um amigo personal te indicou: assine com o código dele e o 1º mês sai grátis, em qualquer plano.';
export const metadata = {
  title: titulo,
  description: descricao,
  robots: { index: false, follow: true },
  openGraph: { title: titulo, description: descricao, siteName: 'Personal Pro', locale: 'pt_BR', type: 'website', images: [OG_IMAGEM] },
  twitter: { card: 'summary_large_image', title: titulo, description: descricao, images: [OG_IMAGEM.url] },
};

export default function Page() {
  return <Indicacao />;
}
