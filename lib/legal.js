// Páginas legais do site (Política de Privacidade e Termo de Uso) em PT, EN e ES.
//
// O texto mora em content/legal/*.html (fragmentos sem <script>), lido na hora
// do build. O português é o texto que vale (LGPD); o inglês é tradução, feita
// pro pedido de acesso à API da Garmin (29/10/2026); o espanhol, pro site em
// espanhol (29/10/2026). Mudou um, mude os outros e suba a versão em todos. O
// texto da política também existe no repo do app (hosting/politica/index.html
// e components/PoliticaPrivacidade.js): tudo precisa dizer a mesma coisa.
import fs from 'node:fs';
import path from 'node:path';
import { PAGINAS } from './idioma';

// Os endereços de cada idioma moram em lib/idioma.js (PAGINAS), junto com o
// resto do site.
export { alternates } from './idioma';
export const DOCUMENTOS = { privacidade: PAGINAS.privacidade, termos: PAGINAS.termos };

const ARQUIVOS = {
  privacidade: { 'pt-BR': 'privacidade.pt.html', en: 'privacy.en.html', es: 'privacidad.es.html' },
  termos: { 'pt-BR': 'termos.pt.html', en: 'terms.en.html', es: 'terminos.es.html' },
};

/** O HTML do documento. Falha o build em vez de publicar página vazia ou com script. */
export function lerDocumento(doc, idioma) {
  const html = fs.readFileSync(path.join(process.cwd(), 'content', 'legal', ARQUIVOS[doc][idioma]), 'utf8');
  if (!/<h1>/.test(html)) throw new Error(`Legal: ${doc}/${idioma} sem título`);
  if (/<script|\son\w+=/i.test(html)) throw new Error(`Legal: ${doc}/${idioma} com script, não publicar`);
  return html;
}
