/**
 * Catálogo Maestro de Ejercicios Biomecánicos para Gimnasio Comercial y Salud Metabólica
 * Integra los +6.550 ejercicios de openGym traducidos al español con los 23 movimientos clínicos de GlucoFit.
 * Enfoque en Diabetes Tipo 2 (Activación GLUT4, Biomecánica Guiada y Prevención de Valsalva).
 */

import { CATALOGUE } from './exercises-catalogue.js';

export const EXERCISES = CATALOGUE;

export const CLINICAL_EXERCISES = EXERCISES.filter(ex => ex.isClinical);

/**
 * Obtiene un ejercicio por su ID
 * @param {string} id 
 * @returns {object|null}
 */
export function getExerciseById(id) {
  if (!id) return null;
  return EXERCISES.find(ex => ex.id === id) || null;
}

/**
 * Filtra ejercicios por categoría muscular
 * @param {string} category 
 * @returns {Array}
 */
export function getExercisesByCategory(category) {
  if (!category || category === 'todos') return EXERCISES;
  return EXERCISES.filter(ex => ex.category === category);
}

/**
 * Busca ejercicios por texto, músculo o equipamiento
 * @param {string} query 
 * @param {object} options { onlyClinical?: boolean, category?: string }
 * @returns {Array}
 */
export function searchExercises(query, options = {}) {
  let list = options.onlyClinical ? CLINICAL_EXERCISES : EXERCISES;
  if (options.category && options.category !== 'todos') {
    list = list.filter(ex => ex.category === options.category);
  }
  if (!query) return list;

  const q = query.toLowerCase().trim();
  return list.filter(ex => 
    ex.name.toLowerCase().includes(q) ||
    (ex.englishName && ex.englishName.toLowerCase().includes(q)) ||
    (ex.targetMuscle && ex.targetMuscle.toLowerCase().includes(q)) ||
    (ex.equipment && ex.equipment.toLowerCase().includes(q)) ||
    (Array.isArray(ex.secondaryMuscles) && ex.secondaryMuscles.some(m => m.toLowerCase().includes(q)))
  );
}
