// Páginas legais do site (Política de Privacidade e Termo de Uso) em PT e EN.
//
// O texto mora em content/legal/*.html (fragmentos sem <script>), lido na hora
// do build. O português é o texto que vale (LGPD); o inglês é tradução, feita
// pro pedido de acesso à API da Garmin (29/10/2026). Mudou um, mude o outro e
// suba a versão nos dois. O texto da política também existe no repo do app
// (hosting/politica/index.html e components/PoliticaPrivacidade.js): os três
// precisam dizer a mesma coisa.
import fs from 'node:fs';
import path from 'node:path';

export const SITE = 'https://personalpro.app.br';

// Cada documento: o caminho de cada idioma. Os endereços em português são os
// de sempre (/privacidade/ é o que está nas lojas e no pedido da Garmin).
export const DOCUMENTOS = {
  privacidade: { 'pt-BR': '/privacidade/', en: '/en/privacy/' },
  termos: { 'pt-BR': '/termos/', en: '/en/terms/' },
};

/** metadata.alternates: canonical + hreflang dos dois idiomas (x-default = português). */
export function alternates(doc, idioma) {
  const d = DOCUMENTOS[doc];
  return {
    canonical: SITE + d[idioma],
    languages: { 'pt-BR': SITE + d['pt-BR'], en: SITE + d.en, 'x-default': SITE + d['pt-BR'] },
  };
}

const ARQUIVOS = {
  privacidade: { 'pt-BR': 'privacidade.pt.html', en: 'privacy.en.html' },
  termos: { 'pt-BR': 'termos.pt.html', en: 'terms.en.html' },
};

/** O HTML do documento. Falha o build em vez de publicar página vazia ou com script. */
export function lerDocumento(doc, idioma) {
  const html = fs.readFileSync(path.join(process.cwd(), 'content', 'legal', ARQUIVOS[doc][idioma]), 'utf8');
  if (!/<h1>/.test(html)) throw new Error(`Legal: ${doc}/${idioma} sem título`);
  if (/<script|\son\w+=/i.test(html)) throw new Error(`Legal: ${doc}/${idioma} com script, não publicar`);
  return html;
}
