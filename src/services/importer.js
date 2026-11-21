/**
 * Importador Universal de Historiales de Entrenamiento (Zero-Dependency)
 * Soporta Strong (CSV), Hevy (CSV), FitNotes (CSV) y GlucoFit Nativo (JSON / CSV).
 */

import { EXERCISES, searchExercises } from '../data/exercises.js';

/**
 * Parsea un texto CSV respetando comillas y saltos de línea
 * @param {string} text 
 * @returns {Array<Array<string>>}
 */
export function parseCSV(text) {
  if (!text || typeof text !== 'string') return [];
  
  // Limpiar posible BOM UTF-8
  const clean = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
  const lines = [];
  let row = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const nextChar = clean[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Saltar comilla de escape
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++; // CRLF
      row.push(current.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some(cell => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

/**
 * Detecta el formato de la exportación a partir de los encabezados
 * @param {Array<string>} headers 
 * @returns {'strong'|'hevy'|'fitnotes'|'glucofit'|'unknown'}
 */
export function detectFormat(headers = []) {
  const norm = headers.map(h => h.toLowerCase().replace(/[\s_-]/g, ''));
  if (norm.includes('exercisetitle') || norm.includes('setindex')) return 'hevy';
  if (norm.includes('workoutname') && norm.includes('exercisename')) return 'strong';
  if (norm.includes('exercise') && (norm.includes('weight(kgs)') || norm.includes('weight(lbs)'))) return 'fitnotes';
  if (norm.includes('glucofit') || (norm.includes('sesion') && norm.includes('glucemia'))) return 'glucofit';
  return 'unknown';
}

/**
 * Mapea un nombre de ejercicio externo a un ejercicio de GlucoFit
 * @param {string} rawName 
 * @returns {object}
 */
export function matchExercise(rawName) {
  if (!rawName) return EXERCISES[0];
  const q = rawName.toLowerCase().trim();

  // 1. Coincidencia exacta
  let match = EXERCISES.find(e => 
    e.name.toLowerCase() === q || 
    (e.englishName && e.englishName.toLowerCase() === q)
  );
  if (match) return match;

  // 2. Coincidencia por búsqueda difusa
  const searchResults = searchExercises(q);
  if (searchResults.length > 0) return searchResults[0];

  // 3. Fallback genérico conservando el nombre original
  return {
    id: 'custom-' + q.replace(/\s+/g, '-'),
    name: rawName,
    category: 'piernas',
    targetMuscle: 'General',
    secondaryMuscles: [],
    equipment: 'Gimnasio',
    glut4Score: 3,
    isGlut4Key: false
  };
}

/**
 * Importa y convierte un archivo CSV a sesiones estructuradas de GlucoFit
 * @param {string} csvText 
 * @returns {{
 *   success: boolean,
 *   format: string,
 *   sessionsImported: number,
 *   setsImported: number,
 *   sessions: Array<object>,
 *   error?: string
 * }}
 */
export function importWorkoutCSV(csvText) {
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    return {
      success: false,
      format: 'unknown',
      sessionsImported: 0,
      setsImported: 0,
      sessions: [],
      error: 'El archivo CSV está vacío o no contiene filas de datos.'
    };
  }

  const headers = rows[0];
  const format = detectFormat(headers);
  const dataRows = rows.slice(1);

  const sessionGroups = new Map(); // Clave: fecha o identificador de sesión
  let totalSets = 0;

  for (const row of dataRows) {
    if (row.length < 3) continue;

    let date = '';
    let workoutName = 'Entrenamiento Importado';
    let exName = '';
    let weight = 0;
    let reps = 0;
    let rpe = 0;

    if (format === 'strong') {
      // Date, Workout Name, Duration, Exercise Name, Set Order, Weight, Reps, Distance, Seconds, Notes, Workout Notes, RPE
      const headerMap = {};
      headers.forEach((h, idx) => headerMap[h.toLowerCase().trim()] = idx);

      date = row[headerMap['date'] ?? 0] || '';
      workoutName = row[headerMap['workout name'] ?? 1] || 'Entrenamiento';
      exName = row[headerMap['exercise name'] ?? 3] || '';
      weight = parseFloat(row[headerMap['weight'] ?? 5]) || 0;
      reps = parseInt(row[headerMap['reps'] ?? 6], 10) || 0;
      rpe = parseFloat(row[headerMap['rpe'] ?? 11]) || 0;
    } else if (format === 'hevy') {
      // title, start_time, end_time, description, exercise_title, superset_id, exercise_notes, set_index, set_type, weight_kg, reps, distance_km, duration_seconds, rpe
      const headerMap = {};
      headers.forEach((h, idx) => headerMap[h.toLowerCase().trim()] = idx);

      date = row[headerMap['start_time'] ?? 1] || '';
      workoutName = row[headerMap['title'] ?? 0] || 'Sesión Hevy';
      exName = row[headerMap['exercise_title'] ?? 4] || '';
      weight = parseFloat(row[headerMap['weight_kg'] ?? 9]) || 0;
      reps = parseInt(row[headerMap['reps'] ?? 10], 10) || 0;
      rpe = parseFloat(row[headerMap['rpe'] ?? 13]) || 0;
    } else if (format === 'fitnotes') {
      // Date, Exercise, Category, Weight (kgs), Reps, Distance, Distance Unit, Time
      date = row[0] || '';
      exName = row[1] || '';
      weight = parseFloat(row[3]) || 0;
      reps = parseInt(row[4], 10) || 0;
      workoutName = 'Sesión FitNotes';
    } else {
      // Intento heurístico genérico
      date = row[0] || '';
      exName = row[1] || '';
      weight = parseFloat(row[2]) || 0;
      reps = parseInt(row[3], 10) || 0;
    }

    if (!date || !exName) continue;

    // Normalizar fecha a string seguro
    const sessionKey = date.split('T')[0].split(' ')[0];
    if (!sessionGroups.has(sessionKey)) {
      sessionGroups.set(sessionKey, {
        id: `imported_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        routineName: workoutName,
        date: sessionKey,
        timestamp: new Date(date).toISOString() || new Date().toISOString(),
        preGlucose: null,
        postGlucose: null,
        glucoseDelta: null,
        source: `import_${format}`,
        completedExercises: []
      });
    }

    const sess = sessionGroups.get(sessionKey);
    const matchedEx = matchExercise(exName);

    let exEntry = sess.completedExercises.find(e => e.exerciseId === matchedEx.id);
    if (!exEntry) {
      exEntry = {
        exerciseId: matchedEx.id,
        name: matchedEx.name,
        targetMuscle: matchedEx.targetMuscle,
        category: matchedEx.category,
        sets: []
      };
      sess.completedExercises.push(exEntry);
    }

    exEntry.sets.push({
      setNumber: exEntry.sets.length + 1,
      weight,
      reps,
      rir: rpe > 0 ? Math.max(0, 10 - rpe) : 0,
      timestamp: Date.now()
    });

    totalSets++;
  }

  const sessions = Array.from(sessionGroups.values());

  return {
    success: sessions.length > 0,
    format,
    sessionsImported: sessions.length,
    setsImported: totalSets,
    sessions
  };
}

/**
 * Exporta el historial completo a un CSV compatible con Microsoft Excel (BOM UTF-8)
 * @param {Array<object>} sessions 
 * @returns {string}
 */
export function exportToExcelCSV(sessions = []) {
  const BOM = '\uFEFF';
  const headers = ['Fecha', 'Rutina', 'Glucemia Pre (mg/dL)', 'Glucemia Post (mg/dL)', 'Delta Glucosa', 'Ejercicio', 'Músculo', 'Serie', 'Peso (kg)', 'Repeticiones', 'RIR'];
  
  const rows = [headers.join(',')];

  for (const sess of sessions) {
    const date = sess.date || (sess.timestamp ? sess.timestamp.split('T')[0] : '');
    const routine = `"${(sess.routineName || 'Entrenamiento').replace(/"/g, '""')}"`;
    const pre = sess.preGlucose ?? '';
    const post = sess.postGlucose ?? '';
    const delta = sess.glucoseDelta ?? '';

    const exercises = sess.completedExercises || sess.exercises || [];
    for (const ex of exercises) {
      const exName = `"${(ex.name || '').replace(/"/g, '""')}"`;
      const muscle = `"${(ex.targetMuscle || ex.muscle || '').replace(/"/g, '""')}"`;
      const sets = ex.sets || [];

      for (const s of sets) {
        rows.push([
          date,
          routine,
          pre,
          post,
          delta,
          exName,
          muscle,
          s.setNumber || 1,
          s.weight || 0,
          s.reps || 0,
          s.rir || 0
        ].join(','));
      }
    }
  }

  return BOM + rows.join('\r\n');
}
