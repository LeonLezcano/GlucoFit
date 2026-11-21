/**
 * Motor de Equilibrio Estructural Biomecánico (Structural Balance)
 * Basado en las pautas de Charles Poliquin, Christian Thibaudeau y el sistema ATG (Athletic Truth Group).
 * Identifica eslabones débiles y desbalances musculares que predisponen a lesiones o estancamientos.
 */

export const BALANCE_STATUSES = {
  BALANCED: 'balanced',     // Dentro del rango óptimo (>= target - 5%)
  BORDERLINE: 'borderline', // Cerca del rango óptimo (entre target - 10% y target - 5%)
  WEAK: 'weak',             // Desbalance marcado (< target - 10%)
  NO_DATA: 'no-data'        // Sin registros de 1RM suficientes
};

export const STRUCTURAL_TEMPLATES = {
  poliquin_upper: {
    id: 'poliquin_upper',
    name: 'Equilibrio de Empujes y Tracciones (Charles Poliquin)',
    anchorName: 'Press de Banca Agarre Cerrado / Plano (100%)',
    ratios: [
      {
        id: 'incline_bench',
        name: 'Press Inclinado',
        targetPct: 82, // 82% del press plano cerrado
        description: 'Fuerza clavicular anterior'
      },
      {
        id: 'weighted_dip',
        name: 'Fondos en Paralelas (Peso + Lastre)',
        targetPct: 105, // 105% del press plano
        description: 'Empuje en cadena cerrada'
      },
      {
        id: 'weighted_chinup',
        name: 'Dominadas Supinas (Peso + Lastre)',
        targetPct: 88, // 88% del press plano
        description: 'Antagonista vertical (Dorsales)'
      },
      {
        id: 'military_press',
        name: 'Press Militar de Pie',
        targetPct: 65, // 65% del press plano
        description: 'Estabilidad vertical de hombros'
      }
    ]
  },
  lower_chain_atg: {
    id: 'lower_chain_atg',
    name: 'Equilibrio de Cadena Inferior (Sistema ATG / Knees Over Toes)',
    anchorName: 'Sentadilla Profunda ATG (100%)',
    ratios: [
      {
        id: 'romanian_deadlift',
        name: 'Peso Muerto Rumano / Isquios',
        targetPct: 75, // 75% de la sentadilla
        description: 'Balance Isquiosurales vs Cuádriceps'
      },
      {
        id: 'split_squat',
        name: 'ATG Split Squat Unilateral (ambas mancuernas)',
        targetPct: 50, // 50% de la sentadilla con ambas manos (25% c/u)
        description: 'Fuerza unilateral y movilidad de tobillo'
      },
      {
        id: 'hip_thrust',
        name: 'Hip Thrust / Empuje de Cadera',
        targetPct: 115, // 115% de la sentadilla
        description: 'Potencia glútea posterior'
      }
    ]
  }
};

/**
 * Evalúa el balance de un levantamiento frente al levantamiento ancla
 * @param {number} anchor1RM 1RM del levantamiento ancla
 * @param {number} currentLift1RM 1RM del levantamiento evaluado
 * @param {number} targetPct Porcentaje teórico ideal (ej. 82)
 * @returns {{
 *   actualPct: number,
 *   targetPct: number,
 *   ratioPct: number,
 *   status: string,
 *   deficitKg: number
 * }}
 */
export function evaluateLiftBalance(anchor1RM, currentLift1RM, targetPct) {
  if (!anchor1RM || anchor1RM <= 0 || !currentLift1RM || currentLift1RM <= 0) {
    return {
      actualPct: 0,
      targetPct,
      ratioPct: 0,
      status: BALANCE_STATUSES.NO_DATA,
      deficitKg: 0
    };
  }

  const actualPct = Math.round((currentLift1RM / anchor1RM) * 100);
  const idealWeight = Math.round(anchor1RM * (targetPct / 100) * 10) / 10;
  const deficitKg = Math.max(0, Math.round((idealWeight - currentLift1RM) * 10) / 10);

  let status = BALANCE_STATUSES.BALANCED;
  if (actualPct < targetPct - 10) {
    status = BALANCE_STATUSES.WEAK;
  } else if (actualPct < targetPct - 5) {
    status = BALANCE_STATUSES.BORDERLINE;
  }

  return {
    actualPct,
    targetPct,
    ratioPct: Math.round((actualPct / targetPct) * 100),
    status,
    deficitKg
  };
}

/**
 * Evalúa una plantilla completa a partir de un mapa de 1RM por id de levantamiento
 * @param {string} templateId 'poliquin_upper' | 'lower_chain_atg'
 * @param {number} anchor1RM 
 * @param {Record<string, number>} liftsMap { incline_bench: 70, weighted_chinup: 80, ... }
 * @returns {Array<object>}
 */
export function evaluateTemplate(templateId, anchor1RM, liftsMap = {}) {
  const tpl = STRUCTURAL_TEMPLATES[templateId] || STRUCTURAL_TEMPLATES.poliquin_upper;
  return tpl.ratios.map(ratio => {
    const lift1RM = liftsMap[ratio.id] || 0;
    const evaluation = evaluateLiftBalance(anchor1RM, lift1RM, ratio.targetPct);
    return {
      id: ratio.id,
      name: ratio.name,
      description: ratio.description,
      current1RM: lift1RM,
      anchor1RM,
      ...evaluation
    };
  });
}
