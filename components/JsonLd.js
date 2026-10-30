// Dados estruturados (schema.org) num <script type="application/ld+json">.
// O replace de "<" é o que a documentação do Next recomenda contra injeção de HTML.
export default function JsonLd({ dados }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  );
}
