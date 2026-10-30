import { SITE, PAGINAS } from '@/lib/idioma';

// sitemap.xml: cada página pública em cada idioma, com as alternativas
// (hreflang) das outras línguas. O convite fica de fora (noindex, lib/seo.js),
// assim como /login/ e /dashboard/. A /treine/ só existe em português.
export const dynamic = 'force-static';

const INDEXADAS = ['inicio', 'privacidade', 'termos'];

export default function sitemap() {
  const urls = [];
  for (const pagina of INDEXADAS) {
    const caminhos = PAGINAS[pagina];
    const languages = {};
    for (const [lang, caminho] of Object.entries(caminhos)) languages[lang] = SITE + caminho;
    languages['x-default'] = SITE + caminhos['pt-BR'];
    for (const caminho of Object.values(caminhos)) {
      urls.push({
        url: SITE + caminho,
        changeFrequency: pagina === 'inicio' ? 'weekly' : 'yearly',
        priority: pagina === 'inicio' ? 1 : 0.3,
        alternates: { languages },
      });
    }
  }
  urls.push({ url: `${SITE}/treine/`, changeFrequency: 'weekly', priority: 0.9 });
  return urls;
}
