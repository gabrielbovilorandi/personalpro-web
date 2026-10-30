// Desde 16/10/2026 a página segue o padrão Grafite & Lima do app (Sora + Manrope,
// fundo grafite, acento lima), a pedido do Matheus: quem compra a consultoria
// já vê a cara do app que vai usar. Antes era Outfit + navy + o vermelho dele,
// isolados do resto do site pela classe .treine-escopo (está no histórico do git).

// Metadata da página de consultoria.
//
// Fica no layout, e não na page, porque `page.js` é componente de cliente (tem
// formulário com estado) e a documentação do Next 16 é explícita: o objeto
// `metadata` só é suportado em componente de servidor.
//
// O título e a descrição são o que aparece quando alguém compartilha o link no
// WhatsApp ou no Instagram — é a primeira impressão de quem recebe, e vale mais
// que qualquer coisa dentro da página pra decidir se a pessoa clica.

// `metadataBase` existe porque o Open Graph exige URL absoluta: caminho
// relativo nao e resolvido pelo WhatsApp nem pelo Instagram, e a imagem
// simplesmente nao aparece.
import JsonLd from '@/components/JsonLd';
import { CREF } from './dados';

export const metadata = {
  metadataBase: new URL('https://personalpro.app.br'),
  // Só em português (atende só no Brasil): canonical sem hreflang.
  alternates: { canonical: 'https://personalpro.app.br/treine/' },
  title: 'Treine com Matheus Barbosa | Consultoria online',
  description:
    'Consultoria online de musculação, corrida e ciclismo. Treino no aplicativo, com vídeo de execução. Sem fidelidade.',
  openGraph: {
    title: 'Treine com Matheus Barbosa',
    description:
      'Consultoria online de musculação, corrida e ciclismo. Treino no aplicativo, com vídeo de execução. Sem fidelidade.',
    type: 'website',
    locale: 'pt_BR',
    url: '/treine/',
    siteName: 'Personal Pro',
    // Sem imagem o link chegava como texto puro no WhatsApp, que e onde ele
    // manda esse link o dia inteiro -- e onde a foto decide se a pessoa toca
    // ou passa reto. 1200x630 e o recorte das duas plataformas.
    images: [{
      url: '/og-treine-v3.jpg',
      width: 1200,
      height: 630,
      alt: 'Matheus Barbosa — consultoria online de musculação, corrida e ciclismo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treine com Matheus Barbosa',
    images: ['/og-treine-v3.jpg'],
  },
};

// Dados estruturados: o serviço (consultoria online) e quem presta. Sem preço
// (muda com as vagas, em dados.js) e sem nota/avaliação.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://personalpro.app.br/treine/#consultoria',
  name: 'Consultoria online com Matheus Barbosa',
  serviceType: 'Consultoria online de musculação, corrida e ciclismo',
  description: metadata.description,
  url: 'https://personalpro.app.br/treine/',
  image: 'https://personalpro.app.br/og-treine-v3.jpg',
  areaServed: { '@type': 'Country', name: 'Brasil' },
  availableLanguage: 'pt-BR',
  provider: {
    '@type': 'Person',
    name: 'Matheus Barbosa',
    jobTitle: 'Personal trainer',
    hasCredential: { '@type': 'EducationalOccupationalCredential', name: CREF },
    sameAs: ['https://www.instagram.com/matheusseupersonal/'],
  },
};

export default function TreineLayout({ children }) {
  return (
    <div className="min-h-full bg-bg text-ink">
      <JsonLd dados={JSON_LD} />
      {children}
    </div>
  );
}
