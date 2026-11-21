/**
 * Servicio de Mapeo Anatómico y Generación de Mapas de Calor SVG
 * Visualiza el volumen muscular acumulado, estado de recuperación y zonas de activación GLUT4.
 */

import bodyPaths from '../data/body-paths.js';

// Partes no musculares que siempre se dibujan como silueta neutra
export const INERT_PARTS = new Set([
  'head', 'hair', 'neck', 'hands', 'knees', 'ankles', 'feet'
]);

// Mapeo entre nombres de músculos en el catálogo de ejercicios y claves del SVG
export const MUSCLE_KEY_MAP = {
  // Cuádriceps
  'cuádriceps': 'quadriceps',
  'quadriceps': 'quadriceps',
  'quads': 'quadriceps',

  // Isquiosurales / Femorales
  'isquiosurales': 'hamstrings',
  'hamstrings': 'hamstrings',
  'femorales': 'hamstrings',

  // Glúteos
  'glúteos': 'gluteal',
  'glutes': 'gluteal',
  'gluteus': 'gluteal',

  // Pectorales / Pecho
  'pectorales': 'chest',
  'pecho': 'chest',
  'chest': 'chest',

  // Espalda / Dorsales / Trapecio
  'dorsales': 'upper-back',
  'espalda': 'upper-back',
  'dorsal': 'upper-back',
  'lats': 'upper-back',
  'trapecios': 'trapezius',
  'trapezius': 'trapezius',
  'espalda baja': 'lower-back',
  'lower-back': 'lower-back',

  // Hombros / Deltoides
  'hombros': 'deltoids',
  'deltoides': 'deltoids',
  'deltoids': 'deltoids',

  // Brazos (Bíceps / Tríceps / Antebrazos)
  'bíceps': 'biceps',
  'biceps': 'biceps',
  'tríceps': 'triceps',
  'triceps': 'triceps',
  'antebrazos': 'forearm',
  'forearms': 'forearm',

  // Core / Abdomen
  'abdomen': 'abs',
  'abdominales': 'abs',
  'abs': 'abs',
  'core': 'abs',
  'oblicuos': 'obliques',
  'obliques': 'obliques',

  // Pantorrillas
  'pantorrillas': 'calves',
  'gemelos': 'calves',
  'calves': 'calves'
};

/**
 * Normaliza un término muscular a la clave del SVG
 * @param {string} muscleName 
 * @returns {string|null}
 */
export function normalizeMuscleKey(muscleName) {
  if (!muscleName) return null;
  const lower = muscleName.toLowerCase().trim();
  return MUSCLE_KEY_MAP[lower] || null;
}

/**
 * Calcula la carga de series por músculo en un rango de días a partir de sesiones
 * @param {Array<object>} sessions 
 * @param {number} [daysWindow=7] 
 * @returns {Record<string, number>}
 */
export function calculateMuscleVolume(sessions = [], daysWindow = 7) {
  const cutoff = Date.now() - (daysWindow * 24 * 60 * 60 * 1000);
  const volumeMap = {};

  for (const session of sessions) {
    const sessionTime = new Date(session.timestamp || session.date || Date.now()).getTime();
    if (sessionTime < cutoff) continue;

    const exercises = session.exercises || session.completedExercises || [];
    for (const ex of exercises) {
      const setsCount = Array.isArray(ex.sets) ? ex.sets.length : (ex.completedSets || 3);
      
      // Músculo primario (cuenta 1.0 por serie)
      const primaryKey = normalizeMuscleKey(ex.targetMuscle || ex.muscle);
      if (primaryKey) {
        volumeMap[primaryKey] = (volumeMap[primaryKey] || 0) + setsCount;
      }

      // Músculos secundarios (cuentan 0.5 por serie)
      if (Array.isArray(ex.secondaryMuscles)) {
        for (const sec of ex.secondaryMuscles) {
          const secKey = normalizeMuscleKey(sec);
          if (secKey && secKey !== primaryKey) {
            volumeMap[secKey] = (volumeMap[secKey] || 0) + (setsCount * 0.5);
          }
        }
      }
    }
  }

  return volumeMap;
}

/**
 * Calcula las horas transcurridas desde el último entrenamiento de cada músculo
 * @param {Array<object>} sessions 
 * @returns {Record<string, number>} { quadriceps: 18.5, chest: 52.0, ... }
 */
export function calculateMuscleRecovery(sessions = []) {
  const recoveryMap = {};
  const now = Date.now();

  for (const session of sessions) {
    const sessionTime = new Date(session.timestamp || session.date || Date.now()).getTime();
    const hoursAgo = Math.max(0, (now - sessionTime) / (1000 * 60 * 60));

    const exercises = session.exercises || session.completedExercises || [];
    for (const ex of exercises) {
      const primaryKey = normalizeMuscleKey(ex.targetMuscle || ex.muscle);
      if (primaryKey) {
        if (recoveryMap[primaryKey] === undefined || hoursAgo < recoveryMap[primaryKey]) {
          recoveryMap[primaryKey] = hoursAgo;
        }
      }
    }
  }

  return recoveryMap;
}

/**
 * Obtiene el color de relleno según el modo y los datos del músculo
 * @param {string} muscleKey 
 * @param {object} options 
 * @param {'volume'|'recovery'|'session'} [options.mode='volume']
 * @param {Record<string, number>} [options.volumeData={}]
 * @param {Record<string, number>} [options.recoveryData={}]
 * @param {Set<string>|Array<string>} [options.activeSessionMuscles=null]
 * @returns {string} Código de color hex
 */
export function getMuscleColor(muscleKey, {
  mode = 'volume',
  volumeData = {},
  recoveryData = {},
  activeSessionMuscles = null
} = {}) {
  // Siluetas neutras inertes
  if (INERT_PARTS.has(muscleKey)) {
    return '#1e293b'; // Slate 800 oscuro
  }

  if (mode === 'session') {
    const rawList = Array.isArray(activeSessionMuscles) ? activeSessionMuscles : Array.from(activeSessionMuscles || []);
    const activeSet = new Set(rawList.map(m => normalizeMuscleKey(m) || (typeof m === 'string' ? m.toLowerCase().trim() : '')));
    if (activeSet.has(muscleKey)) {
      return '#10b981'; // Esmeralda intenso GLUT4
    }
    return '#334155'; // Slate 700 neutral
  }

  if (mode === 'recovery') {
    const hours = recoveryData[muscleKey];
    if (hours === undefined) return '#334155'; // Sin datos
    if (hours < 24) return '#ef4444'; // Fatigado / En reparación (< 24h)
    if (hours < 48) return '#f59e0b'; // En recuperación intermedia (24-48h)
    return '#10b981'; // Completamente recuperado (> 48h)
  }

  // Modo volumen por defecto
  const sets = volumeData[muscleKey] || 0;
  if (sets === 0) return '#334155'; // Sin series
  if (sets <= 6) return '#0284c7';  // Estimulado inicial (Sky 600)
  if (sets <= 12) return '#10b981'; // Óptimo semanal (Emerald 500)
  if (sets <= 18) return '#059669'; // Alta sobrecarga (Emerald 600)
  return '#a855f7';                 // Volumen máximo adaptativo (Purple 500)
}

/**
 * Genera el string SVG completo para renderizar en el DOM
 * @param {object} params
 * @param {'male'|'female'} [params.gender='male']
 * @param {'front'|'back'} [params.side='front']
 * @param {'volume'|'recovery'|'session'} [params.mode='volume']
 * @param {Record<string, number>} [params.volumeData={}]
 * @param {Record<string, number>} [params.recoveryData={}]
 * @param {Array<string>} [params.activeSessionMuscles=[]]
 * @returns {string} Marcado SVG sanitizado y seguro
 */
export function renderMuscleSvg({
  gender = 'male',
  side = 'front',
  mode = 'volume',
  volumeData = {},
  recoveryData = {},
  activeSessionMuscles = []
} = {}) {
  const g = bodyPaths[gender] || bodyPaths.male;
  const s = g[side] || g.front;
  const viewBox = s.vb || '0 95 727 1280';
  const parts = s.p || {};

  let pathsMarkup = '';

  for (const [partKey, pathList] of Object.entries(parts)) {
    const fill = getMuscleColor(partKey, {
      mode,
      volumeData,
      recoveryData,
      activeSessionMuscles
    });

    const dString = Array.isArray(pathList) ? pathList.join(' ') : String(pathList);
    pathsMarkup += `<path d="${dString}" fill="${fill}" stroke="#0f172a" stroke-width="1.5" class="muscle-path" data-muscle="${partKey}"></path>`;
  }

  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" class="body-map-svg" style="width: 100%; height: 100%; max-height: 380px; display: block; margin: 0 auto;">${pathsMarkup}</svg>`;
}
