import Link from 'next/link';
import Image from 'next/image';
import TrocaIdioma from './TrocaIdioma';
import { CHAVE_IDIOMA } from '@/lib/idiomaLegal';
import { DOCUMENTOS, lerDocumento } from '@/lib/legal';

// Sugestão de inglês nas páginas em português — roda ANTES do resto da página
// (script inline no topo), então não pisca o português.
//
// Por que um redirecionamento no navegador, uma vez só, e não pelo servidor:
// o site é estático (GitHub Pages), sem Accept-Language no servidor. E o
// Google recomenda não redirecionar por idioma quem não pediu, porque o robô
// (que roda com navegador em inglês) deixaria de ver a página em português.
// Então só redireciona quando TUDO isto vale:
//   - não é robô/ferramenta (user agent de crawler, navegador automatizado);
//   - a 1ª língua do navegador é inglês e NÃO há português em nenhuma posição
//     (muito brasileiro usa o celular em inglês, mas com pt na lista);
//   - nunca houve escolha manual (PT | EN) nem sugestão antes neste navegador
//     (a sugestão vale uma vez: depois disso, a pessoa decide);
//   - o localStorage funciona (sem ele não dá pra lembrar, então não mexe).
// Os robôs acham as duas versões pelos <link rel="alternate" hreflang>.
function scriptSugerirIngles(destino) {
  return `(function(){try{
var k=${JSON.stringify(CHAVE_IDIOMA)},ls=window.localStorage;
if(ls.getItem(k))return;
var ua=navigator.userAgent||'';
if(navigator.webdriver||/bot|crawl|spider|slurp|archiver|preview|lighthouse|headless|facebookexternalhit|whatsapp|telegram|embedly|validator/i.test(ua))return;
var l=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'']).map(function(x){return String(x).toLowerCase();});
if(l[0].indexOf('en')!==0)return;
for(var i=0;i<l.length;i++){if(l[i].indexOf('pt')===0)return;}
ls.setItem(k,'auto-en');
location.replace(${JSON.stringify(destino)}+location.hash);
}catch(e){}})();`;
}

const TEXTOS = {
  'pt-BR': {
    inicio: 'PersonalPro, página inicial',
    rodape: 'A mesma política aparece dentro do app, no cadastro e no Perfil.',
    rodapeTermos: 'O mesmo termo aparece dentro do app, no cadastro.',
    links: { privacidade: 'Política de Privacidade', termos: 'Termo de Uso' },
  },
  en: {
    inicio: 'PersonalPro, home page',
    rodape: 'The same policy is shown inside the app, at sign-up and in Profile.',
    rodapeTermos: 'The same terms are shown inside the app, at sign-up.',
    links: { privacidade: 'Privacy Policy', termos: 'Terms of Use' },
  },
};

export default function PaginaLegal({ doc, idioma }) {
  const html = lerDocumento(doc, idioma);
  const t = TEXTOS[idioma];
  const outro = doc === 'privacidade' ? 'termos' : 'privacidade';
  return (
    <main lang={idioma} className="min-h-full bg-bg text-ink">
      {idioma === 'pt-BR' && (
        <script dangerouslySetInnerHTML={{ __html: scriptSugerirIngles(DOCUMENTOS[doc].en) }} />
      )}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link href="/" aria-label={t.inicio} className="inline-block">
            <Image src="/logo.png" alt="PersonalPro" width={110} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto' }} />
          </Link>
          <TrocaIdioma atual={idioma} caminhos={DOCUMENTOS[doc]} />
        </div>
        <article className="politica" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-12 pt-6 border-t border-white/[0.06] text-[12px] text-ink-3 flex flex-col gap-2">
          <p>{doc === 'privacidade' ? t.rodape : t.rodapeTermos}</p>
          <p><a href={DOCUMENTOS[outro][idioma]} className="text-ink-2 underline underline-offset-2 hover:text-accent">{t.links[outro]}</a></p>
        </div>
      </div>
    </main>
  );
}
