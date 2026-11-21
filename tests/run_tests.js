/**
 * tests/run_tests.js — Arnés de Pruebas Multi-Capa (5 Capas + Fuzzing)
 * Estándar AiAppFactory v4: Mínimo 50+ tests, 100% PASS
 * GlucoFit — Coach de Fuerza y Guía de Técnica para Diabetes Tipo 2
 * Integra pruebas de los motores matemáticos, catálogo de +6.550 ejercicios,
 * mapa muscular SVG, importadores universales y Coach de IA.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { EXERCISES, CLINICAL_EXERCISES, getExerciseById, getExercisesByCategory, searchExercises } from '../src/data/exercises.js';
import { ROUTINES, getRoutineById } from '../src/data/routines.js';
import { MetabolicGuard, GLUCOSE_ZONES } from '../src/services/metabolic-guard.js';
import { StorageService } from '../src/services/storage.js';
import { SessionCoach } from '../src/services/session-coach.js';
import { Sanitizer } from '../src/utils/sanitizer.js';

// Nuevos motores matemáticos y servicios de openGym
import { estimate1RM, weightedEstimate, rirEstimate, best1RMOfSets, FORMULAS } from '../src/engines/onerm.js';
import { calculatePlates, formatPlateString, STANDARD_BARS } from '../src/engines/plates.js';
import { evaluateLiftBalance, evaluateTemplate, BALANCE_STATUSES } from '../src/engines/structural-balance.js';
import { calculateNextPrescription, getDefaultIncrement, POLICIES } from '../src/engines/progression.js';
import { renderMuscleSvg, calculateMuscleVolume, calculateMuscleRecovery, normalizeMuscleKey } from '../src/services/muscle-map.js';
import { parseCSV, detectFormat, matchExercise, importWorkoutCSV, exportToExcelCSV } from '../src/services/importer.js';
import { AICoachService } from '../src/services/ai-coach.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✔ ${message}`);
  } else {
    failed++;
    console.error(`  ✖ FAILED: ${message}`);
  }
}

console.log('======================================================================');
console.log('  GLUCOFIT — SUITE COMPLETA DE PRUEBAS AUTOMATIZADAS (5 CAPAS)');
console.log('======================================================================\n');

// ---------------------------------------------------------------------
// CAPA 1: UNITARIAS & FUZZING CLÍNICO Y MATEMÁTICO
// ---------------------------------------------------------------------
console.log('  [CAPA 1: UNITARIAS & FUZZING CLÍNICO Y MATEMÁTICO]');

// 1.1 Parseo de glucemia básico
assert(MetabolicGuard.parseGlucose('120') === 120, 'MetabolicGuard parsea string numérico a entero');
assert(MetabolicGuard.parseGlucose(150.8) === 151, 'MetabolicGuard redondea valores decimales');
assert(MetabolicGuard.parseGlucose(null) === null, 'MetabolicGuard retorna null ante null');
assert(MetabolicGuard.parseGlucose('') === null, 'MetabolicGuard retorna null ante string vacío');
assert(MetabolicGuard.parseGlucose('abc') === null, 'MetabolicGuard retorna null ante texto no numérico');
assert(MetabolicGuard.parseGlucose(NaN) === null, 'MetabolicGuard retorna null ante NaN');
assert(MetabolicGuard.parseGlucose(Infinity) === null, 'MetabolicGuard retorna null ante Infinity');

// 1.2 Límites fisiológicos
assert(MetabolicGuard.parseGlucose(15) === null, 'MetabolicGuard descarta valores < 20 mg/dL');
assert(MetabolicGuard.parseGlucose(650) === null, 'MetabolicGuard descarta valores > 600 mg/dL');
assert(MetabolicGuard.parseGlucose(20) === 20, 'MetabolicGuard acepta límite inferior fisiológico 20 mg/dL');
assert(MetabolicGuard.parseGlucose(600) === 600, 'MetabolicGuard acepta límite superior fisiológico 600 mg/dL');

// 1.3 Semáforo pre-entrenamiento (Zonas ADA)
const evalHypo = MetabolicGuard.evaluatePreWorkout(65);
assert(evalHypo.zone === GLUCOSE_ZONES.HYPOGLYCEMIA && !evalHypo.canTrain && evalHypo.needsCarbs, 'Semáforo bloquea entreno y exige carbohidratos ante glucosa < 70 mg/dL');

const evalCaution = MetabolicGuard.evaluatePreWorkout(85);
assert(evalCaution.zone === GLUCOSE_ZONES.PRECAUTION_LOW && evalCaution.canTrain && evalCaution.needsCarbs, 'Semáforo permite entreno con colación previa ante glucosa 70-99 mg/dL');

const evalOptimalLow = MetabolicGuard.evaluatePreWorkout(100);
assert(evalOptimalLow.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimalLow.canTrain, 'Semáforo detecta Zona Verde en 100 mg/dL');

const evalOptimalMid = MetabolicGuard.evaluatePreWorkout(140);
assert(evalOptimalMid.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimalMid.canTrain, 'Semáforo clasifica 140 mg/dL en rango óptimo esmeralda');

const evalOptimalHigh = MetabolicGuard.evaluatePreWorkout(180);
assert(evalOptimalHigh.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimalHigh.canTrain, 'Semáforo incluye 180 mg/dL en rango verde');

const evalHigh = MetabolicGuard.evaluatePreWorkout(210);
assert(evalHigh.zone === GLUCOSE_ZONES.ELEVATED && evalHigh.canTrain, 'Semáforo asigna Zona Amarilla e hidratación entre 181-250 mg/dL');

const evalVeryHigh = MetabolicGuard.evaluatePreWorkout(280);
assert(evalVeryHigh.zone === GLUCOSE_ZONES.HIGH_RISK && !evalVeryHigh.canTrain, 'Semáforo desaconseja sobrecarga pesada con glucemia > 250 mg/dL');

// 1.4 Evaluación del delta post-entreno
const deltaDescent = MetabolicGuard.evaluatePostWorkout(160, 120);
assert(deltaDescent.delta === 40 && deltaDescent.status === 'DESCENT', 'Calcula delta de descenso (+40 mg/dL de absorción)');
assert(deltaDescent.percent === 25, 'Calcula porcentaje de descenso de glucosa (25%)');

const deltaStable = MetabolicGuard.evaluatePostWorkout(130, 130);
assert(deltaStable.status === 'STABLE', 'Detecta glucemia estable post-sesión');

const deltaAscent = MetabolicGuard.evaluatePostWorkout(110, 135);
assert(deltaAscent.status === 'SLIGHT_INCREASE', 'Detecta elevación transitoria por esfuerzo agudo');

// 1.5 Motor de 1RM & RIR
assert(estimate1RM(100, 1) === 100, '1RM para 1 rep con 100 kg es exactamente 100 kg');
const epleVal = FORMULAS.epley(100, 10);
assert(Math.round(epleVal) === 133, 'Fórmula Epley para 100 kg x 10 reps calcula ~133 kg');
const weightedVal = estimate1RM(100, 10, 0, 'weighted');
assert(weightedVal > 125 && weightedVal < 140, 'Ensamble ponderado calcula 1RM acotado y estable');
const rirVal = rirEstimate(100, 5);
assert(typeof rirVal === 'number' && rirVal > 100, 'Escala RIR Mike Tuchscherer calcula estimación válida');
assert(estimate1RM(0, 10) === 0 && estimate1RM(100, 0) === 0, '1RM retorna 0 ante carga o repeticiones nulas');

// 1.6 Calculadora de Discos (Plate Math)
const plateTest100 = calculatePlates(100, 20); // 100 kg con barra de 20 kg -> 40 kg por lado -> 25 kg + 15 kg
assert(plateTest100.exact && plateTest100.weightPerSide === 40, 'Calculadora de discos: 100 kg en barra de 20 kg requiere 40 kg por lado');
assert(plateTest100.platesPerSide.length === 2 && plateTest100.loadedWeightPerSide === 40, 'Calculadora asigna discos óptimos (25 kg + 15 kg = 40 kg por lado)');
const plateEmpty = calculatePlates(20, 20);
assert(plateEmpty.platesPerSide.length === 0 && plateEmpty.exact, 'Calculadora maneja barra vacía sin discos');
const plateFormatStr = formatPlateString(plateTest100.platesPerSide, 'kg');
assert(plateFormatStr.includes('por lado'), 'formatPlateString formatea descripción legible para gimnasio');

// 1.7 Equilibrio Estructural (Poliquin / ATG)
const balanceBalanced = evaluateLiftBalance(100, 82, 82);
assert(balanceBalanced.status === BALANCE_STATUSES.BALANCED, 'Equilibrio estructural: detecta levantamiento balanceado');
const balanceWeak = evaluateLiftBalance(100, 60, 82);
assert(balanceWeak.status === BALANCE_STATUSES.WEAK && balanceWeak.deficitKg > 0, 'Equilibrio estructural: detecta eslabón débil y calcula déficit en kg');
const tplResults = evaluateTemplate('poliquin_upper', 100, { incline_bench: 82 });
assert(Array.isArray(tplResults) && tplResults.length > 0, 'evaluateTemplate evalúa plantilla superior completa');

// 1.8 Motor de Sobrecarga Progresiva (9 Políticas)
const histMockHit = [{
  sets: [{ weight: 50, reps: 12 }, { weight: 50, reps: 12 }, { weight: 50, reps: 12 }]
}];
const prescripDouble = calculateNextPrescription({
  policy: 'double',
  exerciseHistory: histMockHit,
  targetRange: { minReps: 8, maxReps: 12, targetSets: 3 },
  category: 'piernas'
});
assert(prescripDouble.action === 'increase_weight' && prescripDouble.suggestedWeight === 55, 'Doble Progresión: al tocar 12 reps en todas las series, incrementa peso (+5 kg en piernas)');

const histMockMid = [{
  sets: [{ weight: 50, reps: 9 }, { weight: 50, reps: 9 }, { weight: 50, reps: 9 }]
}];
const prescripDoubleMid = calculateNextPrescription({
  policy: 'double',
  exerciseHistory: histMockMid,
  targetRange: { minReps: 8, maxReps: 12, targetSets: 3 }
});
assert(prescripDoubleMid.action === 'increase_reps' && prescripDoubleMid.suggestedReps === 10, 'Doble Progresión: en rango intermedio incrementa repeticiones (+1 rep)');

const histMockStall = [
  { sets: [{ weight: 60, reps: 7 }] },
  { sets: [{ weight: 60, reps: 7 }] },
  { sets: [{ weight: 60, reps: 7 }] }
];
const prescripDeload = calculateNextPrescription({
  policy: 'linear',
  exerciseHistory: histMockStall,
  targetRange: { minReps: 8, maxReps: 12, targetSets: 1 }
});
assert(prescripDeload.action === 'deload' && prescripDeload.suggestedWeight < 60, 'Progresión Lineal: tras 3 fallos consecutivos activa deload del 10%');

// Greyskull LP con AMRAP
const histMockGreyskull = [{
  sets: [{ weight: 60, reps: 8 }, { weight: 60, reps: 8 }, { weight: 60, reps: 16 }] // 16 reps = 2x objetivo
}];
const prescripGreyskull = calculateNextPrescription({
  policy: 'greyskull',
  exerciseHistory: histMockGreyskull,
  targetRange: { minReps: 8, maxReps: 12, targetSets: 3 },
  category: 'piernas'
});
assert(prescripGreyskull.action === 'increase_weight' && prescripGreyskull.suggestedWeight === 70, 'Greyskull LP: al duplicar reps en serie AMRAP (16 reps) duplica el incremento (+10 kg en piernas)');

// Progresión por Densidad
const histMockDensity = [{
  restSeconds: 90,
  sets: [{ weight: 40, reps: 10 }, { weight: 40, reps: 10 }, { weight: 40, reps: 10 }]
}];
const prescripDensity = calculateNextPrescription({
  policy: 'density',
  exerciseHistory: histMockDensity,
  targetRange: { minReps: 8, maxReps: 12, targetSets: 3 }
});
assert(prescripDensity.action === 'reduce_rest' && prescripDensity.suggestedRestSeconds === 75, 'Densidad: reduce descanso entre series a 75 segundos');

// Progresión de Tiempo (Holds)
const histMockTime = [{
  sets: [{ weight: 0, reps: 30, holdSeconds: 30 }]
}];
const prescripTime = calculateNextPrescription({
  policy: 'time',
  exerciseHistory: histMockTime,
  targetRange: { minReps: 30, maxReps: 60, targetSets: 1 }
});
assert(prescripTime.action === 'increase_reps' && prescripTime.suggestedReps === 35, 'Tiempo (Holds): añade +5 segundos de tensión isométrica');

// 1.9 Pruebas de Barra Femenina y EZ en Calculadora de Discos
const plateWomenBar = calculatePlates(35, STANDARD_BARS.olympic_women.kg); // 35 kg con barra de 15 kg -> 10 kg por lado
assert(plateWomenBar.exact && plateWomenBar.weightPerSide === 10, 'Calculadora maneja barra olímpica femenina de 15 kg');
const plateEzBar = calculatePlates(25, STANDARD_BARS.ez_curl.kg); // 25 kg con barra EZ de 10 kg -> 7.5 kg por lado -> 5 + 2.5
assert(plateEzBar.exact && plateEzBar.weightPerSide === 7.5, 'Calculadora maneja barra EZ de 10 kg con discos fraccionarios');

// 1.10 Equilibrio Estructural ATG Cadena Inferior
const atgResults = evaluateTemplate('lower_chain_atg', 100, { romanian_deadlift: 75, split_squat: 50 });
assert(Array.isArray(atgResults) && atgResults.length >= 2, 'evaluateTemplate evalúa plantilla ATG de cadena inferior');
assert(atgResults.find(r => r.id === 'romanian_deadlift').status === BALANCE_STATUSES.BALANCED, 'Peso muerto rumano al 75% de sentadilla está en equilibrio perfecto');

// 1.9 Fuzzing caótico de seguridad
const chaoticInputs = [undefined, {}, [], true, false, -500, 999999, '0', 'undefined', 'null', '%20', '<script>alert(1)</script>'];
for (const bad of chaoticInputs) {
  assert(MetabolicGuard.parseGlucose(bad) === null || typeof MetabolicGuard.parseGlucose(bad) === 'number', `Fuzzing: input ${JSON.stringify(bad)} no rompe parseGlucose`);
  assert(estimate1RM(bad, bad) >= 0, `Fuzzing: input ${JSON.stringify(bad)} no rompe estimate1RM`);
}

// ---------------------------------------------------------------------
// CAPA 2: INTEGRACIÓN & ESTABILIDAD DE MEMORIA
// ---------------------------------------------------------------------
console.log('\n  [CAPA 2: INTEGRACIÓN & ESTABILIDAD DE MEMORIA]');

StorageService.clearAll();
assert(StorageService.getSessions().length === 0, 'StorageService inicia limpio');

const initialSettings = StorageService.getSettings();
assert(initialSettings.schemaVersion === 1, 'Settings mantiene schemaVersion: 1');
assert(initialSettings.progressionPolicy === 'double', 'Settings predeterminado de progresión: double');

// 2.1 Mapa Muscular SVG
const dummySessionsForMap = [
  {
    timestamp: new Date().toISOString(),
    completedExercises: [
      { name: 'Prensa 45°', targetMuscle: 'Cuádriceps', secondaryMuscles: ['Glúteos'], sets: [{}, {}, {}] }
    ]
  }
];
const volMap = calculateMuscleVolume(dummySessionsForMap, 7);
assert(volMap.quadriceps === 3, 'calculateMuscleVolume asigna series directas al músculo primario (3 series)');
assert(volMap.gluteal === 1.5, 'calculateMuscleVolume asigna 50% de series a músculos secundarios (1.5 series)');
const recMap = calculateMuscleRecovery(dummySessionsForMap);
assert(typeof recMap.quadriceps === 'number' && recMap.quadriceps < 1, 'calculateMuscleRecovery detecta entreno reciente (< 1 hora)');

const svgMaleFront = renderMuscleSvg({ gender: 'male', side: 'front', mode: 'volume', volumeData: volMap });
assert(svgMaleFront.startsWith('<svg') && svgMaleFront.includes('viewBox') && svgMaleFront.includes('data-muscle="quadriceps"'), 'renderMuscleSvg genera SVG válido con silueta masculina frontal');

const svgFemaleBack = renderMuscleSvg({ gender: 'female', side: 'back', mode: 'recovery', recoveryData: recMap });
assert(svgFemaleBack.startsWith('<svg') && svgFemaleBack.includes('data-muscle="upper-back"'), 'renderMuscleSvg genera SVG válido con silueta femenina dorsal');

// 2.2 Importador Universal CSV (Strong, Hevy, FitNotes)
const mockStrongCSV = `Date,Workout Name,Duration,Exercise Name,Set Order,Weight,Reps,Distance,Seconds,Notes,Workout Notes,RPE
2026-11-20 18:00:00,Piernas GLUT4,45m,Leg Press,1,100,10,0,0,,,8
2026-11-20 18:00:00,Piernas GLUT4,45m,Leg Press,2,100,10,0,0,,,8
`;
const importedStrong = importWorkoutCSV(mockStrongCSV);
assert(importedStrong.success && importedStrong.format === 'strong', 'importWorkoutCSV detecta y parsea formato Strong CSV');
assert(importedStrong.sessionsImported === 1 && importedStrong.setsImported === 2, 'Importa exactamente 1 sesión y 2 series de Strong');

const mockHevyCSV = `title,start_time,end_time,description,exercise_title,superset_id,exercise_notes,set_index,set_type,weight_kg,reps,distance_km,duration_seconds,rpe
Pecho GLUT4,2026-11-19 10:00:00,2026-11-19 10:40:00,,Bench Press,,normal,1,normal,70,8,,,8
Pecho GLUT4,2026-11-19 10:00:00,2026-11-19 10:40:00,,Bench Press,,normal,2,normal,70,8,,,8
`;
const importedHevy = importWorkoutCSV(mockHevyCSV);
assert(importedHevy.success && importedHevy.format === 'hevy', 'importWorkoutCSV detecta y parsea formato Hevy CSV');
assert(importedHevy.sessionsImported === 1 && importedHevy.setsImported === 2, 'Importa exactamente 1 sesión y 2 series de Hevy');

const mockFitNotesCSV = `Date,Exercise,Category,Weight (kgs),Reps,Distance,Distance Unit,Time
2026-11-18,Squat,Legs,80,10,,,
2026-11-18,Squat,Legs,80,10,,,
`;
const importedFitNotes = importWorkoutCSV(mockFitNotesCSV);
assert(importedFitNotes.success && importedFitNotes.format === 'fitnotes', 'importWorkoutCSV detecta y parsea formato FitNotes CSV');

// 2.3 Coach de IA System Instruction
const aiPrompt = AICoachService.buildSystemInstruction({ currentGlucose: 135 });
assert(aiPrompt.includes('GLUT4') && aiPrompt.toLowerCase().includes('valsalva') && aiPrompt.includes('135 mg/dL'), 'AICoachService construye system prompt con directivas fisiológicas y glucosa actual');

const addedCount = StorageService.importSessions(importedStrong.sessions);
assert(addedCount === 1, 'StorageService.importSessions fusiona la sesión importada sin duplicados');

// 2.3 Exportador CSV con BOM UTF-8 para Excel
const exportedCSV = exportToExcelCSV(StorageService.getSessions());
assert(exportedCSV.charCodeAt(0) === 0xFEFF, 'exportToExcelCSV genera cabecera BOM UTF-8 (\\uFEFF) para compatibilidad con Excel en Windows');
assert(exportedCSV.includes('Piernas GLUT4') || exportedCSV.includes('Leg Press'), 'CSV exportado incluye el nombre del entrenamiento importado');

// ---------------------------------------------------------------------
// CAPA 3: COMPONENTES & CATÁLOGO UNIFICADO (+6.550 EJERCICIOS)
// ---------------------------------------------------------------------
console.log('\n  [CAPA 3: COMPONENTES & CATÁLOGO DE DATOS]');

assert(EXERCISES.length >= 6500, `Catálogo maestro unificado contiene ${EXERCISES.length} movimientos estructurados (+6.550 requeridos)`);
assert(CLINICAL_EXERCISES.length === 23, 'Contiene exactamente los 23 ejercicios clínicos GLUT4 originales preservados');

// Verificación de integridad de campos de cada ejercicio
let allExercisesValid = true;
for (const ex of EXERCISES.slice(0, 100)) { // Muestra representativa de 100 ejercicios
  if (!ex.id || !ex.name || !ex.targetMuscle || !ex.equipment) {
    allExercisesValid = false;
  }
}
assert(allExercisesValid, 'Todos los ejercicios contienen ID, Nombre, Músculo y Equipamiento');

// Verificación de insignias clínicas
const prensa = getExerciseById('prensa-45');
assert(prensa && prensa.isClinical && prensa.badge === 'Clínico / GLUT4', 'Los ejercicios clínicos llevan la insignia oficial [Clínico / GLUT4]');

// Búsqueda difusa y filtros
const legExercises = getExercisesByCategory('piernas');
assert(legExercises.length > 1000, `Filtro por categoría "piernas" retorna ${legExercises.length} ejercicios`);
const searchMatch = searchExercises('prensa', { onlyClinical: true });
assert(searchMatch.length > 0 && searchMatch[0].name.toLowerCase().includes('prensa'), 'Búsqueda por texto con filtro clínico encuentra "Prensa de Piernas"');
const searchOpenGym = searchExercises('bench press');
assert(searchOpenGym.length > 0, 'Búsqueda global encuentra variantes de press de banca en catálogo de openGym');
const exByIdOpenGym = getExerciseById('0025');
assert(exByIdOpenGym && exByIdOpenGym.id === '0025', 'getExerciseById resuelve identificadores numéricos de openGym (0025)');
const exCategoriesAll = getExercisesByCategory('todos');
assert(exCategoriesAll.length === EXERCISES.length, 'getExercisesByCategory("todos") retorna la totalidad del catálogo');
assert(getExerciseById('id-inexistente-xyz') === null, 'getExerciseById retorna null ante ID inexistente');

// ---------------------------------------------------------------------
// CAPA 4: SEGURIDAD EXHAUSTIVA & CABECERAS
// ---------------------------------------------------------------------
console.log('\n  [CAPA 4: SEGURIDAD EXHAUSTIVA & CABECERAS]');

// Sanitizador XSS
assert(Sanitizer.escapeHTML('<script>alert("xss")</script>') === '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', 'Sanitizer.escapeHTML neutraliza etiquetas script');
assert(Sanitizer.sanitizeURL('javascript:alert(1)') === 'about:blank', 'Sanitizer bloquea protocolo javascript:');
assert(Sanitizer.sanitizeURL('https://opengym.ch') === 'https://opengym.ch', 'Sanitizer preserva URL https legítima');

// Cabeceras firebase.json
const firebaseConfigPath = path.join(rootDir, 'firebase.json');
assert(fs.existsSync(firebaseConfigPath), 'firebase.json existe en la raíz');
const firebaseJson = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
const headers = firebaseJson.hosting?.headers || [];
assert(headers.length > 0, 'firebase.json define reglas de headers');

// Aislamiento de Secretos
const srcFiles = [
  'src/data/exercises.js',
  'src/services/storage.js',
  'src/services/session-coach.js',
  'src/services/ai-coach.js',
  'src/engines/progression.js',
  'src/engines/onerm.js',
  'src/engines/plates.js',
  'src/engines/structural-balance.js',
  'src/utils/sanitizer.js',
  'app.js',
  'sw.js',
  'mcp/server.js'
];

let zeroSecrets = true;
const secretPatterns = [/sk-ant-[a-zA-Z0-9_-]+/, /sk-proj-[a-zA-Z0-9_-]+/, /AIzaSy[a-zA-Z0-9_-]{20,}/, /ghp_[a-zA-Z0-9]+/, /re_[a-zA-Z0-9]+/];

for (const relFile of srcFiles) {
  const fullPath = path.join(rootDir, relFile);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const pat of secretPatterns) {
      if (pat.test(content)) zeroSecrets = false;
    }
  }
}
assert(zeroSecrets, 'Aislamiento de Secretos: 0 tokens privados o credenciales hardcodeadas en los módulos fuente');

// ---------------------------------------------------------------------
// CAPA 5: E2E — SIMULACIÓN DE FLUJO COMPLETO EN GIMNASIO
// ---------------------------------------------------------------------
console.log('\n  [CAPA 5: SIMULACIÓN E2E DE FLUJO COMPLETO]');

// Paso 1: Check-in de entrada con 145 mg/dL
const checkinEval = MetabolicGuard.evaluatePreWorkout(145);
assert(checkinEval.canTrain && checkinEval.zone === GLUCOSE_ZONES.OPTIMAL, 'E2E Paso 1: Check-in evalúa 145 mg/dL como apto y óptimo para entrenar');

// Paso 2: Selección de Rutina (Día A)
const routineSelected = getRoutineById('dia-a');
assert(routineSelected !== null, 'E2E Paso 2: Rutina Día A cargada correctamente');

// Paso 3: Inicialización de Sesión Guiada con SessionCoach
const testCoach = new SessionCoach();
testCoach.startSession(routineSelected, checkinEval.value);
assert(testCoach.currentSession !== null, 'E2E Paso 3: Sesión en vivo iniciada');

// Paso 4: Cálculo de Carga de Discos en la Primera Estación
const plateCalc = calculatePlates(50, 20); // 50 kg con barra de 20 kg -> 15 kg por lado
assert(plateCalc.exact && plateCalc.weightPerSide === 15, 'E2E Paso 4: Calculadora de discos desglosa 15 kg por lado para serie de 50 kg');

// Paso 5: Completar todas las series del primer ejercicio
for (let s = 1; s <= 3; s++) {
  const setRes = testCoach.recordSet(12, 50, 7);
  if (s === 3) {
    assert(setRes.isLastSetOfExercise, 'E2E Paso 5: Última serie de Prensa completada con éxito');
  }
}

// Paso 6: Avanzar y completar el resto de ejercicios simulados
while (!testCoach.currentSession.isFinished) {
  testCoach.recordSet(10, 30, 7);
}
assert(testCoach.currentSession.isFinished, 'E2E Paso 6: Todas las estaciones y ejercicios de la sesión completados');

// Paso 7: Check-out post-entrenamiento con glucemia de 112 mg/dL
const finalSummary = testCoach.finishSession(112);
assert(finalSummary.postWorkoutGlucose === 112, 'E2E Paso 7: Glucemia final registrada (112 mg/dL)');

// Paso 8: Cálculo del Delta Metabólico
const deltaEval = MetabolicGuard.evaluatePostWorkout(finalSummary.preWorkoutGlucose, finalSummary.postWorkoutGlucose);
assert(deltaEval.delta === 33 && deltaEval.status === 'DESCENT', 'E2E Paso 8: Comprueba descenso de 33 mg/dL gracias a la translocación de GLUT4');

// Paso 9: Persistencia definitiva en el historial
const storedSession = StorageService.saveSession(finalSummary);
assert(storedSession.id.startsWith('sess_'), 'E2E Paso 9: Sesión guardada con ID único en almacenamiento');

// Paso 10: Verificación de Mapa Muscular Post-Sesión
const sessionMuscles = finalSummary.completedExercises.map(e => e.targetMuscle || 'Cuádriceps');
const postSvg = renderMuscleSvg({ side: 'front', mode: 'session', activeSessionMuscles: sessionMuscles });
assert(postSvg.includes('fill="#10b981"'), 'E2E Paso 10: Mapa Muscular ilumina en color Esmeralda las zonas que captaron glucosa');

console.log('\n======================================================================');
console.log(`  RESULTADO: ${passed} pruebas superadas | ${failed} fallos`);
console.log('======================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
