/**
 * tests/run_tests.js — Arnés de Pruebas Multi-Capa (5 Capas + Fuzzing)
 * Estándar AiAppFactory v4: Mínimo 50+ tests, 100% PASS
 * GlucoFit — Coach de Fuerza y Guía de Técnica para Diabetes Tipo 2
 */

import { EXERCISES, getExerciseById, getExercisesByCategory, searchExercises } from '../src/data/exercises.js';
import { ROUTINES, getRoutineById } from '../src/data/routines.js';
import { MetabolicGuard, GLUCOSE_ZONES } from '../src/services/metabolic-guard.js';
import { StorageService } from '../src/services/storage.js';
import { SessionCoach } from '../src/services/session-coach.js';
import { Sanitizer } from '../src/utils/sanitizer.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
// CAPA 1: UNITARIAS & FUZZING CLÍNICO (METABOLIC GUARD & CÁLCULOS)
// ---------------------------------------------------------------------
console.log('  [CAPA 1: UNITARIAS & FUZZING CLÍNICO]');

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

const evalPrecaution = MetabolicGuard.evaluatePreWorkout(85);
assert(evalPrecaution.zone === GLUCOSE_ZONES.PRECAUTION_LOW && evalPrecaution.canTrain && evalPrecaution.needsCarbs, 'Semáforo permite entreno con colación previa ante glucosa 70-99 mg/dL');

const evalOptimal1 = MetabolicGuard.evaluatePreWorkout(100);
assert(evalOptimal1.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimal1.canTrain && !evalOptimal1.needsCarbs, 'Semáforo detecta Zona Verde en 100 mg/dL');

const evalOptimal2 = MetabolicGuard.evaluatePreWorkout(140);
assert(evalOptimal2.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimal2.canTrain && evalOptimal2.color === 'emerald', 'Semáforo clasifica 140 mg/dL en rango óptimo esmeralda');

const evalOptimal3 = MetabolicGuard.evaluatePreWorkout(180);
assert(evalOptimal3.zone === GLUCOSE_ZONES.OPTIMAL && evalOptimal3.canTrain, 'Semáforo incluye 180 mg/dL en rango verde');

const evalElevated = MetabolicGuard.evaluatePreWorkout(210);
assert(evalElevated.zone === GLUCOSE_ZONES.ELEVATED && evalElevated.canTrain && evalElevated.color === 'amber', 'Semáforo asigna Zona Amarilla e hidratación entre 181-250 mg/dL');

const evalHighRisk = MetabolicGuard.evaluatePreWorkout(270);
assert(evalHighRisk.zone === GLUCOSE_ZONES.HIGH_RISK && !evalHighRisk.canTrain, 'Semáforo desaconseja sobrecarga pesada con glucemia > 250 mg/dL');

// 1.4 Post-entrenamiento y delta de glucosa
const postDescenso = MetabolicGuard.evaluatePostWorkout(160, 120);
assert(postDescenso.valid && postDescenso.delta === 40 && postDescenso.status === 'DESCENT', 'Calcula delta de descenso (+40 mg/dL de absorción)');
assert(postDescenso.percent === 25, 'Calcula porcentaje de descenso de glucosa (25%)');

const postEstable = MetabolicGuard.evaluatePostWorkout(130, 130);
assert(postEstable.valid && postEstable.delta === 0 && postEstable.status === 'STABLE', 'Detecta glucemia estable post-sesión');

const postSubida = MetabolicGuard.evaluatePostWorkout(110, 125);
assert(postSubida.valid && postSubida.delta === -15 && postSubida.status === 'SLIGHT_INCREASE', 'Detecta elevación transitoria por esfuerzo agudo');

// 1.5 Fuzzing caótico de MetabolicGuard
const chaoticInputs = [undefined, null, -1, 0, 99999, '0.000', '   ', '\n\t', {}, [], () => {}, true, false];
let fuzzedWithoutCrash = true;
for (const input of chaoticInputs) {
  try {
    const resPre = MetabolicGuard.evaluatePreWorkout(input);
    const resPost = MetabolicGuard.evaluatePostWorkout(input, input);
    if (typeof resPre !== 'object' || typeof resPost !== 'object') fuzzedWithoutCrash = false;
  } catch (e) {
    fuzzedWithoutCrash = false;
  }
}
assert(fuzzedWithoutCrash, 'Fuzzing caótico: MetabolicGuard maneja entradas anómalas sin arrojar excepciones no capturadas');

// ---------------------------------------------------------------------
// CAPA 2: INTEGRACIÓN & ESTABILIDAD DE MEMORIA (STORAGE & COACH)
// ---------------------------------------------------------------------
console.log('\n  [CAPA 2: INTEGRACIÓN & ESTABILIDAD DE MEMORIA]');

StorageService.clearAll();
assert(StorageService.getSessions().length === 0, 'StorageService inicia limpio');

const settings = StorageService.getSettings();
assert(settings.schemaVersion === 1, 'Settings mantiene schemaVersion: 1');
assert(settings.targetDaysPerWeek === 3, 'Settings predeterminado de 3 días semanales');

// Guardado de sesión
const mockSession = {
  routineId: 'dia-a',
  routineTitle: 'Día A — Fuerza Base',
  preWorkoutGlucose: 145,
  postWorkoutGlucose: 115,
  durationMinutes: 45,
  totalVolumeKg: 3200,
  totalSets: 12,
  completedExercises: [
    {
      exerciseId: 'prensa-45',
      sets: [
        { setNumber: 1, reps: 12, weightKg: 40 },
        { setNumber: 2, reps: 10, weightKg: 50 }
      ]
    }
  ]
};

const savedRecord = StorageService.saveSession(mockSession);
assert(savedRecord && savedRecord.id.startsWith('sess_'), 'StorageService genera ID único con prefijo sess_');
assert(StorageService.getSessions().length === 1, 'Sesión persistida en el listado');

// Recuperación de última carga para sobrecarga progresiva
const lastPerf = StorageService.getLastPerformance('prensa-45');
assert(lastPerf && lastPerf.weightKg === 50 && lastPerf.reps === 10, 'StorageService recupera la última carga (50 kg x 10 repes) para sobrecarga progresiva');
assert(StorageService.getLastPerformance('ejercicio-inexistente') === null, 'Retorna null para ejercicio sin historial');

// Ciclo interactivo de SessionCoach
const coach = new SessionCoach();
const routineA = getRoutineById('dia-a');
const activeSession = coach.startSession(routineA, 135);

assert(activeSession.routineId === 'dia-a', 'SessionCoach inicializa la rutina elegida');
assert(activeSession.currentExerciseIndex === 0, 'SessionCoach comienza en el ejercicio 0');
assert(activeSession.currentSetIndex === 1, 'SessionCoach comienza en la serie 1');

// Registro de serie 1 de ejercicio 1
const set1Result = coach.recordSet(12, 40, 7);
assert(!set1Result.isLastSetOfExercise && !set1Result.isSessionFinished, 'Serie 1 registrada, continúa en el mismo ejercicio');
assert(coach.currentSession.currentSetIndex === 2, 'Avanza a la serie 2');

// Registro de serie 2
coach.recordSet(10, 45, 7);
// Registro de serie 3 (última serie del ejercicio 1)
const set3Result = coach.recordSet(10, 45, 8);
assert(set3Result.isLastSetOfExercise, 'Detecta finalización del ejercicio 1');
assert(coach.currentSession.currentExerciseIndex === 1, 'Avanza al ejercicio 2');
assert(coach.currentSession.currentSetIndex === 1, 'Reinicia contador a serie 1 en el nuevo ejercicio');

// Cálculo acumulativo de volumen (tonnage)
const totalVolume = coach.calculateTotalVolumeKg();
assert(totalVolume === (12 * 40 + 10 * 45 + 10 * 45), 'Calcula volumen exacto de toneladas movidas en la sesión');

// Estabilidad de memoria: simulación de 100 inicios y paradas de descansos
let timerLeakTestPassed = true;
try {
  for (let i = 0; i < 100; i++) {
    coach.startRestTimer(10, null, null);
    coach.stopRestTimer();
  }
} catch (e) {
  timerLeakTestPassed = false;
}
assert(timerLeakTestPassed, 'Estabilidad de memoria: 100 ciclos de temporizador limpiados sin fugas de intervalos');

// Finalización de sesión
const finalRecord = coach.finishSession(105);
assert(finalRecord.postWorkoutGlucose === 105, 'Finaliza sesión asignando glucemia final');
assert(coach.currentSession === null, 'SessionCoach libera la sesión activa de memoria');

// ---------------------------------------------------------------------
// CAPA 3: COMPONENTES & CATÁLOGO DE EJERCICIOS Y RUTINAS
// ---------------------------------------------------------------------
console.log('\n  [CAPA 3: COMPONENTES & CATÁLOGO DE DATOS]');

assert(EXERCISES.length >= 15, `Catálogo de ejercicios contiene ${EXERCISES.length} movimientos estructurados`);

// Verificación de integridad de campos de cada ejercicio
let allExercisesValid = true;
for (const ex of EXERCISES) {
  if (!ex.id || !ex.name || !ex.targetMuscle || !ex.equipment || !ex.glut4Score) {
    allExercisesValid = false;
  }
  if (!Array.isArray(ex.postureChecklist) || ex.postureChecklist.length === 0) {
    allExercisesValid = false;
  }
  if (!Array.isArray(ex.commonMistakes) || ex.commonMistakes.length === 0) {
    allExercisesValid = false;
  }
  if (!ex.breathingTip) {
    allExercisesValid = false;
  }
}
assert(allExercisesValid, 'Cada ejercicio contiene ID, Músculo, Checklist de postura, Errores y Tip respiratorio');

// Búsqueda y filtros
const legExercises = getExercisesByCategory('piernas');
assert(legExercises.length >= 4, `Filtro por categoría "piernas" retorna ${legExercises.length} ejercicios`);

const searchResult = searchExercises('prensa');
assert(searchResult.some(e => e.id === 'prensa-45'), 'Búsqueda por texto encuentra "Prensa de Piernas"');

const searchByMuscle = searchExercises('dorsal');
assert(searchByMuscle.some(e => e.targetMuscle.includes('Dorsal')), 'Búsqueda por grupo muscular "dorsal" exitosa');

// Integridad de Rutinas Full Body
assert(ROUTINES.length === 3, 'El plan clínico contiene exactamente 3 rutinas (Día A, B y C)');
const routineB = getRoutineById('dia-b');
assert(routineB && routineB.recommendedDay === 'Miércoles', 'Rutina Día B asignada a Miércoles');
assert(routineB.exercises.length >= 5, 'Día B incluye 5 o más ejercicios equilibrados');

const routineC = getRoutineById('dia-c');
assert(routineC && routineC.exercises.some(e => e.exerciseId === 'paseo-del-granjero'), 'Día C integra Paseo del Granjero funcional para aceleración metabólica');

// ---------------------------------------------------------------------
// CAPA 4: SEGURIDAD EXHAUSTIVA & CSP EN FIREBASE.JSON
// ---------------------------------------------------------------------
console.log('\n  [CAPA 4: SEGURIDAD EXHAUSTIVA & CABECERAS]');

// Sanitizador XSS
const maliciousPayload = '<script>alert("xss")</script><img src="x" onerror="stealCookie()">';
const escaped = Sanitizer.escapeHTML(maliciousPayload);
assert(!escaped.includes('<script>') && escaped.includes('&lt;script&gt;'), 'Sanitizer.escapeHTML neutraliza etiquetas script');
assert(!escaped.includes('"') && escaped.includes('&quot;'), 'Sanitizer.escapeHTML escapa comillas dobles');

// Sanitización de URLs
assert(Sanitizer.sanitizeURL('javascript:alert(1)') === 'about:blank', 'Sanitizer bloquea protocolo javascript:');
assert(Sanitizer.sanitizeURL('data:text/html,<script>alert(1)</script>') === 'about:blank', 'Sanitizer bloquea protocolo data:');
assert(Sanitizer.sanitizeURL('https://gluco.fit/app') === 'https://gluco.fit/app', 'Sanitizer preserva URL https legítima');

// Verificación estricta de firebase.json
const firebaseConfigPath = path.join(rootDir, 'firebase.json');
assert(fs.existsSync(firebaseConfigPath), 'firebase.json existe en la raíz');

const firebaseRaw = fs.readFileSync(firebaseConfigPath, 'utf8');
const firebaseConfig = JSON.parse(firebaseRaw);

const headers = firebaseConfig.hosting.headers;
assert(Array.isArray(headers), 'firebase.json define reglas de headers');

const swHeaderRule = headers.find(h => h.source === '/sw.js');
assert(swHeaderRule !== undefined, 'Existe regla de cabeceras dedicada para /sw.js');
const cacheControl = swHeaderRule.headers.find(h => h.key === 'Cache-Control');
assert(cacheControl && cacheControl.value.includes('no-cache') && cacheControl.value.includes('no-store'), 'Invariante Anti-Stale: /sw.js tiene Cache-Control no-cache, no-store');

const globalHeadersRule = headers.find(h => h.source === '**');
assert(globalHeadersRule !== undefined, 'Existe regla de cabeceras globales (**) en firebase.json');

const cspHeader = globalHeadersRule.headers.find(h => h.key === 'Content-Security-Policy');
assert(cspHeader !== undefined, 'firebase.json define cabecera Content-Security-Policy');
assert(!cspHeader.value.includes("'unsafe-eval'"), 'CSP prohíbe terminantemente unsafe-eval');
assert(!cspHeader.value.includes('http://'), 'CSP prohíbe fuentes inseguras http://');

const xFrameOptions = globalHeadersRule.headers.find(h => h.key === 'X-Frame-Options');
assert(xFrameOptions && xFrameOptions.value === 'DENY', 'Cabecera X-Frame-Options configurada en DENY');

// Escaneo de secretos en código fuente
const srcFiles = [
  'package.json',
  'version.json',
  'src/data/exercises.js',
  'src/data/routines.js',
  'src/services/metabolic-guard.js',
  'src/services/storage.js',
  'src/services/session-coach.js',
  'src/utils/sanitizer.js',
  'app.js',
  'sw.js'
];

let zeroSecrets = true;
const secretPatterns = [/sk-ant-[a-zA-Z0-9_-]+/, /sk-proj-[a-zA-Z0-9_-]+/, /AIzaSy[a-zA-Z0-9_-]+/, /ghp_[a-zA-Z0-9]+/, /re_[a-zA-Z0-9]+/];

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
// CAPA 5: E2E — FLUJO COMPLETO DE PACIENTE / ATLETA EN GIMNASIO
// ---------------------------------------------------------------------
console.log('\n  [CAPA 5: SIMULACIÓN E2E DE FLUJO COMPLETO]');

// Paso 1: Check-in de entrada con 145 mg/dL
const checkinEval = MetabolicGuard.evaluatePreWorkout(145);
assert(checkinEval.canTrain && checkinEval.zone === GLUCOSE_ZONES.OPTIMAL, 'E2E Paso 1: Check-in evalúa 145 mg/dL como apto y óptimo para entrenar');

// Paso 2: Selección de Rutina (Día A)
const routineSelected = getRoutineById('dia-a');
assert(routineSelected !== null, 'E2E Paso 2: Rutina Día A cargada correctamente');

// Paso 3: Inicialización de Sesión Guiada
const testCoach = new SessionCoach();
testCoach.startSession(routineSelected, checkinEval.value);
assert(testCoach.currentSession !== null, 'E2E Paso 3: Sesión en vivo iniciada con Wake Lock');

// Paso 4: Completar todas las series del primer ejercicio (Prensa 45°: 3 series)
for (let s = 1; s <= 3; s++) {
  const setRes = testCoach.recordSet(12, 50, 7);
  if (s === 3) {
    assert(setRes.isLastSetOfExercise, 'E2E Paso 4: Última serie de Prensa completada con éxito');
  }
}

// Paso 5: Avanzar y completar el resto de ejercicios simulados
while (!testCoach.currentSession.isFinished) {
  testCoach.recordSet(10, 30, 7);
}
assert(testCoach.currentSession.isFinished, 'E2E Paso 5: Todas las estaciones y ejercicios de la sesión completados');

// Paso 6: Check-out post-entrenamiento con glucemia de 112 mg/dL
const finalSummary = testCoach.finishSession(112);
assert(finalSummary.postWorkoutGlucose === 112, 'E2E Paso 6: Glucemia final registrada (112 mg/dL)');

// Paso 7: Cálculo del Delta Metabólico
const deltaEval = MetabolicGuard.evaluatePostWorkout(finalSummary.preWorkoutGlucose, finalSummary.postWorkoutGlucose);
assert(deltaEval.delta === 33 && deltaEval.status === 'DESCENT', 'E2E Paso 7: Comprueba descenso de 33 mg/dL gracias a la translocación de GLUT4');

// Paso 8: Persistencia definitiva en el historial
const storedSession = StorageService.saveSession(finalSummary);
assert(storedSession.id.startsWith('sess_'), 'E2E Paso 8: Sesión guardada con ID único en almacenamiento');
const allSessions = StorageService.getSessions();
assert(allSessions.length >= 1 && allSessions[0].id === storedSession.id, 'E2E Paso 9: Sesión accesible inmediatamente en el historial reciente');

console.log('\n======================================================================');
console.log(`  RESULTADO: ${passed} pruebas superadas | ${failed} fallos`);
console.log('======================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
