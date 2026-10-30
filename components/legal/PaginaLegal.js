import Link from 'next/link';
import Image from 'next/image';
import TrocaIdioma from './TrocaIdioma';
import SugestaoIdioma from '../SugestaoIdioma';
import { DOCUMENTOS, lerDocumento } from '@/lib/legal';

const TEXTOS = {
  'pt-BR': {
    inicio: 'Personal Pro, página inicial',
    rodape: 'A mesma política aparece dentro do app, no cadastro e no Perfil.',
    rodapeTermos: 'O mesmo termo aparece dentro do app, no cadastro.',
    links: { privacidade: 'Política de Privacidade', termos: 'Termo de Uso' },
  },
  en: {
    inicio: 'Personal Pro, home page',
    rodape: 'The same policy is shown inside the app, at sign-up and in Profile.',
    rodapeTermos: 'The same terms are shown inside the app, at sign-up.',
    links: { privacidade: 'Privacy Policy', termos: 'Terms of Use' },
  },
  es: {
    inicio: 'Personal Pro, página de inicio',
    rodape: 'La misma política aparece dentro de la app, al registrarte y en tu Perfil.',
    rodapeTermos: 'Los mismos términos aparecen dentro de la app, al registrarte.',
    links: { privacidade: 'Política de privacidad', termos: 'Términos de uso' },
  },
};

// A logo leva pra página inicial do mesmo idioma.
const INICIO = { 'pt-BR': '/', en: '/en/', es: '/es/' };

export default function PaginaLegal({ doc, idioma }) {
  const html = lerDocumento(doc, idioma);
  const t = TEXTOS[idioma];
  const outro = doc === 'privacidade' ? 'termos' : 'privacidade';
  return (
    <main lang={idioma} className="min-h-full bg-bg text-ink">
      {/* Sugestão de idioma (inglês ou espanhol), regras em lib/idioma.js. */}
      {idioma === 'pt-BR' && <SugestaoIdioma pagina={doc} />}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link href={INICIO[idioma]} aria-label={t.inicio} className="inline-block">
            <Image src="/logo.png" alt="Personal Pro" width={110} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto' }} />
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
