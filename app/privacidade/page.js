import Link from 'next/link';
import Image from 'next/image';

// A política de privacidade tem UMA fonte: hosting/politica/index.html no repo
// do app (publicada em personalpro-1d4bc.web.app, o link do cadastro nas lojas).
// Esta página copia o texto dela na hora do build, pra existir no domínio
// próprio (pedido de acesso à API da Garmin, 17/10/2026) sem virar uma segunda
// versão pra manter. Mudou a política? Basta rodar o deploy do site de novo.
const FONTE = 'https://personalpro-1d4bc.web.app/';

export const metadata = {
  title: 'Política de Privacidade · PersonalPro',
  description: 'Como o PersonalPro trata os seus dados, em conformidade com a LGPD (Lei nº 13.709/2018).',
  alternates: { canonical: 'https://personalpro.app.br/privacidade/' },
};

async function carregarPolitica() {
  const r = await fetch(FONTE, { cache: 'force-cache' });
  if (!r.ok) throw new Error(`Política: HTTP ${r.status} em ${FONTE}`);
  const html = await r.text();
  // Miolo = do <div class="wrap"> até antes do <footer> (que tem script do ano).
  const ini = html.indexOf('<div class="wrap">');
  const fim = html.indexOf('<footer', ini);
  if (ini < 0 || fim < 0) throw new Error('Política: estrutura da página mudou (wrap/footer não encontrados)');
  const miolo = html.slice(ini + '<div class="wrap">'.length, fim);
  // Falha o build em vez de publicar uma página vazia ou com script.
  // Confere frases que sobrevivem a revisões do texto (o título do item 1
  // mudou na 1.2 e derrubou o build).
  if (!/Política de Privacidade/.test(miolo) || !/LGPD/.test(miolo)) throw new Error('Política: texto esperado não encontrado');
  if (/<script/i.test(miolo)) throw new Error('Política: miolo com <script>, não publicar');
  return miolo;
}

export default async function Privacidade() {
  const miolo = await carregarPolitica();
  return (
    <main className="min-h-full bg-bg text-ink">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <Link href="/" aria-label="PersonalPro, página inicial" className="inline-block mb-10">
          <Image src="/logo.png" alt="PersonalPro" width={110} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto' }} />
        </Link>
        <article className="politica" dangerouslySetInnerHTML={{ __html: miolo }} />
        <p className="mt-12 pt-6 border-t border-white/[0.06] text-[12px] text-ink-3">
          A mesma política aparece dentro do app, no cadastro e no Perfil.
        </p>
      </div>
    </main>
  );
}
