/**
 * Estimador de 1RM (Una Repetición Máxima) y Cálculo por RIR (Reps in Reserve)
 * Basado en la suite de fórmulas de openGym con ensamble ponderado y escala RTS (Mike Tuchscherer).
 */

export const REP_CAP = 12;
export const WEIGHTED_REP_CAP = 15;

export const FORMULAS = {
  epley:    (w, r) => w * (1 + r / 30),
  brzycki:  (w, r) => (37 - r > 0 ? (w * 36) / (37 - r) : w),
  lombardi: (w, r) => w * Math.pow(r, 0.1),
  oconner:  (w, r) => w * (1 + r / 40),
  mayhew:   (w, r) => (w * 100) / (52.2 + 41.9 * Math.exp(-0.055 * r)),
  wathan:   (w, r) => (w * 100) / (48.8 + 53.8 * Math.exp(-0.075 * r)),
  lander:   (w, r) => (101.3 - 2.67123 * r > 0 ? (w * 100) / (101.3 - 2.67123 * r) : w),
};

export const DEFAULT_FORMULA = 'weighted';

// Tabla Mike Tuchscherer / RTS scale (%1RM según reps efectivas al fallo)
// Índice 0 = 1 rep al fallo (100%), Índice 14 = 15 reps al fallo
export const RIR_PCT = [
  100, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9,
  71.7, 69.5, 67.5, 65.5, 63.6,
];

/**
 * Calcula 1RM a partir de un peso y repeticiones estimadas al fallo
 * @param {number} w Peso levantado (kg o lb)
 * @param {number} effectiveReps Repeticiones efectivas al fallo (reps + rir)
 * @returns {number}
 */
export function rirEstimate(w, effectiveReps) {
  if (w <= 0 || effectiveReps <= 0) return 0;
  const idx = Math.min(Math.max(Math.round(effectiveReps) - 1, 0), RIR_PCT.length - 1);
  return (w * 100) / RIR_PCT[idx];
}

/**
 * Ensamble ponderado que combina las 7 fórmulas sub-máximas con la escala RIR
 * @param {number} w Peso
 * @param {number} r Repeticiones realizadas
 * @param {number} rir Repeticiones en reserva (opcional)
 * @returns {number}
 */
export function weightedEstimate(w, r, rir = 0) {
  if (w <= 0 || r <= 0) return 0;
  if (r === 1 && (!rir || rir === 0)) return w;

  const effectiveR = r + (typeof rir === 'number' && Number.isFinite(rir) ? Math.max(0, rir) : 0);
  const cap = Math.min(effectiveR, WEIGHTED_REP_CAP);

  const estimates = [
    FORMULAS.epley(w, cap),
    FORMULAS.brzycki(w, cap),
    FORMULAS.lombardi(w, cap),
    FORMULAS.oconner(w, cap),
    FORMULAS.mayhew(w, cap),
    FORMULAS.wathan(w, cap),
    FORMULAS.lander(w, cap),
    rirEstimate(w, cap)
  ].filter(v => typeof v === 'number' && Number.isFinite(v) && v > 0);

  if (estimates.length === 0) return w;
  const sum = estimates.reduce((a, b) => a + b, 0);
  return Math.round((sum / estimates.length) * 10) / 10;
}

/**
 * Calcula el 1RM estimado según la fórmula elegida
 * @param {number} weight 
 * @param {number} reps 
 * @param {number} [rir=0] 
 * @param {string} [formula='weighted'] 
 * @returns {number} 1RM redondeado a 1 decimal
 */
export function estimate1RM(weight, reps, rir = 0, formula = DEFAULT_FORMULA) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 0;
  const ri = Number(rir) || 0;

  if (w <= 0 || r <= 0) return 0;
  if (r === 1 && ri === 0) return w;

  if (formula === 'weighted') {
    return weightedEstimate(w, r, ri);
  }

  const fn = FORMULAS[formula] || FORMULAS.epley;
  const effectiveR = Math.min(r + Math.max(0, ri), REP_CAP);
  const val = fn(w, effectiveR);
  return Math.round(val * 10) / 10;
}

/**
 * Extrae la mejor estimación de 1RM de un conjunto de series registradas
 * @param {Array<{ weight: number, reps: number, rir?: number }>} sets 
 * @param {string} [formula='weighted'] 
 * @returns {number}
 */
export function best1RMOfSets(sets, formula = DEFAULT_FORMULA) {
  if (!Array.isArray(sets) || sets.length === 0) return 0;
  let best = 0;
  for (const s of sets) {
    if (s.weight > 0 && s.reps > 0) {
      const e = estimate1RM(s.weight, s.reps, s.rir || 0, formula);
      if (e > best) best = e;
    }
  }
  return best;
}
