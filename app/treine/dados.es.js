// Conteúdo da /es/entrena/ (a /treine/ em espanhol, pedido do Matheus em
// 29/10/2026). Mesmos nomes de dados.js: a tela escolhe um ou outro.
//
// O que NÃO se traduz e vem de dados.js, pra nunca ficar diferente: WhatsApp,
// fotos, preços, VAGAS (atualizado à mão SÓ lá), CREF e CPF.
//
// As regras de dados.js valem aqui também: nada inventado. Os depoimentos são
// TRADUÇÃO do que cada aluno escreveu em português (a página diz isso), sem
// acrescentar nada. Mudou um depoimento lá, mude aqui.
//
// Diferenças de propósito:
// - Os 7 dias de arrependimento continuam, mas sem citar o Código de Defesa do
//   Consumidor: é lei brasileira, e a página em espanhol é pra quem está fora.
// - "Atende presencial?" responde "no Brasil", pra ninguém no México achar
//   que ele atende lá.
import * as PT from './dados';

export const { WHATSAPP, VAGAS, CREF, CPF } = PT;

export const CIDADE = 'Piracicaba, SP, Brasil';

const ALTS_TOPO = [
  'Matheus Barbosa en el gimnasio',
  'Matheus Barbosa con su bici en un sendero',
  'Matheus Barbosa en una carrera',
];
export const FOTOS_TOPO = PT.FOTOS_TOPO.map((f, i) => ({ ...f, alt: ALTS_TOPO[i] }));

// Mesma ordem e mesmas pessoas de dados.js.
export const DEPOIMENTOS = [
  { frase: 'Bajé 19 kilos desde que empecé a entrenar con Matheus.', resto: 'Pero lo que más cambió no fue mi cuerpo, fue mi mente.', quem: 'Juliana', detalhe: 'Fuerza' },
  { frase: 'Avancé más en 3 meses que en 1 año entrenando sola.', resto: 'Mis piernas y glúteos cambiaron muchísimo, y gané masa magra.', quem: 'Talita', detalhe: 'Fuerza' },
  { frase: 'Pensé que la asesoría en línea sería fría, una rutina más.', resto: 'Pero el apoyo diario y las pláticas con Matheus son impecables.', quem: 'Renata', detalhe: 'Fuerza' },
  { frase: 'Resultados reales y sin obsesionarme.', resto: 'Mi autoestima cambió: me veo en el espejo y me encanta lo que veo.', quem: 'Karina', detalhe: 'Fuerza' },
  { frase: 'Mi velocidad promedio en ciclismo mejoró muchísimo.', resto: 'En solo 2 meses de entrenamiento estructurado.', quem: 'Fabio', detalhe: 'Ciclismo' },
  { frase: 'Entrenamientos cortos e intensos en el rodillo entre semana.', resto: 'Cambiaron por completo mi rendimiento del fin de semana.', quem: 'Leonardo', detalhe: 'Ciclismo' },
  { frase: 'Siempre me detenía porque me faltaba el aire.', resto: 'Aprendí a controlar mi ritmo y hoy corro mis primeros 5 km sin parar.', quem: 'Fabiana', detalhe: 'Carrera' },
  { frase: 'Creía que correr era nada más ponerse los tenis y salir.', resto: 'Hoy entiendo de ritmos y me siento mucho más segura.', quem: 'Débora', detalhe: 'Carrera' },
];

// Só a legenda muda ("anos" → "años"); fotos e nomes são os de dados.js.
export const TRANSFORMACOES = PT.TRANSFORMACOES.map((t) => ({ ...t, quem: t.quem.replace(' anos', ' años') }));

export const NUMEROS = [
  { n: '8 años', oq: 'de experiencia', anos: true },
  { n: '+200', oq: 'alumnos atendidos' },
];

// As capturas do app são as mesmas (em português, por enquanto).
const TEXTOS_TELAS = [
  { titulo: 'El entrenamiento del día', d: 'Peso, series y el video de cada ejercicio.' },
  { titulo: 'Tus récords', d: 'Cada kilo que le subiste a la barra, comparado con la vez anterior.' },
  { titulo: 'Tu semana', d: 'El entrenamiento de hoy, el siguiente y tu constancia.' },
];
export const TELAS_APP = PT.TELAS_APP.map((t, i) => ({ ...t, ...TEXTOS_TELAS[i] }));

export const PARA_VOCE = [
  'Llevas años entrenando y dejaste de avanzar.',
  'Ya probaste rutinas de internet y las dejaste.',
  'Tienes poco tiempo y quieres que cada entrenamiento cuente.',
  'Quieres correr o pedalear sin dejar las pesas.',
  'Quieres retomar después de un tiempo sin entrenar.',
];

export const NAO_PARA_VOCE = [
  'Buscas una dieta (eso le toca a un nutriólogo).',
  'No quieres registrar lo que entrenaste.',
  'Quieres resultados en 2 semanas.',
];

export const CONSULTORIA = {
  ...PT.CONSULTORIA,
  nome: 'Asesoría',
  resumo: 'Yo lo armo, tú lo haces. Lo reviso cada mes.',
  itens: [
    'Entrenamiento armado para ti en la app, con video de técnica',
    'Carrera o ciclismo incluidos, al mismo precio. Si tienes una competencia, el plan te lleva hasta ella',
    'Revisión del programa cada mes',
    'WhatsApp directo conmigo, respuesta en menos de 24 h, todos los días',
    'Ajustes al momento si te lastimas, viajas o cambias de gimnasio',
    'Evaluación con fotos cada 12 semanas',
  ],
};

export const SELOS_PLANO = [
  'Sin plazos forzosos',
  '7 días para arrepentirte',
  'Garantía de 12 semanas',
];

export const MINHA_PARTE = [
  'Responderte en menos de 24 horas, todos los días.',
  'Ajustar al momento si te lastimas, viajas o cambias de gimnasio.',
  'Cambiar tu entrenamiento según tus números, no según el calendario.',
  'Rehacer todo desde cero si en 12 semanas no funciona.',
];

export const SUA_PARTE = [
  'Registrar el peso que de verdad levantaste.',
  'Mandarme fotos cada 12 semanas.',
  'Avisarme el mismo día que algo te duela.',
  '¿No entrenaste? Dime que no entrenaste.',
];

const ROTULOS_FOTOS = ['De frente', 'De perfil', 'De espalda'];
export const PROTOCOLO_FOTOS = {
  modelo: PT.PROTOCOLO_FOTOS.modelo.map((m, i) => ({ ...m, rotulo: ROTULOS_FOTOS[i] })),
  roupa:
    'Traje de baño, o top y short. En las próximas fotos, mismo lugar, ' +
    'misma luz y misma distancia: así la comparación es justa.',
};

// Mesmas chaves (k) e valores (v) de dados.js: a mensagem do WhatsApp e a
// semana de exemplo dependem deles.
export const QUIZ = [
  { k: 'obj', rotulo: 'Objetivo', titulo: '¿Qué quieres lograr ahora?', ops: [
    { v: 'massa', t: 'Ganar masa y fuerza', d: 'Con las pesas como base' },
    { v: 'secar', t: 'Bajar grasa', d: 'Sin obsesionarte con la báscula' },
    { v: 'correr', t: 'Correr o pedalear mejor', d: 'Con o sin competencia en puerta' },
    { v: 'voltar', t: 'Volver a entrenar', d: 'Después de un tiempo sin hacerlo' },
  ] },
  { k: 'dias', rotulo: 'Tiempo', titulo: '¿Cuántos días a la semana puedes entrenar?', ops: [
    { v: 3, t: '3 días', d: 'Entrenamientos que cuentan' },
    { v: 4, t: '4 días' },
    { v: 5, t: '5 días o más' },
  ] },
  { k: 'onde', rotulo: 'Lugar', titulo: '¿Dónde entrenas?', ops: [
    { v: 'academia', t: 'Gimnasio completo' },
    { v: 'simples', t: 'Gimnasio básico' },
    { v: 'casa', t: 'En casa, con mancuernas' },
  ] },
];

export const SEMANA_EXEMPLO = {
  musculacao: {
    3: [['Lun', 'Entrenamiento A: tren superior'], ['Mié', 'Entrenamiento B: tren inferior'], ['Vie', 'Entrenamiento C: cuerpo completo']],
    4: [['Lun', 'Entrenamiento A: tren superior'], ['Mar', 'Entrenamiento B: tren inferior'], ['Jue', 'Entrenamiento C: espalda y brazos'], ['Vie', 'Entrenamiento D: piernas y glúteos']],
    5: [['Lun', 'Entrenamiento A: tren superior'], ['Mar', 'Entrenamiento B: tren inferior'], ['Mié', 'Cardio ligero, 30 min'], ['Jue', 'Entrenamiento C: espalda y brazos'], ['Vie', 'Entrenamiento D: piernas y glúteos']],
  },
  endurance: {
    3: [['Lun', 'Trote suave, zona 2'], ['Mié', 'Fuerza: cuerpo completo'], ['Sáb', 'Carrera larga']],
    4: [['Lun', 'Trote suave, zona 2'], ['Mar', 'Fuerza: tren inferior'], ['Jue', 'Intervalos cortos'], ['Sáb', 'Carrera larga']],
    5: [['Lun', 'Trote suave, zona 2'], ['Mar', 'Fuerza: tren inferior'], ['Mié', 'Intervalos cortos'], ['Jue', 'Fuerza: tren superior'], ['Sáb', 'Carrera larga']],
  },
};

export const FAQ = [
  { q: '¿Necesito gimnasio?', r: 'No. Armo tu plan para gimnasio completo, gimnasio básico o mancuernas en casa.' },
  { q: '¿Hay plazo forzoso?', r: 'No. Es mensual: si cancelas, el mes siguiente ya no se cobra.' },
  { q: '¿Tengo que pagar ya?', r: 'No. Me mandas tus respuestas, platicamos y solo después te envío el cobro.' },
  { q: '¿La carrera y el ciclismo cuestan aparte?', r: 'No. Están incluidos en el mismo precio.' },
  { q: 'Soy principiante. ¿Me sirve?', r: 'Sí. Empezamos desde donde estás.' },
  { q: '¿Las fotos son obligatorias?', r: 'Sí. Sin ellas, cualquier ajuste es adivinar. Se quedan en la app, solo entre tú y yo.' },
  { q: '¿Das entrenamiento presencial?', r: 'Sí, en Brasil. Escríbeme por WhatsApp.' },
];

export const GARANTIA = {
  titulo: 'Garantía de 12 semanas',
  texto: '¿Seguiste el plan y no avanzaste? Rehago tu planeación desde cero, sin costo.',
};

export const GARANTIAS = [
  { marca: '7 días', t: '¿Te arrepentiste? Te devuelvo todo.', d: 'En los primeros 7 días, sin dar explicaciones.' },
  { marca: '12 sem.', t: GARANTIA.titulo, d: GARANTIA.texto },
  { marca: '0', t: 'Cero plazos forzosos.', d: 'Si cancelas, el mes siguiente ya no se cobra.' },
];
