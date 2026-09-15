// Templates de musculação complementar para ciclistas — visíveis só no dashboard.
// Não ficam no Firestore; quando aplicados a um aluno, clonarTemplateParaAlunos
// cria os docs normalmente (igual a qualquer outro template).

const s = (reps, pausa = '60s') => ({ reps, carga: '', pausa });
const ex = (nome, grupo, series, metodo = '', grupoId = '') =>
  ({ nome, grupo, series, metodo, grupoId, videoUrl: null });

export const TEMPLATES_CICLISMO = [
  {
    id: '__ciclismo_base',
    nome: '🚴 Base — Força-Resistência',
    descricao: 'Fora de temporada. Constrói base muscular nos membros inferiores e core. 2–3×/semana, 12-15 reps.',
    exercicios: [
      ex('Agachamento com Barra (Livre)',      'Quadríceps',       [s('12-15','90s'), s('12-15','90s'), s('12-15','90s'), s('12-15','90s')]),
      ex('Terra Romeno com Barra',             'Isquios / Glúteos',[s('12-15','90s'), s('12-15','90s'), s('12-15','90s')]),
      ex('Avanço com Halteres',                'Quadríceps',       [s('12 cada','60s'), s('12 cada','60s'), s('12 cada','60s')]),
      ex('Elevação de Quadril com Barra',      'Isquios / Glúteos',[s('15','60s'), s('15','60s'), s('15','60s'), s('15','60s')]),
      ex('Panturrilha Em Pé na Máquina',       'Panturrilha',      [s('20','45s'), s('20','45s'), s('20','45s')]),
      ex('Prancha Frontal',                    'Abdômen / Core',   [s('45s','30s'), s('45s','30s'), s('45s','30s')]),
      ex('Resistência Antirotacional (Polia)', 'Abdômen / Core',   [s('12 cada','45s'), s('12 cada','45s'), s('12 cada','45s')]),
    ],
  },
  {
    id: '__ciclismo_build',
    nome: '🚴 Build — Força Máxima',
    descricao: 'Pré-temporada. Maximiza força dos extensores. 2×/semana, 4-6 reps, descanso longo entre séries.',
    exercicios: [
      ex('Agachamento com Barra (Livre)',  'Quadríceps',       [s('4-6','3min'), s('4-6','3min'), s('4-6','3min'), s('4-6','3min'), s('4-6','3min')]),
      ex('Levantamento Terra Convencional','Isquios / Glúteos',[s('4-5','3min'), s('4-5','3min'), s('4-5','3min'), s('4-5','3min')]),
      ex('Leg Press 45°',                  'Quadríceps',       [s('6-8','2min'), s('6-8','2min'), s('6-8','2min'), s('6-8','2min')]),
      ex('Elevação de Quadril com Barra',  'Isquios / Glúteos',[s('6-8','2min'), s('6-8','2min'), s('6-8','2min'), s('6-8','2min')]),
      ex('Bird-dog',                       'Lombar',           [s('10 cada','30s'), s('10 cada','30s'), s('10 cada','30s')]),
    ],
  },
  {
    id: '__ciclismo_potencia',
    nome: '🚴 Potência — Contraste',
    descricao: 'Início de temporada. Converte força em potência de pedalo. Bi-set pesado + explosivo em par.',
    exercicios: [
      ex('Leg Press 45°',              'Quadríceps',       [s('4','2min'), s('4','2min'), s('4','2min'), s('4','2min')],          'Bi-set', 'par1'),
      ex('Agachamento com Salto',      'Cardio / Funcional',[s('6','2min'), s('6','2min'), s('6','2min'), s('6','2min')],          'Bi-set', 'par1'),
      ex('Terra Romeno com Barra',     'Isquios / Glúteos',[s('5','2min'), s('5','2min'), s('5','2min')],                        'Bi-set', 'par2'),
      ex('Elevação Pélvica no Solo',   'Isquios / Glúteos',[s('8 rápidas','2min'), s('8 rápidas','2min'), s('8 rápidas','2min')],'Bi-set', 'par2'),
      ex('Prancha Frontal',            'Abdômen / Core',   [s('30s','30s'), s('30s','30s'), s('30s','30s')]),
    ],
  },
  {
    id: '__ciclismo_manutencao',
    nome: '🚴 Manutenção — Temporada',
    descricao: 'Durante as provas. Volume mínimo para manter os ganhos sem atrapalhar a recuperação. 1×/semana.',
    exercicios: [
      ex('Leg Press 45°',                'Quadríceps',       [s('8-10','90s'), s('8-10','90s')]),
      ex('Terra Romeno com Halteres',    'Isquios / Glúteos',[s('10','90s'), s('10','90s')]),
      ex('Elevação de Quadril com Barra','Isquios / Glúteos',[s('12','60s'), s('12','60s')]),
      ex('Panturrilha Em Pé na Máquina', 'Panturrilha',      [s('20','45s'), s('20','45s')]),
      ex('Prancha Frontal',              'Abdômen / Core',   [s('40s','30s'), s('40s','30s')]),
    ],
  },
];
