/**
 * Rutinas Clínicas Full Body de 3 Días para Diabetes Tipo 2
 * Optimizado para translocación de GLUT4 independiente de insulina
 * y reclutamiento progresivo sin sobrecarga articular.
 */

export const ROUTINES = [
  {
    id: 'dia-a',
    title: 'Día A — Fuerza Base & Vaciado Glucémico',
    recommendedDay: 'Lunes',
    description: 'Estímulo de grandes masas musculares (Cuádriceps, Espalda y Pectoral) para maximizar la captación de glucosa tras el descanso del fin de semana.',
    estimatedDurationMin: 45,
    focus: 'Cuádriceps + Espalda Media + Pectoral + Core',
    exercises: [
      {
        exerciseId: 'prensa-45',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 90,
        warmupSets: 1,
        initialWeightKg: 40,
        targetRPE: 7, // Escala de esfuerzo percibido (1-10)
        clinicalNote: 'Gran demanda de glucógeno muscular. Mantén un ritmo cadenciado (2 seg bajada, 1 seg subida).'
      },
      {
        exerciseId: 'remo-polea-baja-sentado',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 25,
        targetRPE: 7,
        clinicalNote: 'Postura de columna neutra. Estimula dorsales y romboides mejorando la postura diaria.'
      },
      {
        exerciseId: 'press-pecho-maquina-sentado',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 20,
        targetRPE: 7,
        clinicalNote: 'Máquina guiada para control total de la trayectoria del hombro sin riesgo de pérdida de equilibrio.'
      },
      {
        exerciseId: 'elevaciones-laterales-mancuernas',
        sets: 3,
        reps: '12 - 15',
        restSeconds: 60,
        warmupSets: 0,
        initialWeightKg: 4,
        targetRPE: 7,
        clinicalNote: 'Usa peso ligero. El deltoides lateral se fatiga rápido; concéntrate en no encoger el cuello.'
      },
      {
        exerciseId: 'plancha-isometrica-banco',
        sets: 3,
        reps: '25 - 35 seg',
        restSeconds: 60,
        warmupSets: 0,
        initialWeightKg: 0,
        targetRPE: 6,
        clinicalNote: 'Respiración continua obligatoria. No aguantes el aire para evitar picos de presión arterial.'
      }
    ]
  },
  {
    id: 'dia-b',
    title: 'Día B — Cadena Posterior & Tracción Metabólica',
    recommendedDay: 'Miércoles',
    description: 'Enfocado en isquiosurales, dorsal ancho, deltoides y brazos. Fomenta el equilibrio muscular y la densidad mitocondrial.',
    estimatedDurationMin: 45,
    focus: 'Isquiosurales + Dorsales + Hombros + Brazos',
    exercises: [
      {
        exerciseId: 'curl-femoral-sentado',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 1,
        initialWeightKg: 25,
        targetRPE: 7,
        clinicalNote: 'Aislamiento seguro para los isquiotibiales, previniendo contracturas lumbares.'
      },
      {
        exerciseId: 'jalon-al-pecho-polea',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 90,
        warmupSets: 0,
        initialWeightKg: 30,
        targetRPE: 7,
        clinicalNote: 'Tracción vertical para ensanchar y activar el dorsal ancho, gran consumidor de glucosa.'
      },
      {
        exerciseId: 'press-hombros-maquina',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 15,
        targetRPE: 7,
        clinicalNote: 'Codos ligeramente hacia adelante para proteger el manguito rotador.'
      },
      {
        exerciseId: 'extension-cuadriceps',
        sets: 3,
        reps: '12',
        restSeconds: 60,
        warmupSets: 0,
        initialWeightKg: 20,
        targetRPE: 7,
        clinicalNote: 'Estímulo localizado en los muslos para potenciar la sensibilidad a la insulina post-entreno.'
      },
      {
        exerciseId: 'extension-triceps-polea-cuerda',
        sets: 3,
        reps: '12',
        restSeconds: 60,
        warmupSets: 0,
        initialWeightKg: 12,
        targetRPE: 7,
        clinicalNote: 'Apertura de cuerda al final del trayecto para máxima tensión en tríceps.'
      },
      {
        exerciseId: 'curl-biceps-mancuernas-banco',
        sets: 3,
        reps: '12',
        restSeconds: 60,
        warmupSets: 0,
        initialWeightKg: 6,
        targetRPE: 7,
        clinicalNote: 'Movimiento pausado sin balanceos de cadera.'
      }
    ]
  },
  {
    id: 'dia-c',
    title: 'Día C — Densidad Muscular & Estabilidad',
    recommendedDay: 'Viernes',
    description: 'Cierre de semana con trabajo de glúteos, empujes y estabilidad de tronco con paseo del granjero para dejar el metabolismo acelerado durante el fin de semana.',
    estimatedDurationMin: 50,
    focus: 'Glúteos / Cadera + Pectoral + Espalda Alta + Paseo Funcional',
    exercises: [
      {
        exerciseId: 'sentadilla-goblet',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 90,
        warmupSets: 1,
        initialWeightKg: 10,
        targetRPE: 7,
        clinicalNote: 'Excelente para movilidad de cadera y activación sincrónica de cuádriceps y glúteos.'
      },
      {
        exerciseId: 'peso-muerto-rumano-mancuernas',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 90,
        warmupSets: 0,
        initialWeightKg: 12,
        targetRPE: 7,
        clinicalNote: 'Espalda recta obligatoria. Siente el tirón elástico en los isquiotibiales.'
      },
      {
        exerciseId: 'remo-maquina-apoyo-pecho',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 25,
        targetRPE: 7,
        clinicalNote: 'Apoyo torácico que elimina toda fatiga de la zona lumbar.'
      },
      {
        exerciseId: 'press-banca-plana-mancuernas',
        sets: 3,
        reps: '10 - 12',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 10,
        targetRPE: 7,
        clinicalNote: 'Estabilidad de hombro con mancuernas moderadas.'
      },
      {
        exerciseId: 'paseo-del-granjero',
        sets: 3,
        reps: '35 - 45 seg',
        restSeconds: 75,
        warmupSets: 0,
        initialWeightKg: 12,
        targetRPE: 8,
        clinicalNote: 'Ejercicio metabólico por excelencia: recluta desde los antebrazos hasta las pantorrillas elevando el consumo de oxígeno.'
      }
    ]
  }
];

/**
 * Obtiene una rutina por su ID
 * @param {string} id 
 * @returns {object|null}
 */
export function getRoutineById(id) {
  return ROUTINES.find(r => r.id === id) || null;
}
