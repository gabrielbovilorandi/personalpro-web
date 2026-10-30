// SEO do site público: título, descrição, canonical + hreflang, Open Graph e
// os dados estruturados (JSON-LD). Auditoria de 30/10/2026: antes, a inicial
// e o convite em português saíam com o título genérico do layout ("Personal
// Pro" / "Gestão para personal trainers"), as páginas em português não tinham
// Open Graph, nenhuma tinha imagem de compartilhamento (só a /treine/) e não
// havia sitemap.xml, robots.txt nem JSON-LD.
import { SITE, alternates } from './idioma';

export const LOJA_APPLE = 'https://apps.apple.com/br/app/personal-pro/id6782193425';
export const LOJA_PLAY = 'https://play.google.com/store/apps/details?id=com.matheuspersonalpro.personalpro';

// Imagem de compartilhamento (1200x630) das páginas do app. A /treine/ tem a dela.
export const OG_IMAGEM = { url: '/og-personalpro.jpg', width: 1200, height: 630, alt: 'Personal Pro' };

const OG_LOCALE = { 'pt-BR': 'pt_BR', en: 'en_US', es: 'es_MX' };

/**
 * metadata de uma página pública que existe em pt-BR, en e es (lib/idioma.js).
 * `indexar: false` deixa a página fora da busca (noindex, follow) sem tirar o hreflang.
 */
export function metadataPagina({ pagina, idioma, title, description, indexar = true }) {
  const alt = alternates(pagina, idioma);
  return {
    title,
    description,
    alternates: alt,
    ...(indexar ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: alt.canonical,
      siteName: 'Personal Pro',
      locale: OG_LOCALE[idioma],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[idioma]),
      type: 'website',
      images: [OG_IMAGEM],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGEM.url] },
  };
}

const ORGANIZACAO = {
  '@type': 'Organization',
  '@id': `${SITE}/#organizacao`,
  name: 'Personal Pro',
  url: `${SITE}/`,
  logo: `${SITE}/logo.png`,
  sameAs: [LOJA_APPLE, LOJA_PLAY],
};

const DESCRICAO_APP = {
  'pt-BR': 'App para personal trainers: alunos, treinos, agenda, pagamentos e avaliações em um só lugar. Grátis até 3 alunos.',
  en: 'App for personal trainers: clients, workouts, scheduling, payments, and assessments in one place. Free for up to 3 clients.',
  es: 'App para entrenadores personales: alumnos, entrenamientos, agenda, pagos y evaluaciones en un solo lugar. Gratis hasta 3 alumnos.',
};

/**
 * JSON-LD da página inicial: a organização, o site e o app nas duas lojas.
 * Sem nota nem avaliação (aggregateRating/review): só entra o que é verdade
 * e dá pra conferir na página. O preço 0 é o download e o plano gratuito.
 */
export function jsonLdInicio(idioma) {
  const url = SITE + { 'pt-BR': '/', en: '/en/', es: '/es/' }[idioma];
  const app = (os, loja) => ({
    '@type': 'MobileApplication',
    name: 'Personal Pro',
    operatingSystem: os,
    applicationCategory: 'HealthApplication',
    description: DESCRICAO_APP[idioma],
    installUrl: loja,
    url: loja,
    publisher: { '@id': ORGANIZACAO['@id'] },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  });
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZACAO,
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#site`,
        name: 'Personal Pro',
        url: `${SITE}/`,
        inLanguage: idioma,
        publisher: { '@id': ORGANIZACAO['@id'] },
      },
      { ...app('iOS', LOJA_APPLE), '@id': `${url}#app-ios` },
      { ...app('Android', LOJA_PLAY), '@id': `${url}#app-android` },
    ],
  };
}
