import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const openGymBase = '/Users/leolezcano/.gemini/antigravity/brain/2641b1e3-6765-40ee-8e65-2443395d38eb/scratch/openGym';
const esPath = path.join(openGymBase, 'catalogue/i18n/es.json');
const exDir = path.join(openGymBase, 'catalogue/exercises');

const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const files = fs.readdirSync(exDir).filter(f => f.endsWith('.json'));

const rawMap = new Map();
for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(exDir, file), 'utf8'));
  rawMap.set(raw.id, raw);
}

// Resolver variantes
function resolveExercise(raw) {
  if (raw.variantOf && rawMap.has(raw.variantOf)) {
    const parent = resolveExercise(rawMap.get(raw.variantOf));
    return {
      ...parent,
      ...raw,
      name: raw.name || parent.name,
      bodyPart: raw.bodyPart || parent.bodyPart,
      equipment: raw.equipment || parent.equipment,
      target: raw.target || parent.target,
      secondaryMuscles: raw.secondaryMuscles || parent.secondaryMuscles,
      category: raw.category || parent.category,
      description: raw.description || parent.description,
      instructions: raw.instructions || parent.instructions
    };
  }
  return raw;
}

const CATEGORY_MAP = {
  'chest': 'pecho',
  'back': 'espalda',
  'shoulders': 'hombros',
  'upper arms': 'brazos',
  'lower arms': 'brazos',
  'upper legs': 'piernas',
  'lower legs': 'piernas',
  'waist': 'core',
  'cardio': 'cardio',
  'neck': 'hombros'
};

const MUSCLE_IMAGE_MAP = {
  'piernas': 'assets/muscles/quadriceps.webp',
  'pecho': 'assets/muscles/pectorals.webp',
  'espalda': 'assets/muscles/dorsales.webp',
  'hombros': 'assets/muscles/deltoids.webp',
  'brazos': 'assets/muscles/arms.webp',
  'core': 'assets/muscles/core.webp',
  'cardio': 'assets/muscles/quadriceps.webp'
};

// Cargar los 23 ejercicios clínicos originales de GlucoFit
import { EXERCISES as CLINICAL_LIST } from '../src/data/exercises.js';
const clinicalMap = new Map();
for (const ex of CLINICAL_LIST) {
  clinicalMap.set(ex.id, ex);
}

const compiled = [];

// 1. Primero añadir los 23 ejercicios clínicos con su metadata rica e imágenes originales
for (const ex of CLINICAL_LIST) {
  compiled.push({
    ...ex,
    isClinical: true,
    badge: 'Clínico / GLUT4',
    source: 'glucofit-clinical'
  });
}

// 2. Añadir los ejercicios de openGym
for (const [id, rawInitial] of rawMap.entries()) {
  if (clinicalMap.has(id)) continue;
  
  const raw = resolveExercise(rawInitial);
  const es = esData[id] || (raw.variantOf ? esData[raw.variantOf] : null) || {};

  const nameRaw = raw.name || 'Ejercicio ' + id;
  const category = CATEGORY_MAP[raw.bodyPart] || 'piernas';
  const isBigCompound = ['upper legs', 'back', 'chest'].includes(raw.bodyPart) && ['barbell', 'dumbbell', 'leverage machine', 'sled machine'].includes(raw.equipment);
  const glut4Score = isBigCompound ? 5 : (['upper legs', 'back', 'chest'].includes(raw.bodyPart) ? 4 : 3);
  
  const instructions = Array.isArray(es.instructions) && es.instructions.length > 0 
    ? es.instructions 
    : (Array.isArray(raw.instructions) && raw.instructions.length > 0 ? raw.instructions : ['Ejecutar el movimiento con técnica estricta y control de la fase excéntrica.']);

  compiled.push({
    id: raw.id,
    startImage: `assets/exercises/opengym/${raw.id}.webp`,
    peakImage: `assets/exercises/opengym/${raw.id}.webp`,
    muscleImage: MUSCLE_IMAGE_MAP[category] || 'assets/muscles/quadriceps.webp',
    name: es.name || (nameRaw.charAt(0).toUpperCase() + nameRaw.slice(1)),
    englishName: nameRaw,
    category,
    targetMuscle: raw.target ? (raw.target.charAt(0).toUpperCase() + raw.target.slice(1)) : 'Músculo General',
    secondaryMuscles: raw.secondaryMuscles || [],
    equipment: raw.equipment || 'Gimnasio',
    glut4Score,
    isGlut4Key: glut4Score >= 4,
    isClinical: false,
    badge: glut4Score === 5 ? 'Sobrecarga GLUT4' : null,
    setup: es.description || raw.description || 'Ajusta la posición y asegura una postura erguida.',
    execution: instructions.join(' '),
    postureChecklist: instructions.slice(0, 4),
    commonMistakes: [
      'Realizar tirones o impulsos bruscos sin control de la velocidad excéntrica.',
      'Contener la respiración aumentando la presión intraabdominal de forma excesiva.'
    ],
    breathingTip: 'Exhala durante el esfuerzo; inhala durante la relajación o bajada. Evita Valsalva.',
    hold: raw.hold || false,
    track: raw.track || null,
    machineKind: raw.machineKind || null,
    source: 'opengym'
  });
}

const outputPath = path.join(rootDir, 'src/data/exercises-catalogue.json');
fs.writeFileSync(outputPath, JSON.stringify(compiled, null, 2), 'utf8');
console.log(`Catálogo compilado exitosamente: ${compiled.length} ejercicios guardados en ${outputPath}`);
