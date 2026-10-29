import { scriptSugerirIdioma } from '@/lib/idioma';

// Script inline da sugestão de idioma (regras em lib/idioma.js). Só nas
// páginas em português que têm tradução; componente de servidor, pra sair no
// HTML estático e rodar antes do resto da página.
export default function SugestaoIdioma({ pagina }) {
  return <script dangerouslySetInnerHTML={{ __html: scriptSugerirIdioma(pagina) }} />;
}
