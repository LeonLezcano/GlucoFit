/**
 * Motor de Sobrecarga Progresiva Automática Funcional
 * Portado y adaptado de openGym para GlucoFit.
 * Funciones puras basadas en el historial que auditan hits, misses y deloads.
 */

export const POLICIES = [
  'off',
  'linear',
  'greyskull',
  'double',
  'triple',
  'steady',
  'undulating',
  'density',
  'ladder',
  'time'
];

export const DEFAULT_POLICY = 'double'; // Por defecto Doble Progresión (la más segura para articulaciones y diabetes)

export const POLICY_META = {
  off: {
    name: 'Sin progresión automática',
    description: 'Los objetivos de peso y repeticiones se mantienen fijos hasta que tú los modifiques.'
  },
  linear: {
    name: 'Progresión Lineal',
    description: 'Cumple todas las series y repeticiones para subir de peso (+2.5 kg). Tres fallos seguidos activan un deload del 10%.'
  },
  greyskull: {
    name: 'Greyskull LP',
    description: 'Dos series estándar y una serie final al fallo (AMRAP). Si superas el objetivo, sube peso; si duplicas reps, duplicas incremento.'
  },
  double: {
    name: 'Doble Progresión',
    description: 'Progresa en repeticiones dentro de un rango (ej. 8 a 12). Al alcanzar el tope en todas las series, sube el peso y vuelve al piso.'
  },
  triple: {
    name: 'Triple Progresión',
    description: 'Primero suben las repeticiones, luego se añade una serie extra. Al consolidar ambas, sube el peso.'
  },
  steady: {
    name: 'Doble Progresión Estricta',
    description: 'Avanza 1 repetición por serie de forma uniforme solo cuando cada serie previa haya sido superada limpiamente.'
  },
  undulating: {
    name: 'Periodización Ondulante Diaria (DUP)',
    description: 'Alterna días pesados (4-6 reps al 85% 1RM), medios (8-10 reps al 75%) y livianos (12-15 reps al 65%).'
  },
  density: {
    name: 'Densidad (Menor Descanso)',
    description: 'Mantiene la carga reduciendo el descanso (-15s) tras cada sesión completada. Al llegar a 45s, incrementa el peso.'
  },
  time: {
    name: 'Añadir Tiempo',
    description: 'Para ejercicios isométricos y planchas (holds). Cada sesión completada añade 5 segundos por serie.'
  }
};

/**
 * Determina el incremento de carga por defecto según el grupo muscular
 * @param {string} category 
 * @returns {number} Incremento en kg (2.5 para torso, 5.0 para piernas/pesados)
 */
export function getDefaultIncrement(category) {
  if (['piernas', 'espalda'].includes(category)) return 5.0;
  return 2.5;
}

/**
 * Calcula la prescripción de peso y repeticiones para la siguiente sesión
 * @param {object} params
 * @param {string} params.policy Política de progresión ('double', 'linear', etc.)
 * @param {Array<object>} params.exerciseHistory Historial cronológico de sesiones para este ejercicio
 * @param {object} [params.targetRange={ minReps: 8, maxReps: 12, targetSets: 3 }]
 * @param {number} [params.estimated1RM=0]
 * @param {string} [params.category='piernas']
 * @returns {{
 *   suggestedWeight: number,
 *   suggestedReps: number,
 *   suggestedSets: number,
 *   suggestedRestSeconds?: number,
 *   reason: string,
 *   action: 'increase_weight' | 'increase_reps' | 'add_set' | 'reduce_rest' | 'deload' | 'maintain'
 * }}
 */
export function calculateNextPrescription({
  policy = DEFAULT_POLICY,
  exerciseHistory = [],
  targetRange = { minReps: 8, maxReps: 12, targetSets: 3 },
  estimated1RM = 0,
  category = 'piernas'
}) {
  const increment = getDefaultIncrement(category);
  const minReps = targetRange.minReps || 8;
  const maxReps = targetRange.maxReps || 12;
  const targetSets = targetRange.targetSets || 3;

  if (!Array.isArray(exerciseHistory) || exerciseHistory.length === 0) {
    return {
      suggestedWeight: 20,
      suggestedReps: minReps,
      suggestedSets: targetSets,
      reason: 'Primera sesión: carga inicial de calibración técnica.',
      action: 'maintain'
    };
  }

  // Última sesión registrada para este ejercicio
  const lastSession = exerciseHistory[exerciseHistory.length - 1];
  const lastSets = Array.isArray(lastSession.sets) ? lastSession.sets : [];
  if (lastSets.length === 0) {
    return {
      suggestedWeight: 20,
      suggestedReps: minReps,
      suggestedSets: targetSets,
      reason: 'Sin series registradas en la última sesión.',
      action: 'maintain'
    };
  }

  const lastWeight = lastSets[0].weight || 20;
  const lastRest = lastSession.restSeconds || 90;

  // Analizar si todas las series cumplieron o superaron el objetivo
  const allSetsHit = lastSets.length >= targetSets && lastSets.every(s => (s.reps || 0) >= (s.targetReps || minReps));
  const allAtMaxReps = lastSets.length >= targetSets && lastSets.every(s => (s.reps || 0) >= maxReps);

  switch (policy) {
    case 'off':
      return {
        suggestedWeight: lastWeight,
        suggestedReps: minReps,
        suggestedSets: targetSets,
        reason: 'Progresión automática desactivada. Manteniendo objetivos actuales.',
        action: 'maintain'
      };

    case 'linear': {
      // Si cumple todas las series, incrementa peso
      if (allSetsHit) {
        const nextW = Math.round((lastWeight + increment) * 10) / 10;
        return {
          suggestedWeight: nextW,
          suggestedReps: minReps,
          suggestedSets: targetSets,
          reason: `¡Objetivo cumplido! Incremento lineal de +${increment} kg.`,
          action: 'increase_weight'
        };
      }

      // Auditar si van 3 fallos consecutivos para deload
      let consecutiveFails = 0;
      for (let i = exerciseHistory.length - 1; i >= 0 && i >= exerciseHistory.length - 3; i--) {
        const sess = exerciseHistory[i];
        const sets = sess.sets || [];
        const hit = sets.length >= targetSets && sets.every(s => (s.reps || 0) >= (s.targetReps || minReps));
        if (!hit) consecutiveFails++;
      }

      if (consecutiveFails >= 3) {
        const deloadW = Math.max(10, Math.round((lastWeight * 0.9) * 2) / 2); // -10% de descarga
        return {
          suggestedWeight: deloadW,
          suggestedReps: minReps,
          suggestedSets: targetSets,
          reason: 'Tres sesiones con estancamiento: protocolo de descarga (-10%) para resensibilizar y disipar fatiga articular.',
          action: 'deload'
        };
      }

      return {
        suggestedWeight: lastWeight,
        suggestedReps: minReps,
        suggestedSets: targetSets,
        reason: 'Consolidando peso actual tras no completar todas las repeticiones.',
        action: 'maintain'
      };
    }

    case 'greyskull': {
      // Greyskull LP: evalúa la última serie (AMRAP)
      const amrapSet = lastSets[lastSets.length - 1];
      const amrapReps = amrapSet?.reps || 0;

      if (amrapReps >= minReps * 2) {
        const doubleInc = increment * 2;
        const nextW = Math.round((lastWeight + doubleInc) * 10) / 10;
        return {
          suggestedWeight: nextW,
          suggestedReps: minReps,
          suggestedSets: targetSets,
          reason: `¡Rendimiento sobresaliente en serie AMRAP (${amrapReps} reps)! Doble incremento (+${doubleInc} kg).`,
          action: 'increase_weight'
        };
      } else if (allSetsHit) {
        const nextW = Math.round((lastWeight + increment) * 10) / 10;
        return {
          suggestedWeight: nextW,
          suggestedReps: minReps,
          suggestedSets: targetSets,
          reason: `Objetivo Greyskull superado (${amrapReps} reps en AMRAP). Incremento de +${increment} kg.`,
          action: 'increase_weight'
        };
      }

      // Un solo fallo en Greyskull activa deload del 10%
      const deloadW = Math.max(10, Math.round((lastWeight * 0.9) * 2) / 2);
      return {
        suggestedWeight: deloadW,
        suggestedReps: minReps,
        suggestedSets: targetSets,
        reason: 'Fallo en alcanzar repeticiones objetivo. Reseteo técnico de Greyskull (-10%).',
        action: 'deload'
      };
    }

    case 'double': {
      // Doble Progresión:
      // Si todas las series tocaron el tope del rango (maxReps) -> Sube peso, reps vuelven a minReps
      if (allAtMaxReps) {
        const nextW = Math.round((lastWeight + increment) * 10) / 10;
        return {
          suggestedWeight: nextW,
          suggestedReps: minReps,
          suggestedSets: targetSets,
          reason: `¡Techo alcanzado (${maxReps} reps en todas las series)! Subes +${increment} kg y reinicias en ${minReps} reps.`,
          action: 'increase_weight'
        };
      }

      // Si no tocó el tope pero completó la sesión -> Sube repeticiones
      const lowestReps = Math.min(...lastSets.map(s => s.reps || 0));
      const nextReps = Math.min(maxReps, lowestReps + 1);
      return {
        suggestedWeight: lastWeight,
        suggestedReps: nextReps,
        suggestedSets: targetSets,
        reason: `Doble progresión: manteniendo ${lastWeight} kg e intentando alcanzar ${nextReps} reps por serie.`,
        action: 'increase_reps'
      };
    }

    case 'density': {
      // Progresión por densidad (reducción de descanso)
      if (allSetsHit) {
        if (lastRest <= 45) {
          // Ya descansó el mínimo -> sube carga y reinicia descanso
          const nextW = Math.round((lastWeight + increment) * 10) / 10;
          return {
            suggestedWeight: nextW,
            suggestedReps: minReps,
            suggestedSets: targetSets,
            suggestedRestSeconds: 90,
            reason: `Máxima densidad alcanzada (pausa de 45s). Incremento de +${increment} kg y descanso reiniciado a 90s.`,
            action: 'increase_weight'
          };
        } else {
          const nextRest = Math.max(45, lastRest - 15);
          return {
            suggestedWeight: lastWeight,
            suggestedReps: minReps,
            suggestedSets: targetSets,
            suggestedRestSeconds: nextRest,
            reason: `Sesión completada con éxito. Reduciendo pausa entre series a ${nextRest} segundos (mayor densidad).`,
            action: 'reduce_rest'
          };
        }
      }

      return {
        suggestedWeight: lastWeight,
        suggestedReps: minReps,
        suggestedSets: targetSets,
        suggestedRestSeconds: lastRest,
        reason: 'Consolidando pausa actual tras no completar las series limpiamente.',
        action: 'maintain'
      };
    }

    case 'time': {
      // Holds e isométricos
      const lastHoldSec = lastSets[0].holdSeconds || lastSets[0].reps || 30;
      if (allSetsHit) {
        const nextSec = lastHoldSec + 5;
        return {
          suggestedWeight: lastWeight,
          suggestedReps: nextSec,
          suggestedSets: targetSets,
          reason: `¡Hold completado! Añadiendo +5 segundos de tensión isométrica (${nextSec}s).`,
          action: 'increase_reps'
        };
      }
      return {
        suggestedWeight: lastWeight,
        suggestedReps: lastHoldSec,
        suggestedSets: targetSets,
        reason: 'Manteniendo tiempo de hold actual para consolidar estabilidad de core.',
        action: 'maintain'
      };
    }

    default:
      return {
        suggestedWeight: lastWeight,
        suggestedReps: minReps,
        suggestedSets: targetSets,
        reason: 'Objetivos conservados según política por defecto.',
        action: 'maintain'
      };
  }
}
