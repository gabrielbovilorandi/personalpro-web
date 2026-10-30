// Textos da página inicial (/, /en/ e /es/). O português é o original; o
// espanhol (México e América Latina, tú, glossário do app em espanhol) e o
// inglês (americano, "clients" como no app em inglês) foram pedidos pelo
// Matheus em 29/10/2026. Mudou um, mude os outros.
//
// Inglês e espanhol: sem o link da consultoria (/treine/ é só pro Brasil),
// Asaas/Pix/boleto ditos como só do Brasil, preços em R$ com ponto decimal.
// Os % de economia vêm da tabela (lib/precosAssinatura.js): `desc` é função.
//
// Diferenças de conteúdo de propósito no espanhol (e no inglês):
// - Asaas, Pix e boleto só existem no Brasil: o texto diz isso em vez de
//   prometer cobrança automática pra quem está no México.
// - "o melhor personal do Brasil" virou "da sua cidade".
// - Preços: os mesmos valores em R$ (a moeda por país ainda não foi decidida),
//   com ponto decimal, que é como se escreve no México.

export const TEXTOS_INICIO = {
  'pt-BR': {
    entrar: 'Entrar',
    baixarApp: 'Baixar app',
    loja: { play: 'Baixe no', apple: 'Baixe na' },
    selo: 'O app mais completo para personal trainers',
    titulo1: 'Gerencie seus alunos',
    titulo2: 'do jeito certo.',
    sub: 'Treinos, agenda, financeiro e avaliações em um único app. Para você focar no que importa — transformar vidas.',
    gratis: 'Grátis até 3 alunos · Sem cartão',
    pc: 'ou acesse pelo computador',
    mock: {
      saudacao: 'Boa tarde',
      proxima: 'Próxima sessão',
      emMin: 'em 25 min',
      aluno: 'João Pedro · Hipertrofia',
      recebido: 'Recebido no mês',
      de: 'de R$ 3.100',
      valor: 'R$ 2.400',
      lista: [
        { nome: 'Carla M.', info: 'atrasada há 3 dias', chip: 'Cobrar', tom: 'text-danger bg-danger/15' },
        { nome: 'Ana Silva', info: 'vence amanhã', chip: 'Lembrar', tom: 'text-warn bg-warn/15' },
      ],
      abas: ['Início', 'Agenda', 'Treinos', 'Alunos', 'Finanças'],
    },
    featRotulo: 'Funcionalidades',
    featTitulo: 'Tudo que você precisa',
    featSub: 'Uma plataforma completa para você gerenciar sua carreira como personal trainer.',
    features: [
      { title: 'Gestão de alunos', desc: 'Cadastre alunos, controle vencimentos, planos e histórico completo em um só lugar.' },
      { title: 'Treinos personalizados', desc: 'Monte programas com biblioteca de exercícios, vídeos e periodização automática de 12 meses.' },
      { title: 'Controle financeiro', desc: 'Acompanhe receitas, inadimplentes e vencimentos. Integração com Asaas para cobrança automática.' },
      { title: 'Agenda inteligente', desc: 'Gerencie sessões, trocas de horário, férias e reposições sem conflitos.' },
      { title: 'Avaliação física', desc: 'Pollock 7 dobras, IMC, % gordura e histórico de evolução com gráficos.' },
      { title: 'App para alunos', desc: 'Seus alunos veem treinos, vídeos e evoluções direto no celular. iOS e Android.' },
    ],
    planosRotulo: 'Planos',
    planosTitulo: 'Invista na sua carreira',
    planosSub: 'Comece grátis. Assine quando quiser crescer.',
    gratuito: 'Plano Gratuito',
    gratuitoInfo: 'Até 3 alunos ativos · Para sempre',
    comecarGratis: 'Começar grátis',
    planos: {
      mensal: { nome: '1 mês', desc: 'Ideal para começar sem compromisso.' },
      trimestral: { nome: '3 meses', desc: (pct) => `Economize ${pct}% comparado ao mensal.` },
      semestral: { nome: '6 meses', desc: (pct) => `Economize ${pct}% comparado ao mensal.` },
      anual: { nome: '12 meses', desc: (pct) => `Melhor custo-benefício. Economize ${pct}%.`, badge: 'MAIS POPULAR' },
    },
    // O que é cobrado em cada período, e quanto dá por mês.
    periodo: { mensal: '/mês', trimestral: 'a cada 3 meses', semestral: 'a cada 6 meses', anual: 'por ano' },
    equivale: (v) => `equivale a ${v}/mês`,
    precoDe: 'de',
    assinar: 'Assinar',
    // Só aparece na janela de fundador (lib/precosAssinatura.js).
    fundador: 'Preço de fundador · só até hoje 23h59',
    planosNota: 'Todos os planos incluem alunos ilimitados e acesso completo a todas as funcionalidades.',
    ctaTitulo1: 'Pronto para ser o melhor',
    ctaTitulo2: 'personal do Brasil?',
    ctaSub: 'Junte-se a personais que já usam o Personal Pro para organizar e fazer crescer sua carreira.',
    ctaPc: 'ou criar conta pelo computador',
    faqRotulo: 'Dúvidas',
    faqTitulo: 'Perguntas frequentes',
    faqs: [
      { q: 'Quantos alunos posso ter gratuitamente?', a: 'Até 3 alunos ativos sem precisar de assinatura. Para gerenciar mais alunos, escolha um dos planos pagos.' },
      { q: 'Onde baixo o app?', a: 'Na Google Play (Android) e na App Store (iPhone) — os botões estão no topo e no fim desta página. Existe app tanto para você quanto para seus alunos, e o mesmo cadastro funciona no celular e no computador.' },
      { q: 'Posso cancelar quando quiser?', a: 'Sim, sem fidelidade. Você cancela a qualquer momento pelo próprio app ou entrando em contato conosco.' },
      { q: 'Os dados dos meus alunos ficam seguros?', a: 'Todos os dados são armazenados no Firebase (Google Cloud), com criptografia em trânsito e em repouso.' },
      { q: 'Como funciona a cobrança dos alunos?', a: 'Pelo painel você gera cobranças via PIX, cartão ou boleto usando integração com o Asaas. O dinheiro cai direto na sua conta.' },
    ],
    consultoria: 'Quer treinar com o Matheus?',
    consultoriaLink: 'Conheça a consultoria →',
    direitos: 'Todos os direitos reservados',
    privacidade: 'Privacidade',
  },

  en: {
    entrar: 'Log in',
    baixarApp: 'Get the app',
    // As the official store badges say in English.
    loja: { play: 'Get it on', apple: 'Download on the' },
    selo: 'The all-in-one app for personal trainers',
    titulo1: 'Manage your clients',
    titulo2: 'the right way.',
    sub: 'Workouts, scheduling, payments, and assessments in one app, so you can focus on what matters most: changing lives.',
    gratis: 'Free for up to 3 clients · No credit card',
    pc: 'or use it on your computer',
    mock: {
      saudacao: 'Good afternoon',
      proxima: 'Next session',
      emMin: 'in 25 min',
      aluno: 'Jake Miller · Muscle gain',
      recebido: 'Collected this month',
      de: 'of R$ 3,100',
      valor: 'R$ 2,400',
      lista: [
        { nome: 'Sarah M.', info: '3 days overdue', chip: 'Collect', tom: 'text-danger bg-danger/15' },
        { nome: 'Emily Ross', info: 'due tomorrow', chip: 'Remind', tom: 'text-warn bg-warn/15' },
      ],
      abas: ['Home', 'Schedule', 'Workouts', 'Clients', 'Finance'],
    },
    featRotulo: 'Features',
    featTitulo: 'Everything you need',
    featSub: 'One platform to run your personal training business.',
    features: [
      { title: 'Client management', desc: 'Add clients and keep track of payment due dates, plans, and their full history in one place.' },
      { title: 'Custom workouts', desc: 'Build programs with an exercise library, videos, and automatic 12-month periodization.' },
      { title: 'Payments at a glance', desc: 'See your income, who’s behind on payments, and what’s due this week. In Brazil, automatic billing through Asaas.' },
      { title: 'Smart scheduling', desc: 'Handle sessions, reschedules, time off, and make-up sessions without double-booking.' },
      { title: 'Fitness assessments', desc: '7-site skinfold (Jackson-Pollock), BMI, body fat %, and progress charts.' },
      { title: 'An app for your clients', desc: 'Your clients see their workouts, videos, and progress right on their phone. iOS and Android.' },
    ],
    planosRotulo: 'Pricing',
    planosTitulo: 'Invest in your business',
    planosSub: 'Start free. Upgrade when you’re ready to grow.',
    gratuito: 'Free plan',
    gratuitoInfo: 'Up to 3 active clients · Free forever',
    comecarGratis: 'Start free',
    planos: {
      mensal: { nome: 'Monthly', desc: 'A no-commitment way to get started.' },
      trimestral: { nome: 'Quarterly', desc: (pct) => `Save ${pct}% vs. monthly.` },
      semestral: { nome: '6 months', desc: (pct) => `Save ${pct}% vs. monthly.` },
      anual: { nome: 'Annual', desc: (pct) => `Best value. Save ${pct}%.`, badge: 'MOST POPULAR' },
    },
    // O que é cobrado em cada período, e quanto dá por mês.
    periodo: { mensal: '/mo', trimestral: 'every 3 months', semestral: 'every 6 months', anual: 'per year' },
    equivale: (v) => `works out to ${v}/mo`,
    precoDe: '',
    assinar: 'Subscribe',
    // Só aparece na janela de fundador (lib/precosAssinatura.js).
    fundador: 'Founder pricing · today only, until 11:59 PM',
    planosNota: 'Every plan includes unlimited clients and full access to every feature.',
    ctaTitulo1: 'Ready to be the best',
    ctaTitulo2: 'trainer in your city?',
    ctaSub: 'Join trainers already using Personal Pro to get organized and grow their business.',
    ctaPc: 'or sign up on your computer',
    faqRotulo: 'FAQ',
    faqTitulo: 'Frequently asked questions',
    faqs: [
      { q: 'How many clients can I have for free?', a: 'Up to 3 active clients, no subscription needed. To manage more, choose one of the paid plans.' },
      { q: 'Where do I get the app?', a: 'On Google Play (Android) and the App Store (iPhone). The buttons are at the top and bottom of this page. The same app works for you and your clients, and your account works on both your phone and your computer.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no commitment. Cancel anytime in the app or by contacting us.' },
      { q: 'Is my clients’ data secure?', a: 'All data is stored on Firebase (Google Cloud) and encrypted in transit and at rest.' },
      { q: 'How do my clients pay me?', a: 'Log each payment in the app and see at a glance who’s paid and who hasn’t. If you work in Brazil, you can also bill clients by Pix, card, or boleto through the Asaas integration, and the money goes straight to your account.' },
    ],
    // No coaching link: Matheus's coaching is Brazil-only.
    consultoria: '',
    consultoriaLink: '',
    direitos: 'All rights reserved',
    privacidade: 'Privacy',
  },

  es: {
    entrar: 'Iniciar sesión',
    baixarApp: 'Descargar app',
    // Como dizem os selos oficiais das lojas em espanhol.
    loja: { play: 'Disponible en', apple: 'Descárgalo en' },
    selo: 'La app más completa para entrenadores personales',
    titulo1: 'Administra a tus alumnos',
    titulo2: 'como se debe.',
    sub: 'Entrenamientos, agenda, pagos y evaluaciones en una sola app. Para que te enfoques en lo que importa: transformar vidas.',
    gratis: 'Gratis hasta 3 alumnos · Sin tarjeta',
    pc: 'o entra desde la computadora',
    mock: {
      saudacao: 'Buenas tardes',
      proxima: 'Próxima sesión',
      emMin: 'en 25 min',
      aluno: 'Juan Pablo · Hipertrofia',
      recebido: 'Cobrado este mes',
      de: 'de R$ 3,100',
      valor: 'R$ 2,400',
      lista: [
        { nome: 'Carla M.', info: '3 días de atraso', chip: 'Cobrar', tom: 'text-danger bg-danger/15' },
        { nome: 'Ana Silva', info: 'vence mañana', chip: 'Recordar', tom: 'text-warn bg-warn/15' },
      ],
      abas: ['Inicio', 'Agenda', 'Rutinas', 'Alumnos', 'Finanzas'],
    },
    featRotulo: 'Funciones',
    featTitulo: 'Todo lo que necesitas',
    featSub: 'Una plataforma completa para llevar tu carrera como entrenador personal.',
    features: [
      { title: 'Gestión de alumnos', desc: 'Registra a tus alumnos y controla fechas de pago, planes y todo su historial en un solo lugar.' },
      { title: 'Entrenamientos a la medida', desc: 'Arma programas con una biblioteca de ejercicios, videos y periodización automática de 12 meses.' },
      { title: 'Control de pagos', desc: 'Ve tus ingresos, quién está atrasado y qué vence esta semana. En Brasil, además, cobro automático con Asaas.' },
      { title: 'Agenda inteligente', desc: 'Organiza sesiones, cambios de horario, vacaciones y reposiciones sin empalmes.' },
      { title: 'Evaluación física', desc: 'Pliegues cutáneos (Pollock 7 pliegues), IMC, % de grasa e historial de progreso con gráficas.' },
      { title: 'App para tus alumnos', desc: 'Tus alumnos ven sus entrenamientos, videos y su progreso desde el celular. iOS y Android.' },
    ],
    planosRotulo: 'Planes',
    planosTitulo: 'Invierte en tu carrera',
    planosSub: 'Empieza gratis. Suscríbete cuando quieras crecer.',
    gratuito: 'Plan gratuito',
    gratuitoInfo: 'Hasta 3 alumnos activos · Para siempre',
    comecarGratis: 'Empezar gratis',
    planos: {
      mensal: { nome: '1 mes', desc: 'Ideal para empezar sin compromiso.' },
      trimestral: { nome: '3 meses', desc: (pct) => `Ahorra ${pct}% frente al plan mensual.` },
      semestral: { nome: '6 meses', desc: (pct) => `Ahorra ${pct}% frente al plan mensual.` },
      anual: { nome: '12 meses', desc: (pct) => `La mejor relación costo-beneficio. Ahorra ${pct}%.`, badge: 'MÁS POPULAR' },
    },
    // O que é cobrado em cada período, e quanto dá por mês.
    periodo: { mensal: '/mes', trimestral: 'cada 3 meses', semestral: 'cada 6 meses', anual: 'al año' },
    equivale: (v) => `equivale a ${v}/mes`,
    precoDe: 'antes',
    assinar: 'Suscribirme',
    // Só aparece na janela de fundador (lib/precosAssinatura.js).
    fundador: 'Precio de fundador · solo hasta hoy a las 23:59',
    planosNota: 'Todos los planes incluyen alumnos ilimitados y acceso completo a todas las funciones.',
    ctaTitulo1: '¿Listo para ser el mejor',
    ctaTitulo2: 'entrenador de tu ciudad?',
    ctaSub: 'Únete a los entrenadores que ya usan Personal Pro para organizarse y hacer crecer su carrera.',
    ctaPc: 'o crea tu cuenta desde la computadora',
    faqRotulo: 'Dudas',
    faqTitulo: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuántos alumnos puedo tener gratis?', a: 'Hasta 3 alumnos activos, sin suscripción. Para tener más, elige uno de los planes de pago.' },
      { q: '¿Dónde descargo la app?', a: 'En Google Play (Android) y en el App Store (iPhone); los botones están arriba y al final de esta página. Hay app para ti y para tus alumnos, y la misma cuenta funciona en el celular y en la computadora.' },
      { q: '¿Puedo cancelar cuando quiera?', a: 'Sí, sin plazos forzosos. Cancelas cuando quieras desde la misma app o escribiéndonos.' },
      { q: '¿Los datos de mis alumnos están seguros?', a: 'Todos los datos se guardan en Firebase (Google Cloud), cifrados en tránsito y en reposo.' },
      { q: '¿Cómo les cobro a mis alumnos?', a: 'En la app registras cada pago y ves al momento quién está al corriente y quién no. Si trabajas en Brasil, también puedes generar cobros por Pix, tarjeta o boleto bancario con la integración de Asaas, y el dinero llega directo a tu cuenta.' },
    ],
    // Sem o link da consultoria: ela é só pro Brasil.
    consultoria: '',
    consultoriaLink: '',
    direitos: 'Todos los derechos reservados',
    privacidade: 'Privacidad',
  },
};

/** Preço com a vírgula (pt-BR) ou o ponto (en, es-MX) decimal; a moeda é sempre R$. */
export function precoR$(valor, idioma) {
  const n = valor.toFixed(2);
  return `R$ ${idioma === 'pt-BR' ? n.replace('.', ',') : n}`;
}
