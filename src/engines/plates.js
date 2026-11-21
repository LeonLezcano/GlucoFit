/**
 * Calculadora de Carga de Discos y Barras (Plate Math)
 * Calcula qué discos colocar a cada lado de la barra según el peso objetivo y el inventario disponible.
 */

export const STANDARD_BARS = {
  olympic_men: { id: 'olympic_men', name: 'Barra Olímpica Estándar (20 kg / 45 lb)', kg: 20, lb: 45 },
  olympic_women: { id: 'olympic_women', name: 'Barra Olímpica Femenina (15 kg / 35 lb)', kg: 15, lb: 15 * 2.20462 },
  ez_curl: { id: 'ez_curl', name: 'Barra EZ / Z (10 kg / 25 lb)', kg: 10, lb: 25 },
  smith_machine: { id: 'smith_machine', name: 'Máquina Smith Contrapesada (10 kg / 20 lb)', kg: 10, lb: 20 },
  short_bar: { id: 'short_bar', name: 'Barra Corta / Preolímpica (8 kg / 18 lb)', kg: 8, lb: 18 }
};

export const DEFAULT_PLATES = {
  kg: [25, 20, 15, 10, 5, 2.5, 1.25],
  lb: [45, 35, 25, 15, 10, 5, 2.5, 1.25]
};

/**
 * Calcula la combinación óptima de discos por cada lado
 * @param {number} targetTotal Peso total objetivo a levantar
 * @param {number} [barWeight=20] Peso de la barra
 * @param {string} [unit='kg'] 'kg' o 'lb'
 * @param {number[]} [availablePlates] Lista de tamaños de discos disponibles (por defecto DEFAULT_PLATES[unit])
 * @returns {{
 *   barWeight: number,
 *   targetWeight: number,
 *   weightPerSide: number,
 *   platesPerSide: Array<{ size: number, count: number }>,
 *   loadedWeightPerSide: number,
 *   totalLoaded: number,
 *   difference: number,
 *   exact: boolean
 * }}
 */
export function calculatePlates(targetTotal, barWeight = 20, unit = 'kg', availablePlates = null) {
  const target = Math.max(0, Number(targetTotal) || 0);
  const bar = Math.max(0, Number(barWeight) || 0);
  const plates = Array.isArray(availablePlates) && availablePlates.length > 0 
    ? [...availablePlates].sort((a, b) => b - a)
    : [...(DEFAULT_PLATES[unit] || DEFAULT_PLATES.kg)].sort((a, b) => b - a);

  if (target <= bar) {
    return {
      barWeight: bar,
      targetWeight: target,
      weightPerSide: 0,
      platesPerSide: [],
      loadedWeightPerSide: 0,
      totalLoaded: bar,
      difference: Math.round((bar - target) * 100) / 100,
      exact: target === bar
    };
  }

  const weightNeeded = (target - bar) / 2;
  let remaining = weightNeeded;
  const resultPlates = [];

  for (const plate of plates) {
    if (plate <= 0) continue;
    const count = Math.floor(remaining / plate);
    if (count > 0) {
      resultPlates.push({ size: plate, count });
      remaining = Math.round((remaining - (count * plate)) * 1000) / 1000;
    }
  }

  const loadedPerSide = resultPlates.reduce((acc, p) => acc + (p.size * p.count), 0);
  const totalLoaded = Math.round((bar + (loadedPerSide * 2)) * 100) / 100;
  const diff = Math.round((target - totalLoaded) * 100) / 100;

  return {
    barWeight: bar,
    targetWeight: target,
    weightPerSide: weightNeeded,
    platesPerSide: resultPlates,
    loadedWeightPerSide: loadedPerSide,
    totalLoaded,
    difference: diff,
    exact: Math.abs(diff) < 0.01
  };
}

/**
 * Devuelve una descripción legible de los discos a cargar
 * @param {Array<{ size: number, count: number }>} platesPerSide 
 * @param {string} [unit='kg']
 * @returns {string} Ejemplo: "2x20kg + 1x5kg por lado"
 */
export function formatPlateString(platesPerSide, unit = 'kg') {
  if (!Array.isArray(platesPerSide) || platesPerSide.length === 0) {
    return 'Barra vacía';
  }
  return platesPerSide
    .map(p => `${p.count > 1 ? p.count + 'x' : ''}${p.size} ${unit}`)
    .join(' + ') + ' por lado';
}
