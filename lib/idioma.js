// Idiomas do site público: português (o original), inglês (americano: as
// legais desde o pedido da Garmin, a inicial e o convite desde 29/10/2026) e
// espanhol (México e América Latina), ambos pedidos pelo Matheus. Sem `fs` aqui: os componentes de cliente
// (TrocaIdioma) também importam este arquivo.
//
// A consultoria do Matheus (/treine/) é só pro Brasil e fica só em
// português, sem seletor nem sugestão de idioma (decisão dele, 29/10/2026).
//
// O painel logado NÃO tem tradução: /login e /dashboard só mandam pro web novo
// (components/IrParaApp.js), que é outro projeto.

export const SITE = 'https://personalpro.app.br';

// Chave do localStorage com o idioma escolhido: 'pt-BR', 'en', 'es' (clique
// no seletor) ou 'auto-en' / 'auto-es' (a sugestão automática já mandou pra
// lá). O nome ficou o da época em que só as páginas legais tinham tradução:
// trocar apagaria a escolha de quem já clicou.
export const CHAVE_IDIOMA = 'pp-idioma-legal';

// Cada página pública: o endereço em cada idioma que ela tem. Português é a
// chave de sempre (os endereços nas lojas, nos convites e na bio do Instagram
// não mudam). O espanhol usa endereços em espanhol, como o inglês usa em inglês.
export const PAGINAS = {
  inicio: { 'pt-BR': '/', en: '/en/', es: '/es/' },
  convite: { 'pt-BR': '/convite/', en: '/en/invite/', es: '/es/invitacion/' },
  privacidade: { 'pt-BR': '/privacidade/', en: '/en/privacy/', es: '/es/privacidad/' },
  termos: { 'pt-BR': '/termos/', en: '/en/terms/', es: '/es/terminos/' },
};

/** metadata.alternates: canonical + hreflang de cada idioma da página (x-default = português). */
export function alternates(pagina, idioma) {
  const p = PAGINAS[pagina];
  const languages = {};
  for (const [lang, caminho] of Object.entries(p)) languages[lang] = SITE + caminho;
  languages['x-default'] = SITE + p['pt-BR'];
  return { canonical: SITE + p[idioma], languages };
}

// Sugestão de idioma nas páginas em português: script inline no topo da
// página, que roda ANTES do resto (não pisca o português).
//
// Por que no navegador e não no servidor: o site é estático (GitHub Pages),
// sem Accept-Language. E o Google recomenda não redirecionar por idioma quem
// não pediu: o robô roda com navegador em inglês e deixaria de ver o
// português. Os buscadores acham as versões pelos <link rel="alternate" hreflang>.
//
// Quando redireciona:
//   1. Já existe escolha guardada neste navegador:
//      - 'pt-BR' (clicou em PT): nunca redireciona;
//      - 'es'/'auto-es' ou 'en'/'auto-en': vai pra versão nesse idioma, se a
//        página tiver (quem já está no espanhol não volta pro português ao
//        abrir outro link do site; um clique em PT desfaz).
//   2. Nada guardado: redireciona UMA vez, e guarda 'auto-…', só se TUDO vale:
//      - não é robô/ferramenta (user agent de crawler, navegador automatizado);
//      - a 1ª língua do navegador é espanhol (es-*) ou inglês (en-*) e a página
//        tem essa versão;
//      - NÃO há português em nenhuma posição da lista (muito brasileiro usa o
//        celular em inglês ou espanhol, mas com pt na lista).
//   O localStorage precisa funcionar: sem ele não dá pra lembrar, então não mexe.
// A busca (?codigo= do convite) e o # vão junto.
export function scriptSugerirIdioma(pagina) {
  const destinos = {};
  for (const [lang, caminho] of Object.entries(PAGINAS[pagina])) if (lang !== 'pt-BR') destinos[lang] = caminho;
  return `(function(){try{
var k=${JSON.stringify(CHAVE_IDIOMA)},ls=window.localStorage,d=${JSON.stringify(destinos)};
var ir=function(p){if(!Object.prototype.hasOwnProperty.call(d,p))return false;location.replace(d[p]+location.search+location.hash);return true;};
var ua=navigator.userAgent||'';
if(navigator.webdriver||/bot|crawl|spider|slurp|archiver|preview|lighthouse|headless|facebookexternalhit|whatsapp|telegram|embedly|validator/i.test(ua))return;
var v=ls.getItem(k);
if(v){if(v!=='pt-BR')ir(v.replace('auto-',''));return;}
var l=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'']).map(function(x){return String(x).toLowerCase();});
for(var i=0;i<l.length;i++){if(l[i].indexOf('pt')===0)return;}
var p=l[0].slice(0,2);
if(!Object.prototype.hasOwnProperty.call(d,p))return;
ls.setItem(k,'auto-'+p);
ir(p);
}catch(e){}})();`;
}
