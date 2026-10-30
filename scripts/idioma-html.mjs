// Depois do `next build` (export estático): as páginas em out/en/ saem com
// <html lang="en"> e as de out/es/ com <html lang="es">. O layout raiz é um só
// e fixa pt-BR; separar em layouts raiz por idioma obrigaria a mexer em todas
// as rotas e no 404 do site. O <main lang> já marca o conteúdo; isto acerta o
// documento inteiro (leitor de tela, tradutor do navegador, buscadores).
import fs from 'node:fs';
import path from 'node:path';

const IDIOMAS = { en: 'en', es: 'es' };

for (const [pasta, lang] of Object.entries(IDIOMAS)) {
  const raiz = path.join(process.cwd(), 'out', pasta);
  let n = 0;
  const percorrer = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) percorrer(p);
      else if (e.name.endsWith('.html')) {
        const html = fs.readFileSync(p, 'utf8');
        const novo = html.replace(/<html lang="pt-BR"/, `<html lang="${lang}"`);
        if (novo === html) throw new Error(`idioma-html: <html lang="pt-BR"> não encontrado em ${p}`);
        fs.writeFileSync(p, novo);
        n += 1;
      }
    }
  };
  if (!fs.existsSync(raiz)) throw new Error(`idioma-html: out/${pasta} não existe (o build rodou?)`);
  percorrer(raiz);
  if (n === 0) throw new Error(`idioma-html: nenhuma página em out/${pasta}`);
  console.log(`idioma-html: ${n} página(s) em out/${pasta} com lang="${lang}"`);
}
