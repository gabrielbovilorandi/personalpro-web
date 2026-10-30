import { SITE } from '@/lib/idioma';

// robots.txt: tudo liberado. /login/ e /dashboard/ (que só mandam pro app web)
// e o convite ficam fora da busca pelo <meta name="robots" content="noindex">
// de cada página -- bloquear aqui impediria o robô de ver esse noindex.
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
